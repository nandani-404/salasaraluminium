'use client';

import React from 'react';
import { BUSINESS, TEL_HREF } from '@/config/business';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ShieldCheck, Factory, Truck, CheckCircle2, MapPin, Building2, PhoneCall, ExternalLink } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_BUSINESS_DETAILS } from '@/lib/sahData';
import FAQSection from '@/components/FAQSection';


export default function AboutClient() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <div className="pt-16 sm:pt-28 bg-white">
      {/* Premium Unique Architectural About Us Section */}
      <div className="bg-white border-b border-[#E2E8F0] py-8 sm:py-20 relative overflow-hidden">
        
        {/* Subtle Decorative Background Geometric Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Column: Title, Story & Core Features (order-2 on mobile, order-1 on desktop) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
              
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
              <div className="space-y-4 text-base sm:text-lg text-[#334155] font-medium leading-relaxed">
                <p>
                  <strong className="text-[#0B1F3A] underline decoration-[#B8860B]/40 underline-offset-4">Salasar Aluminium &amp; Hardware</strong> supplies aluminium door and window hardware from a counter in Bhaisthan, Raipur. We sell to the trade — dealers, fabricators and contractors — at trade rates, and to homeowners, architects, interior designers and builders buying for a single project. There is no minimum order at the counter.
                </p>
                <p className="text-sm sm:text-base text-[#475569]">
                  Everything we stock carries a fixed SA code, so an order is unambiguous: SA-33 is the aluminium door kit, SA-42 the hydraulic door closer, SA-76 the 90&deg; wall-to-glass shower hinge. If you do not know the code, bring the old part in or send a photograph on WhatsApp and we will identify it. Aluminium window and door sections vary between fabricators, so matching a physical part beats matching a description.
                </p>
              </div>

              {/* Unique Dual Feature Cards with Metallic Accent Borders */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-1">
                <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs hover:border-[#B8860B]/50 transition-all group relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#B8860B]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center mb-2 sm:mb-3 shadow-xs group-hover:bg-[#8A6408] group-hover:text-white transition-colors">
                      <Factory className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1F3A] mb-1 leading-tight">One counter, real stock</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#64748B] leading-relaxed">
                    Everything we list is held at the Bhaisthan counter, so you can match a part by hand before you buy it.
                  </p>
                </div>

                <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs hover:border-[#B8860B]/50 transition-all group relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#B8860B]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center mb-2 sm:mb-3 shadow-xs group-hover:bg-[#8A6408] group-hover:text-white transition-colors">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1F3A] mb-1 leading-tight">Trade and single-project</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#64748B] leading-relaxed">
                    Box and bulk quantities for dealers and fabricators, single pieces for a homeowner fixing one window.
                  </p>
                </div>
              </div>

              {/* Mobile-Only: Trade Desk & Counter Hours under the About content */}
              <div className="lg:hidden space-y-3 pt-2">
                {/* Bottom Floating Stats Tag */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between shadow-2xs">
                  <div className="flex items-center space-x-3">
                    <PhoneCall className="w-5 h-5 text-[#8A6408]" />
                    <div>
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Trade Desk / Inquiry</span>
                      <a href={TEL_HREF} className="text-xs font-extrabold text-[#0B1F3A] hover:text-[#8A6408] transition-colors">
                        Abhishek: {BUSINESS.phones.primary.display}
                      </a>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 bg-[#B8860B]/10 rounded-md text-[#8A6408] font-bold text-[10px] uppercase">
                    Wholesale
                  </div>
                </div>

                {/* Quick Counter Timing & Stock Info Card */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                    <span className="text-[#64748B] font-medium">Counter Hours:</span>
                    <span className="font-bold text-[#0B1F3A]">{BUSINESS.hours.display}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
                    <div className="bg-[#F8FAFC] p-2 rounded-xl border border-slate-100">
                      <span className="block text-xs font-black text-[#0B1F3A]">86+</span>
                      <span className="text-[9px] text-[#64748B] font-medium">SKUs In Stock</span>
                    </div>
                    <div className="bg-[#F8FAFC] p-2 rounded-xl border border-slate-100">
                      <span className="block text-xs font-black text-[#0B1F3A]">0 MOQ</span>
                      <span className="text-[9px] text-[#64748B] font-medium">At Counter</span>
                    </div>
                    <div className="bg-[#F8FAFC] p-2 rounded-xl border border-slate-100">
                      <span className="block text-xs font-black text-[#8A6408]">Same-Day</span>
                      <span className="text-[9px] text-[#64748B] font-medium">Dispatch</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Unique Architectural Storefront Frame (order-1 on mobile, order-2 on desktop) */}
            <div className="lg:col-span-5 relative order-1 lg:order-2 self-start">
              <div className="relative mx-auto max-w-md lg:max-w-none space-y-4">
                
                {/* Main Card Frame */}
                <div className="relative rounded-2xl sm:rounded-3xl bg-slate-950 border border-[#D4AF37]/40 overflow-hidden p-2 sm:p-3 group shadow-lg">
                  
                  {/* Storefront Image Container */}
                  <div className="relative h-[250px] sm:h-[360px] lg:h-[380px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
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

                    {/* Floating Badge 1: Verified Hub */}
                    <div className="absolute top-3 right-3 bg-white/95 border border-slate-200 px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-extrabold text-[#0B1F3A] uppercase tracking-wider">
                        Raipur Direct Hub
                      </span>
                    </div>

                    {/* Floating Badge 2: Bottom Address Overlay */}
                    <a
                      href={SAH_BUSINESS_DETAILS.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 left-4 right-4 bg-white p-3.5 rounded-xl border border-slate-200 block hover:border-[#C9A227] hover:shadow-md transition-all group cursor-pointer"
                      title="Open store on Google Maps"
                    >
                      <div className="flex items-start space-x-2.5">
                        <div className="p-1.5 rounded-lg bg-[#0B1F3A] text-[#D4AF37] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[#0B1F3A] uppercase tracking-wider block">
                              Raipur Main Outlet
                            </span>
                            <ExternalLink className="w-3 h-3 text-[#C9A227] shrink-0 ml-1" />
                          </div>
                          <p className="text-xs text-[#475569] font-medium leading-tight mt-0.5 line-clamp-2">
                            {SAH_BUSINESS_DETAILS.address}
                          </p>
                        </div>
                      </div>
                    </a>

                  </div>

                </div>

                {/* Desktop-Only in Right Column: Trade Desk & Counter Hours */}
                <div className="hidden lg:block space-y-4">
                  {/* Bottom Floating Stats Tag */}
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between shadow-2xs">
                    <div className="flex items-center space-x-3">
                      <PhoneCall className="w-5 h-5 text-[#8A6408]" />
                      <div>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Trade Desk / Inquiry</span>
                        <a href={TEL_HREF} className="text-xs font-extrabold text-[#0B1F3A] hover:text-[#8A6408] transition-colors">
                          Abhishek: {BUSINESS.phones.primary.display}
                        </a>
                      </div>
                    </div>
                    <div className="px-2.5 py-1 bg-[#B8860B]/10 rounded-md text-[#8A6408] font-bold text-[10px] uppercase">
                      Wholesale
                    </div>
                  </div>

                  {/* Quick Counter Timing & Stock Info Card */}
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                      <span className="text-[#64748B] font-medium">Counter Hours:</span>
                      <span className="font-bold text-[#0B1F3A]">{BUSINESS.hours.display}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
                      <div className="bg-[#F8FAFC] p-2 rounded-xl border border-slate-100">
                        <span className="block text-xs font-black text-[#0B1F3A]">86+</span>
                        <span className="text-[9px] text-[#64748B] font-medium">SKUs In Stock</span>
                      </div>
                      <div className="bg-[#F8FAFC] p-2 rounded-xl border border-slate-100">
                        <span className="block text-xs font-black text-[#0B1F3A]">0 MOQ</span>
                        <span className="text-[9px] text-[#64748B] font-medium">At Counter</span>
                      </div>
                      <div className="bg-[#F8FAFC] p-2 rounded-xl border border-slate-100">
                        <span className="block text-xs font-black text-[#8A6408]">Same-Day</span>
                        <span className="text-[9px] text-[#64748B] font-medium">Dispatch</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Full-Width 2-Column Section: Related Businesses & Company Facts */}
          <div className="mt-10 sm:mt-14 pt-8 sm:pt-12 border-t border-[#E2E8F0] grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Related Businesses Card */}
            <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3.5">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-[#8A6408]" />
                <h2 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider">
                  Related businesses, and what each one is
                </h2>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                You may see these names alongside ours. This is how they relate.
              </p>
              <dl className="space-y-3 pt-1">
                {BUSINESS.entities.map((entity) => (
                  <div key={entity.name} className="text-xs leading-relaxed pb-2.5 border-b border-slate-100 last:border-0 last:pb-0">
                    <dt className="font-bold text-[#0B1F3A]">{entity.name}</dt>
                    <dd className="text-[#475569] mt-0.5">{entity.role}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs text-[#64748B] leading-relaxed pt-2 border-t border-[#E2E8F0]">
                Whichever name is on the invoice, the counter is the same one:{' '}
                <span className="font-medium text-[#0B1F3A]">{BUSINESS.addressLine}</span>
              </p>
            </section>

            {/* Company Facts Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#8A6408]" />
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider">Company Facts & Trade Overview</h3>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Key operational specifications for fabricators, contractors and project buyers.
                </p>
                <dl className="space-y-3 pt-1">
                  <div className="text-xs leading-relaxed pb-2.5 border-b border-slate-200/60">
                    <dt className="font-bold text-[#0B1F3A]">Counter & Stock Point</dt>
                    <dd className="text-[#475569] mt-0.5">{BUSINESS.addressLine}</dd>
                  </div>
                  <div className="text-xs leading-relaxed pb-2.5 border-b border-slate-200/60">
                    <dt className="font-bold text-[#0B1F3A]">Operating Hours</dt>
                    <dd className="text-[#475569] mt-0.5">{BUSINESS.hours.display}</dd>
                  </div>
                  <div className="text-xs leading-relaxed pb-2.5 border-b border-slate-200/60">
                    <dt className="font-bold text-[#0B1F3A]">Catalogue Inventory</dt>
                    <dd className="text-[#475569] mt-0.5">86 items across 12 specialized categories, each with a fixed SA code</dd>
                  </div>
                  <div className="text-xs leading-relaxed pb-2.5 border-b border-slate-200/60">
                    <dt className="font-bold text-[#0B1F3A]">Eligible Buyers</dt>
                    <dd className="text-[#475569] mt-0.5">Trade rates for fabricators & dealers; single-piece supply for individual projects</dd>
                  </div>
                  <div className="text-xs leading-relaxed">
                    <dt className="font-bold text-[#0B1F3A]">Pricing Policy</dt>
                    <dd className="text-[#475569] mt-0.5">Direct wholesale trade rates quoted on enquiry based on quantity, volume & finish</dd>
                  </div>
                </dl>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Have an old part to match?</span>
                <a
                  href={`https://wa.me/${BUSINESS.phones.primary.whatsapp}?text=${encodeURIComponent('Hello Salasar Hardware, I would like to identify an aluminium hardware part.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0B1F3A] hover:text-[#8A6408] flex items-center space-x-1 transition-colors"
                >
                  <span>Identify on WhatsApp →</span>
                </a>
              </div>
            </div>

          </div>

          {/* Full-Width Quote Banner */}
          <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0B1F3A] via-[#11284A] to-[#1E293B] text-white shadow-md flex items-center space-x-4 sm:space-x-5 border border-[#0B1F3A]">
            <span className="text-4xl sm:text-5xl font-serif text-[#D4AF37] leading-none select-none">“</span>
            <p className="text-xs sm:text-base font-medium text-slate-200 leading-relaxed">
              With your trust and support, <span className="text-[#D4AF37] font-bold">Salasar Aluminium &amp; Hardware</span> continues to grow and reach new heights.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars Section - Minimal & Ultra-Clean */}
      <div className="bg-white py-8 sm:py-18 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header - Centered Minimal Layout */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 space-y-2 sm:space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#B8860B]/10 border border-[#B8860B]/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              <span className="text-xs font-bold text-[#8A6408] uppercase tracking-wider">
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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {SAH_BUSINESS_DETAILS.pillars.map((pillar, idx) => {
              const icons = [ShieldCheck, Award, Factory, Truck];
              const IconComp = icons[idx % icons.length];

              return (
                <div 
                  key={idx} 
                  className="p-3 sm:p-5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0B1F3A] transition-colors group flex flex-col justify-between"
                >
                  <div className="space-y-1.5 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <IconComp className="w-4 h-4 sm:w-5 sm:h-5 text-[#8A6408]" />
                      <span className="text-[10px] sm:text-xs font-mono text-[#64748B] group-hover:text-[#0B1F3A] transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-[#0B1F3A] leading-tight">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-[10px] sm:text-xs text-[#475569] leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* About Page FAQ Block */}
      <FAQSection
        title="Frequently asked questions about Salasar Aluminium."
        faqs={[
          {
            question: 'Where is Salasar Aluminium & Hardware manufactured?',
            answer: 'We are a supplier and stockist. Products are sourced from manufacturers and held at our Raipur counter, where they are sold to trade buyers and to individual buyers. [CONFIRM] The exact relationship with Swastik Industries, Lieon Marketing and Finetek is set out in the Related Businesses section on this page and needs owner confirmation.',
            category: 'Manufacturing',
          },
          {
            question: 'How long has Salasar Aluminium & Hardware been supplying the trade in Chhattisgarh?',
            answer: 'We have been serving dealers, fabricators, and building contractors across Chhattisgarh with reliable trade supply for over 15+ years.',
            category: 'Heritage',
          },
          {
            question: 'Can architects and project developers order directly, or only fabricators?',
            answer: 'We supply directly to architects, contractors, fabricators, dealers, and project developers — any trade buyer placing a wholesale order.',
            category: 'Trade Supply',
          },
        ]}
      />


      {/* Direct Wholesale CTA - Compact Height Section */}
      <div className="relative py-12 sm:py-16 overflow-hidden bg-slate-950 border-t border-[#E2E8F0] text-white">
        
        {/* Brand New Unique Background Image */}
        {/*
          `priority` removed. This is a decorative background on a CTA band at
          the very bottom of the page, so preloading it made it compete with the
          real LCP image higher up — two priority images on one page halves the
          benefit of having any. It loads lazily like any other below-fold image.
        */}
        <Image
          src="/hardware-showcase-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80"
          loading="lazy"
        />

        {/* Overlay */}
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
                href={TEL_HREF}
                className="w-full sm:w-auto px-7 py-4 bg-black/60 hover:bg-black/80 border border-white/40 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 backdrop-blur-md flex items-center justify-center space-x-2.5 cursor-pointer shadow-xl" data-analytics="click_call" data-analytics-location="about">
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
