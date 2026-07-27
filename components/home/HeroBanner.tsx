import Link from 'next/link';
import { ArrowRight, Activity, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-kb-black py-20 lg:py-32 border-b border-zinc-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
            KineBytes Shop Oficial
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 animate-slide-in-right" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            Hardware Atlético <br />
            <span className="gradient-text">Inteligente.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl text-balance animate-slide-in-right" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            Equipamiento profesional para academias, clubes y atletas. 
            Mide, analiza y mejora el rendimiento con precisión milimétrica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-right" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <Link href="/products" className="flex-1 sm:flex-none">
              <Button size="lg" className="w-full gap-2 text-base h-14">
                Explorar Catálogo <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/products?category=interactive-hardware" className="flex-1 sm:flex-none">
              <Button variant="outline" size="lg" className="w-full h-14 text-base">
                Ver Hardware Interactivo
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-in-right" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400"><Zap size={20} /></div><div className="text-sm font-medium text-zinc-300">Latencia ultra-baja<br/><span className="text-zinc-500 text-xs">Telemetría instantánea</span></div></div>
            <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400"><Activity size={20} /></div><div className="text-sm font-medium text-zinc-300">Precisión profesional<br/><span className="text-zinc-500 text-xs">Sensores de grado atlético</span></div></div>
            <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400"><Shield size={20} /></div><div className="text-sm font-medium text-zinc-300">Diseñado para el campo<br/><span className="text-zinc-500 text-xs">Resistente y portátil</span></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
