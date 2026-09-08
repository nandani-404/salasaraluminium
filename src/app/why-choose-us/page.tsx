import React from 'react';
import Link from 'next/link';
import { 
  Factory, 
  Boxes, 
  Tag, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  CheckCircle2, 
  XCircle, 
  Building,
  Users,
  Clock,
  Award
} from 'lucide-react';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';

export const metadata = {
  title: 'Why Choose Us | Salasar Aluminium & Hardware Raipur',
  description: 'Discover why leading architects, fabricators, hardware dealers, and contractors trust Salasar Aluminium & Hardware for direct factory extrusion pricing, massive Raipur ready stock, and fast regional dispatch.',
};

const PILLARS = [
  {
    number: '01',
    icon: Factory,
    title: 'Direct Factory Extrusion Network',
    subtitle: 'Partnered with Swastik Industries (Mumbai)',
    description: 'Direct tie-ups with precision extrusion plants ensure 6063-T5/T6 grade virgin alloy purity, tight dimensional tolerances, and high-tensile structural integrity for all aluminium sections.',
    metric: '6063 Alloy',
    metricLabel: 'Virgin Grade Purity'
  },
  {
    number: '02',
    icon: Boxes,
    title: 'Massive Ready Stock Inventory',
    subtitle: 'Dual Raipur Warehouses & Outlets',
    description: 'We maintain over 500+ Metric Tons of aluminium extrusion profiles and over 100,000 hardware units in stock at our Bhaisthan & Lieon Marketing hubs for instant order pickup.',
    metric: '500+ MT',
    metricLabel: 'In-Stock Capacity'
  },
  {
    number: '03',
    icon: Tag,
    title: 'Direct Wholesale B2B Pricing',
    subtitle: 'Zero Middleman Markups',
    description: 'We sell directly to registered dealers, fabricators, and commercial contractors at true factory wholesale rates with transparent bulk quantity discount tiers.',
    metric: 'Wholesale',
    metricLabel: 'Direct Factory Rates'
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: '500,000-Cycle Certified Hardware',
    subtitle: 'Strict Quality Control & Durability',
    description: 'Every door closer, floor spring, lockset, and hinge undergoes rigorous load-capacity verification and salt-spray testing for corrosion resistance.',
    metric: '500k Cycles',
    metricLabel: 'Hardware Load Tested'
  },
  {
    number: '05',
    icon: Truck,
    title: 'Same-Day Express Regional Dispatch',
    subtitle: 'Central India Logistics Reach',
    description: 'Orders placed before 2:00 PM are dispatched same-day to project sites and dealer stores across Chhattisgarh, Odisha, Madhya Pradesh, and Pan-India.',
    metric: 'Same-Day',
    metricLabel: 'Regional Shipping'
  },
  {
    number: '06',
    icon: Headphones,
    title: 'Technical Support & CAD Assistance',
    subtitle: 'Expert Trade Desk Guidance',
    description: 'Our experienced technical team assists fabricators and architects with section weight calculation, glass cutout drawings, and custom extrusion section sourcing.',
    metric: '1-on-1',
    metricLabel: 'Trade Desk Support'
  }
];

const COMPARISON = [
  { feature: 'Product Alloy Standard', salasar: 'Virgin 6063-T5 / T6 Certified', traditional: 'Varies / Scrap Mixed Alloys' },
  { feature: 'Pricing Model', salasar: 'Direct Factory B2B Wholesale Pricing', traditional: 'High Retail Markup & Broker Fees' },
  { feature: 'Raipur Stock Availability', salasar: 'Massive Ready Warehouse Inventory (Immediate)', traditional: '7–15 Days Procurement Delay' },
  { feature: 'Hardware Guarantee', salasar: 'Tested up to 500,000 Cycles (SS304 Grade)', traditional: 'Standard Unbranded Commercial Fittings' },
  { feature: 'Dispatch Speed', salasar: 'Same-Day Regional Dispatch from Bhaisthan Hub', traditional: '3–5 Days Processing Time' },
  { feature: 'Technical Guidance', salasar: 'Dedicated Section Weight & CAD Advice', traditional: 'Sales Only / No Technical Assistance' }
];

