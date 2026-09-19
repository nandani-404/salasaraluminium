/**
 * SINGLE SOURCE OF TRUTH for all Name / Address / Phone (NAP) data.
 *
 * Every footer, contact block, JSON-LD schema, llms.txt entry and blog byline
 * must read from here. Never hard-code an address or phone number anywhere else
 * — inconsistent NAP across a site is the single most common local-SEO defect.
 *
 * [CONFIRM] markers flag values the owner must verify against the live
 * Google Business Profile before this ships. See SEO-CONFIRM.md.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.salasaraluminium.shop';

export const BUSINESS = {
  /** Legal + display name. Must match Google Business Profile character-for-character. */
  name: 'Salasar Aluminium & Hardware',
  legalName: 'Salasar Aluminium & Hardware',
  shortName: 'Salasar',
  logoMark: 'SAH',
  tagline: 'Quality • Strength • Trust',
  secondaryLine: 'Strength in Every Detail, Quality in Every Product.',

  description:
    'Wholesale supplier of aluminium door and window hardware in Raipur, Chhattisgarh — rollers, locks, hinges, door kits, door closers, glass and shower fittings, fasteners and sealants across 86 standardised SKUs.',

  /**
   * [CONFIRM] Canonical postal address.
   * Two variants exist in the current codebase and on third-party listings:
   *   A) "Shop No. 3, JK Steel Gali, Bhaisthan, Bhawani Patna, Ramsagar Para, Jawahar Nagar"
   *   B) "Near Mahavir Traders, Punjab Oil Mill Road"
   * Only one may be used sitewide, and it must match the Google Business Profile
   * exactly. Variant A is used below because it is the one stored in the app data.
   */
  address: {
    streetAddress: 'Shop No. 3, JK Steel Gali, Bhaisthan, Bhawani Patna, Ramsagar Para, Jawahar Nagar',
    addressLocality: 'Raipur',
    addressRegion: 'Chhattisgarh',
    postalCode: '492001',
    addressCountry: 'IN',
  },

  /** Pre-formatted one-line address for display in footers and contact blocks. */
  get addressLine(): string {
    const a = BUSINESS.address;
    return `${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}, India`;
  },

  /** Verified from the Google Maps place listing for "Salasar Aluminium hardware". */
  geo: {
    latitude: 21.248,
    longitude: 81.628,
  },

  /**
   * Phones. `primary.href` is the ONLY value that may appear in a tel: link —
   * E.164, no spaces, no punctuation. `display` is for human-readable text.
   */
  phones: {
    primary: { display: '+91 80074 43071', href: '+918007443071', whatsapp: '918007443071' },
    secondary: { display: '+91 90793 32560', href: '+919079332560', whatsapp: '919079332560' },
  },

  contactPerson: 'Abhishek',

  /** [CONFIRM] Verify this mailbox is monitored before publishing it sitewide. */
  email: 'sales@salasaraluminium.shop',

  /**
   * [CONFIRM] Opening hours. Currently 09:00–21:00 all seven days, inherited from
   * the previous schema. These are published as machine-readable
   * openingHoursSpecification, so wrong hours produce wrong Google results.
   */
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const,
    opens: '09:00',
    closes: '21:00',
    display: 'Monday to Sunday, 9:00 AM – 9:00 PM',
  },

  maps: {
    url: 'https://www.google.com/maps/place/Salasar+Aluminium+hardware/@21.2480051,81.6254585,17z/data=!3m1!4b1!4m6!3m5!1s0x3a28ddad7a46804b:0xb79590d9017166be!8m2!3d21.2480001!4d81.6280388!16s%2Fg%2F11nblxggfj?hl=en',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.5924176815556!2d81.6254585!3d21.2480051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddad7a46804b%3A0xb79590d9017166be!2sSalasar%20Aluminium%20hardware!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },

  /**
   * Related trading entities. Described here once, in plain language, so the
   * same wording is reused everywhere instead of being reinvented per page.
   * [CONFIRM] the role of each — the descriptions below are the site's current
   * best understanding and must be corrected by the owner if wrong.
   */
  entities: [
    {
      name: 'Salasar Aluminium & Hardware',
      role: 'The retail and wholesale counter in Bhaisthan, Raipur. This is the business you order from.',
    },
    {
      name: 'Lieon Marketing',
      role: '[CONFIRM] Associated Raipur trading name used for part of the hardware distribution.',
    },
    {
      name: 'Finetek',
      role: '[CONFIRM] Associated Raipur trading name / product line stocked at the same counter.',
    },
    {
      name: 'Swastik Industries',
      role: '[CONFIRM] Manufacturing partner whose products are stocked and distributed by Salasar.',
    },
  ],

  /**
   * [CONFIRM] Every URL below must be a real, live profile owned by the business.
   * The previous codebase listed IndiaMART / TradeIndia / JustDial URLs that
   * appear to have been invented; publishing a fabricated `sameAs` actively
   * damages entity resolution. Only the Google Maps listing is verified, so it
   * is the only entry enabled. Add the others once their real URLs are supplied.
   */
  sameAs: [
    'https://www.google.com/maps/place/Salasar+Aluminium+hardware/@21.2480051,81.6254585,17z/data=!3m1!4b1!4m6!3m5!1s0x3a28ddad7a46804b:0xb79590d9017166be!8m2!3d21.2480001!4d81.6280388!16s%2Fg%2F11nblxggfj?hl=en',
  ],

  /** Cities with a dedicated /locations/<slug> page. Used for schema areaServed. */
  areaServed: [
    'Raipur', 'Naya Raipur', 'Bhilai', 'Durg', 'Bilaspur', 'Korba', 'Rajnandgaon',
    'Raigarh', 'Jagdalpur', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bemetara', 'Kanker',
  ],
} as const;

/** `tel:` href — the only phone link form allowed anywhere in the app. */
export const TEL_HREF = `tel:${BUSINESS.phones.primary.href}`;

/**
 * Builds a WhatsApp deep link with a prefilled message and UTM attribution so
 * WhatsApp-sourced leads are attributable to the page that produced them.
 */
export function whatsappLink(opts: {
  message: string;
  /** Path of the page the click came from, e.g. "/products/door-kits". */
  source?: string;
  campaign?: string;
}): string {
  const utm = opts.source
    ? `?utm_source=website&utm_medium=whatsapp&utm_campaign=${opts.campaign || 'enquiry'}&utm_content=${encodeURIComponent(opts.source)}`
    : '';
  const text = opts.source ? `${opts.message}\n\nPage: ${SITE_URL}${opts.source}${utm}` : opts.message;
  return `https://wa.me/${BUSINESS.phones.primary.whatsapp}?text=${encodeURIComponent(text)}`;
}
