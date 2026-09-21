import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { MapPin, Truck, PhoneCall, Package, Store, ArrowRight } from 'lucide-react';
import { CITIES_DATA, getCity } from '@/lib/data/cities';
import { getCityCategoryAngle } from '@/lib/data/cityCategory';
import { CATALOGUE_CATEGORIES, CATALOGUE_SKU_COUNT } from '@/data/products';
import { BUSINESS, TEL_HREF, whatsappLink } from '@/config/business';
import JsonLd from '@/components/JsonLd';
import FaqList from '@/components/FaqList';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { getCityServiceSchema, getBreadcrumbSchema, getFaqSchema } from '@/lib/jsonld';
import { buildMetadata, truncateTitle, clampDescription } from '@/lib/seo/metadata';

export async function generateStaticParams() {
  return CITIES_DATA.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  return buildMetadata({
    title: truncateTitle(`Aluminium Hardware Supplier in ${city.name} | Salasar`),
    description: clampDescription(
      `Door and window hardware for ${city.name}, ${city.state} — rollers, locks, hinges, door kits, closers and shower fittings from our Raipur counter. Call us.`
    ),
    path: `/locations/${city.slug}`,
    languages: {
      'en-IN': `/locations/${city.slug}`,
      'hi-IN': `/hi/locations/${city.slug}`,
    },
  });
}

