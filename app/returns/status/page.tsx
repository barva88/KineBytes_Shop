import Link from 'next/link';
import { ArrowLeft, RefreshCw, CheckCircle2, Clock, Package, Truck } from 'lucide-react';

export const metadata = { title: 'Estado de Devolución — KineBytes Shop' };

const RETURN_STEPS = [
  { icon: CheckCircle2, label: 'Solicitud recibida', date: '16 Jul, 09:00', done: true, desc: 'Tu solicitud fue procesada correctamente.' },
  { icon: Package, label: 'En revisión', date: '17 Jul, 11:30', done: true, desc: 'Nuestro equipo revisa los detalles del caso.' },
  { icon: Truck, label: 'Envío de devolución', date: '', done: false, desc: 'Recibirás instrucciones para devolver el producto.' },
  { icon: RefreshCw, label: 'Reembolso procesado', date: '', done: false, desc: 'El reembolso se acreditará en 5–10 días hábiles.' },
];

export default function ReturnStatusPage({ searchParams }: { searchParams: { id?: string } }) {
  const returnId = searchParams?.id || 'RET-2024-1234';

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Mis Pedidos</Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><RefreshCw size={22} /></div>
        <div>
          <h1 className="text-2xl font-bold text-white">Estado de Devolución</h1>
          <p className="text-zinc-400 text-sm">Solicitud: {returnId}</p>
        </div>
      </div>

      <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl mb-8 flex items-center gap-3">
        <Clock size={20} className="text-amber-400 shrink-0" />
        <div>
          <p className="font-semibold text-amber-300">En revisión</p>
          <p className="text-xs text-zinc-400">Tiempo estimado de resolución: 2–3 días hábiles</p>
        </div>
      </div>

      <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl">
        <h2 className="font-semibold text-white mb-6">Seguimiento</h2>
        {RETURN_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-emerald-500 text-black' : 'bg-zinc-800 border border-zinc-700 text-zinc-600'}`}>
                  <Icon size={16} />
                </div>
                {i < RETURN_STEPS.length - 1 && <div className={`w-px flex-1 my-1 ${step.done ? 'bg-emerald-500/50' : 'bg-zinc-800'}`} style={{ minHeight: 28 }} />}
              </div>
              <div className="pb-6">
                <p className={`font-medium ${step.done ? 'text-white' : 'text-zinc-600'}`}>{step.label}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{step.desc}</p>
                {step.date && <p className="text-xs text-zinc-600 mt-1">{step.date}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
