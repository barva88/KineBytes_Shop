import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import {
  useCartStore,
  useCartProducts,
  useCartSubtotal,
  useCartItemCount,
} from '@/stores/cart-store';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui';

export function CartPage() {
  const cartProducts = useCartProducts();
  const subtotal = useCartSubtotal();
  const itemCount = useCartItemCount();
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  if (cartProducts.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag size={64} className="text-zinc-700 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-3">Tu carrito está vacío</h1>
        <p className="text-zinc-500 mb-8 max-w-md mx-auto">
          Explora nuestro catálogo de hardware atlético inteligente y agrega productos a tu carrito.
        </p>
        <Link to="/products">
          <Button className="gap-2">
            <ArrowLeft size={16} /> Explorar productos
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Carrito</h1>
          <p className="text-sm text-zinc-500 mt-1">{itemCount} artículo{itemCount !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-zinc-500 hover:text-red-400 transition-colors"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="space-y-4">
          {cartProducts.map(({ item, product, variantLabel, unitPrice, lineTotal }) => (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="flex gap-5 p-5 rounded-2xl border border-zinc-800/60 bg-kb-card"
            >
              {/* Product icon */}
              <Link
                to={`/product/${product.slug}`}
                className="h-24 w-24 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center shrink-0 text-3xl hover:opacity-80 transition-opacity"
              >
                {product.category === 'interactive-hardware' && '⚡'}
                {product.category === 'sensors' && '📡'}
                {product.category === 'training-packs' && '🎯'}
                {product.category === 'software' && '💻'}
                {product.category === 'accessories' && '🔧'}
              </Link>

              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-base font-semibold text-white hover:text-emerald-400 transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-zinc-500">{variantLabel}</p>
                    <p className="text-sm text-zinc-400 mt-1">{formatCurrency(unitPrice)} c/u</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="p-2 text-zinc-600 hover:text-red-400 transition-colors rounded-lg hover:bg-zinc-800/60 shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 border border-zinc-800 rounded-xl">
                    <button
                      onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                      className="px-3 py-2 text-zinc-500 hover:text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                      className="px-3 py-2 text-zinc-500 hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-white">{formatCurrency(lineTotal)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="rounded-2xl border border-zinc-800/60 bg-kb-card p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Resumen del pedido</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal ({itemCount} artículos)</span>
                <span className="text-zinc-200">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Envío</span>
                <span className="text-zinc-500">Calculado al checkout</span>
              </div>
              <div className="h-px bg-zinc-800" />
              <div className="flex justify-between text-lg font-bold text-white">
                <span>Total estimado</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block">
              <Button fullWidth size="lg" className="gap-2">
                Proceder al checkout <ArrowRight size={18} />
              </Button>
            </Link>

            <Link to="/products" className="block">
              <Button variant="ghost" fullWidth className="gap-2">
                <ArrowLeft size={16} /> Seguir comprando
              </Button>
            </Link>

            <p className="text-xs text-zinc-600 text-center">
              Los impuestos y costos de envío se calculan en el checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
