"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiArrowRight, HiExclamationTriangle, HiLockClosed } from "react-icons/hi2";
import { blueprintApi } from "@/lib/api";

/** Catalogue of Production Master Blueprint modules for Unit 1. */
export default function BlueprintModuleList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    blueprintApi
      .modules()
      .then((response) => {
        if (!cancelled) setData(response.data);
      })
      .catch((caught) => {
        if (!cancelled) setError(caught?.message || "Could not load modules.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <HiExclamationTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
        {error}
      </div>
    );
  }

  if (!data) return <p className="text-sm text-muted">Loading modules…</p>;

  const videoPct = Math.round(data.timeAllocation.videoWeight * 100);
  const simPct = Math.round(data.timeAllocation.simulationWeight * 100);

  return (
    <div className="flex flex-col gap-5">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-academy-spanish)]">
          {data.documentId}
        </p>
        <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-heading">Production modules</h1>
        <p className="mt-2 text-base text-body">
          Every module runs {data.timeAllocation.totalSeconds / 60} minutes: {videoPct}% video
          observation, {simPct}% interactive simulation. The video locks at second{" "}
          {Math.round(data.timeAllocation.totalSeconds * data.timeAllocation.videoWeight)}.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {data.modules.map((module) => (
          <li key={module.moduleID}>
            <Link
              href={`/spanish/modules/${module.lessonId}`}
              aria-disabled={module.held}
              className={`flex h-full flex-col rounded-2xl border bg-white p-5 transition ${
                module.held
                  ? "pointer-events-none border-amber-300 bg-amber-50/40 opacity-70"
                  : "border-border hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-bold text-heading">
                  {module.moduleID}
                </span>
                {module.held && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700">
                    <HiLockClosed className="h-3.5 w-3.5" aria-hidden="true" /> Held
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-base font-bold leading-snug text-heading">{module.title}</h2>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-body">{module.focus}</p>
              <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted">
                {module.videoSeconds}s video · {module.simulationSeconds}s simulation
                {!module.held && (
                  <HiArrowRight className="h-3.5 w-3.5 text-[var(--color-academy-spanish)]" aria-hidden="true" />
                )}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Deployment &amp; SCORM compliance
        </h2>
        <ul className="mt-3 flex flex-col gap-3">
          {data.deploymentChecklist.map((item) => (
            <li key={item.id}>
              <p className="text-sm font-semibold text-heading">{item.label}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-body">{item.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-border pt-3 text-[11px] text-muted">{data.copyright}</p>
      </section>
    </div>
  );
}
