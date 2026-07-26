import { Code2, Terminal } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

export function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="info" className="gap-1">
          <Code2 size={14} /> Desarrolladores
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Documentación de la <span className="gradient-text">API</span> KineByte
        </h1>
        <p className="text-zinc-400 text-base">
          Conecta tus dispositivos interactivos, conos ESP32 y sensores a nuestro backend en tiempo real vía WebSocket y REST API.
        </p>
      </div>

      <Card className="p-8 space-y-6 font-mono text-sm">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <span className="text-emerald-400 font-bold flex items-center gap-2">
            <Terminal size={18} /> REST API v2 Endpoint
          </span>
          <Badge variant="success">Online</Badge>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-sans">Autenticación</p>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
              Authorization: Bearer &lt;SUPABASE_JWT_TOKEN&gt;
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-sans">Obtener Dispositivos Activos</p>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-300">
              GET https://snpzrxgeauilbyqzqjtb.supabase.co/rest/v1/devices
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
