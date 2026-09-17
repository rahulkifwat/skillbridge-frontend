"use client";

import { useEffect, useState } from "react";
import { spanishApi } from "@/lib/api";

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

export default function SimulationMaster() {
  const [items, setItems] = useState([]);
  const [session, setSession] = useState(null);
  const [history, setHistory] = useState([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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
      setSession({
        ...result.data,
        transcript: [{ role: "assistant", content: result.data.initial_message }],
      });
    } catch (err) {
      setError(err.message || "Could not start this simulation.");
    } finally {
      setBusy(false);
    }
  }

  async function send() {
    if (!session || !draft.trim()) return;
    setBusy(true);
    setError("");
    try {
      const result = await spanishApi.respondMasterSimulation(session.session_id, draft.trim());
      setDraft("");
      setSession((current) => ({
        ...result.data,
        transcript: [
          ...(current?.transcript || []),
          { role: "student", content: draft.trim() },
          { role: "assistant", content: result.data.assistant_message },
        ],
      }));
    } catch (err) {
      setError(err.message || "Could not send that turn.");
    } finally {
      setBusy(false);
    }
  }

  async function retry() {
    if (!session) return;
    setBusy(true);
    try {
      const result = await spanishApi.retryMasterSimulation(session.session_id);
      setSession({
        ...result.data,
        transcript: [{ role: "assistant", content: result.data.initial_message }],
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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Simulation Master</p>
        <h2 className="mt-1 text-2xl font-bold text-heading">Practice the job in Spanish</h2>
        <p className="mt-2 text-sm text-body">
          One reusable engine. Scenario data drives Medical, Customer Service, Law Enforcement, and Construction
          simulations — not hard-coded quizzes.
        </p>
      </div>
      {error ? <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-heading">{error}</p> : null}
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((row) => (
          <li key={row.simulation_id} className="rounded-2xl border border-border bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{row.program_id.replace(/_/g, " ")}</p>
            <p className="mt-1 font-semibold text-heading">{row.title}</p>
            <p className="mt-1 text-sm text-body">{row.description}</p>
            <p className="mt-2 text-xs text-muted">
              You: {row.student_role} · AI: {row.ai_role}
              {row.mastery_status ? ` · ${row.mastery_status}` : ""}
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() => start(row.simulation_id)}
              className="mt-3 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
              Start
            </button>
          </li>
        ))}
      </ul>

      {session ? (
        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="font-semibold text-heading">Live session</p>
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
          {session.status !== "complete" ? (
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Escribe en español…"
                className="flex-1 rounded-lg border border-border px-3 py-2 text-sm"
              />
              <button
                type="button"
                disabled={busy}
                onClick={send}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Send
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
