import Link from "next/link";
import {
  HiArrowRight,
  HiArrowPath,
  HiBookmark,
  HiChartBar,
  HiCheckBadge,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import Container from "@/components/common/Container";
import DarkSection from "@/components/marketing/DarkSection";
import MarketingHeading from "@/components/marketing/MarketingHeading";
import CtaBanner from "@/components/marketing/CtaBanner";
import ProgressBar from "@/components/portal/widgets/ProgressBar";
import {
  heroFeatures,
  filterFields,
  featuredJobs,
  recommendedJobs,
  hiringRegions,
  jobStats,
  topCompanies,
  ctaAssurances,
} from "@/data/jobOpportunities";

export const metadata = {
  title: "Job Opportunities — SkillBridge EdTech",
  description:
    "Discover verified international opportunities matched to your skills, English level, and certifications. 25,000+ remote jobs across 120+ countries.",
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

// Static pill used for "Remote" / "English: B2+" tags on the job cards.
function Tag({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ${className}`}
    >
      {children}
    </span>
  );
}

// Company logo rendered as styled text — no image assets exist in this project.
function LogoText({ text, className }) {
  return <span className={className}>{text}</span>;
}

function ApplyButton() {
  return (
    <span className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-ink-soft">
      Apply Now <HiArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
    </span>
  );
}

export default function JobOpportunitiesPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection>
        <Container className="py-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-ink-line bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">
                Global Opportunities. Real Jobs. Real Careers.
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
                Find Your Next
                <br />
                Global <span className="text-brand-mint">Remote Job</span>
              </h1>

              <p className="mt-5 max-w-md text-base text-white/70">
                Discover verified international opportunities matched to your skills, English level,
                and certifications.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {heroFeatures.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="flex items-start gap-2.5">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-line bg-white/5">
                        <Icon className="h-4 w-4 text-brand-mint" aria-hidden="true" />
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-xs font-semibold text-white">{f.title}</span>
                        <span className="mt-1 text-xs leading-relaxed text-white/60">
                          {f.detail}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Globe visual (placeholder — no photo assets exist) + floating card */}
            <div className="relative">
              <div
                className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-ink-line bg-gradient-to-br from-ink-soft to-ink-line/40"
                aria-hidden="true"
              >
                <span className="text-xs font-medium text-white/40">Globe visual</span>
              </div>

              <div className="mt-4 rounded-xl border border-ink-line bg-ink-soft/90 p-4 sm:absolute sm:-bottom-6 sm:right-0 sm:mt-0 sm:w-64 sm:backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <HiChartBar className="h-5 w-5 text-brand-mint" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-xl font-bold text-white">25,000+</span>
                    <span className="text-xs text-white/60">Active Job Opportunities</span>
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 border-t border-ink-line pt-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-mint" aria-hidden="true" />
                  <span className="text-xs text-white/70">Updated Daily</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </DarkSection>

      {/* Filter bar — all controls are static decoration */}
      <section className="bg-surface pb-10 pt-6">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
              {filterFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.label}>
                    <label
                      htmlFor={field.label}
                      className="block text-xs font-medium text-body"
                    >
                      {field.label}
                    </label>
                    <div className="relative mt-1.5">
                      {Icon && (
                        <Icon
                          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                          aria-hidden="true"
                        />
                      )}
                      {field.type === "text" ? (
                        <input
                          id={field.label}
                          type="text"
                          readOnly
                          placeholder={field.value}
                          className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-xs text-heading placeholder:text-muted"
                        />
                      ) : (
                        <div
                          id={field.label}
                          className={`flex w-full items-center justify-between rounded-lg border border-border bg-white py-2.5 pr-3 text-xs text-heading ${
                            Icon ? "pl-9" : "pl-3"
                          }`}
                        >
                          <span>{field.value}</span>
                          <HiChevronDown className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="flex items-end">
                <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-xs font-semibold text-white">
                  <HiMagnifyingGlass className="h-4 w-4" aria-hidden="true" /> Search Jobs
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <Link
                href="/job-opportunities"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
              >
                <HiArrowPath className="h-3.5 w-3.5" aria-hidden="true" /> Reset Filters
              </Link>
              <Link
                href="/job-opportunities"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
              >
                Save Search <HiBookmark className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Job Opportunities */}
      <section className="bg-surface pb-10">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-6">
            <MarketingHeading
              title={
                <span className="flex flex-wrap items-baseline gap-x-3">
                  Featured Job Opportunities
                  <span className="text-xs font-medium text-brand">25,000+ jobs available</span>
                </span>
              }
              action={<ViewAll href="/job-opportunities" label="View All Jobs" />}
              className="mb-6"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {featuredJobs.map((job) => (
                <div
                  key={job.title}
                  className="flex flex-col rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-8 items-center">
                      <LogoText text={job.logoText} className={job.logoClass} />
                    </span>
                    <HiBookmark className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold leading-snug text-heading">
                    {job.title}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-xs text-body">
                    {job.company}
                    <HiCheckBadge className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                  </p>

                  <p className="mt-3 text-xs font-medium text-heading">{job.salary}</p>

                  <p className="mt-1.5 text-xs text-body">
                    <span aria-hidden="true">{job.flag}</span> {job.country}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Tag className="bg-brand-light text-brand">{job.workType}</Tag>
                    <Tag className="bg-surface-alt text-body">English: {job.english}</Tag>
                  </div>

                  <p className="mt-3 text-xs text-muted">{job.experience}</p>

                  <div className="mt-auto">
                    <ApplyButton />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Jobs Recommended for You */}
      <section className="bg-surface pb-10">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-6">
            <MarketingHeading
              title={
                <span className="flex flex-wrap items-baseline gap-x-3">
                  Jobs Recommended for You
                  <span className="text-xs font-medium text-brand">
                    Based on your profile and skills
                  </span>
                </span>
              }
              action={<ViewAll href="/job-opportunities" label="View More Recommendations" />}
              className="mb-6"
            />

            <div className="flex items-center gap-3">
              <span
                className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted lg:inline-flex"
                aria-hidden="true"
              >
                <HiChevronLeft className="h-4 w-4" />
              </span>

              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.title}
                    className="flex gap-3 rounded-xl border border-border bg-white p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-alt">
                      <LogoText text={job.logoText} className={job.logoClass} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold leading-snug text-heading">
                          {job.title}
                        </h3>
                        <HiBookmark className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-xs text-body">
                        {job.company}
                        <HiCheckBadge
                          className="h-3.5 w-3.5 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                      </p>
                      <p className="mt-1.5 text-xs font-medium text-heading">{job.salary}</p>
                      <p className="mt-1.5 text-xs text-body">{job.location}</p>
                      <p className="mt-1.5 text-xs text-muted">{job.experience}</p>
                    </div>
                  </div>
                ))}
              </div>

              <span
                className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted lg:inline-flex"
                aria-hidden="true"
              >
                <HiChevronRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Where Our Jobs Are / Top Hiring Regions / Stats */}
      <section className="bg-surface pb-10">
        <Container>
          <div className="grid gap-5 lg:grid-cols-12">
            {/* World map placeholder */}
            <DarkSection className="rounded-2xl lg:col-span-5" glow={false}>
              <div className="flex h-full flex-col p-6">
                <h2 className="text-lg font-bold text-white">Where Our Jobs Are</h2>
                <p className="mt-1 text-xs text-white/60">
                  Global opportunities in 120+ countries
                </p>

                <div
                  className="mt-5 flex flex-1 items-center justify-center rounded-xl border border-ink-line bg-gradient-to-br from-ink-soft to-ink-line/40 py-16"
                  aria-hidden="true"
                >
                  <span className="text-xs font-medium text-white/40">World map</span>
                </div>

                <Link
                  href="/job-opportunities"
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
                >
                  View Jobs by Country <HiArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </DarkSection>

            {/* Top Hiring Regions */}
            <div className="rounded-2xl border border-border bg-white p-6 lg:col-span-3">
              <h2 className="text-base font-bold text-heading">Top Hiring Regions</h2>
              <ul className="mt-5 space-y-4">
                {hiringRegions.map((region) => (
                  <li key={region.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-xs font-medium text-heading">{region.name}</span>
                      <span className="text-xs font-semibold text-heading">{region.percent}%</span>
                    </div>
                    <ProgressBar
                      percent={region.percent}
                      color="bg-brand"
                      track="bg-surface-alt"
                      className="mt-2"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* 2x2 stats */}
            <div className="rounded-2xl border border-border bg-white p-6 lg:col-span-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {jobStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light">
                        <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-xl font-bold text-heading">{stat.value}</span>
                        <span className="mt-0.5 text-xs text-body">{stat.label}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Top Companies Hiring */}
      <section className="bg-surface pb-10">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-6">
            <MarketingHeading
              title="Top Companies Hiring on SkillBridge"
              action={<ViewAll href="/job-opportunities" label="View All Companies" />}
              className="mb-6"
            />

            {/* Scrolls inside itself so the page never scrolls horizontally. */}
            <div className="-mx-2 overflow-x-auto px-2">
              <div className="flex min-w-max items-center gap-10 py-2">
                {topCompanies.map((company) => (
                  <LogoText
                    key={company.name}
                    text={company.logoText}
                    className={`shrink-0 ${company.logoClass}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-surface pb-12">
        <Container>
          <CtaBanner
            title="Your global career starts today."
            subtitle="Get trained. Get certified. Get hired."
            primary={{ label: "Start Your Career Assessment — $25", href: "/assessment" }}
            secondary={{ label: "Explore Career Paths", href: "/career-paths" }}
            features={ctaAssurances}
          />
        </Container>
      </section>
    </>
  );
}
