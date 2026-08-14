import {
  HiHome,
  HiBookOpen,
  HiBuildingLibrary,
  HiSun,
  HiClipboardDocumentList,
  HiCheckBadge,
  HiBriefcase,
  HiChartBarSquare,
  HiTag,
  HiQuestionMarkCircle,
  HiCpuChip,
  HiSquares2X2,
  HiComputerDesktop,
  HiBuildingOffice2,
  HiPaintBrush,
  HiHeart,
  HiAcademicCap,
  HiWrenchScrewdriver,
  HiChartBar,
  HiDocumentCheck,
  HiRocketLaunch,
  HiArrowPath,
  HiGlobeAlt,
  HiUsers,
  HiTrophy,
  HiSparkles,
  HiClock,
  HiDevicePhoneMobile,
  HiArrowDownTray,
  HiCurrencyDollar,
  HiMap,
  HiShieldCheck,
  HiPresentationChartLine,
  HiLightBulb,
  HiCodeBracket,
  HiMegaphone,
  HiCloud,
  HiPlusCircle,
  HiBookmarkSquare,
  HiChatBubbleLeftRight,
  HiPuzzlePiece,
} from "react-icons/hi2";

// ---------------------------------------------------------------------------
// Shared sidebar
// ---------------------------------------------------------------------------

export const studentNav = [
  { label: "Home", icon: HiHome, href: "/student" },
  { label: "My Learning", icon: HiBookOpen, href: "/my-space" },
  { label: "Academies", icon: HiBuildingLibrary, href: "/academies" },
  { label: "Career Paths", icon: HiSun, href: "/student/career-paths" },
  { label: "Assessments", icon: HiClipboardDocumentList, href: "/student/assessments" },
  { label: "Certifications", icon: HiCheckBadge, href: "/certifications" },
  { label: "Job Opportunities", icon: HiBriefcase, href: "/job-opportunities" },
  { label: "Success Stories", icon: HiChartBarSquare, href: "/success-stories" },
  { label: "Pricing", icon: HiTag, href: "/pricing" },
  { label: "Help Center", icon: HiQuestionMarkCircle, href: "/help-center" },
];

// ---------------------------------------------------------------------------
// Page 1 — Student home
// ---------------------------------------------------------------------------

export const homeHighlights = [
  { icon: HiCpuChip, label: "AI-Powered\nLearning" },
  { icon: HiSparkles, label: "Real-World\nSimulations" },
  { icon: HiDocumentCheck, label: "Industry\nCertifications" },
  { icon: HiGlobeAlt, label: "Global\nOpportunities" },
];

// Floating badges over the hero artwork.
export const heroBadges = [
  { icon: HiBriefcase, className: "left-[8%] top-[4%]", color: "bg-violet-600" },
  { icon: HiUsers, className: "left-[52%] top-0", color: "bg-accent" },
  { icon: HiChartBar, className: "right-[6%] top-[14%]", color: "bg-amber-500" },
  { icon: HiGlobeAlt, className: "right-0 top-[52%]", color: "bg-primary" },
];

