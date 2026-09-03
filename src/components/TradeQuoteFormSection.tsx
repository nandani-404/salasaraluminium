'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Send, ShieldCheck, PhoneCall } from 'lucide-react';
import { enquirySchema, EnquiryFormData } from '@/lib/schema';
import { SAH_CATEGORIES, SAH_BUSINESS_DETAILS } from '@/lib/sahData';

export default function TradeQuoteFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      productCategory: 'rollers-bearings-channels',
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit enquiry');
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="trade-quote" className="py-20 bg-[#F8FAFC] border-t border-[#E2E8F0] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Trade Info */}
          <div className="lg:col-span-5 space-y-6 pt-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
                Direct Trade Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-tight mt-1.5 leading-snug">
                Request Wholesale Quote & Specifications
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Connect directly with Abhishek at Salasar Aluminium & Hardware for wholesale catalog pricing, bulk box quotes, and direct manufacturing stock availability in Raipur.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] block">Direct Sales Desk</span>
                <span className="text-sm font-semibold text-[#0B1F3A] block mt-0.5">Abhishek — Sales Director</span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] block">Raipur Main Showroom</span>
                <span className="text-xs text-[#334155] leading-relaxed block mt-1">
                  {SAH_BUSINESS_DETAILS.address}
                </span>
              </div>

              {/* Normal Sized Call Button Below Cards */}
              <div className="pt-1">
                <a
                  href="tel:+918007443071"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#0B1F3A] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#1E293B] active:scale-95 transition-all shadow-xs group"
                >
                  <PhoneCall className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                  <span>Call Direct Sales: +91 8007443071</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Minimal Form */}
          <div className="lg:col-span-7 bg-white text-[#0B1F3A] rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8">
            {isSuccess ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 bg-[#F0FDF4] border border-[#BBF7D0] rounded-full flex items-center justify-center text-[#166534]">
                  <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A]">Trade Quote Request Dispatched</h3>
                <p className="text-[#475569] max-w-md text-sm leading-relaxed">
                  Thank you! Your quote request has been sent to our Raipur sales engineering desk. Abhishek will call or WhatsApp you shortly with wholesale trade pricing.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2.5 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E293B] transition-colors shadow-2xs cursor-pointer"
                >
                  Submit Another Trade Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="pb-3 border-b border-[#F1F5F9]">
                  <h3 className="text-lg font-bold text-[#0B1F3A]">Wholesale Quote Form</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">Fill in your requirements to receive direct factory rates.</p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#0B1F3A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0B1F3A] transition-colors"
                    />
                    {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName.message}</p>}
                  </div>

                  {/* Company / Dealer Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Company / Firm Name
                    </label>
                    <input
                      type="text"
                      {...register('companyName')}
                      placeholder="e.g. Kumar Hardware Traders"
                      className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#0B1F3A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0B1F3A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="rajesh@firm.com"
                      className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#0B1F3A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0B1F3A] transition-colors"
                    />
                    {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+91 9876543210"
                      className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#0B1F3A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0B1F3A] transition-colors"
                    />
                    {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Product Category *
                    </label>
                    <select
                      {...register('productCategory')}
                      className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#0B1F3A] focus:outline-none focus:border-[#0B1F3A] transition-colors"
                    >
                      {SAH_CATEGORIES.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name} ({cat.codePrefix})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* SA Code Optional */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Specific SA Code (Optional)
                    </label>
                    <input
                      type="text"
                      {...register('saProductCode')}
                      placeholder="e.g. SA-33 or SA-12"
                      className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#0B1F3A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0B1F3A] transition-colors"
                    />
                  </div>
                </div>

                {/* Message / Quantity Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1">
                    Order Quantity & Special Notes
                  </label>
                  <textarea
                    rows={3}
                    {...register('message')}
                    placeholder="Specify required box quantities, profile lengths, finishes (CP/SN/SS), or delivery destination..."
                    className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#0B1F3A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0B1F3A] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#0B1F3A] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E293B] active:scale-95 transition-all shadow-xs flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Dispatching Request...</span>
                  ) : (
                    <>
                      <span>Submit Trade Quote Request</span>
                      <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
