import Link from 'next/link';
import Image from 'next/image';
import { PhoneCall, MapPin } from 'lucide-react';
import CatalogueCard from '@/components/catalogue/CatalogueCard';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import EnquireButton from '@/components/EnquireButton';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { getProductSchema, getBreadcrumbSchema, getFaqSchema } from '@/lib/jsonld';
import { BUSINESS, TEL_HREF, whatsappLink } from '@/config/business';
import { relatedProducts, getCategory, type CatalogueProduct } from '@/data/products';

/**
 * Product template for the 86 real catalogue SKUs.
 *
 * Every field shown is read from the catalogue record. The previous template
 * ran catalogue SKUs through an adapter that padded them with claims nobody had
 * verified — "Alloy 6063-T6", "Mill Test Certified", "MOQ: 50 Units",
 * "same-day dispatch" — identically on all 86 pages. Those are gone: the spec
 * table now lists only what the data actually contains, and omits a row rather
 * than filling it with a plausible-sounding default.
 */

/**
 * Answer-first FAQs: the first sentence of each answer is the direct answer, so
 * it can be lifted as a featured snippet or by an answer engine without the
 * surrounding text. Built from the product's own data — never invented specs.
 */
function buildFaqs(product: CatalogueProduct) {
  const faqs: { question: string; answer: string }[] = [];

  faqs.push({
    question: `What is ${product.name} (${product.sku}) used for?`,
    answer: `${product.shortDescription} It is filed under ${product.category} in our catalogue${
      product.useCases.length
        ? `, and is typically fitted in ${product.useCases.slice(0, 3).join(', ').toLowerCase()} settings`
        : ''
    }.`,
  });

  if (product.finishes.length || product.sizes.length || product.variants.length) {
    const parts: string[] = [];
    if (product.finishes.length) parts.push(`finishes: ${product.finishes.join(', ')}`);
    if (product.sizes.length) parts.push(`sizes: ${product.sizes.join(', ')}`);
    if (product.variants.length) parts.push(`variants: ${product.variants.join(', ')}`);
    faqs.push({
      question: `What finishes and sizes does ${product.sku} come in?`,
      answer: `${product.name} is stocked in ${parts.join('; ')}. Tell us which one you need when you call, or send a photograph of the part you are replacing and we will match it.`,
    });
  } else {
    faqs.push({
      question: `Does ${product.sku} come in more than one size or finish?`,
      answer: `${product.name} is stocked in one standard specification. If you need a different size or finish, call us and we will tell you honestly whether it is something we can source.`,
    });
  }

  faqs.push({
    question: `How do I order ${product.sku} from Raipur?`,
    answer: `Quote the code ${product.sku} by phone on ${BUSINESS.phones.primary.display} or on WhatsApp and we will confirm availability and price. You can also collect it from our counter at ${BUSINESS.address.streetAddress}, ${BUSINESS.address.addressLocality}. If you do not know the code, a photograph of the old part is enough for us to identify it.`,
  });

  faqs.push({
    question: `Can I buy a single piece, or do I have to order in bulk?`,
    answer: `You can buy a single piece over the counter. Dealers, fabricators and contractors buy at trade rates in box quantities, and homeowners, architects, interior designers and builders can buy what a single project needs with no minimum order.`,
  });

  return faqs;
}

