import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import CatalogueCard from '@/components/catalogue/CatalogueCard';
import FaqList, { type Faq } from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/jsonld';
import { BUSINESS, TEL_HREF, whatsappLink } from '@/config/business';
import type { CatalogueProduct } from '@/data/products';

/**
 * Shared layout for the cross-category topic hubs (/window-hardware,
 * /bathroom-glass-hardware).
 *
 * These exist because buyers search by the thing they are fitting — "aluminium
 * window fittings", "bathroom glass hardware" — not by our internal category
 * names. A hub pulls the relevant SKUs from several categories into one page
 * that matches how the search is actually phrased, and links down into the
 * category pages rather than competing with them.
 */

export interface HubGroup {
  heading: string;
  /** Why this group matters for the hub's topic. Two or three sentences. */
  intro: string;
  /** Category slug to link through to. */
  categorySlug: string;
  products: CatalogueProduct[];
}

export default function HubPage({
  path,
  eyebrow,
  h1,
  quickAnswer,
  intro,
  groups,
  faqs,
  whatsappMessage,
}: {
  path: string;
  eyebrow: string;
  h1: string;
  /** 40-60 words, factual, first sentence answers the page's implicit question. */
  quickAnswer: string;
  intro: string;
  groups: HubGroup[];
  faqs: Faq[];
  whatsappMessage: string;
}) {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: h1, item: path },
  ]);

  return (
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-white min-h-screen">
      <JsonLd schema={breadcrumb} />
      <JsonLd schema={getFaqSchema(faqs)} />

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 border-b border-slate-200 space-y-4">
        <nav aria-label="Breadcrumb" className="text-xs text-[#64748B]">
          <Link href="/" className="hover:text-[#0B1F3A]">
            Home
          </Link>
          <span className="mx-1.5" aria-hidden="true">
            /
          </span>
          <span className="text-[#0B1F3A] font-semibold">{h1}</span>
        </nav>

        <p className="text-xs font-bold uppercase tracking-widest text-[#8A6408]">{eyebrow}</p>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight max-w-4xl">
          {h1}
        </h1>

        {/*
          Quick answer box. Answer-first, 40-60 words, factual — the block an
          answer engine can lift verbatim without needing the rest of the page.
        */}
        <div className="max-w-3xl p-5 bg-white border-l-4 border-[#B8860B] border-y border-r border-[#E2E8F0] rounded-r-xl">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#8A6408] mb-2">
            Quick answer
          </h2>
          <p className="text-base text-[#1E293B] leading-relaxed">{quickAnswer}</p>
        </div>

        <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">{intro}</p>

        <div className="flex flex-wrap gap-2.5 pt-1">
          <a
            href={TEL_HREF}
            data-analytics="click_call"
            data-analytics-location={`hub${path}`}
            className="inline-flex items-center gap-2 min-h-11 px-5 bg-[#8A6408] hover:bg-[#6F5006] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
          >
            <PhoneCall className="w-4 h-4" aria-hidden="true" />
            Call {BUSINESS.phones.primary.display}
          </a>
          <a
            href={whatsappLink({ message: whatsappMessage, source: path, campaign: 'hub' })}
            data-analytics="click_whatsapp"
            data-analytics-location={`hub${path}`}
            className="inline-flex items-center gap-2 min-h-11 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-2xs"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>WhatsApp a photo of the part</span>
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {groups.map((group) => (
          <section key={group.heading} className="space-y-4 sm:space-y-6">
            <div className="space-y-2 border-b border-slate-200 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">{group.heading}</h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
                {group.intro}
              </p>
              <Link
                href={`/products/${group.categorySlug}`}
                className="inline-block text-xs font-bold text-[#0B1F3A] hover:text-[#8A6408]"
              >
                See the full category →
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {group.products.map((p) => (
                <CatalogueCard key={p.sku} product={p} />
              ))}
            </div>
          </section>
        ))}

        <section className="space-y-5 pt-4 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">Common questions</h2>
          <FaqList faqs={faqs} />
        </section>
      </div>

      <TradeQuoteFormSection />
    </div>
  );
}
