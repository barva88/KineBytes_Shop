import { cn } from '@/lib/utils';
import type { StoreProductVariant } from '@/types/store';

interface VariantSelectorProps {
  variants: StoreProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function VariantSelector({ variants, selectedId, onSelect }: VariantSelectorProps) {
  if (variants.length <= 1) return null;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-zinc-300">Variante</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            disabled={variant.stock <= 0}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border',
              selectedId === variant.id
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10'
                : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-600 hover:text-white',
              variant.stock <= 0 && 'opacity-40 cursor-not-allowed line-through'
            )}
          >
            {variant.label}
            {variant.priceDelta > 0 && (
              <span className="ml-1.5 text-xs text-zinc-500">+${variant.priceDelta}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
