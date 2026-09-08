'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Hammer, 
  Building2, 
  Layout, 
  Compass, 
  Armchair, 
  Store,
  ArrowRight
} from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

const INDUSTRIES_DATA = [
  {
    id: 'fabricators',
    title: 'Aluminium Fabricators',
    icon: Hammer,
    description: 'Aluminium profiles and hardware for doors, windows, partitions, frames and custom fabrication requirements.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    alt: 'Professional aluminium fabrication profile cutting and assembly',
    link: '/products#rollers-bearings-channels',
  },
  {
    id: 'construction',
    title: 'Construction & Contractors',
    icon: Building2,
    description: 'Reliable aluminium and architectural hardware supply for residential and commercial construction projects.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    alt: 'Commercial building construction project and architectural facade glazing',
    link: '/products#door-window-seals',
  },
  {
    id: 'interior-contractors',
    title: 'Interior Contractors',
    icon: Layout,
    description: 'Aluminium profiles and hardware for partitions, doors, cabinets, interiors and custom installations.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    alt: 'Modern architectural glass door partition and interior profile installation',
    link: '/products#door-kits',
  },
  {
    id: 'architects-designers',
    title: 'Architects & Designers',
    icon: Compass,
    description: 'Aluminium products and architectural hardware for functional, modern and design-focused projects.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    alt: 'Architectural hardware detailing and design-focused project specifications',
    link: '/products#bolts-handles',
  },
  {
    id: 'furniture-manufacturers',
    title: 'Furniture Manufacturers',
    icon: Armchair,
    description: 'Aluminium sections and hardware components for furniture frames, cabinets, modular systems and custom applications.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    alt: 'Modular kitchen aluminium profile frames and hardware components',
    link: '/products#locks-latches',
  },
  {
    id: 'dealers-distributors',
    title: 'Dealers & Distributors',
    icon: Store,
    description: 'Wholesale aluminium and hardware supply for dealers, distributors and businesses with recurring or bulk requirements.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    alt: 'Wholesale aluminium extrusions and hardware stock distribution warehouse',
    link: '/products',
  },
];

export default function IndustriesWeServeSection() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-200/80 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block">
            INDUSTRIES WE SERVE
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
            Solutions for Every Industry We Serve
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            We supply aluminium products and hardware solutions for businesses, contractors, fabricators and project-based requirements across a wide range of industries.
          </p>
        </div>

        {/* 6 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {INDUSTRIES_DATA.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.id}
                className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0B1F3A] transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Large High Quality Realistic Image Container */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    />

                    {/* Subtle Industry Icon Badge */}
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs p-2 rounded-lg border border-slate-200/80 text-[#0B1F3A] shadow-2xs">
                      <Icon className="w-4 h-4 text-[#0B1F3A]" />
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-2.5">
                    <h3 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#9A7B1C] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="px-6 pb-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={item.link}
                      className="text-xs font-bold text-[#0B1F3A] group-hover:text-[#9A7B1C] flex items-center space-x-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B1F3A] focus:ring-offset-2 rounded-sm"
                    >
                      <span>Explore Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B8860B] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Final Bottom CTA Area */}
        <div className="mt-16 p-8 sm:p-10 bg-[#F8FAFC] border border-slate-200/90 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A]">
              Looking for aluminium or hardware solutions for your project?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Tell us what you need and our team will help you find the right products.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openEnquiryModal()}
              className="px-6 py-3 bg-[#0B1F3A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-2xs active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B1F3A] focus:ring-offset-2"
            >
              Request a Quote
            </button>

            <Link
              href="/products"
              className="px-6 py-3 bg-white border border-slate-300 hover:border-[#0B1F3A] text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-lg transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A] focus:ring-offset-2"
            >
              View All Products
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
