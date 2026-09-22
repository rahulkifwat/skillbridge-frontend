"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { spanishApi } from "@/lib/api";

export default function VideoMaster() {
  const videoRef = useRef(null);
  const lastGoodRef = useRef(0);
  const programmaticRef = useRef(false);
  const [videos, setVideos] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [error, setError] = useState("");
  const [resetNotice, setResetNotice] = useState("");
  const [completionToken, setCompletionToken] = useState(null);
  const [unlockedIds, setUnlockedIds] = useState([]);

  const active = useMemo(
    () => videos.find((row) => row.videoId === activeId) || videos[0] || null,
    [activeId, videos]
  );

  useEffect(() => {
    spanishApi
      .videos()
      .then((result) => {
        setVideos(result.data.videos || []);
        setUnlockedIds(result.data.unlockedSimulationIds || []);
        setActiveId(result.data.videos?.[0]?.videoId || "");
      })
      .catch((err) => setError(err.message || "Could not load Video Master lessons."));
  }, []);

  async function report(event, extra = {}) {
    if (!active) return null;
    const node = videoRef.current;
    const result = await spanishApi.videoProgress(active.videoId, {
      event,
      position: extra.position ?? node?.currentTime ?? 0,
      duration: extra.duration ?? node?.duration ?? 0,
    });
    const progress = result.data.progress;
    setVideos((current) => current.map((row) => (row.videoId === progress.videoId ? { ...row, ...progress } : row)));
    if (result.data.completionToken) {
      setCompletionToken(result.data.completionToken);
      setUnlockedIds((ids) =>
        ids.includes(result.data.completionToken.simulationId)
          ? ids
          : [...ids, result.data.completionToken.simulationId]
      );
    }
    return result.data;
  }

  function resetPlayback(reason) {
    const node = videoRef.current;
    programmaticRef.current = true;
    lastGoodRef.current = 0;
    if (node) node.currentTime = 0;
    setCompletionToken(null);
    setResetNotice(reason);
    report("seek-reset", { position: 0 }).finally(() => {
      programmaticRef.current = false;
    });
  }

  function handleTimeUpdate() {
    const node = videoRef.current;
    if (!node || programmaticRef.current) return;
    const current = node.currentTime;
    if (current > lastGoodRef.current + 1.5) {
      resetPlayback("Skipping resets this lesson. Watch from the start.");
      return;
    }
    lastGoodRef.current = current;
    if (Math.floor(current) % 2 === 0) {
      report("time", { position: current, duration: node.duration || 0 }).catch(() => {});
    }
  }

  function handleSeeking() {
    if (programmaticRef.current) return;
    resetPlayback("Scrubbing resets this lesson. Watch from the start.");
  }

  async function handleEnded() {
    try {
      await report("ended");
    } catch (err) {
      setError(err.message || "Could not record video completion.");
    }
  }

  const simulationReady = Boolean(active && unlockedIds.includes(active.simulationId));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Video Master</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-heading">2–3 minute micro-lessons</h1>
        <p className="mt-2 max-w-2xl text-sm text-body">
          Watch the full lesson before Simulation Master unlocks. Skipping or scrubbing resets progress.
        </p>
      </div>
      {error ? <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">{error}</p> : null}
      {resetNotice ? <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">{resetNotice}</p> : null}

      <ul className="grid gap-2 sm:grid-cols-2">
        {videos.map((row) => (
          <li key={row.videoId}>
            <button
              type="button"
              onClick={() => {
                setActiveId(row.videoId);
                lastGoodRef.current = 0;
                setResetNotice("");
              }}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm ${
                row.videoId === active?.videoId ? "border-primary bg-white" : "border-border bg-white"
              }`}
            >
              <p className="font-semibold text-heading">{row.title}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted">
                {row.completed ? "Complete" : "Watch required"} · {row.durationHintMin}–{row.durationHintMax} min
              </p>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="font-semibold text-heading">{active.title}</p>
          <p className="mt-1 text-sm text-body">{active.summary}</p>
          <video
            key={active.videoId}
            ref={videoRef}
            className="mt-4 w-full rounded-xl bg-ink"
            controls
            playsInline
            src={active.src}
            onPlay={() => report("play").catch(() => {})}
            onTimeUpdate={handleTimeUpdate}
            onSeeking={handleSeeking}
            onEnded={handleEnded}
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/spanish/simulations"
              aria-disabled={!simulationReady}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                simulationReady
                  ? "bg-primary text-white"
                  : "pointer-events-none cursor-not-allowed bg-slate-200 text-slate-500"
              }`}
            >
              Continue to Simulations
            </Link>
            {completionToken ? (
              <p className="self-center text-sm text-accent">Lesson complete. Simulation Master is unlocked for this track.</p>
            ) : (
              <p className="self-center text-sm text-muted">Finish this video to enable the matching simulation.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
