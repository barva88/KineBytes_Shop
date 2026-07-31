import Link from 'next/link';
import { ArrowLeft, Download, Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui';
import { notFound } from 'next/navigation';

const MOCK_ORDER = {
  id: 'KB-001-2024',
  date: '15 Julio, 2024',
  status: 'Entregado',
  items: [
    { name: 'KinePulse Pro', variant: 'Standard', qty: 1, price: 299, emoji: '⚡' },
    { name: 'Training Pack Starter', variant: 'Pack Completo', qty: 1, price: 150, emoji: '🎯' },
  ],
  subtotal: 449,
  shipping: 0,
  total: 449,
  address: { name: 'Juan Torres', line1: 'Av. Insurgentes Sur 1234', city: 'Ciudad de México', cp: '06600' },
  tracking: 'MX1234567890KB',
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `Pedido ${id} — KineBytes Shop` };
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Mis Pedidos</Link>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{id}</h1>
          <p className="text-zinc-400">{MOCK_ORDER.date}</p>
        </div>
        <Button variant="outline" className="gap-2"><Download size={16} /> Descargar Factura</Button>
      </div>
      {/* Status */}
      <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl mb-8">
        <CheckCircle2 size={20} className="text-emerald-400" />
        <span className="font-semibold text-emerald-300">Pedido {MOCK_ORDER.status}</span>
        <span className="ml-auto text-xs text-zinc-500">Guía: {MOCK_ORDER.tracking}</span>
      </div>
      {/* Items */}
      <div className="bg-kb-card border border-zinc-800 rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-white mb-4">Productos</h2>
        <div className="space-y-4">
          {MOCK_ORDER.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-zinc-900 flex items-center justify-center text-2xl border border-zinc-800">{item.emoji}</div>
              <div className="flex-1">
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-xs text-zinc-500">{item.variant} · x{item.qty}</p>
              </div>
              <p className="font-semibold text-white">${item.price}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-800 mt-6 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-zinc-400"><span>Subtotal</span><span>${MOCK_ORDER.subtotal}</span></div>
          <div className="flex justify-between text-zinc-400"><span>Envío</span><span>{MOCK_ORDER.shipping === 0 ? 'Gratis' : `$${MOCK_ORDER.shipping}`}</span></div>
          <div className="flex justify-between font-bold text-white text-base pt-2 border-t border-zinc-800 mt-2"><span>Total</span><span>${MOCK_ORDER.total}</span></div>
        </div>
      </div>
      {/* Address */}
      <div className="bg-kb-card border border-zinc-800 rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-white mb-3">Dirección de entrega</h2>
        <p className="text-zinc-400 text-sm">{MOCK_ORDER.address.name}<br/>{MOCK_ORDER.address.line1}<br/>{MOCK_ORDER.address.city}, CP {MOCK_ORDER.address.cp}</p>
      </div>
      <Link href={`/tracking?order=${id}`}><Button variant="outline" fullWidth className="gap-2"><Truck size={16} /> Rastrear Envío</Button></Link>
    </div>
  );
}
