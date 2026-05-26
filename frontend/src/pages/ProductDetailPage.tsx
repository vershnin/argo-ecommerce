import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Star, Heart, ShoppingCart, Truck, Shield, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductImageGallery } from "@/components/store/ProductImageGallery";
import { ReviewForm } from "@/components/store/ReviewForm";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { fetchProductBySlug, fetchRelatedProducts, fetchReviews } from "@/services/api";
import { Product, Review } from "@/types/product";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/authStore";
import { formatPrice, getDiscountPercentage } from "@/lib/formatters";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((s) => s.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setQuantity(1);
    fetchProductBySlug(slug).then((p) => {
      setProduct(p);
      setLoading(false);
      if (p) {
        fetchRelatedProducts(p.id).then(setRelated);
        fetchReviews(p.id).then(setReviews);
      }
    });
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="section-container py-12">
        <div className="grid md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-secondary rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 bg-secondary rounded w-1/4" />
            <div className="h-8 bg-secondary rounded w-3/4" />
            <div className="h-6 bg-secondary rounded w-1/3" />
            <div className="h-24 bg-secondary rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section-container py-20 text-center">
        <p className="text-lg font-medium mb-4">Product not found</p>
        <Button asChild><Link to="/shop">Back to Shop</Link></Button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
    toast({ title: "Added to cart", description: `${quantity}x ${product.name}` });
  };

  const handleReviewSubmitted = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="section-container py-8">
      <ProductJsonLd product={product} reviews={reviews} />
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/shop?category=${product.category.id}`} className="hover:text-foreground transition-colors">
          {product.category.name}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <ProductImageGallery imageUrl={product.imageUrl} additionalImages={product.additionalImages} productName={product.name} />

        {/* Details */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-border'}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.discountPrice ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.discountPrice)}</span>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                <Badge className="bg-primary text-primary-foreground">
                  Save {getDiscountPercentage(product.price, product.discountPrice)}%
                </Badge>
              </div>
            ) : (
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            {product.inStock ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">In Stock</span>
                <span className="text-xs text-muted-foreground">({product.stockQuantity} available)</span>
              </>
            ) : (
              <span className="text-sm font-medium text-destructive">Out of Stock</span>
            )}
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {product.shortDescription}
          </p>

          <Separator className="my-6" />

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button
              className="flex-1 rounded-full glow-primary h-12 text-base"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full shrink-0"
              onClick={async () => {
                if (inWishlist) {
                  await removeFromWishlist(product.id);
                  toast({ title: "Removed from wishlist" });
                } else {
                  await addToWishlist(product);
                  toast({ title: "Added to wishlist" });
                }
              }}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>

          {/* WhatsApp Inquiry */}
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full h-11 mb-6"
          >
            <a
              href={`https://wa.me/254700000000?text=${encodeURIComponent(`Hi Argo Electronics, I am interested in ${product.name} priced at ${formatPrice(product.discountPrice || product.price)}. Is it available?`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Inquire on WhatsApp
            </a>
          </Button>

          {/* Trust */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-4 h-4 text-primary" /> Free delivery over KSH 10K
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" /> {product.warranty || 'Genuine product'}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">SKU: {product.sku}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none p-0">
          <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Description
          </TabsTrigger>
          <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Specifications
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Reviews ({reviews.length || product.reviewCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="pt-6">
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">{product.description}</p>
            {product.features?.length > 0 && (
              <>
                <h3 className="font-semibold text-base mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="specs" className="pt-6">
          <div className="max-w-lg">
            {Object.entries(product.specifications || {}).length === 0 ? (
              <p className="text-sm text-muted-foreground">No specifications available.</p>
            ) : (
              Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between py-3 border-b border-border text-sm">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium">{val}</span>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="pt-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {reviews.length === 0 ? (
                <p className="text-muted-foreground text-sm">No reviews yet. Be the first to review this product!</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-border'}`} />
                          ))}
                        </div>
                        {review.verified && (
                          <Badge variant="secondary" className="text-[10px]">✓ Verified</Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-sm mb-1">{review.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">
                        By {review.userName} • {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              {isAuthenticated ? (
                <ReviewForm productId={product.id} onReviewSubmitted={handleReviewSubmitted} />
              ) : (
                <div className="bg-secondary/30 p-6 rounded-xl border border-border text-center">
                  <p className="text-sm text-muted-foreground mb-4">Please log in to share your feedback</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login">Login to Review</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
