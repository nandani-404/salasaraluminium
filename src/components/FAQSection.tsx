'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SAH_FAQS, SAHFAQ } from '@/lib/sahData';
import { getFaqSchema } from '@/lib/jsonld';
import { useEnquiry } from '@/context/EnquiryContext';
import Link from 'next/link';

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: SAHFAQ[];
  limit?: number;
  showContactCTA?: boolean;
}

export default function FAQSection({
  title = 'Frequently asked questions.',
  subtitle = "Can't find what you're looking for?",
  faqs = SAH_FAQS,
  limit,
  showContactCTA = true,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openEnquiryModal } = useEnquiry();

  const displayedFaqs = limit ? faqs.slice(0, limit) : faqs;
  const jsonLdSchema = getFaqSchema(displayedFaqs);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white border-t border-[#E2E8F0] font-sans">
      {/* FAQ Json-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Contact Support Link */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              COMMON QUESTIONS
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-[1.15]">
              Frequently<br className="hidden sm:inline" /> asked questions.
            </h2>

            <div className="pt-2 text-sm text-[#64748B]">
              <span>Can't find what you're looking for? </span>
              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="text-[#2563EB] font-semibold hover:underline cursor-pointer inline-flex items-center"
              >
                Contact support
              </button>
            </div>
          </div>

          {/* Right Column: Sleek Borderless Accordion */}
          <div className="lg:col-span-7 divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0]">
            {displayedFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left flex items-start justify-between space-x-4 cursor-pointer focus:outline-none group py-1"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug pr-2">
                      {faq.question}
                    </span>

                    <span className="shrink-0 text-[#64748B] group-hover:text-[#0F172A] transition-colors pt-0.5">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#64748B]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#94A3B8]" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                      >
                        <p className="pt-3 pb-2 text-sm text-[#64748B] leading-relaxed pr-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
