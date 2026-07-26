import { Card, Badge } from '@/components/ui';

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <Badge variant="outline">Legal</Badge>
        <h1 className="text-3xl font-extrabold text-white">Política de Privacidad</h1>
        <p className="text-xs text-zinc-500">Última actualización: 26 de Julio, 2026</p>
      </div>

      <Card className="p-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Recopilación de Información</h2>
          <p>
            Recopilamos información personal como nombre, correo electrónico, número de teléfono y dirección de envío al momento de crear una cuenta o realizar un pedido.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Uso de la Información y Supabase</h2>
          <p>
            Los datos de autenticación se almacenan de forma encriptada en nuestra instancia de Supabase. Tu información permite habilitar accesos a software, sincronizar pedidos y personalizar la experiencia en la tienda y el dashboard de KineByte.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Procesamiento de Pagos con Stripe</h2>
          <p>
            Los datos financieros son procesados directamente por Stripe según los estándares PCI-DSS Nivel 1. KineByte no almacena ni procesa directamente números de tarjeta de crédito.
          </p>
        </section>
      </Card>
    </div>
  );
}
