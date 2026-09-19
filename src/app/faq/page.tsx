import React from 'react';
import Link from 'next/link';
import FAQSection from '@/components/FAQSection';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/jsonld';
import { BUSINESS, TEL_HREF, whatsappLink } from '@/config/business';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Aluminium Hardware FAQ, Raipur | Salasar',
  description:
    'How to order by SA code, what we stock, delivery across Chhattisgarh, finishes and sizes, and whether we sell to homeowners. Straight answers, no sign-up.',
  path: '/faq',
});

export default function FAQPage() {
  return (
    <div className="pt-16 sm:pt-24 min-h-screen bg-white">
      <JsonLd
        schema={getBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'FAQ', item: '/faq' },
        ])}
      />

      {/*
        This page had no <h1> at all. FAQSection renders its title as an <h2>,
        which is correct for a block reused across many pages, but on a page
        whose entire subject is the FAQ that left the document with no top-level
        heading — a page-level defect for both search engines and screen readers.
      */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-2 space-y-4">
        <nav aria-label="Breadcrumb" className="text-xs text-[#64748B]">
          <Link href="/" className="hover:text-[#0B1F3A]">
            Home
          </Link>
          <span className="mx-1.5" aria-hidden="true">
            /
          </span>
          <span className="text-[#0B1F3A] font-semibold">FAQ</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
          Aluminium Hardware FAQ — Ordering, Delivery and Stock
        </h1>

        <p className="text-base text-[#475569] leading-relaxed max-w-3xl">
          Answers to what people actually ask before ordering: how SA codes work, how to identify a
          part you cannot name, whether we sell to homeowners, and what delivery across Chhattisgarh
          involves. If your question is not here, call{' '}
          <a href={TEL_HREF} className="text-[#0B1F3A] font-semibold underline" data-analytics="click_call" data-analytics-location="faq-intro">
            {BUSINESS.phones.primary.display}
          </a>{' '}
          or{' '}
          <a
            href={whatsappLink({
              message: 'Hello Salasar, I have a question about your hardware.',
              source: '/faq',
              campaign: 'faq',
            })}
            data-analytics="click_whatsapp"
            data-analytics-location="faq-intro"
            className="text-[#0B1F3A] font-semibold underline"
          >
            send it on WhatsApp
          </a>
          .
        </p>
      </header>

      <FAQSection
        title="Ordering, delivery and stock"
        subtitle="Everything below is answered in full on this page — no form to fill in first."
      />

      <TradeQuoteFormSection />
    </div>
  );
}
