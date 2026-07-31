'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = getSupabaseBrowserClient();
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account/reset-password`,
    });
    if (err) setError(err.message);
    else setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6 mx-auto">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Revisa tu correo</h1>
          <p className="text-zinc-400 mb-6">Te hemos enviado un enlace para restablecer tu contraseña a <strong className="text-white">{email}</strong>.</p>
          <Link href="/login"><Button variant="outline">Volver al inicio de sesión</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Volver al inicio de sesión
        </Link>
        <div className="mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
            <Mail size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Olvidé mi contraseña</h1>
          <p className="text-zinc-400">Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-400">Correo electrónico</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" required />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </Button>
        </form>
      </div>
    </div>
  );
}
