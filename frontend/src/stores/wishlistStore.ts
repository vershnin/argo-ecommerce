import { create } from 'zustand';
import { Product } from '@/types/product';
import * as api from '@/services/api';

interface WishlistStore {
  items: Product[];
  isLoading: boolean;
  fetchWishlist: () => Promise<void>;
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  isLoading: false,

  fetchWishlist: async () => {
    set({ isLoading: true });
    try {
      const items = await api.fetchWishlist();
      set({ items, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      set({ isLoading: false });
    }
  },

  addItem: async (product) => {
    try {
      await api.addToWishlist(product.id);
      set((state) => {
        if (state.items.find((i) => i.id === product.id)) return state;
        return { items: [...state.items, product] };
      });
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  },

  removeItem: async (productId) => {
    try {
      await api.removeFromWishlist(productId);
      set((state) => ({
        items: state.items.filter((i) => i.id !== productId),
      }));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  },

  isInWishlist: (productId: number) => {
    return get().items.some((i) => i.id === productId);
  },

  clearWishlist: () => set({ items: [] }),
}));
