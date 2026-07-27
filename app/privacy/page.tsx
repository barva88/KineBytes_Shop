export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 prose prose-invert prose-emerald">
      <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Política de Privacidad</h1>
      <p className="text-zinc-400 mb-8">Última actualización: Agosto 2026</p>
      
      <div className="space-y-8 text-zinc-300">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Recopilación de Datos</h2>
          <p>En KineBytes Shop recopilamos información necesaria para procesar sus pedidos: nombre, dirección de envío, correo electrónico y teléfono. Los datos de pago son procesados por pasarelas seguras de terceros y nunca se almacenan en nuestros servidores.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Datos de Entrenamiento (Hardware)</h2>
          <p>Si utiliza nuestro hardware junto con nuestras plataformas SaaS, los datos biométricos y de rendimiento recopilados están cifrados. Solo los usuarios con permisos administrativos en su organización pueden acceder a esta información.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Uso de la Información</h2>
          <p>Utilizamos sus datos comerciales para:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
            <li>Procesar y enviar pedidos de hardware.</li>
            <li>Proporcionar soporte técnico y gestión de garantías.</li>
            <li>Mejorar nuestros productos basados en la telemetría agregada y anonimizada.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
