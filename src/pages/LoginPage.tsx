import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { Button, Input } from '@/components/ui';
import { LogIn, Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((s) => s.signIn);
  const loading = useAuthStore((s) => s.loading);
  const user = useAuthStore((s) => s.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      navigate('/');
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
          <h1 className="text-3xl font-bold text-white">Bienvenido de vuelta</h1>
          <p className="text-sm text-zinc-500">
            Inicia sesión con tu cuenta del ecosistema KineByte
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="••••••••"
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

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <Button type="submit" fullWidth size="lg" disabled={loading} className="gap-2">
            {loading ? (
              <span className="animate-pulse">Iniciando sesión...</span>
            ) : (
              <>
                <LogIn size={18} /> Iniciar sesión
              </>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center space-y-3">
          <p className="text-sm text-zinc-500">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Crear cuenta
            </Link>
          </p>
          <p className="text-xs text-zinc-600">
            Tu cuenta funciona en la tienda y en el dashboard KineByte
          </p>
        </div>
      </div>
    </div>
  );
}
