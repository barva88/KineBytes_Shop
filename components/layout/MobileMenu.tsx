'use client';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-kb-surface border-r border-zinc-800 animate-slide-in-right">
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">KB</span>
            <span className="text-sm font-bold uppercase tracking-widest text-white">Menu</span>
          </Link>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white"><X size={20} /></button>
        </div>
        <nav className="p-5 space-y-6 overflow-y-auto h-[calc(100vh-73px)]">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Tienda</h3>
            <Link href="/" onClick={onClose} className="block py-2 text-white">Inicio</Link>
            <Link href="/products" onClick={onClose} className="block py-2 text-white">Todos los Productos</Link>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Categorías</h3>
            {CATEGORIES.map(cat => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`} onClick={onClose} className="flex items-center justify-between py-2 text-zinc-300 hover:text-white">
                <span className="flex items-center gap-3"><span className="text-xl">{cat.icon}</span>{cat.name}</span>
                <ChevronRight size={16} className="text-zinc-600" />
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
