'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, CheckCircle2, PhoneCall, Building2, MapPin, Send } from 'lucide-react';
import { enquirySchema, EnquiryFormData } from '@/lib/schema';
import { SAH_BUSINESS_DETAILS, SAH_CATEGORIES } from '@/lib/sahData';

export default function WholesalePage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      businessType: 'dealer',
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
      if (!response.ok) throw new Error(result.error || 'Submission failed');

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-[#E8E6E1]">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest">
            B2B Trade Accounts & Bulk Distribution
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#0B1F3A]">
            Wholesale & Trade Account Enquiry
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Salasar Aluminium & Hardware supplies dealers, fabricators, contractors, and retailers at direct wholesale prices with zero retail markup.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Trade Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#0B1F3A]">
              Why Open a Trade Account With Us?
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl flex items-start space-x-3">
                <ShieldCheck className="w-6 h-6 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">Direct Factory Pricing</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Manufactured by Swastik Industries (Mumbai) and distributed through our Raipur branches.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl flex items-start space-x-3">
                <Building2 className="w-6 h-6 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">Ready Stocking Outlets</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Salasar Aluminium & Hardware & Lieon Marketing outlets in Raipur ensure fast dispatch.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">Full 86-SKU Catalogue Support</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Order complete boxes or mixed hardware containers under standard SA product codes.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="p-5 bg-[#0B1F3A] text-white rounded-xl space-y-3 text-xs border-t-4 border-[#C9A227]">
              <div className="font-bold text-[#C9A227] uppercase tracking-wider">Direct Wholesale Contacts</div>
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-[#C9A227]" />
                <span>Abhishek: +91 8007443071 / +91 9079332560</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-300 pt-1">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span>{SAH_BUSINESS_DETAILS.address}</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#E8E6E1] shadow-xl">
            <h2 className="text-2xl font-serif font-bold text-[#0B1F3A] mb-2">
              Apply for Trade Account / Bulk Quote
            </h2>
            <p className="text-xs text-gray-600 mb-6">
              Fill out your business details below to receive our B2B trade rate card.
            </p>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C9A227] mx-auto" />
                <h3 className="text-2xl font-serif font-bold text-[#0B1F3A]">Application Received</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you! Abhishek from our Raipur sales team will review your business credentials and call you shortly.
                </p>
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
                      {...register('fullName')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm"
                    />
                    {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Firm / Business Name *
                    </label>
                    <input
                      type="text"
                      {...register('companyName')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm"
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
                      {...register('email')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm"
                    />
                    {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm"
                    />
                    {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Business Type
                    </label>
                    <select
                      {...register('businessType')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm"
                    >
                      <option value="dealer">Hardware Dealer / Stockist</option>
                      <option value="fabricator">Aluminium Fabricator</option>
                      <option value="contractor">Building Contractor</option>
                      <option value="retailer">Retail Store Owner</option>
                      <option value="end_user">Project Owner / Builder</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Primary Category Interest
                    </label>
                    <select
                      {...register('productCategory')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm"
                    >
                      {SAH_CATEGORIES.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                    Trade Requirements & Estimated Volume *
                  </label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    placeholder="Mention specific SA codes (e.g. SA-33, SA-35), expected monthly box quantities, and delivery location..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm"
                  />
                  {errors.message && <p className="text-red-500 text-[11px] mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#C9A227] text-[#0B1F3A] text-xs font-extrabold uppercase tracking-wider rounded-md hover:bg-[#b08d20] transition-colors shadow flex items-center justify-center space-x-2"
                >
                  <span>{isSubmitting ? 'Submitting Application...' : 'Submit Wholesale Application'}</span>
                  <Send className="w-4 h-4 text-[#0B1F3A]" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
