import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import JsonLd from '@/components/JsonLd';
import { getFaqSchema, getBreadcrumbSchema } from '@/lib/jsonld';
import { ArrowLeft, Layers, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.category);
  if (!category) return {};

  return {
    title: `${category.name} Extrusions & Hardware`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.category);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.slug);

  const categoryFaqs = [
    {
      question: `What alloy grade is typically used for Salasar ${category.name}?`,
      answer: `Our ${category.name.toLowerCase()} range is primarily extruded using EN AW 6063-T6 architectural alloy or 6061-T6 high-tensile structural alloy depending on line load requirements.`,
    },
    {
      question: `Can I request custom anodizing or powder coating colors for ${category.name}?`,
      answer: `Yes. We provide 15–20 Micron Anodizing in Satin Silver, Bronze, and Champagne, as well as Qualicoat Class 2 Architectural Powder Coating in any custom RAL shade.`,
    },
  ];

  const faqSchema = getFaqSchema(categoryFaqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Products', item: '/products' },
    { name: category.name, item: `/products/${category.slug}` },
  ]);

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] min-h-screen">
      <JsonLd schema={faqSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Category Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#E5E3DC]">
        <Link
          href="/products"
          className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-[#22262A] mb-4 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Product Categories</span>
        </Link>

        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-semibold text-[#B08D57] uppercase tracking-widest">
            Category Showcase
          </span>
          <h1 className="text-4xl font-serif font-bold text-[#22262A]">{category.name}</h1>
          <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
        </div>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* Category FAQ Section */}
        <div className="mt-20 pt-12 border-t border-[#E5E3DC]">
          <h2 className="text-2xl font-serif font-bold text-[#22262A] mb-6">
            Frequently Asked Questions — {category.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryFaqs.map((faq, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-[#E5E3DC] space-y-2">
                <h3 className="text-base font-serif font-bold text-[#22262A]">{faq.question}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
