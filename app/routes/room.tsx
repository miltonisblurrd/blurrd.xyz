import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState, type ComponentType } from "react";

import type { ScreenPost } from "~/components/room/ScreenOS";
import { getAllPosts } from "~/utils/blog.server";

export async function loader() {
  const posts = await getAllPosts();
  return {
    posts: posts.slice(0, 8).map(
      (p): ScreenPost => ({ slug: p.slug, title: p.title, date: p.date }),
    ),
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Milton's corner — miltonisblurrd" },
    {
      name: "description",
      content: "Step into my desk corner in Las Vegas. Use the computer to see my work.",
    },
  ];
};

export default function RoomRoute() {
  const { posts } = useLoaderData<typeof loader>();
  const [Scene, setScene] = useState<ComponentType<{ posts: ScreenPost[] }> | null>(null);

  useEffect(() => {
    let active = true;
    import("~/components/room/RoomScene.client").then((mod) => {
      if (active) setScene(() => mod.RoomScene);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-black text-white">
      {Scene ? (
        <Scene posts={posts} />
      ) : (
        <div className="flex h-full items-center justify-center font-['JetBrains_Mono'] text-[12px] tracking-[0.35em] text-[#e8c66a]/80">
          FINDING THE LIGHT SWITCH…
        </div>
      )}
    </main>
  );
}
