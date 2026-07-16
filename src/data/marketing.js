import {
  HiChatBubbleLeftRight,
  HiCodeBracket,
  HiCpuChip,
  HiComputerDesktop,
  HiGlobeAsiaAustralia,
  HiRocketLaunch,
  HiBriefcase,
  HiArrowTrendingUp,
  HiBookOpen,
  HiUsers,
  HiGlobeAlt,
  HiBuildingOffice2,
  HiTrophy,
  HiBanknotes,
  HiClipboardDocumentCheck,
  HiPuzzlePiece,
  HiAcademicCap,
  HiChartBar,
  HiCloud,
  HiShieldCheck,
  HiMegaphone,
  HiSwatch,
  HiClipboardDocumentList,
  HiLifebuoy,
  HiWrenchScrewdriver,
} from "react-icons/hi2";

// The Academy and Pricing designs both show 9 academies; the homepage design
// shows a 7-card subset. 9 is treated as canonical.
export const academies = [
  {
    n: 1,
    name: "English Academy",
    short: "Communicate with confidence.",
    description: "Master English communication, improve fluency and confidence, and open doors to global careers.",
    icon: HiChatBubbleLeftRight,
    color: "#6d28d9",
    tint: "bg-violet-100",
    text: "text-violet-700",
  },
  {
    n: 2,
    name: "Software Academy",
    short: "Build in-demand tech skills.",
    description: "Build in-demand tech skills and become a job-ready software professional.",
    icon: HiCodeBracket,
    color: "#1d4ed8",
    tint: "bg-blue-100",
    text: "text-blue-700",
  },
  {
    n: 3,
    name: "Artificial Intelligence Academy",
    short: "Master AI and data science.",
    description: "Learn AI tools, machine learning and data science to build intelligent solutions for the real world.",
    icon: HiCpuChip,
    color: "#047857",
    tint: "bg-emerald-100",
    text: "text-emerald-700",
  },
  {
    n: 4,
    name: "Technology Literacy Academy",
    short: "Essential digital skills for today's world.",
    description: "Develop essential digital skills to thrive in today's tech-driven world with confidence.",
    icon: HiComputerDesktop,
    color: "#ea580c",
    tint: "bg-orange-100",
    text: "text-orange-700",
  },
  {
    n: 5,
    name: "Cultural Intelligence Academy",
    short: "Work and connect across cultures.",
    description: "Build global mindset, cross-cultural communication and work effectively in diverse environments.",
    icon: HiGlobeAsiaAustralia,
    color: "#0d9488",
    tint: "bg-teal-100",
    text: "text-teal-700",
  },
  {
    n: 6,
    name: "Career Development Academy",
    short: "Accelerate your career growth.",
    description: "Discover your strengths, build your personal brand and accelerate your career growth.",
    icon: HiRocketLaunch,
    color: "#7c3aed",
    tint: "bg-purple-100",
    text: "text-purple-700",
  },
  {
    n: 7,
    name: "Remote Work & Global Employment Academy",
    short: "Get ready for remote global jobs.",
    description: "Prepare for remote work success and learn how to get hired by top companies worldwide.",
    icon: HiGlobeAlt,
    color: "#1e40af",
    tint: "bg-indigo-100",
    text: "text-indigo-700",
  },
  {
    n: 8,
    name: "Professional Career Path Academy",
    short: "Train for the most requested global jobs.",
    description: "Train for the 10 most requested global jobs with complete career paths and real-world practice.",
    icon: HiArrowTrendingUp,
    color: "#db2777",
    tint: "bg-pink-100",
    text: "text-pink-700",
  },
  {
    n: 9,
    name: "Continuing Education Academy",
    short: "Keep learning. Keep growing.",
    description: "Keep learning, upskill and earn new certifications to stay ahead and advance your career.",
    icon: HiBookOpen,
    color: "#a16207",
    tint: "bg-yellow-100",
    text: "text-yellow-700",
  },
];

export const academyHighlights = [
  { title: "Practical Learning", detail: "Real projects and hands-on practice", icon: HiAcademicCap },
  { title: "Industry Relevant", detail: "Skills that employers actually want", icon: HiTrophy },
  { title: "Global Opportunities", detail: "Prepare for remote jobs with top companies", icon: HiGlobeAlt },
];

