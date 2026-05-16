import { create } from 'zustand';
import { Product, Order } from '@/types/product';
import * as api from '@/services/api';

interface AdminStore {
  products: Product[];
  orders: Order[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchProducts: () => Promise<void>;
  addProduct: (product: api.AdminProductRequest) => Promise<void>;
  updateProduct: (id: number, updates: api.AdminProductRequest) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  updateStock: (id: number, quantity: number) => void;

  // Orders
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: number, status: Order['status']) => void;
}

export const useAdminStore = create<AdminStore>()((set, get) => ({
  products: [],
  orders: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { products } = await api.fetchProducts({ limit: 100 });
      set({ products, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products';
      set({ error: message, loading: false });
    }
  },

  addProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      await api.adminCreateProduct(productData);
      await get().fetchProducts();
      set({ loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add product';
      set({ error: message, loading: false });
      throw err;
    }
  },

  updateProduct: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      await api.adminUpdateProduct(id, updates);
      await get().fetchProducts();
      set({ loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update product';
      set({ error: message, loading: false });
      throw err;
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.adminDeleteProduct(id);
      await get().fetchProducts();
      set({ loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete product';
      set({ error: message, loading: false });
      throw err;
    }
  },

  updateStock: (id, quantity) =>
    set((s) => ({
      products: s.products.map((p) =>
        p.id === id ? { ...p, stockQuantity: quantity, inStock: quantity > 0 } : p
      ),
    })),

  addOrder: (order) =>
    set((s) => ({ orders: [order, ...s.orders] })),

  updateOrderStatus: (id, status) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.orderId === id ? { ...o, status } : o)),
    })),
}));
