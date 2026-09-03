'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SAH_CATEGORIES, FULL_CATALOGUE_PRODUCTS, SAHProduct } from '@/lib/sahData';
import { Shield, ChevronRight, Layers, FileText } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { QuickViewModal } from '@/components/product/QuickViewModal';

export default function ProductsPage() {
  const { openEnquiryModal } = useEnquiry();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<SAHProduct | null>(null);

  const filteredProducts = FULL_CATALOGUE_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.categorySlug === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.saCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Pure White Minimal Hero Header */}
      <div className="bg-white border-b border-[#E2E8F0] pt-6 pb-8 sm:pt-8 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider">
                  Official Trade Catalogue
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight">
                Full 86-SKU Product Range
              </h1>

              <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed">
                Direct wholesale supply of architectural aluminium extrusions & hardware fittings (SA-1 to SA-86) for fabricators and dealers.
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
                  className="w-full pl-10 pr-10 py-3 bg-[#F8FAFC] focus:bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#0B1F3A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0B1F3A] transition-all"
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

          {/* Clean Category Filter Pills */}
          <div className="pt-3 border-t border-[#E2E8F0]">
            <div className="flex items-center space-x-2 overflow-x-auto py-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
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
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.slug
                      ? 'bg-[#0B1F3A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:border-[#0B1F3A] hover:text-[#0B1F3A]'
                  }`}
                >
                  {cat.name} <span className="opacity-60 text-[10px]">({cat.codePrefix})</span>
                </button>
              ))}
            </div>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onEnquire={(saCode) => openEnquiryModal(saCode)}
      />
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
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0B1F3A]/40 transition-all flex flex-col justify-between group">
      <div>
        <div className="relative h-52 bg-white overflow-hidden border-b border-[#E2E8F0] flex items-center justify-center cursor-pointer" onClick={onQuickView}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          
          <div className="absolute top-3 left-3 bg-[#0B1F3A] text-[#D4AF37] text-[11px] font-mono font-bold px-2.5 py-1 rounded-md shadow-xs z-10 border border-[#D4AF37]/30">
            {product.saCode}
          </div>
        </div>

        <div className="p-4 space-y-2 cursor-pointer" onClick={onQuickView}>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0B1F3A] leading-tight line-clamp-1 group-hover:text-[#B8860B] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>

          {/* Variants / Finishes / Sizes Pills */}
          {(product.finishes || product.sizes || product.variants) && (
            <div className="pt-2 flex flex-wrap gap-1">
              {product.finishes?.map((f) => (
                <span key={f} className="text-[10px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B1F3A] font-semibold px-2 py-0.5 rounded-md">
                  {f}
                </span>
              ))}
              {product.sizes?.map((s) => (
                <span key={s} className="text-[10px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B1F3A] font-semibold px-2 py-0.5 rounded-md">
                  {s}
                </span>
              ))}
              {product.variants?.map((v) => (
                <span key={v} className="text-[10px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B1F3A] font-semibold px-2 py-0.5 rounded-md">
                  {v}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={onQuickView}
          className="py-2.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer"
        >
          View Info
        </button>

        <button
          onClick={onEnquire}
          className="py-2.5 bg-[#0B1F3A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center space-x-1 cursor-pointer shadow-2xs group/btn"
        >
          <span>Enquire</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
