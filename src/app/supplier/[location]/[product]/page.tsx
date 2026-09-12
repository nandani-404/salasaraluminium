import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resolvePSEOParams, PSEO_LOCATIONS, PSEO_PRODUCTS } from '@/lib/data/pseoData';
import { BASE_URL } from '@/lib/jsonld';
import { SAH_BUSINESS_DETAILS } from '@/lib/sahData';
import TradeQuoteFormSection from '@/components/TradeQuoteFormSection';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Building2, CheckCircle2, Layers, ShieldCheck, Truck, PhoneCall, ChevronRight, Package, Wrench, Award } from 'lucide-react';

interface PageProps {
  params: Promise<{
    location: string;
    product: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location, product } = await params;
  const data = resolvePSEOParams(location, product);

  if (!data) return {};

  const rawTitle = `Wholesale ${data.product.name} ${data.location.name}`;
  const title = rawTitle.length > 38 ? `${rawTitle.substring(0, 35)}...` : rawTitle;
  const rawDesc = `Wholesale B2B supplier of ${data.product.name} (${data.product.saCode}) in ${data.location.name}. Direct trade pricing for fabricators and builders. Same-day dispatch.`;
  const description = rawDesc.length > 150 ? `${rawDesc.substring(0, 147)}...` : rawDesc;
  const canonicalUrl = `${BASE_URL}/supplier/${data.location.slug}/${data.product.slug}`;

  return {
    title,
    description,
    keywords: [
      `${data.product.name} ${data.location.name}`,
      `wholesale ${data.product.name} supplier`,
      `aluminium hardware dealer in ${data.location.name}`,
      `${data.product.saCode} price`,
      `hardware distributor ${data.location.state}`
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: SAH_BUSINESS_DETAILS.brandName,
      images: [
        {
          url: `${BASE_URL}/cat-rollers.png`,
          width: 1200,
          height: 630,
          alt: `${data.product.name} - Salasar Aluminium Hardware Supplier in ${data.location.name}`,
        },
      ],
    },
  };
}

