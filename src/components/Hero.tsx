'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Sparkles, Building2, MapPin } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_BUSINESS_DETAILS } from '@/lib/sahData';

export default function Hero() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-black">
      {/* Full-width Autoplay Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100"
        >
          <source src="/1 (online-video-cutter.com) (1).mp4" type="video/mp4" />
        </video>
        {/* Gradient Scrim for Crystal Clear Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/15 pointer-events-none" />
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Enhanced High-Impact Left Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-7 text-left"
        >
          {/* Tagline Badge - Enhanced Glassmorphism */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 bg-slate-950/80 backdrop-blur-xl border border-amber-400/70 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">Architectural Extrusions & Hardware</span>
          </div>

          {/* Main Headline - Bold, Premium & Striking */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-extrabold text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            Strength in Every{' '}
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              Detail.
            </span>
          </h1>

          {/* Subtitle - Crisp White & Legible */}
          <p className="text-lg sm:text-xl text-slate-100 font-medium leading-relaxed max-w-2xl drop-shadow-md">
            Wholesale manufacturer and direct trade supplier of <span className="text-amber-300 font-semibold">architectural extrusions</span>, door kits, locks, hinges & glass fittings in <span className="text-white font-bold underline decoration-amber-400 decoration-2 underline-offset-4">Raipur</span>.
          </p>

          {/* Upgraded Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => {
                const quoteSec = document.getElementById('trade-quote');
                if (quoteSec) {
                  quoteSec.scrollIntoView({ behavior: 'smooth' });
                } else {
                  openEnquiryModal();
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_14px_30px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2.5 group cursor-pointer border border-yellow-200/60"
            >
              <span>Request Trade Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1.5 transition-transform text-slate-950" />
            </button>

            <Link
              href="/products"
              className="px-8 py-4 bg-slate-950/70 hover:bg-slate-900/90 backdrop-blur-md text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-amber-400/50 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2.5 cursor-pointer group"
            >
              <Layers className="w-4 h-4 text-amber-400 group-hover:rotate-6 transition-transform" />
              <span>Browse 86 Products</span>
            </Link>
          </div>

          {/* Location & Manufacturer Signal Cards */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white">
            <div className="flex items-center space-x-2.5 px-4 py-2 bg-slate-950/70 backdrop-blur-md rounded-xl border border-white/15 shadow-md hover:border-amber-400/40 transition-colors">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span className="font-medium text-slate-200">Mfg: <strong className="text-white font-bold">Swastik Industries</strong></span>
            </div>
            <div className="flex items-center space-x-2.5 px-4 py-2 bg-slate-950/70 backdrop-blur-md rounded-xl border border-white/15 shadow-md hover:border-amber-400/40 transition-colors">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="font-medium text-slate-200">Location: <strong className="text-white font-bold">Raipur, Chhattisgarh</strong></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
