'use client';

import React from 'react';
import Image from 'next/image';
import { X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SAHProduct } from '@/lib/sahData';
import { Product } from '@/lib/data/products';

interface QuickViewModalProps {
  product: SAHProduct | Product | null;
  onClose: () => void;
  onEnquire?: (saCode: string) => void;
}

export function QuickViewModal({ product, onClose, onEnquire }: QuickViewModalProps) {
  if (!product) return null;

  const image = 'image' in product ? product.image : product.images[0];
  const saCode = 'saCode' in product ? product.saCode : product.sku;
  const categoryName = 'categoryName' in product ? product.categoryName : product.category;
  const shortDesc = 'shortDesc' in product ? product.shortDesc : product.shortDescription;
  const finishes = 'finishes' in product && product.finishes ? product.finishes : ('finish' in product && product.finish ? [product.finish] : []);
  const sizes = 'sizes' in product ? product.sizes : [];
  const variants = 'variants' in product ? product.variants : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Product Image Frame */}
          <div className="md:col-span-5 relative aspect-square w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl overflow-hidden p-4 flex items-center justify-center">
            <Image 
              src={image} 
              alt={product.name} 
              fill 
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain p-4" 
            />
            <div className="absolute top-3 left-3 bg-[#0B1F3A] text-[#D4AF37] text-xs font-mono font-bold px-2.5 py-1 rounded-md shadow-xs border border-[#D4AF37]/30">
              {saCode}
            </div>
          </div>

          {/* Right Column: Product Specification & Variants */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-wider block mb-1">
                {categoryName}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight leading-tight">
                {product.name}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {shortDesc}
            </p>

            {/* Colors / Finishes Available */}
            {finishes && finishes.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-[#0B1F3A] block">Available Finishes / Colors:</span>
                <div className="flex flex-wrap gap-1.5">
                  {finishes.map((finish) => (
                    <span 
                      key={finish} 
                      className="px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#0B1F3A] flex items-center space-x-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                      <span>{finish}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Available */}
            {sizes && sizes.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-[#0B1F3A] block">Available Sizes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((size) => (
                    <span 
                      key={size} 
                      className="px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#0B1F3A]"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Variants Available */}
            {variants && variants.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-[#0B1F3A] block">Specifications:</span>
                <div className="flex flex-wrap gap-1.5">
                  {variants.map((v) => (
                    <span 
                      key={v} 
                      className="px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#0B1F3A]"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantees */}
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B1F3A] space-y-1">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B]" />
                <span className="font-semibold">Direct Wholesale Trade Pricing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B]" />
                <span className="font-semibold">Immediate Warehouse Stock Readiness</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  onEnquire?.(saCode);
                }}
                className="w-full py-3.5 bg-[#0B1F3A] hover:bg-[#1E293B] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>Enquire SA Code ({saCode})</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
