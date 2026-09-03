'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ShieldCheck, Factory, Truck, CheckCircle2, MapPin, Building2, PhoneCall } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_BUSINESS_DETAILS } from '@/lib/sahData';

export default function AboutPage() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <div className="pt-28 bg-white">
      {/* Premium Unique Architectural About Us Section */}
      <div className="bg-white border-b border-[#E2E8F0] py-14 sm:py-20 relative overflow-hidden">
        
        {/* Subtle Decorative Background Geometric Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Premium Architectural Narrative */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Badge & Title */}
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 rounded-full shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#B8860B] animate-pulse" />
                  <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest">
                    Company Profile & Trade Heritage
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-tight">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#B8860B]">Salasar Aluminium</span> & Hardware
                </h1>
                
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-1 bg-[#B8860B] rounded-full" />
                  <div className="w-3 h-1 bg-[#0B1F3A]/30 rounded-full" />
                </div>
              </div>

              {/* Main Copy Narrative */}
              <p className="text-base sm:text-lg text-[#334155] font-medium leading-relaxed">
                Welcome to <strong className="text-[#0B1F3A] underline decoration-[#B8860B]/40 underline-offset-4">Salasar Aluminium & Hardware</strong>. We are a premier wholesale manufacturer and direct distributor of high-grade architectural aluminium extrusions, hardware fittings, and door systems based in Raipur, Chhattisgarh.
              </p>

              {/* Unique Dual Feature Cards with Metallic Accent Borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs hover:border-[#B8860B]/50 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#B8860B]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                  <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center mb-3 shadow-sm group-hover:bg-[#B8860B] group-hover:text-white transition-colors">
                    <Factory className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] mb-1">Precision Manufacturing</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Produced by Swastik Industries (Mumbai) using modern extrusion techniques & strict ISO-grade quality standards.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs hover:border-[#B8860B]/50 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#B8860B]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                  <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center mb-3 shadow-sm group-hover:bg-[#B8860B] group-hover:text-white transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] mb-1">Direct Wholesale Hub</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Distributed via Lieon Marketing & SAH Raipur warehouse ensuring immediate stock readiness across Central India.
                  </p>
                </div>
              </div>

              {/* 4 Pillars Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
                  <ShieldCheck className="w-5 h-5 text-[#B8860B] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#0B1F3A] block">High-Grade Stock</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
                  <div className="w-5 h-5 border border-[#B8860B] text-[#B8860B] rounded font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
                    %
                  </div>
                  <span className="text-[11px] font-bold text-[#0B1F3A] block">Wholesale Rate</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
                  <Truck className="w-5 h-5 text-[#B8860B] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#0B1F3A] block">Fast Logistics</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs text-center">
                  <Award className="w-5 h-5 text-[#B8860B] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#0B1F3A] block">Top Satisfaction</span>
                </div>
              </div>

              {/* Quote Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#1E293B] text-white shadow-md flex items-center space-x-4 border border-[#0B1F3A]">
                <span className="text-4xl font-serif text-[#D4AF37] leading-none select-none">“</span>
                <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
                  With your trust and support, <span className="text-[#D4AF37] font-bold">Salasar Aluminium & Hardware</span> continues to grow and reach new heights.
                </p>
              </div>

            </div>

            {/* Right Column: Unique Architectural Storefront Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Card Frame */}
                <div className="relative rounded-3xl bg-slate-950 border border-[#D4AF37]/40 overflow-hidden p-3 group">
                  
                  {/* Storefront Image Container */}
                  <div className="relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                    <Image
                      src="/salasar-store-main.png"
                      alt="Salasar Aluminium & Hardware Storefront"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />

                    {/* Gradient Overlay for Text Overlay Clarity */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Badge 1: Verified Hub (Positioned to Top-Right to prevent text overlap) */}
                    <div className="absolute top-3 right-3 bg-white/95 border border-slate-200 px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-extrabold text-[#0B1F3A] uppercase tracking-wider">
                        Raipur Direct Hub
                      </span>
                    </div>

                    {/* Floating Badge 2: Bottom Address Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="flex items-start space-x-2.5">
                        <div className="p-1.5 rounded-lg bg-[#0B1F3A] text-[#D4AF37] shrink-0 mt-0.5">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-[#0B1F3A] uppercase tracking-wider block">
                            Raipur Main Outlet
                          </span>
                          <p className="text-xs text-[#475569] font-medium leading-tight mt-0.5 line-clamp-2">
                            {SAH_BUSINESS_DETAILS.address}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Bottom Floating Stats Tag */}
                <div className="mt-4 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <PhoneCall className="w-5 h-5 text-[#B8860B]" />
                    <div>
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Trade Desk / Inquiry</span>
                      <span className="text-xs font-extrabold text-[#0B1F3A]">Abhishek: +91 8007443071</span>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 bg-[#B8860B]/10 rounded-md text-[#B8860B] font-bold text-[10px] uppercase">
                    Wholesale
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4 Pillars Section - Minimal & Ultra-Clean */}
      <div className="bg-white py-14 sm:py-18 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header - Centered Minimal Layout */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#B8860B]/10 border border-[#B8860B]/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider">
                Core Brand Pillars
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Why Fabricators & Dealers Choose Salasar
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Built on certified precision extrusions, wholesale trade value, and fast dispatch.
            </p>
          </div>

          {/* Minimal Horizontal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SAH_BUSINESS_DETAILS.pillars.map((pillar, idx) => {
              const icons = [ShieldCheck, Award, Factory, Truck];
              const IconComp = icons[idx % icons.length];

              return (
                <div 
                  key={idx} 
                  className="p-5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0B1F3A] transition-colors group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <IconComp className="w-5 h-5 text-[#B8860B]" />
                      <span className="text-xs font-mono text-[#94A3B8] group-hover:text-[#0B1F3A] transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#0B1F3A]">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Direct Wholesale CTA - Compact Height Section */}
      <div className="relative py-12 sm:py-16 overflow-hidden bg-slate-950 border-t border-[#E2E8F0] text-white">
        
        {/* Brand New Unique Background Image (High Opacity) */}
        <Image
          src="/hardware-showcase-bg.png"
          alt="Architectural Hardware Trade Showcase"
          fill
          sizes="100vw"
          className="object-cover opacity-80"
          priority
        />

        {/* Reduced & Lightened Overlay for Maximum Background Image Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/35 to-slate-950/50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-white/25 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                Direct Wholesale Trade Desk
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-xl">
              Partner With Salasar Aluminium & Hardware
            </h2>

            <p className="text-sm sm:text-base text-slate-100 leading-relaxed max-w-xl mx-auto font-semibold drop-shadow-md">
              Whether you are a retailer in Chhattisgarh or a distributor across India, request our wholesale trade pricing today.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => openEnquiryModal()}
                className="w-full sm:w-auto px-8 py-4 bg-[#B8860B] hover:bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95 shadow-2xl flex items-center justify-center space-x-2.5 group/btn cursor-pointer"
              >
                <span>Request Bulk Trade Quote</span>
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>

              <a
                href="tel:8007443071"
                className="w-full sm:w-auto px-7 py-4 bg-black/60 hover:bg-black/80 border border-white/40 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 backdrop-blur-md flex items-center justify-center space-x-2.5 cursor-pointer shadow-xl"
              >
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span>Call: +91 8007443071</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
