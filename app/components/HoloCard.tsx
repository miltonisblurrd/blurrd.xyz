import { useRef } from "react";

export function HoloCard() {
  const cardRef = useRef<HTMLElement>(null);

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
    card.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
  };

  const onLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <figure
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative min-h-[160px] overflow-hidden border border-[#e5e5e5] md:col-span-2 md:min-h-0"
      style={{
        transform: "perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        transition: "transform 180ms ease-out",
        boxShadow:
          "0 0 0 1px rgba(255, 214, 120, 0.45), 0 0 18px 2px rgba(120, 170, 255, 0.35), 0 0 32px 6px rgba(255, 196, 80, 0.22)",
      }}
    >
      <img
        src="/about/blue-eyes.webp"
        alt="Blue-Eyes White Dragon, PSA Gem Mint 10"
        className="h-full w-full object-cover object-center"
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.15) 38%, rgba(180,220,255,0.55) 46%, rgba(255,230,160,0.45) 54%, transparent 68%)",
          backgroundPosition: "var(--mx, 50%) var(--my, 50%)",
          backgroundSize: "180% 180%",
        }}
      />
      <figcaption className="absolute bottom-3 left-3 z-20 w-fit max-w-[calc(100%-1.5rem)] rounded-full bg-black/70 px-4 py-2 font-['JetBrains_Mono'] text-[12px] text-white">
        Collecting cards
      </figcaption>
    </figure>
  );
}
