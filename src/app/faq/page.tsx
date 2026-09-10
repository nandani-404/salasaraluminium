import React from 'react';
import FAQSection from '@/components/FAQSection';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hardware FAQ & Trade Order Guide',
  description: 'Find answers to common trade questions on wholesale hardware orders, SA product codes, delivery times, finishes, and shipping in Chhattisgarh.',
  alternates: {
    canonical: '/faq',
  },
};


export default function FAQPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <FAQSection
        title="Aluminium Hardware FAQ — Trade Orders & Delivery"
        subtitle="Everything you need to know about placing wholesale hardware orders, matching SA codes, custom extrusion finishes, and shipping across Chhattisgarh."
      />
      <TradeQuoteFormSection />
    </div>
  );
}
