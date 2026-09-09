import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About Salasar Aluminium & Hardware | Raipur's Trade Hardware Supplier",
  description: 'Learn about Salasar Aluminium & Hardware — a direct wholesale manufacturer and supplier of architectural aluminium extrusions and hardware, based in Raipur, Chhattisgarh.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
