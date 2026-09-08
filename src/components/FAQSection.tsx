'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, MessageSquare } from 'lucide-react';
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
  subtitle = 'Find quick answers about wholesale trade quotes, SA codes, product specifications, and delivery.',
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
    <section className="py-20 bg-slate-50/70 border-t border-slate-200">
      {/* FAQ Json-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 border border-amber-200 text-[#8C6B1B] rounded-full text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {displayedFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-[#0B1F3A] shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between space-x-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-[#0B1F3A] text-xs font-bold flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="text-sm font-bold text-[#0B1F3A] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0B1F3A]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pl-14">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA card */}
        {showContactCTA && (
          <div className="mt-12 p-6 bg-[#0B1F3A] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-white">Have a specific project question or site drawing?</h3>
              <p className="text-xs text-slate-300">Speak directly with our Raipur trade desk for custom SKU inquiries.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href="tel:+918007443071"
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C9A227] text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center space-x-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Sales</span>
              </a>

              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-white/20 transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask via Enquiry</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