export const personas = [
  {
    id: "high-school-student",
    icon: HiAcademicCap,
    title: "High School\nStudent",
    body: "Build strong foundations and prepare for your future career.",
    cta: "I'm a High School Student",
    accent: "bg-violet-600",
    hoverRing: "hover:border-violet-300",
    titleColor: "text-violet-700",
    art: "from-violet-500 to-violet-700",
  },
  {
    id: "technical-institute-student",
    icon: HiBuildingLibrary,
    title: "Technical\nInstitute Student",
    body: "Gain practical skills and industry certifications for better jobs.",
    cta: "I'm a Technical Student",
    accent: "bg-primary",
    hoverRing: "hover:border-blue-300",
    titleColor: "text-primary",
    art: "from-blue-500 to-blue-700",
  },
  {
    id: "college-student",
    icon: HiAcademicCap,
    title: "College /\nUniversity Student",
    body: "Upgrade your skills, boost employability, and get career ready.",
    cta: "I'm a College Student",
    accent: "bg-emerald-600",
    hoverRing: "hover:border-emerald-300",
    titleColor: "text-emerald-700",
    art: "from-emerald-500 to-emerald-700",
  },
  {
    id: "working-professional",
    icon: HiBriefcase,
    title: "Working\nProfessional",
    body: "Upskill, stay relevant, and advance your career.",
    cta: "I'm a Working Professional",
    accent: "bg-orange-500",
    hoverRing: "hover:border-orange-300",
    titleColor: "text-orange-600",
    art: "from-orange-400 to-orange-600",
  },
  {
    id: "career-changer",
    icon: HiArrowPath,
    title: "Career\nChanger",
    body: "Learn new skills, switch careers, and build a better future.",
    cta: "I'm Changing Careers",
    accent: "bg-teal-600",
    hoverRing: "hover:border-teal-300",
    titleColor: "text-teal-700",
    art: "from-teal-500 to-teal-700",
  },
  {
    id: "employer",
    icon: HiBuildingOffice2,
    title: "Employer",
    body: "Find skilled talent, train your teams, and drive success.",
    cta: "I'm an Employer",
    accent: "bg-blue-800",
    hoverRing: "hover:border-blue-300",
    titleColor: "text-blue-800",
    art: "from-blue-700 to-blue-900",
  },
  {
    id: "institution",
    icon: HiBuildingLibrary,
    title: "School or\nUniversity",
    body: "Empower your students with world-class skills and outcomes.",
    cta: "I'm an Education Institution",
    accent: "bg-purple-600",
    hoverRing: "hover:border-purple-300",
    titleColor: "text-purple-700",
    art: "from-purple-500 to-purple-700",
  },
];

export const homeStatBand = [
  { icon: HiGlobeAlt, value: "100+", label: "Countries" },
  { icon: HiUsers, value: "1M+", label: "Learners" },
  { icon: HiAcademicCap, value: "5,000+", label: "Education Partners" },
  { icon: HiBriefcase, value: "10,000+", label: "Employer Partners" },
  { icon: HiTrophy, value: "Millions", label: "Opportunities Created" },
];

// ---------------------------------------------------------------------------
// Page 2 — Career paths
// ---------------------------------------------------------------------------

export const careerCategories = [
  { id: "all", label: "All Paths", icon: HiSquares2X2 },
  { id: "technology", label: "Technology", icon: HiComputerDesktop },
  { id: "business", label: "Business", icon: HiBriefcase },
  { id: "data-ai", label: "Data & AI", icon: HiCpuChip },
  { id: "creative", label: "Creative", icon: HiPaintBrush },
  { id: "health", label: "Health", icon: HiHeart },
  { id: "education", label: "Education", icon: HiBookOpen },
  { id: "engineering", label: "Engineering", icon: HiWrenchScrewdriver },
];

export const careerBannerPoints = [
  {
    icon: HiChartBar,
    title: "In-Demand Jobs",
    body: "Careers with strong growth and high opportunities.",
    color: "bg-primary",
  },
  {
    icon: HiBriefcase,
    title: "Real Skills",
    body: "Learn the skills employers are looking for.",
    color: "bg-violet-500",
  },
  {
    icon: HiDocumentCheck,
    title: "Certifications",
    body: "Earn recognized certifications and boost your resume.",
    color: "bg-emerald-600",
  },
  {
    icon: HiRocketLaunch,
    title: "Get Hired",
    body: "Prepare for interviews, build your portfolio, and land the job.",
    color: "bg-orange-500",
  },
];

