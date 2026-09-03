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
        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15 pointer-events-none" />
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
        {/* High-Impact Left Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl space-y-6 text-left"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 bg-slate-950/80 backdrop-blur-xl border border-amber-400/60 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Architectural Extrusions & Hardware</span>
          </div>

          {/* Main Headline - Font Semibold */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight tracking-tight drop-shadow-md">
            Strength in Every{' '}
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Detail.
            </span>
          </h1>

          {/* Subtitle - Font Semibold */}
          <p className="text-base sm:text-lg text-slate-100 font-semibold leading-relaxed max-w-xl drop-shadow-sm">
            Wholesale manufacturer and direct trade supplier of <span className="text-amber-300 font-semibold">architectural extrusions</span>, door kits, locks, hinges & glass fittings in <span className="text-white font-semibold underline decoration-amber-400 decoration-2 underline-offset-4">Raipur</span>.
          </p>

          {/* Action Buttons - Font Semibold */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
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
              className="px-7 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2.5 group cursor-pointer border border-yellow-200/50"
            >
              <span>Request Trade Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-950" />
            </button>

            <Link
              href="/products"
              className="px-7 py-3.5 bg-slate-950/70 hover:bg-slate-900/90 backdrop-blur-md text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-amber-400/50 hover:border-amber-400 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2.5 cursor-pointer group"
            >
              <Layers className="w-4 h-4 text-amber-400 group-hover:rotate-6 transition-transform" />
              <span>Browse 86 Products</span>
            </Link>
          </div>

          {/* Location & Manufacturer Signal Cards - Font Semibold */}
          <div className="pt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white">
            <div className="flex items-center space-x-2 px-3.5 py-1.5 bg-slate-950/70 backdrop-blur-md rounded-lg border border-white/15 shadow-sm">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-slate-200">Mfg: <strong className="text-white font-semibold">Swastik Industries</strong></span>
            </div>
            <div className="flex items-center space-x-2 px-3.5 py-1.5 bg-slate-950/70 backdrop-blur-md rounded-lg border border-white/15 shadow-sm">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-slate-200">Location: <strong className="text-white font-semibold">Raipur, Chhattisgarh</strong></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
