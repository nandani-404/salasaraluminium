'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { GA_MEASUREMENT_ID, track, type LeadEvent } from '@/lib/analytics';

/**
 * GA4 loader plus a single delegated click listener for lead events.
 *
 * Call and WhatsApp links are scattered across the header, footer, hero, city
 * pages, category pages, product pages, hubs and the mobile action bar. Rather
 * than attach an onClick to each one — which would force otherwise-static
 * Server Components into client bundles — every such link carries
 * `data-analytics="click_call"` (or `click_whatsapp`), and one listener on the
 * document turns those into GA4 events.
 *
 * Optional attributes read alongside it:
 *   data-analytics-sku       the SA code, for quote_request_sku
 *   data-analytics-location  where on the page the click came from
 *
 * The GA4 script only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set, so
 * development and preview builds ship no tracking at all.
 */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>('[data-analytics]');
      if (!el) return;

      const event = el.dataset.analytics as LeadEvent | undefined;
      if (!event) return;

      track(event, {
        sku: el.dataset.analyticsSku,
        location: el.dataset.analyticsLocation,
        link_url: el instanceof HTMLAnchorElement ? el.href : undefined,
      });
    };

    // Capture phase: a tel: or wa.me link hands off to the OS immediately, and
    // on some mobile browsers the page is backgrounded before a bubbled
    // listener runs, losing the event.
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
