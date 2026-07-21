import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/lib/constants/dummyProducts';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const useProductsQuery = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/products`);
      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de caché antes de refetch
  });
};

export const useBestsellersQuery = (category?: string) => {
  return useQuery<{ products: Product[]; total: number }>({
    queryKey: ['bestsellers', category || 'all'],
    queryFn: async () => {
      const url = new URL(`${API_URL}/api/products/bestsellers`);
      if (category) {
        url.searchParams.append('category', category);
      }
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Error al cargar bestsellers');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hora, no cambian tan seguido
  });
};
