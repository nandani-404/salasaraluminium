import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Clock, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2B2620] text-[#FAF7F0] pt-16 pb-12 border-t border-[#B08D57]/30">
      <div className="container-luxury space-y-16">
        {/* Brand Promise Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#D8D1C4]/20 text-center md:text-left">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-[#B08D57] flex-shrink-0" />
            <div>
              <h4 className="font-serif text-lg text-[#FAF7F0]">Certified Alloys</h4>
              <p className="text-xs text-[#FAF7F0]/70 mt-1 leading-relaxed">
                Extruded from EN AW-6063 T6 & Zamak 5 alloys meeting strict BIS & CE international standards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-[#B08D57] flex-shrink-0" />
            <div>
              <h4 className="font-serif text-lg text-[#FAF7F0]">5-Year Guarantee</h4>
              <p className="text-xs text-[#FAF7F0]/70 mt-1 leading-relaxed">
                Every residential and commercial fitting is backed by our comprehensive warranty.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="w-8 h-8 text-[#B08D57] flex-shrink-0" />
            <div>
              <h4 className="font-serif text-lg text-[#FAF7F0]">Direct Trade Quotations</h4>
              <p className="text-xs text-[#FAF7F0]/70 mt-1 leading-relaxed">
                Dedicated trade desk for architects, façade consultants, and industrial procurement.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F0]">
                SALASAR
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
                Aluminium & Hardware
              </span>
            </Link>
            <p className="text-xs text-[#FAF7F0]/70 max-w-sm leading-relaxed">
              India’s premier architectural hardware showroom and custom aluminium extrusion specialist. Serving residential, commercial, and industrial clients with precision engineering since 1994.
            </p>
            <div className="pt-2">
              <span className="eyebrow text-[#B08D57]">Showroom & Experience Centre</span>
              <p className="text-xs text-[#FAF7F0]/80 mt-1">
                102 Hardware Galleria, SV Road, Mumbai, MH 400053
              </p>
            </div>
          </div>

          {/* Quick Links: Residential */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#FAF7F0] uppercase tracking-wider">Residential</h4>
            <ul className="space-y-2 text-xs text-[#FAF7F0]/70">
              <li><Link href="/residential/door-handles" className="hover:text-[#B08D57] transition-colors">Door Handles</Link></li>
              <li><Link href="/residential/window-handles" className="hover:text-[#B08D57] transition-colors">Window Handles</Link></li>
              <li><Link href="/residential/sliding-systems" className="hover:text-[#B08D57] transition-colors">Sliding Systems</Link></li>
              <li><Link href="/residential/wardrobe-systems" className="hover:text-[#B08D57] transition-colors">Wardrobe Hardware</Link></li>
            </ul>
          </div>

          {/* Quick Links: Commercial */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#FAF7F0] uppercase tracking-wider">Commercial</h4>
            <ul className="space-y-2 text-xs text-[#FAF7F0]/70">
              <li><Link href="/commercial/glass-hardware" className="hover:text-[#B08D57] transition-colors">Glass Hardware</Link></li>
              <li><Link href="/commercial/curtain-wall" className="hover:text-[#B08D57] transition-colors">Curtain Wall Profiles</Link></li>
              <li><Link href="/commercial/door-closers" className="hover:text-[#B08D57] transition-colors">Floor Springs & Closers</Link></li>
              <li><Link href="/commercial/window-systems" className="hover:text-[#B08D57] transition-colors">Commercial Windows</Link></li>
            </ul>
          </div>

          {/* Quick Links: Industrial & Corporate */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#FAF7F0] uppercase tracking-wider">Industrial & Trade</h4>
            <ul className="space-y-2 text-xs text-[#FAF7F0]/70">
              <li><Link href="/industrial/t-slot-profiles" className="hover:text-[#B08D57] transition-colors">T-Slot Extrusions</Link></li>
              <li><Link href="/industrial/conveyor-profiles" className="hover:text-[#B08D57] transition-colors">Conveyor Systems</Link></li>
              <li><Link href="/industrial/solar-profiles" className="hover:text-[#B08D57] transition-colors">Solar Racking</Link></li>
              <li><Link href="/about" className="hover:text-[#B08D57] transition-colors">Brand Story</Link></li>
              <li><Link href="/contact" className="hover:text-[#B08D57] transition-colors flex items-center gap-1 text-[#B08D57]">Trade Account <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-[#D8D1C4]/20 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#FAF7F0]/50 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Salasar Aluminium & Hardware Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-[#B08D57] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#B08D57] transition-colors cursor-pointer">Terms of Supply</span>
            <span className="hover:text-[#B08D57] transition-colors cursor-pointer">BIS & ISO Certifications</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
