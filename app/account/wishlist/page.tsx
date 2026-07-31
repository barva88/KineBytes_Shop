'use client';
import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { useState } from 'react';

const MOCK_WISHLIST = [
  { id: '1', name: 'KinePulse Ultra', price: 399, emoji: '⚡', slug: 'kinepulse-ultra' },
  { id: '2', name: 'DataHub Pro', price: 249, emoji: '📡', slug: 'datahub-pro' },
  { id: '3', name: 'Sensor Mesh Kit', price: 179, emoji: '🎯', slug: 'sensor-mesh-kit' },
];

export default function WishlistPage() {
  const [items, setItems] = useState(MOCK_WISHLIST);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/account" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Mi Cuenta</Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><Heart size={22} /></div>
        <h1 className="text-2xl font-bold text-white">Lista de Deseos</h1>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 border border-zinc-800 rounded-2xl bg-kb-card">
          <Heart size={40} className="mx-auto mb-4 opacity-20" />
          <p>Tu lista de deseos está vacía.</p>
          <Link href="/products" className="text-emerald-400 hover:underline text-sm mt-2 inline-block">Explorar catálogo →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="p-5 bg-kb-card border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all">
              <div className="h-28 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent flex items-center justify-center text-5xl mb-4 border border-zinc-800">{item.emoji}</div>
              <h3 className="font-semibold text-white mb-1">{item.name}</h3>
              <p className="text-lg font-bold text-emerald-400 mb-4">${item.price}</p>
              <div className="flex gap-2">
                <Link href={`/products/${item.slug}`} className="flex-1">
                  <Button size="sm" fullWidth className="gap-1.5"><ShoppingCart size={14} /> Añadir</Button>
                </Link>
                <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))} className="p-2 text-zinc-500 hover:text-red-400 transition-colors border border-zinc-800 rounded-lg">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
