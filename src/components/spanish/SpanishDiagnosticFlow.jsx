"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowRight } from "react-icons/hi2";
import SpanishAcademyShell from "@/components/spanish/SpanishAcademyShell";
import ListeningPlayback from "@/components/spanish/ListeningPlayback";
import SpeakingRecorder from "@/components/spanish/SpeakingRecorder";
import SpanishStripeEmbed from "@/components/spanish/SpanishStripeEmbed";
import { spanishApi } from "@/lib/api";
import { SPANISH_DASHBOARD_PATH } from "@/lib/spanishAcademyPaths";

const SKILLS = ["grammar", "vocabulary", "reading", "listening", "writing", "speaking"];

const SKILL_LABEL = {
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  speaking: "Speaking",
};

const BACKGROUNDS = [
  { id: "never", label: "I have never studied Spanish." },
  { id: "little", label: "I have studied a little Spanish." },
  { id: "studied", label: "I have studied Spanish before." },
  { id: "speakSome", label: "I speak some Spanish and want to improve." },
  { id: "professional", label: "I speak Spanish but want to improve my professional or academic communication." },
];

const GOALS = [
  { id: "growth", label: "Personal growth / general Spanish" },
  { id: "travel", label: "Travel & relocation" },
  { id: "living", label: "Living in a Spanish-speaking country" },
  { id: "family", label: "Family and community" },
  { id: "education", label: "School / education" },
  { id: "business", label: "Business / professional" },
  { id: "healthcare", label: "Medical / healthcare Spanish" },
  { id: "lawEnforcement", label: "Law enforcement Spanish" },
  { id: "customerService", label: "Customer service" },
  { id: "teaching", label: "Teaching" },
  { id: "remote", label: "Remote collaboration" },
  { id: "career", label: "Career advancement" },
];

