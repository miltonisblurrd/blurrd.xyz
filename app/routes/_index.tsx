import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { AboutGrid } from "~/components/AboutGrid";
import { WorkMarquee, WorkMarqueeRows } from "~/components/WorkMarquee";
import { caseStudies } from "~/data/caseStudies";
import profileImage from "../../69bf1a53c911272bf6b5ccdf_IMG_6481.jpg";
import rakutenLogo from "../../logos/Rakuten_Global_Brand_Logo.svg";
import mgmLogo from "../../logos/mgmresorts-com-brandmark.svg";
import shipnetworkLogo from "../../logos/66044fc18b856bf0cfde4953_ShipNetwork Logo-Horizontal-Blue and Black 2.svg";

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

const roleColors: Record<string, string> = {
  "Product Design + Product Engineering": "bg-[#dbeafe] text-[#2563eb]",
  "Product Design": "bg-[#dbeafe] text-[#2563eb]",
  "Product Engineering": "bg-[#e0e7ff] text-[#4f46e5]",
  "Back End Development": "bg-[#ccfbf1] text-[#0f766e]",
  "AI Integration": "bg-[#ede9fe] text-[#7c3aed]",
  "Brand Identity": "bg-[#ffedd5] text-[#d97706]",
  "Brand Strategy": "bg-[#ffedd5] text-[#ea580c]",
  "Visual Identity": "bg-[#fce7f3] text-[#db2777]",
  "Web Design": "bg-[#e0f2fe] text-[#0284c7]",
  "Frontend Engineering": "bg-[#d1fae5] text-[#059669]",
};

export default function Index() {
  return (
    <>
      <div className="min-h-screen bg-[#fbfaf6]">
        <div className="relative lg:min-h-screen">
          <div className="relative p-4 lg:min-h-screen lg:w-1/2">
            <div className="flex items-end">
              <div className="mr-[5px] h-[52px] w-[52px] md:h-[70px] md:w-[70px]">
                <img
                  src={profileImage}
                  alt="Milton profile"
                  className="h-full w-full border border-[#7a7a7a] object-cover"
                />
              </div>
              <div className="h-[52px] w-[188px] md:h-[70px]">
                <img
                  src="/logo.svg"
                  alt="Your Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="mt-6 max-w-[640px] text-left lg:absolute lg:left-4 lg:right-4 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2">
              <p className="mb-3 font-['JetBrains_Mono'] text-[12px] md:text-[13px] font-medium tracking-[0.14em] text-[#7a7a7a]">
                SENIOR PRODUCT ENGINEER
              </p>
              <h1 className="mb-4 font-['JetBrains_Mono'] text-[28px] md:text-[34px] font-medium leading-[1.2] text-[#1a1a1a]">
                I design and build products from the ground up, literally.
              </h1>
              <div className="font-['JetBrains_Mono'] text-[15px] md:text-[19px] font-normal leading-[1.55] text-[#7a7a7a]">
                <p>
                  I&apos;m a product engineer with 8+ years of experience. I work across full-stack engineering, product design, and AI. Turning ideas, data, and feedback into polished, production-ready experiences.
                </p>
              </div>
              <div className="mt-8">
                <p className="mb-3 font-['JetBrains_Mono'] text-[12px] text-[#7a7a7a]">
                  Worked for:
                </p>
                <div className="flex flex-nowrap items-center gap-x-3 sm:gap-x-6">
                  <img src={rakutenLogo} alt="Rakuten" className="h-[26px] w-auto" />
                  <img src={mgmLogo} alt="MGM Resorts" className="h-[24px] w-auto" />
                  <img src={shipnetworkLogo} alt="ShipNetwork" className="h-[13px] w-auto brightness-0 sm:h-[24px]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-1/2">
            <WorkMarquee />
          </div>
        </div>

        <section className="bg-black px-4 md:px-6" style={{ paddingTop: "6.5rem", paddingBottom: "6.5rem" }}>
          <h2 className="mb-6 font-['JetBrains_Mono'] text-[24px] font-medium leading-[1.2] text-white md:text-[28px]">
            Case Studies
          </h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {caseStudies.map((study) => {
              const favorite = study.slug === "inspired-closets";

              return (
                <Link
                  key={study.slug}
                  to={`/work/${study.slug}`}
                  className="group relative block"
                >
                  {favorite ? (
                    <span
                      className="pointer-events-none absolute inset-0 z-10"
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(255,255,255,0.95), 0 0 18px 2px rgba(255,255,255,0.5), 0 0 46px 8px rgba(255,255,255,0.22)",
                      }}
                    />
                  ) : null}
                  {favorite ? (
                    <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 bg-black px-3 font-['JetBrains_Mono'] text-[11px] tracking-[0.18em] text-white uppercase">
                      My Favorite
                    </span>
                  ) : null}
                  <span className="relative block overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className={`aspect-square w-full object-cover transition-transform duration-300 hover:scale-[1.03] md:aspect-[3/4]${favorite ? " object-[30%_center]" : ""}`}
                    />
                    <span className="pointer-events-none absolute inset-0 bg-black/45" />
                  </span>
                  <span className="pointer-events-none absolute bottom-3 left-3 z-20 flex max-w-[calc(100%-1.5rem)] flex-col items-start gap-2">
                    <span className="inline-flex w-fit items-center rounded-full bg-black px-4 py-2 font-['JetBrains_Mono'] text-[12px] text-white">
                      {study.title}
                      <span className="inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-1.5 group-hover:max-w-4 group-hover:opacity-100">
                        →
                      </span>
                    </span>
                    <span className="flex flex-wrap gap-1.5">
                      {study.role.split("·").map((role) => {
                        const label = role.trim();
                        return (
                          <span
                            key={label}
                            className={`rounded-full px-2.5 py-1 font-['JetBrains_Mono'] text-[11px] ${roleColors[label] ?? "bg-white text-black"}`}
                          >
                            {label}
                          </span>
                        );
                      })}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-[#fbfaf6] pt-10 md:pt-12">
          <WorkMarqueeRows />
        </section>

        <section className="bg-[#fbfaf6] px-4 py-16 md:py-12">
          <div className="mx-auto w-full max-w-[600px] border border-[#e5e5e5] bg-white p-6 md:p-4">
            <div className="mb-4 flex w-full items-center justify-between text-[12px] text-[#7a7a7a] md:mb-2">
              <span>Passion project</span>
              <span className="rounded bg-[#f0f0f0] px-2 py-0.5">engineering</span>
            </div>
            <h2 className="mb-4 font-['JetBrains_Mono'] text-[15px] font-normal leading-[1.55] text-black md:mb-2 md:text-[19px]">
              I built Afterwave so a Swift change has a blast radius an agent can actually read
            </h2>
            <div className="pb-8 font-['JetBrains_Mono'] text-[13px] font-normal leading-[20px] text-[#7a7a7a] md:pb-5 md:text-[17px] md:leading-[22px]">
              <p>
                Afterwave is a local Swift CLI that explains what a symbol can affect, labels compiler-index trust, and hands coding agents a JSON contract instead of a vibe.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/miltonisblurrd/Afterwave"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black px-4 py-2 font-['JetBrains_Mono'] text-[13px] text-white hover:bg-black/90"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Try it out today
              </a>
              <Link
                to="/blog/afterwave-blast-radius"
                className="font-['JetBrains_Mono'] text-[13px] text-[#6975f8] hover:opacity-80"
              >
                Read the write-up
              </Link>
            </div>
          </div>
        </section>

        <AboutGrid />
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
