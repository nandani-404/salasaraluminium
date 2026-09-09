import React from 'react';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact & Trade Inquiry | Salasar Aluminium Hardware Raipur',
  description: 'Direct trade desk inquiry form, Bhaisthan store location map, and contact details for Abhishek at Salasar Aluminium & Hardware in Raipur.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
