> **Note:** this file was reconstructed from the build brief as given in the Claude Code session
> that built this site. The original lived at `content-bundle/CLAUDE-CODE-PROMPT.md` and was
> deleted along with the rest of `content-bundle/` after its content was moved into
> `src/content/`. Check it against your own copy of the brief before relying on it.

Build a static website for running a reading and discussion group based on Richard Ngo's
"Understanding Intelligent Agency" curriculum. This is an unofficial companion site, not an
official Ngo project.

## Hard constraints

- Fully static output. No server, no database, no API routes, no runtime environment variables.
- Must deploy unchanged to both GitHub Pages and Cloudflare Pages.
- No accounts, no analytics, no cookie banner, no third-party scripts of any kind.
- Ship almost no client JavaScript. Only two small pieces of interactivity are allowed
  (progress checkboxes and the theme toggle), and both must degrade gracefully with JS off.
- Content is authored by hand in the repo. Do not build any importer, scraper or sync script.

## Stack

- Astro (latest), with `output: 'static'`.
- Astro content collections with a Zod schema for validation. A content file that violates the
  schema must fail `astro build` loudly.
- Tailwind CSS via `@tailwindcss/vite`.
- `marked` for rendering the Markdown-in-frontmatter prose fields described below.
- TypeScript, strict.
- No UI component library, no React/Vue/Svelte. Plain `.astro` components and a little vanilla JS.
- Prettier with `prettier-plugin-astro`.

## Content, already written

`content-bundle/src/content/` contains the real content, pre-extracted from the curriculum:
`course.md` and `weeks/week-01.md` through `weeks/week-09.md`. Move it into place at
`src/content/` and build the schema to match those files exactly. Do not rewrite, reorder,
reword or "improve" the content. Do not invent readings. Read all ten files before writing
the schema.

There are 9 weeks, 43 main readings and 45 supplementary readings.

Three fields in the week files are deliberately empty strings and will be filled in by the site
owner later: `prerequisites` and `objectives` at week level, and `prerequisites` on every
individual reading. The UI must handle both states cleanly: render the section when the string
is non-empty, and omit it entirely (no empty heading, no "TBD" placeholder) when it is empty.
Two readings in week 1 have `url: null` because the source curriculum has not picked an excerpt
yet; render those as non-clickable titles with the note shown, not as broken links.

### Zod schema

`src/content.config.ts`, using the `glob` loader:

```ts
const reading = z.object({
  id: z.string(),                    // unique within the week, used as the checkbox storage key
  tier: z.enum(['main', 'supplementary']),
  title: z.string(),
  authors: z.string(),
  year: z.number().int().optional(),
  url: z.string().url().nullable(),
  type: z.enum(['post', 'paper', 'book', 'video', 'podcast', 'reference']),
  excerpt: z.string().optional(),    // e.g. "Pages 52-76 only", "Until 36:00"
  minutes: z.number().int().positive(),
  prerequisites: z.string(),         // Markdown, may be empty
  note: z.string().optional(),       // editorial note about the source doc
})

const weeks = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/weeks' }),
  schema: z.object({
    week: z.number().int().min(1),
    slug: z.string(),
    title: z.string(),
    summary: z.string(),
    prerequisites: z.string(),       // Markdown, may be empty
    objectives: z.string(),          // Markdown, may be empty
    ngoIntro: z.string(),            // verbatim from the source doc
    readings: z.array(reading),
  }),
})
```

Also define a single-entry `course` collection matching `course.md`
(`title`, `tagline`, `sourceTitle`, `sourceAuthor`, `sourceUrl`, `syncedAt` as a date, `ngoIntro`).

Add a build-time assertion that reading `id`s are unique within each week and that weeks are
numbered 1..N with no gaps.

### Prose fields

`ngoIntro`, `prerequisites` and `objectives` live in frontmatter and may contain Markdown.
Render them through a shared `<Prose markdown={...} />` component that pipes the string through
`marked` and wraps the result in the site's typographic styles. The Markdown **body** of each
week file is the site owner's own commentary: render it with Astro's built-in `render()` under a
heading "Notes for this cohort", and omit that section if the body is empty or still contains
only the placeholder text.

## Configuration

Create `src/site.config.ts` as the single place the owner edits deployment and cohort details:

```ts
export const SITE = {
  name: 'Understanding Intelligent Agency',
  shortName: 'UIA',
  description: '...',
  // GitHub Pages project sites are served from /<repo>/. Set base to '/<repo>' for a project
  // page, or '/' for a user page or a custom domain. Cloudflare Pages always uses '/'.
  site: 'https://example.github.io',
  base: '/',
  signupUrl: 'https://tally.so/r/9qe5qK',   // external form, filled in later
  signupLabel: 'Sign up for the next cohort',
  contactEmail: '',                          // optional; hide the link when empty
}
```

