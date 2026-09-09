import React from 'react';
import { Metadata } from 'next';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FAQSection from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Why Choose Salasar Aluminium & Hardware | Direct Trade Supplier Raipur',
  description: 'Direct factory pricing, 86+ SKU stock availability, and same-day Raipur dispatch — see why fabricators and contractors trust Salasar Aluminium & Hardware.',
  alternates: {
    canonical: '/why-choose-us',
  },
};

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <WhyChooseUsSection />
      
      {/* Why Choose Us FAQ Block */}
      <FAQSection
        title="Frequently asked questions."
        faqs={[
          {
            question: 'What makes Salasar different from other Raipur hardware suppliers?',
            answer: 'We supply direct from our own Raipur stock hub with a standardized 86-SKU catalogue and fixed SA product codes, at direct factory-trade pricing — no third-party markup and no ordering ambiguity.',
            category: 'Value Proposition',
          },
          {
            question: 'How fast can I get hardware after placing a wholesale order?',
            answer: 'Orders are dispatched same-day for regional Chhattisgarh delivery from our Raipur warehouse, subject to stock availability and order size.',
            category: 'Delivery & Logistics',
          },
        ]}
      />
    </main>
  );
}
