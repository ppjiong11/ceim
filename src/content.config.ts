import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/**
 * Treat an empty string as "not provided".
 *
 * Content is edited through the GitHub web UI, where clearing a field leaves
 * `field: ''` rather than removing the line. Without this, a blank optional
 * URL fails validation and breaks the build for a non-technical editor with
 * no obvious way to recover.
 */
const optionalUrl = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.string().url().optional()
);

const optionalText = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.string().optional()
);

/**
 * Publications live in ONE yaml file rather than one file per paper.
 * Rationale: the list is regenerated in bulk from a .bib export or Google
 * Scholar, not edited a paper at a time. One file = one paste.
 */
const publications = defineCollection({
  loader: file('src/content/publications.yaml'),
  schema: z.object({
    title: z.string(),
    /** Authors in order. Mark lab members with `**` around the name. */
    authors: z.array(z.string()),
    journal: z.string(),
    year: z.number(),
    volume: optionalText,
    pages: optionalText,
    doi: optionalText,
    pmid: optionalText,
    url: optionalUrl,
    /** Pulls the paper onto the homepage and to the top of /publications. */
    featured: z.boolean().default(false),
    type: z.enum(['article', 'review', 'preprint', 'protocol', 'patent']).default('article'),
    /** Optional one-line plain-language summary, shown on featured papers. */
    summary: optionalText,
    image: optionalText,
  }),
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    nameZh: optionalText,
    role: z.enum([
      'pi',
      'postdoc',
      'phd',
      'mphil',
      'ra',
      'visiting',
      'undergrad',
      'staff',
    ]),
    title: optionalText,
    /** Controls ordering within a role group. Lower sorts first. */
    order: z.number().default(100),
    photo: optionalText,
    email: optionalText,
    interests: z.array(z.string()).default([]),
    links: z
      .object({
        scholar: optionalUrl,
        orcid: optionalUrl,
        github: optionalUrl,
        linkedin: optionalUrl,
        website: optionalUrl,
      })
      .default({}),
    /** Alumni: set `alumnus: true` and fill `now` with where they went. */
    alumnus: z.boolean().default(false),
    now: optionalText,
    joined: optionalText,
    /** Hidden from the site. Use for templates and not-yet-announced hires. */
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** Short teaser for list pages. Falls back to the first paragraph. */
    summary: optionalText,
    image: optionalText,
    /** External link — for a press release or journal page. */
    link: optionalUrl,
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    /** One sentence. Shown under the title on the homepage and /research. */
    blurb: z.string(),
    order: z.number().default(100),
    image: optionalText,
    /** Keywords shown as small caps under the section. */
    keywords: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const openings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/openings' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['postdoc', 'phd', 'mphil', 'ra', 'undergrad']),
    order: z.number().default(100),
    /** Set false to show the role as "no current vacancy" but keep the text. */
    open: z.boolean().default(true),
    deadline: optionalText,
    draft: z.boolean().default(false),
  }),
});

export const collections = { publications, people, news, research, openings };
