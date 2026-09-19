/**
 * Server-rendered JSON-LD.
 *
 * Two hard rules, both of which the previous version broke:
 *
 * 1. NO INVENTED FACTS. The old `generateProductSchema` emitted
 *    `aggregateRating: { ratingValue: 4.9, reviewCount: 32 }` on all 86 product
 *    pages from a hard-coded constant in the product adapter, and `offers` with
 *    `price: "0"` plus `availability: InStock`. Fabricated review markup is a
 *    manual-action risk, and a zero price is both wrong and ineligible for rich
 *    results. Product schema below carries no offers and no rating. When real
 *    prices exist, add `offers` then — not before.
 *
 * 2. JSON-LD MUST MATCH VISIBLE CONTENT. FAQ schema is generated from the same
 *    array the page renders as visible HTML, never from a separate list.
 *
 * All NAP values come from `@/config/business` so the markup can never disagree
 * with the footer or the contact page.
 */

import { BUSINESS, SITE_URL } from '@/config/business';

export const BASE_URL = SITE_URL;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.streetAddress,
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.addressCountry,
  };
}

/** Sitewide Organization node. Referenced by @id from every other schema. */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-default.png`,
    description: BUSINESS.description,
    telephone: `+${BUSINESS.phones.primary.whatsapp}`,
    email: BUSINESS.email,
    address: postalAddress(),
    // Only verified profiles. An invented sameAs actively damages entity
    // resolution, so unverified directory URLs are omitted until confirmed.
    sameAs: [...BUSINESS.sameAs],
  };
}

/**
 * HardwareStore (a LocalBusiness subtype) for the single physical counter.
 * Used on the homepage, /contact and /locations — never on a city page, since
 * there is only one real address and claiming otherwise would be false.
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HardwareStore',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BUSINESS.name,
    parentOrganization: { '@id': ORG_ID },
    url: SITE_URL,
    image: `${SITE_URL}/salasar-storefront.png`,
    logo: `${SITE_URL}/logo.png`,
    description: BUSINESS.description,
    telephone: `+${BUSINESS.phones.primary.whatsapp}`,
    email: BUSINESS.email,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    hasMap: BUSINESS.maps.url,
    currenciesAccepted: 'INR',
    areaServed: BUSINESS.areaServed.map((name) => ({
      '@type': 'City',
      name,
      containedInPlace: { '@type': 'State', name: 'Chhattisgarh' },
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...BUSINESS.hours.days],
        opens: BUSINESS.hours.opens,
        closes: BUSINESS.hours.closes,
      },
    ],
    sameAs: [...BUSINESS.sameAs],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    description: BUSINESS.description,
    inLanguage: 'en-IN',
    publisher: { '@id': ORG_ID },
  };
}

/**
 * Product schema for a catalogue SKU.
 *
 * Deliberately omits `offers` and `aggregateRating`: this business does not
 * publish prices and has no on-site review corpus, so asserting either would be
 * fabrication. The result is still a valid Product node — it simply is not
 * eligible for price or star rich results, which is the correct outcome.
 */
export function getProductSchema(product: {
  name: string;
  sku: string;
  slug: string;
  category: string;
  shortDescription: string;
  image: string;
  materials?: string[];
  finishes?: string[];
}) {
  const absolute = (src: string) =>
    src.startsWith('http') ? src : `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/product/${product.slug}#product`,
    name: product.name,
    sku: product.sku,
    mpn: product.sku,
    description: product.shortDescription,
    category: product.category,
    image: absolute(product.image),
    url: `${SITE_URL}/product/${product.slug}`,
    brand: { '@type': 'Brand', name: BUSINESS.name },
  };

  if (product.materials?.length) schema.material = product.materials.join(', ');
  if (product.finishes?.length) schema.color = product.finishes.join(', ');

  return schema;
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: `${SITE_URL}${it.item}`,
    })),
  };
}

export const getBreadcrumbsSchema = getBreadcrumbSchema;

/**
 * FAQPage. Only ever call this with the exact array the page renders visibly —
 * Google requires the answer text in the markup to be present on the page.
 */
export function getFaqSchema(qaBlocks: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (qaBlocks || []).map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: { '@type': 'Answer', text: qa.answer },
    })),
  };
}

export function getArticleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
}) {
  const published = new Date(post.date);
  const iso = Number.isNaN(published.getTime()) ? undefined : published.toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    ...(iso ? { datePublished: iso, dateModified: iso } : {}),
  };
}

/**
 * Service + areaServed for a city page. Uses the real single address via the
 * provider reference rather than implying a branch office in that city.
 */
export function getCityServiceSchema(city: { name: string; state: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Aluminium door and window hardware supply',
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'State', name: city.state },
    },
  };
}
