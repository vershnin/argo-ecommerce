import { create } from 'zustand';
import { cartApi, CartItemDto, CartResponse } from '@/api/cart';
import { Product } from '@/types/product';
import { useAuthStore } from './authStore';

interface CartStore {
  items: CartItemDto[];
  totalAmount: number;
  itemCount: number;
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>()((set) => ({
  items: [],
  totalAmount: 0,
  itemCount: 0,

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

  addItem: async (product, quantity = 1) => {
    try {
      const { isAuthenticated } = useAuthStore.getState();
      if (!isAuthenticated) {
        window.location.href = '/login';
        return;
      }
      // Backend expects productId as number. product.id is currently string in frontend types
      const cart = await cartApi.addItem(Number(product.id), quantity);
      set({
        items: cart.items,
        totalAmount: cart.totalAmount,
        itemCount: cart.itemCount
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
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
