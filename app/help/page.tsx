import { Search, Book, MessageCircle, Wrench, ShieldQuestion } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export default function HelpCenterPage() {
  const topics = [
    { icon: <Wrench />, title: "Guías de Instalación", desc: "Aprende a configurar tu hardware interactivo paso a paso." },
    { icon: <MessageCircle />, title: "Resolución de Problemas", desc: "Soluciones comunes y FAQs para sensores y módulos." },
    { icon: <Book />, title: "Manuales de Software", desc: "Saca el máximo provecho al dashboard de KineBytes." },
    { icon: <ShieldQuestion />, title: "Garantía y Devoluciones", desc: "Políticas de cobertura y proceso RMA." },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Centro de Ayuda</h1>
        <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
          ¿En qué podemos ayudarte? Busca manuales, artículos de soporte o guías paso a paso para todo tu ecosistema KineBytes.
        </p>
        <div className="max-w-xl mx-auto relative">
          <Input placeholder="Buscar artículos, guías o manuales..." className="pl-12 h-14 text-base rounded-2xl" />
          <Search className="absolute left-4 top-4 text-zinc-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {topics.map((topic, i) => (
          <div key={i} className="bg-kb-card border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-colors cursor-pointer group">
            <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              {topic.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{topic.title}</h3>
            <p className="text-zinc-400 text-sm">{topic.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">¿Aún necesitas ayuda?</h2>
        <p className="text-zinc-300 mb-6 max-w-lg mx-auto">
          Nuestro equipo de soporte técnico especializado en hardware deportivo está listo para ayudarte.
        </p>
        <Button size="lg" className="gap-2">Contactar Soporte</Button>
      </div>
    </div>
  );
}
