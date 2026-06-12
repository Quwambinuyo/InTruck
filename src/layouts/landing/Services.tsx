import React from "react";

type Service = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  accent: string;
};

const services: Service[] = [
  {
    icon: <ShoppingTruckIcon />,
    title: "Buy a Truck",
    subtitle: "Fleet Ownership",
    description:
      "Browse verified trucks for sale — tippers, flatbeds, tankers, mixers. Inspected, documented, and ready to earn.",
    tag: "Purchase",
    accent: "var(--color-primary)",
  },
  {
    icon: <RentIcon />,
    title: "Rent a Truck",
    subtitle: "Short or Long Term",
    description:
      "Need a fleet for a project? Rent trucks by the day, week, or month. No ownership headaches, just results.",
    tag: "Rental",
    accent: "var(--color-secondary)",
  },
  {
    icon: <DeliveryIcon />,
    title: "Book Delivery",
    subtitle: "InTruckage & Logistics",
    description:
      "Get sand, stone, granite, laterite, gravel — any bulk material — delivered on your schedule by rated drivers.",
    tag: "Logistics",
    accent: "var(--color-success)",
  },
  {
    icon: <DriverIcon />,
    title: "Hire a Driver",
    subtitle: "Vetted Professionals",
    description:
      "Post a job and receive bids from licensed, background-checked drivers within your region. Pay securely in-app.",
    tag: "Drivers",
    accent: "var(--color-warning)",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[--color-background]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="mb-16">
          <span className="text-[--color-secondary] text-xs font-semibold uppercase tracking-[0.2em]">
            What We Offer
          </span>
          <h2
            className="text-[--color-text] mt-2 uppercase leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            One platform.
            <br />
            <span className="text-[--color-primary]">
              Every InTrucking need.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative bg-[--color-surface] border border-slate-100 p-8 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: service.accent }}
      />

      <span
        className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 mb-6"
        style={{
          backgroundColor: service.accent + "18",
          color: service.accent,
        }}
      >
        {service.tag}
      </span>

      <div className="flex items-start gap-5">
        <div
          className="w-14 h-14 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: service.accent + "10" }}
        >
          <div style={{ color: service.accent }}>{service.icon}</div>
        </div>
        <div className="flex-1">
          <p className="text-[--color-text-secondary] text-xs uppercase tracking-widest font-medium mb-0.5">
            {service.subtitle}
          </p>
          <h3
            className="text-[--color-text] mb-3 uppercase"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "1.6rem",
            }}
          >
            {service.title}
          </h3>
          <p className="text-[--color-text-secondary] text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      <a
        href="#"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200"
        style={{ color: service.accent }}
      >
        Learn more
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </a>

      <div
        className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${service.accent}12 50%)`,
        }}
      />
    </div>
  );
}

function ShoppingTruckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.86 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63z" />
    </svg>
  );
}

function RentIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function DriverIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
    </svg>
  );
}
