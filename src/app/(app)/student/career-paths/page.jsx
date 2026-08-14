import { HiArrowRight, HiSun } from "react-icons/hi2";
import StudentShell from "@/components/portal/StudentShell";
import CareerPathBrowser from "@/components/portal/CareerPathBrowser";
import { careerBannerPoints, careerJourney } from "@/data/studentPortal";

export const metadata = {
  title: "Career Paths | SkillBridge Student Portal",
  description:
    "Explore in-demand career paths, build the right skills, and get ready for the jobs of today and tomorrow.",
};

export default function StudentCareerPathsPage() {
  return (
    <StudentShell active="Career Paths" promo="career" surface="bg-white">
      <div className="px-6 py-8 lg:px-10">
        {/* Header + info card */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-heading sm:text-5xl">
              Career Paths
            </h1>
            <p className="mt-3 text-base leading-relaxed text-body">
              Explore in-demand career paths, build the right skills,
              <br className="hidden sm:block" />
              and get ready for the jobs of today and tomorrow.
            </p>
          </div>

          <aside className="flex max-w-md items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <HiSun aria-hidden="true" className="h-7 w-7" />
            </span>
            <div>
              <p className="text-sm font-bold text-heading">Your Future. Your Choice.</p>
              <p className="mt-1 text-sm leading-relaxed text-body">
                Choose a career path and we&apos;ll create a personalized learning plan to
                help you achieve your goals.
              </p>
            </div>
          </aside>
        </div>

        <CareerPathBrowser />
      </div>

      {/* High-demand banner */}
      <section className="px-6 pb-10 lg:px-10">
        <div className="flex flex-col gap-8 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 p-6 lg:flex-row lg:items-center">
          <div className="max-w-xs shrink-0">
            <h2 className="text-xl font-bold leading-snug text-heading">
              High-demand careers.
              <br />
              Real opportunities.
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-body">
              Each career path includes recommended skills, courses, certifications, and
              real-world projects.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-5 py-2.5 text-sm font-semibold text-heading hover:bg-surface"
            >
              How It Works
              <HiArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <ul className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {careerBannerPoints.map(({ icon: Icon, title, body, color }, i) => (
              <li
                key={title}
                className={`flex items-start gap-3 ${
                  i > 0 ? "xl:border-l xl:border-slate-300/60 xl:pl-6" : ""
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${color} text-white`}
                >
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-heading">{title}</span>
                  <span className="mt-0.5 text-xs leading-relaxed text-body">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey */}
      <section className="px-6 pb-12 lg:px-10">
        <div className="rounded-2xl bg-gradient-to-b from-emerald-50/60 to-white p-6">
          <h2 className="text-center text-xl font-bold text-heading sm:text-2xl">
            Your Journey to a Successful Career
          </h2>

          <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {careerJourney.map(({ step, icon: Icon, title, body, color }, i) => (
              <li key={title} className="relative">
                <div className="h-full rounded-xl border border-border bg-white p-4 pt-6 shadow-sm">
                  <span
                    className={`absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-full ${color} text-xs font-bold text-white shadow`}
                  >
                    {step}
                  </span>
                  <Icon aria-hidden="true" className="h-6 w-6 text-body" />
                  <p className="mt-2 text-sm font-semibold text-heading">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-body">{body}</p>
                </div>

                {i < careerJourney.length - 1 && (
                  <HiArrowRight
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted xl:block"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </StudentShell>
  );
}
