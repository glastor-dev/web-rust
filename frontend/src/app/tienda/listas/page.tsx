'use client';

import { useWishlistStore } from '@/store/wishlistStore';
import { useProductsQuery } from '@/lib/api/queries';
import { ProductCard } from '@/components/ui/ProductCard';
import { PageHero } from '@/components/ui/PageHero';
import Link from 'next/link';

export default function MisListas() {
  const { items } = useWishlistStore();
  const { data: products = [], isLoading } = useProductsQuery();
  
  const savedProducts = products.filter(p => items.some(i => i.id === p.id));

  return (
    <div className="bg-transparent min-h-screen pt-24 pb-24 text-white">
        <PageHero
          badge="Portal B2B"
          title="TUS PROYECTOS"
          description="Gestión de listas de herramientas guardadas para planificación y futuras cotizaciones."
          minHeight="min-h-112"
          backgroundImage="https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto/v1784578811/glastor_pipeline_bg_qhic8z.jpg"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12">
            <nav aria-label="breadcrumb" className="mb-12 text-xs font-mono text-zinc-500">
              <ol className="flex flex-wrap gap-2">
                <li><Link className="hover:text-white transition-colors" href="/">Inicio</Link></li>
                <li>/</li>
                <li><Link className="hover:text-white transition-colors" href="/tienda">Catálogo</Link></li>
                <li>/</li>
                <li className="text-zinc-300">Mis Listas</li>
              </ol>
            </nav>

            {isLoading ? (
               <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                 {[...Array(4)].map((_, i) => (
                    <div key={i} className="border border-white/5 bg-[#030303] flex flex-col h-96 animate-pulse">
                      <div className="relative aspect-square bg-white/5" />
                      <div className="p-6 flex flex-col grow gap-4">
                        <div className="w-1/3 h-2 bg-brand/20 rounded" />
                        <div className="w-3/4 h-4 bg-white/10 rounded" />
                      </div>
                    </div>
                  ))}
               </div>
            ) : savedProducts.length === 0 ? (
                <div className="text-center py-32 border border-white/5 bg-[#030303]">
                   <p className="text-zinc-500 font-mono mb-6 uppercase tracking-widest text-sm">No tienes herramientas asignadas a proyectos.</p>
                   <Link href="/tienda" className="px-8 py-4 bg-brand text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">Explorar Catálogo</Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                    {savedProducts.map((product) => (
                        <ProductCard key={product.id} product={product as any} viewMode="grid" />
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}
