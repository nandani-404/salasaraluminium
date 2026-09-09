import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: '86+ Aluminium Hardware Products | Wholesale Catalogue Raipur',
  description: 'Browse our full wholesale catalogue: rollers, locks, hinges, door kits, closers, glass hardware, sealants & fasteners. 86 SA-coded SKUs, direct trade pricing.',
  alternates: {
    canonical: '/products',
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-xs font-bold text-[#0B1F3A]">Loading Catalogue...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
