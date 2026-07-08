# SkillBridge Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the SkillBridge home page (`/`) to match `public/SKILL FRONTEND.png` pixel-for-pixel, with a componentized Navbar/Footer/section structure, a theme-token-driven design system, and working routes for every nav/footer link.

**Architecture:** Next.js App Router. A `(public)` route group supplies shared `Navbar` + `Footer` chrome to the home page and all placeholder marketing pages; an `(auth)` route group supplies a minimal chrome for login/signup. All visual styling goes through Tailwind v4 `@theme` tokens defined once in `globals.css` — no component ever uses a raw hex value.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, `react-icons` (new dependency).

## Global Constraints

- No hardcoded colors anywhere in component code — every color is a Tailwind utility backed by a `--color-*` token in `src/app/globals.css`, or (for raw SVG `stroke`/`fill` attributes) a direct `var(--color-*)` reference.
- Icons come from `react-icons` (`react-icons/hi2` for UI icons, `react-icons/fa6` for social icons) — no other icon library.
- No real photos, videos, or trademarked logos — use styled text wordmarks, initials avatars, and gradient/SVG placeholder panels instead.
- Mobile-first responsive: navbar collapses to a hamburger below `lg`; grids reflow per the breakpoints specified in each section task.
- Every nav and footer link must resolve to a real route — no `#` placeholders, no 404s.
- `(public)` route group gets a shared layout with `Navbar` + `Footer`; `(auth)` route group gets a minimal centered layout with neither.
- This project has no test runner configured (no Jest/RTL). Verification per task is `npm run lint` (catches syntax/import errors across the whole repo regardless of import graph) plus, for the final task, `npm run build` and a manual dev-server visual check against `public/SKILL FRONTEND.png`.
- Path alias `@/*` must map to `./src/*` for every import in this plan (`@/components/...`, `@/data/...`) to resolve. `tsconfig.json` currently maps `@/*` to `./*` (repo root) — a leftover from before the project was restructured into `src/`. Task 1 fixes this before any component imports are written.

---

## Task 1: Add dependencies and theme tokens

**Files:**
- Modify: `tsconfig.json`
- Modify: `package.json`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: Tailwind utility classes for the rest of the plan: `bg-primary`, `text-primary`, `hover:bg-primary-hover`, `bg-primary-light`, `text-primary` (on light bg), `bg-navy`, `bg-navy-soft`, `text-accent`, `bg-accent-light`, `text-amber`, `bg-surface`, `bg-surface-alt`, `border-border`, `text-heading`, `text-body`, `text-muted`. Also raw CSS vars `var(--color-primary)`, `var(--color-navy)`, `var(--color-navy-soft)`, `var(--color-accent)` for use in inline SVG. Also fixes the `@/*` import alias so it resolves into `src/`.

- [ ] **Step 1: Fix the `@/*` path alias in `tsconfig.json`**

In `tsconfig.json`, change:

```json
    "paths": {
      "@/*": ["./*"]
    }
```

to:

```json
    "paths": {
      "@/*": ["./src/*"]
    }
```

This is a pre-existing misconfiguration (the alias still points at the repo root from before the project was restructured into `src/`). Every `@/components/...` / `@/data/...` import in this plan depends on this fix.

- [ ] **Step 2: Install `react-icons`**

Run: `npm install react-icons`

- [ ] **Step 3: Add brand theme tokens to `globals.css`**

Replace the file's contents with:

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-light: #eff6ff;

  --color-navy: #0b1330;
  --color-navy-soft: #131b3a;

  --color-accent: #10b981;
  --color-accent-light: #ecfdf5;

  --color-amber: #f59e0b;

  --color-surface: #f8fafc;
  --color-surface-alt: #f1f5f9;
  --color-border: #e2e8f0;

  --color-heading: #0f172a;
  --color-body: #475569;
  --color-muted: #64748b;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
}
```

- [ ] **Step 4: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add tsconfig.json package.json package-lock.json src/app/globals.css
git commit -m "Fix @/* path alias, add react-icons dependency and brand theme tokens"
```

---

## Task 2: Common primitives

**Files:**
- Create: `src/components/common/Container.jsx`
- Create: `src/components/common/Button.jsx`
- Create: `src/components/common/Badge.jsx`
- Create: `src/components/common/StarRating.jsx`
- Create: `src/components/common/Avatar.jsx`
- Create: `src/components/common/SectionHeading.jsx`

