const footerLinks = {
  Platform: [
    "Find a Driver",
    "Rent a Truck",
    "Buy a Truck",
    "Book Delivery",
    "Track a Shipment",
  ],
  Drivers: [
    "Join as Driver",
    "Driver Dashboard",
    "Earnings Calculator",
    "Safety Guidelines",
    "Driver FAQ",
  ],
  Company: ["About InTruck", "Blog", "Press", "Careers", "Contact Us"],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Dispute Resolution",
  ],
};

export default function LandingFooter() {
  return (
    <footer className="bg-[#0F172A] border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Top row */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand col */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#F97316] flex items-center justify-center">
                <TruckMiniIcon />
              </div>
              <span
                className="text-white text-2xl uppercase"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                }}
              >
                <span className="text-[#F97316]">In</span>Truck
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Nigeria's largest on-demand trucking marketplace. Connecting
              clients and drivers since 2022.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {["X", "IG", "LI", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 border border-white/10 hover:border-white/30 flex items-center justify-center text-white/40 hover:text-white text-xs font-bold transition-all duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4
                className="text-white text-sm uppercase mb-5"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} InTruck Technologies Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-white/30 text-xs">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TruckMiniIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
    </svg>
  );
}
