import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { toast } from '@/hooks/use-toast';

const apiClient = axios.create({
  baseURL: '/api', // Proxied by Vite to backend:8080
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // Zustand store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      toast({
        title: 'Session expired',
        description: 'Please sign in again.',
        variant: 'destructive',
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    }
    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
