# SkillBridge Portal Screens — Design Spec

Date: 2026-07-14

## Goal

Build the four app/portal UI screens shown in the reference mockups as static, pixel-faithful UI with mock data, in a new `(app)` route group. Reuse existing design tokens and common components. No auth, no real interactivity, no backend.

## Screens & Routes

| Route | Screen | Chrome |
|-------|--------|--------|
| `(app)/engineer` | Engineer Portal dashboard | Dark navy sidebar + top search bar |
| `(app)/my-space` | Learner "My Space" | Light sidebar + top search bar |
| `(app)/home` | Learner "Home" variant | Light sidebar + top search bar |
| `(app)/exam` | English Certification Exam | Full-width exam header (no sidebar) |

## Components

`src/components/portal/`
- `PortalSidebar.jsx` — `variant` (`"dark"` | `"light"`), nav items, footer widgets, bottom user block.
- `PortalTopbar.jsx` — search field, notifications/help/messages, profile block.
- `PortalShell.jsx` — sidebar + topbar + scrollable content region. Used by engineer/my-space/home.
- `ExamHeader.jsx` — full-width exam top bar (logo, exam title, timer, candidate).

`src/components/portal/widgets/`
- `StatCard`, `WidgetCard` (titled card with optional "View All"), `ProgressBar`, `ActivityItem`, `ScheduleItem`.
- Hand-built SVG charts (no chart library): `DonutChart`, `RadarChart`, `Sparkline`.

## Mock Data

`src/data/`
- `engineerDashboard.js` — nav, stats, sprint, tasks, pipeline, system health, activity, metrics.
- `learnerDashboard.js` — nav, stats, learning progress, schedule, skills, career matches, jobs, community, achievements, recommendations.
- `examContent.js` — sections (listening/reading/writing/speaking), weights, summary.

## Reuse

Tokens: `primary`, `navy`, `navy-soft`, `accent`, `accent-light`, `amber`, `surface`, `surface-alt`, `border`, `heading`, `body`, `muted`. Components: `Badge`, `Avatar`, `StarRating`, `Button`, `LogoMark`. Icons via `react-icons`.

## Non-goals (YAGNI)

- No navigation between screens, no auth, no state management.
- Exam tabs, audio player, and rich-text editor are styled but non-functional.
- No dark-mode toggle logic (the engineer sidebar is dark by design, not a theme).
