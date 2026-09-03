'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { useEnquiry } from '@/context/EnquiryContext';
import { ShieldCheck, Download, Layers, CheckCircle2, FileText, Share2, Sparkles } from 'lucide-react';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { openEnquiryModal } = useEnquiry();
  const [selectedFinish, setSelectedFinish] = useState(product.availableFinishes[0]);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const handleDownloadSpec = () => {
    setPdfDownloaded(true);
    setTimeout(() => {
      alert(`Spec sheet requested for ${product.name}. A technical PDF copy has been prepared for your inquiry.`);
    }, 300);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Image & Finish Preview */}
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-white p-4 rounded-2xl border border-[#E5E3DC] shadow-sm relative overflow-hidden">
          <div className="relative h-96 w-full rounded-xl overflow-hidden bg-[#FAF9F6]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500 px-2">
            <span>Profile ID: {product.id}</span>
            <span>Category: {product.category.toUpperCase()}</span>
          </div>
        </div>

        {/* Available Finishes Selector */}
        <div className="bg-white p-6 rounded-xl border border-[#E5E3DC] space-y-3">
          <h3 className="text-xs font-semibold text-[#B08D57] uppercase tracking-wider">
            Available Anodizing & Powder Coating Options
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.availableFinishes.map((finish, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFinish(finish)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                  selectedFinish === finish
                    ? 'bg-[#22262A] text-white border-[#22262A]'
                    : 'bg-[#FAF9F6] border-[#E5E3DC] text-gray-700 hover:border-[#B08D57]'
                }`}
              >
                {finish}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Technical Details & Enquire CTA */}
      <div className="lg:col-span-6 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#E8DCC4]/60 text-[#B08D57] text-xs font-semibold rounded uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{product.alloy}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#22262A]">
            {product.name}
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.fullDescription}
          </p>
        </div>

        {/* Enquire Bar (No price) */}
        <div className="p-6 bg-white rounded-xl border border-[#B08D57]/40 shadow-md space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Pricing Model:</span>
            <span className="font-semibold text-[#B08D57] uppercase tracking-wider">Price Available on Inquiry</span>
          </div>

          <button
            onClick={() =>
              openEnquiryModal({
                product: `${product.name} (${selectedFinish})`,
                segment: product.category,
              })
            }
            className="w-full py-4 bg-[#B08D57] text-white font-medium text-sm uppercase tracking-wider rounded-md hover:bg-[#967442] transition-colors shadow flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Enquire About This Profile</span>
          </button>

          <button
            onClick={handleDownloadSpec}
            className="w-full py-3 bg-[#FAF9F6] border border-[#E5E3DC] text-[#22262A] font-medium text-xs rounded hover:border-[#B08D57] transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4 text-[#B08D57]" />
            <span>{pdfDownloaded ? 'Spec Sheet Downloaded' : 'Download Technical Specification Sheet (PDF)'}</span>
          </button>
        </div>

        {/* Full Specifications Table */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-[#22262A]">Technical Specifications</h3>
          <div className="bg-white rounded-xl border border-[#E5E3DC] overflow-hidden text-xs">
            <div className="divide-y divide-[#E5E3DC]">
              <div className="grid grid-cols-2 p-3 bg-[#FAF9F6]">
                <span className="font-semibold text-gray-500">Dimensions & Sightline</span>
                <span className="font-semibold text-[#22262A]">{product.dimensions}</span>
              </div>
              {product.weightPerMeter && (
                <div className="grid grid-cols-2 p-3">
                  <span className="font-semibold text-gray-500">Weight Per Meter</span>
                  <span className="font-semibold text-[#22262A]">{product.weightPerMeter}</span>
                </div>
              )}
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <div key={idx} className={`grid grid-cols-2 p-3 ${idx % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-white'}`}>
                  <span className="font-semibold text-gray-500">{key}</span>
                  <span className="text-[#22262A] font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Typical Applications */}
        <div className="space-y-3">
          <h3 className="text-base font-serif font-bold text-[#22262A]">Recommended Applications</h3>
          <div className="flex flex-wrap gap-2">
            {product.applications.map((app, i) => (
              <span key={i} className="px-3 py-1.5 bg-white border border-[#E5E3DC] rounded text-xs text-[#22262A]">
                • {app}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
