import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { formatPrice, getDiscountPercentage } from "@/lib/formatters";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const inWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    await addToCart(product);
    toast({ title: "Added to cart", description: product.name });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from wishlist" });
    } else {
      addToWishlist(product);
      toast({ title: "Added to wishlist", description: product.name });
    }
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {/* Image */}
        <div className="relative aspect-square bg-secondary/40 p-6 flex items-center justify-center overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.discountPrice && (
              <Badge className="bg-primary text-primary-foreground text-xs font-semibold shadow-sm">
                -{getDiscountPercentage(product.price, product.discountPrice)}%
              </Badge>
            )}
            {product.badge && (
              <Badge variant="secondary" className="text-xs">
                {product.badge}
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="outline" className="bg-card text-muted-foreground text-xs">
                Out of stock
              </Badge>
            )}
          </div>

          {/* Quick actions - top right */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full shadow-md backdrop-blur-sm bg-white/80"
              onClick={handleToggleWishlist}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>

          {/* Hover overlay with Add to Cart / Quick View */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg text-xs font-semibold h-9"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg text-xs font-semibold h-9 px-3"
                asChild
              >
                <Link to={`/product/${product.slug}`} onClick={(e) => e.stopPropagation()}>
                  <Eye className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">{product.brand}</p>
          <h3 className="font-medium text-sm leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              {product.discountPrice ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">{formatPrice(product.discountPrice)}</span>
                  <span className="text-xs text-muted-foreground line-through">{formatPrice(product.price)}</span>
                </div>
              ) : (
                <span className="font-bold">{formatPrice(product.price)}</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

