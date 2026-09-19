import type { Metadata } from 'next';
import HubPage from '@/components/catalogue/HubPage';
import { productsInCategory, CATALOGUE } from '@/data/products';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Cross-category hub for window fittings.
 *
 * Buyers search "aluminium window fittings Raipur", "sliding window roller" or
 * "window lock" — not "rollers, bearings and channels", which is how our
 * catalogue is filed. This page gathers the window-relevant SKUs from four
 * categories under the language people actually use, and links down into each
 * category rather than duplicating it.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Aluminium Window Fittings in Raipur | Salasar',
  description:
    'Sliding window rollers, window locks, espagnolette gear, stoppers, seals and mosquito mesh, stocked in Raipur. Bring the old part or send a photo to match it.',
  path: '/window-hardware',
});

export default function WindowHardwarePage() {
  const rollers = productsInCategory('rollers-bearings-channels');
  const locks = productsInCategory('locks-latches');
  const seals = productsInCategory('door-window-seals');

  // The mesh, louvre and espagnolette items are filed under the miscellaneous
  // category but belong on a window page, so they are pulled in by SKU.
  const meshAndGear = CATALOGUE.filter((p) =>
    ['SA-81', 'SA-82', 'SA-83', 'SA-84', 'SA-85', 'SA-86'].includes(p.sku)
  );
  const stays = CATALOGUE.filter((p) => ['SA-63', 'SA-64'].includes(p.sku));

  return (
    <HubPage
      path="/window-hardware"
      eyebrow="Window fittings — Raipur, Chhattisgarh"
      h1="Aluminium Window Hardware &amp; Fittings in Raipur"
      quickAnswer="Aluminium window hardware covers the parts that make a window slide, lock and seal: rollers and channels that carry the shutter, crescent or touch locks that secure it, stoppers and weather seals, and mosquito mesh. Salasar stocks all of these in Raipur under SA codes you can quote by phone."
      intro="Most window problems come down to one worn part — a roller that has stopped gliding, a lock that no longer catches, a mesh that has torn. You do not need to know the code: bring the old part to our counter in Bhaisthan or send a photograph on WhatsApp, and we will identify it and tell you what fits. Below are the window-related items across our catalogue, grouped by what they do."
      whatsappMessage="Hello Salasar, I need window hardware. I am sending a photo of the part."
      groups={[
        {
          heading: 'Sliding window rollers, bearings and channels',
          intro:
            'The roller carries the weight of the shutter and is usually the first part to fail — a window that has become heavy to slide almost always needs rollers rather than a whole new frame. C and G channels are the track sections the rollers run in. Bearings are sold separately for rebuilding an existing roller housing.',
          categorySlug: 'rollers-bearings-channels',
          products: rollers,
        },
        {
          heading: 'Window locks and latches',
          intro:
            'Crescent locks are the rotating sash locks fitted to most aluminium sliding windows. Touch locks snap shut on closing. Domal locks suit Domal-section windows specifically, and the stainless steel versions are worth the difference in bathrooms, kitchens and coastal or industrial air.',
          categorySlug: 'locks-latches',
          products: locks,
        },
        {
          heading: 'Stoppers, seals and weather strips',
          intro:
            'Stoppers prevent the shutter slamming into the frame. Weather seals and brush strips close the gap that lets dust, rain and insects through — the usual fix for a window that whistles or lets water in during the monsoon.',
          categorySlug: 'door-window-seals',
          products: seals,
        },
        {
          heading: 'Friction stays and arm stays for casement windows',
          intro:
            'Casement windows swing out rather than slide, so they need a friction stay to hold the sash at the chosen opening and an arm stay to restrict how far it travels. Both are stainless steel, since they sit in the weather.',
          categorySlug: 'fasteners-screws',
          products: stays,
        },
        {
          heading: 'Mosquito mesh, louvres and espagnolette gear',
          intro:
            'Machar jaali (mosquito mesh) comes in stainless steel, aluminium, powder-coated black and plastic, in five standard roll widths. Louvres are the fixed angled blades used for permanent ventilation in bathroom and kitchen windows. The espagnolette is the multi-point locking rod used on larger casement sashes.',
          categorySlug: 'abrasives-mesh-misc',
          products: meshAndGear,
        },
      ]}
      faqs={[
        {
          question: 'Which sliding window roller do I need?',
          answer:
            'Match the roller to the channel profile and the weight of the shutter, not to the window brand. A single-wheel nylon roller suits ordinary residential shutters; a double swing or metal-bearing roller is for heavy or large glazed panels. The reliable way to get it right is to bring the old roller in or send a photograph on WhatsApp — we match it against stock rather than guessing from a description.',
        },
        {
          question: 'What is the difference between a crescent lock and a touch lock?',
          answer:
            'A crescent lock has a small rotating lever you turn by hand to draw the two sashes together — the traditional and more secure option. A touch lock is spring-loaded and latches automatically when the window closes, which is more convenient but holds the sashes less tightly. Both fit standard aluminium sliding windows.',
        },
        {
          question: 'What width of machar jaali should I order?',
          answer:
            'We stock mosquito mesh in 2 ft, 2.5 ft, 3.5 ft, 3.75 ft and 5 ft roll widths, in full rolls or short cuts. Measure the clear opening of the window frame and choose the next width up, so there is material to grip in the mesh channel. Stainless steel lasts longest, plastic is the cheapest, and powder-coated black is the least visible from inside.',
        },
        {
          question: 'Do you sell window hardware to homeowners, or only to fabricators?',
          answer:
            'Both. Fabricators and dealers buy at trade rates, and we also sell single pieces to homeowners repairing their own windows. There is no minimum order at the counter.',
        },
      ]}
    />
  );
}
