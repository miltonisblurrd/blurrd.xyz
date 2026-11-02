import { useEffect, useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { caseStudies, getCaseStudy } from "~/data/caseStudies";
import { inspiredClosetsSections, type CaseBlock, type CaseSection } from "~/data/inspiredClosetsCase";
import { howMuchHvacSections } from "~/data/howMuchHvacCase";
import { shipNetworkSections } from "~/data/shipNetworkCase";
import { ShotLightbox, WorkMarqueeRow } from "~/components/WorkMarquee";
import profileImage from "../../69bf1a53c911272bf6b5ccdf_IMG_6481.jpg";

type StatusLine = { label?: string; text: string; href?: string };

type DetailedPage = {
  kicker: string;
  dek: string;
  role: string;
  stack: string;
  status: StatusLine[];
  shots: { src: string; alt: string }[];
  sections: CaseSection[];
};

function shots(src: string, alts: string[]) {
  return alts.map((alt) => ({ src, alt }));
}

const detailedPages: Record<string, DetailedPage> = {
  "inspired-closets": {
    kicker: "INSPIRED CLOSETS",
    dek: "How a simple dashboard request became a connected platform powering daily operations for 19 team members.",
    role: "Product Design + Product Engineering · Back End Development · AI Integration",
    stack: "Next.js, React, TypeScript, Cursor, Supabase, Drizzle ORM, Vercel, Claude, OpenAI",
    status: [
      { label: "Website:", text: "https://www.inspiredclosets.com/", href: "https://www.inspiredclosets.com/" },
      { label: "OS:", text: "https://iclv.app/", href: "https://iclv.app/" },
    ],
    shots: [
      { src: "/case-studies/inspired/header.jpg", alt: "Inspired Closets lifestyle closet" },
      { src: "/case-studies/inspired/projects.png", alt: "Inspired Closets projects" },
      { src: "/case-studies/inspired/boutique.jpg", alt: "Inspired Closets boutique closet" },
      { src: "/case-studies/inspired/inventory.png", alt: "Inspired Closets inventory" },
      { src: "/case-studies/inspired/walk-in.jpg", alt: "Inspired Closets walk-in closet" },
      { src: "/case-studies/inspired/calendar.png", alt: "Inspired Closets calendar" },
      { src: "/case-studies/inspired/showroom.jpg", alt: "Inspired Closets showroom" },
      { src: "/case-studies/inspired/payments.png", alt: "Inspired Closets payments" },
    ],
    sections: inspiredClosetsSections,
  },
  "how-much-hvac": {
    kicker: "HOW MUCH HVAC",
    dek: "From creating a brand identity to developing a connected platform that manages leads, customer relationships, service appointments, payments, and field operations.",
    role: "Brand Identity · Product Design · Back End Development · Product Engineering",
    stack: "Next.js, TypeScript, Supabase, Stripe, QuickBooks, Vercel",
    status: [
      { label: "Website:", text: "https://www.trusthowmuch.com/", href: "https://www.trusthowmuch.com/" },
      { label: "Admin Portal:", text: "https://www.trusthowmuch.com/admin/login", href: "https://www.trusthowmuch.com/admin/login" },
      { label: "Client Portal:", text: "https://www.trusthowmuch.com/portal/login", href: "https://www.trusthowmuch.com/portal/login" },
    ],
    shots: [
      { src: "/case-studies/how-much/carousel-van.png", alt: "How Much HVAC service van" },
      { src: "/case-studies/how-much/carousel-home.jpg", alt: "How Much HVAC homepage and quote form" },
      { src: "/case-studies/how-much/carousel-family.webp", alt: "The How Much HVAC family in front of the van" },
      { src: "/case-studies/how-much/carousel-services.jpg", alt: "How Much HVAC services page" },
      { src: "/case-studies/how-much/carousel-van-mark.png", alt: "How Much HVAC logo on the van" },
      { src: "/case-studies/how-much/carousel-products.jpg", alt: "How Much HVAC equipment shop" },
      { src: "/case-studies/how-much/carousel-dashboard.jpg", alt: "How Much HVAC owner dashboard" },
      { src: "/case-studies/how-much/carousel-job.jpg", alt: "How Much HVAC job record" },
      { src: "/case-studies/how-much/carousel-invoices.jpg", alt: "How Much HVAC invoices" },
      { src: "/case-studies/how-much/carousel-portal.jpg", alt: "How Much HVAC customer portal" },
      { src: "/case-studies/how-much/carousel-portal-job.jpg", alt: "How Much HVAC customer job details" },
    ],
    sections: howMuchHvacSections,
  },
  shipnetwork: {
    kicker: "SHIPNETWORK",
    dek: "How a shift from conversion-focused marketing to brand awareness led to a refreshed identity, a more human-centered digital experience, and the redesign and rebuild of a 100+ page website.",
    role: "Brand Strategy · Visual Identity · Web Design · Frontend Engineering",
    stack: "Webflow, Figma",
    status: [
      { label: "Website:", text: "https://www.shipnetwork.com/", href: "https://www.shipnetwork.com/" },
    ],
    shots: [
      { src: "/case-studies/shipnetwork-ecosystem.jpg", alt: "ShipNetwork ecommerce integrations" },
      { src: "/case-studies/shipnetwork-team.jpg", alt: "ShipNetwork team across the country" },
      { src: "/case-studies/shipnetwork-services.jpg", alt: "ShipNetwork 3PL services" },
      { src: "/case-studies/shipnetwork-platform.jpg", alt: "ShipNetwork technology and support" },
      { src: "/case-studies/shipnetwork-priority.jpg", alt: "ShipNetwork priority shipping" },
      { src: "/case-studies/shipnetwork-map.jpg", alt: "ShipNetwork warehouse shipping map" },
      { src: "/case-studies/shipnetwork-brands.jpg", alt: "ShipNetwork shopping cart integrations" },
      { src: "/case-studies/shipnetwork-wms.jpg", alt: "ShipNetwork warehouse dashboard" },
    ],
    sections: shipNetworkSections,
  },
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.study) {
    return [{ title: "Case study not found" }];
  }

  return [
    { title: `${data.study.title} | miltonisblurrd` },
    { name: "description", content: data.study.summary },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const study = params.slug ? getCaseStudy(params.slug) : undefined;

  if (!study) {
    throw new Response("Not Found", { status: 404 });
  }

  return { study };
}

function ZoomImage({
  src,
  alt,
  className,
  onOpen,
}: {
  src: string;
  alt: string;
  className: string;
  onOpen?: () => void;
}) {
  return (
    <button type="button" onClick={onOpen} aria-label={`Open ${alt}`} className="block cursor-zoom-in text-left">
      <img src={src} alt={alt} className={className} />
    </button>
  );
}

function Block({ block, onOpen }: { block: CaseBlock; onOpen?: () => void }) {
  if (block.type === "h3") {
    return (
      <h3 className="case-h mt-8 font-['JetBrains_Mono'] text-[15px] font-bold text-[#1d4ed8] md:text-[17px]">
        {block.text}
      </h3>
    );
  }

  if (block.type === "figure") {
    if (block.scroll) {
      return (
        <figure className="mt-6">
          <div className="overflow-x-auto border border-[#e5e5e5]">
            <ZoomImage
              src={block.src}
              alt={block.alt}
              onOpen={onOpen}
              className={
                block.tall
                  ? "h-[520px] w-auto max-w-none md:h-[680px]"
                  : "h-[280px] w-auto max-w-none md:h-[420px]"
              }
            />
          </div>
        </figure>
      );
    }
    if (block.pan) {
      return (
        <figure className="mt-6">
          <div className="overflow-x-auto border border-[#e5e5e5] md:overflow-visible md:border-0">
            <ZoomImage
              src={block.src}
              alt={block.alt}
              onOpen={onOpen}
              className="h-[420px] w-auto max-w-none md:h-auto md:w-full md:border md:border-[#e5e5e5]"
            />
          </div>
        </figure>
      );
    }
    return (
      <figure className="mt-6">
        <ZoomImage src={block.src} alt={block.alt} onOpen={onOpen} className="w-full border border-[#e5e5e5]" />
      </figure>
    );
  }

  if (block.type === "video") {
    return (
      <figure className="mt-6">
        <video
          src={block.src}
          aria-label={block.alt}
          className="w-full border border-[#e5e5e5]"
          controls
          playsInline
          muted
          loop
        />
      </figure>
    );
  }

  return (
    <p className="mt-4 max-w-full font-['JetBrains_Mono'] text-[15px] leading-[1.65] text-[#3a3a3a] [overflow-wrap:anywhere] [[.case-h]+&]:mt-1.5 md:text-[17px]">
      {block.text ===
      "I went from designing a dashboard to proposing, designing, and engineering an operating system that supports nearly every part of the company's daily operations." ? (
        <>
          I went from{" "}
          <span className="relative inline-block whitespace-nowrap">
            designing a dashboard
            <svg
              className="pointer-events-none absolute -bottom-[0.28em] left-[-3%] h-[0.55em] w-[106%]"
              viewBox="0 0 200 14"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M3 8.2 C 22 5.4, 38 11.4, 62 7.6 S 98 4.2, 124 8.8 S 158 11.2, 178 6.8 C 186 5.4, 192 7.2, 197 7.6"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="220"
                strokeDashoffset="220"
                className="marker-draw"
              />
            </svg>
          </span>{" "}
          to proposing,{" "}
          <span className="relative isolate inline-block">
            <span className="marker-highlight" aria-hidden="true" />
            <span className="relative z-10">designing, and engineering</span>
          </span>{" "}
          an{" "}
          <span className="relative isolate inline-block">
            <span className="marker-highlight marker-highlight-next" aria-hidden="true" />
            <span className="relative z-10">operating system</span>
          </span>{" "}
          that supports nearly every part of the company's daily operations.
        </>
      ) : (
        block.text
      )}
    </p>
  );
}

export default function CaseStudyPage() {
  const { study } = useLoaderData<typeof loader>();
  const page = detailedPages[study.slug];
  const [activeId, setActiveId] = useState(page?.sections[0]?.id ?? "");
  const [openFigure, setOpenFigure] = useState<number | null>(null);
  const figures =
    page?.sections.flatMap((section) => section.blocks.filter((block) => block.type === "figure")) ?? [];

  useEffect(() => {
    if (!page) return;

    setActiveId(page.sections[0]?.id ?? "");

    const nodes = page.sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id) setActiveId(id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [page]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbfaf6] px-4 py-6 md:px-8 md:py-10">
      <Link to="/" className="mb-8 flex w-fit items-end">
        <span className="mr-[5px] h-[52px] w-[52px] md:h-[70px] md:w-[70px]">
          <img
            src={profileImage}
            alt="Milton profile"
            className="h-full w-full border border-[#7a7a7a] object-cover"
          />
        </span>
        <span className="h-[52px] w-[188px] md:h-[70px]">
          <img src="/logo.svg" alt="miltonisblurrd" className="h-full w-full object-contain" />
        </span>
      </Link>
      {page ? (
        <>
        <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[200px_minmax(0,1fr)]">
          <aside className="z-30 min-w-0 lg:sticky lg:top-6 lg:self-start lg:bg-[#fbfaf6]/75 lg:backdrop-blur-md">
            <Link to="/" className="font-['JetBrains_Mono'] text-[13px] text-[#6975f8] hover:opacity-80">
              ← Back
            </Link>
            <div className="hidden lg:block">
            <p className="mb-3 mt-8 font-['JetBrains_Mono'] text-[11px] tracking-[0.14em] text-[#7a7a7a]">CONTENTS</p>
            <nav className="space-y-2">
              {page.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block font-['JetBrains_Mono'] text-[13px] hover:text-[#1a1a1a] ${
                    activeId === section.id ? "text-[#2563eb]" : "text-[#3a3a3a]"
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
            </div>
          </aside>

          <article className="min-w-0">
            <div className="w-full max-w-[720px]">
            <p className="font-['JetBrains_Mono'] text-[12px] tracking-[0.14em] text-[#7a7a7a]">{page.kicker}</p>
            <h1 className="mt-3 font-['JetBrains_Mono'] text-[24px] font-medium leading-[1.3] text-[#1a1a1a] md:text-[40px]">
              {study.headline}
            </h1>
            <p className="mt-4 font-['JetBrains_Mono'] text-[15px] leading-[1.55] text-[#5a5a5a] md:text-[18px]">
              {study.slug === "inspired-closets" ? (
                <>
                  How a simple dashboard request became a connected platform powering{" "}
                  <span className="relative isolate inline-block">
                    <span className="marker-highlight" aria-hidden="true" />
                    <span className="relative z-10">daily operations</span>
                  </span>{" "}
                  for{" "}
                  <span className="relative inline-block whitespace-nowrap">
                    19 team members
                    <svg
                      className="pointer-events-none absolute -bottom-[0.28em] left-[-3%] h-[0.55em] w-[106%]"
                      viewBox="0 0 200 14"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8.2 C 22 5.4, 38 11.4, 62 7.6 S 98 4.2, 124 8.8 S 158 11.2, 178 6.8 C 186 5.4, 192 7.2, 197 7.6"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="220"
                        strokeDashoffset="220"
                        className="marker-draw"
                      />
                    </svg>
                  </span>
                  .
                </>
              ) : study.slug === "how-much-hvac" ? (
                <>
                  From creating a brand identity to developing a{" "}
                  <span className="relative isolate inline-block">
                    <span className="marker-highlight" aria-hidden="true" />
                    <span className="relative z-10">connected platform</span>
                  </span>{" "}
                  that manages{" "}
                  {(
                    [
                      "leads,",
                      "customer relationships,",
                      "service appointments,",
                      "payments,",
                      "and",
                      "field operations.",
                    ] as const
                  ).map((word, index) => (
                    <span key={word}>
                      {index > 0 ? " " : null}
                      {word === "and" ? (
                        word
                      ) : (
                        <span className="relative inline-block whitespace-nowrap">
                          {word}
                          <svg
                            className="pointer-events-none absolute -bottom-[0.28em] left-[-3%] h-[0.55em] w-[106%]"
                            viewBox="0 0 200 14"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M3 8.2 C 22 5.4, 38 11.4, 62 7.6 S 98 4.2, 124 8.8 S 158 11.2, 178 6.8 C 186 5.4, 192 7.2, 197 7.6"
                              fill="none"
                              stroke="#2563eb"
                              strokeWidth="3.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeDasharray="220"
                              strokeDashoffset="220"
                              className="marker-draw"
                              style={{ animationDelay: `${2.7 + index * 0.12}s` }}
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  ))}
                </>
              ) : study.slug === "shipnetwork" ? (
                <>
                  How a shift from{" "}
                  <span className="relative isolate inline-block">
                    <span className="marker-highlight" aria-hidden="true" />
                    <span className="relative z-10">conversion-focused</span>
                  </span>{" "}
                  marketing to{" "}
                  <span className="relative isolate inline-block">
                    <span className="marker-highlight marker-highlight-next" aria-hidden="true" />
                    <span className="relative z-10">brand awareness</span>
                  </span>{" "}
                  led to a refreshed identity, a more human-centered digital experience, and the redesign and rebuild of a{" "}
                  <span className="relative inline-block whitespace-nowrap">
                    100+ page website
                    <svg
                      className="pointer-events-none absolute -bottom-[0.28em] left-[-3%] h-[0.55em] w-[106%]"
                      viewBox="0 0 200 14"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8.2 C 22 5.4, 38 11.4, 62 7.6 S 98 4.2, 124 8.8 S 158 11.2, 178 6.8 C 186 5.4, 192 7.2, 197 7.6"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="220"
                        strokeDashoffset="220"
                        className="marker-draw marker-draw-late"
                      />
                    </svg>
                  </span>
                  .
                </>
              ) : (
                page.dek
              )}
            </p>
            <p className="mt-6 font-['JetBrains_Mono'] text-[12px] tracking-[0.14em] text-[#7a7a7a]">Role in this project:</p>
            <p className="mt-1 font-['JetBrains_Mono'] text-[13px] leading-[1.45] text-[#1a1a1a]">
              {page.role}
            </p>
            <dl className="mt-4 grid gap-x-10 gap-y-4 border border-[#e5e5e5] bg-white p-4 md:grid-cols-2">
              <div className="min-w-0">
                <dt className="font-['JetBrains_Mono'] text-[11px] text-[#7a7a7a]">Tech stack</dt>
                <dd className="mt-1 break-words font-['JetBrains_Mono'] text-[13px] text-[#1a1a1a]">{page.stack}</dd>
              </div>
              <div>
                <dt className="font-['JetBrains_Mono'] text-[11px] text-[#7a7a7a]">Status</dt>
                <dd className="mt-1 break-words font-['JetBrains_Mono'] text-[13px] leading-[1.45] text-[#1a1a1a]">
                  {page.status.map((line) => (
                    <span key={line.text} className="block">
                      {line.label ? (
                        <>
                          {line.label}
                          <br />
                        </>
                      ) : null}
                      {line.href ? (
                        <a href={line.href} className="text-[#2563eb] underline underline-offset-2">
                          {line.text}
                        </a>
                      ) : (
                        line.text
                      )}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            </div>
          </article>

          <div className="relative z-0 -mx-4 min-w-0 md:-mx-8 lg:col-span-2">
            <WorkMarqueeRow items={page.shots} />
          </div>

          <div className="hidden lg:block" />

          <div className="w-full min-w-0 max-w-[720px]">
            {page.sections.map((section) => (
              <section key={section.id} id={section.id} className="mt-12 scroll-mt-8 border-t border-[#e5e5e5] pt-10">
                <p className="font-['JetBrains_Mono'] text-[12px] tracking-[0.08em] text-[#7a7a7a]">{section.kicker}</p>
                {section.id === "overview" ? null : (
                  <h2 className="mt-3 font-['JetBrains_Mono'] text-[22px] font-medium leading-[1.3] text-[#1a1a1a] md:text-[28px]">
                    {section.title}
                  </h2>
                )}
                {section.blocks.map((block, index) => {
                  const figureIndex =
                    block.type === "figure"
                      ? page.sections
                          .slice(0, page.sections.indexOf(section))
                          .reduce((count, item) => count + item.blocks.filter((entry) => entry.type === "figure").length, 0) +
                        section.blocks.slice(0, index).filter((entry) => entry.type === "figure").length
                      : -1;
                  return (
                    <Block
                      key={`${section.id}-${index}`}
                      block={block}
                      onOpen={figureIndex >= 0 ? () => setOpenFigure(figureIndex) : undefined}
                    />
                  );
                })}
              </section>
            ))}
          </div>

          <section className="mt-16 border-t border-[#e5e5e5] pt-10 lg:col-span-2">
            <p className="mb-4 font-['JetBrains_Mono'] text-[12px] tracking-[0.14em] text-[#7a7a7a]">MORE CASE STUDIES</p>
            <div className="grid gap-4 md:grid-cols-2">
              {caseStudies
                .filter((item) => item.slug !== study.slug)
                .map((item) => (
                  <Link key={item.slug} to={`/work/${item.slug}`} className="border border-[#e5e5e5] bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`aspect-[16/9] w-full object-cover${item.slug === "inspired-closets" ? " object-[30%_center]" : ""}`}
                    />
                    <div className="p-4">
                      <p className="font-['JetBrains_Mono'] text-[13px] text-[#7a7a7a]">{item.title}</p>
                      <p className="mt-2 font-['JetBrains_Mono'] text-[16px] leading-[1.35] text-[#1a1a1a]">{item.headline}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>
        {openFigure !== null ? (
          <ShotLightbox
            items={figures}
            index={openFigure}
            onClose={() => setOpenFigure(null)}
            onIndex={setOpenFigure}
          />
        ) : null}
        </>
      ) : (
        <>
          <Link to="/" className="font-['JetBrains_Mono'] text-[13px] text-[#6975f8] hover:opacity-80">
            ← Back
          </Link>
          <article className="mx-auto mt-10 max-w-[760px]">
            <p className="mb-3 font-['JetBrains_Mono'] text-[12px] tracking-[0.14em] text-[#7a7a7a]">
              {study.title.toUpperCase()}
            </p>
            <h1 className="font-['JetBrains_Mono'] text-[32px] font-medium leading-[1.2] text-[#1a1a1a] md:text-[40px]">
              {study.headline}
            </h1>
            <p className="mt-6 font-['JetBrains_Mono'] text-[15px] leading-[1.55] text-[#7a7a7a] md:text-[19px]">
              {study.summary}
            </p>
            <p className="mt-4 font-['JetBrains_Mono'] text-[13px] text-[#7a7a7a]">{study.role}</p>
          </article>
        </>
      )}
    </div>
  );
}
