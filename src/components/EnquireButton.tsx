'use client';

import { useEnquiry } from '@/context/EnquiryContext';

/**
 * Small client island so pages that only need the enquiry modal can stay
 * Server Components. The homepage was `'use client'` in its entirety purely to
 * call `openEnquiryModal`, which pushed the whole page — including all its
 * copy, product names and links — into a client bundle.
 */
export default function EnquireButton({
  sku,
  className,
  children,
  analyticsLocation,
}: {
  sku?: string;
  className?: string;
  children: React.ReactNode;
  analyticsLocation?: string;
}) {
  const { openEnquiryModal } = useEnquiry();

  return (
    <button
      type="button"
      onClick={() => openEnquiryModal(sku)}
      data-analytics="quote_request_sku"
      data-analytics-sku={sku}
      data-analytics-location={analyticsLocation}
      className={className}
    >
      {children}
    </button>
  );
}
