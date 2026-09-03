'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2, Building2, PhoneCall } from 'lucide-react';
import { enquirySchema, EnquiryFormData } from '@/lib/schema';
import { SAH_BUSINESS_DETAILS, SAH_CATEGORIES } from '@/lib/sahData';

export default function ContactPage() {
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
      if (!response.ok) throw new Error(result.error || 'Failed to submit enquiry');

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
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#E8E6E1] shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0B1F3A]">
                Submit Direct Trade Enquiry
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Fill in your hardware requirements below for rapid trade quote response.
              </p>
            </div>

            {isSuccess ? (
              <div className="py-12 text-center flex flex-col items-center space-y-4">
                <div className="w-14 h-14 bg-[#C9A227]/20 text-[#C9A227] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0B1F3A]">
                  Enquiry Dispatched to Sales Team
                </h3>
                <p className="text-xs text-gray-600 max-w-md">
                  Thank you! Abhishek will review your requirements and reach out on your contact number.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 bg-[#C9A227] text-[#0B1F3A] text-xs font-bold rounded hover:bg-[#b08d20]"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded">{errorMessage}</div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Patel"
                      {...register('fullName')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A]"
                    />
                    {errors.fullName && <span className="text-xs text-red-500 mt-1 block">{errors.fullName.message}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Firm / Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Patel Hardware Store"
                      {...register('companyName')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@firm.com"
                      {...register('email')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A]"
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      {...register('phone')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A]"
                    />
                    {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Product Category *
                    </label>
                    <select
                      {...register('productCategory')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A]"
                    >
                      {SAH_CATEGORIES.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Target SA Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SA-33 Aluminium Door Kit"
                      {...register('saProductCode')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                    Requirements & Quantity *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specify requirements, finishes, quantities, or delivery location..."
                    {...register('message')}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A]"
                  />
                  {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#C9A227] text-[#0B1F3A] text-xs font-extrabold uppercase tracking-wider rounded-md hover:bg-[#b08d20] transition-colors shadow flex items-center justify-center space-x-2"
                >
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Trade Enquiry'}</span>
                  <Send className="w-4 h-4 text-[#0B1F3A]" />
                </button>
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
                <div><strong>Manufactured By:</strong> Swastik Industries, Mumbai</div>
                <div><strong>Branches:</strong> Salasar Aluminium & Hardware (Raipur) & Lieon Marketing (Raipur)</div>
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
    </div>
  );
}
