"use client";

import { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

const SCENE = {
  medical: "from-[#0b3d4a] via-[#125c63] to-[#0e2a33]",
  law: "from-[#14181f] via-[#1f2a38] to-[#0b0d12]",
  customer_service: "from-[#1b2a4a] via-[#243868] to-[#15203a]",
  construction: "from-[#3b2a12] via-[#6b4a1e] to-[#24180c]",
};

function currentItem(items, position) {
  return (items || []).find((row) => position >= row.start && position < row.start + row.duration) || null;
}

function speak(text, lang) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.92;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// The largest jump a single frame may advance playback. Deriving position from
// wall-clock elapsed time meant a background tab or a long GC pause produced a
// multi-second jump, which the anti-skip check then read as scrubbing: progress
// was wiped and the lesson could never complete. Clamping the step means a
// stall simply pauses the lesson, which is also the honest reading — nobody
// watched those seconds.
const MAX_FRAME_STEP_SEC = 0.25;

export default function LoopCorePlayer({ lesson, onTick, onEnded, onReset, ref }) {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const positionRef = useRef(0);
  const lastFrameAt = useRef(0);
  const lastSpoken = useRef("");
  const layout = lesson?.layout;
  const duration = layout?.durationSec || 150;
  const item = useMemo(() => currentItem(layout?.items, position), [layout?.items, position]);

  useEffect(() => {
    if (!playing) {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
      return undefined;
    }
    lastFrameAt.current = performance.now();
    let frame;

    function tick(now) {
      const delta = Math.min((now - lastFrameAt.current) / 1000, MAX_FRAME_STEP_SEC);
      lastFrameAt.current = now;
      const next = positionRef.current + delta;

      if (next >= duration) {
        positionRef.current = duration;
        setPosition(duration);
        setPlaying(false);
        onEnded?.(duration);
        return;
      }

      positionRef.current = next;
      setPosition(next);
      onTick?.(next, duration);
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, duration]);

  // Lets the parent rewind the lesson. Without this the parent's anti-skip
  // reset could not actually move the playhead, so every following frame
  // re-triggered the reset — a request storm that only stopped on navigation.
  useImperativeHandle(
    ref,
    () => ({
      rewind() {
        positionRef.current = 0;
        setPosition(0);
        setPlaying(false);
        lastSpoken.current = "";
        if (typeof window !== "undefined") window.speechSynthesis?.cancel();
      },
    }),
    []
  );

  useEffect(() => {
    if (!playing || !item?.text) return;
    const key = `${item.kind}:${item.start}`;
    if (lastSpoken.current === key) return;
    lastSpoken.current = key;
    if (item.kind === "spanish") speak(item.text, "es-MX");
    if (item.kind === "english") speak(item.text, "en-US");
  }, [item, playing]);

  function reset() {
    setPlaying(false);
    setPosition(0);
    positionRef.current = 0;
    lastSpoken.current = "";
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    onReset?.();
  }

  const presenter = lesson?.presenter;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${SCENE[lesson.programId] || SCENE.customer_service} min-h-[22rem] p-6 text-white`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Loop Core · 2–3 min · avatar pipeline</p>
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative flex h-40 w-40 shrink-0 items-end justify-center overflow-hidden rounded-full border border-white/30 bg-white/10 shadow-2xl">
          <div className="absolute inset-x-6 top-8 h-16 rounded-full bg-white/20" />
          <div className="h-24 w-28 rounded-t-[2.5rem] bg-white/90" />
          <div
            className={`absolute bottom-0 h-10 w-full ${
              lesson.programId === "medical"
                ? "bg-teal-400"
                : lesson.programId === "law"
                  ? "bg-slate-700"
                  : lesson.programId === "construction"
                    ? "bg-amber-500"
                    : "bg-sky-700"
            }`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-white/60">{presenter?.uniform}</p>
          <p className="mt-1 text-sm text-white/80">{presenter?.setting}</p>
          <p className="mt-6 text-2xl font-semibold leading-snug">
            {item?.kind === "pause" ? "…" : item?.text || "Press play for Spanish → pause → English."}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/50">
            {item?.kind === "spanish"
              ? "Spanish phrase"
              : item?.kind === "english"
                ? "English translation vector"
                : item?.kind === "pause"
                  ? "1-second controlled pause"
                  : "Ready"}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-heading"
        >
          {playing ? "Pause" : "Play lesson"}
        </button>
        <button type="button" onClick={reset} className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold">
          Restart
        </button>
        <p className="text-xs text-white/70">
          {Math.floor(position / 60)}:{String(Math.floor(position % 60)).padStart(2, "0")} / {Math.floor(duration / 60)}:
          {String(Math.floor(duration % 60)).padStart(2, "0")}
        </p>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
        <div className="h-full bg-white" style={{ width: `${Math.min(100, (position / duration) * 100)}%` }} />
      </div>
    </div>
  );
}
