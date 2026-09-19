import React from 'react';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/JsonLd';
import { getLocalBusinessSchema, getBreadcrumbSchema } from '@/lib/jsonld';
import ContactClient from './ContactClient';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Salasar Aluminium & Hardware, Raipur',
  description:
    'Call, WhatsApp or visit our Bhaisthan counter in Raipur for aluminium door and window hardware. Send an SA code or a photo and we will quote it.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      {/*
        HardwareStore (a LocalBusiness subtype) belongs on the pages that are
        about the physical shop — the homepage, /locations and here. This page
        had neither it nor a breadcrumb, which is a miss on the single page
        most likely to be surfaced for "hardware shop in Raipur".
      */}
      <JsonLd schema={getLocalBusinessSchema()} />
      <JsonLd
        schema={getBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Contact', item: '/contact' },
        ])}
      />
      <ContactClient />
    </>
  );
}
