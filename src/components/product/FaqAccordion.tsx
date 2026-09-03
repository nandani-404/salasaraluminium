'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProductFaq } from '@/lib/data/products';

interface FaqAccordionProps {
  faqs: ProductFaq[];
  title?: string;
}

export function FaqAccordion({ faqs, title = 'Frequently Asked Questions' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {title && <h3 className="font-serif text-xl text-[#2B2620] mb-6">{title}</h3>}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#D8D1C4] transition-colors duration-200"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-serif text-[#2B2620] hover:text-[#B08D57] transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#B08D57] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 border-t border-[#D8D1C4]/40 text-xs text-[#2B2620]/80 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
