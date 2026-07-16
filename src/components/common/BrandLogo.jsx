import Link from "next/link";

// Marketing-site lockup: inline suspension-bridge mark + wordmark.
// Uses currentColor for the structure so it reads on both navy and white,
// with the cables always in the teal brand tone.
function BridgeMark({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* cables */}
      <path d="M6 27 Q10 20 14 14" stroke="var(--color-brand-bright)" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 14 Q24 31 34 14" stroke="var(--color-brand-bright)" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 14 Q38 20 42 27" stroke="var(--color-brand-bright)" strokeWidth="2" strokeLinecap="round" />
      {/* towers */}
      <path d="M14 12 V35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 12 V35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* deck */}
      <path d="M5 35 H43" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function BrandLogo({ inverted = false, showTagline = false, href = "/", className = "" }) {
  const wordColor = inverted ? "text-white" : "text-ink";
  const markColor = inverted ? "text-white" : "text-ink";

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BridgeMark className={`h-9 w-9 shrink-0 ${markColor}`} />
      <span className="flex flex-col leading-none">
        <span className={`text-xl font-bold tracking-tight ${wordColor}`}>SkillBridge</span>
        <span className="mt-0.5 text-xs font-semibold text-brand-bright">EdTech</span>
        {showTagline && (
          <span className={`mt-1 text-[10px] ${inverted ? "text-white/50" : "text-muted"}`}>
            Future skills. Real practice. Real results.
          </span>
        )}
      </span>
    </span>
  );

  return href ? (
    <Link href={href} className="shrink-0">
      {content}
    </Link>
  ) : (
    content
  );
}
