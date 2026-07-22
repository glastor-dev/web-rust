import { MetadataRoute } from 'next';
import { DUMMY_PRODUCTS, Product } from '@/lib/constants/dummyProducts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://glastor.es';

  // Static routes
  const routes = ['', '/tienda', '/nosotros', '/checkout'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic products
  const productRoutes = DUMMY_PRODUCTS.map((product: Product) => ({
    url: `${baseUrl}/tienda/${product.id}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  return [...routes, ...productRoutes];
}
