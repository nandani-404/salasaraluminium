import { SAH_BUSINESS_DETAILS, SAHProduct } from './sahData';

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://salasaraluminium.com';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${BASE_URL}/#organization`,
    name: SAH_BUSINESS_DETAILS.brandName,
    legalName: 'Salasar Aluminium & Hardware',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Wholesale manufacturer & supplier of architectural aluminium extrusions, locks, hinges, door kits, door closers, fasteners, and shower fittings based in Raipur, Chhattisgarh.',
    telephone: SAH_BUSINESS_DETAILS.contactPersons[0].phoneNumbers[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop No. 3, Near Mahavir Traders, Punjab Oil Mill Road, Bhaisthan',
      addressLocality: 'Raipur',
      addressRegion: 'Chhattisgarh',
      postalCode: '492001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '21.2514',
      longitude: '81.6296',
    },
    branch: SAH_BUSINESS_DETAILS.branches.map(b => ({
      '@type': 'LocalBusiness',
      name: `${b.name} - ${b.location}`,
      address: 'Raipur, Chhattisgarh, India'
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
  };
}

export function getSAHProductSchema(product: SAHProduct) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.saCode,
    image: product.image,
    description: product.shortDesc,
    category: product.categoryName,
    brand: {
      '@type': 'Brand',
      name: 'Salasar Aluminium & Hardware',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: '0',
      priceValidUntil: '2028-12-31',
      availability: 'https://schema.org/InStock',
      description: 'Wholesale trade price on inquiry for bulk dealer orders.',
    },
  };
}

export function getProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image || (product.images && product.images[0]),
    description: product.shortDescription || product.shortDesc,
    brand: {
      '@type': 'Brand',
      name: 'Salasar Aluminium & Hardware',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: '0',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function getArticleSchema(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.image,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Salasar Aluminium & Hardware',
      logo: `${BASE_URL}/logo.png`,
    },
    description: post.excerpt,
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: `${BASE_URL}${it.item}`,
    })),
  };
}

export const getBreadcrumbsSchema = getBreadcrumbSchema;

export function getFaqSchema(qaBlocks: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (qaBlocks || []).map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
      },
    })),
  };
}
