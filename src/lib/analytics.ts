/**
 * GA4 event helper.
 *
 * Calls are no-ops when GA4 is not configured or not yet loaded, so tracking
 * can be wired into components unconditionally and nothing breaks in
 * development, in tests, or for a visitor running an ad blocker.
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

/** The four conversion events that matter for this business. */
export type LeadEvent =
  /** Tap or click on a tel: link. */
  | 'click_call'
  /** Tap or click on a wa.me link. */
  | 'click_whatsapp'
  /** Quote form submitted successfully. */
  | 'form_submit'
  /** Enquiry opened for a specific SKU. */
  | 'quote_request_sku';

export function track(event: LeadEvent, params: GtagParams = {}) {
  if (typeof window === 'undefined') return;

  const payload: GtagParams = {
    // Always attach the page the lead came from — a call from a category page
    // and a call from a product page are different signals about what works.
    page_path: window.location.pathname,
    ...params,
  };

  // Drop undefined keys so GA4 reports do not show empty dimensions.
  for (const key of Object.keys(payload)) {
    if (payload[key] === undefined) delete payload[key];
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
    return;
  }

  // GA4 not loaded yet (or blocked): queue on dataLayer if the stub exists,
  // otherwise drop silently rather than throw.
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload });
  }
}
