'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Package, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button, Input } from '@/components/ui';

const RETURN_REASONS = ['Producto defectuoso', 'Llegó dañado', 'No era lo que esperaba', 'Talla/tamaño incorrecto', 'Error en el pedido', 'Otro'];

export default function ReturnRequestPage() {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6 mx-auto"><CheckCircle2 size={40} /></div>
        <h1 className="text-2xl font-bold text-white mb-3">Solicitud enviada</h1>
        <p className="text-zinc-400 mb-8">Hemos recibido tu solicitud de devolución. Nuestro equipo te contactará en un plazo de 24–48 horas con las instrucciones para devolver el producto.</p>
        <p className="text-xs font-mono text-zinc-500 mb-8">Número de solicitud: <strong className="text-white">RET-2024-1234</strong></p>
        <Link href="/account/orders"><Button variant="outline">Ver mis pedidos</Button></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/help" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Centro de Ayuda</Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><Package size={22} /></div>
        <h1 className="text-2xl font-bold text-white">Solicitar Devolución o Cambio</h1>
      </div>
      {step === 1 && (
        <div className="space-y-4">
          <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl space-y-4">
            <h2 className="font-semibold text-white">1. Selecciona el pedido</h2>
            <div className="p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-xl cursor-pointer">
              <div className="flex justify-between">
                <span className="font-semibold text-white">KB-001-2024</span>
                <span className="text-xs text-emerald-400 font-bold">Seleccionado</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">15 Julio, 2024 · KinePulse Pro</p>
            </div>
          </div>
          <Button onClick={() => setStep(2)} fullWidth className="gap-2">Continuar <ArrowRight size={16} /></Button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl space-y-4">
            <h2 className="font-semibold text-white">2. Motivo de la devolución</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RETURN_REASONS.map(r => (
                <button key={r} onClick={() => setReason(r)} className={`p-3 text-left text-sm rounded-xl border transition-all ${reason === r ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>{r}</button>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Detalles adicionales</label>
              <textarea value={details} onChange={e => setDetails(e.target.value)} rows={3} placeholder="Describe el problema con más detalle..." className="w-full rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none" />
            </div>
          </div>
          <Button onClick={() => setSubmitted(true)} disabled={!reason} fullWidth>Enviar solicitud</Button>
          <button onClick={() => setStep(1)} className="w-full text-sm text-zinc-500 hover:text-zinc-300 transition-colors">← Volver</button>
        </div>
      )}
    </div>
  );
}
