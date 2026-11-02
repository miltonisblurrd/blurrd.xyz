import { useEffect, useRef } from "react";

import { HoloCard } from "~/components/HoloCard";
import { Ipod } from "~/components/Ipod";
import { ToolBubbles } from "~/components/ToolBubbles";
import profileImage from "../../69bf1a53c911272bf6b5ccdf_IMG_6481.jpg";

function SportsVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const play = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    if (video.getBoundingClientRect().top < window.innerHeight) play();

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-center"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Watching sports"
    >
      <source src="/about/sports.mp4" type="video/mp4" />
    </video>
  );
}

export function AboutGrid() {
  return (
    <section className="bg-[#fbfaf6] px-4 pb-12 md:pb-16">
      <h2 className="mb-6 font-['JetBrains_Mono'] text-[24px] font-medium leading-[1.2] text-[#1a1a1a] md:text-[28px]">
        About Me
      </h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <article className="flex flex-col justify-between border border-[#e5e5e5] bg-[#171717] p-5 text-white md:col-span-3 md:row-span-2">
          <div>
            <img
              src={profileImage}
              alt="Milton Amaya"
              className="mb-4 h-14 w-14 rounded-full border border-white/20 object-cover"
            />
            <h3 className="font-['JetBrains_Mono'] text-[20px] leading-tight">Milton Amaya</h3>
            <p className="mt-1 font-['JetBrains_Mono'] text-[12px] text-white/60">Father. Husband. Creator.</p>
            <p className="mt-4 font-['JetBrains_Mono'] text-[13px] leading-[1.5] text-white/75">
              I love creating things. My toddler and my wife keep me balanced, and music and sports are where the inspiration comes from.
            </p>
          </div>
          <a
            href="mailto:milton@blurrdstudio.com"
            className="mt-6 w-fit rounded-full bg-white/10 px-3 py-1.5 font-['JetBrains_Mono'] text-[12px] text-white hover:bg-white/20"
          >
            milton@blurrdstudio.com
          </a>
        </article>

        <article className="relative z-10 min-h-[420px] md:col-span-2 md:row-span-2">
          <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 md:w-[calc(150%+0.375rem)]">
            <Ipod />
          </div>
        </article>

        <figure className="relative h-full min-h-[320px] overflow-hidden border border-[#e5e5e5] bg-[#1c1c1c] md:col-span-7 md:row-span-2">
          <SportsVideo />
          <figcaption className="absolute bottom-3 left-3 w-fit max-w-[calc(100%-1.5rem)] rounded-full bg-black/70 px-4 py-2 font-['JetBrains_Mono'] text-[12px] text-white">
            I love watching sports, especially the Red Sox
          </figcaption>
        </figure>

        <article className="overflow-hidden border border-[#e5e5e5] bg-[#f6f3ec] md:col-span-3">
          <ToolBubbles />
        </article>

        <figure className="relative aspect-square w-full overflow-hidden border border-[#e5e5e5] md:aspect-auto md:col-span-3 md:h-full md:min-h-[160px]">
          <img
            src="/about/family.jpg"
            alt="Family"
            className="absolute inset-0 h-full w-full origin-center scale-125 object-cover object-[center_62%]"
          />
          <figcaption className="absolute bottom-3 left-3 w-fit max-w-[calc(100%-1.5rem)] rounded-full bg-black/70 px-4 py-2 font-['JetBrains_Mono'] text-[12px] text-white">
            Family first.
          </figcaption>
        </figure>

        <figure className="relative aspect-square overflow-hidden border border-[#e5e5e5] bg-[#f3efe6] md:aspect-auto md:col-span-4 md:h-full md:min-h-[160px]">
          <img
            src="/about/husband-wife.jpg"
            alt="Husband and wife"
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
          />
          <figcaption className="absolute bottom-3 left-3 w-fit max-w-[calc(100%-1.5rem)] rounded-full bg-black/70 px-4 py-2 font-['JetBrains_Mono'] text-[12px] text-white">
            Husband and wife
          </figcaption>
        </figure>

        <HoloCard />
      </div>
    </section>
  );
}
