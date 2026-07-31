import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ category: string; sub: string }> }) {
  const { sub } = await params;
  return { title: `${sub.charAt(0).toUpperCase() + sub.slice(1)} — KineBytes Shop` };
}

export default async function SubcategoryPage({ params }: { params: Promise<{ category: string; sub: string }> }) {
  const { category, sub } = await params;
  const name = sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, ' ');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/collections" className="hover:text-white transition-colors">Colecciones</Link>
        <span>/</span>
        <Link href={`/collections/${category}`} className="hover:text-white transition-colors capitalize">{category.replace(/-/g, ' ')}</Link>
        <span>/</span>
        <span className="text-white capitalize">{name}</span>
      </nav>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2 capitalize">{name}</h1>
        <p className="text-zinc-400">Explora nuestra selección de {name} para atletas de alto rendimiento.</p>
      </div>
      <div className="flex flex-col items-center justify-center py-24 text-center border border-zinc-800 rounded-3xl bg-kb-card">
        <p className="text-zinc-400 mb-4">Los productos de esta subcategoría se cargarán desde la base de datos.</p>
        <Link href={`/products?category=${category}`}>
          <Button>Ver todos en {category.replace(/-/g, ' ')}</Button>
        </Link>
      </div>
    </div>
  );
}
