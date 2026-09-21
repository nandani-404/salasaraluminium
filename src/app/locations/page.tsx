import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin, ChevronRight } from 'lucide-react';
import { CITIES_DATA } from '@/lib/data/cities';
import { BUSINESS, TEL_HREF } from '@/config/business';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import { getLocalBusinessSchema, getBreadcrumbSchema } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Where We Supply in Chhattisgarh | Salasar Raipur',
  description:
    'Aluminium door and window hardware supplied from our Raipur counter to Bhilai, Durg, Bilaspur, Korba, Bastar and across Chhattisgarh. Find your city and call.',
  alternates: { canonical: '/locations' },
  openGraph: {
    type: 'website',
    url: '/locations',
    title: 'Where We Supply in Chhattisgarh | Salasar Raipur',
    description:
      'Aluminium door and window hardware supplied from our Raipur counter across Chhattisgarh. Find your city.',
  },
};

export default function LocationsHubPage() {
  return (
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-white min-h-screen">
      <JsonLd schema={getLocalBusinessSchema()} />
      <JsonLd
        schema={getBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Locations', item: '/locations' },
        ])}
      />

      <header className="bg-[#0B1F3A] text-white py-8 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-full text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Chhattisgarh supply network</span>
          </p>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Where We Supply — Raipur and Across Chhattisgarh
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Our counter and stock point is at {BUSINESS.addressLine}. We supply dealers, fabricators
            and contractors from there, and sell to homeowners, architects, interior designers and
            builders buying for a single project. Pick your city below for local detail, or call{' '}
            <a href={TEL_HREF} className="text-[#D4AF37] underline" data-analytics="click_call" data-analytics-location="locations-intro">
              {BUSINESS.phones.primary.display}
            </a>
            .
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="mb-8 space-y-2 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-extrabold text-[#0B1F3A]">
            Cities we supply across Chhattisgarh
          </h2>
          <p className="text-sm text-slate-600">
            {CITIES_DATA.length} districts, each with its own page covering the route from Raipur and
            the hardware that moves there.
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 list-none p-0">
          {CITIES_DATA.map((city) => (
            <li key={city.slug} className="h-full">
              <Link
                href={`/locations/${city.slug}`}
                className="h-full bg-white border border-[#E2E8F0] hover:border-[#0B1F3A] rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2 sm:space-y-3">
                  <span className="inline-block text-[9px] sm:text-xs font-mono font-bold text-[#8A6408] bg-[#F8FAFC] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-[#E2E8F0] line-clamp-1 max-w-full">
                    {city.distance}
                  </span>

                  <div>
                    <h3 className="text-xs sm:text-xl font-bold text-[#0B1F3A] group-hover:text-[#8A6408] transition-colors leading-tight">
                      <span>{city.name}</span>
                      <span className="hidden sm:inline">, {city.state}</span>
                    </h3>
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-500 line-clamp-1 mt-0.5">{city.tagline}</p>
                  </div>

                  <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-none min-h-[2rem] sm:min-h-0">{city.description}</p>
                </div>

                <span className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs font-bold text-[#0B1F3A] group-hover:text-[#8A6408]">
                  <span className="hidden sm:inline">{city.name} supply detail</span>
                  <span className="sm:hidden">Supply Detail</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8A6408]" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <TradeQuoteFormSection />

      <FAQSection
        title="Questions about our supply locations"
        faqs={[
          {
            question: 'Where is your counter?',
            answer: `${BUSINESS.addressLine}. You can walk in during opening hours, ${BUSINESS.hours.display}.`,
            category: 'Location',
          },
          {
            question: 'Do you deliver outside Raipur city?',
            answer:
              'Yes. We supply across Chhattisgarh. Transit time depends on the district and the transport line used — call us with your delivery address and order size and we will confirm before you pay.',
            category: 'Delivery',
          },
          {
            question: 'Can I buy if I am not a dealer or fabricator?',
            answer:
              'Yes. We sell at trade rates to dealers and fabricators, and we also supply homeowners, architects, interior designers and builders buying for a single project. Bring the old part or send a photograph on WhatsApp and we will match it.',
            category: 'Ordering',
          },
        ]}
      />
    </div>
  );
}
