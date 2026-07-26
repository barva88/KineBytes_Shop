import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="space-y-6">
        <div className="text-8xl font-bold text-zinc-800">404</div>
        <h1 className="text-2xl font-bold text-white">Página no encontrada</h1>
        <p className="text-zinc-500 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida. Prueba regresar al inicio o explorar nuestro catálogo.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/">
            <Button className="gap-2">
              <ArrowLeft size={16} /> Ir al inicio
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline">Ver productos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
