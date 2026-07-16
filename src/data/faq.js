import {
  HiAcademicCap,
  HiComputerDesktop,
  HiCurrencyDollar,
  HiCalendarDays,
  HiCheckBadge,
  HiBriefcase,
  HiUser,
  HiShieldCheck,
  HiUsers,
  HiGlobeAlt,
  HiStar,
} from "react-icons/hi2";

// The 8 FAQ cards. Static content — the "+" affordance in the design is
// decorative, these do not expand.
export const faqs = [
  {
    question: "What is SkillBridge EdTech?",
    answer:
      "SkillBridge EdTech is an online learning platform that prepares you with in-demand skills through 85% real-life simulations and hands-on practice to help you get real job opportunities.",
    icon: HiAcademicCap,
  },
  {
    question: "How do the academies and simulations work?",
    answer:
      "Our academies combine short lessons with interactive exercises and real-life simulations (85% of the learning experience) that recreate actual workplace scenarios to build your practical skills.",
    icon: HiComputerDesktop,
  },
  {
    question: "How much does it cost?",
    answer:
      "You can access all 7 academies for USD 200. Or you can enroll in any academy individually for USD 50 each.",
    icon: HiCurrencyDollar,
  },
  {
    question: "How long do I have access to the academies?",
    answer:
      "You have 12 months of access to complete the academy at your own pace, with 24/7 access from any device.",
    icon: HiCalendarDays,
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Yes! When you complete an academy and pass the final assessment with a minimum score of 85%, you will receive a digital certificate and a skills report.",
    icon: HiCheckBadge,
  },
  {
    question: "Will this help me get a job?",
    answer:
      "Yes. We provide career preparation, resume and LinkedIn guidance, interview practice, and connect you with our network of partner companies.",
    icon: HiBriefcase,
  },
  {
    question: "Who can join SkillBridge EdTech?",
    answer:
      "Anyone from Latin America, the Caribbean, Africa and other regions who wants to build real skills and opportunities for a global career.",
    icon: HiUser,
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use secure and encrypted payment processes to protect your personal and financial information.",
    icon: HiShieldCheck,
  },
];

// Bottom trust row.
export const trustStats = [
  {
    value: "Trusted by students",
    label: "and partners worldwide",
    icon: HiShieldCheck,
  },
  { value: "2,500+", label: "Students Enrolled", icon: HiUsers },
  { value: "15+", label: "Countries Represented", icon: HiGlobeAlt },
  { value: "4.9 / 5", label: "Student Rating", icon: HiStar },
];
