'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, ArrowLeft, Truck, CreditCard, ShoppingBag, MapPin, Loader2 } from 'lucide-react';
import { useCartStore, useCartProducts, useCartTotal, useCartSubtotal, useCartShippingCost } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { Button, Input, Badge } from '@/components/ui';
import { SHIPPING_OPTIONS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { OtpVerificationModal } from '@/components/cart/OtpVerificationModal';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showOtp, setShowOtp] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const user = useAuthStore((s) => s.user);
  const cartProducts = useCartProducts();
  const subtotal = useCartSubtotal();
  const total = useCartTotal();
  const shippingCost = useCartShippingCost();
  const itemCount = cartProducts.reduce((sum, cp) => sum + cp.item.quantity, 0);
  
  const { shippingAddressData, selectedShippingId, updateShippingAddress, setShippingMethod, clearCart } = useCartStore();

  useEffect(() => {
    if (cartProducts.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [cartProducts.length, router, isProcessing]);

  useEffect(() => {
    if (user && !shippingAddressData.email) {
      updateShippingAddress('email', user.email || '');
      if (user.user_metadata?.name) {
        const parts = (user.user_metadata.name as string).split(' ');
        updateShippingAddress('firstName', parts[0]);
        if (parts.length > 1) updateShippingAddress('lastName', parts.slice(1).join(' '));
      }
    }
  }, [user, shippingAddressData.email, updateShippingAddress]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Por favor inicia sesión para continuar con tu compra.");
      router.push('/login?redirect=/checkout');
      return;
    }
    setShowOtp(true);
  };

  const onOtpSuccess = () => {
    setShowOtp(false);
    setIsProcessing(true);
    setTimeout(() => {
      router.push('/order-success');
      // Esperar un momento antes de vaciar el carrito para no disparar el useEffect
      setTimeout(() => clearCart(), 500);
    }, 2000);
  };

  if (cartProducts.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Volver al carrito
      </Link>
      <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-8">
        <div className={`flex items-center gap-2 ${step === 1 ? 'text-white' : 'text-zinc-500'}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step === 1 ? 'bg-emerald-500 text-black' : 'bg-zinc-800'}`}>1</span><span className="font-semibold">Envío</span></div>
        <div className="h-px w-12 bg-zinc-800" />
        <div className={`flex items-center gap-2 ${step === 2 ? 'text-white' : 'text-zinc-500'}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step === 2 ? 'bg-emerald-500 text-black' : 'bg-zinc-800'}`}>2</span><span className="font-semibold">Pago</span></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          {step === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-8">
              <div className="bg-kb-card border border-zinc-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><MapPin size={24} className="text-emerald-400" /> Dirección de Envío</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1.5"><label className="text-sm font-medium text-zinc-400">Nombre</label><Input value={shippingAddressData.firstName} onChange={e => updateShippingAddress('firstName', e.target.value)} required /></div>
                  <div className="space-y-1.5"><label className="text-sm font-medium text-zinc-400">Apellido</label><Input value={shippingAddressData.lastName} onChange={e => updateShippingAddress('lastName', e.target.value)} required /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1.5"><label className="text-sm font-medium text-zinc-400">Email</label><Input type="email" value={shippingAddressData.email} onChange={e => updateShippingAddress('email', e.target.value)} required disabled={!!user} /></div>
                  <div className="space-y-1.5"><label className="text-sm font-medium text-zinc-400">Teléfono</label><Input type="tel" value={shippingAddressData.phone} onChange={e => updateShippingAddress('phone', e.target.value)} required /></div>
                </div>
                <div className="space-y-1.5 mb-6"><label className="text-sm font-medium text-zinc-400">Dirección</label><Input value={shippingAddressData.addressLine1} onChange={e => updateShippingAddress('addressLine1', e.target.value)} placeholder="Calle y número" required /></div>
                <div className="grid grid-cols-2 gap-4"><div className="space-y-1.5"><label className="text-sm font-medium text-zinc-400">Ciudad</label><Input value={shippingAddressData.city} onChange={e => updateShippingAddress('city', e.target.value)} required /></div><div className="space-y-1.5"><label className="text-sm font-medium text-zinc-400">Código Postal</label><Input value={shippingAddressData.postalCode} onChange={e => updateShippingAddress('postalCode', e.target.value)} required /></div></div>
              </div>
              <div className="bg-kb-card border border-zinc-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><Truck size={24} className="text-emerald-400" /> Método de Envío</h2>
                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map(option => (
                    <label key={option.id} className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${selectedShippingId === option.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'}`}>
                      <input type="radio" name="shipping" value={option.id} checked={selectedShippingId === option.id} onChange={() => setShippingMethod(option.id)} className="mt-1 accent-emerald-500" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1"><span className="font-medium text-white">{option.label}</span><span className="font-semibold text-emerald-400">{option.price === 0 ? 'Gratis' : formatCurrency(option.price)}</span></div>
                        <p className="text-sm text-zinc-400">{option.description}</p>
                        <p className="text-xs text-zinc-500 mt-2">Llega: {option.eta}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <Button type="submit" size="lg" fullWidth className="h-14 text-base">Continuar al Pago <ArrowRight size={18} className="ml-2" /></Button>
            </form>
          ) : (
            <form onSubmit={handleProcessOrder} className="space-y-8">
              <div className="bg-kb-card border border-zinc-800 rounded-2xl p-6 md:p-8">
                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-white flex items-center gap-3"><CreditCard size={24} className="text-emerald-400" /> Pago Seguro</h2><Badge variant="success">Test Mode</Badge></div>
                <div className="rounded-xl bg-zinc-900 p-6 border border-zinc-800 text-center mb-6">
                  <p className="text-zinc-400 mb-4">Esta tienda está en modo de prueba. No se realizarán cargos reales.</p>
                  <Button type="button" onClick={() => {}} disabled className="opacity-50">Tarjeta (Simulada)</Button>
                </div>
                {!user && (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200/80 mb-6">
                    <p className="font-medium text-amber-400 mb-2">Se requiere cuenta para comprar</p>
                    <p>Por seguridad, debes iniciar sesión para procesar el pago y enviar el comprobante.</p>
                    <Link href="/login?redirect=/checkout" className="inline-block mt-3 text-emerald-400 font-medium hover:underline">Iniciar sesión →</Link>
                  </div>
                )}
              </div>
              <div className="flex gap-4"><Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} className="h-14 px-8">Atrás</Button><Button type="submit" size="lg" className="flex-1 h-14 text-base" disabled={isProcessing}>{isProcessing ? <Loader2 className="animate-spin" size={20} /> : `Pagar ${formatCurrency(total)}`}</Button></div>
            </form>
          )}
        </div>
        <div className="lg:col-span-5">
          <div className="bg-kb-card border border-zinc-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><ShoppingBag size={20} className="text-emerald-400" /> Resumen de Orden</h2>
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {cartProducts.map(({ item, product, variantLabel, lineTotal }) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                  <div className={`h-16 w-16 rounded-lg bg-gradient-to-br ${product.accent} flex items-center justify-center shrink-0 border border-zinc-800 text-xl`}>
                    {product.category === 'interactive-hardware' && '⚡'}{product.category === 'sensors' && '📡'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{product.name}</h4>
                    <p className="text-xs text-zinc-500">{variantLabel} x {item.quantity}</p>
                    <p className="text-sm font-semibold text-white mt-1">{formatCurrency(lineTotal)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-6 border-t border-zinc-800 mb-6 text-sm">
              <div className="flex justify-between"><span className="text-zinc-400">Subtotal ({itemCount} items)</span><span className="font-medium text-white">{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Envío</span><span className="font-medium text-white">{shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost)}</span></div>
            </div>
            <div className="pt-4 border-t border-zinc-800 flex items-end justify-between">
              <span className="text-base font-semibold text-white">Total</span><span className="text-2xl font-bold text-emerald-400">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
      <OtpVerificationModal open={showOtp} phone={shippingAddressData.phone} onSuccess={onOtpSuccess} onClose={() => setShowOtp(false)} />
    </div>
  );
}
