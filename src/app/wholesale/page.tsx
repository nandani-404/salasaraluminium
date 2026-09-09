import React from 'react';
import { Metadata } from 'next';
import WholesaleClient from './WholesaleClient';

export const metadata: Metadata = {
  title: 'Wholesale Trade Pricing & Bulk Orders | Salasar Aluminium & Hardware',
  description: 'Request wholesale trade pricing on aluminium hardware in Raipur — bulk box quotes, direct factory rates, and same-day dispatch. Contact our trade desk today.',
  alternates: {
    canonical: '/wholesale',
  },
};

export default function WholesalePage() {
  return <WholesaleClient />;
}
