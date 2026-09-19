import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATALOGUE_CATEGORIES, getCategory, productsInCategory } from '@/data/products';
import { HI } from '@/lib/i18n/hi';
import HindiShell from '@/components/i18n/HindiShell';
import CatalogueCard from '@/components/catalogue/CatalogueCard';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/jsonld';
import { buildMetadata, clampDescription } from '@/lib/seo/metadata';

/**
 * Hindi category pages. Only emitted for categories that have hand-written
 * Hindi copy in `HI.categories` — there is no machine-translation fallback,
 * for the same reason the city-category pages have no template fallback.
 */

export async function generateStaticParams() {
  return CATALOGUE_CATEGORIES.filter((c) => HI.categories[c.slug]).map((c) => ({
    category: c.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const t = HI.categories[slug];
  const cat = getCategory(slug);
  if (!t || !cat) return {};

  return buildMetadata({
    title: `${t.name} रायपुर | Salasar`,
    description: clampDescription(
      `${t.desc} रायपुर में उपलब्ध, ${productsInCategory(slug).length} आइटम। ${t.note} रेट के लिए कॉल या WhatsApp करें।`
    ),
    path: `/hi/products/${slug}`,
    locale: 'hi_IN',
    languages: { 'en-IN': `/products/${slug}`, 'hi-IN': `/hi/products/${slug}` },
  });
}

export default async function HindiCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const t = HI.categories[slug];
  const cat = getCategory(slug);
  if (!t || !cat) notFound();

  const items = productsInCategory(slug);

  const faqs = [
    {
      question: `${t.name} में कौन-कौन से आइटम मिलते हैं?`,
      answer: `${t.desc} इस कैटेगरी में कुल ${items.length} आइटम हैं, कोड ${cat.codePrefix}। हर आइटम का अपना SA कोड है जिसे फ़ोन या WhatsApp पर बताकर ऑर्डर दिया जा सकता है।`,
    },
    {
      question: `सही आइटम कैसे चुनें?`,
      answer: `${t.note} अगर तय न कर पाएँ तो पुराना पुर्ज़ा दुकान पर ले आइए या उसकी फोटो WhatsApp कर दीजिए — हम देखकर बता देंगे।`,
    },
    ...HI.faqs.slice(0, 2),
  ];

  return (
    <HindiShell
      englishHref={`/products/${slug}`}
      breadcrumb={[
        { label: HI.ui.products, href: '/hi' },
        { label: t.name },
      ]}
    >
      <JsonLd
        schema={getBreadcrumbSchema([
          { name: HI.ui.home, item: '/hi' },
          { name: t.name, item: `/hi/products/${slug}` },
        ])}
      />
      <JsonLd schema={getFaqSchema(faqs)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        <header className="space-y-4">
          <p className="text-xs font-mono font-bold bg-[#0B1F3A] text-[#D4AF37] inline-block px-2 py-0.5 rounded">
            {cat.codePrefix}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
            रायपुर में {t.name}
          </h1>

          <div className="max-w-3xl p-5 bg-white border-l-4 border-[#8A6408] border-y border-r border-[#E2E8F0] rounded-r-xl space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8A6408]">
              {HI.ui.quickAnswer}
            </h2>
            <p className="text-base text-[#1E293B] leading-relaxed">
              {t.desc} इस कैटेगरी में {items.length} आइटम हैं, सभी रायपुर के भैंसथान स्थित हमारे
              काउंटर पर उपलब्ध हैं।
            </p>
          </div>

          <p className="text-base text-[#334155] leading-relaxed max-w-3xl">{t.note}</p>
        </header>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">
            {t.name} — {items.length} {HI.ui.itemsInCategory}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {items.map((p, i) => (
              <CatalogueCard key={p.sku} product={p} priority={i === 0} />
            ))}
          </div>
        </section>

        <section className="space-y-5 pt-2 border-t border-[#E5E3DC]">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">{HI.ui.commonQuestions}</h2>
          <FaqList faqs={faqs} />
        </section>

        <nav aria-label="अन्य कैटेगरी" className="space-y-4 pt-2 border-t border-[#E5E3DC]">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">अन्य कैटेगरी</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 list-none p-0">
            {CATALOGUE_CATEGORIES.filter((c) => c.slug !== slug && HI.categories[c.slug]).map(
              (c) => (
                <li key={c.slug}>
                  <Link
                    href={`/hi/products/${c.slug}`}
                    className="flex items-center min-h-11 px-4 bg-white border border-[#E2E8F0] rounded-xl text-sm font-semibold text-[#0B1F3A] hover:border-[#0B1F3A] transition-colors"
                  >
                    {HI.categories[c.slug].name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </HindiShell>
  );
}
