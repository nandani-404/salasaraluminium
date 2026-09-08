'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, CheckCircle2, ArrowRight, PhoneCall, Shield } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { enquirySchema, EnquiryFormData } from '@/lib/schema';
import { SAH_CATEGORIES, FULL_CATALOGUE_PRODUCTS, ALL_INDIAN_STATES } from '@/lib/sahData';

const QUANTITY_PRESETS = ['10 Boxes', '50 Boxes', '100+ Boxes', 'Bulk Order'];

export default function EnquiryModal() {
  const { isOpen, selectedProduct, closeEnquiryModal } = useEnquiry();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
    defaultValues: {
      productCategory: 'rollers-bearings-channels',
    },
  });

  const currentQuantity = watch('estimatedQuantity');
  const targetCodeInput = (watch('saProductCode') || selectedProduct || '').trim();

  // Lookup matched product for live image & details preview
  const matchedProduct = targetCodeInput
    ? FULL_CATALOGUE_PRODUCTS.find(
        (p) =>
          p.saCode.toLowerCase() === targetCodeInput.toLowerCase() ||
          p.id.toLowerCase() === targetCodeInput.toLowerCase() ||
          p.name.toLowerCase().includes(targetCodeInput.toLowerCase())
      )
    : undefined;

  const previewImage = matchedProduct ? matchedProduct.image : '/salasar-store-main.png';
  const previewName = matchedProduct ? matchedProduct.name : (targetCodeInput ? `SA Code: ${targetCodeInput}` : 'Trade Hardware Enquiry');
  const previewCategory = matchedProduct ? matchedProduct.categoryName : 'Salasar Aluminium & Hardware';

  useEffect(() => {
    if (selectedProduct) {
      setValue('saProductCode', selectedProduct);
    }
  }, [selectedProduct, setValue]);

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

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMessage('');
    closeEnquiryModal();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Minimal Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        {/* Minimal Classic Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-10 my-6 font-sans text-slate-900"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Classic Product Header Card with Image Preview */}
          <div className="bg-slate-50 p-5 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-5">
            {/* Product Image Thumbnail */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1.5 shadow-2xs">
              <Image 
                src={previewImage} 
                alt={previewName} 
                fill 
                sizes="100px" 
                className="object-contain p-1" 
                suppressHydrationWarning
              />
              {matchedProduct && (
                <div className="absolute top-1 left-1 bg-[#0F172A] text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                  {matchedProduct.saCode}
                </div>
              )}
            </div>

            {/* Product Context Details */}
            <div className="space-y-1 text-center sm:text-left pr-6">
              <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-widest block">
                {previewCategory}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {previewName}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {matchedProduct?.shortDesc || 'Wholesale trade supply direct from Salasar Aluminium & Hardware, Raipur.'}
              </p>
            </div>
          </div>

          {/* Minimal Form Body */}
          <div className="p-5 sm:p-7">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center flex flex-col items-center justify-center space-y-3"
              >
                <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Enquiry Received</h3>
                <p className="text-slate-600 max-w-sm text-xs leading-relaxed">
                  Thank you! Your request for <span className="font-semibold text-slate-900">{previewName}</span> has been routed to our sales team in Raipur.
                </p>
                <div className="text-xs text-slate-500 pt-1 font-medium">
                  Direct Line: +91 8007443071 / 9079332560
                </div>
                <button
                  onClick={handleClose}
                  className="mt-2 px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                    {errorMessage}
                  </div>
                )}

                {/* Name & Firm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                    {errors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Company / Firm Name
                    </label>
                    <input
                      type="text"
                      {...register('companyName')}
                      placeholder="e.g. Kumar Hardware Traders"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="rajesh@firm.com"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* SA Code & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Target Product / SA Code
                    </label>
                    <select
                      {...register('saProductCode')}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors cursor-pointer"
                    >
                      <option value="">-- Select Product / General Enquiry --</option>
                      {FULL_CATALOGUE_PRODUCTS.map((product) => (
                        <option key={product.id} value={product.saCode}>
                          {product.saCode} : {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Quantity Required *
                    </label>
                    <input
                      type="text"
                      {...register('estimatedQuantity')}
                      placeholder="e.g. 50 Boxes / 200 Pcs"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />

                    {/* Minimal Chips */}
                    <div className="mt-1 flex flex-wrap gap-1">
                      {QUANTITY_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setValue('estimatedQuantity', preset)}
                          className={`text-[9px] font-medium px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                            currentQuantity === preset 
                              ? 'bg-slate-900 text-white border-slate-900' 
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Finish & Delivery Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Preferred Finish / Color
                    </label>
                    <input
                      type="text"
                      {...register('preferredFinish')}
                      placeholder="e.g. Powder Coated Black / CP"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      State / Region
                    </label>
                    <select
                      {...register('state')}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors cursor-pointer"
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

                {/* Notes */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Requirements & Notes *
                  </label>
                  <textarea
                    rows={2}
                    {...register('message')}
                    placeholder="Specify sizes (e.g. 4 in / 6 in), dispatch urgency, or project site details..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                  />
                  {errors.message && <p className="text-red-500 text-[10px] mt-0.5">{errors.message.message}</p>}
                </div>

                {/* Minimal Action Footer */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                    <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                    <span>Direct: +91 8007443071</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium tracking-wide rounded-lg transition-all shadow-xs flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Submit Request'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


