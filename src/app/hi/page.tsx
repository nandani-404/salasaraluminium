import type { Metadata } from 'next';
import Link from 'next/link';
import { CATALOGUE_CATEGORIES, productsInCategory, CATALOGUE_SKU_COUNT } from '@/data/products';
import { CITIES_DATA } from '@/lib/data/cities';
import { HI } from '@/lib/i18n/hi';
import HindiShell from '@/components/i18n/HindiShell';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import { getLocalBusinessSchema, getFaqSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: HI.home.title,
  description: HI.home.description,
  path: '/hi',
  locale: 'hi_IN',
  languages: { 'en-IN': '/', 'hi-IN': '/hi' },
});

export default function HindiHomePage() {
  return (
    <HindiShell englishHref="/">
      <JsonLd schema={getLocalBusinessSchema()} />
      <JsonLd schema={getFaqSchema(HI.faqs)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
            {HI.home.h1}
          </h1>

          <div className="max-w-3xl p-5 bg-white border-l-4 border-[#8A6408] border-y border-r border-[#E2E8F0] rounded-r-xl space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8A6408]">
              {HI.ui.quickAnswer}
            </h2>
            <p className="text-base text-[#1E293B] leading-relaxed">{HI.home.quickAnswer}</p>
          </div>

          <p className="text-base text-[#334155] leading-relaxed max-w-3xl">{HI.home.intro}</p>
          <p className="text-base text-[#334155] leading-relaxed max-w-3xl">{HI.home.whoWeSell}</p>
          <p className="text-base text-[#334155] leading-relaxed max-w-3xl">{HI.home.priceNote}</p>
        </header>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">
            {HI.ui.browseCategories} — {CATALOGUE_CATEGORIES.length} कैटेगरी, {CATALOGUE_SKU_COUNT} आइटम
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0">
            {CATALOGUE_CATEGORIES.map((cat) => {
              const t = HI.categories[cat.slug];
              if (!t) return null;
              return (
                <li key={cat.slug}>
                  <Link
                    href={`/hi/products/${cat.slug}`}
                    className="h-full flex flex-col gap-1.5 p-4 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#0B1F3A] transition-colors"
                  >
                    <span className="text-base font-bold text-[#0B1F3A]">{t.name}</span>
                    <span className="text-sm text-[#475569] leading-relaxed">{t.desc}</span>
                    <span className="text-xs text-[#64748B] mt-auto pt-1">
                      {productsInCategory(cat.slug).length} {HI.ui.itemsInCategory} · {cat.codePrefix}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">छत्तीसगढ़ में हमारा सप्लाई एरिया</h2>
          <ul className="flex flex-wrap gap-2 list-none p-0">
            {CITIES_DATA.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/hi/locations/${city.slug}`}
                  className="inline-flex items-center min-h-11 px-4 bg-white border border-[#E2E8F0] rounded-lg text-sm font-semibold text-[#0B1F3A] hover:border-[#0B1F3A] transition-colors"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">{HI.ui.commonQuestions}</h2>
          <FaqList faqs={HI.faqs} />
          <Link href="/hi/faq" className="inline-block text-sm font-bold text-[#0B1F3A] underline">
            सभी सवाल देखें
          </Link>
        </section>
      </div>
    </HindiShell>
  );
}
