import type { UserRole } from "./types";

type RoleToggleProps = {
  value: UserRole;
  onChange: (role: UserRole) => void;
  label?: string;
};

const roles: {
  value: UserRole;
  label: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "customer",
    label: "Customer",
    desc: "Find drivers & order InTruckage",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
      </svg>
    ),
  },
  {
    value: "merchant",
    label: "Merchant",
    desc: "List trucks & manage fleet",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5S5.17 15.5 6 15.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
  },
];

export default function RoleToggle({
  value,
  onChange,
  label = "I am a",
}: RoleToggleProps) {
  return (
    <div className="mb-6">
      <p className="text-[#0F172A] text-xs font-bold uppercase tracking-[0.15em] mb-3">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {roles.map((role) => {
          const active = value === role.value;
          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onChange(role.value)}
              className={`flex items-start gap-3 p-4 border-2 transition-all duration-150 text-left ${
                active
                  ? "border-[#1E40AF] bg-[#1E40AF]/5"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div
                className={`mt-0.5 flex-shrink-0 transition-colors ${
                  active ? "text-[#1E40AF]" : "text-[#94A3B8]"
                }`}
              >
                {role.icon}
              </div>
              <div>
                <div
                  className={`text-sm font-bold uppercase transition-colors ${
                    active ? "text-[#1E40AF]" : "text-[#0F172A]"
                  }`}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.95rem",
                  }}
                >
                  {role.label}
                </div>
                <div className="text-[#64748B] text-[11px] leading-snug mt-0.5">
                  {role.desc}
                </div>
              </div>
              {/* Active indicator dot */}
              <div className="ml-auto flex-shrink-0 mt-1">
                <div
                  className={`w-4 h-4 border-2 flex items-center justify-center transition-all ${
                    active
                      ? "border-[#1E40AF] bg-[#1E40AF]"
                      : "border-slate-300"
                  }`}
                >
                  {active && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
                      <path
                        d="M1 4l2 2 4-4"
                        stroke="white"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
