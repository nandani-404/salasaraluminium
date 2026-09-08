'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Check } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

export interface IndustryItem {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  rightEyebrow: string;
  title: string;
  rightSubtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  productsSupplied: { name: string; link: string; anchorText: string }[];
  applications: string[];
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'commercial',
    number: '01',
    name: 'Commercial & High-Rise',
    subtitle: 'Architectural & façade applications',
    rightEyebrow: 'INDUSTRY 01 • COMMERCIAL & HIGH-RISE',
    title: 'Commercial & High-Rise Projects',
    rightSubtitle: 'ALUMINIUM SYSTEMS & ARCHITECTURAL HARDWARE',
    description: 'We supply aluminium profiles and architectural hardware for commercial buildings, high-rise developments, façades, curtain walls, doors, windows and interior applications.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Aluminium curtain wall system used in a commercial high-rise building',
    productsSupplied: [
      { name: 'Aluminium Profiles', link: '/products', anchorText: 'Explore Aluminium Profiles' },
      { name: 'Curtain Wall Components', link: '/products', anchorText: 'View Curtain Wall Components' },
      { name: 'Door & Window Hardware', link: '/products', anchorText: 'Explore Door & Window Hardware' },
      { name: 'Architectural Hardware', link: '/products', anchorText: 'View Architectural Hardware' },
    ],
    applications: ['Curtain Walls', 'Facades', 'Doors', 'Windows', 'Partitions', 'Office Interiors'],
  },
  {
    id: 'residential',
    number: '02',
    name: 'Residential Projects',
    subtitle: 'Doors, windows & interior applications',
    rightEyebrow: 'INDUSTRY 02 • RESIDENTIAL PROJECTS',
    title: 'Residential Projects',
    rightSubtitle: 'ALUMINIUM SECTIONS & HARDWARE SUPPLY',
    description: 'We provide aluminium sections, window sliding channels, door hardware and glass fittings for residential towers, apartment complexes and housing developments.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Aluminium window profiles and glass partition systems in modern residential architecture',
    productsSupplied: [
      { name: 'Aluminium Profiles', link: '/products', anchorText: 'Explore Residential Aluminium Profiles' },
      { name: 'Door Hardware', link: '/products', anchorText: 'Explore Door Hardware' },
      { name: 'Window Hardware', link: '/products', anchorText: 'Explore Window Hardware' },
      { name: 'Glass & Architectural Fittings', link: '/products', anchorText: 'View Glass & Architectural Fittings' },
    ],
    applications: ['Doors', 'Windows', 'Balconies', 'Partitions', 'Interior Systems'],
  },
  {
    id: 'fabricators',
    number: '03',
    name: 'Aluminium Fabricators',
    subtitle: 'Profiles, sections & fabrication hardware',
    rightEyebrow: 'INDUSTRY 03 • ALUMINIUM FABRICATORS',
    title: 'Aluminium Fabricators',
    rightSubtitle: 'FABRICATION SECTIONS & HARDWARE COMPONENTS',
    description: 'We supply aluminium profiles, channels, rollers, locks, hinges and assembly hardware for fabricators producing custom doors, windows and aluminium frames.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Aluminium extrusion profiles and hardware components in a fabrication workshop',
    productsSupplied: [
      { name: 'Aluminium Sections', link: '/products', anchorText: 'Explore Aluminium Fabrication Sections' },
      { name: 'Profiles & Channels', link: '/products', anchorText: 'View Profiles & Channels' },
      { name: 'Fabrication Hardware', link: '/products', anchorText: 'Explore Fabrication Hardware' },
      { name: 'Door & Window Components', link: '/products', anchorText: 'View Door & Window Components' },
    ],
    applications: ['Frames', 'Doors', 'Windows', 'Partitions', 'Custom Fabrication'],
  },
  {
    id: 'furniture',
    number: '04',
    name: 'Modular Furniture',
    subtitle: 'Precision aluminium systems & fittings',
    rightEyebrow: 'INDUSTRY 04 • MODULAR FURNITURE',
    title: 'Modular Furniture Manufacturers',
    rightSubtitle: 'FURNITURE PROFILES & MODULAR FITTINGS',
    description: 'We supply aluminium G-sections, J-profiles, frame channels, drawer slides and cabinet hardware for modular furniture manufacturers and interior fabricators.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Aluminium G-profile handles and modular furniture cabinet hardware',
    productsSupplied: [
      { name: 'Aluminium Profiles', link: '/products', anchorText: 'Explore Furniture Aluminium Profiles' },
      { name: 'Furniture Sections', link: '/products', anchorText: 'View Furniture Aluminium Sections' },
      { name: 'Connectors & Fittings', link: '/products', anchorText: 'Explore Modular Connectors & Fittings' },
      { name: 'Cabinet & Modular Hardware', link: '/products', anchorText: 'View Cabinet & Modular Hardware' },
    ],
    applications: ['Cabinets', 'Furniture Frames', 'Partitions', 'Display Systems', 'Modular Structures'],
  },
  {
    id: 'industrial',
    number: '05',
    name: 'Industrial Facilities',
    subtitle: 'Structural & industrial applications',
    rightEyebrow: 'INDUSTRY 05 • INDUSTRIAL FACILITIES',
    title: 'Industrial Facilities & Warehousing',
    rightSubtitle: 'HEAVY STRUCTURAL HARDWARE & SEALS',
    description: 'We supply structural aluminium sections, heavy sliding door hardware, weather seals and industrial hardware components for factory and warehouse facilities.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Heavy industrial sliding door hardware and aluminium structural assemblies in warehouse facility',
    productsSupplied: [
      { name: 'Aluminium Structural Profiles', link: '/products', anchorText: 'Explore Structural Aluminium Profiles' },
      { name: 'Channels & Sections', link: '/products', anchorText: 'View Structural Channels & Sections' },
      { name: 'Industrial Hardware', link: '/products', anchorText: 'Explore Heavy Industrial Hardware' },
      { name: 'Fabrication Components', link: '/products', anchorText: 'View Industrial Fabrication Components' },
    ],
    applications: ['Machine Frames', 'Structural Assemblies', 'Partitions', 'Enclosures', 'Fabrication'],
  },
  {
    id: 'hospitality',
    number: '06',
    name: 'Hospitality & Institutional',
    subtitle: 'Architectural hardware & project supply',
    rightEyebrow: 'INDUSTRY 06 • HOSPITALITY & INSTITUTIONAL',
    title: 'Hospitality & Institutional Projects',
    rightSubtitle: 'ARCHITECTURAL HARDWARE & GLASS FITTINGS',
    description: 'We supply architectural hardware, shower enclosure fittings, door closers, handles and aluminium profiles for hotels, commercial spaces and institutional buildings.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Architectural glass door hardware and sleek fittings installed in modern hotel interior',
    productsSupplied: [
      { name: 'Architectural Hardware', link: '/products', anchorText: 'Explore Architectural Hardware' },
      { name: 'Door & Window Hardware', link: '/products', anchorText: 'View Door & Window Hardware' },
      { name: 'Aluminium Profiles', link: '/products', anchorText: 'Explore Institutional Aluminium Profiles' },
      { name: 'Glass & Interior Fittings', link: '/products', anchorText: 'View Glass & Interior Fittings' },
    ],
    applications: ['Hotels', 'Restaurants', 'Offices', 'Institutions', 'Public Buildings', 'Interior Projects'],
  },
];

