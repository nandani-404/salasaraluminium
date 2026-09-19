import type { Metadata } from 'next';
import { SEGMENTS, CATEGORIES, type Segment } from '@/lib/data/products';
import { buildMetadata, truncateTitle, clampDescription } from '@/lib/seo/metadata';

/**
 * This route's page is a Client Component (it holds filter and sort state), so
 * it cannot export metadata. Supplying it from the layout means these URLs get
 * a unique title, description and self-referencing canonical — previously they
 * had none of the three and inherited the layout defaults, leaving every
 * segment-category URL sharing the homepage title.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string; category: string }>;
}): Promise<Metadata> {
  const { segment, category } = await params;
  const seg = SEGMENTS[segment as Segment];
  const cat = CATEGORIES.find((c) => c.slug === category && c.segment === segment);

  if (!seg || !cat) return {};

  return buildMetadata({
    title: truncateTitle(`${cat.label} for ${seg.label} | Salasar Raipur`),
    description: clampDescription(
      `${cat.label} for ${seg.label.toLowerCase()} projects, supplied from our Raipur counter across Chhattisgarh. Call or WhatsApp with your item list for a quote.`
    ),
    path: `/${segment}/${category}`,
  });
}

export default function SegmentCategoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
