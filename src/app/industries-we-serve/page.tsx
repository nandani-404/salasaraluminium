import React from 'react';
import { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import IndustriesWeServeSection from '@/components/IndustriesWeServeSection';

export const metadata: Metadata = {
  title: 'Industries We Serve — Commercial & B2B Solutions | Salasar',
  description: 'Aluminium profiles, extrusions, and architectural hardware supply for contractors, fabricators, commercial builders, modular furniture, and dealers across Chhattisgarh.',
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
              Hardware & Extrusion Engineering Tailored for Every Sector
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Salasar Aluminium & Hardware is the direct wholesale partner for commercial builders, architects, glass fabricators, and interior designers across Central India.
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Panel B2B Industries We Serve Component */}
      <IndustriesWeServeSection />
    </div>
  );
}
