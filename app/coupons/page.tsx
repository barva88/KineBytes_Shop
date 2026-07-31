'use client';
import { useState } from 'react';
import { Tag, CheckCircle2, Percent } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export default function CouponsPage() {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);

  const PROMO_CODES = [
    { code: 'KINEBYTES20', discount: '20% OFF en tu primera compra', minOrder: '$0', emoji: '🎉' },
    { code: 'ATLETA2024', discount: '15% OFF en hardware interactivo', minOrder: '$150', emoji: '⚡' },
    { code: 'ENVIOGRATIS', discount: 'Envío gratis en tu próxima orden', minOrder: '$100', emoji: '📦' },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6"><Percent size={14} /> Códigos de Descuento</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">🏷️ Cupones y Descuentos</h1>
        <p className="text-zinc-400">Ingresa tu código o encuentra nuevas promociones activas.</p>
      </div>

      {/* Code Input */}
      <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl mb-8">
        <h2 className="font-semibold text-white mb-4">Canjear código</h2>
        {applied ? (
          <div className="flex items-center gap-3 text-emerald-400 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <CheckCircle2 size={20} /> <span className="font-semibold">Código aplicado correctamente</span>
          </div>
        ) : (
          <div className="flex gap-3">
            <Input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="Ej: KINEBYTES20" className="font-mono flex-1" />
            <Button onClick={() => setApplied(true)} disabled={!code}>Aplicar</Button>
          </div>
        )}
      </div>

      {/* Active Promos */}
      <h2 className="font-bold text-white mb-4">Promociones activas</h2>
      <div className="space-y-4">
        {PROMO_CODES.map(promo => (
          <div key={promo.code} className="flex items-center gap-4 p-5 bg-kb-card border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all">
            <span className="text-3xl">{promo.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <code className="text-sm font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5">{promo.code}</code>
              </div>
              <p className="text-sm font-medium text-white">{promo.discount}</p>
              <p className="text-xs text-zinc-500">Mínimo de compra: {promo.minOrder}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => { setCode(promo.code); setApplied(false); }}>Usar</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
