import type { CaseSection } from "~/data/inspiredClosetsCase";

const p = (text: string) => ({ type: "p" as const, text });
const h3 = (text: string) => ({ type: "h3" as const, text });

export const shipNetworkSections: CaseSection[] = [
  {
    id: "overview",
    label: "Overview",
    kicker: "Overview",
    title: "Overview",
    blocks: [
      p("ShipNetwork needed more than a new website."),
      p("The company was shifting its marketing strategy from a primarily conversion-focused approach to one that placed greater emphasis on brand awareness, recognition, and building a more personal connection with its audience. That meant rethinking how the company presented itself across every customer touchpoint."),
      p("I helped develop a refreshed brand identity, establish a new visual direction, and translate that identity across digital and marketing materials. The work included stylescapes, branded templates for social media and documents, and a redesigned website."),
      p("I also rebuilt the website in Webflow across more than 100 pages, improving load times, CMS management, and the foundation for search and AI-driven discovery. The result was a more cohesive, people-focused brand experience with reusable assets to support future marketing."),
    ],
  },
  {
    id: "challenge",
    label: "01 / The Challenge",
    kicker: "01 / The Challenge",
    title: "The marketing strategy had changed. The brand needed to catch up.",
    blocks: [
      p("ShipNetwork's previous digital experience was built primarily around conversion. The website and supporting materials focused heavily on moving visitors toward specific actions."),
      p("As marketing shifted toward awareness and recognition, the brand needed a consistent visual language across its website, social media, documents, presentations, and campaigns. It also needed to feel more personal, emphasizing the people and relationships behind the business."),
      p("With more than 100 website pages, the challenge was applying the new direction consistently without sacrificing usability, performance, or maintainability."),
      p("The goal wasn't simply to make the brand look different. It was to change how people experienced it."),
    ],
  },
  {
    id: "identity",
    label: "02 / Establishing the New Identity",
    kicker: "02 / Establishing the New Identity",
    title: "Creating a visual direction the entire brand could follow.",
    blocks: [
      p("I helped develop a refreshed identity aligned with the new brand-awareness strategy. I explored visual directions and created stylescapes showing how typography, color, imagery, composition, and graphic elements could work together."),
      p("The stylescapes established a shared understanding before we applied the identity across individual assets. A major consideration was making the brand more approachable and human through people-focused imagery and more personal storytelling."),
      p("Rather than designing each deliverable independently, we established a visual foundation to guide the broader experience."),
      {
        type: "figure",
        src: "/case-studies/shipnetwork-stylescape.jpg",
        alt: "ShipNetwork stylescape showing type, color, imagery, and graphic elements across the brand.",
        scroll: true,
      },
    ],
  },
  {
    id: "experience",
    label: "03 / Building a Consistent Brand Experience",
    kicker: "03 / Building a Consistent Brand Experience",
    title: "Making the identity work beyond the website.",
    blocks: [
      p("Once the visual direction was established, I translated it into reusable social media graphics, branded documents, and marketing templates."),
      p("The goal was to make new materials faster to produce while maintaining consistency. Instead of starting from scratch, the team could use established layouts and patterns, with typography, color, imagery, and spacing that belonged to the same brand."),
      p("This turned the refreshed identity into a practical system for ongoing marketing."),
      {
        type: "figure",
        src: "/case-studies/shipnetwork-social.jpg",
        alt: "ShipNetwork ad designs and social media templates for promotions, memes, and testimonials.",
        scroll: true,
        tall: true,
      },
      {
        type: "figure",
        src: "/case-studies/shipnetwork-fulfillment.jpg",
        alt: "A ShipNetwork carousel explaining which fulfillment model fits a brand.",
        scroll: true,
      },
    ],
  },
  {
    id: "website",
    label: "04 / Redesigning the Website",
    kicker: "04 / Redesigning the Website",
    title: "Translating the new identity into a 100+ page experience.",
    blocks: [
      p("With the visual direction established, I redesigned the website as a connected experience rather than a collection of unrelated layouts."),
      p("The new typography, imagery, layouts, and visual elements needed to work across the homepage, service pages, and supporting content. We placed more emphasis on the people and relationships behind ShipNetwork, while still explaining services clearly and making the site easy to navigate."),
      p("The result was a more cohesive website that reflected the company's new marketing direction."),
      {
        type: "video",
        src: "/case-studies/shipnetwork-website.mp4",
        alt: "A walkthrough of the redesigned ShipNetwork website.",
      },
    ],
  },
  {
    id: "rebuild",
    label: "05 / Rebuilding the Website",
    kicker: "05 / Rebuilding the Website",
    title: "Taking the redesign from concept to production.",
    blocks: [
      p("My role extended beyond design. I rebuilt the website in Webflow, translating the new layouts and identity into a working experience across more than 100 pages."),
      {
        type: "video",
        src: "/case-studies/shipnetwork-webflow.mp4",
        alt: "A walkthrough of the ShipNetwork website rebuilt in Webflow.",
      },
      p("I used reusable layouts, components, and CMS-driven content structures to support different page types. This made content easier to manage and reduced the need to rebuild repeated elements."),
      p("The rebuild improved load times. Working across design and development also helped me keep the final implementation aligned with the intended visual direction."),
    ],
  },
  {
    id: "scale",
    label: "06 / Designing for Scale",
    kicker: "06 / Designing for Scale",
    title: "A consistent visual system across more than 100 pages.",
    blocks: [
      p("The identity needed to be recognizable whether someone encountered it on a homepage, service page, social graphic, or document."),
      p("Stylescapes and reusable templates established that consistency. In Webflow, components and CMS collections supported shared design patterns and easier updates across page types."),
      p("The same approach to branded marketing templates made ongoing production quicker and more consistent. The work created a foundation for future content and marketing needs, not just a one-time launch."),
      h3("Startup persona"),
      p("This page is for startup personas. It uses more creativity for a younger audience."),
      {
        type: "figure",
        src: "/case-studies/shipnetwork-ad-startup.jpg",
        alt: "A ShipNetwork ad page made for a startup persona.",
      },
      h3("Mid-level persona"),
      p("This page is for a mid-level persona, a younger executive looking for visuals and verbiage that connect with them."),
      {
        type: "figure",
        src: "/case-studies/shipnetwork-ad-midlevel.jpg",
        alt: "A ShipNetwork ad page made for a mid-level persona.",
      },
      h3("Enterprise persona"),
      p("This page is for an enterprise persona. It is tailored to executives used to a traditional layout, and it is more focused on verbiage."),
      {
        type: "figure",
        src: "/case-studies/shipnetwork-ad-enterprise.jpg",
        alt: "A ShipNetwork ad page made for an enterprise persona.",
      },
    ],
  },
  {
    id: "discovery",
    label: "07 / Building for Search and AI Discovery",
    kicker: "07 / Building for Search and AI Discovery",
    title: "Making the website easier to discover and understand.",
    blocks: [
      p("The rebuild also created an opportunity to improve how content was structured for discovery. Alongside traditional SEO, I considered Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) when organizing information and communicating services clearly."),
      p("This was about making the site's content more understandable and maintainable for traditional search and emerging AI-driven discovery, not claiming specific AI-search ranking gains."),
    ],
  },
  {
    id: "outcome",
    label: "08 / The Outcome",
    kicker: "08 / The Outcome",
    title: "A more cohesive identity and a stronger digital foundation.",
    blocks: [
      h3("A refreshed, more personal identity"),
      p("The visual direction placed greater emphasis on people, recognition, and connection."),
      h3("Faster, more consistent marketing production"),
      p("Reusable templates helped the team create social graphics and documents without starting from scratch."),
      h3("A redesigned and rebuilt 100+ page website"),
      p("The refreshed identity was carried across the site's page types."),
      h3("Improved performance and CMS management"),
      p("Faster load times, reusable components, and more organized content structures made the site easier to browse and maintain."),
      h3("A stronger discovery foundation"),
      p("Clearer content organization with AEO/GEO considerations informed the site's structure."),
    ],
  },
  {
    id: "reflection",
    label: "09 / Reflection",
    kicker: "09 / Reflection",
    title: "A brand refresh is bigger than a visual redesign.",
    blocks: [
      p("What made this project interesting was the scale of the transformation. A shift in marketing strategy affected the identity, supporting assets, and website experience."),
      p("I enjoyed working across those layers, from stylescapes to a production Webflow build. It reinforced how closely brand design, user experience, and frontend development are connected."),
      p("The goal wasn't just to make ShipNetwork look different. It was to create a recognizable, people-focused brand experience that could work consistently at scale."),
    ],
  },
];
