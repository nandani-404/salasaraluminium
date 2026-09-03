import { Product, ProductFaq } from '../data/products';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Salasar Aluminium & Hardware',
    url: 'https://salasarhardware.com',
    logo: 'https://salasarhardware.com/logo.png',
    description: 'Luxury architectural hardware, custom aluminium profiles, and high-performance fittings for residential, commercial, and industrial projects.',
    telephone: '+91-98200-12345',
    email: 'inquiries@salasarhardware.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '102 Hardware Galleria, SV Road',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400053',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://linkedin.com/company/salasar-hardware',
      'https://instagram.com/salasarhardware',
    ],
  };
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    sku: product.sku,
    mpn: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Salasar Aluminium & Hardware',
    },
    offers: {
      '@type': 'Offer',
      url: `https://salasarhardware.com/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Salasar Aluminium & Hardware',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };
}

export function generateFaqSchema(faqs: ProductFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
