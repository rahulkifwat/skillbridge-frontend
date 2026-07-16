import {
  HiAcademicCap,
  HiArrowPath,
  HiArrowTrendingUp,
  HiBriefcase,
  HiBuildingLibrary,
  HiBuildingOffice2,
  HiComputerDesktop,
  HiCpuChip,
  HiDocumentCheck,
  HiGlobeAlt,
  HiStar,
  HiUsers,
} from "react-icons/hi2";

// Audience-routing personas. `color` is the per-persona accent applied inline
// (icon circle, title, CTA button) — these are intentionally outside the teal
// token palette, matching the mockup's colour-coded persona cards.
export const personas = [
  {
    id: "high-school",
    title: "High School Student",
    subtitle: "Grades 9–12",
    color: "#1d4ed8",
    icon: HiAcademicCap,
    description:
      "Prepare for college and future careers. Build strong foundations for success.",
    cta: "I'm a High School Student",
    href: "/academies",
  },
  {
    id: "technical-institute",
    title: "Technical Institute Student",
    color: "#0d9488",
    icon: HiBuildingLibrary,
    description:
      "Gain practical skills, industry certifications, and real-world experience.",
    cta: "I'm in a Technical Institute",
    href: "/academies",
  },
  {
    id: "college",
    title: "College / University Student",
    color: "#047857",
    icon: HiAcademicCap,
    description:
      "Enhance your skills, build your resume, and prepare for the job market.",
    cta: "I'm a College Student",
    href: "/academies",
  },
  {
    id: "professional",
    title: "Working Professional",
    color: "#ea580c",
    icon: HiBriefcase,
    description:
      "Upskill, stay relevant, and advance in your career with in-demand skills.",
    cta: "I'm a Working Professional",
    href: "/academies",
  },
  {
    id: "career-changer",
    title: "Career Changer",
    color: "#7c3aed",
    icon: HiArrowPath,
    description: "Learn new skills, switch careers, and build a brighter future.",
    cta: "I'm Changing Careers",
    href: "/academies",
  },
  {
    id: "employer",
    title: "Employer",
    color: "#1e3a8a",
    icon: HiBuildingOffice2,
    description:
      "Find skilled talent, train your teams, and drive your organization forward.",
    cta: "I'm an Employer",
    href: "/academies",
  },
  {
    id: "administrator",
    title: "School / University Administrator",
    color: "#6d28d9",
    icon: HiBuildingLibrary,
    description: "Bring SkillBridge to your institution and empower your students.",
    cta: "I'm an Administrator",
    href: "/academies",
  },
];

export const welcomeFeatures = [
  {
    title: "AI-Powered Learning",
    description: "Personalized learning paths and AI tutors.",
    icon: HiCpuChip,
  },
  {
    title: "85% Real-World Simulations",
    description:
      "Practice in realistic scenarios that prepare you for the real world.",
    icon: HiComputerDesktop,
  },
  {
    title: "Industry-Recognized Certifications",
    description:
      "Earn respected certificates that boost your career opportunities.",
    icon: HiDocumentCheck,
  },
  {
    title: "Learn From Anywhere",
    description:
      "Access world-class education from any device, anytime, anywhere.",
    icon: HiGlobeAlt,
  },
  {
    title: "Better Skills. Better Opportunities.",
    description:
      "Build the skills employers need and grow your career with confidence.",
    icon: HiArrowTrendingUp,
  },
];

export const welcomeStats = [
  { value: "+100", label: "Countries", color: "#1d4ed8", icon: HiUsers },
  { value: "+1M", label: "Learners", color: "#0d9488", icon: HiAcademicCap },
  {
    value: "+5,000",
    label: "Partner Institutions",
    color: "#047857",
    icon: HiBuildingLibrary,
  },
  {
    value: "+10,000",
    label: "Employer Partners",
    color: "#ea580c",
    icon: HiBriefcase,
  },
  {
    value: "Millions",
    label: "Opportunities Created",
    color: "#7c3aed",
    icon: HiStar,
  },
];
