## What changed and why

<!-- One or two lines on what this PR does, and the reason for it. -->

## Self-review checklist

- [ ] `grep -r "use client"` returns nothing
- [ ] `pnpm typecheck`, `pnpm lint` and `pnpm format:check` all pass
- [ ] `pnpm build` has zero errors and zero warnings; every route is prerendered (no `ƒ`)
- [ ] Every page still works with JavaScript turned off
- [ ] Lighthouse (mobile): Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO = 100
- [ ] No axe violations; usable with the keyboard only; a visible focus ring on every control
- [ ] Exactly one `<h1>` per page, with no skipped heading levels
- [ ] Only theme tokens used — no hardcoded colours, spacing, or arbitrary values
- [ ] No secrets, `.env` files, or build output committed

## Screenshots / recording

<!-- Add screenshots for anything visual, and the screen recording for the submission. -->
