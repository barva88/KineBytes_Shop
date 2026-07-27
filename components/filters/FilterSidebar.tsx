'use client';
import { Filter, X, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import type { StoreFilters } from '@/types/store';
import { Button } from '@/components/ui';

interface FilterSidebarProps {
  filters: StoreFilters;
  onChange: (filters: Partial<StoreFilters>) => void;
  onClear: () => void;
  open: boolean;
  onClose: () => void;
}

export function FilterSidebar({ filters, onChange, onClear, open, onClose }: FilterSidebarProps) {
  return (
    <>
      <div className={cn("fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden", open ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={onClose} />
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-[280px] transform bg-kb-surface border-r border-zinc-800 transition-transform duration-300 ease-in-out lg:static lg:block lg:w-64 lg:translate-x-0 lg:bg-transparent lg:border-none",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 lg:p-0 lg:mb-6 border-b border-zinc-800 lg:border-none">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white"><Filter size={20} /> Filtros</h2>
            <button onClick={onClose} className="lg:hidden p-2 text-zinc-400 hover:text-white"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 lg:p-0 space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Categorías</h3>
              <div className="space-y-2">
                <button
                  onClick={() => onChange({ category: 'all' })}
                  className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors", filters.category === 'all' ? "bg-emerald-500/10 text-emerald-400 font-medium" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white")}
                >
                  Todos los Productos
                  {filters.category === 'all' && <Check size={16} />}
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => onChange({ category: cat.slug })}
                    className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors", filters.category === cat.slug ? "bg-emerald-500/10 text-emerald-400 font-medium" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white")}
                  >
                    <span className="flex items-center gap-2"><span>{cat.icon}</span> {cat.name}</span>
                    {filters.category === cat.slug && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Disponibilidad</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'Todos' },
                  { value: 'new', label: 'Nuevo' },
                  { value: 'bundle', label: 'Pack / Bundle' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onChange({ condition: option.value as any })}
                    className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors", filters.condition === option.value ? "bg-emerald-500/10 text-emerald-400 font-medium" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white")}
                  >
                    {option.label}
                    {filters.condition === option.value && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Rango de Precio</h3>
              <div className="px-3">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={filters.priceRange[1]}
                  onChange={(e) => onChange({ priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
                  className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-xs text-zinc-500 font-medium">
                  <span>$0</span>
                  <span className="text-emerald-400 font-bold">${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 lg:p-0 lg:mt-6 border-t border-zinc-800 lg:border-none">
            <Button variant="outline" fullWidth onClick={onClear} className="text-zinc-300 hover:text-white">
              Limpiar Filtros
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
