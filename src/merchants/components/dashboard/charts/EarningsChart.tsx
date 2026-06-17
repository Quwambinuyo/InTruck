import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FaEllipsisV } from "react-icons/fa";

type EarningsItem = {
  month: string;
  value: number;
};

type Props = {
  data: EarningsItem[];
};

const formatNaira = (n: number) => {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(0)}k`;
  return `₦${n}`;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black text-white text-[11px] zabalSemiboldFont px-3 py-2 rounded-lg shadow-lg">
      <p className="text-white/60 mb-0.5">{label}</p>
      <p>₦{payload[0].value.toLocaleString("en-NG")}</p>
    </div>
  );
};

const EarningsChart = ({ data }: Props) => {
  const max = Math.max(...data.map((d) => d.value));
  const peak = data.find((d) => d.value === max);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-black text-black zabalBoldFont">Earnings</h3>
          <p className="text-xs text-black/40 zabalRegFont">Last 6 months</p>
        </div>
        <FaEllipsisV className="text-black/30 cursor-pointer" size={14} />
      </div>

      <div className="h-36 w-full mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="28%" barGap={4}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "rgba(0,0,0,0.4)",
                fontFamily: "inherit",
              }}
              dy={6}
            />
            <YAxis hide tickFormatter={formatNaira} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0,0,0,0.04)", radius: 6 }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.month}
                  fill={entry.value === max ? "#000000" : "rgba(0,0,0,0.08)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-4 border-t border-black/[0.08] space-y-1">
        <p className="text-xs text-black/40 zabalRegFont">Peak month</p>
        <p className="text-lg font-black text-black zabalBoldFont">
          ₦{max.toLocaleString("en-NG")}
        </p>
        <p className="text-xs text-black/40 zabalRegFont">{peak?.month}</p>
      </div>
    </div>
  );
};

export default EarningsChart;
