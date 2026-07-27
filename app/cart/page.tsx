'use client';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2, ArrowLeft, Info, ShieldCheck } from 'lucide-react';
import { useCartStore, useCartProducts, useCartSubtotal, useCartItemCount } from '@/stores/cart-store';
import { Button, Badge } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const cartProducts = useCartProducts();
  const subtotal = useCartSubtotal();
  const itemCount = useCartItemCount();
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  if (cartProducts.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="h-24 w-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-6">
            <ShoppingBag size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h1>
          <p className="text-zinc-400 mb-8 text-lg">
            Aún no has agregado equipos a tu carrito. Explora nuestro catálogo de hardware inteligente.
          </p>
          <Link href="/products" className="w-full">
            <Button size="lg" fullWidth className="gap-2 text-base">
              Explorar Catálogo <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Continuar comprando
      </Link>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-4">
          Carrito <span className="text-sm px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800 text-zinc-400 font-medium">{itemCount} items</span>
        </h1>
        <button onClick={clearCart} className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors">Vaciar carrito</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-kb-card border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 bg-zinc-900/50 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              <div className="col-span-6">Producto</div><div className="col-span-3 text-center">Cantidad</div><div className="col-span-3 text-right">Total</div>
            </div>
            <div className="divide-y divide-zinc-800">
              {cartProducts.map(({ item, product, variantLabel, unitPrice, lineTotal }) => (
                <div key={`${item.productId}-${item.variantId}`} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-6 flex gap-4">
                    <div className={`h-24 w-24 rounded-xl bg-gradient-to-br ${product.accent} flex items-center justify-center shrink-0 text-3xl border border-zinc-800`}>
                      {product.category === 'interactive-hardware' && '⚡'}
                      {product.category === 'sensors' && '📡'}
                      {product.category === 'training-packs' && '🎯'}
                      {product.category === 'software' && '💻'}
                      {product.category === 'accessories' && '🔧'}
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <Link href={`/products/${product.slug}`} className="text-base font-semibold text-white hover:text-emerald-400 truncate transition-colors">{product.name}</Link>
                      <p className="text-sm text-zinc-500 mt-1">{variantLabel}</p>
                      <p className="text-sm font-medium text-white mt-2 sm:hidden">{formatCurrency(unitPrice)}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-3 flex items-center justify-between sm:justify-center">
                    <span className="sm:hidden text-sm text-zinc-500">Cantidad:</span>
                    <div className="flex items-center gap-1 border border-zinc-700 rounded-lg bg-zinc-900/80 p-1">
                      <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="p-1.5 text-zinc-400 hover:text-white transition-colors"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="p-1.5 text-zinc-400 hover:text-white transition-colors"><Plus size={14} /></button>
                    </div>
                  </div>
                  <div className="sm:col-span-3 flex items-center justify-between sm:justify-end">
                    <span className="sm:hidden text-sm text-zinc-500">Total:</span>
                    <div className="flex items-center gap-4">
                      <span className="text-base font-bold text-white">{formatCurrency(lineTotal)}</span>
                      <button onClick={() => removeItem(item.productId, item.variantId)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 text-sm text-blue-200">
            <Info size={20} className="text-blue-400 shrink-0" />
            <p>Todos los envíos internacionales requieren firma de recibido. Los impuestos de importación se calculan en el checkout.</p>
          </div>
        </div>
        
        <div>
          <div className="bg-kb-card border border-zinc-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-white mb-6">Resumen de Orden</h2>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between"><span className="text-zinc-400">Subtotal</span><span className="font-medium text-white">{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Envío</span><span className="text-zinc-500">Calculado en checkout</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Impuestos</span><span className="text-zinc-500">Calculado en checkout</span></div>
            </div>
            <div className="pt-4 border-t border-zinc-800 mb-8 flex items-end justify-between">
              <span className="text-base font-semibold text-white">Total Estimado</span>
              <span className="text-2xl font-bold text-white">{formatCurrency(subtotal)}</span>
            </div>
            <Link href="/checkout"><Button size="lg" fullWidth className="gap-2 mb-4 h-14 text-base">Proceder al Pago <ArrowRight size={18} /></Button></Link>
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
              <ShieldCheck size={14} className="text-emerald-500" /> Transacción encriptada y segura
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
