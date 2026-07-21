import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Product } from '@/lib/constants/dummyProducts';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const useRealtimeStock = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Solo conectarse en el cliente
    if (typeof window === 'undefined') return;

    const sse = new EventSource(`${API_URL}/api/products/stream`);

    sse.addEventListener('stock_update', (event) => {
      try {
        const data = JSON.parse(event.data);
        const { product_id, stock } = data;

        // Actualizar la caché de 'products'
        queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map((product) =>
            product.id === product_id ? { ...product, stock } : product
          );
        });

        // Opcional: También podríamos actualizar la caché de bestsellers o un producto individual
      } catch (err) {
        console.error('Error parsing SSE data', err);
      }
    });

    sse.onerror = (err) => {
      console.error('SSE Error:', err);
      sse.close(); // Cerrar en caso de error y podríamos tener lógica de reconexión
    };

    return () => {
      sse.close();
    };
  }, [queryClient]);
};
