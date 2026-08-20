# Round 2 — Fix Plan

**Source:** `project-01-review-round-1_Final.md`
**Against:** Project 01 brief + Standards Ledger v1.0
**Base:** `github.com/amitsoni7198/revatics-training-01`
**Verdict to clear:** Not green — 8 blockers, 21 should-fixes, 2 judgement findings.

**Scope.** This plan covers **only** the review's **Blockers (B1–B8)**, **Should-fixes
(S1–S21)** and **Judgement findings (J1–J2)**, plus the ledger / docs / submission / gate
work needed to clear the verdict. The review's **Learn-later (L1–L10)** items and any
extra self-found findings are **intentionally excluded** — they do not block sign-off and
are carried forward in the review file if wanted.

**Verified.** Every finding below was re-checked against the current code on 20 Aug 2026.
All 8 blockers and 21 should-fixes are still present; nothing is fixed yet. Two review
details were corrected against the code and are noted inline (S6 image `sizes`, S9 render).

One fix per phase: files, rule, current code, the change, verification, commit.

---

## Totals

| Group                          | Findings | Phases                           |
| ------------------------------ | -------- | -------------------------------- |
| Blockers (B1–B8)               | 8        | 8                                |
| Should-fixes (S1–S21)          | 21       | 18 (S2+S17, B8+S5, B5+S4 merged) |
| Judgement (J1–J2)              | 2        | 2                                |
| Ledger, docs, submission, gate | —        | 4                                |
| **Total**                      | **31**   | **32**                           |

## Execution order

| Stage                                    | Phases | Contents                                  |
| ---------------------------------------- | ------ | ----------------------------------------- |
| **A — Questions first (no code)**        | 1–2    | J1, J2                                    |
| **B — Tooling & config**                 | 3–7    | B3, S16, S21, S11, S12                    |
| **C — Forcing constraint**               | 8      | B1                                        |
| **D — Functional miss**                  | 9      | B2                                        |
| **E — Accessibility (the failing gate)** | 10–18  | B6, B4, S18, B7, S1, S2+S17, S3, S20, S10 |
| **F — Static rendering**                 | 19     | B8+S5                                     |
| **G — Performance**                      | 20–21  | B5+S4, S6                                 |
| **H — Styling & data**                   | 22–24  | S7, S8, S9                                |
| **I — SEO, content, hygiene**            | 25–28  | S19, S15, S14, S13                        |
| **J — Ledger, docs, submission, gate**   | 29–32  | amendments, docs, pack, gate              |

**Why this order.** The questions (Phase 1) are the finding the review weighted highest and
unblock four later phases, so they come before any code. The Prettier rename (Phase 3)
reformats the whole repo, so do it before hand-edits to keep later diffs readable. Stage E
is where the failing gate lives — Accessibility is 89–96 against a required 100.

---

# Stage A — Questions first (no code)

## Phase 1 — J1: Send the batched questions

**Rule:** RV-J03, and new RV-I06. The review's central grade: four ambiguities resolved
silently. Send these before writing code; record questions **and** answers in `DECISIONS.md`.

1. **Missing content (highest).** No About prose, "people", or FAQ copy was supplied.
   `app/about/page.tsx` invents four people (Ellen Marsh, Mark Reeve, Priya Nair, Tomas
   Beck), titles, property assignments and history. Under **RV-I06 content must not be
   invented** — ask the client to supply it. Until then it must be removed, not relocated.
2. **Pagination** for 30 articles — confirm page size (the wireframe showed nine).
3. **FAQ placement** — propose header + footer; confirm.
4. **Home page property count** — state you chose N and why.
5. **Contact details / maps** — addresses, postcodes and a real map are not in the content
   pack; ask, rather than shipping grey boxes (see Phase 18).

## Phase 2 — J2: Raise the RV-B08 ledger conflict

**File:** `DECISIONS.md`. `error.tsx`/`global-error.tsx` must be Client Components, so
RV-B08 ("every route segment that can fail has an `error.tsx`") is unsatisfiable under the
forcing constraint. Your entry resolves this privately; the ledger invites the opposite —
_"If you think a rule is wrong, say so."_ Raise it in the PR and update the `DECISIONS.md`
entry to reference RV-B08 and record that it was flagged (the amendment lands in Phase 29).

---

# Stage B — Tooling & config

## Phase 3 — B3: Prettier has never run (wrong filename)

