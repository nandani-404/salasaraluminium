import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SEGMENTS, Segment, getProductsBySegment, CATEGORIES } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';

interface SegmentPageProps {
  params: Promise<{
    segment: string;
  }>;
}

export async function generateMetadata({ params }: SegmentPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const segKey = resolvedParams.segment as Segment;
  const seg = SEGMENTS[segKey];

  if (!seg) return {};

  return {
    title: `${seg.label} Hardware & Profiles`,
    description: `${seg.description}. Browse premium ${seg.label.toLowerCase()} aluminium profiles, handles, and fittings from Salasar.`,
  };
}

export default async function SegmentPage({ params }: SegmentPageProps) {
  const resolvedParams = await params;
  const segKey = resolvedParams.segment as Segment;
  const seg = SEGMENTS[segKey];

  if (!seg) {
    notFound();
  }

  const products = getProductsBySegment(segKey);
  const categories = CATEGORIES.filter((c) => c.segment === segKey);

  return (
    <div className="container-luxury py-10 space-y-12">
      <Breadcrumbs items={[{ label: `${seg.label} Segment` }]} />

      {/* Segment Hero */}
      <div className="bg-[#FFFFFF] border border-[#D8D1C4] p-10 md:p-14 space-y-6 shadow-luxury">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{seg.icon}</span>
          <span className="eyebrow">{seg.label} Collection</span>
        </div>

        <h1 className="font-serif text-4xl text-[#2B2620]">
          {seg.label} Architectural Hardware
        </h1>

        <p className="text-sm text-[#2B2620]/80 max-w-2xl leading-relaxed">
          {seg.description}. Each specification is engineered to meet strict structural loads, operational smoothness, and material compliance for {seg.label.toLowerCase()} environments.
        </p>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-[#D8D1C4]">
          <span className="text-xs uppercase tracking-wider text-[#2B2620]/60 self-center mr-2">
            Categories:
          </span>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${segKey}/${cat.slug}`}
              className="px-4 py-2 bg-[#FAF7F0] hover:bg-[#2B2620] hover:text-white border border-[#D8D1C4] text-xs uppercase tracking-wider transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#D8D1C4] pb-4">
          <h2 className="font-serif text-2xl text-[#2B2620]">
            Featured {seg.label} Range ({products.length})
          </h2>
          <Link href="/contact">
            <Button variant="outline" size="sm">
              Request Trade Sheet
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
