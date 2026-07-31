import Link from 'next/link';
import { Clock, Mail, Copy, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Pago Pendiente — KineBytes Shop' };

export default function PaymentPendingPage() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-8 mx-auto shadow-[0_0_40px_rgba(245,158,11,0.15)]">
        <Clock size={48} />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Pago Pendiente</h1>
      <p className="text-zinc-400 mb-10 leading-relaxed">
        Tu orden está en espera de confirmación de pago. Una vez que se acredite el depósito o transferencia, recibirás un correo de confirmación.
      </p>

      <div className="bg-kb-card border border-amber-500/20 rounded-2xl p-6 mb-8 text-left">
        <div className="flex items-center gap-2 text-amber-400 font-semibold mb-4">
          <AlertCircle size={18} /> Datos para transferencia
        </div>
        {[
          { label: 'Banco', value: 'Banco Atlético S.A.' },
          { label: 'Titular', value: 'KineBytes Technologies S.A. de C.V.' },
          { label: 'CLABE', value: '012180015114335809' },
          { label: 'Referencia', value: 'KB-ORDER-789' },
          { label: 'Monto', value: '$449.00 MXN' },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-2.5 border-b border-zinc-800 last:border-0">
            <span className="text-sm text-zinc-500">{label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{value}</span>
              <button className="text-zinc-600 hover:text-emerald-400 transition-colors"><Copy size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-400 mb-8">
        <Mail size={16} className="text-emerald-400 shrink-0" />
        Recibirás confirmación en tu correo una vez que verifiquemos el pago (1–2 días hábiles).
      </div>

      <Link href="/"><Button size="lg" variant="outline">Volver al Inicio</Button></Link>
    </div>
  );
}
