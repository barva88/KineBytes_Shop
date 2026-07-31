import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Acceso Denegado — KineBytes Shop' };

export default function ForbiddenPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-8 mx-auto">
          <Lock size={48} />
        </div>
        <p className="text-sm font-mono text-amber-400 mb-3">Error 403</p>
        <h1 className="text-4xl font-extrabold text-white mb-4">Acceso Denegado</h1>
        <p className="text-zinc-400 max-w-md mx-auto mb-8">
          No tienes los permisos necesarios para acceder a esta página. Si crees que esto es un error, inicia sesión con una cuenta autorizada.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login"><Button size="lg">Iniciar Sesión</Button></Link>
          <Link href="/"><Button variant="outline" size="lg">Volver al Inicio</Button></Link>
        </div>
      </div>
    </div>
  );
}