**File:** `prettierrc.json` → **`.prettierrc.json`** (leading dot). Prettier never loaded it,
so `singleQuote` never applied and `prettier-plugin-tailwindcss` never sorted classes.

- Rename, then `pnpm format`. Expect a **large diff** (double→single quotes + class sorting). Commit it **alone**.
- **Verify:** `pnpm format:check` clean. Never tick the DoD Prettier item again without running it.
  **Commit:** `chore: fix prettier config filename and format the repo`

## Phase 4 — S16: `lint` mutates the code it verifies

**File:** `package.json` — currently `"lint": "eslint . --fix"`.

```json
"lint": "eslint . --max-warnings=0",
"lint:fix": "eslint . --fix"
```

**Verify:** `pnpm lint` leaves `git status` clean.
**Commit:** `chore: split lint into check and fix`

## Phase 5 — S21: Build emits a workspace-root warning

**File:** `next.config.ts`. Next infers the wrong root because of a stray `package-lock.json`
on the review machine **and** the repo's own `pnpm-workspace.yaml` (a second root signal).
Delete the stray lockfile and pin the root:

```ts
const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  turbopack: { root: __dirname },
};
```

**Verify:** `pnpm build` prints no workspace-root warning (DoD: zero warnings).
**Commit:** `chore: pin turbopack workspace root`

## Phase 6 — S11: Missing `.nvmrc` and PR template

Add **`.nvmrc`** (the Node version) and **`.github/pull_request_template.md`** with the
self-review checklist (brief §7; there is no `.github/` dir yet).
**Commit:** `chore: add nvmrc and pull request template`

## Phase 7 — S12: `.env.example` has no comment

**File:** `.env.example` — one line, no comment, no trailing newline (RV-I03).

