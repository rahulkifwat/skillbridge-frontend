"use client";

import { useEffect, useState } from "react";
import { spanishApi } from "@/lib/api";

export default function TeacherSimulationDesk() {
  const [students, setStudents] = useState([]);
  const [simulations, setSimulations] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSimulation, setSelectedSimulation] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([spanishApi.teacherStudents(), spanishApi.masterSimulations(), spanishApi.teacherAnalytics()])
      .then(([roster, sims, stats]) => {
        setStudents(roster.data.students || []);
        setSimulations(sims.data.simulations || []);
        setAnalytics(stats.data);
        if (roster.data.students?.[0]) setSelectedStudent(roster.data.students[0].id);
        if (sims.data.simulations?.[0]) setSelectedSimulation(sims.data.simulations[0].simulation_id);
      })
      .catch((err) => setError(err.message || "Instructor access is required for this desk."));
  }, []);

  async function assign() {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await spanishApi.assignSimulation({ studentId: selectedStudent, simulationId: selectedSimulation });
      setMessage("Assignment saved. The student will see it marked as assigned in Simulation Master.");
    } catch (err) {
      setError(err.message || "Could not assign that simulation.");
    } finally {
      setBusy(false);
    }
  }

  async function loadResults(studentId) {
    setSelectedStudent(studentId);
    setError("");
    try {
      const result = await spanishApi.teacherStudentResults(studentId);
      setResults(result.data.results || []);
    } catch (err) {
      setError(err.message || "Could not load simulation results.");
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-heading">Spanish Simulation Master</h2>
      <p className="mt-1 text-sm text-muted">
        Assign published scenarios, review mastery, and score Law Enforcement Unit 1 with the same /20 classroom rubric.
      </p>
      <p className="mt-2 text-sm">
        <a href="/spanish/programs/law" className="font-semibold text-primary">
          Open Law Enforcement Level 1 · Unit 1
        </a>
      </p>
      {error ? <p className="mt-3 text-sm text-amber-800">{error}</p> : null}
      {message ? <p className="mt-3 text-sm text-accent">{message}</p> : null}

      {analytics ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
          <li className="rounded-xl border border-border px-4 py-3">
            Students {analytics.students}
          </li>
          <li className="rounded-xl border border-border px-4 py-3">
            Completions {analytics.simulationsCompleted}
          </li>
          <li className="rounded-xl border border-border px-4 py-3">
            Needs practice {analytics.mastery?.["Needs Practice"] || 0}
          </li>
        </ul>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <select
          value={selectedStudent}
          onChange={(event) => loadResults(event.target.value)}
          className="rounded-lg border border-border px-3 py-2 text-sm"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullName}
              {student.needsIntervention ? " · needs practice" : ""}
            </option>
          ))}
        </select>
        <select
          value={selectedSimulation}
          onChange={(event) => setSelectedSimulation(event.target.value)}
          className="rounded-lg border border-border px-3 py-2 text-sm"
        >
          {simulations.map((row) => (
            <option key={row.simulation_id} value={row.simulation_id}>
              {row.title}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={busy || !selectedStudent || !selectedSimulation}
          onClick={assign}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Assign simulation
        </button>
      </div>

      <ul className="mt-4 space-y-2 text-sm">
        {students.map((student) => (
          <li key={student.id} className="flex flex-wrap justify-between gap-2 rounded-lg border border-border px-3 py-2">
            <span>
              {student.fullName} · {student.simulationsCompleted} complete
              {student.latestMastery ? ` · ${student.latestMastery}` : ""}
            </span>
            <button type="button" className="font-semibold text-primary" onClick={() => loadResults(student.id)}>
              View results
            </button>
          </li>
        ))}
      </ul>

      {results.length ? (
        <ul className="mt-4 space-y-2 text-sm text-body">
          {results.map((row) => (
            <li key={row.session_id}>
              {row.simulation_id}: {row.overall_score}% · {row.mastery_status}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