export default async function CityLocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);

  if (!city) {
    notFound();
  }

  const faqs = [
    {
      question: `Do you deliver aluminium hardware to ${city.name}?`,
      answer: `Yes. ${city.name} is ${city.distance.toLowerCase().startsWith('headquarters') ? 'where our counter is' : `about ${city.distance.replace(/^Approx\. /, '').replace(/ of the Raipur counter$/, '')} from our Raipur counter, ${city.route.toLowerCase()}`}. Call ${BUSINESS.phones.primary.display} with your item list and delivery address and we will confirm transit time and freight before you pay.`,
    },
    {
      question: `Can I order by SA code from ${city.name} without visiting Raipur?`,
      answer: `Yes. Every item in our catalogue carries an SA code, so you can quote it over the phone or on WhatsApp and we will pack exactly that item. If you do not know the code, send a photograph of the old part on WhatsApp and we will identify it for you.`,
    },
    {
      question: `Is there a minimum order to ship to ${city.name}?`,
      answer: `We supply both single-box trade quantities and larger consolidated loads. What makes sense depends on the freight to ${city.name}, so call ${BUSINESS.phones.primary.display} and we will tell you honestly whether it is worth shipping or better collected.`,
    },
    {
      question: `Do you sell to homeowners in ${city.name}, or only to dealers?`,
      answer: `Both. Dealers, fabricators and contractors buy at trade rates, and we also supply homeowners, architects, interior designers and builders buying for one project.`,
    },
  ];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Locations', item: '/locations' },
    { name: city.name, item: `/locations/${city.slug}` },
  ]);

  return (
    <div className="pt-16 sm:pt-24 pb-8 sm:pb-20 bg-white min-h-screen">
      <JsonLd schema={getCityServiceSchema(city)} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={getFaqSchema(faqs)} />

      <header className="bg-[#0B1F3A] text-white py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-300">
            <Link href="/" className="hover:text-[#D4AF37]">
              Home
            </Link>
            <span className="mx-1.5" aria-hidden="true">
              /
            </span>
            <Link href="/locations" className="hover:text-[#D4AF37]">
              Locations
            </Link>
            <span className="mx-1.5" aria-hidden="true">
              /
            </span>
            <span className="text-[#D4AF37] font-bold">{city.name}</span>
          </nav>

          <p className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-full text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {city.district} district, {city.state}
            </span>
          </p>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-4xl">
            Aluminium Door &amp; Window Hardware Supplier in {city.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {city.description} All {CATALOGUE_SKU_COUNT} items in our catalogue are available to{' '}
            {city.name} — rollers and channels, sliding locks, hinges, door kits, door closers, glass
            and shower fittings, fasteners, sealants and mesh.
          </p>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 pt-2 w-full sm:w-auto">
            <a
              href={TEL_HREF}
              data-analytics="click_call"
              data-analytics-location={`city-${city.slug}-hero`}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-11 px-2 sm:px-5 bg-[#B8860B] hover:bg-[#D4AF37] text-[#0B1F3A] text-[10.5px] sm:text-xs font-black uppercase tracking-tight sm:tracking-wider rounded-xl transition-colors text-center w-full sm:w-auto truncate"
            >
              <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="truncate">
                <span className="sm:hidden">Call {BUSINESS.contactPerson}</span>
                <span className="hidden sm:inline">Call {BUSINESS.contactPerson}: {BUSINESS.phones.primary.display}</span>
              </span>
            </a>
            <a
              href={whatsappLink({
                message: `Hello Salasar, I need aluminium hardware delivered to ${city.name}.`,
                source: `/locations/${city.slug}`,
                campaign: 'city',
              })}
              data-analytics="click_whatsapp"
              data-analytics-location={`city-${city.slug}-hero`}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-11 px-2 sm:px-5 bg-white/10 border border-white/30 text-white text-[10.5px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider rounded-xl hover:bg-white/20 transition-colors text-center w-full sm:w-auto truncate"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">
                <span className="sm:hidden">WhatsApp List</span>
                <span className="hidden sm:inline">WhatsApp your {city.name} list</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        {/* Route from Raipur — verifiable public geography, not a service claim */}
        <section className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#0B1F3A] text-[#D4AF37] rounded-xl" aria-hidden="true">
              <Truck className="w-6 h-6" />
            </span>
            <h2 className="text-xl font-bold text-[#0B1F3A]">
              Getting hardware from Raipur to {city.name}
            </h2>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-4">
            <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200 flex flex-col justify-between">
              <dt className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">
                Distance <span className="hidden sm:inline">from our counter</span>
              </dt>
              <dd className="text-xs sm:text-base font-black text-[#0B1F3A] mt-1 leading-snug">{city.distance}</dd>
            </div>
            <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200 flex flex-col justify-between">
              <dt className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Route</dt>
              <dd className="text-xs sm:text-base font-bold text-slate-800 mt-1 leading-snug">{city.route}</dd>
            </div>
          </dl>

          {city.dispatchTime && (
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong className="text-[#0B1F3A]">Dispatch: </strong>
              {city.dispatchTime}
            </p>
          )}

          <p className="text-sm text-slate-600 leading-relaxed">
            Distances are approximate road distances. Transit time depends on the transport line and
            the size of the consignment, so we confirm it against your actual order rather than
            promising a fixed figure up front.
          </p>
        </section>

        {/* Genuinely city-specific context */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">
            What gets built in {city.name}, and what that needs
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
            {city.localContext}
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
            {city.demandNote}
          </p>
        </section>

        {/* Owner-supplied blocks: rendered only when the data actually exists */}
        {city.keyMarkets && (
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              Trade markets we supply in {city.name}
            </h2>
            <p className="p-5 bg-white border border-[#E2E8F0] rounded-xl text-sm text-slate-700 leading-relaxed">
              <Store className="w-4 h-4 inline-block mr-1.5 text-[#8A6408]" aria-hidden="true" />
              {city.keyMarkets}
            </p>
          </section>
        )}

        {city.popularSkus && (
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              What {city.name} orders most often
            </h2>
            <p className="p-5 bg-[#0B1F3A] text-slate-200 rounded-xl text-sm leading-relaxed">
              <Package className="w-4 h-4 inline-block mr-1.5 text-[#D4AF37]" aria-hidden="true" />
              {city.popularSkus}
            </p>
          </section>
        )}

        {/*
          Category links. Where a hand-written local angle exists for this city
          the link goes to the city-specific category page; otherwise it goes to
          the general category page. Without this the city-category pages would
          be orphaned — in the sitemap with nothing linking to them, which is
          the state that keeps pages out of the index.
        */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
              Browse the catalogue for your {city.name} project
            </h2>
            <span className="text-xs text-slate-500 hidden sm:inline">
              All 12 trade categories stocked for dispatch
            </span>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-2.5 list-none p-0">
            {CATALOGUE_CATEGORIES.map((cat) => {
              const hasLocalPage = Boolean(getCityCategoryAngle(city.slug, cat.slug));
              return (
                <li key={cat.slug} className="h-full">
                  <Link
                    href={
                      hasLocalPage
                        ? `/locations/${city.slug}/${cat.slug}`
                        : `/products/${cat.slug}`
                    }
                    className="group bg-white border border-slate-200 sm:border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#8A6408] sm:hover:border-[#0B1F3A] transition-all flex flex-col justify-between h-full sm:flex sm:flex-row sm:items-center sm:min-h-11 sm:px-4 sm:py-2.5"
                  >
                    {/* Visual thumbnail card header (mobile only) */}
                    <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden sm:hidden border-b border-slate-100">
                      <Image
                        src={cat.image}
                        alt={`${cat.name} in ${city.name}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-1.5 left-1.5 bg-[#0B1F3A]/90 backdrop-blur-xs text-[#D4AF37] text-[8px] font-mono font-bold px-1.5 py-0.5 rounded">
                        {cat.codePrefix}
                      </div>
                    </div>

                    {/* Content area: card layout on mobile, inline flex row on desktop */}
                    <div className="p-2 sm:p-0 flex-1 flex flex-col justify-between sm:flex-initial sm:w-full">
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold sm:font-semibold text-[#0B1F3A] group-hover:text-[#8A6408] sm:group-hover:text-[#0B1F3A] transition-colors leading-snug line-clamp-2 sm:line-clamp-none min-h-[2rem] sm:min-h-0 flex items-center">
                          <span>{cat.name}</span>
                          {hasLocalPage && (
                            <span className="hidden sm:inline ml-1 text-[#64748B] font-normal">in {city.name}</span>
                          )}
                        </h3>
                        {hasLocalPage && (
                          <p className="text-[10px] text-slate-500 font-medium sm:hidden mt-0.5">
                            in {city.name}
                          </p>
                        )}
                      </div>

                      {/* Mobile action row */}
                      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-[#8A6408] sm:hidden">
                        <span>Explore</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="space-y-5 pt-4 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">
            {city.name} supply — common questions
          </h2>
          <FaqList faqs={faqs} />
        </section>
      </div>

      <TradeQuoteFormSection />
    </div>
  );
}
