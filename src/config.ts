/**
 * Single source of truth for lab identity.
 *
 * Everything the lab is likely to want changed — its name, the PI's details,
 * the navigation, the homepage statement — lives here rather than being
 * scattered through templates. Renaming the lab is a one-line edit.
 */

export const site = {
  /** Full name. Used in page titles and the header wordmark. */
  name: 'Cell Engineering & ImmunoMedicine',
  /** Abbreviation, for tight spaces. */
  shortName: 'CEIM',
  /** Expanded descriptor used on the homepage and in metadata. */
  longName: 'Cell Engineering and ImmunoMedicine',
  tagline: 'Engineering immune cells to treat cancer, joint disease and bone loss.',
  description:
    'The Cell Engineering and ImmunoMedicine group at The Hong Kong Polytechnic ' +
    'University engineers immune cells — and the biomaterials that direct them — ' +
    'for cancer immunotherapy, osteoarthritis and musculoskeletal regeneration.',
  department: 'Department of Biomedical Engineering',
  institution: 'The Hong Kong Polytechnic University',
  institutionShort: 'PolyU',
  institutionUrl: 'https://www.polyu.edu.hk/bme/',
} as const;

/**
 * Keep the site out of search results until the content is signed off.
 *
 * GitHub Pages on a free plan requires a public repository, so "not finished"
 * cannot mean "not reachable". This is the next best thing: the pages are live
 * for anyone with the link — which is what a demo needs — but search engines
 * are told not to index them.
 *
 * SET THIS TO false AT LAUNCH, once docs/CONTENT-TODO.md is clear.
 */
export const noindex = true;

export const pi = {
  name: 'Cheng Dong',
  displayName: 'Professor Cheng DONG',
  nameZh: '董澄',
  title: 'Chair Professor of Cell Engineering and ImmunoMedicine',
  secondTitle: 'Associate Vice President (Knowledge Transfer)',
  email: 'cheng.dong@polyu.edu.hk',
  phone: '+852 3400 8811',
  office: 'M501J',
  polyuProfile:
    'https://www.polyu.edu.hk/bme/People/Academic-and-Teaching-Staff/Prof-DONG-Cheng',
  scholarsHub: 'https://research.polyu.edu.hk/en/persons/cheng-dong/',
  /** TODO: confirm a Google Scholar profile URL for Prof. Dong. */
  scholar: 'https://research.polyu.edu.hk/en/persons/cheng-dong/',
} as const;

export const contact = {
  email: pi.email,
  phone: pi.phone,
  address: [
    'Department of Biomedical Engineering',
    'The Hong Kong Polytechnic University',
    'Hung Hom, Kowloon',
    'Hong Kong SAR',
  ],
  /** TODO: confirm the shared lab (bench) rooms, not just the offices. */
  rooms: [
    { label: 'C. Dong', value: 'M501J' },
    { label: 'Y. Chang', value: 'ST421c' },
    { label: 'M.T. Au', value: 'GH110' },
    { label: 'B. Dai', value: 'GH139' },
  ],
} as const;

/** Primary navigation. Order matters. */
export const nav = [
  { label: 'Research', href: '/research' },
  { label: 'Publications', href: '/publications' },
  { label: 'People', href: '/people' },
  { label: 'News', href: '/news' },
  { label: 'Join', href: '/join' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * The homepage statement — one question, one sentence of method, one link.
 *
 * TODO: this is a DRAFT. The headline is the single piece of copy on the whole
 * site that only the PI can write. Get it signed off before launch.
 */
export const hero = {
  headline:
    'What decides whether a tumour spreads, a joint degenerates, or a bone heals?',
  subhead:
    'The same immune cells, making different decisions. We engineer those cells — ' +
    'and the materials that direct them — so the decision goes our way.',
  ctaLabel: 'Learn more about our research',
  ctaHref: '/research',
} as const;

/**
 * Prefix an internal path with the configured base path.
 * Works whether the site is served from a domain root or a /repo/ subpath.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!path.startsWith('/')) path = '/' + path;
  return `${base}${path}` || '/';
}
