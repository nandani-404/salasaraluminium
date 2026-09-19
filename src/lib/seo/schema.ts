/**
 * Backwards-compatible wrappers over the canonical helpers in `../jsonld`.
 *
 * WHAT CHANGED AND WHY
 * The previous `generateProductSchema` emitted, on every product page:
 *   - `aggregateRating` built from `product.rating` / `product.reviewsCount`,
 *     which for all 86 catalogue SKUs came from a hard-coded `rating: 4.9,
 *     reviewsCount: 32` in the product adapter. That is fabricated review
 *     markup on 86 URLs — a manual-action risk, not a ranking opportunity.
 *   - `offers` with `price: product.price`, which is `0` for every catalogue
 *     SKU, together with `availability: InStock`.
 *
 * Both are gone. A Product node without offers or rating is perfectly valid;
 * it is simply not eligible for price or star rich results, which is correct
 * while the business does not publish prices or collect on-site reviews.
 */
import { getProductSchema, getFaqSchema, getBreadcrumbSchema } from '../jsonld';
import type { Product, ProductFaq } from '../data/products';

export function generateProductSchema(product: Product) {
  return getProductSchema({
    name: product.name,
    sku: product.sku,
    slug: product.slug,
    category: product.category,
    shortDescription: product.shortDescription,
    image: product.images?.[0] ?? '/logo.png',
    materials: product.material ? [product.material] : undefined,
    finishes: product.finish ? [product.finish] : undefined,
  });
}

export function generateFaqSchema(faqs: ProductFaq[]) {
  return getFaqSchema(faqs);
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return getBreadcrumbSchema(
    items.map((item) => ({ name: item.name, item: item.url.replace(/^https?:\/\/[^/]+/, '') }))
  );
}
