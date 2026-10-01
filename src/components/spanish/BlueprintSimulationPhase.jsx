"use client";

import { useState } from "react";
import {
  HiArrowRight,
  HiCheckCircle,
  HiExclamationTriangle,
  HiLockClosed,
  HiPlus,
  HiShieldExclamation,
  HiTrash,
} from "react-icons/hi2";

/**
 * Interactive simulation phase — Production Master Blueprint §3 (85% weight).
 *
 * ST-01 diagnoses the register from the clip. ST-02 is the Appendix H
 * Claim-Evidence-Decision matrix, policed by the Appendix D Bias Gate: a claim
 * with no evidence freezes the panel and locks the continue button. ST-03 is
 * the compliance review, which can trigger the risk escalation loop.
 */

const EMPTY_ROW = { claim: "", evidence: "", decision: "" };

function StageHeader({ id, title, state }) {
  const tone =
    state === "done"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : state === "active"
        ? "bg-[var(--color-academy-spanish-soft)] text-[var(--color-academy-spanish)] border-[var(--color-academy-spanish)]/30"
        : "bg-surface-alt text-muted border-border";
  return (
    <div className="flex items-center gap-3">
      <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${tone}`}>{id}</span>
      <h3 className="text-sm font-bold text-heading">{title}</h3>
    </div>
  );
}

function RatingPill({ rating, label }) {
  const strong = rating >= 4;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
        strong ? "bg-emerald-50 text-emerald-700" : rating >= 3 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
      }`}
    >
      {rating} / 5 {label ? `· ${label}` : ""}
    </span>
  );
}

