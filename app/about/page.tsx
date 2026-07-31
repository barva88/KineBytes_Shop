import Link from 'next/link';
import { Users, Zap, Target, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Sobre Nosotros — KineBytes Shop', description: 'Conoce la historia y misión de KineBytes, hardware atlético inteligente.' };

const STATS = [
  { value: '2020', label: 'Año de fundación' },
  { value: '50K+', label: 'Atletas activos' },
  { value: '15+', label: 'Países con presencia' },
  { value: '98%', label: 'Satisfacción de clientes' },
];

const TEAM = [
  { name: 'Dr. Alejandro Reyes', role: 'CEO & Co-Fundador', bio: 'PhD en Ingeniería Biomédica. Atleta de élite con 10+ años en tecnología deportiva.' },
  { name: 'Ing. Sofía Martínez', role: 'CTO', bio: 'Ex-Google Engineer. Especialista en IoT y sistemas de telemetría de alto rendimiento.' },
  { name: 'Dr. Carlos Vega', role: 'Chief Science Officer', bio: 'Fisiólogo del ejercicio con publicaciones en Nature Sports. Asesor de equipos olímpicos.' },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6">
          <Users size={14} /> Sobre Nosotros
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Hardware que entiende<br />al <span className="gradient-text">atleta</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Somos un equipo de ingenieros, fisiólogos y atletas unidos por una misión: convertir los datos biométricos en ventajas competitivas reales.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center p-6 bg-kb-card border border-zinc-800 rounded-2xl">
            <p className="text-3xl font-extrabold text-emerald-400 mb-1">{value}</p>
            <p className="text-sm text-zinc-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { icon: Zap, title: 'Innovación', desc: 'Desarrollamos hardware con 3–5 años de ventaja tecnológica sobre el mercado convencional.' },
          { icon: Target, title: 'Precisión', desc: 'Nuestros sensores operan con márgenes de error menores al 0.5% en condiciones de campo.' },
          { icon: Globe, title: 'Accesibilidad', desc: 'Tecnología de élite a precios que democratizan el alto rendimiento para más atletas.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-8 bg-kb-card border border-zinc-800 rounded-3xl">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4"><Icon size={24} /></div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Equipo Fundador</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map(member => (
            <div key={member.name} className="p-6 bg-kb-card border border-zinc-800 rounded-2xl text-center">
              <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <h3 className="font-bold text-white">{member.name}</h3>
              <p className="text-xs text-emerald-400 font-medium mb-2">{member.role}</p>
              <p className="text-xs text-zinc-500 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-12 bg-kb-card border border-zinc-800 rounded-3xl">
        <h2 className="text-2xl font-bold text-white mb-4">¿Quieres ser parte?</h2>
        <p className="text-zinc-400 mb-6">Estamos buscando talento apasionado por la tecnología deportiva.</p>
        <Link href="/careers"><Button size="lg" className="gap-2">Ver posiciones abiertas <ArrowRight size={16} /></Button></Link>
      </div>
    </div>
  );
}
