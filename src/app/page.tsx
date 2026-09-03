'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import { SAH_CATEGORIES, FULL_CATALOGUE_PRODUCTS } from '@/lib/sahData';
import { ArrowRight, Layers, Award, Sparkles, Building2, BookOpen, ChevronRight, ShieldCheck, MapPin, PhoneCall } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

export default function Home() {
  const { openEnquiryModal } = useEnquiry();

  // Featured selection across key categories
  const featuredProducts = FULL_CATALOGUE_PRODUCTS.filter((p) =>
    ['SA-33', 'SA-11', 'SA-35', 'SA-42', 'SA-76', 'SA-81'].includes(p.saCode)
  );

  return (
    <div className="space-y-0 bg-white">
      {/* Hero Banner */}
      <Hero />

      {/* Trust & Company Metrics Bar */}
      <TrustBar />

      {/* Category Overview Grid (12 Categories) */}
      {/* 12 Specialized Hardware Categories Section */}
      <section className="py-20 bg-slate-50/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">
              Standardized Product Range
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
              12 Specialized Hardware Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Complete 86-SKU wholesale lineup covering architectural extrusions, sliding channels, locks, hinges & door kits.
            </p>
          </div>

          {/* Categories Grid (Top 4 Featured on Home) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAH_CATEGORIES.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/products#${cat.slug}`}
                className="bg-white border border-slate-300 rounded-xl overflow-hidden hover:border-[#0B1F3A] transition-colors duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Category Image Header */}
                  <div className="relative h-44 overflow-hidden bg-slate-100/60 border-b border-slate-200">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* SKU Code Pill */}
                    <div className="absolute top-3 left-3 bg-[#0B1F3A] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                      {cat.codePrefix}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-[#0B1F3A] group-hover:text-[#9A7B1C] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="px-5 pb-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 text-xs font-bold text-[#0B1F3A] group-hover:text-[#9A7B1C] flex items-center justify-between transition-colors">
                    <span>Explore Products</span>
                    <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0B1F3A] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Categories Button */}
          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 px-7 py-3 bg-[#0B1F3A] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#1E293B] transition-all group"
            >
              <span>View All 12 Categories</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Hardware Showcase */}
      <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0 pb-6 border-b border-[#E2E8F0]">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">
                High Demand Trade Items
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
                Featured Catalogue SKUs
              </h2>
            </div>
            
            <Link
              href="/products"
              className="text-xs font-bold text-[#0B1F3A] hover:text-[#9A7B1C] uppercase tracking-wider flex items-center space-x-1.5 transition-colors group"
            >
              <span>View All 86 Products</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-white rounded-xl overflow-hidden hover:border-slate-200 transition-colors duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* SKU Product Image */}
                  <div className="relative h-44 overflow-hidden bg-[#F8FAFC] border-b border-slate-100">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B1F3A] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                      {prod.saCode}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-semibold text-[#8C6B1B] uppercase tracking-wider block">
                      {prod.categoryName}
                    </span>

                    <h3 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#9A7B1C] transition-colors leading-snug">
                      {prod.name}
                    </h3>

                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                      {prod.shortDesc}
                    </p>

                    {/* Finishes Pills */}
                    {prod.finishes && (
                      <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
                        {prod.finishes.map((f) => (
                          <span
                            key={f}
                            className="text-[10px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] px-2.5 py-0.5 rounded font-medium"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Enquire Button */}
                <div className="px-5 pb-5 pt-0">
                  <div className="pt-3 border-t border-[#F1F5F9]">
                    <button
                      type="button"
                      onClick={() => openEnquiryModal(prod.saCode)}
                      className="w-full py-2.5 bg-[#0B1F3A] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#1E293B] active:scale-95 transition-all cursor-pointer"
                    >
                      Enquire Item {prod.saCode}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* B2B Wholesale & Trade Advantage Section */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Context & Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
                  Direct Manufacturer Advantage
                </span>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1F3A] tracking-tight mt-1.5 leading-snug">
                  Wholesale Manufacturing & Bulk Trade Distribution
                </h2>
              </div>

              <p className="text-sm text-[#475569] leading-relaxed">
                Empowering fabricators, contractors, and hardware dealers across Chhattisgarh with direct factory-grade architectural aluminium profiles and 86+ standardized trade SKUs.
              </p>

              {/* Trade Key Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1 hover:border-[#0B1F3A] transition-colors">
                  <div className="text-xs font-semibold text-[#0B1F3A] flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                    <span>Factory Direct Rates</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Bulk trade rates from our Finetek branch in Raipur.
                  </p>
                </div>

                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1 hover:border-[#0B1F3A] transition-colors">
                  <div className="text-xs font-semibold text-[#0B1F3A] flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                    <span>Raipur Bulk Stocking</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Same-day regional dispatch from our Bhaisthan & Lieon Marketing hubs.
                  </p>
                </div>

                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1 hover:border-[#0B1F3A] transition-colors">
                  <div className="text-xs font-semibold text-[#0B1F3A] flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                    <span>Multi-Finish Extrusions</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Anodized, powder-coated black, brown & CP finishes across categories.
                  </p>
                </div>

                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1 hover:border-[#0B1F3A] transition-colors">
                  <div className="text-xs font-semibold text-[#0B1F3A] flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                    <span>Custom Trade Orders</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Tailored SKU length cuts & project quote support for sites.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openEnquiryModal()}
                  className="px-5 py-2.5 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E293B] active:scale-95 transition-all shadow-2xs inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>Request Trade Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>

                <Link
                  href="/about"
                  className="px-5 py-2.5 bg-white border border-[#E2E8F0] text-[#0B1F3A] hover:bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wider rounded-lg transition-all inline-flex items-center space-x-1"
                >
                  <span>Company Profile</span>
                </Link>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-6">
              <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-xs border border-[#E2E8F0] bg-[#0F172A] p-4 flex items-center justify-center">
                <Image
                  src="/salasar-store-main.png"
                  alt="Salasar Aluminium & Hardware Storefront & Stock Hub"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-2 rounded-xl"
                />
                
                {/* Floating Stats Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#0B1F3A] text-white p-5 rounded-xl flex items-center justify-between shadow-md">
                  <div>
                    <div className="text-lg font-bold text-[#D4AF37]">Finetek</div>
                    <div className="text-xs text-slate-300 font-medium">Branch • Raipur</div>
                  </div>
                  <div className="h-8 w-px bg-slate-700" />
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">86+ SKUs</div>
                    <div className="text-xs text-slate-300 font-medium">Ready Raipur Stock</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trade Enquiry Form Section */}
      <TradeQuoteFormSection />
    </div>
  );
}
