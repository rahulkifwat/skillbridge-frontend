import Link from "next/link";
import { HiArrowRight, HiPlayCircle, HiStar, HiChevronRight } from "react-icons/hi2";
import Container from "@/components/common/Container";
import DarkSection from "@/components/marketing/DarkSection";
import MarketingHeading from "@/components/marketing/MarketingHeading";
import StatBand from "@/components/marketing/StatBand";
import CtaBanner from "@/components/marketing/CtaBanner";
import {
  academies,
  topCareers,
  homeStats,
  howItWorks,
  homeHeroFeatures,
  homeStories,
  hiringPartners,
} from "@/data/marketing";

export const metadata = {
  title: "SkillBridge EdTech — Your Bridge to Global Careers",
  description:
    "SkillBridge EdTech prepares you with the skills, mindset and real-world practice to get hired by top companies.",
};

function ViewAll({ href, label }) {
  return (
    <Link href={href} className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand hover:underline">
      {label} <HiArrowRight className="h-4 w-4" />
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <DarkSection>
        <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/80">
              Real skills. Real practice. Real results.
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Your Bridge to
              <br />
              Global Careers
              <br />
              <span className="text-brand-mint">Starts Here.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-white/70">
              SkillBridge EdTech prepares you with the skills, mindset and real-world practice to get hired by top
              companies and build the life you want.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/career-assessment"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-hover"
              >
                Take Free Career Assessment <HiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/academies"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <HiPlayCircle className="h-5 w-5" /> Watch Demo
              </Link>
            </div>
          </div>

          {/* Visual + social-proof card */}
          <div className="relative flex items-end justify-center">
            <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-ink-soft to-ink-line/40 lg:h-80">
              <span className="text-sm text-white/30">Learner hero image</span>
            </div>
            <div className="absolute -bottom-6 right-0 w-64 rounded-xl border border-white/10 bg-ink-soft/95 p-4 backdrop-blur">
              <p className="text-xs text-white/70">Join thousands of learners</p>
              <p className="text-xs text-white/50">who transformed their future</p>
              <div className="mt-2 flex items-center gap-1 text-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar key={i} className="h-4 w-4" />
                ))}
                <span className="ml-1 text-xs text-white/70">4.9/5 (2,500+ reviews)</span>
              </div>
            </div>
          </div>
        </Container>

        <Container className="grid grid-cols-2 gap-4 border-t border-white/10 py-6 lg:grid-cols-4">
          {homeHeroFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-center gap-2.5">
                <Icon className="h-5 w-5 shrink-0 text-brand-bright" aria-hidden="true" />
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-white">{f.title}</span>
                  <span className="text-xs text-white/60">{f.detail}</span>
                </span>
              </div>
            );
          })}
        </Container>
      </DarkSection>

      {/* Academies */}
      <section className="bg-surface py-14">
        <Container>
          <MarketingHeading
            title={`Our ${academies.length} Academies`}
            action={<ViewAll href="/academies" label="View All Academies" />}
            className="mb-8"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {academies.map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.name}
                  href="/academies"
                  className="flex flex-col items-center gap-3 rounded-xl border border-border bg-white p-5 text-center transition-shadow hover:shadow-md"
                >
                  <span className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${a.tint}`}>
                    <Icon className={`h-7 w-7 ${a.text}`} aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-semibold text-heading">{a.name}</h3>
                  <p className="text-xs text-muted">{a.short}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Top careers */}
      <section className="bg-white py-14">
        <Container>
          <MarketingHeading
            title="Train for the 10 Most Requested Global Jobs"
            action={<ViewAll href="/career-paths" label="View All Careers" />}
            className="mb-8"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {topCareers.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-center">
                  <span className="self-start rounded-full bg-surface-alt px-2 py-0.5 text-[10px] font-bold text-muted">
                    {c.n}
                  </span>
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${c.tint}`}>
                    <Icon className={`h-6 w-6 ${c.text}`} aria-hidden="true" />
                  </span>
                  <h3 className="text-xs font-semibold text-heading">{c.title}</h3>
                  <p className="text-xs text-muted">{c.salary}</p>
                  <span className="rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-medium text-brand">
                    High Demand
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-white pb-14">
        <Container>
          <StatBand stats={homeStats} />
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-surface py-14">
        <Container>
          <MarketingHeading title="How SkillBridge Works" className="mb-8" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {howItWorks.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative rounded-xl border border-border bg-white p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-light">
                    <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-heading">
                    {step.n}. {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{step.detail}</p>
                  {step.n < howItWorks.length && (
                    <HiChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-border lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Success stories */}
      <section className="bg-white py-14">
        <Container>
          <MarketingHeading
            title="Success Stories"
            action={<ViewAll href="/success-stories" label="View All Stories" />}
            className="mb-8"
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {homeStories.map((s) => (
              <div key={s.name} className="flex gap-4 rounded-xl border border-border p-5">
                <span className="h-12 w-12 shrink-0 rounded-full bg-surface-alt" aria-hidden="true" />
                <div>
                  <p className="text-sm text-body">“{s.quote}”</p>
                  <p className="mt-3 text-sm font-semibold text-heading">{s.name}</p>
                  <p className="text-xs text-muted">{s.role}</p>
                  <span className="mt-2 inline-flex rounded-full bg-brand-light px-2.5 py-1 text-xs font-medium text-brand">
                    {s.earning}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Hiring partners */}
      <section className="bg-surface py-14">
        <Container>
          <MarketingHeading
            title="Our Hiring Partners"
            action={<ViewAll href="/partners" label="View All Partners" />}
            className="mb-8"
          />
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 rounded-xl border border-border bg-white px-6 py-7">
            {hiringPartners.map((p) => (
              <span key={p} className="text-lg font-semibold text-muted">
                {p}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-surface pb-14">
        <Container>
          <CtaBanner
            title="Your future is global. Your journey starts today."
            subtitle="Take the first step toward the career and life you deserve."
            primary={{ label: "Take Free Career Assessment", href: "/career-assessment" }}
            secondary={{ label: "Explore Career Paths", href: "/career-paths" }}
          />
        </Container>
      </section>
    </>
  );
}
