import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Works — one markdown file per project in src/content/works/.
 * The markdown body is the project description.
 */
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    /** Object label, e.g. "Interactive installation" or "Web-based software" */
    label: z.string(),
    year: z.number(),
    /** Lower numbers appear first in the Works list */
    order: z.number().default(0),
    /** Show this work's hero image on the homepage */
    featured: z.boolean().default(false),
    heroImage: z.string(),
    heroImageAlt: z.string().default(''),
    /** Optional video embed URL (Vimeo/YouTube) shown instead of the hero image */
    heroVideo: z.string().optional(),
    /** Award / fellowship laurels shown under the title */
    awards: z
      .array(
        z.object({
          name: z.string(),
          image: z.string().optional(),
          url: z.string().optional(),
        }),
      )
      .default([]),
    /** Writing & press links */
    press: z
      .array(z.object({ title: z.string(), url: z.string() }))
      .default([]),
    /** More photos / exhibition evidence, each with an optional caption */
    gallery: z
      .array(z.object({ image: z.string(), caption: z.string().optional() }))
      .default([]),
    credits: z.string().optional(),
  }),
});

/**
 * News — one markdown file per item in src/content/news/.
 * Items appear on the News page grouped by category;
 * items marked `current: true` also appear on the homepage.
 */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    /** Show / talk / residency name */
    title: z.string(),
    /** Venue or place, e.g. "Ars Electronica, Linz" */
    venue: z.string(),
    category: z.enum(['show', 'talk', 'workshop', 'residency']),
    year: z.number(),
    /** Display date, e.g. "Mar 14 – Jun 2, 2026" */
    date: z.string().optional(),
    /**
     * Machine-readable event date (YYYY-MM-DD). Items whose date falls
     * within six months of the build date appear on the homepage.
     */
    startDate: z.coerce.date().optional(),
    /** End date for ranged events (exhibitions, residencies) */
    endDate: z.coerce.date().optional(),
    /** Optional external link */
    url: z.string().optional(),
  }),
});

export const collections = { works, news };
