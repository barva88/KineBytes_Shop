import Link from 'next/link';
import { Trophy, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Más Vendidos — KineBytes Shop', description: 'Los productos más populares de hardware atlético inteligente.' };

const BESTSELLERS = [
  { rank: 1, name: 'KinePulse Pro', price: 299, rating: 4.9, reviews: 342, emoji: '⚡', badge: '🏆 #1 en Ventas' },
  { rank: 2, name: 'SensorKit Elite', price: 199, rating: 4.8, reviews: 218, emoji: '📡', badge: '🥈 Top Rated' },
  { rank: 3, name: 'Training Pack Pro', price: 449, rating: 4.7, reviews: 156, emoji: '🎯', badge: '🥉 Favorito de Equipos' },
];

export default function BestsellersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-amber-400 mb-6">
          <Trophy size={14} /> Los favoritos de la comunidad
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">🏆 Más Vendidos</h1>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto">Los productos que miles de atletas ya confían para mejorar su rendimiento.</p>
      </div>

      <div className="space-y-4 mb-12">
        {BESTSELLERS.map((p) => (
          <div key={p.rank} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-kb-card border border-zinc-800 rounded-2xl hover:border-amber-500/30 transition-all">
            <div className="text-4xl font-black text-zinc-700 w-10 text-center">{p.rank}</div>
            <div className="text-6xl">{p.emoji}</div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs text-amber-400 font-semibold mb-1 block">{p.badge}</span>
              <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="flex text-amber-400">{[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= Math.floor(p.rating) ? "fill-current" : "text-zinc-700"} />)}</div>
                <span className="text-sm text-zinc-400">{p.rating} ({p.reviews} reseñas)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-white mb-3">${p.price}</p>
              <Link href="/products"><Button size="sm">Ver Producto</Button></Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/products"><Button size="lg" variant="outline" className="gap-2">Ver Catálogo Completo <ArrowRight size={16} /></Button></Link>
      </div>
    </div>
  );
}
