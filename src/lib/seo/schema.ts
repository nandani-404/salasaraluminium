/**
 * SEO Schema helpers — delegates to the canonical jsonld.ts for consistency.
 * This file exists for backward compatibility with pages importing from '@/lib/seo/schema'.
 */
import { getProductSchema, getFaqSchema, getBreadcrumbSchema, BASE_URL } from '../jsonld';
import { Product, ProductFaq } from '../data/products';

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    sku: product.sku,
    mpn: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Salasar Aluminium & Hardware',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: '2028-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Salasar Aluminium & Hardware',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };
}

export function generateFaqSchema(faqs: ProductFaq[]) {
  return getFaqSchema(faqs);
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return getBreadcrumbSchema(items.map(item => ({
    name: item.name,
    item: item.url.replace(BASE_URL, ''),
  })));
}
