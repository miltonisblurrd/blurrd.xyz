import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

import type { BlogPost, BlogPostMeta } from "~/utils/blog.types";

export type { BlogPost, BlogPostMeta };

const postModules = import.meta.glob<string>("../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function getRawPosts(): Array<{ slug: string; raw: string }> {
  return Object.entries(postModules)
    .map(([filepath, raw]) => ({
      slug: path.basename(filepath).replace(/\.md$/, ""),
      raw,
    }))
    .filter(({ slug }) => !slug.startsWith("_"));
}

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
    readTime: data.readTime ? String(data.readTime) : undefined,
    modified: data.modified ? String(data.modified) : undefined,
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

async function loadPost(slug: string, raw: string): Promise<BlogPost | null> {
  const post = parseFrontmatter(slug, raw);

  if (!post) {
    return null;
  }

  post.html = await markdownToHtml(post.content);
  return post;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(
    getRawPosts().map(({ slug, raw }) => loadPost(slug, raw))
  );

  return posts
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const entry = getRawPosts().find((post) => post.slug === slug);

  if (!entry) {
    return null;
  }

  const post = await loadPost(entry.slug, entry.raw);

  if (!post || !post.published) {
    return null;
  }

  return post;
}
