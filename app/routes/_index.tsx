import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "miltonisblurrd - frontend developer las vegas" },
    { name: "description", content: "I’m a frontend developer based in Las Vegas. I’m interested in websites, smart contracts, and skateboarding. Currently a Sr. web developer at Shipnetwork, building and scaling the companies website." },
  ];
};

export default function Index() {
  return (
    <>
      <div className="min-h-screen bg-[#fbfaf6] p-4">
        <div className="w-[234px]">
          <img
            src="/logo.svg"
            alt="Your Logo"
            className="w-full"
          />
        </div>
        
        <div className="mt-6 font-['Open_Sans'] text-[15px] leading-[19px] max-w-[600px] text-black">
          <p className="mb-4">
            I'm a frontend developer with 8+ years of professional experience. Based in Las Vegas, I am interested in websites, smart contracts, and skateboarding.
          </p>
          <p className="mb-4">
            Currently at <a href="https://www.shipnetwork.com" className="text-[#6975f8] hover:opacity-80">@ShipNetwork</a>, as senior web developer building <a href="https://www.firstmile.com" className="text-[#6975f8] hover:opacity-80">@firstmile</a> and scaling <a href="https://prcl.com" className="text-[#6975f8] hover:opacity-80">@prclworld</a>.
          </p>
          <p className="mb-4">
            On my free time I like to create cool things with code at <a href="https://www.blurrdstudio.com" className="text-[#6975f8] hover:opacity-80">@blurrdstudio</a> and <a href="https://www.blurrdskateboards.com" className="text-[#6975f8] hover:opacity-80">@blurrdskateboards</a>.
          </p>
          <p>
            Looking to bring your vision into a real-world product/app/interface/website? <a href="https://calendly.com/blurrd/15min?month=2025-01" className="text-[#6975f8] hover:opacity-80">Schedule a call</a> or shoot me an email: <a href="mailto:milton@blurrdstudio.com" className="text-[#6975f8] hover:opacity-80">milton@blurrdstudio.com</a>
          </p>
        </div>
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
