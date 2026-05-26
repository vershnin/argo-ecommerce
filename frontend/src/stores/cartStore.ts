import { create } from 'zustand';
import { cartApi, CartItemDto, CartResponse } from '@/api/cart';
import { Product } from '@/types/product';
import { useAuthStore } from './authStore';

interface CartStore {
  items: CartItemDto[];
  totalAmount: number;
  itemCount: number;
  isPending: boolean;
  pendingProductId: number | null;
  fetchCart: () => Promise<void>;
  addGuestItem: (product: Product, quantity?: number) => void;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  requestLogin: () => void;
}

export const useCartStore = create<CartStore>()((set) => ({
  items: [],
  totalAmount: 0,
  itemCount: 0,
  isPending: false,
  pendingProductId: null,

  fetchCart: async () => {
    try {
      const cart = await cartApi.getCart();
      set({
        items: cart.items,
        totalAmount: cart.totalAmount,
        itemCount: cart.itemCount
      });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  },

  addGuestItem: (product: Product, quantity = 1) => {
    const guest = JSON.parse(localStorage.getItem('guest-cart') || '[]');
    const existing = guest.find((i: any) => i.productId === product.id);
    if (existing) existing.quantity += quantity;
    else guest.push({ productId: product.id, quantity });
    localStorage.setItem('guest-cart', JSON.stringify(guest));
  },

  addItem: async (product, quantity = 1) => {
    try {
      const { isAuthenticated } = useAuthStore.getState();
      if (!isAuthenticated) {
        useCartStore.getState().addGuestItem(product, quantity);
        set({ isPending: true, pendingProductId: product.id });
        return;
      }
      const cart = await cartApi.addItem(product.id, quantity);
      set({
        items: cart.items,
        totalAmount: cart.totalAmount,
        itemCount: cart.itemCount
      });
    } catch (error) {
      set({ isPending: false, pendingProductId: null });
      console.error('Failed to add item to cart:', error);
    }
  },

  requestLogin: () => {
    set({ isPending: false, pendingProductId: null });
  },

  removeItem: async (cartItemId) => {
    try {
      const cart = await cartApi.removeItem(cartItemId);
      set({
        items: cart.items,
        totalAmount: cart.totalAmount,
        itemCount: cart.itemCount
      });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      const cart = await cartApi.updateItem(productId, quantity);
      set({
        items: cart.items,
        totalAmount: cart.totalAmount,
        itemCount: cart.itemCount
      });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  },

  clearCart: async () => {
    try {
      await cartApi.clearCart();
      set({ items: [], totalAmount: 0, itemCount: 0 });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  },
}));
