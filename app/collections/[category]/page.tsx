import Link from 'next/link';
import { ArrowLeft, Zap, Wifi, Package, Cpu, Wrench, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui';
import { notFound } from 'next/navigation';

const COLLECTION_DATA: Record<string, { name: string; description: string; icon: any; subcategories: { name: string; slug: string; count: number }[] }> = {
  'interactive-hardware': {
    name: 'Hardware Interactivo',
    description: 'Dispositivos inteligentes de última generación para monitoreo y análisis en tiempo real durante tus entrenamientos.',
    icon: Zap,
    subcategories: [
      { name: 'Pulsómetros', slug: 'pulsometros', count: 4 },
      { name: 'Relojes Deportivos', slug: 'relojes', count: 3 },
      { name: 'Bandas de Entrenamiento', slug: 'bandas', count: 5 },
    ],
  },
  'sensors': {
    name: 'Sensores',
    description: 'Alta precisión biométrica para atletas y equipos que buscan ventaja competitiva.',
    icon: Wifi,
    subcategories: [
      { name: 'Sensores de Movimiento', slug: 'movimiento', count: 3 },
      { name: 'Sensores Musculares', slug: 'musculares', count: 2 },
      { name: 'Sensores de Impacto', slug: 'impacto', count: 3 },
    ],
  },
  'training-packs': {
    name: 'Training Packs',
    description: 'Kits todo-en-uno para equipos deportivos de alto rendimiento.',
    icon: Package,
    subcategories: [
      { name: 'Pack Individual', slug: 'individual', count: 2 },
      { name: 'Pack Equipo', slug: 'equipo', count: 2 },
      { name: 'Pack Enterprise', slug: 'enterprise', count: 1 },
    ],
  },
  'software': {
    name: 'Software & Licencias',
    description: 'Plataformas de análisis de datos para sacar el máximo partido a tu hardware.',
    icon: Cpu,
    subcategories: [
      { name: 'Licencias Individuales', slug: 'individual', count: 2 },
      { name: 'Licencias Equipo', slug: 'equipo', count: 3 },
      { name: 'API & Integraciones', slug: 'api', count: 1 },
    ],
  },
  'accessories': {
    name: 'Accesorios',
    description: 'Complementos y piezas de repuesto para mantener tu hardware en óptimas condiciones.',
    icon: Wrench,
    subcategories: [
      { name: 'Correas y Soportes', slug: 'correas', count: 6 },
      { name: 'Cargadores', slug: 'cargadores', count: 4 },
      { name: 'Fundas y Protección', slug: 'fundas', count: 5 },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = COLLECTION_DATA[category];
  if (!data) return { title: 'Colección no encontrada' };
  return { title: `${data.name} — KineBytes Shop`, description: data.description };
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = COLLECTION_DATA[category];
  if (!data) return notFound();
  const Icon = data.icon;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/collections" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Todas las colecciones
      </Link>
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 p-8 bg-kb-card border border-zinc-800 rounded-3xl">
        <div className="h-20 w-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
          <Icon size={40} />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{data.name}</h1>
          <p className="text-zinc-400 leading-relaxed">{data.description}</p>
        </div>
        <Link href={`/products?category=${category}`}>
          <Button className="gap-2 shrink-0">Ver Todos <ArrowRight size={16} /></Button>
        </Link>
      </div>

      <h2 className="text-xl font-bold text-white mb-6">Subcategorías</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {data.subcategories.map((sub) => (
          <Link key={sub.slug} href={`/collections/${category}/${sub.slug}`} className="group flex items-center justify-between p-5 bg-kb-card border border-zinc-800 rounded-2xl hover:border-emerald-500/40 transition-all">
            <div>
              <p className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{sub.name}</p>
              <p className="text-xs text-zinc-500 mt-1">{sub.count} productos</p>
            </div>
            <ArrowRight size={16} className="text-zinc-600 group-hover:text-emerald-400 transition-colors" />
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Todos los productos en {data.name}</h2>
        <Link href={`/products?category=${category}`} className="text-sm text-emerald-400 hover:underline flex items-center gap-1">
          Ver con filtros <Filter size={14} />
        </Link>
      </div>
      <div className="text-center py-16 text-zinc-500">
        <p>Los productos se cargan desde la base de datos.</p>
        <Link href={`/products?category=${category}`} className="mt-4 inline-block">
          <Button>Explorar productos</Button>
        </Link>
      </div>
    </div>
  );
}
