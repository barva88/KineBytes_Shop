import Link from 'next/link';
import { Map } from 'lucide-react';

export const metadata = { title: 'Mapa del Sitio — KineBytes Shop' };

const SITEMAP = [
  {
    title: 'Tienda',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Todos los Productos', href: '/products' },
      { label: 'Colecciones', href: '/collections' },
      { label: 'Novedades', href: '/collections/new' },
      { label: 'Más Vendidos', href: '/collections/bestsellers' },
      { label: 'Ofertas', href: '/collections/offers' },
      { label: 'Comparador', href: '/compare' },
      { label: 'Gift Cards', href: '/gift-cards' },
      { label: 'Cupones', href: '/coupons' },
    ],
  },
  {
    title: 'Cuenta',
    links: [
      { label: 'Iniciar Sesión', href: '/login' },
      { label: 'Registrarse', href: '/register' },
      { label: 'Mi Cuenta', href: '/account' },
      { label: 'Mis Pedidos', href: '/account/orders' },
      { label: 'Mis Direcciones', href: '/account/addresses' },
      { label: 'Métodos de Pago', href: '/account/payment-methods' },
      { label: 'Lista de Deseos', href: '/account/wishlist' },
      { label: 'Notificaciones', href: '/account/notifications' },
      { label: 'Perfil', href: '/account/profile' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Centro de Ayuda', href: '/help' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Devoluciones', href: '/returns' },
      { label: 'Estado de Devolución', href: '/returns/status' },
      { label: 'Rastreo de Envío', href: '/tracking' },
      { label: 'Reseñas', href: '/reviews' },
    ],
  },
  {
    title: 'Legal & Políticas',
    links: [
      { label: 'Términos de Servicio', href: '/terms' },
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Garantía', href: '/warranty' },
      { label: 'Envíos y Devoluciones', href: '/shipping-returns' },
      { label: 'Seguridad', href: '/security' },
      { label: 'Aviso Legal', href: '/legal-notice' },
      { label: 'Accesibilidad', href: '/accessibility' },
      { label: 'Sellos de Confianza', href: '/trust' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nosotros', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Prensa', href: '/press' },
      { label: 'Sostenibilidad', href: '/sustainability' },
      { label: 'Partners', href: '/partners' },
      { label: 'Programa de Lealtad', href: '/loyalty' },
      { label: 'Blog', href: '/blog' },
      { label: 'App Móvil', href: '/app-download' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400"><Map size={22} /></div>
        <h1 className="text-3xl font-bold text-white">Mapa del Sitio</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SITEMAP.map(section => (
          <div key={section.title}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors hover:underline">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
