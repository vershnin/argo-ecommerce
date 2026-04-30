import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Order, PromoCode } from '@/types/product';
import * as api from '@/services/api';

interface AdminStore {
  products: Product[];
  orders: Order[];
  promoCodes: PromoCode[];
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
  updateOrderStatus: (id: string, status: Order['status']) => void;

  // Promo codes
  addPromoCode: (promo: PromoCode) => void;
  updatePromoCode: (code: string, updates: Partial<PromoCode>) => void;
  deletePromoCode: (code: string) => void;
}

const defaultPromos: PromoCode[] = [
  { code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 5000, expiresAt: '2026-12-31', active: true },
  { code: 'SAVE500', type: 'fixed', value: 500, minOrder: 3000, expiresAt: '2026-12-31', active: true },
];

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      products: [],
      orders: [],
      promoCodes: [...defaultPromos],
      loading: false,
      error: null,

      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const { products } = await api.fetchProducts({ limit: 100 });
          set({ products, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      addProduct: async (productData) => {
        set({ loading: true, error: null });
        try {
          const newProduct = await api.adminCreateProduct(productData);
          set((s) => ({ products: [newProduct, ...s.products], loading: false }));
        } catch (err: any) {
          set({ error: err.message, loading: false });
          throw err;
        }
      },

      updateProduct: async (id, updates) => {
        set({ loading: true, error: null });
        try {
          const updatedProduct = await api.adminUpdateProduct(id, updates);
          set((s) => ({
            products: s.products.map((p) => (p.id === id ? updatedProduct : p)),
            loading: false
          }));
        } catch (err: any) {
          set({ error: err.message, loading: false });
          throw err;
        }
      },

      deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
          await api.adminDeleteProduct(id);
          set((s) => ({
            products: s.products.filter((p) => p.id !== id),
            loading: false
          }));
        } catch (err: any) {
          set({ error: err.message, loading: false });
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
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      addPromoCode: (promo) =>
        set((s) => ({ promoCodes: [promo, ...s.promoCodes] })),

      updatePromoCode: (code, updates) =>
        set((s) => ({
          promoCodes: s.promoCodes.map((p) =>
            p.code === code ? { ...p, ...updates } : p
          ),
        })),

      deletePromoCode: (code) =>
        set((s) => ({ promoCodes: s.promoCodes.filter((p) => p.code !== code) })),
    }),
    { name: 'argo-admin' }
  )
);
