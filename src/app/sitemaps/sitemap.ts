import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/jsonld';
import { products } from '@/lib/data/products';
import { getCombinationByIndex, TOTAL_PSEO_COMBINATIONS } from '@/lib/data/pseoData';

const TIER1_CITIES = ['raipur', 'bhilai', 'durg', 'bilaspur', 'korba', 'rajnandgaon'];
const CHUNK_SIZE = 45000; // 45,000 URLs per chunk ensures every sitemap stays strictly under Google's 50,000 limit
const TOTAL_CHUNKS = Math.ceil(TOTAL_PSEO_COMBINATIONS / CHUNK_SIZE);

// Next.js App Router API: generateSitemaps creates chunked sitemaps at /sitemaps/[id].xml
export async function generateSitemaps() {
  const sitemaps = [];
  for (let i = 0; i < TOTAL_CHUNKS; i++) {
    sitemaps.push({ id: String(i) });
  }
  return sitemaps;
}

function escapeXmlUrl(url: string): string {
  if (!url) return '';
  return url
    .replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function sitemap(props: {
  id?: Promise<{ id: string } | string> | { id: string } | string;
}): Promise<MetadataRoute.Sitemap> {
  // Resolve id safely across Next.js 16+ (which passes Promise<string>) and legacy versions
  let resolvedId = 0;
  if (props && props.id !== undefined) {
    const rawId = await props.id;
    if (typeof rawId === 'object' && rawId !== null && 'id' in rawId) {
      resolvedId = Number((rawId as { id: string }).id);
    } else {
      resolvedId = Number(rawId);
    }
  }

  if (isNaN(resolvedId)) {
    resolvedId = 0;
  }

  const startIndex = resolvedId * CHUNK_SIZE;
  const endIndex = Math.min(startIndex + CHUNK_SIZE, TOTAL_PSEO_COMBINATIONS);

  // Generate 45,000 pSEO entries deterministically for this chunk
  const pseoEntries: MetadataRoute.Sitemap = [];
  const currentDate = new Date();

  for (let i = startIndex; i < endIndex; i++) {
    const combo = getCombinationByIndex(i);
    pseoEntries.push({
      url: escapeXmlUrl(`${BASE_URL}/supplier/${combo.location.slug}/${combo.product.slug}`),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });
  }

  // Chunk 0 includes core static website pages alongside the first batch
  if (resolvedId === 0) {
    const corePages = [
      { u: '', p: 1.0, f: 'weekly' as const },
      { u: '/products', p: 0.9, f: 'weekly' as const },
      { u: '/contact', p: 0.9, f: 'monthly' as const },
      { u: '/wholesale', p: 0.9, f: 'weekly' as const },
      { u: '/locations', p: 0.8, f: 'weekly' as const },
      { u: '/industries-we-serve', p: 0.7, f: 'monthly' as const },
      { u: '/about', p: 0.6, f: 'monthly' as const },
      { u: '/why-choose-us', p: 0.6, f: 'monthly' as const },
      { u: '/faq', p: 0.6, f: 'monthly' as const },
      { u: '/blog', p: 0.7, f: 'weekly' as const },
      { u: '/llms.txt', p: 0.5, f: 'monthly' as const },
    ];

    const staticEntries = corePages.map(({ u, p, f }) => ({
      url: escapeXmlUrl(`${BASE_URL}${u}`),
      lastModified: currentDate,
      changeFrequency: f,
      priority: p,
    }));

    const cityPages = TIER1_CITIES.map((city) => ({
      url: escapeXmlUrl(`${BASE_URL}/locations/${city}`),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const productPages = products.map((p) => ({
      url: escapeXmlUrl(`${BASE_URL}/product/${p.slug}`),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticEntries, ...cityPages, ...productPages, ...pseoEntries];
  }

  return pseoEntries;
}
