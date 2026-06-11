import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { FaApple, FaAndroid } from "react-icons/fa";

function AppBadge({ store }: { store: string }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/signup")}
      className="flex items-center gap-3 px-5 py-3 bg-[#0F172A] hover:bg-[#1E2D4A] transition-colors border border-slate-700"
    >
      {store === "App Store" ? (
        <FaApple className="w-5 h-5 text-white/80" />
      ) : (
        <FaAndroid className="w-5 h-5 text-white/80" />
      )}
      <div>
        <div className="text-white/50 text-[10px] uppercase tracking-widest">
          Download on
        </div>
        <div className="text-white text-sm font-semibold">{store}</div>
      </div>
    </button>
  );
}

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="relative bg-[#0F172A] overflow-hidden">
          <div
            className="absolute top-0 right-0 bottom-0 w-1/2 opacity-20"
            style={{
              background:
                "linear-gradient(135deg, transparent 30%, #F97316 30%)",
            }}
          />
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
                <Button
                  onClick={() => navigate("/signup")}
                  variant="merchant"
                  fullWidth={false}
                  className="px-8 py-4 text-center"
                >
                  Post a Job It's Free!
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="customer"
                  fullWidth={false}
                  className="border border-white/20 hover:border-white/50 bg-transparent text-white"
                >
                  Register as a Driver
                </Button>
                <p className="text-white/30 text-xs text-center">
                  No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>

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
