import type { Metadata } from 'next';
import { HI } from '@/lib/i18n/hi';
import HindiShell from '@/components/i18n/HindiShell';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'एल्युमीनियम हार्डवेयर — सामान्य सवाल | Salasar रायपुर',
  description:
    'ऑर्डर कैसे दें, SA कोड क्या है, रायपुर के बाहर डिलीवरी कैसे होती है, रेट कैसे मिलता है और मिनिमम ऑर्डर कितना है — सभी सवालों के सीधे और साफ़ जवाब।',
  path: '/hi/faq',
  locale: 'hi_IN',
  languages: { 'en-IN': '/faq', 'hi-IN': '/hi/faq' },
});

export default function HindiFaqPage() {
  return (
    <HindiShell englishHref="/faq" breadcrumb={[{ label: HI.ui.faq }]}>
      <JsonLd
        schema={getBreadcrumbSchema([
          { name: HI.ui.home, item: '/hi' },
          { name: HI.ui.faq, item: '/hi/faq' },
        ])}
      />
      <JsonLd schema={getFaqSchema(HI.faqs)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
          एल्युमीनियम हार्डवेयर — सामान्य सवाल
        </h1>
        <p className="text-base text-[#475569] leading-relaxed">
          ऑर्डर देने से पहले लोग जो सवाल सबसे ज़्यादा पूछते हैं, उनके सीधे जवाब। आपका सवाल यहाँ न
          हो तो सीधे कॉल या WhatsApp कीजिए।
        </p>
        <FaqList faqs={HI.faqs} />
      </div>
    </HindiShell>
  );
}
