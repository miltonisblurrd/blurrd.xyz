import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  category?: string;
  tags: string[];
  youtube?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  html: string;
};

function parseFrontmatter(slug: string, raw: string): BlogPost | null {
  const { data, content } = matter(raw);

  if (!data.title || !data.description || !data.date) {
    return null;
  }

  const published = data.published !== false;

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    published,
    category: data.category ? String(data.category) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    youtube: data.youtube ? String(data.youtube) : undefined,
    content,
    html: "",
  };
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"));
}

async function loadPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const post = parseFrontmatter(slug, raw);

  if (!post) {
    return null;
  }

  post.html = await markdownToHtml(post.content);
  return post;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = getMarkdownFiles();
  const posts = await Promise.all(
    files.map((file) => loadPost(file.replace(/\.md$/, "")))
  );

  return posts
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await loadPost(slug);

  if (!post || !post.published) {
    return null;
  }

  return post;
}
