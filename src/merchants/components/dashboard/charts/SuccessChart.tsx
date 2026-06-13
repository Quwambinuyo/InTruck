type ScoreItem = {
  month: string;
  score: number;
};

type Props = {
  data: ScoreItem[];
};

const SuccessScoreChart = ({ data }: Props) => {
  const max = Math.max(...data.map((d) => d.score));

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
          94% avg
        </span>
      </div>

      <div className="flex items-end gap-2 h-24 mb-3">
        {data.map((s) => {
          const heightPct = (s.score / max) * 100;
          const isMax = s.score === max;
          const isLow = s.score < 90;

          return (
            <div
              key={s.month}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div className="w-full flex items-end" style={{ height: 88 }}>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${heightPct}%`,
                    background: isMax
                      ? "#000"
                      : isLow
                        ? "#ef4444"
                        : "rgba(0,0,0,0.12)",
                  }}
                />
              </div>
              <span className="text-[10px] text-black/40 zabalRegFont">
                {s.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuccessScoreChart;
