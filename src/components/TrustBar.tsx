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

  /*
   * The marquee repeats the same pillars four times so the loop never shows a
   * gap. Only the first pass is real content; the other three are visual
   * duplicates and are marked aria-hidden below. Without that, a screen reader
   * reads every feature four times, and the duplicated text also appears four
   * times in the DOM that search engines parse.
   */
  const MARQUEE_REPEATS = 4;
  const marqueePillars = Array.from({ length: MARQUEE_REPEATS }, () => pillars).flat();

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
              // Everything after the first pass is a visual duplicate.
              aria-hidden={idx >= pillars.length ? true : undefined}
              className="w-[230px] sm:w-[250px] shrink-0 px-3.5 py-2.5 rounded-lg bg-white border border-slate-200/90 hover:border-amber-400/70 hover:shadow-xs transition-all duration-200 flex items-center space-x-3"
            >
              <div className="p-2 rounded-md bg-amber-50/80 border border-amber-200/60 shrink-0">
                {pillar.icon}
              </div>
              <div className="min-w-0 flex-1">
                {/* A <p>, not a heading: these are labels in a decorative
                    ticker, and as <h4> they skipped from the page <h1> straight
                    to level 4 and broke the document outline. */}
                <p className="text-xs font-semibold text-slate-800 tracking-tight truncate">
                  {pillar.title}
                </p>
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
