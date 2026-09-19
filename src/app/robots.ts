import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/business';

/**
 * Only genuinely non-content routes are disallowed. Everything a buyer or an
 * answer engine might want to read stays crawlable.
 *
 * `/supplier/` is NOT listed here on purpose, and must not be added.
 *
 * Those URLs now return 410 Gone from src/proxy.ts. A robots.txt Disallow
 * would stop Google fetching them, which means it would never see the 410 and
 * the ~9,850 already-indexed pages would sit in the index indefinitely.
 *
 * Blocking crawling and removing from the index are opposite instructions.
 * To remove, you must let the crawler in.
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
