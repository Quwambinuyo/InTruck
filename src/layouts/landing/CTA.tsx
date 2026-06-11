export default function CTA() {
  return (
    <section id="pricing" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Main CTA block */}
        <div className="relative bg-[#0F172A] overflow-hidden">
          {/* Orange diagonal accent */}
          <div
            className="absolute top-0 right-0 bottom-0 w-1/2 opacity-20"
            style={{
              background:
                "linear-gradient(135deg, transparent 30%, #F97316 30%)",
            }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 px-10 py-16 md:px-16 md:py-20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="max-w-xl">
                <span className="text-[#F97316] text-xs font-semibold uppercase tracking-[0.2em]">
                  Zero Platform Fee
                </span>
                <h2
                  className="text-white mt-2 mb-4 uppercase leading-none"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  }}
                >
                  Start moving.
                  <br />
                  <span className="text-[#F97316]">Start earning.</span>
                  <br />
                  Today.
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  No monthly fees. No platform commission. InTruck is free to
                  join for drivers and clients. We earn only when you complete a
                  job — and even then, it's a small, transparent fee.
                </p>
              </div>

              <div className="flex flex-col gap-4 min-w-64">
                <a
                  href="#"
                  className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm uppercase tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 text-center"
                >
                  Post a Job — It's Free
                </a>
                <a
                  href="#"
                  className="px-8 py-4 border border-white/20 hover:border-white/50 text-white font-bold text-sm uppercase tracking-wide transition-all duration-200 text-center"
                >
                  Register as a Driver
                </a>
                <p className="text-white/30 text-xs text-center">
                  No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* App badges */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <p className="text-[#64748B] text-sm">Available on iOS & Android</p>
          <div className="flex gap-4">
            <AppBadge store="App Store" />
            <AppBadge store="Google Play" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AppBadge({ store }: { store: string }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 px-5 py-3 bg-[#0F172A] hover:bg-[#1E2D4A] transition-colors border border-slate-700"
    >
      {store === "App Store" ? <AppleIcon /> : <AndroidIcon />}
      <div>
        <div className="text-white/50 text-[10px] uppercase tracking-widest">
          Download on
        </div>
        <div className="text-white text-sm font-semibold">{store}</div>
      </div>
    </a>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.8">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.8">
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C7.15 3.37 6 5.06 6 7h12c0-1.94-1.15-3.63-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
    </svg>
  );
}
