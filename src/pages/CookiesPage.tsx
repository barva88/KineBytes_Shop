import { Card, Badge } from '@/components/ui';

export function CookiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <Badge variant="outline">Legal</Badge>
        <h1 className="text-3xl font-extrabold text-white">Política de Cookies</h1>
        <p className="text-xs text-zinc-500">Última actualización: 26 de Julio, 2026</p>
      </div>

      <Card className="p-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. ¿Qué son las Cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu navegador para recordar la sesión de usuario, mantener el carrito de compras guardado y mejorar el rendimiento de la aplicación.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Cookies que Utilizaba la Tienda</h2>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li><strong>Esenciales de Sesión (Supabase):</strong> Mantienen el token JWT de autenticación activo.</li>
            <li><strong>Carrito Local (LocalStorage):</strong> Preservan tus artículos seleccionados.</li>
            <li><strong>Seguridad (Turnstile / Twilio):</strong> Verifican que las interacciones sean humanas.</li>
          </ul>
        </section>
      </Card>
    </div>
  );
}
