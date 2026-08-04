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

## Images without real files

**Decision:** where there was no real image for something (room photos, staff
portraits, the map), the page shows a plain grey box in the right shape.

**Why:** the content pack did not include those images. A grey placeholder keeps
the layout correct and is easy to swap for a real image later.

**Instead of:** inventing or reusing unrelated images.

## Only one browser component

**Decision:** the whole site is server-rendered except for the date label,
which runs in the browser.

**Why:** dates should read in the visitor's own locale, and only the browser
knows what that is. It is kept to a single small piece so the rest of the site
stays fast and simple.

**Instead of:** making larger parts of the site run in the browser.

## No custom error page

**Decision:** there is no custom `error.tsx`. The site relies on the framework's
built-in error handling, plus the content being checked at build time so a bad
file stops the build instead of breaking a live page. Wrong URLs show a friendly
"page not found".

**Why:** a custom error page would have to run in the browser, and the content
checks already remove the main way a page could fail.

## About, contact and FAQ are static

**Decision:** the About, Contact and FAQ pages keep their text directly in the
page, not in MDX files.

**Why:** their content is short and fixed, so a full content pipeline would be
more setup than it is worth. Properties and journal articles, which are many and
change often, do use MDX.

## Dates

**Decision:** dates are stored in the files in a plain year-month-day format and
formatted for display with the browser's built-in date formatter.

**Why:** storing a simple, sortable date and formatting it at display time avoids
hand-built date strings and keeps sorting reliable.

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
every property, and the town and county for the address.

**Why:** the content does not include a separate email, phone or street address
per property, so the shared contact details and the location we do have are used.

**Instead of:** making up an address, email and phone for each house.
