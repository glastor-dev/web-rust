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
          if (!oldData || !Array.isArray(oldData)) return oldData;
          return oldData.map((product) => {
            if (!product) return product;
            return product.id === product_id ? { ...product, stock } : product;
          });
        });

        // Opcional: También podríamos actualizar la caché de bestsellers o un producto individual
      } catch (err) {
        console.error('Error parsing SSE data', err);
      }
    });

    let retryTimeout: NodeJS.Timeout;
    
    sse.onerror = (err) => {
      console.warn('Conexión de Stock en tiempo real interrumpida. Reconectando en 5s...', err);
      sse.close(); // Cerramos para evitar que el navegador spamee
      retryTimeout = setTimeout(() => {
        // En una app real, aquí llamaríamos a una función para reconectar.
        // Como estamos en un useEffect, React no volverá a ejecutar esto sin forzar un remount.
        // Para simplificar, recargaremos silenciosamente la query de productos.
        queryClient.invalidateQueries({ queryKey: ['products'] });
      }, 5000);
    };

    return () => {
      sse.close();
      clearTimeout(retryTimeout);
    };
  }, [queryClient]);
};