```bash
# Public base URL of the deployed site, no trailing slash.
# Used for canonical URLs, sitemap.xml and Open Graph image URLs.
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**Commit:** `docs: document env.example variable`

---

# Stage C — Forcing constraint

## Phase 8 — B1: `use client` is in the repository

**File:** `components/ui/FormattedDate.tsx:1` — the only occurrence. It also runs a
`useEffect` + `requestAnimationFrame` to reformat after paint. Single-locale (`lang="en"`)
site → format on the server, keep the `<time>`:

```tsx
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function FormattedDate({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  return (
    <time dateTime={date} className={className}>
      {dateFormatter.format(new Date(date))}
    </time>
  );
}
```

Fix the `DECISIONS.md` "visitor locale" reasoning — it's wrong for a single-locale site.
**Verify:** `grep -rn "use client" . --exclude-dir=node_modules --exclude-dir=.next` → nothing.
**Commit:** `fix: render dates on the server, remove the only client component`

---

# Stage D — Functional miss

## Phase 9 — B2: The property prose never appears

**File:** `app/properties/[slug]/page.tsx:143` renders `{property.summary}` (the one-line
card blurb) under "About the property" and discards the MDX body — several hundred words per
property, written by the client. Import and render it like the journal article page:

```tsx
const { default: PropertyBody } = await import(
  `@/content/properties/${slug}.mdx`
);
// under "About the property", replace <p>{property.summary}</p> with:
<PropertyBody />;
```

**Verify:** `/properties/fern-and-anchor` shows the terraces / wartime beds / fig paragraphs.
**Commit:** `fix: render property MDX bodies`

---

# Stage E — Accessibility (the failing gate: 89–96 → 100)

## Phase 10 — B6: `muted` on `surface` fails contrast

**File:** `app/globals.css:5` — `--color-muted: #71717a` is 4.40:1 on `surface` (fails AA).
Ledger-corrected value:

```css
--color-muted: #6b6b73; /* 4.80:1 on surface, 5.28:1 on canvas */
```

**Also in this commit:** the three `app/**/opengraph-image.tsx` files hardcode `#71717a`;
change them to `#6b6b73` so they don't drift from the theme.
**Verify:** re-run Lighthouse contrast audit on all three pages, both viewports.
**Commit:** `fix: correct muted token to meet AA on surface`

## Phase 11 — B4: Invalid `<ul>` child in the footer

**File:** `components/layout/Footer.tsx:53` — a bare `<span>·</span>` is a direct child of a
`<ul>` in the Contact column (axe: "Lists do not contain only `<li>`…"). Remove it; produce
any separator with CSS `gap`/border, not a text node inside the list.
**Verify:** axe clean; the list contains only `<li>`.
**Commit:** `fix: remove invalid span child from footer list`

## Phase 12 — S18: Footer separators inside the link text

**File:** `components/layout/Footer.tsx:31-33` — the middot sits **inside** each `<Link>` in
the Explore column, so the accessible name is "Properties·" (RV-D09). Move it out of the
`<Link>`, or render it with CSS.
**Verify:** each link's accessible name is the label alone.
**Commit:** `fix: keep footer separators out of link names`

## Phase 13 — B7: Heading levels skip `<h1>` → `<h3>`

**Files:** `components/ArticleCard.tsx:27`, `components/PropertyCard.tsx:32` (both hardcode
`<h3>`); `app/journal/page.tsx`, `app/properties/page.tsx` (page `<h1>` straight into cards).
Make the card heading level a prop rather than bolting on a section `<h2>` — the reusable fix
(project 3 is a component library):

```tsx
export function ArticleCard({
  article,
  as: Heading = 'h3',
}: {
  article: ArticleWithSlug;
  as?: 'h2' | 'h3' | 'h4';
}) {
  /* render <Heading> */
}
```

Index pages pass `as="h2"`. Home ("Our properties"/"From the journal" `<h2>` above the grid)
and article "More from the journal" keep the `h3` default. Same for `PropertyCard`.
**Verify:** Lighthouse "sequentially-descending headings" passes on `/journal` and `/properties`.
**Commit:** `fix: configurable card heading level to avoid skipped headings`

## Phase 14 — S1: No skip link

**File:** `app/layout.tsx:24` has `<main id="main">` but no link. Add as the first focusable element:

```tsx
<a
  href="#main"
  className="focus:bg-canvas sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
>
  Skip to content
</a>
```

**Commit:** `feat: add skip-to-content link`

## Phase 15 — S2 + S17: Two `<nav>` landmarks with the same label

**File:** `components/layout/Header.tsx:13,34` — desktop and mobile-`<details>` navs both
render `aria-label="Primary"` and both are in the DOM on every page, so screen readers get
the nav twice. Render **one** nav and restyle it responsively, or give distinct labels.
Prefer one nav.
**Verify:** served HTML has a single primary navigation.
**Commit:** `fix: single primary navigation landmark`

## Phase 16 — S3: Mobile menu stays open after navigating

**File:** `components/layout/Header.tsx`. The `<details>` lives in the root layout and keeps
its `open` attribute across client navigation. Without JS this is genuinely hard — use
`<details name="…">` or a `:target`-based pattern. Capture the behaviour in the recording (Phase 31).
**Commit:** `fix: close mobile menu on navigation`

## Phase 17 — S20: Hero `alt` is hardcoded and generic

**File:** `app/page.tsx:24` — `alt="English coastline"` is invented in the component. Source
alt from content / a strings entry that describes the image's purpose (RV-D04), like every
other image. Depends on Phase 1 (image source) if the hero image changes.
**Commit:** `fix: meaningful home hero alt text`

## Phase 18 — S10: Empty grey boxes with no accessible content

Bare `bg-surface` placeholders: `app/contact/page.tsx:75` (map), `app/properties/[slug]/page.tsx:207`
(Location map) and `:157` (room images), `components/ArticleCard.tsx:14` (no-image article).

- **Maps** (requirement 7): render a real `<iframe>` embed or static map image **with a
  `title`/`alt`** — or, if judged out of scope, that is a Phase 1 question, not a silent box.
- **Room images:** rooms have no image in content — render text rows, no empty box.
- **No-image article:** omit the container entirely rather than an empty full-width box.
  **Verify:** no empty landmark/box announces nothing to a screen reader.
  **Commit:** `fix: real maps and no empty placeholder boxes`

---

# Stage F — Static rendering

## Phase 19 — B8 + S5: `/journal` renders dynamic (pagination)

**File:** `app/journal/page.tsx` reads `searchParams` (`?show=all`), which opts the whole
route out of static rendering, and the "3-then-all" toggle is not real pagination. Replace
with **static route segments** at nine per page (the wireframe):

- `/journal` = page 1.
- Add `app/journal/page/[page]/page.tsx` with `generateStaticParams()` for pages `2…N`
  (29 articles / 9 = 4 pages); slice `getAllArticles()`; numbered prev/next links.
- Remove all `searchParams` usage.
  **Verify:** build route table shows no `ƒ` for journal; every page prerenders; pagination works
  with JavaScript disabled; sitemap re-counts (41 → 44).
  **Commit:** `feat: paginate journal with static route segments`

---

# Stage G — Performance (LCP 2.1–2.3s → < 2.0s)

## Phase 20 — B5 + S4: Heroes missing `priority`, legacy JS

- **`priority`** is missing on the home hero (`app/page.tsx:23-29`) and the property hero
  (`app/properties/[slug]/page.tsx:77`) — the About and journal-article heroes already have it.
  ```tsx
  <Image
    src={heroWide01}
    alt="…"
    fill
    priority
    sizes="100vw"
    className="object-cover"
  />
  ```
- **Legacy JavaScript (~14 KiB, all pages):** `tsconfig.json` `target` is `ES2017`, so the
  build ships transpiled output + polyfills for browsers your audience doesn't use. Raise to
  `ES2022` (or `ESNext`) and check what `browserslist` resolves to.
  **Verify:** LCP < 2.0s on all three mobile runs; legacy-JS insight gone.
  **Commit:** `perf: prioritise LCP heroes and raise build target`

## Phase 21 — S6: `sizes` under-fetches on two components

Current (verified): home hero `sizes="(min-width: 768px) 1200px, 350px"` and
`PropertyCard.tsx:6` `sizes="(max-width: 768px) 350px, 384px"` — both under-fetch on mobile
(a 350px slot on 3× needs ~1050px). `ArticleCard` is already correct; copy its pattern:

```tsx
sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px';
```

(Home hero is full-bleed → `sizes="100vw"`.)
**Commit:** `fix: correct responsive image sizes`

---

# Stage H — Styling & data

## Phase 22 — S7: `font-serif` on the properties page

**File:** `app/properties/page.tsx:17`. No serif family is defined (Inter only), so it falls
back to a system serif. Remove `font-serif`.
**Commit:** `fix: use Inter on the properties heading`

## Phase 23 — S8: Arbitrary aspect ratios

**Rule:** RV-C02. Transcribed pixel ratios across the app:
`aspect-3/1` (`page.tsx:22`, `journal/[slug]:67`, `about:59`, `properties/[slug]:76`),
`aspect-141/140` (`about:99`), `aspect-7/5` + `aspect-12/5` (`properties/[slug]:91`),
`aspect-35/16` + `aspect-16/11` (`properties/[slug]:157`), `aspect-91/32`
(`properties/[slug]:193`), `aspect-35/22` + `aspect-15/4` (`properties/[slug]:207`, `contact:75`).
Fidelity is not graded. Pick a small intentional set — **`3/2`** cards, **`3/1`** wide heroes,
**`1/1`** portraits, **`4/3`** mobile — and use them consistently.
**Commit:** `refactor: use a fixed set of aspect ratios`

## Phase 24 — S9: `dogsAllowed` defaulting to `false` invents a fact

**File:** `lib/schemas.ts:31`. The Herring House omits the field; `.default(false)` models
absence as "no dogs". (The property page already only shows "Dogs welcome" when true, so no
false claim is _printed_ today — but the model is still wrong.) Model unknown as unknown:

```ts
dogsAllowed: z.boolean().optional(),
```

Keep the render behaviour: show "Dogs welcome" only when `true`; nothing when `undefined`.
**Commit:** `fix: model dogsAllowed as optional, not false`

---

# Stage I — SEO, content, hygiene

## Phase 25 — S19: Home `<title>` is one word

**File:** `app/page.tsx:11-13` — metadata is only `{ alternates }`, so the title falls to
`site.name` ("Harbourview"). Add a real `title` and a distinct `description` (not the same
sentence as the `<h1>`), and add `og:type`, `og:url`, `og:site_name` (absent site-wide — set
them on the root layout `openGraph`, override per page).
**Commit:** `feat: home metadata and site-wide Open Graph fields`

## Phase 26 — S15: FAQ unreachable

`/faq` is linked only from a sentence on `app/contact/page.tsx:24`. Link it from the header
and/or footer (record the placement decision, Phase 1 q3). This also uses `site.faqLink`,
resolving part of Phase 27.
**Commit:** `feat: surface FAQ in navigation`

## Phase 27 — S14: Dead code

**Rule:** RV-J01. `components/ui/Badge.tsx` is never imported; `Button` (as opposed to
`ButtonLink`) is never used; `site.faqLink` was never read (fixed in Phase 26).

- **Use `Badge`** for room features (Phase 23 area) — closes two findings.
- **`Button`:** either use it or delete it. If arguing to keep it for the base template
  (brief §9), make that case in `DECISIONS.md`; otherwise remove it.
  **Commit:** `refactor: remove or wire up dead components`

## Phase 28 — S13: Git hygiene

**Rules:** RV-H02/H03/H04/H10. Going forward: branch `feature/<description>` (not
`revatics-training-01`); Conventional Commits, imperative subject < 72 chars, **bodies
explain why**; no `fix: test` / rambling messages; real PR description with screenshots.
**Commit:** n/a — process for round 2.

---

# Stage J — Ledger, docs, submission, gate

## Phase 29 — Record the four ledger amendments

**File:** `LEDGER.md`. Add/amend and log in the Amendments table (bump to v1.1):

| Rule                                                  | Change                                                                                                                  |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **RV-B08**                                            | Waived where a constraint makes `error.tsx` impossible; the conflict must be raised, not resolved silently.             |
| **RV-I06** _(new)_                                    | Missing required content is raised as a question; content is never invented (names, roles, addresses, prices, history). |
| **RV-D06**                                            | Harbourview `muted` corrected to **#6B6B73**; supplied tokens are contrast-checked, not trusted.                        |
| **RV-E03**                                            | First Load JS can't be read from Next 16 Turbopack output; **waived for project 01**, enforced from project 9.          |
| **Commit:** `docs(ledger): record round-1 amendments` |

## Phase 30 — Rewrite `README.md`, `DECISIONS.md`, `SELF-REVIEW.md`

- **`DECISIONS.md`:** remove the invented-content defence; fix the `FormattedDate` locale
  reasoning; record J2 (RV-B08 conflict raised); record the FAQ placement and pagination decisions.
- **`SELF-REVIEW.md`:** no claim that can't be demonstrated (round 1 over-claimed Prettier).
  Keep "Where I struggled"; add the round-2 lesson — four ambiguities resolved alone.
- **`README.md`:** document the new pagination routes and split lint scripts; add the
  architecture reasoning RV-I01 asks for (this repo is the base template, brief §9).
  **Verify:** read all three against the shipped code; every claim demonstrable.
  **Commit:** `docs: bring readme, decisions and self-review in line with round 2`

## Phase 31 — Complete the submission pack

**Rule:** brief §8 — from round 2 an incomplete pack is returned unread.

- Lighthouse output (JSON, not just screenshots) — home, a property, an article; mobile, throttled.
- Screen recording — mobile, desktop, **keyboard-only**: skip link on first Tab (14), mobile
  menu closing (16), pagination with JS disabled (19), 320px no h-scroll, 200% zoom.
- Link the live Vercel preview; real PR description.
- **Tag `submission-v2`** so the reviewer diffs against `submission-v1`.

## Phase 32 — Final verification gate

**Constraint**

- [ ] `grep -r "use client" . --exclude-dir=node_modules --exclude-dir=.next` → nothing
- [ ] Every page renders with JavaScript disabled — **including pagination**

**Build**

- [ ] `pnpm build` — zero errors, zero warnings
- [ ] Route table `○`/`●` for every route — **no `ƒ`**
- [ ] `pnpm start` — every page loads · Vercel preview live and linked

**Types & linting**

- [ ] `pnpm typecheck` zero errors · `pnpm lint` clean **and `git status` clean after** · `pnpm format:check` clean

**Performance** (mobile, throttled, production)

- [ ] Performance ≥ 95 · **Accessibility = 100 both viewports** · Best Practices ≥ 95 · SEO = 100
- [ ] CLS = 0 · LCP < 2.0s · First Load JS **waived (RV-E03)**

**Accessibility**

- [ ] Zero axe violations · fully keyboard-usable · visible focus on every interactive element
- [ ] One `<h1>` per page, no skipped levels (check built HTML) · 320px no h-scroll · 200% zoom

**SEO & content**

- [ ] Unique title + description per page incl. `/` · `og:type`/`og:url`/`og:site_name` · canonicals
- [ ] Sitemap re-counted after pagination · draft absent from listings/routes/sitemap
- [ ] A malformed content file fails the build naming file + problem (test, then revert)

**Repository**

- [ ] All required files present · no secrets/`.env`/build output in history · Conventional commits with bodies

---

## The one thing worth keeping in view

The review's closing point is the actual grade: _"things you decided quietly that should
have been questions"_ — pagination, FAQ placement, invented staff, the ledger conflict. That
is why **Phases 1–2 come before any code and have no diff.** The rest is, in the reviewer's
words, "an afternoon's work". Getting the questions sent before Phase 3 starts is the part of
this plan that changes the round-2 outcome.
