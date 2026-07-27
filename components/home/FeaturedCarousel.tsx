import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/products-service';

export async function FeaturedCarousel() {
  const products = await getProducts();
  const featured = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <section className="py-24 bg-kb-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Productos Destacados</h2>
            <p className="text-zinc-400 max-w-xl text-lg">
              El equipamiento más elegido por academias profesionales para llevar su rendimiento al siguiente nivel.
            </p>
          </div>
          <Link href="/products" className="shrink-0">
            <Button variant="outline" className="gap-2">
              Ver catálogo completo <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