export default function CatalogueProductPage({ product }: { product: CatalogueProduct }) {
  const category = getCategory(product.categorySlug);
  const related = relatedProducts(product, 4);
  const faqs = buildFaqs(product);
  const path = `/product/${product.slug}`;

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Products', item: '/products' },
    { name: product.category, item: `/products/${product.categorySlug}` },
    { name: product.name, item: path },
  ];

  // Spec rows are built conditionally: a row only appears when there is real
  // data behind it.
  const specs: { label: string; value: string }[] = [
    { label: 'Item code (SKU)', value: product.sku },
    { label: 'Category', value: product.category },
  ];
  if (product.materials.length) specs.push({ label: 'Material', value: product.materials.join(', ') });
  if (product.finishes.length) specs.push({ label: 'Finishes stocked', value: product.finishes.join(', ') });
  if (product.sizes.length) specs.push({ label: 'Sizes stocked', value: product.sizes.join(', ') });
  if (product.variants.length) specs.push({ label: 'Variants', value: product.variants.join(', ') });
  specs.push({ label: 'Stocked at', value: `${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion}` });

  const waMessage = `Hello Salasar, I would like a quote for ${product.name} (${product.sku}).`;

  return (
    <div className="bg-white min-h-screen pt-16 sm:pt-24 pb-10 sm:pb-20">
      <JsonLd schema={getProductSchema(product)} />
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getFaqSchema(faqs)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        <nav aria-label="Breadcrumb" className="pt-4 text-xs text-[#64748B]">
          <ol className="flex flex-wrap items-center gap-1.5 list-none p-0">
            {breadcrumbs.map((b, i) => (
              <li key={b.item} className="flex items-center gap-1.5">
                {i < breadcrumbs.length - 1 ? (
                  <>
                    <Link href={b.item} className="hover:text-[#0B1F3A]">
                      {b.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                ) : (
                  <span className="text-[#0B1F3A] font-semibold" aria-current="page">
                    {b.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex items-center justify-center">
            <Image
              src={product.image}
              alt={`${product.name} (${product.sku}) — ${product.category}, stocked in Raipur`}
              width={600}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-contain w-full h-auto max-h-[420px]"
            />
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#8A6408]">
                {product.category}
              </p>
              {/* H1 carries the product name, the SKU and the city. */}
              <h1 className="text-2xl sm:text-4xl font-bold text-[#0B1F3A] leading-tight">
                {product.name} ({product.sku}) — Raipur
              </h1>
              <p className="text-base text-[#475569] leading-relaxed">{product.shortDescription}</p>
            </div>

            {/* Where it is used */}
            {product.useCases.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-[#0B1F3A]">Where it is used</h2>
                <ul className="flex flex-wrap gap-2 list-none p-0">
                  {product.useCases.map((use) => (
                    <li
                      key={use}
                      className="px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#334155]"
                    >
                      {use}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* CTA block — WhatsApp text is prefilled with the SKU and page URL */}
            <section className="p-5 bg-white border border-[#E2E8F0] rounded-2xl space-y-3">
              <h2 className="text-sm font-bold text-[#0B1F3A]">
                Ask for a price on {product.sku}
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                We quote on enquiry rather than publishing a rate card, because the price depends on
                quantity and finish. Quote the code and we will answer straight away.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-2.5">
                <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto sm:gap-2.5">
                  <a
                    href={TEL_HREF}
                    data-analytics="click_call"
                    data-analytics-sku={product.sku}
                    data-analytics-location="product-cta"
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-11 px-2.5 sm:px-5 bg-[#8A6408] hover:bg-[#6F5006] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-center truncate"
                  >
                    <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{BUSINESS.phones.primary.display}</span>
                  </a>
                  <a
                    href={whatsappLink({ message: waMessage, source: path, campaign: 'product' })}
                    data-analytics="click_whatsapp"
                    data-analytics-sku={product.sku}
                    data-analytics-location="product-cta"
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-11 px-2.5 sm:px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-2xs text-center truncate"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span className="truncate">
                      <span className="sm:hidden">WhatsApp</span>
                      <span className="hidden sm:inline">WhatsApp about {product.sku}</span>
                    </span>
                  </a>
                </div>
                <EnquireButton
                  sku={product.sku}
                  analyticsLocation="product-cta"
                  className="inline-flex items-center justify-center min-h-11 px-5 bg-white border border-[#0B1F3A] text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#F1F5F9] transition-colors w-full sm:w-auto"
                >
                  Request a quote
                </EnquireButton>
              </div>
              <p className="flex items-start gap-1.5 text-xs text-[#64748B] leading-relaxed">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Counter: {BUSINESS.addressLine}. {BUSINESS.hours.display}.
                </span>
              </p>
            </section>
          </div>
        </div>

        {/* Specification table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">Specification</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] bg-white border border-[#E2E8F0] rounded-xl overflow-hidden text-left">
              <caption className="sr-only">
                Specification for {product.name}, item code {product.sku}
              </caption>
              <tbody>
                {specs.map((row, i) => (
                  <tr key={row.label} className={i % 2 ? 'bg-[#F8FAFC]' : 'bg-white'}>
                    <th
                      scope="row"
                      className="py-3 px-4 text-sm font-semibold text-[#0B1F3A] w-1/3 align-top"
                    >
                      {row.label}
                    </th>
                    <td className="py-3 px-4 text-sm text-[#475569]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed max-w-3xl">
            Only specifications we hold on record are listed. If you need a dimension, load rating or
            compatibility detail that is not shown here, call us and we will measure the actual item
            rather than quote a figure we cannot stand behind.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">
            Questions about {product.sku}
          </h2>
          <FaqList faqs={faqs} />
        </section>

        {related.length > 0 && category && (
          <section className="space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl font-bold text-[#0B1F3A]">
                Other {category.name.toLowerCase()}
              </h2>
              <Link
                href={`/products/${product.categorySlug}`}
                className="text-xs font-bold text-[#0B1F3A] hover:text-[#8A6408]"
              >
                See the full category →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {related.map((p) => (
                <CatalogueCard key={p.sku} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
