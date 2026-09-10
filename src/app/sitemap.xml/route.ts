import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/jsonld';
import { TOTAL_PSEO_COMBINATIONS } from '@/lib/data/pseoData';

const CHUNK_SIZE = 45000;
const TOTAL_CHUNKS = Math.ceil(TOTAL_PSEO_COMBINATIONS / CHUNK_SIZE);

export async function GET() {
  const sitemaps = Array.from({ length: TOTAL_CHUNKS }, (_, i) => `${BASE_URL}/sitemaps/sitemap/${i}.xml`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `  <sitemap>
    <loc>${url}</loc>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
