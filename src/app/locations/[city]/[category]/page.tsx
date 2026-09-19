import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin, PhoneCall, Truck } from 'lucide-react';
import { getCity } from '@/lib/data/cities';
import { cityCategoryPairs, getCityCategoryAngle } from '@/lib/data/cityCategory';
import { getCategory, productsInCategory, CATALOGUE_CATEGORIES } from '@/data/products';
import { BUSINESS, TEL_HREF, whatsappLink } from '@/config/business';
import CatalogueCard from '@/components/catalogue/CatalogueCard';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import { getBreadcrumbSchema, getFaqSchema, getCityServiceSchema } from '@/lib/jsonld';
import { buildMetadata, truncateTitle, clampDescription } from '@/lib/seo/metadata';

/**
 * City + category landing pages, e.g. /locations/bhilai/door-kits.
 *
 * These exist because "door kit Bhilai" and "shower hinge Bilaspur" are how
 * people search, and a generic category page does not answer the local half of
 * that question.
 *
 * The risk with this page type is obvious: 72 pages spun from one template with
 * two words swapped is a doorway pattern, and Google treats it as spam. This
 * site already carries the scars of that (see pseoData.ts, a million of them).
 *
 * So the page only renders for pairs that have a hand-written angle in
 * `cityCategory.ts` — there is no fallback string. If someone adds a city
 * without writing its 12 angles, generateStaticParams simply will not emit
 * those routes, rather than publishing filler.
 */

export async function generateStaticParams() {
  return cityCategoryPairs().map(({ city, category }) => ({ city, category }));
}

// A pair without a hand-written angle must 404 rather than render a template.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; category: string }>;
}): Promise<Metadata> {
  const { city: citySlug, category: categorySlug } = await params;
  const city = getCity(citySlug);
  const category = getCategory(categorySlug);
  const angle = getCityCategoryAngle(citySlug, categorySlug);
  if (!city || !category || !angle) return {};

  return buildMetadata({
    title: truncateTitle(`${category.name} in ${city.name} | Salasar`),
    description: clampDescription(
      `${category.name} supplied to ${city.name}, ${city.state} from our Raipur counter. ${angle.consideration} Call or WhatsApp for a quote.`
    ),
    path: `/locations/${city.slug}/${category.slug}`,
  });
}

