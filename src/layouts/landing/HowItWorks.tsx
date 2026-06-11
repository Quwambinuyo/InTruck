type Step = {
  num: string;
  title: string;
  desc: string;
};

const clientSteps: Step[] = [
  {
    num: "01",
    title: "Post Your Job",
    desc: "Describe what you need InTrucked — material type, quantity, pickup and delivery location.",
  },
  {
    num: "02",
    title: "Receive Driver Bids",
    desc: "Vetted drivers in your area submit competitive bids within minutes.",
  },
  {
    num: "03",
    title: "Pick & Track",
    desc: "Choose your driver, confirm details, and track the truck live until delivery.",
  },
];

const driverSteps: Step[] = [
  {
    num: "01",
    title: "Create Your Profile",
    desc: "Add your truck details, license, and availability. Verification takes under 24 hours.",
  },
  {
    num: "02",
    title: "Browse Client Jobs",
    desc: "Filter jobs by location, material type, and distance. Bid on what fits your route.",
  },
  {
    num: "03",
    title: "Deliver & Earn",
    desc: "Complete the job, get rated, and receive payment directly to your bank account.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-[#0F172A] overflow-hidden relative"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#F97316] text-xs font-semibold uppercase tracking-[0.2em]">
            Simple Process
          </span>
          <h2
            className="text-white mt-2 uppercase leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            Up and running
            <br />
            <span className="text-[#F97316]">in three steps.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Client flow */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 bg-[#1E40AF] flex items-center justify-center">
                <BuildingIcon />
              </div>
              <span
                className="text-white text-xl uppercase"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                }}
              >
                For Clients
              </span>
            </div>
            <div className="flex flex-col gap-0">
              {clientSteps.map((step, i) => (
                <StepItem
                  key={step.num}
                  step={step}
                  isLast={i === clientSteps.length - 1}
                  accent="#1E40AF"
                />
              ))}
            </div>
          </div>

          {/* Driver flow */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 bg-[#F97316] flex items-center justify-center">
                <WheelIcon />
              </div>
              <span
                className="text-white text-xl uppercase"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                }}
              >
                For Drivers
              </span>
            </div>
            <div className="flex flex-col gap-0">
              {driverSteps.map((step, i) => (
                <StepItem
                  key={step.num}
                  step={step}
                  isLast={i === driverSteps.length - 1}
                  accent="#F97316"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 border-t border-white/10 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/60 text-sm max-w-md text-center sm:text-left">
            Whether you're moving 5 tons or 500, InTruck has the drivers and the
            fleet to get it done.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-semibold uppercase tracking-wide transition-colors"
            >
              Post a Job
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-white text-sm font-semibold uppercase tracking-wide transition-colors"
            >
              Sign Up as Driver
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({
  step,
  isLast,
  accent,
}: {
  step: Step;
  isLast: boolean;
  accent: string;
}) {
  return (
    <div className="flex gap-5">
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
          style={{
            backgroundColor: accent,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: "1rem",
          }}
        >
          {step.num}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 min-h-8 my-1"
            style={{ backgroundColor: accent + "30" }}
          />
        )}
      </div>

      {/* Text */}
      <div className="pb-10">
        <h3
          className="text-white text-xl uppercase mb-2"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
          }}
        >
          {step.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}

function BuildingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zm-8 4H7v-2h2v2zm0-4H7V9h2v2zm0-4H7V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
    </svg>
  );
}

function WheelIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}
