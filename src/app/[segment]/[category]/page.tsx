'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { CATEGORIES, getProductsByCategory, Product, Finish } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { FaqAccordion } from '@/components/product/FaqAccordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';

interface CategoryPageProps {
  params: Promise<{
    segment: string;
    category: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const { segment, category } = resolvedParams;

  const categoryObj = CATEGORIES.find((c) => c.slug === category && c.segment === segment);

  if (!categoryObj) {
    notFound();
  }

  const allProducts = getProductsByCategory(category);

  // Filters State
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [selectedAlloy, setSelectedAlloy] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Unique alloys and finishes in this category for filters
  const finishes = Array.from(new Set(allProducts.map((p) => p.finish)));
  const alloys = Array.from(new Set(allProducts.map((p) => p.alloyGrade)));

  // Filter & Sort Logic
  const filteredProducts = allProducts
    .filter((p) => (selectedFinish === 'all' ? true : p.finish === selectedFinish))
    .filter((p) => (selectedAlloy === 'all' ? true : p.alloyGrade === selectedAlloy))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  // Category Level Direct-Answer FAQs for AI / SEO
  const categoryFaqs = [
    {
      question: `What alloy grades are best for ${categoryObj.label.toLowerCase()}?`,
      answer: `For ${categoryObj.label.toLowerCase()}, we recommend EN AW-6063 T6 for architectural decorative applications, and EN AW-6061 T6 for heavy structural or industrial load applications. Both alloys comply with BIS and CE specifications.`,
    },
    {
      question: `What is the standard delivery lead time for bulk trade orders of ${categoryObj.label.toLowerCase()}?`,
      answer: `Standard catalog items ship within 24–48 hours. Custom anodized or PVD-coated finishes require 5–7 working days for quality assurance and metrology validation.`,
    },
  ];

  const breadcrumbs = [
    { label: `${segment.toUpperCase()} SEGMENT`, href: `/${segment}` },
    { label: categoryObj.label },
  ];

  const faqSchema = generateFaqSchema(categoryFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://salasarhardware.com' },
    { name: segment, url: `https://salasarhardware.com/${segment}` },
    { name: categoryObj.label, url: `https://salasarhardware.com/${segment}/${category}` },
  ]);

  return (
    <div className="container-luxury py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#D8D1C4]">
        <span className="eyebrow">{segment} Hardware Series</span>
        <h1 className="font-serif text-4xl text-[#2B2620]">{categoryObj.label}</h1>
        <p className="text-sm text-[#2B2620]/75 max-w-2xl">
          Browse our architectural collection of {categoryObj.label.toLowerCase()}. Engineered for structural integrity, hand-finished for luxury aesthetics.
        </p>
      </div>

      {/* Main Filter Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Sidebar */}
        <aside className="lg:col-span-3 bg-[#FFFFFF] border border-[#D8D1C4] p-6 space-y-6 shadow-luxury sticky top-28">
          <div className="flex items-center justify-between border-b border-[#D8D1C4] pb-3">
            <h3 className="font-serif text-lg text-[#2B2620]">Filter & Refine</h3>
            <button
              onClick={() => {
                setSelectedFinish('all');
                setSelectedAlloy('all');
                setMaxPrice(100000);
              }}
              className="text-[10px] uppercase tracking-widest text-[#B08D57] underline hover:text-[#8B6D3F]"
            >
              Reset All
            </button>
          </div>

          {/* Finish Filter */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-[#2B2620]/80 font-medium block">
              Finish
            </label>
            <select
              value={selectedFinish}
              onChange={(e) => setSelectedFinish(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F0] border border-[#D8D1C4] text-xs text-[#2B2620] focus-ring"
            >
              <option value="all">All Finishes</option>
              {finishes.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Alloy Grade Filter */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-[#2B2620]/80 font-medium block">
              Alloy Grade
            </label>
            <select
              value={selectedAlloy}
              onChange={(e) => setSelectedAlloy(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F0] border border-[#D8D1C4] text-xs text-[#2B2620] focus-ring"
            >
              <option value="all">All Grades</option>
              {alloys.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-[#2B2620]/80 font-medium block">
              Sort Catalog By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F0] border border-[#D8D1C4] text-xs text-[#2B2620] focus-ring"
            >
              <option value="featured">Featured / Popular</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* Sorting Header */}
          <div className="flex items-center justify-between bg-[#FFFFFF] border border-[#D8D1C4] p-4 text-xs text-[#2B2620]/80">
            <span>Showing {filteredProducts.length} of {allProducts.length} Specifications</span>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#FFFFFF] border border-[#D8D1C4] p-12 text-center space-y-4">
              <p className="font-serif text-lg text-[#2B2620]">No hardware matching your filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedFinish('all');
                  setSelectedAlloy('all');
                  setMaxPrice(100000);
                }}
                className="text-xs uppercase tracking-widest text-[#B08D57] font-medium underline"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* AI / Direct-Answer Category FAQ Block */}
          <div className="pt-10 border-t border-[#D8D1C4]">
            <FaqAccordion
              faqs={categoryFaqs}
              title={`Category Direct-Answer Knowledge (${categoryObj.label})`}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
