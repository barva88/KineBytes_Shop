import Link from 'next/link';
import { ServerCrash } from 'lucide-react';
import { Button } from '@/components/ui';

export default function Error500Page() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-8 mx-auto">
          <ServerCrash size={48} />
        </div>
        <p className="text-sm font-mono text-red-400 mb-3">Error 500</p>
        <h1 className="text-4xl font-extrabold text-white mb-4">Error Interno del Servidor</h1>
        <p className="text-zinc-400 max-w-md mx-auto mb-8">
          Algo salió mal en nuestros servidores. Nuestro equipo ya fue notificado y está trabajando para resolverlo. Por favor, intenta más tarde.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"><Button size="lg">Volver al Inicio</Button></Link>
          <Link href="/contact"><Button variant="outline" size="lg">Reportar el problema</Button></Link>
        </div>
      </div>
    </div>
  );
}
