import {
  HiCheckBadge,
  HiArrowTrendingUp,
  HiGlobeAlt,
  HiShare,
  HiAcademicCap,
  HiUsers,
  HiHandThumbUp,
  HiSquares2X2,
  HiCodeBracket,
  HiCpuChip,
  HiBuildingOffice2,
  HiChatBubbleLeftRight,
  HiBriefcase,
  HiCloud,
  HiShieldCheck,
  HiMegaphone,
  HiSwatch,
  HiChartBar,
  HiLockClosed,
  HiCheckCircle,
  HiBookOpen,
  HiClipboardDocumentCheck,
  HiGlobeAmericas,
  HiSparkles,
} from "react-icons/hi2";

// Hero: four value props shown under the headline.
export const heroFeatures = [
  {
    title: "Industry Recognized",
    detail: "Certifications trusted by top companies",
    icon: HiCheckBadge,
  },
  {
    title: "Boost Your Career",
    detail: "Increase your earning potential and visibility",
    icon: HiArrowTrendingUp,
  },
  {
    title: "Global Advantage",
    detail: "Stand out in the global remote job market",
    icon: HiGlobeAlt,
  },
  {
    title: "Share & Showcase",
    detail: "Add to LinkedIn, resume and your portfolio",
    icon: HiShare,
  },
];

// Hero: the three stats stacked on the far right.
export const heroStats = [
  { value: "100+", label: "Certifications Available", icon: HiAcademicCap },
  { value: "50K+", label: "Students Certified", icon: HiUsers },
  { value: "95%", label: "Employers Recommend Our Certifications", icon: HiHandThumbUp },
];

// The certificate preview mock rendered in the centre of the hero.
export const certificatePreview = {
  brand: "SkillBridge",
  brandSub: "EdTech",
  title: "CERTIFICATE",
  subtitle: "OF ACHIEVEMENT",
  intro: "This is to certify that",
  recipient: "Maria Fernanda Gomez",
  completion: "has successfully completed the requirements for",
  program: "AI & Data Analyst Certification",
  recognition: "and is now recognized as a",
  designation: "Certified AI & Data Analyst",
  date: "May 18, 2024",
  dateLabel: "Date",
  signatory: "Gerardo Mosquera",
  signatoryRole: "CEO, SkillBridge EdTech",
};

// "Certifications by Type" tab row. `active` drives the static selected state.
export const certificationTypes = [
  { name: "All Certifications", icon: HiSquares2X2, active: true },
  { name: "Technology", icon: HiCodeBracket },
  { name: "Data & AI", icon: HiCpuChip },
  { name: "Business", icon: HiBuildingOffice2 },
  { name: "Communication", icon: HiChatBubbleLeftRight },
  { name: "Career Readiness", icon: HiBriefcase },
  { name: "Cloud Computing", icon: HiCloud },
  { name: "Cybersecurity", icon: HiShieldCheck },
  { name: "Marketing", icon: HiMegaphone },
  { name: "Design", icon: HiSwatch },
];

// "Featured Certifications" cards. `partnerClass` styles the text-only
// partner logo (no image assets exist in this project).
export const featuredCertifications = [
  {
    title: "Software Developer Certification",
    description: "Validate your coding skills and build real-world applications.",
    level: "Intermediate",
    duration: "3 - 6 Months",
    partner: "aws",
    partnerClass: "text-[15px] font-bold lowercase tracking-tight text-slate-900",
    icon: HiCodeBracket,
    tint: "bg-violet-500",
  },
  {
    title: "AI & Machine Learning Certification",
    description: "Master AI concepts, tools and machine learning algorithms.",
    level: "Advanced",
    duration: "4 - 7 Months",
    partner: "NVIDIA",
    partnerClass: "text-[13px] font-bold uppercase tracking-tight text-green-600",
    icon: HiCpuChip,
    tint: "bg-emerald-600",
  },
  {
    title: "Data Analyst Certification",
    description: "Analyze data, build insights and make data-driven decisions.",
    level: "Intermediate",
    duration: "3 - 5 Months",
    partner: "Microsoft",
    partnerClass: "text-[13px] font-semibold text-slate-700",
    icon: HiChartBar,
    tint: "bg-orange-500",
  },
  {
    title: "Cloud Computing Certification",
    description: "Learn cloud platforms and deployment best practices.",
    level: "Intermediate",
    duration: "3 - 6 Months",
    partner: "Google Cloud",
    partnerClass: "text-[13px] font-medium text-blue-600",
    icon: HiCloud,
    tint: "bg-blue-600",
  },
  {
    title: "Cybersecurity Certification",
    description: "Protect systems, networks and data from cyber threats.",
    level: "Advanced",
    duration: "4 - 7 Months",
    partner: "CompTIA",
    partnerClass: "text-[13px] font-bold text-red-600",
    icon: HiLockClosed,
    tint: "bg-purple-600",
  },
  {
    title: "Remote Work Professional Certification",
    description: "Excel in remote teams and virtual work environments.",
    level: "Beginner",
    duration: "2 - 4 Months",
    partner: "SkillBridge",
    partnerClass: "text-[13px] font-semibold text-heading",
    icon: HiUsers,
    tint: "bg-teal-600",
  },
];

