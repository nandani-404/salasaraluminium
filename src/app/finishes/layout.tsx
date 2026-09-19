import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * The page itself is a Client Component, which cannot export metadata, so it
 * is supplied from this layout instead.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Hardware Finishes & Colours | Salasar Raipur',
  description:
    'Finishes we stock across door and window hardware: matte black, brown, champion, CP chrome, ivory, white and gold. See what is available before you order.',
  path: '/finishes',
});

export default function FinishesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
