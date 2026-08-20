# Decisions

The choices that were not obvious, with the option I picked and what I turned
down.

## Content shape

**Decision:** each field in the content files is marked as required or optional
based on what the files actually contain and what the pages need. For example a
property must have a name, town, hero image and at least one room; a gallery is
optional.

**Why:** if everything were optional, every page would need extra checks and a
missing important field would slip through silently.

**Instead of:** making everything optional, which passes validation but proves
nothing.

## Missing images and maps

**Decision:** where there is no real content for something, the page does not
show an empty grey box. Rooms are listed as text (no room photos were supplied),
an article with no photo has no image area, and the maps are links to an online
map search rather than a placeholder box.

**Why:** an empty grey box tells a visitor nothing and reads as broken to a
screen reader. Leaving it out, or linking to a real map, is honest and useful.

**Instead of:** inventing images, reusing unrelated ones, or shipping empty boxes.

## Everything is server-rendered

**Decision:** the whole site is server-rendered. There are no browser
(`use client`) components at all.

**Why:** the site is English-only (`lang="en"`), so there is one fixed date
format and no reason to read the visitor's locale in the browser. Formatting the
date on the server keeps the page simple, ships no extra JavaScript, and avoids a
flash where the text changes after the page loads.

**Instead of:** an earlier version formatted dates in a small browser component.
That broke the project rule against `use client` and gave every visitor a repaint
for no benefit, so it was removed.

## No custom error page (and a conflict I raised)

**Decision:** there is no custom `error.tsx`. The site relies on the framework's
built-in error handling, plus the content being checked at build time so a bad
file stops the build instead of breaking a live page. Wrong URLs show a friendly
"page not found".

**Why:** a custom `error.tsx` has to be a Client Component (it needs `use client`),
and this project's forcing constraint bans that string everywhere. So the two rules
cannot both be met.

**The conflict:** ledger rule **RV-B08** says every route segment that can fail has
an `error.tsx`. On this project that is impossible for the reason above. The ledger
also says _"If you think a rule is wrong, say so,"_ so instead of quietly ignoring
RV-B08 I raised it with the reviewer. It has since been amended: where a project
constraint makes `error.tsx` impossible, the rule is waived for that project and the
conflict must be flagged rather than resolved silently.

## About, contact and FAQ are static

**Decision:** the About, Contact and FAQ pages keep their text directly in the
page, not in MDX files.

**Why:** their content is short and fixed, so a full content pipeline would be
more setup than it is worth. Properties and journal articles, which are many and
change often, do use MDX.

## Dates

**Decision:** dates are stored in the files in a plain year-month-day format and
formatted on the server with `Intl.DateTimeFormat` in `en-GB`, in UTC.

**Why:** storing a simple, sortable date and formatting it with `Intl` avoids
hand-built date strings and keeps sorting reliable. Fixing the locale to `en-GB`
and the timezone to UTC means the date reads the same for everyone and never
shifts across timezones.

## Social share images

**Decision:** the Open Graph images are built with inline styles.

**Why:** the tool that generates these images does not support the normal styling
classes, so inline styles are the only option.

## Property structured data

**Decision:** each property page includes a small block of structured data for
search engines, added with a script tag.

**Why:** this is the standard way to add it, and the data is our own, built from
the property, so there is no safety concern.

## Contact details

**Decision:** the contact page shows the one shared email and phone number for
every property, the town and county for each house, and a link to find each
house on an online map.

**Why:** the content does not include a separate email, phone, street address or
map coordinates per property. I asked the client for these; until they arrive,
the shared details plus a map link are the honest options.

**Instead of:** making up an address, email and phone for each house, or showing
an empty map box.

## About content and the people

**Decision:** the About page keeps only text that is true (six independent
guesthouses on the south coast, owner-run, book direct). It does not name the
people or tell an origin story.

**Why:** none of that was supplied. Round 1 invented four staff members and a
history, which the new rule RV-I06 forbids. The people section is left out and
raised as a question to the client, rather than shipping invented names.

**Instead of:** inventing names, roles and history to fill the page.

## Where the FAQ lives

**Decision:** the FAQ is linked from the footer (in the Explore list) and also
from a line on the contact page.

**Why:** the brief said to place it "wherever you judge it belongs." The footer
is on every page, so the FAQ is reachable everywhere without adding a fifth item
to the main header navigation.

## Journal pagination

**Decision:** the journal shows nine articles per page. Page one is `/journal`;
later pages are static routes `/journal/page/2`, `/journal/page/3`, and so on.

**Why:** query-string paging (`?show=all`) forced the whole route to render on
every request. Real page routes can be built ahead of time, so every page is
static and cacheable, and the URLs are better for search engines.

**Instead of:** a "show all" toggle, or reading the page from `searchParams`.
