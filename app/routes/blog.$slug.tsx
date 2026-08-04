import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { MermaidBlocks } from "~/components/MermaidBlocks";
import { YouTubeEmbed } from "~/components/YouTubeEmbed";
import { buildBlogPostSchema } from "~/utils/blog-schema";
import { getPostBySlug } from "~/utils/blog.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [{ title: "Post not found" }];
  }

  const { post } = data;
  const url = `https://blurrd.xyz/blog/${post.slug}`;
  const schema = buildBlogPostSchema(post);

  return [
    { title: `${post.title} | miltonisblurrd` },
    { name: "description", content: post.description },
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { property: "article:published_time", content: post.date },
    ...(post.modified
      ? [{ property: "article:modified_time", content: post.modified }]
      : []),
    { tagName: "link", rel: "canonical", href: url },
    { "script:ld+json": schema },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return { post };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-[#fbfaf6] p-4 pb-16">
      <div className="mx-auto max-w-[720px]">
        <a
          href="/#blog"
          className="mb-8 inline-block font-['JetBrains_Mono'] text-[13px] text-[#6975f8] hover:opacity-80"
        >
          ← Back to My Thoughts
        </a>

        <article itemScope itemType="https://schema.org/BlogPosting">
          <meta itemProp="headline" content={post.title} />
          <meta itemProp="description" content={post.description} />
          <meta itemProp="datePublished" content={post.date} />
          <meta
            itemProp="dateModified"
            content={post.modified ?? post.date}
          />
          <meta itemProp="author" content="BLURRD" />
          <meta itemProp="url" content={`https://blurrd.xyz/blog/${post.slug}`} />

          <header className="mb-10">
            <div className="mb-4 flex w-full items-center justify-between font-['JetBrains_Mono'] text-[12px] text-[#7a7a7a]">
              <time dateTime={post.date} itemProp="datePublished">
                {formatDate(post.date)}
              </time>
              <div className="flex items-center gap-2">
                {post.readTime && <span>{post.readTime}</span>}
                {post.category && (
                  <span
                    className="rounded bg-[#f0f0f0] px-2 py-0.5"
                    itemProp="articleSection"
                  >
                    {post.category}
                  </span>
                )}
              </div>
            </div>

            <h1
              className="mb-5 font-['JetBrains_Mono'] text-[28px] font-normal leading-[1.25] text-black md:text-[32px]"
              itemProp="headline"
            >
              {post.title}
            </h1>

            <p
              className="font-sans text-[17px] font-normal leading-[1.55] text-[#5a5a5a] md:text-[19px]"
              itemProp="description"
            >
              {post.description}
            </p>
          </header>

          {post.youtube && (
            <div className="mb-10">
              <YouTubeEmbed url={post.youtube} />
            </div>
          )}

          <hr className="mb-10 border-[#e5e5e5]" />

          <div
            className="prose-blog"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <MermaidBlocks contentKey={post.slug} />

          {post.tags.length > 0 && (
            <footer className="mt-12 border-t border-[#e5e5e5] pt-8">
              <p className="mb-3 font-['JetBrains_Mono'] text-[12px] text-[#7a7a7a]">
                Tagged
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-['JetBrains_Mono'] text-[12px] text-[#6975f8]"
                    itemProp="keywords"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </article>
      </div>
    </div>
  );
}
