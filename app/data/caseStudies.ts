export type CaseStudy = {
  slug: string;
  title: string;
  headline: string;
  summary: string;
  image: string;
  role: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "inspired-closets",
    title: "Inspired Closets",
    headline: "I was asked to build an AI dashboard. I built an entire operating system instead.",
    summary:
      "A connected platform for daily operations, now used by 19 team members across scheduling, inventory, and field work.",
    image: "/case-studies/inspired-closets.jpg",
    role: "Product Design + Product Engineering · Back End Development · AI Integration",
  },
  {
    slug: "how-much-hvac",
    title: "How Much HVAC",
    headline: "I built the brand, the website, and the operating system behind the business.",
    summary:
      "From a brand identity and website to a live platform for leads, appointments, payments, and field operations.",
    image: "/case-studies/how-much-hvac.jpg",
    role: "Brand Identity · Product Design · Back End Development · Product Engineering",
  },
  {
    slug: "shipnetwork",
    title: "ShipNetwork",
    headline: "We didn't just redesign the website. We redefined how the brand showed up.",
    summary:
      "A shift from conversion-focused marketing to brand awareness, carried through a refreshed identity and a rebuilt 100+ page website.",
    image: "/case-studies/shipnetwork.jpg",
    role: "Brand Strategy · Visual Identity · Web Design · Frontend Engineering",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
