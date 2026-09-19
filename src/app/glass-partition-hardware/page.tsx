import type { Metadata } from 'next';
import HubPage from '@/components/catalogue/HubPage';
import { CATALOGUE } from '@/data/products';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Hub for office and commercial glass partitioning — distinct from
 * /bathroom-glass-hardware, which is about wet-area shower enclosures. The
 * fittings overlap; the loads, the doors and the buyer do not.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Glass Partition Hardware in Raipur | Salasar',
  description:
    'Partition connectors, U-channels, patch fittings, floor springs and glass door locks for office glazing in Raipur. Plan floor springs before the floor is laid.',
  path: '/glass-partition-hardware',
});

const bySku = (skus: string[]) => CATALOGUE.filter((p) => skus.includes(p.sku));

export default function GlassPartitionHardwarePage() {
  return (
    <HubPage
      path="/glass-partition-hardware"
      eyebrow="Office &amp; commercial glazing — Raipur"
      h1="Glass Partition Hardware in Raipur"
      quickAnswer="Glass partition hardware holds fixed glass panels and hangs frameless glass doors in offices and shopfronts: connectors joining glass to walls or to other panels, U-channels capturing the panel edge, patch fittings and floor springs carrying a door, and locks for a door with no frame to take one."
      intro="Partitioning splits into two problems that need different fittings. Fixed panels need to be held — that is connectors and channels, and the loads are static. Doors need to move — that is patch fittings on a floor spring, and the loads cycle thousands of times a year. Using shower-grade fittings on a full-height office door is the failure we see most, because the two look similar in a catalogue and are not remotely equivalent in what they carry."
      whatsappMessage="Hello Salasar, I am planning a glass partition. I am sending the layout."
      groups={[
        {
          heading: 'Connectors for fixed panels',
          intro:
            'Wall-to-glass brackets anchor a panel to masonry at 90 degrees. Glass-to-glass connectors join two panels with no wall involved — 180 degrees for panels in line, 90 degrees at a corner. The large L-bracket suits structural corner joints; the small one suits lighter cubicle-scale joints.',
          categorySlug: 'glass-hardware-shower-fittings',
          products: bySku(['SA-68', 'SA-69', 'SA-72', 'SA-73', 'SA-74']),
        },
        {
          heading: 'Channels and partition framing',
          intro:
            'A U-channel captures the edge of a glass panel along its full length, spreading the load instead of concentrating it at bracket points. The heavy-gauge premium channel is for structural perimeter mounting; the lighter one is for glazing trims. Partition connectors are the corner and T brackets that join aluminium partition profiles to each other.',
          categorySlug: 'fittings-accessories',
          products: bySku(['SA-53', 'SA-54', 'SA-50', 'SA-51']),
        },
        {
          heading: 'Frameless glass doors — floor springs and patch fittings',
          intro:
            'A frameless door pivots on a floor spring set into the slab, with patch fittings gripping the glass at the top and bottom corners to transfer its weight. The floor spring both carries the door and damps its closing. This decision belongs at planning: the cavity is cut and levelled to the finished floor height, so retrofitting one means opening the floor.',
          categorySlug: 'glass-hardware-shower-fittings',
          products: bySku(['SA-45', 'SA-71', 'SA-70']),
        },
        {
          heading: 'Handles, knobs and hardware for glass doors',
          intro:
            'Glass cannot take a screwed-on handle, so a frameless door uses a back-to-back knob through a drilled hole, or a flush concealed pull on a sliding panel where a projecting handle would foul the adjacent glass. All cut-outs must be specified before the glass is toughened.',
          categorySlug: 'glass-hardware-shower-fittings',
          products: bySku(['SA-66', 'SA-67', 'SA-65']),
        },
        {
          heading: 'Sealing and bonding',
          intro:
            'Structural VHB tape bonds glass to frame without visible fixings — grey is the structural grade, clear is for joints seen through the glass. Neutral-cure silicone seals the perimeter; acetic-cure attacks aluminium finishes over time and should not be used here.',
          categorySlug: 'tapes-sealants-adhesives',
          products: bySku(['SA-47', 'SA-48', 'SA-55', 'SA-57']),
        },
      ]}
      faqs={[
        {
          question: 'Do I need a floor spring or can I use hinges on a glass office door?',
          answer:
            'A full-height frameless glass door needs a floor spring. There is no frame to mount an overhead closer arm to, and the glass cannot be drilled after tempering, so the mechanism goes into the floor and patch fittings transfer the load at the corners. Shower hinges carry a light door from a wall or adjacent panel and will not hold an entrance door.',
        },
        {
          question: 'When does the floor spring have to be decided?',
          answer:
            'Before the floor is finished. The unit sits in a cavity cut into the slab and is levelled so its cover plate finishes flush with the final floor surface, which means it is positioned during flooring work. Retrofitting into a laid floor means cutting it open and making good, and on tile or stone the repair is rarely invisible.',
        },
        {
          question: 'What is the difference between a wall-to-glass and a glass-to-glass connector?',
          answer:
            'A wall-to-glass connector fixes a panel to a solid wall and is screwed into masonry on one side, usually at 90 degrees. A glass-to-glass connector joins two glass panels to each other with no wall involved, most often at 180 degrees in line or 90 degrees at a corner. Neither is a hinge — connectors hold fixed panels, hinges and patches carry doors that move.',
        },
        {
          question: 'Can you quote for a whole office partition layout?',
          answer:
            'Yes. Send the layout with panel sizes, glass thickness and where the doors go on WhatsApp, and we will list the fittings needed and quote them together. Counting connectors from a drawing is faster and more accurate than ordering them one at a time as the job proceeds.',
        },
      ]}
    />
  );
}
