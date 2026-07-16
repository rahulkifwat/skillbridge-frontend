import {
  HiAcademicCap,
  HiGlobeAlt,
  HiDocumentCheck,
  HiPresentationChartLine,
  HiBookOpen,
  HiSquares2X2,
  HiClipboardDocumentList,
  HiBuildingOffice2,
  HiUserGroup,
} from "react-icons/hi2";

// Hero: four assurances running across the right of the navy band.
export const pricingHeroFeatures = [
  {
    title: "World-Class Education",
    detail: "Learn from industry experts with real-world simulations.",
    icon: HiAcademicCap,
  },
  {
    title: "Global Opportunities",
    detail: "Access remote jobs from top companies worldwide.",
    icon: HiGlobeAlt,
  },
  {
    title: "Industry Certifications",
    detail: "Earn recognized certificates that boost your credibility.",
    icon: HiDocumentCheck,
  },
  {
    title: "Career Support",
    detail: "Get guidance, feedback and support every step of the way.",
    icon: HiPresentationChartLine,
  },
];

// Static billing toggle — "Pay Yearly" is the highlighted side in the design.
export const billingToggle = {
  options: [
    { label: "Pay Monthly", active: false },
    { label: "Pay Yearly", active: true, badge: "Save 20%" },
  ],
  note: "Save 20% when you pay yearly",
};

// The four plan cards. `accent` drives the icon tint, check colour and button.
export const plans = [
  {
    name: "Single Academy",
    tagline: "Access any one academy",
    price: "$50",
    unit: "/month",
    icon: HiBookOpen,
    tint: "bg-violet-100",
    text: "text-violet-700",
    check: "text-violet-500",
    features: [
      "Access to 1 academy of your choice",
      "AI-powered learning platform",
      "Simulations & practical projects",
      "Community & discussion forums",
      "Certificates of completion",
    ],
    cta: { label: "Choose Single Academy", href: "/signup" },
    buttonClass: "bg-violet-700 text-white hover:bg-violet-800",
  },
  {
    name: "All Academies Access",
    tagline: "Access all 9 academies",
    price: "$200",
    unit: "/month",
    billing: "Billed monthly",
    ribbon: "MOST POPULAR",
    featured: true,
    icon: HiSquares2X2,
    tint: "bg-brand",
    text: "text-white",
    check: "text-brand",
    features: [
      "Access to all 9 academies",
      "AI-powered learning platform",
      "Simulations & real-world projects",
      "Career assessment & coaching",
      "Certificates for all completed academies",
      "Priority support",
    ],
    cta: { label: "Choose All Academies", href: "/signup" },
    buttonClass: "bg-brand text-white hover:bg-brand-hover",
  },
  {
    name: "Yearly Access",
    tagline: "Best value for your future",
    price: "$1,920",
    unit: "/year",
    billing: "Billed yearly",
    savePill: "You save $480 (20%)",
    icon: HiClipboardDocumentList,
    tint: "bg-violet-100",
    text: "text-violet-700",
    check: "text-blue-600",
    features: [
      "Access to all 9 academies",
      "AI-powered learning platform",
      "Simulations & real-world projects",
      "Career assessment & coaching",
      "Certificates for all completed academies",
      "Priority support",
    ],
    cta: { label: "Choose Yearly Access", href: "/signup" },
    buttonClass: "border border-border bg-white text-blue-700 hover:bg-surface",
  },
  {
    name: "Enterprise / Group",
    tagline: "For organizations & teams",
    price: "Custom Pricing",
    customPrice: true,
    icon: HiBuildingOffice2,
    tint: "bg-blue-100",
    text: "text-blue-700",
    check: "text-blue-600",
    features: [
      "Custom number of licenses",
      "All academies & platform access",
      "Team progress dashboard",
      "Dedicated account manager",
      "Custom reports & analytics",
      "Priority onboarding & support",
    ],
    cta: { label: "Contact Sales Team", href: "/contact" },
    buttonClass: "bg-blue-800 text-white hover:bg-blue-900",
  },
];

// "All Plans Include" — rendered as a two-column checklist.
export const allPlansInclude = [
  "AI-powered adaptive learning",
  "Interactive simulations (85% learning by doing)",
  "Real-world projects & case studies",
  "Resume & LinkedIn optimization",
  "Interview preparation & soft skills training",
  "Access on web & mobile",
  "Community & peer networking",
  "Job opportunities board",
  "Progress tracking & analytics",
  "24/7 technical support",
];

export const pricingTestimonial = {
  quote:
    "SkillBridge changed my life. From learning new skills to getting my dream remote job at a top U.S. company.",
  name: "Andrés M.",
  role: "Software Developer",
  hiredAt: "Hired at Remote.com",
};

export const pricingCtaStats = [
  { title: "10,000+", detail: "Students Hired Globally", icon: HiUserGroup },
  { title: "120+", detail: "Countries Represented", icon: HiGlobeAlt },
  { title: "2,500+", detail: "Partner Companies", icon: HiBuildingOffice2 },
];
