'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ShoppingCart, Star, Sparkles, Filter, X, ArrowUpDown } from 'lucide-react';
import { Button, Input, Badge } from '@/components/ui';
import { useCartStore } from '@/stores/cart-store';
import { CATEGORIES } from '@/lib/constants';
import type { StoreProduct } from '@/types/store';

export function FullEcommerceShop({ products }: { products: StoreProduct[] }) {
  const addItem = useCartStore((s) => s.addItem);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
        const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesCond = selectedCondition === 'all' || p.condition === selectedCondition;
        return matchesSearch && matchesCat && matchesCond;
      })
      .sort((a, b) => {
        if (sortOrder === 'price-asc') return a.price - b.price;
        if (sortOrder === 'price-desc') return b.price - a.price;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, search, selectedCategory, selectedCondition, sortOrder]);

  return (
    <div className="space-y-12 pb-20">
      {/* 1. HERO BANNER PROMOCIONAL COMPACTO */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-r from-kb-card via-kb-black to-kb-card px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2">
            <Badge variant="success" className="gap-1">
              <Sparkles size={12} /> Catálogo Completo
            </Badge>
            <h1 className="text-3xl font-extrabold text-white">Catálogo de Hardware KineBytes</h1>
            <p className="text-sm text-zinc-400 max-w-xl">
              Explora nuestra suite completa de dispositivos y accesorios de alto rendimiento.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-80 relative">
            <Input
              placeholder="Buscar sensor, dispositivo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            <Search size={16} className="absolute left-3 top-3.5 text-zinc-500" />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-3 text-zinc-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. BARRA DE CATEGORÍAS & FILTROS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Todos ({products.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-zinc-500 flex items-center gap-1"><ArrowUpDown size={12} /> Ordenar:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* 3. LAYOUT PRINCIPAL: FILTROS LATERALES + GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Sidebar Filters */}
          <aside className="space-y-6 lg:col-span-1">
            <div className="p-5 rounded-2xl bg-kb-card border border-zinc-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Filter size={16} className="text-emerald-400" /> Filtros por Condición
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Todos', value: 'all' },
                  { label: 'Nuevo Hardware', value: 'new' },
                  { label: 'Preventa Exclusiva', value: 'preorder' },
                  { label: 'Packs / Bundles', value: 'bundle' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setSelectedCondition(item.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                      selectedCondition === item.value
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid (3 columns on desktop) */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-kb-card border border-zinc-800 rounded-3xl">
                <Search size={40} className="mx-auto mb-4 text-zinc-600" />
                <h3 className="text-lg font-bold text-white mb-1">No se encontraron productos</h3>
                <p className="text-xs text-zinc-500">Prueba ajustando los términos de búsqueda o filtros.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative flex flex-col rounded-2xl bg-kb-card border border-zinc-800 p-5 hover:border-emerald-500/40 transition-all duration-300"
                  >
                    <div className="h-44 w-full rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform duration-300">
                      {typeof product.images?.[0] === 'string' && product.images[0].length <= 4 ? product.images[0] : '⚡'}
                    </div>

                    <div className="flex-1 space-y-2 text-left">
                      <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">{product.category}</span>
                      <h4 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-zinc-400 line-clamp-2">{product.shortDescription || product.description}</p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800 mt-4 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-white">${product.price}</span>
                      <Button size="sm" onClick={() => addItem(product, product.variants?.[0]?.id || 'default')} className="gap-1 text-xs">
                        <ShoppingCart size={14} /> Añadir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}
