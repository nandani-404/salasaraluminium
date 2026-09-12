'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Factory, Building2, Truck, ShieldCheck, PhoneCall, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_BUSINESS_DETAILS, SAH_CATEGORIES } from '@/lib/sahData';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import FAQSection from '@/components/FAQSection';


export default function WholesaleClient() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-slate-950 text-white py-8 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-full text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            <span>Direct B2B Trade Supply Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl">
            Aluminium Hardware Wholesale Dealer & Supplier in Raipur
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium leading-relaxed">
            Direct wholesale prices for hardware dealers, aluminium fabricators, glass contractors, and retail shops across Chhattisgarh & Central India. Bulk orders, factory rates, zero retail markup.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => openEnquiryModal()}
              className="px-6 py-3.5 bg-[#B8860B] hover:bg-[#D4AF37] text-[#0B1F3A] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
            >
              Request Wholesale Price List
            </button>
            <a
              href="tel:8007443071"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
              <span>Call Abhishek: +91 8007443071</span>
            </a>
          </div>
        </div>
      </div>

      {/* Wholesale Trade Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-8 mb-8 sm:mb-16">
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center font-bold">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A]">Finetek Extrusions</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Extruded architectural sections and customized industrial T-slot profiles produced under strict ISO tolerance standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A]">Lieon Marketing Hub</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Central Bhaisthan warehouse carrying ready stock of 86 standardized hardware SKUs for instant trade dispatch.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A]">Same-Day Dispatch</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Daily transport dispatch to Bhilai, Durg, Bilaspur, Korba, Rajnandgaon, and all major Chhattisgarh trade hubs.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <h2 className="text-2xl font-bold text-[#0B1F3A]">Wholesale Hardware Categories</h2>
            <p className="text-xs text-[#475569]">Bulk box packaging & dealer rates available on all 12 product categories.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {SAH_CATEGORIES.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/products?category=${cat.slug}`}
                className="p-3 sm:p-4 rounded-xl border border-[#E2E8F0] hover:border-[#0B1F3A] bg-white hover:bg-[#F8FAFC] shadow-2xs hover:shadow-md transition-all space-y-1.5 sm:space-y-2 group cursor-pointer block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[#B8860B]">{cat.codePrefix}</span>
                  <span className="text-[9px] sm:text-[10px] bg-[#F8FAFC] group-hover:bg-white px-1.5 sm:px-2 py-0.5 rounded border border-[#E2E8F0] text-[#0B1F3A] font-bold">
                    <span className="hidden sm:inline">View Category →</span>
                    <span className="sm:hidden">View →</span>
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#0B1F3A] group-hover:text-[#B8860B] transition-colors leading-tight line-clamp-1">{cat.name}</h3>
                <p className="text-[10px] sm:text-[11px] text-[#475569] line-clamp-2 leading-relaxed">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <TradeQuoteFormSection />

      {/* Wholesale Page FAQ Block */}
      <FAQSection
        title="Frequently asked questions about wholesale trade orders."
        faqs={[
          {
            question: 'How do I place a wholesale order or get a trade quote?',
            answer: 'Submit an enquiry through our website\'s "Request Trade Quote" form, or call/WhatsApp our sales director Abhishek directly at +91 8007443071 / +91 9079332560 for instant wholesale pricing and order placement.',
            category: 'Orders & Quotes',
          },
          {
            question: 'Do you supply outside Chhattisgarh?',
            answer: 'Yes — we supply Pan-India for bulk trade orders, in addition to same-day regional dispatch within Chhattisgarh.',
            category: 'Logistics',
          },
          {
            question: 'What quantity qualifies for wholesale/bulk pricing?',
            answer: 'Our quote form supports order sizes from 10 boxes up to 100+ boxes / full bulk orders — request a quote with your required quantity for exact trade pricing.',
            category: 'Pricing',
          },
        ]}
      />
    </div>
  );
}

