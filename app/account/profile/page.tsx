'use client';
import Link from 'next/link';
import { ArrowLeft, Settings, User, Mail, Phone, Lock } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/account" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Mi Cuenta</Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><Settings size={22} /></div>
        <h1 className="text-2xl font-bold text-white">Datos Personales</h1>
      </div>
      {/* Avatar */}
      <div className="flex items-center gap-6 p-6 bg-kb-card border border-zinc-800 rounded-2xl mb-8">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl font-bold text-emerald-400">JT</div>
        <div>
          <p className="font-semibold text-white">Juan Torres</p>
          <p className="text-sm text-zinc-500">Miembro desde Enero 2024</p>
          <button className="text-xs text-emerald-400 hover:underline mt-2">Cambiar foto</button>
        </div>
      </div>
      {/* Form */}
      <div className="space-y-5 p-6 bg-kb-card border border-zinc-800 rounded-2xl mb-6">
        <h2 className="font-semibold text-white">Información Personal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Nombre</label><Input defaultValue="Juan" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Apellido</label><Input defaultValue="Torres" /></div>
        </div>
        <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Correo electrónico</label><Input type="email" defaultValue="juan@correo.com" /></div>
        <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Teléfono</label><Input type="tel" defaultValue="+52 55 1234 5678" /></div>
        <Button>Guardar Cambios</Button>
      </div>
      {/* Password */}
      <div className="space-y-5 p-6 bg-kb-card border border-zinc-800 rounded-2xl">
        <h2 className="font-semibold text-white flex items-center gap-2"><Lock size={16} className="text-emerald-400" /> Cambiar Contraseña</h2>
        <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Contraseña actual</label><Input type="password" placeholder="••••••••" /></div>
        <div className="space-y-1.5"><label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Nueva contraseña</label><Input type="password" placeholder="••••••••" /></div>
        <Button variant="outline">Actualizar Contraseña</Button>
      </div>
    </div>
  );
}
