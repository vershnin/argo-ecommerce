import apiClient from './client';

export interface CartItemDto {
  cartItemId: number;
  productId: number;
  name: string;
  imageUrl: string;
  price: number;
  subtotal: number;
  quantity: number;
  stockQuantity: number;
}

export interface CartResponse {
  items: CartItemDto[];
  totalAmount: number;
  itemCount: number;
}

export const cartApi = {
  getCart: async (): Promise<CartResponse> => {
    const response = await apiClient.get<CartResponse>('/cart');
    return response.data;
  },

  addItem: async (productId: number, quantity: number = 1): Promise<CartResponse> => {
    // If user is not logged in, we might want to handle it or let it fail
    const response = await apiClient.post<CartResponse>('/cart/add', { productId, quantity });
    return response.data;
  },

  updateItem: async (productId: number, quantity: number): Promise<CartResponse> => {
    const response = await apiClient.put<CartResponse>('/cart/update', { productId, quantity });
    return response.data;
  },

  removeItem: async (cartItemId: number): Promise<CartResponse> => {
    const response = await apiClient.delete<CartResponse>(`/cart/remove/${cartItemId}`);
    return response.data;
  },

  clearCart: async (): Promise<void> => {
    await apiClient.delete('/cart/clear');
  },
};
