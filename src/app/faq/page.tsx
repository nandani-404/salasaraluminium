import React from 'react';
import FAQSection from '@/components/FAQSection';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Aluminium Hardware FAQ, Raipur | Salasar',
  description:
    'How to order by SA code, what we stock, delivery across Chhattisgarh, finishes and sizes, and whether we sell to homeowners. Straight answers, no sign-up.',
  path: '/faq',
});


export default function FAQPage() {
  return (
    <div className="pt-16 sm:pt-24 min-h-screen bg-white">
      <FAQSection
        title="Aluminium Hardware FAQ — Trade Orders & Delivery"
        subtitle="Everything you need to know about placing wholesale hardware orders, matching SA codes, custom extrusion finishes, and shipping across Chhattisgarh."
      />
      <TradeQuoteFormSection />
    </div>
  );
}
