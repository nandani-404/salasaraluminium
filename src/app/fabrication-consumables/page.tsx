import type { Metadata } from 'next';
import HubPage from '@/components/catalogue/HubPage';
import { productsInCategory, CATALOGUE } from '@/data/products';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Hub aimed squarely at the trade buyer rather than the homeowner: the items a
 * fabrication workshop reorders every month. Different intent from the rest of
 * the site, which is why it is its own page — this reader already knows what
 * they want and is comparing supply, not researching a fix.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Fabrication Consumables &amp; Fasteners, Raipur | Salasar',
  description:
    'Screws, cutting wheels, flap discs, silicone, PU foam, VHB tape and corner cleats for aluminium fabricators in Raipur. Box and bulk quantities at trade rates.',
  path: '/fabrication-consumables',
});

const bySku = (skus: string[]) => CATALOGUE.filter((p) => skus.includes(p.sku));

export default function FabricationConsumablesPage() {
  return (
    <HubPage
      path="/fabrication-consumables"
      eyebrow="Trade supply — Raipur, Chhattisgarh"
      h1="Fabrication Consumables &amp; Fasteners in Raipur"
      quickAnswer="These are the items an aluminium fabrication workshop reorders rather than buys once: self-drilling and self-tapping screws, cutting wheels and flap discs, silicone and PU foam, VHB tape, and corner cleats for frame assembly. Salasar supplies all of them at trade rates from Bhaisthan, Raipur."
      intro="If you run a workshop, the problem with consumables is not choosing them — it is not running out mid-job. Send us a standing list of what you get through in a month and we will hold it. Everything below carries an SA code, so a reorder is a two-line WhatsApp message rather than a conversation. Trade rates apply to box and bulk quantities; there is no minimum at the counter if you just need to top up."
      whatsappMessage="Hello Salasar, I would like trade rates on fabrication consumables. My monthly list is:"
      groups={[
        {
          heading: 'Screws and fasteners',
          intro:
            'Self-drilling screws (SDS) cut their own pilot hole in aluminium and sheet metal. Self-tapping screws (STS) need a pilot but hold better in extrusion. Black phosphate drywall screws are for partition board only — they corrode anywhere damp. Carriage bolts give a clean domed head with no visible drive where the fixing will be seen.',
          categorySlug: 'fasteners-screws',
          products: productsInCategory('fasteners-screws'),
        },
        {
          heading: 'Cutting and finishing',
          intro:
            'Thin reinforced cutting wheels cut aluminium sections faster and cleaner than general-purpose discs and load up less. Zirconia flap discs take down weld beads and sharp cut edges without gouging.',
          categorySlug: 'abrasives-mesh-misc',
          products: bySku(['SA-79', 'SA-80']),
        },
        {
          heading: 'Sealants, foams and adhesives',
          intro:
            'Use neutral-cure silicone on anything touching aluminium — acetic-cure attacks the finish over time. PU foam fills the gap behind a frame that no strip seal reaches. VHB tape bonds without visible fixings: grey is the structural grade, clear for joints visible through glass. A steel skeleton gun outlasts several pressed-metal ones.',
          categorySlug: 'tapes-sealants-adhesives',
          products: productsInCategory('tapes-sealants-adhesives'),
        },
        {
          heading: 'Frame assembly and anchoring',
          intro:
            'Corner cleats are the internal joint keys crimped into a 90-degree window frame corner. Wall plugs anchor frames into masonry, and plug size matters more than screw size for holding power. PVC track angles stop water pooling in 2-track and 3-track window sills — cheap, and routinely left out.',
          categorySlug: 'fittings-accessories',
          products: bySku(['SA-85', 'SA-46', 'SA-52', 'SA-53', 'SA-54']),
        },
      ]}
      faqs={[
        {
          question: 'Do you hold stock for regular trade customers?',
          answer:
            'Send us the list of what you get through in a typical month and we will keep it moving rather than have you discover a shortage mid-job. Quote SA codes on a reorder and we can pick it without a conversation about specification.',
        },
        {
          question: 'Which screw should I use in aluminium extrusion?',
          answer:
            'A self-tapping screw made for aluminium. A wood screw strips the thread in thin extrusion and the fitting works loose — this is one of the most common causes of a hardware item failing months after it was fitted. Self-drilling screws are for sheet and thinner sections where you want to skip the pilot hole.',
        },
        {
          question: 'What are your trade rates?',
          answer:
            'We quote on enquiry rather than publishing a rate card, because the rate depends on quantity and how regularly you order. Send your list with quantities and we will come back with a price you can plan against.',
        },
        {
          question: 'Can I collect, or do you deliver?',
          answer:
            'Both. Collection from the counter in Bhaisthan is immediate. For delivery within Chhattisgarh we will tell you honestly whether the freight makes sense for your order size or whether collection is the better call.',
        },
      ]}
    />
  );
}
