'use client';

import React from 'react';
import FinishSwatches from '@/components/FinishSwatches';
import { FINISHES } from '@/lib/data';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

export default function FinishesPage() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#E5E3DC]">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold text-[#B08D57] uppercase tracking-widest">
            Surface Engineering & Anodizing
          </span>
          <h1 className="text-4xl font-serif font-bold text-[#22262A]">
            Architectural Finishes & Color Library
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Salasar Aluminium operates automated electro-chemical anodizing lines and vertical powder coating plants. We produce Class 1 and Class 2 anodized finishes (15–25 microns) and Qualicoat-certified polyester powder coatings.
          </p>
        </div>
      </div>

      {/* Main Interactive Swatches Component */}
      <FinishSwatches />

      {/* Technical Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-serif font-bold text-[#22262A] mb-6">
          Surface Treatment Technical Comparison Matrix
        </h2>
        <div className="bg-white rounded-xl border border-[#E5E3DC] overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#22262A] text-white">
                <th className="p-4 font-semibold uppercase tracking-wider">Finish Name</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Code</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Layer Thickness</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Corrosion Rating</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Key Architectural Benefit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DC] text-[#22262A]">
              {FINISHES.map((f, idx) => (
                <tr key={f.id} className={idx % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-white'}>
                  <td className="p-4 font-serif font-bold text-sm">{f.name}</td>
                  <td className="p-4 font-mono font-semibold text-[#B08D57]">{f.code}</td>
                  <td className="p-4 font-medium">{f.thicknessMicrons}</td>
                  <td className="p-4 font-semibold">{f.corrosionResistance}</td>
                  <td className="p-4 text-gray-600">{f.recommendedUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Finish Request CTA */}
      <div className="max-w-5xl mx-auto px-4 py-12 text-center bg-[#22262A] text-white rounded-2xl shadow-xl space-y-6">
        <span className="text-xs font-semibold text-[#B08D57] uppercase tracking-widest">
          Custom Color Matching
        </span>
        <h2 className="text-3xl font-serif font-bold">
          Need a Custom RAL Color or Electro-Dipped Shade?
        </h2>
        <p className="text-gray-300 text-sm max-w-xl mx-auto">
          We offer custom color matching against physical metal samples or RAL codes for minimum order quantities.
        </p>
        <button
          onClick={() => openEnquiryModal({ product: 'Custom RAL / Special Anodizing Finish Query' })}
          className="px-8 py-3.5 bg-[#B08D57] text-white font-medium text-xs uppercase tracking-wider rounded hover:bg-[#967442] transition-colors"
        >
          Request Custom Finish Swatches
        </button>
      </div>
    </div>
  );
}
