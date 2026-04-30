import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Package, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAdminStore } from "@/stores/adminStore";
import { formatPrice } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";
import { Product, Category } from "@/types/product";
import { fetchCategories, AdminProductRequest } from "@/services/api";

const emptyProduct = {
  name: "", categoryId: "", brand: "", price: 0, description: "",
  shortDescription: "", sku: "", stockQuantity: 10, imageUrl: "/placeholder.svg",
  additionalImages: "",
};

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, fetchProducts, loading } = useAdminStore();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load categories", variant: "destructive" });
    }
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || p.category.name === categoryFilter;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyProduct);
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    // Find category ID by name
    const cat = categories.find(c => c.name === p.category.name);
    setForm({
      name: p.name, 
      categoryId: cat ? cat.id : "", 
      brand: p.brand, 
      price: p.price,
      description: p.description, 
      shortDescription: p.shortDescription,
      sku: p.sku, 
      stockQuantity: p.stockQuantity, 
      imageUrl: p.imageUrl,
      additionalImages: p.additionalImages?.join(",") || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.categoryId || !form.brand || !form.sku) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const payload: AdminProductRequest = {
        name: form.name,
        description: form.description,
        shortDescription: form.shortDescription,
        brand: form.brand,
        imageUrl: form.imageUrl,
        additionalImages: form.additionalImages,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
        sku: form.sku,
        categoryId: Number(form.categoryId),
      };

      if (editing) {
        await updateProduct(editing.id, payload);
        toast({ title: "Product updated" });
      } else {
        await addProduct(payload);
        toast({ title: "Product added" });
      }
      setDialogOpen(false);
    } catch (error) {
      toast({ title: "Error saving product", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      toast({ title: "Product deleted" });
    } catch (error) {
      toast({ title: "Error deleting product", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Low stock alert */}
      {(() => {
        const lowStockItems = products.filter((p) => p.stockQuantity > 0 && p.stockQuantity <= 5);
        return lowStockItems.length > 0 ? (
          <div className="flex items-start gap-3 p-4 rounded-xl border border-yellow-200 bg-yellow-50 text-yellow-800">
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm">Low Stock Warning</p>
              <p className="text-xs mt-1">{lowStockItems.length} product(s) have 5 or fewer items remaining: {lowStockItems.slice(0, 3).map((p) => p.name).join(", ")}{lowStockItems.length > 3 ? ` and ${lowStockItems.length - 3} more` : ""}</p>
            </div>
          </div>
        ) : null;
      })()}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">{products.length} products</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="pl-10" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="All Categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        {loading && <Loader2 className="w-5 h-5 animate-spin mt-2" />}
      </div>

      {/* Product List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">SKU</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Price</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Stock</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border hover:bg-secondary/10 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                        <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{p.sku}</td>
                  <td className="py-3 px-4"><Badge variant="secondary">{p.category.name}</Badge></td>
                  <td className="py-3 px-4 text-right font-medium text-foreground">{formatPrice(p.price)}</td>
                  <td className="py-3 px-4 text-right">
                    {p.stockQuantity === 0 ? (
                      <Badge variant="destructive">Out of stock</Badge>
                    ) : p.stockQuantity <= 5 ? (
                      <span className="text-yellow-600 font-medium">{p.stockQuantity}</span>
                    ) : (
                      <span className="text-foreground">{p.stockQuantity}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Edit2 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Product Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Brand *</Label>
                <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>SKU *</Label>
                <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select 
                  value={form.categoryId.toString()} 
                  onValueChange={(val) => setForm({ ...form, categoryId: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Price (KSH)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label>Stock Quantity</Label>
                <Input type="number" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Main Image URL *</Label>
              <Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Additional Image URLs (comma separated)</Label>
              <Input value={form.additionalImages} onChange={(e) => setForm({ ...form, additionalImages: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Full Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {editing ? "Save Changes" : "Add Product"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
