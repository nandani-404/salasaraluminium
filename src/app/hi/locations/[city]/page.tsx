import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CITIES_DATA, getCity } from '@/lib/data/cities';
import { CATALOGUE_CATEGORIES, CATALOGUE_SKU_COUNT } from '@/data/products';
import { HI } from '@/lib/i18n/hi';
import HindiShell from '@/components/i18n/HindiShell';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema, getFaqSchema, getCityServiceSchema } from '@/lib/jsonld';
import { buildMetadata, clampDescription } from '@/lib/seo/metadata';
import { BUSINESS } from '@/config/business';

/**
 * Hindi city pages. The facts (district, distance, route, dispatch, markets)
 * come from the same cities.ts records the English pages use, so the two
 * languages cannot state different distances for the same city.
 */

export async function generateStaticParams() {
  return CITIES_DATA.map((c) => ({ city: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  return buildMetadata({
    title: HI.city.titleFor(city.name),
    description: clampDescription(HI.city.descriptionFor(city.name)),
    path: `/hi/locations/${city.slug}`,
    locale: 'hi_IN',
    languages: {
      'en-IN': `/locations/${city.slug}`,
      'hi-IN': `/hi/locations/${city.slug}`,
    },
  });
}

export default async function HindiCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const shortDistance = city.distance.replace(/^Approx\. /, '').replace(/ of the Raipur counter$/, '');

  const faqs = [
    {
      question: `क्या ${city.name} में डिलीवरी होती है?`,
      answer: `हाँ। ${city.name} रायपुर से लगभग ${shortDistance} है। ${BUSINESS.phones.primary.display} पर अपनी लिस्ट और पता बताइए — हम समय और भाड़ा पहले ही बता देंगे।`,
    },
    {
      question: `${city.name} से SA कोड बताकर ऑर्डर दे सकते हैं?`,
      answer: `हाँ। हर आइटम का SA कोड है, फ़ोन या WhatsApp पर कोड बता दीजिए और वही आइटम पैक हो जाएगा। कोड न पता हो तो पुराने पुर्ज़े की फोटो भेज दीजिए।`,
    },
    ...HI.faqs.slice(0, 3),
  ];

  return (
    <HindiShell
      englishHref={`/locations/${city.slug}`}
      breadcrumb={[
        { label: HI.ui.locations, href: '/hi' },
        { label: city.name },
      ]}
    >
      <JsonLd schema={getCityServiceSchema(city)} />
      <JsonLd
        schema={getBreadcrumbSchema([
          { name: HI.ui.home, item: '/hi' },
          { name: city.name, item: `/hi/locations/${city.slug}` },
        ])}
      />
      <JsonLd schema={getFaqSchema(faqs)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
            {HI.city.h1For(city.name)}
          </h1>

          <div className="max-w-3xl p-5 bg-white border-l-4 border-[#8A6408] border-y border-r border-[#E2E8F0] rounded-r-xl space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8A6408]">
              {HI.ui.quickAnswer}
            </h2>
            <p className="text-base text-[#1E293B] leading-relaxed">
              {HI.city.quickAnswerFor(city.name, shortDistance, city.route)}
            </p>
          </div>
        </header>

        <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-[#0B1F3A]">
            रायपुर से {city.name} तक
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                {HI.city.distanceLabel}
              </dt>
              <dd className="text-[#0B1F3A] font-bold mt-0.5">{shortDistance}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                {HI.city.routeLabel}
              </dt>
              <dd className="text-[#334155] font-semibold mt-0.5">{city.route}</dd>
            </div>
          </dl>
          {city.dispatchTime && (
            <p className="text-sm text-[#475569]">
              <strong className="text-[#0B1F3A]">{HI.city.dispatchLabel}: </strong>
              {city.dispatchTime}
            </p>
          )}
          {city.keyMarkets && (
            <p className="text-sm text-[#475569]">
              <strong className="text-[#0B1F3A]">{HI.city.marketsLabel}: </strong>
              {city.keyMarkets}
            </p>
          )}
          <p className="text-sm text-[#64748B] leading-relaxed">{HI.city.approxNote}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">
            {city.name} के लिए उपलब्ध सामान ({CATALOGUE_SKU_COUNT} आइटम)
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 list-none p-0">
            {CATALOGUE_CATEGORIES.filter((c) => HI.categories[c.slug]).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/hi/products/${c.slug}`}
                  className="flex items-center min-h-11 px-4 bg-white border border-[#E2E8F0] rounded-xl text-sm font-semibold text-[#0B1F3A] hover:border-[#0B1F3A] transition-colors"
                >
                  {HI.categories[c.slug].name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5 pt-2 border-t border-[#E5E3DC]">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">{HI.ui.commonQuestions}</h2>
          <FaqList faqs={faqs} />
        </section>
      </div>
    </HindiShell>
  );
}
