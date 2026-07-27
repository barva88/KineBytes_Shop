export default function WarrantyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 prose prose-invert prose-emerald">
      <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Garantía de Hardware</h1>
      
      <div className="space-y-8 text-zinc-300">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Cobertura de la Garantía</h2>
          <p>Todos los componentes de hardware interactivo y sensores de KineBytes incluyen una <strong>garantía oficial de 1 año (12 meses)</strong> desde la fecha de compra, que cubre exclusivamente defectos de fabricación o fallas en componentes electrónicos bajo un uso normal.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Exclusiones</h2>
          <p>La garantía no cubre los siguientes escenarios:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
            <li>Daños físicos por impacto excesivo, caídas severas o uso abusivo.</li>
            <li>Daños por inmersión en agua (los equipos son resistentes al agua IP65, no sumergibles).</li>
            <li>Desgaste normal de las baterías de polímero de litio.</li>
            <li>Equipos que hayan sido abiertos o modificados por personal no autorizado.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Proceso RMA</h2>
          <p>Si su equipo presenta un fallo dentro del periodo de garantía, contacte a <strong>support@kinebytes.com</strong> con su número de orden y una descripción del problema. De ser aprobado, le proporcionaremos una etiqueta de envío para reparar o reemplazar su unidad sin costo adicional.</p>
        </section>
      </div>
    </div>
  );
}
