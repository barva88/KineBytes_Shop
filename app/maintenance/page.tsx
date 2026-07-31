import Link from 'next/link';
import { Wrench, Clock } from 'lucide-react';

export const metadata = { title: 'En Mantenimiento — KineBytes Shop' };

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-kb-black">
      <div className="text-center max-w-lg">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 mb-8 mx-auto">
          <Wrench size={48} className="animate-bounce" />
        </div>
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-amber-400 mb-6">
          <Clock size={14} /> Mantenimiento programado
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Estamos mejorando la tienda</h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          KineBytes Shop está en mantenimiento programado para traerte una experiencia aún mejor. Estaremos de vuelta pronto.
        </p>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-500 flex items-center justify-center gap-2">
          <Clock size={14} /> Tiempo estimado: 2 horas
        </div>
        <p className="mt-8 text-xs text-zinc-600">
          ¿Tienes una urgencia? Escríbenos a <a href="mailto:soporte@kinebytes.com" className="text-emerald-400 hover:underline">soporte@kinebytes.com</a>
        </p>
      </div>
    </div>
  );
}
