import { useEffect, useRef } from "react";

const tools = [
  { name: "Figma", src: "/tools/figma.svg" },
  { name: "Cursor", src: "/tools/cursor.png" },
  { name: "GitHub", src: "/tools/github.svg" },
  { name: "Vercel", src: "/tools/vercel.svg" },
  { name: "Grok", src: "/tools/grok.png" },
  { name: "Claude", src: "/tools/anthropic.svg" },
  { name: "ChatGPT", src: "/tools/openai.svg" },
  { name: "MCP", src: "/tools/mcp.png" },
  { name: "Supabase", src: "/tools/supabase.svg" },
  { name: "Webflow", src: "/tools/webflow.svg" },
];

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export function ToolBubbles() {
  const frameRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    const bodies: Body[] = tools.map(() => {
      const speed = 28 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;
      return { x: 0, y: 0, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: 28 };
    });

    const spread = () => {
      width = frame.clientWidth;
      height = frame.clientHeight;
      if (width < 40 || height < 40) return;
      const radius = Math.max(22, Math.min(32, Math.min(width, height) / 9));
      bodies.forEach((body, index) => {
        const cols = 3;
        const rows = Math.ceil(tools.length / cols);
        const col = index % cols;
        const row = Math.floor(index / cols);
        body.r = radius;
        body.x = (col + 0.5) * (width / cols);
        body.y = (row + 0.5) * (height / rows);
      });
    };

    spread();

    let last = performance.now();
    let frameId = 0;

    const place = () => {
      bodies.forEach((body, index) => {
        const node = bubbleRefs.current[index];
        if (!node) return;
        node.style.width = `${body.r * 2}px`;
        node.style.height = `${body.r * 2}px`;
        node.style.transform = `translate(${body.x - body.r}px, ${body.y - body.r}px)`;
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      width = frame.clientWidth;
      height = frame.clientHeight;

      if (!reduced) {
        for (const body of bodies) {
          body.x += body.vx * dt;
          body.y += body.vy * dt;

          if (body.x < body.r) {
            body.x = body.r;
            body.vx = Math.abs(body.vx) * 0.96;
          } else if (body.x > width - body.r) {
            body.x = width - body.r;
            body.vx = -Math.abs(body.vx) * 0.96;
          }

          if (body.y < body.r) {
            body.y = body.r;
            body.vy = Math.abs(body.vy) * 0.96;
          } else if (body.y > height - body.r) {
            body.y = height - body.r;
            body.vy = -Math.abs(body.vy) * 0.96;
          }
        }

        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i];
            const b = bodies[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy) || 0.001;
            const min = a.r + b.r;
            if (dist >= min) continue;

            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = min - dist;
            a.x -= nx * overlap * 0.5;
            a.y -= ny * overlap * 0.5;
            b.x += nx * overlap * 0.5;
            b.y += ny * overlap * 0.5;

            const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            const bounce = 0.72;
            const impulse = (-(1 + bounce) * rel) / 2;
            const spring = overlap * 4;
            a.vx -= (impulse + spring) * nx;
            a.vy -= (impulse + spring) * ny;
            b.vx += (impulse + spring) * nx;
            b.vy += (impulse + spring) * ny;
          }
        }

        for (const body of bodies) {
          const speed = Math.hypot(body.vx, body.vy);
          if (speed < 18) {
            body.vx *= 1.02;
            body.vy *= 1.02;
          } else if (speed > 70) {
            body.vx *= 0.96;
            body.vy *= 0.96;
          }
        }
      }

      place();
      frameId = requestAnimationFrame(tick);
    };

    place();
    const observer = new ResizeObserver(() => {
      const nextWidth = frame.clientWidth;
      const nextHeight = frame.clientHeight;
      if (Math.abs(nextWidth - width) > 40 || Math.abs(nextHeight - height) > 40) {
        spread();
      }
    });
    observer.observe(frame);
    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={frameRef} className="relative h-full min-h-[220px] w-full overflow-hidden">
      {tools.map((tool, index) => (
        <div
          key={tool.name}
          ref={(node) => {
            bubbleRefs.current[index] = node;
          }}
          className="absolute left-0 top-0 flex items-center justify-center overflow-hidden rounded-full border border-[#e6e2d8] bg-white shadow-sm"
          title={tool.name}
        >
          <img src={tool.src} alt={tool.name} className="h-[58%] w-[58%] object-contain" draggable={false} />
        </div>
      ))}
      <p className="pointer-events-none absolute bottom-3 left-3 z-20 w-fit max-w-[calc(100%-1.5rem)] rounded-full bg-black/70 px-4 py-2 font-['JetBrains_Mono'] text-[12px] text-white">
        Tools I like to use
      </p>
    </div>
  );
}
