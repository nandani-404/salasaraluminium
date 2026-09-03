'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/store/cartStore';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity, selectedFinish } = item;
  const lineTotal = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#FFFFFF] border border-[#D8D1C4] gap-4 shadow-luxury">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="relative w-20 h-20 bg-[#FAF7F0] border border-[#D8D1C4] flex-shrink-0">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        </div>
        <div>
          <Link href={`/product/${product.slug}`} className="font-serif text-base text-[#2B2620] hover:text-[#B08D57] transition-colors">
            {product.name}
          </Link>
          <div className="text-xs text-[#2B2620]/60 space-y-0.5 mt-1">
            <p>SKU: {product.sku}</p>
            <p>Finish: {selectedFinish || product.finish}</p>
            <p>Grade: {product.alloyGrade}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto space-x-8">
        {/* Quantity Controls */}
        <div className="flex items-center border border-[#D8D1C4] bg-[#FAF7F0]">
          <button
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            className="p-2 text-[#2B2620] hover:text-[#B08D57] transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-4 text-xs font-medium text-[#2B2620]">{quantity} Units</span>
          <button
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            className="p-2 text-[#2B2620] hover:text-[#B08D57] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Delete */}
        <button
          onClick={() => onRemove(product.id)}
          className="p-2 text-[#2B2620]/40 hover:text-red-600 transition-colors"
          title="Remove Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
