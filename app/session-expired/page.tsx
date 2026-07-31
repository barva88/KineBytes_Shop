import Link from 'next/link';
import { Clock, LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Sesión Expirada — KineBytes Shop' };

export default function SessionExpiredPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 mb-6 mx-auto">
          <Clock size={40} />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Sesión Expirada</h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          Tu sesión ha caducado por inactividad. Por seguridad, debes iniciar sesión nuevamente para continuar.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login"><Button size="lg" className="gap-2"><LogIn size={16} /> Iniciar Sesión</Button></Link>
          <Link href="/"><Button variant="outline" size="lg">Volver al Inicio</Button></Link>
        </div>
      </div>
    </div>
  );
}
