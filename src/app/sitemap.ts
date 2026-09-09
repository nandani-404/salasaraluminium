import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/jsonld';
import { products } from '@/lib/data/products';
import { getCombinationByIndex, TOTAL_PSEO_COMBINATIONS } from '@/lib/data/pseoData';

const TIER1_CITIES = ['raipur', 'bhilai', 'durg', 'bilaspur', 'korba', 'rajnandgaon'];
const TOTAL_CHUNKS = 20; // 20 chunks x 50,000 URLs = 1,000,000 URLs
const CHUNK_SIZE = 50000;

// Next.js App Router API: generateSitemaps creates a Sitemap Index at /sitemap.xml
export async function generateSitemaps() {
  const sitemaps = [];
  for (let i = 0; i < TOTAL_CHUNKS; i++) {
    sitemaps.push({ id: String(i) });
  }
  return sitemaps;
}

export default async function sitemap(props: {
  id: Promise<{ id: string }> | { id: string } | string;
}): Promise<MetadataRoute.Sitemap> {
  // Resolve id safely across Next.js versions
  let resolvedId = 0;
  if (props && props.id) {
    const rawId = props.id;
    if (typeof rawId === 'object' && rawId !== null) {
      if ('then' in rawId) {
        const awaited = await rawId;
        resolvedId = Number(awaited.id);
      } else if ('id' in rawId) {
        resolvedId = Number(rawId.id);
      }
    } else if (typeof rawId === 'string' || typeof rawId === 'number') {
      resolvedId = Number(rawId);
    }
  }

  if (isNaN(resolvedId)) {
    resolvedId = 0;
  }

  const startIndex = resolvedId * CHUNK_SIZE;
  const endIndex = Math.min(startIndex + CHUNK_SIZE, TOTAL_PSEO_COMBINATIONS);

  // Generate 50,000 pSEO entries deterministically for this chunk
  const pseoEntries: MetadataRoute.Sitemap = [];
  const currentDate = new Date();

  for (let i = startIndex; i < endIndex; i++) {
    const combo = getCombinationByIndex(i);
    pseoEntries.push({
      url: `${BASE_URL}/supplier/${combo.location.slug}/${combo.product.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });
  }

  // Chunk 0 includes core static website pages alongside the first batch
  if (resolvedId === 0) {
    const corePages = [
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

    const staticEntries = corePages.map(({ u, p, f, img }) => ({
      url: `${BASE_URL}${u}`,
      lastModified: currentDate,
      changeFrequency: f,
      priority: p,
      images: img ? [`${BASE_URL}${img}`] : undefined,
    }));

    const cityPages = TIER1_CITIES.map((city) => ({
      url: `${BASE_URL}/locations/${city}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: [`${BASE_URL}/trade-warehouse.png`],
    }));

    const productPages = products.map((p) => ({
      url: `${BASE_URL}/product/${p.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: p.images.map((img) => (img.startsWith('http') ? img : `${BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`)),
    }));

    return [...staticEntries, ...cityPages, ...productPages, ...pseoEntries];
  }

  return pseoEntries;
}
