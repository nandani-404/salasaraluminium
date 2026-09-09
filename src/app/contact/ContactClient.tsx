'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2, Building2, PhoneCall, MessageCircle } from 'lucide-react';
import { enquirySchema, EnquiryFormData } from '@/lib/schema';
import { SAH_BUSINESS_DETAILS, SAH_CATEGORIES, FULL_CATALOGUE_PRODUCTS, ALL_INDIAN_STATES } from '@/lib/sahData';
import FAQSection from '@/components/FAQSection';

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const currentQuantity = watch('estimatedQuantity');

  const QUANTITY_PRESETS = ['10 Boxes', '50 Boxes', '100+ Boxes', 'Bulk Order'];

  const getWhatsAppQuoteUrl = () => {
    const parts = ['*Wholesale Trade Quote Request - Salasar Aluminium*'];
    const name = watch('fullName');
    const company = watch('companyName');
    const code = watch('saProductCode');
    const category = watch('productCategory');
    const qty = watch('estimatedQuantity');
    const state = watch('state');
    const msg = watch('message');

    if (name) parts.push(`Customer: ${name}`);
    if (company) parts.push(`Company: ${company}`);
    if (code) parts.push(`Product Code: ${code}`);
    if (category) parts.push(`Category: ${category}`);
    if (qty) parts.push(`Quantity: ${qty}`);
    if (state) parts.push(`State: ${state}`);
    if (msg) parts.push(`Requirements: ${msg}`);

    if (parts.length === 1) {
      parts.push('Hi Abhishek, I would like to enquire about wholesale hardware pricing and stock availability.');
    }
    return `https://wa.me/918007443071?text=${encodeURIComponent(parts.join('\n'))}`;
  };

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
      if (!response.ok) throw new Error(result.error || 'Failed to submit enquiry');

      setSubmittedLeadId(result.leadId || '');
      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#E8E6E1]">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest">
            Direct Trade Support & Location
          </span>
          <h1 className="text-4xl font-serif font-extrabold text-[#0B1F3A]">
            Contact Salasar Aluminium & Hardware
          </h1>
          <p className="text-gray-700 text-sm leading-relaxed">
            Reach out to Abhishek for direct trade orders, catalogue pricing, and store inquiries in Raipur.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-9 rounded-2xl border border-slate-200/80 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-widest block mb-1">
                Direct Wholesale Support
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Submit Direct Trade Enquiry
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Fill in your hardware requirements below for rapid trade quote response from our Raipur sales desk.
              </p>
            </div>

            {isSuccess ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Enquiry Received
                </h3>
                {submittedLeadId && (
                  <span className="font-mono text-xs font-bold px-3 py-1 bg-amber-50 text-amber-900 rounded-lg border border-amber-200">
                    Lead Reference: {submittedLeadId}
                  </span>
                )}
                <p className="text-xs text-slate-600 max-w-md leading-relaxed">
                  Thank you! Your inquiry has been routed directly to Abhishek at Salasar Aluminium & Hardware, and an email notification has been dispatched to our sales team.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                  <a
                    href={getWhatsAppQuoteUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center space-x-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Quote (8007443071)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setSubmittedLeadId('');
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Patel"
                      {...register('fullName')}
                      className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                    />
                    {errors.fullName && <span className="text-[11px] text-red-500 mt-1 block">{errors.fullName.message}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Firm / Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Patel Hardware Store"
                      {...register('companyName')}
                      className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@firm.com"
                      {...register('email')}
                      className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                    />
                    {errors.email && <span className="text-[11px] text-red-500 mt-1 block">{errors.email.message}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      {...register('phone')}
                      className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                    />
                    {errors.phone && <span className="text-[11px] text-red-500 mt-1 block">{errors.phone.message}</span>}
                  </div>
                </div>

                {/* Target Product & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Target Product / SA Code
                    </label>
                    <select
                      {...register('saProductCode')}
                      className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all cursor-pointer"
                    >
                      <option value="">-- General Hardware Enquiry --</option>
                      {FULL_CATALOGUE_PRODUCTS.map((product) => (
                        <option key={product.id} value={product.saCode}>
                          {product.saCode} : {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      State / Region
                    </label>
                    <select
                      {...register('state')}
                      className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all cursor-pointer"
                    >
                      <option value="">-- Select State --</option>
                      {ALL_INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quantity Required */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Quantity Required
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50 Boxes / 200 Pcs"
                    {...register('estimatedQuantity')}
                    className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                  />
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {QUANTITY_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setValue('estimatedQuantity', preset)}
                        className={`text-[10px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          currentQuantity === preset
                            ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Requirements & Notes */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Requirements & Project Details *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify sizes (e.g. 4 in / 6 in), finish preferences, dispatch urgency..."
                    {...register('message')}
                    className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all resize-none"
                  />
                  {errors.message && <span className="text-[11px] text-red-500 mt-1 block">{errors.message.message}</span>}
                </div>

                <div className="pt-2 space-y-2.5">
                  {/* WhatsApp Quote Button */}
                  <a
                    href={getWhatsAppQuoteUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 active:scale-[0.99] cursor-pointer"
                    title="Get instant trade quote on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Get Quotes on WhatsApp (8007443071)</span>
                  </a>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer active:scale-[0.99]"
                  >
                    <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Trade Enquiry'}</span>
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Address & Map Embed */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1F3A] text-white p-6 rounded-2xl border-t-4 border-[#C9A227] space-y-4">
              <h3 className="text-lg font-serif font-bold text-white">Raipur Store & Outlets</h3>
              
              <div className="flex items-start space-x-3 text-xs text-gray-300">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span>{SAH_BUSINESS_DETAILS.address}</span>
              </div>

              <div className="pt-2 space-y-1.5 text-xs text-gray-300 border-t border-white/10">
                <div className="font-bold text-[#C9A227]">Direct Wholesale Contacts:</div>
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-4 h-4 text-[#C9A227]" />
                  <span>Abhishek: 8007443071 / 9079332560</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-gray-300 border-t border-white/10 space-y-1">
                <div><strong>Branches:</strong> Salasar Aluminium & Hardware (Raipur), Lieon Marketing (Raipur) & Finetek (Raipur)</div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden border border-[#E8E6E1] shadow-sm h-[320px] bg-gray-100">
              <iframe
                title="Salasar Aluminium & Hardware Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.790938634931!2d81.62740000000001!3d21.2514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE1JzA1LjAiTiA4McKwMzcnMzguNiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
