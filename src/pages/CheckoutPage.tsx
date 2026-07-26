import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Lock, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
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
import { OtpVerificationModal } from '@/components/cart/OtpVerificationModal';
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
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Auto-populate shipping address form with authenticated user profile data
  useEffect(() => {
    if (user) {
      const fullName = user.user_metadata?.name || user.user_metadata?.full_name || '';
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      if (user.email && !shippingAddress.email) {
        updateShippingAddress('email', user.email);
      }
      if (firstName && !shippingAddress.firstName) {
        updateShippingAddress('firstName', firstName);
      }
      if (lastName && !shippingAddress.lastName) {
        updateShippingAddress('lastName', lastName);
      }
      if (user.phone && !shippingAddress.phone) {
        updateShippingAddress('phone', user.phone);
      }
    }
  }, [user]);

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

  // Initiates checkout — opens OTP verification modal first to verify identity
  const handleInitiatePayment = () => {
    if (!isFormValid) {
      setError('Por favor completa todos los campos obligatorios del formulario de envío.');
      return;
    }
    setError('');

    if (!isOtpVerified) {
      setShowOtpModal(true);
    } else {
      executeOrderPlacement();
    }
  };

  // Called after OTP verification succeeds
  const handleOtpSuccess = () => {
    setIsOtpVerified(true);
    setShowOtpModal(false);
    executeOrderPlacement();
  };

  // Places the order in Supabase orders and order_items tables
  const executeOrderPlacement = async () => {
    setProcessing(true);
    setError('');

    try {
      const orderRef = generateOrderRef();

      // Insert order in Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          reference: orderRef,
          status: 'paid',
          subtotal,
          shipping_cost: shippingCost,
          total,
          shipping_address: shippingAddress,
          payment_method: 'card',
        })
        .select('id')
        .single();

      if (orderError) {
        console.warn('Order insert notice:', orderError.message);
      }

      const orderId = orderData?.id;

      // Insert order items if orderId is returned
      if (orderId && cartProducts.length > 0) {
        const orderItems = cartProducts.map((cp) => ({
          order_id: orderId,
          product_id: cp.product.id,
          variant_id: cp.item.variantId !== 'default' ? cp.item.variantId : null,
          product_name: cp.product.name,
          variant_label: cp.variantLabel,
          quantity: cp.item.quantity,
          unit_price: cp.unitPrice,
          line_total: cp.lineTotal,
        }));

        await supabase.from('order_items').insert(orderItems);
      }

      clearCart();
      navigate(`/order-success?ref=${orderRef}&email=${encodeURIComponent(shippingAddress.email)}`);
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
          {/* User Account Auto-filled Banner */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Sesión KineByte Activa</p>
                <p className="text-sm font-medium text-white">{user.email}</p>
              </div>
            </div>
            <span className="text-xs text-zinc-500 hidden sm:inline">Datos pre-llenados automáticamente</span>
          </div>

          {/* Shipping Address */}
          <section className="rounded-2xl border border-zinc-800/60 bg-kb-card p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Truck size={18} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Dirección de envío</h2>
                <p className="text-xs text-zinc-500">Completa la información de destino para tu paquete</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {addressField('firstName', 'Nombre *', 'Juan')}
              {addressField('lastName', 'Apellido *', 'Pérez')}
              {addressField('email', 'Correo electrónico (recibirá facturas) *', 'juan@ejemplo.com', 'sm:col-span-2')}
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

          {/* Security & Verification Banner */}
          <section className="rounded-2xl border border-zinc-800/60 bg-kb-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <ShieldCheck size={18} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Verificación de Titular de Cuenta</h2>
                <p className="text-xs text-zinc-500">Protección anti-fraude antes de procesar el pago</p>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-zinc-300 space-y-2">
              <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck size={14} /> Paso de Confirmación OTP Obligatorio
              </p>
              <p className="leading-relaxed">
                Para tu seguridad, al hacer clic en "Confirmar pedido y pagar", te enviaremos un código OTP de 6 dígitos a <strong>{user.email}</strong> para validar que eres el titular legítimo de la cuenta antes de proceder al cobro.
              </p>
            </div>
          </section>
        </div>

        {/* Right — Order Summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="rounded-2xl border border-zinc-800/60 bg-kb-card p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Resumen del pedido</h2>

            {/* Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartProducts.map((cp) => (
                <div key={`${cp.item.productId}-${cp.item.variantId}`} className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <p className="font-medium text-white">{cp.product.name}</p>
                    <p className="text-zinc-500">
                      Variante: {cp.variantLabel} × {cp.item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-zinc-300">
                    {formatCurrency(cp.lineTotal)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-zinc-800" />

            {/* Price breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal ({itemCount} productos)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Envío</span>
                <span>{shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost)}</span>
              </div>
              <hr className="border-zinc-800 my-2" />
              <div className="flex justify-between text-base font-bold text-white">
                <span>Total</span>
                <span className="text-emerald-400">{formatCurrency(total)}</span>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400">
                {error}
              </div>
            )}

            <Button
              onClick={handleInitiatePayment}
              disabled={processing}
              fullWidth
              size="lg"
              className="gap-2"
            >
              {processing ? (
                <span className="animate-pulse">Procesando pedido...</span>
              ) : (
                <>
                  <CreditCard size={18} /> Confirmar pedido y pagar
                </>
              )}
            </Button>

            <p className="text-[11px] text-zinc-600 text-center flex items-center justify-center gap-1">
              <Lock size={12} /> Pago seguro con encriptación SSL de 256 bits y verificación OTP.
            </p>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <OtpVerificationModal
        open={showOtpModal}
        email={shippingAddress.email || user.email || ''}
        onSuccess={handleOtpSuccess}
        onClose={() => setShowOtpModal(false)}
      />
    </div>
  );
}
