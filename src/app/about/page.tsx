import React from 'react';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import AboutClient from './AboutClient';

export const metadata: Metadata = buildMetadata({
  title: 'About Salasar Aluminium & Hardware, Raipur',
  description:
    'Who we are, where our counter is in Bhaisthan Raipur, what we stock and how to order. Trade rates for dealers, single-project supply for everyone else.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutClient />;
}
