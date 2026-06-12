import type { ReactNode } from "react";

export type BadgeTone =
  | "purple"
  | "teal"
  | "gold"
  | "ok"
  | "warn"
  | "crit"
  | "info"
  | "muted";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const Badge = ({ children, tone = "purple", className = "" }: BadgeProps) => {
  const map: Record<BadgeTone, string> = {
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    teal: "bg-teal-50 text-teal-600 border-teal-100",
    gold: "bg-yellow-50 text-yellow-600 border-yellow-100",
    ok: "bg-green-50 text-green-600 border-green-100",
    warn: "bg-orange-50 text-orange-600 border-orange-100",
    crit: "bg-red-50 text-red-600 border-red-100",
    info: "bg-blue-50 text-blue-600 border-blue-100",
    muted: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
        map[tone]
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
