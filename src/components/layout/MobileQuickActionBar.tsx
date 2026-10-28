'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, PhoneCall, FileText } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_BUSINESS_DETAILS } from '@/lib/sahData';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { TEL_HREF } from '@/config/business';

export default function MobileQuickActionBar() {
  const { openEnquiryModal } = useEnquiry();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const primaryPhone = SAH_BUSINESS_DETAILS.contactPersons[0]?.phoneNumbers[0] || '+918007443071';
  const rawPhone = primaryPhone.replace(/\D/g, '');

  const whatsappMessage = encodeURIComponent(
    'Hello Abhishek, I would like to inquire about wholesale hardware pricing and catalogue from Salasar Aluminium Raipur.'
  );

  return (
    <aside
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:hidden px-2 py-1.5 pb-safe"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
            pathname === '/' ? 'text-[#0B1F3A]' : 'text-slate-500 hover:text-[#0B1F3A]'
          }`}
        >
          <div className="relative">
            <Home className={`w-5 h-5 ${pathname === '/' ? 'text-[#0B1F3A]' : 'text-slate-500'}`} />
            {pathname === '/' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37]" />
            )}
          </div>
          <span className={`text-[10px] font-semibold tracking-tight mt-1 truncate ${pathname === '/' ? 'font-bold text-[#0B1F3A]' : ''}`}>
            Home
          </span>
        </Link>

        {/* Products */}
        <Link
          href="/products"
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
            pathname.startsWith('/products') ? 'text-[#0B1F3A]' : 'text-slate-500 hover:text-[#0B1F3A]'
          }`}
        >
          <div className="relative">
            <Package className={`w-5 h-5 ${pathname.startsWith('/products') ? 'text-[#0B1F3A]' : 'text-slate-500'}`} />
            {pathname.startsWith('/products') && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37]" />
            )}
          </div>
          <span className={`text-[10px] font-semibold tracking-tight mt-1 truncate ${pathname.startsWith('/products') ? 'font-bold text-[#0B1F3A]' : ''}`}>
            Products
          </span>
        </Link>

        {/* Direct Phone Call */}
        <a
          href={TEL_HREF}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 text-[#0B1F3A]"
          title="Call Abhishek Direct"
          data-analytics="click_call"
          data-analytics-location="mobile-bar"
        >
          <div className="relative">
            <PhoneCall className="w-5 h-5 text-[#8A6408]" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1 text-[#0B1F3A] truncate">
            Call Now
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${rawPhone}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95"
          title="Chat on WhatsApp"
          data-analytics="click_whatsapp"
          data-analytics-location="mobile-bar"
        >
          <div className="relative">
            <WhatsAppIcon original size={22} className="w-5 h-5 shrink-0 shadow-2xs" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1 text-[#0B6B37] truncate">
            WhatsApp
          </span>
        </a>

        {/* Quick Quote Modal */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => openEnquiryModal()}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 text-slate-500 hover:text-[#0B1F3A] cursor-pointer"
          title="Get Wholesale Quote"
        >
          <div className="relative">
            <FileText className="w-5 h-5 text-slate-500 hover:text-[#0B1F3A]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-1 text-slate-500 truncate">
            Quote
          </span>
        </button>
      </div>
    </aside>
  );
}
