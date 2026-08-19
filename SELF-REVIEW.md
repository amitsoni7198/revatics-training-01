# Self review

My own list of what is done, what is missing, and what I would improve, before
anyone else looks at it.

## Checks that pass

- The site builds with no errors.
- Types check with no errors.
- Linting passes with no warnings.
- Draft articles are hidden from every list, have no page, and are not in the
  sitemap.
- Every page has its own title and description, a canonical link, and a social
  share image. Properties also have structured data.
- The layout works from mobile width up to desktop.
- Links, buttons and the menu work with the keyboard, and images have alt text.

## Known gaps

- **Placeholder images.** Room photos, some staff portraits, and the maps are
  grey placeholders because no real images were provided. They are ready to be
  swapped for real files.
- **Shared contact details.** The contact page shows the same email and phone for
  every property, because the content does not include per-property contact
  details or street addresses.
- **Date label runs in the browser.** Showing dates in the visitor's locale needs
  the browser, so the date is the one small part that is not server-only.

## Where I struggled

Being honest about the parts I found hard:

- At first glance I understood the overall idea of what I had to build, but
  working out the details took longer.
- Most of the time my first thought was to reach for a browser component
  (`use client`), because that felt like the easy way to get something working.
  I need to stop and check whether the server can do it first.
- I am still weak on the logic, on understanding how the pieces fit together, and
  on writing and validating the content schemas.
- These are the areas I need to research more and keep practising until I can fix
  them on my own.

## What I would do next

- Add real room, portrait and map images.
- Add a separate email, phone and address for each property in the content, and
  show those on the contact page.
- Add a small set of automated tests for the content loading and the pages.
