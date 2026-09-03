export type Segment = 'residential' | 'commercial' | 'industrial';
export type Finish = 'Brushed Gold' | 'Anodized Champagne' | 'Matte Black' | 'Satin Chrome' | 'Polished Silver' | 'Antique Bronze' | 'Raw Aluminium';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: string;
  categorySlug: string;
  segment: Segment;
  material: string;
  alloyGrade: string;
  finish: Finish;
  price: number;
  moq: number;
  images: string[];
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  faqs: ProductFaq[];
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  tags?: string[];
}

export const SEGMENTS: Record<Segment, { label: string; description: string; icon: string }> = {
  residential: {
    label: 'Residential',
    description: 'Curated hardware for homes that demand elegance',
    icon: '🏠',
  },
  commercial: {
    label: 'Commercial',
    description: 'Premium fittings for commercial and hospitality spaces',
    icon: '🏢',
  },
  industrial: {
    label: 'Industrial',
    description: 'High-performance extrusions for industrial applications',
    icon: '🏭',
  },
};

export const products: Product[] = [
  // =================== RESIDENTIAL ===================
  {
    id: 'r-001',
    slug: 'palazzo-door-handle-brushed-gold',
    name: 'Palazzo Lever Handle',
    sku: 'SAH-R-DH-001',
    category: 'Door Handles',
    categorySlug: 'door-handles',
    segment: 'residential',
    material: 'Solid Brass with Aluminium Core',
    alloyGrade: 'EN AW-6063 T6',
    finish: 'Brushed Gold',
    price: 4800,
    moq: 1,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85',
    ],
    shortDescription: 'Timeless lever handle crafted from solid brass with an EN AW-6063 aluminium core. A signature piece for grand entrances.',
    description: `The Palazzo Lever Handle is the embodiment of classical elegance translated into contemporary hardware design. Each piece is individually crafted from solid brass with a precision-milled EN AW-6063 T6 aluminium core, ensuring structural integrity that matches its visual refinement.

The brushed gold finish is applied through a multi-stage electroplating process, followed by hand-buffing to achieve the characteristic warm lustre that sets our hardware apart from mass-produced alternatives. The result is a finish that grows more beautiful with age, developing a subtle patina that tells the story of a well-lived home.`,
    specs: [
      { label: 'Material', value: 'Solid Brass / EN AW-6063 T6' },
      { label: 'Finish', value: 'Brushed Gold (PVD Coated)' },
      { label: 'Length', value: '125mm' },
      { label: 'Projection', value: '68mm' },
      { label: 'Rose Diameter', value: '55mm' },
      { label: 'Backset Options', value: '60mm / 70mm / 85mm' },
      { label: 'Door Thickness', value: '35–55mm' },
      { label: 'Weight (per pair)', value: '410g' },
      { label: 'Warranty', value: '5 Years' },
      { label: 'Certifications', value: 'EN 1906 Grade 3, BIS Certified' },
    ],
    faqs: [
      { question: 'What door thickness is compatible?', answer: 'The Palazzo handle works with door thicknesses from 35mm to 55mm. Custom spindle lengths available on request for thicker doors.' },
      { question: 'Can the finish be customised?', answer: 'We offer Brushed Gold, Antique Bronze, and Matte Black finishes. Custom finishes are available for orders above 50 pairs.' },
      { question: 'Is it suitable for exterior doors?', answer: 'The Palazzo is designed for interior use. For exterior applications, we recommend our Imperiale series with marine-grade corrosion resistance.' },
    ],
    rating: 4.9,
    reviewsCount: 47,
    isFeatured: true,
    isNew: false,
    tags: ['door hardware', 'brass', 'luxury', 'residential'],
  },
  {
    id: 'r-002',
    slug: 'venezia-window-handle-satin-chrome',
    name: 'Venezia Tilt & Turn Handle',
    sku: 'SAH-R-WH-002',
    category: 'Window Handles',
    categorySlug: 'window-handles',
    segment: 'residential',
    material: 'Die-Cast Zinc Alloy',
    alloyGrade: 'Zamak 5',
    finish: 'Satin Chrome',
    price: 1850,
    moq: 2,
    images: [
      'https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?w=800&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=85',
    ],
    shortDescription: 'A refined tilt-and-turn window handle for uPVC and aluminium windows, offering smooth 180° operation with precision engineering.',
    description: `The Venezia Tilt & Turn Handle brings Italian-inspired elegance to the everyday act of opening a window. Its ergonomic profile is designed for both aesthetic appeal and functional ease, operating with the precise, satisfying click of quality engineering.

Constructed from Zamak 5 die-cast zinc alloy, the handle is both lightweight and corrosion-resistant. The satin chrome finish complements both contemporary and classic interior palettes, from minimalist Scandinavian to traditional Indian aesthetics.`,
    specs: [
      { label: 'Material', value: 'Zamak 5 Die-Cast Zinc Alloy' },
      { label: 'Finish', value: 'Satin Chrome' },
      { label: 'Spindle Length', value: '30mm standard' },
      { label: 'Operation', value: '90° / 180° selectable' },
      { label: 'Fixing Centres', value: '43mm' },
      { label: 'Weight', value: '95g' },
      { label: 'Compatible With', value: 'uPVC, Aluminium, Wood frames' },
      { label: 'Warranty', value: '3 Years' },
    ],
    faqs: [
      { question: 'Does this fit standard spindle sizes?', answer: 'Yes, the Venezia fits standard 7mm square spindles, used across most uPVC and aluminium window profiles.' },
      { question: 'Is it available in other finishes?', answer: 'Available in Satin Chrome, Matte Black, and Brushed Gold. Mixed-finish orders accepted above 10 units.' },
    ],
    rating: 4.7,
    reviewsCount: 83,
    isFeatured: true,
    isNew: false,
    tags: ['window hardware', 'chrome', 'tilt & turn'],
  },
  {
    id: 'r-003',
    slug: 'sereno-sliding-door-system',
    name: 'Sereno Sliding Door System',
    sku: 'SAH-R-SD-003',
    category: 'Sliding Systems',
    categorySlug: 'sliding-systems',
    segment: 'residential',
    material: 'Extruded Aluminium',
    alloyGrade: 'EN AW-6061 T6',
    finish: 'Anodized Champagne',
    price: 18500,
    moq: 1,
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85',
    ],
    shortDescription: 'A precision-engineered concealed sliding door system for interior partitions, capable of carrying panels up to 80kg with silent operation.',
    description: `The Sereno Sliding Door System redefines interior living spaces through intelligent engineering and refined aesthetics. Its concealed track design hides all mechanical components within the wall cavity, presenting a clean, uninterrupted aesthetic that luxury interiors demand.

The system's self-closing mechanism ensures the door always returns to a soft-closed position, with adjustable dampening to match your preferred closing speed. The EN AW-6061 T6 aluminium track profile is precision-extruded with a 0.02mm tolerance across its full length.`,
    specs: [
      { label: 'Track Material', value: 'EN AW-6061 T6 Extruded Aluminium' },
      { label: 'Finish', value: 'Anodized Champagne' },
      { label: 'Max Panel Weight', value: '80kg per panel' },
      { label: 'Track Length Options', value: '1.2m / 1.8m / 2.4m / Custom' },
      { label: 'Panel Thickness', value: '35–45mm' },
      { label: 'Soft-Close Speed', value: 'Adjustable 2–8 seconds' },
      { label: 'Noise Level', value: '<28dB during operation' },
      { label: 'Warranty', value: '10 Years on track; 5 Years on fittings' },
    ],
    faqs: [
      { question: 'Can this be retrofitted into existing walls?', answer: 'The Sereno requires a minimum wall cavity depth of 80mm. Retrofit installations are possible in dry-wall constructions but require structural consultation.' },
      { question: 'What panel types are compatible?', answer: 'Timber, MDF, glass (with glass adaptor kit), and composite panels up to 45mm thickness.' },
    ],
    rating: 4.8,
    reviewsCount: 31,
    isFeatured: true,
    isNew: true,
    tags: ['sliding door', 'concealed', 'soft-close', 'residential'],
  },
  {
    id: 'r-004',
    slug: 'classica-wardrobe-profile',
    name: 'Classica Wardrobe Profile',
    sku: 'SAH-R-WP-004',
    category: 'Wardrobe Systems',
    categorySlug: 'wardrobe-systems',
    segment: 'residential',
    material: 'Extruded Aluminium',
    alloyGrade: 'EN AW-6063 T5',
    finish: 'Anodized Champagne',
    price: 3200,
    moq: 3,
    images: [
      'https://images.unsplash.com/photo-1558997519-83ea9252eeb8?w=800&q=85',
    ],
    shortDescription: 'Precision wardrobe frame profile in anodized aluminium for built-in and freestanding wardrobe systems.',
    description: `The Classica Wardrobe Profile brings the precision of industrial extrusion to residential cabinetry. Each profile is extruded to exact dimensional tolerances, ensuring that modular wardrobe assemblies remain perfectly square and level over decades of use.`,
    specs: [
      { label: 'Material', value: 'EN AW-6063 T5' },
      { label: 'Finish', value: 'Anodized Champagne (15 microns)' },
      { label: 'Section Width', value: '48mm' },
      { label: 'Section Height', value: '32mm' },
      { label: 'Wall Thickness', value: '1.8mm' },
      { label: 'Standard Length', value: '2400mm' },
      { label: 'Custom Cutting', value: 'Available (min. 5 units)' },
    ],
    faqs: [
      { question: 'Can these be cut to custom lengths?', answer: 'Yes, custom cutting is available for orders of 5 units or more. Specify lengths at order time.' },
    ],
    rating: 4.6,
    reviewsCount: 22,
    isFeatured: false,
    isNew: false,
    tags: ['wardrobe', 'aluminium profile', 'residential'],
  },

  // =================== COMMERCIAL ===================
  {
    id: 'c-001',
    slug: 'imperiale-glass-door-patch',
    name: 'Imperiale Glass Door Patch Fitting',
    sku: 'SAH-C-GP-001',
    category: 'Glass Hardware',
    categorySlug: 'glass-hardware',
    segment: 'commercial',
    material: 'Marine-Grade Stainless Steel & Aluminium',
    alloyGrade: 'SS 316L / EN AW-6061 T6',
    finish: 'Satin Chrome',
    price: 12800,
    moq: 1,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85',
    ],
    shortDescription: 'Commercial-grade glass door patch fitting for 10–15mm tempered/laminated glass, rated for high-traffic environments.',
    description: `The Imperiale Glass Door Patch Fitting is engineered for the demands of commercial spaces where both aesthetics and structural reliability are non-negotiable. Used in premium office lobbies, hotel entrances, and retail environments, each fitting is rated to carry glass panels up to 120kg.

The satin chrome finish on marine-grade SS 316L resists tarnishing in both interior and exterior applications, including coastal environments. The precision-machined aluminium pivot mechanism ensures smooth, consistent operation even after tens of thousands of cycles.`,
    specs: [
      { label: 'Material', value: 'SS 316L / EN AW-6061 T6' },
      { label: 'Finish', value: 'Satin Chrome' },
      { label: 'Glass Thickness', value: '10mm / 12mm / 15mm' },
      { label: 'Max Panel Weight', value: '120kg' },
      { label: 'Pivot Type', value: 'Floor-spring / Overhead concealed' },
      { label: 'Opening Angle', value: '90° / 105° / 180°' },
      { label: 'Rating', value: 'EN 1154 Grade 5 (High Traffic)' },
      { label: 'Warranty', value: '7 Years' },
      { label: 'Certifications', value: 'CE Marked, BIS IS 1341' },
    ],
    faqs: [
      { question: 'Does this require a floor spring?', answer: 'Yes, a concealed floor-spring unit is required for pivot operation. We supply matched floor springs as an add-on. Surface-mounted overhead closers are also compatible.' },
      { question: 'Is it suitable for frameless glass partitions?', answer: 'Yes, the Imperiale is specifically designed for frameless and minimal-frame glass configurations.' },
      { question: 'What is the minimum glass thickness?', answer: 'Minimum 10mm tempered glass. For exterior use, 12mm minimum for wind-load compliance.' },
    ],
    rating: 4.9,
    reviewsCount: 38,
    isFeatured: true,
    isNew: false,
    tags: ['glass hardware', 'commercial', 'stainless steel', 'office'],
  },
  {
    id: 'c-002',
    slug: 'curtain-wall-system-aluminium',
    name: 'Atrium Curtain Wall System',
    sku: 'SAH-C-CW-002',
    category: 'Curtain Wall',
    categorySlug: 'curtain-wall',
    segment: 'commercial',
    material: 'Structural Aluminium',
    alloyGrade: 'EN AW-6063 T6',
    finish: 'Anodized Champagne',
    price: 95000,
    moq: 1,
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
    ],
    shortDescription: 'Unitized curtain wall aluminium system for commercial façades. Wind-pressure rated to 3.5kN/m² with thermal break for energy efficiency.',
    description: `The Atrium Curtain Wall System delivers architectural façade performance at the premium end of the commercial building market. Designed in collaboration with leading façade engineers, each mullion and transom profile is precision-extruded with integral thermal-break channels that reduce heat transfer by 60% compared to non-broken aluminium systems.

The system accommodates glass units up to 70mm thickness and integrates seamlessly with structural silicone glazing techniques for a flush exterior appearance.`,
    specs: [
      { label: 'Profile Material', value: 'EN AW-6063 T6' },
      { label: 'Finish', value: 'Anodized Champagne (20 microns)' },
      { label: 'Mullion Depth', value: '150mm / 200mm / 250mm' },
      { label: 'Transom Depth', value: '65mm / 100mm' },
      { label: 'Glazing Thickness', value: 'Up to 70mm (IGU compatible)' },
      { label: 'Wind Load Rating', value: '3.5 kN/m²' },
      { label: 'U-Value (with thermal break)', value: '1.8 W/m²K' },
      { label: 'Air Permeability', value: 'Class A4 (EN 12152)' },
      { label: 'Water Tightness', value: 'Class E1200 (EN 12153)' },
      { label: 'Certifications', value: 'CE Marked, BIS IS 3614, ISO 9001' },
    ],
    faqs: [
      { question: 'What is the maximum panel size?', answer: 'Standard panels up to 2.5m x 4.5m. Engineered solutions for larger panels available subject to structural review.' },
      { question: 'Can this be used with photovoltaic glass?', answer: 'Yes, the Atrium system is compatible with BIPV (Building-Integrated Photovoltaics) modules up to 50mm thickness.' },
    ],
    rating: 4.8,
    reviewsCount: 14,
    isFeatured: true,
    isNew: false,
    tags: ['curtain wall', 'façade', 'commercial', 'structural'],
  },
  {
    id: 'c-003',
    slug: 'commercial-floor-spring-heavy-duty',
    name: 'Titan Pro Floor Spring',
    sku: 'SAH-C-FS-003',
    category: 'Door Closers',
    categorySlug: 'door-closers',
    segment: 'commercial',
    material: 'Stainless Steel Mechanism / Cast Iron Body',
    alloyGrade: 'SS 304',
    finish: 'Polished Silver',
    price: 7500,
    moq: 1,
    images: [
      'https://images.unsplash.com/photo-1558618047-f4e90d3a7e6a?w=800&q=85',
    ],
    shortDescription: 'Heavy-duty concealed floor spring for glass and timber doors. EN 1154 Grade 5 rated for doors up to 120kg and 1200mm width.',
    description: `The Titan Pro Floor Spring is engineered for the most demanding commercial environments. Its double-acting mechanism allows operation in both directions, while the adjustable spring tension accommodates door weights from 40kg to 120kg without hardware replacement.`,
    specs: [
      { label: 'Door Weight', value: '40–120kg' },
      { label: 'Door Width', value: 'Up to 1200mm' },
      { label: 'Opening Angle', value: '90° or 180°' },
      { label: 'Closing Speed', value: 'Independently adjustable' },
      { label: 'Body Material', value: 'Grade 304 Stainless Steel' },
      { label: 'Rating', value: 'EN 1154 Grade 5' },
      { label: 'Warranty', value: '5 Years' },
    ],
    faqs: [
      { question: 'Is this fire-rated?', answer: 'Yes, the Titan Pro carries EN 1634-1 fire certification for use in fire-rated door assemblies up to 120 minutes.' },
    ],
    rating: 4.7,
    reviewsCount: 29,
    isFeatured: false,
    isNew: false,
    tags: ['floor spring', 'door closer', 'commercial', 'glass door'],
  },
  {
    id: 'c-004',
    slug: 'panorama-aluminium-window-system',
    name: 'Panorama Sliding Window System',
    sku: 'SAH-C-WS-004',
    category: 'Window Systems',
    categorySlug: 'window-systems',
    segment: 'commercial',
    material: 'Extruded Aluminium',
    alloyGrade: 'EN AW-6063 T6',
    finish: 'Matte Black',
    price: 42000,
    moq: 1,
    images: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=85',
    ],
    shortDescription: 'Large-format sliding aluminium window system for commercial buildings. Slim 28mm sight lines for maximum glazed area.',
    description: `The Panorama system redefines what is architecturally possible in sliding window systems. Its slender 28mm mullion sight lines create a near-frameless glazing experience while meeting all structural and weather performance requirements for multi-storey commercial applications.`,
    specs: [
      { label: 'Profile Material', value: 'EN AW-6063 T6' },
      { label: 'Finish', value: 'Matte Black Powder Coat' },
      { label: 'Sight Line Width', value: '28mm' },
      { label: 'Max Sash Size', value: '2400mm x 2400mm' },
      { label: 'Max Sash Weight', value: '200kg per leaf' },
      { label: 'Glazing', value: '24–32mm IGU compatible' },
      { label: 'U-Value', value: '1.6 W/m²K (with thermal break)' },
      { label: 'Certifications', value: 'CE Marked, BIS IS 1948' },
    ],
    faqs: [
      { question: 'Can this be motorised?', answer: 'Yes, motorised drive units can be integrated. We partner with certified building automation suppliers for motorised configurations.' },
    ],
    rating: 4.6,
    reviewsCount: 18,
    isFeatured: true,
    isNew: true,
    tags: ['window system', 'commercial', 'slim profile', 'matte black'],
  },

  // =================== INDUSTRIAL ===================
  {
    id: 'i-001',
    slug: 'industrial-t-slot-profile-40x40',
    name: 'T-Slot Structural Profile 40×40',
    sku: 'SAH-I-TS-001',
    category: 'T-Slot Profiles',
    categorySlug: 't-slot-profiles',
    segment: 'industrial',
    material: 'Extruded Aluminium',
    alloyGrade: 'EN AW-6063 T6',
    finish: 'Raw Aluminium',
    price: 420,
    moq: 50,
    images: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=85',
    ],
    shortDescription: '40×40mm T-slot modular aluminium profile for machine frames, workbenches, guarding, and automation structures. M8 bolt compatible.',
    description: `The cornerstone of our industrial extrusion range, the 40×40 T-Slot Profile offers unparalleled versatility for industrial structure building. The continuous T-slot on all four faces accepts standard M8 slot nuts, enabling connections at any point along the profile without drilling.

Extruded from EN AW-6063 T6, the profile achieves an excellent strength-to-weight ratio. Its 1.8mm wall thickness provides the rigidity required for precision machinery and automation frames while keeping overall structure weight to a minimum.`,
    specs: [
      { label: 'Material', value: 'EN AW-6063 T6' },
      { label: 'Finish', value: 'Raw (Mill) / Clear Anodized available' },
      { label: 'Cross Section', value: '40mm × 40mm' },
      { label: 'Wall Thickness', value: '1.8mm' },
      { label: 'Slot Width', value: '8mm (M8 compatible)' },
      { label: 'Slot Depth', value: '7.5mm' },
      { label: 'Weight per Metre', value: '1.12 kg/m' },
      { label: 'Moment of Inertia (Ix)', value: '11.4 cm⁴' },
      { label: 'Standard Length', value: '3000mm or 6000mm' },
      { label: 'Custom Lengths', value: 'Available (min. 50 units)' },
      { label: 'Certifications', value: 'ISO 9001, BIS IS 733' },
    ],
    faqs: [
      { question: 'What bolt size is compatible?', answer: 'M8 slot nuts and bolts are standard. M5 and M6 adapters available for lightweight assemblies.' },
      { question: 'Can I get anodized profiles?', answer: 'Yes, clear anodized (15 microns) and black anodized finishes are available for orders above 50 units.' },
      { question: 'What is the load-bearing capacity?', answer: 'In a simple-span configuration, a 1000mm length carries 85kg centre load before reaching the deflection limit of L/200.' },
    ],
    rating: 4.8,
    reviewsCount: 126,
    isFeatured: true,
    isNew: false,
    tags: ['t-slot', 'structural', 'industrial', 'automation', 'machine frame'],
  },
  {
    id: 'i-002',
    slug: 'heavy-duty-extrusion-80x80',
    name: 'Heavy Duty Profile 80×80',
    sku: 'SAH-I-HD-002',
    category: 'T-Slot Profiles',
    categorySlug: 't-slot-profiles',
    segment: 'industrial',
    material: 'Extruded Aluminium',
    alloyGrade: 'EN AW-6061 T6',
    finish: 'Raw Aluminium',
    price: 1280,
    moq: 20,
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=85',
    ],
    shortDescription: '80×80mm heavy-duty structural aluminium profile for high-load automation frames, robotic cells, and heavy machinery guarding.',
    description: `When standard profiles are not enough, the Heavy Duty 80×80 delivers. Engineered from EN AW-6061 T6 — an alloy renowned for its exceptional strength — this profile carries loads that would deflect lighter-grade alternatives.

Its reinforced corner chambers and double-wall construction provide torsional rigidity that is critical in precision robotic and CNC applications.`,
    specs: [
      { label: 'Material', value: 'EN AW-6061 T6' },
      { label: 'Cross Section', value: '80mm × 80mm' },
      { label: 'Wall Thickness', value: '3.5mm' },
      { label: 'Weight per Metre', value: '4.8 kg/m' },
      { label: 'Slot Width', value: '10mm (M10 compatible)' },
      { label: 'Moment of Inertia', value: '148 cm⁴' },
      { label: 'Tensile Strength', value: '290 MPa min.' },
      { label: 'Standard Lengths', value: '3000mm / 6000mm' },
    ],
    faqs: [
      { question: 'What is the maximum unsupported span?', answer: 'For a max deflection of L/360, the 80×80 spans 2200mm carrying 500kg centre load.' },
    ],
    rating: 4.9,
    reviewsCount: 74,
    isFeatured: false,
    isNew: false,
    tags: ['heavy duty', 'structural', 'industrial', 'robotic'],
  },
  {
    id: 'i-003',
    slug: 'industrial-conveyor-profile',
    name: 'Conveyor Support Profile',
    sku: 'SAH-I-CP-003',
    category: 'Conveyor Profiles',
    categorySlug: 'conveyor-profiles',
    segment: 'industrial',
    material: 'Extruded Aluminium',
    alloyGrade: 'EN AW-6063 T5',
    finish: 'Raw Aluminium',
    price: 580,
    moq: 30,
    images: [
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=85',
    ],
    shortDescription: 'Dedicated conveyor belt support profile with integrated guide channels and pre-drilled motor mount positions. EHEDG food-grade available.',
    description: `Purpose-designed for conveyor and material handling applications, this profile integrates guide rail channels, belt-return slots, and motor-mount positions into a single precision extrusion — eliminating the need for multiple components and reducing assembly time by up to 40%.

Available in standard and EHEDG-compliant food-grade versions for pharmaceutical and food processing environments.`,
    specs: [
      { label: 'Material', value: 'EN AW-6063 T5' },
      { label: 'Profile Width', value: '45mm / 90mm / 135mm / 180mm' },
      { label: 'Belt Width Compatibility', value: '25mm to 600mm' },
      { label: 'Guide Rail Slot', value: '6mm (T-slot)' },
      { label: 'Motor Mount Spacing', value: '100mm standard (custom available)' },
      { label: 'Food-Grade Version', value: 'Available — clear anodized 25 microns' },
      { label: 'Certifications', value: 'ISO 9001, EHEDG (food-grade version)' },
    ],
    faqs: [
      { question: 'Is a food-grade version available?', answer: 'Yes, our EHEDG-certified food-grade version uses a 25-micron clear anodize and eliminates internal voids that could harbour bacteria.' },
    ],
    rating: 4.7,
    reviewsCount: 52,
    isFeatured: true,
    isNew: true,
    tags: ['conveyor', 'industrial', 'food-grade', 'material handling'],
  },
  {
    id: 'i-004',
    slug: 'solar-panel-mounting-profile',
    name: 'Solar Racking Profile',
    sku: 'SAH-I-SR-004',
    category: 'Solar Profiles',
    categorySlug: 'solar-profiles',
    segment: 'industrial',
    material: 'Extruded Aluminium',
    alloyGrade: 'EN AW-6005A T6',
    finish: 'Raw Aluminium',
    price: 340,
    moq: 100,
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=85',
    ],
    shortDescription: 'High-strength aluminium solar panel mounting rail. Corrosion-resistant, rated for wind loads to 1.5 kN/m². Compatible with major racking systems.',
    description: `Our Solar Racking Profile is engineered for the demanding outdoor environment of large-scale photovoltaic installations. Extruded from EN AW-6005A T6, it achieves the highest strength-to-weight ratio in our solar range while maintaining the corrosion resistance essential for decades-long outdoor service life.`,
    specs: [
      { label: 'Material', value: 'EN AW-6005A T6' },
      { label: 'Profile Height', value: '35mm' },
      { label: 'Profile Width', value: '35mm' },
      { label: 'Wall Thickness', value: '1.5mm' },
      { label: 'Wind Load Rating', value: '1.5 kN/m²' },
      { label: 'Corrosion Resistance', value: 'Salt spray 1500hr (ASTM B117)' },
      { label: 'Standard Length', value: '4200mm' },
      { label: 'Certifications', value: 'IEC 61215, BIS IS 733' },
    ],
    faqs: [
      { question: 'What panel sizes are compatible?', answer: 'The profile is compatible with standard 60-cell, 72-cell, and 144-half-cell panels from all major manufacturers.' },
    ],
    rating: 4.8,
    reviewsCount: 89,
    isFeatured: false,
    isNew: false,
    tags: ['solar', 'renewable energy', 'racking', 'industrial'],
  },
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsBySegment(segment: Segment): Product[] {
  return products.filter((p) => p.segment === segment);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.segment === product.segment || p.categorySlug === product.categorySlug))
    .slice(0, limit);
}

export const CATEGORIES = [
  { slug: 'door-handles', label: 'Door Handles', segment: 'residential' as Segment },
  { slug: 'window-handles', label: 'Window Handles', segment: 'residential' as Segment },
  { slug: 'sliding-systems', label: 'Sliding Systems', segment: 'residential' as Segment },
  { slug: 'wardrobe-systems', label: 'Wardrobe Systems', segment: 'residential' as Segment },
  { slug: 'glass-hardware', label: 'Glass Hardware', segment: 'commercial' as Segment },
  { slug: 'curtain-wall', label: 'Curtain Wall', segment: 'commercial' as Segment },
  { slug: 'door-closers', label: 'Door Closers', segment: 'commercial' as Segment },
  { slug: 'window-systems', label: 'Window Systems', segment: 'commercial' as Segment },
  { slug: 't-slot-profiles', label: 'T-Slot Profiles', segment: 'industrial' as Segment },
  { slug: 'conveyor-profiles', label: 'Conveyor Profiles', segment: 'industrial' as Segment },
  { slug: 'solar-profiles', label: 'Solar Profiles', segment: 'industrial' as Segment },
];
