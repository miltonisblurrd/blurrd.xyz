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
      <div className="mb-2 flex w-full items-center justify-between text-[12px] text-[#7a7a7a]">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.category && (
          <span className="rounded bg-[#f0f0f0] px-2 py-0.5">{post.category}</span>
        )}
      </div>
      <h3 className="mb-2 font-['JetBrains_Mono'] text-[15px] md:text-[19px] font-normal leading-[1.55] text-black group-hover:text-[#6975f8]">
        {post.title}
      </h3>
      <p className="flex-1 pb-5 font-['JetBrains_Mono'] text-[13px] md:text-[17px] font-normal leading-[18px] md:leading-[22px] text-[#7a7a7a]">
        {post.description}
      </p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-x-2 gap-y-1">
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
