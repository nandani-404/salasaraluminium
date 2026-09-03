'use client';

import React from 'react';
import Link from 'next/link';
import { SAH_BUSINESS_DETAILS, SAH_CATEGORIES } from '@/lib/sahData';
import { MapPin, Phone, Building2, Factory } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

export default function Footer() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <footer className="bg-[#0B1F3A] text-white pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3.5 group">
              {/* Logo Emblem with White Background */}
              <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 shadow-md border border-[#D4AF37]/60">
                <svg viewBox="0 0 44 44" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="footerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B8860B" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#AA771C" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer Beam Geometry in Gold */}
                  <path d="M22 4L38 12V32L22 40L6 32V12L22 4Z" stroke="url(#footerGoldGrad)" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M6 12L22 20L38 12" stroke="url(#footerGoldGrad)" strokeWidth="1.2" opacity="0.6" />

                  {/* SAH Gold Monogram Text */}
                  <text x="22" y="27" textAnchor="middle" fill="url(#footerGoldGrad)" fontSize="13" fontWeight="900" letterSpacing="0.8">
                    SAH
                  </text>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-tight">
                  SALASAR
                </span>
                <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-semibold">
                  Aluminium & Hardware
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-normal">
              Wholesale manufacturer & direct supplier of high-tensile aluminium extrusions, door kits, locks, closers, and structural fittings in Raipur.
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Factory className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Branch: <strong className="text-white font-semibold">Finetek, Raipur</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Showroom: <strong className="text-white font-semibold">Raipur Main Hardware Hub</strong></span>
              </div>
            </div>
          </div>

          {/* Categories 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 pb-1 border-b border-white/10">
              Hardware Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {SAH_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products#${cat.slug}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 pb-1 border-b border-white/10">
              Fittings & Seals
            </h4>
            <ul className="space-y-2 text-xs">
              {SAH_CATEGORIES.slice(6, 12).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products#${cat.slug}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Raipur Showroom Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 pb-1 border-b border-white/10">
              Raipur Store Desk
            </h4>
            <div className="flex items-start space-x-2 text-xs text-slate-300 leading-relaxed">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>{SAH_BUSINESS_DETAILS.address}</span>
            </div>

            <div className="pt-1 text-xs text-slate-300">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>+91 8007443071 / +91 9079332560</span>
              </div>
            </div>

            <button
              onClick={() => openEnquiryModal()}
              className="mt-2 w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
            >
              Request Bulk Quote
            </button>
          </div>

        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 {SAH_BUSINESS_DETAILS.brandName}. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <Link href="/wholesale" className="hover:text-white transition-colors">Trade Desk</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Showroom</Link>
            <span>•</span>
            <Link href="/llms.txt" className="hover:text-white transition-colors">LLM Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