export default async function CityCategoryPage({
  params,
}: {
  params: Promise<{ city: string; category: string }>;
}) {
  const { city: citySlug, category: categorySlug } = await params;
  const city = getCity(citySlug);
  const category = getCategory(categorySlug);
  const angle = getCityCategoryAngle(citySlug, categorySlug);

  if (!city || !category || !angle) {
    notFound();
  }

  const items = productsInCategory(category.slug);
  const path = `/locations/${city.slug}/${category.slug}`;

  const faqs = [
    {
      question: `Do you supply ${category.name.toLowerCase()} to ${city.name}?`,
      answer: `Yes. ${city.name} is ${city.distance.toLowerCase().startsWith('headquarters') ? 'where our counter is' : `approximately ${city.distance.replace(/^Approx\. /, '').replace(/ of the Raipur counter$/, '')} from our Raipur counter, ${city.route.toLowerCase()}`}. All ${items.length} items in this category are available — quote the SA code by phone or WhatsApp and we will confirm availability and freight before you pay.`,
    },
    {
      question: `Which ${category.name.toLowerCase()} do buyers in ${city.name} usually need?`,
      answer: `${angle.consideration} ${angle.angle}`,
    },
    {
      question: `I do not know the SA code — can you still help?`,
      answer: `Yes. Send a photograph of the part on WhatsApp to ${BUSINESS.phones.primary.display} and we will identify it. Aluminium sections vary between fabricators, so matching a physical part is more reliable than matching a description over the phone.`,
    },
    {
      question: `Can I buy a single piece, or only in bulk?`,
      answer: `Either. Dealers and fabricators in ${city.name} buy at trade rates in box quantities, and individual buyers can order what one job needs. For a delivered order we will tell you honestly whether it is worth the freight or better collected.`,
    },
  ];

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Locations', item: '/locations' },
    { name: city.name, item: `/locations/${city.slug}` },
    { name: category.name, item: path },
  ];

  const otherCategories = CATALOGUE_CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 6);

  return (
    <div className="pt-16 sm:pt-24 pb-8 sm:pb-20 bg-[#FAF9F6] min-h-screen">
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getFaqSchema(faqs)} />
      <JsonLd schema={getCityServiceSchema(city)} />

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 border-b border-[#E5E3DC] space-y-4">
        <nav aria-label="Breadcrumb" className="text-xs text-[#64748B]">
          <ol className="flex flex-wrap items-center gap-1.5 list-none p-0">
            {breadcrumbs.map((b, i) => (
              <li key={b.item} className="flex items-center gap-1.5">
                {i < breadcrumbs.length - 1 ? (
                  <>
                    <Link href={b.item} className="hover:text-[#0B1F3A]">
                      {b.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                ) : (
                  <span className="text-[#0B1F3A] font-semibold" aria-current="page">
                    {b.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8A6408]">
          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
          {city.district} district, {city.state}
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight max-w-4xl">
          {category.name} in {city.name}
        </h1>

        {/* Quick answer — the local half of the question, answered first. */}
        <div className="max-w-3xl p-5 bg-white border-l-4 border-[#8A6408] border-y border-r border-[#E2E8F0] rounded-r-xl space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#8A6408]">
            Quick answer
          </h2>
          <p className="text-base text-[#1E293B] leading-relaxed">
            We supply all {items.length} items in our {category.name.toLowerCase()} range ({category.codePrefix}) to{' '}
            {city.name} from our counter in Bhaisthan, Raipur. {angle.consideration}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          <a
            href={TEL_HREF}
            data-analytics="click_call"
            data-analytics-location={`city-cat-${city.slug}-${category.slug}`}
            className="inline-flex items-center gap-2 min-h-11 px-5 bg-[#8A6408] hover:bg-[#6F5006] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
          >
            <PhoneCall className="w-4 h-4" aria-hidden="true" />
            Call {BUSINESS.phones.primary.display}
          </a>
          <a
            href={whatsappLink({
              message: `Hello Salasar, I need ${category.name.toLowerCase()} delivered to ${city.name}.`,
              source: path,
              campaign: 'city-category',
            })}
            data-analytics="click_whatsapp"
            data-analytics-location={`city-cat-${city.slug}-${category.slug}`}
            className="inline-flex items-center gap-2 min-h-11 px-5 bg-white border border-[#0B1F3A] text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#0B1F3A] hover:text-white transition-colors"
          >
            WhatsApp a photo of the part
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* The hand-written local angle — the reason this page exists. */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">
            What {city.name} actually buys, and why
          </h2>
          <p className="text-base text-[#334155] leading-relaxed max-w-4xl">{angle.angle}</p>
          <p className="text-base text-[#334155] leading-relaxed max-w-4xl">{city.localContext}</p>
        </section>

        <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#0B1F3A]">
            <Truck className="w-5 h-5 text-[#8A6408]" aria-hidden="true" />
            Getting it to {city.name}
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Distance</dt>
              <dd className="text-[#0B1F3A] font-bold mt-0.5">{city.distance}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Route</dt>
              <dd className="text-[#334155] font-semibold mt-0.5">{city.route}</dd>
            </div>
          </dl>
          {city.dispatchTime && (
            <p className="text-sm text-[#475569]">
              <strong className="text-[#0B1F3A]">Dispatch: </strong>
              {city.dispatchTime}
            </p>
          )}
          <p className="text-sm text-[#64748B] leading-relaxed">
            Distances are approximate road distances. Transit depends on the transport line and
            consignment size, so we confirm it against your actual order.{' '}
            <Link href={`/locations/${city.slug}`} className="font-semibold text-[#0B1F3A] underline">
              More about supplying {city.name}
            </Link>
            .
          </p>
        </section>

        <section className="space-y-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#E5E3DC] pb-3">
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              {category.name} we stock ({items.length})
            </h2>
            <Link
              href={`/products/${category.slug}`}
              className="text-xs font-bold text-[#0B1F3A] hover:text-[#8A6408]"
            >
              Full category detail →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {items.map((p, i) => (
              <CatalogueCard key={p.sku} product={p} priority={i === 0} />
            ))}
          </div>
        </section>

        <section className="space-y-5 pt-2 border-t border-[#E5E3DC]">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">
            {category.name} in {city.name} — common questions
          </h2>
          <FaqList faqs={faqs} />
        </section>

        <nav aria-label="Other categories" className="space-y-4 pt-2 border-t border-[#E5E3DC]">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">
            Other hardware we supply to {city.name}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 list-none p-0">
            {otherCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/locations/${city.slug}/${c.slug}`}
                  className="flex items-center min-h-11 px-4 bg-white border border-[#E2E8F0] rounded-xl text-sm font-semibold text-[#0B1F3A] hover:border-[#0B1F3A] transition-colors"
                >
                  {c.name} in {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <TradeQuoteFormSection />
    </div>
  );
}
