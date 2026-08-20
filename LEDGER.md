# Revatics Standards Ledger

**Version:** 1.1 — in force from Project 01 (amended after the Project 01 review)
**Applies to:** all Next.js projects in the training programme, and to client work thereafter

---

## How this document works

Every rule here is numbered and permanent. Once a rule is added it applies to that project and every project after it.

Rules are added in two ways: from the standards defined in a project brief, and from accepted review findings. When a review finding becomes a rule, it is recorded with the project it came from.

You keep a copy of this file in every repository. Before submitting, read it and check your work against it. Reviews are conducted against this document plus the current brief — nothing else. If something is not in here or in the brief, it does not block sign-off.

If you think a rule is wrong, say so. Rules get amended when the argument is good.

---

## A — TypeScript

**RV-A01** `strict: true` in `tsconfig.json`. Never disabled, never partially relaxed.

**RV-A02** No `any`. If you genuinely cannot type something, use `unknown` and narrow it.

**RV-A03** No non-null assertion (`!`) without a comment on the line above explaining why it is safe.

**RV-A04** No `as` type casting to force a value into a shape. Casting to satisfy the compiler hides the actual problem. Narrow, validate, or fix the type.

**RV-A05** No `@ts-ignore`. `@ts-expect-error` is permitted only with a comment explaining the cause and the plan to remove it.

**RV-A06** Types are inferred where inference is clear, and explicit at every module boundary — exported functions, component props, and anything crossing a file.

**RV-A07** Prefer `type` for object shapes and unions. Use `interface` only where declaration merging or extension is genuinely needed.

**RV-A08** No enums. Use a union of string literals or an `as const` object.

---

## B — React and Next.js

**RV-B01** No `use client` without a written justification in `DECISIONS.md` naming the specific browser API or interaction that requires it.

**RV-B02** Where a client component is necessary, it is the smallest possible leaf of the tree. Never a layout, never a page, never a container that could stay on the server.

**RV-B03** No `useEffect` for data fetching under any circumstances.

**RV-B04** No `React.FC`. Type props directly on the function signature.

**RV-B05** Component props extend the underlying native element's props where a native equivalent exists, so consumers can pass `className`, `aria-*` and event handlers through.

**RV-B06** No component file over 150 lines. Past that, it is doing more than one thing.

**RV-B07** No index-based React keys on lists whose order or contents can change.

**RV-B08** Every route segment that fetches or can fail has an `error.tsx`. Every page that can be reached with invalid parameters handles that case explicitly. _Amended (Project 01): where a project constraint makes `error.tsx` impossible (e.g. a ban on `use client`), the requirement is waived for that project and the conflict must be raised with the reviewer rather than resolved silently._

**RV-B09** Every view is designed for four states: loading, empty, error, and — where relevant — offline. A view that only handles the success case is incomplete.

**RV-B10** No raw `<img>`. All images through `next/image` with explicit dimensions or `fill`, plus an accurate `sizes` attribute.

**RV-B11** All fonts self-hosted through `next/font`. No external font stylesheet links.

**RV-B12** No `<a>` for internal navigation. Use `next/link`.

---

## C — Styling

**RV-C01** No hardcoded colour values anywhere outside the theme configuration. No hex codes, no `rgb()`, no named colours in component files.

**RV-C02** No arbitrary Tailwind values (`w-[347px]`, `text-[#1a2b3c]`, `mt-[13px]`) without a comment justifying why no token fits. If you need it repeatedly, it should be a token.

**RV-C03** Spacing comes from the scale. No one-off margins that break the rhythm.

**RV-C04** No inline `style` attributes except where a value is genuinely computed at runtime.

**RV-C05** Class strings composed with the `cn` helper (`clsx` + `tailwind-merge`). No manual string concatenation of class names.

**RV-C06** Component variants defined with `class-variance-authority`, not with chains of conditionals.

**RV-C07** Layouts are responsive by construction, not by a stack of breakpoint overrides patching a desktop-first design.

---

## D — Accessibility

**RV-D01** Semantic HTML first. A `<div>` with a click handler is never acceptable where a `<button>` exists. Landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) present on every page.

**RV-D02** Exactly one `<h1>` per page. No skipped heading levels.

**RV-D03** Every interactive element operable by keyboard, with a visible focus indicator. Never remove focus outlines without replacing them with something at least as visible.

**RV-D04** Every image has an `alt` attribute. Decorative images use `alt=""`. Alt text describes purpose, not appearance.

**RV-D05** Colour is never the only means of conveying information.

**RV-D06** Contrast meets WCAG 2.2 AA: 4.5:1 for body text, 3:1 for large text and interactive boundaries. _Amended (Project 01): supplied design tokens are to be contrast-checked, not trusted. The Harbourview `muted` token was corrected to #6B6B73._

**RV-D07** Zero axe violations on every page.

