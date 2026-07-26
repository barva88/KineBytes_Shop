import { Link } from 'react-router-dom';
import { X, Home, ShoppingBag, Cpu, Radio, Code2, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuLinks = [
  { label: 'Inicio', href: '/', icon: Home },
  { label: 'Todos los Productos', href: '/products', icon: ShoppingBag },
  { label: 'Hardware Interactivo', href: '/products?category=interactive-hardware', icon: Cpu },
  { label: 'Sensores', href: '/products?category=sensors', icon: Radio },
  { label: 'Software', href: '/products?category=software', icon: Code2 },
  { label: 'Accesorios', href: '/products?category=accessories', icon: Wrench },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-kb-surface border-r border-zinc-800 animate-slide-in-right flex flex-col"
           style={{ animationName: 'slideInLeft' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold tracking-[0.3em] text-emerald-400">
              KB
            </span>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">KineBytes</span>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-5 py-3.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all'
                )}
              >
                <Icon size={18} className="text-zinc-500" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-5">
          <p className="text-xs text-zinc-600">© 2026 KineByte — Smart Athletic Tech</p>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
