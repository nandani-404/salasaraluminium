import type { Metadata } from 'next';
import HubPage from '@/components/catalogue/HubPage';
import { CATALOGUE, productsInCategory } from '@/data/products';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Hub for sliding systems specifically. Distinct from /window-hardware, which
 * covers casement and fixed windows too, and from /door-hardware, which is
 * about hinged doors. A sliding door is its own failure mode: it goes heavy.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Sliding Door &amp; Window Hardware, Raipur | Salasar',
  description:
    'Rollers, C and G channels, track brushes and sliding locks for aluminium sliding doors and windows. Stocked in Raipur. Bring the old part and we will match it.',
  path: '/sliding-door-hardware',
});

const bySku = (skus: string[]) => CATALOGUE.filter((p) => skus.includes(p.sku));

export default function SlidingDoorHardwarePage() {
  return (
    <HubPage
      path="/sliding-door-hardware"
      eyebrow="Sliding systems — Raipur, Chhattisgarh"
      h1="Sliding Door &amp; Window Hardware in Raipur"
      quickAnswer="A sliding door or window runs on rollers that travel in a channel. When it goes heavy, the cause is almost always a worn roller or a dirty track — not a faulty frame. Salasar stocks rollers, bearings, C and G channels, track brushes and sliding locks in Raipur, matched against the part you bring in."
      intro="Sliding panels fail in a predictable order. The roller wheel flattens where it carries the load and stops turning freely. Grit packs into the channel and turns a smooth guide into an abrasive. The lock stops drawing the sashes together, so the panel rattles. Each of those is a cheap part, and replacing one is a fraction of the cost of a new window. The difficulty is identification: aluminium sliding sections are not standardised between fabricators, so a roller that drops into one profile will not seat in another."
      whatsappMessage="Hello Salasar, my sliding door is heavy. I am sending a photo of the roller."
      groups={[
        {
          heading: 'Rollers and bearings',
          intro:
            'Single-wheel nylon rollers are the standard residential fitting — quiet, corrosion-free, right for ordinary shutters. Double swing rollers spread the load across two wheels and tolerate slight track misalignment, which matters on wide or heavy panels. Metal bearing rollers carry considerably more weight and belong in shops and offices where a panel is moved hundreds of times a day. Bearings are sold separately for rebuilding a housing that is otherwise sound.',
          categorySlug: 'rollers-bearings-channels',
          products: productsInCategory('rollers-bearings-channels'),
        },
        {
          heading: 'Sliding locks',
          intro:
            'A crescent lock rotates to draw the two sashes together and hold them under tension — that drawing action improves the weather seal as well as the security, and it is why a crescent-locked window rattles less. A touch lock latches automatically on closing, which is more convenient and grips less firmly.',
          categorySlug: 'locks-latches',
          products: bySku(['SA-21', 'SA-16', 'SA-17', 'SA-22', 'SA-18', 'SA-19', 'SA-20', 'SA-23']),
        },
        {
          heading: 'Track brushes, stoppers and seals',
          intro:
            'The brush strip in a sliding track is not decorative: it keeps dust and draught out of the gap the panel travels in, and it stops the sashes grinding against each other. A stopper prevents the panel slamming into the frame at the end of its travel.',
          categorySlug: 'door-window-seals',
          products: bySku(['SA-1', 'SA-2', 'SA-26', 'SA-49']),
        },
        {
          heading: 'Frameless glass sliding doors',
          intro:
            'Frameless glass panels hang from a top track rather than running in a bottom channel, so they use a hanger roller and a flush concealed pull instead of a projecting handle that would foul the adjacent panel.',
          categorySlug: 'glass-hardware-shower-fittings',
          products: bySku(['SA-65', 'SA-67']),
        },
      ]}
      faqs={[
        {
          question: 'Why has my sliding window become hard to push?',
          answer:
            'Almost always a worn roller or a dirty track. The nylon wheel flattens where it carries the weight and stops rotating, so the panel drags instead of rolling. Take the shutter out, brush the channel clean and dry, then press the wheel with a thumb — if it does not spin freely, the roller needs replacing.',
        },
        {
          question: 'Should I grease the sliding track?',
          answer:
            'No. Grease collects dust and turns into a grinding paste that wears both the roller and the channel faster than running dry. If a track genuinely needs lubrication, use a dry PTFE or silicone lubricant, sparingly. In dusty districts this matters more, not less.',
        },
        {
          question: 'How do I know whether I have a C-channel or a G-channel?',
          answer:
            'Look at a cut end of the track. If the two upstands finish square, it is a C-channel. If either turns back inward at the top, forming a lip that partly captures the roller, it is a G-channel. The roller has to match the channel — they are not interchangeable.',
        },
        {
          question: 'Can I replace just the bearing instead of the whole roller?',
          answer:
            'Yes, if the housing is undamaged. We stock 625 and 626 miniature bearings, 16 mm needle bearings and size 22 bearings for exactly this. Rebuilding an existing housing is cheaper and preserves a fit you already know works. If the housing is cracked or distorted, replace the whole roller.',
        },
      ]}
    />
  );
}
