import { Card, Badge } from '@/components/ui';

export function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <Badge variant="outline">Legal</Badge>
        <h1 className="text-3xl font-extrabold text-white">Términos y Condiciones de Uso</h1>
        <p className="text-xs text-zinc-500">Última actualización: 26 de Julio, 2026</p>
      </div>

      <Card className="p-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Introducción y Aceptación</h2>
          <p>
            Bienvenido a KineBytes Shop. Al acceder o realizar compras en esta plataforma, aceptas estar sujeto a los presentes Términos y Condiciones de Uso, así como a las políticas de privacidad vinculadas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Ecosistema Unificado KineByte</h2>
          <p>
            La tienda opera dentro del ecosistema KineByte. Las cuentas de usuario son gestionadas de forma centralizada mediante Supabase Authentication. La creación de una cuenta en la tienda otorga credenciales válidas en todas las aplicaciones del ecosistema.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Precios y Procesamiento de Pagos</h2>
          <p>
            Todos los precios listados están expresados en dólares americanos (USD). Los pagos son procesados de forma segura mediante la pasarela encriptada de Stripe. No almacenamos datos completos de tarjetas de crédito en nuestros servidores.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Garantía de Hardware</h2>
          <p>
            El hardware interactivo vendido en la tienda incluye 12 meses de garantía limitada de fábrica contra defectos de manufactura y componentes electrónicos.
          </p>
        </section>
      </Card>
    </div>
  );
}
