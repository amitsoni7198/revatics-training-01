# Self review

My own list of what is done, what is missing, and what I would improve, before
anyone else looks at it.

## Checks that pass

- `pnpm build` completes with no errors and no warnings.
- `pnpm typecheck` and `pnpm lint` both pass, and `pnpm format:check` is clean.
  In round 1 the Prettier config filename was wrong, so it had never actually
  run and I wrongly reported it as passing. It runs now.
- No `use client` anywhere in the source. The whole site is server-rendered,
  including the dates.
- Every route is prerendered. The journal now paginates into static pages
  (`/journal`, `/journal/page/2` …) instead of one dynamic route.
- Draft articles are hidden from every list, have no page, and are not in the
  sitemap.
- Every page has its own title and description, a canonical link, and a social
  share image. Properties also have structured data.
- One `<h1>` per page with no skipped heading levels; `muted` text now meets
  WCAG AA on the surface colour; the footer is valid list markup.
- The layout works from mobile width up to desktop; images have alt text and
  correct responsive `sizes`.

## Known gaps (raised as questions with the client)

- **About "people" and full story.** No real names, roles or history were
  supplied, so the invented ones from round 1 were removed rather than shipped
  (RV-I06). The section is left out until the client provides real content.
- **Maps and addresses.** The content has no street addresses or coordinates, so
  the contact and property pages link out to a map search instead of embedding a
  map. A proper embedded map is pending real addresses.

## Where I struggled

- My first instinct was still to reach for a browser component (`use client`)
  before checking whether the server could do it. Round 1 shipped exactly that
  for the date label, and it had to be removed.
- The bigger lesson from the review: several things I decided quietly —
  pagination, where the FAQ belongs, the missing About content, a rule conflict —
  should have been questions to the client on day one, not decisions on day five.
- I still want more practice on how the pieces fit together and on writing and
  validating the content schemas.

## What I would do next

- Add the real About content and a proper embedded map once the client supplies
  the details.
- Add a small set of automated tests for the content loading and the pages.
