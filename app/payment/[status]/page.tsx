// Payment gateway return pages: /payment/success, /payment/cancel, /payment/error
import Link from 'next/link';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { notFound } from 'next/navigation';

const STATES = {
  success: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]',
    title: '¡Pago Completado!',
    message: 'Tu pasarela de pago procesó la transacción correctamente. Serás redirigido en un momento.',
    redirect: '/order-success',
    cta: 'Ver confirmación',
    ctaVariant: 'primary' as const,
  },
  cancel: {
    icon: XCircle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    title: 'Pago Cancelado',
    message: 'Cancelaste el proceso de pago. Tu carrito sigue disponible por si decides continuar.',
    redirect: '/cart',
    cta: 'Volver al Carrito',
    ctaVariant: 'outline' as const,
  },
  error: {
    icon: AlertCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    title: 'Error en Pasarela',
    message: 'La pasarela de pago reportó un error. Intenta nuevamente o elige otro método.',
    redirect: '/checkout',
    cta: 'Reintentar',
    ctaVariant: 'primary' as const,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ status: string }> }) {
  const { status } = await params;
  const state = STATES[status as keyof typeof STATES];
  if (!state) return { title: 'Retorno de Pago — KineBytes Shop' };
  return { title: `${state.title} — KineBytes Shop` };
}

export default async function PaymentReturnPage({ params }: { params: Promise<{ status: string }> }) {
  const { status } = await params;
  const state = STATES[status as keyof typeof STATES];
  if (!state) return notFound();
  const Icon = state.icon;

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className={`inline-flex h-24 w-24 items-center justify-center rounded-full border ${state.bg} ${state.color} mb-8 mx-auto`}>
        <Icon size={48} />
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-4">{state.title}</h1>
      <p className="text-zinc-400 mb-10 leading-relaxed">{state.message}</p>
      <Link href={state.redirect}>
        <Button size="lg" variant={state.ctaVariant}>{state.cta}</Button>
      </Link>
    </div>
  );
}
