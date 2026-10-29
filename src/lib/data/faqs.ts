import { BUSINESS } from '@/config/business';

/**
 * Sitewide FAQs, rendered as visible HTML and mirrored into FAQPage schema.
 *
 * Enriched with high-intent commercial, technical, and local search queries:
 * wholesale box rates, SA-33 door kits, hydraulic door closers, floor springs,
 * SS 304 mosquito wire mesh, and Chhattisgarh supply routes.
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
    question: 'Where can I buy wholesale sliding window rollers and bearings in Raipur?',
    answer: `Salasar Aluminium & Hardware stocks complete sliding window rollers, nylon ball bearings, brass bearings, and C-channel / G-channel tracks at our Bhaisthan counter in Raipur. We supply single replacement pieces for walk-in homeowners and bulk carton box packaging for dealers and fabricators across Chhattisgarh. Call or WhatsApp ${BUSINESS.phones.primary.display} for current box rates.`,
    category: 'Products',
  },
  {
    question: 'What is included in the SA-33 Aluminium Door Kit, and what finishes are available?',
    answer: `The SA-33 Aluminium Door Kit contains a matched set of architectural hardware: heavy aluminium pull handles, mortise lock and key cylinder mechanism, top and bottom tower bolts, and rubber-cushioned door stoppers. It is stocked in Matte Black (powder-coated), Brown / Chocolate, Champion / Satin Champagne, Matt Silver (anodized), and CP (Chrome Plated). Full carton trade packaging is available from Raipur.`,
    category: 'Products',
  },
  {
    question: 'How do I choose between an overhead hydraulic door closer and a floor spring for glass doors?',
    answer: `For standard aluminium section doors and wooden flush doors weighing 45kg to 85kg, an overhead hydraulic door closer (such as SA-42 or SA-43) mounted on the top frame is ideal. For heavy toughened glass doors, patch fitting doors, or double-action swing doors weighing 80kg to 120kg, a heavy-duty floor spring installed into the floor provides superior stability, smooth centering, and hold-open capability.`,
    category: 'Technical',
  },
  {
    question: 'Do you supply SS 304 mosquito net wire mesh (machhar jaali) rolls in wholesale?',
    answer: `Yes. We supply heavy SS 304 stainless steel mosquito mesh, aluminium wire jaali, and fiberglass mesh in standard width rolls (3 ft, 4 ft, and custom widths). We offer wholesale roll rates for fabricators and hardware dealers in Raipur, Bhilai, Bilaspur, and across Chhattisgarh, as well as cut lengths for single window frames at the counter.`,
    category: 'Products',
  },
  {
    question: 'How to adjust hydraulic door closer closing and latching speed?',
    answer: `Standard hydraulic door closers like SA-42 feature two brass adjustment valves on the body. Valve 1 controls closing speed (the arc from 180° down to 15°), while Valve 2 controls latching speed (the final 15° snap into the frame). Turn clockwise to slow down the speed, or counter-clockwise to speed it up. Never unscrew either valve completely, as hydraulic oil will leak out.`,
    category: 'Technical',
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
    question: 'Do you deliver outside Raipur to Bhilai, Durg, Bilaspur, and other districts?',
    answer: `Yes, across Chhattisgarh. From our central Bhaisthan counter in Raipur, we dispatch daily trade consignments via local transport lines to Bhilai, Durg, Bilaspur, Korba, Rajnandgaon, Raigarh, Jagdalpur, Ambikapur, and Dhamtari. Call ${BUSINESS.phones.primary.display} with your item list and delivery address to confirm freight and transit time before you pay.`,
    category: 'Delivery',
  },
  {
    question: 'How do I get a price or wholesale rate card?',
    answer: `Call or WhatsApp ${BUSINESS.phones.primary.display} with the SA codes and quantities you need, or send the quote form on this site. We quote on enquiry rather than publishing a fixed rate card, because the price depends on quantity and finish — a single piece over the counter and a box quantity for a dealer are quoted at tailored trade slabs.`,
    category: 'Ordering',
  },
  {
    question: 'What finishes are available?',
    answer: `It varies by item, and the finishes stocked for each one are listed on its product page. The ones that recur across the range are matte black, brown, champion, ivory, white, gold and CP chrome plating. If you need a finish that is not listed for an item, ask — we will tell you honestly whether it is something we can source.`,
    category: 'Specifications',
  },
  {
    question: 'How many items do you stock in Raipur?',
    answer: `86, grouped into 12 categories: rollers, bearings and channels; locks and latches; door and window seals and stoppers; hinges; door kits; bolts and handles; door closers; fittings and accessories; tapes, sealants and adhesives; fasteners and screws; glass hardware and shower fittings; and abrasives, mesh and miscellaneous.`,
    category: 'Catalogue',
  },
  {
    question: 'Is there a minimum order?',
    answer: `Not at the counter — you can buy one piece. For delivered orders, what makes sense depends on the freight to your district, so we will tell you whether an order is worth shipping or better collected. Trade rates apply to box and bulk quantities.`,
    category: 'Ordering',
  },
];
