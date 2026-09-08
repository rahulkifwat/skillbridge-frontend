"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SpanishAcademyShell from "@/components/spanish/SpanishAcademyShell";
import { spanishApi } from "@/lib/api";
import { SPANISH_ASSESSMENT_PATH } from "@/lib/spanishAcademyPaths";

const SKILL_LABEL = {
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  speaking: "Speaking",
};

export default function SpanishDashboard() {
  const [profile, setProfile] = useState(null);
  const [learning, setLearning] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [simulation, setSimulation] = useState(null);
  const [credentials, setCredentials] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([spanishApi.profile(), spanishApi.learning(), spanishApi.simulations(), spanishApi.credentials()])
      .then(([profileResult, learningResult, simResult, credResult]) => {
        setProfile(profileResult.data.profile);
        setLearning(learningResult.data);
        setScenarios(simResult.data.scenarios);
        setCredentials(credResult.data.credentials);
      })
      .catch((err) => setError(err.message || "Complete the Spanish diagnostic to open this dashboard."));
  }, []);

  async function beginSim(scenarioId) {
    setBusy(true);
    setError("");
    try {
      const result = await spanishApi.startSimulation(scenarioId);
      setSimulation(result.data);
    } catch (err) {
      setError(err.message || "Membership is required for simulations.");
    } finally {
      setBusy(false);
    }
  }

  async function choose(optionId) {
    setBusy(true);
    try {
      const result = await spanishApi.chooseSimulation(simulation.runId, optionId);
      setSimulation(result.data);
    } catch (err) {
      setError(err.message || "Could not save that simulation choice.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SpanishAcademyShell eyebrow="Personalized dashboard">
      <h1 className="text-3xl font-bold tracking-tight text-heading">Your Spanish learning path</h1>
      {error ? (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-heading">
          <p>{error}</p>
          <Link href={SPANISH_ASSESSMENT_PATH} className="mt-3 inline-block font-semibold text-primary">
            Take the Spanish diagnostic
          </Link>
        </div>
      ) : null}
      {profile ? (
        <div className="mt-6 space-y-6">
          <p className="text-body">
            Current level <span className="font-bold text-heading">{profile.cefrLevel}</span> · confidence{" "}
            {profile.confidence}
          </p>
          <p className="text-sm text-body">{profile.recommendedPath}</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {Object.entries(profile.skillScores || {}).map(([skill, score]) => (
              <li key={skill} className="rounded-xl border border-border bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{SKILL_LABEL[skill] || skill}</p>
                <p className="mt-1 text-2xl font-bold text-heading">{score}</p>
              </li>
            ))}
          </ul>

          {learning?.curriculum ? (
            <div className="rounded-2xl border border-border bg-white p-5">
              <p className="font-semibold text-heading">
                {learning.curriculum.band} sequence · {learning.curriculum.practiceRule}
              </p>
              {!learning.membershipPaid ? (
                <p className="mt-2 text-sm text-muted">
                  Units are visible from your diagnostic. Membership unlocks practice and simulations.
                </p>
              ) : null}
              <ol className="mt-4 grid gap-2 sm:grid-cols-2">
                {learning.curriculum.units.map((unit) => (
                  <li key={unit.index} className="rounded-lg border border-border px-3 py-2 text-sm text-heading">
                    {unit.index}. {unit.title}
                    {unit.status === "next" ? " · next" : ""}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <div className="rounded-2xl border border-border bg-white p-5">
            <p className="font-semibold text-heading">Simulations</p>
            <ul className="mt-3 space-y-2">
              {scenarios.map((row) => (
                <li key={row.scenarioId} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span>
                    {row.title} — {row.objective}
                  </span>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => beginSim(row.scenarioId)}
                    className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    Start
                  </button>
                </li>
              ))}
            </ul>
            {simulation ? (
              <div className="mt-4 rounded-xl border border-border p-4 text-sm">
                <p className="font-medium text-heading">{simulation.prompt}</p>
                <p className="mt-1 text-muted">Score {simulation.score}</p>
                {(simulation.options || []).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    disabled={busy || simulation.complete}
                    onClick={() => choose(option.id)}
                    className="mt-2 mr-2 rounded-lg border border-border px-3 py-2 text-heading disabled:opacity-50"
                  >
                    {option.label}
                  </button>
                ))}
                {simulation.complete ? <p className="mt-3 font-semibold text-accent">Simulation complete.</p> : null}
              </div>
            ) : null}
          </div>

          {credentials.length ? (
            <div className="rounded-2xl border border-border bg-white p-5 text-sm">
              <p className="font-semibold text-heading">Credentials</p>
              <ul className="mt-2 list-disc pl-5">
                {credentials.map((row) => (
                  <li key={row.issuedAt}>{row.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted">Credentials issue when diagnostic mastery thresholds are met.</p>
          )}
        </div>
      ) : null}
    </SpanishAcademyShell>
  );
}
