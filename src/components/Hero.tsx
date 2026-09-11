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
    <section className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen flex items-center pt-24 pb-24 sm:pt-28 sm:pb-16 overflow-hidden bg-slate-950">
      {/* Full-width Autoplay Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-95"
        >
          <source src="/1 (online-video-cutter.com) (1).mp4" type="video/mp4" />
        </video>
        {/* Minimal Scrim Overlay for Maximum Video Clarity */}
        <div className="absolute inset-0 bg-slate-950/30 sm:bg-gradient-to-r sm:from-slate-950/20 sm:via-slate-950/5 sm:to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-20 my-auto">
        <div className="max-w-2xl space-y-4 sm:space-y-6 text-left">
          {/* Brand Logo & Eyebrow Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0B1F3A] rounded-xl flex items-center justify-center p-1.5 shadow-lg border border-[#D4AF37]/50 shrink-0">
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Wholesale & Trade Supply
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-lg">
            Architectural Aluminium & Hardware
          </h1>

          {/* Supporting Copy */}
          <p className="text-xs sm:text-lg text-slate-100 font-normal leading-relaxed max-w-xl drop-shadow-md">
            Direct wholesale supplier of high-precision extrusions, door systems, locks & fittings for fabricators and contractors across Raipur.
          </p>

          {/* Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5">
            <button
              type="button"
              onClick={() => openEnquiryModal()}
              className="px-5 py-3 sm:px-6 sm:py-3.5 bg-[#B8860B] hover:bg-[#a07509] active:bg-[#8A6408] text-white font-bold text-xs uppercase tracking-wider rounded-xl sm:rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 self-start shrink-0 select-none relative z-30 pointer-events-auto"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <Link
              href="/products"
              className="px-5 py-3 sm:px-6 sm:py-3.5 bg-black/40 hover:bg-black/60 text-white font-semibold text-xs uppercase tracking-wider rounded-xl sm:rounded-lg border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 self-start shrink-0"
            >
              <Layers className="w-4 h-4 text-slate-300" />
              <span>Browse Catalog</span>
            </Link>
          </div>

          {/* Factual Footnote */}
          <div className="pt-2 sm:pt-4 flex items-center justify-between sm:justify-start gap-3 sm:gap-6 text-[10px] sm:text-xs text-slate-200 font-medium drop-shadow-sm">
            <span>Branch: Finetek • Raipur</span>
            <span className="hidden sm:inline">•</span>
            <span>86+ SKUs In Stock</span>
          </div>
        </div>
      </div>
    </section>
  );
}
