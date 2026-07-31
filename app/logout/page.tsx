'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';

export default function LogoutPage() {
  const signOut = useAuthStore(s => s.signOut);
  const router = useRouter();

  useEffect(() => {
    const doSignOut = async () => {
      await signOut();
      router.push('/');
    };
    doSignOut();
  }, [signOut, router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 mb-6 mx-auto">
          <Loader2 size={36} className="animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Cerrando sesión...</h1>
        <p className="text-zinc-400">Te estamos redirigiendo al inicio.</p>
      </div>
    </div>
  );
}
