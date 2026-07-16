import {
  HiCpuChip,
  HiPresentationChartLine,
  HiShieldCheck,
  HiClock,
  HiDocumentText,
  HiChartBarSquare,
  HiTableCells,
  HiMegaphone,
  HiPaintBrush,
  HiRectangleGroup,
  HiAcademicCap,
  HiLanguage,
  HiWrenchScrewdriver,
  HiCheckBadge,
  HiUserGroup,
  HiCheckCircle,
  HiGlobeAlt,
  HiUser,
  HiLockClosed,
  HiHeart,
  HiChartBar,
  HiLightBulb,
  HiPuzzlePiece,
  HiBolt,
  HiSparkles,
  HiRocketLaunch,
  HiComputerDesktop,
  HiBriefcase,
} from "react-icons/hi2";

// Hero ------------------------------------------------------------------
export const heroFeatures = [
  { icon: HiCpuChip, title: "AI-Powered", detail: "Advanced algorithm for accurate results" },
  { icon: HiPresentationChartLine, title: "Personalized", detail: "100% customized to your profile" },
  { icon: HiShieldCheck, title: "Actionable", detail: "Clear next steps for your future" },
];

export const heroInfoCard = [
  { icon: HiClock, title: "20–25", detail: "Minutes" },
  { icon: HiDocumentText, title: "5 Sections", detail: "100 Questions" },
  { icon: HiChartBarSquare, title: "Instant Results", detail: "Personalized Report" },
];

// Stepper ---------------------------------------------------------------
export const assessmentSteps = [
  { label: "1. Personal Info", status: "Completed" },
  { label: "2. Skills & Abilities", status: "Completed" },
  { label: "3. Interests", status: "Completed" },
  { label: "4. Work Preferences", status: "Completed" },
  { label: "5. Results", status: "Current Step", current: true },
];

export const assessmentProgress = {
  percent: 100,
  title: "Assessment Completed!",
  detail: "View your personalized results below.",
};

// Career matches --------------------------------------------------------
export const careerMatches = [
  {
    rank: 1,
    icon: HiTableCells,
    title: "Data Analyst",
    description: "Analyze data to help companies make smart decisions.",
    score: "92%",
    tint: "bg-blue-50 text-blue-700",
    rankTint: "bg-blue-600",
  },
  {
    rank: 2,
    icon: HiCpuChip,
    title: "AI Prompt Engineer",
    description: "Work with AI tools to create powerful prompts and solutions.",
    score: "88%",
    tint: "bg-emerald-50 text-emerald-700",
    rankTint: "bg-emerald-600",
  },
  {
    rank: 3,
    icon: HiMegaphone,
    title: "Digital Marketing Specialist",
    description: "Create strategies and campaigns that drive business growth.",
    score: "85%",
    tint: "bg-orange-50 text-orange-700",
    rankTint: "bg-violet-600",
  },
  {
    rank: 4,
    icon: HiPaintBrush,
    title: "UX/UI Designer",
    description: "Design digital experiences that are beautiful and user-friendly.",
    score: "82%",
    tint: "bg-sky-50 text-sky-700",
    rankTint: "bg-sky-600",
  },
  {
    rank: 5,
    icon: HiRectangleGroup,
    title: "Project Coordinator",
    description: "Plan, organize and coordinate projects to achieve goals.",
    score: "78%",
    tint: "bg-pink-50 text-pink-700",
    rankTint: "bg-pink-600",
  },
];

// Skills radar ----------------------------------------------------------
export const skillsRadar = [
  { label: "Analytical Thinking", value: 95, peer: 78 },
  { label: "Problem Solving", value: 90, peer: 75 },
  { label: "Communication", value: 78, peer: 72 },
  { label: "Creativity", value: 82, peer: 68 },
  { label: "Adaptability", value: 80, peer: 70 },
  { label: "Technical Aptitude", value: 88, peer: 74 },
];

export const learningStyle = {
  icon: HiLightBulb,
  eyebrow: "Your Learning Style",
  title: "Visual Learner",
  detail: "You learn best through images, videos, and visual content.",
};

