import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Product } from '@/components/ui/ProductCard';

export function useStoreFilters(products: Product[]) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(12);
  const [filtersOpen, setFiltersOpen] = useState(false);

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
    let result = [...products];

    if (searchQuery.trim()) {
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
  }, [products, searchQuery, selectedCategory, selectedBrand, sortBy]);

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
