import { getCollection, getEntry, type CollectionEntry } from 'astro:content'

export type Week = CollectionEntry<'weeks'>
export type Reading = Week['data']['readings'][number]

/**
 * All weeks, ordered by week number, with build-time integrity checks.
 *
 * Throws (and so fails `astro build` loudly) if week numbers are not exactly 1..N with no gaps
 * or duplicates, or if two weeks share a slug. Per-week reading id uniqueness is enforced by the
 * Zod schema in src/content.config.ts.
 */
export async function getWeeks(): Promise<Week[]> {
  const weeks = (await getCollection('weeks')).sort((a, b) => a.data.week - b.data.week)

  if (weeks.length === 0) {
    throw new Error('Content error: no weeks found in src/content/weeks.')
  }

  weeks.forEach((entry, index) => {
    const expected = index + 1
    if (entry.data.week !== expected) {
      throw new Error(
        `Content error: weeks must be numbered 1..${weeks.length} with no gaps or duplicates. ` +
          `Expected week ${expected} at position ${expected} but found week ${entry.data.week} (${entry.id}).`,
      )
    }
  })

  const slugs = new Set<string>()
  for (const entry of weeks) {
    if (slugs.has(entry.data.slug)) {
      throw new Error(`Content error: duplicate week slug "${entry.data.slug}" (${entry.id}).`)
    }
    slugs.add(entry.data.slug)
  }

  return weeks
}

export async function getCourse() {
  const course = await getEntry('course', 'course')
  if (!course) {
    throw new Error('Content error: src/content/course.md is missing.')
  }
  return course
}

/** Readings of one tier, in file order. Never re-sorted. */
export function readingsOfTier(week: Week, tier: Reading['tier']): Reading[] {
  return week.data.readings.filter((r) => r.tier === tier)
}

export function totalMinutes(readings: Reading[]): number {
  return readings.reduce((sum, r) => sum + r.minutes, 0)
}

/** Aggregate reading counts, used on the about page. All derived, never hardcoded. */
export function courseTotals(weeks: Week[]) {
  let main = 0
  let supplementary = 0
  for (const week of weeks) {
    for (const reading of week.data.readings) {
      if (reading.tier === 'main') main += 1
      else supplementary += 1
    }
  }
  return { weeks: weeks.length, main, supplementary }
}

/**
 * The placeholder body shipped with each content file. A week whose body is still the
 * placeholder has no cohort notes to show.
 */
export function hasOwnNotes(body: string | undefined): boolean {
  if (!body) return false
  const trimmed = body.trim()
  if (trimmed.length === 0) return false
  return !trimmed.includes('Delete this placeholder')
}
