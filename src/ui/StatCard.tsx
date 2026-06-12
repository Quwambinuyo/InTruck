import type { ReactNode } from "react";
import Sparkline from "./Sparkline";

type Trend = "up" | "down" | "flat";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  trend?: Trend;
  icon?: ReactNode;
  sparkline?: number[];
  footer?: ReactNode;
  tooltip?: string;
}

const StatCard = ({
  label,
  value,
  delta,
  trend = "flat",
  icon,
  sparkline,
  footer,
  tooltip,
}: StatCardProps) => {
  const trendColor =
    trend === "up" ? "#000000" : trend === "down" ? "#000000" : "#64748B";

  const trendArrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "–";

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">
          {label}
        </p>

        <div className="flex items-center gap-2 flex-shrink-0">
          {icon && <span className="text-black">{icon}</span>}

          {tooltip && (
            <span className="relative group flex items-center justify-center">
              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-black text-white text-[10px] font-bold cursor-default">
                i
              </span>

              <span className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto absolute top-6 right-0 w-52 bg-white text-black text-[11px] leading-relaxed border border-black/10 rounded-lg p-2 shadow-lg z-50">
                {tooltip}
                <span className="absolute -top-1 right-2 w-2 h-2 bg-white rotate-45 border-l border-t border-black/10" />
              </span>
            </span>
          )}
        </div>
      </div>

      <p className="mt-2 text-3xl font-black text-black leading-none">
        {value}
      </p>

      <div className="flex items-center justify-between mt-3">
        {delta ? (
          <span
            className="text-xs font-semibold flex items-center gap-1"
            style={{ color: trendColor }}
          >
            <span>{trendArrow}</span> {delta}
          </span>
        ) : (
          <span />
        )}

        {sparkline && (
          <Sparkline
            data={sparkline}
            stroke={trend === "down" ? "#000000" : "#000000"}
          />
        )}
      </div>

      {footer && <div className="mt-3 text-xs text-black/60">{footer}</div>}
    </div>
  );
};

export default StatCard;
