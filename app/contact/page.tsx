'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Contacto</h1>
        <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
          ¿Tienes preguntas sobre ventas por volumen, licencias enterprise o soporte técnico? Escríbenos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-kb-card border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><label className="text-sm font-medium text-zinc-300">Nombre</label><Input placeholder="Tu nombre" /></div>
              <div className="space-y-2"><label className="text-sm font-medium text-zinc-300">Email</label><Input type="email" placeholder="tu@email.com" /></div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Asunto</label>
              <select className="w-full h-11 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30">
                <option>Soporte Técnico</option>
                <option>Ventas por Volumen</option>
                <option>Garantías y RMA</option>
                <option>Dudas Generales</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Mensaje</label>
              <textarea rows={5} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30" placeholder="¿En qué te podemos ayudar?" />
            </div>
            <Button type="submit" size="lg" fullWidth>Enviar Mensaje</Button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-kb-card border border-zinc-800 rounded-3xl p-8 flex items-start gap-6">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Mail />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Soporte Directo</h3>
              <p className="text-zinc-400 mb-2">Para problemas técnicos urgentes.</p>
              <a href="mailto:support@kinebytes.com" className="text-emerald-400 font-medium hover:underline">support@kinebytes.com</a>
            </div>
          </div>
          
          <div className="bg-kb-card border border-zinc-800 rounded-3xl p-8 flex items-start gap-6">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Phone />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Ventas</h3>
              <p className="text-zinc-400 mb-2">Atención para equipos y academias (L-V 9am-6pm).</p>
              <a href="tel:+123456789" className="text-emerald-400 font-medium hover:underline">+1 (800) 555-KINE</a>
            </div>
          </div>

          <div className="bg-kb-card border border-zinc-800 rounded-3xl p-8 flex items-start gap-6">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <MapPin />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Oficina Central</h3>
              <p className="text-zinc-400">
                123 Innovation Drive<br />
                Tech Hub, CA 94043<br />
                Estados Unidos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
