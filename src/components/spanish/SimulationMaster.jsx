"use client";

import { useEffect, useRef, useState } from "react";
import { spanishApi } from "@/lib/api";
import AmbientBed from "@/components/spanish/AmbientBed";

const CATEGORY_LABEL = {
  comprehension: "Comprehension",
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  fluency: "Fluency",
  professional_terminology: "Professional terminology",
  communication_effectiveness: "Communication",
  cultural_appropriateness: "Cultural appropriateness",
  task_completion: "Task completion",
};

const BAND_CLASS = {
  green: "border-emerald-700 bg-emerald-600 text-white",
  yellow: "border-amber-500 bg-amber-400 text-black",
  red: "border-red-800 bg-red-600 text-white",
};

function FluencyBlock({ pronunciation, onRerun }) {
  if (!pronunciation) return null;
  return (
    <div className={`mt-3 rounded-xl border-2 px-4 py-3 text-sm ${BAND_CLASS[pronunciation.band] || BAND_CLASS.yellow}`}>
      <p className="font-semibold uppercase tracking-wide">
        {pronunciation.band === "green"
          ? "Fluent command"
          : pronunciation.band === "yellow"
            ? "Clear comprehension"
            : "Rerun required"}
      </p>
      <p className="mt-1">{pronunciation.fluency}</p>
      {pronunciation.rerun ? (
        <button type="button" onClick={onRerun} className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-700">
          Rerun this container
        </button>
      ) : null}
    </div>
  );
}

