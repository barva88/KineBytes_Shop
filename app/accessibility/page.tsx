import Link from 'next/link';
import { Accessibility, Eye, Keyboard, Volume2, MonitorSmartphone, CheckCircle2 } from 'lucide-react';

export const metadata = { title: 'Accesibilidad — KineBytes Shop' };

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4 mx-auto"><Accessibility size={32} /></div>
        <h1 className="text-3xl font-bold text-white mb-2">Accesibilidad del Sitio</h1>
        <p className="text-zinc-400">Nuestro compromiso con un e-commerce inclusivo para todos</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {[
          { icon: Eye, title: 'Contraste de Color', desc: 'Usamos paletas de color con ratio de contraste WCAG AA (4.5:1) para garantizar legibilidad para personas con baja visión.' },
          { icon: Keyboard, title: 'Navegación por Teclado', desc: 'Todo el sitio es navegable con teclado. Los elementos interactivos tienen indicadores de foco visibles.' },
          { icon: Volume2, title: 'Compatibilidad con Lectores de Pantalla', desc: 'Usamos atributos ARIA y HTML semántico para compatibilidad con NVDA, VoiceOver y JAWS.' },
          { icon: MonitorSmartphone, title: 'Diseño Responsivo', desc: 'El sitio funciona en todos los tamaños de pantalla, desde móviles hasta monitores ultrawide.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex gap-4 p-6 bg-kb-card border border-zinc-800 rounded-2xl">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0"><Icon size={20} /></div>
            <div><h3 className="font-semibold text-white mb-1">{title}</h3><p className="text-sm text-zinc-400">{desc}</p></div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl mb-6">
        <h2 className="font-bold text-white mb-4">Estado de Conformidad</h2>
        <p className="text-sm text-zinc-400 mb-4">KineBytes Shop busca cumplir con las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1 Nivel AA.</p>
        {['Texto alternativo en imágenes', 'Formularios con etiquetas correctas', 'Videos con subtítulos disponibles', 'Tipografía escalable'].map(item => (
          <div key={item} className="flex items-center gap-2 text-sm text-zinc-300 mb-2">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> {item}
          </div>
        ))}
      </div>
      <p className="text-sm text-zinc-500 text-center">¿Encontraste un problema de accesibilidad? <Link href="/contact" className="text-emerald-400 hover:underline">Repórtalo aquí</Link></p>
    </div>
  );
}
