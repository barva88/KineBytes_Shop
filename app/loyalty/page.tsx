import Link from 'next/link';
import { Star, Trophy, Gift, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Programa de Lealtad KinePoints — KineBytes Shop' };

const TIERS = [
  { name: 'Starter', points: '0 – 999', emoji: '🥉', benefits: ['1 punto por $1 gastado', 'Acceso a preventas', 'Newsletter exclusivo'] },
  { name: 'Pro Athlete', points: '1,000 – 4,999', emoji: '🥈', benefits: ['1.5 puntos por $1 gastado', 'Envío gratis en todos los pedidos', 'Soporte prioritario', '10% de descuento en accesorios'] },
  { name: 'Elite', points: '5,000+', emoji: '🏆', benefits: ['2 puntos por $1 gastado', 'Acceso a hardware en preventa exclusiva', 'Account manager personal', 'Invitación a eventos KineBytes'] },
];

export default function LoyaltyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-amber-400 mb-6"><Star size={14} /> KinePoints</div>
        <h1 className="text-4xl font-extrabold text-white mb-4">🏆 Programa de Lealtad</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">Cada compra, cada reseña, cada referido te acerca a beneficios exclusivos para atletas comprometidos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {TIERS.map(tier => (
          <div key={tier.name} className="p-6 bg-kb-card border border-zinc-800 rounded-2xl hover:border-amber-500/30 transition-all">
            <div className="text-4xl mb-3">{tier.emoji}</div>
            <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
            <p className="text-xs text-zinc-500 mb-4">{tier.points} puntos</p>
            <ul className="space-y-2">
              {tier.benefits.map(b => (
                <li key={b} className="flex items-start gap-2 text-sm text-zinc-400">
                  <Zap size={14} className="text-amber-400 shrink-0 mt-0.5" /> {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[['🛒', 'Compras', '1 pt por $1 gastado'], ['⭐', 'Reseñas', '50 pts por reseña'], ['👥', 'Referidos', '200 pts por referido']].map(([e, t, d]) => (
          <div key={t} className="flex items-center gap-4 p-4 bg-kb-card border border-zinc-800 rounded-xl">
            <span className="text-3xl">{e}</span>
            <div><p className="font-semibold text-white">{t}</p><p className="text-xs text-zinc-500">{d}</p></div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/register"><Button size="lg" className="gap-2">Únete y empieza a ganar <ArrowRight size={16} /></Button></Link>
      </div>
    </div>
  );
}
