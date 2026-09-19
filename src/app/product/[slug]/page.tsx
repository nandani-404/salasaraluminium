import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProductGallery } from '@/components/product/ProductGallery';
import { SpecsTable } from '@/components/product/SpecsTable';
import { FaqAccordion } from '@/components/product/FaqAccordion';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { generateProductSchema, generateFaqSchema } from '@/lib/seo/schema';
import {
  findProductByAnySlug,
  getAllProductStaticSlugs,
  getRelatedProductsUniversal,
} from '@/lib/productAdapter';
import ProductDetailActions from './ProductDetailActions';
import { buildMetadata, truncateTitle, clampDescription } from '@/lib/seo/metadata';
import { getCatalogueProduct } from '@/data/products';
import CatalogueProductPage from '@/components/catalogue/CatalogueProductPage';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProductStaticSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const match = findProductByAnySlug(resolvedParams.slug);

  if (!match) return {};
  const product = match.product;

  /*
   * Title pattern: "{Product} (SA-xx) - Buy in Raipur | Salasar", trimmed on a
   * word boundary. The previous version cut at 35 characters mid-word and
   * appended "...", so most product titles read like
   * "Shower Hinge - 90 Wall to Glass ..." with no city and no brand.
   */
  const title = truncateTitle(`${product.name} (${product.sku}) — Raipur | Salasar`);

  const description = clampDescription(
    `${product.shortDescription} Stocked in Raipur, Chhattisgarh and supplied across the state. Call or WhatsApp with code ${product.sku} for a quote.`
  );

  return buildMetadata({
    title,
    description,
    path: `/product/${match.canonicalSlug}`,
    image: product.images?.[0],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;

  /*
   * The 86 real catalogue SKUs get the catalogue template, which renders only
   * the specifications actually held on record. The older showcase range keeps
   * the original template below.
   *
   * Previously every catalogue SKU was pushed through an adapter that invented
   * a uniform set of specs for all 86 — alloy grade 6063-T6, MOQ 50, "Mill Test
   * Certified" — none of which came from the product data.
   */
  const catalogueProduct = getCatalogueProduct(resolvedParams.slug);
  if (catalogueProduct) {
    return <CatalogueProductPage product={catalogueProduct} />;
  }

  const match = findProductByAnySlug(resolvedParams.slug);

  if (!match) {
    notFound();
  }

  const product = match.product;
  const related = getRelatedProductsUniversal(product);
  const productSchema = generateProductSchema(product);
  const faqSchema = generateFaqSchema(product.faqs);

  const breadcrumbs = [
    { label: 'HOME', href: '/' },
    { label: 'PRODUCTS', href: '/products' },
    { label: product.category.toUpperCase(), href: `/products/${product.categorySlug}` },
    { label: product.name },
  ];


  return (
    <div className="container-luxury py-4 sm:py-10 space-y-8 sm:space-y-16">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
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

          {/*
            "Mill Test Certified" was displayed here on every product. No mill
            test certification has been verified for this business, and an
            invented certification claim is a trust and compliance problem, not
            just an SEO one — removed. MOQ is a real field on these records, so
            it stays.
          */}
          <div className="border-t border-b border-[#D8D1C4] py-4 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B08D57] block font-semibold">Trade specification</span>
              <span className="font-serif text-xl font-bold text-[#2B2620]">
                Quoted on enquiry
              </span>
            </div>
            <div className="text-right text-xs text-[#2B2620]/80">
              <span className="block font-medium">MOQ: {product.moq} units</span>
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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {related.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
