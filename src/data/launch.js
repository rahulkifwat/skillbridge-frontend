import {
  HiAcademicCap,
  HiBuildingOffice2,
  HiArrowTrendingUp,
  HiGlobeAlt,
  HiCpuChip,
  HiViewfinderCircle,
  HiShieldCheck,
  HiChatBubbleLeftRight,
  HiCodeBracket,
  HiComputerDesktop,
  HiUserGroup,
} from "react-icons/hi2";

// Content for the alternate "/launch" landing concept. Palette is the
// marketing teal/navy system; per-card tints use Tailwind built-ins.

export const launchHero = {
  badge: "SkillBridge EdTech",
  headline: ["Launch Your", "Global Career", "with AI-Powered Learning"],
  subcopy:
    "Master in-demand skills through real-world simulations, English training, and direct access to global remote career opportunities.",
  actions: [
    { label: "Get Assessed", href: "/career-assessment", variant: "brand" },
    { label: "Start Learning", href: "/academies", variant: "outline" },
    { label: "Hire Talent", href: "/contact", variant: "ink" },
  ],
  socialProof: "students building global careers.",
  socialProofLead: "Join 50,000+",
  avatars: ["Ana Reyes", "Diego Torres", "Marta Silva", "Luis Gomez"],
  video: {
    tagline: ["Future Skills.", "Real Practice.", "Real Results."],
    speaker: "Gerardo Mosquera",
    role: "Executive Director",
    org: "SkillBridge EdTech",
    time: "0:02 / 2:00",
    caption: "Watch a 2-minute introduction from our Executive Director.",
  },
};

export const launchStats = [
  {
    value: "50,000+",
    label: "Students Empowered",
    icon: HiAcademicCap,
    tint: "bg-brand-light",
    text: "text-brand",
  },
  {
    value: "500+",
    label: "Employer Partners",
    icon: HiBuildingOffice2,
    tint: "bg-indigo-50",
    text: "text-indigo-600",
  },
  {
    value: "95%",
    label: "Job Readiness Score",
    icon: HiArrowTrendingUp,
    tint: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    value: "25+",
    label: "Countries Connected",
    icon: HiGlobeAlt,
    tint: "bg-brand-light",
    text: "text-brand",
  },
];

export const launchValues = [
  {
    title: "AI-Powered Learning",
    description: "Personalized learning paths that adapt to you.",
    icon: HiCpuChip,
    tint: "bg-indigo-50",
    text: "text-indigo-600",
  },
  {
    title: "Real-World Simulations",
    description: "Practice in realistic work environments.",
    icon: HiViewfinderCircle,
    tint: "bg-brand-light",
    text: "text-brand",
  },
  {
    title: "Global Opportunities",
    description: "Connect with U.S. companies hiring remote talent.",
    icon: HiGlobeAlt,
    tint: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    title: "Verified & Trusted",
    description: "Industry-recognized assessments and certifications.",
    icon: HiShieldCheck,
    tint: "bg-violet-50",
    text: "text-violet-600",
  },
];

export const launchAcademies = [
  {
    name: "English Academy",
    description: "From foundation to fluency. Communicate with confidence.",
    href: "/academies",
    icon: HiChatBubbleLeftRight,
    tint: "bg-brand-light",
    text: "text-brand",
  },
  {
    name: "Software Academy",
    description: "Learn in-demand tech skills and build real projects.",
    href: "/academies",
    icon: HiCodeBracket,
    tint: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    name: "Technological Literacy",
    description: "Essential digital skills for today's world.",
    href: "/academies",
    icon: HiComputerDesktop,
    tint: "bg-orange-50",
    text: "text-orange-600",
  },
  {
    name: "Cultural Readiness",
    description: "Work effectively in global teams and environments.",
    href: "/academies",
    icon: HiUserGroup,
    tint: "bg-blue-50",
    text: "text-blue-600",
  },
];

export const launchAcademyCta = {
  title: "Not sure where to start?",
  description: "Get a personalized recommendation in minutes.",
  action: { label: "Take Assessment", href: "/career-assessment" },
};

export const launchEmployerBand = {
  title: "Skills aligned with leading global employers.",
  logos: [
    { name: "Google", className: "text-2xl font-normal tracking-tight" },
    { name: "Microsoft", className: "text-xl font-normal tracking-tight" },
    { name: "amazon", className: "text-2xl font-semibold lowercase tracking-tight" },
    { name: "DELL", className: "text-xl font-semibold tracking-[0.2em]" },
    { name: "intel", className: "text-xl font-semibold lowercase tracking-tight" },
    { name: "IBM", className: "text-xl font-bold tracking-[0.15em]" },
  ],
  rating: "4.8/5 from 2,500+ reviews",
  avatars: ["Sofia Marin", "Carlos Pena"],
};
