/**
 * Typed catalogue — the server-rendering source of truth for the 86-SKU range.
 *
 * Raw SKU records still live in `src/lib/sahData.ts` (FULL_CATALOGUE_PRODUCTS) so
 * there is exactly one place a SKU is declared. This module layers the extra
 * typed fields the product and category templates need — `slug`, `materials`,
 * `useCases` — on top of that single source, rather than duplicating 86 records
 * and letting the two copies drift apart.
 *
 * RULE: every value here must be derivable from the product itself. No prices,
 * no ratings, no stock counts, no certifications. If a material is not knowable
 * from the SKU, the field falls back to the category default rather than being
 * invented for that specific item.
 */

import { FULL_CATALOGUE_PRODUCTS, SAH_CATEGORIES, type SAHProduct } from '@/lib/sahData';

export interface CatalogueProduct {
  /** Salasar item code, e.g. "SA-33". */
  sku: string;
  /** Canonical URL slug — matches getSAHProductSlug(), e.g. "aluminium-door-kit-sa-33". */
  slug: string;
  name: string;
  /** Human-readable category name, e.g. "Door Kits". */
  category: string;
  /** Category URL slug, e.g. "door-kits". */
  categorySlug: string;
  /** Surface finishes this SKU is stocked in. Empty when the SKU has one standard finish. */
  finishes: string[];
  /** Stocked sizes. Empty when the SKU is single-size. */
  sizes: string[];
  /** Named variants, e.g. ["Light", "Heavy"]. */
  variants: string[];
  /** What the item is made of. */
  materials: string[];
  /** Where the item is typically fitted — drives the "Where it is used" block. */
  useCases: string[];
  shortDescription: string;
  image: string;
}

