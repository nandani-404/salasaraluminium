'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, CheckCircle2, Send, ShieldCheck, PhoneCall } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { enquirySchema, EnquiryFormData } from '@/lib/schema';
import { SAH_CATEGORIES } from '@/lib/sahData';

export default function EnquiryModal() {
  const { isOpen, selectedProduct, closeEnquiryModal } = useEnquiry();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      productCategory: 'rollers-bearings-channels',
    },
  });

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#0B1F3A]/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E8E6E1] overflow-hidden z-10 my-8"
        >
          {/* Header Bar */}
          <div className="bg-[#0B1F3A] text-white p-6 relative border-b-4 border-[#C9A227]">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-gray-300 hover:text-white transition-colors p-1"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2 text-[#C9A227] text-xs font-bold uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Wholesale Manufacturer Direct Trade Inquiry</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">
              {selectedProduct ? `Enquire: ${selectedProduct}` : 'Request Wholesale Quote & Catalogue Specs'}
            </h2>
            <p className="text-gray-300 text-xs mt-1">
              Direct connection with Abhishek (Salasar Aluminium & Hardware, Raipur). Fast wholesale pricing response.
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 bg-[#C9A227]/20 rounded-full flex items-center justify-center text-[#C9A227]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0B1F3A]">Enquiry Sent to Salasar Team</h3>
                <p className="text-gray-600 max-w-md text-sm leading-relaxed">
                  Thank you! Your wholesale enquiry has been dispatched directly to our Raipur branch office. Abhishek will contact you shortly with trade pricing.
                </p>
                <div className="p-3 bg-[#FAF9F6] border border-[#E8E6E1] rounded-lg text-xs text-[#0B1F3A] font-medium">
                  Direct Line: +91 8007443071 / 9079332560
                </div>
                <button
                  onClick={handleClose}
                  className="mt-4 px-8 py-3 bg-[#C9A227] text-[#0B1F3A] font-bold rounded-md hover:bg-[#b08d20] transition-colors shadow-md"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A] focus:outline-none focus:border-[#C9A227]"
                    />
                    {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName.message}</p>}
                  </div>

                  {/* Company / Dealer Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Company / Firm Name
                    </label>
                    <input
                      type="text"
                      {...register('companyName')}
                      placeholder="e.g. Kumar Hardware Traders"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A] focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="rajesh@firm.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A] focus:outline-none focus:border-[#C9A227]"
                    />
                    {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+91 9876543210"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A] focus:outline-none focus:border-[#C9A227]"
                    />
                    {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Product Category *
                    </label>
                    <select
                      {...register('productCategory')}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A] focus:outline-none focus:border-[#C9A227]"
                    >
                      {SAH_CATEGORIES.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name} ({cat.codePrefix})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* SA Code or Item Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                      Target SA Code / Item
                    </label>
                    <input
                      type="text"
                      {...register('saProductCode')}
                      placeholder="e.g. SA-33 Aluminium Door Kit"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A] focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>
                </div>

                {/* Message & Quantity */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                    Requirements & Quantity Details *
                  </label>
                  <textarea
                    rows={3}
                    {...register('message')}
                    placeholder="Specify target finishes, sizes (e.g. 4 inch / 6 inch), box quantities, and delivery location..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E6E1] rounded-md text-sm text-[#0B1F3A] focus:outline-none focus:border-[#C9A227]"
                  />
                  {errors.message && <p className="text-red-500 text-[11px] mt-1">{errors.message.message}</p>}
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-gray-500 flex items-center space-x-1">
                    <PhoneCall className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>Direct: 8007443071</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3 bg-[#C9A227] text-[#0B1F3A] text-xs font-extrabold uppercase tracking-wider rounded-md hover:bg-[#b08d20] transition-all shadow flex items-center space-x-2 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Submit Wholesale Quote Request'}</span>
                    <Send className="w-3.5 h-3.5 text-[#0B1F3A]" />
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
