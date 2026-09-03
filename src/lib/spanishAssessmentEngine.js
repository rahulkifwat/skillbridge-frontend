const LEVELS = ["0", "A1", "A2", "B1", "B2", "C1"];

const BACKGROUND_START_LEVEL = {
  never: "0",
  little: "0",
  studied: "A1",
  speakSome: "A2",
  professional: "B1",
};

const GOAL_PATHS = {
  growth: {
    track: "General Spanish",
    extra: "Cultural Intelligence",
  },
  travel: {
    track: "Spanish for Travel and Relocation",
    extra: "Cultural Intelligence",
  },
  living: {
    track: "Spanish for Daily Life",
    extra: "Country-specific cultural modules",
  },
  family: {
    track: "Spanish for Family and Community",
    extra: "Cultural Intelligence",
  },
  education: {
    track: "Spanish for Education",
    extra: "Academic communication",
  },
  business: {
    track: "Spanish for Business",
    extra: "Cultural Intelligence for the workplace",
  },
  healthcare: {
    track: "Spanish for Healthcare",
    extra: "Cultural Intelligence for Spanish-speaking Communities",
  },
  lawEnforcement: {
    track: "Spanish for Law Enforcement",
    extra: "Cultural Intelligence for Law Enforcement Professionals",
  },
  customerService: {
    track: "Spanish for Customer Service",
    extra: "Cultural Intelligence",
  },
  teaching: {
    track: "Spanish for Teaching",
    extra: "Cultural Intelligence",
  },
  remote: {
    track: "Spanish for Remote Collaboration",
    extra: "Professional and technical communication",
  },
  career: {
    track: "Professional Spanish",
    extra: "Career communication",
  },
};

function nextLevel(level) {
  const index = LEVELS.indexOf(level);
  if (index < 0 || index >= LEVELS.length - 1) return level;
  return LEVELS[index + 1];
}

function displayLevel(level) {
  return level === "0" ? "Foundations" : level;
}

function startSession({ backgroundId, goalId }) {
  const currentLevel = BACKGROUND_START_LEVEL[backgroundId] || "0";
  return {
    backgroundId,
    goalId,
    currentLevel,
    asked: [],
    answers: [],
  };
}

function pickNextQuestion(session, questions) {
  const remaining = questions.filter((question) => !session.asked.includes(question.id));
  const atLevel = remaining.filter((question) => question.level === session.currentLevel);
  if (atLevel.length) return atLevel[0];

  const currentIndex = LEVELS.indexOf(session.currentLevel);
  const nearby = remaining
    .map((question) => ({
      question,
      distance: Math.abs(LEVELS.indexOf(question.level) - currentIndex),
    }))
    .sort((left, right) => left.distance - right.distance);
  return nearby[0] ? nearby[0].question : null;
}

function applyAnswer(session, question, optionIndex) {
  const correct = optionIndex === question.correctIndex;
  const currentLevel = correct ? nextLevel(session.currentLevel) : session.currentLevel;
  const feedback = correct
    ? "Well done. Keep going — this helps us find the right starting point."
    : "Don't worry. This question helps us understand where to begin. Let's learn from this. Here is a short explanation before we continue.";

  return {
    correct,
    feedback,
    explanation: question.explanation,
    session: {
      ...session,
      currentLevel,
      asked: [...session.asked, question.id],
      answers: [
        ...session.answers,
        {
          questionId: question.id,
          skill: question.skill,
          correct,
          level: question.level,
        },
      ],
    },
  };
}

function buildProfile(session) {
  const goal = GOAL_PATHS[session.goalId] || GOAL_PATHS.growth;
  const startingLevel = displayLevel(session.currentLevel);
  const bySkill = {};
  for (const answer of session.answers) {
    if (!bySkill[answer.skill]) bySkill[answer.skill] = { correct: 0, total: 0 };
    bySkill[answer.skill].total += 1;
    if (answer.correct) bySkill[answer.skill].correct += 1;
  }

  const ranked = Object.entries(bySkill)
    .map(([skill, stats]) => ({
      skill,
      ratio: stats.total ? stats.correct / stats.total : 0,
    }))
    .sort((left, right) => right.ratio - left.ratio);

  const strengths = ranked.filter((item) => item.ratio >= 0.5).slice(0, 3);
  const priorities = ranked.filter((item) => item.ratio < 0.5).slice(0, 3);

  return {
    startingLevel,
    track: goal.track,
    strengths: strengths.map((item) => item.skill),
    priorities: priorities.map((item) => item.skill),
    path: `General Spanish ${startingLevel} + ${goal.track} + ${goal.extra}`,
    currentLevel: session.currentLevel,
  };
}

module.exports = {
  BACKGROUND_START_LEVEL,
  GOAL_PATHS,
  LEVELS,
  applyAnswer,
  buildProfile,
  pickNextQuestion,
  startSession,
};
