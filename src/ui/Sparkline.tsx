interface SparklineProps {
  data?: number[];
  height?: number;
  stroke?: string;
  fill?: boolean;
}

const Sparkline = ({
  data = [],
  height = 28,
  stroke = "#7C3AED",
  fill = true,
}: SparklineProps) => {
  if (!data.length) return null;

  const width = 92;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as [number, number];
  });

  const d = points
    .map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`))
    .join(" ");

  const area = fill
    ? `M${points[0][0]},${height} ` +
      points.map(([x, y]) => `L${x},${y}`).join(" ") +
      ` L${width},${height} Z`
    : null;

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      {fill && area && <path d={area} fill={stroke} opacity="0.10" />}
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Sparkline;
