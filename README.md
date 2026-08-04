# Harbourview Collective

A marketing website for a small group of six independent guesthouses on the
south coast of England. It shows the properties, a journal of local articles,
an about page, a contact page and an FAQ.

**Live site:** `https://revatics-training-01.vercel.app/`

## Tech

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **MDX** for the property and journal content
- **Zod** for validating that content

Pages are server-rendered by default. The only piece that runs in the browser
is the date label, which shows dates in the visitor's own locale.

## Getting started

You need Node and pnpm installed.

```bash
pnpm install
```

Create a `.env.local` file (you can copy `.env.example`) and set the site URL:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then run the dev server:

```bash
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command          | What it does                        |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Start the dev server                |
| `pnpm build`     | Build for production                |
| `pnpm start`     | Run the production build            |
| `pnpm lint`      | Run ESLint                          |
| `pnpm typecheck` | Check types with the TypeScript CLI |
| `pnpm format`    | Format the code with Prettier       |

## Folder structure

```
app/            The pages and routes
components/     Reusable UI (header, footer, cards, buttons)
content/        The property and journal articles (MDX)
lib/            Content loading, schemas, site settings, helpers
public/images/  The images
```

## How the content works

The property and journal articles live as MDX files in `content/`. Each file has
some settings at the top (title, date, images, and so on) and the article text
below.

- `lib/schemas.ts` describes the shape each file must follow.
- `lib/content.ts` reads the files, checks them against those shapes, and hands
  them to the pages.
- If an article is marked as a draft, it is hidden everywhere — it does not show
  in any list, does not get its own page, and does not appear in the sitemap.

Because the content is checked when the site builds, a mistake in a file stops
the build instead of shipping a broken page.

## SEO

The site includes a sitemap, a robots file, social share (Open Graph) images for
every page, canonical links, and structured data for the properties.

## Notes

The wireframe was a layout guide, not a finished visual design. Where it left
something open, the choice is written down in `DECISIONS.md`. A short list of
known gaps and things to improve is in `SELF-REVIEW.md`.
