'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Boxes, 
  ShieldCheck, 
  FileText, 
  PackageCheck, 
  Headphones, 
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

// Benefit Cards Data
export const mainBenefits = [
  {
    id: '01',
    title: 'Aluminium & Hardware Under One Roof',
    description: 'Source aluminium profiles, architectural hardware and related products from a single supplier for easier procurement.',
    icon: Layers,
    link: '/products',
    linkText: 'Explore Aluminium & Hardware'
  },
  {
    id: '02',
    title: 'Built for Business Requirements',
    description: 'We support wholesale, bulk and project-based requirements for contractors, fabricators, dealers and businesses.',
    icon: Boxes,
    link: '/request-a-quote',
    linkText: 'Wholesale & Bulk Supply'
  },
  {
    id: '03',
    title: 'Products for Professional Applications',
    description: 'We focus on reliable products suitable for fabrication, construction, interiors and architectural applications.',
    icon: ShieldCheck,
    link: '/products',
    linkText: 'Professional Quality'
  },
  {
    id: '04',
    title: 'Support for Project Requirements',
    description: 'Share your product specifications, quantities and application requirements with our team to identify suitable products.',
    icon: FileText,
    link: '/request-a-quote',
    linkText: 'Project Specifications'
  },
  {
    id: '05',
    title: 'Dependable Procurement Support',
    description: 'Simplify recurring and bulk purchasing with organized product sourcing and quotation support.',
    icon: PackageCheck,
    link: '/request-a-quote',
    linkText: 'Procurement Sourcing'
  },
  {
    id: '06',
    title: 'Direct Assistance When You Need It',
    description: 'Get assistance with product selection, specifications, availability and quotation requirements.',
    icon: Headphones,
    link: '/contact',
    linkText: 'Responsive Support'
  },
];

// Factual Proof / Facts Data
export const factsData = [
  {
    label: 'PRODUCT RANGE',
    value: 'Aluminium + Hardware',
    subtext: 'Comprehensive catalog'
  },
  {
    label: 'SUPPLY MODEL',
    value: 'Wholesale & Bulk',
    subtext: 'B2B order fulfillment'
  },
  {
    label: 'CUSTOMER TYPES',
    value: 'Fabricators • Contractors • Dealers',
    subtext: 'Serving trade professionals'
  },
  {
    label: 'APPLICATIONS',
    value: 'Construction • Interiors • Architecture',
    subtext: 'Built for performance'
  },
  {
    label: 'QUOTE SUPPORT',
    value: 'Project & Bulk Requirements',
    subtext: 'Custom itemized pricing'
  },
];

// 4-Step Procurement Process Data
export const processSteps = [
  {
    step: '01',
    title: 'SHARE YOUR REQUIREMENT',
    description: 'Tell us the product, quantity, specifications and application.',
  },
  {
    step: '02',
    title: 'PRODUCT & QUOTE',
    description: 'Our team reviews your requirement and provides suitable product and quotation information.',
  },
  {
    step: '03',
    title: 'CONFIRM YOUR ORDER',
    description: 'Finalize the required products, quantities and delivery details.',
  },
  {
    step: '04',
    title: 'SUPPLY',
    description: 'We process the order according to the agreed requirements.',
  },
];

interface WhyChooseUsSectionProps {
  showCta?: boolean;
}

