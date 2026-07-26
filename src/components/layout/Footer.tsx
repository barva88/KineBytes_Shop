import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-kb-surface mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold tracking-[0.3em] text-emerald-400">
                KB
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-white">KineBytes</p>
                <p className="text-[10px] text-zinc-500 tracking-wider">SHOP</p>
              </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Hardware atlético inteligente y software de análisis para equipos y academias de alto rendimiento.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Categorías</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Soporte</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Centro de Ayuda', href: '/help' },
                { label: 'Contacto', href: '/contact' },
                { label: 'Envíos y Devoluciones', href: '/shipping-returns' },
                { label: 'Garantía', href: '/warranty' },
                { label: 'FAQ', href: '/faq' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Ecosistema KineByte</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Dashboard KineByte', href: 'https://kinebytes.com', external: true },
                { label: 'Documentación API', href: '/docs' },
                { label: 'App WearOS', href: '/wear-os' },
                { label: 'Blog', href: '/blog' },
              ].map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                      {item.label} ↗
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © 2026 KineByte. Todos los derechos reservados. Tienda B2C del ecosistema KineByte.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Términos', href: '/terms' },
              { label: 'Privacidad', href: '/privacy' },
              { label: 'Cookies', href: '/cookies' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
