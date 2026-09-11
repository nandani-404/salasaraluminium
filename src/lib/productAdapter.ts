import { Product, products, Finish, ProductSpec, ProductFaq } from '@/lib/data/products';
import { FULL_CATALOGUE_PRODUCTS, SAH_CATEGORIES, SAHProduct, SAHCategory } from '@/lib/sahData';
import { CATEGORIES as ARCH_CATEGORIES } from '@/lib/data';

/**
 * Generate a clean, SEO-friendly slug for any catalogue item:
 * e.g. "Track Brush (Black)" with SA-1 -> "track-brush-black-sa-1"
 */
export function getSAHProductSlug(p: SAHProduct): string {
  const nameSlug = p.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const saCodeSlug = p.saCode.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${nameSlug}-${saCodeSlug}`;
}

/**
 * Normalize an arbitrary finish string into a recognized Finish type
 */
function normalizeFinish(finishStr?: string): Finish {
  if (!finishStr) return 'Raw Aluminium';
  const lower = finishStr.toLowerCase();
  if (lower.includes('gold')) return 'Brushed Gold';
  if (lower.includes('champagne') || lower.includes('champion')) return 'Anodized Champagne';
  if (lower.includes('black') || lower.includes('matt')) return 'Matte Black';
  if (lower.includes('chrome') || lower.includes('cp') || lower.includes('silver') || lower.includes('mirror') || lower.includes('ss')) return 'Satin Chrome';
  if (lower.includes('bronze') || lower.includes('brown')) return 'Antique Bronze';
  return 'Raw Aluminium';
}

/**
 * Convert a trade catalog SAHProduct into the full unified Product model
 */
export function convertSAHProductToProduct(sah: SAHProduct): Product {
  const slug = getSAHProductSlug(sah);
  const primaryFinish = sah.finishes && sah.finishes.length > 0 ? sah.finishes[0] : 'Natural Aluminium';

  const specs: ProductSpec[] = [
    { label: 'Item Code (SKU)', value: sah.saCode },
    { label: 'Trade Category', value: sah.categoryName },
    { label: 'Material Alloy', value: sah.material || 'Architectural Aluminium / Hardened Alloy' },
    { label: 'Standard Surface', value: primaryFinish },
    { label: 'Dispatch Hub', value: 'Central Raipur Warehouse Depot, Chhattisgarh' },
    { label: 'Packaging', value: 'Standard Trade Box / Crate Packs' },
  ];

  if (sah.sizes && sah.sizes.length > 0) {
    specs.push({ label: 'Available Sizes', value: sah.sizes.join(', ') });
  }
  if (sah.finishes && sah.finishes.length > 0) {
    specs.push({ label: 'All Finishes', value: sah.finishes.join(', ') });
  }
  if (sah.variants && sah.variants.length > 0) {
    specs.push({ label: 'Item Variants', value: sah.variants.join(', ') });
  }

  const faqs: ProductFaq[] = [
    {
      question: `What is the wholesale MOQ and supply lead time for ${sah.name} (${sah.saCode})?`,
      answer: `We supply ${sah.name} in standard trade box packaging directly from our Raipur warehouse depot with same-day dispatch across Chhattisgarh and 24–48 hour direct transport delivery across Central India.`,
    },
    {
      question: `Are wholesale price quotes and commercial trade invoices available for ${sah.name}?`,
      answer: `Yes. Salasar Aluminium & Hardware provides commercial GST trade invoices, batch quality verification, and wholesale volume discount slabs for registered fabricators, interior contractors, and retail dealers.`,
    },
    {
      question: `What size or finish configurations are available for ${sah.name}?`,
      answer: `${sah.name} is available in ${sah.finishes?.join(', ') || 'standard trade finishes'} ${sah.sizes?.length ? 'and standard sizes: ' + sah.sizes.join(', ') : ''}. Custom trade requirements can be quoted directly via our WhatsApp trade desk.`,
    },
  ];

  return {
    id: sah.id,
    slug: slug,
    name: sah.name,
    sku: sah.saCode,
    category: sah.categoryName,
    categorySlug: sah.categorySlug,
    segment: 'commercial',
    material: sah.material || 'Architectural Grade Aluminium / Hardened Alloy',
    alloyGrade: '6063-T6 / Heavy Duty Commercial',
    finish: normalizeFinish(sah.finishes?.[0]),
    price: 0,
    moq: 50,
    images: [sah.image],
    shortDescription: sah.shortDesc,
    description: `${sah.shortDesc} Supplied by Salasar Aluminium & Hardware, Raipur. Manufactured to strict architectural tolerances for smooth operation, corrosion resistance, and high structural reliability in residential and commercial installations.`,
    specs,
    faqs,
    rating: 4.9,
    reviewsCount: 32,
    isFeatured: ['sa-1', 'sa-11', 'sa-30', 'sa-33', 'sa-42', 'sa-81'].includes(sah.id),
    tags: [sah.categoryName, sah.saCode, 'Hardware', 'Wholesale Raipur', 'Aluminium Fittings'],
  };
}

export interface MatchedProduct {
  product: Product;
  isCatalogue: boolean;
  canonicalSlug: string;
}

/**
 * Universal product resolver supporting:
 * - Showcase products by slug or id (e.g. palazzo-luxury-door-handle)
 * - Catalogue products by canonical slug (e.g. track-brush-black-sa-1)
 * - Catalogue products by id (e.g. sa-1)
 * - Catalogue products by saCode (e.g. SA-1)
 */
export function findProductByAnySlug(slugOrId: string): MatchedProduct | undefined {
  if (!slugOrId) return undefined;
  const normalized = slugOrId.toLowerCase().trim();

  // 1. Check showcase products first
  const showcase = products.find(
    (p) => p.slug.toLowerCase() === normalized || p.id.toLowerCase() === normalized
  );
  if (showcase) {
    return {
      product: showcase,
      isCatalogue: false,
      canonicalSlug: showcase.slug,
    };
  }

  // 2. Check 86 FULL_CATALOGUE_PRODUCTS
  for (const sah of FULL_CATALOGUE_PRODUCTS) {
    const canonicalSlug = getSAHProductSlug(sah);
    const nameSlug = sah.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const saCodeSlug = sah.saCode.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const idSlug = sah.id.toLowerCase();

    if (
      canonicalSlug === normalized ||
      nameSlug === normalized ||
      saCodeSlug === normalized ||
      idSlug === normalized ||
      `${nameSlug}-${idSlug}` === normalized
    ) {
      return {
        product: convertSAHProductToProduct(sah),
        isCatalogue: true,
        canonicalSlug,
      };
    }
  }

  return undefined;
}

/**
 * Get all static params for the /product/[slug] route
 * Includes canonical slugs and short IDs for full backwards compatibility
 */
export function getAllProductStaticSlugs(): string[] {
  const slugs = new Set<string>();

  // Showcase items
  for (const p of products) {
    slugs.add(p.slug);
  }

  // Catalogue items (both canonical slug and id alias)
  for (const p of FULL_CATALOGUE_PRODUCTS) {
    slugs.add(getSAHProductSlug(p));
    slugs.add(p.id.toLowerCase());
  }

  return Array.from(slugs);
}

/**
 * Universal category resolver:
 * Matches SAH hardware categories (12 items) OR architectural categories (3 items)
 */
export function findCategoryBySlug(slug: string): {
  name: string;
  slug: string;
  description: string;
  type: 'sah' | 'architectural';
  categoryObj: any;
} | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();

  // Check SAH Categories (e.g. rollers-bearings-channels, locks-latches, etc.)
  const sahCat = SAH_CATEGORIES.find((c) => c.slug.toLowerCase() === normalized);
  if (sahCat) {
    return {
      name: sahCat.name,
      slug: sahCat.slug,
      description: sahCat.description,
      type: 'sah',
      categoryObj: sahCat,
    };
  }

  // Check Architectural Categories (residential, commercial, industrial)
  const archCat = ARCH_CATEGORIES.find((c) => c.slug.toLowerCase() === normalized);
  if (archCat) {
    return {
      name: archCat.name,
      slug: archCat.slug,
      description: archCat.description,
      type: 'architectural',
      categoryObj: archCat,
    };
  }

  return undefined;
}

/**
 * Universal related products getter for both showcase and catalogue items
 */
export function getRelatedProductsUniversal(product: Product, limit = 4): Product[] {
  const showcase = products.find((p) => p.id === product.id);
  if (showcase) {
    return products
      .filter((p) => p.id !== product.id && (p.segment === product.segment || p.categorySlug === product.categorySlug))
      .slice(0, limit);
  }

  // For catalogue products, find others in the same category
  const sameCategory = FULL_CATALOGUE_PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug
  );

  if (sameCategory.length > 0) {
    return sameCategory.slice(0, limit).map(convertSAHProductToProduct);
  }

  return FULL_CATALOGUE_PRODUCTS
    .filter((p) => p.id !== product.id)
    .slice(0, limit)
    .map(convertSAHProductToProduct);
}

