import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://glastor.es';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/checkout', '/cuenta', '/tienda', '/glastor-sys-admin'],
      },
      {
        // Directivas para crawlers de IA si se desea bloquear scraping indiscriminado
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended'],
        disallow: ['/glastor-sys-admin', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
