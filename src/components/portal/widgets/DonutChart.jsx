// Multi-segment donut / progress ring built from stroked SVG circles.
// `segments`: [{ value, color }] where values are summed to form the whole.
export default function DonutChart({
  segments,
  size = 160,
  thickness = 16,
  track = "#e2e8f0",
  gap = 0,
  children,
}) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  let offset = 0;
  const arcs = segments.map((seg, i) => {
    const fraction = seg.value / total;
    const length = Math.max(fraction * circumference - gap, 0);
    const dashoffset = -offset * circumference;
    offset += fraction;
    return (
      <circle
        key={i}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={seg.color}
        strokeWidth={thickness}
        strokeLinecap={gap ? "round" : "butt"}
        strokeDasharray={`${length} ${circumference - length}`}
        strokeDashoffset={dashoffset}
      />
    );
  });

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={thickness} />
        {arcs}
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      )}
    </div>
  );
}
