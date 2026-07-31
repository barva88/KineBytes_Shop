import Link from 'next/link';
import { LayoutDashboard, Package, MapPin, CreditCard, Heart, Bell, Settings, Trash2, LogOut, ChevronRight } from 'lucide-react';

export const metadata = { title: 'Mi Cuenta — KineBytes Shop' };

const ACCOUNT_SECTIONS = [
  { icon: Package, label: 'Mis Pedidos', desc: 'Historial y estado de tus órdenes', href: '/account/orders' },
  { icon: MapPin, label: 'Mis Direcciones', desc: 'Direcciones guardadas para envío', href: '/account/addresses' },
  { icon: CreditCard, label: 'Métodos de Pago', desc: 'Tarjetas y cuentas guardadas', href: '/account/payment-methods' },
  { icon: Heart, label: 'Lista de Deseos', desc: 'Productos guardados para después', href: '/account/wishlist' },
  { icon: Bell, label: 'Notificaciones', desc: 'Preferencias de comunicación', href: '/account/notifications' },
  { icon: Settings, label: 'Datos Personales', desc: 'Perfil y configuración de cuenta', href: '/account/profile' },
  { icon: Trash2, label: 'Eliminar Cuenta', desc: 'Eliminar tu cuenta de forma permanente', href: '/account/delete', danger: true },
];

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-6 mb-12 p-8 bg-kb-card border border-zinc-800 rounded-3xl">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl font-bold text-emerald-400">A</div>
        <div>
          <h1 className="text-2xl font-bold text-white">Mi Cuenta</h1>
          <p className="text-zinc-400">Bienvenido de vuelta a KineBytes Shop.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACCOUNT_SECTIONS.map(({ icon: Icon, label, desc, href, danger }) => (
          <Link key={href} href={href} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all group ${danger ? 'border-red-900/50 bg-red-500/5 hover:border-red-500/30' : 'border-zinc-800 bg-kb-card hover:border-emerald-500/30'}`}>
            <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${danger ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}><Icon size={22} /></div>
            <div className="flex-1">
              <p className={`font-semibold ${danger ? 'text-red-400' : 'text-white'}`}>{label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
            </div>
            <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          </Link>
        ))}
        <Link href="/logout" className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-800 bg-kb-card hover:border-zinc-600 transition-all group">
          <div className="h-11 w-11 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0"><LogOut size={22} /></div>
          <div className="flex-1">
            <p className="font-semibold text-zinc-300">Cerrar Sesión</p>
            <p className="text-xs text-zinc-600 mt-0.5">Salir de tu cuenta</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
