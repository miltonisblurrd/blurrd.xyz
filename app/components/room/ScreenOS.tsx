import { useEffect, useState, type ReactNode } from "react";

export type ScreenPost = { slug: string; title: string; date: string };

type Stage = "off" | "boot" | "login" | "welcome" | "desktop";
type AppId = "about" | "projects" | "blog" | "contact";

const BOOT_LINES = [
  "BLURRD BIOS v2.06  (C) 2006 blurrd studio",
  "CPU: Vegas Core @ 3.0GHz ........ OK",
  "Memory test: 524288K ............ OK",
  "Detecting skate decks ........... 2 found",
  "Mounting corkboard .............. OK",
  "Loading Red Sox drivers ......... OK",
  "Starting MiltonOS ...",
];

const PROJECTS = [
  {
    name: "blurrd studio",
    href: "https://www.blurrdstudio.com",
    blurb: "Where I build cool things with code.",
  },
  {
    name: "symphny",
    href: "https://www.symphny.xyz",
    blurb: "Orchestrating AI agents.",
  },
  {
    name: "prcl world",
    href: "https://prcl.com",
    blurb: "Scaling the storefront at Shipnetwork.",
  },
];

const ICONS: { id: AppId; label: string; glyph: string }[] = [
  { id: "about", label: "About Me", glyph: "👤" },
  { id: "projects", label: "Projects", glyph: "📁" },
  { id: "blog", label: "My Thoughts", glyph: "📝" },
  { id: "contact", label: "Contact", glyph: "✉️" },
];

