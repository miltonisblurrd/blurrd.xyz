import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { BlogSection } from "~/components/BlogSection";
import { getAllPosts } from "~/utils/blog.server";

export const meta: MetaFunction = () => {
  return [
    { title: "My Thoughts | miltonisblurrd" },
    {
      name: "description",
      content: "Notes on engineering, product, and building with agents.",
    },
  ];
};

export async function loader(_args: LoaderFunctionArgs) {
  const posts = await getAllPosts();
  return { posts };
}

export default function Thoughts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-[#fbfaf6] p-4">
      <Link to="/" className="font-['JetBrains_Mono'] text-[13px] text-[#6975f8] hover:opacity-80">
        Back
      </Link>
      <BlogSection posts={posts} />
    </div>
  );
}
