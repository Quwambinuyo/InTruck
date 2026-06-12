import React from "react";
import type { UserRole } from "../pages/auth/types";

type RolePickerProps = {
  value: UserRole;
  onChange: (role: UserRole) => void;
};

export default function RolePicker({ value, onChange }: RolePickerProps) {
  const roles: {
    role: UserRole;
    label: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    {
      role: "customer",
      label: "Customer",
      desc: "Post haulage jobs",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      ),
    },
    {
      role: "merchant",
      label: "Merchant",
      desc: "List your trucks",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5S5.17 15.5 6 15.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {roles.map(({ role, label, desc, icon }) => {
        const active = value === role;

        return (
          <button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            className="relative flex flex-col items-start gap-2 p-4 border-2 text-left transition-all duration-150"
            style={{
              borderColor: active ? "#000000" : "#E5E5E5",
              backgroundColor: active ? "#000000" : "#FFFFFF",
            }}
          >
            {active && (
              <span className="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-l-[28px] border-t-white border-l-transparent" />
            )}

            <span
              style={{ color: active ? "#FFFFFF" : "#000000" }}
              className="transition-colors duration-150"
            >
              {icon}
            </span>

            <div>
              <div
                className="text-sm font-bold uppercase tracking-wide"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: active ? "#FFFFFF" : "#000000",
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                }}
              >
                {label}
              </div>

              <div
                className="text-xs mt-0.5"
                style={{
                  color: active ? "rgba(255,255,255,0.7)" : "#666666",
                }}
              >
                {desc}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