export default async function PSEOSupplierProductPage({ params }: PageProps) {
  const { location, product } = await params;
  const data = resolvePSEOParams(location, product);

  if (!data) {
    notFound();
  }

  const { location: loc, product: prod } = data;
  const canonicalUrl = `${BASE_URL}/supplier/${loc.slug}/${prod.slug}`;

  // Find 4 related products and 6 nearby locations for internal SEO cross-linking
  const relatedProducts = PSEO_PRODUCTS.filter(p => p.category === prod.category && p.slug !== prod.slug).slice(0, 4);
  const nearbyLocations = PSEO_LOCATIONS.filter(l => l.state === loc.state && l.slug !== loc.slug).slice(0, 6);

  // Structured JSON-LD Data
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${prod.name} (Code: ${prod.saCode})`,
    image: `${BASE_URL}/cat-rollers.png`,
    description: `Wholesale ${prod.name} manufactured with ${prod.material} in ${prod.finish} finish. Trade distribution to ${loc.name}, ${loc.state}.`,
    sku: prod.saCode,
    mpn: prod.saCode,
    brand: {
      '@type': 'Brand',
      name: SAH_BUSINESS_DETAILS.brandName,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SAH_BUSINESS_DETAILS.brandName,
        url: BASE_URL,
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${BASE_URL}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: loc.name,
        item: `${BASE_URL}/supplier/${loc.slug}/${prod.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: prod.name,
        item: canonicalUrl,
      },
    ],
  };

  const waText = encodeURIComponent(`*Wholesale Trade Quote Request*\nHi Abhishek, I need a trade price quote for *${prod.name}* (${prod.saCode}) for my business in *${loc.name}, ${loc.state}*.`);
  const waUrl = `https://api.whatsapp.com/send/?phone=918007443071&text=${waText}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-neutral-950 text-neutral-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap py-1">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
            <Link href="/locations" className="hover:text-amber-400 transition-colors">Locations</Link>
            <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
            <span className="text-neutral-300">{loc.name}</span>
            <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
            <span className="text-amber-400 font-medium">{prod.name}</span>
          </nav>

          {/* Hero Header */}
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-850 border border-neutral-800 rounded-2xl p-5 sm:p-6 md:p-10 mb-8 sm:mb-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 max-w-full truncate">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Wholesale B2B Trade Supply • {loc.name}, {loc.state}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Wholesale <span className="text-amber-400">{prod.name}</span> Supplier in {loc.name}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-3xl leading-relaxed mb-6 sm:mb-8">
              Salasar Aluminium & Hardware is the authorized wholesale supplier of high-grade{' '}
              <strong className="text-white">{prod.name}</strong> (Code: <code className="text-amber-400">{prod.saCode}</code>) for dealers, window fabricators, glass contractors, and commercial developers in <strong>{loc.name}</strong> and across {loc.state}.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 text-center"
              >
                <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                <span>Get Wholesale Price for {loc.name}</span>
              </a>
              <a
                href="#enquiry"
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold px-6 py-3.5 rounded-xl border border-neutral-700 transition-colors text-center"
              >
                Send Bulk Inquiry
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Left Technical Specifications & Info */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  Product Specifications & Trade Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800/80">
                    <span className="text-xs text-neutral-400 block uppercase tracking-wider mb-1">Product Name</span>
                    <span className="text-sm font-semibold text-white">{prod.name}</span>
                  </div>
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800/80">
                    <span className="text-xs text-neutral-400 block uppercase tracking-wider mb-1">Catalog Item Code</span>
                    <span className="text-sm font-bold text-amber-400">{prod.saCode}</span>
                  </div>
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800/80">
                    <span className="text-xs text-neutral-400 block uppercase tracking-wider mb-1">Category</span>
                    <span className="text-sm font-medium text-neutral-200">{prod.category}</span>
                  </div>
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800/80">
                    <span className="text-xs text-neutral-400 block uppercase tracking-wider mb-1">Material Alloy / Grade</span>
                    <span className="text-sm font-medium text-neutral-200">{prod.material}</span>
                  </div>
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800/80">
                    <span className="text-xs text-neutral-400 block uppercase tracking-wider mb-1">Surface Finish</span>
                    <span className="text-sm font-medium text-neutral-200">{prod.finish}</span>
                  </div>
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800/80">
                    <span className="text-xs text-neutral-400 block uppercase tracking-wider mb-1">Supply Region</span>
                    <span className="text-sm font-medium text-amber-300">{loc.name}, {loc.state}</span>
                  </div>
                </div>
              </div>

              {/* Why Buy Section */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  Why Choose Salasar Aluminium in {loc.name}?
                </h3>
                <ul className="space-y-3 text-sm text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Direct Factory Trade Pricing:</strong> Get competitive wholesale rates with zero middleman markup.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Guaranteed Material Quality:</strong> Manufactured to stringent architectural standards for long-lasting performance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Fast Express Dispatch:</strong> Shipped directly from our central Raipur warehouse depot to {loc.name} within 24–48 hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Dedicated B2B Support:</strong> Special credit accounts and bulk rate locks for registered dealers and contractors.</span>
                  </li>
                </ul>
              </div>

              {/* Frequently Asked Questions */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                    <h4 className="font-semibold text-white text-sm mb-2">How can I place a wholesale order for {prod.name} in {loc.name}?</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      You can instantly request a wholesale quotation by clicking the WhatsApp button or submitting the bulk inquiry form below. Our sales manager Abhishek (+91 8007443071) will provide a customized trade quote based on your order volume.
                    </p>
                  </div>
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                    <h4 className="font-semibold text-white text-sm mb-2">Do you deliver {prod.name} directly to {loc.name}?</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Yes! We arrange direct transport dispatch from our central Raipur warehouse depot to {loc.name} and surrounding industrial zones across {loc.state}.
                    </p>
                  </div>
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                    <h4 className="font-semibold text-white text-sm mb-2">What is the minimum order quantity for item code {prod.saCode}?</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      We offer flexible trade packaging ranging from standard box packs for fabricators to full crate wholesale quantities for retail hardware dealers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Inquiry Form */}
            <div className="lg:col-span-5" id="enquiry">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-2">Request Trade Quote</h3>
                <p className="text-xs text-neutral-400 mb-6">
                  Get instant bulk rate quotation for <strong>{prod.name}</strong> delivered to <strong>{loc.name}</strong>.
                </p>
                <TradeQuoteFormSection />
              </div>
            </div>
          </div>

          {/* Internal Cross Linking Section */}
          <div className="border-t border-neutral-800 pt-12">
            <h4 className="text-lg font-bold text-white mb-4">Related Hardware Products in {loc.name}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/supplier/${loc.slug}/${rp.slug}`}
                  className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/50 p-3 rounded-lg text-xs font-medium text-neutral-300 hover:text-amber-400 transition-all block truncate"
                >
                  {rp.name}
                </Link>
              ))}
            </div>

            {nearbyLocations.length > 0 && (
              <>
                <h4 className="text-lg font-bold text-white mb-4">{prod.name} Suppliers in Nearby Locations</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {nearbyLocations.map((nl) => (
                    <Link
                      key={nl.slug}
                      href={`/supplier/${nl.slug}/${prod.slug}`}
                      className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/50 p-3 rounded-lg text-xs font-medium text-neutral-400 hover:text-amber-400 transition-all block text-center truncate"
                    >
                      {nl.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
