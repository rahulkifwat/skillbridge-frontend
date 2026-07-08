export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Assessment", href: "/assessment" },
  { label: "Learning Academy", href: "/learning-academy" },
  {
    label: "Simulations",
    href: "/simulations",
    children: [
      { label: "Business Simulations", href: "/simulations/business" },
      { label: "Tech Simulations", href: "/simulations/tech" },
      { label: "Sales Simulations", href: "/simulations/sales" },
    ],
  },
  { label: "AI Coach", href: "/ai-coach" },
  { label: "Career Center", href: "/career-center" },
  { label: "Jobs", href: "/jobs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Assessment", href: "/assessment" },
      { label: "Learning Academy", href: "/learning-academy" },
      { label: "Simulations", href: "/simulations" },
      { label: "AI Coach", href: "/ai-coach" },
      { label: "Career Center", href: "/career-center" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Help Center", href: "/help-center" },
      { label: "Guides", href: "/guides" },
      { label: "Webinars", href: "/webinars" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Mission", href: "/mission" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
];
