'use client';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui';
import { VariantSelector } from '@/components/product/VariantSelector';
import { useCartStore } from '@/stores/cart-store';
import { formatCurrency } from '@/lib/utils';
import type { StoreProduct } from '@/types/store';

export function AddToCartButton({ product }: { product: StoreProduct }) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
  const activePrice = product.price + (selectedVariant?.priceDelta || 0);

  const handleAddToCart = () => {
    if (selectedVariantId) {
      addItem(product, selectedVariantId, quantity);
    }
  };

  return (
    <>
      <div className="flex items-end gap-3">
        <span className="text-4xl font-bold text-white">{formatCurrency(activePrice)}</span>
        {product.compareAtPrice && <span className="text-lg text-zinc-500 line-through mb-1">{formatCurrency(product.compareAtPrice)}</span>}
      </div>
      <VariantSelector variants={product.variants} selectedId={selectedVariantId} onSelect={setSelectedVariantId} />
      <div className="flex gap-4">
        <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900/50 p-1 shrink-0">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white">-</button>
          <span className="w-8 text-center text-sm font-medium text-white">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white">+</button>
        </div>
        <Button size="lg" className="flex-1 gap-2 text-base font-semibold" onClick={handleAddToCart} disabled={product.stock === 'out-of-stock'}>
          <ShoppingCart size={20} />
          {product.stock === 'out-of-stock' ? 'Agotado' : 'Agregar al carrito'}
        </Button>
      </div>
    </>
  );
}
