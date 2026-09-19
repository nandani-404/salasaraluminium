import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/business';
import { BLOG_POSTS } from '@/lib/data';
import { CATALOGUE_CATEGORIES, CATALOGUE } from '@/data/products';
import { CITIES_DATA } from '@/lib/data/cities';
import { cityCategoryPairs } from '@/lib/data/cityCategory';
import { TOPIC_HUBS } from '@/lib/data/hubs';
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

  // Cross-category topic hubs, from the same list the nav renders.
  const hubPages = TOPIC_HUBS.map((hub) => entry(hub.href, 0.9, 'monthly'));

  const categoryPages = CATALOGUE_CATEGORIES.map((cat) =>
    entry(`/products/${cat.slug}`, 0.85, 'monthly')
  );

  /*
   * The legacy showcase branch — /products/{residential,commercial,industrial},
   * their 8 detail pages, and the 12 /product/<marketing-name> pages — is
   * deliberately NOT submitted.
   *
   * Two reasons, and they compound:
   *   1. scripts/verify-links.mjs shows all 23 are unreachable: no internal
   *      link path leads to any of them, so Google would not index them even
   *      if submitted.
   *   2. [CONFIRM] They describe curtain wall mullions, T-slot profiles, solar
   *      mounting rails and Italianate handle names with SKU codes absent from
   *      the real 86-item catalogue — see SEO-CONFIRM.md item 2.
   *
   * Submitting URLs that are both unreachable and probably not real products
   * wastes crawl budget on the pages that ARE real. The routes still resolve,
   * so nothing 404s. Re-add them here the moment the owner confirms the
   * products exist, and link them from the catalogue at the same time.
   */

  const cityPages = CITIES_DATA.map((city) => entry(`/locations/${city.slug}`, 0.8, 'monthly'));

  // City + category pages. Only pairs with a hand-written local angle exist —
  // see src/lib/data/cityCategory.ts for why there is no template fallback.
  const cityCategoryPages = cityCategoryPairs().map(({ city, category }) =>
    entry(`/locations/${city}/${category}`, 0.75, 'monthly')
  );

  // Canonical slugs only. The route also prerenders `sa-1`-style id aliases so
  // those URLs resolve, but they canonicalise to the real slug and must not be
  // submitted — the previous sitemap listed all 86 of them.
  // Catalogue SKUs only. getCanonicalProductSlugs() also returns the showcase
  // range, which is unreachable and unconfirmed (see the note above).
  const catalogueSlugs = new Set(CATALOGUE.map((p) => p.slug));
  const productPages = getCanonicalProductSlugs()
    .filter((slug) => catalogueSlugs.has(slug))
    .map((slug) => entry(`/product/${slug}`, 0.7, 'monthly'));

  const blogPages = BLOG_POSTS.map((post) =>
    entry(`/blog/${post.slug}`, 0.6, 'monthly', postDate(post.date))
  );

  const all = [
    ...staticPages,
    ...hubPages,
    ...categoryPages,
    ...cityPages,
    ...cityCategoryPages,
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
