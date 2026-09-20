import { withBase } from './url'

/**
 * The URL of a week page. This is the only place in the codebase that knows the shape of a week
 * URL: every sidebar row, band column, prev/next control, homepage row and breadcrumb goes
 * through it, so the route can change in one edit.
 *
 * Weeks route by number, not by slug, and the number is not zero-padded: /week/4, never /week/04.
 * Display formatting is a separate concern — the UI still shows "04".
 */
export function weekHref(week: number): string {
  return withBase(`/week/${week}`)
}
