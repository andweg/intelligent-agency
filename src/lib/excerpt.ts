/**
 * Typesets a reading's `excerpt` string for display as a mono tag.
 *
 * This is presentation only: the content files keep the source document's own wording, and this
 * helper rewrites it on the way to the page. Anything it does not recognise passes through
 * unchanged, so a new excerpt string is never mangled.
 *
 *   "Pages 52-76 only"  -> "pp. 52–76"
 *   "Sections 3.3-3.7"  -> "§3.3–3.7"
 *   "Until 36:00"       -> "until 36:00"
 *   "Transcript"        -> "Transcript"
 */
export function formatExcerpt(excerpt: string): string {
  let out = excerpt.trim()

  // "Pages 52-76 only" / "Page 52" -> "pp. 52–76" / "p. 52"
  out = out.replace(/^Pages\s+/i, 'pp. ').replace(/^Page\s+/i, 'p. ')

  // "Sections 3.3-3.7" / "Section 5" -> "§3.3–3.7" / "§5"
  out = out.replace(/^Sections?\s+/i, '§')

  // "Until 36:00" -> "until 36:00"
  out = out.replace(/^Until\s+/i, 'until ')

  // A hyphen between two numbers is a range: use an en dash.
  out = out.replace(/(\d)\s*-\s*(\d)/g, '$1–$2')

  // Trailing "only" is implied by the tag itself.
  out = out.replace(/\s+only$/i, '')

  return out
}
