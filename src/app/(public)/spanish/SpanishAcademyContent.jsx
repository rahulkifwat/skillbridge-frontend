"use client";

import Link from "next/link";
import { HiArrowRight, HiCheckCircle, HiChevronRight, HiSparkles } from "react-icons/hi2";
import Container from "@/components/common/Container";
import CountryFlag from "@/components/common/CountryFlag";
import CtaBanner from "@/components/marketing/CtaBanner";
import DarkSection from "@/components/marketing/DarkSection";
import StartSpanishAssessmentButton from "@/components/spanish/StartSpanishAssessmentButton";
import { useT } from "@/context/LanguageContext";
import {
  CONTEXTS,
  COUNTRIES,
  CULTURAL_TRAINING,
  IMMERSION_LEVELS,
  JOURNEY,
  PILLARS,
  PRACTICE_POINTS,
  TRACKS,
  VALUE_STRIP,
} from "@/data/spanishAcademy";

const ACCENT = "var(--color-academy-spanish)";

function SectionLabel({ children, tone = "accent" }) {
  const className =
    tone === "light"
      ? "text-amber-300"
      : tone === "brand"
        ? "text-brand"
        : "text-[var(--color-academy-spanish)]";
  return (
    <p className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${className}`}>{children}</p>
  );
}

export default function SpanishAcademyContent() {
  const t = useT();

  return (
    <>
      {/* Hero */}
      <DarkSection>
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <span
              className="inline-flex rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300"
              style={{ backgroundColor: "rgba(194,65,12,0.18)" }}
            >
              {t("spanish.eyebrow")}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-6xl">
              {t("spanish.title")}
            </h1>

            <p className="mt-5 text-lg font-semibold text-white sm:text-xl">
              {t("spanish.promiseOne")}
            </p>
            <p className="text-lg font-semibold text-amber-300 sm:text-xl">
              {t("spanish.promiseTwo")}
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">
              {t("spanish.lead")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <StartSpanishAssessmentButton
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: ACCENT, boxShadow: "0 10px 30px -12px rgba(194,65,12,0.7)" }}
              >
                {t("spanish.ctaPrimary")}
              </StartSpanishAssessmentButton>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t("spanish.ctaSecondary")}
              </a>
            </div>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
              {t("spanish.motto")}
            </p>
          </div>

          {/* The four pillars from the reference layout */}
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-full blur-3xl"
              style={{ backgroundColor: "rgba(194,65,12,0.18)" }}
              aria-hidden="true"
            />
            <ul className="relative grid gap-3 sm:grid-cols-2">
              {PILLARS.map(({ key, icon: Icon }) => (
                <li
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-sm font-bold leading-snug text-white">
                    {t(`spanish.pillars.${key}.title`)}
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                    {t(`spanish.pillars.${key}.body`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* Core promise */}
        <div className="border-t border-white/10">
          <Container className="py-6">
            <p className="text-center text-base font-semibold text-white sm:text-lg">
              {t("spanish.corePromise")}
            </p>
          </Container>
        </div>
      </DarkSection>

      {/* How it works — the eight-phase cycle */}
      <section id="how-it-works" className="scroll-mt-20 bg-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionLabel>{t("spanish.philosophy.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              {t("spanish.philosophy.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              {t("spanish.philosophy.body")}
            </p>
          </div>

          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map(({ key, icon: Icon }, index) => (
              <li
                key={key}
                className="rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {index + 1}
                  </span>
                  <Icon className="h-5 w-5 text-muted" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-heading">
                  {t(`spanish.journey.${key}.title`)}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-body">
                  {t(`spanish.journey.${key}.body`)}
                </p>
              </li>
            ))}
          </ol>

          <p
            className="mt-6 flex items-start gap-3 rounded-xl border p-5 text-sm font-medium leading-relaxed text-heading"
            style={{
              borderColor: "rgba(194,65,12,0.25)",
              backgroundColor: "var(--color-academy-spanish-soft)",
            }}
          >
            <HiSparkles
              className="h-5 w-5 shrink-0"
              style={{ color: ACCENT }}
              aria-hidden="true"
            />
            {t("spanish.philosophy.note")}
          </p>
        </Container>
      </section>

      {/* Entry flow + example profile */}
      <section className="bg-surface py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>{t("spanish.entry.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading">
              {t("spanish.entry.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">{t("spanish.entry.body")}</p>
            <StartSpanishAssessmentButton
              className="mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: ACCENT }}
            >
              {t("spanish.ctaPrimary")}
            </StartSpanishAssessmentButton>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-bold text-heading">{t("spanish.entry.profileTitle")}</h3>
              <span className="text-xs text-muted">{t("spanish.entry.profileNote")}</span>
            </div>

            <dl className="mt-5 flex flex-col gap-4">
              {[
                ["profileLevel", "profileLevelValue"],
                ["profileTrack", "profileTrackValue"],
                ["profileStrengths", "profileStrengthsValue"],
                ["profilePriorities", "profilePrioritiesValue"],
                ["profilePath", "profilePathValue"],
              ].map(([labelKey, valueKey]) => (
                <div key={labelKey} className="border-l-2 pl-4" style={{ borderColor: ACCENT }}>
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    {t(`spanish.entry.${labelKey}`)}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-relaxed text-heading">
                    {t(`spanish.entry.${valueKey}`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Spanish for real life and real careers */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <SectionLabel>{t("spanish.contexts.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              {t("spanish.contexts.title")}
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CONTEXTS.map(({ key, icon: Icon, color }) => (
              <article
                key={key}
                className="rounded-2xl border border-border border-t-2 bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderTopColor: color }}
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-sm font-bold leading-snug text-heading">
                  {t(`spanish.contexts.${key}.title`)}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-body">
                  {t(`spanish.contexts.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 85 / 15 */}
      <section className="bg-ink py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionLabel tone="light">{t("spanish.practice.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("spanish.practice.title")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              {t("spanish.practice.body")}
            </p>

            {/* 85/15 split bar */}
            <div className="mt-8">
              <div className="flex h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full" style={{ width: "85%", backgroundColor: ACCENT }} />
                <div className="h-full w-[15%] bg-white/30" />
              </div>
              <div className="mt-2 flex justify-between text-xs font-semibold text-white/60">
                <span style={{ color: "#fdba74" }}>
                  85% {t("spanish.practice.splitLabelPractice")}
                </span>
                <span>15% {t("spanish.practice.splitLabelTheory")}</span>
              </div>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {PRACTICE_POINTS.map(({ key, icon: Icon }) => (
              <li key={key} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <Icon className="h-6 w-6" style={{ color: "#fdba74" }} aria-hidden="true" />
                <h3 className="mt-4 text-sm font-bold text-white">
                  {t(`spanish.practice.${key}.title`)}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                  {t(`spanish.practice.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Adaptive immersion matrix */}
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionLabel>{t("spanish.immersion.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              {t("spanish.immersion.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              {t("spanish.immersion.body")}
            </p>
          </div>

          <div className="mt-9 overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface-alt">
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    {t("spanish.immersion.columnLevel")}
                  </th>
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    {t("spanish.immersion.columnLanguage")}
                  </th>
                  <th className="w-44 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    {t("spanish.immersion.spanishShare")}
                  </th>
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    {t("spanish.immersion.columnExperience")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {IMMERSION_LEVELS.map(({ key, spanish }) => (
                  <tr key={key} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-4 text-sm font-bold text-heading">
                      {t(`spanish.immersion.${key}.level`)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-body">
                      {t(`spanish.immersion.${key}.language`)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-alt">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${spanish}%`, backgroundColor: ACCENT }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-right text-xs font-bold text-heading">
                          {spanish}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm leading-relaxed text-body">
                      {t(`spanish.immersion.${key}.body`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Cultural training + country modules */}
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>{t("spanish.cultural.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading">
              {t("spanish.cultural.title")}
            </h2>

            <ul className="mt-7 flex flex-col gap-3">
              {CULTURAL_TRAINING.map(({ key, icon: Icon }) => (
                <li
                  key={key}
                  className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4"
                >
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-heading">
                      {t(`spanish.cultural.${key}.title`)}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-body">
                      {t(`spanish.cultural.${key}.body`)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel>{t("spanish.countries.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading">
              {t("spanish.countries.title")}
            </h2>

            <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {COUNTRIES.map((key) => (
                <li
                  key={key}
                  className="flex flex-col items-center rounded-xl border border-border bg-surface p-4 text-center transition hover:border-[var(--color-academy-spanish)] hover:shadow-sm"
                >
                  <CountryFlag country={key} className="h-11 w-11" />
                  <span className="mt-3 text-sm font-bold text-heading">
                    {t(`spanish.countries.${key}`)}
                  </span>
                  {key === "more" && (
                    <span className="mt-1 text-[11px] leading-snug text-muted">
                      {t("spanish.countries.moreDetail")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Specialty tracks */}
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <SectionLabel>{t("spanish.tracks.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              {t("spanish.tracks.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">{t("spanish.tracks.body")}</p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRACKS.map(({ key, icon: Icon }) => (
              <article key={key} className="rounded-2xl border border-border bg-white p-5">
                <Icon className="h-7 w-7" style={{ color: ACCENT }} aria-hidden="true" />
                <h3 className="mt-4 text-sm font-bold leading-snug text-heading">
                  {t(`spanish.tracks.${key}.title`)}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-body">
                  {t(`spanish.tracks.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Credentials */}
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionLabel>{t("spanish.credentials.eyebrow")}</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              {t("spanish.credentials.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              {t("spanish.credentials.body")}
            </p>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {t("spanish.credentials.planned")}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[
                "foundations",
                "general",
                "professional",
                "healthcare",
                "lawEnforcement",
                "business",
                "cultural",
              ].map((key) => (
                <li
                  key={key}
                  className="rounded-full border px-3.5 py-1.5 text-xs font-semibold text-heading"
                  style={{
                    borderColor: "rgba(194,65,12,0.3)",
                    backgroundColor: "var(--color-academy-spanish-soft)",
                  }}
                >
                  {t(`spanish.credentials.items.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-muted">
              {t("spanish.credentials.records")}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {["competencies", "assessment", "simulation", "level", "specialization"].map(
                (key) => (
                  <li key={key} className="flex items-start gap-3 text-sm text-heading">
                    <HiCheckCircle
                      className="h-5 w-5 shrink-0"
                      style={{ color: ACCENT }}
                      aria-hidden="true"
                    />
                    {t(`spanish.credentials.recordItems.${key}`)}
                  </li>
                )
              )}
            </ul>
          </div>
        </Container>
      </section>

      {/* Value strip + closing */}
      <DarkSection glow={false}>
        <Container className="py-10">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_STRIP.map(({ key, icon: Icon }) => (
              <li key={key} className="flex items-center gap-3">
                <Icon className="h-6 w-6 shrink-0" style={{ color: "#fdba74" }} aria-hidden="true" />
                <span className="text-sm font-semibold leading-snug text-white">
                  {t(`spanish.valueStrip.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </DarkSection>

      <section className="bg-surface py-16">
        <Container>
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              {t("spanish.closing.title")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-body">{t("spanish.closing.body")}</p>
          </div>

          <CtaBanner
            title={t("spanish.cta.title")}
            subtitle={t("spanish.cta.subtitle")}
            primarySlot={
              <StartSpanishAssessmentButton className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60">
                {t("spanish.ctaPrimary")}
              </StartSpanishAssessmentButton>
            }
            secondary={{ label: t("spanish.cta.secondary"), href: "/academies" }}
            icon={
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                <HiChevronRight className="h-8 w-8" aria-hidden="true" />
              </span>
            }
          />
        </Container>
      </section>
    </>
  );
}
