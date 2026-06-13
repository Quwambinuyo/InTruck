import React from "react";
import Button from "../../ui/Button";

type Perk = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const perks: Perk[] = [
  {
    icon: <MoneyIcon />,
    title: "Earn More",
    desc: "Set your own rates and bid on jobs that make financial sense for your truck.",
  },
  {
    icon: <CalendarIcon />,
    title: "Work Your Schedule",
    desc: "No mandatory shifts. Accept jobs when you want, rest when you need.",
  },
  {
    icon: <ShieldIcon />,
    title: "Protected Payments",
    desc: "Client funds are held in escrow until delivery is confirmed. You always get paid.",
  },
  {
    icon: <MapIcon />,
    title: "Jobs Near You",
    desc: "Smart job matching surfaces loads within your preferred operating radius first.",
  },
];

export default function Drivers() {
  return (
    <section
      id="drivers"
      className="py-24 bg-[--color-background] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[--color-text]" />
              <span className="text-[--color-text] text-xs font-semibold uppercase tracking-[0.2em]">
                For Drivers
              </span>
            </div>

            <h2
              className="text-[--color-text] mt-2 mb-6 uppercase leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              Your truck.
              <br />
              <span className="text-[--color-primary]">Your terms.</span>
              <br />
              Your income.
            </h2>

            <p className="text-[--color-text-secondary] text-base leading-relaxed mb-8 max-w-lg">
              Stop waiting for middlemen to call you. InTruck lets you build
              your own client base, earn consistently, and grow your business
              all from your phone.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Button
                fullWidth={false}
                className="px-7 !py-3.5 text-black bg-black"
              >
                Register as a Driver
              </Button>

              <Button
                variant="customer"
                fullWidth={false}
                className="px-7 !py-3.5 tex-black !bg-black/90 border border-[--color-text]/20 hover:border-[--color-text]/50 !text-[--color-text] hover:!bg-[--color-text] hover:!text-white"
              >
                See Driver FAQ
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-6 border-t border-black/10">
              {[
                { label: "Verified Drivers", value: "2,400+" },
                { label: "Avg. Monthly Earnings", value: "₦380k" },
                { label: "Jobs Completed", value: "48,000+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-[--color-text] text-2xl"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                    }}
                  >
                    {stat.value}
                  </div>

                  <div className="text-[--color-text-secondary] text-xs uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-black/10">
            {perks.map((perk, i) => (
              <div
                key={perk.title}
                className={`group relative p-8 bg-white hover:bg-[--color-text] transition-colors duration-300 overflow-hidden
                  ${i % 2 === 0 ? "border-r border-black/10" : ""}
                  ${i < 2 ? "border-b border-black/10" : ""}
                `}
              >
                <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-[--color-primary]" />

                <div className="w-10 h-10 border border-black/10 flex items-center justify-center mb-6 text-[--color-text] transition-colors duration-300">
                  {perk.icon}
                </div>

                <h3
                  className="text-[--color-text] text-lg uppercase mb-2 transition-colors duration-300"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {perk.title}
                </h3>

                <p className="text-[--color-text-secondary] text-sm leading-relaxed transition-colors duration-300">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MoneyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
    </svg>
  );
}
