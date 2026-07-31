import Link from 'next/link';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Ofertas y Rebajas — KineBytes Shop', description: 'Las mejores ofertas en hardware atlético de alto rendimiento.' };

const OFFERS = [
  { name: 'KinePulse Pro v2', originalPrice: 349, salePrice: 249, discount: 29, emoji: '⚡', endsIn: '2 días' },
  { name: 'SensorKit Standard', originalPrice: 199, salePrice: 149, discount: 25, emoji: '📡', endsIn: '5 días' },
  { name: 'Training Pack Starter', originalPrice: 399, salePrice: 299, discount: 25, emoji: '🎯', endsIn: '1 día' },
];

export default function OffersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-red-400 mb-6">
          <Flame size={14} /> Ofertas limitadas
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">🔥 Ofertas y Rebajas</h1>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto">Hardware premium a precios especiales. Las ofertas son por tiempo limitado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {OFFERS.map((offer, i) => (
          <div key={i} className="relative p-6 bg-kb-card border border-red-500/20 rounded-3xl overflow-hidden">
            <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-extrabold px-3 py-1 rounded-full">-{offer.discount}%</div>
            <div className="h-40 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent flex items-center justify-center text-6xl mb-6">{offer.emoji}</div>
            <h3 className="font-bold text-white mb-2">{offer.name}</h3>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl font-extrabold text-red-400">${offer.salePrice}</span>
              <span className="text-lg text-zinc-500 line-through">${offer.originalPrice}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-4">
              <Clock size={12} /> Termina en: {offer.endsIn}
            </div>
            <Link href="/products"><Button fullWidth size="sm">Aprovechar Oferta</Button></Link>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/products"><Button size="lg" variant="outline" className="gap-2">Ver todos los productos <ArrowRight size={16} /></Button></Link>
      </div>
    </div>
  );
}
