import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';

export function CategoryGrid() {
  return (
    <section className="py-24 bg-kb-black border-b border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Categorías</h2>
          <p className="text-zinc-400 max-w-2xl text-lg">
            Explora nuestra gama de productos diseñados para cada aspecto del entrenamiento de alto rendimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-kb-card border border-zinc-800 p-8 transition-all hover:border-zinc-700 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.accent} rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-5xl mb-6">{category.icon}</span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                  {category.description}
                </p>
                
                <div className="flex items-center text-sm font-medium text-emerald-400 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  Ver productos <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
