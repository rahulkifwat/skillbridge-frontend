# English About and Contact Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the English public About and Contact placeholders with accessible, responsive pages faithful to the supplied source documents.

**Architecture:** Keep page composition in the two route files and place contact-form state validation in a small framework-independent utility so it can be tested with Node's built-in runner. Reuse the existing marketing components and navy/teal visual system; no server submission is added in this phase.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, react-icons, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-08-21-public-pages-i18n-design.md`

## Global Constraints

- Implement English only in this phase; locale-prefixed EN/ES routing is a separate next phase.
- Use only supported claims from `About Us.doc` and `Contact Us.docx`; do not claim current job placement, verified employer partnerships, enrollment numbers, or certifications.
- Reuse the public-site dark navy, white, and teal palette.
- Contact submission must remain client-only and must not imply that a message was transmitted or stored.
- Keep semantic headings, labelled inputs, keyboard-accessible controls, focus states, and responsive layouts.

---

### Task 1: Build the English About page

**Files:**
- Modify: `src/app/(public)/about/page.jsx`
- Test: `npm run lint`

**Interfaces:**
- Consumes: `Container`, `CtaBanner`, `DarkSection`, and react-icons already used by public pages.
- Produces: a static `/about` page with a title/description metadata export and semantic content sections.

- [ ] **Step 1: Replace the placeholder with the approved page structure**

Create a dark hero followed by: an introductory mission section, What We Do, From Learning to Opportunity, Training Philosophy, Vision, Commitment, and a final contact/assessment CTA. Use this source-accurate framing:

```jsx
<h1>Building the bridge between skills and global opportunities.</h1>
<p>SkillBridge prepares people with practical skills, professional knowledge, and confidence for the global remote economy.</p>
```

Use arrays for the training philosophy items so the list is accessible and avoids repeated markup.

- [ ] **Step 2: Preserve claim accuracy in opportunity copy**

Use capability-oriented language such as the following and do not turn it into a promise of employment:

```jsx
<p>
  Participants can strengthen professional skills, communication, and remote-work readiness while preparing for global opportunities.
</p>
```

- [ ] **Step 3: Add route metadata and responsive styling**

Export:

```js
export const metadata = {
  title: "About SkillBridge | Skills and Global Opportunities",
  description: "Learn how SkillBridge connects practical learning, career preparation, and global opportunity.",
};
```

Use existing `Container`, `DarkSection`, `CtaBanner`, and palette classes rather than adding a separate stylesheet.

- [ ] **Step 4: Verify the route compiles and lint passes**

Run: `npm run lint && npm run build`

Expected: both commands exit 0 and the generated route includes `/about`.

- [ ] **Step 5: Commit**

```bash
git add src/app/(public)/about/page.jsx
git commit -m "feat: add English About page"
```

### Task 2: Add tested contact-form validation and state

**Files:**
- Create: `src/lib/contactForm.js`
- Create: `src/lib/contactForm.test.js`
- Test: `src/lib/contactForm.test.js`

**Interfaces:**
- Produces: `validateContactForm(values)` returning an object keyed by `name`, `email`, `audience`, `subject`, and `message`; absent keys are valid fields.
- Consumed by: `src/app/(public)/contact/page.jsx` in Task 3.

- [ ] **Step 1: Write failing validation tests**

Create a Node test that asserts empty values return errors and valid values return no errors:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { validateContactForm } from "./contactForm.js";

test("requires contact form fields and a valid email", () => {
  assert.equal(validateContactForm({}).email, "Enter a valid email address.");
  assert.deepEqual(validateContactForm({ name: "Ana", email: "ana@example.com", audience: "Student / Participant", subject: "Programs", message: "Please send details." }), {});
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node --test src/lib/contactForm.test.js`

Expected: FAIL because `contactForm.js` does not yet exist.

- [ ] **Step 3: Implement pure validation**

Create `validateContactForm` with trimmed required-field validation, a simple email format check, and fixed user-facing errors:

```js
export function validateContactForm(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email || "")) errors.email = "Enter a valid email address.";
  if (!values.audience) errors.audience = "Choose the option that best describes you.";
  if (!values.subject?.trim()) errors.subject = "Enter a subject.";
  if (!values.message?.trim()) errors.message = "Tell us how we can help.";
  return errors;
}
```

- [ ] **Step 4: Run the validation test**

Run: `node --test src/lib/contactForm.test.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/contactForm.js src/lib/contactForm.test.js
git commit -m "feat: add contact form validation"
```

### Task 3: Build the English Contact page

**Files:**
- Modify: `src/app/(public)/contact/page.jsx`
- Test: `npm run lint`, `npm run build`, and `node --test src/lib/contactForm.test.js`

**Interfaces:**
- Consumes: `validateContactForm(values)` from `src/lib/contactForm.js`.
- Produces: a client-rendered `/contact` form that blocks invalid submission and clearly describes its non-delivery state.

- [ ] **Step 1: Replace the placeholder with a source-based page hierarchy**

Use a dark hero, a six-card audience grid, the contact form, and a closing connection block. The audience labels must be:

```js
[
  "Students & Participants",
  "Employers",
  "Universities & Colleges",
  "Schools",
  "Government & Public Institutions",
  "Organizations & Strategic Partners",
]
```

- [ ] **Step 2: Implement the accessible form**

Add controlled fields for name, email, organization, audience (select), subject, and message. Each input gets a matching `<label>`, `aria-describedby` when it has an error, and an error element with a stable id. On submit:

```js
const nextErrors = validateContactForm(values);
setErrors(nextErrors);
setSubmitState(Object.keys(nextErrors).length ? "invalid" : "ready");
```

When valid, render this truthful status instead of claiming delivery:

```jsx
<p role="status">Your message is ready to send. Online submission will be available soon.</p>
```

- [ ] **Step 3: Add metadata and mobile layout behavior**

Export contact metadata, use a single column on mobile, and use two/three columns only at appropriate larger breakpoints. Keep the form within a readable content width.

- [ ] **Step 4: Run verification**

Run: `node --test src/lib/contactForm.test.js && npm run lint && npm run build`

Expected: validation test passes, lint exits 0, and `/contact` builds without a runtime/client-component error.

- [ ] **Step 5: Commit**

```bash
git add src/app/(public)/contact/page.jsx
git commit -m "feat: add English Contact page"
```

## Self-review

- Spec coverage: Tasks 1 and 3 cover the English About/Contact information architecture, accuracy constraints, metadata, responsiveness, and accessibility. Task 2 makes contact validation testable without introducing a submission backend.
- Placeholder scan: no unassigned steps or deferred implementation markers are used.
- Interface check: Task 2 produces `validateContactForm(values)` and Task 3 imports that exact function name.
