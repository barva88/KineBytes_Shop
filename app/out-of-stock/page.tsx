import Link from 'next/link';
import { PackageX, ArrowLeft, Bell } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Producto Agotado — KineBytes Shop' };

export default function OutOfStockPage() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 mb-8 mx-auto">
        <PackageX size={48} />
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-4">Producto Temporalmente Agotado</h1>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        Este producto no está disponible en este momento. Puedes suscribirte para recibir una notificación en cuanto vuelva a estar en stock.
      </p>
      <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl mb-8">
        <p className="text-sm font-semibold text-white mb-3">Avísame cuando esté disponible</p>
        <div className="flex gap-3">
          <input type="email" placeholder="tu@correo.com" className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
          <Button className="gap-1.5"><Bell size={15} /> Notificarme</Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/products"><Button variant="outline" className="gap-2"><ArrowLeft size={16} /> Ver productos disponibles</Button></Link>
        <Link href="/collections/bestsellers"><Button variant="outline">Más Vendidos</Button></Link>
      </div>
    </div>
  );
}
