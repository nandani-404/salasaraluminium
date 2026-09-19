/**
 * City service areas. Previously exported from `src/app/locations/page.tsx`,
 * which meant a route file was doubling as a data module; the sitemap could not
 * import it safely and silently drifted to a hard-coded 17-city list against
 * this 6-city dataset, publishing 11 URLs that 404'd.
 *
 * HONESTY RULES FOR THIS FILE
 * - `distance` and `route` are approximate public road facts and are labelled
 *   as approximate on the page.
 * - `localContext` describes the city's real, publicly known economy and
 *   building stock. It must never assert anything about Salasar's own
 *   operations in that city.
 * - `keyMarkets`, `dispatchTime` and `popularSkus` are OWNER-SUPPLIED facts.
 *   They are optional. Where the owner has not supplied them the page omits
 *   the block entirely rather than inventing market names or cut-off times.
 *   See SEO-CONFIRM.md for the outstanding list.
 */

export interface CityData {
  slug: string;
  name: string;
  state: string;
  /** Revenue district, used in the page copy and schema. */
  district: string;
  /** Approximate road distance from the Raipur counter. */
  distance: string;
  /** Primary road route from Raipur. */
  route: string;
  /** Short positioning line shown under the city name. */
  tagline: string;
  /**
   * 2–4 sentences of genuinely city-specific context: what is actually built
   * there, and which hardware categories that drives. Publicly verifiable.
   */
  localContext: string;
  /** Which of the 12 categories matter most here, and why. Factual reasoning. */
  demandNote: string;
  description: string;

  /** [CONFIRM] Owner-supplied. Rendered only when present. */
  keyMarkets?: string;
  /** [CONFIRM] Owner-supplied dispatch schedule and cut-off. Rendered only when present. */
  dispatchTime?: string;
  /** [CONFIRM] Owner-supplied best-selling SA codes for this city. */
  popularSkus?: string;
}

