import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Check, Truck, Shield, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { useCartStore } from '@/stores/cart-store';
import { formatCurrency, cn, getStockDisplay } from '@/lib/utils';
import { Button, Badge } from '@/components/ui';
import { VariantSelector } from '@/components/product/VariantSelector';
import { ProductCard } from '@/components/product/ProductCard';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  const addItem = useCartStore((s) => s.addItem);

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]?.id ?? '');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-2xl font-bold text-white mb-3">Producto no encontrado</h1>
        <p className="text-zinc-500 mb-8">El producto que buscas no existe o fue removido.</p>
        <Link to="/products">
          <Button variant="outline" className="gap-2">
            <ArrowLeft size={16} /> Volver al catálogo
          </Button>
        </Link>
      </div>
    );
  }

  const variant = product.variants.find((v) => v.id === selectedVariant) ?? product.variants[0];
  const currentPrice = product.price + (variant?.priceDelta ?? 0);
  const stockInfo = getStockDisplay(product.stock);

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product.id, selectedVariant, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link to="/" className="hover:text-emerald-400 transition-colors">Inicio</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-emerald-400 transition-colors">Productos</Link>
        <ChevronRight size={14} />
        <Link to={`/products?category=${product.category}`} className="hover:text-emerald-400 transition-colors">
          {product.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
        </Link>
        <ChevronRight size={14} />
        <span className="text-zinc-300">{product.name}</span>
      </nav>

      {/* Product layout */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left — Gallery */}
        <div className="space-y-4">
          {/* Main image / Gradient placeholder */}
          <div className={cn(
            'relative aspect-square rounded-2xl bg-gradient-to-br overflow-hidden border border-zinc-800/60',
            product.accent || 'from-zinc-800/50 to-zinc-900',
            'flex items-center justify-center'
          )}>
            <span className="text-8xl opacity-50">
              {product.category === 'interactive-hardware' && '⚡'}
              {product.category === 'sensors' && '📡'}
              {product.category === 'training-packs' && '🎯'}
              {product.category === 'software' && '💻'}
              {product.category === 'accessories' && '🔧'}
            </span>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.compareAtPrice && (
                <Badge variant="success">
                  -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                </Badge>
              )}
              {product.isFeatured && <Badge variant="info">Destacado</Badge>}
            </div>
          </div>

          {/* Thumbnail row */}
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  'h-20 w-20 rounded-xl border bg-gradient-to-br flex items-center justify-center cursor-pointer transition-all',
                  i === 1
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-600',
                  product.accent || 'from-zinc-800/30 to-zinc-900'
                )}
              >
                <span className="text-lg opacity-40">
                  {product.category === 'interactive-hardware' && '⚡'}
                  {product.category === 'sensors' && '📡'}
                  {product.category === 'training-packs' && '🎯'}
                  {product.category === 'software' && '💻'}
                  {product.category === 'accessories' && '🔧'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Details */}
        <div className="space-y-6">
          {/* Title & Rating */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
              {product.category.replace(/-/g, ' ')}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-zinc-700'}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-400">
                {product.rating} ({product.reviewCount} reseñas)
              </span>
              <span className={cn('text-sm font-medium', stockInfo.color)}>
                • {stockInfo.label}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 pb-4 border-b border-zinc-800/60">
            <p className="text-4xl font-bold text-white">{formatCurrency(currentPrice)}</p>
            {product.compareAtPrice && (
              <p className="text-lg text-zinc-600 line-through mb-1">{formatCurrency(product.compareAtPrice + (variant?.priceDelta ?? 0))}</p>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed">{product.description}</p>

          {/* Variant selector */}
          <VariantSelector
            variants={product.variants}
            selectedId={selectedVariant}
            onSelect={setSelectedVariant}
          />

          {/* Quantity + Add to cart */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border border-zinc-800 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 text-zinc-400 hover:text-white transition-colors text-lg"
              >
                −
              </button>
              <span className="w-12 text-center text-sm font-semibold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 text-zinc-400 hover:text-white transition-colors text-lg"
              >
                +
              </button>
            </div>
            <Button
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              disabled={product.stock === 'out-of-stock'}
              className="gap-2"
            >
              {addedToCart ? (
                <>
                  <Check size={18} /> ¡Agregado!
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> Añadir al carrito — {formatCurrency(currentPrice * quantity)}
                </>
              )}
            </Button>
          </div>

          {/* Trust signals */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Truck size={16} className="text-emerald-500/60" />
              Envío express disponible
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Shield size={16} className="text-emerald-500/60" />
              Garantía 12 meses
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-4 border-t border-zinc-800/60">
            <h3 className="text-sm font-semibold text-white">Características</h3>
            <ul className="grid grid-cols-2 gap-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-zinc-400">
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="space-y-3 pt-4 border-t border-zinc-800/60">
            <h3 className="text-sm font-semibold text-white">Especificaciones</h3>
            <div className="space-y-2">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between text-sm py-2 border-b border-zinc-900">
                  <span className="text-zinc-500">{spec.label}</span>
                  <span className="text-zinc-300 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 space-y-8">
          <h2 className="text-2xl font-bold text-white">Productos relacionados</h2>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
