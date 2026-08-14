import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { sidebarPromoContent } from "@/data/studentPortal";

// Glowing promo card pinned to the bottom of the student sidebar.
export default function SidebarPromo({ variant = "learning" }) {
  const promo = sidebarPromoContent[variant];
  if (!promo) return null;

  const Icon = promo.icon;
  const isCareer = variant === "career";

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-blue-950 to-indigo-950 p-4">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/30 blur-2xl"
      />

      {isCareer ? (
        <>
          <p className="relative text-sm font-semibold leading-snug text-white">
            Not sure which <span className="text-amber">career</span> is right for you?
          </p>
          <p className="relative mt-2 text-xs leading-relaxed text-white/60">{promo.body}</p>
          <span
            aria-hidden="true"
            className="relative mt-3 flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/20 text-xs font-bold text-white"
          >
            AI
          </span>
          <Link
            href="/student/assessments"
            className="relative mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            {promo.cta}
            <HiArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </>
      ) : (
        <div className="relative flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/25 text-primary-light">
            <Icon aria-hidden="true" className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold leading-snug text-white">{promo.title}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/55">{promo.body}</p>
            <Link
              href="/student/assessments"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-amber hover:underline"
            >
              Learn More
              <HiArrowRight aria-hidden="true" className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
