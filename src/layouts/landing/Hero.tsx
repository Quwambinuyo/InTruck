import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function BigTruckSVG() {
  return (
    <svg
      width="900"
      height="500"
      viewBox="0 0 900 500"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="160" width="560" height="200" rx="6" />
      <path d="M570 190 L570 360 L730 360 L730 250 L680 190 Z" />
      <path
        d="M585 200 L630 200 L670 245 L585 245 Z"
        fill="var(--color-text)"
        opacity="0.5"
      />
      <circle cx="120" cy="370" r="60" />
      <circle cx="120" cy="370" r="28" fill="var(--color-text)" opacity="0.6" />
      <circle cx="280" cy="370" r="60" />
      <circle cx="280" cy="370" r="28" fill="var(--color-text)" opacity="0.6" />
      <circle cx="630" cy="370" r="60" />
      <circle cx="630" cy="370" r="28" fill="var(--color-text)" opacity="0.6" />
      <circle cx="720" cy="370" r="50" />
      <circle cx="720" cy="370" r="22" fill="var(--color-text)" opacity="0.6" />
      <rect x="660" y="120" width="16" height="80" rx="4" />
      <rect x="735" y="260" width="30" height="5" rx="2" />
      <rect x="735" y="275" width="30" height="5" rx="2" />
      <rect x="735" y="290" width="30" height="5" rx="2" />
      <rect
        x="740"
        y="240"
        width="20"
        height="12"
        rx="2"
        fill="var(--color-secondary)"
        opacity="0.8"
      />
    </svg>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[--color-text]">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(125deg, var(--color-text) 55%, var(--color-text) 55%)`,
        }}
      />
      <div
        className="absolute z-0"
        style={{
          top: 0,
          right: 0,
          width: "45%",
          height: "100%",
          background: `linear-gradient(125deg, transparent 0%, transparent 45%, white 45%, white 100%)`,
          opacity: 0.12,
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 5px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute right-0 bottom-0 z-0 opacity-[0.07] pointer-events-none select-none hidden lg:block">
        <BigTruckSVG />
      </div>
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-0.5 bg-[--color-secondary]" />
            <span className="text-[--color-secondary] text-xs font-semibold uppercase tracking-[0.2em]">
              Nigeria's #1 Trucking Platform
            </span>
          </div>

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
            <span className="text-[--color-secondary]">Anywhere.</span>
            <br />
            On demand.
          </h1>

          <p
            className="text-white/60 text-lg leading-relaxed max-w-xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Buy trucks, rent a fleet, or book a driver to InTruck sand, stone,
            granite & whatever the job demands. InTruck connects clients and
            drivers across Nigeria in minutes.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <Button
              onClick={() => navigate("/signup")}
              variant="merchant"
              fullWidth={false}
              className="border md:w-[200px] w-full border-white/20 hover:border-white/50 bg-white/25 backdrop-blur-sm"
            >
              Find a Driver
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              variant="customer"
              fullWidth={false}
              className="border w-full md:w-[200px] border-white/20 hover:border-white/50 bg-white/5 backdrop-blur-sm"
            >
              I'm a Driver
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              variant="customer"
              fullWidth={false}
              className="border w-full md:w-[200px] border-[--color-primary] hover:border-[--color-primary-hover] bg-[--color-primary]/40 hover:bg-[--color-primary]/60"
            >
              Browse Fleet
            </Button>
          </div>

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
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
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
