import Link from 'next/link';
import { ArrowLeft, MapPin, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = { title: 'Mis Direcciones — KineBytes Shop' };

const MOCK_ADDRESSES = [
  { id: '1', name: 'Casa', recipient: 'Juan Torres', line1: 'Av. Insurgentes Sur 1234', city: 'Ciudad de México', cp: '06600', phone: '+52 55 1234 5678', default: true },
  { id: '2', name: 'Oficina', recipient: 'Juan Torres', line1: 'Paseo de la Reforma 400', city: 'Ciudad de México', cp: '06600', phone: '+52 55 9876 5432', default: false },
];

export default function AddressesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/account" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors"><ArrowLeft size={16} /> Mi Cuenta</Link>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><MapPin size={22} /></div>
          <h1 className="text-2xl font-bold text-white">Mis Direcciones</h1>
        </div>
        <Button className="gap-2"><Plus size={16} /> Nueva dirección</Button>
      </div>
      <div className="space-y-4">
        {MOCK_ADDRESSES.map(addr => (
          <div key={addr.id} className={`p-6 bg-kb-card border rounded-2xl ${addr.default ? 'border-emerald-500/30' : 'border-zinc-800'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{addr.name}</span>
                {addr.default && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">Predeterminada</span>}
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-zinc-500 hover:text-white transition-colors"><Pencil size={15} /></button>
                <button className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
              </div>
            </div>
            <p className="text-sm text-zinc-400">{addr.recipient}</p>
            <p className="text-sm text-zinc-400">{addr.line1}</p>
            <p className="text-sm text-zinc-400">{addr.city}, CP {addr.cp}</p>
            <p className="text-sm text-zinc-500 mt-1">{addr.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
