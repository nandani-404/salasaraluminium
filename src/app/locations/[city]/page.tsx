import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { CITIES_DATA } from '../page';
import { SAH_BUSINESS_DETAILS, SAH_CATEGORIES, FULL_CATALOGUE_PRODUCTS } from '@/lib/sahData';
import JsonLd from '@/components/JsonLd';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import { MapPin, Truck, PhoneCall, ChevronRight, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';

export async function generateStaticParams() {
  return CITIES_DATA.map((c) => ({
    city: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const city = CITIES_DATA.find((c) => c.slug === resolvedParams.city);
  if (!city) return {};

  return {
    title: `Aluminium Hardware Shop in ${city.name} | Door & Glass Fittings`,
    description: `Wholesale aluminium hardware in ${city.name}: door kits, locks, hinges, rollers & glass fittings. 86 trade SKUs, fast dispatch from our Raipur hub. Call +91 8007443071.`,
    alternates: {
      canonical: `/locations/${city.slug}`,
    },
  };
}

export default async function CityLocationPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const city = CITIES_DATA.find((c) => c.slug === resolvedParams.city);

  if (!city) {
    notFound();
  }

  // Service + areaServed JSON-LD Schema (Strictly single-location business, no fake addresses)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Aluminium hardware and architectural fittings supply',
    provider: {
      '@id': 'https://www.salasaraluminium.shop/#organization',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: city.state,
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '86-SKU Trade Catalogue',
      itemListElement: SAH_CATEGORIES.map((cat) => ({
        '@type': 'OfferCatalog',
        name: cat.name,
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.salasaraluminium.shop' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.salasaraluminium.shop/locations' },
      { '@type': 'ListItem', position: 3, name: city.name, item: `https://www.salasaraluminium.shop/locations/${city.slug}` },
    ],
  };

  const cityFaqs = [
    {
      q: `What is the estimated delivery time for wholesale hardware orders to ${city.name}?`,
      a: `For fabricators and hardware dealers in ${city.name}, orders placed before cut-off time are processed immediately at our Bhaisthan warehouse. Transit details: ${city.dispatchTime}.`
    },
    {
      q: `Can fabricators in ${city.name} order custom anodized extrusions or specific SA codes?`,
      a: `Yes, all 86 standardized trade SKUs (SA-1 to SA-86) including specialized finishes (Matt Black, CP Mirror, Champion, Anodized Silver) are available for direct delivery to ${city.name}.`
    },
    {
      q: `Is there a Minimum Order Quantity (MOQ) for shipping to ${city.name}?`,
      a: `We supply both single box trade packages and full transport vehicle loads to ${city.name}. Contact Abhishek at +91 8007443071 for customized freight rates.`
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero Header */}
      <div className="bg-[#0B1F3A] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
            <Link href="/locations" className="hover:text-[#D4AF37]">Locations</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-bold">{city.name}</span>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-full text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            <span>Official Hardware Supplier in {city.name}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl">
            Aluminium Hardware & Door Fittings Supplier in {city.name}, {city.state}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl font-medium leading-relaxed">
            Wholesale trade supply of architectural aluminium extrusions, slim door kits (SA-33), hydraulic door closers (SA-42), shower hinges, and 86 trade SKUs delivered directly to fabricators and dealers in {city.name}.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href="tel:8007443071"
              className="px-6 py-3.5 bg-[#B8860B] hover:bg-[#D4AF37] text-[#0B1F3A] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Abhishek for {city.name} Orders: +91 8007443071</span>
            </a>
          </div>
        </div>
      </div>

      {/* 6 Core Content Blocks for Survival */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Block 1: Dispatch Reality */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#0B1F3A] text-[#D4AF37] rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0B1F3A]">1. Dispatch & Transit Reality to {city.name}</h2>
              <p className="text-xs text-slate-500">Real logistics metrics from our central Bhaisthan, Raipur dispatch hub</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Road Distance</span>
              <span className="text-lg font-black text-[#0B1F3A]">{city.distance}</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 sm:col-span-2">
              <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Transit Schedule & Transport Line</span>
              <span className="text-sm font-bold text-slate-800">{city.dispatchTime}</span>
            </div>
          </div>
        </div>

        {/* Block 2: Local Trade Geography */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">2. Servicing Local Hardware Markets & Industrial Areas in {city.name}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Salasar Aluminium & Hardware provides direct wholesale coverage to fabricators, window assemblers, and glass workshops operating across the primary trade zones in {city.name}:
          </p>
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0B1F3A] leading-relaxed">
            📍 Key Markets Covered: <span className="text-slate-700 font-normal">{city.keyMarkets}</span>
          </div>
        </div>

        {/* Block 3: SKU Demand Mix */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">3. High-Demand Hardware SKUs Moving in {city.name}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Fabrication workshops in {city.name} frequently order from our 12 product categories to match ongoing residential, commercial, and industrial architectural projects:
          </p>

          <div className="p-5 bg-[#0B1F3A] text-white rounded-xl space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Primary Category Demand in {city.name}:</span>
            <p className="text-sm font-bold text-slate-200">{city.popularSkus}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {SAH_CATEGORIES.slice(0, 4).map((cat) => (
              <div key={cat.slug} className="p-4 bg-white border border-[#E2E8F0] rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-[#B8860B] font-bold">{cat.codePrefix}</span>
                <h3 className="text-xs font-bold text-[#0B1F3A]">{cat.name}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-2">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 4: Named Trade Commitment */}
        <div className="p-6 bg-gradient-to-r from-[#0B1F3A] to-[#1E293B] text-white rounded-2xl space-y-3">
          <h2 className="text-xl font-bold text-[#D4AF37]">4. Fabricator & Contractor Support in {city.name}</h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            Whether you are fitting out high-rise commercial glass facades or executing residential aluminium window sliding systems in {city.name}, Salasar Aluminium ensures guaranteed alloy purity, standardized SA coding, and consistent box pricing with zero price volatility.
          </p>
        </div>

        {/* Block 5: City-Scoped FAQ */}
        <div className="space-y-6 pt-4 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">5. Frequently Asked Questions — {city.name} Supply</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cityFaqs.map((faq, idx) => (
              <div key={idx} className="p-5 bg-[#F8FAFC] border border-slate-200 rounded-xl space-y-2">
                <h3 className="text-xs font-bold text-[#0B1F3A]">{faq.q}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 6: Links Out */}
        <div className="p-6 bg-white border border-[#E2E8F0] rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-[#0B1F3A]">6. Explore Catalogue Categories & Direct Inquiry</h2>
          <p className="text-xs text-slate-600">
            Browse our standardized hardware range or request a bulk quote tailored for delivery to {city.name}:
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <Link href="/products" className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg hover:border-[#0B1F3A] text-[#0B1F3A]">
              View All 86 SKUs
            </Link>
            <Link href="/wholesale" className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg hover:border-[#0B1F3A] text-[#0B1F3A]">
              Aluminium Hardware Wholesale Rates
            </Link>
            <Link href="/contact" className="px-3 py-1.5 bg-[#B8860B] text-[#0B1F3A] rounded-lg">
              Contact Sales Desk for {city.name}
            </Link>
          </div>
        </div>

      </div>

      <TradeQuoteFormSection />
    </div>
  );
}
