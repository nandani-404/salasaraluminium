'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SAH_FAQS, SAHFAQ } from '@/lib/sahData';
import { getFaqSchema } from '@/lib/jsonld';
import { useEnquiry } from '@/context/EnquiryContext';

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
    <section className="py-10 sm:py-24 bg-white border-t border-[#E2E8F0] relative overflow-visible" style={{ overflow: 'visible' }}>
      {/* FAQ Json-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Contact Support Link */}
          <div className="lg:col-span-5 space-y-4 pt-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block">
              COMMON QUESTIONS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight leading-[1.15]">
              {title}
            </h2>

            <div className="pt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
              <span>Can't find what you're looking for? </span>
              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="text-[#0B1F3A] font-bold underline hover:text-[#9A7B1C] transition-colors cursor-pointer inline-flex items-center"
              >
                Contact support
              </button>
            </div>
          </div>

          {/* Right Column: All Questions Shown Openly on Screen Without Any Scroll Bar */}
          <div className="lg:col-span-7 divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0]">
            {displayedFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div key={faq.question} className="py-5">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className="w-full text-left flex items-start justify-between space-x-4 cursor-pointer focus:outline-none group py-1"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-bold text-[#0B1F3A] group-hover:text-[#9A7B1C] transition-colors leading-snug pr-2">
                        {faq.question}
                      </span>

                      <span className="shrink-0 text-[#64748B] group-hover:text-[#0B1F3A] transition-colors pt-0.5">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#0B1F3A]" />
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
                          <p className="pt-3 pb-2 text-xs sm:text-sm text-[#475569] leading-relaxed pr-6">
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
