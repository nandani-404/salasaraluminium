import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import EnquireButton from '@/components/EnquireButton';
import { getFaqSchema } from '@/lib/jsonld';
import { SITE_FAQS, type SiteFaq } from '@/lib/data/faqs';

/**
 * Server-rendered FAQ block.
 *
 * This was a Client Component using a framer-motion accordion that mounted only
 * the currently-open answer. With twelve questions that meant eleven answers
 * were absent from the HTML entirely, and all twelve were absent with
 * JavaScript disabled — while FAQPage schema was emitted for every one of them.
 * Google requires the answer text in FAQ markup to be present on the page, so
 * the markup was asserting content the page did not contain.
 *
 * It now renders through native <details>/<summary>, so every answer is in the
 * initial HTML, the schema matches what a reader sees, and the expand/collapse
 * behaviour costs no JavaScript.
 */
export default function FAQSection({
  title = 'Frequently asked questions',
  subtitle,
  faqs = SITE_FAQS,
  limit,
  showContactCTA = true,
}: {
  title?: string;
  subtitle?: string;
  faqs?: SiteFaq[];
  limit?: number;
  showContactCTA?: boolean;
}) {
  const displayed = limit ? faqs.slice(0, limit) : faqs;
  if (displayed.length === 0) return null;

  return (
    <section className="py-10 sm:py-20 bg-white border-t border-[#E2E8F0]">
      {/* Generated from the same array rendered below, never a separate list. */}
      <JsonLd schema={getFaqSchema(displayed)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">
              Common questions
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight leading-tight">
              {title}
            </h2>

            {subtitle && (
              <p className="text-base text-[#475569] leading-relaxed">{subtitle}</p>
            )}

            {showContactCTA && (
              <p className="pt-2 text-base text-[#475569] leading-relaxed">
                Not answered here?{' '}
                <EnquireButton
                  analyticsLocation="faq-section"
                  className="text-[#0B1F3A] font-bold underline hover:text-[#8A6408] transition-colors cursor-pointer"
                >
                  Send us your question
                </EnquireButton>
              </p>
            )}
          </div>

          <div className="lg:col-span-7">
            <FaqList faqs={displayed} />
          </div>
        </div>
      </div>
    </section>
  );
}
