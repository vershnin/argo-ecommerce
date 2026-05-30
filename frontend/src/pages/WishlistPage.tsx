import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/formatters";

export default function WishlistPage() {
  const { items, isLoading, fetchWishlist, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (isLoading) {
    return (
      <div className="section-container py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading your wishlist...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section-container py-20 text-center">
        <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">Save products you love for later.</p>
        <Button asChild className="rounded-full">
          <Link to="/shop">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="section-container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Wishlist ({items.length})</h1>
        {/* clearWishlist isn't implemented on backend, we could remove it or implement it by looping removals */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((product) => (
          <div key={product.id} className="rounded-xl border border-border bg-card overflow-hidden">
            <Link to={`/product/${product.slug}`} className="block aspect-square bg-secondary/50 p-6 flex items-center justify-center">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                  e.currentTarget.onerror = null;
                }}
              />
            </Link>
            <div className="p-4">
              <p className="text-xs text-muted-foreground">{product.brand}</p>
              <Link to={`/product/${product.slug}`} className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                {product.name}
              </Link>
              <p className="font-bold mt-2">{formatPrice(product.discountPrice || product.price)}</p>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  className="flex-1 rounded-full text-xs"
                  disabled={!product.inStock}
                  onClick={() => {
                    addToCart(product);
                    removeItem(product.id);
                    toast({ title: "Moved to cart", description: product.name });
                  }}
                >
                  <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
