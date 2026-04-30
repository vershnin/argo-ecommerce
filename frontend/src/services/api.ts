import api from '@/lib/axios';
import { Product, Review, PromoCode, Category } from '@/types/product';
import { UserProfile } from '@/stores/authStore';

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// ─── Products ────────────────────────────────────────────────

export async function fetchProducts(params?: {
  category?: string;
  brand?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; total: number }> {
  const categoryValue = params?.category === 'all' ? undefined : params?.category;
  const categoryId = categoryValue && /^\d+$/.test(categoryValue) ? Number(categoryValue) : undefined;

  const response = await api.get<PageResponse<Product>>('/products', {
    params: {
      keyword: params?.search,
      categoryId,
      minPrice: params?.minPrice,
      maxPrice: params?.maxPrice,
      inStock: params?.inStock,
      sort: params?.sort,
      page: params?.page ? params.page - 1 : 0, // Spring is 0-indexed
      size: params?.limit || 12,
    },
  });

  return {
    products: response.data.content,
    total: response.data.totalElements,
  };
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const response = await api.get<Product>(`/products/slug/${slug}`);
  return response.data;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

export async function fetchRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
  const response = await api.get<Product[]>(`/products/${productId}/related`, {
    params: { limit },
  });
  return response.data;
}

// ─── Categories ──────────────────────────────────────────────

export async function fetchCategories(): Promise<Category[]> {
  const response = await api.get<any[]>('/categories');
  
  const iconMap: Record<string, string> = {
    Audio: 'Headphones', Wearables: 'Watch', Storage: 'HardDrive',
    Computing: 'Mouse', Gaming: 'Gamepad2', Cameras: 'Camera',
    Chargers: 'BatteryCharging', Games: 'Disc',
  };

  return response.data.map(cat => ({
    id: cat.id.toString(),
    name: cat.name,
    icon: iconMap[cat.name] || 'Package',
    description: cat.description || `Browse ${cat.name} products`,
    productCount: cat.productCount || 0,
  }));
}

// ─── Reviews ─────────────────────────────────────────────────

export async function fetchReviews(productId: string): Promise<Review[]> {
  const response = await api.get<PageResponse<Review>>(`/products/${productId}/reviews`);
  return response.data.content;
}

export async function submitReview(productId: string, review: { rating: number; title: string; comment: string }): Promise<Review> {
  const response = await api.post<Review>(`/products/${productId}/reviews`, review);
  return response.data;
}

// ─── Promo Codes ─────────────────────────────────────────────

export async function validatePromoCode(code: string, orderTotal: number): Promise<{ valid: boolean; promo?: PromoCode; message?: string }> {
  try {
    const response = await api.post('/coupons/validate', { code, orderTotal });
    return { valid: true, promo: response.data };
  } catch (error: any) {
    return { valid: false, message: error.response?.data?.message || 'Invalid promo code' };
  }
}

// ─── Orders ──────────────────────────────────────────────────

export async function createOrder(orderData: {
  deliveryMethod: string;
  shippingAddress: any;
  promoCode?: string;
}): Promise<{ orderId: string; status: string }> {
  const response = await api.post('/orders', orderData);
  return {
    orderId: response.data.orderNumber,
    status: response.data.status,
  };
}

// ─── Auth ────────────────────────────────────────────────────

interface AuthResponse {
  token: string;
  user: UserProfile;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
}

export async function register(data: any): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
}

// ─── Admin ───────────────────────────────────────────────────

export interface AdminProductRequest {
  name: string;
  slug?: string;
  description: string;
  shortDescription?: string;
  brand: string;
  imageUrl: string;
  additionalImages?: string; // Comma-separated or similar
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  sku: string;
  badge?: string;
  warranty?: string;
  specifications?: string;
  features?: string;
  categoryId: number;
}

export async function adminCreateProduct(data: AdminProductRequest): Promise<Product> {
  const response = await api.post<Product>('/admin/products', data);
  return response.data;
}

export async function adminUpdateProduct(id: string, data: AdminProductRequest): Promise<Product> {
  const response = await api.put<Product>(`/admin/products/${id}`, data);
  return response.data;
}

export async function adminDeleteProduct(id: string): Promise<void> {
  await api.delete(`/admin/products/${id}`);
}
