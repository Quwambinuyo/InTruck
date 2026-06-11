export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0F172A]">
      {/* Background diagonal split */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(125deg, #0F172A 55%, #1E40AF 55%)",
        }}
      />

      {/* Orange accent stripe */}
      <div
        className="absolute z-0"
        style={{
          top: 0,
          right: 0,
          width: "45%",
          height: "100%",
          background:
            "linear-gradient(125deg, transparent 0%, transparent 45%, #F97316 45%, #EA580C 100%)",
          opacity: 0.12,
        }}
      />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Truck SVG silhouette */}
      <div className="absolute right-0 bottom-0 z-0 opacity-[0.07] pointer-events-none select-none hidden lg:block">
        <BigTruckSVG />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-0.5 bg-[#F97316]" />
            <span className="text-[#F97316] text-xs font-semibold uppercase tracking-[0.2em]">
              Nigeria's #1 Trucking Platform
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-white leading-[0.92] mb-6 uppercase"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
            }}
          >
            Move anything.
            <br />
            <span className="text-[#F97316]">Anywhere.</span>
            <br />
            On demand.
          </h1>

          {/* Sub */}
          <p
            className="text-white/60 text-lg leading-relaxed max-w-xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Buy trucks, rent a fleet, or book a driver to InTruck sand, stone,
            granite — whatever the job demands. InTruck connects clients and
            drivers across Nigeria in minutes.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-3 mb-14">
            <a
              href="#"
              className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-sm uppercase tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5"
            >
              Find a Driver
            </a>
            <a
              href="#"
              className="px-8 py-4 border border-white/20 hover:border-white/50 text-white font-semibold text-sm uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 bg-white/5 backdrop-blur-sm"
            >
              I'm a Driver
            </a>
            <a
              href="#fleet"
              className="px-8 py-4 border border-[#1E40AF] hover:border-[#1D4ED8] bg-[#1E40AF]/40 hover:bg-[#1E40AF]/60 text-white font-semibold text-sm uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5"
            >
              Browse Fleet
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            {[
              { value: "2,400+", label: "Active Drivers" },
              { value: "18 States", label: "Coverage" },
              { value: "₦0", label: "Platform Fee" },
              { value: "4.8★", label: "Avg. Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-white text-2xl"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs uppercase tracking-widest mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <svg
          className="w-4 h-4 text-white/30"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M8 3v10M3 9l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}

function BigTruckSVG() {
  return (
    <svg
      width="900"
      height="500"
      viewBox="0 0 900 500"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Trailer */}
      <rect x="10" y="160" width="560" height="200" rx="6" />
      {/* Cab */}
      <path d="M570 190 L570 360 L730 360 L730 250 L680 190 Z" />
      {/* Windshield */}
      <path
        d="M585 200 L630 200 L670 245 L585 245 Z"
        fill="#0F172A"
        opacity="0.5"
      />
      {/* Wheels */}
      <circle cx="120" cy="370" r="60" />
      <circle cx="120" cy="370" r="28" fill="#0F172A" opacity="0.6" />
      <circle cx="280" cy="370" r="60" />
      <circle cx="280" cy="370" r="28" fill="#0F172A" opacity="0.6" />
      <circle cx="630" cy="370" r="60" />
      <circle cx="630" cy="370" r="28" fill="#0F172A" opacity="0.6" />
      <circle cx="720" cy="370" r="50" />
      <circle cx="720" cy="370" r="22" fill="#0F172A" opacity="0.6" />
      {/* Exhaust stack */}
      <rect x="660" y="120" width="16" height="80" rx="4" />
      {/* Front grill lines */}
      <rect x="735" y="260" width="30" height="5" rx="2" />
      <rect x="735" y="275" width="30" height="5" rx="2" />
      <rect x="735" y="290" width="30" height="5" rx="2" />
      {/* Headlights */}
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
