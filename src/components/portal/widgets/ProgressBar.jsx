export default function ProgressBar({ percent, color = "bg-primary", track = "bg-surface-alt", className = "" }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full ${track} ${className}`}>
      <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
    </div>
  );
}
