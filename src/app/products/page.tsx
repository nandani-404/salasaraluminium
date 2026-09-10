import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Aluminium Hardware Catalogue',
  description: 'Browse 86+ wholesale hardware SKUs: rollers, locks, hinges, door kits, closers, glass fittings & sealants in Raipur, Chhattisgarh. Get direct trade pricing.',
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
