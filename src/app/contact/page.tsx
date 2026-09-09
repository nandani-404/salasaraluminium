import React from 'react';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Salasar Aluminium & Hardware | Raipur Trade Desk',
  description: 'Reach our Raipur trade desk for wholesale aluminium hardware pricing — call, WhatsApp, or submit a trade quote request. Open 9 AM–9 PM daily.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
