import Link from 'next/link';
import { Briefcase, ArrowRight, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Trabaja con Nosotros — KineBytes Shop' };

const JOBS = [
  { title: 'Senior Firmware Engineer', dept: 'Hardware', location: 'Ciudad de México / Remoto', type: 'Tiempo Completo', desc: 'Desarrolla firmware para nuestros dispositivos IoT de alto rendimiento usando C/C++.' },
  { title: 'Data Scientist — Sports Analytics', dept: 'Data', location: 'Remoto', type: 'Tiempo Completo', desc: 'Modela patrones biométricos de atletas usando Python, ML y análisis de series de tiempo.' },
  { title: 'Full Stack Developer', dept: 'Producto', location: 'Híbrido — CDMX', type: 'Tiempo Completo', desc: 'Construye la plataforma web y API que conecta hardware KineBytes con los atletas.' },
  { title: 'Sports Physiologist', dept: 'Ciencias del Deporte', location: 'Ciudad de México', type: 'Tiempo Completo', desc: 'Valida la precisión de nuestros sensores y desarrolla protocolos de calibración.' },
];

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6"><Briefcase size={14} /> Careers</div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Construye el futuro del deporte</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">Únete a un equipo de ingenieros, científicos y atletas que están revolucionando cómo se mide el rendimiento humano.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-center">
        {[['💰', 'Salario competitivo'], ['🏠', 'Trabajo remoto'], ['🏋️', 'Equipamiento deportivo'], ['📚', 'Presupuesto de desarrollo'], ['🏥', 'Seguro médico premium'], ['⚡', 'Stock Options']].map(([emoji, label]) => (
          <div key={label} className="flex items-center gap-3 p-4 bg-kb-card border border-zinc-800 rounded-xl">
            <span className="text-xl">{emoji}</span>
            <span className="text-sm font-medium text-zinc-300">{label}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-6">Posiciones Abiertas</h2>
      <div className="space-y-4">
        {JOBS.map(job => (
          <div key={job.title} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-kb-card border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all group">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">{job.dept}</span>
              </div>
              <h3 className="font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">{job.title}</h3>
              <p className="text-sm text-zinc-400 mb-2">{job.desc}</p>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{job.type}</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5 shrink-0">Aplicar <ArrowRight size={14} /></Button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center p-8 bg-kb-card border border-zinc-800 rounded-2xl">
        <p className="text-zinc-400 mb-4">¿No ves la posición que buscas? Envía tu CV de todas formas.</p>
        <Link href="/contact"><Button variant="outline">Contáctanos</Button></Link>
      </div>
    </div>
  );
}
