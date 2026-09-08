import React from 'react';
import { Metadata } from 'next';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';

export const metadata: Metadata = {
  title: 'Why Choose Us | Salasar Aluminium & Hardware Wholesale Supplier',
  description: 'Learn why fabricators, contractors, dealers and project buyers choose Salasar Aluminium & Hardware for wholesale supply, broad product range, and dependable project support.',
  keywords: [
    'why choose us aluminium supplier',
    'aluminium hardware wholesale',
    'architectural hardware supplier',
    'bulk aluminium profiles',
    'fabricator aluminium supply',
    'contractor hardware procurement'
  ],
};

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-white pt-6">
      <WhyChooseUsSection />
    </main>
  );
}
