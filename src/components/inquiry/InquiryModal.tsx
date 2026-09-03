'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, FileText } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { Button } from '@/components/ui/Button';

interface InquiryModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryModal({ product, isOpen, onClose }: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: product ? product.moq : 10,
    finish: product ? product.finish : 'Standard Anodized',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2620]/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FAF7F0] border border-[#D8D1C4] shadow-luxury p-6 md:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#2B2620] hover:text-[#B08D57] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-[#B08D57] mx-auto" />
            <h2 className="font-serif text-2xl text-[#2B2620]">Quotation Request Received</h2>
            <p className="text-xs text-[#2B2620]/70 leading-relaxed max-w-md mx-auto">
              Thank you for inquiring with Salasar Aluminium & Hardware. Our technical sales engineers will review your specifications and contact you within 24 business hours with custom trade pricing and availability.
            </p>
            <div className="pt-4">
              <Button variant="primary" onClick={handleReset}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#B08D57]">
              <FileText className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-semibold">B2B Trade & Inquiry</span>
            </div>
            <h2 className="font-serif text-2xl text-[#2B2620] mb-1">
              Request Price Quote & Specs
            </h2>
            <p className="text-xs text-[#2B2620]/70 mb-6">
              {product
                ? `Inquiring about: ${product.name} (${product.sku})`
                : 'Get tailored trade pricing and technical documentation for your project.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2B2620] font-medium mb-1 uppercase tracking-wider text-[10px]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full p-2.5 bg-white border border-[#D8D1C4] text-[#2B2620] focus:border-[#B08D57] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#2B2620] font-medium mb-1 uppercase tracking-wider text-[10px]">
                    Company / Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Architects Pvt Ltd"
                    className="w-full p-2.5 bg-white border border-[#D8D1C4] text-[#2B2620] focus:border-[#B08D57] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2B2620] font-medium mb-1 uppercase tracking-wider text-[10px]">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full p-2.5 bg-white border border-[#D8D1C4] text-[#2B2620] focus:border-[#B08D57] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#2B2620] font-medium mb-1 uppercase tracking-wider text-[10px]">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 bg-white border border-[#D8D1C4] text-[#2B2620] focus:border-[#B08D57] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2B2620] font-medium mb-1 uppercase tracking-wider text-[10px]">
                    Estimated Quantity / Meters *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 bg-white border border-[#D8D1C4] text-[#2B2620] focus:border-[#B08D57] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#2B2620] font-medium mb-1 uppercase tracking-wider text-[10px]">
                    Preferred Surface Finish
                  </label>
                  <input
                    type="text"
                    value={formData.finish}
                    onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                    placeholder="e.g. Anodized Bronze, Matte Black"
                    className="w-full p-2.5 bg-white border border-[#D8D1C4] text-[#2B2620] focus:border-[#B08D57] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2B2620] font-medium mb-1 uppercase tracking-wider text-[10px]">
                  Project Location / Specific Customization Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention profile length, custom cut-outs, alloy grade requirement (e.g. 6063-T6), or site delivery details..."
                  className="w-full p-2.5 bg-white border border-[#D8D1C4] text-[#2B2620] focus:border-[#B08D57] outline-none"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full py-3">
                <Send className="w-4 h-4 mr-2" /> Submit Quote Request
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
