import type { BlogPostMeta } from "~/utils/blog.types";

type BlogCardProps = {
  post: BlogPostMeta;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex flex-col border border-[#e5e5e5] bg-white p-4 transition-colors hover:border-[#6975f8]"
    >
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px] text-[#7a7a7a]">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.category && (
          <span className="rounded bg-[#f0f0f0] px-2 py-0.5">{post.category}</span>
        )}
      </div>
      <h3 className="mb-2 font-['JetBrains_Mono'] text-[15px] font-normal leading-[19px] text-black group-hover:text-[#6975f8]">
        {post.title}
      </h3>
      <p className="mb-3 flex-1 font-['JetBrains_Mono'] text-[13px] font-normal leading-[18px] text-[#7a7a7a]">
        {post.description}
      </p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-['JetBrains_Mono'] text-[11px] text-[#6975f8]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
