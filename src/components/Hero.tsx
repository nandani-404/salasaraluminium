'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Sparkles, Building2, MapPin, PhoneCall } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_BUSINESS_DETAILS } from '@/lib/sahData';
import HeroVideo from '@/components/HeroVideo';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { TEL_HREF, whatsappLink } from '@/config/business';

export default function Hero() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section className="relative min-h-[75vh] sm:min-h-[90vh] lg:min-h-screen flex items-center pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden bg-slate-950">
      {/* Full-width Autoplay Background Video */}
      <div className="absolute inset-0 z-0">
        <HeroVideo
          src="/salasar-workshop-hero.mp4"
          poster="/salasar-workshop-hero-poster.jpg"
          className="w-full h-full object-cover opacity-95"
        />
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
              Retail & Trade Supply in Raipur
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-[26px] sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.15] drop-shadow-lg">
            Aluminium & Glass Hardware Supplier in Raipur
          </h1>

          {/* Supporting Copy */}
          <p className="text-xs sm:text-lg text-slate-100 font-normal leading-relaxed max-w-xl drop-shadow-md">
            86 items in 12 categories: door and window hardware, glass and shower fittings, sealants, fasteners and mosquito mesh. Buy one piece at the counter or a box for your project.
          </p>

          {/* Action Buttons: Fast Phone/WhatsApp + Quote & Catalogue */}
          <div className="pt-2 space-y-2.5">
            <div className="grid grid-cols-2 gap-2.5 w-full sm:flex sm:flex-row sm:w-auto sm:items-center sm:gap-3.5">
              <a
                href={whatsappLink({ message: 'Hello Abhishek, I want wholesale rates and catalogue for aluminium hardware in Raipur.', source: '/', campaign: 'hero' })}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="click_whatsapp"
                data-analytics-location="hero"
                className="w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl sm:rounded-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg cursor-pointer active:scale-95 shrink-0 select-none relative z-30"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>WhatsApp Rates</span>
              </a>

              <a
                href={TEL_HREF}
                data-analytics="click_call"
                data-analytics-location="hero"
                className="w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3.5 bg-[#0B1F3A] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider rounded-xl sm:rounded-lg border border-[#D4AF37]/50 transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg cursor-pointer active:scale-95 shrink-0 select-none relative z-30"
              >
                <PhoneCall className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Call Abhishek</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2.5 w-full sm:flex sm:flex-row sm:w-auto sm:items-center sm:gap-3.5">
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => openEnquiryModal()}
                className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-3 bg-[#8A6408] hover:bg-[#6F5006] text-white font-semibold text-xs uppercase tracking-wider rounded-xl sm:rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0 select-none relative z-30"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-white shrink-0" />
              </button>

              <Link
                href="/products"
                className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-3 bg-black/40 hover:bg-black/60 text-white font-semibold text-xs uppercase tracking-wider rounded-xl sm:rounded-lg border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
              >
                <Layers className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>Catalogue (86 SKUs)</span>
              </Link>
            </div>
          </div>

          {/* Factual Footnote */}
          <div className="pt-2 sm:pt-4 flex items-center justify-between sm:justify-start gap-2 sm:gap-6 text-[10px] sm:text-xs text-slate-200 font-medium drop-shadow-sm">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Salasar Raipur
            </span>
            <span className="text-slate-400">•</span>
            <span>86 SKUs In Stock</span>
            <span className="text-slate-400">•</span>
            <span>Delivery across Chhattisgarh</span>
          </div>
        </div>
      </div>
    </section>
  );
}
