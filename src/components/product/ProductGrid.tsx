import type { StoreProduct } from '@/types/store';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: StoreProduct[];
  emptyMessage?: string;
}

export function ProductGrid({ products, emptyMessage = 'No se encontraron productos.' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-zinc-300 mb-2">Sin resultados</h3>
        <p className="text-sm text-zinc-500 max-w-md">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
