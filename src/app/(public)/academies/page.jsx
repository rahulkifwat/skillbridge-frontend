import Link from "next/link";
import { HiArrowRight, HiRocketLaunch } from "react-icons/hi2";
import Container from "@/components/common/Container";
import CtaBanner from "@/components/marketing/CtaBanner";
import { academies, academyHighlights } from "@/data/marketing";

export const metadata = {
  title: "Our 9 Academies — SkillBridge EdTech",
  description:
    "Everything you need to get skilled, certified and hired for in-demand global careers. Explore all 9 SkillBridge academies.",
};

export default function AcademiesPage() {
  return (
    <>
      {/* Intro + hero visual */}
      <section className="bg-surface pt-12 pb-10 lg:pt-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-heading sm:text-5xl lg:text-6xl">
              Our <span className="text-brand">{academies.length}</span> Academies
            </h1>
            <p className="mt-4 max-w-md text-base text-body">
              Everything you need to get skilled, certified and hired for in-demand global careers.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {academyHighlights.map((h) => {
                const Icon = h.icon;
                return (
                  <li key={h.title} className="flex items-start gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light">
                      <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col leading-snug">
                      <span className="text-sm font-semibold text-heading">{h.title}</span>
                      <span className="text-xs text-muted">{h.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex h-56 items-center justify-center rounded-2xl border border-border bg-surface-alt sm:h-72 lg:h-80">
            <span className="text-sm text-muted">Learners collaborating image</span>
          </div>
        </Container>
      </section>

      {/* The 9 academies */}
      <section className="bg-surface pb-14">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {academies.map((a) => {
              const Icon = a.icon;
              return (
                <article
                  key={a.n}
                  className="flex gap-4 rounded-xl border border-border border-t-2 bg-white p-5 transition-shadow hover:shadow-md"
                  style={{ borderTopColor: a.color }}
                >
                  <span
                    className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full sm:h-20 sm:w-20"
                    style={{ backgroundColor: a.color }}
                  >
                    <Icon className="h-8 w-8 text-white sm:h-10 sm:w-10" aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1 border-l border-border pl-4">
                    <div className="flex items-start gap-2">
                      <span
                        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{ backgroundColor: a.color }}
                      >
                        {a.n}
                      </span>
                      <h2 className="text-base font-bold leading-snug text-heading">{a.name}</h2>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-body">{a.description}</p>

                    <Link
                      href="/academies"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: a.color }}
                    >
                      Explore Academy <HiArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-surface pb-14">
        <Container>
          <CtaBanner
            title="Not sure which academy is right for you?"
            subtitle="Take our free career assessment and get a personalized learning plan tailored to your goals."
            primary={{ label: "Take Free Career Assessment", href: "/assessment" }}
            secondary={{ label: "View Career Paths", href: "/career-center" }}
            icon={
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                <HiRocketLaunch className="h-8 w-8" aria-hidden="true" />
              </span>
            }
          />
        </Container>
      </section>
    </>
  );
}
