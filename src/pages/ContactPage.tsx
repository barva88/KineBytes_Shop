import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { Input, Button, Card, Badge } from '@/components/ui';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consulta Técnica / Hardware',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="success">Contacto</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Ponte en <span className="gradient-text">contacto</span> con nosotros
        </h1>
        <p className="text-zinc-400 text-base">
          ¿Tienes preguntas sobre nuestros conos interactivos, licencias para equipos o necesitas una cotización personalizada? Estamos listos para asesorarte.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        {/* Contact Form */}
        <Card className="p-8 space-y-6">
          <h2 className="text-xl font-bold text-white">Envíanos un mensaje</h2>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 size={48} className="text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">¡Mensaje enviado con éxito!</h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Un especialista de KineBytes revisará tu solicitud y se pondrá en contacto en un lapso de 24 horas hábiles.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Nombre completo *"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Correo electrónico *"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-300">Asunto</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                >
                  <option value="Consulta Técnica / Hardware">Consulta Técnica / Hardware</option>
                  <option value="Cotización para Equipos / Academias">Cotización para Equipos / Academias</option>
                  <option value="Soporte de Cuenta y Licencias">Soporte de Cuenta y Licencias</option>
                  <option value="Devoluciones y Garantía">Devoluciones y Garantía</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-300">Mensaje *</label>
                <textarea
                  rows={5}
                  placeholder="Escribe tu mensaje o consulta detallada aquí..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>

              <Button type="submit" size="lg" fullWidth className="gap-2">
                <Send size={18} /> Enviar mensaje
              </Button>
            </form>
          )}
        </Card>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-white">Información de contacto</h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Correo soporte</p>
                  <p className="text-white font-medium">soporte@kinebytes.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Atención telefónica</p>
                  <p className="text-white font-medium">+1 (555) 018-2048</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Oficina central</p>
                  <p className="text-white font-medium">1200 Sport Tech Ave, Suite 304<br />Austin, TX 78701</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Horario de atención</p>
                  <p className="text-white font-medium">Lunes a Viernes: 9:00 AM – 6:00 PM CST</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
