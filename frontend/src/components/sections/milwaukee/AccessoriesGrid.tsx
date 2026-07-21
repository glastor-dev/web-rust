import Link from 'next/link';
import { StaggeredGrid, StaggeredItem } from '@/components/ui/StaggeredGrid';
import { QuickAddToCart } from '@/components/ui/QuickAddToCart';
import { getBestsellers } from '@/lib/api/products';
import type { Product } from '@/lib/constants/dummyProducts';

export async function AccessoriesGrid({ category }: { category?: string }) {
  const { products, total: totalCount } = await getBestsellers(category);

  return (
    <section className="w-full bg-[#0a0a0a] py-16 border-t border-brand/20" id="bestsellers">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-brand font-mono text-xs font-bold uppercase tracking-widest mb-2">
              Top ventas en tiempo real
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Los más vendidos
            </h3>
          </div>
          <div className="text-right">
            <div className="text-zinc-400 text-xs font-mono uppercase tracking-widest">
              Resultados
            </div>
            <div className="text-white font-black text-lg">
              Mostrando {products.length} de {totalCount}
            </div>
          </div>
        </div>

        {/* Grid */}
        <StaggeredGrid className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((acc, i) => (
            <StaggeredItem key={acc.id || i}>
              <div className="border h-full border-white/10 bg-black flex flex-col group hover:border-brand/50 transition-colors">
                <div className="relative aspect-square bg-[#080808] flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      acc.image ||
                      'https://res.cloudinary.com/dzualplqi/image/upload/v1782126676/mlltz37idqfdhud9cf2z.webp'
                    }
                    alt={acc.name || 'Producto'}
                    className="w-full h-full object-cover px-6 py-6 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-mono font-bold bg-brand text-black uppercase tracking-widest px-2 py-1">
                    {acc.status || 'TOP'}
                  </span>
                </div>
                <div className="p-4 border-t border-white/5 flex flex-col grow justify-between gap-3">
                  <div>
                    <div className="text-brand text-[10px] font-bold uppercase tracking-widest mb-1">
                      {acc.category || 'GENERAL'}
                    </div>
                    <div className="text-white text-xs md:text-sm font-black uppercase tracking-tight leading-snug">
                      {acc.name || 'Accesorio'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col justify-center">
                      <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400">PRECIO B2B</span>
                      <span className="text-base sm:text-xl font-bold text-brand font-mono">
                        {(acc.price && acc.price > 0) ? `$${acc.price.toLocaleString()}` : 'Ver precio'}
                      </span>
                    </div>
                    <QuickAddToCart product={{ id: acc.id, name: acc.name || 'Accesorio', price: acc.price || 0, image: acc.image }} />
                  </div>
                </div>
              </div>
            </StaggeredItem>
          ))}
        </StaggeredGrid>

        <div className="mt-12 text-center">
          <Link
            href="/tienda"
            className="inline-block border-2 border-brand text-brand font-bold uppercase tracking-widest px-8 py-3 text-sm hover:bg-brand hover:text-black transition-colors"
          >
            VER CATÁLOGO COMPLETO
          </Link>
        </div>
      </div>
    </section>
  );
}
