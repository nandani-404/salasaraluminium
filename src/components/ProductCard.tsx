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
      className="bg-white rounded-xl border border-[#E5E3DC] overflow-hidden hover:border-[#B08D57]/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Product Image */}
        <div className="relative h-52 overflow-hidden bg-[#FAF9F6]">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-[#22262A]/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded tracking-wide uppercase">
            {product.category}
          </div>
          {product.featured && (
            <div className="absolute top-3 right-3 bg-[#B08D57] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
              Featured SKU
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-3">
          <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
            <Layers className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>{product.subcategory}</span>
          </div>

          <h3 className="text-lg font-serif font-bold text-[#22262A] group-hover:text-[#B08D57] transition-colors leading-snug">
            <Link href={`/products/${product.category}/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Key Specifications snippet */}
          <div className="pt-2 border-t border-[#E5E3DC]/60 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-gray-400 block">Alloy Grade</span>
              <span className="text-[#22262A] font-semibold">{product.alloy}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Temper</span>
              <span className="text-[#22262A] font-semibold">{product.temper}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer (No price, Enquire CTA) */}
      <div className="p-5 pt-0 space-y-2">
        <button
          onClick={() => openEnquiryModal({ product: product.name, segment: product.category })}
          className="w-full py-2.5 bg-[#22262A] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B08D57] transition-colors flex items-center justify-center space-x-2"
        >
          <FileCheck className="w-4 h-4 text-[#B08D57]" />
          <span>Enquire About Profile</span>
        </button>

        <Link
          href={`/products/${product.category}/${product.slug}`}
          className="w-full py-1.5 text-center text-xs font-medium text-gray-500 hover:text-[#22262A] block transition-colors"
        >
          View Full Technical Specs & Drawing →
        </Link>
      </div>
    </motion.div>
  );
}
