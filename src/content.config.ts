import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const reading = z.object({
  id: z.string(), // unique within the week, used as the checkbox storage key
  tier: z.enum(['main', 'supplementary']),
  title: z.string(),
  authors: z.string(),
  year: z.number().int().optional(),
  url: z.url().nullable(), // z.string().url() in Zod 3 terms; deprecated in Zod 4
  type: z.enum(['post', 'paper', 'book', 'video', 'podcast', 'reference']),
  excerpt: z.string().optional(), // e.g. "Pages 52-76 only", "Until 36:00"
  minutes: z.number().int().positive(),
  prerequisites: z.string(), // Markdown, may be empty
  note: z.string().optional(), // editorial note about the source doc
})

const weeks = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/weeks' }),
  schema: z.object({
    week: z.number().int().min(1),
    slug: z.string(),
    title: z.string(),
    summary: z.string(),
    prerequisites: z.string(), // Markdown, may be empty
    objectives: z.string(), // Markdown, may be empty
    ngoIntro: z.string(), // verbatim from the source doc
    readings: z.array(reading).superRefine((list, ctx) => {
      // Reading ids must be unique within a week: they are the localStorage keys.
      const seen = new Set<string>()
      for (const item of list) {
        if (seen.has(item.id)) {
          ctx.addIssue({
            code: 'custom',
            message: `Duplicate reading id "${item.id}" within this week. Ids are used as progress storage keys and must be unique.`,
          })
        }
        seen.add(item.id)
      }
    }),
  }),
})

const course = defineCollection({
  loader: glob({ pattern: 'course.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    sourceTitle: z.string(),
    sourceAuthor: z.string(),
    sourceUrl: z.url(),
    syncedAt: z.date(),
    ngoIntro: z.string(),
  }),
})

export const collections = { weeks, course }
