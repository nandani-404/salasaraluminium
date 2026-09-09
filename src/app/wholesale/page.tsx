import React from 'react';
import { Metadata } from 'next';
import WholesaleClient from './WholesaleClient';

export const metadata: Metadata = {
  title: 'Aluminium Hardware Wholesale Dealer Raipur | Salasar',
  description: 'Direct wholesale supplier & manufacturer of architectural aluminium hardware, door kits, closers, hinges, & sliding rollers in Raipur, Chhattisgarh.',
  alternates: {
    canonical: '/wholesale',
  },
};

export default function WholesalePage() {
  return <WholesaleClient />;
}
