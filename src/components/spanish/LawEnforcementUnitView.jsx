"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SpanishAcademyShell from "@/components/spanish/SpanishAcademyShell";
import { useAuth } from "@/context/AuthContext";
import { spanishApi } from "@/lib/api";

function FieldForm({ formId, title, fields, lessonId, saved }) {
  const [values, setValues] = useState(saved || {});
  const [status, setStatus] = useState("");

  async function submit(event) {
    event.preventDefault();
    setStatus("");
    try {
      await spanishApi.saveLawUnit1Form({ formId, lessonId, fields: values });
      setStatus("Saved as a classroom simulation form. Not an official agency document.");
    } catch (err) {
      setStatus(err.message || "Could not save this form.");
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3 rounded-xl border border-border bg-white p-4">
      <p className="text-sm font-semibold text-heading">{title}</p>
      {(fields || []).map((field) => (
        <label key={field} className="block text-xs text-muted">
          {field}
          <input
            value={values[field] || ""}
            onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-heading"
          />
        </label>
      ))}
      <button type="submit" className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white">
        Save classroom form
      </button>
      {status ? <p className="text-xs text-body">{status}</p> : null}
    </form>
  );
}

export default function LawEnforcementUnitView() {
  const { user } = useAuth();
  const [unit, setUnit] = useState(null);
  const [forms, setForms] = useState([]);
  const [activeId, setActiveId] = useState("l1");
  const [error, setError] = useState("");
  const instructor = ["instructor", "administrator", "super_admin"].includes(user?.role);

  useEffect(() => {
    Promise.all([spanishApi.lawUnit1(), spanishApi.lawUnit1Forms().catch(() => ({ data: { forms: [] } }))])
      .then(([result, saved]) => {
        setUnit(result.data);
        setForms(saved.data?.forms || []);
        setActiveId(result.data.lessons?.[0]?.id || "l1");
      })
      .catch((err) => setError(err.message || "Could not load Law Enforcement Unit 1."));
  }, []);

  const lesson = useMemo(
    () => unit?.lessons?.find((row) => row.id === activeId) || unit?.lessons?.[0],
    [unit, activeId]
  );
  const formSpec = unit?.forms?.[lesson?.formId];
  const saved = forms.find((row) => row.formId === lesson?.formId)?.fields;

  return (
    <SpanishAcademyShell eyebrow="Law Enforcement Spanish · Level 1">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Unit 1 · 8 lessons · 49-page master model</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-heading">Foundational field communication</h1>
      <p className="mt-2 max-w-3xl text-sm text-body">
        Traffic stops, identification, SFST language, vehicle-extraction vocabulary, handcuffing language, and Miranda
        practice — classroom simulation only.
      </p>
      {unit?.academicNotice ? (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-heading">{unit.academicNotice}</p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-amber-800">{error}</p> : null}

      <ul className="mt-6 grid gap-2 sm:grid-cols-4">
        {(unit?.lessons || []).map((row) => (
          <li key={row.id}>
            <button
              type="button"
              onClick={() => setActiveId(row.id)}
              className={`w-full rounded-xl border px-3 py-3 text-left text-sm ${
                row.id === lesson?.id ? "border-primary bg-white" : "border-border bg-white"
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Lesson {row.number}</p>
              <p className="mt-1 font-semibold text-heading">{row.title}</p>
            </button>
          </li>
        ))}
      </ul>

      {lesson ? (
        <section className="mt-8 rounded-2xl border border-border bg-white p-6">
          <h2 className="text-xl font-bold text-heading">
            Lesson {lesson.number}: {lesson.title}
          </h2>
          <p className="mt-1 text-sm text-body">{lesson.focus}</p>
          {instructor ? <p className="mt-3 text-sm text-heading">Teacher direction: {lesson.teacherCue}</p> : null}

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">Professional language</h3>
          <ul className="mt-2 divide-y divide-border text-sm">
            {(lesson.commands || []).map((row) => (
              <li key={row.es} className="grid gap-1 py-2 sm:grid-cols-2">
                <span className="text-body">{row.en}</span>
                <span className="font-medium text-heading">{row.es}</span>
              </li>
            ))}
          </ul>

          {lesson.registerRepair ? (
            <div className="mt-4 text-sm">
              <p className="font-semibold text-heading">Neutral status vs accusation</p>
              <ul className="mt-2 space-y-1 text-body">
                {lesson.registerRepair.map((row) => (
                  <li key={row.prefer}>
                    Prefer <span className="font-medium text-heading">{row.prefer}</span> — not “{row.avoid}”.
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {lesson.stages ? (
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-body">
              {lesson.stages.map((stage) => (
                <li key={stage}>{stage}</li>
              ))}
            </ol>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/spanish/videos" className="text-primary">
              Video Master
            </Link>
            <Link href="/spanish/simulations" className="text-primary">
              Simulation Master · {lesson.simulationId}
            </Link>
          </div>

          {formSpec ? (
            <FieldForm
              formId={lesson.formId}
              title={formSpec.title}
              fields={formSpec.fields}
              lessonId={lesson.id}
              saved={saved}
            />
          ) : null}
        </section>
      ) : null}

      <section className="mt-8 rounded-2xl border border-border bg-white p-6">
        <h2 className="text-lg font-bold text-heading">Student language bank</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
          {(unit?.languageBank || []).map((row) => (
            <li key={row.es} className="rounded-lg border border-border px-3 py-2">
              <p className="text-muted">{row.en}</p>
              <p className="font-medium text-heading">{row.es}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-white p-6">
        <h2 className="text-lg font-bold text-heading">Success criteria & capstone rubric</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-body">
          {(unit?.successCriteria || []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul className="mt-4 grid gap-2 sm:grid-cols-5 text-xs">
          {(unit?.capstoneRubric || []).map((row) => (
            <li key={row.id} className="rounded-lg border border-border px-3 py-2">
              {row.label} · /{row.max}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-body">
          Final performance assessment: {unit?.finalAssessment?.totalPoints || 60} points across traffic stop, identity,
          SFST language, custody/Miranda, documentation, and professional register.
        </p>
      </section>
    </SpanishAcademyShell>
  );
}
