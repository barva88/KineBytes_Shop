import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

export function FeaturedCarousel() {
  const featured = MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400 mb-3">Destacados</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Productos estrella</h2>
        </div>
        <Link to="/products">
          <Button variant="ghost" className="gap-2 hidden sm:flex">
            Ver todo <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link to="/products">
          <Button variant="outline" className="gap-2">
            Ver todo <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </section>
  );
}
