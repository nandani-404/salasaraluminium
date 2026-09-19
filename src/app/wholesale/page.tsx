import React from 'react';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import WholesaleClient from './WholesaleClient';

export const metadata: Metadata = buildMetadata({
  title: 'Aluminium Hardware Wholesaler Chhattisgarh | Salasar',
  description:
    'Bulk hardware supply for dealers, fabricators and contractors across Chhattisgarh from our Raipur stock point. Send your item list for a trade quote.',
  path: '/wholesale',
});

export default function WholesalePage() {
  return <WholesaleClient />;
}
