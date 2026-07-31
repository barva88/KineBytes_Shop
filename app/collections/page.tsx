import Link from 'next/link';
import { Grid3X3, Zap, Cpu, Wifi, Package, Wrench, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui';

const COLLECTIONS = [
  { slug: 'interactive-hardware', name: 'Hardware Interactivo', icon: Zap, description: 'Dispositivos inteligentes para monitoreo en tiempo real durante el entrenamiento.', accent: 'from-emerald-500/20 via-emerald-500/5 to-transparent', count: '12 productos' },
  { slug: 'sensors', name: 'Sensores', icon: Wifi, description: 'Sensores de alta precisión para biometría y análisis de rendimiento atlético.', accent: 'from-cyan-500/20 via-cyan-500/5 to-transparent', count: '8 productos' },
  { slug: 'training-packs', name: 'Training Packs', icon: Package, description: 'Kits completos de hardware para equipos deportivos y atletas de élite.', accent: 'from-orange-500/20 via-orange-500/5 to-transparent', count: '5 packs' },
  { slug: 'software', name: 'Software', icon: Cpu, description: 'Licencias y plataformas de análisis de datos para máximo rendimiento.', accent: 'from-purple-500/20 via-purple-500/5 to-transparent', count: '6 licencias' },
  { slug: 'accessories', name: 'Accesorios', icon: Wrench, description: 'Componentes complementarios y piezas de repuesto para tu hardware KineBytes.', accent: 'from-zinc-500/20 via-zinc-500/5 to-transparent', count: '15 accesorios' },
];

const SPECIAL_COLLECTIONS = [
  { href: '/collections/new', label: 'Novedades', badge: 'Nuevo', icon: '✨' },
  { href: '/collections/bestsellers', label: 'Más Vendidos', badge: 'Top', icon: '🏆' },
  { href: '/collections/offers', label: 'Ofertas', badge: '% OFF', icon: '🔥' },
];

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6">
          <Grid3X3 size={14} /> Colecciones
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Explora Nuestro Catálogo
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Hardware atlético de alto rendimiento, organizado por categoría para que encuentres exactamente lo que necesitas.
        </p>
      </div>

      {/* Special Collections */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {SPECIAL_COLLECTIONS.map((col) => (
          <Link key={col.href} href={col.href} className="group flex items-center justify-between p-5 bg-kb-card border border-zinc-800 rounded-2xl hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{col.icon}</span>
              <span className="font-semibold text-white">{col.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">{col.badge}</span>
              <ArrowRight size={16} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COLLECTIONS.map(({ slug, name, icon: Icon, description, accent, count }) => (
          <Link key={slug} href={`/collections/${slug}`} className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-kb-card p-8 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Icon size={28} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{name}</h2>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">{count}</span>
                <span className="flex items-center gap-1 text-sm font-semibold text-emerald-400 group-hover:gap-2 transition-all">
                  Ver todo <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
