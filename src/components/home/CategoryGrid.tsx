import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400 mb-3">Categorías</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Explora nuestro ecosistema</h2>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            to={`/products?category=${category.slug}`}
            className="group"
          >
            <div className={cn(
              'relative h-44 rounded-2xl border border-zinc-800/80 bg-kb-card overflow-hidden',
              'transition-all duration-300 hover:border-zinc-700 hover:shadow-card-hover hover:-translate-y-0.5',
              'flex flex-col items-center justify-center text-center p-5'
            )}>
              {/* Gradient accent */}
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-60', category.accent)} />

              <div className="relative z-10 space-y-3">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{category.description}</p>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <ArrowRight size={16} className="text-emerald-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
