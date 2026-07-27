import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      <div className="h-24 w-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-8 animate-scale-in">
        <CheckCircle2 size={48} />
      </div>
      <h1 className="text-4xl font-black text-white mb-4 animate-fade-in">¡Orden Confirmada!</h1>
      <p className="text-lg text-zinc-400 max-w-md mb-8 animate-fade-in">
        Hemos recibido tu pedido correctamente. Recibirás un correo de confirmación con los detalles del envío en breve.
      </p>
      
      <div className="w-full max-w-sm bg-kb-card border border-zinc-800 rounded-2xl p-6 mb-8 text-left animate-slide-in-right">
        <div className="flex items-center gap-3 text-zinc-300 mb-4 pb-4 border-b border-zinc-800/50">
          <Package size={20} className="text-emerald-400" />
          <span className="font-semibold">Estado del Pedido</span>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-zinc-500">Orden</span><span className="font-medium text-white">#KB-8X39F2</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">Estado</span><span className="font-medium text-emerald-400">Procesando</span></div>
        </div>
      </div>

      <Link href="/">
        <Button size="lg" className="gap-2">
          Volver a la tienda <ArrowRight size={18} />
        </Button>
      </Link>
    </div>
  );
}
