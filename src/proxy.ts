import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

/**
 * Renamed from `middleware.ts` — Next.js 16 deprecated that file convention in
 * favour of `proxy.ts`. Behaviour is unchanged apart from the SEO redirects
 * added below.
 *
 * Three jobs, in order:
 *   1. Collapse every host variant onto one canonical origin (301).
 *   2. Retire the legacy `/products?category=x` query-string URLs (301).
 *   3. Refresh the Supabase auth session, as before.
 */

/** The one origin every other host variant redirects to. */
const CANONICAL_HOST = 'www.salasaraluminium.shop';

/**
 * Hosts that should be folded into CANONICAL_HOST. Kept as an explicit list so
 * preview deployments and local development are never redirected.
 */
const REDIRECTABLE_HOSTS = new Set([
  'salasaraluminium.shop',
  'salasaraluminium.com',
  'www.salasaraluminium.com',
]);

/**
 * Category slugs valid in the legacy `?category=` parameter. Inlined rather than
 * imported: proxy code can be deployed to the edge separately from the app, so
 * it should not pull in application modules.
 */
const CATEGORY_SLUGS = new Set([
  'rollers-bearings-channels',
  'locks-latches',
  'door-window-seals',
  'hinges',
  'door-kits',
  'bolts-handles',
  'door-closers',
  'fittings-accessories',
  'tapes-sealants-adhesives',
  'fasteners-screws',
  'glass-hardware-shower-fittings',
  'abrasives-mesh-misc',
]);

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host')?.toLowerCase() ?? '';

  /*
   * 0. /supplier/* is GONE — 410, not 404, and not a rendered noindex page.
   *
   * On 2026-09-09 a sitemap index of 20 chunks x 50,000 URLs submitted
   * 1,000,000 generated /supplier/ URLs to Google: 2,000 invented locality
   * names crossed with 500 invented products carrying SA-101+ codes that do
   * not exist in the real 86-item catalogue.
   *
   * Google acted on it. Search Console showed 9,850 pages indexed against a
   * site with roughly 280 real ones — about 97% of the index was fabricated
   * doorway content, and the count was still climbing as Google worked through
   * the submitted list.
   *
   * A `noindex` meta tag on a 200 response was the first fix, and it is too
   * slow at this scale: every one of those URLs has to be re-crawled and
   * re-rendered before the tag is even seen. 410 Gone is the strongest
   * deindexing signal available — it tells Google the resource is permanently
   * removed, is acted on faster than a 404, and stops further crawling of the
   * pattern without needing a robots.txt rule.
   *
   * It is served here in the proxy rather than from the route so the response
   * costs nothing to produce and applies to all 1,000,000 permutations,
   * including any Google discovered that were never prerendered.
   *
   * Do NOT add `/supplier/` to robots.txt Disallow. A blocked URL is never
   * fetched, so Google would never see this 410 and the pages would linger in
   * the index indefinitely.
   */
  if (url.pathname.startsWith('/supplier/') || url.pathname === '/supplier') {
    return new NextResponse(
      'Gone. These pages were generated in error and have been permanently removed.',
      {
        status: 410,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  // 1. One canonical host. Only rewrites hosts we explicitly own, so
  //    localhost and *.vercel.app preview URLs keep working untouched.
  if (REDIRECTABLE_HOSTS.has(host)) {
    const target = new URL(url.toString());
    target.protocol = 'https:';
    target.host = CANONICAL_HOST;
    target.port = '';
    return NextResponse.redirect(target, 301);
  }

  // 2. `/products?category=door-kits` -> `/products/door-kits`.
  //    A real 301 so the query-string form stops competing with the category
  //    page and its accumulated link equity transfers across.
  if (url.pathname === '/products') {
    const category = url.searchParams.get('category');
    if (category && CATEGORY_SLUGS.has(category)) {
      const target = new URL(`/products/${category}`, url);
      return NextResponse.redirect(target, 301);
    }
  }

  // 3. Existing Supabase session refresh.
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - static asset extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|txt|xml|ico)$).*)',
  ],
};
