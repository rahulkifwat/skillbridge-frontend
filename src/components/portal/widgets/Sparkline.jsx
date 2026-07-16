// Tiny line chart. `data`: array of numbers in 0..1. Optional soft area fill.
export default function Sparkline({
  data,
  stroke = "#2563eb",
  width = 120,
  height = 36,
  fill = false,
}) {
  const max = 1;
  const stepX = width / (data.length - 1 || 1);
  const points = data.map((v, i) => [i * stepX, height - (v / max) * (height - 4) - 2]);
  const line = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${points[0][0]},${height} ${line} ${points[points.length - 1][0]},${height}`;
  const gradId = `spark-${stroke.replace("#", "")}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="max-w-full">
      {fill && (
        <>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={area} fill={`url(#${gradId})`} />
        </>
      )}
      <polyline points={line} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
