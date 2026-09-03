"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowRight, HiCheckCircle, HiSparkles } from "react-icons/hi2";
import StudentShell from "@/components/portal/StudentShell";
import { useAuth } from "@/context/AuthContext";
import questionBank from "@/data/spanishAssessmentQuestions";
import {
  applyAnswer,
  buildProfile,
  pickNextQuestion,
  startSession,
} from "@/lib/spanishAssessmentEngine";

const questions = Array.isArray(questionBank) ? questionBank : questionBank.default;

const TARGET_ANSWERS = 6;

const BACKGROUNDS = [
  { id: "never", label: "I have never studied Spanish." },
  { id: "little", label: "I have studied a little Spanish." },
  { id: "studied", label: "I have studied Spanish before." },
  { id: "speakSome", label: "I speak some Spanish and want to improve." },
  { id: "professional", label: "I speak Spanish but want to improve my professional or academic communication." },
];

const GOALS = [
  { id: "growth", label: "Personal growth" },
  { id: "travel", label: "Travel" },
  { id: "living", label: "Living in a Spanish-speaking country" },
  { id: "family", label: "Family and community communication" },
  { id: "education", label: "Education" },
  { id: "business", label: "Business / professional development" },
  { id: "healthcare", label: "Healthcare (medical Spanish)" },
  { id: "lawEnforcement", label: "Law enforcement (police, security, legal and field operations)" },
  { id: "customerService", label: "Customer service / retail" },
  { id: "teaching", label: "Teaching and education" },
  { id: "remote", label: "Technology / remote work" },
  { id: "career", label: "Career advancement" },
];

function storageKey(userId) {
  return `sb_spanish_assessment:${userId}`;
}

function skillLabel(skill) {
  const labels = {
    vocabulary: "Vocabulary",
    reading: "Reading",
    grammar: "Grammar",
    cultural: "Cultural awareness",
    professional: "Professional communication",
    listening: "Listening",
    speaking: "Speaking",
    writing: "Writing",
  };
  return labels[skill] || skill;
}

