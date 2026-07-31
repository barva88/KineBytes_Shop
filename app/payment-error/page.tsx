import Link from 'next/link';
import { XCircle, RefreshCw, CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Error en el Pago — KineBytes Shop' };

export default function PaymentErrorPage() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-8 mx-auto shadow-[0_0_40px_rgba(239,68,68,0.15)]">
        <XCircle size={48} />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Pago Rechazado</h1>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        Tu pago no pudo ser procesado. Esto puede ocurrir por saldo insuficiente, datos incorrectos o restricciones de tu banco. <strong className="text-white">No se realizó ningún cargo.</strong>
      </p>
      <div className="space-y-4 text-left bg-kb-card border border-zinc-800 rounded-2xl p-6 mb-8">
        <h3 className="text-white font-semibold mb-4">¿Qué puedo hacer?</h3>
        {[
          'Verifica que los datos de tu tarjeta sean correctos.',
          'Asegúrate de tener fondos suficientes.',
          'Contacta a tu banco para verificar que no haya restricciones.',
          'Intenta con otro método de pago.',
        ].map((tip, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-zinc-400">
            <span className="h-5 w-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
            {tip}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/checkout"><Button size="lg" className="gap-2"><RefreshCw size={16} /> Reintentar Pago</Button></Link>
        <Link href="/cart"><Button variant="outline" size="lg" className="gap-2"><ArrowLeft size={16} /> Volver al Carrito</Button></Link>
      </div>
      <p className="mt-8 text-xs text-zinc-600">¿Necesitas ayuda? <Link href="/contact" className="text-emerald-400 hover:underline">Contáctanos</Link></p>
    </div>
  );
}
