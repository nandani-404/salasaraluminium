'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Check } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

export interface ProductSupplied {
  name: string;
  image?: string;
  link: string;
  anchorText: string;
}

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
  productsSupplied: ProductSupplied[];
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
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Aluminium curtain wall structural mullion profiles and commercial glazing system',
    productsSupplied: [
      { name: 'Aluminium Profiles', image: '/c-channel-v1.png', link: '/products', anchorText: 'Explore Profiles' },
      { name: 'Curtain Wall Components', image: '/patch lock.png', link: '/products', anchorText: 'View Components' },
      { name: 'Door & Window Hardware', image: '/floor machine.png', link: '/products', anchorText: 'Explore Hardware' },
      { name: 'Architectural Hardware', image: '/heavy commerical doorkit.png', link: '/products', anchorText: 'View Hardware' },
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
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Aluminium sliding glass door frames, window channels and architectural hardware',
    productsSupplied: [
      { name: 'Aluminium Profiles', image: '/c-channel-v1.png', link: '/products', anchorText: 'Explore Profiles' },
      { name: 'Door Hardware', image: '/american handle.png', link: '/products', anchorText: 'Explore Door Hardware' },
      { name: 'Window Hardware', image: '/sliding roller1.png', link: '/products', anchorText: 'Explore Window Hardware' },
      { name: 'Glass & Architectural Fittings', image: '/patch lock.png', link: '/products', anchorText: 'View Glass Fittings' },
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
    image: '/fabricator-workshop.jpg',
    imageAlt: 'Industrial aluminium profile extrusions, corner cleats, window rollers, hinges and fabrication tools on assembly workbench',
    productsSupplied: [
      { name: 'Aluminium Sections', image: '/corner cleat.png', link: '/products', anchorText: 'Explore Sections' },
      { name: 'Profiles & Channels', image: '/u-channel-v1.png', link: '/products', anchorText: 'View Channels' },
      { name: 'Fabrication Hardware', image: '/cutting wheel.png', link: '/products', anchorText: 'Explore Tools' },
      { name: 'Door & Window Components', image: '/2d hinge.png', link: '/products', anchorText: 'View Components' },
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
    image: '/modular-furniture.jpg',
    imageAlt: 'Modern modular cabinet interior featuring aluminium G-profile handle extrusions, wardrobe frame channels, concealed hinges and fittings',
    productsSupplied: [
      { name: 'Aluminium Profiles', image: '/g channel.png', link: '/products', anchorText: 'Explore Profiles' },
      { name: 'Furniture Sections', image: '/round concealed handle.png', link: '/products', anchorText: 'View Sections' },
      { name: 'Connectors & Fittings', image: '/knob.png', link: '/products', anchorText: 'Explore Connectors' },
      { name: 'Cabinet & Modular Hardware', image: '/3d hinge.png', link: '/products', anchorText: 'View Cabinet Hardware' },
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
    image: '/salasar-warehouse-hub.png',
    imageAlt: 'Heavy industrial sliding door hardware and aluminium structural assemblies in warehouse',
    productsSupplied: [
      { name: 'Aluminium Structural Profiles', image: '/big l.png', link: '/products', anchorText: 'Explore Structural Profiles' },
      { name: 'Channels & Sections', image: '/u chasnnel.png', link: '/products', anchorText: 'View Heavy Channels' },
      { name: 'Industrial Hardware', image: '/pu foam.png', link: '/products', anchorText: 'Explore Industrial Hardware' },
      { name: 'Fabrication Components', image: '/rubber.png', link: '/products', anchorText: 'View Weather Seals' },
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
    image: '/hospitality-hardware.jpg',
    imageAlt: 'Luxury hotel bathroom glass shower enclosure with solid brass chrome hinges, glass patch fittings, and stainless steel door handles',
    productsSupplied: [
      { name: 'Architectural Hardware', image: '/shower hinge 90.png', link: '/products', anchorText: 'Explore Glass Hardware' },
      { name: 'Door & Window Hardware', image: '/door closer.png', link: '/products', anchorText: 'View Door Closers' },
      { name: 'Aluminium Profiles', image: '/louvers.png', link: '/products', anchorText: 'Explore Louvers' },
      { name: 'Glass & Interior Fittings', image: '/glass to glass.png', link: '/products', anchorText: 'View Connectors' },
    ],
    applications: ['Hotels', 'Restaurants', 'Offices', 'Institutions', 'Public Buildings', 'Interior Projects'],
  },
];

export default function IndustriesWeServeSection() {
  const [selectedId, setSelectedId] = useState<string>('commercial');
  const { openEnquiryModal } = useEnquiry();

  const selectedIndustry = INDUSTRIES_DATA.find((item) => item.id === selectedId) || INDUSTRIES_DATA[0];

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-[#E2E8F0] text-[#0B1F3A] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block">
            INDUSTRIES WE SERVE
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight leading-tight">
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
                  <div className="relative h-60 sm:h-72 w-full rounded-lg overflow-hidden border border-[#E2E8F0] bg-slate-100 shadow-2xs">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover"
                      priority={item.id === 'commercial'}
                    />
                  </div>

                  {/* Products Supplied Grid with Product Thumbnail Images */}
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
                          <div className="flex items-center space-x-3">
                            {/* Product Thumbnail Image */}
                            {prod.image ? (
                              <div className="relative w-11 h-11 rounded-md bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1 shadow-2xs">
                                <Image
                                  src={prod.image}
                                  alt={prod.name}
                                  fill
                                  sizes="44px"
                                  className="object-contain p-0.5"
                                />
                              </div>
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center text-xs shrink-0">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            )}
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
