import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, Truck, ChevronRight, ShieldCheck, PhoneCall, Building2 } from 'lucide-react';
import { SAH_BUSINESS_DETAILS, SAH_CATEGORIES } from '@/lib/sahData';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import FAQSection from '@/components/FAQSection';


export const metadata: Metadata = {
  title: 'Supplier Locations & Delivery Network',
  description: 'Salasar Aluminium & Hardware supplies fabricators and contractors across Chhattisgarh from our main Raipur warehouse hub. View local supply routes.',
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
    description: 'Our primary warehouse in Bhaisthan stocks 86+ SKUs for walk-in fabricators and instant dispatch across Raipur capital region.',
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
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0B1F3A] text-white py-8 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-full text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            <span>Central India Distribution Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Where We Supply — Raipur & Across Chhattisgarh
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl font-medium leading-relaxed">
            Our main stock hub and showroom is located at Shop No. 3, Salasar Aluminium & Hardware, JK Steel Gali, Bhaisthan, Bhawani Patna, Ramsagar Para, Jawahar Nagar, Raipur, Chhattisgarh – 492001. From here, we dispatch same-day to fabricators and contractors across the region, with additional distribution through our Lieon Marketing branch.
          </p>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="mb-10 space-y-2 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-extrabold text-[#0B1F3A]">Tier-1 Chhattisgarh Direct Supply Cities</h2>
          <p className="text-xs text-slate-600">Select a city to view local transit times, key trade markets, and popular SKU demand mix.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {CITIES_DATA.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="bg-white border border-[#E2E8F0] hover:border-[#0B1F3A] rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2 sm:space-y-4">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-[#B8860B] bg-[#F8FAFC] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-[#E2E8F0] truncate">
                    {city.distance}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
                    Active Hub
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-xl font-bold text-[#0B1F3A] group-hover:text-[#B8860B] transition-colors leading-tight">
                    {city.name}<span className="hidden sm:inline">, {city.state}</span>
                  </h3>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate">{city.tagline}</p>
                </div>

                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {city.description}
                </p>

                <div className="pt-1.5 sm:pt-2 border-t border-slate-100 space-y-1 text-[10px] sm:text-xs text-slate-600">
                  <div className="truncate"><strong>Transit:</strong> {city.dispatchTime}</div>
                  <div className="truncate hidden sm:block"><strong>Markets:</strong> {city.keyMarkets}</div>
                </div>
              </div>

              <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs font-bold text-[#0B1F3A] group-hover:text-[#B8860B]">
                <span className="truncate">View Coverage</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform text-[#B8860B] shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <TradeQuoteFormSection />

      {/* Locations Page FAQ Block */}
      <FAQSection
        title="Frequently asked questions about our supply locations."
        faqs={[
          {
            question: 'Where is your main hardware stock hub located?',
            answer: 'Shop No. 3, Salasar Aluminium & Hardware, JK Steel Gali, Bhaisthan, Bhawani Patna, Ramsagar Para, Jawahar Nagar, Raipur, Chhattisgarh – 492001.',
            category: 'Headquarters',
          },
          {
            question: 'Do you deliver outside Raipur city?',
            answer: 'Yes — we dispatch across Chhattisgarh and supply Pan-India for bulk trade orders.',
            category: 'Delivery',
          },
        ]}
      />
    </div>
  );
}

