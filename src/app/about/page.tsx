import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us — Aluminium Hardware Manufacturer | Salasar Raipur',
  description: 'Wholesale manufacturer & direct supplier of architectural aluminium extrusions, hardware fittings, and slim door profiles based in Raipur, Chhattisgarh.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
