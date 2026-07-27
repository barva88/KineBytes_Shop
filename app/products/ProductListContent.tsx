'use client';
import { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { Button } from '@/components/ui';
import { Filter } from 'lucide-react';
import type { StoreFilters, StoreCategorySlug, StoreProduct } from '@/types/store';
import { CATEGORIES } from '@/lib/constants';

function ProductListInner({ initialProducts }: { initialProducts: StoreProduct[] }) {
  const searchParams = useSearchParams();
  const [products] = useState(initialProducts);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<StoreFilters>({
    category: (searchParams?.get('category') as StoreCategorySlug) || 'all',
    sortBy: 'featured',
    query: searchParams?.get('q') || '',
    priceRange: [0, 1000] as [number, number],
    condition: 'all',
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      query: searchParams?.get('q') || '',
      category: (searchParams?.get('category') as StoreCategorySlug) || 'all',
    }));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return [...products]
      .filter((p) => {
        if (filters.category !== 'all' && p.category !== filters.category) return false;
        if (filters.condition !== 'all' && p.condition !== filters.condition) return false;
        if (p.price > filters.priceRange[1]) return false;
        if (q && !p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc': return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          case 'rating': return b.rating - a.rating;
          default: return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [products, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {filters.category !== 'all'
              ? CATEGORIES.find(c => c.slug === filters.category)?.name || 'Productos'
              : 'Todos los Productos'}
          </h1>
          <p className="text-zinc-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            {filters.query && ` para "${filters.query}"`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
            className="h-11 rounded-xl border border-zinc-800 bg-kb-card px-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Menor Precio</option>
            <option value="price-desc">Mayor Precio</option>
            <option value="rating">Mejor Valorados</option>
          </select>
          <Button variant="outline" className="lg:hidden gap-2" onClick={() => setFiltersOpen(true)}>
            <Filter size={16} /> Filtros
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          filters={filters}
          onChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
          onClear={() => setFilters({ category: 'all', sortBy: 'featured', query: '', priceRange: [0, 1000], condition: 'all' })}
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
        />
        <div className="flex-1 min-w-0">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export function ProductListContent({ initialProducts }: { initialProducts: StoreProduct[] }) {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-emerald-400">Cargando catálogo...</div>}>
      <ProductListInner initialProducts={initialProducts} />
    </Suspense>
  );
}
