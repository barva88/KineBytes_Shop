import Link from 'next/link';
import { STORE_NAME, STORE_TAGLINE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-kb-black pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">KB</span>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-white">KineBytes</p>
            </Link>
            <p className="text-sm text-zinc-400 mt-4 leading-relaxed">{STORE_TAGLINE}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Tienda</h3>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Todos los Productos</Link></li>
              <li><Link href="/products?category=interactive-hardware" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Hardware Interactivo</Link></li>
              <li><Link href="/products?category=sensors" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Sensores</Link></li>
              <li><Link href="/products?category=software" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Software</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Soporte</h3>
            <ul className="space-y-4">
              <li><Link href="/help" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Centro de Ayuda</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Contacto</Link></li>
              <li><Link href="/shipping-returns" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Envíos y Devoluciones</Link></li>
              <li><Link href="/faq" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/terms" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Términos de Servicio</Link></li>
              <li><Link href="/privacy" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/warranty" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Garantía</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8 text-center md:flex md:items-center md:justify-between md:text-left">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} {STORE_NAME}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