/** Canonical slug for a SKU. Mirrors getSAHProductSlug() so URLs stay stable. */
export function productSlug(p: Pick<SAHProduct, 'name' | 'saCode'>): string {
  const nameSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const codeSlug = p.saCode.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${nameSlug}-${codeSlug}`;
}

/**
 * Materials and typical installation contexts per category. These describe the
 * class of product, not a claim about any individual batch.
 */
const CATEGORY_DEFAULTS: Record<string, { materials: string[]; useCases: string[] }> = {
  'rollers-bearings-channels': {
    materials: ['Nylon', 'Hardened steel', 'Extruded aluminium'],
    useCases: ['Sliding windows', 'Sliding doors', 'Home', 'Office'],
  },
  'locks-latches': {
    materials: ['Zinc alloy', 'Stainless steel', 'HDPVC'],
    useCases: ['Sliding windows', 'Sliding doors', 'Home', 'Office'],
  },
  'door-window-seals': {
    materials: ['Extruded aluminium', 'EPDM rubber', 'Nylon brush', 'PVC'],
    useCases: ['Entry doors', 'Windows', 'Home', 'Office'],
  },
  hinges: {
    materials: ['Extruded aluminium', 'Stainless steel'],
    useCases: ['Casement doors', 'Windows', 'Home', 'Office'],
  },
  'door-kits': {
    materials: ['Extruded aluminium', 'Stainless steel'],
    useCases: ['Entry doors', 'Internal doors', 'Home', 'Office', 'Shopfront'],
  },
  'bolts-handles': {
    materials: ['Extruded aluminium', 'Stainless steel', 'Zinc alloy'],
    useCases: ['Entry doors', 'Windows', 'Home', 'Office'],
  },
  'door-closers': {
    materials: ['Aluminium body', 'Stainless steel cover', 'Hydraulic fluid'],
    useCases: ['Entry doors', 'Office doors', 'Shopfront', 'High-traffic doorways'],
  },
  'fittings-accessories': {
    materials: ['Extruded aluminium', 'Nylon', 'PVC', 'Steel'],
    useCases: ['Glass partitions', 'Office', 'Shopfront', 'Home'],
  },
  'tapes-sealants-adhesives': {
    materials: ['Acrylic foam', 'EPDM rubber', 'Silicone', 'Polyurethane'],
    useCases: ['Glazing', 'Facades', 'Window sealing', 'Home', 'Office'],
  },
  'fasteners-screws': {
    materials: ['Zinc-plated steel', 'Stainless steel'],
    useCases: ['Frame fixing', 'Partitions', 'Home', 'Office'],
  },
  'glass-hardware-shower-fittings': {
    materials: ['Brass', 'Stainless steel', 'Chrome-plated zinc alloy'],
    useCases: ['Bathroom', 'Shower enclosures', 'Glass partitions', 'Office', 'Shopfront'],
  },
  'abrasives-mesh-misc': {
    materials: ['Stainless steel', 'Aluminium', 'HDPE', 'Zirconia abrasive'],
    useCases: ['Windows', 'Ventilation', 'Fabrication workshop', 'Home'],
  },
};

/**
 * Per-SKU overrides where the item is more specific than its category default.
 * Each entry is grounded in the SKU's own name or stored description.
 */
const SKU_OVERRIDES: Record<string, Partial<Pick<CatalogueProduct, 'materials' | 'useCases'>>> = {
  'SA-1': { materials: ['Nylon bristle', 'PVC carrier'], useCases: ['Sliding window tracks', 'Sliding door tracks', 'Home', 'Office'] },
  'SA-2': { materials: ['Nylon bristle', 'PVC carrier'], useCases: ['Sliding window tracks', 'Sliding door tracks', 'Home', 'Office'] },
  'SA-3': { materials: ['Chrome steel'], useCases: ['Sliding window rollers', 'Roller assemblies', 'Home'] },
  'SA-4': { materials: ['Chrome steel'], useCases: ['Sliding door rollers', 'Heavy shutters', 'Office', 'Shopfront'] },
  'SA-5': { materials: ['Hardened steel'], useCases: ['Compact roller assemblies', 'Hardware sub-assemblies'] },
  'SA-12': { materials: ['Extruded aluminium'], useCases: ['Sliding track mounting', 'Window frames', 'Home', 'Office'] },
  'SA-13': { materials: ['Extruded aluminium'], useCases: ['Sliding track mounting', 'Window frames', 'Home', 'Office'] },
  'SA-24': { materials: ['Extruded aluminium', 'Nylon brush', 'EPDM rubber'], useCases: ['Entry door bottoms', 'Home', 'Office'] },
  'SA-25': { materials: ['Flexible PVC'], useCases: ['Internal doors', 'Glass doors', 'Home', 'Office'] },
  'SA-32': { materials: ['Zinc alloy', 'Rubber head'], useCases: ['Entry doors', 'Internal doors', 'Home', 'Office'] },
  'SA-45': { materials: ['Cast iron body', 'Hydraulic fluid'], useCases: ['Frameless glass doors', 'Shopfront', 'Office'] },
  'SA-46': { materials: ['Nylon'], useCases: ['Frame anchoring', 'Masonry fixing', 'Home', 'Office'] },
  'SA-51': { materials: ['Self-adhesive vinyl film'], useCases: ['Glass partitions', 'Bathroom', 'Office'] },
  'SA-55': { materials: ['Neutral-cure silicone'], useCases: ['Perimeter sealing', 'Glazing', 'Bathroom', 'Home'] },
  'SA-56': { materials: ['Polyurethane foam'], useCases: ['Gap filling around door frames', 'Insulation', 'Home', 'Office'] },
  'SA-57': { materials: ['Steel skeleton frame'], useCases: ['Applying 300 ml sealant cartridges', 'Fabrication workshop'] },
  'SA-63': { materials: ['Stainless steel'], useCases: ['Casement windows', 'Home', 'Office'] },
  'SA-64': { materials: ['Stainless steel'], useCases: ['Casement windows', 'Ventilation control', 'Home'] },
  'SA-66': { materials: ['Brass', 'Stainless steel'], useCases: ['Shower doors', 'Glass cabinets', 'Bathroom', 'Home'] },
  'SA-75': { materials: ['Chrome-plated brass'], useCases: ['Shower enclosures', 'Bathroom'] },
  'SA-76': { materials: ['Chrome-plated brass'], useCases: ['Shower enclosures', 'Bathroom'] },
  'SA-77': { materials: ['Chrome-plated brass'], useCases: ['Shower enclosures', 'Bathroom'] },
  'SA-78': { materials: ['Chrome-plated brass'], useCases: ['Shower enclosures', 'Bathroom'] },
  'SA-79': { materials: ['Zirconia abrasive cloth'], useCases: ['Weld smoothing', 'Edge finishing', 'Fabrication workshop'] },
  'SA-80': { materials: ['Reinforced abrasive'], useCases: ['Cutting aluminium sections', 'Fabrication workshop'] },
  'SA-81': { materials: ['Stainless steel mesh', 'Aluminium mesh'], useCases: ['Window insect screens', 'Home', 'Kitchen and bathroom windows'] },
  'SA-82': { materials: ['Extruded aluminium'], useCases: ['Bathroom windows', 'Kitchen windows', 'Ventilation', 'Home'] },
  'SA-83': { materials: ['Powder-coated steel mesh'], useCases: ['Window security screens', 'Home'] },
  'SA-84': { materials: ['HDPE'], useCases: ['Window insect screens', 'Home'] },
  'SA-85': { materials: ['Extruded aluminium'], useCases: ['Window frame corner joints', 'Fabrication workshop'] },
  'SA-86': { materials: ['Zinc alloy', 'Steel gear rod'], useCases: ['Casement window sashes', 'Home', 'Office'] },
};

/** The 86-SKU catalogue in the richer typed shape. */
export const CATALOGUE: CatalogueProduct[] = FULL_CATALOGUE_PRODUCTS.map((p) => {
  const defaults = CATEGORY_DEFAULTS[p.categorySlug] ?? { materials: [], useCases: [] };
  const override = SKU_OVERRIDES[p.saCode] ?? {};

  return {
    sku: p.saCode,
    slug: productSlug(p),
    name: p.name,
    category: p.categoryName,
    categorySlug: p.categorySlug,
    finishes: p.finishes ?? [],
    sizes: p.sizes ?? [],
    variants: p.variants ?? [],
    materials: override.materials ?? (p.material ? [p.material] : defaults.materials),
    useCases: override.useCases ?? defaults.useCases,
    shortDescription: p.shortDesc,
    image: p.image,
  };
});

export const CATALOGUE_CATEGORIES = SAH_CATEGORIES;

/** SKUs belonging to one category, in catalogue order. */
export function productsInCategory(categorySlug: string): CatalogueProduct[] {
  return CATALOGUE.filter((p) => p.categorySlug === categorySlug);
}

export function getCatalogueProduct(slugOrSku: string): CatalogueProduct | undefined {
  const n = slugOrSku.toLowerCase().trim();
  return CATALOGUE.find((p) => p.slug === n || p.sku.toLowerCase() === n);
}

export function getCategory(slug: string) {
  return SAH_CATEGORIES.find((c) => c.slug === slug);
}

/** Other SKUs in the same category, for the related-products block. */
export function relatedProducts(p: CatalogueProduct, limit = 4): CatalogueProduct[] {
  return CATALOGUE.filter((o) => o.categorySlug === p.categorySlug && o.sku !== p.sku).slice(0, limit);
}

export const CATALOGUE_SKU_COUNT = CATALOGUE.length;
