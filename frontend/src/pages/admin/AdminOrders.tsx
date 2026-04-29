import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { fetchAllOrders, updateOrderStatus } from "@/api/orders";

const ORDER_STATUSES = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const STATUS_COLOURS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [page, setPage] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-orders", page],
    queryFn: () => fetchAllOrders(page, 20),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({ title: "Order status updated" });
    },
    onError: () => {
      toast({ title: "Failed to update status", variant: "destructive" });
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-muted-foreground text-sm">
          {data ? `${data.totalElements} total orders` : "Loading…"}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/40">
                    <th className="text-left p-4 font-semibold">Order #</th>
                    <th className="text-left p-4 font-semibold">Date</th>
                    <th className="text-left p-4 font-semibold">Customer</th>
                    <th className="text-left p-4 font-semibold">Items</th>
                    <th className="text-left p-4 font-semibold">Total</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.content.map((order) => (
                    <tr key={order.orderId} className="border-b border-border last:border-0 hover:bg-secondary/20">
                      <td className="p-4 font-mono text-xs">{order.orderNumber}</td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-KE")}
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{order.shippingAddress?.fullName}</div>
                        <div className="text-xs text-muted-foreground">{order.shippingAddress?.email}</div>
                      </td>
                      <td className="p-4">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</td>
                      <td className="p-4 font-semibold">
                        KSH {order.totalAmount.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <Select
                          value={order.status}
                          onValueChange={(status) =>
                            statusMutation.mutate({ id: order.orderId, status })
                          }
                          disabled={statusMutation.isPending}
                        >
                          <SelectTrigger className={`w-36 text-xs font-semibold border-0 ${STATUS_COLOURS[order.status]}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ORDER_STATUSES.map((s) => (
                              <SelectItem key={s} value={s} className="text-xs">
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={data.first}
                className="px-4 py-2 text-sm border border-border rounded-lg disabled:opacity-40"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-muted-foreground">
                Page {data.page + 1} of {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={data.last}
                className="px-4 py-2 text-sm border border-border rounded-lg disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
