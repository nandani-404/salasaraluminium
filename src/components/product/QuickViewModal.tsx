'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronRight, CheckCircle2, ShieldCheck, Sparkles, ZoomIn, ArrowLeft } from 'lucide-react';
import { SAHProduct } from '@/lib/sahData';
import { Product } from '@/lib/data/products';

interface QuickViewModalProps {
  product: SAHProduct | Product | null;
  onClose: () => void;
  onEnquire?: (saCode: string) => void;
}

export function QuickViewModal({ product, onClose, onEnquire }: QuickViewModalProps) {
  // Declare all hooks at top level unconditionally (React Rules of Hooks)
  const [mounted, setMounted] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      const finishes = 'finishes' in product && product.finishes ? product.finishes : ('finish' in product && product.finish ? [product.finish] : []);
      const sizes = ('sizes' in product && product.sizes) ? product.sizes : [];
      setSelectedFinish(finishes[0] || '');
      setSelectedSize(sizes[0] || '');
      setIsZoomed(false);
    } else {
      document.body.style.overflow = '';
      setSelectedFinish('');
      setSelectedSize('');
      setIsZoomed(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  // Early return ONLY after all hooks have been declared and initialized
  if (!mounted || !product) return null;

  const image = 'image' in product ? product.image : product.images[0];
  const saCode = 'saCode' in product ? product.saCode : product.sku;
  const categoryName = 'categoryName' in product ? product.categoryName : product.category;
  const shortDesc = 'shortDesc' in product ? product.shortDesc : product.shortDescription;
  const finishes = 'finishes' in product && product.finishes ? product.finishes : ('finish' in product && product.finish ? [product.finish] : []);
  const sizes = ('sizes' in product && product.sizes) ? product.sizes : [];
  const variants = ('variants' in product && product.variants) ? product.variants : [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y });
  };

  const getSwatchClass = (f: string) => {
    const lower = f.toLowerCase();
    if (lower.includes('matte black')) return 'bg-slate-950 border-slate-800';
    if (lower.includes('black')) return 'bg-slate-900 border-slate-700';
    if (lower.includes('grey') || lower.includes('gray')) return 'bg-slate-400 border-slate-500';
    if (lower.includes('brown')) return 'bg-[#4A2E1B] border-[#311E12]';
    if (lower.includes('ivory')) return 'bg-[#F5F2EB] border-[#D6CFC3]';
    if (lower.includes('white')) return 'bg-white border-slate-300';
    if (lower.includes('gold') || lower.includes('brass')) return 'bg-[#D4AF37] border-amber-600';
    if (lower.includes('cp') || lower.includes('chrome') || lower.includes('silver') || lower.includes('anodized')) return 'bg-gradient-to-br from-slate-200 via-slate-100 to-slate-400 border-slate-400';
    return 'bg-slate-200 border-slate-300';
  };

  const isDesktopZoom = isZoomed && typeof window !== 'undefined' && window.innerWidth >= 1024;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop Tap to Close */}
      <div 
        className="fixed inset-0 bg-transparent -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full h-full sm:h-auto sm:max-h-[92vh] max-w-4xl bg-white border-0 sm:border border-slate-200 rounded-none sm:rounded-3xl shadow-2xl p-4 sm:p-8 overflow-y-auto pb-28 sm:pb-8 flex flex-col justify-between">
        
        {/* Mobile Top Navigation Header Bar */}
        <div className="flex sm:hidden items-center justify-between border-b border-slate-100 pb-3 mb-3 sticky top-0 bg-white/95 backdrop-blur-md z-40 -mx-4 px-4 pt-1">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 text-xs font-bold text-[#0B1F3A] bg-slate-100 px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 text-[#0B1F3A]" />
            <span>Back to Products</span>
          </button>
          
          <span className="text-xs font-mono font-bold bg-[#0B1F3A] text-[#D4AF37] px-2.5 py-1 rounded-md">
            {saCode}
          </span>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0B1F3A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Close Button */}
        <button
          onClick={onClose}
          className="hidden sm:flex absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-slate-100/80 border border-slate-200 items-center justify-center text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white transition-all cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch relative">
          
          {/* Left Column: Product Image with Blue Hover Lens Box */}
          <div 
            className="lg:col-span-6 relative aspect-square w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl overflow-hidden group flex items-center justify-center select-none"
            onMouseEnter={() => {
              if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                setIsZoomed(true);
              }
            }}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <div className="relative w-full h-full p-3 flex items-center justify-center">
              <Image 
                src={image} 
                alt={product.name} 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain" 
                suppressHydrationWarning
              />

              {/* Amazon / Flipkart Style Semi-Transparent Lens Box (Desktop only) */}
              {isDesktopZoom && (
                <div 
                  className="absolute pointer-events-none border-2 border-[#0B1F3A] bg-[#0B1F3A]/25 rounded-lg shadow-sm z-20 transition-all duration-75"
                  style={{
                    width: '120px',
                    height: '120px',
                    left: `calc(${lensPos.x}% - 60px)`,
                    top: `calc(${lensPos.y}% - 60px)`,
                  }}
                />
              )}
            </div>

            {/* SKU Badge */}
            <div className="hidden sm:flex absolute top-4 left-4 bg-[#0B1F3A] text-[#D4AF37] text-xs font-mono font-bold px-3 py-1.5 rounded-lg shadow-md border border-[#D4AF37]/30 items-center space-x-1.5 pointer-events-none z-10">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{saCode}</span>
            </div>
          </div>

          {/* Right Column Container */}
          <div className="lg:col-span-6 relative min-h-[340px] flex flex-col justify-between">
            
            {/* Desktop Zoom Window Box */}
            {isDesktopZoom ? (
              <div className="absolute inset-0 z-30 bg-white border-2 border-[#0B1F3A] rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col items-center justify-center animate-fadeIn">
                <div className="absolute top-3 left-3 bg-[#0B1F3A] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md z-10 shadow-xs flex items-center space-x-1">
                  <ZoomIn className="w-3 h-3 text-[#D4AF37]" />
                  <span>3.5x Magnified Lens</span>
                </div>

                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    sizes="1200px"
                    style={{
                      transformOrigin: `${lensPos.x}% ${lensPos.y}%`,
                      transform: 'scale(3.5)',
                    }}
                    className="object-contain transition-transform duration-75 ease-out"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            ) : (
              /* Product Details Section */
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="space-y-4">
                  
                  <div>
                    <span className="text-[11px] font-bold text-[#B8860B] uppercase tracking-wider block mb-1">
                      {categoryName}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight leading-snug">
                      {product.name}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed border-b border-slate-100 pb-3">
                    {shortDesc}
                  </p>

                  {/* Interactive Colors / Finishes Selector */}
                  {finishes && finishes.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#0B1F3A]">Select Finish / Color:</span>
                        <span className="text-slate-500 font-medium text-[11px]">{selectedFinish || finishes[0]}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {finishes.map((finish) => {
                          const isSelected = selectedFinish === finish;
                          const swatch = getSwatchClass(finish);

                          return (
                            <button
                              key={finish}
                              type="button"
                              onClick={() => setSelectedFinish(finish)}
                              className={`group/btn relative px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
                                isSelected 
                                  ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-md scale-102' 
                                  : 'bg-[#F8FAFC] text-[#0B1F3A] border-slate-200 hover:border-slate-400 hover:bg-slate-100'
                              }`}
                            >
                              <span className={`w-3.5 h-3.5 rounded-full border shadow-2xs ${swatch}`} />
                              <span>{finish}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Interactive Sizes Selector */}
                  {sizes && sizes.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#0B1F3A]">Available Sizes:</span>
                        <span className="text-slate-500 font-medium text-[11px]">{selectedSize || sizes[0]}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => {
                          const isSelected = selectedSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setSelectedSize(size)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#B8860B] text-white border-[#B8860B] shadow-xs'
                                  : 'bg-[#F8FAFC] text-[#0B1F3A] border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Specification Tags */}
                  {variants && variants.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-[#0B1F3A] block">Specifications:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {variants.map((v) => (
                          <span 
                            key={v} 
                            className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Guarantees */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-[#0B1F3A] space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
                      <span className="font-semibold">Direct Wholesale Trade Pricing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                      <span className="font-semibold">Ready Warehouse Stock in Raipur</span>
                    </div>
                  </div>

                </div>

                {/* Action Button */}
                <div className="pt-2 sm:pt-4 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onEnquire?.(saCode);
                    }}
                    className="w-full py-3.5 bg-[#0B1F3A] hover:bg-[#1E293B] active:scale-98 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-2xl transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 cursor-pointer group"
                  >
                    <span>Enquire SKU {saCode} {selectedFinish ? `(${selectedFinish})` : ''}</span>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <Link
                    href={`/product/${
                      'slug' in product && product.slug
                        ? product.slug
                        : `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${('saCode' in product ? product.saCode : product.sku).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
                    }`}
                    onClick={onClose}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>View Full Product Details & Specs</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8860B]" />
                  </Link>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>,
    document.body
  );
}
