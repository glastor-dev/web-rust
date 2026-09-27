'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useProductsQuery } from '@/lib/api/queries';
import { ProductCard } from '@/components/ui/ProductCard';

export function ProductCrossSell({ currentProductId, currentCategory }: { currentProductId: string, currentCategory?: string }) {
  const { data: products = [], isLoading } = useProductsQuery();
  if (isLoading || products.length === 0) return null;

  // Filtrar el producto actual
  let related = products.filter((p) => p.id !== currentProductId);
  
  // Priorizar la misma categoría si existe, para cross-selling y "comprados juntos"
  if (currentCategory) {
    const sameCategory = related.filter((p) => p.category === currentCategory);
    // Para B2B, muchas veces compran diferentes categorías pero aquí priorizamos herramientas relacionadas (misma cat).
    // Otra opción sería productos de accesorios, pero como no hay categoría explícita de "accesorios", mezclamos.
    const others = related.filter((p) => p.category !== currentCategory);
    
    // Un pequeño "shuffle" determinista podría ser mejor, pero esto es suficiente
    related = [...sameCategory, ...others];
  }

  // Tomar los primeros 4 para mostrar
  const displayProducts = related.slice(0, 4);

  if (displayProducts.length === 0) return null;

  return (
    <div className="mt-32 pt-16 border-t border-white/10 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">
            Comprados <span className="text-brand">Juntos</span> Frecuentemente
          </h2>
          <p className="text-zinc-500 font-mono text-sm max-w-xl">
            Optimiza tu línea de producción. Estos equipos son frecuentemente adquiridos por contratistas que compraron este modelo.
          </p>
        </div>
        <a
          href="/tienda"
          className="px-6 py-3 bg-white/5 hover:bg-brand hover:text-black border border-white/10 hover:border-brand text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 shrink-0"
        >
          Explorar Arsenal B2B
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => (
          <div key={product.id}>
            <ProductCard product={product as any} viewMode="grid" />
          </div>
        ))}
      </div>
    </div>
  );
}