export const careerPaths = [
  {
    id: "software-developer",
    title: "Software Developer",
    category: "technology",
    icon: HiCodeBracket,
    jobs: "42,000+ Jobs",
    salary: "$70K – $120K / year",
    level: "Beginner to Advanced",
    accent: "bg-violet-600",
    button: "bg-violet-600 hover:bg-violet-700",
    titleColor: "text-violet-700",
    art: "from-violet-600 to-indigo-800",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "data-ai",
    icon: HiPresentationChartLine,
    jobs: "35,000+ Jobs",
    salary: "$60K – $95K / year",
    level: "Beginner to Advanced",
    accent: "bg-primary",
    button: "bg-primary hover:bg-primary-hover",
    titleColor: "text-primary",
    art: "from-blue-600 to-blue-900",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    category: "data-ai",
    icon: HiCpuChip,
    jobs: "28,000+ Jobs",
    salary: "$80K – $140K / year",
    level: "Intermediate to Advanced",
    accent: "bg-emerald-600",
    button: "bg-emerald-600 hover:bg-emerald-700",
    titleColor: "text-emerald-700",
    art: "from-emerald-600 to-teal-800",
  },
  {
    id: "digital-marketer",
    title: "Digital Marketer",
    category: "business",
    icon: HiMegaphone,
    jobs: "22,000+ Jobs",
    salary: "$50K – $90K / year",
    level: "Beginner to Advanced",
    accent: "bg-orange-500",
    button: "bg-orange-500 hover:bg-orange-600",
    titleColor: "text-orange-600",
    art: "from-orange-400 to-amber-600",
  },
  {
    id: "ux-ui-designer",
    title: "UX / UI Designer",
    category: "creative",
    icon: HiPaintBrush,
    jobs: "18,000+ Jobs",
    salary: "$55K – $100K / year",
    level: "Beginner to Advanced",
    accent: "bg-pink-600",
    button: "bg-pink-600 hover:bg-pink-700",
    titleColor: "text-pink-600",
    art: "from-pink-500 to-rose-700",
  },
  {
    id: "healthcare-professional",
    title: "Healthcare Professional",
    category: "health",
    icon: HiPlusCircle,
    jobs: "30,000+ Jobs",
    salary: "$60K – $110K / year",
    level: "Various Levels",
    accent: "bg-teal-600",
    button: "bg-teal-600 hover:bg-teal-700",
    titleColor: "text-teal-700",
    art: "from-teal-500 to-cyan-700",
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    category: "engineering",
    icon: HiCloud,
    jobs: "25,000+ Jobs",
    salary: "$75K – $130K / year",
    level: "Intermediate to Advanced",
    accent: "bg-purple-600",
    button: "bg-purple-600 hover:bg-purple-700",
    titleColor: "text-purple-700",
    art: "from-purple-600 to-fuchsia-800",
  },
];

export const careerJourney = [
  {
    step: 1,
    icon: HiSun,
    title: "Discover",
    body: "Explore career paths that match your interests.",
    color: "bg-emerald-600",
  },
  {
    step: 2,
    icon: HiBookOpen,
    title: "Learn",
    body: "Build in-demand skills with expert courses.",
    color: "bg-primary",
  },
  {
    step: 3,
    icon: HiDocumentCheck,
    title: "Certify",
    body: "Earn industry-recognized certifications.",
    color: "bg-violet-600",
  },
  {
    step: 4,
    icon: HiComputerDesktop,
    title: "Practice",
    body: "Work on real-world projects and simulations.",
    color: "bg-orange-500",
  },
  {
    step: 5,
    icon: HiBookmarkSquare,
    title: "Build Portfolio",
    body: "Showcase your skills and projects to employers.",
    color: "bg-emerald-600",
  },
  {
    step: 6,
    icon: HiBriefcase,
    title: "Get Hired",
    body: "Apply to jobs and prepare for interviews.",
    color: "bg-primary",
  },
  {
    step: 7,
    icon: HiChartBar,
    title: "Grow",
    body: "Keep learning and advance your career.",
    color: "bg-violet-600",
  },
];

// ---------------------------------------------------------------------------
// Page 3 — Assessments
// ---------------------------------------------------------------------------

