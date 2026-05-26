import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Truck, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { useAdminStore } from "@/stores/adminStore";
import { formatPrice } from "@/lib/formatters";
import { createOrder, validatePromoCode } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Address, Order } from "@/types/product";

export default function CheckoutPage() {
  const { items, totalAmount: subtotal, clearCart } = useCartStore();
  const { addOrder: addAuthOrder, isAuthenticated } = useAuthStore();
  const addAdminOrder = useAdminStore((s) => s.addOrder);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<Address>({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "Nairobi",
    region: "Nairobi",
    notes: "",
  });

  const deliveryFees: Record<string, number> = {
    standard: subtotal >= 10000 ? 0 : 500,
    express: 1000,
    pickup: 0,
  };

  const deliveryFee = deliveryFees[deliveryMethod];
  const total = subtotal - discount + deliveryFee;

  const handlePromo = async () => {
    const result = await validatePromoCode(promoCode, subtotal);
    if (result.valid && result.promo) {
      const disc = result.promo.discount ?? (
        result.promo.type === 'percentage'
          ? Math.round(subtotal * result.promo.value / 100)
          : result.promo.value
      );
      setDiscount(disc);
      setPromoApplied(true);
      toast({ title: "Promo code applied!", description: `You save ${formatPrice(disc)}` });
    } else {
      toast({ title: "Invalid promo code", description: result.message, variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.email || !form.street) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      // Create order on backend first
      const result = await createOrder({
        deliveryMethod,
        shippingAddress: form,
        promoCode: promoApplied ? promoCode : undefined,
      });

      // Build order object from response
      const orderItems = items.map((item) => ({
        productId: item.productId,
        name: item.name,
        slug: item.slug,
        imageUrl: item.imageUrl,
        unitPrice: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })) as Order['items'];

      const order: Order = {
        orderId: result.orderId,
        orderNumber: result.orderNumber,
        createdAt: new Date().toISOString(),
        status: result.status.toUpperCase(),
        items: orderItems,
        subtotal,
        deliveryFee,
        discount,
        totalAmount: total,
        deliveryMethod,
        promoCode: promoApplied ? promoCode : undefined,
        shippingAddress: form,
      };

      // Update local stores after backend confirmation
      if (isAuthenticated) {
        addAuthOrder(order);
      }
      addAdminOrder(order);
      await clearCart();

      // Navigate only after all updates succeed
      navigate('/order-success', { 
        state: { 
          orderId: result.orderId,
          orderNumber: result.orderNumber 
        } 
      });
    } catch (error) {
      console.error('Order creation failed:', error);
      toast({ title: "Order creation failed", description: "Please try again or contact support", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="section-container py-20 text-center">
        <p className="text-lg font-medium mb-4">Your cart is empty</p>
        <Button asChild><Link to="/shop">Shop Now</Link></Button>
      </div>
    );
  }

  return (
    <div className="section-container py-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/cart" className="hover:text-foreground">Cart</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">Checkout</span>
      </nav>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="street">Street Address *</Label>
                  <Input id="street" value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Input id="region" value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="notes">Order Notes (optional)</Label>
                  <Textarea id="notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any special instructions..." />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Truck className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg">Delivery Method</h2>
              </div>
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-3">
                {[
                  { value: "standard", label: "Standard Delivery", desc: "3-5 business days", price: subtotal >= 10000 ? "FREE" : "KSH 500" },
                  { value: "express", label: "Express Delivery", desc: "1-2 business days", price: "KSH 1,000" },
                  { value: "pickup", label: "Store Pickup", desc: "Nairobi CBD", price: "FREE" },
                ].map(opt => (
                  <label key={opt.value} className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${deliveryMethod === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary/50'}`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={opt.value} />
                      <div>
                        <p className="text-sm font-medium">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{opt.price}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div>
            <div className="rounded-xl border border-border bg-card p-6 sticky top-28">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-48 overflow-auto">
                {items.map(item => (
                  <div key={item.cartItemId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate mr-2">{item.name} × {item.quantity}</span>
                    <span className="shrink-0">{formatPrice(item.subtotal)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />

              {!promoApplied && (
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="text-sm"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={handlePromo} disabled={!promoCode}>
                    Apply
                  </Button>
                </div>
              )}
              {promoApplied && (
                <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                  <Check className="w-4 h-4" /> Code "{promoCode}" applied
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full mt-6 h-12 glow-primary text-base"
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Place Order"}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center mt-3">
                By placing your order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
