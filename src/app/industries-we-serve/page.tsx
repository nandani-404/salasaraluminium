'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Home, 
  Briefcase, 
  Warehouse, 
  Hotel, 
  Landmark, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Layers,
  PhoneCall
} from 'lucide-react';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import IndustriesWeServeSection from '@/components/IndustriesWeServeSection';
import { useEnquiry } from '@/context/EnquiryContext';

const INDUSTRIES = [
  {
    number: '01',
    id: 'commercial',
    title: 'Commercial & High-Rise Real Estate',
    subtitle: 'Architectural Glazing & Heavy Façade Hardware',
    icon: Building2,
    badge: 'High Wind-Load Rated',
    description: 'We supply high-tensile aluminium structural profiles, curtain wall extrusions, structural silicone glazing channels, and heavy-duty glass patch fittings to major commercial tower projects across Chhattisgarh and Central India.',
    keyProducts: [
      { name: 'Spider Fittings & SS304 Clamps', code: 'SA-71' },
      { name: 'Hydraulic Floor Springs (120kg-180kg)', code: 'SA-76' },
      { name: 'Curtain Wall Structural Glazing Channels', code: 'SA-05' },
      { name: 'Automatic Sliding Door Track Assemblies', code: 'SA-78' }
    ],
    highlight: 'Tested for high wind-pressure resistance and 500,000+ opening cycles.',
    stats: { capacity: '180 kg', rating: 'SS304 Grade', testing: '500k Cycles' }
  },
  {
    number: '02',
    id: 'residential',
    title: 'Residential Towers & Luxury Villas',
    subtitle: 'Sliding Door Profiles, Locks & Designer Handles',
    icon: Home,
    badge: 'Premium Designer Finishes',
    description: 'Complete hardware ecosystem for high-end residential apartments, villas, and housing schemes. From smooth ball-bearing sliding window rollers to luxury rose handles and mortise door locks.',
    keyProducts: [
      { name: 'Premium Aluminium Window Sliding Channels', code: 'SA-01' },
      { name: 'Brass & Zinc Alloy Mortise Locksets', code: 'SA-42' },
      { name: 'Heavy Nylon & Brass Bearing Window Rollers', code: 'SA-11' },
      { name: 'Concealed Friction Stays & Magnetic Catchers', code: 'SA-33' }
    ],
    highlight: 'Available in CP, Satin Finish, Antique Brass, and Anodized Matt Black.',
    stats: { capacity: '80 kg', rating: '6063-T5 Alloy', testing: 'Anti-Rust' }
  },
  {
    number: '03',
    id: 'furniture',
    title: 'Modular Furniture & Interior Architecture',
    subtitle: 'Slim Edge Profiles, G-Channels & Cabinet Fittings',
    icon: Briefcase,
    badge: 'Precision Extrusions',
    description: 'Partnering with modular kitchen manufacturers, interior decorators, and furniture OEM units. We stock specialized G-channels, J-profiles, edge-banding aluminium sections, and soft-close cabinet hinges.',
    keyProducts: [
      { name: 'G-Section & J-Section Aluminium Handles', code: 'SA-[#G]' },
      { name: 'Slim Glass Profile Frames for Wardrobes', code: 'SA-35' },
      { name: 'Auto-3D Hydraulic Soft-Close Cabinet Hinges', code: 'SA-51' },
      { name: 'Heavy Ball-Bearing Telescopic Drawer Slides', code: 'SA-55' }
    ],
    highlight: '6063-T5 virgin alloy extrusions with flawless anodized surface finish.',
    stats: { capacity: '45 kg', rating: 'Anodized 15µm', testing: '3D Auto-Soft' }
  },
  {
    number: '04',
    id: 'industrial',
    title: 'Industrial Facilities & Warehousing',
    subtitle: 'Heavy Industrial Sliding Tracks & Weather Seals',
    icon: Warehouse,
    badge: 'Extreme Load Capacity',
    description: 'Robust hardware solutions built for factory floors, logistics parks, and industrial sheds requiring heavy door operations, dust sealing, and high-impact structural fittings.',
    keyProducts: [
      { name: 'Heavy Industrial Sliding Door Tracks & Hangers', code: 'SA-81' },
      { name: 'EPDM Rubber Weatherstripping Seals', code: 'SA-90' },
      { name: 'High-Load Stainless Steel Butt & Flag Hinges', code: 'SA-62' },
      { name: 'Panic Exit Bars & Fire Door Hardware', code: 'SA-88' }
    ],
    highlight: 'Engineered for continuous heavy load-bearing and harsh industrial environments.',
    stats: { capacity: '250 kg', rating: 'EPDM Sealed', testing: 'Fire Rated' }
  },
  {
    number: '05',
    id: 'hospitality',
    title: 'Hospitality & Luxury Retail Showrooms',
    subtitle: 'Frameless Glass Hardware & Decorative Profiles',
    icon: Hotel,
    badge: 'Architectural Aesthetics',
    description: 'Tailored solutions for hotels, luxury showrooms, restaurants, and retail spaces where visual elegance and effortless glass hardware operation are paramount.',
    keyProducts: [
      { name: 'Shower Enclosure Hinges (90° & 180° CP Solid Brass)', code: 'SA-66' },
      { name: 'Glass Door Patch Locks & Hydraulic Fittings', code: 'SA-72' },
      { name: 'Decorative Anodized & PVD Gold Aluminium Strips', code: 'SA-22' },
      { name: 'Concealed Sliding Door Rail Kits', code: 'SA-80' }
    ],
    highlight: 'Zero-rattle operation with sleek minimalist architectural aesthetics.',
    stats: { capacity: '110 kg', rating: 'PVD Gold / CP', testing: 'Zero-Rattle' }
  },
  {
    number: '06',
    id: 'institutional',
    title: 'Government & Public Infrastructure',
    subtitle: 'CPWD / PWD Compliant Standard Hardware',
    icon: Landmark,
    badge: 'IS-Standard Compliant',
    description: 'Bulk wholesale hardware supply for government tenders, educational institutions, hospitals, and public infrastructure projects adhering to standardized specifications.',
    keyProducts: [
      { name: 'IS-Standard Aluminium Tower Bolts & Aldrops', code: 'SA-18' },
      { name: 'Pneumatic Overhead Door Closers (EN3/EN4)', code: 'SA-74' },
      { name: 'Heavy Cast Iron & Aluminium Friction Stays', code: 'SA-31' },
      { name: 'Bulk Handles, Stopper Pins & Flush Bolts', code: 'SA-25' }
    ],
    highlight: 'Complete compliance certification and mill test reports available.',
    stats: { capacity: 'EN3 / EN4', rating: 'IS-Compliant', testing: 'Govt Grade' }
  }
];

