import {
  HiUsers,
  HiBriefcase,
  HiGlobeAlt,
  HiChartBar,
  HiChatBubbleLeftRight,
  HiCodeBracket,
  HiSparkles,
  HiChartPie,
  HiComputerDesktop,
  HiRocketLaunch,
  HiShieldCheck,
  HiCloud,
} from "react-icons/hi2";

// Hero: inline four-stat card sitting over the navy band.
export const heroStats = [
  { value: "10,000+", label: "Students Hired Globally", icon: HiUsers },
  { value: "2,500+", label: "Partner Companies", icon: HiBriefcase },
  { value: "120+", label: "Countries Represented", icon: HiGlobeAlt },
  { value: "$65,000", label: "Average Annual Salary Earned", icon: HiChartBar },
];

export const trustpilot = {
  stars: 5,
  summary: "4.8 out of 5 based on 1,200+ reviews",
};

// Static/readOnly decoration for the filter bar above the story grid.
export const storyFilters = ["All Academies", "All Countries", "All Job Roles"];

// Per-academy pill accents. Tailwind built-ins are allowed for category colors.
export const academyStyles = {
  "English Academy": {
    pill: "bg-violet-100 text-violet-700",
    icon: HiChatBubbleLeftRight,
  },
  "Software Academy": {
    pill: "bg-blue-100 text-blue-700",
    icon: HiCodeBracket,
  },
  "AI Academy": {
    pill: "bg-emerald-100 text-emerald-700",
    icon: HiSparkles,
  },
  "Data & Analytics Academy": {
    pill: "bg-orange-100 text-orange-700",
    icon: HiChartPie,
  },
  "Remote Work Academy": {
    pill: "bg-blue-100 text-blue-800",
    icon: HiComputerDesktop,
  },
  "Career Development Academy": {
    pill: "bg-purple-100 text-purple-700",
    icon: HiRocketLaunch,
  },
  "Cybersecurity Academy": {
    pill: "bg-pink-100 text-pink-700",
    icon: HiShieldCheck,
  },
  "Cloud Academy": {
    pill: "bg-sky-100 text-sky-700",
    icon: HiCloud,
  },
};

// Eight graduate stories — the 4 x 2 card grid.
export const stories = [
  {
    name: "Andrés M.",
    role: "Customer Support Specialist",
    academy: "English Academy",
    quote:
      "SkillBridge helped me improve my English and communication skills. Now I work for a US company from Colombia.",
    employer: "amazon",
    employerClass: "text-heading",
    salary: "$42,000",
    hired: "Hired 5 months ago",
    country: "Colombia",
    flag: "🇨🇴",
  },
  {
    name: "Mariana R.",
    role: "Software Developer",
    academy: "Software Academy",
    quote:
      "The simulations and projects prepared me for real interviews. Today I'm a Software Developer at a great company.",
    employer: "remote.com",
    employerClass: "text-heading",
    salary: "$78,000",
    hired: "Hired 3 months ago",
    country: "Mexico",
    flag: "🇲🇽",
  },
  {
    name: "Luis P.",
    role: "AI Prompt Engineer",
    academy: "AI Academy",
    quote:
      "I learned AI tools and prompt engineering. Now I help businesses innovate from anywhere in the world.",
    employer: "OpenAI",
    employerClass: "text-heading",
    salary: "$93,000",
    hired: "Hired 2 months ago",
    country: "Peru",
    flag: "🇵🇪",
  },
  {
    name: "Valentina C.",
    role: "Data Analyst",
    academy: "Data & Analytics Academy",
    quote:
      "The Data Analyst certification gave me confidence and real skills. Now I turn data into decisions.",
    employer: "Microsoft",
    employerClass: "text-heading",
    salary: "$67,000",
    hired: "Hired 4 months ago",
    country: "Chile",
    flag: "🇨🇱",
  },
  {
    name: "Johan D.",
    role: "Virtual Assistant",
    academy: "Remote Work Academy",
    quote:
      "SkillBridge taught me how to work remotely, manage my time and communicate across cultures.",
    employer: "BELAY",
    employerClass: "tracking-[0.2em] text-emerald-700",
    salary: "$36,000",
    hired: "Hired 6 months ago",
    country: "Ecuador",
    flag: "🇪🇨",
  },
  {
    name: "Sofia T.",
    role: "Digital Marketing Specialist",
    academy: "Career Development Academy",
    quote:
      "The career coaching and resume building made all the difference. I landed my dream job!",
    employer: "HubSpot",
    employerClass: "text-orange-600",
    salary: "$54,000",
    hired: "Hired 5 months ago",
    country: "Argentina",
    flag: "🇦🇷",
  },
  {
    name: "Diego H.",
    role: "Cybersecurity Analyst",
    academy: "Cybersecurity Academy",
    quote:
      "The hands-on labs and certifications prepared me to protect systems and data worldwide.",
    employer: "cisco",
    employerClass: "tracking-[0.15em] text-sky-700",
    salary: "$72,000",
    hired: "Hired 3 months ago",
    country: "Brazil",
    flag: "🇧🇷",
  },
  {
    name: "Camila L.",
    role: "Cloud Engineer",
    academy: "Cloud Academy",
    quote:
      "I went from zero to Cloud Engineer with the best trainers and real-world projects.",
    employer: "aws",
    employerClass: "text-heading",
    salary: "$80,000",
    hired: "Hired 2 months ago",
    country: "Costa Rica",
    flag: "🇨🇷",
  },
];

// Sidebar: video promo card.
export const videoPromo = {
  title: "Their Success. Your Future.",
  subtitle: "Watch how SkillBridge changed their lives.",
  linkLabel: "Watch More Success Stories",
  href: "/success-stories",
};

// Sidebar: aggregate review card.
export const reviewSummary = {
  title: "What Our Students Say",
  score: "4.9",
  stars: 5,
  reviewCount: "(1,200+ reviews)",
  quote:
    "SkillBridge is more than a learning platform. It's a bridge to a better life and global opportunities.",
  attribution: "— Based on reviews from Trustpilot",
};

// Employer logo row — rendered as styled text, never images.
export const employerLogos = [
  { name: "amazon", className: "text-heading" },
  { name: "Google", className: "text-blue-600" },
  { name: "Microsoft", className: "text-heading" },
  { name: "Disney", className: "italic text-indigo-900" },
  { name: "DELL", className: "tracking-[0.15em] text-blue-700" },
  { name: "salesforce", className: "text-sky-500" },
  { name: "airbnb", className: "text-rose-500" },
  { name: "IBM", className: "tracking-[0.2em] text-blue-800" },
  { name: "PayPal", className: "text-blue-700" },
  { name: "NVIDIA", className: "tracking-wide text-green-600" },
  { name: "Johnson&Johnson", className: "text-red-600" },
];
