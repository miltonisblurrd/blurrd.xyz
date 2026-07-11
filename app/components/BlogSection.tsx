import { useMemo, useState } from "react";

import { BlogCard } from "~/components/BlogCard";
import type { BlogPostMeta } from "~/utils/blog.types";

type BlogSectionProps = {
  posts: BlogPostMeta[];
};

type SortOption = "newest" | "oldest" | "title";

const PAGE_SIZE = 3;

export function BlogSection({ posts }: BlogSectionProps) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const allTags = useMemo(
    () => [...new Set(posts.flatMap((post) => post.tags))].sort(),
    [posts]
  );

  const allCategories = useMemo(
    () =>
      [...new Set(posts.map((post) => post.category).filter(Boolean) as string[])].sort(),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const query = search.toLowerCase().trim();

    let result = posts.filter((post) => {
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        (post.category?.toLowerCase().includes(query) ?? false);

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;

      return matchesSearch && matchesTag && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title);
      }

      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [posts, search, selectedTag, selectedCategory, sort]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const clearFilters = () => {
    setSearch("");
    setSelectedTag(null);
    setSelectedCategory(null);
    setSort("newest");
    setVisibleCount(PAGE_SIZE);
  };

  const hasActiveFilters =
    search || selectedTag || selectedCategory || sort !== "newest";

  return (
    <section id="blog" className="mt-10 max-w-[900px]">
      <h2 className="mb-4 font-['JetBrains_Mono'] text-[15px] font-normal text-black">
        Writing
      </h2>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          className="w-full border border-[#e5e5e5] bg-white px-3 py-2 font-['JetBrains_Mono'] text-[13px] text-[#7a7a7a] outline-none focus:border-[#6975f8] sm:max-w-[280px]"
        />
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as SortOption);
            setVisibleCount(PAGE_SIZE);
          }}
          className="border border-[#e5e5e5] bg-white px-3 py-2 font-['JetBrains_Mono'] text-[13px] text-[#7a7a7a] outline-none focus:border-[#6975f8]"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      {(allCategories.length > 0 || allTags.length > 0) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(
                  selectedCategory === category ? null : category
                );
                setVisibleCount(PAGE_SIZE);
              }}
              className={`rounded px-2.5 py-1 font-['JetBrains_Mono'] text-[12px] transition-colors ${
                selectedCategory === category
                  ? "bg-[#6975f8] text-white"
                  : "bg-[#f0f0f0] text-[#7a7a7a] hover:bg-[#e5e5e5]"
              }`}
            >
              {category}
            </button>
          ))}
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTag(selectedTag === tag ? null : tag);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`rounded px-2.5 py-1 font-['JetBrains_Mono'] text-[12px] transition-colors ${
                selectedTag === tag
                  ? "bg-[#6975f8] text-white"
                  : "bg-[#f0f0f0] text-[#7a7a7a] hover:bg-[#e5e5e5]"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="mb-4 font-['JetBrains_Mono'] text-[12px] text-[#6975f8] hover:opacity-80"
        >
          Clear filters
        </button>
      )}

      {visiblePosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {hasMore && (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="mt-4 border border-[#e5e5e5] bg-white px-4 py-2 font-['JetBrains_Mono'] text-[13px] text-[#7a7a7a] transition-colors hover:border-[#6975f8] hover:text-[#6975f8]"
            >
              Load more
            </button>
          )}
        </>
      ) : (
        <p className="font-['JetBrains_Mono'] text-[13px] text-[#7a7a7a]">
          No posts match your filters.
        </p>
      )}
    </section>
  );
}
