import {
  HiShieldCheck,
  HiGlobeAlt,
  HiCurrencyDollar,
  HiBriefcase,
  HiBuildingOffice2,
  HiGlobeAmericas,
  HiClipboardDocumentCheck,
  HiAcademicCap,
} from "react-icons/hi2";

// Hero: three value props shown under the headline.
export const heroFeatures = [
  {
    icon: HiShieldCheck,
    title: "Verified Employers",
    detail: "100% legitimate companies",
  },
  {
    icon: HiGlobeAlt,
    title: "Work from Anywhere",
    detail: "Remote & hybrid opportunities",
  },
  {
    icon: HiCurrencyDollar,
    title: "Competitive Salaries",
    detail: "Paid in USD & other strong currencies",
  },
];

// Filter bar. Every control is static decoration (readOnly / disabled).
export const filterFields = [
  { label: "Job Title or Keyword", type: "text", value: "e.g. Software Developer" },
  { label: "Country", type: "select", value: "All Countries", icon: HiGlobeAlt },
  { label: "Salary Range", type: "select", value: "Any Salary" },
  { label: "Work Type", type: "select", value: "Remote / Hybrid" },
  { label: "English Level", type: "select", value: "Any Level" },
  { label: "Experience Level", type: "select", value: "Any Experience" },
];

// Company "logos" are styled text — no image assets exist in this project.
export const featuredJobs = [
  {
    title: "Software Developer",
    company: "Microsoft",
    logoText: "Microsoft",
    logoClass: "text-[15px] font-semibold tracking-tight text-slate-700",
    salary: "$70,000 - $120,000 USD",
    country: "United States",
    flag: "🇺🇸",
    workType: "Remote",
    english: "B2+",
    experience: "2-5 Years",
  },
  {
    title: "AI Prompt Engineer",
    company: "OpenAI",
    logoText: "OpenAI",
    logoClass: "text-[15px] font-semibold tracking-tight text-slate-900",
    salary: "$80,000 - $140,000 USD",
    country: "United States",
    flag: "🇺🇸",
    workType: "Remote",
    english: "C1",
    experience: "2-4 Years",
  },
  {
    title: "Data Analyst",
    company: "Amazon",
    logoText: "amazon",
    logoClass: "text-[16px] font-bold tracking-tight text-slate-900",
    salary: "$60,000 - $95,000 USD",
    country: "Canada",
    flag: "🇨🇦",
    workType: "Remote",
    english: "B2+",
    experience: "1-3 Years",
  },
  {
    title: "Cybersecurity Analyst",
    company: "Palo Alto Networks",
    logoText: "paloalto",
    logoClass: "text-[15px] font-bold tracking-tight text-orange-600",
    salary: "$75,000 - $115,000 USD",
    country: "United States",
    flag: "🇺🇸",
    workType: "Remote",
    english: "B2+",
    experience: "2-4 Years",
  },
  {
    title: "Cloud Support Specialist",
    company: "Google Cloud",
    logoText: "Google Cloud",
    logoClass: "text-[14px] font-semibold tracking-tight text-blue-600",
    salary: "$55,000 - $85,000 USD",
    country: "Ireland",
    flag: "🇮🇪",
    workType: "Remote",
    english: "B2",
    experience: "1-3 Years",
  },
  {
    title: "Digital Marketing Specialist",
    company: "HubSpot",
    logoText: "HubSpot",
    logoClass: "text-[15px] font-semibold tracking-tight text-orange-500",
    salary: "$50,000 - $80,000 USD",
    country: "United States",
    flag: "🇺🇸",
    workType: "Remote",
    english: "B2",
    experience: "1-3 Years",
  },
  {
    title: "UX / UI Designer",
    company: "Figma",
    logoText: "Figma",
    logoClass: "text-[15px] font-semibold tracking-tight text-slate-900",
    salary: "$60,000 - $100,000 USD",
    country: "Portugal",
    flag: "🇵🇹",
    workType: "Remote",
    english: "B2+",
    experience: "2-4 Years",
  },
  {
    title: "Customer Success Specialist",
    company: "Salesforce",
    logoText: "salesforce",
    logoClass:
      "rounded-full bg-sky-500 px-2.5 py-1 text-[11px] font-semibold italic text-white",
    salary: "$55,000 - $90,000 USD",
    country: "Australia",
    flag: "🇦🇺",
    workType: "Remote",
    english: "B2",
    experience: "1-3 Years",
  },
  {
    title: "IT Support Specialist",
    company: "Dell Technologies",
    logoText: "DELL",
    logoClass:
      "inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-700 text-[9px] font-bold tracking-tight text-blue-700",
    salary: "$45,000 - $70,000 USD",
    country: "Philippines",
    flag: "🇵🇭",
    workType: "Remote",
    english: "B2",
    experience: "1-2 Years",
  },
  {
    title: "Project Coordinator",
    company: "Asana",
    logoText: "Asana",
    logoClass: "text-[15px] font-semibold tracking-tight text-rose-500",
    salary: "$50,000 - $75,000 USD",
    country: "United Kingdom",
    flag: "🇬🇧",
    workType: "Remote",
    english: "B2+",
    experience: "2-4 Years",
  },
];

