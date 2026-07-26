import { useState } from 'react';
import { Search, HelpCircle, Cpu, Radio, Shield, CreditCard, ChevronRight, BookOpen } from 'lucide-react';
import { Input, Card, Badge } from '@/components/ui';
import { Link } from 'react-router-dom';

const categories = [
  {
    icon: Cpu,
    title: 'Hardware & Dispositivos',
    desc: 'Configuración, calibración y vinculación de conos interactivos ESP32.',
    count: 12,
  },
  {
    icon: Radio,
    title: 'Sensores & Telemetría',
    desc: 'Uso de sensores de haz de luz, rangos y actualización OTA de firmware.',
    count: 8,
  },
  {
    icon: CreditCard,
    title: 'Pedidos, Pagos & Envío',
    desc: 'Seguimiento de pedidos, facturación, Stripe y políticas de despacho.',
    count: 15,
  },
  {
    icon: Shield,
    title: 'Cuenta KineByte & SSO',
    desc: 'Autenticación unificada con Supabase, permisos y gestión de perfil.',
    count: 10,
  },
];

const popularArticles = [
  { title: '¿Cómo sincronizar múltiples conos interactivos en una misma sesión?', cat: 'Hardware', time: '3 min de lectura' },
  { title: 'Guía de inicio rápido para el Sensor Beam Agility', cat: 'Sensores', time: '5 min de lectura' },
  { title: '¿Cómo funciona la autenticación única (SSO) entre la Tienda y el Dashboard?', cat: 'Cuenta', time: '4 min de lectura' },
  { title: 'Tiempos de entrega y cobertura de envíos internacionales', cat: 'Envíos', time: '2 min de lectura' },
  { title: 'Proceso de actualización de firmware vía OTA para dispositivos KineByte', cat: 'Hardware', time: '6 min de lectura' },
];

export function HelpCenterPage() {
  const [search, setSearch] = useState('');

  const filteredArticles = popularArticles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) || a.cat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <Badge variant="info" className="gap-1">
          <HelpCircle size={14} /> Centro de Ayuda
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          ¿En qué podemos <span className="gradient-text">ayudarte</span> hoy?
        </h1>
        <p className="text-zinc-400 text-base">
          Encuentra guías paso a paso, tutoriales de configuración de hardware y respuestas a preguntas frecuentes sobre el ecosistema KineByte.
        </p>

        <div className="max-w-xl mx-auto pt-2">
          <Input
            placeholder="Buscar artículos, guías de hardware, solución de problemas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-base py-3.5 pl-11"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Explora por categoría</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.title} hover className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-white">{cat.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{cat.desc}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-emerald-400 font-medium">
                  <span>{cat.count} artículos</span>
                  <ChevronRight size={14} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Popular Articles */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Artículos más consultados</h2>
          <Link to="/faq" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
            Ver todas las FAQ <ChevronRight size={12} />
          </Link>
        </div>

        <div className="space-y-3">
          {filteredArticles.map((art) => (
            <Card key={art.title} hover className="p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors">
                    {art.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                    <span>{art.cat}</span>
                    <span>•</span>
                    <span>{art.time}</span>
                  </div>
                </div>
              </div>
              <ChevronRight size={16} className="text-zinc-600 shrink-0" />
            </Card>
          ))}
        </div>
      </div>

      {/* Still need help */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-emerald-500/10 via-kb-card to-zinc-900 p-8 sm:p-10 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">¿No encontraste lo que buscabas?</h3>
        <p className="text-sm text-zinc-400 max-w-lg mx-auto">
          Nuestro equipo de ingeniería y soporte atlético está disponible para resolver dudas técnicas de hardware o licencias de software.
        </p>
        <div className="pt-2">
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-colors">
            Contactar a soporte
          </Link>
        </div>
      </div>
    </div>
  );
}
