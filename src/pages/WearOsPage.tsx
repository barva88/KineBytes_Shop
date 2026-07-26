import { Watch, Heart, Radio, CheckCircle2 } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { Link } from 'react-router-dom';

export function WearOsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="success" className="gap-1">
          <Watch size={14} /> WearOS Integration
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Aplicación KineByte para <span className="gradient-text">Smartwatch</span>
        </h1>
        <p className="text-zinc-400 text-base">
          Mide la frecuencia cardíaca y sincroniza tiempos de reacción directamente desde tu reloj Samsung Galaxy Watch o dispositivo WearOS.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="p-6 space-y-3">
          <Heart className="text-red-400" size={28} />
          <h3 className="text-base font-bold text-white">Frecuencia Cardíaca</h3>
          <p className="text-xs text-zinc-400">Lectura en tiempo real integrada a cada repetición del circuito.</p>
        </Card>
        <Card className="p-6 space-y-3">
          <Radio className="text-emerald-400" size={28} />
          <h3 className="text-base font-bold text-white">BLE Sync</h3>
          <p className="text-xs text-zinc-400">Vinculación instantánea con conos y sensores cercanos.</p>
        </Card>
        <Card className="p-6 space-y-3">
          <Watch className="text-cyan-400" size={28} />
          <h3 className="text-base font-bold text-white">WearOS 3+</h3>
          <p className="text-xs text-zinc-400">Compatibilidad completa con la tienda Google Play.</p>
        </Card>
      </div>
    </div>
  );
}
