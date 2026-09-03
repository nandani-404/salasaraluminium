'use client';

import React from 'react';
import { useEnquiry } from '@/context/EnquiryContext';
import { Sparkles } from 'lucide-react';

export default function ArticleClientCTA({ postTitle }: { postTitle: string }) {
  const { openEnquiryModal } = useEnquiry();

  return (
    <div className="mt-12 p-8 bg-[#22262A] text-white rounded-2xl text-center space-y-4 shadow-lg">
      <span className="text-xs font-semibold text-[#B08D57] uppercase tracking-widest">
        Technical Consultation
      </span>
      <h3 className="text-2xl font-serif font-bold">
        Have Questions About Profile Specifications for Your Project?
      </h3>
      <p className="text-gray-300 text-xs max-w-lg mx-auto leading-relaxed">
        Speak directly with our metallurgical sales team. We assist architects and structural contractors with die design, alloy selection, and wind load calculations.
      </p>
      <button
        onClick={() => openEnquiryModal({ product: `Inquiry via Article: ${postTitle}` })}
        className="px-8 py-3 bg-[#B08D57] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#967442] transition-colors inline-flex items-center space-x-2"
      >
        <Sparkles className="w-4 h-4" />
        <span>Request Technical Advice & Quote</span>
      </button>
    </div>
  );
}
