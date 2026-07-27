import type { StoreProduct } from '@/types/store';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: StoreProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-zinc-800 border-dashed rounded-2xl bg-zinc-900/20">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-white mb-2">No se encontraron productos</h3>
        <p className="text-sm text-zinc-400">Intenta ajustar tus filtros o buscar con otros términos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
