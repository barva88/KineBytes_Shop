export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 prose prose-invert prose-emerald">
      <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Términos de Servicio</h1>
      <p className="text-zinc-400 mb-8">Última actualización: Agosto 2026</p>
      
      <div className="space-y-8 text-zinc-300">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
          <p>Al acceder y utilizar KineBytes Shop, usted acepta estar sujeto a estos Términos de Servicio y a todas las leyes y regulaciones aplicables.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Uso de Productos</h2>
          <p>Los productos y software de KineBytes están diseñados para el análisis de rendimiento deportivo. Usted acepta utilizarlos de acuerdo con los manuales de seguridad provistos. KineBytes no se hace responsable por lesiones físicas derivadas del mal uso del equipo.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Licencias de Software</h2>
          <p>Las licencias de software SaaS (Pro, Enterprise) se facturan de forma recurrente. Usted es responsable de mantener actualizada la información de pago. La cancelación del servicio resultará en la pérdida de acceso a funcionalidades premium, aunque el hardware continuará funcionando en modo básico.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Propiedad Intelectual</h2>
          <p>Todo el contenido, diseños de hardware, firmware y código fuente asociado son propiedad exclusiva de KineBytes. Está prohibida la ingeniería inversa del hardware interactivo o los sensores.</p>
        </section>
      </div>
    </div>
  );
}
