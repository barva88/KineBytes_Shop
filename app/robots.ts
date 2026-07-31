import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/account/',
          '/checkout',
          '/cart',
          '/api/',
          '/admin/',
          '/payment/',
          '/payment-error',
          '/payment-pending',
          '/session-expired',
          '/logout',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/account/', '/checkout', '/api/'],
      },
    ],
    sitemap: 'https://shop.kinebytes.com/sitemap.xml',
    host: 'https://shop.kinebytes.com',
  };
}