export default function SpanishAcademyFlow() {
  const router = useRouter();
  const { user } = useAuth();
  const firstName = user?.fullName?.split(" ")[0] || "there";

  const [step, setStep] = useState("welcome");
  const [backgroundId, setBackgroundId] = useState("");
  const [goalId, setGoalId] = useState("");
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    try {
      const raw = window.localStorage.getItem(storageKey(user.id));
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved?.profile) {
        setProfile(saved.profile);
        setStep("profile");
      }
    } catch {
      // Ignore a corrupt cache and start from the welcome screen.
    }
  }, [user?.id]);

  const progressLabel = useMemo(() => {
    if (!session) return "";
    return `Question ${session.answers.length + (feedback ? 0 : 1)} of ${TARGET_ANSWERS}`;
  }, [feedback, session]);

  function beginAssessment() {
    setStep("background");
  }

  function confirmBackground() {
    if (!backgroundId) return;
    setStep("goal");
  }

  function confirmGoal() {
    if (!goalId) return;
    const nextSession = startSession({ backgroundId, goalId });
    const nextQuestion = pickNextQuestion(nextSession, questions);
    setSession(nextSession);
    setQuestion(nextQuestion);
    setStep("question");
  }

  function chooseOption(index) {
    if (!session || !question || feedback) return;
    const result = applyAnswer(session, question, index);
    setSession(result.session);
    setFeedback({
      correct: result.correct,
      feedback: result.feedback,
      explanation: result.explanation,
    });
    setStep("feedback");
  }

  function continueAfterFeedback() {
    if (!session) return;
    if (session.answers.length >= TARGET_ANSWERS || !pickNextQuestion(session, questions)) {
      setStep("analyzing");
      return;
    }
    setQuestion(pickNextQuestion(session, questions));
    setFeedback(null);
    setStep("question");
  }

  useEffect(() => {
    if (step !== "analyzing" || !session) return undefined;
    const timer = window.setTimeout(() => {
      const nextProfile = buildProfile(session);
      setProfile(nextProfile);
      if (user?.id) {
        window.localStorage.setItem(
          storageKey(user.id),
          JSON.stringify({ profile: nextProfile, savedAt: new Date().toISOString() })
        );
      }
      setStep("profile");
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [session, step, user?.id]);

  function retake() {
    if (user?.id) window.localStorage.removeItem(storageKey(user.id));
    setBackgroundId("");
    setGoalId("");
    setSession(null);
    setQuestion(null);
    setFeedback(null);
    setProfile(null);
    setStep("welcome");
  }

  return (
    <StudentShell active="Assessments" promo="assessment" surface="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-10 lg:px-10">
        {step === "welcome" && (
          <section>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              Spanish Academy
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-heading">
              Welcome to the SkillBridge Spanish Academy
            </h1>
            <p className="mt-4 text-base leading-relaxed text-body">
              Before we begin, let&apos;s discover your current Spanish level and create
              your personalized learning journey. This assessment is not designed to
              eliminate you or make you feel unsuccessful. Its purpose is to identify
              the best starting point.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              There is no need to know your level before you begin. You will not pick
              A1, A2, or B1 from a list — the assessment finds that for you.
            </p>
            <button
              type="button"
              onClick={beginAssessment}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Start My Assessment
              <HiArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </section>
        )}

        {step === "background" && (
          <section>
            <p className="text-sm font-semibold text-primary">Question 1 of the entry profile</p>
            <h2 className="mt-2 text-3xl font-bold text-heading">Have you studied Spanish before?</h2>
            <p className="mt-3 text-sm text-body">
              A complete beginner will not receive advanced questions.
            </p>
            <ul className="mt-6 space-y-3">
              {BACKGROUNDS.map((option) => (
                <li key={option.id}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-white p-4 hover:border-primary">
                    <input
                      type="radio"
                      name="spanish-background"
                      value={option.id}
                      checked={backgroundId === option.id}
                      onChange={() => setBackgroundId(option.id)}
                      className="mt-1"
                    />
                    <span className="text-sm text-heading">{option.label}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled={!backgroundId}
              onClick={confirmBackground}
              className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          </section>
        )}

        {step === "goal" && (
          <section>
            <p className="text-sm font-semibold text-primary">Your reason for learning</p>
            <h2 className="mt-2 text-3xl font-bold text-heading">Why do you want to learn Spanish?</h2>
            <p className="mt-3 text-sm text-body">
              Your goal shapes the recommended pathway — for example healthcare,
              law enforcement, or remote collaboration.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {GOALS.map((option) => (
                <li key={option.id}>
                  <label className="flex h-full cursor-pointer items-start gap-3 rounded-xl border border-border bg-white p-4 hover:border-primary">
                    <input
                      type="radio"
                      name="spanish-goal"
                      value={option.id}
                      checked={goalId === option.id}
                      onChange={() => setGoalId(option.id)}
                      className="mt-1"
                    />
                    <span className="text-sm text-heading">{option.label}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled={!goalId}
              onClick={confirmGoal}
              className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Begin adaptive questions
            </button>
          </section>
        )}

        {(step === "question" || step === "feedback") && question && (
          <section>
            <p className="text-sm font-semibold text-primary">{progressLabel}</p>
            <h2 className="mt-2 text-2xl font-bold text-heading">{question.prompt}</h2>
            <ul className="mt-6 space-y-3">
              {question.options.map((option, index) => (
                <li key={option}>
                  <button
                    type="button"
                    disabled={Boolean(feedback)}
                    onClick={() => chooseOption(index)}
                    className="w-full rounded-xl border border-border bg-white p-4 text-left text-sm text-heading hover:border-primary disabled:cursor-default"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            {feedback && (
              <div
                role="status"
                className={`mt-6 rounded-xl border p-4 text-sm ${
                  feedback.correct
                    ? "border-emerald-200 bg-emerald-50 text-heading"
                    : "border-amber-200 bg-amber-50 text-heading"
                }`}
              >
                <p className="font-semibold">{feedback.feedback}</p>
                <p className="mt-2 text-body">{feedback.explanation}</p>
                <button
                  type="button"
                  onClick={continueAfterFeedback}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Continue
                  <HiArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </section>
        )}

        {step === "analyzing" && (
          <section className="py-16 text-center" aria-live="polite">
            <HiSparkles className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-heading">Analyzing your results</h2>
            <p className="mt-2 text-sm text-body">
              Building your competency profile across the skills you just practiced.
              You will receive more than a single score.
            </p>
          </section>
        )}

        {step === "profile" && profile && (
          <section>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              Your Spanish Profile
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-heading">
              ¡Hola, {firstName}!
            </h1>
            <p className="mt-3 text-base text-body">
              This is your starting point, not a verdict. Next you enter the
              personalized learning dashboard.
            </p>

            <dl className="mt-8 space-y-4 rounded-2xl border border-border bg-white p-6">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Current starting level
                </dt>
                <dd className="mt-1 text-lg font-bold text-heading">{profile.startingLevel}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Specialty track
                </dt>
                <dd className="mt-1 text-base font-semibold text-heading">{profile.track}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Core strengths
                </dt>
                <dd className="mt-1 text-sm text-body">
                  {profile.strengths.length
                    ? profile.strengths.map(skillLabel).join(", ")
                    : "We will keep sampling strengths as you practice."}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Development priorities
                </dt>
                <dd className="mt-1 text-sm text-body">
                  {profile.priorities.length
                    ? profile.priorities.map(skillLabel).join(", ")
                    : "Keep practicing — priorities will refine as you go."}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Your recommended learning path
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-body">{profile.path}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push("/student")}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                Start my personalized journey
                <HiArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={retake}
                className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-heading hover:bg-surface"
              >
                Retake assessment
              </button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted">
              <HiCheckCircle className="h-4 w-4 text-accent" aria-hidden="true" />
              Credentials later in the academy are based on demonstrated competency,
              not on watching videos.
            </p>
          </section>
        )}
      </div>
    </StudentShell>
  );
}
