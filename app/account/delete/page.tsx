'use client';
import Link from 'next/link';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Button, Input } from '@/components/ui';

export default function DeleteAccountPage() {
  const [confirm, setConfirm] = useState('');
  const CONFIRM_TEXT = 'ELIMINAR';

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/account" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Mi Cuenta</Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"><Trash2 size={22} /></div>
        <h1 className="text-2xl font-bold text-white">Eliminar Cuenta</h1>
      </div>
      <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl mb-8">
        <div className="flex items-center gap-2 text-red-400 font-semibold mb-3"><AlertTriangle size={18} /> Esta acción es irreversible</div>
        <p className="text-sm text-zinc-400 leading-relaxed">Al eliminar tu cuenta se borrarán permanentemente todos tus datos, historial de pedidos, lista de deseos y preferencias. No podrás recuperar esta información.</p>
      </div>
      <div className="p-6 bg-kb-card border border-zinc-800 rounded-2xl space-y-4">
        <p className="text-sm text-zinc-400">Para confirmar, escribe <strong className="text-white font-mono">{CONFIRM_TEXT}</strong> en el campo de abajo:</p>
        <Input value={confirm} onChange={e => setConfirm(e.target.value)} placeholder={CONFIRM_TEXT} className="font-mono" />
        <button disabled={confirm !== CONFIRM_TEXT}
          className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
          Eliminar mi cuenta permanentemente
        </button>
        <Link href="/account"><Button variant="outline" fullWidth>Cancelar, mantener mi cuenta</Button></Link>
      </div>
    </div>
  );
}
