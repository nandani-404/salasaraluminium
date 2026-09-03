'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, Star } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {

  return (
    <div className="group relative bg-[#FFFFFF] border border-[#D8D1C4] hover:border-[#B08D57] transition-all duration-500 shadow-luxury hover:shadow-luxury-hover flex flex-col justify-between h-full">
      <div>
        {/* Image Container with Soft Zoom */}
        <div className="relative aspect-4/3 w-full bg-[#FAF7F0] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            <Badge variant="gold">{product.segment}</Badge>
            {product.isNew && <Badge variant="espresso">New Release</Badge>}
          </div>

          {/* Floating Quick View Action */}
          {onQuickView && (
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(product);
                }}
                className="p-2 bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#D8D1C4] hover:border-[#B08D57] text-[#2B2620] hover:text-[#B08D57] transition-all"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-[#2B2620]/60 uppercase tracking-wider">
            <span>{product.sku}</span>
            <span className="flex items-center gap-1 text-[#B08D57]">
              <Star className="w-3 h-3 fill-[#B08D57]" />
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-lg text-[#2B2620] group-hover:text-[#B08D57] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#2B2620]/70 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="pt-2 border-t border-[#D8D1C4]/40 flex items-center justify-between text-xs text-[#2B2620]/80">
            <span>Grade: <strong className="font-medium text-[#2B2620]">{product.alloyGrade}</strong></span>
            <span>Finish: <strong className="font-medium text-[#2B2620]">{product.finish}</strong></span>
          </div>
        </div>
      </div>

      {/* Footer Specification Details & Enquire Button */}
      <div className="p-5 pt-0 flex items-center justify-between gap-4">
        <div className="text-xs text-[#2B2620]/70">
          <span className="block font-medium text-[#2B2620]">Grade: {product.alloyGrade}</span>
          <span>{product.finish}</span>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="px-4 py-2.5 bg-[#2B2620] hover:bg-[#B08D57] text-[#FAF7F0] text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5"
        >
          <span>Enquire</span>
        </Link>
      </div>
    </div>
  );
}