export const recommendedJobs = [
  {
    title: "Frontend Developer",
    company: "Airbnb",
    logoText: "airbnb",
    logoClass: "text-[13px] font-semibold tracking-tight text-rose-500",
    salary: "$65,000 - $95,000 USD",
    location: "Remote • Spain",
    experience: "2-4 Years",
  },
  {
    title: "Business Analyst",
    company: "Accenture",
    logoText: "accenture",
    logoClass: "text-[13px] font-semibold tracking-tight text-violet-600",
    salary: "$55,000 - $85,000 USD",
    location: "Remote • Mexico",
    experience: "1-3 Years",
  },
  {
    title: "Machine Learning Engineer",
    company: "NVIDIA",
    logoText: "NVIDIA",
    logoClass: "text-[13px] font-bold tracking-tight text-green-600",
    salary: "$90,000 - $150,000 USD",
    location: "Remote • Germany",
    experience: "3-5 Years",
  },
  {
    title: "Technical Writer",
    company: "Atlassian",
    logoText: "Atlassian",
    logoClass: "text-[13px] font-semibold tracking-tight text-blue-600",
    salary: "$50,000 - $75,000 USD",
    location: "Remote • Canada",
    experience: "1-3 Years",
  },
];

export const hiringRegions = [
  { name: "North America", percent: 48 },
  { name: "Europe", percent: 28 },
  { name: "Asia", percent: 16 },
  { name: "South America", percent: 5 },
  { name: "Oceania", percent: 3 },
];

export const jobStats = [
  { icon: HiBriefcase, value: "25,000+", label: "Active Job Opportunities" },
  { icon: HiBuildingOffice2, value: "2,500+", label: "Hiring Companies" },
  { icon: HiGlobeAlt, value: "120+", label: "Countries Hiring" },
  { icon: HiCurrencyDollar, value: "$65,000", label: "Avg. Salary (USD)" },
];

export const topCompanies = [
  { name: "Microsoft", logoText: "Microsoft", logoClass: "text-lg font-semibold tracking-tight text-slate-700" },
  { name: "Google", logoText: "Google", logoClass: "text-lg font-semibold tracking-tight text-blue-600" },
  { name: "Amazon", logoText: "amazon", logoClass: "text-lg font-bold tracking-tight text-slate-900" },
  { name: "Meta", logoText: "meta", logoClass: "text-lg font-semibold tracking-tight text-slate-900" },
  { name: "Salesforce", logoText: "salesforce", logoClass: "text-base font-semibold italic tracking-tight text-sky-500" },
  { name: "IBM", logoText: "IBM", logoClass: "text-lg font-bold tracking-[0.08em] text-blue-700" },
  { name: "Airbnb", logoText: "airbnb", logoClass: "text-lg font-semibold tracking-tight text-rose-500" },
  { name: "NVIDIA", logoText: "NVIDIA", logoClass: "text-lg font-bold tracking-tight text-green-600" },
  { name: "Dell Technologies", logoText: "Dell Technologies", logoClass: "text-sm font-semibold tracking-tight text-blue-700" },
  { name: "Accenture", logoText: "accenture", logoClass: "text-lg font-semibold tracking-tight text-violet-600" },
];

export const ctaAssurances = [
  {
    icon: HiClipboardDocumentCheck,
    title: "Free Career Assessment",
    detail: "Discover your best path",
  },
  {
    icon: HiAcademicCap,
    title: "Personalized Learning",
    detail: "Tailored to your goals",
  },
  {
    icon: HiShieldCheck,
    title: "Industry Certifications",
    detail: "Boost your employability",
  },
  {
    icon: HiGlobeAmericas,
    title: "Global Job Access",
    detail: "Work from anywhere",
  },
];
