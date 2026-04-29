import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  const location = useLocation();
  const { orderId, orderNumber } = (location.state as {
    orderId?: number;
    orderNumber?: string;
  }) ?? {};

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
        <p className="text-muted-foreground mb-2">
          Thank you for your purchase. We'll process it shortly.
        </p>

        {orderNumber && (
          <p className="text-sm font-mono bg-secondary inline-block px-3 py-1 rounded-lg mb-6">
            {orderNumber}
          </p>
        )}

        {!orderNumber && (
          <p className="text-sm text-muted-foreground mb-6">
            Check your email for order confirmation.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/account">
              <Package className="w-4 h-4 mr-2" />
              View My Orders
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/shop">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
