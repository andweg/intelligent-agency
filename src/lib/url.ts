import { SITE } from '../site.config'

/**
 * Prefix an internal path with the configured base so the site works unchanged at the domain
 * root (Cloudflare Pages, GitHub user pages) and under /<repo>/ (GitHub project pages).
 *
 * Every internal href and asset reference in this site goes through here.
 */
export function withBase(path: string): string {
  const base = SITE.base.endsWith('/') ? SITE.base.slice(0, -1) : SITE.base
  if (!path.startsWith('/')) return `${base}/${path}`
  const joined = `${base}${path}`
  return joined === '' ? '/' : joined
}

/** The host domain of a reading link, shown in the muted second line of a reading row. */
export function hostFromUrl(url: string | null): string | null {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}
