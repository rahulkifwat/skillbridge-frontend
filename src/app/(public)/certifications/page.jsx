import Link from "next/link";
import { HiArrowRight, HiClock, HiChevronLeft, HiChevronRight, HiCheckBadge } from "react-icons/hi2";
import Container from "@/components/common/Container";
import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import DarkSection from "@/components/marketing/DarkSection";
import MarketingHeading from "@/components/marketing/MarketingHeading";
import CtaBanner from "@/components/marketing/CtaBanner";
import DonutChart from "@/components/portal/widgets/DonutChart";
import {
  heroFeatures,
  heroStats,
  certificatePreview,
  certificationTypes,
  featuredCertifications,
  levelStyles,
  journeySteps,
  journeyProgress,
  studentCertifications,
  certificationPartners,
  ctaAssurances,
} from "@/data/certifications";

export const metadata = {
  title: "Certifications — SkillBridge EdTech",
  description:
    "Earn industry-recognized certifications that validate your skills and open doors to top global opportunities.",
};

function ViewAll({ href, label }) {
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand hover:underline"
    >
      {label} <HiArrowRight className="h-4 w-4" />
    </Link>
  );
}

// Embossed gold award seal built from an SVG starburst + medallion + ribbon.
function AwardSeal() {
  // 16-point scalloped starburst (alternating outer/inner radius).
  const burst = Array.from({ length: 32 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 32 - Math.PI / 2;
    const r = i % 2 === 0 ? 38 : 31;
    return `${(40 + r * Math.cos(angle)).toFixed(1)},${(40 + r * Math.sin(angle)).toFixed(1)}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 80 96" className="h-20 w-16" aria-hidden="true">
      <defs>
        <radialGradient id="cert-gold" cx="38%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <linearGradient id="cert-ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c2410c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
      </defs>
      {/* ribbon tails */}
      <path d="M30 62 L26 92 L36 84 L40 92 L40 62 Z" fill="url(#cert-ribbon)" />
      <path d="M50 62 L54 92 L44 84 L40 92 L40 62 Z" fill="url(#cert-ribbon)" />
      {/* starburst + medallion */}
      <polygon points={burst} fill="#d97706" />
      <circle cx="40" cy="40" r="29" fill="url(#cert-gold)" />
      <circle cx="40" cy="40" r="29" fill="none" stroke="#fde68a" strokeWidth="1.5" strokeOpacity="0.7" />
      <circle cx="40" cy="40" r="22" fill="none" stroke="#92400e" strokeWidth="1" strokeOpacity="0.5" />
      {/* inner star */}
      <polygon
        points={Array.from({ length: 10 }, (_, i) => {
          const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
          const r = i % 2 === 0 ? 12 : 5;
          return `${(40 + r * Math.cos(angle)).toFixed(1)},${(40 + r * Math.sin(angle)).toFixed(1)}`;
        }).join(" ")}
        fill="#fffbeb"
        fillOpacity="0.9"
      />
    </svg>
  );
}

// Decorative L-shaped corner flourish for the certificate frame.
function CornerFlourish({ className }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute h-6 w-6 border-brand/50 ${className}`} />
  );
}

