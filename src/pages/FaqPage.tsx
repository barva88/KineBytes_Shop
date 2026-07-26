import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, Badge, Input } from '@/components/ui';

const faqs = [
  {
    q: '¿Cómo funciona la autenticación única (SSO) entre la Tienda y KineByte?',
    a: 'Ambas plataformas comparten el mismo proyecto de Supabase. Al registrarte o iniciar sesión en KineBytes Shop con tu correo y contraseña, se crea automáticamente una cuenta unificada. Podrás usar las mismas credenciales para ingresar al Dashboard de KineByte sin necesidad de crear una cuenta independiente.',
  },
  {
    q: '¿Cómo se vinculan mis compras de hardware o software a mi panel de KineByte?',
    a: 'Cada pedido completado registra su ID de usuario en las tablas de pedidos de Supabase. Tan pronto como el pago es procesado por Stripe, el panel de KineByte detecta la adquisición y habilita inmediatamente el acceso a módulos de software o el registro de nuevos dispositivos.',
  },
  {
    q: '¿Qué conectividad utilizan los Conos Interactivos Pro?',
    a: 'Los Conos Interactivos Pro funcionan con microcontroladores ESP32 y cuentan con doble conectividad: WiFi (para transmisión en tiempo real al panel web) y Bluetooth Low Energy (BLE) para vinculación directa con aplicaciones móviles y smartwatch WearOS.',
  },
  {
    q: '¿Los productos cuentan con garantía?',
    a: 'Sí, todo el hardware interactivo y sensores vendidos en la tienda oficial incluyen 12 meses de garantía directa de fábrica. Además, ofrecemos 30 días naturales para cambios o devoluciones sin complicaciones.',
  },
  {
    q: '¿Se pueden realizar compras corporativas o para clubes enteros?',
    a: 'Sí. Contamos con los Training Packs y la Licencia Team Enterprise diseñados específicamente para academias y equipos profesionales. Si necesitas una cotización personalizada o múltiples unidades, puedes contactarnos directamente.',
  },
  {
    q: '¿Cuáles son los métodos de pago aceptados?',
    a: 'Aceptamos todas las tarjetas de crédito y débito principales (Visa, MasterCard, American Express) procesadas a través de Stripe de manera encriptada y segura.',
  },
];

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (f) => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="info" className="gap-1">
          <HelpCircle size={14} /> FAQ
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Preguntas <span className="gradient-text">Frecuentes</span>
        </h1>
        <p className="text-zinc-400 text-base max-w-xl mx-auto">
          Encuentra respuestas rápidas sobre nuestros productos, envíos, autenticación Supabase y soporte técnico.
        </p>

        <div className="max-w-md mx-auto pt-2">
          <Input
            placeholder="Buscar pregunta..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <Card
              key={faq.q}
              className="p-6 cursor-pointer transition-colors hover:border-zinc-700"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-white">{faq.q}</h3>
                <ChevronDown
                  size={18}
                  className={`text-zinc-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`}
                />
              </div>

              {isOpen && (
                <div className="mt-4 pt-4 border-t border-zinc-800/60 text-sm text-zinc-400 leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
