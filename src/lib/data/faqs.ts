import { BUSINESS } from '@/config/business';

/**
 * Sitewide FAQs, rendered as visible HTML and mirrored into FAQPage schema.
 *
 * WHAT CHANGED AND WHY
 *
 * 1. [CONFIRM] RETAIL POSITIONING — needs owner sign-off before launch.
 *    The previous answer read "We supply direct wholesale trade orders only —
 *    to dealers, fabricators, contractors, and project developers." The brief
 *    asks for a clear path for homeowners, architects, interior designers and
 *    builders alongside the trade offer, and the business has a walk-in counter
 *    listed on Google Maps. Those two positions cannot both be on the site.
 *    The answer below reflects the new, broader positioning, and the rest of
 *    the site is written to match it. If the business is in fact trade-only,
 *    this one flag has to flip back and the homeowner wording comes out of the
 *    city, category, product and hub pages with it.
 *
 * 2. UNVERIFIED OPERATIONAL CLAIMS REMOVED. "Same-day dispatch across
 *    Chhattisgarh", "ship Pan-India", "MOQ from standard box packs (10-50
 *    pieces)" and "custom extrusion length cuts" were all asserted as fact with
 *    nothing behind them. Replaced with answers that are true regardless of
 *    operational detail, and that route the specific question to a phone call.
 *
 * 3. MANUFACTURER CLAIM SOFTENED. The business described itself as a
 *    "wholesale manufacturer" while also stating production is by Swastik
 *    Industries. [CONFIRM] the real relationship — see the entities block in
 *    src/config/business.ts.
 */

export interface SiteFaq {
  question: string;
  answer: string;
  category?: string;
}

export const SITE_FAQS: SiteFaq[] = [
  {
    question: 'Do you sell to homeowners, or only to dealers and fabricators?',
    answer: `Both. Dealers, fabricators and contractors buy at trade rates in box quantities, and we also supply homeowners, architects, interior designers and builders buying for a single project. You can buy a single piece over the counter — there is no minimum order for a walk-in purchase.`,
    category: 'Ordering',
  },
  {
    question: 'How do I find the right part if I do not know what it is called?',
    answer: `Bring the old part to the counter, or send a photograph of it on WhatsApp to ${BUSINESS.phones.primary.display}. Matching against the physical item is faster and far more reliable than working from a description, and it costs nothing to check. Aluminium window and door sections are not standardised between fabricators, so a photo settles in a minute what a phone description often cannot.`,
    category: 'Ordering',
  },
  {
    question: 'What are SA codes?',
    answer: `Every item in our catalogue carries a fixed SA code — SA-33 is the Aluminium Door Kit, SA-42 the hydraulic door closer, SA-76 the 90° wall-to-glass shower hinge. Quote the code and we know exactly which item you mean, with no ambiguity about size or finish. You can browse all of them on the Products page.`,
    category: 'Catalogue',
  },
  {
    question: 'Where is your counter, and when are you open?',
    answer: `${BUSINESS.addressLine}. We are open ${BUSINESS.hours.display}. The counter is where stock is held, so if you need to match a part by hand, that is the place to do it.`,
    category: 'Location',
  },
  {
    question: 'Do you deliver outside Raipur?',
    answer: `Yes, across Chhattisgarh. Transit time and freight depend on the district, the transport line and the size of the consignment, so we confirm both against your actual order rather than promising a fixed figure. Call ${BUSINESS.phones.primary.display} with your item list and delivery address and we will tell you what it will cost and how long it will take before you pay.`,
    category: 'Delivery',
  },
  {
    question: 'How do I get a price?',
    answer: `Call or WhatsApp ${BUSINESS.phones.primary.display} with the SA codes and quantities you need, or send the quote form on this site. We quote on enquiry rather than publishing a rate card, because the price depends on quantity and finish — a single piece over the counter and a box quantity for a dealer are not the same rate.`,
    category: 'Ordering',
  },
  {
    question: 'What finishes are available?',
    answer: `It varies by item, and the finishes stocked for each one are listed on its product page. The ones that recur across the range are matte black, brown, champion, ivory, white, gold and CP chrome plating. If you need a finish that is not listed for an item, ask — we will tell you honestly whether it is something we can source.`,
    category: 'Specifications',
  },
  {
    question: 'How many items do you stock?',
    answer: `86, grouped into 12 categories: rollers, bearings and channels; locks and latches; door and window seals and stoppers; hinges; door kits; bolts and handles; door closers; fittings and accessories; tapes, sealants and adhesives; fasteners and screws; glass hardware and shower fittings; and abrasives, mesh and miscellaneous.`,
    category: 'Catalogue',
  },
  {
    question: 'Is there a minimum order?',
    answer: `Not at the counter — you can buy one piece. For delivered orders, what makes sense depends on the freight to your district, so we will tell you whether an order is worth shipping or better collected. Trade rates apply to box and bulk quantities.`,
    category: 'Ordering',
  },
];
