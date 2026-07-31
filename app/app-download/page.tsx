import Link from 'next/link';
import { Smartphone, Apple, ArrowRight, Star, Wifi, Activity } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'App Móvil KineBytes — Descarga Gratis', description: 'Descarga la app KineBytes para iOS y Android. Monitorea tu rendimiento atlético en tiempo real.' };

const FEATURES = [
  { icon: Activity, title: 'Métricas en Tiempo Real', desc: 'Frecuencia cardíaca, SpO2, temperatura y EMG en vivo.' },
  { icon: Wifi, title: 'Sincronización Automática', desc: 'Sincroniza con todos tus dispositivos KineBytes vía Bluetooth 5.0.' },
  { icon: Star, title: 'Análisis con IA', desc: 'Recomendaciones personalizadas basadas en tus patrones de entrenamiento.' },
];

export default function AppDownloadPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6"><Smartphone size={14} /> App KineBytes</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Tu rendimiento.<br />En la palma de tu mano.</h1>
        <p className="text-zinc-400 max-w-xl mx-auto mb-8">La app KineBytes conecta todo tu hardware en un solo lugar. Analiza, comparte y mejora. Disponible para iOS y Android.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-zinc-100 transition-colors">
            <Apple size={24} /> <div className="text-left"><p className="text-xs opacity-60">Disponible en</p><p>App Store</p></div>
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-zinc-700 text-white rounded-xl font-semibold hover:border-zinc-500 transition-colors">
            <Smartphone size={24} /> <div className="text-left"><p className="text-xs opacity-60">Disponible en</p><p>Google Play</p></div>
          </a>
        </div>
        <p className="text-xs text-zinc-600 mt-4">Requiere iOS 15+ o Android 10+. Descarga gratuita.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-6 bg-kb-card border border-zinc-800 rounded-2xl text-center">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4"><Icon size={24} /></div>
            <h3 className="font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-400">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 justify-center text-sm text-zinc-500">
        <Star size={14} className="text-amber-400 fill-amber-400" />
        <span><strong className="text-white">4.9</strong> / 5 · 12,400+ reseñas en App Store y Google Play</span>
      </div>
    </div>
  );
}
