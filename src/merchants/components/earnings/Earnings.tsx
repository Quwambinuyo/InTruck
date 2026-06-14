import { useState } from "react";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaTruck,
  FaHourglassHalf,
  FaCoins,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import FilterChip from "../../../ui/FilterChip";
import PayoutStatusPill from "./PayoutStatusPill";
import {
  EARNINGS_SUMMARY,
  EARNINGS_CHART_DATA,
  EARNINGS_BREAKDOWN,
  RECENT_PAYOUTS,
  EARNINGS_RANGE_OPTIONS,
  type EarningsRange,
} from "../../mock/mockEarningsData";

const formatNaira = (value: number) => `₦${value.toLocaleString()}`;

const formatCompactNaira = (value: number) => {
  if (value >= 1000000) return `₦${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `₦${(value / 1000).toFixed(0)}K`;
  return `₦${value}`;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-black/10 rounded-xl px-3 py-2 shadow-lg">
      <p className="text-[11px] text-black/40 mb-0.5">{label}</p>
      <p className="text-[13px] zabalSemiboldFont text-black">
        {formatNaira(payload[0].value)}
      </p>
    </div>
  );
};

const Earnings = () => {
  const [range, setRange] = useState<EarningsRange>("30d");

  const summary = EARNINGS_SUMMARY[range];
  const chartData = EARNINGS_CHART_DATA[range];
  const breakdown = EARNINGS_BREAKDOWN[range];
  const isPositive = summary.change >= 0;

  return (
    <div className="w-full space-y-4 pb-10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-black">Earnings</h2>
          <p className="text-xs text-black/40">
            Track your revenue, payouts and performance
          </p>
        </div>
      </div>

      <FilterChip
        options={EARNINGS_RANGE_OPTIONS.map((o) => o.value)}
        value={range}
        onChange={setRange}
        labels={Object.fromEntries(
          EARNINGS_RANGE_OPTIONS.map((o) => [o.value, o.label]),
        )}
      />

      <div className="bg-black rounded-2xl p-5 text-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <FaWallet className="text-white/80 text-sm" />
            </div>
            <p className="text-xs text-white/50">Total earnings</p>
          </div>
          <span
            className={`inline-flex items-center gap-1 text-[11px] zabalSemiboldFont px-2.5 py-1 rounded-full border ${
              isPositive
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}
          >
            {isPositive ? <FaArrowUp /> : <FaArrowDown />}
            {Math.abs(summary.change)}%
          </span>
        </div>

        <p className="text-3xl zabalSemiboldFont">
          {formatNaira(summary.total)}
        </p>

        <div className="h-[140px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="earningsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ stroke: "rgba(255,255,255,0.2)" }}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#ffffff"
                strokeWidth={2}
                fill="url(#earningsFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-black/10 rounded-2xl p-4 flex flex-col gap-1">
          <div className="w-7 h-7 rounded-full bg-black/[0.04] flex items-center justify-center mb-1">
            <FaTruck className="text-black/50 text-xs" />
          </div>
          <p className="text-[11px] text-black/40">Jobs completed</p>
          <p className="text-lg zabalSemiboldFont text-black">
            {summary.jobsCompleted}
          </p>
        </div>
        <div className="bg-white border border-black/10 rounded-2xl p-4 flex flex-col gap-1">
          <div className="w-7 h-7 rounded-full bg-black/[0.04] flex items-center justify-center mb-1">
            <FaCoins className="text-black/50 text-xs" />
          </div>
          <p className="text-[11px] text-black/40">Avg per job</p>
          <p className="text-lg zabalSemiboldFont text-black">
            {formatCompactNaira(summary.avgPerJob)}
          </p>
        </div>
        <div className="bg-white border border-black/10 rounded-2xl p-4 flex flex-col gap-1">
          <div className="w-7 h-7 rounded-full bg-black/[0.04] flex items-center justify-center mb-1">
            <FaHourglassHalf className="text-black/50 text-xs" />
          </div>
          <p className="text-[11px] text-black/40">Pending</p>
          <p className="text-lg zabalSemiboldFont text-black">
            {formatCompactNaira(summary.pending)}
          </p>
        </div>
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-black text-sm">Jobs vs earnings</h3>
          <p className="text-[11px] text-black/40">{range.toUpperCase()}</p>
        </div>
        <div className="h-[180px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(0,0,0,0.35)", fontSize: 11 }}
              />
              <YAxis hide />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "rgba(0,0,0,0.03)" }}
              />
              <Bar dataKey="earnings" radius={[6, 6, 0, 0]} fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-black text-sm">Earnings by truck type</h3>
        <div className="flex items-center gap-6">
          <div className="w-[120px] h-[120px] flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {breakdown.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) =>
                    formatNaira(
                      typeof value === "number" ? value : Number(value ?? 0),
                    )
                  }
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.08)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2.5">
            {breakdown.map((entry) => {
              const total = breakdown.reduce((s, b) => s + b.value, 0);
              const pct = ((entry.value / total) * 100).toFixed(0);
              return (
                <div
                  key={entry.label}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-black/60">{entry.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="zabalSemiboldFont text-black">
                      {formatCompactNaira(entry.value)}
                    </span>
                    <span className="text-black/30 w-9 text-right">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-black text-sm">Recent payouts</h3>
          <p className="text-[11px] text-black/40">
            {RECENT_PAYOUTS.length} total
          </p>
        </div>
        <div className="space-y-2">
          {RECENT_PAYOUTS.map((payout) => (
            <div
              key={payout.id}
              className="flex items-center justify-between border border-black/[0.06] rounded-xl px-4 py-3"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] zabalSemiboldFont text-black">
                  {formatNaira(payout.amount)}
                </p>
                <p className="text-[11px] text-black/40">
                  {formatDate(payout.date)} • {payout.method}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <PayoutStatusPill status={payout.status} />
                <p className="text-[10px] text-black/30">{payout.reference}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Earnings;
