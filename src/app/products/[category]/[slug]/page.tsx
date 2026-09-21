import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/data';
import JsonLd from '@/components/JsonLd';
import { getProductSchema, getBreadcrumbSchema } from '@/lib/jsonld';
import ProductDetailClient from './ProductDetailClient';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { buildMetadata, truncateTitle, clampDescription } from '@/lib/seo/metadata';

export async function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    category: prod.category,
    slug: prod.slug,
  }));
}

/*
 * NOTE ON WHY THIS ROUTE STILL RENDERS.
 *
 * It was briefly converted to a 308 redirect to /product/<slug> on the
 * assumption that these products were also served there, making the two paths
 * duplicate content. That was wrong: this route is generated from `PRODUCTS`
 * in lib/data.ts, while /product/[slug] resolves against `products` in
 * lib/data/products.ts plus the 86-SKU catalogue. The two sets are disjoint,
 * so the redirect 404'd all eight of these URLs. It renders again.
 *
 * [CONFIRM] These eight describe curtain wall mullions, T-slot profiles and
 * solar mounting rails — a different business from door and window hardware.
 * See SEO-CONFIRM.md item 2 before deciding whether they should exist at all.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);
  if (!product) return {};

  // Previously returned a mid-word truncated title, no canonical and no
  // Open Graph block, so these pages advertised the homepage URL when shared.
  return buildMetadata({
    title: truncateTitle(`${product.name} | Salasar Raipur`),
    description: clampDescription(
      `${product.shortDescription} Supplied from Raipur, Chhattisgarh. Call or WhatsApp for specifications and a quote.`
    ),
    path: `/products/${product.category}/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // This legacy Product shape carries no SKU field, so the record id stands in
  // as the identifier. getProductSchema emits no offers and no rating.
  const productSchema = getProductSchema({
    name: product.name,
    sku: product.id,
    slug: product.slug,
    category: product.category,
    shortDescription: product.shortDescription,
    image: product.image,
    finishes: product.availableFinishes,
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Products', item: '/products' },
    { name: product.category, item: `/products/${product.category}` },
    { name: product.name, item: `/products/${product.category}/${product.slug}` },
  ]);

  return (
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-white min-h-screen">
      <JsonLd schema={productSchema} />
      <JsonLd schema={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href={`/products/${product.category}`}
          className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-[#22262A] mb-6 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {product.category} profiles</span>
        </Link>

        {/* Client Interactive Detail View */}
        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}
