"use client";

import Link from "next/link";
import {
  HiAcademicCap,
  HiArrowRight,
  HiArrowTrendingUp,
  HiBriefcase,
  HiChartBar,
  HiChatBubbleLeftRight,
  HiCheckCircle,
  HiCpuChip,
  HiDocumentText,
  HiGlobeAlt,
  HiHandRaised,
  HiLanguage,
  HiLightBulb,
  HiPuzzlePiece,
  HiSparkles,
  HiUserGroup,
  HiViewfinderCircle,
  HiWrenchScrewdriver,
} from "react-icons/hi2";
import Container from "@/components/common/Container";
import CtaBanner from "@/components/marketing/CtaBanner";
import DarkSection from "@/components/marketing/DarkSection";
import { useT } from "@/context/LanguageContext";

// Program areas from the About Us brief, each with its academy accent colour.
const PROGRAM_AREAS = [
  { key: "english", icon: HiLanguage, color: "var(--color-academy-english)" },
  { key: "software", icon: HiWrenchScrewdriver, color: "var(--color-academy-software)" },
  { key: "ai", icon: HiCpuChip, color: "var(--color-academy-ai)" },
  { key: "career", icon: HiArrowTrendingUp, color: "var(--color-academy-career)" },
  { key: "cultural", icon: HiGlobeAlt, color: "var(--color-academy-cultural)" },
  { key: "remote", icon: HiBriefcase, color: "var(--color-academy-remote)" },
  { key: "techLiteracy", icon: HiPuzzlePiece, color: "var(--color-academy-tech)" },
  { key: "continuing", icon: HiAcademicCap, color: "var(--color-academy-continuing)" },
  { key: "other", icon: HiSparkles, color: "var(--color-academy-path)" },
];

const OPPORTUNITY_ITEMS = [
  { key: "technical", icon: HiWrenchScrewdriver },
  { key: "english", icon: HiChatBubbleLeftRight },
  { key: "teams", icon: HiUserGroup },
  { key: "profiles", icon: HiDocumentText },
  { key: "expectations", icon: HiGlobeAlt },
];

const PHILOSOPHY_ITEMS = [
  "practical",
  "simulations",
  "assessment",
  "personalized",
  "communication",
  "aiLiteracy",
  "cultural",
  "remote",
  "career",
];

const COMMITMENT_PILLARS = [
  { key: "practical", icon: HiWrenchScrewdriver },
  { key: "accessible", icon: HiHandRaised },
  { key: "measurable", icon: HiChartBar },
  { key: "connected", icon: HiBriefcase },
];

