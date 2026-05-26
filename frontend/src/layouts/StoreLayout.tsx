import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreFooter } from "@/components/store/StoreFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { mergeCart } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const MAX_RETRY = 3;
const RETRY_DELAY = 1000;

export default function StoreLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { isPending, pendingProductId, fetchCart, requestLogin } = useCartStore();
  const { toast } = useToast();
  const [mergeError, setMergeError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  // Handle pending cart items when login redirects back
  useEffect(() => {
    if (!isPending || !isAuthenticated) return;
    
    requestLogin();
    navigate('/cart', { state: { newItemId: pendingProductId } });
  }, [isAuthenticated, isPending, pendingProductId, requestLogin, navigate]);

  // Merge guest cart with retry logic
  useEffect(() => {
    if (!isAuthenticated) {
      setMergeError(null);
      return;
    }

    const guestItems = JSON.parse(localStorage.getItem('guest-cart') || '[]') as Array<{
      productId: number;
      quantity: number;
    }>;

    if (guestItems.length === 0) return;

    const syncCart = async (attempt = 0) => {
      try {
        setIsRetrying(attempt > 0);
        await fetchCart();
        await mergeCart(guestItems);
        localStorage.removeItem('guest-cart');
        await fetchCart();
        setMergeError(null);
      } catch (error) {
        console.error(`Cart merge failed (attempt ${attempt + 1}):`, error);
        if (attempt < MAX_RETRY) {
          const delay = RETRY_DELAY * Math.pow(2, attempt);
          setTimeout(() => syncCart(attempt + 1), delay);
        } else {
          setMergeError(
            'Failed to merge cart. Your items are saved locally and will be added when you try to checkout.'
          );
        }
      }
    };

    syncCart();
  }, [isAuthenticated, fetchCart]);

  const handleRetryMerge = async () => {
    setIsRetrying(true);
    try {
      const guestItems = JSON.parse(localStorage.getItem('guest-cart') || '[]');
      if (guestItems.length > 0) {
        await mergeCart(guestItems);
        localStorage.removeItem('guest-cart');
        await fetchCart();
        setMergeError(null);
        toast({ title: 'Cart merged successfully!' });
      }
    } catch (error) {
      toast({ title: 'Merge failed', description: 'Please try again later', variant: 'destructive' });
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreHeader />
      {mergeError && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 text-sm">
          <div className="section-container flex items-center justify-between">
            <span>{mergeError}</span>
            <button
              onClick={handleRetryMerge}
              disabled={isRetrying}
              className="ml-4 underline hover:no-underline font-medium"
            >
              {isRetrying ? 'Retrying...' : 'Retry'}
            </button>
          </div>
        </div>
      )}
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
