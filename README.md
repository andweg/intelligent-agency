# Understanding Intelligent Agency — reading group site

An unofficial companion site for running a nine-week reading and discussion group on Richard Ngo's
_Understanding Intelligent Agency_ curriculum. Static Astro site: no server, no database, no
accounts and no analytics. The only page that talks to anyone else is `/signup`, which embeds a
Tally form; every other page is self-contained.

## Running locally

```bash
npm install
```

```bash
npm run dev
```

Then open the URL it prints (http://localhost:4321 by default).

Other scripts:

| Script                 | What it does                                                |
| ---------------------- | ----------------------------------------------------------- |
| `npm run build`        | Builds the static site into `dist/`                         |
| `npm run preview`      | Serves the built `dist/` locally                            |
| `npm run check`        | Type-checks the components and validates every content file |
| `npm run format`       | Formats with Prettier                                       |
| `npm run format:check` | Checks formatting without writing                           |

A content file that breaks the schema fails `npm run build` loudly, with the offending file and
field named in the error. Reading `id`s must be unique within a week, and weeks must be numbered
`1..N` with no gaps — both are checked at build time.

## Adding or editing a week

Each week is one Markdown file in `src/content/weeks/`, named `week-NN.md`. The frontmatter holds
the structured data; the Markdown body below it is your own commentary.

```yaml
---
week: 3 # the URL (/week/3), and the weeks must run 1..N with no gaps
slug: expected-utility-maximization # not routing; the namespace for this week's progress keys
title: Expected Utility Maximization and its Discontents
summary: One or two sentences, shown on the week card and under the page title.
prerequisites: '' # Markdown; see below
objectives: '' # Markdown; see below
ngoIntro: | # quoted verbatim from the source document
  The axioms of expected utility theory are beautiful, and also flawed.
readings:
  - id: complete-class-consequentialist-foundations # unique within this week
    tier: main # main | supplementary
    title: 'Complete class: consequentialist foundations'
    authors: Abram Demski
    year: 2021 # optional
    url: https://example.com/post # or null if there is no link yet
    type: post # post | paper | book | video | podcast | reference
    excerpt: Pages 52-76 only # optional; shown as a badge
    minutes: 25 # whole positive number
    prerequisites: '' # Markdown; see below
    note: An editorial note about the source. # optional; small muted italic
---
Your own framing for this week. Rendered under the heading "Notes for this cohort".
```

Notes:

- **Do not re-sort readings.** They render in file order within each tier, which is the order the
  source curriculum uses.
- **`id` is the progress storage key.** Changing an `id` silently resets that reading's checkbox
  for everyone who had ticked it. Renaming a title is free; renaming an `id` is not.
- **`url: null`** renders the title as plain text rather than a broken link. Use it for readings
  the source document has not picked an excerpt or link for yet, and put the reason in `note`.
- **`excerpt`** matters: where only part of a book or talk is assigned, this is what stops someone
  reading the whole thing. Use the source document's own wording.
- The **body** is optional. While it still contains the shipped placeholder text (any body
  containing "Delete this placeholder"), the "Notes for this cohort" section is omitted entirely.
  The same applies to the body of `course.md` on the homepage.

To add a tenth week: create `src/content/weeks/week-10.md` with `week: 10`. Nothing else needs
changing — the route, sidebar, homepage list, band, prev/next controls and totals are all derived.

Week pages route by number: `/week/3`, never by slug. `src/lib/links.ts` is the only place that
knows that, so changing the URL shape is a one-line edit. `slug` stays in the schema because it
namespaces the progress keys — renaming one resets that week's checkboxes for everyone.

## Filling in prerequisites and objectives

Three fields ship as empty strings and are meant for you to fill in:

| Field                          | Where it shows                                                |
| ------------------------------ | ------------------------------------------------------------- |
| `prerequisites` (week level)   | A bordered accent callout above the readings                  |
| `objectives` (week level)      | A lighter callout below prerequisites                         |
| `prerequisites` (on a reading) | An indented block under that reading, prefixed "Before this:" |

All three accept Markdown, so links, emphasis and lists work:

```yaml
prerequisites: |
  Comfortable with basic probability. If not, read
  [Pearlian inference](https://example.com) from week 2 first.
```

While a field is `''` the whole section is omitted — no empty heading, no "TBD" placeholder. So
you can fill them in one week at a time.

## Updating `syncedAt`

`src/content/course.md` carries a `syncedAt` date:

```yaml
syncedAt: 2026-09-20
```

The footer of every page renders it as "Curriculum synced: 20 September 2026". After you re-check
the source document against this site, change that one value.

## Deployment

The build is fully static and identical on both hosts. Only `src/site.config.ts` differs.

### GitHub Pages

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. Enable it once under
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

That setting is not optional. Left on the default "Deploy from a branch", GitHub runs its legacy
Jekyll build over the repository source instead of using this workflow's artifact, and the deploy
fails with:

```
YAML Exception reading src/layouts/BaseLayout.astro:
  (<unknown>): mapping values are not allowed in this context
```

Jekyll treats any file opening with `---` as having YAML frontmatter, which is exactly how every
`.astro` component starts — so it tries to parse TypeScript as YAML. Switching the source to
GitHub Actions stops the Jekyll build from running at all.

Set **two values** in `src/site.config.ts`:

```ts
site: 'https://<user>.github.io',   // your Pages origin, no path
base: '/<repo>',                    // project site: the repo name, with a leading slash
```

For a **user or organization page** (`<user>.github.io` repo) or a **custom domain**, use
`base: '/'` instead. Getting `base` wrong is the usual way a Pages build ends up with no styling:
every internal link and asset on this site goes through a `withBase()` helper, so setting this one
value correctly is all that is needed.

Two `.nojekyll` files are committed, and both are deliberate:

- `public/.nojekyll` ships in `dist/`, so Pages does not strip the underscore-prefixed `_astro/`
  asset paths from the deployed site.
- `.nojekyll` at the repository root is a guard: if Pages is ever switched back to branch
  deployment, it stops Jekyll parsing the `.astro` sources and erroring. It does not make branch
  deployment work — that would publish the source tree rather than `dist` — it only keeps the
  failure quiet while you fix the source setting.

Do not delete either.

### Cloudflare Pages

No config file is needed. In the Cloudflare dashboard, create a Pages project from the repo and
set:

- **Build command:** `npm run build`
- **Build output directory:** `dist`

Set **two values** in `src/site.config.ts`:

```ts
site: 'https://<your-domain>',   // the domain the site is served from
base: '/',                        // Cloudflare Pages always serves from the root
```

### Verifying a subpath build locally

```bash
npm run build && npm run preview
```

`astro preview` honours `base`, so with `base: '/uia-test'` the site appears at
http://localhost:4321/uia-test/ and any missing prefix shows up immediately.

## Other things you might want to change

Everything below lives in `src/site.config.ts`:

- `tallyFormId` / `signupLabel` — the Tally form embedded on `/signup`, which every "Join a
  cohort" button links to. The id is the last part of a Tally form URL; both the embed and the
  no-JavaScript fallback link are derived from it.
- `contactEmail` — optional. The footer and about-page contact links are hidden while it is empty.
- `name`, `shortName`, `description` — site title, header wordmark and meta description.

## How it is built

- [Astro](https://astro.build) with `output: 'static'`, content collections and a Zod schema
- Tailwind CSS v4 via `@tailwindcss/vite`
- `marked` for the Markdown-in-frontmatter prose fields
- Three self-hosted families, all through `@fontsource` — no font CDN:
  Source Serif 4 for headings and the wordmark, Inter for body copy, IBM Plex Mono (400 and 500
  only) for every piece of metadata
- About 2 KB of client JavaScript, all of it progressive enhancement: the reading checkboxes and
  the theme toggle. With JavaScript off the site renders, navigates and reads normally; progress
  simply does not persist and the theme stays on the light default.

### Colour and theme

Colour lives in CSS custom properties on `:root` in `src/styles/global.css`, redefined under
`:root[data-theme='dark']`: `--paper`, `--surface`, `--rule`, `--ink`, `--muted`, `--accent`,
`--accent-soft`. Tailwind utilities map onto them (`bg-paper`, `text-ink`, `border-rule`,
`text-muted`, `text-accent`), so changing a theme means editing those seven values in one place.

**Light is the default**, deliberately: this is a reading surface, and there is no
`prefers-color-scheme` fallback. The header toggle sets an explicit override, stored under
`uia:theme`; a blocking inline script in `<head>` applies it before first paint. With JavaScript
off the toggle hides itself, since there would be no way to act on it.

Reading progress is stored only in the visitor's own browser, under the single `localStorage` key
`uia:progress`. Nothing is sent anywhere from it.

### The week band

`src/components/WeekBand.astro` draws the whole curriculum as nine columns of ticks — one
full-height tick per main reading, one half-height per supplementary. It reads the collection
directly, so it needs no maintenance: add a week or a reading and the band redraws, including its
viewBox width. Pass `activeWeek` to highlight one column.

## Attribution

This is an unofficial companion site. It is not affiliated with or endorsed by Richard Ngo. The
reading list and week introductions are quoted from the source document, which is the canonical
version; its link lives in `sourceUrl` in `src/content/course.md`.
