import { notFound, permanentRedirect } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { findProductByAnySlug } from '@/lib/productAdapter';

/**
 * This route used to render a full product page for the showcase range, which
 * meant those products were reachable at BOTH `/products/<category>/<slug>` and
 * `/product/<slug>` with near-identical content — genuine duplicate content
 * competing with itself.
 *
 * `/product/<slug>` is the canonical product URL (it is the one already
 * indexed, already in the sitemap and already carrying schema), so this path
 * now permanently redirects there instead of rendering. Nothing 404s; the
 * duplication is gone.
 *
 * Next.js `permanentRedirect()` emits a 308, the method-preserving equivalent
 * of a 301. Search engines treat both identically for canonicalisation.
 */

export async function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    category: prod.category,
    slug: prod.slug,
  }));
}

export default async function LegacyProductDetailRedirect({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const match = findProductByAnySlug(slug);

  if (!match) {
    notFound();
  }

  permanentRedirect(`/product/${match.canonicalSlug}`);
}
