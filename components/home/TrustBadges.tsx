import { Shield, Truck, RotateCcw, Headset } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    { icon: <Shield size={24} />, title: "Garantía Oficial", desc: "1 año en todo el hardware" },
    { icon: <Truck size={24} />, title: "Envío Global", desc: "Entregas seguras y rápidas" },
    { icon: <RotateCcw size={24} />, title: "30 Días", desc: "Devoluciones sin complicaciones" },
    { icon: <Headset size={24} />, title: "Soporte Pro", desc: "Asistencia técnica especializada" }
  ];

  return (
    <section className="py-12 border-b border-zinc-900 bg-kb-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center group">
              <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-4 group-hover:text-emerald-400 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all">
                {badge.icon}
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{badge.title}</h4>
              <p className="text-xs text-zinc-500">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
