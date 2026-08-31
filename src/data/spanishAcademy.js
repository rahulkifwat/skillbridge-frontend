import {
  HiAcademicCap,
  HiArrowPath,
  HiBanknotes,
  HiBriefcase,
  HiBuildingStorefront,
  HiChatBubbleLeftRight,
  HiChartBar,
  HiCheckBadge,
  HiClipboardDocumentCheck,
  HiCpuChip,
  HiGlobeAlt,
  HiGlobeAmericas,
  HiHeart,
  HiLifebuoy,
  HiLightBulb,
  HiMap,
  HiPaperAirplane,
  HiPresentationChartLine,
  HiSparkles,
  HiUserGroup,
  HiUsers,
} from "react-icons/hi2";

/**
 * Structure for the Spanish Academy landing page (/spanish).
 *
 * Copy lives in the i18n dictionaries under `spanish.*`; this file only holds
 * the keys, icons, and ordering so the page renders identically in every
 * language. Source: document/Skillbridge_Spanish_Academy_Brief (1).docx and
 * the accompanying "spanish aca" reference layout.
 */

// Hero pillars — the four badges down the left of the reference layout.
export const PILLARS = [
  { key: "simulations", icon: HiChatBubbleLeftRight },
  { key: "cultural", icon: HiGlobeAmericas },
  { key: "professional", icon: HiBriefcase },
  { key: "certification", icon: HiCheckBadge },
];

// "Spanish for real life and real careers" band.
export const CONTEXTS = [
  { key: "business", icon: HiPresentationChartLine, color: "#1d4ed8" },
  { key: "healthcare", icon: HiHeart, color: "#047857" },
  { key: "customerService", icon: HiLifebuoy, color: "#c2410c" },
  { key: "travel", icon: HiPaperAirplane, color: "#0d9488" },
  { key: "trade", icon: HiBanknotes, color: "#6d28d9" },
];

// "Learn by doing — 85% practice, 15% theory".
export const PRACTICE_POINTS = [
  { key: "tutor", icon: HiCpuChip },
  { key: "simulations", icon: HiUserGroup },
  { key: "feedback", icon: HiArrowPath },
  { key: "progress", icon: HiChartBar },
  { key: "results", icon: HiSparkles },
];

// Cultural training for Latin America.
export const CULTURAL_TRAINING = [
  { key: "etiquette", icon: HiUsers },
  { key: "styles", icon: HiChatBubbleLeftRight },
  { key: "customs", icon: HiBuildingStorefront },
  { key: "insights", icon: HiMap },
];

// Country-specific modules. Rendered by <CountryFlag country={key} />.
export const COUNTRIES = ["mexico", "colombia", "argentina", "chile", "peru", "more"];

// The eight-phase cycle from the brief's core educational philosophy.
export const JOURNEY = [
  { key: "assess", icon: HiClipboardDocumentCheck },
  { key: "personalize", icon: HiSparkles },
  { key: "learn", icon: HiAcademicCap },
  { key: "practice", icon: HiArrowPath },
  { key: "simulate", icon: HiUserGroup },
  { key: "feedback", icon: HiLightBulb },
  { key: "improve", icon: HiChartBar },
  { key: "demonstrate", icon: HiCheckBadge },
];

/**
 * Adaptive immersion matrix (brief §3). `spanish` is the share of the
 * interface and instructions delivered in Spanish at each assigned level.
 */
export const IMMERSION_LEVELS = [
  { key: "level0", spanish: 0 },
  { key: "a1", spanish: 10 },
  { key: "a2", spanish: 40 },
  { key: "b1", spanish: 70 },
  { key: "b2", spanish: 90 },
  { key: "c1", spanish: 100 },
];

// Specialty tracks the assessment can route a student into (brief §4).
export const TRACKS = [
  { key: "healthcare", icon: HiHeart },
  { key: "lawEnforcement", icon: HiCheckBadge },
  { key: "business", icon: HiBriefcase },
  { key: "remote", icon: HiGlobeAlt },
];

// The value strip along the bottom of the reference layout.
export const VALUE_STRIP = [
  { key: "audience", icon: HiUsers },
  { key: "anywhere", icon: HiGlobeAlt },
  { key: "levels", icon: HiChartBar },
  { key: "impact", icon: HiSparkles },
];
