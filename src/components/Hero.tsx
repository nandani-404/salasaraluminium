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
        {/* Light & Subtle Overlay for Natural Video Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent pointer-events-none" />
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Modern & Simple Left Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl space-y-6 text-left"
        >
          {/* Tagline Badge - Simple & Modern */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-black/40 backdrop-blur-md border border-amber-400/50 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Architectural Extrusions & Hardware</span>
          </div>

          {/* Main Headline - Modern Sans, Font-Semibold */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight tracking-tight drop-shadow-md">
            Strength in Every Detail.
          </h1>

          {/* Subtitle - Clean, Simple, Font-Semibold */}
          <p className="text-base sm:text-lg text-white/90 font-semibold leading-relaxed drop-shadow-sm">
            Wholesale manufacturer and direct trade supplier of architectural extrusions, door kits, locks, hinges & glass fittings in Raipur.
          </p>

          {/* Action Buttons - Modern & Clean */}
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
              className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-sm active:scale-95 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Request Trade Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-950" />
            </button>

            <Link
              href="/products"
              className="px-7 py-3.5 bg-black/40 backdrop-blur-md text-white border border-white/40 hover:bg-black/60 hover:border-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Browse 86 Products</span>
            </Link>
          </div>

          {/* Simple Location & Manufacturer Signals */}
          <div className="pt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/90">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-black/30 backdrop-blur-sm rounded-md border border-white/10">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Mfg: <strong className="text-white font-semibold">Swastik Industries</strong></span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-black/30 backdrop-blur-sm rounded-md border border-white/10">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Location: <strong className="text-white font-semibold">Raipur, Chhattisgarh</strong></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
