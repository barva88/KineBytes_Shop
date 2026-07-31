import Link from 'next/link';
import { Star, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';

export const metadata = { title: 'Reseñas Globales — KineBytes Shop' };

const REVIEWS = [
  { name: 'Marco Herrera', rating: 5, product: 'KinePulse Pro', date: 'Hace 3 días', comment: 'Simplemente el mejor hardware deportivo que he probado. La precisión es increíble.' },
  { name: 'Ana Flores', rating: 5, product: 'SensorKit Elite', date: 'Hace 1 semana', comment: 'Transformó la forma en que entreno. Los datos son precisos y la app muy intuitiva.' },
  { name: 'Luis Mendoza', rating: 4, product: 'Training Pack Pro', date: 'Hace 2 semanas', comment: 'Excelente kit para el equipo. La instalación fue sencilla y el soporte muy rápido.' },
  { name: 'Patricia Rojas', rating: 5, product: 'DataHub Pro', date: 'Hace 1 mes', comment: 'La integración con mi software de análisis fue perfecta. Totalmente recomendado.' },
];

export default function ReviewsPage() {
  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-amber-400 mb-6"><Star size={14} /> Reseñas</div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Lo que dicen nuestros atletas</h1>
      </div>
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6 bg-kb-card border border-zinc-800 rounded-2xl md:col-span-1">
          <p className="text-6xl font-extrabold text-white mb-2">{avgRating}</p>
          <div className="flex justify-center text-amber-400 mb-2">{[1,2,3,4,5].map(i=><Star key={i} size={20} className="fill-current"/>)}</div>
          <p className="text-sm text-zinc-500">de 5 estrellas</p>
        </div>
        <div className="md:col-span-2 space-y-3 p-6 bg-kb-card border border-zinc-800 rounded-2xl">
          {[5,4,3,2,1].map(stars => {
            const count = REVIEWS.filter(r => r.rating === stars).length;
            const pct = (count / REVIEWS.length) * 100;
            return (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-xs text-zinc-500 w-6 text-right">{stars}★</span>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-zinc-500 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REVIEWS.map((review, i) => (
          <div key={i} className="p-6 bg-kb-card border border-zinc-800 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  {review.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{review.name}</p>
                  <p className="text-xs text-zinc-500">{review.product} · {review.date}</p>
                </div>
              </div>
              <div className="flex text-amber-400">{[1,2,3,4,5].map(i=><Star key={i} size={12} className={i<=review.rating?"fill-current":"text-zinc-700"}/>)}</div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
