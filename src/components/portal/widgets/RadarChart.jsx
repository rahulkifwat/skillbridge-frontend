// Radar / spider chart for skill snapshots. `data`: [{ label, value }] (value 0-100).
// Optional `compare`: a second series [{ value }] aligned to `data` by index,
// drawn behind the main series in `compareFill`. Omit it for a single series.
export default function RadarChart({
  data,
  size = 260,
  levels = 4,
  fill = "#2563eb",
  compare = null,
  compareFill = "#94a3b8",
}) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 44;
  const count = data.length;

  const pointAt = (index, ratio) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    return [cx + radius * ratio * Math.cos(angle), cy + radius * ratio * Math.sin(angle)];
  };

  const gridPolys = Array.from({ length: levels }, (_, l) => {
    const ratio = (l + 1) / levels;
    const pts = data.map((_, i) => pointAt(i, ratio).join(",")).join(" ");
    return <polygon key={l} points={pts} fill="none" stroke="#e2e8f0" strokeWidth="1" />;
  });

  const axes = data.map((_, i) => {
    const [x, y] = pointAt(i, 1);
    return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
  });

  const valuePts = data.map((d, i) => pointAt(i, d.value / 100).join(",")).join(" ");

  const labels = data.map((d, i) => {
    const [x, y] = pointAt(i, 1.22);
    return (
      <text
        key={i}
        x={x}
        y={y}
        textAnchor={x < cx - 4 ? "end" : x > cx + 4 ? "start" : "middle"}
        dominantBaseline="middle"
        className="fill-muted text-[10px] font-medium"
      >
        {d.label}
      </text>
    );
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-full">
      {gridPolys}
      {axes}
      {compare && (
        <polygon
          points={compare.map((d, i) => pointAt(i, d.value / 100).join(",")).join(" ")}
          fill={compareFill}
          fillOpacity="0.12"
          stroke={compareFill}
          strokeWidth="2"
        />
      )}
      <polygon points={valuePts} fill={fill} fillOpacity="0.18" stroke={fill} strokeWidth="2" />
      {data.map((d, i) => {
        const [x, y] = pointAt(i, d.value / 100);
        return <circle key={i} cx={x} cy={y} r="3" fill={fill} />;
      })}
      {labels}
    </svg>
  );
}
