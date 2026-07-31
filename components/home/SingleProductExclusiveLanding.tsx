'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Zap, Activity, Cpu, Wifi, ShieldCheck, Sparkles, ArrowRight, BarChart3, CheckCircle2, Lock, Radio } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { useCartStore } from '@/stores/cart-store';
import type { StoreProduct } from '@/types/store';

export function SingleProductExclusiveLanding({ product }: { product: StoreProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleBuyNow = () => {
    addItem(product, product.variants?.[0]?.id || 'default');
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const imageSrc = product.images?.[0] || '⚡';

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION (SPLIT SCREEN FULLSCREEN) */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-kb-card via-kb-black to-kb-black px-4 sm:px-6 lg:px-8 py-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Product Image / Hardware Showcase */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/15 rounded-full blur-3xl scale-90 animate-pulse pointer-events-none" />
            <div className="relative w-full max-w-lg aspect-square rounded-3xl bg-kb-card border border-emerald-500/30 p-8 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.15)] group transition-all duration-500 hover:border-emerald-500/60">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant="success" className="gap-1">
                  <Sparkles size={12} /> Hardware Exclusivo
                </Badge>
              </div>
              <div className="absolute top-4 right-4 font-mono text-xs text-zinc-500">
                Lote #01 // 2026
              </div>

              {/* Hardware Render */}
              <div className="text-8xl md:text-9xl my-auto transform group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
                {typeof imageSrc === 'string' && imageSrc.length <= 4 ? imageSrc : '⚡'}
              </div>

              <div className="w-full flex items-center justify-between pt-6 border-t border-zinc-800 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5"><Wifi size={14} className="text-emerald-400" /> Bluetooth 5.3 Low Energy</span>
                <span className="flex items-center gap-1.5"><Activity size={14} className="text-emerald-400" /> Sensor Biométrico Pro</span>
              </div>
            </div>
          </div>

          {/* Right: High-Impact Copy & Purchasing CTA */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <Zap size={14} /> Edición Lanzamiento Oficial
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {product.name}
            </h1>
            
            <p className="text-lg text-zinc-300 leading-relaxed font-normal">
              {product.shortDescription || product.description || 'Hardware atlético de precisión quirúrgica para captura de biometría en tiempo real.'}
            </p>

            {/* Price & Features Checklist */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-white">${product.price}</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">USD / IVA Incluido</span>
                {product.compareAtPrice && (
                  <span className="text-sm text-zinc-500 line-through">${product.compareAtPrice}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300">
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Telemetría a 100Hz</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Sincronización Nube KineBytes</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Chasis Impermeable IP68</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Garantía de 2 años incluida</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" onClick={handleBuyNow} className="gap-2 text-base font-bold flex-1 py-4">
                {added ? (
                  <>
                    <CheckCircle2 size={20} /> ¡Añadido al Carrito!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} /> Comprar Ahora (${product.price})
                  </>
                )}
              </Button>
              <Link href={`/products/${product.slug}`}>
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  Ver Detalles <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BLOQUE ECOSISTEMA (HARDWARE CONNECTIVITY & DATA ANALYTICS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="success" className="gap-1">
            <Cpu size={12} /> Integración Total
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            El Ecosistema KineBytes
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            El dispositivo {product.name} se conecta automáticamente con nuestra suite de análisis en la nube para procesar millones de puntos de datos atléticos al instante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Device Capture */}
          <div className="p-8 rounded-3xl bg-kb-card border border-zinc-800 hover:border-emerald-500/40 transition-all space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Radio size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">1. Captura Fisiológica</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Sensores MEMS de grado médico capturan variables biométricas con latencia sub-milisegundo en cualquier entorno de entrenamiento.
            </p>
          </div>

          {/* Card 2: Wireless Sync */}
          <div className="p-8 rounded-3xl bg-kb-card border border-zinc-800 hover:border-emerald-500/40 transition-all space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Wifi size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">2. Transmisión Segura</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Cifrado de extremo a extremo que transmite tus sesiones de entrenamiento sin interferencias directamente a la app KineBytes.
            </p>
          </div>

          {/* Card 3: Cloud Analytics */}
          <div className="p-8 rounded-3xl bg-kb-card border border-zinc-800 hover:border-emerald-500/40 transition-all space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">3. Análisis de Datos con IA</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Dashboards interactivos calculan el índice de fatiga, potencia neuromuscular y recomendaciones de recuperación personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BLOQUE DE ESPECIFICACIONES TÉCNICAS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-kb-card border border-zinc-800 p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Especificaciones Técnicas</h2>
              <p className="text-sm text-zinc-400">Arquitectura de hardware avanzada para atletas exigentes.</p>
            </div>
            <Badge variant="outline" className="w-fit">Ficha Oficial</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, label: 'Procesador Dual-Core 32-bit', val: 'Cortex-M4 Ultra Low Power' },
              { icon: Wifi, label: 'Conectividad', val: 'BLE 5.3 + WiFi 2.4GHz' },
              { icon: Zap, label: 'Batería de Litio', val: 'Hasta 48 hrs seguidas' },
              { icon: ShieldCheck, label: 'Certificación de Chasis', val: 'IP68 Sumergible a 50m' },
            ].map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <Icon size={20} className="text-emerald-400" />
                  <p className="text-xs text-zinc-500 font-medium">{spec.label}</p>
                  <p className="text-sm font-bold text-white">{spec.val}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN PRÓXIMAMENTE (COMING SOON HARDWARE MODULE SILHOUETTES) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
            <Lock size={12} className="text-emerald-400" /> Laboratorio de Innovación KineBytes
          </div>
          <h2 className="text-3xl font-bold text-white">Próximamente en el Ecosistema</h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Nuestros ingenieros trabajan en los siguientes módulos de hardware que ampliarán la suite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'KinePulse Ultra Gen 4', desc: 'Sensor EMG muscular de alta densidad.', icon: '📡', date: 'Q3 2026' },
            { name: 'SensorMesh Pro Patch', desc: 'Parche inteligente de hidratación y lactato.', icon: '🎯', date: 'Q4 2026' },
            { name: 'DataHub Elite Station', desc: 'Estación base de carga y análisis para equipos.', icon: '🌐', date: 'Q1 2027' },
          ].map((item, idx) => (
            <div key={idx} className="relative p-6 rounded-3xl bg-kb-card/60 border border-zinc-800/80 backdrop-blur-sm overflow-hidden text-left group">
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-zinc-800/80 text-[10px] font-bold text-zinc-400 border border-zinc-700">
                {item.date}
              </div>
              <div className="text-5xl opacity-40 filter blur-[1px] mb-4 group-hover:blur-0 transition-all">{item.icon}</div>
              <h3 className="font-bold text-white mb-1">{item.name}</h3>
              <p className="text-xs text-zinc-500 mb-4">{item.desc}</p>
              <span className="text-[11px] text-emerald-400/80 font-mono flex items-center gap-1">
                <Lock size={10} /> En desarrollo activo
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
