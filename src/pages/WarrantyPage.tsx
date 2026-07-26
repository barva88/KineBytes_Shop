import { ShieldCheck, Cpu, Wrench, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { Link } from 'react-router-dom';

export function WarrantyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="success" className="gap-1">
          <ShieldCheck size={14} /> Garantía Oficial
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Garantía KineByte de <span className="gradient-text">12 Meses</span>
        </h1>
        <p className="text-zinc-400 text-base">
          Todos nuestros dispositivos interactivos, sensores y componentes de hardware cuentan con cobertura integral directa de fábrica.
        </p>
      </div>

      {/* Coverage Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="p-8 space-y-4 border-emerald-500/20 bg-emerald-500/5">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">¿Qué cubre la garantía?</h2>
          <ul className="space-y-2.5 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span> Defectos de fabricación en placas ESP32, módulos Bluetooth/WiFi y sensores.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span> Fallos en LEDs RGB, paneles táctiles capacitivos o sistemas de carga.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span> Degradación anómala de la batería Li-Po antes de los 12 meses.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span> Reemplazo o reparación express sin costo de mano de obra.
            </li>
          </ul>
        </Card>

        <Card className="p-8 space-y-4 border-zinc-800 bg-kb-card">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertCircle size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Exclusiones</h2>
          <ul className="space-y-2.5 text-sm text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span> Daños causados por golpes extremos, aplastamiento o uso indebido fuera de especificación.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span> Inmersión prolongada en agua más allá de la certificación IP65.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span> Modificaciones físicas o de firmware no oficiales.
            </li>
          </ul>
        </Card>
      </div>

      {/* Claim process */}
      <Card className="p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white">¿Cómo solicitar una reparación o reemplazo?</h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { step: '01', title: 'Genera el reporte', desc: 'Ingresa a tu cuenta o contáctanos indicando tu # de pedido y descripción del problema.' },
            { step: '02', title: 'Diagnóstico remoto', desc: 'Nuestro equipo evaluará la telemetría del dispositivo y autorizará el cambio.' },
            { step: '03', title: 'Reemplazo express', desc: 'Te enviamos una unidad de reemplazo inmediata o la pieza de recambio.' },
          ].map((s) => (
            <div key={s.step} className="space-y-2">
              <span className="text-3xl font-extrabold text-emerald-500">{s.step}</span>
              <h3 className="text-base font-semibold text-white">{s.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-center">
          <Link to="/contact">
            <Button size="lg" className="gap-2">
              Iniciar reclamo de garantía
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
