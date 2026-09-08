'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  HelpCircle,
  PhoneCall,
  MessageSquare,
  Search,
  X,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
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
  title = 'Frequently Asked Questions',
  subtitle = 'Find quick answers about wholesale trade quotes, SA codes, product specifications, and delivery.',
  faqs = SAH_FAQS,
  limit,
  showContactCTA = true,
}: FAQSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [feedbackState, setFeedbackState] = useState<Record<number, 'yes' | 'no'>>({});

  const { openEnquiryModal } = useEnquiry();

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All'];
    faqs.forEach((f) => {
      if (f.category && !cats.includes(f.category)) {
        cats.push(f.category);
      }
    });
    return cats;
  }, [faqs]);

  // Filter FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    let result = faqs;

    if (selectedCategory !== 'All') {
      result = result.filter((f) => f.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          (f.category && f.category.toLowerCase().includes(q))
      );
    }

    if (limit && !searchQuery && selectedCategory === 'All') {
      result = result.slice(0, limit);
    }

    return result;
  }, [faqs, selectedCategory, searchQuery, limit]);

  const jsonLdSchema = useMemo(() => getFaqSchema(filteredFaqs), [filteredFaqs]);

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => {
    setOpenIndexes(filteredFaqs.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenIndexes([]);
  };

  const handleFeedback = (idx: number, type: 'yes' | 'no') => {
    setFeedbackState((prev) => ({ ...prev, [idx]: type }));
  };

  return (
    <section className="py-20 bg-slate-50/80 border-t border-slate-200 relative overflow-hidden">
      {/* Structural Subtle Gradient Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-[#0B1F3A]/5 to-transparent pointer-events-none" />

      {/* FAQ Json-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#0B1F3A]/5 border border-[#0B1F3A]/15 text-[#0B1F3A] rounded-full text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Help Desk & Knowledge Base</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight font-serif">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Search Bar & Category Controls */}
        <div className="space-y-4 mb-8">
          {/* Interactive Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions, SA codes, delivery, or custom finishes..."
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                  }`}
                >
                  {cat === 'All' ? 'All Questions' : cat}
                </button>
              );
            })}
          </div>

          {/* Expand / Collapse All Bar */}
          <div className="flex items-center justify-between pt-2 px-1 text-xs text-slate-500 font-medium border-b border-slate-200 pb-3">
            <span>
              Showing <strong className="text-slate-900">{filteredFaqs.length}</strong> {filteredFaqs.length === 1 ? 'question' : 'questions'}
            </span>
            <div className="space-x-3">
              <button
                type="button"
                onClick={expandAll}
                className="text-[#0B1F3A] font-bold hover:underline cursor-pointer"
              >
                Expand All
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Cards */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3 shadow-xs">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No matching questions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any FAQs matching "{searchQuery}". You can ask our direct sales desk right now!
            </p>
            <button
              type="button"
              onClick={() => openEnquiryModal()}
              className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-[#0B1F3A] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#1E293B] transition-all cursor-pointer"
            >
              <span>Ask Trade Desk</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndexes.includes(idx);
              const feedback = feedbackState[idx];

              return (
                <div
                  key={faq.question}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#0B1F3A] shadow-md ring-1 ring-[#0B1F3A]/5 border-l-4 border-l-[#D4AF37]'
                      : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between space-x-4 cursor-pointer focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <span className={`w-7 h-7 rounded-xl text-xs font-extrabold flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#0B1F3A] text-[#D4AF37]' : 'bg-slate-100 text-slate-700 group-hover:bg-[#0B1F3A]/10 group-hover:text-[#0B1F3A]'
                      }`}>
                        Q{idx + 1}
                      </span>

                      <div className="flex flex-col min-w-0">
                        {faq.category && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-0.5">
                            {faq.category}
                          </span>
                        )}
                        <span className="text-sm sm:text-base font-bold text-[#0B1F3A] group-hover:text-[#8C6B1B] transition-colors leading-snug">
                          {faq.question}
                        </span>
                      </div>
                    </div>

                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'bg-[#0B1F3A] text-[#D4AF37]' : 'bg-slate-100 text-slate-400 group-hover:text-slate-700'
                    }`}>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 space-y-4">
                          {/* Answer text */}
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                            {faq.answer}
                          </p>

                          {/* Contextual Action Badges */}
                          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-100/80">
                            <button
                              type="button"
                              onClick={() => openEnquiryModal()}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#0B1F3A] text-white text-[11px] font-bold rounded-lg hover:bg-[#1E293B] transition-all cursor-pointer shadow-2xs"
                            >
                              <MessageSquare className="w-3 h-3 text-[#D4AF37]" />
                              <span>Enquire for this</span>
                            </button>

                            <a
                              href="tel:+918007443071"
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-50 text-[#8C6B1B] border border-amber-200 text-[11px] font-bold rounded-lg hover:bg-amber-100 transition-all"
                            >
                              <PhoneCall className="w-3 h-3 text-[#8C6B1B]" />
                              <span>Call Sales Desk</span>
                            </a>

                            <Link
                              href="/products"
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg hover:bg-slate-200 transition-all"
                            >
                              <BookOpen className="w-3 h-3 text-slate-500" />
                              <span>View 86 Catalogue SKUs</span>
                            </Link>
                          </div>

                          {/* Micro Feedback Bar */}
                          <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                            <span>Was this answer helpful?</span>
                            <div className="flex items-center space-x-2">
                              {feedback ? (
                                <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Thanks for feedback!</span>
                                </span>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleFeedback(idx, 'yes')}
                                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer flex items-center space-x-1"
                                    title="Yes"
                                  >
                                    <ThumbsUp className="w-3.5 h-3.5" />
                                    <span>Yes</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleFeedback(idx, 'no')}
                                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-red-500 transition-colors cursor-pointer flex items-center space-x-1"
                                    title="No"
                                  >
                                    <ThumbsDown className="w-3.5 h-3.5" />
                                    <span>No</span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* Classic Contact CTA card */}
        {showContactCTA && (
          <div className="mt-14 p-6 sm:p-8 bg-[#0B1F3A] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#0B1F3A] relative overflow-hidden">
            {/* Subtle Gold Diagonal Line Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-1.5 text-center sm:text-left relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                Raipur Direct Support Desk
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Need customized profiles or bulk trade quotes?
              </h3>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                Connect directly with Abhishek for wholesale price lists, site estimates, and immediate inventory dispatch.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 relative z-10">
              <a
                href="tel:+918007443071"
                className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#C9A227] text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2 active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1F3A]" />
                <span>+91 8007443071</span>
              </a>

              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/20 transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                <span>Request Trade Quote</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