// Level pill colours, keyed by the `level` values above.
export const levelStyles = {
  Beginner: "bg-emerald-50 text-emerald-700",
  Intermediate: "bg-amber-50 text-amber-700",
  Advanced: "bg-blue-50 text-blue-700",
};

// "Your Certification Journey" — 5 steps joined by dashed connectors.
export const journeySteps = [
  {
    n: 1,
    title: "Choose",
    detail: "Select the right certification for your career goals.",
    icon: HiCheckCircle,
    done: true,
  },
  {
    n: 2,
    title: "Learn",
    detail: "Complete courses, practice and real-world projects.",
    icon: HiBookOpen,
  },
  {
    n: 3,
    title: "Assess",
    detail: "Pass the assessment and demonstrate your skills.",
    icon: HiClipboardDocumentCheck,
  },
  {
    n: 4,
    title: "Get Certified",
    detail: "Earn your industry-recognized certificate.",
    icon: HiAcademicCap,
  },
  {
    n: 5,
    title: "Get Hired",
    detail: "Stand out to employers and land your dream job.",
    icon: HiBriefcase,
  },
];

export const journeyProgress = {
  percent: 75,
  title: "Keep Going!",
  detail: "You are on your way to becoming certified.",
};

// "Certifications Earned by Our Students" carousel cards (static).
export const studentCertifications = [
  {
    name: "Carlos M.",
    certification: "AI & Data Analyst Certification",
    outcome: "Now working as a Data Analyst at RemoteCo",
    increase: "+120%",
    tint: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    name: "Ana P.",
    certification: "Cloud Computing Certification",
    outcome: "Now working as a Cloud Engineer at CloudTech",
    increase: "+95%",
    tint: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    name: "Juan D.",
    certification: "Cybersecurity Certification",
    outcome: "Now working as a Security Analyst at SecureNet",
    increase: "+110%",
    tint: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    name: "Mariana R.",
    certification: "Digital Marketing Certification",
    outcome: "Now working as a Marketing Specialist at GlobalMKT",
    increase: "+80%",
    tint: "bg-orange-50",
    text: "text-orange-600",
  },
];

// "Our Certification Partners" — text-only logos, styled per brand.
export const certificationPartners = [
  { name: "aws", className: "text-2xl font-bold lowercase tracking-tight text-slate-900" },
  { name: "Microsoft", className: "text-xl font-semibold text-slate-700" },
  { name: "Google Cloud", className: "text-xl font-medium text-blue-600" },
  { name: "NVIDIA", className: "text-lg font-bold uppercase tracking-tight text-green-600" },
  { name: "CompTIA", className: "text-xl font-bold text-red-600" },
  { name: "IBM", className: "text-2xl font-bold tracking-widest text-blue-700" },
  { name: "Meta", className: "text-xl font-semibold text-blue-600" },
  { name: "HubSpot Academy", className: "text-lg font-semibold text-orange-600" },
];

// Closing CTA assurances.
export const ctaAssurances = [
  { title: "Globally Recognized Certificates", icon: HiCheckBadge },
  { title: "Increase Your Earning Potential", icon: HiArrowTrendingUp },
  { title: "Stand Out to Top Employers", icon: HiSparkles },
  { title: "Unlock Global Opportunities", icon: HiGlobeAmericas },
];
