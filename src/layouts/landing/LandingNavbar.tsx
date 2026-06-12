import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Fleet", href: "#fleet" },
  { label: "Drivers", href: "#drivers" },
  { label: "Pricing", href: "#pricing" },
];

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5S5.17 15.5 6 15.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[--color-secondary] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-200">
            <TruckIcon className="w-5 h-5 text-white -rotate-3 group-hover:rotate-0 transition-transform duration-200" />
          </div>

          <span
            className="text-2xl tracking-tight text-white uppercase"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
            }}
          >
            <span className="text-[--color-secondary]">In</span>Truck
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-sm hover:bg-white/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="customer"
            fullWidth={false}
            onClick={() => navigate("/login")}
            className="py-2 px-4 bg-transparent hover:bg-white/10 hover:shadow-none text-white/80 hover:text-white text-sm font-medium normal-case tracking-normal"
          >
            Sign In
          </Button>

          <Button
            variant="merchant"
            fullWidth={false}
            onClick={() => navigate("/signup")}
            className="py-2 px-5 text-sm"
          >
            Get Started
          </Button>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-black/90 backdrop-blur-md`}
      >
        <ul className="flex flex-col px-6 py-4 gap-1 border-t border-white/10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 text-white/70 hover:text-white font-medium text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 px-6 pb-5 pt-2 border-t border-white/10">
          <Button
            variant="customer"
            fullWidth
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
            className="py-2.5 bg-transparent hover:bg-white/10 hover:shadow-none text-white/80 hover:text-white text-sm font-medium normal-case tracking-normal"
          >
            Sign In
          </Button>

          <Button
            variant="merchant"
            fullWidth
            onClick={() => {
              setMenuOpen(false);
              navigate("/signup");
            }}
            className="py-2.5 text-sm"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
