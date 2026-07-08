# SkillBridge Landing Page — Design Spec

Date: 2026-07-08

## Goal

Rebuild the SkillBridge home page to match the provided reference design (`public/SKILL FRONTEND.png`) pixel-for-pixel in layout, with a properly componentized structure, theme-driven styling (no hardcoded colors), and a route/layout structure that supports the rest of the public site.

## Reference assets already in the repo

- `public/SKILL FRONTEND.png` — full desktop reference screenshot of the target landing page (identical to the image the user shared in chat).
- `public/SKILL BRIDGE LOGO.png` — full brand mark (bridge icon + "SkillBridge EdTech" wordmark + tagline icons). This is a large marketing graphic, not a navbar-ready asset — the navbar/footer logo will be rebuilt as a compact inline SVG mark in the same style (bridge silhouette + gradient navy→teal wordmark), themed via CSS variables, rather than embedding the PNG.
- `public/SKILL BRIDGE ADMIN SIDE.png`, `public/admin 2.png`, `public/admin 3.png`, `public/exam.png` — reference material for future admin/exam work. Out of scope for this spec.

## Routing & layout structure

Next.js App Router, using the existing empty route groups.

- `src/app/(public)/layout.jsx` — renders `<Navbar />{children}<Footer />`. Shared chrome for every public marketing page.
- `src/app/(public)/page.jsx` — the home page. Composes the section components in order. Replaces the current root `src/app/page.jsx` (which is deleted — a page in a route group with no URL segment resolves to the same path, so `(public)/page.jsx` becomes `/`).
- Minimal stub pages (heading + short placeholder text only, styled with the shared layout) so every nav/footer link resolves instead of 404ing:
  - `(public)/about/page.jsx`
  - `(public)/contact/page.jsx`
  - `(public)/jobs/page.jsx`
  - `(public)/career-center/page.jsx`
  - `(public)/ai-coach/page.jsx`
  - `(public)/learning-academy/page.jsx`
  - `(public)/assessment/page.jsx`
  - `(public)/simulations/page.jsx` (index)
  - `(public)/simulations/business/page.jsx`
  - `(public)/simulations/tech/page.jsx`
  - `(public)/simulations/sales/page.jsx`
- `src/app/(auth)/layout.jsx` — minimal centered layout, no navbar/footer.
- `src/app/(auth)/login/page.jsx`, `src/app/(auth)/signup/page.jsx` — simple placeholder auth forms (UI shell only, no auth logic — out of scope).
- `admin/` and `user/` directories are not touched.

## Theme configuration

Extend the Tailwind v4 `@theme` block in `src/app/globals.css` with named brand tokens as CSS custom properties, derived from the reference design and brand logo:

```
--color-primary        (royal blue — buttons, links, active nav state)
--color-primary-hover
--color-primary-light  (light blue badge/pill backgrounds)
--color-navy           (dark banner + footer background)
--color-navy-soft      (secondary dark surface, gradients)
--color-accent         (teal/green — checkmarks, "Real results" accents)
--color-accent-light
--color-amber          (star ratings)
--color-surface        (light gray section background)
--color-surface-alt
--color-border
--color-heading        (near-black heading text)
--color-body           (secondary paragraph text)
--color-muted          (tertiary/meta text)
```

These are exposed through `@theme inline` so Tailwind generates standard utilities (`bg-primary`, `text-heading`, `border-border`, etc.). No component ever uses a raw hex value or arbitrary-value color class — every color reference goes through a token.

## Component structure

```
src/components/
  common/
    Container.jsx      — max-width + horizontal padding wrapper
    Button.jsx          — variant: "primary" | "outline" | "ghost"; optional arrow icon; renders <Link> or <button>
    SectionHeading.jsx   — eyebrow/title/subtitle pattern
    Badge.jsx            — pill badge (e.g. "The #1 EdTech Platform...", "85%")
    StarRating.jsx        — filled star row (react-icons)
    Avatar.jsx           — circular placeholder avatar, initials on a themed background
    LogoMark.jsx         — inline SVG bridge icon + "SkillBridge" wordmark + "EdTech" tagline, sized via props for navbar vs footer use
  layout/
    Navbar.jsx           — logo, nav links, Simulations dropdown, Log In/Sign Up buttons, mobile hamburger + slide-down menu ("use client")
    Footer.jsx           — dark navy footer: logo + tagline + social icons, 4 link columns, newsletter input, bottom copyright bar
  sections/
    HeroSection.jsx
    FeatureGridSection.jsx
    LearnByDoingSection.jsx
    StatsSection.jsx
    TrustedBySection.jsx
    TestimonialsSection.jsx
    CtaBanner.jsx
```

Each section component is self-contained, takes no required props (reads static content from `src/data/`), and is composed in `(public)/page.jsx`:

```jsx
<HeroSection />
<FeatureGridSection />
<LearnByDoingSection />
<StatsSection />
<TrustedBySection />
<TestimonialsSection />
<CtaBanner />
```

## Data

- `src/data/navigation.js` — `navLinks` (with optional `children` for the Simulations dropdown), `footerLinks` (grouped by column), `socialLinks`.
- `src/data/content.js` — `features` (6 items: icon, title, description, optional badge), `stats` (5 items: icon, value, label), `testimonials` (3 items: quote, name, role, company), `companies` (list of company names rendered as styled text wordmarks).

Keeping copy in data files keeps section components presentational and makes future content edits a one-line change.

## Icons & assets

- Icons: `react-icons` (new dependency), primarily `react-icons/fi` (Feather) or `react-icons/hi2` for a clean line-icon look matching the reference; `react-icons/fa6` for social icons.
- Company logos: styled text wordmarks (e.g. bold "Google" in Google-blue text-token, "amazon" in a themed dark color) rather than trademarked logo images.
- Director video thumbnail: a themed gradient placeholder panel with a centered circular play button and a fake video control bar (progress bar, time, icons), matching the reference layout without a real video asset.
- Learner avatars / testimonial headshots: `Avatar` component (colored circle + initials).

## Responsiveness

Mobile-first Tailwind breakpoints:
- Navbar collapses to a hamburger menu below `lg`; dropdown becomes an accordion in the mobile menu.
- Feature grid: 1 col (mobile) → 2 col (`sm`) → 3 col (`md`) → 6 col (`lg`, matches reference).
- Stats row: 2 col (mobile) → 5 col (`md`+).
- Testimonials: 1 col (mobile) → 3 col (`md`+).
- Footer link columns stack on mobile, 5-column grid on `md`+.
- Desktop (`lg`+) layout matches `public/SKILL FRONTEND.png` exactly.

## Out of scope

- Real authentication logic for `/login` and `/signup`.
- Admin and user dashboard pages/layouts.
- Real video playback, real company logo assets, real photography.
- CMS or dynamic content — all copy is static data for now.
