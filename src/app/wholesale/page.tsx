import React from 'react';
import { Metadata } from 'next';
import WholesaleClient from './WholesaleClient';

export const metadata: Metadata = {
  title: 'Wholesale Trade & Bulk Supply',
  description: 'Request wholesale trade quotes on aluminium hardware in Raipur — bulk rates, direct factory pricing, and same-day dispatch for dealers & contractors.',
  alternates: {
    canonical: '/wholesale',
  },
};

export default function WholesalePage() {
  return <WholesaleClient />;
}
