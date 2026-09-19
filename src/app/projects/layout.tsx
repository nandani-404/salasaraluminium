import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * The page itself is a Client Component, which cannot export metadata, so it
 * is supplied from this layout instead.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Project Types We Supply | Salasar Raipur',
  description:
    'Residential, commercial and industrial project types we supply door and window hardware for across Chhattisgarh, and which categories each one draws on.',
  path: '/projects',
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
