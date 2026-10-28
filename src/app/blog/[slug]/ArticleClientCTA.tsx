'use client';

import React from 'react';
import { useEnquiry } from '@/context/EnquiryContext';
import { PhoneCall, MapPin, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { BUSINESS, TEL_HREF, whatsappLink } from '@/config/business';

export default function ArticleClientCTA({ postTitle }: { postTitle: string }) {
  const { openEnquiryModal } = useEnquiry();

  const waUrl = whatsappLink({
    message: `Hello Abhishek, I was reading your guide on "${postTitle}". Can you share wholesale prices and availability for these items in Raipur?`,
    source: '/blog',
    campaign: 'article_cta',
  });

  return (
    <div className="mt-12 p-6 sm:p-8 bg-[#0B1F3A] text-white rounded-2xl text-center space-y-4 shadow-lg border border-[#D4AF37]/30">
      <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
        Direct Hardware Supply • Raipur Counter
      </span>
      <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
        Need Help Selecting or Sourcing Hardware for Your Project?
      </h3>
      <p className="text-slate-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
        Speak directly with Abhishek at our Bhaisthan counter. We stock all 86 standard hardware SKUs: sliding window rollers, door kits, door closers, and shower glass fittings at trade and retail rates.
      </p>

      {/* Action Buttons: WhatsApp & Call Direct + Quote */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 max-w-lg mx-auto">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="click_whatsapp"
          data-analytics-location="article-cta"
          className="w-full sm:w-auto px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          <span>WhatsApp for Price</span>
        </a>

        <a
          href={TEL_HREF}
          data-analytics="click_call"
          data-analytics-location="article-cta"
          className="w-full sm:w-auto px-5 py-3 bg-white text-[#0B1F3A] hover:bg-slate-100 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
        >
          <PhoneCall className="w-4 h-4 text-[#8A6408] shrink-0" />
          <span>Call: {BUSINESS.phones.primary.display}</span>
        </a>

        <button
          type="button"
          onClick={() => openEnquiryModal({ product: `Inquiry via Article: ${postTitle}` })}
          className="w-full sm:w-auto px-5 py-3 bg-[#8A6408] hover:bg-[#6F5006] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
        >
          <span>Request Quote</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>

      <p className="text-[11px] text-slate-300 pt-1 flex items-center justify-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
        <span>Shop No. 3, JK Steel Gali, Bhaisthan, Raipur. No minimum order at counter.</span>
      </p>
    </div>
  );
}
