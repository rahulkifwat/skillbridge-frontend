"use client";

import { useState } from "react";

export default function ListeningPlayback({ script }) {
  const [playing, setPlaying] = useState(false);

  if (!script) return null;

  function play() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "es-ES";
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={play}
        className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-heading"
      >
        {playing ? "Playing…" : "Play listening audio"}
      </button>
      <p className="text-xs text-muted">Spoken from the official listening script. Captions stay off until you play.</p>
    </div>
  );
}
