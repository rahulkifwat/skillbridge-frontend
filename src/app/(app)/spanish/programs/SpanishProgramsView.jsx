"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SpanishAcademyShell from "@/components/spanish/SpanishAcademyShell";
import { useAuth } from "@/context/AuthContext";
import { spanishApi } from "@/lib/api";

export default function SpanishProgramsView() {
  const { user } = useAuth();
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    spanishApi
      .programs()
      .then((result) => setCatalog(result.data))
      .catch((err) => setError(err.message || "Could not load the program catalog."));
  }, [user]);

  return (
    <SpanishAcademyShell eyebrow="Master program list">
      <h1 className="text-3xl font-bold tracking-tight text-heading">Spanish Academy programs</h1>
      <p className="mt-3 max-w-2xl text-sm text-body">
        Authoritative catalog for curriculum, simulations, assessments, and dashboards. Flagship professional
        programs ship first; the rest use the same architecture and can release in phases.
      </p>
      {error ? <p className="mt-4 text-sm text-amber-800">{error}</p> : null}
      {(catalog?.groups || []).map((group) => (
        <section key={group.id} className="mt-8">
          <h2 className="text-lg font-semibold text-heading">{group.title}</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {group.programs.map((program) => (
              <li key={program.id} className="rounded-xl border border-border bg-white px-4 py-3 text-sm">
                <p className="font-semibold text-heading">{program.name}</p>
                <p className="text-body">{program.nameEs}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted">{program.status}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <Link href="/spanish/simulations" className="mt-8 inline-block text-sm font-semibold text-primary">
        Open Simulation Master
      </Link>
    </SpanishAcademyShell>
  );
}
