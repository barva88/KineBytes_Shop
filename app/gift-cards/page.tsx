import Link from 'next/link';
import { Gift, ArrowRight, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Tarjetas de Regalo — KineBytes Shop' };

const AMOUNTS = [50, 100, 150, 200, 300, 500];

export default function GiftCardsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6"><Gift size={14} /> Gift Cards</div>
        <h1 className="text-4xl font-extrabold text-white mb-4">🎁 Tarjetas de Regalo</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">El regalo perfecto para el atleta que lo tiene todo: déjales elegir su próximo hardware de alto rendimiento.</p>
      </div>

      {/* Card Preview */}
      <div className="relative mb-12 p-8 bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent border border-emerald-500/30 rounded-3xl overflow-hidden text-center">
        <div className="absolute top-4 right-4 text-4xl opacity-20">⚡</div>
        <div className="text-5xl mb-4">🎁</div>
        <p className="font-bold text-white text-xl mb-1">KineBytes Gift Card</p>
        <p className="text-emerald-400 font-extrabold text-3xl">$100</p>
        <p className="text-zinc-500 text-sm mt-2">Válida en toda la tienda · Sin fecha de vencimiento</p>
      </div>

      {/* Amount Selector */}
      <div className="mb-8">
        <h2 className="font-bold text-white mb-4">Selecciona el monto</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {AMOUNTS.map(amount => (
            <button key={amount} className="py-4 font-bold text-white border border-zinc-800 rounded-xl hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-lg first:border-emerald-500 first:bg-emerald-500/10 first:text-emerald-300">
              ${amount}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" fullWidth className="gap-2"><CreditCard size={18} /> Comprar Gift Card</Button>
        <Button size="lg" fullWidth variant="outline" className="gap-2">Canjear código</Button>
      </div>
    </div>
  );
}
