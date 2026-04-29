import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Headphones as HeadphonesIcon,
  Watch,
  HardDrive,
  Mouse,
  Gamepad2,
  Camera,
  BatteryCharging,
  Disc,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/ProductCard";
import { fetchProducts, fetchCategories } from "@/services/api";
import { Product, Category } from "@/types/product";
import {
  PageTransition,
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/AnimationWrappers";
import { Marquee } from "@/components/motion/Marquee";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { brands, categories as staticCategories } from "@/data/products";

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Headphones: HeadphonesIcon,
  Watch,
  HardDrive,
  Mouse,
  Gamepad2,
  Camera,
  BatteryCharging,
  Disc,
  Package,
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchProducts({ limit: 8, sort: "rating" }).then((r) =>
      setFeaturedProducts(r.products)
    );
    fetchProducts({ limit: 4 }).then((r) =>
      setDealProducts(r.products.filter((p) => p.discountPrice))
    );
    fetchProducts({ limit: 8, sort: "createdAt,desc" }).then((r) =>
      setRecommendedProducts(r.products)
    );
    fetchCategories().then(setCategories);
  }, []);

  const marqueeItems = [
    ...brands.map((b) => ({ type: "brand" as const, label: b })),
    ...staticCategories.map((c) => ({ type: "category" as const, label: c.name })),
  ];

  return (
    <PageTransition>
      {/* ─── Brands & Categories Marquee ─── */}
      <section className="py-10 bg-secondary/20 border-y border-border overflow-hidden">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Trusted Partners & Categories
          </p>
        </div>
        <Marquee speed="slow" className="py-2">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.type}-${item.label}-${idx}`}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border shadow-sm whitespace-nowrap grayscale hover:grayscale-0 transition-all duration-500 cursor-default hover:border-primary/30 hover:shadow-md"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  item.type === "brand" ? "bg-primary" : "bg-amber-400"
                }`}
              />
              <span className="text-sm font-semibold text-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ─── Top Categories Grid ─── */}
      <section className="py-20">
        <div className="section-container">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                Browse Collection
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Shop by Category
              </h2>
            </div>
          </FadeUp>

          {/* Mobile: horizontal scroll | Desktop: grid */}
          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => {
              const Icon = categoryIconMap[cat.icon] || Package;
              return (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.id}`}
                  className="snap-start shrink-0 w-[150px] md:w-auto group"
                >
                  <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-primary/[0.04] to-transparent" />
                    <div className="relative w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="relative font-semibold text-sm group-hover:text-primary transition-colors duration-200">
                      {cat.name}
                    </h3>
                    <p className="relative text-xs text-muted-foreground mt-1">
                      {cat.productCount} products
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Recommended for You Carousel ─── */}
      {recommendedProducts.length > 0 && (
        <section className="py-20 bg-secondary/20">
          <div className="section-container">
            <FadeUp>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                    Curated For You
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Recommended for You
                  </h2>
                </div>
                <Button asChild variant="ghost" className="text-primary hidden sm:flex">
                  <Link to="/shop">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {recommendedProducts.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:flex items-center justify-end gap-2 mt-8">
                  <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors" />
                  <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors" />
                </div>
              </Carousel>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ─── Hot Deals ─── */}
      {dealProducts.length > 0 && (
        <section className="py-20">
          <div className="section-container">
            <FadeUp>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                    Limited Time
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                    🔥 Hot Deals
                  </h2>
                </div>
                <Button asChild variant="ghost" className="text-primary hidden sm:flex">
                  <Link to="/deals">
                    All Deals <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </FadeUp>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {dealProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ─── Top Rated Products (Secondary) ─── */}
      <section className="py-20 bg-secondary/20">
        <div className="section-container">
          <FadeUp>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                  Highly Rated
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Top Rated Products
                </h2>
              </div>
              <Button asChild variant="ghost" className="text-primary hidden sm:flex">
                <Link to="/shop?sort=rating">
                  See More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </PageTransition>
  );
}

