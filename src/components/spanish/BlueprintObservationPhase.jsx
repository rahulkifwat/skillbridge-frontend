"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiLockClosed, HiPlay, HiPause, HiArrowRight } from "react-icons/hi2";

/**
 * Video observation phase — Production Master Blueprint §2 (15% weight).
 *
 * Three things are contractual here and none of them are cosmetic:
 *  1. a continuous phonetic guide anchored at the lower third,
 *  2. parallel English / Spanish text blocks shown simultaneously,
 *  3. a hard stop at exactly second 90 that freezes playback, locks the
 *     controls and forces transit into the simulation.
 *
 * There is deliberately no seek bar. The blueprint calls the video
 * "unskippable", so the component never offers a way to jump position.
 */
export default function BlueprintObservationPhase({ video, onPositionChange, onHardStop }) {
  const limit = video?.hardStop?.atSecond ?? 90;
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const startedAt = useRef(0);
  const reported = useRef(-1);

  const cues = useMemo(() => video?.cues || [], [video]);
  const cue = useMemo(
    () => cues.find((row) => position >= row.start && position < row.end) || cues[cues.length - 1] || null,
    [cues, position]
  );

  const freeze = useCallback(() => {
    setPlaying(false);
    setFrozen(true);
    setPosition(limit);
    onHardStop?.(limit);
  }, [limit, onHardStop]);

  useEffect(() => {
    if (!playing || frozen) return undefined;
    startedAt.current = performance.now() - position * 1000;
    let frame;

    function tick() {
      const next = (performance.now() - startedAt.current) / 1000;
      if (next >= limit) {
        freeze();
        return;
      }
      setPosition(next);
      // Report roughly once a second so the server tracks real watch time.
      const whole = Math.floor(next);
      if (whole !== reported.current) {
        reported.current = whole;
        onPositionChange?.(next);
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // `position` is intentionally omitted: it changes every frame and would
    // restart the loop. It is read once on resume via startedAt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, frozen, limit, freeze, onPositionChange]);

  const pct = Math.min(100, (position / limit) * 100);
  const remaining = Math.max(0, Math.ceil(limit - position));

  return (
    <section className="rounded-2xl border border-border bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Phase 1 · Video observation · 15%
          </p>
          <p className="mt-0.5 text-sm font-semibold text-heading">
            Diagnose the officer&apos;s verbal register
          </p>
        </div>
        <span className="rounded-full bg-surface-alt px-3 py-1 text-xs font-bold tabular-nums text-heading">
          {frozen ? "00:00" : `00:${String(remaining).padStart(2, "0")}`} left
        </span>
      </header>

      {/* Stage */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#14181f] via-[#1f2a38] to-[#0b0d12]">
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {cue ? (
            // Parallel text blocks: English operational metric beside the
            // formal Spanish command, per §2.
            <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/15 bg-white/5 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                  English
                </p>
                <p className="mt-2 text-lg font-semibold leading-snug text-white">{cue.english}</p>
              </div>
              <div className="rounded-xl border border-amber-300/30 bg-amber-400/10 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-200/70">
                  Español — registro formal
                </p>
                <p className="mt-2 text-lg font-semibold leading-snug text-white">{cue.spanish}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-white/60">Press play to begin the observation phase.</p>
          )}
        </div>

        {/* Continuous phonetic guide, anchored at the lower third. */}
        {cue?.phonetic && (
          <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/60 px-6 py-3 backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
              Phonetic guide
            </p>
            <p className="mt-1 font-mono text-base tracking-wide text-amber-200">{cue.phonetic}</p>
          </div>
        )}

        {/* Hard stop overlay: frozen, locked, single way forward. */}
        {frozen && (
          <div
            role="alertdialog"
            aria-modal="true"
            aria-label="Observation phase complete"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/80 px-6 text-center backdrop-blur-sm"
          >
            <HiLockClosed className="h-10 w-10 text-amber-300" aria-hidden="true" />
            <div>
              <p className="text-lg font-bold text-white">Observation phase complete</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
                Playback is locked at second {limit}. The remaining 85% of this module is the
                interactive simulation.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onHardStop?.(limit, { advance: true })}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-academy-spanish)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continue to the simulation <HiArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* Transport. No seek bar — the clip is unskippable by design. */}
      <div className="flex items-center gap-4 px-5 py-4">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          disabled={frozen}
          aria-label={playing ? "Pause" : "Play"}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {playing ? <HiPause className="h-5 w-5" /> : <HiPlay className="h-5 w-5" />}
        </button>

        <div
          className="h-2 flex-1 overflow-hidden rounded-full bg-surface-alt"
          role="progressbar"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={limit}
          aria-label="Observation progress"
        >
          <div
            className="h-full rounded-full bg-[var(--color-academy-spanish)] transition-[width] duration-200"
            style={{ width: `${pct}%` }}
          />
        </div>

        <span className="shrink-0 text-xs font-semibold tabular-nums text-muted">
          {Math.floor(position)}s / {limit}s
        </span>
      </div>

      <p className="border-t border-border px-5 py-3 text-xs text-muted">
        Controls lock automatically at second {limit}. This clip cannot be skipped or scrubbed.
      </p>
    </section>
  );
}
