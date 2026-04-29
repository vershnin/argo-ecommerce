export function formatPrice(price: number): string {
  return `KSH ${price.toLocaleString()}`;
}

export function generateWhatsAppLink(productName: string, price: number): string {
  const message = encodeURIComponent(
    `Hi Argo Electronics, I am interested in ${productName} priced at ${formatPrice(price)}. Is it available?`
  );
  return `https://wa.me/254700000000?text=${message}`;
}

export function getDiscountPercentage(price: number, discountPrice: number): number {
  return Math.round(((price - discountPrice) / price) * 100);
}
