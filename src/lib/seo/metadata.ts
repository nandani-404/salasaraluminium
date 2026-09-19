import type { Metadata } from 'next';

/**
 * One place that builds page metadata, so a canonical and an `og:url` can never
 * disagree and no page can silently inherit the homepage's Open Graph block.
 *
 * The previous code set `openGraph.url` to the site root in the root layout.
 * Because Next.js *replaces* rather than merges nested metadata objects, every
 * page that did not define its own `openGraph` advertised the homepage URL when
 * shared. Passing `path` here derives both values from the same string.
 */

/** Longest title Google will usually render before truncating. */
const TITLE_MAX = 60;
/** Description window that survives truncation in most SERP layouts. */
const DESC_MIN = 140;
const DESC_MAX = 160;

export interface PageMetaInput {
  /** Full <title>, already including the "| Salasar" suffix. 50-60 chars. */
  title: string;
  /** Meta description. Aim for 140-160 chars, including a city and a CTA. */
  description: string;
  /** Site-relative path, e.g. "/products/door-kits". Drives canonical and og:url. */
  path: string;
  /** Route-relative OG image. Falls back to the generated default. */
  image?: string;
  /** "article" for blog posts, otherwise "website". */
  type?: 'website' | 'article';
  /** Set false for pages that must stay out of the index. */
  index?: boolean;
  publishedTime?: string;
  authors?: string[];
}

/**
 * Dev-time guard rails. These warn rather than throw: a length overrun should
 * never break a production build, but it should be impossible to miss locally.
 */
function warnOnLength(title: string, description: string, path: string) {
  if (process.env.NODE_ENV === 'production') return;
  if (title.length > TITLE_MAX) {
    console.warn(`[seo] title ${title.length} chars (max ${TITLE_MAX}) on ${path}: "${title}"`);
  }
  if (description.length < DESC_MIN || description.length > DESC_MAX) {
    console.warn(
      `[seo] description ${description.length} chars (want ${DESC_MIN}-${DESC_MAX}) on ${path}`
    );
  }
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  index = true,
  publishedTime,
  authors,
}: PageMetaInput): Metadata {
  warnOnLength(title, description, path);

  // Normalised so "products/x" and "/products/x" produce the same URL, and the
  // homepage stays "/" rather than "".
  const url = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(index ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type,
      // Per-page URL. This is the field that was previously wrong sitewide.
      url,
      title,
      description,
      siteName: 'Salasar Aluminium & Hardware',
      locale: 'en_IN',
      ...(images ? { images } : {}),
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/** Category page title/description, per the agreed pattern. */
export function categoryMeta(name: string, description: string, slug: string): Metadata {
  return buildMetadata({
    title: truncateTitle(`${name} Wholesale in Raipur | Salasar`),
    description: clampDescription(
      `${description} Trade rates for dealers and fabricators in Raipur, Chhattisgarh, and single-project supply. Call or WhatsApp for a quote.`
    ),
    path: `/products/${slug}`,
  });
}

/**
 * Trims a title on a word boundary rather than mid-word, and without appending
 * an ellipsis — the old code produced titles like "Rollers, Bearings & Chan...".
 */
export function truncateTitle(title: string, max = TITLE_MAX): string {
  if (title.length <= max) return title;

  const [head, tail] = title.includes(' | ')
    ? [title.slice(0, title.lastIndexOf(' | ')), title.slice(title.lastIndexOf(' | '))]
    : [title, ''];

  const budget = max - tail.length;
  if (head.length <= budget) return `${head}${tail}`;

  const cut = head.slice(0, budget);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 20 ? cut.slice(0, lastSpace) : cut).replace(/[,\s&-]+$/, '')}${tail}`;
}

/** Pads or trims a description toward the 140-160 character window. */
export function clampDescription(text: string, max = DESC_MAX): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '));
  if (lastStop > DESC_MIN - 20) return cut.slice(0, lastStop + 1);

  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,\s]+$/, '')}.`;
}