export default function SpanishDiagnosticFlow() {
  const router = useRouter();
  const [step, setStep] = useState("checkout");
  const [billing, setBilling] = useState(null);
  const [backgroundId, setBackgroundId] = useState("");
  const [goalId, setGoalId] = useState("");
  const [attemptId, setAttemptId] = useState("");
  const [skillIndex, setSkillIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [answers, setAnswers] = useState({});
  const [artifacts, setArtifacts] = useState({});
  const [review, setReview] = useState([]);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [stripeSession, setStripeSession] = useState(null);

  const handleStripeError = useCallback((message) => {
    setError(message);
    setBusy(false);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    async function loadBilling() {
      try {
        if (sessionId) {
          const confirmed = await spanishApi.confirmCheckout(sessionId);
          setBilling(confirmed.data.entitlements);
          if (confirmed.data.entitlements.diagnosticPaid) setStep("welcome");
          window.history.replaceState({}, "", "/spanish/assessment");
          return;
        }
        const result = await spanishApi.billing();
        setBilling(result.data);
        if (result.data.diagnosticPaid) setStep("welcome");
      } catch (err) {
        setError(err.message || "Could not load Spanish Academy checkout.");
      }
    }

    loadBilling();
  }, []);

  const skill = SKILLS[skillIndex];

  const screenLabel = useMemo(() => {
    if (step === "checkout") return "Checkout";
    if (step === "welcome") return "Welcome";
    if (step === "background" || step === "goal") return "Onboarding";
    if (step === "section") return SKILL_LABEL[skill];
    if (step === "review") return "Review & submit";
    if (step === "profile") return "Your Spanish Profile";
    return "";
  }, [skill, step]);

  async function pay(product) {
    setBusy(true);
    setError("");
    try {
      const result = await spanishApi.checkout(product);
      if (result.data.provider === "stripe") {
        setStripeSession(result.data);
        return;
      }
      setBilling(result.data.entitlements);
      if (product === "diagnostic" || result.data.entitlements.diagnosticPaid) setStep("welcome");
    } catch (err) {
      setError(err.message || "Could not start Stripe Checkout.");
    } finally {
      setBusy(false);
    }
  }

  async function startAttempt() {
    setBusy(true);
    setError("");
    try {
      const started = await spanishApi.start({ backgroundId, goalId });
      const id = started.data.attemptId;
      setAttemptId(id);
      setSkillIndex(0);
      await loadSection(id, 0);
      setStep("section");
    } catch (err) {
      setError(err.message || "Could not start the Spanish diagnostic.");
    } finally {
      setBusy(false);
    }
  }

  async function loadSection(id, index) {
    const nextSkill = SKILLS[index];
    const result = await spanishApi.section(id, nextSkill);
    setItems(result.data.items);
    setAnswers(result.data.answers || {});
    setArtifacts(result.data.artifacts || {});
  }

  function setAnswer(itemId, value) {
    setAnswers((current) => ({ ...current, [itemId]: value }));
  }

  async function saveAndAdvance() {
    setBusy(true);
    setError("");
    try {
      await spanishApi.saveAnswers(attemptId, answers, artifacts);
      if (skillIndex < SKILLS.length - 1) {
        const next = skillIndex + 1;
        setSkillIndex(next);
        await loadSection(attemptId, next);
        return;
      }
      const result = await spanishApi.review(attemptId);
      setReview(result.data.completion);
      setStep("review");
    } catch (err) {
      setError(err.message || "Could not save this section.");
    } finally {
      setBusy(false);
    }
  }

  async function submitAttempt() {
    setBusy(true);
    setError("");
    try {
      const result = await spanishApi.submit(attemptId);
      setProfile(result.data.profile);
      setStep("profile");
    } catch (err) {
      setError(err.message || "Could not submit the Spanish diagnostic.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SpanishAcademyShell eyebrow="Spanish diagnostic">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{screenLabel}</p>
      {error ? (
        <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {step === "checkout" && (
        <section className="mt-3">
          <h1 className="text-4xl font-bold tracking-tight text-heading">Pay with Stripe</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
            Card payment is processed by Stripe. The diagnostic is USD $25 one-time. Membership is USD $100/month.
            Pricing is shown only on this checkout screen.
          </p>
          {!billing?.stripeConfigured ? (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-heading">
              Stripe keys are not on the API yet. Add <code>STRIPE_SECRET_KEY</code> and{" "}
              <code>STRIPE_PUBLISHABLE_KEY</code> to <code>backend/.env</code>, then restart the API. Until then, local
              development records the purchase without a card form.
            </p>
          ) : (
            <p className="mt-4 text-sm text-muted">Choose a product, then complete the Stripe form on this page.</p>
          )}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-5">
              <p className="text-sm font-semibold text-muted">One-time</p>
              <p className="mt-1 text-2xl font-bold text-heading">USD $25</p>
              <p className="mt-2 text-sm text-body">Six-skill diagnostic and Spanish Profile.</p>
              <button
                type="button"
                disabled={busy || billing?.diagnosticPaid}
                onClick={() => pay("diagnostic")}
                className="mt-5 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {billing?.diagnosticPaid
                  ? "Diagnostic purchased"
                  : busy
                    ? "Opening Stripe…"
                    : "Pay $25 with Stripe"}
              </button>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <p className="text-sm font-semibold text-muted">Membership</p>
              <p className="mt-1 text-2xl font-bold text-heading">USD $100/mo</p>
              <p className="mt-2 text-sm text-body">Personalized units, simulations and competency records.</p>
              <button
                type="button"
                disabled={busy || billing?.membershipPaid}
                onClick={() => pay("membership")}
                className="mt-5 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-heading disabled:opacity-50"
              >
                {billing?.membershipPaid ? "Membership active" : "Pay $100/mo with Stripe"}
              </button>
            </div>
          </div>
          {stripeSession?.clientSecret ? (
            <SpanishStripeEmbed
              clientSecret={stripeSession.clientSecret}
              publishableKey={stripeSession.publishableKey || billing?.publishableKey}
              onError={handleStripeError}
            />
          ) : null}
        </section>
      )}

      {step === "welcome" && (
        <section className="mt-3">
          <h1 className="text-4xl font-bold tracking-tight text-heading">Spanish Academy Assessment</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
            This diagnostic measures six skills — grammar, vocabulary, reading, listening, writing and speaking —
            using the Spanish Academy question bank. It is separate from English and career assessments.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-body sm:grid-cols-2">
            {SKILLS.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => setStep("background")}
                  className="w-full rounded-lg border border-border bg-white px-4 py-3 text-left font-medium text-heading hover:border-primary hover:bg-primary-light"
                >
                  {SKILL_LABEL[name]}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            USD $25 one-time diagnostic. Membership is USD $100/month and is purchased separately. Price is shown
            here only in the Spanish Academy context.
          </p>
          <button
            type="button"
            onClick={() => setStep("background")}
            className="relative z-10 mt-8 mb-10 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Start My Assessment
            <HiArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </section>
      )}

      {step === "background" && (
        <section className="mt-3">
          <h1 className="text-3xl font-bold text-heading">Have you studied Spanish before?</h1>
          <p className="mt-3 text-sm text-body">A complete beginner will not receive advanced items first.</p>
          <ul className="mt-6 space-y-3">
            {BACKGROUNDS.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => setBackgroundId(option.id)}
                  aria-pressed={backgroundId === option.id}
                  className={`flex w-full cursor-pointer items-start gap-3 rounded-xl border bg-white p-4 text-left ${
                    backgroundId === option.id ? "border-primary ring-1 ring-primary" : "border-border"
                  }`}
                >
                  <span
                    className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border ${
                      backgroundId === option.id ? "border-primary bg-primary" : "border-muted"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-heading">{option.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled={!backgroundId}
            onClick={() => setStep("goal")}
            className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            Continue
          </button>
        </section>
      )}

      {step === "goal" && (
        <section className="mt-3">
          <h1 className="text-3xl font-bold text-heading">Why do you want to learn Spanish?</h1>
          <p className="mt-3 text-sm text-body">
            Choose a primary specialty. This does not change your CEFR score; it adds category questions at your
            confirmed level.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {GOALS.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => setGoalId(option.id)}
                  aria-pressed={goalId === option.id}
                  className={`flex h-full w-full cursor-pointer items-start gap-3 rounded-xl border bg-white p-4 text-left ${
                    goalId === option.id ? "border-primary ring-1 ring-primary" : "border-border"
                  }`}
                >
                  <span
                    className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border ${
                      goalId === option.id ? "border-primary bg-primary" : "border-muted"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-heading">{option.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled={!goalId || busy}
            onClick={startAttempt}
            className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {busy ? "Preparing your form…" : "Begin six-skill diagnostic"}
          </button>
        </section>
      )}

      {step === "section" && (
        <section className="mt-3">
          <p className="text-sm text-muted">
            Section {skillIndex + 1} of {SKILLS.length}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-heading">{SKILL_LABEL[skill]}</h1>
          <p className="mt-2 text-sm text-body">This screen uses the {SKILL_LABEL[skill].toLowerCase()} bank only.</p>
          <ol className="mt-6 space-y-6">
            {items.map((item, index) => (
              <li key={item.itemId} className="rounded-2xl border border-border bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {item.cefrLevel} · {item.category}
                </p>
                {item.mediaNote ? <p className="mt-2 text-sm italic text-body">{item.mediaNote}</p> : null}
                {item.audioScript ? <ListeningPlayback script={item.audioScript} /> : null}
                <p className="mt-2 text-base font-medium text-heading">
                  {index + 1}. {item.prompt}
                </p>
                {item.questionType === "mcq" ? (
                  <ul className="mt-4 space-y-2">
                    {(item.options || []).map((option, optionIndex) => (
                      <li key={option}>
                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border px-3 py-2">
                          <input
                            type="radio"
                            name={item.itemId}
                            checked={(answers || {})[item.itemId] === optionIndex}
                            onChange={() => setAnswer(item.itemId, optionIndex)}
                          />
                          <span className="text-sm text-heading">{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    {item.domain === "speaking" ? (
                      <SpeakingRecorder
                        onRecorded={(artifact) =>
                          setArtifacts((current) => ({ ...current, [item.itemId]: artifact }))
                        }
                      />
                    ) : null}
                    <textarea
                    rows={6}
                    value={(answers || {})[item.itemId] || ""}
                    onChange={(event) => setAnswer(item.itemId, event.target.value)}
                    className="mt-4 w-full rounded-lg border border-border p-3 text-sm text-heading"
                    placeholder={item.guidance || "Write your response in Spanish."}
                  />
                  </>
                )}
              </li>
            ))}
          </ol>
          <button
            type="button"
            disabled={busy}
            onClick={saveAndAdvance}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {skillIndex < SKILLS.length - 1 ? "Save and continue" : "Save and review"}
            <HiArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </section>
      )}

      {step === "review" && (
        <section className="mt-3">
          <h1 className="text-3xl font-bold text-heading">Review & submit</h1>
          <p className="mt-3 text-sm text-body">Check that each Spanish skill section has a response before scoring.</p>
          <ul className="mt-6 space-y-3">
            {review.map((row) => (
              <li key={row.skill} className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm">
                <span className="font-medium text-heading">{SKILL_LABEL[row.skill]}</span>
                <span className={row.complete ? "text-accent" : "text-amber-700"}>
                  {row.answered}/{row.total} {row.complete ? "complete" : "incomplete"}
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled={busy}
            onClick={submitAttempt}
            className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {busy ? "Scoring…" : "Submit and open my Spanish Profile"}
          </button>
        </section>
      )}

      {step === "profile" && profile && (
        <section className="mt-3">
          <h1 className="text-4xl font-bold tracking-tight text-heading">{profile.greeting}</h1>
          <p className="mt-2 text-lg font-semibold text-heading">{profile.title}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">CEFR level</dt>
              <dd className="mt-1 text-2xl font-bold text-heading">{profile.cefrLevel}</dd>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Overall score</dt>
              <dd className="mt-1 text-2xl font-bold text-heading">{profile.overallScore}</dd>
            </div>
          </dl>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {SKILLS.map((name) => (
              <li key={name} className="rounded-xl border border-border bg-white px-4 py-3">
                <p className="text-sm font-semibold text-heading">{SKILL_LABEL[name]}</p>
                <p className="text-2xl font-bold text-primary">{profile.skillScores[name]}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3 rounded-2xl border border-border bg-white p-5 text-sm text-body">
            <p>
              <span className="font-semibold text-heading">Specialty: </span>
              {profile.specialtyLabel}
            </p>
            <p>{profile.specialtyNote}</p>
            {(profile.evidence || []).length ? (
              <div>
                <p className="font-semibold text-heading">Evidence</p>
                <ul className="mt-2 space-y-2">
                  {profile.evidence.map((row) => (
                    <li key={row.skill}>
                      {SKILL_LABEL[row.skill]} ({row.score}): {row.recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {profile.credential ? (
              <p>
                <span className="font-semibold text-heading">Credential: </span>
                {profile.credential.name}
              </p>
            ) : null}
            <p>
              <span className="font-semibold text-heading">Strengths: </span>
              {profile.strengths.map((item) => `${SKILL_LABEL[item.skill]} (${item.score})`).join(", ") || "Still gathering evidence"}
            </p>
            <p>
              <span className="font-semibold text-heading">Priorities: </span>
              {profile.priorities.map((item) => `${SKILL_LABEL[item.skill]} (${item.score})`).join(", ") || "Balanced across skills"}
            </p>
            <p>
              <span className="font-semibold text-heading">Path: </span>
              {profile.recommendedPath}
            </p>
            <p>
              <span className="font-semibold text-heading">Next milestone: </span>
              {profile.nextMilestone}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.push(SPANISH_DASHBOARD_PATH)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white"
            >
              Start my personalized journey
              <HiArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("welcome");
                setAttemptId("");
                setProfile(null);
                setBackgroundId("");
                setGoalId("");
              }}
              className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-heading"
            >
              Retake assessment
            </button>
          </div>
        </section>
      )}
    </SpanishAcademyShell>
  );
}
