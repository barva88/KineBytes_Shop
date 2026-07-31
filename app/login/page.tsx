'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { Button, Input, TurnstileWidget } from '@/components/ui';
import { Suspense } from 'react';

import Image from 'next/image';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/';

  const signIn = useAuthStore((s) => s.signIn);
  const loading = useAuthStore((s) => s.loading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!captchaToken) {
      setError('Por favor completa el captcha de seguridad.');
      return;
    }

    const { error: signInError } = await signIn(email, password, captchaToken);
    
    if (signInError) {
      setError(signInError === 'Invalid login credentials' ? 'Correo o contraseña incorrectos.' : signInError);
    } else {
      router.push(redirect);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6 p-2.5 mx-auto">
            <Image
              src="/images/KineBytes Icon.svg"
              alt="KineBytes Icon"
              width={48}
              height={48}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Iniciar Sesión</h2>
          <p className="mt-2 text-sm text-zinc-400">
            O <Link href={`/register?redirect=${redirect}`} className="font-medium text-emerald-400 hover:text-emerald-300">crea una cuenta nueva</Link>
          </p>
        </div>

        <div className="bg-kb-card border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-3">
                <AlertCircle size={18} className="shrink-0 mt-0.5" /> <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Correo Electrónico</label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" /></div>
              <div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Contraseña</label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></div>
            </div>

            <TurnstileWidget onVerify={setCaptchaToken} onError={() => setError('Error de captcha')} onExpire={() => setCaptchaToken(null)} />

            <Button type="submit" fullWidth size="lg" disabled={loading} className="gap-2">
              {loading ? 'Ingresando...' : 'Iniciar Sesión'} <ArrowRight size={18} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[80vh] items-center justify-center text-emerald-400">Cargando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