**RV-D08** All content usable at 320px width without horizontal scrolling, and at 200% zoom without loss of content or function.

**RV-D09** Link and button text is meaningful out of context. No "click here" or "read more" as the entire accessible name.

---

## E — Performance

**RV-E01** Lighthouse thresholds met on the production build under mobile throttling. Targets are set per project.

**RV-E02** Cumulative Layout Shift of zero. Reserve space for every image, embed and dynamically sized element.

**RV-E03** First Load JS budget defined per project and enforced. Exceeding it requires investigation, not an exception. _Amended (Project 01): Next 16 Turbopack builds do not print per-route bundle sizes, so this budget cannot be verified from build output alone. Waived for Project 01; enforced from Project 09 onwards using `@next/bundle-analyzer`._

**RV-E04** No dependency added for functionality achievable in under about thirty lines of your own code.

**RV-E05** Third-party scripts loaded through `next/script` with an appropriate strategy, never a bare `<script>` tag.

---

## F — Data and security

**RV-F01** No authentication token, session token or API key in `localStorage`, `sessionStorage`, or any cookie readable by JavaScript.

**RV-F02** No secret in any variable prefixed `NEXT_PUBLIC_`. Assume everything with that prefix is published.

**RV-F03** All environment variables read through a single validated env module. No bare `process.env` access anywhere else.

**RV-F04** Every external API response validated at the boundary before use. Never trust a response shape.

**RV-F05** Raw backend error messages never reach the user interface. Errors are normalised into typed application errors first.

**RV-F06** Any module handling secrets imports `server-only`.

---

## G — Content and copy

**RV-G01** No hardcoded user-facing strings scattered through components. Content lives in content files, data files, or a strings module.

**RV-G02** Dates stored and transmitted as UTC ISO 8601. Formatting happens at render time in the user's locale and timezone.

**RV-G03** Numbers, currency and dates formatted through `Intl`, never by string manipulation.

---

## H — Git

**RV-H01** `main` is always deployable. No direct pushes; every change arrives by pull request.

**RV-H02** One concern per branch, one concern per pull request.

**RV-H03** Conventional Commits format, enforced by commitlint. Imperative mood. Subject under 72 characters.

**RV-H04** Commit bodies explain _why_. The diff already shows what.

**RV-H05** No commit leaves the application broken. Every commit builds.

**RV-H06** No secret, `.env` file, or build output ever committed. This is an automatic non-green, including when a later commit removes it.

**RV-H07** No commented-out code. Delete it; git remembers.

**RV-H08** No `TODO` or `FIXME` without an accompanying ticket reference.

**RV-H09** Branches deleted after merge.

**RV-H10** Pull request descriptions state what changed and why, with screenshots for anything visual.

---

## I — Documentation

**RV-I01** `README.md` covers setup from a clean machine, the architecture, and the reasoning behind the structure. Someone who has never seen the project should be able to run it.

**RV-I02** `DECISIONS.md` records every non-obvious technical choice, the alternatives considered, and why they were rejected.

**RV-I03** `.env.example` lists every variable with a comment explaining its purpose. Kept in step with the code.

**RV-I04** `SELF-REVIEW.md` completed honestly before every submission. "Everything looks good" is not a self-review.

**RV-I05** Code comments explain _why_, not what. A comment restating the line above it is noise.

**RV-I06** Where required content is not supplied, it is raised as a question. Content is never invented — names, roles, addresses, prices and history in particular. _Added after the Project 01 review._

---

## J — Judgement

These are not mechanical, and they are graded.

**RV-J01** Match the complexity of the solution to the complexity of the problem. Unnecessary abstraction is a finding of equal weight to missing abstraction.

**RV-J02** Do not build anything listed as out of scope, however small and however much time you have.

**RV-J03** Raise ambiguities as questions before building. Guessing is a finding; asking is graded positively.

**RV-J04** If a deadline is going to slip, say so in advance with a revised date. Silent slippage is more serious than any code finding.

**RV-J05** Be able to explain every line you wrote and every fix you made. Code you cannot explain does not count as delivered.

---

## Amendments

| Date       | Rule   | Change                                                                          | Source                           |
| ---------- | ------ | ------------------------------------------------------------------------------- | -------------------------------- |
| —          | —      | Initial version                                                                 | Programme setup                  |
| 2026-08-20 | RV-B08 | Waived where a constraint makes `error.tsx` impossible; conflict must be raised | Project 01 review (brief defect) |
| 2026-08-20 | RV-I06 | New: missing content is a question; content is never invented                   | Project 01 review (finding J1)   |
| 2026-08-20 | RV-D06 | Harbourview `muted` corrected to #6B6B73; verify supplied tokens                | Project 01 review (finding B6)   |
| 2026-08-20 | RV-E03 | First Load JS unmeasurable in Turbopack; waived for Project 01                  | Project 01 review (brief defect) |
