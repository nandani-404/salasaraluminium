export interface SAHProduct {
  id: string;
  saCode: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  variants?: string[];
  sizes?: string[];
  finishes?: string[];
  material?: string;
  shortDesc: string;
  image: string;
}

export interface SAHCategory {
  slug: string;
  name: string;
  codePrefix: string;
  description: string;
  image: string;
  iconName: string;
}

export const SAH_BUSINESS_DETAILS = {
  brandName: 'Salasar Aluminium & Hardware',
  logoMark: 'SAH',
  tagline: 'QUALITY • STRENGTH • TRUST',
  secondaryLine: 'Strength in Every Detail, Quality in Every Product.',
  businessType: 'Wholesale Manufacturer & Supplier of Aluminium & Hardware Products',
  manufacturedBy: '',
  branches: [
    { name: 'Salasar Aluminium & Hardware', location: 'Raipur' },
    { name: 'Lieon Marketing', location: 'Raipur' },
    { name: 'Finetek', location: 'Raipur' }
  ],
  address: 'Shop No. 3, Salasar Aluminium & Hardware, Near Mahavir Traders, Punjab Oil Mill Road, Bhaisthan, Raipur, Chhattisgarh – 492001',
  contactPersons: [
    { name: 'Abhishek', phoneNumbers: ['+91 8007443071', '+91 9079332560'] }
  ],
  pillars: [
    { title: 'Premium Quality', desc: 'Superior grade extruded alloys & robust hardware', icon: 'Award' },
    { title: 'Wide Range', desc: 'Comprehensive 86+ hardware product catalogue', icon: 'Layers' },
    { title: 'Durable Finish', desc: 'Long-lasting anodized & powder-coated performance', icon: 'Shield' },
    { title: 'Trusted Partner', desc: 'Direct trade pricing & commitment you can rely on', icon: 'CheckCircle2' }
  ]
};

export const SAH_CATEGORIES: SAHCategory[] = [
  {
    slug: 'rollers-bearings-channels',
    name: 'Rollers, Bearings & Channels',
    codePrefix: 'SA-1 to SA-13',
    description: 'Precision rolling mechanisms, ball bearings, needle bearings, C-Channels & G-Channels for sliding doors and windows.',
    image: '/cat-rollers.png',
    iconName: 'Settings'
  },
  {
    slug: 'locks-latches',
    name: 'Locks & Latches',
    codePrefix: 'SA-11 to SA-23',
    description: 'Security locks including Domal, Touch, Crescent, Air Lift, MS/SS locks, and HDPVC latches.',
    image: '/cat-locks.png',
    iconName: 'Lock'
  },
  {
    slug: 'door-window-seals',
    name: 'Door & Window Seals / Stoppers',
    codePrefix: 'SA-24 to SA-26',
    description: 'Acoustic door seals, plastic weather seals, and window stoppers for insulation and protection.',
    image: '/cat-seals.png',
    iconName: 'ShieldAlert'
  },
  {
    slug: 'hinges',
    name: 'Hinges',
    codePrefix: 'SA-27 to SA-29',
    description: '2D, 3D adjustable aluminium hinges and continuous heavy-duty hardware hinges.',
    image: '/cat-hinges.png',
    iconName: 'Maximize2'
  },
  {
    slug: 'door-kits',
    name: 'Door Kits',
    codePrefix: 'SA-30 to SA-34',
    description: 'Aluminium and Stainless Steel mini, heavy, and multi-finish door kit assemblies.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    iconName: 'DoorClosed'
  },
  {
    slug: 'bolts-handles',
    name: 'Bolts & Handles',
    codePrefix: 'SA-35 to SA-41',
    description: 'Tower bolts, American handles, Taiwan handles, D-handles, H-handles, and handle locks.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    iconName: 'GripVertical'
  },
  {
    slug: 'door-closers',
    name: 'Door Closers',
    codePrefix: 'SA-42 to SA-44',
    description: 'Hydraulic door closers, slim pencil closers, and heavy capsule door closer systems.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    iconName: 'CornerDownRight'
  },
  {
    slug: 'fittings-accessories',
    name: 'Fittings & Accessories',
    codePrefix: 'SA-45 to SA-54',
    description: 'Floor springs, wall plugs, partition connectors, glass stickers, PVC angles, and U-channels.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    iconName: 'Wrench'
  },
  {
    slug: 'tapes-sealants-adhesives',
    name: 'Tapes, Sealants & Adhesives',
    codePrefix: 'SA-47 to SA-57',
    description: 'VHB clear/grey structural tapes, EPDM rubber gaskets, silicone sealants, PU foam, and heavy applicator guns.',
    image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Disc'
  },
  {
    slug: 'fasteners-screws',
    name: 'Fasteners & Screws',
    codePrefix: 'SA-58 to SA-64',
    description: 'SDS self-drilling screws, drywall screws, wood screws, carriage bolts, STS screws, friction stays, and arm stays.',
    image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    iconName: 'Hash'
  },
  {
    slug: 'glass-hardware-shower-fittings',
    name: 'Glass Hardware & Shower Fittings',
    codePrefix: 'SA-65 to SA-78',
    description: 'Frameless glass rollers, knobs, patch locks, center locks, L-connectors, and 0°/90°/180° CP shower hinges.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sparkles'
  },
  {
    slug: 'abrasives-mesh-misc',
    name: 'Abrasives, Mesh & Misc.',
    codePrefix: 'SA-79 to SA-86',
    description: 'Flap disks, cutting wheels, mosquito jaali (SS/Black/Plastic), louvers, corner cleats, and espagnolette locks.',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    iconName: 'Grid'
  }
];

