import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://glastor.es';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/checkout', '/cuenta'],
      },
      {
        // Enforce directives for AI model crawlers
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended'],
        disallow: ['/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
