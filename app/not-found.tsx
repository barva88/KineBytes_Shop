import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-4xl font-black text-white mb-4">404 - Página No Encontrada</h2>
      <p className="text-zinc-400 max-w-md mb-8">
        No pudimos encontrar la página que buscas. Puede haber sido eliminada o la dirección es incorrecta.
      </p>
      <Link href="/">
        <Button>Volver al Inicio</Button>
      </Link>
    </div>
  );
}
