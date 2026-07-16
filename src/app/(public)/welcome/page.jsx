import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

import Container from "@/components/common/Container";
import DarkSection from "@/components/marketing/DarkSection";
import { personas, welcomeFeatures, welcomeStats } from "@/data/welcome";

export const metadata = {
  title: "Welcome to SkillBridge EdTech | One Platform. Every Stage of Your Career.",
  description:
    "Learn. Upskill. Advance. Choose the path that best describes you — student, professional, career changer, employer, or administrator — for a personalized learning experience.",
};

export default function WelcomePage() {
  return (
    <>
      {/* Hero + persona grid on a subtle patterned tint. */}
      <section className="relative overflow-hidden bg-brand-light">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(13,148,136,0.18) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl"
        />

        <Container className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl">
              Welcome to SkillBridge EdTech
            </h1>
            <p className="mt-3 text-xl font-bold text-brand sm:text-2xl">
              One Platform. Every Stage of Your Career.
            </p>
            <p className="mt-3 text-base text-body sm:text-lg">
              Learn. Upskill. Advance. From school to career and beyond.
            </p>

            <div
              aria-hidden="true"
              className="mx-auto my-7 h-0.5 w-16 rounded-full bg-brand/40"
            />

            <h2 className="text-xl font-bold text-heading sm:text-2xl">
              Who are you?
            </h2>
            <p className="mt-2 text-sm text-body sm:text-base">
              Choose the option that best describes you to get a personalized
              learning experience.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {personas.map((persona) => {
              const Icon = persona.icon;
              return (
                <article
                  key={persona.id}
                  className="relative flex flex-col rounded-2xl border border-border bg-white px-4 pb-4 pt-12 shadow-sm"
                  style={{ borderTopColor: persona.color }}
                >
                  <span
                    className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-md ring-4 ring-white"
                    style={{ backgroundColor: persona.color }}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>

                  <h3
                    className="text-center text-base font-bold leading-snug"
                    style={{ color: persona.color }}
                  >
                    {persona.title}
                  </h3>
                  {persona.subtitle && (
                    <p className="mt-1 text-center text-xs text-muted">
                      {persona.subtitle}
                    </p>
                  )}

                  <div className="mt-4 flex h-32 items-center justify-center rounded-xl bg-surface-alt">
                    <span className="px-2 text-center text-[11px] font-medium text-muted">
                      Photo
                    </span>
                  </div>

                  <p className="mt-4 flex-1 text-center text-sm leading-relaxed text-body">
                    {persona.description}
                  </p>

                  <Link
                    href={persona.href}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: persona.color }}
                  >
                    {persona.cta}
                    <HiArrowRight className="shrink-0" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Dark navy feature band. */}
      <DarkSection>
        <Container className="py-12 sm:py-14">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {welcomeFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-3">
                  <Icon
                    className="h-8 w-8 shrink-0 text-brand-mint"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </DarkSection>

      {/* White stat band. */}
      <section className="bg-white">
        <Container className="py-10 sm:py-12">
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-white px-6 py-8 shadow-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {welcomeStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <Icon
                    className="h-9 w-9 shrink-0"
                    style={{ color: stat.color }}
                    aria-hidden="true"
                  />
                  <span className="flex flex-col leading-tight">
                    <span
                      className="text-2xl font-extrabold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-sm text-body">{stat.label}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
