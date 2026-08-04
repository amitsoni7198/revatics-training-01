# Decisions

Records of decisions that a LEDGER rule requires to be written down.

## `use client` justifications (RV-B01)

### `components/ui/FormattedDate.tsx`

**Browser API required:** `Intl.DateTimeFormat` resolving the viewer's own
locale and timezone at runtime.

**Why the server cannot do this:** RV-G02 requires dates to be formatted at
render time in the user's locale and timezone. The pages that render dates
(journal list, journal detail, article cards) are statically generated
(`generateStaticParams`), so on the server the visitor's locale/timezone is
unknown — server formatting would bake in a single build-time locale. Only
client-side `Intl` can resolve the actual viewer's locale, so this must run in
the browser.

**Scope (RV-B02):** kept to the smallest possible leaf — a single `<time>`
element. No page, layout, or container is a client component; only this leaf is.