export default function IndustriesWeServePage() {
  const [activeTab, setActiveTab] = useState('commercial');
  const { openEnquiryModal } = useEnquiry();

  const currentIndustry = INDUSTRIES.find((i) => i.id === activeTab) || INDUSTRIES[0];
  const IconComponent = currentIndustry.icon;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3A] pt-24 pb-20">
      
      {/* Hero Header Section */}
      <section className="bg-gradient-to-r from-[#0B1F3A] via-[#1E293B] to-[#0F172A] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-full text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural & B2B Industry Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Hardware & Extrusion Engineering Tailored for Every Sector
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Salasar Aluminium & Hardware is the direct wholesale partner for commercial builders, architects, glass fabricators, and interior designers across Central India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace (Split View) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Interactive Industry Selector Navigation */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs sticky top-28">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8860B] block px-3 py-2">
              Select Industry Sector
            </span>

            <div className="space-y-1 mt-1">
              {INDUSTRIES.map((ind) => {
                const TabIcon = ind.icon;
                const isActive = activeTab === ind.id;

                return (
                  <button
                    key={ind.id}
                    onClick={() => setActiveTab(ind.id)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-[#0B1F3A] text-white shadow-md'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-[#B8860B] text-white' : 'bg-slate-100 text-[#0B1F3A] group-hover:bg-slate-200'}`}>
                        <TabIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#0B1F3A]'}`}>
                          {ind.title.split('&')[0]}
                        </div>
                        <div className={`text-[10px] font-medium ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                          {ind.badge}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#D4AF37] translate-x-0.5' : 'text-slate-400 opacity-0 group-hover:opacity-100'}`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Contact Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">Trade Quote Desk</span>
              <p className="text-xs text-slate-300">Need specific custom profile lengths or section weight quotes?</p>
              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="w-full py-2 bg-[#B8860B] hover:bg-[#D4AF37] text-[#0B1F3A] text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
              >
                Request Sector Quote
              </button>
            </div>
          </div>

          {/* Right Main Showcase: Selected Industry Detailed Display */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Header Title Bar */}
              <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#B8860B] uppercase tracking-widest">
                    <span>Sector {currentIndustry.number}</span>
                    <span>•</span>
                    <span>{currentIndustry.badge}</span>
                  </div>

                  <div className="flex items-center space-x-3 pt-1">
                    <IconComponent className="w-7 h-7 text-[#0B1F3A]" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                      {currentIndustry.title}
                    </h2>
                  </div>

                  <p className="text-xs font-semibold text-[#8C6B1B] uppercase tracking-wider pl-1">
                    {currentIndustry.subtitle}
                  </p>
                </div>

                <span className="px-3.5 py-1.5 bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-[#0B1F3A] text-xs font-bold rounded-full self-start sm:self-center whitespace-nowrap">
                  Raipur Stock Available
                </span>
              </div>

              {/* Description Paragraph */}
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {currentIndustry.description}
              </p>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-3 py-2">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Load Spec</span>
                  <span className="text-sm font-extrabold text-[#0B1F3A]">{currentIndustry.stats.capacity}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Material Grade</span>
                  <span className="text-sm font-extrabold text-[#0B1F3A]">{currentIndustry.stats.rating}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Certification</span>
                  <span className="text-sm font-extrabold text-[#0B1F3A]">{currentIndustry.stats.testing}</span>
                </div>
              </div>

              {/* Key Supplied Hardware Products Table List */}
              <div className="pt-2">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#0B1F3A] mb-4">
                  <Layers className="w-4 h-4 text-[#B8860B]" />
                  <span>Key Hardware SKUs Supplied for {currentIndustry.title.split('&')[0]}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentIndustry.keyProducts.map((prod, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl flex items-center justify-between group hover:border-[#0B1F3A] transition-all"
                    >
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{prod.name}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-[#0B1F3A] text-white px-2 py-0.5 rounded">
                        {prod.code}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight Banner */}
              <div className="p-4 bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 rounded-xl flex items-center space-x-3 text-xs text-[#0B1F3A]">
                <ShieldCheck className="w-5 h-5 text-[#B8860B] shrink-0" />
                <span><strong className="font-bold">Quality Standard Guarantee:</strong> {currentIndustry.highlight}</span>
              </div>

              {/* Bottom Action CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => openEnquiryModal(currentIndustry.keyProducts[0]?.code)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0B1F3A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Enquire {currentIndustry.title.split('&')[0]} Hardware</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>

                <a
                  href="tel:+918007443071"
                  className="text-xs font-bold text-[#0B1F3A] hover:text-[#B8860B] flex items-center space-x-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Call Direct Sales: 8007443071</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Overview Grid Section */}
      <IndustriesWeServeSection />
    </div>
  );
}