// Strengths & interests -------------------------------------------------
export const topStrengths = [
  { icon: HiChartBar, label: "Analytical Thinking", percent: 95, color: "bg-brand" },
  { icon: HiPuzzlePiece, label: "Problem Solving", percent: 90, color: "bg-brand" },
  { icon: HiBolt, label: "Learning Agility", percent: 88, color: "bg-brand" },
  { icon: HiSparkles, label: "Attention to Detail", percent: 85, color: "bg-brand" },
  { icon: HiUserGroup, label: "Adaptability", percent: 80, color: "bg-brand" },
];

export const interests = [
  { icon: HiComputerDesktop, label: "Technology", percent: 95, color: "bg-violet-600" },
  { icon: HiChartBarSquare, label: "Data & Analytics", percent: 90, color: "bg-violet-600" },
  { icon: HiLightBulb, label: "Creative Problem Solving", percent: 85, color: "bg-violet-600" },
  { icon: HiHeart, label: "Helping Others", percent: 70, color: "bg-violet-600" },
  { icon: HiBriefcase, label: "Business & Strategy", percent: 65, color: "bg-violet-600" },
];

// Recommended paths -----------------------------------------------------
export const careerPaths = [
  {
    icon: HiChartBarSquare,
    title: "Data & Analytics Path",
    duration: "8-10 Months",
    description: "Become a data professional and help companies make data-driven decisions.",
    roles: "Data Analyst, Business Analyst, Data Scientist",
    salary: "$55,000 – $95,000 USD",
    iconTint: "bg-emerald-50 text-emerald-700",
    button: "bg-brand-hover hover:bg-brand",
  },
  {
    icon: HiCpuChip,
    title: "AI & Machine Learning Path",
    duration: "9-12 Months",
    description: "Build AI solutions and work with the technology of the future.",
    roles: "AI Engineer, ML Engineer, Prompt Engineer",
    salary: "$70,000 – $130,000 USD",
    iconTint: "bg-violet-50 text-violet-700",
    button: "bg-violet-600 hover:bg-violet-700",
  },
  {
    icon: HiMegaphone,
    title: "Digital Marketing Path",
    duration: "6-8 Months",
    description: "Grow brands and businesses in the digital world.",
    roles: "Digital Marketer, SEO Specialist, Content Strategist",
    salary: "$45,000 – $80,000 USD",
    iconTint: "bg-orange-50 text-orange-700",
    button: "bg-orange-500 hover:bg-orange-600",
  },
];

export const nextSteps = [
  {
    icon: HiAcademicCap,
    title: "Explore Recommended Academies",
    detail: "Start learning the skills you need.",
    tint: "bg-blue-50 text-blue-700",
  },
  {
    icon: HiLanguage,
    title: "Improve Your English to B2+",
    detail: "Increase your global job opportunities.",
    tint: "bg-violet-50 text-violet-700",
  },
  {
    icon: HiWrenchScrewdriver,
    title: "Build Real Projects",
    detail: "Practice with real-world simulations.",
    tint: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: HiCheckBadge,
    title: "Earn Certifications",
    detail: "Get certified and boost your credibility.",
    tint: "bg-teal-50 text-teal-700",
  },
];

// Trust -----------------------------------------------------------------
export const trustStats = [
  { icon: HiUserGroup, value: "500K+", label: "Assessments Completed", tint: "bg-blue-50 text-blue-700" },
  { icon: HiCheckCircle, value: "98%", label: "Accuracy in Career Recommendations", tint: "bg-sky-50 text-sky-700" },
  { icon: HiGlobeAlt, value: "25+", label: "Global Industries Analyzed", tint: "bg-emerald-50 text-emerald-700" },
  { icon: HiUser, value: "10K+", label: "Students Hired Globally", tint: "bg-violet-50 text-violet-700" },
];

export const trustTestimonial = {
  quote:
    "“The assessment was eye-opening. It showed me a career path I never considered, and now I'm working as a Data Analyst remotely for a U.S. company!”",
  name: "Maria D.",
  role: "Data Analyst at RemoteCo",
  stars: 5,
};

// Final CTA -------------------------------------------------------------
export const ctaFeatures = [
  { icon: HiClock, title: "It's Fast", detail: "20–25 minutes" },
  { icon: HiShieldCheck, title: "It's Free", detail: "No credit card required" },
  { icon: HiLockClosed, title: "It's Secure", detail: "Your data is protected" },
  { icon: HiRocketLaunch, title: "It's Worth It", detail: "Your future is priceless" },
];
