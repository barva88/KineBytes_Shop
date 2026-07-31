import Link from 'next/link';
import { Shield, CheckCircle2 } from 'lucide-react';

export const metadata = { title: 'Sellos de Confianza — KineBytes Shop' };

const TRUST_SEALS = [
  { name: 'SSL/TLS 256-bit', icon: '🔒', desc: 'Todas las conexiones están cifradas' },
  { name: 'PCI-DSS Compliance', icon: '💳', desc: 'Pagos seguros certificados' },
  { name: 'GDPR Compliant', icon: '🇪🇺', desc: 'Protección de datos europea' },
  { name: 'ISO 27001', icon: '📋', desc: 'Seguridad de la información' },
  { name: 'Verified Merchant', icon: '✅', desc: 'Comercio verificado por Stripe' },
  { name: '30 Day Returns', icon: '↩️', desc: 'Devoluciones garantizadas' },
];

export default function TrustPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4 mx-auto"><Shield size={32} /></div>
        <h1 className="text-3xl font-bold text-white mb-2">Compramos Contigo, No Solo Para Ti</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">Tu confianza y seguridad son nuestra prioridad. Conoce los certificados y estándares que avalan la seguridad de KineBytes Shop.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {TRUST_SEALS.map(seal => (
          <div key={seal.name} className="flex items-center gap-4 p-5 bg-kb-card border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all">
            <span className="text-3xl">{seal.icon}</span>
            <div>
              <p className="font-semibold text-white">{seal.name}</p>
              <p className="text-xs text-zinc-500">{seal.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl text-center">
        <h2 className="text-xl font-bold text-white mb-3">Garantía de Satisfacción</h2>
        <p className="text-zinc-400 max-w-lg mx-auto">Si no estás completamente satisfecho con tu compra, ofrecemos devoluciones sin preguntas dentro de los 30 días posteriores a la entrega.</p>
        <Link href="/shipping-returns" className="inline-block mt-4 text-emerald-400 hover:underline text-sm">Ver política de devoluciones →</Link>
      </div>
    </div>
  );
}
