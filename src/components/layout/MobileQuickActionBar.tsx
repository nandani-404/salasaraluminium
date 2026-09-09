'use client';

import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_BUSINESS_DETAILS } from '@/lib/sahData';
import { usePathname } from 'next/navigation';

export default function MobileQuickActionBar() {
  const { openEnquiryModal } = useEnquiry();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const primaryPhone = SAH_BUSINESS_DETAILS.contactPersons[0]?.phoneNumbers[0] || '+918007443071';
  const rawPhone = primaryPhone.replace(/\D/g, '');

  const whatsappMessage = encodeURIComponent(
    `Hello Salasar Aluminium, I would like to inquire about wholesale hardware pricing and catalog.`
  );

  return (
    <aside aria-label="Mobile Trade Contact Toolbar" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-4px_20px_rgba(11,31,58,0.1)] md:hidden">
      {/* Call Button */}
      <a
        href={`tel:${primaryPhone.replace(/\s/g, '')}`}
        className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-[#FAF9F6] border border-[#E8E6E1] text-[#0B1F3A] rounded-xl text-xs font-bold active:scale-95 transition-all"
        title="Call Salasar Sales Desk"
      >
        <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
        <span className="truncate">Call Desk</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${rawPhone}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-[#25D366] text-white rounded-xl text-xs font-bold active:scale-95 transition-all shadow-xs"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
        <span className="truncate">WhatsApp</span>
      </a>

      {/* Quick Trade Quote Button */}
      <button
        type="button"
        onClick={() => openEnquiryModal()}
        className="flex-[1.2] flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-[#0B1F3A] text-white rounded-xl text-xs font-bold active:scale-95 transition-all shadow-xs"
        title="Get Wholesale Quote"
      >
        <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
        <span className="truncate">Trade Quote</span>
      </button>
    </aside>
  );
}
