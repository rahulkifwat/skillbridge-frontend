import { HiArrowRight, HiCheckCircle, HiLockClosed, HiSun } from "react-icons/hi2";
import StudentShell from "@/components/portal/StudentShell";
import DonutChart from "@/components/portal/widgets/DonutChart";
import {
  assessmentFeatures,
  assessmentPreview,
  assessmentDeliverables,
  assessmentSteps,
  assessmentDetails,
} from "@/data/studentPortal";

export const metadata = {
  title: "AI Career & Skills Assessment | SkillBridge Student Portal",
  description:
    "Discover your strengths, identify the best career paths, and get a personalized learning roadmap to reach your goals.",
};

// The floating "your results" preview beside the hero.
function ResultsPreview() {
  const { matches, overallScore, verdict, strengths } = assessmentPreview;

  return (
    <div className="relative hidden min-h-[340px] flex-1 xl:block">
      {/* Learner stand-in, kept behind the floating result cards. */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 h-44 w-52 -translate-x-1/2 rounded-t-[3rem] bg-gradient-to-b from-blue-400/50 to-blue-500/20"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-2 left-1/2 h-9 w-72 -translate-x-1/2 rounded-lg bg-gradient-to-r from-slate-200 to-slate-300"
      />

      {/* Top career matches */}
      <div className="absolute left-0 top-0 z-10 w-[62%] rounded-xl border border-border bg-white p-4 shadow-lg">
        <p className="text-xs font-semibold text-heading">Your Top Career Matches</p>
        <ul className="mt-3 space-y-3">
          {matches.map(({ rank, title, score, color }) => (
            <li key={title} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-alt text-[10px] font-bold text-body">
                {rank}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-[11px] font-medium text-heading">{title}</span>
                  <span className="shrink-0 text-[11px] font-semibold text-body">{score}%</span>
                </span>
                <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
                  <span
                    className={`block h-full rounded-full ${color}`}
                    style={{ width: `${score}%` }}
                  />
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Overall score */}
      <div className="absolute right-0 top-16 z-10 rounded-xl border border-border bg-white p-3 text-center shadow-lg">
        <p className="text-[10px] font-semibold text-body">Overall Score</p>
        <div className="mt-1 flex justify-center">
          {/* A lone segment always fills the ring, so pad the remainder. */}
          <DonutChart
            segments={[
              { value: overallScore, color: "#2563eb" },
              { value: 100 - overallScore, color: "transparent" },
            ]}
            size={68}
            thickness={7}
            gap={4}
          >
            <span className="text-lg font-bold text-heading">{overallScore}</span>
            <span className="text-[8px] text-muted">/100</span>
          </DonutChart>
        </div>
        <p className="mt-1 text-[10px] font-semibold text-primary">{verdict}</p>
      </div>

      {/* Key strengths */}
      <div className="absolute bottom-4 right-0 z-10 w-56 rounded-xl border border-border bg-white p-3 shadow-lg">
        <p className="text-[11px] font-semibold text-heading">Key Strengths</p>
        <ul className="mt-2 space-y-1.5">
          {strengths.map((strength) => (
            <li key={strength} className="flex items-center gap-1.5 text-[10px] text-body">
              <HiCheckCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              {strength}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function StudentAssessmentsPage() {
  return (
    <StudentShell active="Assessments" promo="assessment" surface="bg-white">
      {/* Hero */}
      <section className="flex flex-col gap-8 px-6 pt-8 lg:flex-row lg:items-start lg:px-10">
        <div className="max-w-2xl shrink-0">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Assessment
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight text-heading sm:text-5xl">
            AI Career &amp; Skills Assessment
          </h1>
          <p className="mt-3 text-base leading-relaxed text-body">
            Discover your strengths, identify the best career paths,
            <br className="hidden sm:block" />
            and get a personalized learning roadmap to reach your goals.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {assessmentFeatures.map(({ icon: Icon, title, body, color, bg }) => (
              <li key={title}>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${bg}`}
                >
                  <Icon aria-hidden="true" className={`h-6 w-6 ${color}`} />
                </span>
                <p className="mt-3 text-sm font-semibold text-heading">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-body">{body}</p>
              </li>
            ))}
          </ul>
        </div>

        <ResultsPreview />
      </section>

      {/* What you'll get */}
      <section className="px-6 py-10 lg:px-10">
        <h2 className="text-center text-xl font-bold text-heading sm:text-2xl">
          What You&apos;ll Get
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {assessmentDeliverables.map(({ icon: Icon, title, body, color }) => (
            <li
              key={title}
              className="flex flex-col items-center rounded-2xl border border-border bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full ${color} text-white`}
              >
                <Icon aria-hidden="true" className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug text-heading">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-body">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works + details */}
      <section className="grid grid-cols-1 gap-6 px-6 pb-10 lg:px-10 xl:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="text-xl font-bold text-heading sm:text-2xl">How It Works</h2>

          <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {assessmentSteps.map(({ step, icon: Icon, title, body, color, tint, iconColor }, i) => (
              <li key={title} className="relative">
                <div className="h-full rounded-xl border border-border bg-white p-4 pt-7 text-center shadow-sm">
                  <span
                    className={`absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-full ${color} text-xs font-bold text-white shadow`}
                  >
                    {step}
                  </span>
                  <span
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${tint}`}
                  >
                    <Icon aria-hidden="true" className={`h-6 w-6 ${iconColor}`} />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-heading">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-body">{body}</p>
                </div>

                {i < assessmentSteps.length - 1 && (
                  <HiArrowRight
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted xl:block"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-heading">Assessment Details</h3>
          <ul className="mt-4 space-y-3.5">
            {assessmentDetails.map(({ icon: Icon, label, highlight }) => (
              <li key={label} className="flex items-start gap-2.5 text-xs text-body">
                <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                {highlight ? (
                  <span>
                    {label.split(highlight)[0]}
                    <span className="font-bold text-emerald-600">{highlight}</span>
                    {label.split(highlight)[1]}
                  </span>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* CTA */}
      <section className="px-6 pb-12 lg:px-10">
        <div className="flex flex-col items-start gap-6 rounded-2xl bg-gradient-to-r from-navy via-blue-900 to-blue-800 p-7 lg:flex-row lg:items-center">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20">
            <HiSun aria-hidden="true" className="h-9 w-9" />
          </span>

          <div className="flex-1">
            <p className="text-xl font-bold text-white sm:text-2xl">
              Ready to discover your best career path?
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/70">
              Take the AI Career &amp; Skills Assessment now and get your
              <br className="hidden sm:block" />
              personalized roadmap to success.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
            >
              Start My Assessment
              <HiArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
            <p className="flex items-center gap-1.5 text-[11px] text-white/60">
              <HiLockClosed aria-hidden="true" className="h-3.5 w-3.5" />
              100% Secure &amp; Confidential
            </p>
          </div>
        </div>
      </section>
    </StudentShell>
  );
}
