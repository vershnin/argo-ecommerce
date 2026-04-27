export interface Product {
  id: number;
  name: string;
  slug: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  brand: string;
  price: number;
  discountPrice?: number;
  effectivePrice: number;
  description: string;
  shortDescription: string;
  imageUrl: string;
  additionalImages?: string[];
  specifications: string;
  features: string;
  sku: string;
  stockQuantity: number;
  inStock: boolean;
  badge?: string;
  rating: number;
  reviewCount: number;
  warranty?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

export interface Order {
  id: number;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryMethod: 'standard' | 'express' | 'pickup';
  shippingAddress?: Address;
  promoCode?: string;
  createdAt: string;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  region: string;
  notes?: string;
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder?: number;
  expiresAt: string;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  productCount: number;
}
