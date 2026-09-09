import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, Truck, ChevronRight, ShieldCheck, PhoneCall, Building2 } from 'lucide-react';
import { SAH_BUSINESS_DETAILS, SAH_CATEGORIES } from '@/lib/sahData';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';

export const metadata: Metadata = {
  title: 'Aluminium Hardware Supply Hubs & Locations | Salasar',
  description: 'Salasar Aluminium & Hardware wholesale delivery network across Chhattisgarh and Madhya Pradesh: Raipur, Bhilai, Durg, Bilaspur, Korba, and Rajnandgaon.',
  alternates: {
    canonical: '/locations',
  },
};

export const CITIES_DATA = [
  {
    slug: 'raipur',
    name: 'Raipur',
    state: 'Chhattisgarh',
    tagline: 'Main Bhaisthan Store & Warehouse Hub',
    distance: '0 km (Headquarters)',
    dispatchTime: 'Immediate counter pickup & same-day local auto/rickshaw delivery',
    keyMarkets: 'Bhaisthan Hardware Market, JK Steel Gali, Bhanpuri Industrial Area, Urla Industrial Complex',
    popularSkus: 'All 86 SKUs — SA-33 Door Kits, SA-42 Door Closers, SA-76 Shower Hinges, Slimline Extrusions',
    description: 'Our primary warehouse and sales outlet in Bhaisthan stocks the complete 86-SKU catalogue for walk-in fabricators and instant dispatch across Raipur capital region.',
  },
  {
    slug: 'bhilai',
    name: 'Bhilai',
    state: 'Chhattisgarh',
    tagline: 'Steel & Architectural Hardware Hub',
    distance: '38 km (via NH-53)',
    dispatchTime: 'Same-day dispatch on orders placed before 2:00 PM',
    keyMarkets: 'Light Industrial Area Bhilai, Power House Market, Supela Hardware Market, Civic Center Trade Hub',
    popularSkus: 'SA-07 Sliding Rollers, SA-11 Domal Locks, SA-33 Black Door Kits, 2D/3D Adjustable Hinges',
    description: 'Direct wholesale transport supply to Bhilai steel fabricators, window fabricators, and commercial glazing contractors with daily freight transit.',
  },
  {
    slug: 'durg',
    name: 'Durg',
    state: 'Chhattisgarh',
    tagline: 'Glazing & Hardware Supply Center',
    distance: '44 km (via NH-53)',
    dispatchTime: 'Same-day dispatch via local express transport lines',
    keyMarkets: 'Station Road Market, Ganj Para, Industrial Area Borai, Durg Trade Center',
    popularSkus: 'SA-[#1-13] Rollers & Channels, SA-44 Capsule Door Closers, SA-24 Acoustic Door Seals',
    description: 'Reliable trade supply of architectural hardware, slimline door kits, and glass fittings to contractors and glass shops across Durg district.',
  },
  {
    slug: 'bilaspur',
    name: 'Bilaspur',
    state: 'Chhattisgarh',
    tagline: 'Northern CG Trade Distribution Hub',
    distance: '115 km (via Raipur-Bilaspur Expressway)',
    dispatchTime: 'Next-morning delivery for orders placed before 4:00 PM',
    keyMarkets: 'Vyapar Vihar Commercial Complex, Link Road Hardware Market, Sirgitti Industrial Area, Tifra Market',
    popularSkus: 'SA-33 Champion Finish Door Kits, SA-[#35-41] Tower Bolts & Handles, Glass Railing Channels',
    description: 'Bulk hardware shipment hub servicing commercial builders, window fabricators, and retail hardware dealers throughout Bilaspur.',
  },
  {
    slug: 'korba',
    name: 'Korba',
    state: 'Chhattisgarh',
    tagline: 'Industrial Power & Hardware Market',
    distance: '210 km (via SH-18 / NH-130)',
    dispatchTime: '24-hour freight dispatch via dedicated Korba transport lines',
    keyMarkets: 'Transport Nagar Korba, Niharika Market, TP Nagar Trade Center, Jamnipali Commercial Zone',
    popularSkus: 'SA-42/SA-44 Heavy Hydraulic Door Closers, SA-27 Heavy Aluminium Hinges, Industrial Fasteners',
    description: 'Engineered heavy-duty door closers, architectural extrusions, and hardware supplies for industrial plants and commercial complexes in Korba.',
  },
  {
    slug: 'rajnandgaon',
    name: 'Rajnandgaon',
    state: 'Chhattisgarh',
    tagline: 'Western CG Commercial Supply Zone',
    distance: '72 km (via NH-53)',
    dispatchTime: 'Same-day evening delivery on morning trade orders',
    keyMarkets: 'Ganj Line Hardware Market, Cinema Line, Industrial Area Tedesara',
    popularSkus: 'SA-[#11-23] Crescent & Touch Locks, SA-30 Mini Door Kits, Weather Strips & Gaskets',
    description: 'Fast wholesale hardware delivery servicing Rajnandgaon dealers, interior decorators, and door fabricators.',
  },
];

export default function LocationsHubPage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0B1F3A] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-full text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            <span>Central India Distribution Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Aluminium Hardware Supply Hubs & City Delivery Network
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl font-medium leading-relaxed">
            Salasar Aluminium & Hardware operates a daily wholesale logistics network from our Bhaisthan, Raipur main store to key commercial hubs across Chhattisgarh.
          </p>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 space-y-2 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-extrabold text-[#0B1F3A]">Tier-1 Chhattisgarh Direct Supply Cities</h2>
          <p className="text-xs text-slate-600">Select a city to view local transit times, key trade markets, and popular SKU demand mix.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CITIES_DATA.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="bg-white border border-[#E2E8F0] hover:border-[#0B1F3A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#B8860B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                    {city.distance}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Active Supply Hub
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0B1F3A] group-hover:text-[#B8860B] transition-colors">
                    {city.name}, {city.state}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">{city.tagline}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {city.description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div><strong>Transit:</strong> {city.dispatchTime}</div>
                  <div><strong>Markets:</strong> {city.keyMarkets}</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B1F3A] group-hover:text-[#B8860B]">
                <span>View {city.name} Hardware Coverage</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#B8860B]" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <TradeQuoteFormSection />
    </div>
  );
}
