import { Shield, Truck, RefreshCcw, Headphones } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Garantía KineByte',
    description: '12 meses de garantía en todos los productos',
  },
  {
    icon: Truck,
    title: 'Envío Rápido',
    description: 'Despacho express en 24-48h disponible',
  },
  {
    icon: RefreshCcw,
    title: 'Devolución Fácil',
    description: '30 días para cambios y devoluciones',
  },
  {
    icon: Headphones,
    title: 'Soporte Técnico',
    description: 'Equipo especializado en hardware atlético',
  },
];

export function TrustBadges() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.title}
              className="rounded-2xl border border-zinc-800/60 bg-kb-card p-6 text-center space-y-3 hover:border-zinc-700 transition-colors"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                <Icon size={22} className="text-emerald-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">{badge.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{badge.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
