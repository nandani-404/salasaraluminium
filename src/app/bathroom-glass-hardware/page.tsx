import type { Metadata } from 'next';
import HubPage from '@/components/catalogue/HubPage';
import { CATALOGUE } from '@/data/products';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Cross-category hub for bathroom and shower glass hardware.
 *
 * "Shower hinge", "glass door hinge" and "wall to glass connector" are how
 * people search; "Glass Hardware & Shower Fittings" is how we file it. This
 * page bridges the two and pulls in the sealant and mesh items that belong to a
 * bathroom job but live in other categories.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Bathroom & Shower Glass Hardware, Raipur | Salasar',
  description:
    'Shower hinges for 8-12 mm glass, wall-to-glass and glass-to-glass connectors, patch fittings, knobs and sealant, stocked in Raipur. Call or send a photo.',
  path: '/bathroom-glass-hardware',
});

const bySku = (skus: string[]) => CATALOGUE.filter((p) => skus.includes(p.sku));

export default function BathroomGlassHardwarePage() {
  return (
    <HubPage
      path="/bathroom-glass-hardware"
      eyebrow="Bathroom & shower glass fittings — Raipur"
      h1="Bathroom &amp; Shower Glass Hardware in Raipur"
      quickAnswer="Bathroom glass hardware is the set of fittings that holds a shower enclosure together: hinges that carry the glass door, connectors that join glass to a wall or to another panel, a lock or knob to open it, and silicone to seal the joints. Salasar stocks all four in Raipur."
      intro="A frameless shower enclosure is held entirely by its hardware, so the fittings have to match the glass thickness and the angle of the joint. Get the angle right first — 0 degrees for a fixed panel, 90 degrees for wall-to-glass, 180 degrees for two panels in line — then the thickness. If you are unsure, send a photograph of the corner on WhatsApp with the glass thickness and we will tell you which fitting to use."
      whatsappMessage="Hello Salasar, I need shower and bathroom glass fittings. I am sending a photo of the corner."
      groups={[
        {
          heading: 'Shower hinges by angle',
          intro:
            'Choose by the joint you are making. SA-75 is a 0-degree fixed clip for a stationary panel. SA-76 is a 90-degree wall-to-glass hinge, the most common for a door hung off a wall. SA-77 is a 180-degree glass-to-glass hinge for two panels in line. SA-78 is a 90-degree double glass-to-glass hinge for a corner enclosure. All are chrome plated, which is the standard finish for a wet area.',
          categorySlug: 'glass-hardware-shower-fittings',
          products: bySku(['SA-75', 'SA-76', 'SA-77', 'SA-78']),
        },
        {
          heading: 'Wall-to-glass and glass-to-glass connectors',
          intro:
            'Connectors hold fixed panels rather than moving doors. Wall-to-glass brackets anchor a panel to masonry at 90 degrees; glass-to-glass connectors join two panels at 180 degrees. The large and small L-brackets suit structural corners and shower cubicle joints respectively.',
          categorySlug: 'glass-hardware-shower-fittings',
          products: bySku(['SA-68', 'SA-69', 'SA-72', 'SA-73', 'SA-74']),
        },
        {
          heading: 'Handles, knobs and glass door locks',
          intro:
            'A frameless glass door cannot take a conventional handle, so it uses a back-to-back knob through a drilled hole, or a flush concealed pull for sliding panels. Patch and centre locks are the fittings used where a glass door needs to lock — more common on an office or shopfront door than a shower.',
          categorySlug: 'glass-hardware-shower-fittings',
          products: bySku(['SA-66', 'SA-67', 'SA-70', 'SA-71', 'SA-65']),
        },
        {
          heading: 'Sealing, privacy film and ventilation',
          intro:
            'Neutral-cure silicone seals the perimeter where glass meets tile or masonry, and is what keeps water inside the enclosure. Frosted film adds privacy to a clear panel without replacing the glass. Aluminium louvres handle the permanent ventilation most bathroom windows need.',
          categorySlug: 'tapes-sealants-adhesives',
          products: bySku(['SA-55', 'SA-57', 'SA-51', 'SA-82', 'SA-49']),
        },
      ]}
      faqs={[
        {
          question: 'Which shower hinge do I need for 8 mm or 12 mm glass?',
          answer:
            'Pick the hinge by the joint angle first, then confirm it is rated for your glass thickness. Toughened shower glass is normally 8 mm, 10 mm or 12 mm, and a heavier panel needs a hinge rated to carry it — a 12 mm door on a hinge meant for 8 mm will sag and eventually drop. Tell us the thickness and the angle when you call and we will confirm the correct SA code from stock. [CONFIRM] Per-hinge glass thickness ratings are to be added once supplied.',
        },
        {
          question: 'What is the difference between a wall-to-glass and a glass-to-glass connector?',
          answer:
            'A wall-to-glass connector fixes a glass panel to a solid wall, usually at 90 degrees, and is screwed into masonry on one side. A glass-to-glass connector joins two glass panels to each other with no wall involved, most often at 180 degrees for panels in line or 90 degrees for a corner. Neither is a hinge: connectors hold fixed panels, hinges carry doors that move.',
        },
        {
          question: 'Do I need a patch fitting or a hinge for a glass door?',
          answer:
            'A hinge is the right choice for a shower door, where the load is light and it swings from a wall or an adjacent panel. Patch fittings are for heavier frameless doors — shop and office entrances — where the door pivots on a floor spring and the patch transfers the load at the top and bottom corners. Fitting a shower hinge to a full-height entrance door will not hold.',
        },
        {
          question: 'Can I buy a single shower hinge, or is there a minimum order?',
          answer:
            'You can buy a single piece at the counter in Bhaisthan, Raipur. There is no minimum order for over-the-counter purchases. Bulk and box quantities are available at trade rates for dealers, fabricators and contractors.',
        },
      ]}
    />
  );
}
