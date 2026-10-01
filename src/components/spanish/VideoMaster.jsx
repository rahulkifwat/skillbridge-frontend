"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { spanishApi } from "@/lib/api";
import LoopCorePlayer from "@/components/spanish/LoopCorePlayer";

export default function VideoMaster() {
  const videoRef = useRef(null);
  const lastGoodRef = useRef(0);
  const programmaticRef = useRef(false);
  const lastReport = useRef(0);
  const [videos, setVideos] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [error, setError] = useState("");
  const [resetNotice, setResetNotice] = useState("");
  const [completionToken, setCompletionToken] = useState(null);
  const [unlockedIds, setUnlockedIds] = useState([]);
  const [production, setProduction] = useState(null);
  const loopRef = useRef(null);

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
        setProduction(result.data.production || null);
        setActiveId(result.data.videos?.[0]?.videoId || "");
      })
      .catch((err) => setError(err.message || "Could not load Video Master lessons."));
  }, []);

  async function report(event, extra = {}) {
    if (!active) return null;
    const node = videoRef.current;
    const duration = extra.duration ?? active.layout?.durationSec ?? node?.duration ?? 0;
    const result = await spanishApi.videoProgress(active.videoId, {
      event,
      position: extra.position ?? node?.currentTime ?? 0,
      duration,
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
    // Re-entry guard. A reset is in flight until the server acknowledges it,
    // and ticks keep arriving at frame rate in the meantime; without this the
    // first reset fans out into thousands of seek-reset posts.
    if (programmaticRef.current) return;

    const node = videoRef.current;
    programmaticRef.current = true;
    lastGoodRef.current = 0;
    if (node) node.currentTime = 0;
    // The Loop Core player owns its own playhead, so tell it to rewind too.
    loopRef.current?.rewind();
    setCompletionToken(null);
    setResetNotice(reason);
    report("seek-reset", { position: 0, duration: active?.layout?.durationSec || 0 }).finally(() => {
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

  async function handleEnded(duration) {
    try {
      const total = duration || videoRef.current?.duration || active?.layout?.durationSec || 0;
      await report("time", { position: total, duration: total });
      await report("ended", { position: total, duration: total });
    } catch (err) {
      setError(err.message || "Could not record video completion.");
    }
  }

  function handleLoopTick(position, duration) {
    // Ignore ticks emitted while a reset is still settling, exactly as the
    // <video> path does — otherwise the rewind races its own tick stream.
    if (programmaticRef.current) return;
    if (position > lastGoodRef.current + 1.5) {
      resetPlayback("Skipping resets this lesson. Watch from the start.");
      return;
    }
    lastGoodRef.current = position;
    const now = Date.now();
    if (now - lastReport.current < 900) return;
    lastReport.current = now;
    report("time", { position, duration }).catch(() => {});
  }

  const simulationReady = Boolean(active && unlockedIds.includes(active.simulationId));
  const produced = Boolean(active?.src);
  const pipeline = active?.pipeline;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Video Master · 15% theory</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-heading">2–3 minute production lessons</h1>
        <p className="mt-2 max-w-2xl text-sm text-body">
          One Loop Core layout engine — Spanish phrase, a one-second pause, then the English vector. Avatar and
          ElevenLabs buckets attach when production keys are funded. Clip-art slides are not used.
        </p>
        {production ? (
          <p className="mt-2 text-xs text-muted">
            Pipeline: {pipeline?.visual || "loop-core"} · {pipeline?.audio || "browser-neural-tts"}
            {production.assetBucket ? " · asset bucket live" : " · local layout"} · token budget $
            {production.monthlyBudgetUsd}/mo
          </p>
        ) : null}
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
                {row.completed ? "Complete" : "Watch required"} · {row.durationHintMin}–{row.durationHintMax} min ·{" "}
                {row.presenter?.uniform}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="font-semibold text-heading">{active.title}</p>
          <p className="mt-1 text-sm text-body">{active.summary}</p>
          {produced ? (
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
              onEnded={() => handleEnded()}
            />
          ) : (
            <div className="mt-4">
              <LoopCorePlayer
                key={active.videoId}
                lesson={active}
                ref={loopRef}
                onTick={handleLoopTick}
                onEnded={(duration) => handleEnded(duration)}
                onReset={() => resetPlayback("Lesson restarted from the first phrase.")}
              />
            </div>
          )}
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
            {/* Keyed off the unlock, not the completion token: the token only
                exists for a lesson finished in this session, so a returning
                learner saw an enabled button beside "finish this lesson". */}
            {simulationReady ? (
              <p className="self-center text-sm text-accent">
                {completionToken
                  ? "Lesson complete. Simulation Master is unlocked for this track."
                  : "Lesson already complete. Simulation Master is unlocked for this track."}
              </p>
            ) : (
              <p className="self-center text-sm text-muted">Finish this 2–3 minute lesson to enable the matching simulation.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
