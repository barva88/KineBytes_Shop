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
              <li><Link href="/collections" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Colecciones</Link></li>
              <li><Link href="/collections/new" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Novedades</Link></li>
              <li><Link href="/collections/bestsellers" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Más Vendidos</Link></li>
              <li><Link href="/collections/offers" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Ofertas</Link></li>
              <li><Link href="/compare" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Comparador</Link></li>
              <li><Link href="/gift-cards" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Gift Cards</Link></li>
              <li><Link href="/reviews" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Reseñas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Soporte</h3>
            <ul className="space-y-4">
              <li><Link href="/help" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Centro de Ayuda</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Contacto</Link></li>
              <li><Link href="/faq" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Envíos y Devoluciones</Link></li>
              <li><Link href="/returns" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Solicitar Devolución</Link></li>
              <li><Link href="/tracking" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Rastrear Pedido</Link></li>
              <li><Link href="/loyalty" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Programa de Lealtad</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Empresa</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="/blog" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Sala de Prensa</Link></li>
              <li><Link href="/sustainability" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Sostenibilidad</Link></li>
              <li><Link href="/partners" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Partners</Link></li>
              <li><Link href="/app-download" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">App KineBytes</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} {STORE_NAME}. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-4 text-xs text-zinc-600">
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">Términos</Link>
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacidad</Link>
            <Link href="/cookies" className="hover:text-zinc-400 transition-colors">Cookies</Link>
            <Link href="/security" className="hover:text-zinc-400 transition-colors">Seguridad</Link>
            <Link href="/legal-notice" className="hover:text-zinc-400 transition-colors">Aviso Legal</Link>
            <Link href="/accessibility" className="hover:text-zinc-400 transition-colors">Accesibilidad</Link>
            <Link href="/sitemap-html" className="hover:text-zinc-400 transition-colors">Mapa del Sitio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
