import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreFooter } from "@/components/store/StoreFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";

export default function StoreLayout() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const fetchCart = useCartStore((s) => s.fetchCart);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreHeader />
      <main className="flex-1 pt-[6.5rem]">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <StoreFooter />
      <WhatsAppButton />
    </div>
  );
}
