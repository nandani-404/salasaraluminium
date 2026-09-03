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
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-white text-[#0B1F3A] rounded-lg flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
                SAH
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-tight">
                  SALASAR
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
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
                <span>Unit: <strong className="text-white font-semibold">Swastik Industries, Mumbai</strong></span>
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
              <div className="flex items-center space-x-2">
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
