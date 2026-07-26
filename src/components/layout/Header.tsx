import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut } from 'lucide-react';
import { useCartStore, useCartItemCount } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = useCartItemCount();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass glass-border">
        {/* Top bar - Promo */}
        <div className="bg-emerald-500 text-black text-center py-1.5 px-4 text-xs font-semibold tracking-wide">
          🚀 Envío gratis en pedidos superiores a $200 — Tecnología atlética de alto rendimiento
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold tracking-[0.3em] text-emerald-400">
                KB
              </span>
              <div className="hidden sm:block">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-white">KineBytes</p>
                <p className="text-[10px] text-zinc-500 tracking-wider">SHOP</p>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-1 ml-8">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Productos', href: '/products' },
                { label: 'Hardware', href: '/products?category=interactive-hardware' },
                { label: 'Sensores', href: '/products?category=sensors' },
                { label: 'Software', href: '/products?category=software' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition-all"
                />
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Mobile search */}
              <Link
                to="/products"
                className="md:hidden p-2.5 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
                aria-label="Search"
              >
                <Search size={20} />
              </Link>

              {/* Favorites */}
              <Link
                to="/products"
                className="p-2.5 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
                aria-label="Favorites"
              >
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black animate-scale-in">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Auth */}
              {user ? (
                <div className="flex items-center gap-1 ml-1">
                  <Link
                    to="/products"
                    className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
                  >
                    <div className="h-7 w-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <span className="text-xs font-semibold text-emerald-400">
                        {(user.user_metadata?.name as string)?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="max-w-[100px] truncate">
                      {(user.user_metadata?.name as string) || user.email?.split('@')[0]}
                    </span>
                  </Link>
                  <button
                    onClick={signOut}
                    className="p-2.5 text-zinc-500 hover:text-red-400 transition-colors rounded-lg hover:bg-zinc-800/50"
                    title="Cerrar sesión"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 ml-1 px-4 py-2 text-sm font-medium text-black bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-colors"
                >
                  <User size={16} />
                  <span className="hidden sm:inline">Ingresar</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
