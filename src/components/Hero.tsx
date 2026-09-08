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
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-slate-950">
      {/* Full-width Autoplay Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/1 (online-video-cutter.com) (1).mp4" type="video/mp4" />
        </video>
        {/* Lighter Gradient Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/30 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl space-y-6 text-left"
        >
          {/* Brand Logo & Eyebrow Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#0B1F3A] rounded-xl flex items-center justify-center p-1.5 shadow-lg border border-[#D4AF37]/50 shrink-0">
              <svg viewBox="0 0 44 44" fill="none" className="w-full h-full">
                <defs>
                  <linearGradient id="heroGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F3E5AB" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#AA771C" />
                  </linearGradient>
                </defs>
                <path d="M22 4L38 12V32L22 40L6 32V12L22 4Z" stroke="url(#heroGoldGrad)" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M6 12L22 20L38 12" stroke="url(#heroGoldGrad)" strokeWidth="1.5" opacity="0.6" />
                <text x="22" y="27" textAnchor="middle" fill="url(#heroGoldGrad)" fontWeight="800" fontSize="13" letterSpacing="0.5">
                  SAH
                </text>
              </svg>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/50 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#D4AF37] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Wholesale & Trade Supply
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-md">
            Architectural Aluminium & Hardware
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl drop-shadow-sm">
            Direct wholesale supplier of high-precision extrusions, door systems, locks & fittings for fabricators and contractors across Raipur.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
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
              className="px-6 py-3.5 bg-[#B8860B] hover:bg-[#a07509] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/products"
              className="px-6 py-3.5 bg-black/40 hover:bg-black/60 text-white font-semibold text-xs uppercase tracking-wider rounded-lg border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-300" />
              <span>Browse Catalog</span>
            </Link>
          </div>

          {/* Factual Footnote */}
          <div className="pt-4 flex items-center gap-6 text-xs text-slate-300 font-medium">
            <span>Branch: Finetek • Raipur</span>
            <span>•</span>
            <span>86+ SKUs In Stock</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
