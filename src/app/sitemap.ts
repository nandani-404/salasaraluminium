import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/jsonld';
import { BLOG_POSTS } from '@/lib/data';
import { products } from '@/lib/data/products';
import { SAH_CATEGORIES, FULL_CATALOGUE_PRODUCTS } from '@/lib/sahData';
import { getCombinationByIndex } from '@/lib/data/pseoData';
import { getSAHProductSlug } from '@/lib/productAdapter';

// Top High-Intent Trade Cities in Chhattisgarh & Central India
const TOP_TRADE_CITIES = [
  'raipur', 'bhilai', 'durg', 'bilaspur', 'korba', 'rajnandgaon',
  'jagdalpur', 'ambikapur', 'raigarh', 'nagpur', 'pune', 'mumbai',
  'indore', 'bhopal', 'jabalpur', 'rourkela', 'sambalpur'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // 1. Core Static Pages (14 URLs)
  const staticPages = [
    '', '/products', '/contact', '/wholesale', '/locations',
    '/industries-we-serve', '/about', '/why-choose-us', '/faq',
    '/blog', '/projects', '/finishes', '/cart', '/checkout'
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }));

  // 2. Hardware Category Hubs (12 URLs)
  const categoryPages = SAH_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/products/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. City Location Hubs (17 URLs)
  const cityPages = TOP_TRADE_CITIES.map((city) => ({
    url: `${BASE_URL}/locations/${city}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 4. Showcase Product Detail Pages (12 URLs)
  const showcaseProductPages = products.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 5. Full Catalogue Hardware Items (86 URLs with canonical SEO slugs)
  const catalogueProductPages = FULL_CATALOGUE_PRODUCTS.map((p) => ({
    url: `${BASE_URL}/product/${getSAHProductSlug(p)}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));


  // 6. Blog Technical Guides (8 URLs)
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 7. Curated High-Intent Trade Supplier Pages (115 URLs)
  const supplierPages = Array.from({ length: 115 }, (_, i) => {
    const combo = getCombinationByIndex(i * 12);
    return {
      url: `${BASE_URL}/supplier/${combo.location.slug}/${combo.product.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  return [
    ...staticPages,
    ...categoryPages,
    ...cityPages,
    ...showcaseProductPages,
    ...catalogueProductPages,
    ...blogPages,
    ...supplierPages,
  ];
}
