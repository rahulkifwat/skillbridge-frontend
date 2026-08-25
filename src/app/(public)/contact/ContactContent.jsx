"use client";

import {
  HiAcademicCap,
  HiBriefcase,
  HiBuildingLibrary,
  HiBuildingOffice2,
  HiHandRaised,
  HiUserGroup,
} from "react-icons/hi2";
import Container from "@/components/common/Container";
import DarkSection from "@/components/marketing/DarkSection";
import { useT } from "@/context/LanguageContext";
import ContactForm from "./ContactForm";

// The six audiences named in the Contact Us brief.
const AUDIENCES = [
  { key: "students", icon: HiUserGroup, color: "var(--color-academy-english)" },
  { key: "employers", icon: HiBriefcase, color: "var(--color-academy-remote)" },
  { key: "universities", icon: HiAcademicCap, color: "var(--color-academy-software)" },
  { key: "schools", icon: HiBuildingLibrary, color: "var(--color-academy-ai)" },
  { key: "government", icon: HiBuildingOffice2, color: "var(--color-academy-tech)" },
  { key: "partners", icon: HiHandRaised, color: "var(--color-academy-path)" },
];

export default function ContactContent() {
  const t = useT();

  return (
    <>
      {/* Hero */}
      <DarkSection>
        <Container className="py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-mint">
              {t("contact.eyebrow")}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
              {t("contact.heroTitle")}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
              {t("contact.heroLead")}
            </p>
          </div>
        </Container>
      </DarkSection>

      {/* Who can contact SkillBridge */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              {t("contact.audiences.title")}
            </h2>
            <p className="mt-3 text-base text-body">{t("contact.audiences.subtitle")}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map(({ key, icon: Icon, color }) => (
              <article
                key={key}
                className="rounded-2xl border border-border border-t-2 bg-surface p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderTopColor: color }}
              >
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-bold leading-snug text-heading">
                  {t(`contact.audiences.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {t(`contact.audiences.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Form + closing note */}
      <section className="bg-surface py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <ContactForm />

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-white p-6">
              <h2 className="text-xl font-bold tracking-tight text-heading">
                {t("contact.connect.title")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-body">{t("contact.connect.body")}</p>
            </div>

            <div className="mt-4 rounded-2xl bg-ink p-6 text-center">
              <p className="text-xl font-bold tracking-tight text-white">SkillBridge</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-mint">
                {t("common.tagline")}
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
