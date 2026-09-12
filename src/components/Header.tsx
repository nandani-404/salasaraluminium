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
} from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_CATEGORIES, SAH_BUSINESS_DETAILS } from '@/lib/sahData';

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

  // Exact page names and paths matching top navbar on web view
  const topNavPages = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Industries', href: '/industries-we-serve' },
    { name: 'Why Us', href: '/why-choose-us' },
    { name: 'Wholesale', href: '/wholesale' },
    { name: 'Locations', href: '/locations' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
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

      {/* Mobile Small Right-Side Popup Menu via Portal (strictly mobile only, unaffected in desktop) */}
      {mounted && mobileMenuOpen && createPortal(
        <div 
          className="fixed inset-0 z-[99999] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Dimmed backdrop - tap to close popup */}
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Small Right-Side Popup Menu */}
          <div className="fixed top-0 right-0 bottom-0 z-10 w-[260px] max-w-[78vw] h-full bg-white shadow-2xl flex flex-col border-l border-slate-200">
            {/* Header: Menu title & Close button */}
            <div className="px-4 py-3.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-4 bg-[#D4AF37] rounded-full" />
                <span className="font-bold text-sm text-[#0B1F3A] tracking-wide">Menu</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-lg active:scale-90 transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Normal Clean List of Top Navbar Pages */}
            <nav className="flex-1 overflow-y-auto py-2 divide-y divide-slate-100">
              {topNavPages.map((page) => {
                const isActive = page.href === '/' ? pathname === '/' : pathname?.startsWith(page.href);
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#0B1F3A] font-bold bg-amber-50/70 border-l-4 border-l-[#D4AF37]'
                        : 'text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50'
                    }`}
                  >
                    <span>{page.name}</span>
                    <ChevronRight
                      className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-300'}`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Bottom: Request Trade Quote CTA matching web top navbar action */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/50 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal();
                }}
                className="w-full py-2.5 px-3 bg-[#0B1F3A] text-[#D4AF37] text-xs font-bold uppercase tracking-wider rounded-lg text-center shadow-2xs active:scale-95 transition-transform cursor-pointer"
              >
                Request Trade Quote
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}

