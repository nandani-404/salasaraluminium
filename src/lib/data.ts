export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'residential' | 'commercial' | 'industrial';
  subcategory: string;
  shortDescription: string;
  fullDescription: string;
  alloy: string;
  temper: string;
  availableFinishes: string[];
  dimensions: string;
  weightPerMeter?: string;
  applications: string[];
  featured?: boolean;
  image: string;
  specSheetUrl?: string;
  specifications: Record<string, string>;
}

export interface Finish {
  id: string;
  name: string;
  code: string;
  type: 'mill' | 'anodized' | 'powder-coat';
  description: string;
  thicknessMicrons: string;
  corrosionResistance: 'Good' | 'High' | 'Exceptional' | 'Extreme';
  recommendedUse: string;
  hexColor: string;
  bgGradient?: string;
}

export interface Project {
  id: string;
  title: string;
  segment: 'residential' | 'commercial' | 'industrial';
  location: string;
  completionYear: string;
  description: string;
  productsUsed: string[];
  image: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  qaBlocks: { question: string; answer: string }[];
  content: string; // Markdown / HTML formatted text
}

export const CATEGORIES = [
  {
    id: 'residential',
    name: 'Residential Solutions',
    slug: 'residential',
    tagline: 'Precision hardware, sliding window profiles, architectural railings, and cabinet fittings.',
    description: 'Designed for modern homes and luxury residences. Our residential extrusions combine smooth silent glide mechanisms with corrosion-resistant premium finishes.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Window & Door Systems', 'Glass Railings & Balustrades', 'Cabinet & Wardrobe Profiles', 'Rain Gutters & Trims']
  },
  {
    id: 'commercial',
    name: 'Commercial Systems',
    slug: 'commercial',
    tagline: 'High-load curtain wall framing, storefront systems, structural glazing, and architectural louvers.',
    description: 'Engineered for high-traffic commercial buildings, office towers, and retail storefronts. High wind-load ratings and thermal break options.',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Storefront Systems', 'Curtain Wall Framing', 'Architectural Louvers & Sunshades', 'Partition Profiles & Signage']
  },
  {
    id: 'industrial',
    name: 'Industrial Extrusions',
    slug: 'industrial',
    tagline: 'Heavy-duty structural T-slot profiles, solar panel mounting frames, heat sinks, and fasteners.',
    description: 'Custom engineered high-strength T6 temper profiles for machinery automation, solar mounting arrays, electrical enclosures, and heavy industrial framing.',
    icon: 'Factory',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Structural T-Slot Framing', 'Solar PV Mounting Rails', 'Thermal Management & Heat Sinks', 'Industrial Fasteners & Hardware']
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    slug: 'slimline-sliding-window-profile',
    name: 'Slimline Architectural Sliding Window System',
    category: 'residential',
    subcategory: 'Window & Door Systems',
    shortDescription: 'Ultra-thin sightline aluminum profile engineered for double-glazed panoramic sliding doors and windows.',
    fullDescription: 'The Salasar Slimline Series provides minimal visible aluminum frame (21mm interlock sightline) while offering maximum thermal isolation and high structural strength. Ideal for luxury residential villas and high-rise apartments facing harsh weather.',
    alloy: '6063-T6 Architectural Grade',
    temper: 'T6',
    availableFinishes: ['Anodized Silver', 'Matte Black Powder', 'Champagne Anodized', 'Custom RAL'],
    dimensions: 'Frame Depth: 120mm | Interlock Sightline: 21mm',
    weightPerMeter: '1.42 kg/m',
    applications: ['Luxury Villa Balconies', 'Penthouse Panoramic Windows', 'Patio Glass Enclosures'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    specSheetUrl: '/docs/slimline-sliding-system-spec.pdf',
    specifications: {
      'Alloy Grade': 'EN AW 6063 (AlMg0.7Si)',
      'Temper Condition': 'T6 Artificial Ageing',
      'Wind Load Resistance': 'Class C5 / B5 (EN 12210)',
      'Water Tightness': 'Class E900 (EN 12208)',
      'Air Permeability': 'Class 4 (EN 12207)',
      'Glass Thickness Range': '8mm Single to 32mm Double Glazed'
    }
  },
  {
    id: 'prod-02',
    slug: 'frameless-glass-railing-channel',
    name: 'Base-Mounted Heavy Duty Glass Railing Channel',
    category: 'residential',
    subcategory: 'Glass Railings & Balustrades',
    shortDescription: 'Surface-mounted aluminum shoe channel system designed for frameless toughened glass balustrades.',
    fullDescription: 'Manufactured from high-tensile 6061-T6 structural aluminum, this U-channel profile supports up to 17.52mm and 21.52mm SGP laminated glass without requiring top handrails or vertical posts.',
    alloy: '6061-T6 Structural Grade',
    temper: 'T6',
    availableFinishes: ['Anodized Silver 20µm', 'Satin Gold Anodized', 'Matte Black Powder'],
    dimensions: 'Width: 70mm | Height: 105mm | Length: 3000mm standard',
    weightPerMeter: '4.85 kg/m',
    applications: ['Balcony Railings', 'Staircase Glass Balustrades', 'Commercial Mezzanines'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    specifications: {
      'Alloy Grade': '6061-T6 High Tensile Structural',
      'Design Line Load': '1.5 kN/m to 3.0 kN/m certified',
      'Glass Compatibility': '12mm to 21.52mm SGP Laminated',
      'Fixing Method': 'M12 Heavy Duty Expansion Anchors',
      'Drainage System': 'Integrated weep slots every 300mm'
    }
  },
  {
    id: 'prod-03',
    slug: 'curtain-wall-mullion-50mm',
    name: 'Commercial Structural Curtain Wall Mullion Profile',
    category: 'commercial',
    subcategory: 'Curtain Wall Framing',
    shortDescription: '50mm face width box mullion profile with thermal break barrier for multi-storey high-rise facades.',
    fullDescription: 'Engineered to withstand extreme positive and negative wind pressures in commercial office towers. Compatible with pressure plate glass retention and structural silicone glazing systems.',
    alloy: '6063-T6 / 6005A-T6',
    temper: 'T6',
    availableFinishes: ['Mill Finish', 'Anodized Silver', 'Dark Bronze Anodized', 'Qualicoat Powder Coating'],
    dimensions: 'Face Width: 50mm | Profile Depth: 150mm - 220mm',
    weightPerMeter: '3.65 kg/m',
    applications: ['Office Tower Glass Facades', 'Airport Terminals', 'Shopping Mall Atriums'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    specifications: {
      'Alloy Grade': '6005A-T6 High Strength Extrusion',
      'Thermal Performance': 'Uf down to 1.4 W/m²K with Polyamide Strip',
      'Structural Inertia (Ix)': 'Up to 450 cm⁴',
      'Acoustic Reduction': 'Rw = 42 dB',
      'Standard Length': '6000mm / 6500mm Custom Cut'
    }
  },
  {
    id: 'prod-04',
    slug: 't-slot-structural-profile-4040',
    name: 'Modular T-Slot Structural Profile 4040 Heavy',
    category: 'industrial',
    subcategory: 'Structural T-Slot Framing',
    shortDescription: '40x40mm aluminum extrusions with 8mm T-slots on four sides for industrial automation and machine framing.',
    fullDescription: 'High precision extruded aluminum profile with 8mm T-slot grooves. Designed for modular assembly of machine guards, workbenches, conveyer frames, and industrial enclosure structures without welding.',
    alloy: '6063-T6 Precision Extrusion',
    temper: 'T6',
    availableFinishes: ['Anodized Silver 15µm', 'Mill Finish'],
    dimensions: 'Cross Section: 40mm x 40mm | Slot Width: 8.2mm',
    weightPerMeter: '1.75 kg/m',
    applications: ['Robotic Assembly Stations', 'Factory Conveyor Systems', 'Cleanroom Framing'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    specifications: {
      'Profile Series': '40 Series Modular Aluminum System',
      'Moment of Inertia Ix': '9.2 cm⁴',
      'Moment of Inertia Iy': '9.2 cm⁴',
      'Section Modulus Wx': '4.6 cm³',
      'T-Slot Capacity': 'Up to M8 T-Nuts and Drop-in Studs'
    }
  },
  {
    id: 'prod-05',
    slug: 'solar-pv-mounting-rail-strut',
    name: 'Solar Panel Structural Mounting Rail System',
    category: 'industrial',
    subcategory: 'Solar PV Mounting Rails',
    shortDescription: 'Corrosion-resistant anodized aluminum mounting rail for solar roof structures and ground-mount arrays.',
    fullDescription: 'Specially designed extrusion profile featuring top mid-clamp channel and side L-bracket slot. Ensures rapid bolt-tight installation for rooftop commercial and utility solar projects.',
    alloy: '6063-T6 / 6005A-T6',
    temper: 'T6',
    availableFinishes: ['Anodized Silver 15µm', 'Black Anodized'],
    dimensions: 'Height: 52mm | Base Width: 30mm | Length: 4200mm',
    weightPerMeter: '0.98 kg/m',
    applications: ['Rooftop Solar PV Systems', 'Commercial Solar Arrays', 'Carport Solar Framing'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    specifications: {
      'Alloy Grade': '6005A-T6 Solar Structural Grade',
      'Anodizing Thickness': 'Minimum 15 Microns Class 1',
      'Wind Load Capacity': 'Up to 200 km/h certified',
      'Snow Load Capacity': '1.4 kN/m²'
    }
  },
  {
    id: 'prod-06',
    slug: 'architectural-sunshade-louver-profile',
    name: 'Elliptical Architectural Aero Louver System',
    category: 'commercial',
    subcategory: 'Architectural Louvers & Sunshades',
    shortDescription: 'Elliptical aluminum sunshade louver blades engineered for building envelope solar shading.',
    fullDescription: 'Salasar Elliptical Louvers decrease solar heat gain on curtain wall glazing by up to 65%. Available in fixed or motorized adjustable options with end pivot brackets.',
    alloy: '6063-T6',
    temper: 'T6',
    availableFinishes: ['Anodized Bronze', 'Powder-Coated Metallic Grey', 'Custom Wood Grain Finish'],
    dimensions: 'Blade Width: 150mm - 300mm | Wall Thickness: 2.2mm',
    weightPerMeter: '2.40 kg/m',
    applications: ['Building Facade Sunscreens', 'Parking Garage Screens', 'HVAC Equipment Louver Enclosures'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    specifications: {
      'Blade Geometry': 'Airfoil / Elliptical Hydrodynamic Shape',
      'Span Distance': 'Up to 3.5 Meters unsupported',
      'Finish Durability': 'AAMA 2604 / AAMA 2605 Powder Coating Compliant',
      'Actuation': 'Manual Friction Pivot or Linear Motor Actuated'
    }
  },
  {
    id: 'prod-07',
    slug: 'concealed-handle-wardrobe-profile',
    name: 'Integrated Concealed Edge Handle Profile',
    category: 'residential',
    subcategory: 'Cabinet & Wardrobe Profiles',
    shortDescription: 'Minimalist continuous aluminum J-pull handle profile for contemporary kitchen cabinets & wardrobe doors.',
    fullDescription: 'Creates seamless, handleless cabinetry aesthetics. Precision extruded aluminum edge profile clips directly onto 18mm plywood or MDF shutter panels.',
    alloy: '6063-T5 Architectural',
    temper: 'T5',
    availableFinishes: ['Anodized Rose Gold', 'Matte Black', 'Brushed Champagne', 'Satin Silver'],
    dimensions: 'Height: 45mm | Suitable Shutter Thickness: 18mm-19mm',
    weightPerMeter: '0.45 kg/m',
    applications: ['Modular Kitchen Shutters', 'Full-Height Wardrobes', 'Bathroom Vanity Drawers'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    specifications: {
      'Profile Fit': '18mm - 19mm Panel Edge',
      'Surface Finish': 'Chemical Bright Dip Anodized',
      'Standard Length': '3000mm bar',
      'Installation': 'Press-fit with adhesive silicone seal'
    }
  },
  {
    id: 'prod-08',
    slug: 'heavy-duty-storefront-tubular-frame',
    name: 'Commercial Heavy-Duty Storefront Frame System',
    category: 'commercial',
    subcategory: 'Storefront Systems',
    shortDescription: '100mm x 45mm heavy tubular aluminum frame for retail entrance doors and showroom displays.',
    fullDescription: 'Engineered for high-traffic retail entrances and hotel lobbies. Includes flush glazing pocket, heavy-duty concealed door closer header, and threshold extrusions.',
    alloy: '6063-T6 Heavy Commercial',
    temper: 'T6',
    availableFinishes: ['Anodized Silver', 'Bronze Anodized', 'Architectural White Powder Coating'],
    dimensions: '100mm Outer Frame Depth x 45mm Face',
    weightPerMeter: '2.85 kg/m',
    applications: ['Showroom Glass Fronts', 'Retail Mall Shops', 'Hotel Main Entrance Doors'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    specifications: {
      'Glazing Pocket': 'Accepts 6mm to 12mm Toughened Glass',
      'Hardware Compatibility': 'Floor Springs, Continuous Hinges, Panic Bars',
      'Corner Construction': 'Heavy Aluminium Cleat with Hydraulic Crimp'
    }
  }
];

export const FINISHES: Finish[] = [
  {
    id: 'fin-01',
    name: 'Mill Finish (Raw Extruded)',
    code: 'MF-01',
    type: 'mill',
    description: 'Natural untreated extruded aluminum surface showing minor extrusion die lines. Ideal for industrial parts that will undergo secondary processing or concealed framing.',
    thicknessMicrons: '0 µm (Natural Oxidated)',
    corrosionResistance: 'Good',
    recommendedUse: 'Concealed structural framing, industrial machinery, solar brackets.',
    hexColor: '#D1D5DB',
    bgGradient: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)'
  },
  {
    id: 'fin-02',
    name: 'Anodized Silver Satin (AA15)',
    code: 'AN-SL15',
    type: 'anodized',
    description: 'Electro-chemically sealed oxide layer creating a silky smooth, scratch-resistant metallic satin texture that never peels or chips.',
    thicknessMicrons: '15 - 20 µm Class 1',
    corrosionResistance: 'Exceptional',
    recommendedUse: 'Architectural windows, doors, glass balustrades, marine environments.',
    hexColor: '#E5E7EB',
    bgGradient: 'linear-gradient(135deg, #f8fafc 0%, #d1d5db 50%, #9ca3af 100%)'
  },
  {
    id: 'fin-03',
    name: 'Anodized Dark Bronze (AA20)',
    code: 'AN-BR20',
    type: 'anodized',
    description: 'Rich dark bronze metallic hue produced through electro-colouring. High UV stability with zero fading over decades of outdoor exposure.',
    thicknessMicrons: '20 - 25 µm Architectural',
    corrosionResistance: 'Extreme',
    recommendedUse: 'Heritage renovation, commercial curtain walls, luxury villa facades.',
    hexColor: '#4A3E3D',
    bgGradient: 'linear-gradient(135deg, #5c4d4a 0%, #3a2e2d 100%)'
  },
  {
    id: 'fin-04',
    name: 'Champagne Anodized (AA15)',
    code: 'AN-CH15',
    type: 'anodized',
    description: 'Subtle warm metallic gold tone with satin luster. Adds a luxurious warmth to modern architectural profiles.',
    thicknessMicrons: '15 µm Architectural',
    corrosionResistance: 'Exceptional',
    recommendedUse: 'High-end interior cabinetry, partition systems, luxury residential windows.',
    hexColor: '#B08D57',
    bgGradient: 'linear-gradient(135deg, #d4af37 0%, #b08d57 50%, #8c6d3b 100%)'
  },
  {
    id: 'fin-05',
    name: 'Matte Black Powder Coating (Qualicoat Class 2)',
    code: 'PC-BK9005',
    type: 'powder-coat',
    description: 'Electrostatically applied thermosetting powder baked at 200°C. Delivers a deep, uniform ultra-matte black velvet finish.',
    thicknessMicrons: '60 - 80 µm High Durability',
    corrosionResistance: 'Exceptional',
    recommendedUse: 'Modern minimalist window framing, industrial interior partition grids.',
    hexColor: '#1A1A1A',
    bgGradient: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)'
  },
  {
    id: 'fin-06',
    name: 'Architectural Pure White Powder Coat',
    code: 'PC-WH9016',
    type: 'powder-coat',
    description: 'Crisp RAL 9016 white polyester powder coating with high weatherability and chalking resistance.',
    thicknessMicrons: '60 - 75 µm',
    corrosionResistance: 'Exceptional',
    recommendedUse: 'Residential sliding doors, storefront systems, sunshades.',
    hexColor: '#F9FAFB',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-01',
    title: 'The Grand Vista Residential Towers',
    segment: 'residential',
    location: 'Worli, Mumbai',
    completionYear: '2025',
    description: 'Supplied over 45 tonnes of custom thermal break slimline sliding door extrusions and frameless base-channel glass railings for 120 luxury sea-facing apartments.',
    productsUsed: ['Slimline Architectural Sliding Window System', 'Base-Mounted Heavy Duty Glass Railing Channel'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'proj-02',
    title: 'Apex Tech Park Commercial Tower',
    segment: 'commercial',
    location: 'Electronic City, Bengaluru',
    completionYear: '2024',
    description: 'Complete supply of 50mm structural curtain wall mullions, transoms, and motorized exterior elliptical sunshade louvers across 18 storeys.',
    productsUsed: ['Commercial Structural Curtain Wall Mullion Profile', 'Elliptical Architectural Aero Louver System'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'proj-03',
    title: 'GreenEnergy 50MW Solar Park Installation',
    segment: 'industrial',
    location: 'Charanka, Gujarat',
    completionYear: '2025',
    description: 'Manufactured and delivered 120,000 meters of high-tensile 6005A-T6 anodized aluminum mounting rails and structural T-slot framing for ground-mount solar PV arrays.',
    productsUsed: ['Solar Panel Structural Mounting Rail System', 'Modular T-Slot Structural Profile 4040'],
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'aluminium-finishes-explained-mill-anodized-powder-coated',
    title: 'Aluminium Finishes Explained: Mill, Anodized & Powder-Coated',
    excerpt: 'Understand the key differences, micron thickness standards, corrosion resistance ratings, and architectural applications for Mill Finish, Anodizing, and Powder Coating.',
    author: 'Salasar Technical Engineering Team',
    date: 'August 2, 2026',
    readTime: '6 min read',
    category: 'Material Science & Finishes',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    qaBlocks: [
      {
        question: 'What is the main difference between anodized and powder-coated aluminium finishes?',
        answer: 'Anodizing is an electro-chemical process that integrates the protective oxide layer into the aluminium metal itself, ensuring it will never chip or peel. Powder coating is an electrostatically applied polymer paint layer baked onto the surface, offering a wider range of custom RAL colors and ultra-matte textures.'
      },
      {
        question: 'Which aluminium finish is best for coastal or high-humidity regions?',
        answer: 'For coastal environments exposed to salt mist, Class 1 or Class 2 Anodizing (20-25 microns) or Qualicoat Class 2 Architectural Powder Coating provides superior corrosion resistance against pitting and oxidation.'
      }
    ],
    content: `
### Introduction to Architectural Aluminium Finishes

When specifying aluminium extrusions for residential windows, commercial facades, or industrial machinery, selecting the correct surface finish is as crucial as choosing the structural alloy grade. The surface finish defines not only the visual aesthetic but also the material's lifespan, UV resistance, and resistance to environmental corrosion.

---

### 1. Mill Finish (Raw Extruded Aluminium)

**Mill Finish** refers to aluminium extrusions directly out of the extrusion die without any subsequent mechanical or chemical surface treatment. 

- **Appearance**: Natural metallic silver with subtle longitudinal die lines.
- **Oxide Layer**: Naturally forms a thin (0.01 µm) passivation layer of aluminium oxide ($Al_2O_3$).
- **Primary Uses**: Internal structural framing, concealed brackets, industrial components that will be painted or hidden inside assemblies.

---

### 2. Anodized Finishes (Anodizing)

**Anodizing** is an electrolytic passivation process that converts the aluminium metal surface into a durable, decorative, and highly corrosion-resistant anodic oxide layer.

- **How It Works**: The extrusion is submerged in an acid electrolyte bath while electric current passes through it. The oxide layer grows from the aluminum substrate itself.
- **Key Advantages**:
  - **Integral Bond**: Cannot peel, flake, or chip because it is an integral part of the metal.
  - **Metallic Luster**: Preserves the natural metallic sheen of aluminium.
  - **Color Options**: Satin Silver, Champagne, Bronze, Rose Gold, Matte Black.
- **Micron Thickness Standards**:
  - **Class 2 (10 - 15 microns)**: Interior applications and mild outdoor environments.
  - **Class 1 (15 - 25 microns)**: Architectural exteriors, high-traffic commercial facades, coastal regions.

---

### 3. Powder-Coated Finishes

**Powder Coating** involves spraying electrostatically charged dry resin and pigment powder onto the pre-treated aluminium extrusion, followed by curing in a thermal oven at approximately 200°C.

- **Key Advantages**:
  - **Vast Color Spectrum**: Available in over 200+ RAL shades, custom wood-grain textures, and metallic effects.
  - **Uniform Thickness**: Covers sharp corners and complex geometry evenly (60 to 80 microns).
  - **Environmental Friendly**: Zero Volatile Organic Compounds (VOCs) emitted during application.

---

### Comparison Matrix

| Property | Mill Finish | Anodized Finish | Powder Coating |
| :--- | :--- | :--- | :--- |
| **Film Thickness** | None | 10 – 25 Microns | 60 – 80 Microns |
| **Corrosion Resistance** | Moderate | Exceptional | High |
| **UV Resistance** | High | Extreme (No Fading) | Excellent (Qualicoat 2) |
| **Peeling Risk** | Zero | Zero | Very Low |
| **Color Customization**| Natural Silver | Metallic Shades | Unlimited RAL Colors |

---

### Recommendation Summary

- For **coastal villas & sea-facing balconies**: Specify **20µm Anodized Bronze or Satin Silver**.
- For **modern minimalist interiors**: Specify **Matte Black Powder Coating (RAL 9005)**.
- For **industrial machine frames**: Specify **15µm Anodized Silver** for easy cleaning and scratch protection.
    `
  },
  {
    slug: 'how-to-choose-aluminium-hardware-residential-vs-commercial',
    title: 'How to Choose Aluminium Hardware for Residential vs Commercial Use',
    excerpt: 'A comprehensive engineering guide on structural load requirements, wind pressure ratings, alloy selection (6063 vs 6061), and cycle testing for residential vs commercial projects.',
    author: 'Salasar Technical Engineering Team',
    date: 'August 5, 2026',
    readTime: '7 min read',
    category: 'Engineering & Specification',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    qaBlocks: [
      {
        question: 'What is the main difference between residential and commercial aluminium extrusions?',
        answer: 'Commercial extrusions feature thicker wall sections (typically 2.0mm - 3.5mm), higher tensile alloy tempers (6061-T6 or 6005A-T6), and higher wind load resistance (Class C5) to withstand high-rise wind forces and heavy daily pedestrian usage compared to residential profiles.'
      }
    ],
    content: `
### Key Engineering Considerations for Hardware Selection

Choosing the right aluminium profile system requires evaluating four structural parameters:
1. **Structural Alloy Grade & Temper**
2. **Profile Wall Thickness & Inertia ($I_x, I_y$)**
3. **Wind Load & Deflection Limits**
4. **Hardware Duty Cycle Ratings**

---

### Residential Specifications

For residential villas and multi-family apartments, visual minimalism and smooth effortless operation take precedence.

- **Alloy Grade**: EN AW 6063-T6 is the standard choice, offering exceptional surface finish quality and smooth anodizing characteristics.
- **Typical Wall Thickness**: 1.4mm to 1.8mm.
- **Sightlines**: Ultra-thin interlocks (21mm to 28mm) for unobstructed panoramic views.
- **Glass Load**: Engineered for 8mm single glass up to 28mm double-glazed low-E IGUs.

---

### Commercial Specifications

Commercial buildings (office towers, malls, airports) experience continuous high traffic, mechanical door closers, and severe wind pressure at elevated heights.

- **Alloy Grade**: 6061-T6 or 6005A-T6 high-tensile structural alloys.
- **Typical Wall Thickness**: 2.2mm to 4.0mm heavy structural wall.
- **Wind Load Compliance**: Certified to EN 12210 Class C5 / B5 (up to 3000 Pa wind pressures).
- **Cycle Testing**: Hardware tested to 500,000 continuous opening/closing cycles.
    `
  },
  {
    slug: 'aluminium-vs-steel-which-is-right-for-your-structural-project',
    title: 'Aluminium vs Steel: Which is Right for Your Structural Project?',
    excerpt: 'Compare strength-to-weight ratios, corrosion lifespans, fabrication costs, and total cost of ownership between structural steel and T6 aluminium extrusions.',
    author: 'Salasar Technical Engineering Team',
    date: 'July 28, 2026',
    readTime: '5 min read',
    category: 'Material Comparison',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    qaBlocks: [
      {
        question: 'Is structural aluminium stronger than steel?',
        answer: 'Per unit of weight, structural aluminium alloys (like 6061-T6) offer a superior strength-to-weight ratio compared to mild steel. While steel has higher absolute density, aluminium delivers comparable structural capacity at approximately one-third the total structural weight.'
      }
    ],
    content: `
### Structural Overview: Aluminium vs Steel

When designing structural framing, solar racking systems, or building enclosures, engineers frequently compare structural T6 aluminium extrusions against fabricated mild steel sections.

---

### 1. Weight & Transport Efficiency
Aluminium has a density of approximately **2.7 g/cm³**, compared to steel's **7.85 g/cm³**. Structural aluminium is roughly **one-third the weight of steel**, drastically reducing dead loads on building foundations and transport logistics costs.

---

### 2. Corrosion Resistance & Maintenance
Unlike carbon steel, which requires regular painting or galvanizing to prevent rust, aluminium naturally forms a self-healing protective oxide layer. When anodized or powder-coated, aluminium framing offers a **50+ year maintenance-free lifespan**.
    `
  },
  {
    slug: 'buyers-guide-to-aluminium-railing-systems',
    title: 'A Buyer\'s Guide to Aluminium Railing Systems',
    excerpt: 'Everything architects and contractors need to know about base shoe glass channels, post-and-spigot balustrades, building code safety loads, and glass compatibility.',
    author: 'Salasar Technical Engineering Team',
    date: 'July 20, 2026',
    readTime: '6 min read',
    category: 'Buyer Guides',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
    qaBlocks: [
      {
        question: 'What aluminum alloy is recommended for glass railing shoe channels?',
        answer: 'High-tensile 6061-T6 structural alloy is strictly recommended for base-mounted glass railing channels to resist severe cantilever forces and line loads up to 3.0 kN/m without structural yielding.'
      }
    ],
    content: `
### Designing Safe & Elegant Glass Railings

Frameless glass balustrades have become the hallmark of modern architecture. The structural safety of any glass balustrade relies heavily on the aluminum mounting shoe channel engineered to anchor the glass panels.

---

### Base-Mounted Shoe Channels vs Post Systems
- **Base-Mounted Shoe Channels**: Offer continuous floor anchoring with zero vertical posts. The glass appears to rise seamlessly from the slab.
- **Post & Glass Clamps**: Utilize vertical aluminum posts with mechanical clamps. Ideal for budget-conscious projects or retrofit installations.
    `
  }
];

export const COMPANY_STATS = [
  { label: 'Years of Experience', value: '25+' },
  { label: 'Standard Profile SKUs', value: '1,200+' },
  { label: 'Metric Tonnes Supplied', value: '50,000+' },
  { label: 'Quality Certification', value: 'ISO 9001:2015' }
];
