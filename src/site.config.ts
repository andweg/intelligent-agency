/**
 * The single place to edit deployment and cohort details.
 *
 * Only two values below change between hosts. See README.md for the full walkthrough.
 */
export const SITE = {
  name: 'Understanding Intelligent Agency',
  shortName: 'UIA',
  description:
    'An unofficial companion site for running a nine-week reading and discussion group on Richard Ngo’s Understanding Intelligent Agency curriculum.',

  // GitHub Pages project sites are served from /<repo>/. Set base to '/<repo>' for a project
  // page, or '/' for a user page or a custom domain. Cloudflare Pages always uses '/'.
  site: 'https://example.github.io',
  base: '/',

  // The Tally form embedded on /signup. Change the id to point the page at a different form;
  // the embed and the no-JavaScript fallback link are both derived from it.
  tallyFormId: '9qe5qK',
  signupLabel: 'Join a cohort',
  contactEmail: '', // optional; hide the link when empty
} as const