**Interfaces:**
- Consumes: theme tokens from Task 1 (`bg-primary`, `text-primary`, etc.)
- Produces:
  - `Container({ children, className })` — default export
  - `Button({ href, children, variant = "primary" | "outline" | "ghost", showArrow, className, type, ...props })` — default export
  - `Badge({ children, className })` — default export
  - `StarRating({ count = 5, className })` — default export
  - `Avatar({ name, size = "sm" | "md", index, className })` — default export
  - `SectionHeading({ eyebrow, title, subtitle, align = "center" | "left" })` — default export

- [ ] **Step 1: Create `Container.jsx`**

```jsx
export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `Button.jsx`**

```jsx
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

const VARIANT_CLASSES = {
  primary:
    "bg-primary text-white border border-primary hover:bg-primary-hover hover:border-primary-hover",
  outline:
    "bg-white text-primary border border-primary/30 hover:bg-primary-light",
  ghost:
    "bg-transparent text-heading border border-transparent hover:bg-surface",
};

export default function Button({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className = "",
  type = "button",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
        {showArrow && <HiArrowRight aria-hidden="true" />}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
      {showArrow && <HiArrowRight aria-hidden="true" />}
    </button>
  );
}
```

- [ ] **Step 3: Create `Badge.jsx`**

```jsx
export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary ${className}`}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Create `StarRating.jsx`**

```jsx
import { HiStar } from "react-icons/hi2";

export default function StarRating({ count = 5, className = "" }) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <HiStar key={i} className="h-4 w-4 text-amber" aria-hidden="true" />
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Create `Avatar.jsx`**

