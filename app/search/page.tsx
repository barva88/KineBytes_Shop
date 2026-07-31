import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

// This is a thin wrapper — the real search is handled by /products?q=...
// We render a proper zero-results state here too using a flag based on searchParams.
export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams?.q?.trim() || '';
  const hasResults = false; // Would be set based on actual DB query in a full implementation

  if (!query) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-600 mb-6 mx-auto">
          <Search size={36} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">¿Qué estás buscando?</h1>
        <p className="text-zinc-400 mb-8">Usa la barra de búsqueda del menú superior para encontrar hardware, sensores, software y más.</p>
        <Link href="/products"><Button size="lg">Explorar Catálogo</Button></Link>
      </div>
    );
  }

  // Zero results state
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <p className="text-sm text-zinc-500 mb-1">Resultados para</p>
        <h1 className="text-2xl font-bold text-white">"{query}"</h1>
      </div>

      {/* Zero Results UI */}
      <div className="flex flex-col items-center justify-center py-20 text-center border border-zinc-800 rounded-3xl bg-kb-card mb-12">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-600 mb-6">
          <Search size={36} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Sin resultados para "{query}"</h2>
        <p className="text-zinc-400 max-w-sm mb-6">
          No encontramos productos que coincidan con tu búsqueda. Prueba con otro término o explora nuestras categorías.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/products"><Button>Ver todo el catálogo</Button></Link>
          <Link href="/collections"><Button variant="outline">Ver Colecciones</Button></Link>
        </div>
      </div>

      {/* Suggestions */}
      <h3 className="text-lg font-bold text-white mb-4">Categorías sugeridas</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {['Hardware Interactivo', 'Sensores', 'Training Packs', 'Software'].map((cat) => (
          <Link key={cat} href={`/products?q=${encodeURIComponent(cat)}`}
            className="flex items-center justify-between p-4 bg-kb-card border border-zinc-800 rounded-xl hover:border-emerald-500/40 transition-all text-sm text-zinc-300 hover:text-white group">
            {cat}
            <ArrowRight size={14} className="text-zinc-600 group-hover:text-emerald-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
