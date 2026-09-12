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
import { ArrowLeft, Layers, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';

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
    const p = productMatch.product;
    return {
      title: `${p.name} (${p.sku})`,
      description: `${p.shortDescription} Wholesale trade supply in Raipur, Chhattisgarh.`,
      alternates: {
        canonical: `/product/${productMatch.canonicalSlug}`,
      },
    };
  }

  // 2. Check categories
  const categoryMatch = findCategoryBySlug(slug);
  if (!categoryMatch) return {};

  const rawTitle = `${categoryMatch.name} Hardware & Fittings`;
  const title = rawTitle.length > 55 ? `${rawTitle.substring(0, 52)}...` : rawTitle;
  const rawDesc = `${categoryMatch.description} Direct wholesale trade supply, same-day dispatch in Raipur, Chhattisgarh.`;
  const description = rawDesc.length > 158 ? `${rawDesc.substring(0, 155)}...` : rawDesc;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${categoryMatch.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.salasaraluminium.shop/products/${categoryMatch.slug}`,
      siteName: 'Salasar Aluminium & Hardware',
    },
  };
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

    const categoryFaqs = [
      {
        question: `What hardware items are included in the Salasar ${sahCategory.name} category?`,
        answer: `Our ${sahCategory.name} range includes items coded ${sahCategory.codePrefix}. All items are manufactured to high commercial architectural standards for high cycle life and smooth operation.`,
      },
      {
        question: `Can I get wholesale crate pricing for ${sahCategory.name} in Raipur?`,
        answer: `Yes. We provide direct factory trade pricing for fabricators, interior contractors, and dealers with same-day dispatch from our central warehouse in Raipur, Chhattisgarh.`,
      },
      {
        question: `Are custom finishes or bulk pack sizes available?`,
        answer: `Yes. Standard box packs and custom bulk crate deliveries are available across Central India. Contact our trade desk via WhatsApp for instant bulk quotations.`,
      },
    ];

    const faqSchema = getFaqSchema(categoryFaqs);
    const breadcrumbSchema = getBreadcrumbSchema([
      { name: 'Home', item: '/' },
      { name: 'Products', item: '/products' },
      { name: sahCategory.name, item: `/products/${sahCategory.slug}` },
    ]);

    return (
      <div className="pt-28 pb-20 bg-[#FAF9F6] min-h-screen">
        <JsonLd schema={faqSchema} />
        <JsonLd schema={breadcrumbSchema} />

        {/* Category Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#E5E3DC]">
          <Link
            href="/products"
            className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-[#22262A] mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Product Categories</span>
          </Link>

          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#B08D57] uppercase tracking-widest">
                Trade Hardware Category
              </span>
              <span className="text-xs font-mono bg-[#22262A] text-[#B08D57] px-2 py-0.5 rounded font-bold">
                {sahCategory.codePrefix}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#22262A]">
              {sahCategory.name}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">{sahCategory.description}</p>
          </div>
        </div>

        {/* Product List Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {categoryProducts.map((prod) => {
              const canonicalSlug = getSAHProductSlug(prod);
              return (
                <div
                  key={prod.id}
                  className="bg-white border border-[#E2E8F0] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0B1F3A]/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <Link
                      href={`/product/${canonicalSlug}`}
                      className="relative h-36 sm:h-60 bg-white overflow-hidden border-b border-[#E2E8F0] flex items-center justify-center block"
                    >
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        width={300}
                        height={300}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                        loading="lazy"
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 p-2 sm:p-3"
                      />
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#0B1F3A] text-[#D4AF37] text-[9.5px] sm:text-[11px] font-mono font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-md shadow-xs z-10 border border-[#D4AF37]/30">
                        {prod.saCode}
                      </div>
                    </Link>

                    <div className="p-2.5 sm:p-4 space-y-1.5 sm:space-y-2">
                      <Link href={`/product/${canonicalSlug}`}>
                        <h3 className="text-xs sm:text-base font-extrabold text-[#0B1F3A] leading-tight line-clamp-1 group-hover:text-[#B8860B] transition-colors">
                          {prod.name}
                        </h3>
                      </Link>
                      <p className="text-[11px] sm:text-xs text-[#475569] line-clamp-1 sm:line-clamp-2 leading-relaxed">
                        {prod.shortDesc}
                      </p>
                      {prod.finishes && prod.finishes.length > 0 && (
                        <div className="pt-0.5 sm:pt-1 text-[10px] sm:text-[11px] text-[#64748B] flex items-center gap-1">
                          <span className="font-semibold text-[#0B1F3A]">Finishes:</span>
                          <span className="truncate">{prod.finishes.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-4 pt-0">
                    <Link
                      href={`/product/${canonicalSlug}`}
                      className="w-full py-2 sm:py-2.5 bg-[#0B1F3A] hover:bg-[#1E293B] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center space-x-1 shadow-2xs group/btn"
                    >
                      <span>View Specs<span className="hidden sm:inline">ifications</span></span>
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category FAQ Section */}
          <div className="mt-20 pt-12 border-t border-[#E5E3DC]">
            <h2 className="text-2xl font-serif font-bold text-[#22262A] mb-6">
              Frequently Asked Questions — {sahCategory.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryFaqs.map((faq, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-[#E5E3DC] space-y-2">
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
      <div className="pt-28 pb-20 bg-[#FAF9F6] min-h-screen">
        <JsonLd schema={faqSchema} />
        <JsonLd schema={breadcrumbSchema} />

        {/* Category Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#E5E3DC]">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {categoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {/* Category FAQ Section */}
          <div className="mt-20 pt-12 border-t border-[#E5E3DC]">
            <h2 className="text-2xl font-serif font-bold text-[#22262A] mb-6">
              Frequently Asked Questions — {archCategory.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryFaqs.map((faq, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-[#E5E3DC] space-y-2">
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
