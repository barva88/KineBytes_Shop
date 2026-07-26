import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ProductListPage } from '@/pages/ProductListPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderSuccessPage } from '@/pages/OrderSuccessPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Secondary pages
import { HelpCenterPage } from '@/pages/HelpCenterPage';
import { ContactPage } from '@/pages/ContactPage';
import { ShippingReturnsPage } from '@/pages/ShippingReturnsPage';
import { WarrantyPage } from '@/pages/WarrantyPage';
import { FaqPage } from '@/pages/FaqPage';
import { BlogPage } from '@/pages/BlogPage';
import { TermsPage } from '@/pages/TermsPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { CookiesPage } from '@/pages/CookiesPage';
import { ApiDocsPage } from '@/pages/ApiDocsPage';
import { WearOsPage } from '@/pages/WearOsPage';

function AppRoutes() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Support & Secondary Routes */}
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/faq" element={<FaqPage />} />

        {/* Ecosystem Routes */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/docs" element={<ApiDocsPage />} />
        <Route path="/wear-os" element={<WearOsPage />} />

        {/* Legal Routes */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cookies" element={<CookiesPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
