import { apiClient } from './client';

export interface OrderItem {
  productId: number;
  name: string;
  slug?: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone?: string;
  street?: string;
  city?: string;
  region?: string;
  notes?: string;
}

export interface Order {
  orderId: number;
  orderNumber: string;
  createdAt: string;
  status: string;
  items: OrderItem[];
  totalAmount: number;
  subtotal?: number;
  deliveryFee?: number;
  discount?: number;
  deliveryMethod?: string;
  promoCode?: string;
  shippingAddress?: ShippingAddress;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

/**
 * GET /api/orders
 * Fetch the authenticated user's order history.
 */
export async function fetchMyOrders(
  page: number = 0,
  size: number = 20
): Promise<PageResponse<Order>> {
  const { data } = await apiClient.get('/orders', {
    params: { page, size },
  });
  return data;
}

/**
 * GET /api/admin/orders
 * Fetch all orders (admin only).
 */
export async function fetchAllOrders(
  page: number = 0,
  size: number = 20
): Promise<PageResponse<Order>> {
  const { data } = await apiClient.get('/admin/orders', {
    params: { page, size },
  });
  return data;
}

/**
 * PATCH /api/admin/orders/{id}/status
 * Update an order's status (admin only).
 */
export async function updateOrderStatus(
  id: number,
  status: string
): Promise<Order> {
  const { data } = await apiClient.patch(`/admin/orders/${id}/status`, {
    status,
  });
  return data;
}

