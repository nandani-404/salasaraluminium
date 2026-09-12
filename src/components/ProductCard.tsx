'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, FileCheck, CheckCircle2 } from 'lucide-react';
import { Product } from '@/lib/data';
import { useEnquiry } from '@/context/EnquiryContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openEnquiryModal } = useEnquiry();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-[#E5E3DC] overflow-hidden hover:border-[#B08D57]/60 shadow-sm hover:shadow-lg active:scale-[0.98] transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Product Image */}
        <div className="relative h-36 sm:h-52 overflow-hidden bg-[#FAF9F6]">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#22262A]/85 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-lg tracking-wide uppercase border border-white/10">
            {product.category}
          </div>
          {product.featured && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#B08D57] text-white text-[8.5px] sm:text-[9.5px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded sm:rounded-md tracking-wider uppercase shadow-2xs">
              Featured SKU
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-2.5 sm:p-5 space-y-1.5 sm:space-y-2.5">
          <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs text-gray-500 font-medium truncate">
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B08D57] shrink-0" />
            <span className="truncate">{product.subcategory}</span>
          </div>

          <h3 className="text-xs sm:text-lg font-serif font-bold text-[#22262A] group-hover:text-[#B08D57] transition-colors leading-tight sm:leading-snug line-clamp-2">
            <Link href={`/products/${product.category}/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed line-clamp-1 sm:line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Key Specifications snippet */}
          <div className="pt-1.5 sm:pt-2 border-t border-[#E5E3DC]/60 grid grid-cols-2 gap-1 sm:gap-2 text-[9.5px] sm:text-[11px]">
            <div>
              <span className="text-gray-400 block text-[9px] sm:text-[10px]">Alloy</span>
              <span className="text-[#22262A] font-semibold truncate block">{product.alloy}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px] sm:text-[10px]">Temper</span>
              <span className="text-[#22262A] font-semibold truncate block">{product.temper}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer (No price, Enquire CTA) */}
      <div className="p-2.5 sm:p-5 pt-0 space-y-1.5 sm:space-y-2">
        <button
          onClick={() => openEnquiryModal({ product: product.name, segment: product.category })}
          className="w-full py-2 sm:py-2.5 bg-[#22262A] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl hover:bg-[#B08D57] active:scale-95 transition-all flex items-center justify-center space-x-1 sm:space-x-2 shadow-2xs"
        >
          <FileCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B08D57] shrink-0" />
          <span>Enquire <span className="hidden sm:inline">About Profile</span></span>
        </button>

        <Link
          href={`/products/${product.category}/${product.slug}`}
          className="w-full py-1 text-center text-[10px] sm:text-xs font-medium text-gray-500 hover:text-[#22262A] block transition-colors truncate"
        >
          <span className="sm:hidden">View Specs →</span>
          <span className="hidden sm:inline">View Full Technical Specs & Drawing →</span>
        </Link>
      </div>
    </motion.div>
  );
}
