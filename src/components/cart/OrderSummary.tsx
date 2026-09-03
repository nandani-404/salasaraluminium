'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Tag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function OrderSummary() {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const subtotal = useCartStore((state) => state.getSubtotal());
  const discount = useCartStore((state) => state.getDiscountAmount());
  const tax = useCartStore((state) => state.getTaxAmount());
  const total = useCartStore((state) => state.getTotal());
  const couponCode = useCartStore((state) => state.couponCode);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponSuccess(`Coupon ${couponInput.toUpperCase()} applied successfully!`);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try LUXURY10 or SALASAR15.');
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#D8D1C4] p-6 space-y-6 shadow-luxury">
      <h3 className="font-serif text-xl text-[#2B2620] pb-4 border-b border-[#D8D1C4]">
        Order Summary
      </h3>

      {/* Coupon Field */}
      <form onSubmit={handleApplyCoupon} className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Coupon Code (e.g. LUXURY10)"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <Button type="submit" variant="secondary" size="sm">
            Apply
          </Button>
        </div>
        {couponError && <p className="text-xs text-red-500">{couponError}</p>}
        {couponSuccess && <p className="text-xs text-emerald-700">{couponSuccess}</p>}
        {couponCode && (
          <div className="flex items-center justify-between text-xs bg-[#FAF7F0] p-2 border border-[#B08D57]/30">
            <span className="flex items-center text-[#B08D57]">
              <Tag className="w-3.5 h-3.5 mr-1" /> {couponCode} Applied
            </span>
            <button
              onClick={removeCoupon}
              className="text-[#2B2620]/60 hover:text-red-500 text-[10px] underline"
            >
              Remove
            </button>
          </div>
        )}
      </form>

      {/* Cost Breakdown */}
      <div className="space-y-3 text-xs text-[#2B2620]/80 border-t border-b border-[#D8D1C4] py-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span>Trade Discount</span>
            <span>- ₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>GST (18% Hardware Standard)</span>
          <span>₹{tax.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping & Insurance</span>
          <span className="text-[#B08D57] font-medium">Complimentary Trade Express</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline pt-2">
        <span className="font-serif text-lg text-[#2B2620]">Total Amount</span>
        <span className="font-serif text-2xl font-bold text-[#2B2620]">
          ₹{total.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Checkout Action */}
      <Link href="/checkout" className="block w-full">
        <Button className="w-full">
          Proceed to Secure Checkout <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>

      <div className="flex items-center justify-center space-x-2 text-[11px] text-[#2B2620]/60 pt-2">
        <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
        <span>Encrypted 256-Bit Trade Transaction</span>
      </div>
    </div>
  );
}