export const assessmentFeatures = [
  {
    icon: HiCpuChip,
    title: "AI-Powered",
    body: "Advanced AI analyzes your responses to deliver accurate and personalized results.",
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
  {
    icon: HiClock,
    title: "Comprehensive",
    body: "Evaluates your skills, interests, personality, and work style in just 25–30 minutes.",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: HiShieldCheck,
    title: "Confidential",
    body: "Your data is secure and private. You're in control of your information.",
    color: "text-primary",
    bg: "bg-blue-100",
  },
  {
    icon: HiSun,
    title: "Actionable Results",
    body: "Get clear insights, career recommendations, and a step-by-step learning plan.",
    color: "text-orange-500",
    bg: "bg-orange-100",
  },
];

export const assessmentPreview = {
  matches: [
    { rank: 1, title: "Data Analyst", score: 92, color: "bg-emerald-500" },
    { rank: 2, title: "Software Developer", score: 88, color: "bg-amber-500" },
    { rank: 3, title: "AI Engineer", score: 85, color: "bg-emerald-500" },
  ],
  overallScore: 87,
  verdict: "Strong",
  strengths: ["Analytical Thinking", "Problem Solving", "Creativity", "Communication"],
};

export const assessmentDeliverables = [
  {
    icon: HiSun,
    title: "Career Matches",
    body: "Top career paths that fit your skills, interests, and goals.",
    color: "bg-violet-600",
  },
  {
    icon: HiChartBar,
    title: "Skills Report",
    body: "Detailed breakdown of your current skills and strengths.",
    color: "bg-emerald-600",
  },
  {
    icon: HiMap,
    title: "Learning Roadmap",
    body: "Personalized plan with courses, projects, and milestones.",
    color: "bg-primary",
  },
  {
    icon: HiBriefcase,
    title: "Job Insights",
    body: "In-demand jobs, salaries, and future growth outlook.",
    color: "bg-orange-500",
  },
  {
    icon: HiDocumentCheck,
    title: "Recommended Certifications",
    body: "Certifications that boost your resume and career.",
    color: "bg-purple-600",
  },
];

export const assessmentSteps = [
  {
    step: 1,
    icon: HiClipboardDocumentList,
    title: "Answer Questions",
    body: "Answer questions about your skills, interests, experience and goals.",
    color: "bg-violet-600",
    tint: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    step: 2,
    icon: HiPuzzlePiece,
    title: "AI Analyzes",
    body: "Our AI analyzes your responses and compares them to real career data.",
    color: "bg-primary",
    tint: "bg-blue-50",
    iconColor: "text-primary",
  },
  {
    step: 3,
    icon: HiCheckBadge,
    title: "Get Your Results",
    body: "Receive your results with career matches, strengths, and insights.",
    color: "bg-emerald-600",
    tint: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    step: 4,
    icon: HiMap,
    title: "Follow Your Roadmap",
    body: "Get your personalized learning plan and recommended next steps.",
    color: "bg-orange-500",
    tint: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    step: 5,
    icon: HiRocketLaunch,
    title: "Achieve Your Goals",
    body: "Learn, grow, get certified, and land the career you deserve.",
    color: "bg-purple-600",
    tint: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

export const assessmentDetails = [
  { icon: HiClock, label: "Duration: 25–30 minutes" },
  { icon: HiChatBubbleLeftRight, label: "Questions: ~60" },
  { icon: HiClipboardDocumentList, label: "Format: Multiple choice" },
  { icon: HiDevicePhoneMobile, label: "Accessible on any device" },
  { icon: HiArrowDownTray, label: "Results available instantly" },
  { icon: HiCurrencyDollar, label: "Price: FREE for a limited time", highlight: "FREE" },
];

export const sidebarPromoContent = {
  learning: {
    icon: HiLightBulb,
    title: "AI-Powered Learning",
    body: "Personalized. Adaptive. Effective.",
  },
  assessment: {
    icon: HiCpuChip,
    title: "AI-Powered Assessments",
    body: "Smart. Accurate. Personalized for you.",
  },
  career: {
    icon: HiSun,
    title: "Not sure which career is right for you?",
    body: "Take our AI Career Assessment and discover the best paths for you.",
    cta: "Take Assessment",
  },
};
