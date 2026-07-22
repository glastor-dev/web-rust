import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Product } from '@/components/ui/ProductCard';
import { Meilisearch } from 'meilisearch';

export function useStoreFilters(products: Product[]) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(12);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [meiliResults, setMeiliResults] = useState<Product[] | null>(null);

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

  // Meilisearch Effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setMeiliResults(null);
      return;
    }

    let isMounted = true;
    const searchMeili = async () => {
      try {
        const client = new Meilisearch({
          host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700',
          apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY || 'glastor_b2b_master_key_super_secret_2026',
        });
        
        const index = client.index('products');
        const searchRes = await index.search(searchQuery, { limit: 100 });
        
        if (isMounted) {
          // Meilisearch returns hits, we cast them back to our Product type
          setMeiliResults(searchRes.hits as unknown as Product[]);
        }
      } catch (e) {
        console.warn('Meilisearch no disponible, usando fallback local.', e);
        if (isMounted) setMeiliResults(null);
      }
    };
    
    searchMeili();
    return () => { isMounted = false; };
  }, [searchQuery]);

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

  const filteredProducts = useMemo(() => {
    // Si Meilisearch encontró resultados, partimos de ahí; si no, del array original
    let result = meiliResults !== null ? [...meiliResults] : [...products];

    // Fallback: Filtrado en cliente si Meilisearch falló o no retornó resultados
    if (searchQuery.trim() && meiliResults === null) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) =>
        p.name.toUpperCase().startsWith(selectedCategory.toUpperCase()),
      );
    }

    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.category === selectedBrand);
    }

    result.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return (b.rating || 0) - (a.rating || 0);
    });

    return result;
  }, [products, meiliResults, searchQuery, selectedCategory, selectedBrand, sortBy]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    sortBy !== 'relevance';

  return {
    viewMode,
    setViewMode,
    visibleCount,
    setVisibleCount,
    filtersOpen,
    setFiltersOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    sortBy,
    setSortBy,
    categories,
    brands,
    filteredProducts,
    hasActiveFilters,
  };
}
