import type { BlogPost } from "~/utils/blog.types";
import { extractYouTubeId } from "~/utils/youtube";

const SITE_URL = "https://blurrd.xyz";
const SITE_NAME = "blurrd.xyz";
const AUTHOR_NAME = "BLURRD";
const AUTHOR_URL = SITE_URL;

export function buildBlogPostSchema(post: BlogPost) {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const postId = `${postUrl}#article`;
  const youtubeId = post.youtube ? extractYouTubeId(post.youtube) : null;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Personal site and writing by BLURRD. Senior frontend developer focused on design, code, and AI.",
      publisher: { "@id": `${SITE_URL}#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#person`,
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
      sameAs: ["https://twitter.com/miltonisblurrd"],
      jobTitle: "Senior Frontend Developer",
    },
    {
      "@type": "Blog",
      "@id": `${SITE_URL}#blog`,
      name: "My Thoughts",
      description: "Writing on design, code, product builds, and streaming tools.",
      url: `${SITE_URL}/#blog`,
      author: { "@id": `${SITE_URL}#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "BlogPosting",
      "@id": postId,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl,
      },
      url: postUrl,
      headline: post.title,
      description: post.description,
      articleBody: post.content.trim(),
      datePublished: post.date,
      dateModified: post.modified ?? post.date,
      author: { "@id": `${SITE_URL}#person` },
      publisher: { "@id": `${SITE_URL}#person` },
      isPartOf: { "@id": `${SITE_URL}#blog` },
      inLanguage: "en-US",
      keywords: post.tags.join(", "),
      articleSection: post.category,
      wordCount: post.content.trim().split(/\s+/).length,
      ...(post.readTime && { timeRequired: post.readTime }),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${postUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "My Thoughts",
          item: `${SITE_URL}/#blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: postUrl,
        },
      ],
    },
  ];

  if (youtubeId) {
    graph.push({
      "@type": "VideoObject",
      "@id": `${postUrl}#video`,
      name: post.title,
      description: post.description,
      uploadDate: post.date,
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
      contentUrl: post.youtube,
      isPartOf: { "@id": postId },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
