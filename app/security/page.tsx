import Link from 'next/link';
import { Shield, Lock, Eye, Users, Globe } from 'lucide-react';

export const metadata = { title: 'Política de Seguridad — KineBytes Shop' };

export default function SecurityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4 mx-auto"><Shield size={32} /></div>
        <h1 className="text-3xl font-bold text-white mb-2">Política de Seguridad</h1>
        <p className="text-zinc-400">Última actualización: Julio 2024</p>
      </div>
      {[
        { icon: Lock, title: 'Cifrado de Datos', content: 'Todos los datos transmitidos entre tu dispositivo y nuestros servidores están protegidos con cifrado SSL/TLS de 256 bits. Los datos sensibles de pago jamás son almacenados en nuestros servidores; son procesados directamente por pasarelas de pago certificadas PCI-DSS.' },
        { icon: Eye, title: 'Protección de Contraseñas', content: 'Las contraseñas se almacenan usando hashing bcrypt con sal aleatoria. Nunca almacenamos contraseñas en texto plano. Ofrecemos autenticación de dos factores (2FA) mediante SMS para mayor seguridad.' },
        { icon: Users, title: 'Acceso a Datos Personales', content: 'El acceso a tus datos personales está restringido solo al personal autorizado con necesidad legítima. Seguimos el principio de mínimo privilegio. Realizamos auditorías de acceso periódicas.' },
        { icon: Globe, title: 'Vulnerabilidades y Reporte', content: 'Si descubres una vulnerabilidad de seguridad en nuestra plataforma, te pedimos que nos la comuniques de forma responsable a security@kinebytes.com. Nos comprometemos a responder en un plazo de 48 horas hábiles.' },
      ].map(({ icon: Icon, title, content }) => (
        <div key={title} className="flex gap-5 p-6 bg-kb-card border border-zinc-800 rounded-2xl mb-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0"><Icon size={20} /></div>
          <div>
            <h2 className="font-bold text-white mb-2">{title}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">{content}</p>
          </div>
        </div>
      ))}
      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-500">¿Tienes preguntas sobre seguridad? <Link href="/contact" className="text-emerald-400 hover:underline">Contáctanos</Link></p>
      </div>
    </div>
  );
}
