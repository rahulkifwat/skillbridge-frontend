export default function Loader({ label = "Loading...", fullScreen = true, className = "" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 ${fullScreen ? "min-h-[60vh]" : "py-10"} ${className}`}
    >
      <svg viewBox="0 0 48 32" className="h-12 w-16 animate-pulse" aria-hidden="true">
        <path
          d="M4 24c6-10 12-14 20-14s14 4 20 14"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M2 25h44" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M14 24V12M24 24V8M34 24V12"
          stroke="var(--color-navy)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="6" r="3" fill="var(--color-accent)" />
      </svg>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
