import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getCategory, productsInCategory } from '@/data/products';
import { BUSINESS } from '@/config/business';

/**
 * Per-category 1200x630 share card, showing that category's own product
 * photograph and item count rather than the generic site-wide card.
 */

export const alt = 'Salasar Aluminium & Hardware category';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateImageMetadata({ params }: { params: { category: string } }) {
  const cat = getCategory(params.category);
  return [
    {
      id: 'default',
      size,
      alt: cat ? `${cat.name} — Salasar Aluminium & Hardware, Raipur` : alt,
      contentType,
    },
  ];
}

/**
 * Reads a public/ image as a data URI. Returns null when the category's image
 * is a remote URL or the file is missing, so the card degrades to text rather
 * than failing the build.
 */
async function localPhoto(src: string | undefined): Promise<string | null> {
  if (!src || src.startsWith('http')) return null;
  try {
    const file = decodeURIComponent(src.replace(/^\//, ''));
    const buf = await readFile(join(process.cwd(), 'public', file));
    const ext = file.split('.').pop()?.toLowerCase();
    const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
    return `data:${mime};base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
}

export default async function CategoryOgImage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  const items = cat ? productsInCategory(cat.slug) : [];

  // Prefer a real product shot from inside the category over the category
  // banner, which is sometimes a stock photo.
  const photo = (await localPhoto(items[0]?.image)) ?? (await localPhoto(cat?.image));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0B1F3A',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: photo ? '680px' : '1200px',
            padding: '64px',
          }}
        >
          <div
            style={{
              display: 'flex',
              color: '#D4AF37',
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Salasar Aluminium &amp; Hardware · Raipur
          </div>

          <div
            style={{
              display: 'flex',
              color: '#FFFFFF',
              fontSize: '60px',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              marginBottom: '24px',
            }}
          >
            {cat?.name ?? 'Hardware Catalogue'}
          </div>

          <div
            style={{
              display: 'flex',
              color: '#C3CEDC',
              fontSize: '26px',
              lineHeight: 1.4,
              marginBottom: '32px',
            }}
          >
            {items.length > 0
              ? `${items.length} items · ${cat?.codePrefix ?? ''}`
              : 'Door and window hardware, Chhattisgarh'}
          </div>

          <div
            style={{
              display: 'flex',
              background: '#B8860B',
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 700,
              padding: '14px 26px',
              borderRadius: '10px',
              alignSelf: 'flex-start',
            }}
          >
            {BUSINESS.phones.primary.display}
          </div>
        </div>

        {photo && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '520px',
              height: '100%',
              background: '#F4F6F8',
              borderLeft: '8px solid #D4AF37',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="" width={420} height={420} style={{ objectFit: 'contain' }} />
          </div>
        )}
      </div>
    ),
    size
  );
}
