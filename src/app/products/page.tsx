import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, PhoneCall } from 'lucide-react';
import {
  CATALOGUE_CATEGORIES,
  productsInCategory,
  CATALOGUE_SKU_COUNT,
} from '@/data/products';
import CatalogueCard from '@/components/catalogue/CatalogueCard';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/jsonld';
import { BUSINESS, TEL_HREF, whatsappLink } from '@/config/business';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export const metadata: Metadata = {
  title: 'Aluminium Hardware Catalogue — 86 SKUs | Salasar Raipur',
  description:
    'Browse all 86 aluminium door and window hardware SKUs stocked in Raipur: rollers, locks, hinges, door kits, closers, shower fittings and sealants. Call for a quote.',
  alternates: { canonical: '/products' },
  openGraph: {
    type: 'website',
    url: '/products',
    title: 'Aluminium Hardware Catalogue — 86 SKUs | Salasar Raipur',
    description:
      'All 86 aluminium door and window hardware SKUs stocked in Raipur, Chhattisgarh — rollers, locks, hinges, door kits, closers and shower fittings.',
  },
};

// Legacy `/products?category=x` links are 301'd to the real `/products/x`
// route in `src/proxy.ts`. Handling it there rather than here keeps this page
// statically prerendered and issues a true 301 instead of a 307.
export default function ProductsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Products', item: '/products' },
  ]);

  return (
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-white min-h-screen">
      <JsonLd schema={breadcrumbSchema} />

      {/* Page header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 border-b border-slate-200 space-y-3">
        <nav aria-label="Breadcrumb" className="text-xs text-[#64748B]">
          <Link href="/" className="hover:text-[#0B1F3A]">
            Home
          </Link>
          <span className="mx-1.5" aria-hidden="true">
            /
          </span>
          <span className="text-[#0B1F3A] font-semibold">Products</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
          Aluminium Door &amp; Window Hardware Catalogue — Raipur
        </h1>

        <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
          All {CATALOGUE_SKU_COUNT} hardware items we stock, grouped into{' '}
          {CATALOGUE_CATEGORIES.length} categories. Every item carries an SA code so you can quote it
          over the phone or on WhatsApp without sending a photo. We supply dealers and fabricators at
          trade rates, and homeowners, architects and builders buying for a single project.
        </p>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5 pt-2 w-full sm:w-auto">
          <a
            href={TEL_HREF}
            data-analytics="click_call"
            data-analytics-location="products-header"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-11 px-2.5 sm:px-5 bg-[#8A6408] hover:bg-[#6F5006] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-center truncate"
          >
            <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{BUSINESS.phones.primary.display}</span>
          </a>
          <a
            href={whatsappLink({
              message: 'Hello Salasar, I would like a quote from your hardware catalogue.',
              source: '/products',
              campaign: 'catalogue',
            })}
            data-analytics="click_whatsapp"
            data-analytics-location="products-header"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-11 px-2.5 sm:px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-2xs text-center truncate"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span className="truncate">
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">WhatsApp a quote request</span>
            </span>
          </a>
        </div>
      </header>

      {/* Category jump navigation — real links, works with JavaScript disabled */}
      <nav
        aria-label="Product categories"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7"
      >
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#8A6408] mb-3">
          Jump to a category
        </h2>
        <ul className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 list-none p-0">
          {CATALOGUE_CATEGORIES.map((cat) => (
            <li key={cat.slug} className="h-full">
              <Link
                href={`/products/${cat.slug}`}
                className="flex items-center justify-between min-h-11 h-full px-2.5 sm:px-3.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#0B1F3A] hover:border-[#0B1F3A] transition-colors shadow-2xs group sm:inline-flex sm:w-auto"
              >
                <span className="truncate group-hover:text-[#8A6408] transition-colors">
                  {cat.name}
                </span>
                <span className="ml-1.5 text-[10px] sm:text-xs font-mono font-bold text-[#8A6408] bg-[#F8FAFC] sm:bg-transparent px-1.5 py-0.5 sm:p-0 rounded border border-[#E2E8F0] sm:border-0 sm:text-[#64748B] sm:font-normal shrink-0">
                  <span className="sm:hidden">{productsInCategory(cat.slug).length}</span>
                  <span className="hidden sm:inline">({productsInCategory(cat.slug).length})</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Full catalogue, every SKU rendered server-side */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {CATALOGUE_CATEGORIES.map((cat, catIndex) => {
          const items = productsInCategory(cat.slug);
          if (items.length === 0) return null;

          return (
            // The id keeps historic /products#category-slug links working.
            <section key={cat.slug} id={cat.slug} className="scroll-mt-24 space-y-4 sm:space-y-6">
              <div className="space-y-2 border-b border-slate-200 pb-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                    <Link href={`/products/${cat.slug}`} className="hover:text-[#8A6408]">
                      {cat.name}
                    </Link>
                  </h2>
                  <span className="text-xs font-mono bg-[#0B1F3A] text-[#D4AF37] px-2 py-0.5 rounded font-bold">
                    {cat.codePrefix}
                  </span>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed max-w-3xl">{cat.description}</p>
                <Link
                  href={`/products/${cat.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0B1F3A] hover:text-[#8A6408]"
                >
                  See all {items.length} {cat.name.toLowerCase()} items
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {items.map((product, i) => (
                  <CatalogueCard
                    key={product.sku}
                    product={product}
                    priority={catIndex === 0 && i === 0}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <TradeQuoteFormSection />
    </div>
  );
}
