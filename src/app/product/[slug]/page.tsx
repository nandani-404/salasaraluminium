import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/data/products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { SpecsTable } from '@/components/product/SpecsTable';
import { FaqAccordion } from '@/components/product/FaqAccordion';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { generateProductSchema, generateFaqSchema } from '@/lib/seo/schema';
import ProductDetailActions from './ProductDetailActions';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) return {};

  return {
    title: `${product.name} (${product.sku}) | Salasar Hardware`,
    description: `${product.shortDescription} Alloy: ${product.alloyGrade}, Finish: ${product.finish}. Order direct with trade pricing.`,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);
  const productSchema = generateProductSchema(product);
  const faqSchema = generateFaqSchema(product.faqs);

  const breadcrumbs = [
    { label: `${product.segment.toUpperCase()} SEGMENT`, href: `/${product.segment}` },
    { label: product.category, href: `/${product.segment}/${product.categorySlug}` },
    { label: product.name },
  ];

  return (
    <div className="container-luxury py-10 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: High-Res Image Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Title, Segment Pricing Tabs, Client Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Badge variant="gold">{product.segment}</Badge>
              <span className="text-xs uppercase tracking-widest text-[#2B2620]/60">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-[#2B2620]">
              {product.name}
            </h1>

            <p className="text-xs text-[#2B2620]/60 font-medium uppercase tracking-wider">
              {product.material} &nbsp;|&nbsp; {product.alloyGrade}
            </p>
          </div>

          <div className="border-t border-b border-[#D8D1C4] py-4 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B08D57] block font-semibold">B2B Trade Specification</span>
              <span className="font-serif text-xl font-bold text-[#2B2620]">
                Custom Factory Extrusion & Hardware
              </span>
            </div>
            <div className="text-right text-xs text-[#2B2620]/80">
              <span className="block font-medium">MOQ: {product.moq} Units / Meters</span>
              <span className="text-[#B08D57]">Mill Test Certified</span>
            </div>
          </div>

          <p className="text-sm text-[#2B2620]/80 leading-relaxed">
            {product.description}
          </p>

          {/* Interactive Client Actions (Finish Selector, Quantity, Add To Cart, Trade Quote) */}
          <ProductDetailActions product={product} />
        </div>
      </div>

      {/* Technical Specifications Table */}
      <section className="space-y-6 pt-8 border-t border-[#D8D1C4]">
        <h2 className="font-serif text-2xl text-[#2B2620]">Engineering Details</h2>
        <SpecsTable specs={product.specs} />
      </section>

      {/* Product Specific FAQ Accordion */}
      <section className="space-y-6 pt-8 border-t border-[#D8D1C4]">
        <FaqAccordion faqs={product.faqs} title="Product Specification & Installation FAQs" />
      </section>

      {/* Related / Frequently Bought Together */}
      {related.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-[#D8D1C4]">
          <h2 className="font-serif text-2xl text-[#2B2620]">Complementary Architectural Hardware</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
