"use client";

import { useCallback, useEffect, useState } from "react";
import { HiArrowDownTray, HiExclamationTriangle } from "react-icons/hi2";
import { blueprintApi } from "@/lib/api";
import BlueprintObservationPhase from "./BlueprintObservationPhase";
import BlueprintSimulationPhase from "./BlueprintSimulationPhase";

/**
 * A Production Master Blueprint module: the 15% observation phase followed by
 * the 85% simulation phase, with the EVALUATOR scorecard at the end.
 */
export default function BlueprintModule({ lessonId }) {
  const [module, setModule] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // The server flips the session to "simulation" the moment second 90 is
  // reported. Swapping the view on that alone would blow straight past the
  // freeze overlay, so the learner acknowledges the lock before transiting.
  const [transited, setTransited] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setLoading(true);
      setError("");
      try {
        const [moduleResponse, sessionResponse] = await Promise.all([
          blueprintApi.module(lessonId),
          blueprintApi.startSession(lessonId),
        ]);
        if (cancelled) return;
        setModule(moduleResponse.data);
        setSession(sessionResponse.data.session);
        // A resumed session that already cleared the video phase goes straight
        // to the simulation — the observation phase is not replayable.
        setTransited(sessionResponse.data.session.status !== "video");
      } catch (caught) {
        if (!cancelled) setError(caught?.message || "Could not open this module.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  // Playback position is reported so watch time is measured server-side; the
  // server, not the player, decides when the observation phase is satisfied.
  const handlePosition = useCallback(
    (positionSec) => {
      if (!session) return;
      blueprintApi.videoPosition(session.id, positionSec).catch(() => {
        // A dropped tick is not worth interrupting playback for; the hard stop
        // reports again at second 90.
      });
    },
    [session]
  );

  const handleHardStop = useCallback(
    async (positionSec, options) => {
      if (!session) return;
      // `advance` comes from the learner clicking through the freeze overlay.
      if (options?.advance) {
        setTransited(true);
        return;
      }
      try {
        const response = await blueprintApi.videoPosition(session.id, positionSec);
        setSession(response.data.session);
      } catch (caught) {
        setError(caught?.message || "Could not record the observation phase.");
      }
    },
    [session]
  );

  async function submitStage(stageId, payload) {
    setBusy(true);
    try {
      const response = await blueprintApi.submitStage(session.id, stageId, payload);
      setSession(response.data.session);
    } finally {
      setBusy(false);
    }
  }

  async function submitReview() {
    setBusy(true);
    try {
      const response = await blueprintApi.review(session.id);
      setSession(response.data.session);
    } finally {
      setBusy(false);
    }
  }

  async function downloadLms() {
    const response = await blueprintApi.lmsExport(session.id);
    const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${session.moduleId}-lms-export.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return <p className="p-6 text-sm text-muted">Loading module…</p>;
  }

  if (error && !module) {
    return (
      <div role="alert" className="m-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <HiExclamationTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
        {error}
      </div>
    );
  }

  const config = module.moduleConfiguration;
  const inVideoPhase = !transited;

  return (
    <div className="flex flex-col gap-5">
      {/* Module UI header block. §4 requires the IP notice to be rendered here. */}
      <header className="rounded-2xl border border-border bg-white px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-academy-spanish)]">
              {config.moduleID} · {config.courseTitle}
            </p>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-heading">
              Lesson {module.lesson.number} — {module.lesson.title}
            </h1>
            <p className="mt-1 text-sm text-body">{module.lesson.focus}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-muted">
              {config.timeAllocation.totalSeconds / 60} min ·{" "}
              {Math.round(config.timeAllocation.videoWeight * 100)}% video /{" "}
              {Math.round(config.timeAllocation.simulationWeight * 100)}% simulation
            </p>
            <p className="mt-1 text-[11px] text-muted">{module.framework}</p>
          </div>
        </div>
        <p className="mt-4 border-t border-border pt-3 text-[11px] text-muted">{module.copyright}</p>
      </header>

      {/* Academic use notice — carried through from the teacher edition. */}
      <p className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-xs leading-relaxed text-amber-900">
        {module.academicNotice}
      </p>

      {error && (
        <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <HiExclamationTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {inVideoPhase ? (
        <BlueprintObservationPhase
          video={module.video}
          onPositionChange={handlePosition}
          onHardStop={handleHardStop}
        />
      ) : (
        <>
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-800">
            Observation phase complete. The remaining {module.simulation.minDurationSec}s of this
            module is interactive.
          </p>
          <BlueprintSimulationPhase
            module={module}
            session={session}
            onSubmitStage={submitStage}
            onReview={submitReview}
            busy={busy}
          />
        </>
      )}

      {session?.review && (
        <button
          type="button"
          onClick={downloadLms}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-heading transition hover:bg-surface-alt"
        >
          <HiArrowDownTray className="h-4 w-4" aria-hidden="true" />
          Download SCORM 1.2 / xAPI export
        </button>
      )}
    </div>
  );
}
