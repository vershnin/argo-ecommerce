import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/components/store/ProductCard";
import { fetchProducts, fetchCategories } from "@/services/api";
import { Product, Category } from "@/types/product";
import { brands as allBrands } from "@/data/products";

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "name-asc";
  const selectedBrands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
  const inStockOnly = searchParams.get("inStock") === "true";
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice || 0, maxPrice || 200000]);

  const selectedCategoryId =
    category !== "all" ? category : undefined;

  const selectedBrandsKey = selectedBrands.join(",");

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (!categories.length) return;
    if (category === "all" || /^\d+$/.test(category)) return;
    const matched = categories.find((c) => c.name.toLowerCase() === category.toLowerCase());
    if (matched) {
      const params = new URLSearchParams(searchParams);
      params.set("category", String(matched.id));
      setSearchParams(params, { replace: true });
    }
  }, [categories, category, searchParams, setSearchParams]);

  useEffect(() => {
    setLoading(true);
    fetchProducts({
      search: search || undefined,
      category: selectedCategoryId,
      brand: selectedBrands.length ? selectedBrandsKey : undefined,
      minPrice,
      maxPrice,
      inStock: inStockOnly || undefined,
      sort,
      limit: 100,
    }).then((r) => {
      setProducts(r.products);
      setTotal(r.total);
      setLoading(false);
    });
  }, [search, selectedCategoryId, category, sort, selectedBrandsKey, selectedBrands.length, inStockOnly, minPrice, maxPrice]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const toggleBrand = (brand: string) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    updateParam("brands", next.join(","));
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (priceRange[0] > 0) params.set("minPrice", String(priceRange[0]));
    else params.delete("minPrice");
    if (priceRange[1] < 200000) params.set("maxPrice", String(priceRange[1]));
    else params.delete("maxPrice");
    setSearchParams(params);
  };

  const activeFilterCount = [
    category !== "all" ? 1 : 0,
    selectedBrands.length,
    inStockOnly ? 1 : 0,
    minPrice !== undefined || maxPrice !== undefined ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="section-container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            {category !== "all" ? categories.find(c => String(c.id) === category || c.name.toLowerCase() === category.toLowerCase())?.name || "Shop" : "All Products"}          
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{total} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => updateParam("search", e.target.value)}
              placeholder="Search products..."
              className="pl-10 rounded-full bg-secondary border-0"
            />
          </div>
          <Select value={sort} onValueChange={(v) => updateParam("sort", v)}>
            <SelectTrigger className="w-44 rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name A-Z</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="rounded-full lg:hidden relative"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-64 shrink-0 ${filtersOpen ? 'fixed inset-0 z-50 bg-card p-6 overflow-auto' : 'hidden lg:block'}`}>
          {filtersOpen && (
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="font-bold text-lg">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary mb-4 w-full justify-start">
              <X className="w-4 h-4 mr-1" /> Clear all filters
            </Button>
          )}

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">Category</h3>
            <div className="space-y-1">
              <button
                onClick={() => updateParam("category", "all")}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  category === "all" ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateParam("category", String(cat.id))}
                  className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    category === String(cat.id) ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs">{cat.productCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">Brand</h3>
            <div className="space-y-2 max-h-48 overflow-auto">
              {allBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <span className="text-muted-foreground">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">Price Range</h3>
            <Slider
              min={0}
              max={200000}
              step={1000}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="mb-3"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>KSH {priceRange[0].toLocaleString()}</span>
              <span>KSH {priceRange[1].toLocaleString()}</span>
            </div>
            <Button variant="outline" size="sm" className="w-full text-xs" onClick={applyPriceFilter}>
              Apply Price Filter
            </Button>
          </div>

          {/* In Stock */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={inStockOnly}
                onCheckedChange={(checked) => updateParam("inStock", checked ? "true" : "")}
              />
              <span className="font-medium">In Stock Only</span>
            </label>
          </div>

          {filtersOpen && (
            <Button className="w-full rounded-full mt-4 lg:hidden" onClick={() => setFiltersOpen(false)}>
              Show {total} Results
            </Button>
          )}
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {/* Active filters */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {category !== "all" && (
                <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => updateParam("category", "all")}>
                  {categories.find(c => String(c.id) === category)?.name} <X className="w-3 h-3" />
                </Badge>
              )}
              {selectedBrands.map(b => (
                <Badge key={b} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleBrand(b)}>
                  {b} <X className="w-3 h-3" />
                </Badge>
              ))}
              {inStockOnly && (
                <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => updateParam("inStock", "")}>
                  In Stock <X className="w-3 h-3" />
                </Badge>
              )}
              {(minPrice !== undefined || maxPrice !== undefined) && (
                <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete("minPrice");
                  params.delete("maxPrice");
                  setPriceRange([0, 200000]);
                  setSearchParams(params);
                }}>
                  Price Range <X className="w-3 h-3" />
                </Badge>
              )}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-medium mb-2">No products found</p>
              <p className="text-muted-foreground text-sm mb-4">Try adjusting your filters or search query</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
