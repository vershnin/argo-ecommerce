import { apiClient as api } from '@/api/client';
import type { AxiosProgressEvent, AxiosResponse } from 'axios';
import { Product, Review, PromoCode, Category, Address } from '@/types/product';
import { UserProfile } from '@/stores/authStore';

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface CategoryApiResponse {
  id: number | string;
  name: string;
  description?: string;
  productCount?: number;
}

interface CouponResponse {
  id?: number;
  code: string;
  type: string;
  discount?: number;
  value: number;
  message?: string;
  expiresAt?: string;
  active?: boolean;
  minOrderAmount?: number;
}

interface AdminCouponRequest {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder?: number;
  expiresAt?: string;
  active?: boolean;
}

interface AdminSummaryResponse {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  activePromotions: number;
}

interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

interface AdminCategoryRequest {
  name: string;
  description?: string;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as { response?: { data?: { message?: unknown } } }).response;
    if (response?.data?.message && typeof response.data.message === 'string') {
      return response.data.message;
    }
  }
  return fallback;
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
  const categoryId = categoryValue !== undefined && /^\d+$/.test(String(categoryValue)) ? Number(categoryValue) : undefined;

  const response = await api.get<PageResponse<Product>>('/products', {
    params: {
      keyword: params?.search,
      categoryId,
      brand: params?.brand,
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

export async function fetchProductById(id: number): Promise<Product | null> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

export async function fetchRelatedProducts(productId: number, limit: number = 4): Promise<Product[]> {
  const response = await api.get<Product[]>(`/products/${productId}/related`, {
    params: { limit },
  });
  return response.data;
}

// ─── Categories ──────────────────────────────────────────────

export async function fetchCategories(): Promise<Category[]> {
  const response = await api.get<CategoryApiResponse[]>('/categories');
  
  const iconMap: Record<string, string> = {
    Audio: 'Headphones', Wearables: 'Watch', Storage: 'HardDrive',
    Computing: 'Mouse', Gaming: 'Gamepad2', Cameras: 'Camera',
    Chargers: 'BatteryCharging', Games: 'Disc',
  };

  return response.data.map(cat => ({
    id: Number(cat.id),
    name: cat.name,
    icon: iconMap[cat.name] || 'Package',
    description: cat.description || `Browse ${cat.name} products`,
    productCount: cat.productCount || 0,
  }));
}

// ─── Reviews ─────────────────────────────────────────────────

export async function fetchReviews(productId: number): Promise<Review[]> {
  const response = await api.get<PageResponse<Review>>(`/products/${productId}/reviews`);
  return response.data.content;
}

export async function submitReview(productId: number, review: { rating: number; title: string; comment: string }): Promise<Review> {
  const response = await api.post<Review>(`/products/${productId}/reviews`, review);
  return response.data;
}

// ─── Promo Codes ─────────────────────────────────────────────

export async function validatePromoCode(code: string, orderTotal: number): Promise<{ valid: boolean; promo?: PromoCode; message?: string }> {
  try {
    const response = await api.post<CouponResponse>('/coupons/validate', { code, orderTotal });
    const promo: PromoCode = {
      ...response.data,
      type: response.data.type?.toLowerCase() as PromoCode['type'],
      discount: response.data.discount !== undefined ? Number(response.data.discount) : undefined,
      value: Number(response.data.value),
      minOrder: response.data.minOrderAmount !== undefined ? Number(response.data.minOrderAmount) : undefined,
      expiresAt: response.data.expiresAt ?? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      active: response.data.active ?? true,
    };

    return { valid: true, promo };
  } catch (error: unknown) {
    return { valid: false, message: getErrorMessage(error, 'Invalid promo code') };
  }
}

export async function fetchAdminSummary(): Promise<AdminSummaryResponse> {
  const response = await api.get<AdminSummaryResponse>('/admin/summary');
  return response.data;
}

export async function fetchPromoCodes(): Promise<PromoCode[]> {
  const response = await api.get<CouponResponse[]>('/admin/coupons');
  return response.data.map((coupon) => ({
    id: coupon.id,
    code: coupon.code,
    type: coupon.type.toLowerCase() as PromoCode['type'],
    value: Number(coupon.value),
    minOrder: coupon.minOrderAmount !== undefined ? Number(coupon.minOrderAmount) : undefined,
    expiresAt: coupon.expiresAt ?? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    active: coupon.active ?? true,
  }));
}

export async function createPromoCode(data: AdminCouponRequest): Promise<PromoCode> {
  const response = await api.post<CouponResponse>('/admin/coupons', data);
  return {
    id: response.data.id,
    code: response.data.code,
    type: response.data.type.toLowerCase() as PromoCode['type'],
    value: Number(response.data.value),
    minOrder: response.data.minOrderAmount !== undefined ? Number(response.data.minOrderAmount) : undefined,
    expiresAt: response.data.expiresAt ?? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    active: response.data.active ?? true,
  };
}

export async function updatePromoCode(id: number, data: AdminCouponRequest): Promise<PromoCode> {
  const response = await api.put<CouponResponse>(`/admin/coupons/${id}`, data);
  return {
    id: response.data.id,
    code: response.data.code,
    type: response.data.type.toLowerCase() as PromoCode['type'],
    value: Number(response.data.value),
    minOrder: response.data.minOrderAmount !== undefined ? Number(response.data.minOrderAmount) : undefined,
    expiresAt: response.data.expiresAt ?? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    active: response.data.active ?? true,
  };
}

export async function deletePromoCode(id: number): Promise<void> {
  await api.delete(`/admin/coupons/${id}`);
}

export async function fetchAddresses(): Promise<Address[]> {
  const response = await api.get<Address[]>('/addresses');
  return response.data;
}

export async function createAddress(data: {
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  isDefault?: boolean;
}): Promise<Address> {
  const response = await api.post<Address>('/addresses', data);
  return response.data;
}

export async function deleteAddress(id: number): Promise<void> {
  await api.delete(`/addresses/${id}`);
}

// ─── Orders ──────────────────────────────────────────────────

export async function createOrder(orderData: {
  deliveryMethod: string;
  shippingAddress: Address;
  promoCode?: string;
}): Promise<{ orderId: number; orderNumber: string; status: string }> {
  const response = await api.post<{ orderId: number; orderNumber: string; status: string }>('/orders', orderData);
  return response.data;
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

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
}

export async function updateProfile(data: { fullName: string; phone?: string; avatarUrl?: string }): Promise<UserProfile> {
  const response = await api.put<UserProfile>('/users/me', data);
  return response.data;
}

export async function mergeCart(items: { productId: number; quantity: number }[]): Promise<unknown> {
  const response = await api.post('/cart/merge', { items });
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

export async function adminUpdateProduct(id: number, data: AdminProductRequest): Promise<Product> {
  const response = await api.put<Product>(`/admin/products/${id}`, data);
  return response.data;
}

export async function adminDeleteProduct(id: number): Promise<void> {
  await api.delete(`/admin/products/${id}`);
}

// Category Admin
export async function adminCreateCategory(data: AdminCategoryRequest): Promise<Category> {
  const response = await api.post<Category>('/admin/categories', data);
  return response.data;
}

export async function adminUpdateCategory(id: number, data: AdminCategoryRequest): Promise<Category> {
  const response = await api.put<Category>(`/admin/categories/${id}`, data);
  return response.data;
}

export async function adminDeleteCategory(id: number): Promise<void> {
  await api.delete(`/admin/categories/${id}`);
}

// ─── File Upload ─────────────────────────────────────────────

export async function uploadProductImage(
  file: File,
  onUploadProgress?: (event: AxiosProgressEvent) => void
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/admin/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  }) as AxiosResponse<{ success: boolean; message: string; data: string }>;

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data; // Returns the image URL
}

// ─── Wishlist ────────────────────────────────────────────────

export async function fetchWishlist(): Promise<Product[]> {
  const response = await api.get<Product[]>('/wishlist');
  return response.data;
}

export async function addToWishlist(productId: number): Promise<void> {
  await api.post(`/wishlist/${productId}`);
}

export async function removeFromWishlist(productId: number): Promise<void> {
  await api.delete(`/wishlist/${productId}`);
}

export async function checkWishlistStatus(productId: number): Promise<boolean> {
  const response = await api.get<{ wishlisted: boolean }>(`/wishlist/${productId}/status`);
  return response.data.wishlisted;
}