export default function IndustriesWeServeSection() {
  const [selectedId, setSelectedId] = useState<string>('commercial');
  const { openEnquiryModal } = useEnquiry();

  const selectedIndustry = INDUSTRIES_DATA.find((item) => item.id === selectedId) || INDUSTRIES_DATA[0];

  return (
    <section className="py-20 sm:py-24 bg-[#FAF9F6] border-t border-[#E8E6E1] text-[#0B1F3A] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block">
            INDUSTRIES WE SERVE
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
            Aluminium & Hardware Solutions Across Industries
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
            We supply aluminium products and architectural hardware for contractors, fabricators, businesses and project requirements across a wide range of industries and applications.
          </p>
        </div>

        {/* Two-Column Interactive Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Industry Selector (30%) */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-[#E2E8F0] p-3 shadow-2xs">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B8860B] block px-3 pt-2 pb-3">
              SELECT INDUSTRY
            </span>

            <nav role="tablist" aria-label="Industry Sector Selection" className="space-y-1.5">
              {INDUSTRIES_DATA.map((item) => {
                const isActive = selectedId === item.id;

                return (
                  <button
                    key={item.id}
                    id={`tab-${item.id}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`panel-${item.id}`}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left p-3.5 rounded-lg transition-all duration-200 flex items-center justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] ${
                      isActive
                        ? 'bg-[#0B1F3A] text-white shadow-sm'
                        : 'bg-white hover:bg-[#F8FAFC] text-[#0B1F3A]'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      {/* Number Badge */}
                      <span className={`w-8 h-8 rounded-md text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#D4AF37] text-[#0B1F3A]'
                          : 'bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#E2E8F0]'
                      }`}>
                        {item.number}
                      </span>

                      {/* Title & Subtitle */}
                      <div className="min-w-0 flex flex-col">
                        <span className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-white' : 'text-[#0B1F3A]'}`}>
                          {item.name}
                        </span>
                        <span className={`text-[10px] truncate ${isActive ? 'text-slate-300' : 'text-[#64748B]'}`}>
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[#D4AF37] translate-x-0.5' : 'text-[#94A3B8] opacity-0 group-hover:opacity-100'
                    }`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Column: Detailed Industry Information Panel (70%) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 lg:p-10 shadow-2xs">
            {INDUSTRIES_DATA.map((item) => {
              const isSelected = selectedId === item.id;

              return (
                <article
                  key={item.id}
                  id={`panel-${item.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${item.id}`}
                  className={isSelected ? 'block space-y-8' : 'hidden'}
                >
                  {/* Top Header & Subtitle */}
                  <div className="space-y-2 border-b border-[#F1F5F9] pb-6">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B8860B] block">
                      {item.rightEyebrow}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                      {item.title}
                    </h3>

                    <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] block pt-0.5">
                      {item.rightSubtitle}
                    </span>

                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pt-2">
                      {item.description}
                    </p>
                  </div>

                  {/* High Quality Realistic Industry Image */}
                  <div className="relative h-56 sm:h-64 w-full rounded-lg overflow-hidden border border-[#E2E8F0] bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover"
                      priority={item.id === 'commercial'}
                    />
                  </div>

                  {/* Products Supplied Grid */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0B1F3A]">
                      PRODUCTS SUPPLIED
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.productsSupplied.map((prod) => (
                        <div
                          key={prod.name}
                          className="p-3 bg-[#FAF9F6] border border-[#E8E6E1] rounded-lg flex items-center justify-between group hover:border-[#0B1F3A] transition-colors"
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center text-xs shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <span className="text-xs font-bold text-[#0B1F3A]">{prod.name}</span>
                          </div>

                          <Link
                            href={prod.link}
                            className="text-[11px] font-semibold text-[#8C6B1B] hover:text-[#0B1F3A] hover:underline flex items-center space-x-1 transition-colors"
                            aria-label={prod.anchorText}
                          >
                            <span>{prod.anchorText}</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Applications Pills */}
                  <div className="space-y-3 pt-2 border-t border-[#F1F5F9]">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0B1F3A]">
                      COMMON APPLICATIONS
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {item.applications.map((app) => (
                        <span
                          key={app}
                          className="text-xs font-medium text-[#334155] px-3 py-1.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-md"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* B2B Supply Information Box */}
                  <div className="p-5 bg-[#0B1F3A] text-white rounded-lg space-y-3 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-700/80 pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                        PROJECT & WHOLESALE SUPPLY
                      </span>
                      <span className="text-[11px] text-slate-300">
                        Suitable for: <strong className="text-white font-semibold">Contractors • Fabricators • Dealers • Project Buyers</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700 text-center space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Supply Type</span>
                        <span className="text-xs font-bold text-white">Wholesale & Bulk</span>
                      </div>

                      <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700 text-center space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Product Range</span>
                        <span className="text-xs font-bold text-white">Aluminium + Hardware</span>
                      </div>

                      <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700 text-center space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Requirements</span>
                        <span className="text-xs font-bold text-white">Project & Recurring</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel CTA */}
                  <div className="pt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-0.5 text-center sm:text-left">
                      <h4 className="text-sm font-bold text-[#0B1F3A]">Have a project or bulk requirement?</h4>
                      <p className="text-xs text-[#64748B]">Share your product requirements and quantities with our team to receive a suitable quotation.</p>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEnquiryModal()}
                        className="px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-2xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
                      >
                        <span>REQUEST A PROJECT QUOTE</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </button>

                      <Link
                        href="/products"
                        className="text-xs font-bold text-[#0B1F3A] hover:text-[#B8860B] uppercase tracking-wider hover:underline"
                      >
                        VIEW PRODUCTS →
                      </Link>
                    </div>
                  </div>

                </article>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
