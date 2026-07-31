import Link from 'next/link';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';

const ARTICLES: Record<string, { title: string; tag: string; date: string; readTime: string; author: string; content: string }> = {
  'como-los-sensores-mejoran-tu-entrenamiento': {
    title: 'Cómo los sensores de biometría transforman tu entrenamiento',
    tag: 'Tecnología',
    date: '22 Jul 2024',
    readTime: '5 min',
    author: 'Dr. Carlos Vega',
    content: `
Los sensores biométricos de última generación están revolucionando la forma en que los atletas entienden su cuerpo durante el esfuerzo. Ya no es necesario esperar al análisis post-entreno para tomar decisiones: los datos llegan en tiempo real a tu muñeca, a tu entrenador y a la nube simultáneamente.

## ¿Qué miden realmente los sensores KineBytes?

Nuestros sensores de quinta generación capturan hasta 20 parámetros fisiológicos simultáneamente. Entre los más relevantes se encuentran la frecuencia cardíaca por foto-pletismografía de alta precisión (error menor al 1%), la saturación de oxígeno (SpO2), la actividad muscular superficial (EMG) y la temperatura corporal periférica.

## El impacto en la periodización

Con datos objetivos en tiempo real, el entrenador puede ajustar la carga de sesión sobre la marcha. Si el atleta muestra signos de fatiga neuromuscular antes de lo esperado, la intervención es inmediata y basada en evidencia, no en percepción.

## Conclusión

La tecnología de sensores no reemplaza al entrenador ni al atleta. Los potencia. Los datos convierten la intuición en certeza y la experiencia en ventaja cuantificable.
    `.trim(),
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: 'Artículo no encontrado' };
  return { title: `${article.title} — KineBytes Blog` };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  // For slugs not in our mock data, render a generic placeholder
  const display = article || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    tag: 'Blog',
    date: 'Julio 2024',
    readTime: '5 min',
    author: 'Equipo KineBytes',
    content: 'Contenido del artículo en desarrollo. Vuelve pronto para leer este artículo completo de nuestro equipo de científicos e ingenieros deportivos.',
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-10 transition-colors"><ArrowLeft size={16} /> Blog</Link>
      <div className="mb-10">
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-4 inline-block">{display.tag}</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">{display.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 pb-8 border-b border-zinc-800">
          <span className="flex items-center gap-1.5"><User size={14} /> {display.author}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {display.readTime} de lectura</span>
          <span>{display.date}</span>
          <button className="ml-auto flex items-center gap-1.5 hover:text-emerald-400 transition-colors"><Share2 size={14} /> Compartir</button>
        </div>
      </div>
      <div className="prose prose-invert prose-zinc max-w-none">
        {display.content.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-white mt-8 mb-4">{paragraph.slice(3)}</h2>;
          return <p key={i} className="text-zinc-400 leading-relaxed mb-5">{paragraph}</p>;
        })}
      </div>
      <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center justify-between">
        <Link href="/blog" className="text-sm text-emerald-400 hover:underline">← Más artículos</Link>
        <Link href="/products" className="text-sm text-emerald-400 hover:underline">Ver hardware →</Link>
      </div>
    </div>
  );
}
