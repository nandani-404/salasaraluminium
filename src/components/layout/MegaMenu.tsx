'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, SEGMENTS, Segment } from '@/lib/data/products';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  const segmentKeys: Segment[] = ['residential', 'commercial', 'industrial'];

  return (
    <div
      className="absolute top-full left-0 w-full bg-[#FAF7F0] border-b border-[#D8D1C4] shadow-luxury transition-all duration-300 z-50"
      onMouseLeave={onClose}
    >
      <div className="container-luxury py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {segmentKeys.map((segKey) => {
          const segInfo = SEGMENTS[segKey];
          const segCategories = CATEGORIES.filter((c) => c.segment === segKey);

          return (
            <div key={segKey} className="space-y-4">
              <div className="pb-2 border-b border-[#D8D1C4]">
                <Link
                  href={`/${segKey}`}
                  onClick={onClose}
                  className="font-serif text-lg text-[#2B2620] hover:text-[#B08D57] transition-colors flex items-center gap-2"
                >
                  <span>{segInfo.icon}</span>
                  {segInfo.label} Segment
                </Link>
                <p className="text-xs text-[#2B2620]/60 mt-1 line-clamp-1">
                  {segInfo.description}
                </p>
              </div>

              <ul className="space-y-2 text-sm text-[#2B2620]/80">
                {segCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${segKey}/${cat.slug}`}
                      onClick={onClose}
                      className="hover:text-[#B08D57] transition-colors inline-block py-1 text-xs uppercase tracking-wider"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* Featured Showcase inside MegaMenu */}
        <div className="bg-[#FFFFFF] p-6 border border-[#D8D1C4] space-y-4">
          <span className="eyebrow">Signature Collection</span>
          <h4 className="font-serif text-base text-[#2B2620]">Palazzo Brass Handles</h4>
          <p className="text-xs text-[#2B2620]/70 leading-relaxed">
            Crafted for luxury residences demanding hand-finished elegance.
          </p>
          <div className="relative h-32 w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85"
              alt="Palazzo Brass Handle"
              fill
              className="object-cover"
            />
          </div>
          <Link
            href="/product/palazzo-door-handle-brushed-gold"
            onClick={onClose}
            className="text-[11px] uppercase tracking-widest text-[#B08D57] hover:underline block pt-2 font-medium"
          >
            Explore Masterpiece →
          </Link>
        </div>
      </div>
    </div>
  );
}
