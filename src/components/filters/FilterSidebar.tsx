import { CATEGORIES } from '@/lib/constants';
import { Select } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { StoreFilters, StoreCategorySlug } from '@/types/store';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: StoreFilters;
  onFilterChange: (filters: Partial<StoreFilters>) => void;
  productCount: number;
}

export function FilterSidebar({ filters, onFilterChange, productCount }: FilterSidebarProps) {
  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.condition !== 'all' ? 1 : 0) +
    (filters.query ? 1 : 0);

  return (
    <aside className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <SlidersHorizontal size={16} />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={() => onFilterChange({ category: 'all', condition: 'all', query: '', priceRange: [0, 1000] })}
            className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <X size={12} />
            Limpiar
          </button>
        )}
      </div>

      <p className="text-xs text-zinc-500">{productCount} productos encontrados</p>

      {/* Category filter */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Categoría</p>
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange({ category: 'all' })}
            className={cn(
              'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
              filters.category === 'all'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            )}
          >
            Todas las categorías
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onFilterChange({ category: cat.slug as StoreCategorySlug })}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2',
                filters.category === cat.slug
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              )}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Condition filter */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Condición</p>
        <div className="space-y-1">
          {[
            { value: 'all', label: 'Todos' },
            { value: 'new', label: 'Nuevo' },
            { value: 'bundle', label: 'Bundle' },
            { value: 'preorder', label: 'Pre-order' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange({ condition: opt.value as StoreFilters['condition'] })}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                filters.condition === opt.value
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <Select
          label="Ordenar por"
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as StoreFilters['sortBy'] })}
          options={[
            { value: 'featured', label: 'Destacados' },
            { value: 'price-asc', label: 'Precio: menor a mayor' },
            { value: 'price-desc', label: 'Precio: mayor a menor' },
            { value: 'rating', label: 'Mejor valorados' },
            { value: 'newest', label: 'Más nuevos' },
          ]}
        />
      </div>
    </aside>
  );
}
