import type { Metadata } from 'next';
import HubPage from '@/components/catalogue/HubPage';
import { CATALOGUE } from '@/data/products';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Hub for mosquito mesh — searched far more often as "machar jaali",
 * "machhar jali" or "jali" than by any English term. Those spellings appear in
 * the visible copy deliberately, because that is what people type.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Machar Jaali / Mosquito Mesh in Raipur | Salasar',
  description:
    'Machhar jali in stainless steel, aluminium, powder-coated black and plastic, in five roll widths. Stocked in Raipur. Measure the frame, not the glass.',
  path: '/mosquito-mesh-jaali',
});

const bySku = (skus: string[]) => CATALOGUE.filter((p) => skus.includes(p.sku));

export default function MosquitoMeshPage() {
  return (
    <HubPage
      path="/mosquito-mesh-jaali"
      eyebrow="Machar jaali &amp; window mesh — Raipur"
      h1="Machar Jaali (Mosquito Mesh) in Raipur"
      quickAnswer="Machar jaali is the insect screen fitted into a window frame, and it comes in four materials: stainless steel, aluminium, powder-coated black steel and plastic. Salasar stocks all four in Raipur in five standard roll widths — 2 ft, 2.5 ft, 3.5 ft, 3.75 ft and 5 ft — as full rolls or short cuts."
      intro="Also spelled machhar jali or simply jali. The two decisions are material and width, and both are easy to get wrong. Measure the clear opening of the mesh channel rather than the glass, then take the next standard width up so there is material to grip when the beading is rolled in. On material, the honest answer depends on where the window is: plastic is genuinely fine in shade and will not last two seasons in direct sun."
      whatsappMessage="Hello Salasar, I need machar jaali. I am sending the window measurements."
      groups={[
        {
          heading: 'Mesh by material',
          intro:
            'Stainless steel (SA-81) lasts longest — it does not rust, sunlight does not embrittle it, and it holds tension for years. Powder-coated black (SA-83) is the least visible from inside a lit room, which matters on a window you actually look through, and the coating protects the steel. Plastic (SA-84) is HDPE: cheapest, and it goes brittle under direct sun over a few seasons.',
          categorySlug: 'abrasives-mesh-misc',
          products: bySku(['SA-81', 'SA-83', 'SA-84']),
        },
        {
          heading: 'Louvres — permanent ventilation instead of mesh',
          intro:
            'Where a window exists only for ventilation — a bathroom, a kitchen service window, a stairwell — fixed aluminium louvre blades do the job without a moving sash or mesh to maintain. They stay open, so there is nothing to forget to close.',
          categorySlug: 'abrasives-mesh-misc',
          products: bySku(['SA-82']),
        },
        {
          heading: 'What holds the mesh in place',
          intro:
            'Mesh is not glued or stapled. It is pressed into a channel in the frame with a rubber beading using a roller tool, and the beading is what holds it. Corner cleats are used when a fabricator is making the mesh frame itself rather than fitting into an existing one.',
          categorySlug: 'tapes-sealants-adhesives',
          products: bySku(['SA-49', 'SA-85', 'SA-26']),
        },
      ]}
      faqs={[
        {
          question: 'What size machar jaali should I order?',
          answer:
            'Measure the clear opening of the window frame at its widest point and take the next standard width up. We stock 2 ft, 2.5 ft, 3.5 ft, 3.75 ft and 5 ft. The spare material is what you grip when tensioning the mesh into the channel — trimming an oversize piece is easy, stretching an undersize one is impossible. Measure each window separately; windows in the same wall are often a few millimetres apart.',
        },
        {
          question: 'Which mosquito mesh material lasts longest?',
          answer:
            'Stainless steel. It does not rust, ultraviolet light does not embrittle it, and it keeps its tension for years. It is the right choice for any window that is awkward to reach or exposed to sun and rain. Powder-coated black steel is the middle option and is the least visible from inside. Plastic is the cheapest and the shortest-lived in direct sunlight.',
        },
        {
          question: 'Can I buy a short cut instead of a full roll?',
          answer:
            'Yes. For one or two windows a short cut is the sensible purchase. A full roll works out meaningfully cheaper per foot if you are doing a whole house, and leaves material for repairs later.',
        },
        {
          question: 'My mesh is torn in one corner — repair or replace?',
          answer:
            'A small tear away from the edges can be patched and it will hold. Anything larger, or mesh that has gone slack across the whole panel, is better replaced — the mesh itself is inexpensive relative to the time spent fitting it, and a second repair on a tired panel rarely lasts.',
        },
      ]}
    />
  );
}
