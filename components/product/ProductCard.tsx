import Link from 'next/link';
import { Star, ShieldCheck } from 'lucide-react';
import type { StoreProduct } from '@/types/store';
import { Badge } from '@/components/ui';
import { formatCurrency, getStockDisplay } from '@/lib/utils';

export function ProductCard({ product }: { product: StoreProduct }) {
  const stockInfo = getStockDisplay(product.stock);

  return (
    <Link href={`/products/${product.slug}`} className="group relative flex flex-col rounded-2xl bg-kb-card border border-zinc-800 transition-all hover:border-zinc-700 hover:shadow-card-hover hover:-translate-y-1 overflow-hidden">
      {product.isFeatured && (
        <div className="absolute top-3 left-3 z-10"><Badge variant="success">Destacado</Badge></div>
      )}
      <div className="absolute top-3 right-3 z-10"><Badge className="bg-zinc-900/80 backdrop-blur">{stockInfo.label}</Badge></div>
      
      <div className={`aspect-square w-full bg-gradient-to-br ${product.accent} flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
        <div className="text-6xl filter drop-shadow-2xl mix-blend-overlay">
          {product.category === 'interactive-hardware' && '⚡'}
          {product.category === 'sensors' && '📡'}
          {product.category === 'training-packs' && '🎯'}
          {product.category === 'software' && '💻'}
          {product.category === 'accessories' && '🔧'}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">{product.name}</h3>
        <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{product.shortDescription}</p>
        
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center text-amber-400"><Star size={14} className="fill-current" /></div>
          <span className="text-sm font-medium text-white">{product.rating}</span>
          <span className="text-xs text-zinc-500">({product.reviewCount} res.)</span>
          {product.condition === 'new' && <ShieldCheck size={14} className="ml-auto text-emerald-500" />}
        </div>
        
        <div className="mt-4 pt-4 border-t border-zinc-800 flex items-end justify-between mt-auto">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Desde</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">{formatCurrency(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-xs text-zinc-500 line-through">{formatCurrency(product.compareAtPrice)}</span>
              )}
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:text-black transition-colors">
            <span className="text-lg leading-none">+</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