// "Train for the 10 Most Requested Global Jobs"
export const topCareers = [
  { n: 1, title: "Software Developer", salary: "$60K – $120K/yr", icon: HiCodeBracket, tint: "bg-violet-100", text: "text-violet-700" },
  { n: 2, title: "Data Analyst", salary: "$50K – $95K/yr", icon: HiChartBar, tint: "bg-blue-100", text: "text-blue-700" },
  { n: 3, title: "AI Specialist / Prompt Engineer", salary: "$70K – $130K/yr", icon: HiCpuChip, tint: "bg-emerald-100", text: "text-emerald-700" },
  { n: 4, title: "Cloud Support Specialist", salary: "$50K – $85K/yr", icon: HiCloud, tint: "bg-orange-100", text: "text-orange-700" },
  { n: 5, title: "Cybersecurity Analyst", salary: "$60K – $110K/yr", icon: HiShieldCheck, tint: "bg-purple-100", text: "text-purple-700" },
  { n: 6, title: "Digital Marketing Specialist", salary: "$45K – $85K/yr", icon: HiMegaphone, tint: "bg-amber-100", text: "text-amber-700" },
  { n: 7, title: "UX / UI Designer", salary: "$55K – $105K/yr", icon: HiSwatch, tint: "bg-sky-100", text: "text-sky-700" },
  { n: 8, title: "Project Coordinator", salary: "$45K – $80K/yr", icon: HiClipboardDocumentList, tint: "bg-teal-100", text: "text-teal-700" },
  { n: 9, title: "Customer Success Specialist", salary: "$45K – $80K/yr", icon: HiLifebuoy, tint: "bg-rose-100", text: "text-rose-700" },
  { n: 10, title: "IT Support Specialist", salary: "$40K – $70K/yr", icon: HiWrenchScrewdriver, tint: "bg-cyan-100", text: "text-cyan-700" },
];

export const homeStats = [
  { value: "50,000+", label: "Active Students", icon: HiUsers },
  { value: "120+", label: "Countries", icon: HiGlobeAlt },
  { value: "500+", label: "Hiring Partners", icon: HiBuildingOffice2 },
  { value: "85%", label: "Hire Rate", icon: HiTrophy },
  { value: "$2,000+", label: "Avg. Monthly Salary of Our Graduates", icon: HiBanknotes },
];

export const howItWorks = [
  { n: 1, title: "Assess", detail: "Discover your strengths with our AI assessment.", icon: HiClipboardDocumentCheck },
  { n: 2, title: "Learn", detail: "Learn with short lessons, real projects and AI.", icon: HiBookOpen },
  { n: 3, title: "Practice", detail: "Practice in simulations that prepare you for real jobs.", icon: HiPuzzlePiece },
  { n: 4, title: "Certify", detail: "Earn industry-recognized certifications.", icon: HiTrophy },
  { n: 5, title: "Get Hired", detail: "Access global job opportunities and start your career.", icon: HiBriefcase },
];

export const homeHeroFeatures = [
  { title: "100% Online", detail: "Learn Anywhere", icon: HiComputerDesktop },
  { title: "Hands-on Simulations", detail: "Practice Real Work", icon: HiPuzzlePiece },
  { title: "Industry Certifications", detail: "Boost Your Resume", icon: HiShieldCheck },
  { title: "Global Job Opportunities", detail: "Work from Anywhere", icon: HiGlobeAlt },
];

export const homeStories = [
  {
    name: "Mariana R.",
    role: "Data Analyst",
    quote: "SkillBridge changed my life. I went from zero experience to getting a remote job at a US company.",
    earning: "Now earning $2,300/month",
  },
  {
    name: "Carlos M.",
    role: "Software Developer",
    quote: "The simulations and real projects gave me the confidence I needed to stand out.",
    earning: "Now earning $3,200/month",
  },
  {
    name: "Ana P.",
    role: "UX/UI Designer",
    quote: "The best investment I've ever made. The support and community are incredible.",
    earning: "Now earning $2,600/month",
  },
];

export const hiringPartners = [
  "amazon",
  "Microsoft",
  "Google",
  "Meta",
  "IBM",
  "Deloitte",
  "pwc",
  "accenture",
  "Walmart",
];
