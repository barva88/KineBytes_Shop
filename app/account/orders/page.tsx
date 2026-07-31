import Link from 'next/link';
import { ArrowLeft, Package, ChevronRight } from 'lucide-react';

export const metadata = { title: 'Mis Pedidos — KineBytes Shop' };

const MOCK_ORDERS = [
  { id: 'KB-001-2024', date: '15 Julio, 2024', status: 'Entregado', items: 2, total: 449, statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { id: 'KB-002-2024', date: '8 Junio, 2024', status: 'En tránsito', items: 1, total: 199, statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { id: 'KB-003-2024', date: '2 Mayo, 2024', status: 'Procesando', items: 3, total: 897, statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
];

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/account" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Mi Cuenta</Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><Package size={22} /></div>
        <h1 className="text-2xl font-bold text-white">Mis Pedidos</h1>
      </div>
      <div className="space-y-4">
        {MOCK_ORDERS.map(order => (
          <Link key={order.id} href={`/account/orders/${order.id}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-kb-card border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all group">
            <div>
              <p className="font-semibold text-white mb-1">{order.id}</p>
              <p className="text-sm text-zinc-500">{order.date} · {order.items} {order.items === 1 ? 'producto' : 'productos'}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${order.statusColor}`}>{order.status}</span>
              <span className="font-bold text-white">${order.total}</span>
              <ChevronRight size={16} className="text-zinc-600 group-hover:text-emerald-400 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
      {MOCK_ORDERS.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          <Package size={48} className="mx-auto mb-4 opacity-30" />
          <p>Aún no tienes pedidos.</p>
          <Link href="/products" className="text-emerald-400 hover:underline text-sm mt-2 inline-block">Explorar catálogo →</Link>
        </div>
      )}
    </div>
  );
}
