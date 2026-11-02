export type CaseBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "figure"; src: string; alt: string; scroll?: boolean; tall?: boolean; pan?: boolean }
  | { type: "video"; src: string; alt: string };

export type CaseSection = {
  id: string;
  label: string;
  kicker: string;
  title: string;
  blocks: CaseBlock[];
};

export const inspiredClosetsSections: CaseSection[] = [
  {
    id: "overview",
    label: "Overview",
    kicker: "Overview",
    title: "Overview",
    blocks: [
      {
        type: "p",
        text: "What started as a request for an AI-powered dashboard turned into a complete rethink of how Inspired Closets managed its business.",
      },
      {
        type: "p",
        text: "The company was operating across disconnected software, spreadsheets, Google Calendar, physical whiteboards, and paper-based workflows. Important information lived in different places, making it difficult for employees to stay aligned and for management to get a clear picture of the business.",
      },
      {
        type: "p",
        text: "As I started working on the dashboard, I realized the problem wasn't how the data was being displayed. It was how the data was being collected, managed, and shared.",
      },
      {
        type: "figure",
        src: "/case-studies/inspired/dashboard.jpg",
        alt: "The Inspired Closets dashboard. Client names, account details, and figures are blurred.",
        pan: true,
      },
      {
        type: "p",
        text: "Rather than building another tool on top of disconnected systems, I proposed designing and developing a custom operating system that could bring their daily operations together.",
      },
      {
        type: "p",
        text: "I took ownership of the product direction, design, and engineering, building a centralized platform that now supports 19 team members across multiple departments.",
      },
      {
        type: "p",
        text: "The result is a live operating system that has improved scheduling, inventory visibility, field operations, and management oversight while creating a stronger foundation for AI-powered insights.",
      },
    ],
  },
  {
    id: "challenge",
    label: "01 / The Challenge",
    kicker: "01 / The Challenge",
    title: "The dashboard wasn't the real problem.",
    blocks: [
      {
        type: "p",
        text: "The owner originally reached out about creating a dashboard that would provide better visibility into the company through business metrics and AI-powered insights.",
      },
      {
        type: "p",
        text: "The initial idea was straightforward: pull information from an existing Excel spreadsheet, organize it into a dashboard, and use AI to help identify trends and opportunities.",
      },
      {
        type: "p",
        text: "But once I started understanding how the company actually operated, I discovered a much larger problem.",
      },
      {
        type: "p",
        text: "Their data was fragmented across multiple systems that didn't communicate with each other.",
      },
      {
        type: "figure",
        src: "/case-studies/inspired/one-job.jpg",
        alt: "One job, many copies on the spreadsheet compared with one job, one record in the operating system.",
        pan: true,
      },
      { type: "h3", text: "Franchise CRM" },
      {
        type: "p",
        text: "The company relied on a franchise-provided CRM that restricted external API access. That meant important lead and customer information couldn't simply be pulled into a custom dashboard.",
      },
      { type: "h3", text: "The spreadsheet" },
      {
        type: "p",
        text: "An Excel spreadsheet was used to manage much of the company's operations, but it required manual updates and was difficult for anyone other than the general manager maintaining it to understand.",
      },
      {
        type: "figure",
        src: "/case-studies/inspired/spreadsheet.jpg",
        alt: "The Excel job tracker Inspired Closets used before the operating system. Client names, designer names, and dollar amounts are blurred.",
        pan: true,
      },
      { type: "h3", text: "Scheduling" },
      {
        type: "p",
        text: "Scheduling was another challenge. Designers used Google Calendar, while installers relied on a physical whiteboard. Every time schedules changed, someone had to update the board and send photos to the team.",
      },
      { type: "h3", text: "Inventory" },
      {
        type: "p",
        text: "The warehouse didn't have a dedicated inventory management system. With limited visibility into available materials, the business risked purchasing expensive inventory it already had in stock.",
      },
      { type: "h3", text: "Installers" },
      {
        type: "p",
        text: "Installers also relied heavily on printed job packets and paper-based material lists to prepare for their daily assignments.",
      },
      {
        type: "p",
        text: "All of this created the same underlying issue: information was scattered, workflows depended on manual coordination, and there wasn't a reliable way to see how the business was performing as a whole.",
      },
      {
        type: "p",
        text: "Building an AI dashboard on top of incomplete data wasn't going to solve that. The company needed a better foundation first.",
      },
    ],
  },
  {
    id: "solution",
    label: "02 / Rethinking the Solution",
    kicker: "02 / Rethinking the Solution",
    title: "Instead of building another dashboard, I proposed rebuilding the workflow behind it.",
    blocks: [
      {
        type: "p",
        text: "Once I understood the limitations of the existing systems, I proposed a different direction.",
      },
      {
        type: "p",
        text: "Rather than trying to connect every disconnected tool, I suggested building a custom operating system alongside the company's existing franchise software.",
      },
      {
        type: "p",
        text: "The franchise CRM would remain in place for corporate requirements. The new platform would give the local business more control over its internal operations without depending on restricted third-party integrations.",
      },
      { type: "h3", text: "One connected environment" },
      {
        type: "p",
        text: "The goal was to create one connected environment for managing leads, projects, scheduling, payments, inventory, warehouse receiving, and employee workflows.",
      },
      {
        type: "p",
        text: "This meant replacing the operational spreadsheet with structured project data, moving scheduling into the platform, introducing proper inventory tracking, and creating dedicated experiences for designers and installers.",
      },
      {
        type: "p",
        text: "More importantly, these features wouldn't operate independently. They would share information.",
      },
      { type: "h3", text: "Shared information" },
      {
        type: "p",
        text: "When a project was updated, the relevant details could be available across the system. When a schedule changed, employees could see the update. When materials were received or allocated, inventory records could reflect those movements.",
      },
      {
        type: "p",
        text: "And because more of the company's operational information would live in one connected platform, the dashboards and AI features could work with a much broader view of the business.",
      },
      {
        type: "p",
        text: "The original dashboard request became part of a larger product rather than the entire product itself.",
      },
    ],
  },
  {
    id: "experience",
    label: "03 / Designing the Experience",
    kicker: "03 / Designing the Experience",
    title: "One platform, built for the people actually using it.",
    blocks: [
      {
        type: "p",
        text: "The system needed to support several departments with very different responsibilities.",
      },
      { type: "h3", text: "What each team needed" },
      {
        type: "p",
        text: "Management needed visibility into operations and business performance. Designers needed access to leads, projects, and appointments. Installers needed their schedules, job details, and material information while working in the field. Warehouse employees needed a reliable way to track inventory, receive shipments, and manage materials.",
      },
      { type: "h3", text: "Different workflows" },
      {
        type: "p",
        text: "Trying to give everyone the same interface wouldn't make sense.",
      },
      {
        type: "p",
        text: "I designed the product around these different workflows, creating a central operating system for management and dedicated portals for designers and installers.",
      },
      {
        type: "p",
        text: "The challenge wasn't simply organizing features into navigation tabs. It was understanding what information each person needed, when they needed it, and how their work affected other parts of the business.",
      },
      {
        type: "p",
        text: "That approach shaped the product's structure and the relationships between its modules.",
      },
    ],
  },
  {
    id: "operating-system",
    label: "04 / Building the Operating System",
    kicker: "04 / Building the Operating System",
    title: "Connecting the business from lead to installation.",
    blocks: [
      { type: "h3", text: "CRM & Project Management" },
      {
        type: "p",
        text: "I built a centralized CRM and project management system for tracking leads, customers, project details, progress, and operational information.",
      },
      {
        type: "p",
        text: "This replaced much of the company's reliance on a manually maintained Excel spreadsheet and made information easier for managers and employees to access.",
      },
      {
        type: "p",
        text: "Instead of important project details living in a document understood primarily by one person, they became part of a structured system that could support multiple workflows.",
      },
      {
        type: "video",
        src: "/case-studies/inspired/projects.mp4",
        alt: "The Inspired Closets projects list and a job record. Client names, designer names, addresses, and dollar amounts are blurred.",
      },
      { type: "h3", text: "Scheduling & Field Operations" },
      {
        type: "p",
        text: "Scheduling was one of the most immediate opportunities for improvement.",
      },
      {
        type: "p",
        text: "Previously, installers depended on a whiteboard and photos sent to their phones. If something changed, the updated information had to be communicated manually.",
      },
      {
        type: "p",
        text: "I created a scheduling system connected to the designer and installer portals.",
      },
      {
        type: "p",
        text: "Assignments and schedule changes can now be accessed through the platform on a phone or computer, giving field teams a more reliable way to stay updated.",
      },
      {
        type: "p",
        text: "Management also has a centralized view of scheduling rather than maintaining separate calendars and physical boards.",
      },
      {
        type: "video",
        src: "/case-studies/inspired/scheduling.mp4",
        alt: "The Inspired Closets calendar and install schedule. Client names and job details are blurred.",
      },
      { type: "h3", text: "Inventory & Warehouse Management" },
      {
        type: "p",
        text: "Inventory was one of the company's biggest operational blind spots.",
      },
      {
        type: "p",
        text: "As a luxury closet design company, the materials they work with can be expensive. Without a clear understanding of what was already available, the company risked ordering items unnecessarily.",
      },
      {
        type: "p",
        text: "I built an inventory management system that tracks materials, quantities, stock movements, and project-related inventory.",
      },
      {
        type: "p",
        text: "I also created receiving and scanning workflows to help warehouse employees record incoming shipments and connect materials to inventory records.",
      },
      {
        type: "p",
        text: "This gave the company visibility into what it had, what was coming in, and what was associated with specific projects.",
      },
      {
        type: "p",
        text: "Rather than relying on assumptions or manually checking the warehouse, employees now have a central place to review inventory information.",
      },
      {
        type: "video",
        src: "/case-studies/inspired/inventory.mp4",
        alt: "The Inspired Closets inventory list.",
      },
      { type: "h3", text: "Installer Portal" },
      {
        type: "p",
        text: "The installer experience was another major part of the project.",
      },
      {
        type: "p",
        text: "Before the platform, installers relied on printed job packets, paper material lists, and whiteboard schedules.",
      },
      {
        type: "p",
        text: "I created a dedicated digital portal where installers can access their schedules, assigned jobs, and relevant project information.",
      },
      {
        type: "p",
        text: "This reduced the need to prepare and carry printed documents and made it easier for installers to access updated information while working in the field.",
      },
      { type: "h3", text: "The installer portal dashboard" },
      {
        type: "p",
        text: "This allows management to see what installers are up to, see if they have been doing a good job with a grading system we created, and makes sure they are taking care of the vehicle, uploading photos, and so on.",
      },
      {
        type: "figure",
        src: "/case-studies/inspired/installer-dashboard.jpg",
        alt: "The installer portal dashboard.",
      },
      {
        type: "video",
        src: "/case-studies/inspired/installer-portal.mp4",
        alt: "A walkthrough of the Inspired Closets installer portal.",
      },
      { type: "h3", text: "Designer Portal" },
      {
        type: "p",
        text: "I also built a dedicated experience for designers.",
      },
      {
        type: "p",
        text: "Instead of relying entirely on the franchise's existing CRM for daily work, designers can access their leads, projects, and schedules through a more focused interface.",
      },
      {
        type: "p",
        text: "This gives them a clearer view of their responsibilities and helps them stay organized as projects move forward.",
      },
      { type: "h3", text: "The designer dashboard" },
      {
        type: "p",
        text: "This video shows the designers at an overview for management, the same situation as the installer dashboard. This designer dashboard shows everything related to the designer.",
      },
      {
        type: "video",
        src: "/case-studies/inspired/designer-dashboard.mp4",
        alt: "The designer dashboard used by management.",
      },
      { type: "h3", text: "The designer portal" },
      {
        type: "p",
        text: "This is the actual designer portal, showing the power of having everything they need under this portal.",
      },
      {
        type: "video",
        src: "/case-studies/inspired/designer-portal.mp4",
        alt: "A walkthrough of the designer portal.",
      },
      { type: "h3", text: "Payments & Financial Tracking" },
      {
        type: "p",
        text: "I created payment tracking connected to project records.",
      },
      {
        type: "p",
        text: "The system allows management to record payments, review payment history, and see outstanding balances associated with projects.",
      },
      {
        type: "p",
        text: "This makes financial information easier to access alongside the operational details of each job.",
      },
      { type: "h3", text: "Executive Dashboards" },
      {
        type: "p",
        text: "I built dashboards for the owner and general manager to provide greater visibility into business operations and key performance indicators.",
      },
      {
        type: "p",
        text: "Instead of relying primarily on disconnected spreadsheets and separate software, management can review information through a centralized interface.",
      },
      { type: "h3", text: "Meta Ads & AI Insights" },
      {
        type: "p",
        text: "I also integrated advertising reporting into the operating system.",
      },
      {
        type: "p",
        text: "The Meta Ads module provides visibility into campaign performance and supports AI-assisted analysis and recommendations.",
      },
      {
        type: "p",
        text: "The integration is intentionally read-only when interacting with Meta. The AI can help identify opportunities and explain performance, while campaign changes remain under human control.",
      },
      { type: "h3", text: "Meta Ads" },
      {
        type: "p",
        text: "This walkthrough is the Meta Ads view, with the spend covered.",
      },
      {
        type: "video",
        src: "/case-studies/inspired/meta-ads.mp4",
        alt: "A walkthrough of the Meta Ads view, with spend covered.",
      },
    ],
  },
  {
    id: "engineering",
    label: "05 / Engineering the Platform",
    kicker: "05 / Engineering the Platform",
    title: "Building connected workflows instead of isolated features.",
    blocks: [
      {
        type: "p",
        text: "I developed the operating system using Next.js, React, and TypeScript, with Supabase providing the central operational data layer and Vercel supporting deployment.",
      },
      {
        type: "p",
        text: "The application includes server-side API routes and business logic that connect the different parts of the system.",
      },
      {
        type: "p",
        text: "I used Drizzle ORM and SQL migrations to help structure the data model as the product expanded.",
      },
      {
        type: "p",
        text: "One of the biggest engineering challenges was managing the relationships between different workflows.",
      },
      { type: "h3", text: "Inventory" },
      {
        type: "p",
        text: "Inventory couldn't simply be a list of products. It needed to support receiving, stock movements, reservations, and materials associated with projects.",
      },
      { type: "h3", text: "Scheduling" },
      {
        type: "p",
        text: "Scheduling couldn't simply be a calendar. It needed to connect management decisions with the information designers and installers accessed through their portals.",
      },
      { type: "h3", text: "Project records" },
      {
        type: "p",
        text: "Project records also needed to support financial tracking, field operations, and management reporting.",
      },
      {
        type: "p",
        text: "The platform includes distinct interfaces and access controls for different employee roles, allowing the product to support office staff, management, warehouse workers, designers, and installers within the same application.",
      },
      {
        type: "p",
        text: "The result is a connected system where operational information can support multiple parts of the business without being maintained independently in every department.",
      },
    ],
  },
  {
    id: "ai",
    label: "06 / Making AI Useful",
    kicker: "06 / Making AI Useful",
    title: "Better AI starts with better context.",
    blocks: [
      {
        type: "p",
        text: "AI was the original reason the owner reached out, but it became one of the most important reasons to rethink the underlying product.",
      },
      {
        type: "p",
        text: "A dashboard can only provide meaningful insights if the information behind it is useful.",
      },
      { type: "h3", text: "Useful context" },
      {
        type: "p",
        text: "Previously, important data was spread across spreadsheets, inaccessible third-party software, and manual processes.",
      },
      {
        type: "p",
        text: "By bringing more operational information into a central system, I created a stronger foundation for AI-powered assistance.",
      },
      {
        type: "p",
        text: "I integrated Claude and OpenAI into the platform for business questions, operational insights, and advertising analysis.",
      },
      { type: "h3", text: "How the assistant works" },
      {
        type: "p",
        text: "The operational assistant uses server-side application logic to assemble relevant business context, including available financial and operational records, before generating responses.",
      },
      {
        type: "p",
        text: "The system also supports existing workbook information where needed, allowing the AI experience to work with both operational data and available supporting records.",
      },
      {
        type: "p",
        text: "This was an important architectural decision.",
      },
      {
        type: "p",
        text: "Rather than treating AI as a standalone chatbot, I wanted it to become a useful layer on top of the information the business already depends on.",
      },
      {
        type: "p",
        text: "The goal is to help management understand what's happening across the company and make better-informed decisions without manually gathering information from multiple systems.",
      },
    ],
  },
  {
    id: "impact",
    label: "07 / The Impact",
    kicker: "07 / The Impact",
    title: "Less manual work. Better visibility. More connected operations.",
    blocks: [
      {
        type: "p",
        text: "The operating system is now live and used by 19 team members, including seven designers, five installers, three warehouse employees, and four members of leadership and management. Its impact extends across several departments.",
      },
      { type: "h3", text: "Scheduling became more reliable" },
      {
        type: "p",
        text: "Designers and installers now have synchronized schedules available through their portals. Installers no longer need to depend on photos of a whiteboard to know their assignments, reducing confusion and making changes easier to communicate.",
      },
      { type: "h3", text: "Inventory became easier to manage" },
      {
        type: "p",
        text: "The warehouse gained visibility into available stock, incoming materials, and project-related inventory. This helps prevent unnecessary repeat purchases, an especially important improvement given the cost of luxury closet materials.",
      },
      { type: "h3", text: "Installer workflows moved from paper to digital" },
      {
        type: "p",
        text: "Job information, schedules, and material details are now accessible through the installer portal, reducing dependence on printed packets and manually distributed paperwork.",
      },
      { type: "h3", text: "Designers gained a more focused workflow" },
      {
        type: "p",
        text: "With their own portal, designers can stay on top of leads, projects, and appointments without relying entirely on a more cumbersome franchise CRM experience.",
      },
      { type: "h3", text: "Management gained clearer operational visibility" },
      {
        type: "p",
        text: "Information that previously lived in an Excel spreadsheet maintained primarily by one person is now more accessible to owners and managers. The executive dashboards also provide a clearer view of operational activity, business performance, and the work being carried out across departments.",
      },
      { type: "h3", text: "The business gained a stronger foundation for AI" },
      {
        type: "p",
        text: "By connecting more operational information, the platform gives its AI features more useful context for answering questions and providing insights.",
      },
      {
        type: "p",
        text: "These improvements have helped make day-to-day operations more organized, reduced reliance on manual coordination, and given employees easier access to the information they need.",
      },
    ],
  },
  {
    id: "reflection",
    label: "08 / Reflection",
    kicker: "08 / Reflection",
    title: "The most important decision was questioning the original request.",
    blocks: [
      {
        type: "p",
        text: "I was initially hired to build a dashboard.",
      },
      {
        type: "p",
        text: "But once I started understanding the business, I realized that building the dashboard exactly as requested wouldn't solve the underlying problem.",
      },
      {
        type: "p",
        text: "The issue wasn't the interface. It was the disconnected systems and workflows producing the information behind it.",
      },
      {
        type: "p",
        text: "That changed the direction of the project.",
      },
      {
        type: "p",
        text: "I went from designing a dashboard to proposing, designing, and engineering an operating system that supports nearly every part of the company's daily operations.",
      },
      {
        type: "p",
        text: "It required thinking about the product as a whole: the people using it, how information moves between departments, how different workflows connect, and how AI can become genuinely useful when it has the right context.",
      },
      {
        type: "p",
        text: "This project represents the kind of work I enjoy most.",
      },
      {
        type: "p",
        text: "Understanding a problem, figuring out what actually needs to be built, and taking a product from an idea to something people rely on every day.",
      },
      { type: "h3", text: "Please Understand" },
      {
        type: "p",
        text: "I had to blur out actual data. I was allowed to show certain parts of the dashboard but had to be cautious. Apologies if the blur makes things ugly, but data privacy is incredibly important to me. Thank you for understanding.",
      },
    ],
  },
];
