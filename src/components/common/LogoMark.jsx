export default function LogoMark({ inverted = false, showTagline = false, className = "" }) {
  const wordColor = inverted ? "text-white" : "text-heading";
  const subColor = inverted ? "text-white/70" : "text-muted";
  const taglineColor = inverted ? "text-white/60" : "text-muted";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 48 32" className="h-8 w-12 shrink-0" aria-hidden="true">
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
      </svg>
      <div className="flex flex-col leading-tight">
        <span className={`text-lg font-extrabold ${wordColor}`}>
          Skill<span className="text-primary">Bridge</span>
        </span>
        <span className={`text-[11px] font-medium uppercase tracking-wide ${subColor}`}>
          EdTech
        </span>
        {showTagline && (
          <span className={`mt-1 text-xs ${taglineColor}`}>
            Future Skills. Real Practice. Real Results.
          </span>
        )}
      </div>
    </div>
  );
}