export const CITIES_DATA: CityData[] = [
  {
    slug: 'raipur',
    name: 'Raipur',
    state: 'Chhattisgarh',
    district: 'Raipur',
    distance: 'Headquarters — 0 km',
    route: 'Counter sales at Bhaisthan',
    tagline: 'Main Bhaisthan counter and stock point',
    localContext:
      'Raipur is the state capital of Chhattisgarh and its largest construction market. The city combines dense older housing around Ramsagar Para and Jawahar Nagar with continuous new apartment and commercial development along Ring Road, GE Road and the Bhanpuri and Urla industrial belts. Aluminium sliding windows are the default fenestration in almost all of this residential stock, which keeps rollers, channels, sliding locks and mosquito mesh in constant demand.',
    demandNote:
      'Raipur fabricators order across all 12 categories. Sliding window hardware (rollers, channels, crescent and touch locks) and door kits move fastest, with shower and glass fittings following bathroom renovation work in the newer apartment blocks.',
    description:
      'Our counter and stock point in Bhaisthan, Raipur. Walk in to match a part by hand, or call ahead with an SA code and collect the same day.',
    keyMarkets:
      'Bhaisthan Hardware Market, JK Steel Gali, Bhanpuri Industrial Area, Urla Industrial Complex',
    dispatchTime: 'Counter pickup, and same-day local delivery across the Raipur city area',
    popularSkus:
      'All 86 SKUs, with SA-33 door kits, SA-42 door closers, SA-76 shower hinges and SA-81 mosquito mesh moving fastest',
  },
  {
    slug: 'naya-raipur',
    name: 'Naya Raipur',
    state: 'Chhattisgarh',
    district: 'Raipur',
    distance: 'Approx. 25 km south-east of the Raipur counter',
    route: 'Via NH-53 and the Naya Raipur approach roads',
    tagline: 'Planned capital — Atal Nagar administrative and institutional belt',
    localContext:
      'Naya Raipur (Atal Nagar) is a planned capital city built from scratch south-east of Raipur. Its building stock is unusually uniform: government secretariat and departmental buildings, institutional campuses, hospitals, hotels and planned residential sectors, nearly all built to a contemporary specification. That specification skews strongly toward glazed facades, glass partitions, frameless glass doors and heavy commercial entrances rather than the small-format residential sliding windows typical of older Raipur.',
    demandNote:
      'Demand here is weighted toward commercial-grade hardware: floor springs and patch fittings for frameless glass entrances, heavy door closers rated for high-traffic doorways, partition connectors and U-channels for office glazing, and 2D/3D adjustable hinges for flush-fitting doors.',
    description:
      'Supply to contractors and glazing fabricators working on the Atal Nagar institutional, hospitality and planned-sector residential projects.',
  },
  {
    slug: 'bhilai',
    name: 'Bhilai',
    state: 'Chhattisgarh',
    district: 'Durg',
    distance: 'Approx. 38 km west of the Raipur counter',
    route: 'Via NH-53 (the Raipur–Durg corridor)',
    tagline: 'Steel township with a large planned housing stock',
    localContext:
      'Bhilai grew around the Bhilai Steel Plant and is laid out as a planned township of numbered sectors, with a large body of company-built housing alongside newer private development in Supela, Nehru Nagar and along the Durg road. A substantial share of the fabrication work here is replacement and retrofit: re-glazing and re-fitting ageing sector housing, where matching an existing roller, channel profile or sliding lock exactly matters more than specifying something new.',
    demandNote:
      'Retrofit work drives demand for sliding rollers, C and G channels, crescent and Maruti locks, and mosquito mesh. Bringing the old part to the counter, or sending a photograph on WhatsApp, is usually the quickest way to get an exact match.',
    description:
      'Wholesale supply to Bhilai window fabricators, glazing contractors and hardware dealers, on the NH-53 corridor from Raipur.',
    keyMarkets:
      'Light Industrial Area Bhilai, Power House Market, Supela Hardware Market, Civic Center Trade Hub',
    dispatchTime: 'Same-day dispatch on orders placed before 2:00 PM',
    popularSkus:
      'SA-7 sliding rollers, SA-11 locks, SA-33 black door kits, 2D and 3D adjustable hinges',
  },
  {
    slug: 'durg',
    name: 'Durg',
    state: 'Chhattisgarh',
    district: 'Durg',
    distance: 'Approx. 44 km west of the Raipur counter',
    route: 'Via NH-53, continuing past Bhilai',
    tagline: 'District headquarters and glazing supply centre',
    localContext:
      'Durg is the district headquarters and sits immediately west of Bhilai, effectively forming one continuous urban belt with it. The city has an established older commercial core around Station Road and Ganj Para, plus the Borai industrial area to the south. Work here mixes shopfront and commercial glazing in the trading streets with ordinary residential window and door fabrication in the surrounding wards.',
    demandNote:
      'Shopfront work pulls door closers, floor springs and patch fittings; the residential side pulls the standard sliding window set — rollers, channels, locks, seals and stoppers.',
    description:
      'Trade supply of architectural hardware, door kits and glass fittings to contractors and glass shops across Durg district.',
    keyMarkets: 'Station Road Market, Ganj Para, Industrial Area Borai, Durg Trade Center',
    dispatchTime: 'Same-day dispatch via local express transport lines',
    popularSkus:
      'SA-1 to SA-13 rollers and channels, SA-44 capsule door closers, SA-24 acoustic door seals',
  },
  {
    slug: 'bilaspur',
    name: 'Bilaspur',
    state: 'Chhattisgarh',
    district: 'Bilaspur',
    distance: 'Approx. 115 km north of the Raipur counter',
    route: 'Via the Raipur–Bilaspur road (NH-130)',
    tagline: 'Northern Chhattisgarh distribution centre',
    localContext:
      'Bilaspur is the second city of Chhattisgarh and the seat of the High Court and the South East Central Railway zonal headquarters. That institutional weight, plus a large student and professional population, sustains steady commercial construction around Vyapar Vihar and continuing residential growth toward Tifra and Sirgitti. It functions as the distribution point for the districts further north.',
    demandNote:
      'A broad mix, with more commercial door hardware than the smaller districts: door closers, handle locks and heavy door kits alongside the standard sliding window range. Dealers here frequently buy in full-box quantities to re-distribute northward.',
    description:
      'Bulk supply for commercial builders, window fabricators and retail hardware dealers throughout the Bilaspur region.',
    keyMarkets:
      'Vyapar Vihar Commercial Complex, Link Road Hardware Market, Sirgitti Industrial Area, Tifra Market',
    dispatchTime: 'Next-morning delivery for orders placed before 4:00 PM',
    popularSkus:
      'SA-33 champion-finish door kits, SA-35 to SA-41 tower bolts and handles, glass railing channels',
  },
  {
    slug: 'korba',
    name: 'Korba',
    state: 'Chhattisgarh',
    district: 'Korba',
    distance: 'Approx. 200 km north-east of the Raipur counter',
    route: 'Via NH-130 through Bilaspur',
    tagline: 'Power and coal belt — industrial and township work',
    localContext:
      'Korba is the power capital of Chhattisgarh, built around large thermal generating stations and the surrounding coalfields. Its building stock is dominated by industrial plant buildings, utility offices and company townships, with commercial development concentrated around Niharika and TP Nagar. Coal dust and heavy year-round use are real conditions here, and they shape what fails first.',
    demandNote:
      'Dust ingress and high door cycle counts push demand toward heavy hydraulic door closers, robust door seals and brush strips, and corrosion-resistant stainless steel locks rather than the lighter residential grades.',
    description:
      'Heavy-duty door closers, seals and hardware supply for industrial plants, townships and commercial complexes in Korba.',
    keyMarkets:
      'Transport Nagar Korba, Niharika Market, TP Nagar Trade Center, Jamnipali Commercial Zone',
    dispatchTime: '24-hour freight dispatch via Korba transport lines',
    popularSkus:
      'SA-42 and SA-44 hydraulic door closers, SA-27 heavy aluminium hinges, industrial fasteners',
  },
  {
    slug: 'rajnandgaon',
    name: 'Rajnandgaon',
    state: 'Chhattisgarh',
    district: 'Rajnandgaon',
    distance: 'Approx. 72 km west of the Raipur counter',
    route: 'Via NH-53, on the Raipur–Nagpur corridor',
    tagline: 'Western corridor town on the Nagpur highway',
    localContext:
      'Rajnandgaon sits on the NH-53 corridor between Durg and the Maharashtra border, and has a long-established trading and textile history. Construction is predominantly low-rise: individual houses, shops and small commercial buildings rather than towers. The Tedesara industrial area to the east adds a modest amount of workshop and shed fabrication.',
    demandNote:
      'Straightforward residential and small-commercial demand: sliding window locks and rollers, tower bolts, mini door kits, weather strips and mosquito mesh. Order sizes are typically box quantities rather than crates.',
    description:
      'Wholesale hardware supply for Rajnandgaon dealers, interior fitters and door fabricators.',
    keyMarkets: 'Ganj Line Hardware Market, Cinema Line, Industrial Area Tedesara',
    dispatchTime: 'Same-day evening delivery on morning trade orders',
    popularSkus:
      'SA-11 to SA-23 crescent and touch locks, SA-30 mini door kits, weather strips and gaskets',
  },
  {
    slug: 'raigarh',
    name: 'Raigarh',
    state: 'Chhattisgarh',
    district: 'Raigarh',
    distance: 'Approx. 250 km north-east of the Raipur counter',
    route: 'Via NH-49 toward the Odisha border',
    tagline: 'Steel, power and sponge-iron belt of eastern Chhattisgarh',
    localContext:
      'Raigarh is an industrial district built on steel, sponge iron and captive power, with a dense concentration of plants along the Kharsia and Gharghoda roads. Alongside plant infrastructure there is substantial staff housing and a growing commercial core in the town itself. It is also a recognised cultural centre, and institutional buildings form part of the local construction mix.',
    demandNote:
      'Industrial atmosphere favours stainless steel locks and fittings over plated mild steel, and heavier door closers for plant and office entrances. Town-side work carries the usual residential sliding window range.',
    description:
      'Supply of industrial-grade and residential aluminium hardware to Raigarh fabricators, plant contractors and dealers.',
  },
  {
    slug: 'jagdalpur',
    name: 'Jagdalpur',
    state: 'Chhattisgarh',
    district: 'Bastar',
    distance: 'Approx. 300 km south of the Raipur counter',
    route: 'Via NH-30 through Kanker and Kondagaon',
    tagline: 'Bastar divisional headquarters in the southern plateau',
    localContext:
      'Jagdalpur is the divisional headquarters for the Bastar region and the main urban centre of southern Chhattisgarh. It serves a very large rural hinterland, so government offices, schools, hospitals, hotels and the district trading market account for a disproportionate share of its construction. The region has a genuine monsoon — Bastar receives markedly heavier and more sustained rainfall than the Raipur plains — which makes weather sealing a practical concern rather than an optional extra.',
    demandNote:
      'Heavy monsoon exposure raises demand for EPDM weather-strip gaskets, silicone sealant, PU foam and door bottom seals, and for corrosion-resistant stainless steel fittings. Mosquito mesh is a staple line rather than a seasonal one.',
    description:
      'Aluminium hardware supply to Jagdalpur and the wider Bastar region, with emphasis on weather sealing and corrosion-resistant fittings.',
  },
  {
    slug: 'ambikapur',
    name: 'Ambikapur',
    state: 'Chhattisgarh',
    district: 'Surguja',
    distance: 'Approx. 340 km north of the Raipur counter',
    route: 'Via NH-130 through Bilaspur and Katghora',
    tagline: 'Surguja divisional headquarters in the northern hills',
    localContext:
      'Ambikapur is the headquarters of Surguja district and the principal town of the northern divisional region, set on a plateau at noticeably higher elevation than the Raipur plains. It anchors a coal-bearing region and serves as the administrative and commercial centre for a wide rural catchment. Its cooler winters make draught sealing around doors and windows more relevant here than in central Chhattisgarh.',
    demandNote:
      'Door bottom seals, brush strips and weather gaskets see steadier demand than elsewhere in the state. Otherwise the mix is standard district-town work: sliding window hardware, door kits, tower bolts and handles.',
    description:
      'Wholesale hardware supply to Ambikapur and the Surguja region, reached via the Bilaspur–Katghora route.',
  },
  {
    slug: 'dhamtari',
    name: 'Dhamtari',
    state: 'Chhattisgarh',
    district: 'Dhamtari',
    distance: 'Approx. 78 km south of the Raipur counter',
    route: 'Via NH-30, the Raipur–Jagdalpur road',
    tagline: 'Rice-mill and timber town on the southern highway',
    localContext:
      'Dhamtari is an agricultural district town known for its concentration of rice mills and its long-standing timber trade, sitting on the Mahanadi near the Gangrel reservoir. Construction is mostly individual housing, shops and mill and warehouse buildings rather than multi-storey development. Because it lies directly on NH-30 south of Raipur, it is one of the more straightforward districts to reach from the counter.',
    demandNote:
      'Mill and warehouse buildings pull larger door hardware — heavy tower bolts, robust handles and door closers — while the residential side runs on standard sliding window rollers, locks and mesh.',
    description:
      'Hardware supply to Dhamtari fabricators, dealers and mill contractors on the NH-30 corridor south of Raipur.',
  },
  {
    slug: 'mahasamund',
    name: 'Mahasamund',
    state: 'Chhattisgarh',
    district: 'Mahasamund',
    distance: 'Approx. 55 km east of the Raipur counter',
    route: 'Via NH-53 toward the Odisha border',
    tagline: 'Eastern district town on the Sambalpur highway',
    localContext:
      'Mahasamund is a district headquarters on the eastern highway out of Raipur toward Odisha, at the centre of a largely agricultural district. Its building stock is dominated by independent houses, shopfronts along the main road and district administrative buildings. Its proximity to Raipur means many fabricators here buy directly from the Raipur counter rather than through a local intermediary.',
    demandNote:
      'Standard residential and shopfront mix: sliding window rollers and locks, tower bolts, door kits, door closers for shop entrances, and mosquito mesh.',
    description:
      'Direct hardware supply to Mahasamund fabricators and dealers, one of the closest districts to the Raipur counter.',
  },
  {
    slug: 'bemetara',
    name: 'Bemetara',
    state: 'Chhattisgarh',
    district: 'Bemetara',
    distance: 'Approx. 65 km north-west of the Raipur counter',
    route: 'Via the Raipur–Bemetara road through Simga',
    tagline: 'Agricultural district north-west of Raipur',
    localContext:
      'Bemetara became a separate district in 2012, carved out of the Durg region, and remains predominantly agricultural. Construction is concentrated in the district town and the larger block headquarters, and consists mainly of independent housing, small commercial buildings and newer government offices built since the district was formed. New administrative building has added a steady trickle of commercial-specification work to an otherwise residential market.',
    demandNote:
      'Mostly standard residential sliding window and door hardware. Newer government buildings add occasional demand for door closers, adjustable hinges and glass partition fittings.',
    description:
      'Wholesale hardware supply to Bemetara district dealers and fabricators, via the Simga route from Raipur.',
  },
  {
    slug: 'kanker',
    name: 'Kanker',
    state: 'Chhattisgarh',
    district: 'Uttar Bastar Kanker',
    distance: 'Approx. 140 km south of the Raipur counter',
    route: 'Via NH-30, on the road toward Jagdalpur',
    tagline: 'Gateway town on the NH-30 route into Bastar',
    localContext:
      'Kanker sits on NH-30 where the central plains give way to the forested Bastar plateau, and functions as the gateway town on the road south toward Jagdalpur. It is a district headquarters serving a heavily forested, largely rural catchment, with construction concentrated in the town itself — administrative buildings, schools, hospitals and shopfronts — plus housing in the surrounding blocks.',
    demandNote:
      'Being on the approach to the higher-rainfall Bastar belt, weather sealing and mosquito mesh matter more than in the plains districts. Otherwise demand is standard district-town residential and shopfront hardware.',
    description:
      'Hardware supply to Kanker district, on the NH-30 route between Raipur and the Bastar region.',
  },
];

export function getCity(slug: string): CityData | undefined {
  return CITIES_DATA.find((c) => c.slug === slug);
}

export const CITY_SLUGS = CITIES_DATA.map((c) => c.slug);