export default function BlueprintSimulationPhase({ module, session, onSubmitStage, onReview, busy }) {
  const [registerAssessment, setRegisterAssessment] = useState("");
  const [correction, setCorrection] = useState("");
  const [matrix, setMatrix] = useState([{ ...EMPTY_ROW }]);
  const [error, setError] = useState("");

  const results = session?.stageResults || [];
  const st01 = results.find((row) => row.stageId === "ST-01") || null;
  const st02 = results.find((row) => row.stageId === "ST-02") || null;
  const review = session?.review || null;
  const current = session?.currentStageId || "ST-01";

  // The gate stays shut until every claim carries evidence.
  const gate = st02?.biasGate?.triggered ? st02.biasGate : null;

  function updateRow(index, field, value) {
    setMatrix((rows) => rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  async function run(action) {
    setError("");
    try {
      await action();
    } catch (caught) {
      setError(caught?.message || "Something went wrong. Try again.");
    }
  }

  const referenceCommands = module?.simulation?.referenceCommands || [];

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <HiExclamationTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {/* ── ST-01 ─────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-border bg-white p-5">
        <StageHeader id="ST-01" title="Verbal register analysis" state={st01 ? "done" : "active"} />
        <p className="mt-3 text-sm leading-relaxed text-body">{module?.simulation?.stages?.[0]?.prompt}</p>

        {st01 ? (
          <div className="mt-4 rounded-xl border border-border bg-surface p-4">
            <RatingPill rating={st01.rating} label={st01.advance ? "advanced" : "retry"} />
            <ul className="mt-3 flex flex-col gap-1.5">
              {st01.notes.map((note) => (
                <li key={note} className="text-sm text-body">{note}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                The register the officer used
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { value: "formal", label: "Formal (usted)" },
                  { value: "informal", label: "Informal street register" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                      registerAssessment === option.value
                        ? "border-[var(--color-academy-spanish)] bg-[var(--color-academy-spanish-soft)] text-[var(--color-academy-spanish)]"
                        : "border-border bg-white text-body hover:border-[var(--color-academy-spanish)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="registerAssessment"
                      value={option.value}
                      checked={registerAssessment === option.value}
                      onChange={(event) => setRegisterAssessment(event.target.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="st01-correction" className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                Rewrite the command in the formal usted format
              </label>
              <input
                id="st01-correction"
                type="text"
                value={correction}
                onChange={(event) => setCorrection(event.target.value)}
                placeholder="Salga del vehículo, por favor."
                className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-heading outline-none transition focus:border-[var(--color-academy-spanish)] focus:ring-2 focus:ring-[var(--color-academy-spanish)]/15"
              />
              {referenceCommands.length > 0 && (
                <p className="mt-2 text-xs text-muted">
                  Reference: <span className="font-semibold text-heading">{referenceCommands[0].spanish}</span>{" "}
                  <span className="font-mono">{referenceCommands[0].phonetic}</span>
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={busy || !registerAssessment}
              onClick={() => run(() => onSubmitStage("ST-01", { registerAssessment, correction }))}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[var(--color-academy-spanish)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit analysis <HiArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </section>

      {/* ── ST-02 ─────────────────────────────────────────────────────────── */}
      <section className={`relative rounded-2xl border bg-white p-5 ${gate ? "border-red-300" : "border-border"}`}>
        <StageHeader
          id="ST-02"
          title="Claim-Evidence-Decision matrix (Appendix H)"
          state={st02 && !gate ? "done" : current === "ST-02" ? "active" : "idle"}
        />
        <p className="mt-3 text-sm leading-relaxed text-body">{module?.simulation?.stages?.[1]?.prompt}</p>

        {current === "ST-01" && !st01 ? (
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <HiLockClosed className="h-4 w-4" aria-hidden="true" /> Complete ST-01 first.
          </p>
        ) : (
          <>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Claim", "Evidence", "Decision", ""].map((heading) => (
                      <th key={heading} className="px-2 py-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row, index) => {
                    const unresolved = gate?.unresolvedClaims?.includes(row.claim.trim());
                    return (
                      <tr key={index} className="border-b border-border last:border-b-0">
                        {["claim", "evidence", "decision"].map((field) => (
                          <td key={field} className="px-2 py-2">
                            <input
                              type="text"
                              value={row[field]}
                              onChange={(event) => updateRow(index, field, event.target.value)}
                              aria-label={`${field} row ${index + 1}`}
                              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[var(--color-academy-spanish)]/15 ${
                                unresolved && field === "evidence"
                                  ? "border-red-400 focus:border-red-500"
                                  : "border-border focus:border-[var(--color-academy-spanish)]"
                              }`}
                            />
                          </td>
                        ))}
                        <td className="px-2 py-2">
                          <button
                            type="button"
                            onClick={() => setMatrix((rows) => rows.filter((_, i) => i !== index))}
                            disabled={matrix.length === 1}
                            aria-label={`Remove row ${index + 1}`}
                            className="rounded-md p-2 text-muted transition hover:bg-surface-alt hover:text-red-600 disabled:opacity-30"
                          >
                            <HiTrash className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={() => setMatrix((rows) => [...rows, { ...EMPTY_ROW }])}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-academy-spanish)] hover:underline"
            >
              <HiPlus className="h-4 w-4" aria-hidden="true" /> Add a row
            </button>

            {/* Appendix D — the Bias Gate. */}
            {gate && (
              <div
                role="alertdialog"
                aria-modal="true"
                aria-label="Bias Gate"
                className="mt-4 rounded-xl border-2 border-red-300 bg-red-50 p-5"
              >
                <div className="flex items-center gap-2">
                  <HiShieldExclamation className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <p className="text-sm font-bold text-red-800">
                    {gate.title} — {gate.appendix}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-red-700">{gate.message}</p>
                <ul className="mt-3 flex flex-col gap-1">
                  {gate.unresolvedClaims.map((claim) => (
                    <li key={claim} className="text-sm font-medium text-red-800">
                      · {claim}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-700">
                  <HiLockClosed className="h-3.5 w-3.5" aria-hidden="true" />
                  Continue is locked until every claim has evidence.
                </p>
              </div>
            )}

            {st02 && !gate && (
              <div className="mt-4 rounded-xl border border-border bg-surface p-4">
                <RatingPill rating={st02.rating} label={st02.advance ? "advanced" : "retry"} />
                <ul className="mt-3 flex flex-col gap-1.5">
                  {st02.notes.map((note) => (
                    <li key={note} className="text-sm text-body">{note}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              disabled={busy || !st01}
              onClick={() => run(() => onSubmitStage("ST-02", { matrix }))}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-[var(--color-academy-spanish)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {gate ? "Re-check the matrix" : "Submit the matrix"}{" "}
              <HiArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </>
        )}
      </section>

      {/* ── ST-03 ─────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-border bg-white p-5">
        <StageHeader id="ST-03" title="Compliance review" state={review ? "done" : "idle"} />
        <p className="mt-3 text-sm leading-relaxed text-body">{module?.simulation?.stages?.[2]?.prompt}</p>

        {review ? (
          <div className="mt-4 flex flex-col gap-4">
            <div
              className={`rounded-xl border p-4 ${
                review.passed ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-2">
                {review.passed ? (
                  <HiCheckCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                ) : (
                  <HiExclamationTriangle className="h-5 w-5 text-red-600" aria-hidden="true" />
                )}
                <p className={`text-sm font-bold ${review.passed ? "text-emerald-800" : "text-red-800"}`}>
                  Rating {review.rating} / 5 — {review.label}
                </p>
              </div>
              {review.failures.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1">
                  {review.failures.map((failure) => (
                    <li key={failure} className="text-sm text-red-700">· {failure}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* EVALUATOR Framework scorecard */}
            <div className="rounded-xl border border-border">
              <p className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {module?.scorecardEngine?.frameworkName}
              </p>
              <ul className="divide-y divide-border">
                {review.scorecard.map((row) => (
                  <li key={row.dimension} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-heading">{row.dimension}</p>
                      <p className="text-xs text-muted">
                        Minimum required: {row.minimumRatingRequired}
                        {row.appendixReference ? ` · ${row.appendixReference}` : ""}
                        {row.targetRegister ? ` · ${row.targetRegister}` : ""}
                      </p>
                    </div>
                    <RatingPill rating={row.rating} label={row.met ? "met" : "below minimum"} />
                  </li>
                ))}
              </ul>
            </div>

            {review.riskEscalation && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
                <p className="text-sm font-bold text-amber-900">Risk escalation loop triggered</p>
                <p className="mt-2 text-sm leading-relaxed text-amber-800">
                  This module is held for remediation. An instructor releases the hold before you retry.
                  Your account and other modules are unaffected.
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            disabled={busy || !st01 || !st02 || Boolean(gate)}
            onClick={() => run(() => onReview())}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit for compliance review <HiArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </section>
    </div>
  );
}
