const bubbles = [
  { label: "Family", image: "/about/family.svg" },
  { label: "My wife", image: "/about/wife.svg" },
  { label: "My daughter", image: "/about/daughter.svg" },
  { label: "Watching sports", image: "/about/sports.svg" },
  { label: "Eating food", image: "/about/food.svg" },
  { label: "Coding / designing", image: "/about/coding.svg" },
  { label: "Collecting cards", image: "/about/cards.svg" },
];

function place(index: number) {
  const angle = (index / bubbles.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + Math.cos(angle) * 36,
    y: 50 + Math.sin(angle) * 36,
  };
}

export function AboutBubbleMap() {
  return (
    <section className="bg-[#fbfaf6] px-4 py-12 md:py-16">
      <h2 className="mb-8 font-['JetBrains_Mono'] text-[24px] font-medium leading-[1.2] text-[#1a1a1a] md:text-[28px]">
        about me, milton amaya
      </h2>
      <div className="relative mx-auto h-[560px] w-full max-w-[860px] md:h-[680px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
          {bubbles.map((bubble, index) => {
            const point = place(index);
            return (
              <line
                key={bubble.label}
                x1="50"
                y1="50"
                x2={point.x}
                y2={point.y}
                stroke="#d9d4c8"
                strokeWidth="0.35"
                className="line-in"
                style={{ animationDelay: `${0.35 + index * 0.28}s` }}
              />
            );
          })}
        </svg>

        <div
          className="bubble-in absolute left-1/2 top-1/2 flex h-[108px] w-[108px] items-center justify-center rounded-full bg-black text-center font-['JetBrains_Mono'] text-[15px] text-white md:h-[128px] md:w-[128px] md:text-[17px]"
          style={{ animationDelay: "0.05s" }}
        >
          My Why
        </div>

        {bubbles.map((bubble, index) => {
          const point = place(index);
          return (
            <div
              key={bubble.label}
              className="bubble-in absolute h-[92px] w-[92px] md:h-[112px] md:w-[112px]"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                animationDelay: `${0.35 + index * 0.28}s`,
              }}
            >
              <img
                src={bubble.image}
                alt=""
                className="h-[92px] w-[92px] rounded-full border border-[#e6e2d8] object-cover shadow-sm md:h-[112px] md:w-[112px]"
                draggable={false}
              />
              <span className="absolute left-1/2 top-full mt-2 w-[108px] -translate-x-1/2 text-center font-['JetBrains_Mono'] text-[11px] leading-[1.3] text-[#1a1a1a] md:text-[13px]">
                {bubble.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
