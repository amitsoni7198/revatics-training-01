# Decisions

Records of decisions that a LEDGER rule requires to be written down.

## `use client` justifications

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

`inline `style`in`opengraph-image`

**Decision:** the `opengraph-image.tsx` files use inline `style` objects.

**Why:** they render through `next/og`'s `ImageResponse`, which does not support
Tailwind classes — only inline styles. RV-C04 permits inline style for
genuinely rendered/computed values, which this is. These files run server-side
(build/request time), so no client component is involved.

`dangerouslySetInnerHTML` for JSON-LD

**Decision:** property structured data is injected with a plain `<script
type="application/ld+json">` using `dangerouslySetInnerHTML`.

**Why:** this is the standard Next pattern for JSON-LD and needs no client
component. The input is our own typed object run through `JSON.stringify` — not
user input — so there is no injection risk.
