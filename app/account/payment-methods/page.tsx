import Link from 'next/link';
import { ArrowLeft, CreditCard, Plus, Trash2, Shield } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Métodos de Pago — KineBytes Shop' };

const MOCK_CARDS = [
  { id: '1', brand: 'VISA', last4: '4242', expiry: '12/26', holder: 'Juan Torres', default: true },
  { id: '2', brand: 'Mastercard', last4: '8888', expiry: '08/25', holder: 'Juan Torres', default: false },
];

export default function PaymentMethodsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/account" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Mi Cuenta</Link>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><CreditCard size={22} /></div>
          <h1 className="text-2xl font-bold text-white">Métodos de Pago</h1>
        </div>
        <Button className="gap-2"><Plus size={16} /> Agregar tarjeta</Button>
      </div>
      <div className="space-y-4 mb-8">
        {MOCK_CARDS.map(card => (
          <div key={card.id} className={`flex items-center gap-4 p-6 bg-kb-card border rounded-2xl ${card.default ? 'border-emerald-500/30' : 'border-zinc-800'}`}>
            <div className="h-12 w-16 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300">{card.brand}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-white">•••• {card.last4}</p>
                {card.default && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">Predeterminada</span>}
              </div>
              <p className="text-xs text-zinc-500">{card.holder} · Vence {card.expiry}</p>
            </div>
            <button className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-500">
        <Shield size={16} className="text-emerald-400 shrink-0" />
        Tus datos de pago están protegidos con cifrado SSL de 256 bits.
      </div>
    </div>
  );
}
