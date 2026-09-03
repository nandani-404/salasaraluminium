'use client';

import React, { useState } from 'react';
import { Award, Layers, Shield, CheckCircle2, Truck, Wrench } from 'lucide-react';

export default function TrustBar() {
  const [isPaused, setIsPaused] = useState(false);

  const pillars = [
    {
      title: 'Premium Quality',
      desc: 'Superior grade extruded alloys',
      icon: <Award className="w-4 h-4 text-[#B8860B]" />
    },
    {
      title: 'Wide Catalogue',
      desc: '86+ trade hardware SKUs in stock',
      icon: <Layers className="w-4 h-4 text-[#B8860B]" />
    },
    {
      title: 'Durable Finish',
      desc: 'Anodized & powder-coated protection',
      icon: <Shield className="w-4 h-4 text-[#B8860B]" />
    },
    {
      title: 'Trusted Partner',
      desc: 'Direct factory trade pricing',
      icon: <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
    },
    {
      title: 'Raipur Stock Hub',
      desc: 'Same-day regional dispatch',
      icon: <Truck className="w-4 h-4 text-[#B8860B]" />
    },
    {
      title: 'Custom Orders',
      desc: 'Tailored extrusion lengths & specs',
      icon: <Wrench className="w-4 h-4 text-[#B8860B]" />
    }
  ];

  // Quadruple items array for endless smooth horizontal motion across wide screens
  const marqueePillars = [...pillars, ...pillars, ...pillars, ...pillars];

  return (
    <section className="bg-[#F8FAFC] py-3 border-y border-slate-200/80 w-full overflow-hidden">
      <div
        className="flex overflow-x-auto scrollbar-none py-1 scroll-smooth select-none cursor-grab active:cursor-grabbing w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="animate-marquee flex space-x-4 shrink-0"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {marqueePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="w-[230px] sm:w-[250px] shrink-0 px-3.5 py-2.5 rounded-lg bg-white border border-slate-200/90 hover:border-amber-400/70 hover:shadow-xs transition-all duration-200 flex items-center space-x-3 cursor-pointer"
            >
              <div className="p-2 rounded-md bg-amber-50/80 border border-amber-200/60 shrink-0">
                {pillar.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-slate-800 tracking-tight truncate">
                  {pillar.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
