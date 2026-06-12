import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaTruck } from "react-icons/fa";

type AuthLayoutProps = {
  children: ReactNode;
  heading: string;
  subheading: string;
  panelStat: { value: string; label: string };
};

function PanelTruckSVG() {
  return (
    <svg width="520" height="290" viewBox="0 0 900 500" fill="white">
      <rect x="10" y="160" width="560" height="200" rx="6" />
      <path d="M570 190 L570 360 L730 360 L730 250 L680 190 Z" />
      <path
        d="M585 200 L630 200 L670 245 L585 245 Z"
        fill="#000000"
        opacity="0.6"
      />
      <circle cx="120" cy="370" r="60" />
      <circle cx="120" cy="370" r="28" fill="#000000" opacity="0.6" />
      <circle cx="280" cy="370" r="60" />
      <circle cx="280" cy="370" r="28" fill="#000000" opacity="0.6" />
      <circle cx="630" cy="370" r="60" />
      <circle cx="630" cy="370" r="28" fill="#000000" opacity="0.6" />
      <circle cx="720" cy="370" r="50" />
      <circle cx="720" cy="370" r="22" fill="#000000" opacity="0.6" />
      <rect x="660" y="120" width="16" height="80" rx="4" />
      <rect
        x="740"
        y="240"
        width="20"
        height="12"
        rx="2"
        fill="#ffffff"
        opacity="0.9"
      />
    </svg>
  );
}

export default function AuthLayout({
  children,
  heading,
  subheading,
  panelStat,
}: AuthLayoutProps) {
  return (
    <div className="h-screen flex flex-col lg:flex-row bg-black overflow-hidden">
      <div className="hidden lg:flex lg:w-[42%] xl:w-[38%] flex-col justify-between relative p-12 bg-black flex-shrink-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="absolute bottom-16 right-0 opacity-[0.08] pointer-events-none select-none">
          <PanelTruckSVG />
        </div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-8 h-8 bg-white flex items-center justify-center rotate-3">
              <FaTruck className="w-5 h-5 text-black" />
            </div>
            <span className="text-white text-2xl uppercase font-bold">
              <span className="text-white">In</span>Truck
            </span>
          </Link>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-0.5 bg-white" />
            <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">
              Nigeria's #1 Trucking Platform
            </span>
          </div>

          <h2
            className="text-white uppercase leading-none mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.8rem, 4vw, 4rem)",
            }}
          >
            {heading}
          </h2>

          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            {subheading}
          </p>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-8">
          <div className="text-white text-4xl font-black">
            {panelStat.value}
          </div>
          <div className="text-white/40 text-xs uppercase tracking-widest mt-1">
            {panelStat.label}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white flex flex-col min-h-0 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute top-0 right-0 w-96 h-96 bg-black opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="lg:hidden flex items-center gap-2.5 px-6 pt-6 relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-black flex items-center justify-center">
              <FaTruck className="w-4 h-4 text-white" />
            </div>
            <span className="text-black text-xl uppercase font-bold">
              <span className="text-black">In</span>Truck
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-10 lg:py-8 relative z-10">
          <div className="w-full max-w-[640px] mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
