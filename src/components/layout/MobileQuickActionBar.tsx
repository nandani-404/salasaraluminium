'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, MapPin, FileText } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { SAH_BUSINESS_DETAILS } from '@/lib/sahData';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function MobileQuickActionBar() {
  const { openEnquiryModal } = useEnquiry();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const primaryPhone = SAH_BUSINESS_DETAILS.contactPersons[0]?.phoneNumbers[0] || '+918007443071';
  const rawPhone = primaryPhone.replace(/\D/g, '');

  const whatsappMessage = encodeURIComponent(
    'Hello Salasar Aluminium, I would like to inquire about wholesale hardware pricing and catalogue.'
  );

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      name: 'Products',
      href: '/products',
      icon: Package,
      isActive: pathname.startsWith('/products'),
    },
    {
      name: 'Locations',
      href: '/locations',
      icon: MapPin,
      isActive: pathname.startsWith('/locations'),
    },
  ];

  return (
    <aside
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] md:hidden px-2 py-1.5 pb-safe"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Navigation Tabs */}
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
                item.isActive ? 'text-[#0B1F3A]' : 'text-slate-500 hover:text-[#0B1F3A]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    item.isActive ? 'text-[#0B1F3A]' : 'text-slate-500'
                  }`}
                />
                {item.isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37]" />
                )}
              </div>
              <span
                className={`text-[10px] font-semibold tracking-tight mt-1 truncate ${
                  item.isActive ? 'text-[#0B1F3A] font-bold' : 'text-slate-500'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* WhatsApp with Proper Original Premium Icon */}
        <a
          href={`https://wa.me/${rawPhone}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95"
          title="Chat on WhatsApp"
        >
          <div className="relative">
            <WhatsAppIcon original size={22} className="w-5 h-5 shrink-0 shadow-2xs" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-1 text-[#25D366] truncate">
            WhatsApp
          </span>
        </a>

        {/* Minimal Clean Quote Action Button */}
        <button
          type="button"
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