export default function WhyChooseUsSection({ showCta = true }: WhyChooseUsSectionProps) {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section className="bg-white py-10 sm:py-16 md:py-24 text-slate-900 border-b border-slate-100 overflow-hidden" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================== */}
        {/* SECTION HEADER                                     */}
        {/* ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0B1F3A] tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
            WHY CHOOSE US
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight mb-4 leading-tight">
            Why Fabricators in Chhattisgarh Buy From <span className="text-[#0B1F3A] underline decoration-[#B8860B]/50 underline-offset-8">Salasar</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#475569] leading-relaxed font-normal">
            We make aluminium and hardware procurement simpler for fabricators, contractors, dealers and project buyers through a broad product range, wholesale supply and responsive project support.
          </p>
        </div>

        {/* ================================================== */}
        {/* MAIN BENEFITS (2-cols on mobile, 3x2 on desktop)   */}
        {/* ================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-12 sm:mb-20">
          {mainBenefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={benefit.id}
                className="group relative bg-white border border-slate-200/95 rounded-xl p-3.5 sm:p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#B8860B]/40 shadow-2xs"
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-3 sm:mb-6">
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#B8860B] bg-[#B8860B]/10 border border-[#B8860B]/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md font-mono">
                      {benefit.id}
                    </span>
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#0B1F3A] transition-colors duration-300 group-hover:bg-[#0B1F3A] group-hover:text-white group-hover:border-[#0B1F3A]">
                      <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xs sm:text-lg md:text-xl font-bold text-[#0B1F3A] mb-1.5 sm:mb-3 group-hover:text-[#0B1F3A] transition-colors leading-snug line-clamp-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#475569] text-[10px] sm:text-xs sm:text-sm leading-relaxed mb-3 sm:mb-6 font-normal line-clamp-3 sm:line-clamp-none">
                    {benefit.description}
                  </p>
                </div>

                {/* Subtle Visual Indicator / Internal Link */}
                <div className="pt-2 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs font-semibold text-[#64748B] group-hover:text-[#0B1F3A] transition-colors">
                  <span className="truncate">{benefit.linkText}</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B8860B] transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ================================================== */}
        {/* PROOF / FACTS STRIP ("WHAT SETS US APART")        */}
        {/* ================================================== */}
        <div className="mb-14 sm:mb-24">
          <div className="bg-[#0B1F3A] rounded-2xl p-5 sm:p-6 md:p-10 text-white shadow-xl shadow-slate-900/10 border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 sm:pb-8 mb-5 sm:mb-8 border-b border-slate-700/80 gap-2 sm:gap-4">
              <div>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#B8860B] uppercase block mb-1">
                  FACTUAL OVERVIEW
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                  WHAT SETS US APART
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 max-w-md font-normal">
                Direct, transparent business parameters structured for quick B2B evaluation and reliable sourcing.
              </p>
            </div>

            {/* 5 Compact Factual Items */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 lg:gap-4 divide-y-0">
              {factsData.map((fact, idx) => (
                <div key={idx} className="p-2 sm:px-2 first:px-0">
                  <div className="text-[10px] sm:text-[11px] font-bold text-[#B8860B] tracking-wider uppercase mb-0.5 sm:mb-1">
                    {fact.label}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5 sm:mb-1 leading-snug truncate">
                    {fact.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-normal truncate">
                    {fact.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* HOW WE WORK (4-Step Process)                       */}
        {/* ================================================== */}
        <div className="mb-12 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <span className="text-xs font-bold tracking-widest text-[#B8860B] uppercase block mb-1.5 sm:mb-2">
              HOW WE WORK
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1F3A] tracking-tight mb-2 sm:mb-3">
              Simple Procurement. Clear Communication.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#475569] leading-relaxed">
              From your initial requirement to final supply, we keep the procurement process straightforward and focused on your project needs.
            </p>
          </div>

          {/* 4-Step Process Grid (2-cols on mobile, 4-cols on desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 relative">
            {processSteps.map((step, idx) => (
              <div key={step.step} className="relative bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 sm:p-6 lg:p-7 flex flex-col justify-between">
                {/* Step Number & Connector */}
                <div className="flex items-center justify-between mb-3 sm:mb-5">
                  <span className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#0B1F3A] text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-md">
                    {step.step}
                  </span>
                  {idx < processSteps.length - 1 && (
                    <ArrowRight className="hidden md:block w-5 h-5 text-slate-300" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-[11px] sm:text-xs sm:text-sm font-bold text-[#0B1F3A] tracking-wider uppercase mb-1 sm:mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================== */}
        {/* CTA BLOCK                                          */}
        {/* ================================================== */}
        {showCta && (
          <div className="bg-gradient-to-r from-slate-900 via-[#0B1F3A] to-slate-900 rounded-2xl p-8 md:p-12 text-center text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-[#B8860B]/10_1px,transparent_1px] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                Have a Project or Bulk Requirement?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 mb-8 leading-relaxed font-normal">
                Share your product requirements and quantities with our team to receive suitable quotation information.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => openEnquiryModal('')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#a07509] text-white px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  REQUEST A QUOTE
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-lg font-semibold text-sm transition-all focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  VIEW PRODUCTS
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
