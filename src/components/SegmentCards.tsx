'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, Building2, Factory, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import { useEnquiry } from '@/context/EnquiryContext';

export default function SegmentCards() {
  const { openEnquiryModal } = useEnquiry();

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'residential':
        return <Home className="w-6 h-6 text-[#B08D57]" />;
      case 'commercial':
        return <Building2 className="w-6 h-6 text-[#B08D57]" />;
      case 'industrial':
        return <Factory className="w-6 h-6 text-[#B08D57]" />;
      default:
        return <Home className="w-6 h-6 text-[#B08D57]" />;
    }
  };

  return (
    <section className="py-20 bg-[#FAF9F6] border-b border-[#E5E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-semibold text-[#B08D57] uppercase tracking-widest">
            Targeted Architectural Solutions
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#22262A]">
            Serving Three Core Industry Segments
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            From precision home sliding profiles to high-storey structural curtain walls and heavy industrial automation framing.
          </p>
        </div>

        {/* 3 Segment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-xl overflow-hidden border border-[#E5E3DC] hover:border-[#B08D57]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#22262A]/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md rounded-lg shadow">
                  {getIcon(cat.slug)}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-[#22262A] group-hover:text-[#B08D57] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Subcategories list */}
                <div className="pt-2 border-t border-[#E5E3DC]/60">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Key Profile Lines:
                  </p>
                  <ul className="space-y-1 text-xs text-[#22262A]">
                    {cat.subcategories.slice(0, 3).map((sub, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#B08D57]" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href={`/products?segment=${cat.slug}`}
                    className="text-xs font-semibold text-[#22262A] hover:text-[#B08D57] flex items-center space-x-1"
                  >
                    <span>View Segment Catalog</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => openEnquiryModal({ segment: cat.slug })}
                    className="px-3.5 py-1.5 bg-[#FAF9F6] border border-[#E5E3DC] text-[#22262A] text-xs font-medium rounded hover:bg-[#B08D57] hover:text-white hover:border-[#B08D57] transition-colors"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
