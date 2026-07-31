'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Zap, Star, ArrowRight, Shield, Activity, Cpu } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { useCartStore } from '@/stores/cart-store';
import type { StoreProduct } from '@/types/store';

export function GrowingEcosystemShop({ products }: { products: StoreProduct[] }) {
  const addItem = useCartStore((s) => s.addItem);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (product: StoreProduct) => {
    addItem(product, product.variants?.[0]?.id || 'default');
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const latestProduct = products[0];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION ESTÁNDAR — PROMOCIONANDO DISPOSITIVO DESTACADO */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-kb-card via-kb-black to-kb-black px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <Badge variant="success" className="gap-1">
                <Zap size={12} /> Ecosistema en Crecimiento
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Hardware Deportivo de Nueva Generación
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-lg">
                Descubre nuestra línea inicial de dispositivos interconectados para atletas y entrenadores de alto nivel.
              </p>
              {latestProduct && (
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link href={`/products/${latestProduct.slug}`}>
                    <Button size="lg" className="gap-2">
                      Conocer {latestProduct.name} <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <Link href="#dispositivos">
                    <Button size="lg" variant="outline">
                      Explorar los {products.length} Dispositivos
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Featured Hero Box */}
            {latestProduct && (
              <div className="p-8 rounded-3xl bg-kb-card border border-emerald-500/30 flex flex-col items-center justify-center text-center space-y-4 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                <div className="text-7xl my-4">
                  {typeof latestProduct.images?.[0] === 'string' && latestProduct.images[0].length <= 4 ? latestProduct.images[0] : '⚡'}
                </div>
                <h3 className="text-xl font-bold text-white">{latestProduct.name}</h3>
                <p className="text-xs text-zinc-400 max-w-xs">{latestProduct.shortDescription || latestProduct.description}</p>
                <p className="text-2xl font-extrabold text-emerald-400">${latestProduct.price} USD</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. NUESTROS DISPOSITIVOS (GRID CENTRADO DE TARJETAS GRANDES) */}
      <section id="dispositivos" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-white">Nuestros Dispositivos Disponibles</h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Selecciona el hardware perfecto para optimizar tu rendimiento atlético.
          </p>
        </div>

        {/* Centered Large Cards Grid (2 or 3 columns) */}
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(products.length, 3)} gap-8 justify-center max-w-5xl mx-auto`}>
          {products.map((product) => {
            const img = product.images?.[0] || '⚡';
            return (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-3xl bg-kb-card border border-zinc-800 p-6 hover:border-emerald-500/40 transition-all duration-300 shadow-xl"
              >
                {/* Large Preview */}
                <div className="h-52 w-full rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-7xl mb-6 group-hover:scale-105 transition-transform duration-300">
                  {typeof img === 'string' && img.length <= 4 ? img : '⚡'}
                </div>

                <div className="flex-1 space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{product.category}</span>
                    <div className="flex items-center gap-1 text-xs text-amber-400">
                      <Star size={12} className="fill-current" /> {product.rating || 5.0}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {product.shortDescription || product.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-800 mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-zinc-500">Precio</p>
                    <p className="text-xl font-extrabold text-white">${product.price}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="gap-1.5"
                    >
                      <ShoppingCart size={16} /> {addedId === product.id ? 'Añadido' : 'Añadir'}
                    </Button>
                    <Link href={`/products/${product.slug}`}>
                      <Button size="sm" variant="outline">
                        Ver
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CONEXIÓN DEL ECOSISTEMA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-kb-card border border-zinc-800 p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto">
            <Cpu size={28} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Todos tus dispositivos en una sola suite</h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto">
            Los hardware KineBytes sincronizan automáticamente sus lecturas en un solo dashboard unificado.
          </p>
        </div>
      </section>
    </div>
  );
}
