import Link from "next/link";
import {
  HiArrowRight,
  HiPlayCircle,
  HiCheck,
  HiStar,
  HiTrophy,
  HiChartPie,
  HiHeart,
  HiClock,
} from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import StarRating from "@/components/common/StarRating";
import Avatar from "@/components/common/Avatar";
import DarkSection from "@/components/marketing/DarkSection";
import MarketingHeading from "@/components/marketing/MarketingHeading";
import CtaBanner from "@/components/marketing/CtaBanner";
import DonutChart from "@/components/portal/widgets/DonutChart";
import RadarChart from "@/components/portal/widgets/RadarChart";
import ProgressBar from "@/components/portal/widgets/ProgressBar";
import {
  heroFeatures,
  heroInfoCard,
  assessmentSteps,
  assessmentProgress,
  careerMatches,
  skillsRadar,
  learningStyle,
  topStrengths,
  interests,
  careerPaths,
  nextSteps,
  trustStats,
  trustTestimonial,
  ctaFeatures,
} from "@/data/careerAssessment";

export const metadata = {
  title: "Career Assessment — SkillBridge EdTech",
  description:
    "Our AI-powered assessment analyzes your skills, interests, personality and goals to recommend the best global careers for you.",
};

function ViewAll({ href, label }) {
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand hover:underline"
    >
      {label} <HiArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl border border-border bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function BarRow({ item }) {
  const Icon = item.icon;
  return (
    <li className="flex items-center gap-3">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-alt text-brand">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-heading">{item.label}</span>
        <ProgressBar percent={item.percent} color={item.color} className="mt-1.5" />
      </span>
      <span className="w-9 shrink-0 text-right text-xs font-semibold text-body">{item.percent}%</span>
    </li>
  );
}

export default function CareerAssessmentPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection>
        <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Discover Your Best
              <br />
              <span className="text-brand-mint">Career Path</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-white/70">
              Our AI-powered assessment analyzes your skills, interests, personality and goals to
              recommend the best global careers for you.
            </p>

            <ul className="mt-7 grid gap-4 sm:grid-cols-3">
              {heroFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.title} className="flex items-start gap-2.5">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ink-line bg-ink-soft text-brand-mint">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-xs font-semibold text-white">{f.title}</span>
                      <span className="block text-xs text-white/60">{f.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/assessment" variant="brand" showArrow>
                Start Assessment
              </Button>
              <Button href="/assessment" variant="brand-outline">
                <HiPlayCircle className="h-5 w-5" aria-hidden="true" />
                How It Works
              </Button>
            </div>
          </div>

          {/* Illustration placeholder + info card */}
          <div className="relative flex items-center justify-center">
            <div className="flex h-full min-h-[240px] w-full items-center justify-center rounded-2xl border border-ink-line bg-gradient-to-br from-ink-soft to-ink-line/40 p-6 text-center">
              <span className="text-xs text-white/40">Student taking the career assessment</span>
            </div>

            <div className="mt-6 w-full rounded-2xl border border-ink-line bg-ink-soft/80 p-5 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:w-64">
              <ul className="space-y-4">
                {heroInfoCard.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-white/70" aria-hidden="true" />
                      <span className="leading-tight">
                        <span className="block text-sm font-semibold text-white">{item.title}</span>
                        <span className="block text-xs text-white/60">{item.detail}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </DarkSection>

      {/* Stepper */}
      <section className="bg-surface py-10">
        <Container>
          <Card className="grid gap-8 p-6 lg:grid-cols-[1fr_auto] lg:gap-10">
            <div>
              <h2 className="text-xl font-bold text-heading">Your Career Assessment</h2>

              <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                {assessmentSteps.map((step) => (
                  <li key={step.label} className="flex flex-col items-center text-center">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                        step.current
                          ? "border-2 border-blue-600 bg-white text-blue-600"
                          : "bg-brand text-white"
                      }`}
                    >
                      {step.current ? (
                        <HiStar className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <HiCheck className="h-4 w-4" aria-hidden="true" />
                      )}
                    </span>
                    <span className="mt-3 text-xs font-semibold text-heading">{step.label}</span>
                    <span
                      className={`mt-0.5 text-xs ${step.current ? "text-blue-600" : "text-brand"}`}
                    >
                      {step.status}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="text-sm font-semibold text-heading">Assessment Progress</p>
              <div className="mt-4 flex items-center gap-4">
                <DonutChart
                  segments={[{ value: assessmentProgress.percent, color: "#0d9488" }]}
                  size={90}
                  thickness={10}
                >
                  <span className="text-base font-bold text-heading">
                    {assessmentProgress.percent}%
                  </span>
                </DonutChart>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-heading">
                    {assessmentProgress.title}
                  </span>
                  <span className="mt-1 block text-xs text-body">{assessmentProgress.detail}</span>
                </span>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Matches / Radar / Strengths */}
      <section className="bg-surface pb-10">
        <Container className="grid gap-6 lg:grid-cols-3">
          {/* Top Career Matches */}
          <Card className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <HiTrophy className="h-6 w-6 text-amber" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-bold text-heading">Your Top Career Matches</h2>
                <p className="text-xs text-body">Based on your assessment results</p>
              </div>
            </div>

            <p className="mt-5 text-right text-[11px] font-medium text-muted">Match Score</p>
            <ul className="mt-1 flex-1 divide-y divide-border">
              {careerMatches.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.title} className="flex items-center gap-3 py-3">
                    <span
                      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${c.rankTint}`}
                    >
                      {c.rank}
                    </span>
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.tint}`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-heading">{c.title}</span>
                      <span className="block text-xs text-body">{c.description}</span>
                    </span>
                    <span className="shrink-0 text-sm font-bold text-heading">{c.score}</span>
                    <span className="hidden shrink-0 rounded-full bg-brand-light px-2 py-1 text-[10px] font-semibold text-brand sm:inline">
                      High Demand
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5">
              <Button href="/jobs" variant="outline" showArrow className="w-full sm:w-auto">
                View All Career Matches
              </Button>
            </div>
          </Card>

          {/* Skills Radar */}
          <div className="flex flex-col gap-6">
            <Card>
              <h2 className="text-lg font-bold text-heading">Your Skills Radar</h2>
              <p className="text-xs text-body">Your skills compared to top performers</p>

              <div className="mt-4 flex justify-center">
                <RadarChart
                  data={skillsRadar}
                  compare={skillsRadar.map((s) => ({ label: s.label, value: s.peer }))}
                  size={280}
                  levels={4}
                  fill="#0d9488"
                  compareFill="#1e3a8a"
                />
              </div>

              <div className="mt-4 flex items-center justify-center gap-6 border-t border-border pt-4">
                <span className="flex items-center gap-2 text-xs text-body">
                  <span className="h-1 w-4 rounded-full bg-brand" aria-hidden="true" /> Your Score
                </span>
                <span className="flex items-center gap-2 text-xs text-body">
                  <span className="h-1 w-4 rounded-full bg-blue-900" aria-hidden="true" /> Top 25% Students
                </span>
              </div>
            </Card>

            <Card className="bg-surface-alt">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-violet-600">
                  <learningStyle.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs text-muted">{learningStyle.eyebrow}</span>
                  <span className="mt-0.5 block text-sm font-bold text-heading">
                    {learningStyle.title}
                  </span>
                  <span className="mt-1 block text-xs text-body">{learningStyle.detail}</span>
                </span>
              </div>
            </Card>
          </div>

          {/* Strengths + Interests */}
          <div className="flex flex-col gap-6">
            <Card>
              <div className="flex items-center gap-2.5">
                <HiChartPie className="h-6 w-6 text-brand" aria-hidden="true" />
                <h2 className="text-lg font-bold text-heading">Your Top Strengths</h2>
              </div>
              <ul className="mt-4 space-y-3.5">
                {topStrengths.map((s) => (
                  <BarRow key={s.label} item={s} />
                ))}
              </ul>
              <div className="mt-4">
                <ViewAll href="/assessment" label="View all strengths" />
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2.5">
                <HiHeart className="h-6 w-6 text-pink-500" aria-hidden="true" />
                <h2 className="text-lg font-bold text-heading">Your Interests</h2>
              </div>
              <ul className="mt-4 space-y-3.5">
                {interests.map((s) => (
                  <BarRow key={s.label} item={s} />
                ))}
              </ul>
              <div className="mt-4">
                <ViewAll href="/assessment" label="View all interests" />
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Recommended paths + Next steps */}
      <section className="bg-surface pb-10">
        <Container className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <MarketingHeading
              title="Recommended Career Paths for You"
              subtitle="Complete learning paths to achieve your dream career"
              action={<ViewAll href="/jobs" label="View All Paths" />}
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {careerPaths.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="flex flex-col rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${p.iconTint}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-sm font-bold text-heading">{p.title}</span>
                        <span className="mt-1 flex items-center gap-1 text-xs text-muted">
                          <HiClock className="h-3.5 w-3.5" aria-hidden="true" />
                          {p.duration}
                        </span>
                      </span>
                    </div>

                    <p className="mt-4 text-xs text-body">{p.description}</p>

                    <p className="mt-4 text-xs text-body">
                      <span className="font-semibold text-heading">Roles:</span> {p.roles}
                    </p>

                    <p className="mt-3 text-xs text-body">
                      <span className="block font-semibold text-heading">Avg. Salary</span>
                      {p.salary}
                    </p>

                    <Link
                      href="/jobs"
                      className={`mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition-colors ${p.button}`}
                    >
                      Explore Path
                    </Link>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="flex flex-col">
            <h2 className="text-lg font-bold text-heading">Next Steps For You</h2>

            <ul className="mt-5 flex-1 space-y-5">
              {nextSteps.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.title} className="flex items-start gap-3">
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.tint}`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm font-semibold text-heading">{s.title}</span>
                      <span className="mt-0.5 block text-xs text-body">{s.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6">
              <Button href="/assessment" variant="brand" showArrow className="w-full">
                Create Your Learning Plan
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      {/* Trust */}
      <section className="bg-surface pb-10">
        <Container>
          <Card>
            <h2 className="text-xl font-bold text-heading">Why Students Trust Our Career Assessment</h2>

            <div className="mt-5 grid gap-6 lg:grid-cols-[2fr_1fr]">
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {trustStats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label} className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${s.tint}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-xl font-bold text-heading">{s.value}</span>
                        <span className="block text-xs text-body">{s.label}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <figure className="rounded-xl bg-surface-alt p-5">
                <div className="flex items-start gap-3">
                  <Avatar name={trustTestimonial.name} size="md" index={0} />
                  <div>
                    <blockquote className="text-xs text-body">{trustTestimonial.quote}</blockquote>
                    <StarRating count={trustTestimonial.stars} className="mt-2" />
                    <figcaption className="mt-2 leading-tight">
                      <span className="block text-sm font-semibold text-heading">
                        {trustTestimonial.name}
                      </span>
                      <span className="block text-xs text-muted">{trustTestimonial.role}</span>
                    </figcaption>
                  </div>
                </div>
              </figure>
            </div>
          </Card>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-surface pb-16">
        <Container>
          <CtaBanner
            title="Your future starts with the right choice."
            subtitle="Take the first step toward a successful global career."
            primary={{ label: "Start Your Career Assessment", href: "/assessment" }}
            secondary={{ label: "View All Career Paths", href: "/jobs" }}
            features={ctaFeatures}
          />
        </Container>
      </section>
    </>
  );
}
