import { useState, useMemo } from "react";
import { Search, X, ExternalLink, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { products, categories, formatPrice, generateWhatsAppLink } from "@/data/products";

interface ProductTableProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ProductTable({ selectedCategory, onCategoryChange }: ProductTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesStock = !showInStockOnly || product.inStock;
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchQuery, selectedCategory, showInStockOnly]);

  const clearFilters = () => {
    setSearchQuery("");
    onCategoryChange("all");
    setShowInStockOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || showInStockOnly;

  return (
    <section id="products" className="py-24 scroll-mt-header bg-surface">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="section-line" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live Price List
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our complete inventory with real-time pricing. Click "Inquire" to message us on WhatsApp.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl border border-border p-4 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products... (e.g., AirPods, Samsung, S24)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 search-input"
              />
            </div>

            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={showInStockOnly ? "default" : "outline"}
              onClick={() => setShowInStockOnly(!showInStockOnly)}
              className="h-12 whitespace-nowrap"
            >
              In Stock Only
            </Button>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="h-12">
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/60 hover:bg-secondary/60">
                  <TableHead className="font-semibold text-foreground">Product</TableHead>
                  <TableHead className="font-semibold text-foreground">Category</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Price</TableHead>
                  <TableHead className="font-semibold text-foreground text-center">Status</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      No products found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="table-row-hover">
                      <TableCell>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {product.name}
                            {product.badge && (
                              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0 font-semibold">
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{product.brand}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">{formatPrice(product.price)}</TableCell>
                      <TableCell className="text-center">
                        {product.inStock ? (
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">
                            Out of Stock
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <a href={generateWhatsAppLink(product.name, product.price)} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground rounded-full">
                            Inquire
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-8 p-6 bg-card rounded-xl border border-border shadow-sm">
          <h3 className="font-bold mb-3">Terms & Conditions</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Payment on delivery available</li>
            <li>• Confirm availability before placing an order</li>
            <li>• No returns accepted after 3 working days</li>
            <li>• Prices may change without prior notice</li>
            <li>• All products have warranty from date of purchase</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
