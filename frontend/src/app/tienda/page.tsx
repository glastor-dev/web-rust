'use client';

import { useState, useLayoutEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'motion/react';

import { ProductCard, type Product } from '@/components/ui/ProductCard';
import { PageHero } from '@/components/ui/PageHero';
import { Package, ShieldCheck, Zap } from 'lucide-react';
import { StoreFilterPanel } from '@/components/ui/StoreFilterPanel';

export default function Store() {
  const {
    data: products = [],
    isLoading: loading,
    error,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const url = process.env.NEXT_PUBLIC_API_URL || '';
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
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter States with URL Sync (Deep Linking)
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (
    updater: (prev: URLSearchParams) => URLSearchParams,
    options?: { replace?: boolean },
  ) => {
    const prev = new URLSearchParams(searchParams.toString());
    const newParams = updater(prev);
    const queryString = newParams.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    if (options?.replace) {
      router.replace(url, { scroll: false });
    } else {
      router.push(url, { scroll: false });
    }
  };

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

  // Derive categories (tool type) and brands dynamically from fetched products
  const categories = useMemo(() => {
    const cats = new Set(
      products.map((p) => {
        const parts = p.name.split(' ');
        return parts[0].toUpperCase();
      }),
    );
    return Array.from(cats).filter(Boolean).sort();
  }, [products]);

  const brands = useMemo(() => {
    const brs = new Set(products.map((p) => p.category));
    return Array.from(brs).filter(Boolean).sort();
  }, [products]);

  // Derived Filtered Products
  const filteredProducts = useMemo(() => {
    let result = [...products];
    console.log(`[DEBUG] Initial products count: ${result.length}`);

    // 1. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
      console.log(`[DEBUG] After Search Filter count: ${result.length}`);
    }

    // 2. Category Filter (which is the tool type derived from the first word of the name)
    if (selectedCategory !== 'all') {
      result = result.filter((p) =>
        p.name.toUpperCase().startsWith(selectedCategory.toUpperCase()),
      );
    }

    // 3. Brand Filter (which is the p.category field in the DB)
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.category === selectedBrand);
    }

    // 4. Sort
    result.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return (b.rating || 0) - (a.rating || 0);
    });

    console.log(`[DEBUG] Final products count: ${result.length}`);
    return result;
  }, [products, searchQuery, selectedCategory, selectedBrand, sortBy]);

  useLayoutEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      window.dispatchEvent(new Event('force-lenis-reset'));
    }
  }, [loading]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    sortBy !== 'relevance';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Catálogo B2B Glastor',
            url: 'https://glastor.es/tienda',
            numberOfItems: filteredProducts.length,
            itemListElement: filteredProducts.slice(0, visibleCount).map((product, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `https://glastor.es/tienda/${product.id}`,
            })),
          }),
        }}
      />

      <div className="bg-[#050505] min-h-screen text-white pt-24 pb-24">
        <PageHero
          badge="Portal Mayorista"
          title="ARSENAL INDUSTRIAL"
          description="El estándar definitivo para obras y manufactura. Acceso exclusivo a inventario B2B con líneas de crédito y logística de alto rendimiento."
          minHeight="min-h-150"
          backgroundImage="/images/glastor_pipeline_bg.png"
        />
        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-6 text-xs font-mono text-zinc-500">
            <ol className="flex flex-wrap gap-2">
              <li>
                <a className="hover:text-white transition-colors" href="/">
                  Inicio
                </a>
              </li>
              <li>/</li>
              <li className="text-zinc-300" aria-current="page">
                Catálogo
              </li>
            </ol>
          </nav>

          {/* Toggle Grid/List UI */}
          <div className="flex justify-end mb-6 gap-2">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Vista de cuadrícula"
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
              aria-label="Vista de lista densa"
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

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* FILTROS B2B ARSENAL (SIDEBAR) */}
            <div className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-28 z-20">
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
                isOpen={filtersOpen}
                onToggle={() => setFiltersOpen((prev) => !prev)}
              />
            </div>

            {/* PRODUCT GRID AREA */}
            <div className="flex-1 w-full min-w-0">
              {error ? (
                <div className="text-center py-20 border border-red-500/20 bg-red-500/5">
                  <p className="text-red-400 font-mono uppercase tracking-widest mb-4">
                    Error Crítico
                  </p>
                  <p className="text-white">Error de conexión con la base de datos.</p>
                </div>
              ) : loading ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6'
                      : 'flex flex-col gap-4'
                  }
                >
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="border border-white/5 bg-[#030303] flex flex-col h-full animate-pulse"
                    >
                      <div className="relative aspect-square bg-white/5" />
                      <div className="p-4 sm:p-6 flex flex-col grow gap-4">
                        <div className="w-1/3 h-2 bg-brand/20 rounded" />
                        <div className="w-3/4 h-4 bg-white/10 rounded" />
                        <div className="w-1/2 h-3 bg-white/5 rounded mt-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-24 bg-[#080808] border border-white/5">
                      <p className="text-zinc-500 font-mono mb-4">
                        No hay productos disponibles para tu búsqueda.
                      </p>
                      <p className="text-zinc-500 font-mono text-sm mb-6">
                        Podés solicitar catálogo extendido o hablar con un ingeniero.
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                            setSelectedBrand('all');
                            setSortBy('relevance');
                          }}
                          className="px-6 py-3 bg-white/5 border border-white/10 hover:border-brand text-white font-mono text-xs uppercase tracking-widest transition-colors"
                        >
                          Restablecer filtros
                        </button>
                        <a
                          href="/contacto"
                          className="px-6 py-3 bg-brand text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                        >
                          Contactar
                        </a>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      className={
                        viewMode === 'grid'
                          ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6'
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col items-start p-8 bg-[#030303] border border-white/5 hover:border-brand/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/0 rounded-full blur-3xl group-hover:bg-brand/10 transition-colors duration-700 pointer-events-none" />
              <ShieldCheck
                className="w-10 h-10 text-zinc-600 group-hover:text-brand transition-colors duration-500 mb-6"
                strokeWidth={1.5}
              />
              <h4 className="font-black text-lg text-white uppercase tracking-tighter mb-2 group-hover:translate-x-1 transition-transform duration-300">
                Garantía Oficial
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Respaldo directo de fábrica en todos los equipos profesionales.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative flex flex-col items-start p-8 bg-[#030303] border border-white/5 hover:border-brand/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/0 rounded-full blur-3xl group-hover:bg-brand/10 transition-colors duration-700 pointer-events-none" />
              <Zap
                className="w-10 h-10 text-zinc-600 group-hover:text-brand transition-colors duration-500 mb-6"
                strokeWidth={1.5}
              />
              <h4 className="font-black text-lg text-white uppercase tracking-tighter mb-2 group-hover:translate-x-1 transition-transform duration-300">
                Envío Express
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Despacho garantizado en 24hs para la industria y constructoras.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative flex flex-col items-start p-8 bg-[#030303] border border-white/5 hover:border-brand/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/0 rounded-full blur-3xl group-hover:bg-brand/10 transition-colors duration-700 pointer-events-none" />
              <Package
                className="w-10 h-10 text-zinc-600 group-hover:text-brand transition-colors duration-500 mb-6"
                strokeWidth={1.5}
              />
              <h4 className="font-black text-lg text-white uppercase tracking-tighter mb-2 group-hover:translate-x-1 transition-transform duration-300">
                Suministro B2B
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Inventario al por mayor listo para desplegarse en construcciones masivas.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
