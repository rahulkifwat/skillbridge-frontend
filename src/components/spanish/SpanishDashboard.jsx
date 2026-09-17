"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SimulationMaster from "@/components/spanish/SimulationMaster";
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
  const [credentials, setCredentials] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([spanishApi.profile(), spanishApi.learning(), spanishApi.credentials()])
      .then(([profileResult, learningResult, credResult]) => {
        setProfile(profileResult.data.profile);
        setLearning(learningResult.data);
        setCredentials(credResult.data.credentials);
      })
      .catch((err) => setError(err.message || "Complete the Spanish diagnostic to open this dashboard."));
  }, []);

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

          <SimulationMaster />

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
