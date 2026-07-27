'use client';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore, useCartProducts, useCartSubtotal, useCartItemCount } from '@/stores/cart-store';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const cartProducts = useCartProducts();
  const subtotal = useCartSubtotal();
  const itemCount = useCartItemCount();
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-kb-surface border-l border-zinc-800 shadow-drawer animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">Carrito</h2>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-400 border border-emerald-500/20">{itemCount}</span>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/60">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-5 space-y-4">
          {cartProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={48} className="text-zinc-700 mb-4" />
              <h3 className="text-base font-semibold text-zinc-400 mb-2">Carrito vacío</h3>
              <p className="text-sm text-zinc-600 mb-6">Agrega productos para comenzar</p>
              <Button variant="outline" onClick={onClose}>Explorar productos</Button>
            </div>
          ) : (
            cartProducts.map(({ item, product, variantLabel, unitPrice, lineTotal }) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center shrink-0 text-2xl">
                  {product.category === 'interactive-hardware' && '⚡'}
                  {product.category === 'sensors' && '📡'}
                  {product.category === 'training-packs' && '🎯'}
                  {product.category === 'software' && '💻'}
                  {product.category === 'accessories' && '🔧'}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-white truncate">{product.name}</h4>
                      <p className="text-xs text-zinc-500">{variantLabel}</p>
                    </div>
                    <button onClick={() => removeItem(item.productId, item.variantId)} className="p-1 text-zinc-600 hover:text-red-400 transition-colors shrink-0">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 border border-zinc-800 rounded-lg">
                      <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="p-1.5 text-zinc-500 hover:text-white transition-colors"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="p-1.5 text-zinc-500 hover:text-white transition-colors"><Plus size={14} /></button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{formatCurrency(lineTotal)}</p>
                      {item.quantity > 1 && <p className="text-xs text-zinc-600">{formatCurrency(unitPrice)} c/u</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cartProducts.length > 0 && (
          <div className="border-t border-zinc-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Subtotal</span>
              <span className="text-lg font-bold text-white">{formatCurrency(subtotal)}</span>
            </div>
            <p className="text-xs text-zinc-600">Envío calculado al checkout</p>
            <div className="flex gap-3">
              <Link href="/cart" onClick={onClose} className="flex-1">
                <Button variant="outline" fullWidth>Ver carrito</Button>
              </Link>
              <Link href="/checkout" onClick={onClose} className="flex-1">
                <Button fullWidth className="gap-2">Checkout <ArrowRight size={16} /></Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
