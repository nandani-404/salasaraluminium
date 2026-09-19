import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/business';
import { BLOG_POSTS, PRODUCTS } from '@/lib/data';
import { CATALOGUE_CATEGORIES, CATALOGUE } from '@/data/products';
import { CITIES_DATA } from '@/lib/data/cities';
import { getCanonicalProductSlugs } from '@/lib/productAdapter';

/**
 * Every URL here is derived from the same data the pages themselves render
 * from, so the sitemap cannot drift out of sync with what actually exists.
 *
 * The previous version hard-coded a 17-city list against a 6-city dataset and
 * submitted 11 URLs that returned 404, plus 115 generated /supplier/ URLs and
 * the /cart and /checkout pages. All of those are gone.
 */

const BUILD_DATE = new Date();

/** Parses the human-readable blog date, falling back to the build date. */
function postDate(raw: string): Date {
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? BUILD_DATE : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    lastModified: Date = BUILD_DATE
  ) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority });

  // Core pages. /cart, /checkout and /admin are intentionally absent —
  // they are transactional or private and must not be indexed.
  const staticPages = [
    entry('', 1.0, 'weekly'),
    entry('/products', 0.9, 'weekly'),
    entry('/window-hardware', 0.9, 'monthly'),
    entry('/bathroom-glass-hardware', 0.9, 'monthly'),
    entry('/wholesale', 0.8, 'monthly'),
    entry('/locations', 0.8, 'monthly'),
    entry('/contact', 0.8, 'monthly'),
    entry('/about', 0.7, 'monthly'),
    entry('/industries-we-serve', 0.7, 'monthly'),
    entry('/why-choose-us', 0.6, 'monthly'),
    entry('/faq', 0.7, 'monthly'),
    entry('/blog', 0.7, 'weekly'),
    entry('/projects', 0.5, 'monthly'),
    entry('/finishes', 0.5, 'monthly'),
  ];

  const categoryPages = CATALOGUE_CATEGORIES.map((cat) =>
    entry(`/products/${cat.slug}`, 0.85, 'monthly')
  );

  // The three legacy showcase category pages. They are live and indexable, so
  // omitting them left three crawlable URLs outside the sitemap.
  // [CONFIRM] These overlap with the /residential, /commercial and /industrial
  // segment routes, which cover the same ground; one of the two sets should
  // eventually be retired. See SEO-CONFIRM.md.
  const showcaseCategoryPages = ['residential', 'commercial', 'industrial'].map((slug) =>
    entry(`/products/${slug}`, 0.5, 'monthly')
  );

  const cityPages = CITIES_DATA.map((city) => entry(`/locations/${city.slug}`, 0.8, 'monthly'));

  // Canonical slugs only. The route also prerenders `sa-1`-style id aliases so
  // those URLs resolve, but they canonicalise to the real slug and must not be
  // submitted — the previous sitemap listed all 86 of them.
  const productPages = getCanonicalProductSlugs().map((slug) =>
    entry(`/product/${slug}`, 0.7, 'monthly')
  );

  // The eight showcase profile pages at /products/<category>/<slug>. They are
  // live and indexable, so leaving them out left eight crawlable URLs outside
  // the sitemap. [CONFIRM] see SEO-CONFIRM.md item 2 — these describe curtain
  // wall and solar mounting products, which may not be sold at all.
  const showcaseProductPages = PRODUCTS.map((p) =>
    entry(`/products/${p.category}/${p.slug}`, 0.4, 'monthly')
  );

  const blogPages = BLOG_POSTS.map((post) =>
    entry(`/blog/${post.slug}`, 0.6, 'monthly', postDate(post.date))
  );

  const all = [
    ...staticPages,
    ...categoryPages,
    ...showcaseCategoryPages,
    ...showcaseProductPages,
    ...cityPages,
    ...productPages,
    ...blogPages,
  ];

  // Belt and braces: a duplicate <loc> is a validation error in some crawlers.
  const seen = new Set<string>();
  return all.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}

/** Exported for the verification script so the count can be asserted in CI. */
export const SITEMAP_SKU_COUNT = CATALOGUE.length;
