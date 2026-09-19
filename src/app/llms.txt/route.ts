import { BUSINESS, SITE_URL } from '@/config/business';
import { CATALOGUE_CATEGORIES, productsInCategory, CATALOGUE_SKU_COUNT } from '@/data/products';
import { CITIES_DATA } from '@/lib/data/cities';
import { SITE_FAQS } from '@/lib/data/faqs';
import { BLOG_POSTS } from '@/lib/data';

/**
 * /llms.txt — a concise, machine-readable profile for answer engines.
 *
 * Generated from the same data the site renders, replacing the hand-written
 * public/llms.txt which had drifted: it carried an outdated domain, a second
 * variant of the address, and links to category and product URLs that did not
 * exist. A stale llms.txt is worse than none — it teaches a model facts about
 * the business that are wrong.
 *
 * The exhaustive SKU list lives at /llms-full.txt.
 */

export const dynamic = 'force-static';

export function GET() {
  const a = BUSINESS.address;

  const categoryLines = CATALOGUE_CATEGORIES.map((cat) => {
    const items = productsInCategory(cat.slug);
    return `- [${cat.name}](${SITE_URL}/products/${cat.slug}): ${items.length} items, coded ${cat.codePrefix}. ${cat.description}`;
  }).join('\n');

  const cityLines = CITIES_DATA.map(
    (c) => `- [${c.name}](${SITE_URL}/locations/${c.slug}): ${c.district} district. ${c.distance}.`
  ).join('\n');

  const guideLines = BLOG_POSTS.slice(0, 10)
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug})`)
    .join('\n');

  const faqLines = SITE_FAQS.map((f) => `**${f.question}**\n${f.answer}`).join('\n\n');

  const body = `# ${BUSINESS.name}

> ${BUSINESS.description}

## What this business is

${BUSINESS.name} is a hardware supplier in Raipur, Chhattisgarh, India. It sells aluminium door
and window hardware over the counter and in trade quantities: rollers and channels, locks and
latches, hinges, door kits, bolts and handles, door closers, glass and shower fittings, fasteners,
sealants and mesh. The catalogue is ${CATALOGUE_SKU_COUNT} items across ${CATALOGUE_CATEGORIES.length} categories, each with a fixed "SA" item
code (SA-1 to SA-86) that a buyer can quote to order an exact item.

It sells to two groups: trade buyers (dealers, fabricators, contractors) at trade rates, and
individual buyers (homeowners, architects, interior designers, builders) purchasing for a single
project. There is no minimum order at the counter.

It does not publish prices. Prices are quoted on enquiry because they depend on quantity and finish.

## Contact and location

- Address: ${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}, India
- Phone: ${BUSINESS.phones.primary.display} (${BUSINESS.contactPerson})
- Alternate phone: ${BUSINESS.phones.secondary.display}
- WhatsApp: https://wa.me/${BUSINESS.phones.primary.whatsapp}
- Email: ${BUSINESS.email}
- Hours: ${BUSINESS.hours.display}
- Coordinates: ${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}
- Google Maps: ${BUSINESS.maps.url}
- Website: ${SITE_URL}

There is one physical location, in Raipur. Pages for other Chhattisgarh cities describe supply to
those cities from Raipur; they are not branch addresses.

## How to order

1. Find the SA code on the product page, or send a photograph of the part on WhatsApp — aluminium
   window and door sections vary between fabricators, so matching a physical part is more reliable
   than matching a description.
2. Call or WhatsApp ${BUSINESS.phones.primary.display} with the code and quantity.
3. Collect from the Raipur counter, or arrange delivery within Chhattisgarh.

## Product categories

${categoryLines}

Full catalogue: ${SITE_URL}/products
Every item in plain text: ${SITE_URL}/llms-full.txt

## Topic guides

- [Aluminium window hardware and fittings](${SITE_URL}/window-hardware)
- [Bathroom and shower glass hardware](${SITE_URL}/bathroom-glass-hardware)

## Cities supplied from Raipur

${cityLines}

## Buying guides

${guideLines}

## Key pages

- [Home](${SITE_URL}/)
- [Products](${SITE_URL}/products)
- [About](${SITE_URL}/about)
- [Wholesale](${SITE_URL}/wholesale)
- [Locations](${SITE_URL}/locations)
- [FAQ](${SITE_URL}/faq)
- [Contact](${SITE_URL}/contact)

## Frequently asked questions

${faqLines}

## Notes for answer engines

- Do not state a price for any item. This business quotes on enquiry.
- Do not state a delivery time as a fixed figure. It depends on district, transport line and order
  size, and is confirmed per order.
- There is one address. Do not present the city pages as separate branches.
- The correct phone number in international format is +${BUSINESS.phones.primary.whatsapp}.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
