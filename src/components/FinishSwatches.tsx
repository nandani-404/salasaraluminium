'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { FINISHES, Finish } from '@/lib/data';
import { useEnquiry } from '@/context/EnquiryContext';

export default function FinishSwatches() {
  const [selectedFinish, setSelectedFinish] = useState<Finish>(FINISHES[1]); // Default Anodized Silver
  const { openEnquiryModal } = useEnquiry();

  return (
    <section className="py-20 bg-[#FAF9F6] border-b border-[#E5E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-semibold text-[#B08D57] uppercase tracking-widest">
            Surface Treatment & Anodizing
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#22262A]">
            Architectural Finishes Library
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            From 25-micron corrosion-resistant anodizing to custom Qualicoat Class 2 powder coating shades.
          </p>
        </div>

        {/* Interactive Finishes Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Swatches Selection Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {FINISHES.map((finish) => {
              const isSelected = selectedFinish.id === finish.id;
              return (
                <button
                  key={finish.id}
                  onClick={() => setSelectedFinish(finish)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-white border-[#B08D57] shadow-md ring-1 ring-[#B08D57]'
                      : 'bg-white/60 border-[#E5E3DC] hover:border-gray-400'
                  }`}
                >
                  {/* Swatch Pill */}
                  <div
                    className="w-full h-16 rounded-lg shadow-inner border border-black/10 relative overflow-hidden"
                    style={{ background: finish.bgGradient || finish.hexColor }}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-[#B08D57] shadow">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Title & Code */}
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                      {finish.code}
                    </span>
                    <span className="text-sm font-serif font-bold text-[#22262A] line-clamp-1">
                      {finish.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Finish Details Box */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-[#E5E3DC] shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E3DC]">
              <div>
                <span className="text-xs text-[#B08D57] font-semibold uppercase tracking-widest">
                  Selected Specification
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#22262A]">
                  {selectedFinish.name}
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold px-3 py-1 bg-[#FAF9F6] border border-[#E5E3DC] rounded text-[#22262A]">
                {selectedFinish.code}
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {selectedFinish.description}
            </p>

            <div className="grid grid-cols-2 gap-4 py-2 bg-[#FAF9F6] p-4 rounded-lg border border-[#E5E3DC]/60 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Layer Thickness</span>
                <span className="text-[#22262A] font-bold">{selectedFinish.thicknessMicrons}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Corrosion Protection</span>
                <span className="text-[#B08D57] font-bold">{selectedFinish.corrosionResistance}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#22262A] uppercase tracking-wider block">
                Recommended Applications:
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">
                {selectedFinish.recommendedUse}
              </p>
            </div>

            <button
              onClick={() =>
                openEnquiryModal({
                  product: `Finish Specification: ${selectedFinish.name} (${selectedFinish.code})`,
                })
              }
              className="w-full py-3 bg-[#B08D57] text-white font-medium text-xs uppercase tracking-wider rounded-md hover:bg-[#967442] transition-colors shadow flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enquire About This Finish</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
