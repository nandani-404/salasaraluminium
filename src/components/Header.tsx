'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  PhoneCall,
  Home,
  Package,
  Building2,
  Sparkles,
  Shield,
  Layers,
  CheckCircle2,
  MapPin,
  HelpCircle,
  BookOpen,
  Award,
  Search,
} from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_CATEGORIES, SAH_BUSINESS_DETAILS } from '@/lib/sahData';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function Header() {
  const pathname = usePathname();
  const { openEnquiryModal } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile drawer if user resizes back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const primaryPhone = SAH_BUSINESS_DETAILS.contactPersons[0]?.phoneNumbers[0] || '+918007443071';
  const cleanPhone = primaryPhone.replace(/\D/g, '');

  const allMobilePages = [
    { name: 'Home', href: '/', icon: Home, desc: 'Overview & B2B trade hub' },
    { name: 'All Products (86 SKUs)', href: '/products', icon: Package, badge: '86 SKUs', desc: 'Standardized profiles & hardware' },
    { name: 'Wholesale Trade Supply', href: '/wholesale', icon: Building2, badge: 'B2B', desc: 'Factory pricing & bulk rates' },
    { name: 'Finishes & Colors', href: '/finishes', icon: Sparkles, badge: 'Finishes', desc: 'Anodized, CP & powder coating' },
    { name: 'Architectural Projects', href: '/projects', icon: Shield, badge: 'Projects', desc: 'Commercial & site installations' },
    { name: 'Industries We Serve', href: '/industries-we-serve', icon: Layers, desc: 'Fabricators, builders, dealers' },
    { name: 'Why Choose Salasar', href: '/why-choose-us', icon: CheckCircle2, desc: 'Raipur warehouse & same-day dispatch' },
    { name: 'Locations & Branches', href: '/locations', icon: MapPin, desc: 'Finetek Raipur, Bhilai, Durg' },
    { name: 'Frequently Asked Questions', href: '/faq', icon: HelpCircle, desc: 'MOQ, delivery & pricing answers' },
    { name: 'Hardware Blog', href: '/blog', icon: BookOpen, desc: 'Technical fabrication guides' },
    { name: 'About Salasar', href: '/about', icon: Award, desc: 'Company profile & heritage' },
    { name: 'Contact Order Desk', href: '/contact', icon: PhoneCall, desc: 'Direct trade phone & WhatsApp' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#E2E8F0] py-2.5'
          : 'bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]/60 py-3 shadow-xs'
      }`}
    >
      <div className="w-full px-3 sm:px-6 lg:px-8 flex items-center justify-between relative">
        {/* Left: Brand Logo & Monogram */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center space-x-2.5 group">
            {/* Elegant Navy & Gold Extruded Emblem */}
            <div className="relative w-9 h-9 bg-[#0B1F3A] rounded-xl flex items-center justify-center p-1 shadow-md border border-[#C9A227]/40 group-hover:border-[#D4AF37] transition-all shrink-0">
              <svg viewBox="0 0 44 44" fill="none" className="w-full h-full">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F3E5AB" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#AA771C" />
                  </linearGradient>
                </defs>
                
                <path d="M22 4L38 12V32L22 40L6 32V12L22 4Z" stroke="url(#goldGrad)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M6 12L22 20L38 12" stroke="url(#goldGrad)" strokeWidth="1.2" opacity="0.6" />

                <text x="22" y="27" textAnchor="middle" fill="url(#goldGrad)" fontSize="13" fontWeight="900" fontFamily="var(--font-plus-jakarta), sans-serif" letterSpacing="0.8">
                  SAH
                </text>
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="font-serif font-black text-base tracking-tight text-[#0B1F3A] leading-none group-hover:text-[#9A7B1C] transition-colors">
                  SALASAR
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>
              <span className="text-[7.5px] tracking-[0.18em] text-[#B8860B] uppercase font-extrabold mt-0.5">
                Aluminium & Hardware
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links (Untouched, visible on lg and up) */}
        <nav className="hidden lg:flex items-center justify-center space-x-2 xl:space-x-3.5 2xl:space-x-5 px-1">
          <Link
            href="/"
            className={`text-[11px] 2xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-[#0B1F3A] ${
              pathname === '/' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-0.5' : 'text-[#475569]'
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`text-[11px] 2xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-[#0B1F3A] ${
              pathname === '/about' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-0.5' : 'text-[#475569]'
            }`}
          >
            About Us
          </Link>

          {/* Mega Menu Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <Link
              href="/products"
              className={`inline-flex items-center space-x-1 text-[11px] 2xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-[#0B1F3A] ${
                pathname.startsWith('/products') ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-0.5' : 'text-[#475569]'
              }`}
            >
              <span>Products</span>
              <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
            </Link>

            {megaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-5 grid grid-cols-3 gap-2.5 z-50 normal-case">
                <div className="col-span-3 pb-2.5 mb-1 border-b border-[#E2E8F0] flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A]">
                    Standardized 86-SKU Product Range
                  </span>
                  <Link
                    href="/products"
                    className="text-[11px] text-[#0F172A] font-bold hover:underline"
                  >
                    View Full Catalogue →
                  </Link>
                </div>
                {SAH_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products#${cat.slug}`}
                    onClick={() => setMegaMenuOpen(false)}
                    className="p-2 rounded-md hover:bg-[#F8FAFC] transition-colors group flex flex-col"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#9A7B1C]">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 mt-0.5">
                      {cat.codePrefix}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/industries-we-serve"
            className={`text-[11px] 2xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-[#0B1F3A] ${
              pathname === '/industries-we-serve' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-0.5' : 'text-[#475569]'
            }`}
          >
            Industries
          </Link>

          <Link
            href="/why-choose-us"
            className={`text-[11px] 2xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-[#0B1F3A] ${
              pathname === '/why-choose-us' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-0.5' : 'text-[#475569]'
            }`}
          >
            Why Us
          </Link>

          <Link
            href="/wholesale"
            className={`text-[11px] 2xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-[#0B1F3A] ${
              pathname === '/wholesale' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-0.5' : 'text-[#475569]'
            }`}
          >
            Wholesale
          </Link>

          <Link
            href="/locations"
            className={`text-[11px] 2xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-[#0B1F3A] ${
              pathname.startsWith('/locations') ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-0.5' : 'text-[#475569]'
            }`}
          >
            Locations
          </Link>

          <Link
            href="/blog"
            className={`text-[11px] 2xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-[#0B1F3A] ${
              pathname === '/blog' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-0.5' : 'text-[#475569]'
            }`}
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className={`text-[11px] 2xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-[#0B1F3A] ${
              pathname === '/contact' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-0.5' : 'text-[#475569]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right: Desktop Action Buttons (visible on lg and up) */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-2.5 shrink-0">
          <a
            href={`tel:${cleanPhone}`}
            title="Click to call Salasar Aluminium Order Desk"
            className="text-xs font-semibold text-[#0B1F3A] flex items-center space-x-2 py-1.5 px-3 rounded-full bg-[#FAF9F6] border border-[#E8E6E1] hover:border-[#D4AF37] hover:bg-white transition-all group shadow-2xs active:scale-95 shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform shrink-0" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[8.5px] uppercase tracking-wider text-[#8C6B1B] font-extrabold">Call for Orders</span>
              <span className="font-sans text-[11px] tracking-tight text-[#0B1F3A] font-bold">8007443071</span>
            </div>
          </a>

          <button
            type="button"
            onClick={() => {
              if (pathname === '/') {
                const quoteSec = document.getElementById('trade-quote') || document.getElementById('wholesale-quote');
                if (quoteSec) {
                  quoteSec.scrollIntoView({ behavior: 'smooth' });
                  return;
                }
              }
              openEnquiryModal();
            }}
            title="Request Wholesale Trade Quote"
            className="px-3.5 py-2 bg-[#0B1F3A] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-[#1E293B] active:scale-95 border border-[#0B1F3A] transition-all shadow-2xs hover:shadow-xs whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>Request Trade Quote</span>
          </button>
        </div>

        {/* Mobile View Only: Direct Call & Hamburger Toggle (hidden on lg and up) */}
        <div className="lg:hidden flex items-center space-x-2">
          <a
            href={`tel:${cleanPhone}`}
            title="Call Salasar Order Desk"
            className="p-2 text-[#0B1F3A] bg-[#FAF9F6] border border-[#E8E6E1] hover:border-[#D4AF37] rounded-xl active:scale-90 transition-transform cursor-pointer shadow-2xs flex items-center justify-center"
            aria-label="Call Salasar Aluminium Order Desk"
          >
            <PhoneCall className="w-4 h-4 text-[#B8860B]" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-[#0B1F3A] bg-[#FAF9F6] border border-[#E8E6E1] hover:border-[#D4AF37] rounded-xl active:scale-90 transition-transform cursor-pointer shadow-2xs"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#0B1F3A] pointer-events-none" /> : <Menu className="w-5 h-5 text-[#0B1F3A] pointer-events-none" />}
          </button>
        </div>
      </div>

      {/* Mobile App Navigation Drawer via Portal (strictly mobile only, unaffected in desktop) */}
      {mounted && mobileMenuOpen && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-slate-950/70 backdrop-blur-sm flex flex-col justify-end lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop Tap to Dismiss */}
          <div
            className="fixed inset-0 bg-transparent -z-10"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Solid Full-Height Slide-In Drawer */}
          <div className="relative z-10 w-full h-full sm:h-[95vh] sm:max-w-md sm:ml-auto bg-white flex flex-col sm:rounded-l-2xl shadow-2xl overflow-hidden">
            {/* Top Brand & Close Bar */}
            <div className="pt-3 pb-3 px-4 bg-[#0B1F3A] text-white flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-[#1E293B] rounded-lg flex items-center justify-center border border-[#D4AF37] shrink-0">
                  <span className="text-[#D4AF37] text-xs font-black tracking-wider">SAH</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-black text-sm text-white tracking-wide leading-tight">
                    SALASAR ALUMINIUM
                  </span>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-[#D4AF37] font-extrabold uppercase tracking-wider">
                      Raipur Hub • 9 AM - 9 PM
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white bg-white/10 hover:bg-white/20 active:scale-90 rounded-xl transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            {/* Scrollable Nav Area */}
            <div className="p-4 space-y-4 flex-1 overflow-y-auto overscroll-contain bg-slate-50">
              {/* Quick Search Shortcut */}
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-600 shadow-2xs hover:border-[#D4AF37] active:scale-98 transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <Search className="w-4 h-4 text-[#B8860B]" />
                  <span className="font-medium text-slate-500">Search 86+ Hardware SKUs...</span>
                </div>
                <span className="px-2 py-0.5 bg-[#0B1F3A] text-[#D4AF37] text-[9.5px] font-bold rounded-md uppercase">
                  Browse
                </span>
              </Link>

              {/* All 12 Website Pages */}
              <div>
                <div className="flex items-center justify-between px-1 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B8860B]">
                    All Website Pages
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">12 Pages</span>
                </div>

                <div className="space-y-1.5">
                  {allMobilePages.map((page) => {
                    const Icon = page.icon;
                    const isActive = pathname === page.href;

                    return (
                      <Link
                        key={page.name}
                        href={page.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all active:scale-98 ${
                          isActive
                            ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                            : 'bg-white text-[#0B1F3A] border-slate-200 hover:bg-slate-100 hover:border-slate-300 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isActive ? 'bg-white/15 text-[#D4AF37]' : 'bg-slate-100 text-[#0B1F3A]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold truncate">{page.name}</span>
                              {page.badge && (
                                <span className={`px-1.5 py-0.5 text-[9px] font-extrabold rounded ${
                                  isActive ? 'bg-[#D4AF37] text-[#0B1F3A]' : 'bg-[#0B1F3A] text-[#D4AF37]'
                                }`}>
                                  {page.badge}
                                </span>
                              )}
                            </div>
                            <p className={`text-[10px] truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                              {page.desc}
                            </p>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isActive ? 'text-[#D4AF37]' : 'text-slate-400'
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Product Category Quick Jump Grid */}
              <div className="pt-2">
                <div className="flex items-center justify-between px-1 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B8860B]">
                    12 Hardware Categories
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">Quick Jump</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SAH_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products#${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 bg-white border border-slate-200 hover:border-[#D4AF37] rounded-xl flex flex-col justify-between active:scale-95 transition-all shadow-2xs group"
                    >
                      <span className="text-xs font-bold text-[#0B1F3A] group-hover:text-[#9A7B1C] truncate">
                        {cat.name}
                      </span>
                      <span className="text-[9.5px] text-[#B8860B] font-mono font-bold mt-1">
                        {cat.codePrefix}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Raipur Warehouse Info */}
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 text-slate-600 shadow-2xs">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-[#0B1F3A]">
                  <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Raipur Central Trade Depot</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Ring Road No. 2, Raipur, Chhattisgarh • Same-Day Dispatch
                </p>
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-3.5 border-t border-slate-200 bg-white space-y-2 shrink-0 pb-safe">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${primaryPhone.replace(/\s/g, '')}`}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-1.5 active:scale-98 transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span className="truncate">Call Desk</span>
                </a>
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Salasar Aluminium, I would like to inquire about hardware pricing and catalogue.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-1.5 active:scale-98 transition-all"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span className="truncate">WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal();
                }}
                className="w-full py-3 px-4 bg-[#0B1F3A] hover:bg-[#1E293B] text-[#D4AF37] text-xs font-black uppercase tracking-wider rounded-xl text-center shadow-md active:scale-98 transition-all cursor-pointer border border-[#D4AF37]/30 flex items-center justify-center space-x-1.5"
              >
                <span>Request Wholesale Trade Quote</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}

