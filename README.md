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

Every page is server-rendered and prerendered to static HTML — there are no
browser (`use client`) components at all. This repository is also the starting
template that later Revatics projects are forked from, so the config, tokens and
base components are meant to be reused.

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
| `pnpm lint`      | Run ESLint (check only, no changes) |
| `pnpm lint:fix`  | Run ESLint and fix what it can      |
| `pnpm typecheck` | Check types with the TypeScript CLI |
| `pnpm format`    | Format the code with Prettier       |

On a fresh clone, run `pnpm build` once before `pnpm typecheck` — the build
generates the gitignored `next-env.d.ts` that the type check needs.

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
- The journal list is paginated at nine articles per page: page one is
  `/journal`, and the rest are static routes `/journal/page/2`, `/journal/page/3`
  and so on.

Because the content is checked when the site builds, a mistake in a file stops
the build instead of shipping a broken page.

## SEO

The site includes a sitemap, a robots file, social share (Open Graph) images for
every page, canonical links, and structured data for the properties.

## Notes

The wireframe was a layout guide, not a finished visual design. Where it left
something open, the choice is written down in `DECISIONS.md`. A short list of
known gaps and things to improve is in `SELF-REVIEW.md`.
