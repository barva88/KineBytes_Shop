import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-kb-black to-cyan-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.12),transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl space-y-8">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold tracking-wider">
            <Zap size={14} fill="currentColor" />
            NUEVO — PLATAFORMA V2 DISPONIBLE
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Hardware atlético
            <br />
            <span className="gradient-text">inteligente</span> para
            <br />
            alto rendimiento
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
            Conos interactivos, sensores de velocidad y software de análisis diseñados para transformar
            el entrenamiento deportivo. Todo conectado al ecosistema KineByte.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/products">
              <Button size="lg" className="gap-2">
                Explorar productos <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/products?category=training-packs">
              <Button variant="outline" size="lg">
                Ver Training Packs
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-8 pt-4">
            {[
              { value: '2ms', label: 'Latencia' },
              { value: '10h', label: 'Autonomía' },
              { value: 'IP65', label: 'Resistencia' },
              { value: 'OTA', label: 'Firmware' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