export default function WhyChooseUsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B1F3A] pt-24 pb-20">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 rounded-full">
            <Award className="w-3.5 h-3.5 text-[#B8860B]" />
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-widest">
              25+ Years of Wholesale Integrity
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1F3A] tracking-tight leading-[1.1]">
            Why Builders & Fabricators Trust Salasar
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed pt-2">
            Direct factory manufacturing support, massive ready stock in Raipur, and direct wholesale pricing engineered to power your projects with complete reliability.
          </p>
        </div>
      </section>

      {/* Core Pillars - Non-Card Line Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-slate-200">
          {PILLARS.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div 
                key={idx}
                className="py-12 sm:py-16 group transition-colors duration-300 hover:bg-slate-50/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                  
                  {/* Left Column: Index & Icon Title */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-black text-[#B8860B] tracking-wider">{pillar.number}</span>
                      <span className="w-8 h-px bg-[#B8860B]/30" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{pillar.subtitle}</span>
                    </div>

                    <div className="flex items-center space-x-3.5">
                      <IconComp className="w-6 h-6 text-[#0B1F3A] shrink-0 group-hover:text-[#B8860B] transition-colors" />
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight group-hover:text-[#B8860B] transition-colors">
                        {pillar.title}
                      </h2>
                    </div>
                  </div>

                  {/* Middle Column: Detailed Description */}
                  <div className="lg:col-span-4 text-sm text-slate-600 leading-relaxed font-normal">
                    <p>{pillar.description}</p>
                  </div>

                  {/* Right Column: Key Metric Highlight */}
                  <div className="lg:col-span-3 lg:text-right border-l-2 lg:border-l-0 lg:border-r-2 border-[#B8860B]/30 pl-4 lg:pl-0 lg:pr-6 py-2">
                    <div className="text-2xl sm:text-3xl font-black text-[#0B1F3A]">
                      {pillar.metric}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#8C6B1B] mt-0.5">
                      {pillar.metricLabel}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20 border-t border-slate-200 pt-16">
        <div className="max-w-3xl mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block">Direct B2B Advantage</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Salasar Direct Model vs Traditional Retailers
          </h2>
        </div>

        <div className="border-t border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="py-4 pr-6 font-extrabold w-1/3">Operational Dimension</th>
                <th className="py-4 px-6 font-extrabold text-[#0B1F3A] bg-slate-50 w-1/3">Salasar B2B Wholesale</th>
                <th className="py-4 pl-6 font-extrabold text-slate-400 w-1/3">Traditional Dealers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 pr-6 font-bold text-[#0B1F3A] text-xs sm:text-sm">{row.feature}</td>
                  <td className="py-4 px-6 font-bold text-[#0B1F3A] bg-slate-50">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0" />
                      <span>{row.salasar}</span>
                    </div>
                  </td>
                  <td className="py-4 pl-6 text-slate-500 font-medium">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 border-y border-slate-200 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#0B1F3A] font-extrabold">
              <Building className="w-4 h-4 text-[#B8860B]" />
              <h3 className="text-sm sm:text-base">Direct Raipur Hub</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Visit Bhaisthan showroom or Lieon Marketing hub for immediate section pickup and material inspection.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#0B1F3A] font-extrabold">
              <Users className="w-4 h-4 text-[#B8860B]" />
              <h3 className="text-sm sm:text-base">1,500+ B2B Client Base</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Supplying fabricators, interior contractors, and dealers across 10+ states in Central India.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#0B1F3A] font-extrabold">
              <Clock className="w-4 h-4 text-[#B8860B]" />
              <h3 className="text-sm sm:text-base">Quarter-Century Legacy</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Decades of technical expertise in aluminium extrusions, structural fittings, and hardware distribution.
            </p>
          </div>
        </div>
      </section>

      {/* Trade Quote CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TradeQuoteFormSection />
      </section>
    </div>
  );
}



