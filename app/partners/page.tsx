import Link from 'next/link';
import { Handshake, ArrowRight, CheckCircle2, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Programa de Partners — KineBytes' };

const BENEFITS = [
  { icon: DollarSign, title: 'Comisiones hasta 15%', desc: 'Gana por cada venta referida. Pagos mensuales sin tope.' },
  { icon: TrendingUp, title: 'Dashboard en tiempo real', desc: 'Visualiza tus conversiones, clics e ingresos al instante.' },
  { icon: Users, title: 'Soporte prioritario', desc: 'Acceso a un account manager dedicado a tu éxito.' },
];

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6"><Handshake size={14} /> Partners & Afiliados</div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Gana con KineBytes</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">Únete a nuestro programa de afiliados y referidos. Ideal para entrenadores, atletas, influencers y creadores de contenido deportivo.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {BENEFITS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-6 bg-kb-card border border-zinc-800 rounded-2xl text-center">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4"><Icon size={24} /></div>
            <h3 className="font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-400">{desc}</p>
          </div>
        ))}
      </div>
      <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl mb-8">
        <h2 className="text-xl font-bold text-white mb-4">¿Cómo funciona?</h2>
        {['Regístrate en el programa (es gratis)', 'Comparte tu enlace único con tu audiencia', 'Gana comisión por cada compra realizada', 'Cobra mensualmente vía transferencia o PayPal'].map((step, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-zinc-300 mb-3">
            <span className="h-6 w-6 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-xs shrink-0">{i + 1}</span>
            {step}
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/contact"><Button size="lg" className="gap-2">Solicitar acceso al programa <ArrowRight size={16} /></Button></Link>
      </div>
    </div>
  );
}
