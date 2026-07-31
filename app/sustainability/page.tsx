import Link from 'next/link';
import { Leaf, Zap, Truck, Recycle, ArrowRight } from 'lucide-react';

export const metadata = { title: 'Sostenibilidad — KineBytes Shop' };

export default function SustainabilityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-green-400 mb-6"><Leaf size={14} /> Sostenibilidad</div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Compromiso con el Planeta</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">El deporte de alto rendimiento y la responsabilidad ambiental no son contradictorios. En KineBytes, trabajamos para que sean complementarios.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          { icon: Zap, title: 'Energía Renovable', desc: 'El 100% de nuestra manufactura opera con energía solar. Nuestras oficinas tienen certificación LEED Gold.', pct: 100 },
          { icon: Recycle, title: 'Materiales Reciclados', desc: 'El 60% de los materiales en nuestros dispositivos provienen de fuentes recicladas o reciclables.', pct: 60 },
          { icon: Truck, title: 'Envíos Neutros en CO₂', desc: 'Compensamos el 100% de las emisiones de carbono de nuestros envíos a través de proyectos forestales.', pct: 100 },
          { icon: Leaf, title: 'Empaque Eco-friendly', desc: 'Nuestros empaques son 100% biodegradables y están fabricados con papel reciclado certificado FSC.', pct: 100 },
        ].map(({ icon: Icon, title, desc, pct }) => (
          <div key={title} className="p-6 bg-kb-card border border-zinc-800 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center"><Icon size={20} /></div>
              <h3 className="font-bold text-white">{title}</h3>
            </div>
            <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{desc}</p>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs text-green-400 font-semibold mt-1">{pct}% alcanzado</p>
          </div>
        ))}
      </div>
      <div className="p-8 text-center bg-kb-card border border-zinc-800 rounded-3xl">
        <h2 className="font-bold text-white mb-2">Meta 2030</h2>
        <p className="text-zinc-400 mb-4">Carbono neutral en toda nuestra cadena de valor, desde manufactura hasta entrega final.</p>
        <Link href="/about" className="text-emerald-400 hover:underline text-sm flex items-center justify-center gap-1">Conoce más sobre nosotros <ArrowRight size={14} /></Link>
      </div>
    </div>
  );
}
