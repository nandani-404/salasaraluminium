import Link from 'next/link';
import { PhoneCall, Languages } from 'lucide-react';
import { BUSINESS, TEL_HREF, whatsappLink } from '@/config/business';
import { HI } from '@/lib/i18n/hi';

/**
 * Shared chrome for the Hindi section.
 *
 * The root layout owns the single <html> element, so rather than restructuring
 * every route in the app into an `[locale]` segment, Hindi pages wrap their
 * content in `lang="hi"`. That is valid HTML, it tells assistive technology and
 * search engines the language of the subtree, and hreflang (set per page in
 * metadata) is what Google actually treats as authoritative for targeting.
 *
 * Every Hindi page carries a visible link to its English equivalent, and the
 * English pages link back — a language pair with links in only one direction
 * is a common hreflang mistake.
 */
export default function HindiShell({
  englishHref,
  breadcrumb,
  children,
}: {
  /** The English equivalent of this page. */
  englishHref: string;
  breadcrumb?: { label: string; href?: string }[];
  children: React.ReactNode;
}) {
  return (
    <div lang="hi" className="pt-16 sm:pt-28 pb-8 sm:pb-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex flex-wrap items-center justify-between gap-3">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="text-xs text-[#64748B]">
            <ol className="flex flex-wrap items-center gap-1.5 list-none p-0">
              <li className="flex items-center gap-1.5">
                <Link href="/hi" className="hover:text-[#0B1F3A]">
                  {HI.ui.home}
                </Link>
                <span aria-hidden="true">/</span>
              </li>
              {breadcrumb.map((b, i) => (
                <li key={b.label} className="flex items-center gap-1.5">
                  {b.href && i < breadcrumb.length - 1 ? (
                    <>
                      <Link href={b.href} className="hover:text-[#0B1F3A]">
                        {b.label}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  ) : (
                    <span className="text-[#0B1F3A] font-semibold" aria-current="page">
                      {b.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Link
          href={englishHref}
          hrefLang="en-IN"
          lang="en"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] hover:text-[#8A6408] underline"
        >
          <Languages className="w-3.5 h-3.5" aria-hidden="true" />
          {HI.ui.englishVersion}
        </Link>
      </div>

      {children}

      {/* Contact strip — repeated because Hindi-language visitors arriving on a
          deep page are frequently ready to call rather than browse further. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-[#0B1F3A] text-white rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold">रेट या जानकारी के लिए सीधे बात कीजिए</h2>
          <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
            {HI.ui.counterAddress}: {BUSINESS.addressLine}. {HI.ui.openHours}: {HI.ui.openDaily}.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={TEL_HREF}
              data-analytics="click_call"
              data-analytics-location="hi-contact-strip"
              className="inline-flex items-center gap-2 min-h-11 px-5 bg-[#8A6408] hover:bg-[#6F5006] text-white text-sm font-bold rounded-lg transition-colors"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              {HI.ui.callNow}: {BUSINESS.phones.primary.display}
            </a>
            <a
              href={whatsappLink({
                message: 'नमस्ते Salasar, मुझे हार्डवेयर चाहिए। मैं फोटो भेज रहा हूँ।',
                source: '/hi',
                campaign: 'hindi',
              })}
              data-analytics="click_whatsapp"
              data-analytics-location="hi-contact-strip"
              className="inline-flex items-center gap-2 min-h-11 px-5 bg-white/10 border border-white/30 text-white text-sm font-bold rounded-lg hover:bg-white/20 transition-colors"
            >
              {HI.ui.whatsappUs}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