```jsx
const PALETTE = ["bg-primary", "bg-accent", "bg-navy-soft"];

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Avatar({ name, size = "md", index = 0, className = "" }) {
  const sizeClasses = size === "sm" ? "h-8 w-8 text-xs" : "h-12 w-12 text-sm";
  const color = PALETTE[index % PALETTE.length];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${color} font-semibold text-white ring-2 ring-white ${sizeClasses} ${className}`}
    >
      {initials(name)}
    </span>
  );
}
```

- [ ] **Step 6: Create `SectionHeading.jsx`**

```jsx
export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignment =
    align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && <span className="text-sm font-semibold text-primary">{eyebrow}</span>}
      <h2 className="text-3xl font-bold text-heading sm:text-4xl">{title}</h2>
      {subtitle && <p className="text-base text-body">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 7: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/common/Container.jsx src/components/common/Button.jsx src/components/common/Badge.jsx src/components/common/StarRating.jsx src/components/common/Avatar.jsx src/components/common/SectionHeading.jsx
git commit -m "Add common UI primitives (Container, Button, Badge, StarRating, Avatar, SectionHeading)"
```

---

## Task 3: LogoMark component

**Files:**
- Create: `src/components/common/LogoMark.jsx`

**Interfaces:**
- Produces: `LogoMark({ inverted = false, showTagline = false, className })` — default export. `inverted` renders white wordmark text for use on the dark navy footer; default renders navy/heading-colored text for use on the white navbar.

- [ ] **Step 1: Create `LogoMark.jsx`**

```jsx
export default function LogoMark({ inverted = false, showTagline = false, className = "" }) {
  const wordColor = inverted ? "text-white" : "text-heading";
  const subColor = inverted ? "text-white/70" : "text-muted";
  const taglineColor = inverted ? "text-white/60" : "text-muted";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 48 32" className="h-8 w-12 shrink-0" aria-hidden="true">
        <path
          d="M4 24c6-10 12-14 20-14s14 4 20 14"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M2 25h44" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M14 24V12M24 24V8M34 24V12"
          stroke="var(--color-navy)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className={`text-lg font-extrabold ${wordColor}`}>
          Skill<span className="text-primary">Bridge</span>
        </span>
        <span className={`text-[11px] font-medium uppercase tracking-wide ${subColor}`}>
          EdTech
        </span>
        {showTagline && (
          <span className={`mt-1 text-xs ${taglineColor}`}>
            Future Skills. Real Practice. Real Results.
          </span>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/LogoMark.jsx
git commit -m "Add LogoMark brand component"
```

---

## Task 4: Navigation and content data

**Files:**
- Create: `src/data/navigation.js`
- Create: `src/data/content.js`

**Interfaces:**
- Produces:
  - `navLinks: Array<{ label: string, href: string, children?: Array<{ label: string, href: string }> }>`
  - `footerLinks: Array<{ heading: string, links: Array<{ label: string, href: string }> }>`
  - `socialLinks: Array<{ label: string, href: string, icon: "linkedin" | "youtube" | "instagram" | "facebook" }>`
  - `features: Array<{ icon: ComponentType, title: string, description: string, badge?: string }>`
  - `stats: Array<{ icon: ComponentType, value: string, label: string }>`
  - `companies: string[]`
  - `testimonials: Array<{ quote: string, name: string, role: string, company: string }>`
  - `learnByDoingPoints: string[]`

- [ ] **Step 1: Create `src/data/navigation.js`**

```js
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
```

- [ ] **Step 2: Create `src/data/content.js`**

```js
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineBookOpen,
  HiOutlineViewfinderCircle,
  HiOutlineCpuChip,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

export const features = [
  {
    icon: HiOutlineClipboardDocumentCheck,
    title: "AI Assessment",
    description: "Discover your strengths and get a personalized learning path.",
  },
  {
    icon: HiOutlineBookOpen,
    title: "Learning Academy",
    description: "Expert-designed courses in high-demand fields with microlearning.",
  },
  {
    icon: HiOutlineViewfinderCircle,
    title: "Simulations",
    description: "Learn by doing with real-world simulations that build job-ready skills.",
    badge: "85%",
  },
  {
    icon: HiOutlineCpuChip,
    title: "AI Career Coach",
    description: "Get 24/7 AI guidance on skills, careers, and your next best steps.",
  },
  {
    icon: HiOutlineBriefcase,
    title: "Career Center",
    description: "Connect with top employers and find the right opportunities.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Jobs & Projects",
    description: "Access remote jobs and projects from U.S. companies.",
  },
];

export const stats = [
  { icon: HiOutlineUserGroup, value: "100,000+", label: "Active Learners" },
  { icon: HiOutlineAcademicCap, value: "93%", label: "Course Completion Rate" },
  { icon: HiOutlineBriefcase, value: "85%", label: "Simulation-Based Learning" },
  { icon: HiOutlineChartBar, value: "72%", label: "Job Placement Rate" },
  { icon: HiOutlineGlobeAlt, value: "1,500+", label: "Partner Companies" },
];

export const companies = [
  "Amazon",
  "Google",
  "Microsoft",
  "Walmart",
  "Deloitte",
  "PayPal",
  "IBM",
  "Accenture",
];

export const testimonials = [
  {
    quote:
      "The simulations gave me the confidence to apply my skills in a real job. I got hired 2 weeks after completing my course!",
    name: "Daniela R.",
    role: "Data Analyst",
    company: "Amazon",
  },
  {
    quote:
      "SkillBridge helped me switch careers and land a remote job in tech. The AI Coach was a game changer!",
    name: "James L.",
    role: "Software Support Specialist",
    company: "Microsoft",
  },
  {
    quote:
      "The projects and practice here are exactly what employers are looking for. Highly recommended!",
    name: "Maria G.",
    role: "Marketing Specialist",
    company: "HubSpot",
  },
];

export const learnByDoingPoints = [
  "Real-world scenarios",
  "Immediate feedback",
  "Build confidence",
  "Job-ready skills",
];
```

- [ ] **Step 3: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/navigation.js src/data/content.js
git commit -m "Add navigation and landing page content data"
```

---

## Task 5: Navbar

**Files:**
- Create: `src/components/layout/Navbar.jsx`

**Interfaces:**
- Consumes: `Container` (Task 2), `Button` (Task 2), `LogoMark` (Task 3), `navLinks` (Task 4)
- Produces: `Navbar()` — default export, client component, no props.

- [ ] **Step 1: Create `Navbar.jsx`**

```jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { HiBars3, HiXMark, HiChevronDown } from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import LogoMark from "@/components/common/LogoMark";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <LogoMark />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-body hover:text-primary"
                >
                  {link.label}
                  <HiChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
                {openDropdown === link.label && (
                  <div className="absolute left-0 top-full w-56 rounded-lg border border-border bg-white p-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-body hover:bg-surface hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-body hover:text-primary"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/login" variant="ghost" className="border border-border">
            Log In
          </Button>
          <Button href="/signup" variant="primary">
            Sign Up
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-heading lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-body hover:bg-surface hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-muted hover:text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <Button href="/login" variant="outline">
                Log In
              </Button>
              <Button href="/signup" variant="primary">
                Sign Up
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.jsx
git commit -m "Add responsive Navbar with Simulations dropdown and mobile menu"
```

---

## Task 6: Footer

**Files:**
- Create: `src/components/layout/Footer.jsx`

**Interfaces:**
- Consumes: `Container` (Task 2), `LogoMark` (Task 3), `footerLinks`, `socialLinks` (Task 4)
- Produces: `Footer()` — default export, server component, no props.

- [ ] **Step 1: Create `Footer.jsx`**

```jsx
import Link from "next/link";
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa6";
import Container from "@/components/common/Container";
import LogoMark from "@/components/common/LogoMark";
import { footerLinks, socialLinks } from "@/data/navigation";

const SOCIAL_ICONS = {
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  instagram: FaInstagram,
  facebook: FaFacebookF,
};

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="flex flex-col gap-12 py-14 lg:flex-row lg:justify-between">
        <div className="flex max-w-xs flex-col gap-4">
          <LogoMark inverted showTagline />
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-soft text-white hover:bg-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
          {footerLinks.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-white">{column.heading}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex max-w-xs flex-col gap-3">
          <h3 className="text-sm font-semibold text-white">Newsletter</h3>
          <p className="text-sm text-white/70">
            Get the latest updates and career tips straight to your inbox.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-md border border-white/20 bg-navy-soft px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <span>© 2026 SkillBridge EdTech. All rights reserved.</span>
          <span>Made with ❤ for learners worldwide.</span>
        </Container>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.jsx
git commit -m "Add Footer with link columns, social icons, and newsletter form"
```

---

## Task 7: Placeholder page component and all stub routes

**Files:**
- Create: `src/components/common/PlaceholderPage.jsx`
- Create: `src/app/(public)/about/page.jsx`
- Create: `src/app/(public)/contact/page.jsx`
- Create: `src/app/(public)/jobs/page.jsx`
- Create: `src/app/(public)/career-center/page.jsx`
- Create: `src/app/(public)/ai-coach/page.jsx`
- Create: `src/app/(public)/learning-academy/page.jsx`
- Create: `src/app/(public)/assessment/page.jsx`
- Create: `src/app/(public)/simulations/page.jsx`
- Create: `src/app/(public)/simulations/business/page.jsx`
- Create: `src/app/(public)/simulations/tech/page.jsx`
- Create: `src/app/(public)/simulations/sales/page.jsx`
- Create: `src/app/(public)/blog/page.jsx`
- Create: `src/app/(public)/success-stories/page.jsx`
- Create: `src/app/(public)/help-center/page.jsx`
- Create: `src/app/(public)/guides/page.jsx`
- Create: `src/app/(public)/webinars/page.jsx`
- Create: `src/app/(public)/mission/page.jsx`
- Create: `src/app/(public)/careers/page.jsx`
- Create: `src/app/(public)/partners/page.jsx`
- Create: `src/app/(public)/privacy/page.jsx`
- Create: `src/app/(public)/terms/page.jsx`
- Create: `src/app/(public)/cookies/page.jsx`

**Interfaces:**
- Consumes: `Container` (Task 2)
- Produces: `PlaceholderPage({ title, description })` — default export, used by every stub route below.

- [ ] **Step 1: Create `src/components/common/PlaceholderPage.jsx`**

```jsx
import Container from "@/components/common/Container";

export default function PlaceholderPage({ title, description }) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-3 py-20 text-center">
      <h1 className="text-3xl font-bold text-heading">{title}</h1>
      <p className="max-w-md text-sm text-body">{description}</p>
    </Container>
  );
}
```

- [ ] **Step 2: Create every stub route**

Each file below follows this exact template — only `PAGE_NAME`, `title`, and `description` change:

```jsx
import PlaceholderPage from "@/components/common/PlaceholderPage";

export default function PAGE_NAME() {
  return <PlaceholderPage title="TITLE" description="DESCRIPTION" />;
}
```

Create each file at its path with the corresponding values:

| File | `PAGE_NAME` | `title` | `description` |
|---|---|---|---|
| `src/app/(public)/about/page.jsx` | `AboutPage` | About SkillBridge | We're building the bridge between learning and real-world careers. Full page coming soon. |
| `src/app/(public)/contact/page.jsx` | `ContactPage` | Contact Us | Have a question? Reach out and our team will get back to you shortly. |
| `src/app/(public)/jobs/page.jsx` | `JobsPage` | Jobs & Projects | Browse remote jobs and projects from our partner companies. Full listings coming soon. |
| `src/app/(public)/career-center/page.jsx` | `CareerCenterPage` | Career Center | Connect with top employers and find the right opportunities for you. |
| `src/app/(public)/ai-coach/page.jsx` | `AiCoachPage` | AI Career Coach | Get 24/7 AI guidance on skills, careers, and your next best steps. |
| `src/app/(public)/learning-academy/page.jsx` | `LearningAcademyPage` | Learning Academy | Expert-designed courses in high-demand fields with microlearning. |
| `src/app/(public)/assessment/page.jsx` | `AssessmentPage` | AI Assessment | Discover your strengths and get a personalized learning path. |
| `src/app/(public)/simulations/page.jsx` | `SimulationsPage` | Simulations | Learn by doing with real-world simulations that build job-ready skills. |
| `src/app/(public)/simulations/business/page.jsx` | `BusinessSimulationsPage` | Business Simulations | Practice real-world business decision-making scenarios. |
| `src/app/(public)/simulations/tech/page.jsx` | `TechSimulationsPage` | Tech Simulations | Build job-ready technical skills through hands-on simulations. |
| `src/app/(public)/simulations/sales/page.jsx` | `SalesSimulationsPage` | Sales Simulations | Sharpen your sales skills with realistic client scenarios. |
| `src/app/(public)/blog/page.jsx` | `BlogPage` | Blog | Insights, tips, and stories from the SkillBridge team. Coming soon. |
| `src/app/(public)/success-stories/page.jsx` | `SuccessStoriesPage` | Success Stories | Read more stories from learners who built their future with SkillBridge. |
| `src/app/(public)/help-center/page.jsx` | `HelpCenterPage` | Help Center | Find answers to common questions about SkillBridge. |
| `src/app/(public)/guides/page.jsx` | `GuidesPage` | Guides | Step-by-step guides to help you get the most out of SkillBridge. |
| `src/app/(public)/webinars/page.jsx` | `WebinarsPage` | Webinars | Join live and on-demand sessions with industry experts. |
| `src/app/(public)/mission/page.jsx` | `MissionPage` | Our Mission | Bridging the gap between learning and real-world success. |
| `src/app/(public)/careers/page.jsx` | `CareersPage` | Careers at SkillBridge | Help us build the future of skills-based education. |
| `src/app/(public)/partners/page.jsx` | `PartnersPage` | Our Partners | Meet the 1,500+ companies that hire from SkillBridge. |
| `src/app/(public)/privacy/page.jsx` | `PrivacyPage` | Privacy Policy | How we collect, use, and protect your data. |
| `src/app/(public)/terms/page.jsx` | `TermsPage` | Terms of Service | The terms that govern your use of SkillBridge. |
| `src/app/(public)/cookies/page.jsx` | `CookiesPage` | Cookie Policy | How SkillBridge uses cookies and similar technologies. |

Example (`src/app/(public)/about/page.jsx`):

```jsx
import PlaceholderPage from "@/components/common/PlaceholderPage";

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="About SkillBridge"
      description="We're building the bridge between learning and real-world careers. Full page coming soon."
    />
  );
}
```

Repeat this exact pattern for all 21 remaining rows in the table.

- [ ] **Step 3: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/common/PlaceholderPage.jsx "src/app/(public)"
git commit -m "Add placeholder pages for all nav and footer routes"
```

---

## Task 8: Public and auth layouts (with login/signup)

**Files:**
- Create: `src/app/(public)/layout.jsx`
- Create: `src/app/(auth)/layout.jsx`
- Create: `src/app/(auth)/login/page.jsx`
- Create: `src/app/(auth)/signup/page.jsx`

**Interfaces:**
- Consumes: `Navbar` (Task 5), `Footer` (Task 6), `LogoMark` (Task 3), `Button` (Task 2)
- Produces: `PublicLayout({ children })`, `AuthLayout({ children })` — default exports.

- [ ] **Step 1: Create `src/app/(public)/layout.jsx`**

```jsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create `src/app/(auth)/layout.jsx`**

```jsx
import Link from "next/link";
import LogoMark from "@/components/common/LogoMark";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-surface px-4 py-12">
      <Link href="/">
        <LogoMark />
      </Link>
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/(auth)/login/page.jsx`**

```jsx
import Link from "next/link";
import Button from "@/components/common/Button";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold text-heading">Welcome back</h1>
        <p className="text-sm text-body">Log in to continue your learning journey.</p>
      </div>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-heading">
          Email
          <input
            type="email"
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-heading">
          Password
          <input
            type="password"
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <Button type="submit" variant="primary" className="w-full justify-center">
          Log In
        </Button>
      </form>
      <p className="text-center text-sm text-body">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-primary">
          Sign up
        </Link>
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/app/(auth)/signup/page.jsx`**

```jsx
import Link from "next/link";
import Button from "@/components/common/Button";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold text-heading">Create your account</h1>
        <p className="text-sm text-body">Start building your future with SkillBridge.</p>
      </div>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-heading">
          Full name
          <input
            type="text"
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-heading">
          Email
          <input
            type="email"
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-heading">
          Password
          <input
            type="password"
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <Button type="submit" variant="primary" className="w-full justify-center">
          Sign Up
        </Button>
      </form>
      <p className="text-center text-sm text-body">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add "src/app/(public)/layout.jsx" "src/app/(auth)"
git commit -m "Add public and auth route group layouts with login/signup pages"
```

---

## Task 9: HeroSection

**Files:**
- Create: `src/components/sections/HeroSection.jsx`

**Interfaces:**
- Consumes: `Container`, `Button`, `Badge`, `StarRating`, `Avatar` (Task 2)
- Produces: `HeroSection()` — default export, server component, no props.

- [ ] **Step 1: Create `HeroSection.jsx`**

```jsx
import { HiPlay } from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import StarRating from "@/components/common/StarRating";
import Avatar from "@/components/common/Avatar";

const LEARNERS = ["Ava N.", "Marcus T.", "Priya K."];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <Badge>The #1 EdTech Platform for Future-Ready Careers</Badge>
          <h1 className="text-4xl font-extrabold leading-tight text-heading sm:text-5xl">
            Future Skills.
            <br />
            <span className="text-primary">Real Practice.</span>
            <br />
            Real Results.
          </h1>
          <p className="max-w-md text-base text-body">
            SkillBridge EdTech connects learners to in-demand skills, real-world
            practice, and verified job opportunities.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/assessment" variant="primary" showArrow>
              Get Assessed
            </Button>
            <Button href="/learning-academy" variant="outline" showArrow>
              Start Learning
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {LEARNERS.map((name, i) => (
                <Avatar key={name} name={name} size="sm" index={i} />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <StarRating />
              <span className="text-xs text-muted">
                Join 100,000+ learners building their future
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-medium text-heading">
                Welcome from Our Director
              </span>
            </div>
            <div className="relative aspect-video bg-linear-to-br from-navy to-navy-soft">
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  aria-label="Play welcome video"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105"
                >
                  <HiPlay className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <span className="absolute left-4 top-4 text-sm font-semibold text-white/80">
                SkillBridge
              </span>
            </div>
            <div className="px-4 py-3">
              <div className="h-1 w-full rounded-full bg-surface-alt">
                <div className="h-1 w-1/4 rounded-full bg-primary" />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted">
                <span>0:00 / 1:45</span>
                <span>SkillBridge EdTech</span>
              </div>
            </div>
          </div>
          <blockquote className="text-center text-sm italic text-primary">
            &ldquo;Our mission is simple: bridge the gap between learning and
            real-world success through technology, practice, and
            opportunity.&rdquo;
          </blockquote>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.jsx
git commit -m "Add HeroSection"
```

---

## Task 10: FeatureGridSection

**Files:**
- Create: `src/components/sections/FeatureGridSection.jsx`

**Interfaces:**
- Consumes: `Container`, `SectionHeading` (Task 2), `features` (Task 4)
- Produces: `FeatureGridSection()` — default export, server component, no props.

- [ ] **Step 1: Create `FeatureGridSection.jsx`**

```jsx
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { features } from "@/data/content";

export default function FeatureGridSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading
          title="Everything You Need to Succeed"
          subtitle="A complete ecosystem designed for real results."
        />
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="relative flex flex-col gap-3 rounded-xl border border-border bg-white p-5 shadow-sm"
              >
                {feature.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-accent-light px-2 py-0.5 text-xs font-semibold text-accent">
                    {feature.badge}
                  </span>
                )}
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold text-heading">{feature.title}</h3>
                <p className="text-sm text-body">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/FeatureGridSection.jsx
git commit -m "Add FeatureGridSection"
```

---

## Task 11: LearnByDoingSection

**Files:**
- Create: `src/components/sections/LearnByDoingSection.jsx`

**Interfaces:**
- Consumes: `Container` (Task 2), `learnByDoingPoints` (Task 4)
- Produces: `LearnByDoingSection()` — default export, server component, no props.

- [ ] **Step 1: Create `LearnByDoingSection.jsx`**

```jsx
import { HiCheckCircle, HiOutlineComputerDesktop } from "react-icons/hi2";
import Container from "@/components/common/Container";
import { learnByDoingPoints } from "@/data/content";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PROGRESS = 0.85;

export default function LearnByDoingSection() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 rounded-2xl bg-navy p-8 text-white sm:p-10 lg:grid-cols-[auto_auto_1fr] lg:gap-12">
          <div className="hidden h-24 w-24 items-center justify-center rounded-full bg-navy-soft lg:flex">
            <HiOutlineComputerDesktop className="h-12 w-12 text-primary" aria-hidden="true" />
          </div>

          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-navy-soft">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="var(--color-navy-soft)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - PROGRESS)}
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">85%</span>
              <span className="text-[10px] text-white/70">of training</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold">Learn by Doing</h2>
              <p className="text-sm font-semibold text-accent">
                85% Simulation-Based Learning
              </p>
            </div>
            <p className="max-w-xl text-sm text-white/80">
              We believe the best way to learn is by doing. Our platform uses
              real-world simulations so you can practice, make decisions, and
              build confidence before stepping into the job.
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {learnByDoingPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-white/90">
                  <HiCheckCircle className="h-4 w-4 text-accent" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/LearnByDoingSection.jsx
git commit -m "Add LearnByDoingSection with animated progress ring"
```

---

## Task 12: StatsSection

**Files:**
- Create: `src/components/sections/StatsSection.jsx`

**Interfaces:**
- Consumes: `Container` (Task 2), `stats` (Task 4)
- Produces: `StatsSection()` — default export, server component, no props.

- [ ] **Step 1: Create `StatsSection.jsx`**

```jsx
import Container from "@/components/common/Container";
import { stats } from "@/data/content";

export default function StatsSection() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-10">
        <h2 className="text-2xl font-bold text-heading sm:text-3xl">
          Real Results. Real Impact.
        </h2>
        <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xl font-bold text-heading">{stat.value}</span>
                <span className="text-xs text-muted">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/StatsSection.jsx
git commit -m "Add StatsSection"
```

---

## Task 13: TrustedBySection

**Files:**
- Create: `src/components/sections/TrustedBySection.jsx`

**Interfaces:**
- Consumes: `Container`, `Button` (Task 2), `companies` (Task 4)
- Produces: `TrustedBySection()` — default export, server component, no props.

- [ ] **Step 1: Create `TrustedBySection.jsx`**

```jsx
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { companies } from "@/data/content";

export default function TrustedBySection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-8">
        <h2 className="text-xl font-semibold text-heading">Trusted by Leading Companies</h2>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {companies.map((company) => (
            <span key={company} className="text-lg font-bold text-muted">
              {company}
            </span>
          ))}
        </div>
        <Button href="/partners" variant="ghost" showArrow className="text-primary">
          View all partners
        </Button>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/TrustedBySection.jsx
git commit -m "Add TrustedBySection"
```

---

## Task 14: TestimonialsSection

**Files:**
- Create: `src/components/sections/TestimonialsSection.jsx`

**Interfaces:**
- Consumes: `Container`, `SectionHeading`, `Avatar`, `Button` (Task 2), `testimonials` (Task 4)
- Produces: `TestimonialsSection()` — default export, server component, no props.

- [ ] **Step 1: Create `TestimonialsSection.jsx`**

```jsx
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import { testimonials } from "@/data/content";

export default function TestimonialsSection() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading title="Success Stories from Our Learners" />
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-body">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3">
                <Avatar name={testimonial.name} index={i} />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-heading">{testimonial.name}</span>
                  <span className="text-xs text-muted">{testimonial.role}</span>
                </div>
                <span className="ml-auto text-xs font-semibold text-primary">
                  Hired at {testimonial.company}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Button href="/success-stories" variant="ghost" showArrow className="text-primary">
          Read more stories
        </Button>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/TestimonialsSection.jsx
git commit -m "Add TestimonialsSection"
```

---

## Task 15: CtaBanner

**Files:**
- Create: `src/components/sections/CtaBanner.jsx`

**Interfaces:**
- Consumes: `Container`, `Button` (Task 2)
- Produces: `CtaBanner()` — default export, server component, no props.

- [ ] **Step 1: Create `CtaBanner.jsx`**

```jsx
import { HiRocketLaunch } from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

export default function CtaBanner() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary px-8 py-10 text-white sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
              <HiRocketLaunch className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-bold">Ready to Build Your Future?</h2>
              <p className="text-sm text-white/80">
                Start with an assessment and get your personalized path to success.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <div className="flex gap-3">
              <Button href="/assessment" variant="outline" className="bg-white">
                Get Assessed
              </Button>
              <Button
                href="/signup"
                variant="ghost"
                className="border border-white/40 text-white hover:bg-white/10"
              >
                Start for Free
              </Button>
            </div>
            <span className="text-xs text-white/70">No credit card required</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/CtaBanner.jsx
git commit -m "Add CtaBanner"
```

---

## Task 16: Compose home page, remove old root page, final QA

**Files:**
- Create: `src/app/(public)/page.jsx`
- Delete: `src/app/page.jsx`

**Interfaces:**
- Consumes: `HeroSection`, `FeatureGridSection`, `LearnByDoingSection`, `StatsSection`, `TrustedBySection`, `TestimonialsSection`, `CtaBanner` (Tasks 9–15)

- [ ] **Step 1: Create `src/app/(public)/page.jsx`**

```jsx
import HeroSection from "@/components/sections/HeroSection";
import FeatureGridSection from "@/components/sections/FeatureGridSection";
import LearnByDoingSection from "@/components/sections/LearnByDoingSection";
import StatsSection from "@/components/sections/StatsSection";
import TrustedBySection from "@/components/sections/TrustedBySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaBanner from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureGridSection />
      <LearnByDoingSection />
      <StatsSection />
      <TrustedBySection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
```

- [ ] **Step 2: Delete the old root placeholder page**

Run: `git rm src/app/page.jsx`

(`(public)/page.jsx` now resolves to `/` since route groups don't add a URL segment — keeping both would be a route conflict.)

- [ ] **Step 3: Full build verification**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds, `/`, `/login`, `/signup`, and all stub routes listed in Task 7 are listed in the route output with no errors.

- [ ] **Step 4: Manual visual QA**

Run: `npm run dev` and open `http://localhost:2003` in a browser (use the `run` skill if available). Compare against `public/SKILL FRONTEND.png` section by section:
- Navbar: logo, links, Simulations dropdown, Log In/Sign Up buttons
- Hero: badge, heading, copy, buttons, avatar stack + rating, video card, quote
- Feature grid: 6 cards, "85%" badge on Simulations card
- Learn by Doing: dark banner, 85% ring, checklist
- Stats row: 5 stats
- Trusted by: company wordmarks + "View all partners"
- Testimonials: 3 cards
- CTA banner: rocket icon, two buttons
- Footer: logo/tagline/social, 4 link columns, newsletter, copyright bar

Also click through: a nav link, the Simulations dropdown, the mobile hamburger menu (resize to <1024px width), Log In, and Sign Up — confirm each route renders without a 404.

Fix any visual discrepancies found before proceeding.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(public)/page.jsx"
git commit -m "Compose SkillBridge home page from section components"
```

---

## Self-Review Notes

- **Spec coverage:** Route structure (Task 8), theme tokens (Task 1), all 7 common primitives + LogoMark (Tasks 2–3), Navbar/Footer (Tasks 5–6), all 7 sections (Tasks 9–15), data files (Task 4), all placeholder routes (Task 7), responsive behavior (built into Navbar/grids per task, verified in Task 16) — every spec section maps to a task.
- **Type consistency:** `Avatar`'s `index` prop, `Button`'s `variant`/`showArrow` props, and `SectionHeading`'s `align` prop are used identically (same names, same values) across every section task that consumes them.
- **No placeholders:** Task 7's table-driven stub pages are fully specified (exact title/description per route) rather than left vague — this is intentional DRY repetition of a fully-shown pattern, not a missing-content placeholder.
