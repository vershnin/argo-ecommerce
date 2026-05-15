import { Order } from "@/types/product";
import { formatPrice } from "./formatters";

export function generateInvoiceHTML(order: Order): string {
  const itemsRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(item.unitPrice)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(item.subtotal)}</td>
      </tr>`
    )
    .join("");

  const addr = order.shippingAddress;
  const addressBlock = addr
    ? `<p style="margin:4px 0;font-size:13px;">${addr.fullName}<br/>${addr.street}<br/>${addr.city}, ${addr.region}<br/>Phone: ${addr.phone}<br/>Email: ${addr.email}</p>`
    : "<p>Store Pickup</p>";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Invoice ${order.orderId}</title></head>
<body style="font-family:system-ui,-apple-system,sans-serif;max-width:700px;margin:0 auto;padding:20px;color:#1a1a1a;">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px;">
    <div>
      <h1 style="font-size:24px;margin:0 0 4px;color:#dc2626;">Argo Electronics</h1>
      <p style="font-size:12px;color:#666;margin:0;">Nairobi, Kenya | +254 700 000 000</p>
    </div>
    <div style="text-align:right;">
      <h2 style="font-size:20px;margin:0 0 4px;">INVOICE</h2>
      <p style="font-size:13px;color:#666;margin:2px 0;">Order: <strong>${order.orderId}</strong></p>
      <p style="font-size:13px;color:#666;margin:2px 0;">Date: ${new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
    </div>
  </div>

  <div style="display:flex;gap:30px;margin-bottom:24px;">
    <div style="flex:1;">
      <h3 style="font-size:12px;text-transform:uppercase;color:#666;margin:0 0 6px;">Ship To</h3>
      ${addressBlock}
    </div>
    <div style="flex:1;">
      <h3 style="font-size:12px;text-transform:uppercase;color:#666;margin:0 0 6px;">Delivery</h3>
      <p style="font-size:13px;margin:4px 0;text-transform:capitalize;">${order.deliveryMethod ? `${order.deliveryMethod} Delivery` : "Delivery"}</p>
    </div>
  </div>

  <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
    <thead>
      <tr style="background:#f5f5f5;">
        <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;color:#666;">Item</th>
        <th style="padding:10px 12px;text-align:center;font-size:12px;text-transform:uppercase;color:#666;">Qty</th>
        <th style="padding:10px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#666;">Price</th>
        <th style="padding:10px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#666;">Total</th>
      </tr>
    </thead>
    <tbody>${itemsRows}</tbody>
  </table>

  <div style="max-width:280px;margin-left:auto;">
    <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;">
      <span style="color:#666;">Subtotal</span><span>${formatPrice(order.subtotal ?? order.items.reduce((sum, item) => sum + item.subtotal, 0))}</span>
    </div>
    ${order.discount > 0 ? `<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;color:#16a34a;">
      <span>Discount${order.promoCode ? ` (${order.promoCode})` : ""}</span><span>-${formatPrice(order.discount)}</span>
    </div>` : ""}
    <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;">
      <span style="color:#666;">Delivery</span><span>${order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:10px 0;font-size:18px;font-weight:bold;border-top:2px solid #1a1a1a;margin-top:6px;">
      <span>Total</span><span>${formatPrice(order.totalAmount)}</span>
    </div>
  </div>

  <div style="margin-top:40px;padding-top:20px;border-top:1px solid #eee;text-align:center;font-size:12px;color:#999;">
    <p>Thank you for shopping with Argo Electronics!</p>
    <p>For inquiries, contact us on WhatsApp: +254 700 000 000</p>
  </div>
</body>
</html>`;
}

export function downloadInvoice(order: Order) {
  const html = generateInvoiceHTML(order);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, "_blank");
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}
