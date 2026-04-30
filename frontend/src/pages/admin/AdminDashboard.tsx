import { Package, ClipboardList, Tag, TrendingUp, AlertTriangle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAdminStore } from "@/stores/adminStore";
import { formatPrice } from "@/lib/formatters";
import { fetchAllOrders } from "@/api/orders";
import { fetchProducts } from "@/services/api";

export default function AdminDashboard() {
  const { promoCodes } = useAdminStore();

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-orders", 0],
    queryFn: () => fetchAllOrders(0, 100),
  });

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => fetchProducts({ limit: 100 }),
  });

  if (ordersLoading || productsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const orders = ordersData?.content || [];
  const products = productsData?.products || [];

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const lowStock = products.filter((p) => p.stockQuantity > 0 && p.stockQuantity <= 5);
  const outOfStock = products.filter((p) => !p.inStock);

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, href: "/admin/products", color: "text-blue-600 bg-blue-50" },
    { label: "Total Orders", value: ordersData?.totalElements || 0, icon: ClipboardList, href: "/admin/orders", color: "text-green-600 bg-green-50" },
    { label: "Revenue", value: `KSH ${totalRevenue.toLocaleString()}`, icon: TrendingUp, href: "/admin/orders", color: "text-primary bg-primary/10" },
    { label: "Active Promos", value: promoCodes.filter((p) => p.active).length, icon: Tag, href: "/admin/promotions", color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.href}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Alerts */}
      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" /> Inventory Alerts
          </h2>
          {outOfStock.length > 0 && (
            <p className="text-sm text-destructive font-medium">
              {outOfStock.length} product{outOfStock.length > 1 ? "s" : ""} out of stock
            </p>
          )}
          {lowStock.map((p) => (
            <div key={p.id} className="flex items-center justify-between text-sm py-1.5 border-t border-border">
              <span className="text-foreground">{p.name}</span>
              <span className="text-yellow-600 font-medium">{p.stockQuantity} left</span>
            </div>
          ))}
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No orders yet</p>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.orderId} className="flex items-center justify-between text-sm py-2 border-t border-border">
                <div>
                  <span className="font-mono font-medium text-foreground">{order.orderNumber}</span>
                  <span className="ml-2 text-muted-foreground">{order.items.length} items</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-foreground">KSH {order.totalAmount.toLocaleString()}</span>
                  <span className="capitalize text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
