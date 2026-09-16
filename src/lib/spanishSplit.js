export const ACADEMY_SPANISH = "spanish";
export const SPANISH_ACADEMY_HOME = "/spanish-academy";

const SPANISH_ALLOWED_PREFIXES = [
  "/spanish-academy",
  "/spanish",
  "/login",
  "/signup",
  "/forgot-password",
  "/contact",
  "/about",
  "/help-center",
  "/faq",
  "/pricing",
  "/privacy",
  "/terms",
  "/cookies",
];

const SPANISH_BLOCKED_PREFIXES = [
  "/academies",
  "/assessment",
  "/career-assessment",
  "/career-paths",
  "/student",
  "/my-space",
  "/engineer",
  "/job-opportunities",
  "/exam",
  "/home",
  "/certifications",
  "/success-stories",
  "/launch",
  "/welcome",
  "/enroll",
  "/instructor",
  "/employer",
  "/admin",
  "/partner",
  "/super-admin",
];

export function isSpanishAcademyUser(user) {
  return Boolean(user && user.academy === ACADEMY_SPANISH);
}

function pathMatches(pathname, prefixes) {
  if (!pathname) return false;
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function isSpanishAllowedPath(pathname) {
  return pathMatches(pathname, SPANISH_ALLOWED_PREFIXES);
}

export function isSpanishBlockedPath(pathname) {
  if (pathname === "/") return true;
  if (isSpanishAllowedPath(pathname)) return false;
  return pathMatches(pathname, SPANISH_BLOCKED_PREFIXES);
}

export function landingForUser(user) {
  if (isSpanishAcademyUser(user)) return SPANISH_ACADEMY_HOME;
  const role = user?.role;
  if (role === "instructor") return "/instructor";
  if (role === "employer") return "/employer";
  if (role === "administrator") return "/admin";
  if (role === "partner") return "/partner";
  if (role === "super_admin") return "/super-admin";
  return "/student";
}

export const spanishNavLinks = [
  { tKey: "nav.home", label: "Home", href: SPANISH_ACADEMY_HOME },
  { tKey: "nav.spanishAcademy", label: "Spanish Academy", href: SPANISH_ACADEMY_HOME },
  { tKey: "nav.spanishDiagnostic", label: "Spanish Diagnostic", href: "/spanish/assessment" },
  { tKey: "nav.spanishDashboard", label: "Dashboard", href: "/spanish/dashboard" },
  { tKey: "nav.about", label: "About Us", href: "/about" },
  { tKey: "nav.contact", label: "Contact", href: "/contact" },
];

export const spanishFooterLinks = [
  {
    tKey: "footer.academies",
    heading: "Spanish Academy",
    links: [
      { tKey: "nav.spanishAcademy", label: "Spanish Academy", href: SPANISH_ACADEMY_HOME },
      { tKey: "nav.spanishDiagnostic", label: "Spanish Diagnostic", href: "/spanish/assessment" },
      { tKey: "nav.spanishDashboard", label: "Dashboard", href: "/spanish/dashboard" },
    ],
  },
  {
    tKey: "footer.resources",
    heading: "Resources",
    links: [
      { tKey: "footer.helpCenter", label: "Help Center", href: "/help-center" },
      { tKey: "footer.studentSupport", label: "Student Support", href: "/help-center" },
    ],
  },
  {
    tKey: "footer.company",
    heading: "Company",
    links: [
      { tKey: "footer.about", label: "About Us", href: "/about" },
      { tKey: "footer.contact", label: "Contact Us", href: "/contact" },
    ],
  },
  {
    tKey: "footer.legal",
    heading: "Legal",
    links: [
      { tKey: "footer.terms", label: "Terms of Use", href: "/terms" },
      { tKey: "footer.privacy", label: "Privacy Policy", href: "/privacy" },
    ],
  },
];
