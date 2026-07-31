import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shop.kinebytes.com';
  const now = new Date();

  const staticRoutes = [
    '/',
    '/products',
    '/collections',
    '/collections/new',
    '/collections/offers',
    '/collections/bestsellers',
    '/compare',
    '/search',
    '/blog',
    '/cart',
    '/checkout',
    '/login',
    '/register',
    '/forgot-password',
    '/account',
    '/tracking',
    '/returns',
    '/help',
    '/faq',
    '/contact',
    '/terms',
    '/privacy',
    '/cookies',
    '/warranty',
    '/shipping-returns',
    '/security',
    '/legal-notice',
    '/accessibility',
    '/trust',
    '/about',
    '/careers',
    '/press',
    '/sustainability',
    '/partners',
    '/loyalty',
    '/gift-cards',
    '/coupons',
    '/app-download',
    '/reviews',
    '/sitemap-html',
  ];

  return staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route.startsWith('/products') ? 0.9 : 0.7,
  }));
}
