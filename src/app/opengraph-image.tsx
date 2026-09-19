import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { BUSINESS } from '@/config/business';

/**
 * The default 1200x630 share card, generated at build time.
 *
 * The site previously pointed `og:image` at `/logo.png`, a square logo declared
 * as 1200x630. Facebook, WhatsApp, LinkedIn and X all letterbox or crop a
 * mismatched image, so shared links rendered as a small logo on grey. This is a
 * real landscape card: brand block on the left, product photograph on the right.
 *
 * Every route inherits this unless it defines its own opengraph-image.
 */

export const alt = 'Salasar Aluminium & Hardware — door and window hardware, Raipur';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Inlined as a data URI: satori cannot fetch relative URLs at build time. */
async function productPhoto(): Promise<string> {
  const buf = await readFile(join(process.cwd(), 'public', 'aluminium-door-kit-v1.png'));
  return `data:image/png;base64,${buf.toString('base64')}`;
}

export default async function OgImage() {
  const photo = await productPhoto();

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
        {/* Left: brand and positioning */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '660px',
            padding: '64px 48px 64px 64px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '28px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '14px',
                border: '3px solid #D4AF37',
                color: '#D4AF37',
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '1px',
              }}
            >
              SAH
            </div>
            <div
              style={{
                display: 'flex',
                color: '#D4AF37',
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              Raipur, Chhattisgarh
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              color: '#FFFFFF',
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-1.5px',
              marginBottom: '22px',
            }}
          >
            Aluminium Door &amp; Window Hardware
          </div>

          <div
            style={{
              display: 'flex',
              color: '#C3CEDC',
              fontSize: '26px',
              lineHeight: 1.4,
              marginBottom: '34px',
            }}
          >
            Rollers, locks, hinges, door kits, closers and shower fittings — 86 SKUs in the catalogue.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                background: '#B8860B',
                color: '#FFFFFF',
                fontSize: '24px',
                fontWeight: 700,
                padding: '14px 26px',
                borderRadius: '10px',
              }}
            >
              {BUSINESS.phones.primary.display}
            </div>
            <div style={{ display: 'flex', color: '#8FA3BC', fontSize: '22px' }}>
              salasaraluminium.shop
            </div>
          </div>
        </div>

        {/* Right: product photograph on a light panel */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '540px',
            height: '100%',
            background: '#F4F6F8',
            borderLeft: '8px solid #D4AF37',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" width={440} height={440} style={{ objectFit: 'contain' }} />
        </div>
      </div>
    ),
    size
  );
}
