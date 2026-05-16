import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PromoCode } from '@/types/product';

interface PromoStore {
  promoCodes: PromoCode[];
  addPromoCode: (promo: PromoCode) => void;
  updatePromoCode: (code: string, updates: Partial<PromoCode>) => void;
  deletePromoCode: (code: string) => void;
}

const defaultPromos: PromoCode[] = [
  { code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 5000, expiresAt: '2026-12-31', active: true },
  { code: 'SAVE500', type: 'fixed', value: 500, minOrder: 3000, expiresAt: '2026-12-31', active: true },
];

export const usePromoStore = create<PromoStore>()(
  persist(
    (set) => ({
      promoCodes: [...defaultPromos],

      addPromoCode: (promo) => set((s) => ({ promoCodes: [promo, ...s.promoCodes] })),

      updatePromoCode: (code, updates) =>
        set((s) => ({
          promoCodes: s.promoCodes.map((p) => (p.code === code ? { ...p, ...updates } : p)),
        })),

      deletePromoCode: (code) => set((s) => ({ promoCodes: s.promoCodes.filter((p) => p.code !== code) })),
    }),
    { name: 'argo-promo' }
  )
);
