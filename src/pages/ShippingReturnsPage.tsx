import { Truck, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

export function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="info" className="gap-1">
          <Truck size={14} /> Políticas de Despacho
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Envíos y <span className="gradient-text">Devoluciones</span>
        </h1>
        <p className="text-zinc-400 text-base">
          Transparencia total sobre tiempos de entrega, costos de despacho y nuestro proceso sin complicaciones de garantía y devolución de 30 días.
        </p>
      </div>

      {/* Shipping Options */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Truck className="text-emerald-400" /> Opciones de Envío
        </h2>

        <div className="grid gap-5 sm:grid-cols-3">
          <Card className="p-6 space-y-3 border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Standard</span>
              <span className="text-lg font-bold text-white">$12</span>
            </div>
            <h3 className="text-base font-semibold text-white">3 a 5 Días Hábiles</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ideal para pedidos regulares de conos y accesorios. Envío gratuito en compras superiores a $200.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Express</span>
              <span className="text-lg font-bold text-white">$24</span>
            </div>
            <h3 className="text-base font-semibold text-white">24 a 48 Horas</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Prioridad de despacho urgente para equipos con entrenamientos o competiciones próximas.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-amber-400 uppercase tracking-wider">Pickup</span>
              <span className="text-lg font-bold text-white">Gratis</span>
            </div>
            <h3 className="text-base font-semibold text-white">Mismo Día</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Retiro directo en nuestras oficinas o puntos de distribución autorizados previa confirmación.
            </p>
          </Card>
        </div>
      </div>

      {/* Returns Policy */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <RotateCcw className="text-emerald-400" /> Política de Devolución de 30 Días
        </h2>

        <Card className="p-8 space-y-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            En KineBytes respaldamos la calidad de nuestro hardware atlético. Si no estás 100% satisfecho con tu compra o si el producto presenta algún inconveniente técnico, dispones de <strong>30 días naturales</strong> desde la recepción del paquete para iniciar una devolución sin penalizaciones.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            {[
              'Producto en su empaque original o con accesorios completos',
              'Comprobante de compra o número de pedido (#KB-XXXXXX)',
              'Garantía de reembolso completo o cambio por unidad nueva',
              'Etiqueta de envío de retorno proporcionada sin costo en garantías',
            ].map((rule) => (
              <div key={rule} className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
