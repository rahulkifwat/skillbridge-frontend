"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SpanishAcademyShell from "@/components/spanish/SpanishAcademyShell";
import { spanishApi } from "@/lib/api";
import { SPANISH_ASSESSMENT_PATH, SPANISH_DASHBOARD_PATH } from "@/lib/spanishAcademyPaths";

export default function SpanishProfileView() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    spanishApi
      .profile()
      .then((result) => setProfile(result.data.profile))
      .catch((err) => setError(err.message || "No Spanish profile yet."));
  }, []);

  return (
    <SpanishAcademyShell eyebrow="Your Spanish Profile">
      {error ? (
        <p className="text-sm text-body">
          {error}{" "}
          <button type="button" className="font-semibold text-primary" onClick={() => router.push(SPANISH_ASSESSMENT_PATH)}>
            Start the diagnostic
          </button>
        </p>
      ) : null}
      {profile ? (
        <div>
          <h1 className="text-4xl font-bold text-heading">{profile.greeting}</h1>
          <p className="mt-2 text-lg text-heading">
            {profile.cefrLevel} · {profile.overallScore}
          </p>
          <p className="mt-4 max-w-2xl text-sm text-body">{profile.recommendedPath}</p>
          {(profile.evidence || []).length ? (
            <ul className="mt-4 space-y-2 text-sm text-body">
              {profile.evidence.map((row) => (
                <li key={row.skill}>
                  {row.skill}: {row.recommendation}
                </li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            onClick={() => router.push(SPANISH_DASHBOARD_PATH)}
            className="mt-8 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white"
          >
            Start my personalized journey
          </button>
        </div>
      ) : null}
    </SpanishAcademyShell>
  );
}
