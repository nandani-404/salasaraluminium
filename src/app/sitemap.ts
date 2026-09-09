import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/jsonld';
import { FULL_CATALOGUE_PRODUCTS } from '@/lib/sahData';
import { products } from '@/lib/data/products';

const TIER1_CITIES = ['raipur', 'bhilai', 'durg', 'bilaspur', 'korba', 'rajnandgaon'];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { u: '', p: 1.0, f: 'weekly' as const, img: '/logo.png' },
    { u: '/products', p: 0.9, f: 'weekly' as const, img: '/cat-rollers.png' },
    { u: '/contact', p: 0.9, f: 'monthly' as const, img: '/salasar-store-main.png' },
    { u: '/wholesale', p: 0.9, f: 'weekly' as const, img: '/wholesale-hub.png' },
    { u: '/locations', p: 0.8, f: 'weekly' as const, img: '/trade-warehouse.png' },
    { u: '/industries-we-serve', p: 0.7, f: 'monthly' as const, img: '/hardware-showcase-bg.png' },
    { u: '/about', p: 0.6, f: 'monthly' as const, img: '/salasar-storefront.png' },
    { u: '/why-choose-us', p: 0.6, f: 'monthly' as const, img: '/fabricator-workshop.jpg' },
    { u: '/faq', p: 0.6, f: 'monthly' as const },
    { u: '/blog', p: 0.7, f: 'weekly' as const },
    { u: '/llms.txt', p: 0.5, f: 'monthly' as const },
  ];

  const staticEntries = pages.map(({ u, p, f, img }) => ({
    url: `${BASE_URL}${u}`,
    lastModified: new Date(),
    changeFrequency: f,
    priority: p,
    images: img ? [`${BASE_URL}${img}`] : undefined,
  }));

  const cityPages = TIER1_CITIES.map((city) => ({
    url: `${BASE_URL}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    images: [`${BASE_URL}/trade-warehouse.png`],
  }));

  const productPages = products.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    images: p.images.map((img) => (img.startsWith('http') ? img : `${BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`)),
  }));

  return [...staticEntries, ...cityPages, ...productPages];
}
