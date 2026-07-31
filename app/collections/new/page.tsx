import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Novedades — KineBytes Shop', description: 'Los últimos productos de hardware atlético inteligente.' };

export default function NewArrivalsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6">
          <Sparkles size={14} /> Recién llegados
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">✨ Novedades</h1>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto">
          Los primeros en llegar: hardware de última generación para atletas que no aceptan compromisos.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {['KinePulse Gen 3', 'SensorMesh Pro', 'Data Hub Elite'].map((name, i) => (
          <div key={i} className="relative p-6 bg-kb-card border border-emerald-500/20 rounded-3xl">
            <div className="absolute top-4 right-4 bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Nuevo</div>
            <div className="h-40 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent flex items-center justify-center text-6xl mb-6">⚡</div>
            <h3 className="font-bold text-white mb-1">{name}</h3>
            <p className="text-sm text-zinc-400 mb-4">Tecnología de punta para el atleta moderno.</p>
            <Link href="/products"><Button fullWidth size="sm">Ver Producto</Button></Link>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/products"><Button size="lg" variant="outline" className="gap-2">Ver Catálogo Completo <ArrowRight size={16} /></Button></Link>
      </div>
    </div>
  );
}