function SectionLabel({ children, tone = "brand" }) {
  const color = tone === "light" ? "text-brand-mint" : "text-brand";
  return <p className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${color}`}>{children}</p>;
}

export default function AboutContent() {
  const t = useT();

  return (
    <>
      {/* Hero */}
      <DarkSection>
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-mint">
              {t("about.eyebrow")}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-[3.4rem]">
              {t("about.heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t("about.heroLead")}
            </p>
            <p className="mt-6 border-l-2 border-brand-mint pl-5 text-lg font-semibold leading-snug text-brand-mint sm:text-xl">
              {t("about.heroBelief")}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
              {t("about.heroBody")}
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-3 sm:grid-cols-2">
              {[
                { icon: HiViewfinderCircle, key: "practical" },
                { icon: HiCpuChip, key: "aiLiteracy" },
                { icon: HiChatBubbleLeftRight, key: "communication" },
                { icon: HiGlobeAlt, key: "remote" },
              ].map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <Icon className="h-7 w-7 text-brand-mint" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold leading-snug text-white">
                    {t(`about.philosophy.items.${key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </DarkSection>

      {/* What We Do */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionLabel>{t("about.whatWeDo.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              {t("about.whatWeDo.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">{t("about.whatWeDo.lead")}</p>
          </div>

          <p className="mt-10 text-sm font-bold uppercase tracking-[0.14em] text-muted">
            {t("about.whatWeDo.areasTitle")}
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAM_AREAS.map(({ key, icon: Icon, color }) => (
              <li
                key={key}
                className="flex items-center gap-3 rounded-xl border border-border border-l-4 bg-surface p-4 transition hover:shadow-sm"
                style={{ borderLeftColor: color }}
              >
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-heading">
                  {t(`about.whatWeDo.areas.${key}`)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-surface p-6">
              <HiViewfinderCircle className="h-8 w-8 text-brand" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold text-heading">
                {t("about.whatWeDo.practiceTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {t("about.whatWeDo.practiceBody")}
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6">
              <HiCpuChip className="h-8 w-8 text-brand" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold text-heading">{t("about.whatWeDo.aiTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{t("about.whatWeDo.aiBody")}</p>
            </article>
          </div>
        </Container>
      </section>

      {/* From Learning to Opportunity */}
      <section className="bg-surface py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>{t("about.opportunity.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading">
              {t("about.opportunity.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">{t("about.opportunity.lead")}</p>

            <div className="mt-8 rounded-2xl border border-brand/25 bg-brand-light p-6">
              <div className="flex items-center gap-2">
                <HiGlobeAlt className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <h3 className="text-sm font-bold text-heading">
                  {t("about.opportunity.noteTitle")}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {t("about.opportunity.noteBody")}
              </p>
            </div>
          </div>

          <ol className="border-l border-brand/30 pl-6 lg:pl-8">
            {OPPORTUNITY_ITEMS.map(({ key, icon: Icon }, index) => (
              <li key={key} className="relative pb-6 last:pb-0">
                <span className="absolute -left-[1.9rem] top-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-brand bg-white lg:-left-[2.4rem]" />
                <div className="rounded-2xl border border-border bg-white p-5">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-light">
                      <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-relaxed text-heading">
                        {t(`about.opportunity.items.${key}`)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Training philosophy */}
      <section className="bg-ink py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionLabel tone="light">{t("about.philosophy.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("about.philosophy.title")}
            </h2>
            <p className="mt-4 text-base text-white/70">{t("about.philosophy.lead")}</p>
          </div>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PHILOSOPHY_ITEMS.map((key) => (
              <li
                key={key}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-white"
              >
                <HiCheckCircle className="h-5 w-5 shrink-0 text-brand-mint" aria-hidden="true" />
                {t(`about.philosophy.items.${key}`)}
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-snug text-brand-mint sm:text-xl">
            {t("about.philosophy.closing")}
          </p>
        </Container>
      </section>

      {/* Vision */}
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>{t("about.vision.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading">
              {t("about.vision.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">{t("about.vision.body")}</p>
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-brand-light p-5">
              <HiLightBulb className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-sm font-semibold leading-relaxed text-heading">
                {t("about.vision.closing")}
              </p>
            </div>
          </div>

          <div>
            <SectionLabel>{t("about.commitment.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading">
              {t("about.commitment.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">{t("about.commitment.body")}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {COMMITMENT_PILLARS.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
                >
                  <Icon className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <span className="text-sm font-semibold text-heading">
                    {t(`about.commitment.pillars.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Sign-off + CTA */}
      <section className="bg-surface pb-16">
        <Container>
          <div className="mb-8 text-center">
            <p className="text-2xl font-bold tracking-tight text-heading">SkillBridge</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {t("common.tagline")}
            </p>
          </div>

          <CtaBanner
            title={t("about.cta.title")}
            subtitle={t("about.cta.subtitle")}
            primary={{ label: t("common.startAssessmentLong"), href: "/assessment" }}
            secondary={{ label: t("about.cta.secondary"), href: "/contact" }}
            icon={
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                <HiArrowRight className="h-8 w-8" aria-hidden="true" />
              </span>
            }
          />

          <p className="mt-6 text-center text-sm text-muted">
            <Link href="/academies" className="font-semibold text-brand hover:underline">
              {t("common.exploreAcademies")}
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
