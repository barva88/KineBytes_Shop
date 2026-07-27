'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui';
import type { StoreProduct } from '@/types/store';

const MOCK_REVIEWS = [
  {
    id: 1,
    initials: 'JD',
    name: 'Juan Diego',
    rating: 5,
    title: 'Excelente calidad y precisión',
    content: 'El producto ha transformado completamente mis entrenamientos. Los datos son súper precisos y la integración con la app de KineBytes funciona sin problemas. Totalmente recomendado para atletas serios.',
    date: 'Hace 2 semanas',
  },
  {
    id: 2,
    initials: 'MR',
    name: 'María Rodríguez',
    rating: 4,
    title: 'Muy buen producto, envío rápido',
    content: 'La calidad de construcción es premium. Se nota que están hechos para resistir. Le doy 4 estrellas solo porque me gustaría que incluyera un estuche de viaje más rígido, pero por lo demás es perfecto.',
    date: 'Hace 1 mes',
  },
  {
    id: 3,
    initials: 'CT',
    name: 'Carlos Torres',
    rating: 5,
    title: 'La mejor compra del año',
    content: 'Compré este hardware para mi equipo y todos han notado una mejoría en su rendimiento. La batería dura muchísimo y es súper ligero. Siento que el precio vale cada centavo.',
    date: 'Hace 2 meses',
  },
  {
    id: 4,
    initials: 'AL',
    name: 'Ana López',
    rating: 5,
    title: 'Funciona como promete',
    content: 'Me sorprendió lo fácil que fue configurarlo. Todo está muy bien diseñado. El servicio al cliente también me ayudó rápido cuando tuve una duda de configuración.',
    date: 'Hace 3 meses',
  }
];

export function ProductReviews({ product }: { product: StoreProduct }) {
  const [visibleCount, setVisibleCount] = useState(2);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 2);
      setLoading(false);
    }, 600);
  };

  const visibleReviews = MOCK_REVIEWS.slice(0, visibleCount);
  const hasMore = visibleCount < MOCK_REVIEWS.length;

  return (
    <div id="reviews" className="mb-24 scroll-mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Reseñas de Clientes</h2>
        <div className="flex items-center gap-4">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} className={i <= Math.floor(product.rating) ? "fill-current" : "text-zinc-700"} />)}
          </div>
          <span className="text-xl font-bold text-white">{product.rating} <span className="text-sm text-zinc-500 font-normal">de 5</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleReviews.map((review) => (
          <div key={review.id} className="bg-kb-card border border-zinc-800 rounded-2xl p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">{review.initials}</div>
                <div>
                  <p className="text-sm font-medium text-white">{review.name}</p>
                  <p className="text-xs text-zinc-500">Compra verificada</p>
                </div>
              </div>
              <div className="flex text-amber-400">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className={i <= review.rating ? "fill-current" : "text-zinc-700"} />)}</div>
            </div>
            <h4 className="text-md font-semibold text-white mb-2">{review.title}</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">{review.content}</p>
            <p className="text-xs text-zinc-600 mt-4">{review.date}</p>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Cargando...' : 'Cargar más reseñas'}
          </Button>
        </div>
      )}
      {!hasMore && (
        <div className="mt-8 text-center text-sm text-zinc-500">
          Has leído todas las reseñas.
        </div>
      )}
    </div>
  );
}
