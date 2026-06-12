import type { ReactNode } from "react";
import Sparkline from "./Sparkline";

type Trend = "up" | "down" | "flat";
type Accent = "purple" | "teal" | "gold" | "crit";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  trend?: Trend;
  accent?: Accent;
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
  accent = "purple",
  icon,
  sparkline,
  footer,
  tooltip,
}: StatCardProps) => {
  const accentClass: Record<Accent, string> = {
    purple: "kpi bg-white rounded-2xl p-5 shadow-sm border border-slate-100",
    teal: "kpi kpi-teal bg-white rounded-2xl p-5 shadow-sm border border-slate-100",
    gold: "kpi kpi-gold bg-white rounded-2xl p-5 shadow-sm border border-slate-100",
    crit: "kpi kpi-crit bg-white rounded-2xl p-5 shadow-sm border border-slate-100",
  };

  const trendColor =
    trend === "up" ? "#059669" : trend === "down" ? "#DC2626" : "#888888";
  const trendArrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "–";

  return (
    <div className={accentClass[accent]}>
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold tracking-wider uppercase text-muted">
          {label}
        </p>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {icon && <span className="text-silver">{icon}</span>}
          {tooltip && (
            <span
              className="relative flex-shrink-0 group"
              style={{ display: "inline-flex" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "rgba(124,58,237,0.12)",
                  color: "#7C3AED",
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "default",
                  lineHeight: 1,
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                i
              </span>
              <span
                className="transition-opacity duration-150 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto zabalBoldFont"
                style={{
                  position: "absolute",
                  top: 20,
                  right: 0,
                  zIndex: 50,
                  width: 220,
                  background: "#ffffff",
                  color: "#000000",
                  fontSize: 11,
                  lineHeight: 1.5,
                  borderRadius: 8,
                  padding: "8px 10px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  whiteSpace: "normal",
                  border: "1px solid #e2e8f0",
                }}
              >
                {tooltip}
                <span
                  style={{
                    position: "absolute",
                    top: -5,
                    right: 4,
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderBottom: "5px solid #ffffff",
                  }}
                />
              </span>
            </span>
          )}
        </div>
      </div>
      <p className="mt-2 text-3xl font-black leading-none tracking-tight text-ink">
        {value}
      </p>
      <div className="flex items-center justify-between mt-2">
        {delta ? (
          <span
            className="flex items-center gap-1 text-xs font-bold"
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
            stroke={trend === "down" ? "#DC2626" : "#7C3AED"}
          />
        )}
      </div>
      {footer && <div className="mt-3 text-xs text-slate">{footer}</div>}
    </div>
  );
};

export default StatCard;
