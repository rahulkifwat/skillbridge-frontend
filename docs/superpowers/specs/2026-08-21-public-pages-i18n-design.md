# Public About, Contact, and EN/ES Design

## Purpose

Replace the public About and Contact placeholders with launch-ready pages based on the supplied source documents, then make the entire public site available in English and Spanish.

## Delivery sequence

1. Build the English About and Contact pages first.
2. Add locale-prefixed public routes (`/en/...`, `/es/...`) and translate all public pages, shared navigation, footer, calls to action, labels, metadata, and form messages.
3. Redirect the unprefixed public routes to `/en/...` so English remains the initial default.

## Routing and language behavior

- A locale route segment is the source of truth: `/en/about`, `/es/about`, `/en/contact`, and `/es/contact`.
- The language selector uses normal links, preserves the current public route when that translation exists, and has clear keyboard labels.
- Public links are locale-aware. Dashboard and auth routes remain outside this first i18n scope.
- The selected language updates the document `lang` attribute and localized page metadata.
- Translation content is kept in a typed/structured dictionary rather than duplicated inline across page components. English is the fallback if a key is absent during development.

## About page

The page will use the existing dark navy, white, and teal design system. Its information architecture follows the approved source:

- A concise mission hero: practical skills and global opportunities.
- A short explanatory introduction grounded in the statement that talent exists everywhere and opportunity should too.
- What We Do: the academies and practical, simulation-led learning approach.
- From Learning to Opportunity: career preparation, professional communication, and global-work readiness. Wording stays accurate and does not promise employment.
- Training Philosophy: a clear capability list (practical skills, assessment, AI literacy, cultural intelligence, remote-work readiness, and career development).
- Vision and Commitment: a focused close with an assessment/contact call to action.

## Contact page

- A direct "Let's Build the Bridge Together" hero.
- A six-audience contact grid: students/participants, employers, universities/colleges, schools, government/public institutions, and strategic partners.
- A usable inquiry form with name, email, organization, audience, subject, and message fields. It performs client-side required-field and email validation, communicates its submission state accessibly, and does not claim to send/store data until an approved backend endpoint is connected.
- A closing connection message faithful to the supplied document.

## Quality bar

- Responsive, accessible layout: semantic headings, labels, keyboard-operable language picker, visible focus state, and form errors associated with their fields.
- No fabricated learner counts, hiring results, employer partnerships, certifications, or job-placement claims.
- English page content is implemented and visually verified before translation work begins. Both locales must build cleanly and locale-switch links must not lead to 404 pages.

## Non-goals for this release

- Localizing authenticated portal/dashboard experiences.
- Adding automated machine translation or a translation management service.
- Sending Contact form submissions to a backend before the endpoint and recipient workflow are approved.
