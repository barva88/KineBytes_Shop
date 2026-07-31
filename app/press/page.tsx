import Link from 'next/link';
import { Newspaper, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Sala de Prensa — KineBytes Shop' };

const PRESS_RELEASES = [
  { date: 'Julio 2024', title: 'KineBytes lanza su nueva gama de sensores musculares de quinta generación', tag: 'Lanzamiento' },
  { date: 'Mayo 2024', title: 'KineBytes cierra ronda Serie A de $8M USD para expansión en Latinoamérica', tag: 'Inversión' },
  { date: 'Marzo 2024', title: 'Acuerdo con la Federación Mexicana de Atletismo para equipar a la selección nacional', tag: 'Partnerships' },
];

export default function PressPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 text-xs font-semibold text-zinc-400 mb-6"><Newspaper size={14} /> Sala de Prensa</div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Press & Media</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">Recursos para periodistas, investigadores y medios de comunicación. Descarga nuestro press kit o contacta a nuestro equipo de prensa.</p>
      </div>

      {/* Press Kit */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16 p-6 bg-kb-card border border-zinc-800 rounded-2xl">
        <div className="flex-1">
          <h2 className="font-bold text-white mb-1">Press Kit Oficial</h2>
          <p className="text-sm text-zinc-400">Logos, imágenes de productos, biografías del equipo y brand guidelines.</p>
        </div>
        <Button className="gap-2 shrink-0"><Download size={16} /> Descargar Press Kit</Button>
      </div>

      {/* Press Releases */}
      <h2 className="text-xl font-bold text-white mb-6">Comunicados de Prensa</h2>
      <div className="space-y-4 mb-12">
        {PRESS_RELEASES.map(pr => (
          <div key={pr.title} className="flex items-center gap-4 p-6 bg-kb-card border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all group cursor-pointer">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-zinc-500">{pr.date}</span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">{pr.tag}</span>
              </div>
              <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{pr.title}</h3>
            </div>
            <ArrowRight size={16} className="text-zinc-600 group-hover:text-emerald-400 transition-colors shrink-0" />
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl text-center">
        <h3 className="font-bold text-white mb-2">Contacto de Prensa</h3>
        <p className="text-sm text-zinc-400 mb-4">Para entrevistas, consultas o información adicional:</p>
        <a href="mailto:press@kinebytes.com" className="text-emerald-400 hover:underline font-medium">press@kinebytes.com</a>
      </div>
    </div>
  );
}
