import React from 'react';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Trade Desk Raipur',
  description: 'Reach our Raipur trade desk for wholesale hardware pricing — call, WhatsApp, or submit a trade quote request. Open 9 AM–9 PM daily in Raipur.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