export const FULL_CATALOGUE_PRODUCTS: SAHProduct[] = [
  { id: 'sa-1', saCode: 'SA-1', name: 'Track Brush (Black)', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', finishes: ['Black (SA-1)'], shortDesc: 'Dense black nylon dust & weather draft sealing brush for sliding aluminium tracks.', image: '/track-brush-black.jpg' },
  { id: 'sa-2', saCode: 'SA-2', name: 'Track Brush (Grey)', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', finishes: ['Grey (SA-2)'], shortDesc: 'Dense grey nylon dust & weather draft sealing brush for sliding aluminium tracks.', image: '/track-brush-v2.png' },
  { id: 'sa-3', saCode: 'SA-3', name: 'Bearing 625-626', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', shortDesc: 'High-precision 625/626 miniature ball bearing for smooth silent sliding mechanisms.', image: '/bearing-625-626-v2.png' },
  { id: 'sa-4', saCode: 'SA-4', name: 'Bearing 22', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', shortDesc: 'Heavy-duty size 22 steel bearing for architectural sliding doors.', image: '/bearing-22-v1.png' },
  { id: 'sa-5', saCode: 'SA-5', name: '16mm Needle Bearing', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', shortDesc: '16mm high radial load needle bearing for compact hardware assemblies.', image: '/16mm-needle-v1.png' },
  { id: 'sa-6', saCode: 'SA-6', name: 'Metal Bearing Roller', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', shortDesc: 'Zinc-plated metal bearing housing built for commercial heavy load tracks.', image: '/metal-bearing-v1.png' },
  { id: 'sa-7', saCode: 'SA-7', name: 'Sliding Roller', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', shortDesc: 'Standard single wheel nylon sliding roller for aluminium window shutters.', image: '/sliding-roller-v1.png' },
  { id: 'sa-8', saCode: 'SA-8', name: 'Double Swing Roller', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', shortDesc: 'Self-aligning double swing roller assembly for heavy sliding patio doors.', image: '/double-swing-roller-v1.png' },
  { id: 'sa-9', saCode: 'SA-9', name: 'C-Roller', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', shortDesc: 'C-section track roller wheel designed for smooth low-friction gliding.', image: '/c-roller-v1.png' },
  { id: 'sa-10', saCode: 'SA-10', name: 'G-Roller', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', shortDesc: 'G-profile guiding roller wheel assembly for specialized architectural sections.', image: '/g-roller-v1.png' },
  { id: 'sa-12', saCode: 'SA-12', name: 'C-Channel', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', shortDesc: 'Extruded aluminium C-channel guide section for roller track mounting.', image: '/c-channel-v1.png' },
  { id: 'sa-13', saCode: 'SA-13', name: 'G-Channel', categorySlug: 'rollers-bearings-channels', categoryName: 'Rollers, Bearings & Channels', shortDesc: 'Precision extruded G-channel structural guide profile.', image: '/g-channel-v1.png' },

  // B. Locks & Latches
  { id: 'sa-11', saCode: 'SA-11', name: 'Lock – HDPVC / Metal', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', finishes: ['Black', 'Brown', 'CP', 'Anodized Silver'], shortDesc: 'Versatile HDPVC & metal body lock mechanism available in premium finishes.', image: '/lock-hdpvc-metal-v1.png' },
  { id: 'sa-14', saCode: 'SA-14', name: 'M.S Lock – State', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', shortDesc: 'Straight M.S mortar latch lock for aluminium sliding window frames.', image: '/ms-lock-state-v1.png' },
  { id: 'sa-15', saCode: 'SA-15', name: 'M.S Lock – L', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', shortDesc: 'L-shaped M.S window latch lock offering firm corner engagement.', image: '/ms-lock-l-v1.png' },
  { id: 'sa-16', saCode: 'SA-16', name: 'Touch Lock', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', shortDesc: 'Flush touch spring-loaded latch lock for quick snap-to-close windows.', image: '/touch-lock-v1.png' },
  { id: 'sa-17', saCode: 'SA-17', name: 'Domal Lock', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', shortDesc: 'Heavy-duty mortise lock system designed specifically for Domal sliding window sections.', image: '/domal-lock-v1.png' },
  { id: 'sa-18', saCode: 'SA-18', name: 'S.S Lock – State', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', shortDesc: 'Corrosion-resistant Stainless Steel straight latch lock for harsh environments.', image: '/ss-lock-state-v1.png' },
  { id: 'sa-19', saCode: 'SA-19', name: 'S.S Lock – L', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', shortDesc: 'Premium Grade 304 Stainless Steel L-type window lock assembly.', image: '/ss-lock-l-v1.png' },
  { id: 'sa-20', saCode: 'SA-20', name: 'T-Lock', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', shortDesc: 'T-handle security latch lock for commercial window sashes.', image: '/t-lock-v1.png' },
  { id: 'sa-21', saCode: 'SA-21', name: 'Crescent Lock', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', shortDesc: 'Classic rotating crescent sash lock for aluminium sliding window interlocks.', image: '/crescent-lock-v1.png' },
  { id: 'sa-22', saCode: 'SA-22', name: 'Maruti Lock', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', shortDesc: 'Compact Maruti-type side latch lock for residential window frames.', image: '/maruti-lock-v1.png' },
  { id: 'sa-23', saCode: 'SA-23', name: 'Air Lift Lock', categorySlug: 'locks-latches', categoryName: 'Locks & Latches', shortDesc: 'Air Lift vertical sliding sash lock mechanism for heavy glazed windows.', image: '/air-lift-v1.png' },

  // C. Door & Window Seals / Stoppers
  { id: 'sa-24', saCode: 'SA-24', name: 'Door Seal (Aluminium + Brush/Rubber)', categorySlug: 'door-window-seals', categoryName: 'Door & Window Seals / Stoppers', shortDesc: 'Bottom door drop seal preventing dust, water, and insects under entry doors.', image: '/door-seal-v1.png' },
  { id: 'sa-25', saCode: 'SA-25', name: 'Plastic Door Seal', categorySlug: 'door-window-seals', categoryName: 'Door & Window Seals / Stoppers', shortDesc: 'Flexible PVC acoustic & draft seal strip for internal wooden/glass doors.', image: '/plastic-door-seal-v1.png' },
  { id: 'sa-26', saCode: 'SA-26', name: 'Window Stopper', categorySlug: 'door-window-seals', categoryName: 'Door & Window Seals / Stoppers', shortDesc: 'Rubberized buffer window stopper preventing frame impact damage.', image: '/window-stopper-v1.png' },

  // D. Hinges
  { id: 'sa-27', saCode: 'SA-27', name: '2D Adjustable Hinges', categorySlug: 'hinges', categoryName: 'Hinges', shortDesc: '2-way micro-adjustable aluminium door hinge for flush alignment.', image: '/2d-hinge-v1.png' },
  { id: 'sa-28', saCode: 'SA-28', name: '3D Adjustable Hinges', categorySlug: 'hinges', categoryName: 'Hinges', shortDesc: 'Heavy 3-way adjustable hinge allowing height, depth, and side adjustments.', image: '/3d-hinge-v1.png' },
  { id: 'sa-29', saCode: 'SA-29', name: 'Standard Aluminium Hinges', categorySlug: 'hinges', categoryName: 'Hinges', shortDesc: 'Durable extruded aluminium butt hinge for residential door shutters.', image: '/standard-aluminium-hinge-v1.png' },

  // E. Door Kits
  { id: 'sa-30', saCode: 'SA-30', name: 'SS Mini Door Kit', categorySlug: 'door-kits', categoryName: 'Door Kits', finishes: ['SS Natural (SA-30)'], shortDesc: 'Compact Stainless Steel natural finish door hardware kit including handle, latch, and stopper.', image: '/mini-doorkit-v1.png' },
  { id: 'sa-31', saCode: 'SA-31', name: 'SS Mini Black Door Kit', categorySlug: 'door-kits', categoryName: 'Door Kits', finishes: ['Matte Black (SA-31)'], shortDesc: 'Compact Stainless Steel matte black finish door hardware kit including handle, latch, and stopper.', image: '/ss-mini-black-doorkit-v1.png' },
  { id: 'sa-32', saCode: 'SA-32', name: 'Door Stopper', categorySlug: 'door-kits', categoryName: 'Door Kits', shortDesc: 'Wall and floor mounted rubber-head door stopper in solid finish.', image: '/door-stopper-v1.png' },
  { id: 'sa-33', saCode: 'SA-33', name: 'Aluminium Door Kit', categorySlug: 'door-kits', categoryName: 'Door Kits', finishes: ['Black', 'Brown', 'Champion', 'Matt', 'CP'], shortDesc: 'Complete architectural aluminium door fittings kit available in 5 finishes.', image: '/aluminium-door-kit-v1.png' },
  { id: 'sa-34', saCode: 'SA-34', name: 'Heavy Commercial Door Kit', categorySlug: 'door-kits', categoryName: 'Door Kits', shortDesc: 'Reinforced high-load door hardware kit for main entrance doors and commercial spaces.', image: '/heavy-commercial-doorkit-v1.png' },

  // F. Bolts & Handles
  { id: 'sa-35', saCode: 'SA-35', name: 'Tower Bolt (2pcs)', categorySlug: 'bolts-handles', categoryName: 'Bolts & Handles', sizes: ['4"', '6"'], shortDesc: '2-piece set extruded aluminium tower bolt for top & bottom door latching.', image: '/tower-bolt-v1.png' },
  { id: 'sa-36', saCode: 'SA-36', name: 'Tower Bolt – Light / Heavy', categorySlug: 'bolts-handles', categoryName: 'Bolts & Handles', sizes: ['4"', '6"'], variants: ['Light', 'Heavy'], shortDesc: 'Heavy-gauge barrel tower bolt with smooth slide pin mechanism.', image: '/tower-bolt-light-v1.png' },
  { id: 'sa-37', saCode: 'SA-37', name: 'American Handle', categorySlug: 'bolts-handles', categoryName: 'Bolts & Handles', sizes: ['6"', '8"'], shortDesc: 'Ergonomic American-style pull handle for entrance doors and windows.', image: '/american-handle-v1.png' },
  { id: 'sa-38', saCode: 'SA-38', name: 'Taiwan Handle', categorySlug: 'bolts-handles', categoryName: 'Bolts & Handles', sizes: ['6"', '8"'], shortDesc: 'Sleek contoured Taiwan handle profile for sliding door sashes.', image: '/taiwan-handle-v1.png' },
  { id: 'sa-39', saCode: 'SA-39', name: 'D Handle', categorySlug: 'bolts-handles', categoryName: 'Bolts & Handles', sizes: ['5"', '6"'], shortDesc: 'Classic D-shaped aluminium pull handle for doors and cabinet shutters.', image: '/sku-sa35.png' },
  { id: 'sa-40', saCode: 'SA-40', name: 'Handle Lock', categorySlug: 'bolts-handles', categoryName: 'Bolts & Handles', shortDesc: 'Integrated lever handle lock set with mortise cylinder mechanism.', image: '/sku-sa35.png' },
  { id: 'sa-41', saCode: 'SA-41', name: 'H-Handle', categorySlug: 'bolts-handles', categoryName: 'Bolts & Handles', sizes: ['12"', '14"', '18"', '24"'], shortDesc: 'Architectural back-to-back H pull handle for main glass & wooden entry doors.', image: '/sku-sa35.png' },

  // G. Door Closers
  { id: 'sa-42', saCode: 'SA-42', name: 'Door Closer (Aluminium / SS)', categorySlug: 'door-closers', categoryName: 'Door Closers', variants: ['Aluminium Body', 'SS Cover'], shortDesc: 'Overhead hydraulic surface door closer with adjustable latching speed.', image: '/sku-sa42.png' },
  { id: 'sa-43', saCode: 'SA-43', name: 'Pencil Door Closer', categorySlug: 'door-closers', categoryName: 'Door Closers', shortDesc: 'Slimline pencil-type pneumatic door closer for screen doors and light shutters.', image: '/sku-sa42.png' },
  { id: 'sa-44', saCode: 'SA-44', name: 'Capsule Door Closer', categorySlug: 'door-closers', categoryName: 'Door Closers', shortDesc: 'Heavy-duty capsule body hydraulic door closer for high-traffic entryways.', image: '/sku-sa42.png' },

  // H. Fittings & Accessories
  { id: 'sa-45', saCode: 'SA-45', name: 'Floor Machine (Floor Spring)', categorySlug: 'fittings-accessories', categoryName: 'Fittings & Accessories', shortDesc: 'Double cylinder hydraulic floor spring machine for heavy glass doors.', image: '/sku-sa76.png' },
  { id: 'sa-46', saCode: 'SA-46', name: 'Wall Plug', categorySlug: 'fittings-accessories', categoryName: 'Fittings & Accessories', shortDesc: 'High-grip nylon expansion wall plugs for frame anchoring screws.', image: '/sku-sa76.png' },
  { id: 'sa-50', saCode: 'SA-50', name: 'Partition Connector', categorySlug: 'fittings-accessories', categoryName: 'Fittings & Accessories', shortDesc: 'Aluminium corner & T-connector bracket for office glass partition profiles.', image: '/sku-sa76.png' },
  { id: 'sa-51', saCode: 'SA-51', name: 'Glass Sticker Film', categorySlug: 'fittings-accessories', categoryName: 'Fittings & Accessories', shortDesc: 'Frosted & decorative privacy safety film for glass panels.', image: '/sku-sa76.png' },
  { id: 'sa-52', saCode: 'SA-52', name: '2Trk–3Trk PVC Angle', categorySlug: 'fittings-accessories', categoryName: 'Fittings & Accessories', shortDesc: 'PVC corner sealing angle for 2-track and 3-track window sills.', image: '/sku-sa76.png' },
  { id: 'sa-53', saCode: 'SA-53', name: 'Premium U-Channel', categorySlug: 'fittings-accessories', categoryName: 'Fittings & Accessories', shortDesc: 'Heavy-gauge extruded aluminium U-channel for structural glass perimeter mounting.', image: '/sku-sa76.png' },
  { id: 'sa-54', saCode: 'SA-54', name: 'Light U-Channel', categorySlug: 'fittings-accessories', categoryName: 'Fittings & Accessories', shortDesc: 'Standard wall thickness aluminium U-channel for light glazing trims.', image: '/sku-sa76.png' },

  // I. Tapes, Sealants & Adhesives
  { id: 'sa-47', saCode: 'SA-47', name: 'VHB Tape – Clear', categorySlug: 'tapes-sealants-adhesives', categoryName: 'Tapes, Sealants & Adhesives', shortDesc: 'High-bond transparent acrylic foam VHB tape for invisible glass-to-glass joints.', image: '/sku-sa81.png' },
  { id: 'sa-48', saCode: 'SA-48', name: 'VHB Tape – Grey', categorySlug: 'tapes-sealants-adhesives', categoryName: 'Tapes, Sealants & Adhesives', shortDesc: 'Heavy structural grey double-sided VHB tape for cladding & facade bonding.', image: '/sku-sa81.png' },
  { id: 'sa-49', saCode: 'SA-49', name: 'Rubber Weather Strip Gasket', categorySlug: 'tapes-sealants-adhesives', categoryName: 'Tapes, Sealants & Adhesives', shortDesc: 'EPDM rubber glazing gasket for waterproof window sealing.', image: '/sku-sa81.png' },
  { id: 'sa-55', saCode: 'SA-55', name: 'Silicone Sealant', categorySlug: 'tapes-sealants-adhesives', categoryName: 'Tapes, Sealants & Adhesives', shortDesc: 'Neutral cure weatherproofing silicone sealant cartridge for perimeter gaps.', image: '/sku-sa81.png' },
  { id: 'sa-56', saCode: 'SA-56', name: 'PU Foam (Insulation Sealant)', categorySlug: 'tapes-sealants-adhesives', categoryName: 'Tapes, Sealants & Adhesives', shortDesc: 'Expanding Polyurethane foam for gap filling, thermal & sound insulation around door frames.', image: '/sku-sa81.png' },
  { id: 'sa-57', saCode: 'SA-57', name: 'Silicone Gun', categorySlug: 'tapes-sealants-adhesives', categoryName: 'Tapes, Sealants & Adhesives', shortDesc: 'Heavy-duty steel skeleton caulking gun for 300ml sealant cartridges.', image: '/sku-sa81.png' },

  // J. Fasteners & Screws
  { id: 'sa-58', saCode: 'SA-58', name: 'SDS Self Drilling Screws', categorySlug: 'fasteners-screws', categoryName: 'Fasteners & Screws', shortDesc: 'Hardened zinc-plated self-drilling screws for aluminium & sheet metal framing.', image: '/sku-sa81.png' },
  { id: 'sa-59', saCode: 'SA-59', name: 'Black Drywall Screws', categorySlug: 'fasteners-screws', categoryName: 'Fasteners & Screws', shortDesc: 'Black phosphate bugle head screws for partition & drywall fixing.', image: '/sku-sa81.png' },
  { id: 'sa-60', saCode: 'SA-60', name: 'Wood Screws', categorySlug: 'fasteners-screws', categoryName: 'Fasteners & Screws', shortDesc: 'Countersunk head wood screws for timber and frame anchor applications.', image: '/sku-sa81.png' },
  { id: 'sa-61', saCode: 'SA-61', name: 'Carriage Bolt', categorySlug: 'fasteners-screws', categoryName: 'Fasteners & Screws', shortDesc: 'Square neck carriage bolts for heavy timber & steel hardware joints.', image: '/sku-sa81.png' },
  { id: 'sa-62', saCode: 'SA-62', name: 'STS Self Tapping Screws', categorySlug: 'fasteners-screws', categoryName: 'Fasteners & Screws', shortDesc: 'Precision self-tapping screws for aluminium extrusions and hardware brackets.', image: '/sku-sa81.png' },
  { id: 'sa-63', saCode: 'SA-63', name: 'Friction Stay Hinges', categorySlug: 'fasteners-screws', categoryName: 'Fasteners & Screws', shortDesc: 'Heavy-duty SS friction stay arm for casement windows.', image: '/sku-sa81.png' },
  { id: 'sa-64', saCode: 'SA-64', name: 'Arm Stay', categorySlug: 'fasteners-screws', categoryName: 'Fasteners & Screws', shortDesc: 'Window restrictor arm stay for controlled ventilation safety.', image: '/sku-sa81.png' },

  // K. Glass Hardware & Shower Fittings
  { id: 'sa-65', saCode: 'SA-65', name: 'Sliding Roller (Glass)', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', shortDesc: 'Frameless glass door top track hanger roller with smooth ball bearings.', image: '/sku-sa76.png' },
  { id: 'sa-66', saCode: 'SA-66', name: 'Glass Knob', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', shortDesc: 'Back-to-back brass & SS knob for shower doors and glass cabinets.', image: '/sku-sa76.png' },
  { id: 'sa-67', saCode: 'SA-67', name: 'Round Concealed Glass Handle', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', shortDesc: 'Flush recessed circular pull handle for frameless glass sliding doors.', image: '/sku-sa76.png' },
  { id: 'sa-68', saCode: 'SA-68', name: 'Glass to Glass Connector', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', shortDesc: '180° straight glass-to-glass structural fixing clamp.', image: '/sku-sa76.png' },
  { id: 'sa-69', saCode: 'SA-69', name: 'Wall to Glass Connector', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', shortDesc: '90° wall mounting bracket clamp for fixed glass partition panels.', image: '/sku-sa76.png' },
  { id: 'sa-70', saCode: 'SA-70', name: 'Center Lock', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', shortDesc: 'Mid-height patch lock for glass doors with key & thumbturn.', image: '/sku-sa76.png' },
  { id: 'sa-71', saCode: 'SA-71', name: 'Patch Lock', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', shortDesc: 'Bottom corner glass patch fitting lock for tempered glass entry doors.', image: '/sku-sa76.png' },
  { id: 'sa-72', saCode: 'SA-72', name: 'Big-L Connector', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', shortDesc: 'Large L-bracket connector clamp for structural glass corner joints.', image: '/sku-sa76.png' },
  { id: 'sa-73', saCode: 'SA-73', name: 'Small-L Connector', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', shortDesc: 'Compact L-connector clamp for shower cubicle glass joints.', image: '/sku-sa76.png' },
  { id: 'sa-74', saCode: 'SA-74', name: 'Wall to Glass Connector (CPY)', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', shortDesc: 'Polished Chrome (CPY) heavy wall-to-glass clamp bracket.', image: '/sku-sa76.png' },
  { id: 'sa-75', saCode: 'SA-75', name: 'Shower Hinge – 0° Fix Clip (CP)', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', finishes: ['Chrome Plated (CP)'], shortDesc: 'Fixed wall clip hinge for stationary shower enclosure glass panels.', image: '/sku-sa76.png' },
  { id: 'sa-76', saCode: 'SA-76', name: 'Shower Hinge – 90° Wall to Glass (CP)', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', finishes: ['Chrome Plated (CP)'], shortDesc: 'Spring-loaded self-closing 90° wall-to-glass shower door hinge.', image: '/sku-sa76.png' },
  { id: 'sa-77', saCode: 'SA-77', name: 'Shower Hinge – 180° Glass to Glass (CP)', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', finishes: ['Chrome Plated (CP)'], shortDesc: '180° straight inline glass-to-glass swing hinge for frameless shower doors.', image: '/sku-sa76.png' },
  { id: 'sa-78', saCode: 'SA-78', name: 'Shower Hinge – 90° Double Glass to Glass (CP)', categorySlug: 'glass-hardware-shower-fittings', categoryName: 'Glass Hardware & Shower Fittings', finishes: ['Chrome Plated (CP)'], shortDesc: 'Corner 90° double glass-to-glass shower door hinge in high CP mirror polish.', image: '/sku-sa76.png' },

  // L. Abrasives, Mesh & Misc.
  { id: 'sa-79', saCode: 'SA-79', name: 'Flap Disk', categorySlug: 'abrasives-mesh-misc', categoryName: 'Abrasives, Mesh & Misc.', shortDesc: 'Zirconia abrasive flap grinding disk for aluminium weld & edge smoothing.', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&q=80' },
  { id: 'sa-80', saCode: 'SA-80', name: 'Cutting Wheel', categorySlug: 'abrasives-mesh-misc', categoryName: 'Abrasives, Mesh & Misc.', shortDesc: 'Ultra-thin reinforced metal & aluminium profile cutting wheel disk.', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&q=80' },
  { id: 'sa-81', saCode: 'SA-81', name: 'Machar Jaali (Mosquito Mesh)', categorySlug: 'abrasives-mesh-misc', categoryName: 'Abrasives, Mesh & Misc.', sizes: ['2ft', '2.5ft', '3.5ft', '3.75ft', '5ft'], variants: ['Full Roll', 'Short Cut'], shortDesc: 'SS / Aluminium insect screen mesh available in 5 standard width rolls.', image: '/sku-sa81.png' },
  { id: 'sa-82', saCode: 'SA-82', name: 'Aluminium Louvers', categorySlug: 'abrasives-mesh-misc', categoryName: 'Abrasives, Mesh & Misc.', shortDesc: 'Ventilation louver blades for bathroom & kitchen window shutters.', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&q=80' },
  { id: 'sa-83', saCode: 'SA-83', name: 'Black Jaali (Powder Coated)', categorySlug: 'abrasives-mesh-misc', categoryName: 'Abrasives, Mesh & Misc.', shortDesc: 'Matte black anti-corrosion mesh for modern window security screens.', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&q=80' },
  { id: 'sa-84', saCode: 'SA-84', name: 'Plastic Jaali', categorySlug: 'abrasives-mesh-misc', categoryName: 'Abrasives, Mesh & Misc.', shortDesc: 'High-density HDPE plastic mesh for economical window insect screening.', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&q=80' },
  { id: 'sa-85', saCode: 'SA-85', name: 'Corner Cleat (Joint Key)', categorySlug: 'abrasives-mesh-misc', categoryName: 'Abrasives, Mesh & Misc.', shortDesc: 'Internal aluminium corner cleat joint for 90° window frame crimping.', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&q=80' },
  { id: 'sa-86', saCode: 'SA-86', name: 'Espag (Espagnolette Lock)', categorySlug: 'abrasives-mesh-misc', categoryName: 'Abrasives, Mesh & Misc.', shortDesc: 'Multi-point espagnolette locking gear rod for casement window sashes.', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&q=80' }
];

export function getSAHProductByCode(saCode: string): SAHProduct | undefined {
  return FULL_CATALOGUE_PRODUCTS.find(p => p.saCode.toLowerCase() === saCode.toLowerCase() || p.id === saCode.toLowerCase());
}

export function getSAHProductsByCategory(categorySlug: string): SAHProduct[] {
  return FULL_CATALOGUE_PRODUCTS.filter(p => p.categorySlug === categorySlug);
}
