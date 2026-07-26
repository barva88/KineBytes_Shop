import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { SlidersHorizontal, X } from 'lucide-react';
import type { StoreFilters } from '@/types/store';

export function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q');
  const [mobileFilters, setMobileFilters] = useState(false);

  const [filters, setFilters] = useState<StoreFilters>({
    category: (categoryParam as StoreFilters['category']) || 'all',
    sortBy: 'featured',
    query: queryParam || '',
    priceRange: [0, 1000],
    condition: 'all',
  });

  // Update filters when URL params change
  useMemo(() => {
    if (categoryParam && categoryParam !== filters.category) {
      setFilters((f) => ({ ...f, category: categoryParam as StoreFilters['category'] }));
    }
    if (queryParam && queryParam !== filters.query) {
      setFilters((f) => ({ ...f, query: queryParam }));
    }
  }, [categoryParam, queryParam]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilterChange = (partial: Partial<StoreFilters>) => {
    setFilters((f) => ({ ...f, ...partial }));
  };

  const filteredProducts = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    return [...MOCK_PRODUCTS]
      .filter((p) => (filters.category === 'all' ? true : p.category === filters.category))
      .filter((p) => (filters.condition === 'all' ? true : p.condition === filters.condition))
      .filter((p) =>
        q.length > 0
          ? [p.name, p.shortDescription, p.description, p.tags.join(' ')]
              .join(' ')
              .toLowerCase()
              .includes(q)
          : true
      )
      .filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc': return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          case 'rating': return b.rating - a.rating;
          case 'newest': return 0;
          default:
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return b.reviewCount - a.reviewCount;
        }
      });
  }, [filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-white">
          {filters.category !== 'all'
            ? MOCK_PRODUCTS.find((p) => p.category === filters.category)?.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Productos'
            : filters.query
              ? `Resultados para "${filters.query}"`
              : 'Todos los productos'}
        </h1>
        <p className="text-sm text-zinc-500">
          {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileFilters(!mobileFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 bg-kb-card text-sm text-zinc-300 hover:text-white hover:border-zinc-600 transition-all"
        >
          {mobileFilters ? <X size={16} /> : <SlidersHorizontal size={16} />}
          {mobileFilters ? 'Cerrar filtros' : 'Filtros'}
        </button>
      </div>

      {/* Layout */}
      <div className="flex gap-8">
        {/* Sidebar - Desktop always, Mobile toggle */}
        <div className={`${mobileFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
          <div className="lg:sticky lg:top-28">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              productCount={filteredProducts.length}
            />
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <ProductGrid
            products={filteredProducts}
            emptyMessage="No hay productos que coincidan con los filtros seleccionados. Intenta ajustar los criterios de búsqueda."
          />
        </div>
      </div>
    </div>
  );
}
