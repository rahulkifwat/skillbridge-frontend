import {
  HiComputerDesktop,
  HiDocumentCheck,
  HiGlobeAlt,
  HiFaceSmile,
  HiUser,
  HiEnvelope,
  HiPhone,
  HiAcademicCap,
  HiMegaphone,
  HiPresentationChartBar,
  HiChatBubbleLeftRight,
  HiFolderOpen,
  HiIdentification,
  HiDocumentText,
  HiBriefcase,
  HiUsers,
  HiCheckBadge,
  HiBuildingOffice2,
} from "react-icons/hi2";

// Four assurances shown under the hero headline.
export const enrollHeroFeatures = [
  { title: "85% Simulation", icon: HiComputerDesktop },
  { title: "Industry Recognized Certification", icon: HiDocumentCheck },
  { title: "Learn from Anywhere", icon: HiGlobeAlt },
  { title: "Connect to Real Job Opportunities", icon: HiFaceSmile },
];

// Static, read-only enrollment form. Nothing here submits — the fields are
// decoration until the real checkout flow is wired up.
export const enrollFields = [
  { name: "fullName", label: "Full Name", type: "text", icon: HiUser },
  { name: "email", label: "Email Address", type: "text", icon: HiEnvelope },
  { name: "phone", label: "Phone / WhatsApp", type: "text", icon: HiPhone },
  { name: "country", label: "Country", type: "select", icon: HiGlobeAlt },
  { name: "academy", label: "Select Academy", type: "select", icon: HiAcademicCap },
  { name: "referral", label: "How did you hear about us?", type: "select", icon: HiMegaphone },
];

export const enrollAssessment = {
  title: "Initial Assessment",
  note: "(Non-refundable)",
  price: "USD $25",
  detail: "This assessment helps us create your personalized learning path.",
};

export const paymentMethods = ["VISA", "Mastercard", "AMEX", "PayPal"];

export const enrollBenefits = [
  {
    title: "Interactive Learning",
    detail: "Short videos, practical exercises and AI feedback.",
    icon: HiPresentationChartBar,
    tint: "bg-blue-100",
    text: "text-blue-700",
  },
  {
    title: "Real-Life Simulations",
    detail: "Practice in 85% real-world work scenarios.",
    icon: HiChatBubbleLeftRight,
    tint: "bg-emerald-100",
    text: "text-emerald-700",
  },
  {
    title: "Build Your Portfolio",
    detail: "Complete projects that showcase your real skills.",
    icon: HiFolderOpen,
    tint: "bg-amber-100",
    text: "text-amber-700",
  },
  {
    title: "Career Preparation",
    detail: "Resume, LinkedIn, interviews and workplace skills.",
    icon: HiIdentification,
    tint: "bg-violet-100",
    text: "text-violet-700",
  },
  {
    title: "Certified Skills",
    detail: "Earn a digital certificate recognized by employers.",
    icon: HiDocumentText,
    tint: "bg-teal-100",
    text: "text-teal-700",
  },
  {
    title: "Job Opportunities",
    detail: "Get connected with companies looking for global talent.",
    icon: HiBriefcase,
    tint: "bg-rose-100",
    text: "text-rose-700",
  },
];

export const enrollStats = [
  { value: "2,500+", label: "Students Enrolled", icon: HiUsers },
  { value: "95%", label: "Satisfaction Rate", icon: HiCheckBadge },
  { value: "200+", label: "Partner Companies", icon: HiBuildingOffice2 },
  { value: "15+", label: "Countries Represented", icon: HiGlobeAlt },
];
