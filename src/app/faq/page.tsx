import React from 'react';
import FAQSection from '@/components/FAQSection';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aluminium Hardware FAQ — SA Codes & Delivery | Salasar',
  description: 'Find answers to common questions regarding wholesale trade orders, SA codes, delivery timelines, finishes, and hardware specifications in Raipur, Chhattisgarh.',
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
