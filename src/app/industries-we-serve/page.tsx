import React from 'react';
import { Metadata } from 'next';
import { Sparkles, Building2, Wrench, Compass, Store, CheckCircle2 } from 'lucide-react';
import IndustriesWeServeSection from '@/components/IndustriesWeServeSection';
import FAQSection from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'Salasar Aluminium supplies fabricators, contractors, architects, and dealers across residential, commercial, and industrial construction in Chhattisgarh.',
  alternates: {
    canonical: '/industries-we-serve',
  },
};

export default function IndustriesWeServePage() {
  return (
    <div className="min-h-screen bg-white text-[#0B1F3A] pt-24 pb-20">
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
              Built for the Trade — Industries We Serve
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              Salasar Aluminium & Hardware supplies architectural aluminium extrusions and hardware fittings directly to trade buyers across residential, commercial, and industrial construction sectors in Chhattisgarh and Pan-India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Copy & Industries Breakdown */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] mb-4">
              Direct Supply for Every B2B Construction Segment
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              We supply high-grade architectural aluminium hardware and standardized 86-SKU catalog items to:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center font-bold">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-xs sm:text-base font-bold text-[#0B1F3A] leading-tight">Aluminium & UPVC Fabricators</h3>
              <p className="text-[10px] sm:text-xs text-[#64748B] leading-relaxed line-clamp-3 sm:line-clamp-none">
                Sliding door/window components, locks, rollers, friction stays, and weather seals for continuous fabrication production runs.
              </p>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-xs sm:text-base font-bold text-[#0B1F3A] leading-tight">Building Contractors</h3>
              <p className="text-[10px] sm:text-xs text-[#64748B] leading-relaxed line-clamp-3 sm:line-clamp-none">
                Bulk trade hardware for residential multi-story towers, commercial complexes, and site-wide architectural projects.
              </p>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center font-bold">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-xs sm:text-base font-bold text-[#0B1F3A] leading-tight">Architects & Developers</h3>
              <p className="text-[10px] sm:text-xs text-[#64748B] leading-relaxed line-clamp-3 sm:line-clamp-none">
                Curtain wall mullions, frameless glass railing channels, and structural extrusions specified for modern facade and interior work.
              </p>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center font-bold">
                <Store className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-xs sm:text-base font-bold text-[#0B1F3A] leading-tight">Dealers & Retailers</h3>
              <p className="text-[10px] sm:text-xs text-[#64748B] leading-relaxed line-clamp-3 sm:line-clamp-none">
                Trade resale stock at direct factory pricing with standardized SA codes for hassle-free reordering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Showcase Section */}
      <IndustriesWeServeSection />

      {/* Industries FAQ Block */}
      <FAQSection
        title="Frequently asked questions."
        faqs={[
          {
            question: 'Do you supply hardware for both residential and commercial projects?',
            answer: 'Yes — our catalogue spans both residential-grade and heavier commercial-grade hardware, including reinforced door closers and higher wind-load-rated extrusions for commercial builds.',
            category: 'Applications',
          },
          {
            question: 'Can architects specify Salasar products directly in project documentation?',
            answer: 'Yes — contact our trade desk for technical specifications (alloy grades, load ratings, finish options) to include in project specs.',
            category: 'Specification',
          },
        ]}
      />
    </div>
  );
}
