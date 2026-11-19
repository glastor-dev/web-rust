import type { MetadataRoute } from 'next';
import { TECH_ARTICLES } from '@/data/articles.data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://glastor.es';

  // Rutas activas de Glastor (Consultora e Ingeniería de Software en Rust)
  const routes = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { route: '/servicios', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/proyectos', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/nosotros', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: '/arquitectura', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: '/recursos', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/legales', priority: 0.5, changeFrequency: 'yearly' as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map(
    ({ route, priority, changeFrequency }) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency,
      priority,
    }),
  );

  const articleEntries: MetadataRoute.Sitemap = TECH_ARTICLES.map((article) => ({
    url: `${baseUrl}/recursos/${article.id}`,
    lastModified: article.isoDate,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...articleEntries];
}
