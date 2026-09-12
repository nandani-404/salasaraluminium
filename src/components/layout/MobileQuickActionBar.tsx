'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, MapPin, MessageCircle, FileText } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_BUSINESS_DETAILS } from '@/lib/sahData';

export default function MobileQuickActionBar() {
  const { openEnquiryModal } = useEnquiry();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const primaryPhone = SAH_BUSINESS_DETAILS.contactPersons[0]?.phoneNumbers[0] || '+918007443071';
  const rawPhone = primaryPhone.replace(/\D/g, '');

  const whatsappMessage = encodeURIComponent(
    `Hello Salasar Aluminium, I would like to inquire about wholesale hardware pricing and catalogue.`
  );

  const tabs = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      name: 'Catalogue',
      href: '/products',
      icon: Package,
      isActive: pathname.startsWith('/products'),
    },
    {
      name: 'Stores',
      href: '/locations',
      icon: MapPin,
      isActive: pathname.startsWith('/locations'),
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/${rawPhone}?text=${whatsappMessage}`,
      icon: MessageCircle,
      isExternal: true,
      color: 'text-[#25D366]',
    },
  ];

  return (
    <aside
      aria-label="Mobile App Bottom Dock Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#E2E8F0] shadow-[0_-4px_25px_rgba(11,31,58,0.12)] md:hidden px-2 py-1.5 pb-safe"
    >
      <div className="flex items-center justify-between max-w-md mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          if (tab.isExternal) {
            return (
              <a
                key={tab.name}
                href={tab.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-0 max-w-[76px] flex flex-col items-center justify-center py-1 rounded-xl transition-all active:scale-85 text-[#64748B] hover:text-[#0B1F3A]"
              >
                <div className="relative p-0.5">
                  <Icon className={`w-5 h-5 ${tab.color || 'text-[#0B1F3A]'}`} />
                </div>
                <span className="text-[10px] font-bold tracking-tight mt-0.5 text-[#25D366] truncate">
                  {tab.name}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex-1 min-w-0 max-w-[76px] flex flex-col items-center justify-center py-1 rounded-xl transition-all active:scale-85 ${
                tab.isActive
                  ? 'text-[#0B1F3A]'
                  : 'text-[#64748B] hover:text-[#0B1F3A]'
              }`}
            >
              <div className="relative p-0.5">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    tab.isActive ? 'text-[#0B1F3A] scale-110' : 'text-[#64748B]'
                  }`}
                />
                {tab.isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                )}
              </div>
              <span
                className={`text-[10px] font-bold tracking-tight mt-0.5 truncate ${
                  tab.isActive ? 'text-[#0B1F3A]' : 'text-[#64748B]'
                }`}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}

        {/* 5th Action: Quick Quote Button (Native App Action Chip) */}
        <button
          type="button"
          onClick={() => openEnquiryModal()}
          className="flex-1 min-w-0 max-w-[76px] flex flex-col items-center justify-center py-1 px-1 bg-[#0B1F3A] text-white rounded-xl shadow-md active:scale-90 transition-all border border-[#C9A227]/30 cursor-pointer"
          title="Get Wholesale Quote"
        >
          <div className="flex items-center space-x-1">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <span className="text-[9.5px] font-black uppercase tracking-wider text-[#D4AF37] mt-0.5 truncate">
            Quote
          </span>
        </button>
      </div>
    </aside>
  );
}
