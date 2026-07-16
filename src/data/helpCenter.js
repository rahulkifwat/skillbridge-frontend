import {
  HiChatBubbleLeftRight,
  HiEnvelope,
  HiPhone,
  HiAcademicCap,
  HiComputerDesktop,
  HiClipboardDocumentCheck,
  HiCheckBadge,
  HiBriefcase,
  HiCreditCard,
  HiUserCircle,
  HiShieldCheck,
  HiLockClosed,
  HiClock,
  HiUsers,
  HiStar,
} from "react-icons/hi2";

// Floating "Need More Help?" card in the hero.
export const supportChannels = [
  {
    title: "Live Chat",
    detail: "Chat with us in real time",
    icon: HiChatBubbleLeftRight,
  },
  {
    title: "Email Support",
    detail: "support@skillbridge.com",
    icon: HiEnvelope,
  },
  {
    title: "Phone Support",
    detail: "+1 (888) 741-7330",
    icon: HiPhone,
  },
];

// "Browse by Topic" — 8 cards. Accent classes are written out in full so
// Tailwind can see them at build time.
export const topics = [
  {
    title: "Getting Started",
    description: "New to SkillBridge? Start here and learn the basics.",
    articles: 12,
    href: "/help-center",
    icon: HiAcademicCap,
    accent: "text-violet-600",
  },
  {
    title: "Academies & Courses",
    description: "Learn about our academies, courses and learning paths.",
    articles: 18,
    href: "/help-center",
    icon: HiComputerDesktop,
    accent: "text-emerald-600",
  },
  {
    title: "Assessments",
    description: "Get help with career assessments and tests.",
    articles: 10,
    href: "/help-center",
    icon: HiClipboardDocumentCheck,
    accent: "text-blue-600",
  },
  {
    title: "Certifications",
    description: "Everything you need to know about certifications.",
    articles: 14,
    href: "/help-center",
    icon: HiCheckBadge,
    accent: "text-orange-500",
  },
  {
    title: "Job Opportunities",
    description: "Find answers about job search and applications.",
    articles: 16,
    href: "/help-center",
    icon: HiBriefcase,
    accent: "text-brand",
  },
  {
    title: "Payments & Billing",
    description: "Payment methods, plans, invoices and refunds.",
    articles: 11,
    href: "/help-center",
    icon: HiCreditCard,
    accent: "text-violet-600",
  },
  {
    title: "Account & Profile",
    description: "Manage your account, profile and preferences.",
    articles: 15,
    href: "/help-center",
    icon: HiUserCircle,
    accent: "text-blue-600",
  },
  {
    title: "Technical Support",
    description: "Get help with platform issues and technical questions.",
    articles: 22,
    href: "/help-center",
    icon: HiShieldCheck,
    accent: "text-emerald-600",
  },
];

// "Popular Articles" card.
export const popularArticles = [
  { title: "How to create your account", href: "/help-center" },
  { title: "How to choose the right academy", href: "/help-center" },
  { title: "How career assessments work", href: "/help-center" },
  { title: "How to earn a certification", href: "/help-center" },
  { title: "How to apply for jobs", href: "/help-center" },
];

// "Video Tutorials" card. No video assets exist — the thumbnail renders as a
// styled placeholder box.
export const featuredTutorial = {
  title: "Getting Started with SkillBridge",
  duration: "5:24",
};

// "System Status" card.
export const systemStatus = [
  { name: "Learning Platform", status: "Operational" },
  { name: "Assessments", status: "Operational" },
  { name: "Certifications", status: "Operational" },
  { name: "Job Board", status: "Operational" },
  { name: "Payment System", status: "Operational" },
];

// Bottom assurance row.
export const assurances = [
  {
    title: "Safe & Secure",
    detail: "Your data is protected with enterprise-grade security.",
    icon: HiShieldCheck,
  },
  {
    title: "Privacy First",
    detail: "We respect your privacy and never share your information.",
    icon: HiLockClosed,
  },
  {
    title: "24/7 Support",
    detail: "Get help anytime, anywhere from our global support team.",
    icon: HiClock,
  },
  {
    title: "10,000+ Students Helped",
    detail:
      "Join thousands of students achieving their career goals with SkillBridge.",
    icon: HiUsers,
  },
  {
    title: "4.9/5 Average Rating",
    detail:
      "Our students love the support and experience we provide. (1,200+ reviews)",
    icon: HiStar,
  },
];
