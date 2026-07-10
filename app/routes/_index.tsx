import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { BlogSection } from "~/components/BlogSection";
import { getAllPosts } from "~/utils/blog.server";
import profileImage from "../../69bf1a53c911272bf6b5ccdf_IMG_6481.jpg";

export async function loader(_args: LoaderFunctionArgs) {
  const posts = await getAllPosts();
  return { posts };
}

export const meta: MetaFunction = () => {
  return [
    { title: "miltonisblurrd - frontend developer las vegas" },
    {
      name: "description",
      content:
        "I’m a senior frontend developer based in Las Vegas, focused on code, design, and AI. Currently at Shipnetwork scaling prclworld.",
    },
  ];
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="min-h-screen bg-[#fbfaf6] p-4">
        <div className="flex items-end">
          <div className="mr-[5px] h-[58px] w-[58px]">
            <img
              src={profileImage}
              alt="Milton profile"
              className="h-full w-full border border-[#7a7a7a] object-cover"
            />
          </div>
          <div className="h-[58px] w-[210px]">
            <img
              src="/logo.svg"
              alt="Your Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        
        <div className="mt-6 font-['JetBrains_Mono'] text-[15px] font-normal leading-[19px] max-w-[600px] text-[#7a7a7a]">
          <p className="mb-4">
            I&apos;m a senior frontend developer with 8 years of corporate experience, focused on design &amp; code.
          </p>
          <p className="mb-4">
            Currently at <a href="https://www.shipnetwork.com" className="text-[#6975f8] hover:opacity-80">@shipnetwork</a>, as senior web developer scaling <a href="https://prcl.com" className="text-[#6975f8] hover:opacity-80">@prclworld</a>.
          </p>
          <p className="mb-4">
            On my free time, I stay active in the gym and eat healthy allowing me to create cool things with code at <a href="https://www.blurrdstudio.com" className="text-[#6975f8] hover:opacity-80">@blurrdstudio</a> and orchestrate AI at <a href="https://www.symphny.xyz" className="text-[#6975f8] hover:opacity-80">@symphny</a>.
          </p>
          <p className="mb-4">
            Outside of work, I spend quality time with my wife and daughter watching sports, eating good food, and traveling together.
          </p>
          <p>
            looking to work together? <a href="https://calendly.com/blurrd/15min?month=2025-01" className="text-[#6975f8] hover:opacity-80">Schedule a call</a> or shoot me an email: <a href="mailto:milton@blurrdstudio.com" className="text-[#6975f8] hover:opacity-80">milton@blurrdstudio.com</a>
          </p>
        </div>

        <BlogSection posts={posts} />
      </div>

      {/* Twitter Follow Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <a 
          href="https://twitter.com/miltonisblurrd" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition-colors"
        >
          <svg 
            className="w-4 h-4" 
            fill="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Follow</span>
        </a>
      </div>
    </>
  );
}
