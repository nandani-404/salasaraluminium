import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Salasar Hardware Raipur',
  description: 'Wholesale manufacturer and supplier of architectural aluminium extrusions, locks, hinges, and fittings based in Raipur, Chhattisgarh. Learn our history.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
