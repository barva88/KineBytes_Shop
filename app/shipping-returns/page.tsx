export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 prose prose-invert prose-emerald">
      <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Envíos y Devoluciones</h1>
      
      <div className="space-y-8 text-zinc-300">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Política de Envíos</h2>
          <p>Realizamos envíos a nivel global utilizando logística prioritaria asegurada. Los tiempos estimados de procesamiento son de 24 a 48 horas hábiles para equipos en stock.</p>
          <p className="mt-4">
            <strong>Costos de envío:</strong> Ofrecemos envío gratuito en pedidos superiores a $200 USD. Para pedidos menores, el costo se calculará en la pantalla de pago basado en su ubicación.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Impuestos y Aduanas</h2>
          <p>Para envíos internacionales, el comprador es responsable de cualquier arancel de importación o impuesto local aplicable en su país de destino.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Devoluciones (30 Días)</h2>
          <p>Si no está completamente satisfecho con su hardware KineBytes, aceptamos devoluciones dentro de los 30 días posteriores a la recepción del pedido.</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
            <li>El equipo debe estar en condiciones impecables y en su empaque original.</li>
            <li>Se deducirá un cargo del 10% por concepto de reposición de inventario en dispositivos desprecintados.</li>
            <li>El costo del envío de retorno corre a cargo del cliente, salvo que el equipo presente defectos de fábrica.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