// Paper-styled mock of the certificate shown in the hero. Purely decorative
// markup — no image assets exist in this project.
function CertificatePreview() {
  const c = certificatePreview;
  return (
    <div className="mx-auto w-full max-w-md rotate-1 rounded-lg bg-white p-2.5 shadow-2xl shadow-black/50">
      {/* Outer gold frame */}
      <div className="relative rounded-md border-[3px] border-double border-amber-500/60 bg-[#fffdf7] p-1.5">
        {/* Inner hairline frame with corner flourishes */}
        <div className="relative rounded-sm border border-brand/25 px-5 py-6 text-center sm:px-8 sm:py-7">
          <CornerFlourish className="left-1.5 top-1.5 border-l-2 border-t-2" />
          <CornerFlourish className="right-1.5 top-1.5 border-r-2 border-t-2" />
          <CornerFlourish className="bottom-1.5 left-1.5 border-b-2 border-l-2" />
          <CornerFlourish className="bottom-1.5 right-1.5 border-b-2 border-r-2" />

          <div className="flex items-center justify-center gap-2">
            <HiCheckBadge className="h-5 w-5 text-brand" aria-hidden="true" />
            <span className="text-left leading-none">
              <span className="block text-sm font-bold text-ink">{c.brand}</span>
              <span className="block text-[9px] font-medium text-brand">{c.brandSub}</span>
            </span>
          </div>

          <h3 className="mt-5 font-serif text-2xl font-bold tracking-[0.18em] text-ink sm:text-[1.7rem]">
            {c.title}
          </h3>
          <p className="mt-1 text-[10px] font-medium tracking-[0.35em] text-muted">{c.subtitle}</p>

          <p className="mt-5 text-[10px] italic text-muted">{c.intro}</p>
          <p className="mt-2 font-serif text-[1.6rem] italic leading-tight text-ink">{c.recipient}</p>
          <span className="mx-auto mt-1 block h-px w-40 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

          <p className="mt-4 text-[10px] text-muted">{c.completion}</p>
          <p className="mt-1.5 text-sm font-bold text-brand">{c.program}</p>

          <p className="mt-3 text-[10px] text-muted">{c.recognition}</p>
          <p className="mt-1 text-xs font-medium text-body">{c.designation}</p>

          <div className="mt-3 flex justify-center">
            <AwardSeal />
          </div>

          <div className="mt-3 flex items-end justify-between gap-4 text-left">
            <div className="min-w-0">
              <p className="text-[10px] text-body">{c.date}</p>
              <p className="mt-1 border-t border-border pt-1 text-[9px] text-muted">{c.dateLabel}</p>
            </div>
            <div className="min-w-0 text-right">
              <p className="font-serif text-sm italic text-ink">{c.signatory}</p>
              <p className="mt-1 border-t border-border pt-1 text-[9px] text-muted">
                {c.signatory}, {c.signatoryRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificationsPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection>
        <Container className="py-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Headline + features */}
            <div className="lg:col-span-5">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Get Certified.
                <br />
                Get Hired. <span className="text-brand-mint">Go Global.</span>
              </h1>
              <p className="mt-5 max-w-md text-base text-white/70">
                Earn industry-recognized certifications that validate your skills and open doors to
                top global opportunities.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
                {heroFeatures.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title}>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line bg-white/5">
                        <Icon className="h-5 w-5 text-brand-mint" aria-hidden="true" />
                      </span>
                      <h2 className="mt-2.5 text-xs font-semibold text-white">{f.title}</h2>
                      <p className="mt-1 text-xs leading-relaxed text-white/60">{f.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certificate */}
            <div className="lg:col-span-4">
              <CertificatePreview />
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-4 sm:flex-row lg:col-span-3 lg:flex-col">
              {heroStats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex flex-1 items-center gap-3 rounded-xl border border-ink-line bg-white/5 px-4 py-4"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                      <Icon className="h-5 w-5 text-brand-mint" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-xl font-bold text-white">{s.value}</span>
                      <span className="text-xs text-white/60">{s.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </DarkSection>

      {/* Certifications by Type */}
      <section className="bg-surface py-10">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-6">
            <MarketingHeading
              title="Certifications by Type"
              action={<ViewAll href="/certifications" label="View All Certifications" />}
              className="mb-6"
            />
            {/* Scrolls inside itself so the page never scrolls horizontally. */}
            <div className="-mx-2 overflow-x-auto px-2">
              <div className="flex min-w-max divide-x divide-border">
                {certificationTypes.map((t) => {
                  const Icon = t.icon;
                  return (
                    <Link
                      key={t.name}
                      href="/certifications"
                      aria-current={t.active ? "page" : undefined}
                      className={`flex w-28 flex-col items-center gap-2 px-2 pb-3 pt-1 text-center ${
                        t.active ? "border-b-2 border-brand" : "border-b-2 border-transparent"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${t.active ? "text-brand" : "text-muted"}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-xs font-medium ${
                          t.active ? "text-brand" : "text-body"
                        }`}
                      >
                        {t.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Certifications */}
      <section className="bg-surface pb-10">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-6">
            <MarketingHeading
              title="Featured Certifications"
              action={<ViewAll href="/certifications" label="View All Certifications" />}
              className="mb-6"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {featuredCertifications.map((c) => {
                const Icon = c.icon;
                return (
                  <article
                    key={c.title}
                    className="relative flex flex-col rounded-xl border border-border p-4 text-center transition-shadow hover:shadow-md"
                  >
                    <span className="absolute left-3 top-3 rounded-full bg-brand px-2 py-0.5 text-[9px] font-bold tracking-wide text-white">
                      FEATURED
                    </span>

                    <span
                      className={`mx-auto mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full ${c.tint}`}
                    >
                      <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                    </span>

                    <h3 className="mt-4 text-sm font-semibold text-heading">{c.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{c.description}</p>

                    <span
                      className={`mx-auto mt-3 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                        levelStyles[c.level]
                      }`}
                    >
                      {c.level}
                    </span>

                    <span className="mt-2.5 inline-flex items-center justify-center gap-1.5 text-xs text-body">
                      <HiClock className="h-4 w-4 text-muted" aria-hidden="true" />
                      {c.duration}
                    </span>

                    <span className="mt-3 flex flex-wrap items-center justify-center gap-1.5 border-t border-border pt-3">
                      <span className="text-[10px] text-muted">Verified by</span>
                      <span className={c.partnerClass}>{c.partner}</span>
                    </span>

                    <Button
                      href="/certifications"
                      variant="brand-light"
                      className="mt-3 w-full !py-2 !text-xs"
                    >
                      View Details
                    </Button>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Your Certification Journey */}
      <section className="bg-surface pb-10">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-6">
            <MarketingHeading
              title="Your Certification Journey"
              action={<ViewAll href="/certifications" label="View My Certifications" />}
              className="mb-8"
            />

            <div className="grid gap-8 lg:grid-cols-4">
              {/* Steps */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-5">
                {journeySteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="relative text-center">
                      {/* Dashed connector to the next step (large screens only) */}
                      {i < journeySteps.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[calc(50%+1.75rem)] right-[calc(-50%+1.75rem)] top-6 hidden border-t-2 border-dashed border-brand/40 lg:block"
                        />
                      )}

                      <span
                        className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full ${
                          step.done
                            ? "bg-brand text-white"
                            : "border border-border bg-white text-brand"
                        }`}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>

                      <h3 className="mt-3 text-xs font-semibold text-heading">
                        {step.n}. {step.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{step.detail}</p>
                    </div>
                  );
                })}
              </div>

              {/* Progress card */}
              <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
                <DonutChart
                  segments={[
                    { value: journeyProgress.percent, color: "#0d9488" },
                    { value: 100 - journeyProgress.percent, color: "transparent" },
                  ]}
                  size={84}
                  thickness={8}
                  track="#e2e8f0"
                >
                  <span className="text-base font-bold text-heading">
                    {journeyProgress.percent}%
                  </span>
                </DonutChart>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-heading">{journeyProgress.title}</p>
                  <p className="mt-1 text-xs text-muted">{journeyProgress.detail}</p>
                  <Button
                    href="/academies"
                    variant="brand"
                    className="mt-3 w-full !py-2 !text-xs"
                  >
                    Continue Learning
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Certifications Earned by Our Students */}
      <section className="bg-surface pb-10">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-6">
            <MarketingHeading
              title="Certifications Earned by Our Students"
              action={<ViewAll href="/success-stories" label="View All Student Success" />}
              className="mb-6"
            />

            <div className="flex items-center gap-3">
              {/* Static carousel controls — this is a server component. */}
              <span
                aria-hidden="true"
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-white text-muted lg:inline-flex"
              >
                <HiChevronLeft className="h-5 w-5" />
              </span>

              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {studentCertifications.map((s, i) => (
                  <article key={s.name} className="rounded-xl border border-border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <Avatar name={s.name} index={i} />
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-heading">{s.name}</h3>
                          <p className="mt-1 text-xs font-medium text-body">{s.certification}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${s.tint}`}
                      >
                        <HiCheckBadge className={`h-4 w-4 ${s.text}`} aria-hidden="true" />
                      </span>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-muted">{s.outcome}</p>

                    <p className="mt-3 text-[10px] text-muted">Salary Increase</p>
                    <p className="text-sm font-bold text-brand">{s.increase}</p>
                  </article>
                ))}
              </div>

              <span
                aria-hidden="true"
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-white text-muted lg:inline-flex"
              >
                <HiChevronRight className="h-5 w-5" />
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Certification Partners */}
      <section className="bg-surface pb-10">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-6">
            <h2 className="text-center text-xl font-bold text-heading sm:text-2xl">
              Our Certification Partners
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {certificationPartners.map((p) => (
                <span key={p.name} className={p.className}>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-surface pb-14">
        <Container>
          <CtaBanner
            title="Your skills deserve to be recognized."
            subtitle="Get certified and take the next step in your global career."
            primary={{ label: "Explore Certifications", href: "/certifications" }}
            secondary={{ label: "Take Career Assessment", href: "/assessment" }}
            features={ctaAssurances}
          />
        </Container>
      </section>
    </>
  );
}
