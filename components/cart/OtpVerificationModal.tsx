'use client';
import { useState, useEffect, useRef } from 'react';
import { KeyRound, ShieldCheck, RefreshCw, X, AlertCircle, CheckCircle2, Lock, ShieldAlert, Timer } from 'lucide-react';
import { Button, Input, Badge } from '@/components/ui';
import { TurnstileWidget } from '@/components/ui/TurnstileWidget';

export function OtpVerificationModal({ open, phone, onSuccess, onClose }: { open: boolean; phone: string; onSuccess: () => void; onClose: () => void }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [sentMessage, setSentMessage] = useState('');
  const [error, setError] = useState('');
  
  // Security State
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown timer effect for lockout
  useEffect(() => {
    if (lockoutSeconds > 0) {
      setIsLocked(true);
      timerRef.current = setInterval(() => {
        setLockoutSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsLocked(false);
            setError('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (lockoutSeconds === 0 && !isBanned) {
      setIsLocked(false);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [lockoutSeconds, isBanned]);

  useEffect(() => {
    if (open && phone) {
      setCode('');
      setError('');
      setSentMessage('');
      sendOtpCode();
    }
  }, [open, phone]);

  const handleLockoutData = (data: any) => {
    if (data.attempts !== undefined) setAttempts(data.attempts);
    if (data.isBanned) {
      setIsBanned(true);
      setIsLocked(true);
      setError('Número bloqueado permanentemente por superar los 15 intentos fallidos. Contacta al administrador.');
    } else if (data.isLocked && data.remainingSeconds > 0) {
      setIsLocked(true);
      setLockoutSeconds(data.remainingSeconds);
    }
  };

  const sendOtpCode = async () => {
    if (isLocked || isBanned) return;

    setSendingOtp(true);
    setError('');
    setSentMessage('');

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, captchaToken }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        handleLockoutData(data);
        throw new Error(data.error || 'Error al enviar SMS');
      }
      
      setSentMessage(`Código de verificación enviado por SMS al ${phone}. Revisa tu teléfono.`);
    } catch (err: any) {
      setError(err.message || 'Error al enviar código');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked || isBanned) return;

    setError('');

    if (code.trim().length < 4) {
      setError('Por favor ingresa los 6 dígitos del código OTP.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: code.trim(), captchaToken }),
      });
      const data = await res.json();

      if (!res.ok) {
        handleLockoutData(data);
        setError(data.error || 'Código de verificación incorrecto.');
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setError('Error de conexión al verificar el código.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s < 10 ? '0' : ''}${s}s` : `${s}s`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-kb-card p-6 shadow-2xl space-y-5 animate-scale-in">
        <button onClick={onClose} className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-300 transition-colors"><X size={20} /></button>
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto">
            {isBanned ? <ShieldAlert size={28} className="text-red-400" /> : isLocked ? <Lock size={28} className="text-amber-400" /> : <ShieldCheck size={28} />}
          </div>
          <div className="flex justify-center gap-2">
            <Badge variant={isBanned ? 'error' : isLocked ? 'warning' : 'success'}>
              {isBanned ? 'Baneado' : isLocked ? 'Bloqueado Temporalmente' : 'Verificación de Seguridad'}
            </Badge>
            {attempts > 0 && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                Intentos: {attempts}/15
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">Confirma tu Identidad</h2>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
            Código OTP enviado por SMS al teléfono registrado.
          </p>
        </div>

        {/* Lockout Warning Banner */}
        {isBanned && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center space-y-2">
            <ShieldAlert size={24} className="text-red-400 mx-auto" />
            <p className="text-xs font-bold text-red-300 uppercase tracking-wider">Acceso Bloqueado Permanentemente</p>
            <p className="text-xs text-zinc-400">Has superado el máximo de 15 intentos fallidos. Tu teléfono ha sido bloqueado por seguridad contra fraudes. Contacta a un administrador.</p>
          </div>
        )}

        {isLocked && !isBanned && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-center space-y-2 animate-pulse">
            <Timer size={24} className="text-amber-400 mx-auto" />
            <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Límite de Intentos Excedido</p>
            <p className="text-sm font-mono font-bold text-amber-400">Tiempo restante: {formatTimer(lockoutSeconds)}</p>
            <p className="text-[11px] text-zinc-400">Por seguridad, debes esperar a que termine el contador antes de intentar de nuevo.</p>
          </div>
        )}

        {sentMessage && !isLocked && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-300 flex items-start gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" /><span>{sentMessage}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center">Código OTP (6 dígitos)</label>
            <div className="relative">
              <Input
                placeholder="1 2 3 4 5 6"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                disabled={isLocked || isBanned || loading}
                className="text-center text-xl font-mono tracking-[0.4em] py-3 uppercase disabled:opacity-50"
                required
              />
              <KeyRound size={18} className="absolute left-3 top-3.5 text-zinc-500" />
            </div>
          </div>

          {/* Turnstile Bot Protection Widget */}
          <TurnstileWidget
            onVerify={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
          />

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400 flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" /><span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={loading || isLocked || isBanned}
            className="gap-2"
          >
            {loading ? <span className="animate-pulse">Verificando...</span> : <><ShieldCheck size={18} /> Verificar Código y Confirmar Pago</>}
          </Button>
        </form>

        <div className="pt-2 text-center border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>¿No recibiste el SMS?</span>
          <button
            type="button"
            onClick={sendOtpCode}
            disabled={sendingOtp || isLocked || isBanned}
            className="text-emerald-400 hover:underline font-medium flex items-center gap-1 disabled:opacity-40 disabled:no-underline"
          >
            <RefreshCw size={12} className={sendingOtp ? 'animate-spin' : ''} /> Reenviar código
          </button>
        </div>
      </div>
    </div>
  );
}
