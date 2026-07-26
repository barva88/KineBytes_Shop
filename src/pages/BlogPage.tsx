import { BookOpen, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

const articles = [
  {
    slug: 'telemetria-esp32-en-el-deporte',
    title: 'Cómo el uso de microcontroladores ESP32 está revolucionando la medición de velocidad y agilidad',
    excerpt: 'Análisis detallado sobre latencia baja, conectividad BLE/WiFi y transmisión continua de datos en entornos de entrenamiento atlético.',
    date: '15 de Julio, 2026',
    readTime: '5 min de lectura',
    category: 'Tecnología',
  },
  {
    slug: 'optimización-del-tiempo-de-reaccion',
    title: 'Metodología de entrenamiento visual y motor mediante conos interactivos de luz RGB',
    excerpt: 'Estudio de caso sobre la reducción en milisegundos del tiempo de respuesta cognitiva en atletas de alto rendimiento.',
    date: '02 de Julio, 2026',
    readTime: '7 min de lectura',
    category: 'Entrenamiento',
  },
  {
    slug: 'integracion-wearos-y-frecuencia-cardiaca',
    title: 'Integración en tiempo real entre relojes Samsung WearOS y paneles de telemetría KineByte',
    excerpt: 'Explicación técnica de la sincronización de sensores cardíacos con pruebas de sprint automatizadas.',
    date: '20 de Junio, 2026',
    readTime: '4 min de lectura',
    category: 'Integraciones',
  },
];

export function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="info" className="gap-1">
          <BookOpen size={14} /> Blog & Novedades
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Novedades del <span className="gradient-text">Ecosistema</span> KineByte
        </h1>
        <p className="text-zinc-400 text-base">
          Artículos sobre rendimiento deportivo, hardware interactivo, análisis de datos e innovaciones en telemetría.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((art) => (
          <Card key={art.slug} hover className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <Badge variant="outline">{art.category}</Badge>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{art.readTime}</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-white hover:text-emerald-400 transition-colors">
                {art.title}
              </h2>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-500 flex items-center gap-1">
                <Calendar size={12} /> {art.date}
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5 hover:underline cursor-pointer">
                Leer artículo <ChevronRight size={12} />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
