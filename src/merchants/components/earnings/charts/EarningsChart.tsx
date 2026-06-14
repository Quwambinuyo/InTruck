import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type BreakdownItem = {
  label: string;
  value: number;
  color: string;
};

type ChartItem = {
  label: string;
  earnings: number;
};

const ChartTooltip = ({ active, payload, label, formatNaira }: any) => {
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

type Props = {
  chartData: ChartItem[];
  breakdown: BreakdownItem[];
  range: string;
  formatNaira: (v: number) => string;
  formatCompactNaira: (v: number) => string;
};

const EarningsCharts = ({
  chartData,
  breakdown,
  range,
  formatNaira,
  formatCompactNaira,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="bg-black rounded-2xl p-5 text-white space-y-4">
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
                content={(props) => (
                  <ChartTooltip {...props} formatNaira={formatNaira} />
                )}
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
              <Tooltip
                content={(props) => (
                  <ChartTooltip {...props} formatNaira={formatNaira} />
                )}
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
    </div>
  );
};

export default EarningsCharts;
