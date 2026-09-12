'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SAH_CATEGORIES, FULL_CATALOGUE_PRODUCTS, SAHProduct } from '@/lib/sahData';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import FAQSection from '@/components/FAQSection';


import { useSearchParams } from 'next/navigation';

export default function ProductsClient() {
  const { openEnquiryModal } = useEnquiry();
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<SAHProduct | null>(null);

  React.useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
      const catElement = document.getElementById(cat);
      if (catElement) {
        catElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  React.useEffect(() => {
    const handlePopState = () => {
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2 && pathParts[0] === 'products') {
        const slug = pathParts[1];
        const match = FULL_CATALOGUE_PRODUCTS.find((p) => {
          const nameSlug = p.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          const saCodeSlug = p.saCode.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return `${nameSlug}-${saCodeSlug}` === slug || p.saCode.toLowerCase() === slug;
        });
        setQuickViewProduct(match || null);
      } else {
        setQuickViewProduct(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    if (quickViewProduct) {
      const nameSlug = quickViewProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const saCodeSlug = quickViewProduct.saCode.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const targetUrl = `/products/${nameSlug}-${saCodeSlug}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ quickView: true }, '', targetUrl);
      }
    } else if (selectedCategory !== 'all') {
      const targetUrl = `/products?category=${selectedCategory}`;
      if (window.location.search !== `?category=${selectedCategory}`) {
        window.history.pushState(null, '', targetUrl);
      }
    } else {
      if (window.location.pathname !== '/products') {
        window.history.pushState(null, '', '/products');
      }
    }
  }, [quickViewProduct, selectedCategory]);

  const filteredProducts = FULL_CATALOGUE_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.categorySlug === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.saCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-white">
      {/* Pure White Minimal Hero Header */}
      <div className="bg-white border-b border-[#E2E8F0] pt-4 pb-6 sm:pt-8 sm:pb-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5 sm:space-y-7">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#B8860B]" />
                <span className="text-[10px] sm:text-xs font-bold text-[#B8860B] uppercase tracking-wider">
                  Official Trade Catalogue
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-tight">
                Wholesale Aluminium Hardware Catalogue
              </h1>

              <p className="text-xs sm:text-base text-[#475569] font-medium leading-relaxed">
                Every product in our catalogue is assigned a fixed SA product code, so dealers and fabricators can order precisely — no ambiguity. Browse by category below, or contact our trade desk for instant wholesale pricing.
              </p>

            </div>

            {/* Pure White Search Bar with Search Icon */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="relative">
                <svg className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search SKU code or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-[#F8FAFC] focus:bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0B1F3A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0B1F3A] transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#94A3B8] hover:text-[#0B1F3A]"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Clean Category Filter Pills with Left/Right Arrow Buttons */}
          <div className="pt-3 border-t border-[#E2E8F0] relative flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                const nav = document.getElementById('category-pills-nav');
                if (nav) nav.scrollBy({ left: -250, behavior: 'smooth' });
              }}
              aria-label="Scroll left"
              className="hidden sm:flex p-2 rounded-xl bg-white border border-[#E2E8F0] text-[#0B1F3A] hover:bg-[#F8FAFC] hover:border-[#0B1F3A] transition-all shadow-xs shrink-0 cursor-pointer items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              id="category-pills-nav"
              className="flex items-center space-x-2 overflow-x-auto py-1 scrollbar-none scroll-smooth flex-1"
            >
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#0B1F3A] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:border-[#0B1F3A] hover:text-[#0B1F3A]'
                }`}
              >
                All Products (86 SKUs)
              </button>
              {SAH_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.slug
                      ? 'bg-[#0B1F3A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:border-[#0B1F3A] hover:text-[#0B1F3A]'
                  }`}
                >
                  {cat.name} <span className="opacity-60 text-[9.5px] sm:text-[10px]">({cat.codePrefix})</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                const nav = document.getElementById('category-pills-nav');
                if (nav) nav.scrollBy({ left: 250, behavior: 'smooth' });
              }}
              aria-label="Scroll right"
              className="hidden sm:flex p-2 rounded-xl bg-white border border-[#E2E8F0] text-[#0B1F3A] hover:bg-[#F8FAFC] hover:border-[#0B1F3A] transition-all shadow-xs shrink-0 cursor-pointer items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Category Anchors & Product Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedCategory === 'all' && !searchQuery && (
          <div className="mb-12 space-y-14">
            {SAH_CATEGORIES.map((cat) => {
              const catProducts = FULL_CATALOGUE_PRODUCTS.filter((p) => p.categorySlug === cat.slug);
              return (
                <div key={cat.slug} id={cat.slug} className="scroll-mt-32">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] mb-8 gap-2">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
                          {cat.name}
                        </h2>
                        <span className="text-xs font-mono font-bold bg-[#F8FAFC] px-2.5 py-1 rounded-md text-[#B8860B] border border-[#E2E8F0]">
                          {cat.codePrefix}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">{cat.description}</p>
                    </div>
                    <span className="text-xs font-bold text-[#0B1F3A] bg-[#F8FAFC] px-3 py-1.5 rounded-full border border-[#E2E8F0] self-start sm:self-auto shrink-0">
                      {catProducts.length} Items
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {catProducts.map((prod) => (
                      <ProductCard 
                        key={prod.id} 
                        product={prod} 
                        onQuickView={() => setQuickViewProduct(prod)}
                        onEnquire={() => openEnquiryModal(prod.saCode)} 
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {(selectedCategory !== 'all' || searchQuery) && (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-8">
              <span className="text-sm font-extrabold text-[#0B1F3A]">
                Showing {filteredProducts.length} Matching Products
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-[#B8860B] hover:underline"
                >
                  Clear Search
                </button>
              )}
            </div>
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center text-[#475569] space-y-3 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                <p className="text-base font-bold text-[#0B1F3A]">No products found matching &quot;{searchQuery}&quot;</p>
                <p className="text-xs">Try searching for code like &quot;SA-33&quot; or &quot;Door Kit&quot;.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="px-4 py-2 bg-[#0B1F3A] text-white text-xs font-bold rounded-xl mt-2 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard 
                    key={prod.id} 
                    product={prod} 
                    onQuickView={() => setQuickViewProduct(prod)}
                    onEnquire={() => openEnquiryModal(prod.saCode)} 
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Products Page FAQ Section */}
      <FAQSection
        title="Frequently asked questions about our product catalogue."
        faqs={[
          {
            question: 'What do the SA product codes mean?',
            answer: 'Each product in our catalogue has a fixed SA code (e.g. SA-33 for our Aluminium Door Kit) so trade buyers can order exact specifications without confusion — quote your SA code when contacting our trade desk for instant pricing.',
            category: 'Catalogue',
          },
          {
            question: 'Is there a minimum order quantity (MOQ) for wholesale pricing?',
            answer: 'We supply dealers, fabricators, and contractors with flexible order quantities — ranging from standard box packs (10–50 pieces) to full wholesale crates. Request a quote with your required quantity for exact trade pricing.',
            category: 'Pricing',
          },
          {
            question: 'Can I get custom lengths or finishes not listed in the catalogue?',
            answer: 'Yes — we support custom trade orders including tailored extrusion lengths and project-specific hardware configurations. Contact our trade desk with your requirements.',
            category: 'Customization',
          },
          {
            question: 'Where can I inspect physical samples in Raipur?',
            answer: 'Visit our Finetek branch or main showroom in Bhaisthan, Raipur. Complete physical hardware catalogues, finish swatches, and extrusion cut samples are available on-site.',
            category: 'Showroom',
          },
        ]}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onEnquire={(code) => {
            setQuickViewProduct(null);
            openEnquiryModal(code);
          }}
        />
      )}
    </div>
  );
}

function ProductCard({ 
  product, 
  onQuickView, 
  onEnquire 
}: { 
  product: SAHProduct; 
  onQuickView: () => void; 
  onEnquire: () => void; 
}) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0B1F3A]/40 transition-all flex flex-col justify-between group">
      <div>
        <div className="relative h-36 sm:h-64 bg-white overflow-hidden border-b border-[#E2E8F0] flex items-center justify-center cursor-pointer" onClick={onQuickView}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 240px"
            loading="lazy"
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 p-2"
          />
          
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#0B1F3A] text-[#D4AF37] text-[9px] sm:text-[11px] font-mono font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-xs z-10 border border-[#D4AF37]/30">
            {product.saCode}
          </div>
        </div>

        <div className="p-2.5 sm:p-4 space-y-1 sm:space-y-2 cursor-pointer" onClick={onQuickView}>
          <h3 className="text-xs sm:text-base font-extrabold text-[#0B1F3A] leading-tight line-clamp-1 group-hover:text-[#B8860B] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed hidden sm:block">
            {product.shortDesc}
          </p>
        </div>
      </div>

      <div className="p-2.5 sm:p-4 pt-0 grid grid-cols-2 gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={onQuickView}
          className="py-1.5 sm:py-2.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] active:scale-95 border border-[#E2E8F0] text-[#0B1F3A] text-[10.5px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer select-none"
        >
          <span className="hidden sm:inline">View </span>Info
        </button>

        <button
          type="button"
          onClick={onEnquire}
          className="py-1.5 sm:py-2.5 bg-[#0B1F3A] hover:bg-[#1E293B] active:bg-[#020617] active:scale-95 text-white text-[10.5px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center space-x-1 cursor-pointer shadow-2xs group/btn select-none"
        >
          <span>Enquire</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
