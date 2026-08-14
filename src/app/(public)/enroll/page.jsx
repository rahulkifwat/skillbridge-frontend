import { HiArrowRight, HiChevronDown, HiLockClosed, HiShieldCheck } from "react-icons/hi2";
import Container from "@/components/common/Container";
import DarkSection from "@/components/marketing/DarkSection";
import { academies } from "@/data/marketing";
import {
  enrollHeroFeatures,
  enrollFields,
  enrollAssessment,
  paymentMethods,
  enrollBenefits,
  enrollStats,
} from "@/data/enroll";

export const metadata = {
  title: "Enroll Now — SkillBridge EdTech",
  description:
    "Join SkillBridge EdTech and get the skills, confidence and global mindset you need to work with top companies. Start with the initial assessment for USD $25.",
};

// Static, non-submitting field. Every input/select is readOnly or disabled —
// this page is presentation only until checkout is wired up.
function EnrollField({ field }) {
  const Icon = field.icon;
  const isSelect = field.type === "select";

  return (
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      {isSelect ? (
        <select
          id={field.name}
          name={field.name}
          disabled
          aria-label={field.label}
          className="w-full appearance-none rounded-lg border border-border bg-white py-3 pl-11 pr-10 text-sm text-muted"
        >
          <option>{field.label}</option>
        </select>
      ) : (
        <input
          id={field.name}
          name={field.name}
          type="text"
          readOnly
          aria-label={field.label}
          placeholder={field.label}
          className="w-full rounded-lg border border-border bg-white py-3 pl-11 pr-4 text-sm text-heading placeholder:text-muted"
        />
      )}
      {isSelect && (
        <HiChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function EnrollPage() {
  return (
    <>
      {/* Hero: pitch + academies strip on the left, enrollment card on the right. */}
      <section className="bg-surface py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-12">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-heading sm:text-5xl">
                Your Future.
                <br />
                Real Skills.
                <br />
                <span className="text-brand">Real Opportunities.</span>
              </h1>

              <p className="mt-5 max-w-md text-base text-body">
                Join SkillBridge EdTech and get the skills, confidence and global mindset you need to
                work with top companies.
              </p>

              {/* No photography assets exist yet — placeholder stands in for the
                  student portrait in the design. */}
              <div className="mt-8 flex h-44 items-center justify-center rounded-2xl border border-border bg-surface-alt sm:h-56">
                <span className="text-sm text-muted">Student photo</span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {enrollHeroFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex flex-col gap-2">
                      <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
                      <span className="text-xs font-semibold leading-snug text-heading">
                        {feature.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              <DarkSection className="mt-8 rounded-2xl" glow={false}>
                <div className="px-6 py-7">
                  <h2 className="text-center text-lg font-bold sm:text-xl">
                    9 ACADEMIES. ONE MISSION.
                  </h2>
                  <p className="mt-1 text-center text-sm text-white/70">
                    Preparing you for global success.
                  </p>

                  <ul className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5 lg:grid-cols-9">
                    {academies.map((academy) => {
                      const Icon = academy.icon;
                      return (
                        <li key={academy.n} className="flex flex-col items-center gap-2 text-center">
                          <span
                            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${academy.tint}`}
                          >
                            <Icon className={`h-6 w-6 ${academy.text}`} aria-hidden="true" />
                          </span>
                          <span className="text-[11px] leading-tight text-white/80">
                            {academy.name.replace(/ Academy$/, "")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </DarkSection>
            </div>

            {/* Enrollment card */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-center text-2xl font-bold text-heading">ENROLL NOW</h2>
              <p className="mt-1 text-center text-sm text-body">Start your journey today</p>

              <div className="mt-6 space-y-3">
                {enrollFields.map((field) => (
                  <EnrollField key={field.name} field={field} />
                ))}
              </div>

              <div className="mt-5 rounded-lg bg-brand-light p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold leading-tight text-heading">
                    {enrollAssessment.title}
                    <span className="block text-xs font-normal text-muted">
                      {enrollAssessment.note}
                    </span>
                  </p>
                  <p className="shrink-0 text-sm font-bold text-brand">{enrollAssessment.price}</p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-body">{enrollAssessment.detail}</p>
              </div>

              <button
                type="button"
                disabled
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-lg bg-brand px-5 py-4 text-sm font-bold tracking-wide text-white"
              >
                PAY &amp; ENROLL NOW
                <HiArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {paymentMethods.map((method) => (
                  <li
                    key={method}
                    className="rounded-md border border-border bg-surface px-3 py-1.5 text-[11px] font-bold tracking-wide text-body"
                  >
                    {method}
                  </li>
                ))}
              </ul>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
                <HiLockClosed className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Secure payment. Your information is protected.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What you get */}
      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-heading sm:text-3xl">
              WHAT YOU GET WITH SKILLBRIDGE
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-brand" aria-hidden="true" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {enrollBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex flex-col items-center text-center">
                  <span
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${benefit.tint}`}
                  >
                    <Icon className={`h-7 w-7 ${benefit.text}`} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-heading">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-body">{benefit.detail}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Mission + stats */}
      <section className="bg-white pb-14 lg:pb-20">
        <Container>
          <DarkSection className="rounded-2xl">
            <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-12">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">Our mission is your success.</h2>
                <p className="mt-3 text-sm text-white/70">
                  Join SkillBridge’s founding cohort and begin building your future.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {enrollStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex flex-col items-center text-center">
                      <Icon className="h-7 w-7 text-brand-mint" aria-hidden="true" />
                      <span className="mt-3 text-2xl font-bold text-white">{stat.value}</span>
                      <span className="mt-1 text-xs leading-tight text-white/60">{stat.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </DarkSection>
        </Container>
      </section>

      {/* Trust strip */}
      <section className="border-t border-border bg-surface py-5">
        <Container>
          <p className="flex items-center gap-2 text-sm text-body">
            <HiShieldCheck className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            Trusted by students and partners worldwide
          </p>
        </Container>
      </section>
    </>
  );
}
