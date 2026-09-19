import type { Metadata } from 'next';
import HubPage from '@/components/catalogue/HubPage';
import { productsInCategory, CATALOGUE } from '@/data/products';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Cross-category hub for door fittings.
 *
 * "Door handle", "door closer", "tower bolt" and "door kit" are searched as a
 * group by anyone fitting or repairing a door, but our catalogue files them
 * across four separate categories. This page gathers them under the job rather
 * than the filing system.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Aluminium Door Hardware in Raipur | Salasar',
  description:
    'Door kits, handles, tower bolts, closers, hinges and bottom seals stocked in Raipur. Match a part by photo on WhatsApp or quote the SA code for a price.',
  path: '/door-hardware',
});

const bySku = (skus: string[]) => CATALOGUE.filter((p) => skus.includes(p.sku));

export default function DoorHardwarePage() {
  return (
    <HubPage
      path="/door-hardware"
      eyebrow="Door fittings — Raipur, Chhattisgarh"
      h1="Aluminium Door Hardware &amp; Fittings in Raipur"
      quickAnswer="Door hardware is everything that makes a door hang, latch, close and seal: a kit or individual handles and locks, hinges that carry the leaf, a closer that brings it back, bolts for secondary fastening, and a bottom seal against dust. Salasar stocks all of it in Raipur under SA codes."
      intro="A door problem is almost always one component, not the whole door. A leaf that will not latch usually needs the closer adjusted rather than replaced; a door that catches at one corner needs a hinge adjustment; a room that fills with dust needs a bottom seal. Below is the full door range across our catalogue, grouped by what each part actually does, so you can identify the one you need before you call."
      whatsappMessage="Hello Salasar, I need door hardware. I am sending a photo of the door."
      groups={[
        {
          heading: 'Complete door kits',
          intro:
            'A kit gives you handle, latch and stopper matched as a set, which avoids the mismatched-finish problem that shows up when parts are bought piecemeal. The aluminium kit (SA-33) comes in five finishes and covers most residential work; the heavy commercial kit is for main entrances and doors a business depends on.',
          categorySlug: 'door-kits',
          products: productsInCategory('door-kits'),
        },
        {
          heading: 'Handles, tower bolts and handle locks',
          intro:
            'Tower bolts are a secondary fastening, fitted top and bottom so the leaf cannot twist in its frame. Handles run from D-handles on ordinary doors up to back-to-back H-handles for main glass and timber entrances. A handle lock combines the lever and the mortise mechanism in one fitting.',
          categorySlug: 'bolts-handles',
          products: productsInCategory('bolts-handles'),
        },
        {
          heading: 'Door closers',
          intro:
            'Size the closer by the width and weight of the leaf, not the size of the room. An undersized closer will not pull the door into its latch; an oversized one makes it too heavy to open. The pencil closer is for light screen and mesh doors only — fitting one to a main door is the most common mistake we correct.',
          categorySlug: 'door-closers',
          products: productsInCategory('door-closers'),
        },
        {
          heading: 'Hinges',
          intro:
            '2D and 3D adjustable hinges let a fitter correct a door on site after the frame has settled, which is exactly when a new door starts to catch. Standard aluminium butt hinges are the right and cheaper choice on a door that hangs true.',
          categorySlug: 'hinges',
          products: productsInCategory('hinges'),
        },
        {
          heading: 'Door seals and stoppers',
          intro:
            'The gap under a door is the largest opening in most rooms, and it is where dust, draught and insects come through. A drop seal or brush strip closes it. Stoppers prevent the leaf slamming into the wall or frame.',
          categorySlug: 'door-window-seals',
          products: bySku(['SA-24', 'SA-25', 'SA-32']),
        },
        {
          heading: 'Frameless glass doors — floor springs and patch fittings',
          intro:
            'A frameless glass door cannot take an overhead closer: there is no frame to mount the arm to, and toughened glass cannot be drilled after tempering. It pivots on a floor spring set into the slab, with patch fittings gripping the glass at the corners. That decision has to be made before the floor is finished.',
          categorySlug: 'glass-hardware-shower-fittings',
          products: bySku(['SA-45', 'SA-70', 'SA-71', 'SA-67']),
        },
      ]}
      faqs={[
        {
          question: 'What size door closer do I need?',
          answer:
            'Size it by the width and weight of the door leaf. Wider doors need more power than their weight alone suggests, because the leverage works against the closer. An undersized unit leaves the door resting against the frame unlatched; an oversized one makes it hard for children and elderly users to open. Tell us the leaf dimensions and material and we will confirm the right one.',
        },
        {
          question: 'My door will not latch properly. Do I need a new closer?',
          answer:
            'Usually not — it is normally an adjustment. Most hydraulic closers have two separate valves: closing speed for the main sweep, and latching speed for the last few degrees into the frame. If the latching speed is set too slow the door drifts to almost-shut and stops. Turn that valve a quarter turn at a time and test between each.',
        },
        {
          question: 'Should I buy a door kit or the parts separately?',
          answer:
            'Buy the kit if you are doing a whole door or a whole house. Everything arrives in one finish and the latch matches the handle, which is the thing people most often get wrong when sourcing piecemeal. Buy separately when you are replacing one failed component on a door that is otherwise fine.',
        },
        {
          question: 'Do you sell door hardware to homeowners?',
          answer:
            'Yes. Dealers, fabricators and contractors buy at trade rates in box quantities, and homeowners, architects, interior designers and builders can buy a single piece over the counter with no minimum order.',
        },
      ]}
    />
  );
}
