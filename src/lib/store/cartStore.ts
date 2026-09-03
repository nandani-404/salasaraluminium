import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish?: string;
  selectedSegmentPriceTier?: string;
}

interface CartStore {
  items: CartItem[];
  wishlist: Product[];
  couponCode: string | null;
  discountPercent: number;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number, selectedFinish?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  // Wishlist actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Computed helpers
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTaxAmount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      couponCode: null,
      discountPercent: 0,

      addToCart: (product, quantity = 1, selectedFinish) => {
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.product.id === product.id);
          const finish = selectedFinish || product.finish;

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            return {
              items: [...state.items, { product, quantity, selectedFinish: finish }],
            };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, discountPercent: 0 }),

      applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'LUXURY10' || cleanCode === 'TRADE10') {
          set({ couponCode: cleanCode, discountPercent: 10 });
          return true;
        } else if (cleanCode === 'SALASAR15') {
          set({ couponCode: cleanCode, discountPercent: 15 });
          return true;
        }
        return false;
      },

      removeCoupon: () => set({ couponCode: null, discountPercent: 0 }),

      addToWishlist: (product) => {
        set((state) => {
          if (!state.wishlist.some((p) => p.id === product.id)) {
            return { wishlist: [...state.wishlist, product] };
          }
          return state;
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((p) => p.id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        return (subtotal * get().discountPercent) / 100;
      },

      getTaxAmount: () => {
        const taxable = get().getSubtotal() - get().getDiscountAmount();
        return taxable * 0.18; // 18% GST standard for hardware & metal fittings
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const tax = get().getTaxAmount();
        return subtotal - discount + tax;
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'salasar-cart-store',
    }
  )
);
