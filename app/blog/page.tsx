import Link from 'next/link';
import { BookOpen, ArrowRight, Tag } from 'lucide-react';

export const metadata = { title: 'Blog — KineBytes', description: 'Artículos de rendimiento atlético, tecnología deportiva y ciencias del ejercicio.' };

const ARTICLES = [
  { slug: 'como-los-sensores-mejoran-tu-entrenamiento', title: 'Cómo los sensores de biometría transforman tu entrenamiento', excerpt: 'Exploramos cómo los datos en tiempo real de SpO2, frecuencia cardíaca y EMG pueden redefinir la periodización deportiva.', tag: 'Tecnología', date: '22 Jul 2024', readTime: '5 min' },
  { slug: 'hardware-atletico-vs-wearables-comerciales', title: 'Hardware atlético profesional vs. wearables comerciales: ¿cuál te conviene?', excerpt: 'Comparativa técnica detallada: precisión, latencia, durabilidad y casos de uso para atletas de distintos niveles.', tag: 'Guías', date: '15 Jul 2024', readTime: '8 min' },
  { slug: 'periodizacion-con-datos-kinebytes', title: 'Periodización basada en datos: el enfoque KineBytes', excerpt: 'Cómo usar los datos de tus sensores para ajustar la carga de entrenamiento de forma objetiva y reducir el riesgo de sobreentrenamiento.', tag: 'Ciencia', date: '8 Jul 2024', readTime: '7 min' },
  { slug: 'guia-sensores-para-equipos', title: 'Guía completa: sensores para equipos deportivos colectivos', excerpt: 'Cómo implementar un ecosistema de sensores KineBytes en tu equipo de fútbol, baloncesto o atletismo.', tag: 'Equipos', date: '1 Jul 2024', readTime: '10 min' },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 text-xs font-semibold text-zinc-400 mb-6"><BookOpen size={14} /> Blog & Noticias</div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Conocimiento para atletas</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">Artículos científicos, guías prácticas y actualizaciones de producto escritos por nuestro equipo de fisiólogos e ingenieros.</p>
      </div>

      {/* Featured */}
      <Link href={`/blog/${ARTICLES[0].slug}`} className="group block mb-8 p-8 bg-kb-card border border-zinc-800 rounded-3xl hover:border-emerald-500/30 transition-all">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">{ARTICLES[0].tag}</span>
          <span className="text-xs text-zinc-500">Destacado</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">{ARTICLES[0].title}</h2>
        <p className="text-zinc-400 mb-4">{ARTICLES[0].excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span>{ARTICLES[0].date}</span>
          <span>·</span>
          <span>{ARTICLES[0].readTime} lectura</span>
        </div>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES.slice(1).map(article => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="group p-6 bg-kb-card border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all">
            <span className="text-xs font-semibold text-zinc-400 border border-zinc-700 rounded-full px-2 py-0.5 mb-3 inline-block">{article.tag}</span>
            <h3 className="font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{article.title}</h3>
            <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>{article.date}</span>
              <span className="flex items-center gap-1 text-emerald-400 group-hover:gap-2 transition-all">Leer <ArrowRight size={12} /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
