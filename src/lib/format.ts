/**
 * A total reading time, rounded up to whole hours: "2h 21min" becomes "3h".
 *
 * Every aggregate on the site uses this — week rows on the homepage, week rows in the sidebar,
 * and the main and supplementary section headings — so a total always reads as the block of time
 * to set aside rather than a false-precision estimate. Individual readings keep their own minutes.
 */
export function formatHoursRoundedUp(total: number): string {
  return `${Math.max(1, Math.ceil(total / 60))}h`
}

/** Format a reading's own estimate, as used in the muted second line: "45 min". */
export function formatReadingMinutes(total: number): string {
  return `${total} min`
}

/** Format the curriculum sync date as e.g. "20 September 2026". */
export function formatSyncedAt(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
