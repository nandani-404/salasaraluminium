import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Aluminium Hardware Catalogue — 86 Trade SKUs | Salasar Raipur',
  description: 'Explore our complete 86-SKU catalogue of architectural extrusions, door kits, closers, hinges & rollers. Direct wholesale trade supply in Raipur, Chhattisgarh.',
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
