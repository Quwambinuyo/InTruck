type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  type: "client" | "driver";
  initials: string;
  color: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I used to spend two days calling truck owners before a project. Now I post a job on InTruck and have three bids in 30 minutes. The sand arrived the next morning. Unbelievable.",
    name: "Emeka Okafor",
    role: "Site Engineer",
    location: "Abuja, FCT",
    type: "client",
    initials: "EO",
    color: "#1E40AF",
  },
  {
    quote:
      "My tipper was sitting idle 15 days a month. InTruck changed everything. I'm now averaging 22 active days and my earnings doubled in 3 months.",
    name: "Segun Adeyemi",
    role: "Truck Owner-Operator",
    location: "Lagos, LG",
    type: "driver",
    initials: "SA",
    color: "#F97316",
  },
  {
    quote:
      "We needed 40 trips of granite for a highway project in Ogun State. InTruck coordinated five different trucks seamlessly. The platform tracked every trip in real time.",
    name: "Funke Adesola",
    role: "Project Manager, Buildrite Ltd",
    location: "Abeokuta, OG",
    type: "client",
    initials: "FA",
    color: "#1E40AF",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #F97316, transparent)" }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#F97316] text-xs font-semibold uppercase tracking-[0.2em]">
            Real Stories
          </span>
          <h2
            className="text-white mt-2 uppercase leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            Trusted by builders
            <br />
            <span className="text-[#F97316]">and drivers alike.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 pt-12 border-t border-white/10">
          <div className="text-center">
            <div
              className="text-white text-5xl"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
              }}
            >
              4.8
            </div>
            <div className="text-[#F97316] text-lg mt-0.5">★★★★★</div>
            <div className="text-white/40 text-xs uppercase tracking-widest mt-1">
              Avg. Platform Rating
            </div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <div
              className="text-white text-5xl"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
              }}
            >
              98%
            </div>
            <div className="text-white/40 text-xs uppercase tracking-widest mt-1">
              On-time Delivery Rate
            </div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <div
              className="text-white text-5xl"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
              }}
            >
              48k+
            </div>
            <div className="text-white/40 text-xs uppercase tracking-widest mt-1">
              Trips Completed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-200">
      <span
        className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 mb-6"
        style={{
          backgroundColor: t.color + "25",
          color: t.color === "#1E40AF" ? "#60A5FA" : "#FB923C",
        }}
      >
        {t.type === "client" ? "Client" : "Driver"}
      </span>

      <div
        className="text-white/10 text-6xl leading-none mb-2"
        style={{ fontFamily: "Georgia, serif" }}
      >
        "
      </div>

      <p className="text-white/70 text-sm leading-relaxed mb-8">{t.quote}</p>

      <div className="flex items-center gap-3 pt-6 border-t border-white/10">
        <div
          className="w-10 h-10 flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <div className="text-white text-sm font-semibold">{t.name}</div>
          <div className="text-white/40 text-xs">
            {t.role} · {t.location}
          </div>
        </div>
      </div>
    </div>
  );
}
