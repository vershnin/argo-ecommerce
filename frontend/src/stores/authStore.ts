import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "@/types/product";

export interface UserProfile {
  id: number;          // ✅ Real ID from backend
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: "CUSTOMER" | "ADMIN";  // ✅ Real role from backend
  createdAt: string;
}

interface AuthStore {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: UserProfile, token: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addOrder: (order: Order) => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),

      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      addOrder: (_order: Order) => {
        // Placeholder — order is persisted in adminStore; this satisfies the interface
      },

      // ✅ Convenience helper used by ProtectedRoute and AdminRoute
      isAdmin: () => get().user?.role === "ADMIN",
    }),
    { name: "argo-auth" }
  )
);
