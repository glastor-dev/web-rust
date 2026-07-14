import { useState, useLayoutEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'motion/react';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { ProductCard, type Product } from '../components/ui/ProductCard';
import { PageHero } from '../components/ui/PageHero';
import { Package, ShieldCheck, Zap } from 'lucide-react';
import { StoreFilterPanel } from '../components/ui/StoreFilterPanel';

export default function Store() {
  const {
    data: products = [],
    isLoading: loading,
    error,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const url = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${url}/api/products`);
      if (!response.ok) {
        throw new Error('No se pudieron cargar los productos');
      }
      return response.json();
    },
  });

  // View Mode & Pagination State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(12);

  // Filter States with URL Sync (Deep Linking)
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('cat') || 'all';
  const selectedBrand = searchParams.get('brand') || 'all';
  const sortBy = searchParams.get('sort') || 'relevance';

  const setSearchQuery = (val: string) =>
    setSearchParams(
      (prev) => {
        if (val) prev.set('q', val);
        else prev.delete('q');
        return prev;
      },
      { replace: true },
    );
  const setSelectedCategory = (val: string) =>
    setSearchParams((prev) => {
      if (val !== 'all') prev.set('cat', val);
      else prev.delete('cat');
      return prev;
    });
  const setSelectedBrand = (val: string) =>
    setSearchParams((prev) => {
      if (val !== 'all') prev.set('brand', val);
      else prev.delete('brand');
      return prev;
    });
  const setSortBy = (val: string) =>
    setSearchParams((prev) => {
      if (val !== 'relevance') prev.set('sort', val);
      else prev.delete('sort');
      return prev;
    });

  // Derive categories and brands dynamically from fetched products
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats).filter(Boolean).sort();
  }, [products]);

  const brands = useMemo(() => {
    // In our Product interface, brand might be embedded in the name or we can extract it.
    // Assuming the brand is the first word of the name if a dedicated 'brand' field doesn't exist,
    // or using 'brand' if we add it to the interface. For now, extracting from name:
    const brs = new Set(
      products.map((p) => {
        const parts = p.name.split(' ');
        return parts[0].toUpperCase();
      }),
    );
    return Array.from(brs).filter(Boolean).sort();
  }, [products]);

  // Derived Filtered Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Brand Filter
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.name.toUpperCase().startsWith(selectedBrand));
    }

    // 4. Sort
    result.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      // relevance (default): could be by rating or stock
      return b.rating - a.rating;
    });

    return result;
  }, [products, searchQuery, selectedCategory, selectedBrand, sortBy]);

  useLayoutEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      // Emitir evento manual si Lenis sigue atascado
      window.dispatchEvent(new Event('force-lenis-reset'));
    }
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen />}

      <div className="bg-[#050505] min-h-screen text-white pt-24 pb-24">
        <PageHero
          badge="Catálogo"
          title="Herramientas B2B"
          description="Estándares de la industria en herramientas y equipamiento. Calidad certificada y suministro mayorista B2B."
          minHeight="min-h-[600px]"
        />
        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
          {/* Toggle Grid/List UI */}
          <div className="flex justify-end mb-6 gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 border rounded-md transition-colors ${viewMode === 'grid' ? 'bg-brand/10 border-brand text-brand' : 'bg-transparent border-white/10 text-zinc-500 hover:text-white'}`}
              title="Vista de Cuadrícula"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 border rounded-md transition-colors ${viewMode === 'list' ? 'bg-brand/10 border-brand text-brand' : 'bg-transparent border-white/10 text-zinc-500 hover:text-white'}`}
              title="Vista de Lista Densa"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>

          {/* FILTROS B2B ARSENAL */}
          <StoreFilterPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
            brands={brands}
            totalResults={filteredProducts.length}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/10"
            >
              <ShieldCheck className="w-8 h-8 text-brand mb-4" />
              <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Garantía Oficial</h4>
              <p className="text-zinc-400 text-sm">
                Respaldo directo de fábrica en todos los equipos profesionales.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-brand/10 border border-brand/20"
            >
              <Zap className="w-8 h-8 text-brand mb-4" />
              <h4 className="font-bold text-brand text-sm uppercase tracking-widest mb-2">
                Envío Express
              </h4>
              <p className="text-zinc-400 text-sm">
                Despacho garantizado en 24hs para la industria y constructoras.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/10"
            >
              <Package className="w-8 h-8 text-brand mb-4" />
              <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Suministro B2B</h4>
              <p className="text-zinc-400 text-sm">
                Inventario al por mayor listo para desplegarse en construcciones masivas.
              </p>
            </motion.div>
          </div>

          {error ? (
            <div className="text-center py-20 border border-red-500/20 bg-red-500/5">
              <p className="text-red-400 font-mono uppercase tracking-widest mb-4">Error Crítico</p>
              <p className="text-white">Error de conexión con la base de datos.</p>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-24 bg-[#080808] border border-white/5">
                  <p className="text-zinc-500 font-mono">
                    No hay productos disponibles para tu búsqueda.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedBrand('all');
                    }}
                    className="mt-4 px-6 py-2 bg-white/5 border border-white/10 hover:border-brand text-white font-mono text-xs uppercase tracking-widest transition-colors"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              ) : (
                <motion.div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                      : 'flex flex-col gap-4'
                  }
                >
                  <AnimatePresence>
                    {filteredProducts.slice(0, visibleCount).map((product) => (
                      <ProductCard key={product.id} product={product} viewMode={viewMode} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Load More Button */}
              {filteredProducts.length > visibleCount && (
                <div className="flex justify-center mt-12 mb-8">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="px-8 py-4 bg-transparent border border-brand/50 text-brand font-mono font-bold uppercase tracking-widest text-sm hover:bg-brand hover:text-black hover:scale-105 transition-all duration-300"
                  >
                    Cargar Más Inventario
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
