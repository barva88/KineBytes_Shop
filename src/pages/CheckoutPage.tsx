import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Lock, CheckCircle2 } from 'lucide-react';
import {
  useCartStore,
  useCartProducts,
  useCartSubtotal,
  useCartShippingCost,
  useCartTotal,
  useCartItemCount,
} from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { SHIPPING_OPTIONS } from '@/lib/constants';
import { formatCurrency, cn, generateOrderRef } from '@/lib/utils';
import { Button, Input } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import type { ShippingAddress } from '@/types/store';

export function CheckoutPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const cartProducts = useCartProducts();
  const subtotal = useCartSubtotal();
  const shippingAddress = useCartStore((s) => s.shippingAddressData);
  const selectedShippingId = useCartStore((s) => s.selectedShippingId);
  const shippingCost = useCartShippingCost();
  const total = useCartTotal();
  const updateShippingAddress = useCartStore((s) => s.updateShippingAddress);
  const setShippingMethod = useCartStore((s) => s.setShippingMethod);
  const clearCart = useCartStore((s) => s.clearCart);
  const itemCount = useCartItemCount();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Lock size={48} className="text-zinc-600 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-3">Inicia sesión para continuar</h1>
        <p className="text-zinc-500 mb-8 max-w-md mx-auto">
          Necesitas una cuenta para completar tu compra. Tu cuenta es la misma del ecosistema KineByte.
        </p>
        <Link to="/login">
          <Button className="gap-2">Iniciar sesión</Button>
        </Link>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-3">No hay productos en tu carrito</h1>
        <Link to="/products">
          <Button variant="outline" className="gap-2 mt-4">
            <ArrowLeft size={16} /> Explorar productos
          </Button>
        </Link>
      </div>
    );
  }

  const isFormValid =
    shippingAddress.firstName &&
    shippingAddress.lastName &&
    shippingAddress.email &&
    shippingAddress.addressLine1 &&
    shippingAddress.city &&
    shippingAddress.country &&
    shippingAddress.postalCode;

  const handlePlaceOrder = async () => {
    if (!isFormValid) {
      setError('Por favor completa todos los campos obligatorios del formulario de envío.');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const orderRef = generateOrderRef();

      // Create order in Supabase
      const { error: orderError } = await supabase.from('orders').insert({
        user_id: user.id,
        reference: orderRef,
        status: 'pending',
        subtotal,
        shipping_cost: shippingCost,
        total,
        shipping_address: shippingAddress,
        stripe_payment_intent_id: null, // Will be set by Stripe webhook
      });

      if (orderError) {
        // If table doesn't exist yet, still allow demo flow
        console.warn('Order insert warning:', orderError.message);
      }

      // In production: call Supabase Edge Function to create Stripe PaymentIntent
      // const { data } = await supabase.functions.invoke('create-checkout-session', {
      //   body: { items: cartProducts, shippingAddress, shippingId: selectedShippingId }
      // });
      // Then redirect to Stripe Checkout or confirm via Elements

      clearCart();
      navigate(`/order-success?ref=${orderRef}`);
    } catch {
      setError('Error al procesar el pedido. Intenta nuevamente.');
    } finally {
      setProcessing(false);
    }
  };

  const addressField = (field: keyof ShippingAddress, label: string, placeholder: string, colSpan?: string) => (
    <div className={colSpan}>
      <Input
        label={label}
        placeholder={placeholder}
        value={shippingAddress[field]}
        onChange={(e) => updateShippingAddress(field, e.target.value)}
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/cart">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft size={16} /> Carrito
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        {/* Left — Forms */}
        <div className="space-y-8">
          {/* Shipping Address */}
          <section className="rounded-2xl border border-zinc-800/60 bg-kb-card p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Truck size={18} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Dirección de envío</h2>
                <p className="text-xs text-zinc-500">¿A dónde enviamos tu pedido?</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {addressField('firstName', 'Nombre *', 'Juan')}
              {addressField('lastName', 'Apellido *', 'Pérez')}
              {addressField('email', 'Correo electrónico *', 'juan@ejemplo.com', 'sm:col-span-2')}
              {addressField('phone', 'Teléfono', '+1 (555) 123-4567')}
              {addressField('country', 'País *', 'Estados Unidos')}
              {addressField('addressLine1', 'Dirección *', '123 Calle Principal', 'sm:col-span-2')}
              {addressField('addressLine2', 'Apt, Suite (opcional)', 'Apt 4B', 'sm:col-span-2')}
              {addressField('city', 'Ciudad *', 'Austin')}
              {addressField('postalCode', 'Código postal *', '78701')}
            </div>
          </section>

          {/* Shipping Method */}
          <section className="rounded-2xl border border-zinc-800/60 bg-kb-card p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Truck size={18} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Método de envío</h2>
                <p className="text-xs text-zinc-500">Selecciona cómo quieres recibir tu pedido</p>
              </div>
            </div>

            <div className="space-y-3">
              {SHIPPING_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setShippingMethod(option.id)}
                  className={cn(
                    'w-full text-left rounded-xl border p-4 transition-all duration-200',
                    selectedShippingId === option.id
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-600'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{option.label}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{option.description} — {option.eta}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-white">
                        {option.price === 0 ? 'Gratis' : formatCurrency(option.price)}
                      </span>
                      <div className={cn(
                        'h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors',
                        selectedShippingId === option.id
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-zinc-700'
                      )}>
                        {selectedShippingId === option.id && (
                          <CheckCircle2 size={12} className="text-black" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Payment - Stripe placeholder */}
          <section className="rounded-2xl border border-zinc-800/60 bg-kb-card p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CreditCard size={18} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Método de pago</h2>
                <p className="text-xs text-zinc-500">Pago seguro vía Stripe</p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 text-center space-y-3">
              <Lock size={24} className="text-zinc-500 mx-auto" />
              <p className="text-sm text-zinc-400">
                El pago se procesará de forma segura con Stripe al confirmar el pedido.
              </p>
              <p className="text-xs text-zinc-600">
                En producción, aquí se renderizarán los Stripe Elements para captura de tarjeta.
                El webhook de Stripe registrará la compra en Supabase automáticamente.
              </p>
            </div>
          </section>
        </div>

        {/* Right — Order Summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="rounded-2xl border border-zinc-800/60 bg-kb-card p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Resumen del pedido</h2>

            {/* Items */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cartProducts.map(({ item, product, variantLabel, lineTotal }) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 text-sm">
                      {product.category === 'interactive-hardware' && '⚡'}
                      {product.category === 'sensors' && '📡'}
                      {product.category === 'training-packs' && '🎯'}
                      {product.category === 'software' && '💻'}
                      {product.category === 'accessories' && '🔧'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-zinc-200 truncate">{product.name}</p>
                      <p className="text-xs text-zinc-600">{variantLabel} × {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-zinc-200 font-medium ml-3 shrink-0">{formatCurrency(lineTotal)}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-zinc-800" />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal ({itemCount} artículos)</span>
                <span className="text-zinc-200">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Envío</span>
                <span className="text-zinc-200">
                  {shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost)}
                </span>
              </div>
              <div className="h-px bg-zinc-800" />
              <div className="flex justify-between text-xl font-bold text-white pt-2">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              fullWidth
              size="lg"
              onClick={handlePlaceOrder}
              disabled={processing || !isFormValid}
              className="gap-2"
            >
              {processing ? (
                <span className="animate-pulse">Procesando...</span>
              ) : (
                <>
                  <Lock size={16} /> Confirmar pedido — {formatCurrency(total)}
                </>
              )}
            </Button>

            <p className="text-xs text-zinc-600 text-center">
              Al confirmar, aceptas los términos y condiciones de KineByte
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
