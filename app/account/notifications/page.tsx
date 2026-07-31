'use client';
import Link from 'next/link';
import { ArrowLeft, Bell, Mail, Smartphone, Megaphone } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState({ orderUpdates: true, promotions: false, newProducts: true, newsletter: false, sms: true });
  const toggle = (key: keyof typeof prefs) => setPrefs(prev => ({ ...prev, [key]: !prev[key] }));

  const SETTINGS = [
    { key: 'orderUpdates', icon: Bell, label: 'Actualizaciones de pedidos', desc: 'Estado de tu orden, envío y entrega' },
    { key: 'promotions', icon: Megaphone, label: 'Ofertas y promociones', desc: 'Descuentos exclusivos y rebajas especiales' },
    { key: 'newProducts', icon: Smartphone, label: 'Nuevos productos', desc: 'Notificación de lanzamientos y novedades' },
    { key: 'newsletter', icon: Mail, label: 'Newsletter', desc: 'Contenido editorial y guías de entrenamiento' },
    { key: 'sms', icon: Smartphone, label: 'SMS', desc: 'Alertas críticas por mensaje de texto' },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/account" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Mi Cuenta</Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><Bell size={22} /></div>
        <h1 className="text-2xl font-bold text-white">Notificaciones</h1>
      </div>
      <div className="space-y-4">
        {SETTINGS.map(({ key, icon: Icon, label, desc }) => (
          <div key={key} className="flex items-center gap-4 p-5 bg-kb-card border border-zinc-800 rounded-2xl">
            <div className="h-10 w-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 shrink-0"><Icon size={20} /></div>
            <div className="flex-1">
              <p className="font-medium text-white">{label}</p>
              <p className="text-xs text-zinc-500">{desc}</p>
            </div>
            <button onClick={() => toggle(key as keyof typeof prefs)} className={`relative w-12 h-6 rounded-full transition-colors ${prefs[key as keyof typeof prefs] ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
              <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${prefs[key as keyof typeof prefs] ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        ))}
      </div>
      <button className="mt-8 w-full py-3 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-colors">
        Guardar Preferencias
      </button>
    </div>
  );
}
