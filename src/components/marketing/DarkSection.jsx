// Deep-navy band used for heroes and CTA strips across the marketing site.
// The radial glows approximate the "network/globe" lighting in the designs.
export default function DarkSection({ className = "", glow = true, children }) {
  return (
    <section className={`relative overflow-hidden bg-ink text-white ${className}`}>
      {glow && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-brand/20 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-sky-500/10 blur-3xl" />
        </div>
      )}
      <div className="relative">{children}</div>
    </section>
  );
}
