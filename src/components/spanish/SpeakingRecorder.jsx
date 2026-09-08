"use client";

import { useRef, useState } from "react";

export default function SpeakingRecorder({ onRecorded }) {
  const [status, setStatus] = useState("idle");
  const [seconds, setSeconds] = useState(0);
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);
  const startedAt = useRef(0);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    startedAt.current = Date.now();
    recorder.ondataavailable = (event) => {
      if (event.data.size) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop());
      const durationMs = Date.now() - startedAt.current;
      setSeconds(Math.round(durationMs / 1000));
      setStatus("recorded");
      onRecorded?.({ recorded: true, durationMs });
    };
    mediaRef.current = recorder;
    recorder.start();
    setStatus("recording");
  }

  function stop() {
    mediaRef.current?.stop();
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      {status !== "recording" ? (
        <button
          type="button"
          onClick={start}
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-heading"
        >
          Record speaking
        </button>
      ) : (
        <button type="button" onClick={stop} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white">
          Stop recording
        </button>
      )}
      <p className="text-xs text-muted">
        {status === "recorded"
          ? `Saved ${seconds}s of audio for fluency scoring. Also type what you said so writing evidence is stored.`
          : "Recording is scored for duration/fluency. A typed transcript is still required for vocabulary and grammar."}
      </p>
    </div>
  );
}
