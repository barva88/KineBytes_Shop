import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Star, Check, Truck, Shield, ChevronRight } from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/products-service';
import { Button, Badge } from '@/components/ui';
import { VariantSelector } from '@/components/product/VariantSelector';
import { ProductCard } from '@/components/product/ProductCard';
import { formatCurrency, getStockDisplay } from '@/lib/utils';
import { AddToCartButton } from './AddToCartButton';

// This runs on the server at build time / request time
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  if (!product) return { title: 'No encontrado' };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  if (!product) return notFound();

  const stockInfo = getStockDisplay(product.stock);
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Volver a productos
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {/* Visual / Gallery */}
        <div className="space-y-4">
          <div className={`aspect-square w-full rounded-3xl bg-gradient-to-br ${product.accent} flex items-center justify-center relative overflow-hidden border border-zinc-800`}>
            {product.isFeatured && <div className="absolute top-4 left-4"><Badge variant="success">Destacado</Badge></div>}
            <div className="text-[150px] filter drop-shadow-2xl mix-blend-overlay">
              {product.category === 'interactive-hardware' && '⚡'}
              {product.category === 'sensors' && '📡'}
              {product.category === 'training-packs' && '🎯'}
              {product.category === 'software' && '💻'}
              {product.category === 'accessories' && '🔧'}
            </div>
          </div>
        </div>

        {/* Info & Purchase */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge>{product.category.replace(/-/g, ' ')}</Badge>
              <span className={`text-sm font-medium ${stockInfo.color} flex items-center gap-1.5`}>
                <span className="relative flex h-2 w-2"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${stockInfo.color === 'text-emerald-400' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span><span className={`relative inline-flex rounded-full h-2 w-2 ${stockInfo.color === 'text-emerald-400' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span></span>
                {stockInfo.label}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">{product.name}</h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-6">{product.shortDescription}</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className={i <= Math.floor(product.rating) ? "fill-current" : "text-zinc-700"} />)}</div>
                <span className="font-medium text-white">{product.rating}</span>
                <span className="text-sm text-zinc-500">({product.reviewCount} reseñas)</span>
              </div>
            </div>
          </div>

          <div className="py-6 border-y border-zinc-800 mb-8 space-y-6">
            <AddToCartButton product={product} />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Características Principales</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-zinc-800 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400"><Truck size={20} /></div><div><p className="text-sm font-medium text-white">Envío Rápido</p><p className="text-xs text-zinc-500">Global disponible</p></div></div>
              <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400"><Shield size={20} /></div><div><p className="text-sm font-medium text-white">Garantía</p><p className="text-xs text-zinc-500">1 año incluido</p></div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-2xl font-bold text-white mb-8">Especificaciones Técnicas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 p-8 rounded-2xl border border-zinc-800 bg-kb-card">
          {product.specifications.map((spec, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-zinc-800/50 last:border-0"><span className="text-sm text-zinc-500">{spec.label}</span><span className="text-sm font-medium text-white text-right">{spec.value}</span></div>
          ))}
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Productos Relacionados</h2>
            <Link href="/products" className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium">Ver todos <ChevronRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rp => <ProductCard key={rp.id} product={rp} />)}
          </div>
        </div>
      )}
    </div>
  );
}
