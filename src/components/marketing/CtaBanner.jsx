import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import DarkSection from "./DarkSection";

// Bottom-of-page CTA: headline + two buttons + an optional row of assurances.
// Used on nearly every marketing page in the designs.
export default function CtaBanner({ title, subtitle, primary, primarySlot, secondary, features = [], icon }) {
  return (
    <DarkSection className="rounded-2xl">
      <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:gap-10">
        {icon && (
          <div className="hidden shrink-0 text-brand-bright lg:block" aria-hidden="true">
            {icon}
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-white/70">{subtitle}</p>}
        </div>

        <div className="flex flex-wrap gap-3">
          {primarySlot}
          {primary && (
            <Link
              href={primary.href}
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-hover"
            >
              {primary.label} <HiArrowRight className="h-4 w-4" />
            </Link>
          )}
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {secondary.label} <HiArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {features.length > 0 && (
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 px-8 py-5 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-center gap-2.5">
                {Icon && <Icon className="h-5 w-5 shrink-0 text-brand-bright" aria-hidden="true" />}
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-white">{f.title}</span>
                  <span className="text-xs text-white/60">{f.detail}</span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </DarkSection>
  );
}
