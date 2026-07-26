import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import type { StoreProduct } from '@/types/store';
import { useCartStore } from '@/stores/cart-store';
import { formatCurrency, cn, getStockDisplay } from '@/lib/utils';
import { Badge } from '@/components/ui';

interface ProductCardProps {
  product: StoreProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const stockInfo = getStockDisplay(product.stock);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock !== 'out-of-stock') {
      addItem(product.id, product.variants[0]?.id ?? 'default');
    }
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block"
    >
      <div className="rounded-2xl border border-zinc-800/80 bg-kb-card overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:shadow-card-hover hover:-translate-y-1">
        {/* Image area / Gradient placeholder */}
        <div className={cn(
          'relative h-48 sm:h-52 bg-gradient-to-br',
          product.accent || 'from-zinc-800/50 to-zinc-900',
          'flex items-center justify-center overflow-hidden'
        )}>
          {/* Product icon placeholder */}
          <div className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-500">
            {product.category === 'interactive-hardware' && '⚡'}
            {product.category === 'sensors' && '📡'}
            {product.category === 'training-packs' && '🎯'}
            {product.category === 'software' && '💻'}
            {product.category === 'accessories' && '🔧'}
          </div>

          {/* Discount badge */}
          {discount && (
            <div className="absolute top-3 left-3">
              <Badge variant="success">-{discount}%</Badge>
            </div>
          )}

          {/* Condition badge */}
          {product.condition === 'bundle' && (
            <div className="absolute top-3 right-3">
              <Badge variant="info">Bundle</Badge>
            </div>
          )}
          {product.condition === 'preorder' && (
            <div className="absolute top-3 right-3">
              <Badge variant="warning">Pre-order</Badge>
            </div>
          )}

          {/* Quick actions overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 'out-of-stock'}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black text-xs font-semibold rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={14} />
              Agregar
            </button>
            <span className="flex items-center gap-1 px-3 py-2 bg-zinc-800/90 text-white text-xs rounded-lg backdrop-blur-sm">
              <Eye size={14} />
              Ver
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 uppercase tracking-wider">
              {product.category.replace(/-/g, ' ')}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={12} fill="currentColor" />
              <span className="text-zinc-300 font-medium">{product.rating}</span>
              <span className="text-zinc-600">({product.reviewCount})</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Price & Stock */}
          <div className="flex items-end justify-between pt-2 border-t border-zinc-800/60">
            <div>
              <p className="text-xl font-bold text-white">{formatCurrency(product.price)}</p>
              {product.compareAtPrice && (
                <p className="text-sm text-zinc-600 line-through">{formatCurrency(product.compareAtPrice)}</p>
              )}
            </div>
            <span className={cn('text-xs font-medium', stockInfo.color)}>
              {stockInfo.label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
