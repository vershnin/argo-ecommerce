/**
 * api/products.ts
 * Real HTTP calls to Spring Boot /api/products and /api/categories
 */

import { apiClient } from "./client";

export interface ProductDto {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  brand: string;
  imageUrl: string;
  additionalImages: string[];
  price: number;
  discountPrice?: number;
  effectivePrice: number;
  stockQuantity: number;
  inStock: boolean;
  sku: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  warranty?: string;
  specifications: Record<string, string>;
  features: string[];
  category: { id: number; name: string; slug: string };
  createdAt: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

export interface ProductSearchParams {
  keyword?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: string;
  page?: number;
  size?: number;
}

export async function fetchProducts(
  params: ProductSearchParams = {}
): Promise<PageResponse<ProductDto>> {
  const { data } = await apiClient.get<PageResponse<ProductDto>>("/products", { params });
  return data;
}

export async function fetchProductById(id: number): Promise<ProductDto> {
  const { data } = await apiClient.get<ProductDto>(`/products/${id}`);
  return data;
}

export async function fetchProductBySlug(slug: string): Promise<ProductDto> {
  const { data } = await apiClient.get<ProductDto>(`/products/slug/${slug}`);
  return data;
}

export async function fetchRelatedProducts(
  productId: number,
  limit = 4
): Promise<ProductDto[]> {
  const { data } = await apiClient.get<ProductDto[]>(
    `/products/${productId}/related`,
    { params: { limit } }
  );
  return data;
}

export async function fetchCategories(): Promise<CategoryDto[]> {
  const { data } = await apiClient.get<CategoryDto[]>("/categories");
  return data;
}

// ── Admin product CRUD ─────────────────────────────────────────

export interface ProductPayload {
  name: string;
  slug?: string;
  description: string;
  shortDescription?: string;
  brand: string;
  imageUrl: string;
  additionalImages?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  sku?: string;
  badge?: string;
  warranty?: string;
  specifications?: string;
  features?: string;
  categoryId: number;
}

export async function createProduct(payload: ProductPayload): Promise<ProductDto> {
  const { data } = await apiClient.post<ProductDto>("/admin/products", payload);
  return data;
}

export async function updateProduct(
  id: number,
  payload: ProductPayload
): Promise<ProductDto> {
  const { data } = await apiClient.put<ProductDto>(`/admin/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id: number): Promise<void> {
  await apiClient.delete(`/admin/products/${id}`);
}
