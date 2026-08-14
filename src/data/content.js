import {
  HiClipboardDocumentCheck,
  HiBookOpen,
  HiViewfinderCircle,
  HiCpuChip,
  HiBriefcase,
  HiUserGroup,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

export const features = [
  {
    icon: HiClipboardDocumentCheck,
    title: "AI Assessment",
    description: "Discover your strengths and get a personalized learning path.",
  },
  {
    icon: HiBookOpen,
    title: "Learning Academy",
    description: "Expert-designed courses in high-demand fields with microlearning.",
  },
  {
    icon: HiViewfinderCircle,
    title: "Simulations",
    description: "Learn by doing with real-world simulations that build job-ready skills.",
    badge: "85%",
  },
  {
    icon: HiCpuChip,
    title: "AI Career Coach",
    description: "Get 24/7 AI guidance on skills, careers, and your next best steps.",
  },
  {
    icon: HiBriefcase,
    title: "Career Center",
    description: "Connect with top employers and find the right opportunities.",
  },
  {
    icon: HiUserGroup,
    title: "Jobs & Projects",
    description: "Access remote jobs and projects from U.S. companies.",
  },
];

export const stats = [
  { icon: HiUserGroup, value: "100,000+", label: "Active Learners" },
  { icon: HiOutlineAcademicCap, value: "93%", label: "Course Completion Rate" },
  { icon: HiBriefcase, value: "85%", label: "Simulation-Based Learning" },
  { icon: HiOutlineChartBar, value: "9", label: "Career-Focused Academies" },
  { icon: HiOutlineGlobeAlt, value: "1,500+", label: "Partner Companies" },
];

export const companies = [
  "Amazon",
  "Google",
  "Microsoft",
  "Walmart",
  "Deloitte",
  "PayPal",
  "IBM",
  "Accenture",
];

export const testimonials = [
  {
    quote:
      "The simulations gave me the confidence to apply my skills in a real job. I got hired 2 weeks after completing my course!",
    name: "Daniela R.",
    role: "Data Analyst",
    company: "Amazon",
  },
  {
    quote:
      "SkillBridge helped me switch careers and land a remote job in tech. The AI Coach was a game changer!",
    name: "James L.",
    role: "Software Support Specialist",
    company: "Microsoft",
  },
  {
    quote:
      "The projects and practice here are exactly what employers are looking for. Highly recommended!",
    name: "Maria G.",
    role: "Marketing Specialist",
    company: "HubSpot",
  },
];

export const learnByDoingPoints = [
  "Real-world scenarios",
  "Immediate feedback",
  "Build confidence",
  "Job-ready skills",
];
