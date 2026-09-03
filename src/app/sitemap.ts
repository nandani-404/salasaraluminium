import { MetadataRoute } from 'next';
import { SAH_CATEGORIES, FULL_CATALOGUE_PRODUCTS } from '@/lib/sahData';
import { BASE_URL } from '@/lib/jsonld';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/products',
    '/wholesale',
    '/contact',
    '/blog',
    '/llms.txt',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Category anchor routes
  const categoryRoutes = SAH_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/products#${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...categoryRoutes];
}
