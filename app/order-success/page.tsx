'use client';

import Link from 'next/link';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui';

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-scale-in">
      <div className="text-center mb-16">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
          <CheckCircle2 size={48} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          ¡Pago Exitoso!
        </h1>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto">
          Tu orden ha sido procesada correctamente. Hemos enviado un recibo a tu correo y un SMS a tu número de contacto con los detalles iniciales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Qué sigue */}
        <div className="bg-kb-card border border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10" />
          <h2 className="text-xl font-bold text-white mb-6">¿Qué sigue ahora?</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-sm shrink-0">1</div>
                <div className="w-px h-full bg-zinc-800 my-2" />
              </div>
              <div className="pb-6">
                <h4 className="text-white font-semibold flex items-center gap-2"><Package size={16} className="text-emerald-400"/> Preparación</h4>
                <p className="text-sm text-zinc-400 mt-1">Nuestro equipo especializado está verificando y empaquetando tu equipo KineBytes.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                <div className="w-px h-full bg-zinc-800 my-2" />
              </div>
              <div className="pb-6">
                <h4 className="text-white font-semibold flex items-center gap-2"><Truck size={16} className="text-zinc-400"/> Despacho</h4>
                <p className="text-sm text-zinc-400 mt-1">El paquete será entregado a nuestro socio logístico. Recibirás tu guía de rastreo por correo y SMS.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 flex items-center justify-center font-bold text-sm shrink-0">3</div>
              </div>
              <div>
                <h4 className="text-white font-semibold flex items-center gap-2"><CheckCircle2 size={16} className="text-zinc-400"/> Entrega</h4>
                <p className="text-sm text-zinc-400 mt-1">Recibirás tu equipo de alto rendimiento directo en tus manos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen e Info */}
        <div className="space-y-8">
          <div className="bg-kb-card border border-zinc-800 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Detalles del Envío</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                <span className="text-zinc-400 flex items-center gap-2"><Calendar size={16} /> Fecha Estimada</span>
                <span className="font-medium text-emerald-400">3 - 5 días hábiles</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                <span className="text-zinc-400 flex items-center gap-2"><Truck size={16} /> Método</span>
                <span className="font-medium text-white">Envío Estándar</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                <span className="text-zinc-400 flex items-center gap-2"><Mail size={16} /> Notificaciones</span>
                <span className="font-medium text-white">Email + SMS</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 flex items-start gap-4">
            <ShieldCheck size={32} className="text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-white font-semibold mb-2">Garantía KineBytes</h4>
              <p className="text-sm text-zinc-400">Todo el hardware adquirido cuenta con soporte técnico prioritario y 1 año de garantía extendida de fábrica.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-zinc-800 pt-12">
        <Link href="/products" passHref legacyBehavior>
          <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-base font-semibold">
            Seguir Explorando <ArrowRight size={18} className="ml-2" />
          </Button>
        </Link>
        <Link href="/" passHref legacyBehavior>
          <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-10 text-base">
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