export function ScreenOS({
  powered,
  posts,
}: {
  powered: boolean;
  posts: ScreenPost[];
}) {
  const [stage, setStage] = useState<Stage>("off");
  const [lines, setLines] = useState(0);
  const [open, setOpen] = useState<AppId | null>(null);
  const [clock, setClock] = useState("");

  useEffect(() => {
    if (!powered || stage !== "off") return;
    setStage("boot");
  }, [powered, stage]);

  useEffect(() => {
    if (stage !== "boot") return;
    if (lines >= BOOT_LINES.length) {
      const t = setTimeout(() => setStage("login"), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLines((n) => n + 1), 260);
    return () => clearTimeout(t);
  }, [stage, lines]);

  useEffect(() => {
    if (stage !== "welcome") return;
    const t = setTimeout(() => setStage("desktop"), 1400);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="screen-os relative h-[560px] w-[960px] select-none overflow-hidden bg-black font-['Tahoma','Verdana',sans-serif] text-[15px] text-white">
      {stage === "off" && (
        <div className="flex h-full items-center justify-center bg-[#05070a]">
          <span className="font-['JetBrains_Mono'] text-xs tracking-[0.3em] text-[#e8c66a]/40">
            NO SIGNAL
          </span>
        </div>
      )}

      {stage === "boot" && (
        <div className="h-full bg-black p-8 font-['JetBrains_Mono'] text-[15px] leading-7 text-[#c9c9c9]">
          {BOOT_LINES.slice(0, lines).map((line) => (
            <div key={line}>{line}</div>
          ))}
          <span className="animate-pulse">█</span>
        </div>
      )}

      {stage === "login" && (
        <div className="flex h-full flex-col bg-[#5a7edc]">
          <div className="h-16 bg-[#00309c]" />
          <div className="flex flex-1 items-center justify-center gap-16 bg-gradient-to-r from-[#5a7edc] via-[#7c9be6] to-[#5a7edc]">
            <div className="text-right">
              <div className="text-4xl font-bold italic">MiltonOS</div>
              <div className="mt-2 text-sm opacity-80">To begin, click your user name</div>
            </div>
            <div className="h-48 w-px bg-white/50" />
            <button
              type="button"
              onClick={() => setStage("welcome")}
              className="flex items-center gap-4 rounded-md px-4 py-3 text-left hover:bg-[#2c56c4]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-white bg-[#e8a83a] text-3xl">
                🛹
              </div>
              <div>
                <div className="text-xl">milton</div>
                <div className="text-xs opacity-80">frontend developer</div>
              </div>
            </button>
          </div>
          <div className="h-16 bg-[#00309c]" />
        </div>
      )}

      {stage === "welcome" && (
        <div className="flex h-full items-center justify-center bg-gradient-to-r from-[#5a7edc] via-[#7c9be6] to-[#5a7edc]">
          <span className="text-5xl font-bold italic">welcome</span>
        </div>
      )}

      {stage === "desktop" && (
        <div className="relative h-full bg-gradient-to-b from-[#3a6fd8] via-[#6fa3e8] to-[#4a8a3a]">
          <div className="absolute left-4 top-4 flex flex-col gap-5">
            {ICONS.map((icon) => (
              <button
                key={icon.id}
                type="button"
                onClick={() => setOpen(icon.id)}
                className="flex w-24 flex-col items-center gap-1 rounded p-1 text-center text-[13px] [text-shadow:1px_1px_1px_#000] hover:bg-white/20"
              >
                <span className="text-4xl">{icon.glyph}</span>
                {icon.label}
              </button>
            ))}
          </div>

          {open && (
            <Window title={ICONS.find((i) => i.id === open)!.label} onClose={() => setOpen(null)}>
              {open === "about" && (
                <div className="space-y-3">
                  <p>
                    I&apos;m Milton, a senior frontend developer in Las Vegas with 8
                    years of experience, focused on design &amp; code.
                  </p>
                  <p>
                    Currently at Shipnetwork as senior web developer scaling prcl world.
                  </p>
                  <p>
                    Off the clock: gym, eating clean, Red Sox, skating, and time with my
                    wife and daughter.
                  </p>
                </div>
              )}
              {open === "projects" && (
                <ul className="space-y-3">
                  {PROJECTS.map((p) => (
                    <li key={p.name}>
                      <a href={p.href} target="_blank" rel="noreferrer" className="font-bold text-[#0b3fbf] underline">
                        {p.name}
                      </a>
                      <div className="text-[13px] text-neutral-700">{p.blurb}</div>
                    </li>
                  ))}
                </ul>
              )}
              {open === "blog" && (
                <ul className="space-y-2">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <a href={`/blog/${p.slug}`} className="text-[#0b3fbf] underline">
                        {p.title}
                      </a>
                      <span className="ml-2 text-[12px] text-neutral-500">{p.date}</span>
                    </li>
                  ))}
                </ul>
              )}
              {open === "contact" && (
                <div className="space-y-3">
                  <p>
                    Email:{" "}
                    <a href="mailto:milton@blurrdstudio.com" className="text-[#0b3fbf] underline">
                      milton@blurrdstudio.com
                    </a>
                  </p>
                  <p>
                    X:{" "}
                    <a href="https://twitter.com/miltonisblurrd" target="_blank" rel="noreferrer" className="text-[#0b3fbf] underline">
                      @miltonisblurrd
                    </a>
                  </p>
                </div>
              )}
            </Window>
          )}

          <div className="absolute bottom-0 left-0 right-0 flex h-10 items-center justify-between bg-gradient-to-b from-[#2a5fd8] to-[#1941a5]">
            <div className="flex h-full items-center rounded-r-xl bg-gradient-to-b from-[#3c9a3c] to-[#2a7a2a] px-5 text-lg font-bold italic">
              start
            </div>
            <div className="flex h-full items-center bg-[#0f8ae6] px-4 text-sm">{clock}</div>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.12)_0px,rgba(0,0,0,0.12)_1px,transparent_1px,transparent_3px)]" />
    </div>
  );
}

function Window({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="absolute left-40 top-10 w-[560px] overflow-hidden rounded-t-lg border-2 border-[#0831d9] bg-[#ece9d8] shadow-2xl">
      <div className="flex items-center justify-between bg-gradient-to-b from-[#0a5ae8] to-[#0838c8] px-2 py-1 font-bold">
        <span>{title}</span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded bg-[#e04a2a] text-sm hover:bg-[#f06040]"
          aria-label="Close window"
        >
          ✕
        </button>
      </div>
      <div className="max-h-[360px] overflow-y-auto bg-white p-5 text-[15px] text-black">
        {children}
      </div>
    </div>
  );
}
