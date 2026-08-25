// `tKey` points at the dictionary entry for the label; `label` stays as the
// English fallback so anything still reading it keeps working.
export const navLinks = [
  { tKey: "nav.home", label: "Home", href: "/" },
  {
    tKey: "nav.academies",
    label: "Academies",
    href: "/academies",
    children: [
      { tKey: "nav.englishAcademy", label: "English Academy", href: "/academies" },
      { tKey: "nav.softwareAcademy", label: "Software Academy", href: "/academies" },
      { tKey: "nav.aiAcademy", label: "AI & Data Academy", href: "/academies" },
      { tKey: "nav.allAcademies", label: "All Academies", href: "/academies" },
    ],
  },
  { tKey: "nav.careerPaths", label: "Career Paths", href: "/career-paths" },
  { tKey: "nav.careerAssessment", label: "Career Assessment", href: "/assessment" },
  { tKey: "nav.about", label: "About Us", href: "/about" },
  { tKey: "nav.roadmap", label: "Roadmap", href: "/#roadmap" },
  { tKey: "nav.resources", label: "Resources", href: "/guides" },
  { tKey: "nav.contact", label: "Contact", href: "/contact" },
];

export const footerLinks = [
  {
    tKey: "footer.academies",
    heading: "Academies",
    links: [
      { tKey: "nav.englishAcademy", label: "English Academy", href: "/academies" },
      { tKey: "nav.softwareAcademy", label: "Software Academy", href: "/academies" },
      { tKey: "nav.aiAcademy", label: "AI & Data Academy", href: "/academies" },
      { tKey: "nav.allAcademies", label: "All Academies", href: "/academies" },
    ],
  },
  {
    tKey: "footer.resources",
    heading: "Resources",
    links: [
      { tKey: "footer.blog", label: "Blog", href: "/blog" },
      { tKey: "footer.guides", label: "Guides", href: "/guides" },
      { tKey: "footer.helpCenter", label: "Help Center", href: "/help-center" },
      { tKey: "footer.studentSupport", label: "Student Support", href: "/help-center" },
    ],
  },
  {
    tKey: "footer.company",
    heading: "Company",
    links: [
      { tKey: "footer.about", label: "About Us", href: "/about" },
      { tKey: "footer.careers", label: "Careers", href: "/careers" },
      { tKey: "footer.partners", label: "Partners", href: "/partners" },
      { tKey: "footer.contact", label: "Contact Us", href: "/contact" },
    ],
  },
  {
    tKey: "footer.legal",
    heading: "Legal",
    links: [
      { tKey: "footer.terms", label: "Terms of Use", href: "/terms" },
      { tKey: "footer.privacy", label: "Privacy Policy", href: "/privacy" },
      { tKey: "footer.refunds", label: "Refund Policy", href: "/cookies" },
    ],
  },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "X", href: "https://x.com", icon: "x" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
];
