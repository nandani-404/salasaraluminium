import React from 'react';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import ContactClient from './ContactClient';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Salasar Aluminium & Hardware, Raipur',
  description:
    'Call, WhatsApp or visit our Bhaisthan counter in Raipur for aluminium door and window hardware. Send an SA code or a photo and we will quote it.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactClient />;
}
