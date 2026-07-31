'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, CheckCircle2 } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Las contraseñas no coinciden.'); return; }
    if (password.length < 8) { setError('La contraseña debe tener al menos 8 caracteres.'); return; }
    setLoading(true);
    setError('');
    const supabase = getSupabaseBrowserClient();
    const { error: err } = await supabase.auth.updateUser({ password });
    if (err) setError(err.message);
    else { setDone(true); setTimeout(() => router.push('/login'), 3000); }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6 mx-auto"><CheckCircle2 size={40} /></div>
          <h1 className="text-2xl font-bold text-white mb-3">¡Contraseña actualizada!</h1>
          <p className="text-zinc-400">Serás redirigido al inicio de sesión en unos segundos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4"><KeyRound size={28} /></div>
          <h1 className="text-3xl font-bold text-white mb-2">Nueva contraseña</h1>
          <p className="text-zinc-400">Elige una contraseña segura de al menos 8 caracteres.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-400">Nueva contraseña</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={8} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-400">Confirmar contraseña</label>
            <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" size="lg" fullWidth disabled={loading}>{loading ? 'Actualizando...' : 'Actualizar contraseña'}</Button>
        </form>
      </div>
    </div>
  );
}
