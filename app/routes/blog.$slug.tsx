import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { YouTubeEmbed } from "~/components/YouTubeEmbed";
import { extractYouTubeId } from "~/utils/youtube";
import { getPostBySlug } from "~/utils/blog.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [{ title: "Post not found" }];
  }

  const { post } = data;
  const url = `https://blurrd.xyz/blog/${post.slug}`;

  return [
    { title: `${post.title} — miltonisblurrd` },
    { name: "description", content: post.description },
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { property: "article:published_time", content: post.date },
    { tagName: "link", rel: "canonical", href: url },
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
  const youtubeId = post.youtube ? extractYouTubeId(post.youtube) : null;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Milton",
      url: "https://blurrd.xyz",
    },
    url: `https://blurrd.xyz/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  if (youtubeId) {
    jsonLd.video = {
      "@type": "VideoObject",
      name: post.title,
      description: post.description,
      uploadDate: post.date,
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
      contentUrl: post.youtube,
    };
  }

  return (
    <div className="min-h-screen bg-[#fbfaf6] p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[680px]">
        <a
          href="/#blog"
          className="mb-6 inline-block font-['JetBrains_Mono'] text-[13px] text-[#6975f8] hover:opacity-80"
        >
          ← Back to writing
        </a>

        <article>
          <header className="mb-6">
            <div className="mb-2 flex flex-wrap items-center gap-2 font-['JetBrains_Mono'] text-[12px] text-[#7a7a7a]">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.category && (
                <span className="rounded bg-[#f0f0f0] px-2 py-0.5">
                  {post.category}
                </span>
              )}
            </div>
            <h1 className="mb-3 font-['JetBrains_Mono'] text-[22px] font-normal leading-[28px] text-black">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-['JetBrains_Mono'] text-[12px] text-[#6975f8]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {post.youtube && <YouTubeEmbed url={post.youtube} />}

          <div
            className="prose-blog font-['JetBrains_Mono'] text-[15px] font-normal leading-[22px] text-[#7a7a7a]"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>
    </div>
  );
}
