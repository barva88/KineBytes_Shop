import Link from 'next/link';
import { PackageX, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Producto Descontinuado — KineBytes Shop' };

export default function DiscontinuedPage() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 mb-8 mx-auto">
        <PackageX size={48} />
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-4">Producto Descontinuado</h1>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        Este producto ya no está en producción. Puede que una versión más reciente esté disponible en nuestro catálogo. ¡Revisa nuestras novedades!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/collections/new"><Button size="lg">Ver Novedades</Button></Link>
        <Link href="/products"><Button variant="outline" size="lg" className="gap-2"><ArrowLeft size={16} /> Explorar Catálogo</Button></Link>
      </div>
    </div>
  );
}
