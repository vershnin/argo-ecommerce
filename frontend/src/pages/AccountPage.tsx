import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Package, User, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import { fetchMyOrders } from "@/api/orders";

const STATUS_COLOURS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function AccountPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ── Fetch order history from backend ──────────────────────
  const { data: ordersPage, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => fetchMyOrders(0, 20),
    enabled: !!user,
  });

  const handleLogout = () => {
    logout();
    // Clear cached cart so the next user sees an empty cart
    queryClient.removeQueries({ queryKey: ["cart"] });
    queryClient.removeQueries({ queryKey: ["my-orders"] });
    navigate("/", { replace: true });
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.fullName}</h1>
            <p className="text-muted-foreground text-sm">{user.email}</p>
            {user.role === "ADMIN" && (
              <Badge className="mt-1 text-xs bg-primary text-primary-foreground">
                Administrator
              </Badge>
            )}
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </div>

      <Separator className="mb-8" />

      {/* ── Admin shortcut ───────────────────────────────────── */}
      {user.role === "ADMIN" && (
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Admin Dashboard</p>
            <p className="text-xs text-muted-foreground">Manage products, orders and promotions</p>
          </div>
          <Button size="sm" onClick={() => navigate("/admin")}>
            Go to Admin
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      {/* ── Order history ───────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Order History</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : !ordersPage?.content.length ? (
          <div className="text-center py-10 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No orders yet.</p>
            <Button variant="link" onClick={() => navigate("/shop")}>
              Start shopping →
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {ordersPage.content.map((order) => (
              <div
                key={order.orderId}
                className="bg-card border border-border rounded-xl p-5 space-y-3"
              >
                {/* Order header */}
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-sm">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      STATUS_COLOURS[order.status] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items preview */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {order.items.slice(0, 4).map((item, i) => (
                    <img
                      key={i}
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-secondary shrink-0"
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-xs font-medium shrink-0">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </div>
                  <p className="font-bold text-base">
                    KSH {order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