Wire `site` and `base` into `astro.config.mjs`. Every internal link and asset reference must go
through a `withBase()` helper so the site works under a subpath without any manual edits. This is
the single most common way a GitHub Pages build breaks: get it right and verify it.

If `signupUrl` is left at its placeholder value, render the signup buttons as disabled with the
text "Signups opening soon" rather than linking to a dead URL.

## Pages

- `/` Homepage: hero with the course title, tagline, a primary signup button, and the total
  figures (9 weeks, 43 main readings, 45 supplementary). Below it, the course-level intro
  (owner's body text), then Ngo's own framing in an attributed blockquote, then a grid of nine
  week cards showing number, title, summary, reading counts and estimated main-reading time.
  Footer includes the attribution line (see below).
- `/week/[slug]` One page per week, using the `slug` field. Also emit `/week/[week]` as a
  redirect-free alias if it is cheap to do so; otherwise skip it.
- `/about` Short page: what this site is, that it is unofficial, how the discussion group runs,
  and a prominent link to the source document.
- 404 page.
- `sitemap.xml` and `robots.txt` via `@astrojs/sitemap`.

### Week page layout

Mirror the BlueDot Impact course pages (`bluedot.org/courses/agi-strategy/1/1`) in structure:

1. Persistent left sidebar, sticky on desktop, listing all nine weeks. The current week is
   highlighted and expanded to show its main readings as sub-items; other weeks are collapsed to
   title plus estimated time. Each week row shows its title and the total estimated minutes of
   its main readings, formatted as "1h 30min". On mobile the sidebar collapses into a
   `<details>`-based drawer above the content. No JS required for that collapse.
2. Breadcrumb row above the content: "Course / Week N. Title", with Prev and Next controls on
   the right.
3. Content column, max-width around 720px:
   - Small blue uppercase eyebrow: "WEEK N"
   - `<h1>` week title
   - Prerequisites block, if non-empty. Give this visual weight: a bordered callout above the
     readings, not a footnote. It is one of the main reasons this site exists.
   - Objectives block, if non-empty. Styled as a lighter callout.
   - Ngo's introduction, in a blockquote attributed to "Richard Ngo, from the source curriculum",
     with a link to the source document.
   - Owner's own notes, if present.
   - "Main readings" section with a total time estimate in the heading, e.g. "Main readings
     (2h 45min)".
   - "Supplementary readings" section, same treatment.
4. Bottom of page: signup call to action card, then Prev/Next.

### Reading row

Each reading renders as a row, not a heavy card:

- A checkbox on the left (see Progress below).
- Title as a link opening in a new tab with `rel="noopener noreferrer"`. If `url` is null,
  render the title as plain text.
- A type badge: post / paper / book / video / podcast / reference. Use a small monochrome pill,
  plus a distinct icon per type. Do not fetch favicons from third-party domains: that would
  leak visitor traffic to every linked site. Draw inline SVG icons instead.
- Second line, muted and smaller: authors, year if present, the host domain parsed from the URL,
  and the estimated time as "45 min".
- If `excerpt` is present, show it as a distinct badge or inline note, e.g. "Pages 52-76 only".
  This matters: a lot of these readings are partial, and a participant who reads the whole book
  has wasted hours.
- If `note` is present, show it as small muted italic text below.
- If the reading's own `prerequisites` is non-empty, show it as an indented muted block under
  the row, prefixed "Before this:".

Sort within each tier by the order in the file. Do not re-sort.

## Progress tracking

Per-reading checkboxes persisted in `localStorage` under a single namespaced key, e.g.
`uia:progress` holding `{ "week-3": { "complete-class-consequentialist-foundations": true } }`.

- Wrap every read and write in try/catch: private browsing and blocked site data both throw.
- The page must render correctly with JS disabled or storage unavailable. Checkboxes are
  progressive enhancement: render them unchecked and functional-looking, and simply do not
  persist.
- Show a per-week progress indicator in the sidebar and at the top of the week page
  ("3 of 6 main readings"). Compute it from main readings only.
- Provide a "Reset progress" control on the about page, with a confirm step.
- Do not block or dim content based on progress. Nothing is gated.

Implement this as one small vanilla script using event delegation on a container, not a
per-checkbox listener, and hydrate checked state on `DOMContentLoaded` to avoid a flash.

## Theming

Light and dark, with a toggle in the header.

- Default to the OS preference via `prefers-color-scheme`, overridable by the toggle, with the
  choice stored in `localStorage` under `uia:theme`.
- Use a `data-theme` attribute on `<html>` plus Tailwind's `darkMode: ['selector', '[data-theme="dark"]']`
  (or equivalent) so both the OS default and the explicit override work.
- Prevent the flash of wrong theme with a tiny blocking inline script in `<head>` that sets the
  attribute before first paint. This is the one place an inline script is warranted.
- Give `body` an explicit background colour in both themes.

## Visual design

The reference is BlueDot Impact: clean, typographic, light, restrained, with one blue accent.
Aim for the same calm feel without copying their assets or wordmark.

- Type: one high-quality sans for everything (Inter or similar, self-hosted via
  `@fontsource-variable`, not Google Fonts CDN, so the site has zero third-party requests).
  Generous line height (1.65) on body copy, tight tracking on headings.
- Colour tokens as CSS custom properties on `:root`, redefined for dark mode. Roughly:
  - light: background `#ffffff`, surface `#f7f8fa`, border `#e4e7ec`, text `#111827`,
    muted text `#5b6472`, accent `#2450e8`, accent-subtle `#eef2ff`
  - dark: background `#0d1117`, surface `#161b22`, border `#262d38`, text `#e8eaed`,
    muted text `#9aa4b2`, accent `#7c9bff`, accent-subtle `#182034`
  - Check the accent against both backgrounds for WCAG AA on body text and UI controls, and
    adjust if it falls short.
- Layout: content column 720px max, sidebar around 290px, comfortable whitespace, generous
  vertical rhythm between sections. 16px side gutters on mobile, no horizontal page scroll at
  360px width.
- Rounded corners around 8px, borders rather than shadows, one accent colour used sparingly
  (eyebrow labels, links, the primary button, the active sidebar item).
- The primary signup button is solid accent; everything else is text or bordered.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`), one `h1` per page, correct
  heading order.
- Visible focus rings everywhere, never removed.
- Checkboxes are real `<input type="checkbox">` with associated labels naming the reading.
- Sidebar current week carries `aria-current="page"`.
- Theme toggle is a real button with an accessible name that reflects its action.
- Skip-to-content link.
- Respect `prefers-reduced-motion`.

## Attribution

The site must be clearly unofficial. In the footer of every page, and on the about page:

> An unofficial companion site for Richard Ngo's *Understanding Intelligent Agency*  curriculum.
> Not affiliated with or endorsed by Richard Ngo. Reading list and week introductions are quoted
> from the source document, which is the canonical version.

Link `sourceUrl` from there. Also render "Curriculum synced: {syncedAt}" in the footer, formatted
as e.g. "20 September 2026", driven by the `syncedAt` field in `course.md` so the owner updates
one value after re-checking the source doc.

Quote Ngo's introductions verbatim and always inside an attributed blockquote, visually distinct
from the owner's own prose. Never present his text as the site's own writing.

## Deployment

- `.github/workflows/deploy.yml`: build on push to `main`, upload the Pages artifact, deploy.
  Use `withastro/action` or a plain `actions/upload-pages-artifact` + `actions/deploy-pages`
  pair. Pin action versions.
- `public/.nojekyll` so GitHub Pages does not strip underscore-prefixed asset paths.
- A short `README.md` covering: how to run locally, how to add or edit a week, how to fill in
  prerequisites and objectives, how to update `syncedAt`, and exactly which two values in
  `site.config.ts` to change for GitHub Pages versus Cloudflare Pages.
- Cloudflare Pages needs no config file: note the build command (`npm run build`) and output
  directory (`dist`) in the README.

## Acceptance checks

Before you report done, verify all of these yourself:

1. `npm run build` succeeds with no warnings, and `astro check` passes.
2. Temporarily set `base: '/uia-test'`, rebuild, serve `dist` under that subpath, and confirm
   every internal link, stylesheet, font and icon resolves. Then set it back to `'/'`.
3. Grep the built output for `http://` and for any third-party domain in a `src`, `href` or
   `@import`. The only external URLs in the output should be the reading links themselves, the
   source document link, and the signup link.
4. All 88 readings appear, on the right weeks, in the right tier, in file order. Count them.
5. Weeks with empty `prerequisites` and `objectives` show no empty headings anywhere.
6. The two week-1 readings with `url: null` render as plain text with their notes, not as links.
7. Disable JavaScript and load a week page: content, sidebar, mobile drawer and all links work.
8. Load at 360px width: no horizontal scroll, sidebar drawer usable.
9. Toggle dark mode, reload, confirm the choice persists and there is no flash of the wrong theme.
10. Tick some checkboxes, reload, confirm state persists and the counters update.

## Out of scope. Do not build these.

Cohort dates or calendar exports, discussion prompts, facilitator notes, search, link checking,
print or export views, i18n, RSS, comments, a changelog page, any CMS or admin UI, any content
import script. The site is English-only.

## Working style

Read the ten content files first. Then write the schema, then the layout and components, then the
pages, then the two scripts, then the workflow and README. Run the build after each major step
rather than at the end. Keep components small and in `src/components/`. Do not add dependencies
beyond those listed above without saying why.
