import React from 'react';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FAQSection from '@/components/FAQSection';

export const metadata: Metadata = buildMetadata({
  title: 'Why Buy Hardware From Salasar, Raipur',
  description:
    '86 SKUs under SA codes you can quote by phone, one counter in Raipur you can actually visit, and staff who will match an old part from a photograph.',
  path: '/why-choose-us',
});

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-white pt-16 sm:pt-24">
      <WhyChooseUsSection />
      
      {/* Why Choose Us FAQ Block */}
      <FAQSection
        title="Frequently asked questions."
        faqs={[
          {
            question: 'What makes Salasar different from other Raipur hardware suppliers?',
            answer: 'We supply direct from our shop in Raipur with a standardized 86-SKU catalogue and fixed SA product codes, at retail and trade rates — no ordering ambiguity.',
            category: 'Value Proposition',
          },
          {
            question: 'How does delivery work after placing an order?',
            answer: 'Delivery across Chhattisgarh. Cost and timing confirmed against your order before you pay.',
            category: 'Delivery & Logistics',
          },
        ]}
      />
    </main>
  );
}
