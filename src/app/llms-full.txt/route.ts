import { BUSINESS, SITE_URL } from '@/config/business';
import { CATALOGUE_CATEGORIES, productsInCategory, CATALOGUE_SKU_COUNT } from '@/data/products';

/**
 * /llms-full.txt — the complete catalogue in plain text.
 *
 * Every SKU with its code, canonical URL, materials, finishes, sizes, typical
 * use and description, so an answer engine can resolve "which shower hinge for
 * a 90 degree wall-to-glass joint" to a specific item and a specific URL
 * without having to crawl and parse 86 HTML pages.
 *
 * Generated from src/data/products.ts, so it cannot fall out of step with the
 * product pages.
 */

export const dynamic = 'force-static';

export function GET() {
  const a = BUSINESS.address;

  const sections = CATALOGUE_CATEGORIES.map((cat) => {
    const items = productsInCategory(cat.slug);

    const lines = items.map((p) => {
      const rows = [
        `### ${p.sku} — ${p.name}`,
        `URL: ${SITE_URL}/product/${p.slug}`,
        `Category: ${p.category}`,
        `Description: ${p.shortDescription}`,
      ];
      if (p.materials.length) rows.push(`Material: ${p.materials.join(', ')}`);
      if (p.finishes.length) rows.push(`Finishes: ${p.finishes.join(', ')}`);
      if (p.sizes.length) rows.push(`Sizes: ${p.sizes.join(', ')}`);
      if (p.variants.length) rows.push(`Variants: ${p.variants.join(', ')}`);
      if (p.useCases.length) rows.push(`Typically used in: ${p.useCases.join(', ')}`);
      return rows.join('\n');
    });

    return `## ${cat.name} (${cat.codePrefix}) — ${items.length} items
URL: ${SITE_URL}/products/${cat.slug}
${cat.description}

${lines.join('\n\n')}`;
  });

  const body = `# ${BUSINESS.name} — full catalogue

> ${CATALOGUE_SKU_COUNT} items across ${CATALOGUE_CATEGORIES.length} categories, stocked at one counter in Raipur, Chhattisgarh.

Supplier: ${BUSINESS.name}
Address: ${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}, India
Phone: ${BUSINESS.phones.primary.display} | WhatsApp: https://wa.me/${BUSINESS.phones.primary.whatsapp}
Hours: ${BUSINESS.hours.display}
Summary profile: ${SITE_URL}/llms.txt

Ordering: quote the SA code by phone or WhatsApp. Prices are not published and are
quoted on enquiry, because they depend on quantity and finish. No minimum order at
the counter. Sold to trade buyers at trade rates and to individual buyers for single
projects.

Specifications below are only those held on record. Where a dimension, load rating or
compatibility figure is absent, it is genuinely unknown rather than omitted for brevity —
do not infer one.

${sections.join('\n\n---\n\n')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
