const test = require("node:test");
const assert = require("node:assert/strict");
const {
  BACKGROUND_START_LEVEL,
  applyAnswer,
  buildProfile,
  pickNextQuestion,
  startSession,
} = require("./spanishAssessmentEngine");

const QUESTIONS = [
  {
    id: "q0",
    level: "0",
    skill: "vocabulary",
    prompt: "Hola means…",
    options: ["Hello", "Goodbye"],
    correctIndex: 0,
    explanation: "Hola is a greeting.",
  },
  {
    id: "q1",
    level: "A1",
    skill: "reading",
    prompt: "¿Cómo estás?",
    options: ["How are you?", "Where are you?"],
    correctIndex: 0,
    explanation: "It asks how you are.",
  },
  {
    id: "q2",
    level: "A2",
    skill: "grammar",
    prompt: "Yo ___ de México.",
    options: ["soy", "es"],
    correctIndex: 0,
    explanation: "Soy matches yo.",
  },
];

test("complete beginners start at foundations, not A1", () => {
  assert.equal(BACKGROUND_START_LEVEL.never, "0");
  const session = startSession({ backgroundId: "never", goalId: "healthcare" });
  assert.equal(session.currentLevel, "0");
  const question = pickNextQuestion(session, QUESTIONS);
  assert.equal(question.id, "q0");
});

test("a correct answer raises difficulty; an incorrect one stays supportive", () => {
  let session = startSession({ backgroundId: "never", goalId: "healthcare" });
  const first = pickNextQuestion(session, QUESTIONS);
  const correct = applyAnswer(session, first, 0);
  assert.equal(correct.correct, true);
  assert.equal(correct.session.currentLevel, "A1");
  assert.match(correct.feedback, /learn from this|Well done|Keep going/i);

  session = startSession({ backgroundId: "never", goalId: "healthcare" });
  const again = pickNextQuestion(session, QUESTIONS);
  const wrong = applyAnswer(session, again, 1);
  assert.equal(wrong.correct, false);
  assert.equal(wrong.session.currentLevel, "0");
  assert.match(wrong.feedback, /Don't worry|starting point/i);
});

test("profile maps healthcare goal to the healthcare track and uses demonstrated level", () => {
  let session = startSession({ backgroundId: "studied", goalId: "healthcare" });
  assert.equal(session.currentLevel, "A1");
  const question = pickNextQuestion(session, QUESTIONS);
  session = applyAnswer(session, question, 0).session;
  const profile = buildProfile(session);
  assert.equal(profile.track, "Spanish for Healthcare");
  assert.ok(profile.path.includes("Healthcare"));
  assert.ok(["A1", "A2", "B1"].includes(profile.startingLevel));
});
