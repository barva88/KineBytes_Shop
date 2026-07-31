import Link from 'next/link';
import { Scale } from 'lucide-react';

export const metadata = { title: 'Aviso Legal — KineBytes Shop' };

export default function LegalNoticePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 mb-4 mx-auto"><Scale size={28} /></div>
        <h1 className="text-3xl font-bold text-white mb-2">Aviso Legal</h1>
        <p className="text-zinc-500">Última actualización: Julio 2024</p>
      </div>
      <div className="prose-invert space-y-8">
        {[
          { title: 'Titular del Sitio Web', body: 'KineBytes Technologies S.A. de C.V., con domicilio en Ciudad de México, México. RFC: KTE-200101-AB1.' },
          { title: 'Objeto', body: 'El presente aviso legal regula el acceso y uso del sitio web shop.kinebytes.com, titularidad de KineBytes Technologies, cuya actividad principal es la comercialización de hardware deportivo y software de análisis de rendimiento atlético.' },
          { title: 'Propiedad Intelectual', body: 'Todos los contenidos del sitio web, incluyendo pero no limitado a textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de KineBytes Technologies o de terceros, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación sobre los mismos.' },
          { title: 'Uso del Sitio Web', body: 'El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que KineBytes ofrece a través de su sitio web y con carácter enunciativo pero no limitativo, a no emplearlos para incurrir en actividades ilícitas o contrarias a la buena fe.' },
          { title: 'Limitación de Responsabilidad', body: 'KineBytes no se responsabiliza de los daños y perjuicios de toda naturaleza que pudieran derivarse del uso de los servicios e información de la plataforma ni de la información accesible a través de ella.' },
          { title: 'Legislación Aplicable', body: 'La relación entre KineBytes y los usuarios estará sometida a la legislación y jurisdicción mexicanas vigentes.' },
        ].map(({ title, body }) => (
          <div key={title} className="p-6 bg-kb-card border border-zinc-800 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
