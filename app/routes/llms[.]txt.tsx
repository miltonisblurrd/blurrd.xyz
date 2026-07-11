import type { LoaderFunctionArgs } from "@remix-run/node";

import { getAllPosts } from "~/utils/blog.server";

const SITE_URL = "https://blurrd.xyz";

export async function loader(_args: LoaderFunctionArgs) {
  const posts = await getAllPosts();

  const postLines = posts
    .map(
      (post) =>
        `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`
    )
    .join("\n");

  const body = `# ${SITE_URL}

> Personal site and writing by BLURRD. Senior frontend developer focused on design, code, and AI. Based in Las Vegas.

## About

- Homepage: ${SITE_URL}
- Writing section: ${SITE_URL}/#blog
- Contact: milton@blurrdstudio.com

## Blog posts

${postLines || "- No published posts yet."}

## Optional

- Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
