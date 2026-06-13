import { FaEllipsisV } from "react-icons/fa";

type EarningsItem = {
  month: string;
  value: number;
};

type Props = {
  data: EarningsItem[];
};

const EarningsChart = ({ data }: Props) => {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-black text-black zabalBoldFont">Earnings</h3>
          <p className="text-xs text-black/40 zabalRegFont">Last 6 months</p>
        </div>
        <FaEllipsisV className="text-black/30 cursor-pointer" size={14} />
      </div>

      <div className="flex items-end gap-2 h-32 mb-3">
        {data.map((e) => {
          const heightPct = (e.value / max) * 100;
          const isMax = e.value === max;

          return (
            <div
              key={e.month}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div className="w-full flex items-end" style={{ height: 112 }}>
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${heightPct}%`,
                    background: isMax ? "#000" : "rgba(0,0,0,0.08)",
                  }}
                />
              </div>
              <span className="text-[10px] text-black/40 zabalRegFont">
                {e.month}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-black/8 space-y-1">
        <p className="text-xs text-black/40 zabalRegFont">Peak month</p>
        <p className="text-lg font-black text-black zabalBoldFont">
          ₦4,200,000
        </p>
        <p className="text-xs text-black/40 zabalRegFont">May 2025</p>
      </div>
    </div>
  );
};

export default EarningsChart;
