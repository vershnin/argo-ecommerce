import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/formatters";
import type { Product } from "@/types/product";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalAmount: total } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();
  const { toast } = useToast();

  if (items.length === 0) {
    return (
      <div className="section-container py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
        <Button asChild className="rounded-full">
          <Link to="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="section-container py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({items.length})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            return (
              <div key={item.cartItemId} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-24 h-24 bg-secondary/50 rounded-lg p-2 shrink-0 flex items-center justify-center">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                        if (item.quantity <=1) {
                          removeItem(item.cartItemId);
                        } else {
                          updateQuantity(item.productId, item.quantity - 1);
                        }}}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{formatPrice(item.subtotal)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${isInWishlist(item.productId) ? 'text-primary' : 'text-muted-foreground'}`}
                        onClick={async () => {
                          if (isInWishlist(item.productId)) {
                            toast({ title: "Already in wishlist" });
                          } else {
                            const product: Product = {
                              id: item.productId,
                              name: item.name,
                              slug: item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                              category: { id: 'unknown', name: 'Uncategorized', slug: 'uncategorized' },
                              brand: '',
                              price: item.price,
                              effectivePrice: item.price,
                              description: item.name,
                              shortDescription: item.name,
                              imageUrl: item.imageUrl,
                              additionalImages: [],
                              specifications: {},
                              features: [],
                              sku: String(item.productId),
                              stockQuantity: item.stockQuantity,
                              inStock: item.stockQuantity > 0,
                              rating: 0,
                              reviewCount: 0,
                              createdAt: new Date().toISOString(),
                            };

                            await addToWishlist(product);
                            toast({ title: "Added to wishlist" });
                          }
                        }}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(item.productId) ? 'fill-primary' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.cartItemId)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-6 sticky top-28">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className={total >= 10000 ? 'text-green-600' : ''}>{total >= 10000 ? 'FREE' : formatPrice(500)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(total + (total >= 10000 ? 0 : 500))}</span>
              </div>
            </div>
            <Button asChild className="w-full rounded-full mt-6 h-12 glow-primary text-base">
              <Link to="/checkout">Checkout <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button asChild variant="ghost" className="w-full mt-2 text-sm">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
