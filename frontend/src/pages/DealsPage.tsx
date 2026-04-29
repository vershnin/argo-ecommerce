import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/ProductCard";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types/product";

function CountdownTimer() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {[
        { label: "Hours", value: time.h },
        { label: "Minutes", value: time.m },
        { label: "Seconds", value: time.s },
      ].map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-center min-w-[3rem]">
            <span className="text-xl font-bold font-mono">{String(unit.value).padStart(2, '0')}</span>
            <p className="text-[9px] uppercase tracking-wider opacity-80">{unit.label}</p>
          </div>
          {i < 2 && <span className="text-2xl font-bold text-primary">:</span>}
        </div>
      ))}
    </div>
  );
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ limit: 100 }).then((r) => {
      setDeals(r.products.filter((p) => p.discountPrice));
      setLoading(false);
    });
  }, []);

  return (
    <div className="section-container py-8">
      {/* Banner */}
      <div className="rounded-2xl bg-foreground text-background p-8 md:p-12 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Timer className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Flash Sale</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Today's Hot Deals 🔥</h1>
            <p className="text-background/60">Limited time offers — don't miss out!</p>
          </div>
          <CountdownTimer />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card animate-pulse">
              <div className="aspect-square bg-secondary/50" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-secondary rounded w-1/3" />
                <div className="h-4 bg-secondary rounded w-2/3" />
                <div className="h-5 bg-secondary rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : deals.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg font-medium mb-2">No active deals right now</p>
          <p className="text-muted-foreground text-sm mb-4">Check back soon for new offers!</p>
          <Button asChild><Link to="/shop">Browse All Products</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
