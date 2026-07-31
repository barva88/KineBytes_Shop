import Link from 'next/link';
import { ArrowLeft, Building2, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { notFound } from 'next/navigation';

const BRANDS: Record<string, { name: string; tagline: string; description: string; logo: string; founded: string; country: string; website: string }> = {
  kinebytes: {
    name: 'KineBytes',
    tagline: 'Hardware Atlético Inteligente',
    description: 'KineBytes es una empresa tecnológica especializada en hardware deportivo de alto rendimiento. Fundada por atletas e ingenieros, diseñamos dispositivos que convierten datos biométricos en ventajas competitivas reales.',
    logo: 'KB',
    founded: '2020',
    country: 'México',
    website: 'https://kinebytes.com',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = BRANDS[slug];
  if (!brand) return { title: 'Marca no encontrada' };
  return { title: `${brand.name} — KineBytes Shop`, description: brand.tagline };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = BRANDS[slug];
  if (!brand) return notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Volver
      </Link>
      <div className="flex flex-col md:flex-row gap-8 mb-16 p-8 bg-kb-card border border-zinc-800 rounded-3xl">
        <div className="h-24 w-24 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-2xl shrink-0">
          {brand.logo}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-1">{brand.name}</h1>
          <p className="text-emerald-400 font-medium mb-4">{brand.tagline}</p>
          <p className="text-zinc-400 leading-relaxed mb-6">{brand.description}</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div><span className="text-zinc-500">Fundada:</span> <span className="text-white font-medium">{brand.founded}</span></div>
            <div><span className="text-zinc-500">País:</span> <span className="text-white font-medium">{brand.country}</span></div>
            <div><a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Visitar sitio web →</a></div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Productos de {brand.name}</h2>
        <Link href="/products"><Button variant="outline" className="gap-2">Ver todos <ArrowRight size={16} /></Button></Link>
      </div>
      <div className="text-center py-16 text-zinc-500 border border-zinc-800 rounded-2xl bg-kb-card">
        Los productos se cargan desde la base de datos.
      </div>
    </div>
  );
}
