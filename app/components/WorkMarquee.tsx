import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { columnA, columnB, columnC, rowA, rowB, type WorkShot } from "~/data/homeWork";

const columns = [
  { direction: "marquee-down", duration: 48, items: columnA },
  { direction: "marquee-up", duration: 54, items: columnB },
  { direction: "marquee-down", duration: 50, items: columnC },
];

function cycle(items: WorkShot[], times: number) {
  return Array.from({ length: times }, () => items).flat();
}

function MarqueeColumn({
  direction,
  duration,
  items,
  cycles,
}: {
  direction: string;
  duration: number;
  items: WorkShot[];
  cycles: number;
}) {
  const filled = cycle(items, cycles);
  const loop = [...filled, ...filled];

  return (
    <div className="marquee-col h-full overflow-hidden px-1.5">
      <div className={`flex flex-col gap-3 ${direction}`} style={{ animationDuration: `${duration * cycles}s` }}>
        {loop.map((shot, index) => (
          <div
            key={`${shot.src}-${index}`}
            className="shrink-0 origin-center overflow-hidden border border-[#e5e5e5] bg-white shadow-sm transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.06]"
          >
            <img
              src={shot.src}
              alt={shot.alt}
              className="h-[148px] w-full object-cover object-center md:h-[168px]"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const heroRows = [
  { direction: "marquee-left", duration: 62, items: columnA },
  { direction: "marquee-right", duration: 68, items: columnB },
  { direction: "marquee-left", duration: 64, items: columnC },
];

export function WorkMarquee() {
  const frameRef = useRef<HTMLDivElement>(null);
  const rowFrameRef = useRef<HTMLDivElement>(null);
  const [cycles, setCycles] = useState(4);
  const [rowCycles, setRowCycles] = useState(3);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const track = frame?.querySelector(".marquee-col > div");
    if (!frame || !track) return;

    const viewport = frame.clientHeight;
    const half = track.scrollHeight / 2;
    if (half < viewport + 32 && cycles < 12) {
      setCycles((count) => count + 1);
    }
  }, [cycles]);

  useLayoutEffect(() => {
    const frame = rowFrameRef.current;
    const track = frame?.querySelector(".marquee-row > div");
    if (!frame || !track) return;

    const viewport = frame.clientWidth;
    const half = track.scrollWidth / 2;
    if (half < viewport + 32 && rowCycles < 12) {
      setRowCycles((count) => count + 1);
    }
  }, [rowCycles]);

  return (
    <>
      <div ref={rowFrameRef} className="flex w-full min-w-0 flex-col gap-2 lg:hidden">
        {heroRows.map((row) => (
          <MarqueeRow
            key={row.direction + row.items[0].src}
            direction={row.direction}
            duration={row.duration}
            items={row.items}
            cycles={rowCycles}
          />
        ))}
      </div>
      <div ref={frameRef} className="hidden h-full min-h-[100vh] min-w-0 grid-cols-3 gap-2 lg:grid lg:min-h-0">
        {columns.map((column) => (
          <MarqueeColumn
            key={column.direction + column.items[0].src}
            direction={column.direction}
            duration={column.duration}
            items={column.items}
            cycles={cycles}
          />
        ))}
      </div>
    </>
  );
}

const rows = [
  { direction: "marquee-left", duration: 70, items: rowA },
  { direction: "marquee-right", duration: 76, items: rowB },
];

function MarqueeRow({
  direction,
  duration,
  items,
  cycles,
  large = false,
  onOpen,
}: {
  direction: string;
  duration: number;
  items: WorkShot[];
  cycles: number;
  large?: boolean;
  onOpen?: (index: number) => void;
}) {
  const filled = cycle(items, cycles);
  const loop = [...filled, ...filled];

  return (
    <div className="marquee-row overflow-hidden py-2">
      <div className={`flex w-max items-stretch gap-4 ${direction}`} style={{ animationDuration: `${duration * cycles}s` }}>
        {loop.map((shot, index) => {
          const card = (
            <img
              src={shot.src}
              alt={shot.alt}
              className={
                large
                  ? "h-full w-auto max-w-none object-contain"
                  : "aspect-square h-full w-full object-cover object-center"
              }
              draggable={false}
            />
          );
          const frame =
            large
              ? "flex h-[200px] w-auto shrink-0 origin-center items-center justify-center overflow-hidden border border-[#e5e5e5] bg-[#f4f1ea] shadow-sm transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.04] md:h-[240px]"
              : "aspect-square w-[176px] shrink-0 origin-center overflow-hidden border border-[#e5e5e5] bg-white shadow-sm transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.06] md:w-[200px]";

          if (!onOpen) {
            return (
              <div key={`${shot.src}-${index}`} className={frame}>
                {card}
              </div>
            );
          }

          return (
            <button
              key={`${shot.src}-${index}`}
              type="button"
              className={`${frame} cursor-zoom-in`}
              onClick={() => onOpen(index % items.length)}
              aria-label={`Open ${shot.alt}`}
            >
              {card}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ShotLightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: WorkShot[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const shot = items[index];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (event.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [index, items.length, onClose, onIndex]);

  if (!shot || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 text-sm text-white"
        onClick={onClose}
      >
        Close
      </button>
      <button
        type="button"
        className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-white md:left-6"
        aria-label="Previous image"
        onClick={(event) => {
          event.stopPropagation();
          onIndex((index - 1 + items.length) % items.length);
        }}
      >
        ‹
      </button>
      <img
        src={shot.src}
        alt={shot.alt}
        className="max-h-[88vh] max-w-[92vw] object-contain"
        onClick={(event) => event.stopPropagation()}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-white md:right-6"
        aria-label="Next image"
        onClick={(event) => {
          event.stopPropagation();
          onIndex((index + 1) % items.length);
        }}
      >
        ›
      </button>
      <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/80">{shot.alt}</p>
    </div>,
    document.body,
  );
}

export function WorkMarqueeRow({ items }: { items: { src: string; alt: string }[] }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [cycles, setCycles] = useState(4);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const track = frame?.querySelector(".marquee-row > div");
    if (!frame || !track) return;

    const viewport = frame.clientWidth;
    const half = track.scrollWidth / 2;
    if (half < viewport + 32 && cycles < 12) {
      setCycles((count) => count + 1);
    }
  }, [cycles]);

  return (
    <div ref={frameRef} className="w-full min-w-0">
      <MarqueeRow
        direction="marquee-left"
        duration={56}
        items={items}
        cycles={cycles}
        large
        onOpen={setOpenIndex}
      />
      {openIndex !== null ? (
        <ShotLightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndex={setOpenIndex}
        />
      ) : null}
    </div>
  );
}

export function WorkMarqueeRows() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [cycles, setCycles] = useState(4);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const track = frame?.querySelector(".marquee-row > div");
    if (!frame || !track) return;

    const viewport = frame.clientWidth;
    const half = track.scrollWidth / 2;
    if (half < viewport + 32 && cycles < 12) {
      setCycles((count) => count + 1);
    }
  }, [cycles]);

  return (
    <div ref={frameRef} className="flex w-full min-w-0 flex-col gap-2">
      {rows.map((row) => (
        <MarqueeRow
          key={row.direction + row.items[0].src}
          direction={row.direction}
          duration={row.duration}
          items={row.items}
          cycles={cycles}
        />
      ))}
    </div>
  );
}
