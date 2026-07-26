import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { Button, Input } from '@/components/ui';
import { UserPlus, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const signUp = useAuthStore((s) => s.signUp);
  const loading = useAuthStore((s) => s.loading);
  const user = useAuthStore((s) => s.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (user) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const result = await signUp(name, email, password);
    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(result.success);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-2">
            <span className="text-sm font-bold tracking-[0.3em] text-emerald-400">KB</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Crear cuenta</h1>
          <p className="text-sm text-zinc-500">
            Una cuenta, todo el ecosistema KineByte
          </p>
        </div>

        {success ? (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center space-y-4">
            <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
            <p className="text-sm text-emerald-300">{success}</p>
            <Link to="/login">
              <Button variant="outline" className="gap-2 mt-2">
                Ir a iniciar sesión
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nombre completo"
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Correo electrónico"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Input
              label="Confirmar contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="Repite la contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button type="submit" fullWidth size="lg" disabled={loading} className="gap-2">
              {loading ? (
                <span className="animate-pulse">Creando cuenta...</span>
              ) : (
                <>
                  <UserPlus size={18} /> Crear cuenta
                </>
              )}
            </Button>
          </form>
        )}

        {/* Footer */}
        <div className="text-center space-y-3">
          <p className="text-sm text-zinc-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Iniciar sesión
            </Link>
          </p>
          <p className="text-xs text-zinc-600">
            Al crear tu cuenta, aceptas los términos de servicio y la política de privacidad
          </p>
        </div>
      </div>
    </div>
  );
}
