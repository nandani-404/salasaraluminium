import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, CATEGORIES as ARCH_CATEGORIES } from '@/lib/data';
import { SAH_CATEGORIES, FULL_CATALOGUE_PRODUCTS } from '@/lib/sahData';
import {
  findProductByAnySlug,
  getSAHProductSlug,
  findCategoryBySlug,
} from '@/lib/productAdapter';
import ProductCard from '@/components/ProductCard';
import JsonLd from '@/components/JsonLd';
import { getFaqSchema, getBreadcrumbSchema } from '@/lib/jsonld';
import { categoryMeta } from '@/lib/seo/metadata';
import { productsInCategory } from '@/data/products';
import CatalogueCard from '@/components/catalogue/CatalogueCard';
import FaqList from '@/components/FaqList';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { BUSINESS, TEL_HREF, whatsappLink } from '@/config/business';
import { ArrowLeft, Layers, ShieldCheck, ChevronRight, CheckCircle2, PhoneCall } from 'lucide-react';

export async function generateStaticParams() {
  const archParams = ARCH_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));

  const sahParams = SAH_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));

  // Include catalogue products so static generation generates permanent redirects
  const prodParams = FULL_CATALOGUE_PRODUCTS.map((p) => ({
    category: getSAHProductSlug(p),
  }));

  return [...archParams, ...sahParams, ...prodParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.category;

  // 1. If it's a product slug, point metadata to the canonical product page
  const productMatch = findProductByAnySlug(slug);
  if (productMatch) {
    // This path 308s to /product/<slug>, so its only job is to point the
    // canonical at the destination.
    return { alternates: { canonical: `/product/${productMatch.canonicalSlug}` } };
  }

  // 2. Check categories
  const categoryMatch = findCategoryBySlug(slug);
  if (!categoryMatch) return {};

  // Title pattern: "{Category} Wholesale in Raipur | Salasar", trimmed on a
  // word boundary rather than cut mid-word with an ellipsis.
  return categoryMeta(categoryMatch.name, categoryMatch.description, categoryMatch.slug);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.category;

  // 1. If user or Googlebot visits a product slug under /products/ (e.g. /products/track-brush-black-sa-1),
  // permanently redirect (308) to canonical /product/track-brush-black-sa-1
  const productMatch = findProductByAnySlug(slug);
  if (productMatch) {
    permanentRedirect(`/product/${productMatch.canonicalSlug}`);
  }

  // 2. Check for SAH Hardware Category (e.g. rollers-bearings-channels, locks-latches, hinges, etc.)
  const sahCategory = SAH_CATEGORIES.find((c) => c.slug === slug);
  if (sahCategory) {
    const categoryProducts = FULL_CATALOGUE_PRODUCTS.filter(
      (p) => p.categorySlug === sahCategory.slug
    );

    /*
     * Answer-first FAQs: the first sentence of each answer is the direct
     * answer, so it can stand alone as a snippet.
     *
     * The previous set asserted "same-day dispatch from our central warehouse",
     * "direct factory trade pricing" and "custom bulk crate deliveries across
     * Central India" on all 12 category pages. None of those are verified
     * operational facts, and the same text on 12 URLs is duplicate content.
     */
    const categoryFaqs = [
      {
        question: `What does the ${sahCategory.name} range cover?`,
        answer: `${sahCategory.description} The range is coded ${sahCategory.codePrefix}, and there are ${categoryProducts.length} items in it. Every item has an SA code you can quote over the phone or on WhatsApp instead of describing the part.`,
      },
      {
        question: `How do I work out which item I need?`,
        answer: `Bring the old part to our counter in Bhaisthan, Raipur, or send a photograph on WhatsApp. Matching against the physical item is faster and more reliable than working from a description, and it costs nothing to check. If you already know the SA code, quote it and we will confirm availability.`,
      },
      {
        question: `Do you sell ${sahCategory.name.toLowerCase()} to homeowners as well as trade?`,
        answer: `Yes. Dealers, fabricators and contractors buy at trade rates in box quantities, and homeowners, architects, interior designers and builders can buy what one project needs with no minimum order at the counter.`,
      },
    ];

    const faqSchema = getFaqSchema(categoryFaqs);
    const breadcrumbSchema = getBreadcrumbSchema([
      { name: 'Home', item: '/' },
      { name: 'Products', item: '/products' },
      { name: sahCategory.name, item: `/products/${sahCategory.slug}` },
    ]);

    /*
     * Quick answer: 40-60 words, factual, answer-first. Placed above the fold
     * so an answer engine can lift it, and so a buyer who landed here from a
     * search gets the gist without scrolling.
     */
    const quickAnswer = `${sahCategory.name} covers ${categoryProducts.length} items in the Salasar catalogue, coded ${sahCategory.codePrefix}. ${sahCategory.description} All of it is stocked at our counter in Bhaisthan, Raipur, and sold to trade and to single-project buyers alike.`;

    return (
      <div className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-white min-h-screen">
        <JsonLd schema={faqSchema} />
        <JsonLd schema={breadcrumbSchema} />

        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 border-b border-slate-200 space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-[#64748B]">
            <Link href="/" className="hover:text-[#0B1F3A]">Home</Link>
            <span className="mx-1.5" aria-hidden="true">/</span>
            <Link href="/products" className="hover:text-[#0B1F3A]">Products</Link>
            <span className="mx-1.5" aria-hidden="true">/</span>
            <span className="text-[#0B1F3A] font-semibold">{sahCategory.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-[#8A6408] uppercase tracking-widest">
              Hardware category
            </span>
            <span className="text-xs font-mono bg-[#0B1F3A] text-[#D4AF37] px-2 py-0.5 rounded font-bold">
              {sahCategory.codePrefix}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            {sahCategory.name} in Raipur, Chhattisgarh
          </h1>

          <div className="max-w-3xl p-5 bg-white border-l-4 border-[#B8860B] border-y border-r border-[#E2E8F0] rounded-r-xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8A6408] mb-2">
              Quick answer
            </h2>
            <p className="text-base text-[#1E293B] leading-relaxed">{quickAnswer}</p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5 pt-1 w-full sm:w-auto">
            <a
              href={TEL_HREF}
              data-analytics="click_call"
              data-analytics-location={`category-${sahCategory.slug}`}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-11 px-2.5 sm:px-5 bg-[#8A6408] hover:bg-[#6F5006] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-center truncate"
            >
              <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{BUSINESS.phones.primary.display}</span>
            </a>
            <a
              href={whatsappLink({
                message: `Hello Salasar, I am looking for ${sahCategory.name.toLowerCase()}.`,
                source: `/products/${sahCategory.slug}`,
                campaign: 'category',
              })}
              data-analytics="click_whatsapp"
              data-analytics-location={`category-${sahCategory.slug}`}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-11 px-2.5 sm:px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-2xs text-center truncate"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">
                <span className="sm:hidden">WhatsApp</span>
                <span className="hidden sm:inline">WhatsApp a photo of the part</span>
              </span>
            </a>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
          <section className="space-y-5">
            <h2 className="sr-only">{sahCategory.name} items</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {productsInCategory(sahCategory.slug).map((prod, i) => (
                <CatalogueCard key={prod.sku} product={prod} priority={i === 0} />
              ))}
            </div>
          </section>

          <section className="space-y-5 pt-4 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              {sahCategory.name} — common questions
            </h2>
            <FaqList faqs={categoryFaqs} />
          </section>

          <nav aria-label="Other categories" className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-[#0B1F3A]">Other hardware categories</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 list-none p-0">
              {SAH_CATEGORIES.filter((c) => c.slug !== sahCategory.slug).map((c) => (
                <li key={c.slug} className="h-full">
                  <Link
                    href={`/products/${c.slug}`}
                    className="flex items-center min-h-11 h-full px-3 sm:px-4 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm font-semibold text-[#0B1F3A] hover:border-[#0B1F3A] transition-colors"
                  >
                    <span className="truncate">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <TradeQuoteFormSection />
      </div>
    );
  }

  // 3. Check for Architectural Category (residential, commercial, industrial)
  const archCategory = ARCH_CATEGORIES.find((c) => c.slug === slug);
  if (archCategory) {
    const categoryProducts = PRODUCTS.filter((p) => p.category === archCategory.slug);

    const categoryFaqs = [
      {
        question: `What alloy grade is typically used for Salasar ${archCategory.name}?`,
        answer: `Our ${archCategory.name.toLowerCase()} range is primarily extruded using EN AW 6063-T6 architectural alloy or 6061-T6 high-tensile structural alloy depending on line load requirements.`,
      },
      {
        question: `Can I request custom anodizing or powder coating colors for ${archCategory.name}?`,
        answer: `Yes. We provide 15–20 Micron Anodizing in Satin Silver, Bronze, and Champagne, as well as Qualicoat Class 2 Architectural Powder Coating in any custom RAL shade.`,
      },
    ];

    const faqSchema = getFaqSchema(categoryFaqs);
    const breadcrumbSchema = getBreadcrumbSchema([
      { name: 'Home', item: '/' },
      { name: 'Products', item: '/products' },
      { name: archCategory.name, item: `/products/${archCategory.slug}` },
    ]);

    return (
      <div className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-white min-h-screen">
        <JsonLd schema={faqSchema} />
        <JsonLd schema={breadcrumbSchema} />

        {/* Category Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 border-b border-slate-200">
          <Link
            href="/products"
            className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-[#22262A] mb-4 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Product Categories</span>
          </Link>

          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-semibold text-[#B08D57] uppercase tracking-widest">
              Category Showcase
            </span>
            <h1 className="text-4xl font-serif font-bold text-[#22262A]">{archCategory.name}</h1>
            <p className="text-gray-600 text-sm leading-relaxed">{archCategory.description}</p>
          </div>
        </div>

        {/* Product List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          {/* The cards below are <h3>; without this <h2> the outline jumped
              straight from the page <h1> to level 3. */}
          <h2 className="sr-only">{archCategory.name} products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {categoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {/* Category FAQ Section */}
          <div className="mt-8 sm:mt-20 pt-6 sm:pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-serif font-bold text-[#22262A] mb-6">
              Frequently Asked Questions — {archCategory.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryFaqs.map((faq, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
                  <h3 className="text-base font-serif font-bold text-[#22262A]">{faq.question}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not found
  notFound();
}
