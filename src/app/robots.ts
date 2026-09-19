import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/business';

/**
 * Only genuinely non-content routes are disallowed. Everything a buyer or an
 * answer engine might want to read stays crawlable.
 *
 * `/supplier/` is NOT listed here on purpose, even though those pages must
 * leave the index. That route is backed by a generator producing ~1,000,000
 * permutations of invented locality names and SKU codes absent from the real
 * 86-item catalogue — a scaled-content-abuse risk for the whole domain.
 *
 * The fix is `robots: { index: false }` on the route itself, not a Disallow
 * here: a disallowed URL is never fetched, so Google would never see the
 * noindex and anything already indexed would linger. Allowing the crawl lets
 * the noindex be read and the URLs dropped. Add a Disallow for `/supplier/`
 * only once Search Console shows the pages have fallen out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/admin', '/cart', '/checkout'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      {
        // Answer engines and AI crawlers are explicitly welcomed: being quoted
        // in an AI answer is a lead source for a business like this one.
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot',
          'Applebot-Extended',
          'Bingbot',
          'CCBot',
          'meta-externalagent',
        ],
        allow: '/',
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
