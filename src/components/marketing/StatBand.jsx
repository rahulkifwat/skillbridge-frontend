import DarkSection from "./DarkSection";

// Navy strip of headline metrics (50,000+ Active Students, 120+ Countries, ...).
export default function StatBand({ stats, className = "" }) {
  return (
    <DarkSection className={`rounded-2xl ${className}`} glow={false}>
      <div className="grid grid-cols-2 gap-6 px-6 py-7 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-3">
              {Icon && <Icon className="h-7 w-7 shrink-0 text-brand-bright" aria-hidden="true" />}
              <span className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/60">{stat.label}</span>
              </span>
            </div>
          );
        })}
      </div>
    </DarkSection>
  );
}
