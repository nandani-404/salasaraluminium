'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, PhoneCall } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_CATEGORIES, SAH_BUSINESS_DETAILS } from '@/lib/sahData';

export default function Header() {
  const pathname = usePathname();
  const { openEnquiryModal } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Wholesale Trade', href: '/wholesale' },
    { name: 'Resources & FAQs', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#E2E8F0] py-3.5'
          : 'bg-white/80 backdrop-blur-md border-b border-[#E2E8F0]/60 py-4 shadow-sm'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between relative">
        {/* Left: Brand Logo & Monogram */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3.5 group">
            {/* Elegant Navy & Gold Extruded Emblem */}
            <div className="relative w-10 h-10 bg-[#0B1F3A] rounded-xl flex items-center justify-center p-1 shadow-md border border-[#C9A227]/40 group-hover:border-[#D4AF37] transition-all">
              <svg viewBox="0 0 44 44" fill="none" className="w-full h-full">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F3E5AB" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#AA771C" />
                  </linearGradient>
                </defs>
                
                {/* Outer Beam Geometry in Gold */}
                <path d="M22 4L38 12V32L22 40L6 32V12L22 4Z" stroke="url(#goldGrad)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M6 12L22 20L38 12" stroke="url(#goldGrad)" strokeWidth="1.2" opacity="0.6" />

                {/* SAH Gold Monogram Text */}
                <text x="22" y="27" textAnchor="middle" fill="url(#goldGrad)" fontSize="13" fontWeight="900" fontFamily="var(--font-plus-jakarta), sans-serif" letterSpacing="0.8">
                  SAH
                </text>
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="font-serif font-black text-lg tracking-tight text-[#0B1F3A] leading-none group-hover:text-[#9A7B1C] transition-colors">
                  SALASAR
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>
              <span className="text-[8px] tracking-[0.2em] text-[#B8860B] uppercase font-extrabold mt-0.5">
                Aluminium & Hardware
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links centered across navbar */}
        <nav className="hidden lg:flex flex-1 items-center justify-center space-x-8 px-6">
          <Link
            href="/"
            className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#0B1F3A] ${
              pathname === '/' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-1' : 'text-[#475569]'
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#0B1F3A] ${
              pathname === '/about' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-1' : 'text-[#475569]'
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
              className={`inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#0B1F3A] ${
                pathname.startsWith('/products') ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-1' : 'text-[#475569]'
              }`}
            >
              <span>Products</span>
              <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
            </Link>

            {megaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[820px] bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-6 grid grid-cols-3 gap-3 z-50 normal-case">
                <div className="col-span-3 pb-3 mb-1 border-b border-[#E2E8F0] flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0F172A]">
                    Standardized 86-SKU Product Range
                  </span>
                  <Link
                    href="/products"
                    className="text-xs text-[#0F172A] font-bold hover:underline"
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
            href="/wholesale"
            className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#0B1F3A] ${
              pathname === '/wholesale' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-1' : 'text-[#475569]'
            }`}
          >
            Wholesale Trade
          </Link>

          <Link
            href="/blog"
            className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#0B1F3A] ${
              pathname === '/blog' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-1' : 'text-[#475569]'
            }`}
          >
            Resources
          </Link>

          <Link
            href="/contact"
            className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#0B1F3A] ${
              pathname === '/contact' ? 'text-[#0B1F3A] border-b-2 border-[#D4AF37] pb-1' : 'text-[#475569]'
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Right: Action Buttons pinned to far right corner */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href="tel:+918007443071"
            title="Click to call Salasar Aluminium Order Desk"
            className="text-xs font-semibold text-[#0B1F3A] flex items-center space-x-2 py-1.5 px-3.5 rounded-full bg-[#FAF9F6] border border-[#E8E6E1] hover:border-[#D4AF37] hover:bg-white transition-all group shadow-sm active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[9px] uppercase tracking-wider text-[#8C6B1B] font-extrabold">Call for Orders</span>
              <span className="font-sans text-xs tracking-normal text-[#0B1F3A] font-bold">8007443071</span>
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
            className="px-4 py-2 bg-[#0B1F3A] text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#1E293B] active:scale-95 border border-[#0B1F3A] transition-all shadow-sm hover:shadow whitespace-nowrap cursor-pointer"
          >
            <span>Request Trade Quote</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => openEnquiryModal()}
            className="px-3 py-1.5 bg-[#0F172A] text-white text-xs font-bold rounded"
          >
            Enquire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0B1F3A] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E8E6E1] px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#0B1F3A] py-2 border-b border-[#E8E6E1]/40 hover:text-[#C9A227]"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#0B1F3A] py-2 border-b border-[#E8E6E1]/40 hover:text-[#C9A227]"
          >
            All 11 Product Categories (86 SKUs)
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openEnquiryModal();
            }}
            className="w-full mt-4 py-3 bg-[#C9A227] text-[#0B1F3A] text-sm font-bold uppercase tracking-wider rounded-md text-center"
          >
            Request Trade Quote
          </button>
        </div>
      )}
    </header>
  );
}
