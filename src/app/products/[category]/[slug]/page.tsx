import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/data';
import JsonLd from '@/components/JsonLd';
import { getProductSchema, getBreadcrumbSchema } from '@/lib/jsonld';
import ProductDetailClient from './ProductDetailClient';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    category: prod.category,
    slug: prod.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);
  if (!product) return {};

  return {
    title: `${product.name} | Architectural Extrusion Specs`,
    description: product.shortDescription,
  };
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

  const productSchema = getProductSchema(product);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Products', item: '/products' },
    { name: product.category, item: `/products/${product.category}` },
    { name: product.name, item: `/products/${product.category}/${product.slug}` },
  ]);

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] min-h-screen">
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
