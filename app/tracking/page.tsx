import Link from 'next/link';
import { ArrowLeft, Truck, MapPin, CheckCircle2, Circle, Package, Home } from 'lucide-react';

export const metadata = { title: 'Rastreo de Envío — KineBytes Shop' };

const TRACKING_STEPS = [
  { label: 'Pedido recibido', desc: 'Tu orden fue procesada', date: '15 Jul, 10:30', done: true },
  { label: 'En preparación', desc: 'Ensamblando y verificando tu hardware', date: '15 Jul, 14:15', done: true },
  { label: 'En tránsito', desc: 'Tu paquete está en camino', date: '16 Jul, 09:00', done: true },
  { label: 'En entrega local', desc: 'El repartidor está cerca', date: '17 Jul, 11:30', done: false },
  { label: 'Entregado', desc: 'Paquete recibido', date: '', done: false },
];

export default function OrderTrackingPage({ searchParams }: { searchParams: { order?: string } }) {
  const orderId = searchParams?.order || 'KB-001-2024';

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Mis Pedidos</Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><Truck size={22} /></div>
        <div>
          <h1 className="text-2xl font-bold text-white">Seguimiento de Envío</h1>
          <p className="text-zinc-400 text-sm">Pedido: {orderId}</p>
        </div>
      </div>

      <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-zinc-400">Número de guía</p>
          <p className="font-mono font-semibold text-white">MX1234567890KB</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-zinc-400">Transportista</p>
          <p className="font-medium text-white">DHL Express</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-400">Entrega estimada</p>
          <p className="font-medium text-emerald-400">17 Julio, 2024</p>
        </div>
      </div>

      <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl mb-8">
        <h2 className="font-semibold text-white mb-6">Historial de movimientos</h2>
        <div className="space-y-0">
          {TRACKING_STEPS.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-emerald-500 text-black' : 'bg-zinc-800 border border-zinc-700 text-zinc-600'}`}>
                  {step.done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                </div>
                {i < TRACKING_STEPS.length - 1 && <div className={`w-px flex-1 my-1 ${step.done && TRACKING_STEPS[i + 1].done ? 'bg-emerald-500/50' : 'bg-zinc-800'}`} style={{ minHeight: 24 }} />}
              </div>
              <div className="pb-6">
                <p className={`font-medium ${step.done ? 'text-white' : 'text-zinc-600'}`}>{step.label}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{step.desc}</p>
                {step.date && <p className="text-xs text-zinc-600 mt-1">{step.date}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400"><Home size={20} /></div>
        <div>
          <p className="font-medium text-white">Av. Insurgentes Sur 1234</p>
          <p className="text-xs text-zinc-500">Ciudad de México, CP 06600</p>
        </div>
      </div>
    </div>
  );
}
