"use client";

import { useEffect, useRef } from "react";

function noiseBuffer(ctx) {
  const length = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function startLoop(ctx, output, programId) {
  const master = ctx.createGain();
  master.gain.value = 0.07;
  master.connect(output);

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer(ctx);
  noise.loop = true;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = programId === "law" ? "highpass" : "lowpass";
  noiseFilter.frequency.value = programId === "law" ? 1800 : 700;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = programId === "medical" ? 0.18 : 0.28;
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(master);
  noise.start();

  if (programId === "medical") {
    const beep = ctx.createOscillator();
    const beepGain = ctx.createGain();
    beep.frequency.value = 880;
    beepGain.gain.value = 0;
    beep.connect(beepGain);
    beepGain.connect(master);
    beep.start();
    const pulse = () => {
      const now = ctx.currentTime;
      beepGain.gain.cancelScheduledValues(now);
      beepGain.gain.setValueAtTime(0, now);
      beepGain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      beepGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    };
    pulse();
    const timer = window.setInterval(pulse, 860);
    return () => {
      window.clearInterval(timer);
      beep.stop();
      noise.stop();
    };
  }

  if (programId === "law") {
    const rumble = ctx.createOscillator();
    rumble.type = "sawtooth";
    rumble.frequency.value = 55;
    const rumbleGain = ctx.createGain();
    rumbleGain.gain.value = 0.04;
    rumble.connect(rumbleGain);
    rumbleGain.connect(master);
    rumble.start();
    return () => {
      rumble.stop();
      noise.stop();
    };
  }

  return () => noise.stop();
}

export default function AmbientBed({ programId, active }) {
  const stopRef = useRef(null);

  useEffect(() => {
    if (!active || !programId) return undefined;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return undefined;
    const ctx = new AudioCtx();
    const stop = startLoop(ctx, ctx.destination, programId);
    stopRef.current = () => {
      stop();
      ctx.close();
    };
    ctx.resume?.();
    return () => stopRef.current?.();
  }, [active, programId]);

  if (!active) return null;
  return (
    <p className="text-xs uppercase tracking-[0.16em] text-muted">
      Atmospheric bed mixing under this scenario
    </p>
  );
}
