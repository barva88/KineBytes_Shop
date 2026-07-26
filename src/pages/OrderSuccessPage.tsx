import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui';

export function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderRef = searchParams.get('ref') || 'KB-XXXXXX';
  const emailParam = searchParams.get('email') || '';

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
      {/* Success animation */}
      <div className="relative inline-flex">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
        <div className="relative h-20 w-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-emerald-400" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          ¡Pedido confirmado!
        </h1>
        <p className="text-lg text-zinc-400">
          Tu pedido <span className="text-emerald-400 font-semibold">{orderRef}</span> ha sido registrado con éxito.
        </p>
      </div>

      {/* Email confirmation alert banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-left max-w-lg mx-auto space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
          <Mail size={18} />
          <span>Correo de confirmación enviado</span>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          Hemos enviado un correo electrónico de confirmación con el resumen de la compra y la factura comercial a{emailParam ? <strong> {emailParam}</strong> : ' tu correo de cuenta'}.
        </p>
      </div>

      <p className="text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed">
        La información de tu compra ha sido almacenada en tu cuenta unificada KineByte.
        Puedes consultar el historial de pedidos desde el dashboard principal.
      </p>

      {/* Order details card */}
      <div className="rounded-2xl border border-zinc-800/60 bg-kb-card p-6 text-left max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-3">
            <Package size={20} className="text-emerald-400" />
            <h2 className="text-base font-semibold text-white">Detalles del pedido</h2>
          </div>
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <ShieldCheck size={14} /> OTP Verificado
          </span>
        </div>

        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Referencia</span>
            <span className="text-zinc-200 font-mono font-bold">{orderRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Estado</span>
            <span className="text-emerald-400 font-medium">Pagado & Procesando</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Vinculado a KineByte</span>
            <span className="text-emerald-400 font-medium">✓ Sí (Mismo User ID)</span>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link to="/products">
          <Button size="lg" className="gap-2">
            Seguir comprando <ArrowRight size={18} />
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" size="lg">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
