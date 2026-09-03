'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { products, Product } from '@/lib/data/products';
import { MegaMenu } from './MegaMenu';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F0]/95 backdrop-blur-md shadow-luxury border-b border-[#D8D1C4]'
          : 'bg-[#FAF7F0] border-b border-[#D8D1C4]/60'
      }`}
    >
      {/* Top Trade Notification Bar */}
      <div className="bg-[#2B2620] text-[#FAF7F0] py-2 px-4 text-[11px] uppercase tracking-widest text-center">
        <span>Trade Accounts & Bulk Commercial Quotations Available &nbsp;|&nbsp; </span>
        <Link href="/contact" className="text-[#B08D57] hover:underline font-medium ml-1">
          Request Trade Pricing →
        </Link>
      </div>

      <div className="container-luxury relative flex items-center justify-between h-20">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[#2B2620] focus-ring"
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex flex-col items-start focus-ring group">
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[#2B2620] group-hover:text-[#B08D57] transition-colors">
            SALASAR
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
            Aluminium & Hardware
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest text-[#2B2620]">
          <div
            className="relative py-7 cursor-pointer flex items-center gap-1 hover:text-[#B08D57] transition-colors"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
          >
            <span>Catalog & Segments</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <Link href="/residential" className="hover:text-[#B08D57] transition-colors">
            Residential
          </Link>
          <Link href="/commercial" className="hover:text-[#B08D57] transition-colors">
            Commercial
          </Link>
          <Link href="/industrial" className="hover:text-[#B08D57] transition-colors">
            Industrial
          </Link>
          <Link href="/about" className="hover:text-[#B08D57] transition-colors">
            Craftsmanship
          </Link>
          <Link href="/contact" className="hover:text-[#B08D57] transition-colors">
            Trade & Contact
          </Link>
        </nav>

        {/* Action Button: Enquire Now */}
        <div className="flex items-center space-x-5">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-[#2B2620] hover:text-[#B08D57] transition-colors focus-ring"
            aria-label="Search Catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Enquire Button */}
          <Link
            href="/contact"
            className="px-4 py-2 bg-[#2B2620] hover:bg-[#B08D57] text-[#FAF7F0] text-xs uppercase tracking-widest transition-colors font-medium"
          >
            Enquire Now
          </Link>
        </div>

        {/* Hover MegaMenu */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </div>

      {/* Live Autosuggest Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#D8D1C4] shadow-luxury p-6 z-50 animate-fadeIn">
          <div className="container-luxury max-w-3xl relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#B08D57]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by alloy, finish, SKU (e.g. Palazzo, EN AW-6063, Gold)..."
                className="w-full pl-12 pr-10 py-4 bg-[#FAF7F0] border border-[#D8D1C4] text-sm text-[#2B2620] focus-ring"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 text-[#2B2620]/60 hover:text-[#2B2620]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Autosuggest Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 bg-[#FFFFFF] border border-[#D8D1C4] max-h-80 overflow-y-auto divide-y divide-[#D8D1C4]">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center p-3 hover:bg-[#FAF7F0] transition-colors gap-4"
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm text-[#2B2620]">{product.name}</h4>
                      <p className="text-xs text-[#2B2620]/60">
                        {product.sku} &nbsp;|&nbsp; {product.material} &nbsp;|&nbsp; ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F0] border-b border-[#D8D1C4] px-6 py-6 space-y-4 text-sm uppercase tracking-wider">
          <Link
            href="/residential"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 border-b border-[#D8D1C4]/40"
          >
            Residential Hardware
          </Link>
          <Link
            href="/commercial"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 border-b border-[#D8D1C4]/40"
          >
            Commercial Fittings
          </Link>
          <Link
            href="/industrial"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 border-b border-[#D8D1C4]/40"
          >
            Industrial Extrusions
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 border-b border-[#D8D1C4]/40"
          >
            Craftsmanship
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2"
          >
            Trade Quotes & Contact
          </Link>
        </div>
      )}
    </header>
  );
}
