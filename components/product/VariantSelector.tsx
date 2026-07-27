import { cn, formatCurrency } from '@/lib/utils';
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
      <h3 className="text-sm font-medium text-white">Selecciona variante</h3>
      <div className="grid grid-cols-2 gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            className={cn(
              "flex flex-col items-start p-3 rounded-xl border text-left transition-all",
              selectedId === variant.id
                ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800"
            )}
          >
            <span className={cn("text-sm font-medium", selectedId === variant.id ? "text-emerald-400" : "text-white")}>
              {variant.label}
            </span>
            {variant.priceDelta > 0 && (
              <span className="text-xs text-zinc-400 mt-1">
                + {formatCurrency(variant.priceDelta)}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
