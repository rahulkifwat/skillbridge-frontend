import {
  HiSpeakerWave,
  HiBookOpen,
  HiPencilSquare,
  HiMicrophone,
  HiClock,
  HiQuestionMarkCircle,
  HiChartBar,
  HiShieldCheck,
} from "react-icons/hi2";

export const examMeta = {
  title: "English Certification Exam",
  timeRemaining: "01:29:45",
  candidate: { name: "Juan Pérez", id: "SB123456" },
};

export const examTabs = [
  { label: "1. Listening", icon: HiSpeakerWave, active: true },
  { label: "2. Reading", icon: HiBookOpen },
  { label: "3. Writing", icon: HiPencilSquare },
  { label: "4. Speaking", icon: HiMicrophone },
];

export const examInstructions = {
  title: "Exam Instructions",
  text: "This test evaluates your English skills in real-life and work-related situations. Answer all sections. Each section has a time limit.",
};

export const skillWeights = [
  { label: "Listening", value: 25, color: "#2563eb" },
  { label: "Reading", value: 25, color: "#10b981" },
  { label: "Writing", value: 25, color: "#f59e0b" },
  { label: "Speaking", value: 25, color: "#8b5cf6" },
];

export const listeningSection = {
  number: 1,
  title: "LISTENING",
  timer: "30:00",
  accent: "primary",
  intro: "You will hear a short audio. Listen carefully and choose the best answer.",
  question: "What is the main purpose of the conversation?",
  questionLabel: "Question 1 of 10",
  audio: { current: "00:00", total: "01:05" },
  options: [
    { key: "A", text: "To schedule a meeting", selected: true },
    { key: "B", text: "To ask for information" },
    { key: "C", text: "To make a complaint" },
    { key: "D", text: "To give an instruction" },
  ],
};

export const readingSection = {
  number: 2,
  title: "READING",
  timer: "30:00",
  accent: "accent",
  intro: "Read the text and answer the questions.",
  passageLabel: "Read the text below.",
  passage:
    "Remote work has become increasingly popular in recent years. Many companies now offer flexible work options that allow employees to work from home. This trend has many benefits, such as saving time and reducing stress. However, it also requires good time management and self-discipline.",
  questionLabel: "Question 1 of 10",
  question: "What is the main idea of the text?",
  options: [
    { key: "A", text: "The challenges of working from home" },
    { key: "B", text: "The popularity of remote work", correct: true },
    { key: "C", text: "The history of flexible jobs" },
    { key: "D", text: "The requirements of self-discipline" },
  ],
};

export const writingSection = {
  number: 3,
  title: "WRITING",
  timer: "30:00",
  accent: "amber",
  intro: "Write a well-structured response to the task below.",
  taskLabel: "Task",
  task: "Some people believe that working from home is better than working in an office. To what extent do you agree or disagree? Give reasons and examples.",
  placeholder: "Write your answer here...",
  minWords: "Minimum 150 words",
};

export const speakingSection = {
  number: 4,
  title: "SPEAKING",
  timer: "29:45",
  accent: "violet",
  intro: "Record your voice for each task.",
  partLabel: "Part 1 – Self Introduction",
  prompt: "Please introduce yourself and talk about your education and work experience.",
  hint: "Press the button to start recording",
  timeCode: "00:00 / 01:00",
};

export const examSummary = [
  { label: "Total Time", value: "120 min", icon: HiClock },
  { label: "Total Questions", value: "40", icon: HiQuestionMarkCircle },
  { label: "Total Sections", value: "4", icon: HiChartBar },
  { label: "Secure Exam", value: "AI Proctored", icon: HiShieldCheck },
];

export const examReminders = [
  "Stay focused and manage your time.",
  "You cannot go back to previous sections.",
  "Ensure a stable internet connection.",
];
