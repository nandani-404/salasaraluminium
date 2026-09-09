/**
 * Programmatic SEO (pSEO) Data Engine
 * Generates 1,000,000 dynamic URL combinations from 2,000 Locations x 500 Hardware Products
 */

export interface PSEOLocation {
  slug: string;
  name: string;
  state: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Industrial Hub';
}

export interface PSEOProduct {
  slug: string;
  name: string;
  category: string;
  saCode: string;
  material: string;
  finish: string;
}

// 1. Base Locations Data Generator (2,000 Locations across Chhattisgarh & India)
const BASE_CITIES: Array<{ name: string; state: string; tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Industrial Hub' }> = [
  // Chhattisgarh Core Cities & Industrial Belts
  { name: 'Raipur', state: 'Chhattisgarh', tier: 'Tier 1' },
  { name: 'Bhilai', state: 'Chhattisgarh', tier: 'Tier 1' },
  { name: 'Durg', state: 'Chhattisgarh', tier: 'Tier 1' },
  { name: 'Bilaspur', state: 'Chhattisgarh', tier: 'Tier 1' },
  { name: 'Korba', state: 'Chhattisgarh', tier: 'Tier 1' },
  { name: 'Rajnandgaon', state: 'Chhattisgarh', tier: 'Tier 1' },
  { name: 'Jagdalpur', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Ambikapur', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Raigarh', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Dhamtari', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Mahasamund', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Kanker', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Kawardha', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Janjgir', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Champa', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Bhatapara', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Baloda Bazar', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Mungeli', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Bemetara', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Gariaband', state: 'Chhattisgarh', tier: 'Tier 2' },
  { name: 'Kondagaon', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Sukma', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Dantewada', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Bijapur', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Narayanpur', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Jashpur', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Surajpur', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Balrampur', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Manendragarh', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Baikunthpur', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Gaurela', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Pendra', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Marwahi', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Khairagarh', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Mohla', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Sarangarh', state: 'Chhattisgarh', tier: 'Tier 3' },
  { name: 'Sakti', state: 'Chhattisgarh', tier: 'Tier 3' },

  // Industrial Parks & Hubs in CG
  { name: 'Urla Industrial Area', state: 'Chhattisgarh', tier: 'Industrial Hub' },
  { name: 'Bhanpuri', state: 'Chhattisgarh', tier: 'Industrial Hub' },
  { name: 'Rawabhata', state: 'Chhattisgarh', tier: 'Industrial Hub' },
  { name: 'Bhaisthan', state: 'Chhattisgarh', tier: 'Industrial Hub' },
  { name: 'Sirgitti Industrial Area', state: 'Chhattisgarh', tier: 'Industrial Hub' },
  { name: 'Tifra Industrial Area', state: 'Chhattisgarh', tier: 'Industrial Hub' },
  { name: 'Borai Industrial Growth Centre', state: 'Chhattisgarh', tier: 'Industrial Hub' },
  { name: 'Tedesara Industrial Park', state: 'Chhattisgarh', tier: 'Industrial Hub' },
  { name: 'Silpahari Industrial Area', state: 'Chhattisgarh', tier: 'Industrial Hub' },
  { name: 'Lalpur Industrial Belt', state: 'Chhattisgarh', tier: 'Industrial Hub' },

  // Major Neighbouring States (MP, Odisha, Maharashtra, AP, UP, WB, Rajasthan, Gujarat)
  { name: 'Nagpur', state: 'Maharashtra', tier: 'Tier 1' },
  { name: 'Gondia', state: 'Maharashtra', tier: 'Tier 2' },
  { name: 'Bhandara', state: 'Maharashtra', tier: 'Tier 2' },
  { name: 'Chandrapur', state: 'Maharashtra', tier: 'Tier 2' },
  { name: 'Gadchiroli', state: 'Maharashtra', tier: 'Tier 3' },
  { name: 'Wardha', state: 'Maharashtra', tier: 'Tier 2' },
  { name: 'Amravati', state: 'Maharashtra', tier: 'Tier 2' },
  { name: 'Yavatmal', state: 'Maharashtra', tier: 'Tier 2' },
  { name: 'Akola', state: 'Maharashtra', tier: 'Tier 2' },
  { name: 'Pune', state: 'Maharashtra', tier: 'Tier 1' },
  { name: 'Mumbai', state: 'Maharashtra', tier: 'Tier 1' },
  { name: 'Thane', state: 'Maharashtra', tier: 'Tier 1' },
  { name: 'Navi Mumbai', state: 'Maharashtra', tier: 'Tier 1' },
  { name: 'Nashik', state: 'Maharashtra', tier: 'Tier 1' },
  { name: 'Aurangabad', state: 'Maharashtra', tier: 'Tier 1' },
  { name: 'Solapur', state: 'Maharashtra', tier: 'Tier 2' },
  { name: 'Kolhapur', state: 'Maharashtra', tier: 'Tier 2' },

  { name: 'Sambalpur', state: 'Odisha', tier: 'Tier 1' },
  { name: 'Jharsuguda', state: 'Odisha', tier: 'Tier 2' },
  { name: 'Bargarh', state: 'Odisha', tier: 'Tier 2' },
  { name: 'Rourkela', state: 'Odisha', tier: 'Tier 1' },
  { name: 'Cuttack', state: 'Odisha', tier: 'Tier 1' },
  { name: 'Bhubaneswar', state: 'Odisha', tier: 'Tier 1' },
  { name: 'Balangir', state: 'Odisha', tier: 'Tier 2' },
  { name: 'Nuapada', state: 'Odisha', tier: 'Tier 3' },
  { name: 'Kalahandi', state: 'Odisha', tier: 'Tier 3' },
  { name: 'Koraput', state: 'Odisha', tier: 'Tier 3' },
  { name: 'Rayagada', state: 'Odisha', tier: 'Tier 3' },
  { name: 'Berhampur', state: 'Odisha', tier: 'Tier 2' },
  { name: 'Puri', state: 'Odisha', tier: 'Tier 2' },
  { name: 'Balasore', state: 'Odisha', tier: 'Tier 2' },
  { name: 'Angul', state: 'Odisha', tier: 'Industrial Hub' },

  { name: 'Jabalpur', state: 'Madhya Pradesh', tier: 'Tier 1' },
  { name: 'Katni', state: 'Madhya Pradesh', tier: 'Tier 2' },
  { name: 'Rewa', state: 'Madhya Pradesh', tier: 'Tier 2' },
  { name: 'Satna', state: 'Madhya Pradesh', tier: 'Tier 2' },
  { name: 'Balaghat', state: 'Madhya Pradesh', tier: 'Tier 2' },
  { name: 'Chhindwara', state: 'Madhya Pradesh', tier: 'Tier 2' },
  { name: 'Seoni', state: 'Madhya Pradesh', tier: 'Tier 3' },
  { name: 'Mandla', state: 'Madhya Pradesh', tier: 'Tier 3' },
  { name: 'Anuppur', state: 'Madhya Pradesh', tier: 'Tier 3' },
  { name: 'Shahdol', state: 'Madhya Pradesh', tier: 'Tier 2' },
  { name: 'Singrauli', state: 'Madhya Pradesh', tier: 'Industrial Hub' },
  { name: 'Bhopal', state: 'Madhya Pradesh', tier: 'Tier 1' },
  { name: 'Indore', state: 'Madhya Pradesh', tier: 'Tier 1' },
  { name: 'Gwalior', state: 'Madhya Pradesh', tier: 'Tier 1' },
  { name: 'Ujjain', state: 'Madhya Pradesh', tier: 'Tier 2' },
  { name: 'Sagar', state: 'Madhya Pradesh', tier: 'Tier 2' },

  { name: 'Visakhapatnam', state: 'Andhra Pradesh', tier: 'Tier 1' },
  { name: 'Vijayawada', state: 'Andhra Pradesh', tier: 'Tier 1' },
  { name: 'Guntur', state: 'Andhra Pradesh', tier: 'Tier 2' },
  { name: 'Srikakulam', state: 'Andhra Pradesh', tier: 'Tier 3' },
  { name: 'Vizianagaram', state: 'Andhra Pradesh', tier: 'Tier 2' },
  { name: 'Hyderabad', state: 'Telangana', tier: 'Tier 1' },
  { name: 'Warangal', state: 'Telangana', tier: 'Tier 2' },
  { name: 'Khammam', state: 'Telangana', tier: 'Tier 2' },

  { name: 'Kolkata', state: 'West Bengal', tier: 'Tier 1' },
  { name: 'Howrah', state: 'West Bengal', tier: 'Tier 1' },
  { name: 'Durgapur', state: 'West Bengal', tier: 'Industrial Hub' },
  { name: 'Asansol', state: 'West Bengal', tier: 'Industrial Hub' },
  { name: 'Siliguri', state: 'West Bengal', tier: 'Tier 2' },
  { name: 'Kharagpur', state: 'West Bengal', tier: 'Industrial Hub' },

  { name: 'Varanasi', state: 'Uttar Pradesh', tier: 'Tier 1' },
  { name: 'Prayagraj', state: 'Uttar Pradesh', tier: 'Tier 1' },
  { name: 'Kanpur', state: 'Uttar Pradesh', tier: 'Tier 1' },
  { name: 'Lucknow', state: 'Uttar Pradesh', tier: 'Tier 1' },
  { name: 'Agra', state: 'Uttar Pradesh', tier: 'Tier 2' },
  { name: 'Noida', state: 'Uttar Pradesh', tier: 'Tier 1' },
  { name: 'Ghaziabad', state: 'Uttar Pradesh', tier: 'Tier 1' },

  { name: 'Jaipur', state: 'Rajasthan', tier: 'Tier 1' },
  { name: 'Jodhpur', state: 'Rajasthan', tier: 'Tier 2' },
  { name: 'Kota', state: 'Rajasthan', tier: 'Tier 2' },
  { name: 'Udaipur', state: 'Rajasthan', tier: 'Tier 2' },
  { name: 'Bhiwadi Industrial Estate', state: 'Rajasthan', tier: 'Industrial Hub' },

  { name: 'Ahmedabad', state: 'Gujarat', tier: 'Tier 1' },
  { name: 'Surat', state: 'Gujarat', tier: 'Tier 1' },
  { name: 'Vadodara', state: 'Gujarat', tier: 'Tier 1' },
  { name: 'Rajkot', state: 'Gujarat', tier: 'Tier 2' },
  { name: 'Gandinagar', state: 'Gujarat', tier: 'Tier 2' },

  { name: 'Bengaluru', state: 'Karnataka', tier: 'Tier 1' },
  { name: 'Mysuru', state: 'Karnataka', tier: 'Tier 2' },
  { name: 'Hubballi', state: 'Karnataka', tier: 'Tier 2' },

  { name: 'Delhi', state: 'Delhi-NCR', tier: 'Tier 1' },
  { name: 'Gurugram', state: 'Haryana', tier: 'Tier 1' },
  { name: 'Faridabad', state: 'Haryana', tier: 'Tier 1' },
];

// Helper to generate deterministically 2,000 location entries by adding sector/area prefixes to base cities
export function generate2000Locations(): PSEOLocation[] {
  const locations: PSEOLocation[] = [];
  const areaSuffixes = [
    'Main Market',
    'Industrial Zone',
    'Trade Hub',
    'Fabrication District',
    'Hardware Market',
    'Central Hub',
    'East Sector',
    'West Sector',
    'North Zone',
    'South Belt',
    'Commercial Complex',
    'Wholesale Depot',
    'Ganj Ward',
    'Station Road',
    'Chowk Area',
    'Ring Road Belt',
    'BY-PASS Road',
    'Transport Nagar',
    'Steel Yard Area',
    'Aluminium Market'
  ];

  let count = 0;
  // First add base cities directly
  for (const c of BASE_CITIES) {
    const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    locations.push({
      slug,
      name: c.name,
      state: c.state,
      tier: c.tier
    });
    count++;
    if (count >= 2000) break;
  }

  // Multiply with area suffixes until reaching exactly 2,000 entries
  let suffixIdx = 0;
  let cityIdx = 0;
  while (locations.length < 2000) {
    const baseCity = BASE_CITIES[cityIdx % BASE_CITIES.length];
    const suffix = areaSuffixes[suffixIdx % areaSuffixes.length];
    const combinedName = `${baseCity.name} ${suffix}`;
    const slug = combinedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    locations.push({
      slug,
      name: combinedName,
      state: baseCity.state,
      tier: baseCity.tier
    });

    cityIdx++;
    if (cityIdx % BASE_CITIES.length === 0) {
      suffixIdx++;
    }
  }

  return locations.slice(0, 2000);
}

// 2. Base Hardware Products Data Generator (500 Hardware Items & Variations)
const BASE_HARDWARE_TYPES = [
  { name: 'Sliding Window Roller', cat: 'Rollers & Bearings', code: 'SA-101', mat: 'Aluminium Alloy / Nylon', finish: 'Anodized' },
  { name: 'Heavy Duty Bearings C-Channel', cat: 'Rollers & Bearings', code: 'SA-102', mat: 'Hardened Steel & Aluminium', finish: 'Silver Anodized' },
  { name: 'Sliding Door Needle Roller', cat: 'Rollers & Bearings', code: 'SA-103', mat: 'SS304 Bearing Roller', finish: 'Natural' },
  { name: 'Aluminium Friction Stay 12 Inch', cat: 'Friction Stays', code: 'SA-201', mat: 'Extruded Aluminium Alloy', finish: 'Mill Finish' },
  { name: 'Friction Stay 16 Inch Heavy', cat: 'Friction Stays', code: 'SA-202', mat: 'SS 304 Grade', finish: 'Satin Stainless' },
  { name: 'Friction Stay 24 Inch Commercial', cat: 'Friction Stays', code: 'SA-203', mat: 'High Strength Alloy', finish: 'Silver Anodized' },
  { name: 'Hydraulic Overhead Door Closer 60kg', cat: 'Door Closers', code: 'SA-301', mat: 'Cast Aluminium Body', finish: 'Silver Metallic' },
  { name: 'Hydraulic Door Closer Capsule 100kg', cat: 'Door Closers', code: 'SA-302', mat: 'Forged Aluminium', finish: 'Matte Black' },
  { name: 'Floor Spring Heavy Duty 120kg', cat: 'Door Closers', code: 'SA-303', mat: 'Cast Iron & SS Plate', finish: 'Mirror Polish' },
  { name: 'Glass Railing Channel 12mm', cat: 'Glass Hardware', code: 'SA-401', mat: '6063-T6 Aluminium Profile', finish: 'Champagne Gold' },
  { name: 'Glass Railing Base Profile 15mm', cat: 'Glass Hardware', code: 'SA-402', mat: 'Heavy Extruded Aluminium', finish: 'Silver Anodized' },
  { name: 'Frameless Glass Spider Fitting 4-Way', cat: 'Glass Hardware', code: 'SA-403', mat: 'Stainless Steel 316', finish: 'Gloss Mirror' },
  { name: 'Shower Glass Hinge Wall-to-Glass 90 Deg', cat: 'Shower Fittings', code: 'SA-501', mat: 'Solid Brass & SS', finish: 'Chrome Plated' },
  { name: 'Shower Hinge Glass-to-Glass 180 Deg', cat: 'Shower Fittings', code: 'SA-502', mat: 'Forged Brass', finish: 'Rose Gold' },
  { name: 'Concealed Cabinet Soft Close Hinge 3D', cat: 'Furniture Fittings', code: 'SA-601', mat: 'Cold Rolled Steel', finish: 'Nickel Plated' },
  { name: 'Palazzo Luxury Door Handle Set', cat: 'Handles & Locks', code: 'SA-701', mat: 'Zinc Alloy & Aluminium', finish: 'Brushed Gold' },
  { name: 'Venezia Casement Window Handle', cat: 'Handles & Locks', code: 'SA-702', mat: 'Aluminium Alloy', finish: 'Satin Chrome' },
  { name: 'Sereno Sliding Door Touch Lock', cat: 'Handles & Locks', code: 'SA-703', mat: 'Aluminium Body', finish: 'Matte Black' },
  { name: 'Mortise Handle Lock Cylinder 70mm', cat: 'Handles & Locks', code: 'SA-704', mat: 'Brass Cylinder', finish: 'Antique Brass' },
  { name: 'Multi-Point Sliding Window Lock Bar', cat: 'Handles & Locks', code: 'SA-705', mat: 'Steel & Aluminium', finish: 'Zinc Coated' },
  { name: 'Aluminium Corner Cleat 30mm', cat: 'Hardware Accessories', code: 'SA-801', mat: 'Extruded Aluminium', finish: 'Mill Finish' },
  { name: 'Aluminium Section Cleat 45mm', cat: 'Hardware Accessories', code: 'SA-802', mat: '6063 T5 Alloy', finish: 'Natural' },
  { name: 'EPDM Rubber Window Gasket G-Type', cat: 'Sealants & Gaskets', code: 'SA-901', mat: 'EPDM Weatherproof Rubber', finish: 'Black' },
  { name: 'Silicone Weatherproof Sealant Clear 300ml', cat: 'Sealants & Gaskets', code: 'SA-902', mat: 'Neutral Cure Silicone', finish: 'Transparent' },
  { name: 'Silicone Sealant Black Heavy Duty', cat: 'Sealants & Gaskets', code: 'SA-903', mat: 'Structural Silicone', finish: 'Black' },
];

export function generate500Products(): PSEOProduct[] {
  const products: PSEOProduct[] = [];
  const specVariants = [
    { spec: 'Standard Grade', finish: 'Silver Anodized' },
    { spec: 'Heavy Duty Commercial', finish: 'Matte Black' },
    { spec: 'Premium Architectural', finish: 'Brushed Gold' },
    { spec: 'Industrial Grade 6063-T6', finish: 'Mill Finish' },
    { spec: 'Weatherproof Outdoor', finish: 'Powder Coated White' },
    { spec: 'High Precision CNC', finish: 'Champagne Anodized' },
    { spec: 'Rust-Proof SS-Grade', finish: 'Mirror Finish' },
    { spec: 'Soft-Close Ergonomic', finish: 'Satin Chrome' },
    { spec: 'Compact Profile', finish: 'Bronze Anodized' },
    { spec: 'Ultra Heavy Load', finish: 'Deep Graphite' },
    { spec: 'Slimline Modular', finish: 'Raw Aluminium' },
    { spec: 'Double Sealed Premium', finish: 'Gloss Finish' },
    { spec: 'Flame Retardant Alloy', finish: 'Titanium Grey' },
    { spec: 'High Tensile Structural', finish: 'Polished Brass' },
    { spec: 'Anti-Vibration Silent', finish: 'Dark Bronze' },
    { spec: 'High Velocity Wind Rated', finish: 'Anodized Black' },
    { spec: 'Architectural Hardware Spec', finish: 'Rose Gold' },
    { spec: 'Bulk Wholesale Pack', finish: 'Silver Metallic' },
    { spec: 'OEM Custom Spec', finish: 'Natural Anodized' },
    { spec: 'Export Grade Premium', finish: 'Super Satin Chrome' },
  ];

  let prodCount = 0;
  for (const base of BASE_HARDWARE_TYPES) {
    for (const v of specVariants) {
      const name = `${base.name} - ${v.spec}`;
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const saCode = `${base.code}-${(prodCount % 900) + 100}`;

      products.push({
        slug,
        name,
        category: base.cat,
        saCode,
        material: base.mat,
        finish: v.finish,
      });

      prodCount++;
      if (products.length >= 500) break;
    }
    if (products.length >= 500) break;
  }

  return products.slice(0, 500);
}

// Global cached arrays
export const PSEO_LOCATIONS = generate2000Locations();
export const PSEO_PRODUCTS = generate500Products();

export const TOTAL_PSEO_COMBINATIONS = 1000000; // 2,000 Locations x 500 Products = 1,000,000 URLs

/**
 * Fast O(1) Index-to-Combination Mapper
 * Given index N in [0, 999999], returns the exact location & product pair.
 */
export function getCombinationByIndex(index: number): { location: PSEOLocation; product: PSEOProduct; index: number } {
  const safeIndex = Math.max(0, Math.min(TOTAL_PSEO_COMBINATIONS - 1, Math.floor(index)));
  
  // Math mapping: product changes every 2000 steps, location loops 0..1999
  const productIndex = Math.floor(safeIndex / 2000);
  const locationIndex = safeIndex % 2000;

  return {
    location: PSEO_LOCATIONS[locationIndex],
    product: PSEO_PRODUCTS[productIndex],
    index: safeIndex
  };
}

/**
 * Given location slug and product slug, find matching details (fallback to lookup or index)
 */
export function resolvePSEOParams(locationSlug: string, productSlug: string): { location: PSEOLocation; product: PSEOProduct } | null {
  const loc = PSEO_LOCATIONS.find((l) => l.slug === locationSlug);
  const prod = PSEO_PRODUCTS.find((p) => p.slug === productSlug);

  const formatName = (str: string) => str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    location: loc || {
      slug: locationSlug,
      name: formatName(locationSlug),
      state: 'Chhattisgarh',
      tier: 'Tier 2'
    },
    product: prod || {
      slug: productSlug,
      name: formatName(productSlug),
      category: 'Aluminium Hardware',
      saCode: 'SA-EXT-99',
      material: 'Extruded Aluminium Alloy',
      finish: 'Anodized'
    }
  };
}
