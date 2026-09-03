'use client';

import React, { useState } from 'react';
import { Mail, ShieldCheck } from 'lucide-react';
import { Product, Finish } from '@/lib/data/products';
import { Button } from '@/components/ui/Button';
import { InquiryModal } from '@/components/inquiry/InquiryModal';

interface ProductDetailActionsProps {
  product: Product;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [selectedFinish, setSelectedFinish] = useState<Finish>(product.finish);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Available finish options
  const finishes: Finish[] = [
    'Brushed Gold',
    'Anodized Champagne',
    'Matte Black',
    'Satin Chrome',
    'Polished Silver',
    'Antique Bronze',
  ];

  return (
    <div className="space-y-6 bg-[#FFFFFF] border border-[#D8D1C4] p-6 shadow-luxury">
      <InquiryModal
        product={{ ...product, finish: selectedFinish }}
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Finish Selector */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-[#2B2620]/80 font-medium block">
          Select Architectural Finish: <span className="text-[#B08D57]">{selectedFinish}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {finishes.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFinish(f)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors ${
                selectedFinish === f
                  ? 'bg-[#B08D57] text-white border-[#B08D57]'
                  : 'bg-[#FAF7F0] border-[#D8D1C4] text-[#2B2620] hover:border-[#B08D57]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Single Enquire About This Product Button */}
      <div className="pt-2">
        <Button onClick={() => setIsInquiryOpen(true)} className="w-full py-4 text-xs uppercase tracking-widest">
          <Mail className="w-4 h-4 mr-2" /> Enquire About This Product
        </Button>
      </div>

      <div className="flex items-center space-x-2 text-[11px] text-[#2B2620]/60 pt-2 border-t border-[#D8D1C4]">
        <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
        <span>Includes BIS Compliance Certificate & Technical Drawings</span>
      </div>
    </div>
  );}
