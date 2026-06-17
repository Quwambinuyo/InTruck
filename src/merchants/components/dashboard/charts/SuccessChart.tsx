import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

type ScoreItem = {
  month: string;
  score: number;
};

type Props = {
  data: ScoreItem[];
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
  const score = payload[0].value;
  const isLow = score < 90;
  return (
    <div
      className="text-white text-[11px] zabalSemiboldFont px-3 py-2 rounded-lg shadow-lg"
      style={{ background: isLow ? "#ef4444" : "#000" }}
    >
      <p className="text-white/60 mb-0.5">{label}</p>
      <p>{score}%</p>
    </div>
  );
};

const SuccessScoreChart = ({ data }: Props) => {
  const max = Math.max(...data.map((d) => d.score));
  const avg = Math.round(data.reduce((s, d) => s + d.score, 0) / data.length);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-black text-black zabalBoldFont">Success Score</h3>
          <p className="text-xs text-black/40 zabalRegFont">
            On-time delivery rate
          </p>
        </div>

        <span className="text-xs font-bold text-black zabalBoldFont bg-black/5 px-2 py-1 rounded-lg">
          {avg}% avg
        </span>
      </div>

      <div className="h-28 w-full mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="28%">
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
            <YAxis hide domain={[80, 100]} />
            <ReferenceLine
              y={90}
              stroke="rgba(0,0,0,0.1)"
              strokeDasharray="3 3"
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0,0,0,0.04)", radius: 6 }}
            />
            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.month}
                  fill={
                    entry.score === max
                      ? "#000000"
                      : entry.score < 90
                        ? "#ef4444"
                        : "rgba(0,0,0,0.12)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SuccessScoreChart;
