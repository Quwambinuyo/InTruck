import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type AuthLayoutProps = {
  children: ReactNode;
  heading: string;
  subheading: string;
  panelStat: { value: string; label: string };
};

export default function AuthLayout({
  children,
  heading,
  subheading,
  panelStat,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0F172A]">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[38%] flex-col justify-between relative overflow-hidden p-12 bg-[#0F172A]">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Orange diagonal accent */}
        <div
          className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent 60%, #F97316 60%)",
          }}
        />

        {/* Truck silhouette watermark */}
        <div className="absolute bottom-16 right-0 opacity-[0.06] pointer-events-none select-none">
          <PanelTruckSVG />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-8 h-8 bg-[#F97316] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-200">
              <TruckIcon className="w-5 h-5 text-white -rotate-3 group-hover:rotate-0 transition-transform duration-200" />
            </div>
            <span
              className="text-white text-2xl "
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
              }}
            >
              <span className="text-[#F97316]">In</span>Truck
            </span>
          </Link>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-0.5 bg-[#F97316]" />
            <span className="text-[#F97316] text-[10px] font-bold uppercase tracking-[0.2em]">
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

        {/* Stat */}
        <div className="relative z-10 border-t border-white/10 pt-8">
          <div
            className="text-white text-4xl"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
            }}
          >
            {panelStat.value}
          </div>
          <div className="text-white/40 text-xs uppercase tracking-widest mt-1">
            {panelStat.label}
          </div>
        </div>
      </div>

      {/* ── Right panel (form area) ── */}
      <div className="flex-1 bg-[#F8FAFC] flex flex-col">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 px-6 pt-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#F97316] flex items-center justify-center">
              <TruckIcon className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-[#0F172A] text-xl uppercase"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
              }}
            >
              InTruck<span className="text-[#F97316]">X</span>
            </span>
          </Link>
        </div>

        {/* Form scroll container */}
        <div className="flex-1 flex items-start lg:items-center justify-center px-6 py-10 lg:py-8 overflow-y-auto">
          <div className="w-full max-w-[460px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5S5.17 15.5 6 15.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function PanelTruckSVG() {
  return (
    <svg width="520" height="290" viewBox="0 0 900 500" fill="white">
      <rect x="10" y="160" width="560" height="200" rx="6" />
      <path d="M570 190 L570 360 L730 360 L730 250 L680 190 Z" />
      <path
        d="M585 200 L630 200 L670 245 L585 245 Z"
        fill="#0F172A"
        opacity="0.5"
      />
      <circle cx="120" cy="370" r="60" />
      <circle cx="120" cy="370" r="28" fill="#0F172A" opacity="0.6" />
      <circle cx="280" cy="370" r="60" />
      <circle cx="280" cy="370" r="28" fill="#0F172A" opacity="0.6" />
      <circle cx="630" cy="370" r="60" />
      <circle cx="630" cy="370" r="28" fill="#0F172A" opacity="0.6" />
      <circle cx="720" cy="370" r="50" />
      <circle cx="720" cy="370" r="22" fill="#0F172A" opacity="0.6" />
      <rect x="660" y="120" width="16" height="80" rx="4" />
      <rect
        x="740"
        y="240"
        width="20"
        height="12"
        rx="2"
        fill="#F97316"
        opacity="0.8"
      />
    </svg>
  );
}
