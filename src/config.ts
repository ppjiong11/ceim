/**
 * Single source of truth for lab identity.
 *
 * Everything the lab is likely to want changed — its name, the PI's details,
 * the navigation, the homepage statement — lives here rather than being
 * scattered through templates. Renaming the lab is a one-line edit.
 */

export const site = {
  /** Short name used in the header and page titles. */
  name: 'Chang Lab',
  /** Descriptive name used on the homepage and in metadata. TODO: confirm with PI. */
  longName: 'Stem Cell Immunoengineering Laboratory',
  tagline: 'Building immune cells from stem cells.',
  description:
    'The Chang Lab at The Hong Kong Polytechnic University engineers human ' +
    'pluripotent stem cells into chimeric antigen receptor immune cells, and ' +
    'pairs them with functional biomaterials, for cancer immunotherapy.',
  department: 'Department of Biomedical Engineering',
  institution: 'The Hong Kong Polytechnic University',
  institutionShort: 'PolyU',
  institutionUrl: 'https://www.polyu.edu.hk/bme/',
} as const;

export const pi = {
  name: 'Yun Chang',
  displayName: 'Professor Yun CHANG',
  /** TODO: add the PI's Chinese name — do not guess the characters. */
  nameZh: '',
  title: 'Assistant Professor and Presidential Young Scholar',
  email: 'yun-bme.chang@polyu.edu.hk',
  phone: '+852 2766 7612',
  office: 'ST421c',
  polyuProfile:
    'https://www.polyu.edu.hk/bme/people/academic-and-teaching-staff/prof-yun-chang/',
  scholar: 'https://scholar.google.com/citations?user=LQsshC8AAAAJ',
  scholarsHub: 'https://research.polyu.edu.hk/en/persons/yun-chang/',
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
  /** Office/lab room numbers. TODO: confirm the lab (bench) room, not just the PI office. */
  rooms: [{ label: 'PI office', value: pi.office }],
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
  headline: 'Can we build a patient’s immune system from scratch?',
  subhead:
    'We engineer human pluripotent stem cells into chimeric antigen receptor ' +
    'immune cells, and arm them with functional biomaterials, to attack tumours ' +
    'that today’s therapies cannot reach.',
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
