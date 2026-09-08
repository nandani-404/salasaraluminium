'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, PhoneCall, ArrowRight } from 'lucide-react';
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
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about wholesale orders, SA codes, and regional delivery.',
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Section Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block">
            Direct Trade Support
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Minimal Accordion List */}
        <div className="space-y-3">
          {displayedFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.question}
                className={`bg-white border rounded-xl overflow-hidden transition-colors duration-200 ${
                  isOpen ? 'border-[#0B1F3A] shadow-2xs' : 'border-[#E2E8F0] hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between space-x-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <span className="text-xs font-mono font-bold text-[#94A3B8] shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#0B1F3A] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#0B1F3A] text-[#D4AF37]' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9] pl-12">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Minimal Bottom Banner */}
        {showContactCTA && (
          <div className="mt-14 p-6 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <h3 className="text-sm font-bold text-[#0B1F3A]">Have additional questions or specific site requirements?</h3>
              <p className="text-xs text-[#64748B]">Our sales desk in Raipur is available for instant trade quotes.</p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <a
                href="tel:+918007443071"
                className="px-4 py-2 bg-white border border-[#CBD5E1] text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-all flex items-center space-x-1.5 shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Sales</span>
              </a>

              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="px-4 py-2 bg-[#0B1F3A] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#1E293B] transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