export default function SimulationMaster() {
  const [items, setItems] = useState([]);
  const [session, setSession] = useState(null);
  const [history, setHistory] = useState([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [programId, setProgramId] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    Promise.all([spanishApi.masterSimulations(), spanishApi.masterSimulationHistory()])
      .then(([list, hist]) => {
        setItems(list.data.simulations || []);
        setHistory(hist.data.sessions || []);
      })
      .catch((err) => setError(err.message || "Membership is required for Simulation Master."));
  }, []);

  async function start(id) {
    setBusy(true);
    setError("");
    try {
      const result = await spanishApi.startMasterSimulation(id);
      const row = items.find((item) => item.simulation_id === id);
      setProgramId(row?.program_id || "");
      setSession({
        ...result.data,
        transcript: [{ role: "assistant", content: result.data.initial_message }],
        atmosphere: result.data.atmosphere || row?.atmosphere,
        master_script: result.data.master_script || row?.master_script || [],
      });
    } catch (err) {
      setError(err.message || "Could not start this simulation.");
    } finally {
      setBusy(false);
    }
  }

  async function send(text, responseType = "text") {
    const content = (text ?? draft).trim();
    if (!session || !content) return;
    setBusy(true);
    setError("");
    try {
      const result = await spanishApi.respondMasterSimulation(session.session_id, content, {
        response_type: responseType,
      });
      setDraft("");
      setSession((current) => ({
        ...current,
        ...result.data,
        transcript: [
          ...(current?.transcript || []),
          { role: "student", content },
          { role: "assistant", content: result.data.assistant_message },
        ],
      }));
    } catch (err) {
      setError(err.message || "Could not send that turn.");
    } finally {
      setBusy(false);
    }
  }

  function listen() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("This browser does not expose the Web Speech API. Type your Spanish turn instead.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "es-MX";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setDraft(transcript);
      send(transcript, "speech");
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  async function retry() {
    if (!session) return;
    setBusy(true);
    try {
      const result = await spanishApi.retryMasterSimulation(session.session_id);
      setSession({
        ...result.data,
        transcript: [{ role: "assistant", content: result.data.initial_message }],
        atmosphere: result.data.atmosphere || session.atmosphere,
        master_script: result.data.master_script || session.master_script || [],
      });
    } catch (err) {
      setError(err.message || "Could not start a new variation.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Simulation Master · 85% practice</p>
        <h2 className="mt-1 text-2xl font-bold text-heading">Practice the job in Spanish</h2>
        <p className="mt-2 text-sm text-body">
          Ambient beds mix under the live deck. Speak with the browser microphone; green is fluent command, yellow is
          clear comprehension, red prompts a container rerun. Patient and field conditions regenerate from the curriculum
          engine — or OpenAI/Claude when those keys are funded.
        </p>
      </div>
      {error ? <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-heading">{error}</p> : null}
      <p className="text-sm">
        <a href="/spanish/videos" className="font-semibold text-primary">
          Open Video Master
        </a>{" "}
        if Start is still disabled.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((row) => (
          <li key={row.simulation_id} className="rounded-2xl border border-border bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{row.program_id.replace(/_/g, " ")}</p>
            <p className="mt-1 font-semibold text-heading">{row.title}</p>
            <p className="mt-1 text-sm text-body">{row.description}</p>
            <p className="mt-2 text-xs text-muted">
              You: {row.student_role} · AI: {row.ai_role}
              {row.mastery_status ? ` · ${row.mastery_status}` : ""}
              {row.atmosphere ? ` · ${row.atmosphere.label}` : ""}
            </p>
            {row.academic_notice ? (
              <p className="mt-2 text-[11px] text-muted">Classroom language practice — not a substitute for agency policy.</p>
            ) : null}
            <button
              type="button"
              disabled={busy || !row.unlocked}
              onClick={() => start(row.simulation_id)}
              className="mt-3 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {row.unlocked ? "Start" : "Locked until video complete"}
            </button>
          </li>
        ))}
      </ul>

      {session ? (
        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="font-semibold text-heading">Live session</p>
          {session.variation?.fieldCondition ? (
            <p className="mt-1 text-sm text-body">Field condition: {session.variation.fieldCondition}</p>
          ) : null}
          <AmbientBed programId={programId} active={session.status !== "complete"} />
          <ul className="mt-3 max-h-72 space-y-2 overflow-auto text-sm">
            {(session.transcript || []).map((turn, index) => (
              <li
                key={`${turn.role}-${index}`}
                className={turn.role === "student" ? "text-heading" : "rounded-lg bg-surface px-3 py-2 text-body"}
              >
                <span className="text-xs font-semibold uppercase text-muted">{turn.role}</span>
                <p>{turn.content}</p>
              </li>
            ))}
          </ul>
          <FluencyBlock pronunciation={session.pronunciation} onRerun={retry} />
          {session.status !== "complete" ? (
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Escribe o dicta en español…"
                className="flex-1 rounded-lg border border-border px-3 py-2 text-sm"
              />
              <button
                type="button"
                disabled={busy}
                onClick={() => send(draft, "text")}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Send
              </button>
              <button
                type="button"
                disabled={busy || listening}
                onClick={listen}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-heading disabled:opacity-50"
              >
                {listening ? "Listening…" : "Speak"}
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-3 text-sm">
              <p className="font-semibold text-heading">
                {session.evaluation?.overall_score}% · {session.evaluation?.mastery_status}
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {Object.entries(session.evaluation?.category_scores || {}).map(([key, value]) => (
                  <li key={key} className="rounded-lg border border-border px-3 py-2">
                    {CATEGORY_LABEL[key] || key}: {value}%
                  </li>
                ))}
              </ul>
              <p className="text-body">{(session.feedback?.well || []).join(" ")}</p>
              <p className="text-body">{session.feedback?.communication}</p>
              <button
                type="button"
                disabled={busy}
                onClick={retry}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-heading"
              >
                Retry with a new variation
              </button>
            </div>
          )}
        </div>
      ) : null}

      {history.length ? (
        <div className="text-sm text-body">
          <p className="font-semibold text-heading">History</p>
          <ul className="mt-2 space-y-1">
            {history.slice(0, 8).map((row) => (
              <li key={row.session_id}>
                {row.simulation_id} · {row.status}
                {row.mastery_status ? ` · ${row.mastery_status}` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
