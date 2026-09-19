/**
 * Per-(city, category) editorial angles.
 *
 * WHY THIS FILE EXISTS RATHER THAN A TEMPLATE
 *
 * The obvious way to build 72 "Door Kits in Bhilai" pages is one template with
 * the city and category names swapped in. That is a doorway pattern: Google
 * classifies it as scaled content abuse, and this site has already been burned
 * by exactly that (see pseoData.ts, which generated a million of them).
 *
 * A city-category page earns its place only if it says something true that no
 * other page on the site says. So every one of the 72 cells below is written
 * individually, grounded in what is actually built in that city and what that
 * specific category does. Where a category has no particular local story, the
 * cell says so plainly rather than padding.
 *
 * If you add a city, you add 12 real angles with it — or you do not add the
 * city. There is no fallback string on purpose.
 */

export interface CityCategoryAngle {
  /** 2-4 sentences: why this category matters in this city specifically. */
  angle: string;
  /** The buying consideration that actually differs here. One sentence. */
  consideration: string;
}

type CategoryMap = Record<string, CityCategoryAngle>;

export const CITY_CATEGORY_ANGLES: Record<string, CategoryMap> = {
  // ---------------------------------------------------------------- RAIPUR
  raipur: {
    'rollers-bearings-channels': {
      angle:
        'Raipur has the widest spread of window ages in the state: sliding windows fitted in the 1990s around Ramsagar Para and Jawahar Nagar sit a few streets from apartments glazed last year. That range means no single roller covers the city — older frames take profiles that newer fabricators have stopped using.',
      consideration:
        'Because our counter is here, bringing the old roller in and matching it by hand takes minutes rather than a courier round-trip.',
    },
    'locks-latches': {
      angle:
        'Ground-floor windows on Raipur’s older street-facing houses are the ones that get tried, and a crescent lock that draws the sashes tight is meaningfully harder to defeat than a spring latch that merely catches. Newer apartment stock tends to arrive with whatever the builder specified, which is often the cheaper option.',
      consideration:
        'For a ground-floor or roadside window, spend the difference on a crescent lock in stainless rather than plated mild steel.',
    },
    'door-window-seals': {
      angle:
        'Raipur runs hot and dusty for most of the year, and dust is the complaint we hear most from homes near the Ring Road and the industrial approaches at Bhanpuri and Urla. Brush strips and bottom seals are the cheapest thing that actually reduces how often a room needs sweeping.',
      consideration:
        'A door bottom seal costs a fraction of an air purifier and addresses the gap the dust is actually coming through.',
    },
    hinges: {
      angle:
        'New apartment fit-outs across the capital region use flush-fitting internal doors where the gap around the leaf is meant to be even all the way round. 2D and 3D adjustable hinges let a fitter correct that on site, which matters because door frames move as a new building settles.',
      consideration:
        'Specify 3D adjustable hinges on a new build — the adjustment you need is in the first year, after the plaster dries.',
    },
    'door-kits': {
      angle:
        'Door kits move faster here than anywhere else in the state, simply because more doors are being hung. The five-finish aluminium kit (SA-33) covers most residential work, while main entrances on the newer builds tend toward the heavy commercial kit.',
      consideration:
        'Match the finish across every door in a flat before you order — mixing champion and matt across one home is the regret we hear about later.',
    },
    'bolts-handles': {
      angle:
        'Raipur’s older housing stock still relies heavily on tower bolts, often as the only fastening on internal and terrace doors. Handles are where the capital diverges from the districts: there is more appetite here for H-handles and larger pulls on main entrances.',
      consideration:
        'Use a 6-inch bolt on any external or terrace door — the shorter 4-inch is for internal doors that carry no security burden.',
    },
    'door-closers': {
      angle:
        'Shops along GE Road and the newer commercial complexes run doors through hundreds of cycles a day, which is a different duty class from a home. A closer sized for a house will fail inside a year on a shopfront.',
      consideration:
        'For a commercial entrance, the capsule closer is the cheaper fitting over its life because it is not replaced annually.',
    },
    'fittings-accessories': {
      angle:
        'Office fit-outs in the capital use more glass partitioning than the districts do, which brings partition connectors, U-channels and floor springs into ordinary demand rather than occasional. Bhanpuri and Urla also pull wall plugs and anchors in volume for shed and workshop work.',
      consideration:
        'Floor springs have to be positioned before the floor is finished — decide at planning, not at fit-out.',
    },
    'tapes-sealants-adhesives': {
      angle:
        'Raipur’s monsoon is short but heavy, and most water ingress we get asked about is a failed perimeter seal rather than a failed window. Silicone, PU foam and EPDM gaskets are what fix that, and they are consumables rather than one-off purchases for a working fabricator.',
      consideration:
        'Buy neutral-cure silicone for anything touching aluminium — acetic-cure attacks the finish over time.',
    },
    'fasteners-screws': {
      angle:
        'The Bhanpuri and Urla industrial areas keep steady demand for self-drilling and self-tapping screws in box quantities, while residential fabricators buy the same items a few hundred at a time. Both come through the same counter.',
      consideration:
        'Use self-tapping screws made for aluminium in aluminium sections — a wood screw strips the thread and the fitting works loose.',
    },
    'glass-hardware-shower-fittings': {
      angle:
        'Bathroom renovation is where Raipur’s newer apartment stock generates most of its glass hardware demand: replacing a curtain with a frameless enclosure. Commercial glass doors on shopfronts are the other half, and they need patch fittings and floor springs rather than shower hinges.',
      consideration:
        'Order the hinges before the glass — toughened glass cannot be drilled after tempering, so the cut-outs come from the fitting.',
    },
    'abrasives-mesh-misc': {
      angle:
        'Mosquito mesh is close to a universal purchase in Raipur, and demand climbs sharply before the monsoon. Fabrication workshops across the city take cutting wheels and flap discs as running consumables.',
      consideration:
        'Stainless mesh costs more and outlasts plastic by years on a sunny elevation — worth it on any window that is awkward to reach.',
    },
  },

  // ---------------------------------------------------------------- BHILAI
  bhilai: {
    'rollers-bearings-channels': {
      angle:
        'Bhilai is a retrofit market more than a new-build one. The township’s sector housing was glazed decades ago and much of the work here is getting existing windows sliding again, which means matching a roller and channel profile that the original fabricator may no longer make.',
      consideration:
        'Send a photograph of the old roller and the channel end on WhatsApp — a description of "a normal sliding window" is not enough to match a discontinued profile.',
    },
    'locks-latches': {
      angle:
        'Company-built sector housing was fitted with locks in bulk to one specification, so when one fails, neighbours usually need the same part. We see the same codes ordered repeatedly from the same sectors.',
      consideration:
        'If a neighbour has already replaced theirs, ask which SA code they used — it will almost certainly fit yours.',
    },
    'door-window-seals': {
      angle:
        'Older sector housing has settled, and settled frames leave gaps that no amount of adjustment closes. Weather strips and brush seals are the practical fix when replacing the whole window is not proportionate.',
      consideration:
        'A gap you can see daylight through is a seal problem, not a window problem — seals are a fraction of the cost.',
    },
    hinges: {
      angle:
        'Doors in ageing township housing rarely hang square any more. Adjustable hinges let a fitter bring a dropped leaf back into its frame without rehanging the door or replacing the frame.',
      consideration:
        'A door that catches at the top corner usually needs a 3D hinge adjustment, not a new door.',
    },
    'door-kits': {
      angle:
        'Refurbishment in Bhilai tends to be done flat by flat, which suits complete door kits: one purchase, everything matched, no hunting for a handle that suits the latch. Matt black has been the common choice in recent refits.',
      consideration:
        'Buying the kit rather than the parts separately avoids the mismatched-finish problem that shows up when items are sourced piecemeal.',
    },
    'bolts-handles': {
      angle:
        'Tower bolts on decades-old doors are frequently the original fittings, and a bolt that has been forced at an angle for years has worn its barrel oval. Handles get replaced more for appearance than function during a refit.',
      consideration:
        'Replace the socket as well as the bolt — a worn socket will wear the new bolt the same way.',
    },
    'door-closers': {
      angle:
        'Bhilai’s demand splits cleanly: light pneumatic closers for the mesh and screen doors common on township housing, and heavier hydraulic units for the commercial frontages around Supela and Power House.',
      consideration:
        'A pencil closer is for a screen door, not a main door — fitting one to a heavy entrance is the most common mistake we correct.',
    },
    'fittings-accessories': {
      angle:
        'Steel-plant contracting work in and around Bhilai pulls wall plugs, anchors and channel sections in quantity for fitting out offices and site buildings. Glass partitioning shows up mainly in the newer commercial development toward the Durg road.',
      consideration:
        'For anchoring into old concrete, the plug size matters more than the screw — take a sample if you are unsure.',
    },
    'tapes-sealants-adhesives': {
      angle:
        'Retrofit sealing is most of it here. Resealing an existing window costs a fraction of replacing it and solves the draught and dust complaints that prompted the call in the first place.',
      consideration:
        'Strip the old sealant back to clean aluminium before reapplying — silicone will not bond to degraded silicone.',
    },
    'fasteners-screws': {
      angle:
        'Fabricators working on township refits buy fasteners in mid-size quantities — more than a home project, less than a plant contract. Drywall and partition screws move alongside self-drillers as interiors get reworked.',
      consideration:
        'Zinc-plated is adequate indoors; use stainless anywhere the fixing sees weather.',
    },
    'glass-hardware-shower-fittings': {
      angle:
        'Bathroom upgrades are one of the most common improvements made to older sector flats, and a frameless enclosure is the change that makes a small bathroom feel larger. The glass is usually 8 mm here rather than the heavier 10 or 12 mm.',
      consideration:
        'In a compact bathroom, a self-closing hinge is worth having — the door will not sit open across the floor space.',
    },
    'abrasives-mesh-misc': {
      angle:
        'Mesh replacement is routine in the township: the frames are sound, the mesh has perished. Workshops around the Light Industrial Area take abrasives steadily.',
      consideration:
        'Measure the mesh channel, not the glass — and go one standard width up so there is material to tension.',
    },
  },

  // ------------------------------------------------------------------ DURG
  durg: {
    'rollers-bearings-channels': {
      angle:
        'Durg’s trading streets around Station Road and Ganj Para have shopfronts with large sliding panels that carry far more weight than a domestic window. Those need bearing-housed or double-swing rollers; a single nylon wheel will flatten under a shop shutter within months.',
      consideration:
        'Weigh the panel before choosing — a shopfront slider is a different duty class from a bedroom window.',
    },
    'locks-latches': {
      angle:
        'Shop premises in the old commercial core are locked and unlocked twice a day, every day, which is a duty cycle no residential latch was designed for. Residential wards around the town run on the standard crescent and Maruti locks.',
      consideration:
        'For a shop, buy the stainless version — the extra cost is recovered in not replacing it.',
    },
    'door-window-seals': {
      angle:
        'Shopfronts on a busy road take road dust straight through the door gap, and it lands on stock. A brush seal along the bottom of a shop door is one of the cheapest improvements available to a trader here.',
      consideration:
        'For a door that opens constantly, a brush seal outlasts a rubber wiper — rubber drags and tears.',
    },
    hinges: {
      angle:
        'Commercial doors in Durg’s trading streets are heavier than residential ones and swing more often, so hinge choice is a load question rather than an alignment one. Continuous and heavy aluminium hinges spread that load along the full height.',
      consideration:
        'Three hinges, not two, on any door over about 2.1 metres or carrying glass.',
    },
    'door-kits': {
      angle:
        'The Borai industrial area and the town’s commercial buildings pull heavy-duty kits, while the surrounding residential wards take the standard aluminium and mini kits. Both come off the same NH-53 delivery route from Raipur.',
      consideration:
        'For a main entrance that a business depends on, the heavy commercial kit is the one to specify.',
    },
    'bolts-handles': {
      angle:
        'Shutters and rear doors on commercial premises rely on tower bolts as a secondary fastening behind the main lock, and those get used hard. Handles here lean practical rather than decorative.',
      consideration:
        'Fit bolts top and bottom on a rear or shutter door — a single central bolt leaves both corners free to be levered.',
    },
    'door-closers': {
      angle:
        'This is one of Durg’s strongest categories. Every shop with a glass or aluminium entrance door wants it closing behind customers, and the trading streets have a lot of those doors.',
      consideration:
        'Set the latching speed faster than the closing speed, or the door will rest against the frame without engaging.',
    },
    'fittings-accessories': {
      angle:
        'Frameless glass shopfronts are increasingly common in Durg’s commercial core, and those run on floor springs and patch fittings rather than conventional hinges. The Borai industrial area takes channel and anchor work.',
      consideration:
        'A frameless glass entrance needs a floor spring set into the slab — plan it before the floor is laid.',
    },
    'tapes-sealants-adhesives': {
      angle:
        'Signage and glass bonding on shopfronts uses structural VHB tape, which is a commercial line rather than a residential one. Silicone and foam sell steadily to fabricators across the district.',
      consideration:
        'Grey VHB is the structural grade; clear is for joints that will be visible through glass.',
    },
    'fasteners-screws': {
      angle:
        'Borai’s workshops buy fasteners by the box, and shopfitting work in the town takes the same items in smaller counts. Carriage bolts see more use here than in purely residential districts.',
      consideration:
        'For a fixing that will be seen, a carriage bolt gives a clean domed head with no visible drive.',
    },
    'glass-hardware-shower-fittings': {
      angle:
        'Durg leans commercial in this category: glass door patch fittings, centre locks and knobs for shopfronts rather than shower enclosures. Residential shower work exists but is the smaller share.',
      consideration:
        'A shop door needs a patch fitting and floor spring; a shower hinge will not carry a full-height entrance door.',
    },
    'abrasives-mesh-misc': {
      angle:
        'Glass and metal workshops across the district run cutting wheels and flap discs as daily consumables. Mesh demand follows the residential wards and the monsoon.',
      consideration:
        'Thin cutting wheels cut aluminium faster and cleaner than general-purpose discs.',
    },
  },

  // -------------------------------------------------------------- BILASPUR
  bilaspur: {
    'rollers-bearings-channels': {
      angle:
        'Bilaspur is where the northern districts buy, so dealers here often take rollers in box quantities to redistribute rather than for a single job. Institutional buildings around the High Court and the railway zonal offices use larger window units than domestic stock.',
      consideration:
        'If you are reselling, take a spread of the common sizes rather than depth in one — the calls you get will vary.',
    },
    'locks-latches': {
      angle:
        'Institutional and office buildings in Bilaspur need locks that a facilities team can fit consistently across dozens of identical windows, which favours standard patterns over whatever is cheapest that week.',
      consideration:
        'For a building with many identical windows, standardise on one SA code so future replacements are trivial.',
    },
    'door-window-seals': {
      angle:
        'Air-conditioned offices are the driver here rather than dust: an unsealed door bleeds cooled air continuously, and across a floor of offices that is a running cost. Acoustic sealing also matters more in shared professional buildings.',
      consideration:
        'A door bottom seal pays for itself on any air-conditioned room that is in daily use.',
    },
    hinges: {
      angle:
        'Office fit-outs want doors that sit flush and stay flush, which is an adjustment problem. Adjustable hinges let one fitter correct a floor of doors without lifting any of them off.',
      consideration:
        'Budget for adjustment on a new fit-out — frames move as a building dries out.',
    },
    'door-kits': {
      angle:
        'This is Bilaspur’s strongest category. Institutional and commercial work needs doors fitted consistently in quantity, and dealers here buy kits in volume to serve the districts further north.',
      consideration:
        'For a repeat specification across a building, confirm the finish is available in the quantity you need before committing.',
    },
    'bolts-handles': {
      angle:
        'Handles on public and institutional buildings are touched constantly, so the finish wears rather than the mechanism. Larger H-handles and American handles suit the heavier doors on these buildings.',
      consideration:
        'On a high-traffic door, stainless outlasts a plated finish visibly — plating wears through where hands land.',
    },
    'door-closers': {
      angle:
        'Corridors and stairwells in multi-storey institutional buildings create pressure differences that a closer has to work against, on top of the door’s own weight. That pushes sizing up from what the leaf alone would suggest.',
      consideration:
        'Size up for a stairwell or corridor door — air pressure is a real load the closer has to overcome.',
    },
    'fittings-accessories': {
      angle:
        'Professional offices around Vyapar Vihar use glass partitioning heavily, which makes connectors, U-channels and floor springs an ordinary rather than occasional purchase. Sirgitti’s industrial units take anchors and channels.',
      consideration:
        'Partition connectors come in corner and T configurations — count both before ordering.',
    },
    'tapes-sealants-adhesives': {
      angle:
        'Glass partition work runs on structural tape and sealant, and a fabricator doing office fit-outs gets through both continuously. Dealers here stock them as fast-moving lines.',
      consideration:
        'VHB tape needs both surfaces genuinely clean — a wipe with solvent before bonding is not optional.',
    },
    'fasteners-screws': {
      angle:
        'Partition and drywall work in office fit-outs makes black drywall screws a strong line here, alongside the self-drillers used on the aluminium framing itself.',
      consideration:
        'Black phosphate screws are for drywall only — they corrode if used anywhere they will get damp.',
    },
    'glass-hardware-shower-fittings': {
      angle:
        'Bilaspur has both halves of this category in real volume: hotel and guesthouse bathrooms driving shower enclosure work, and office glazing driving patch fittings, connectors and glass door locks.',
      consideration:
        'Hospitality bathrooms are used harder than domestic ones — specify the heavier hinge and expect to service it.',
    },
    'abrasives-mesh-misc': {
      angle:
        'Dealers buy mesh in full rolls here to cut for their own customers, rather than the short cuts a single household needs. Louvres see steady institutional demand for service areas and washrooms.',
      consideration:
        'A full roll works out considerably cheaper per foot if you are cutting for more than a few windows.',
    },
  },

  // ----------------------------------------------------------------- KORBA
  korba: {
    'rollers-bearings-channels': {
      angle:
        'Korba is a coal and power district, and airborne coal dust gets into everything including window tracks. Grit in a channel turns a roller into a grinding tool, so rollers here wear out on a shorter cycle than anywhere else in the state.',
      consideration:
        'Clean the track dry and never grease it — grease binds coal dust into a paste that destroys both roller and channel.',
    },
    'locks-latches': {
      angle:
        'Industrial atmosphere is hard on plated mild steel: once the plating is scratched, corrosion runs underneath it and the mechanism stiffens. Stainless locks cost more up front and are the cheaper fitting here over any reasonable timeframe.',
      consideration:
        'In Korba specifically, buy the stainless version of the lock — this is the one district where we would say that without qualification.',
    },
    'door-window-seals': {
      angle:
        'Dust ingress is the defining local problem, and seals are the direct answer. Plant offices, control rooms and company housing all have the same complaint, and a brush strip plus a bottom seal addresses most of it.',
      consideration:
        'Seal the door bottom first — it is the largest single gap in almost every room.',
    },
    hinges: {
      angle:
        'Plant and utility buildings use heavier doors than housing does, and those doors are opened by people carrying things, often with a shoulder. Hinges here are chosen for load rather than fine adjustment.',
      consideration:
        'Use three heavy hinges on an industrial door rather than two adjustable ones.',
    },
    'door-kits': {
      angle:
        'Company township housing and plant site buildings both get refitted in batches, which suits complete kits. Robustness matters more than finish choice in most of this work.',
      consideration:
        'For plant buildings, specify the heavy commercial kit — the light kits are not built for the cycle count.',
    },
    'bolts-handles': {
      angle:
        'Industrial premises use bolts on stores, switch rooms and plant doors where a lock is not warranted but the door must stay shut. Those see heavy, repeated use by people in gloves.',
      consideration:
        'A heavy-gauge bolt is worth the difference on any door opened several times a shift.',
    },
    'door-closers': {
      angle:
        'This is Korba’s defining category. Plant entrances, offices and control rooms cycle doors constantly, and dust contaminates the hydraulics of a lighter unit. A capsule closer is specified here as a matter of course, not as an upgrade.',
      consideration:
        'Budget for the capsule closer on any door in a dusty environment — lighter units fail on seals, not on the body.',
    },
    'fittings-accessories': {
      angle:
        'Anchors, wall plugs and channel sections go into plant and utility buildings in quantity. Glass partitioning appears mainly in administrative blocks rather than operational areas.',
      consideration:
        'For fixing into industrial concrete, use the correct expansion plug rather than the one that happens to be in the drawer.',
    },
    'tapes-sealants-adhesives': {
      angle:
        'Sealing against dust rather than water is the priority here, and it is continuous maintenance rather than a one-off. PU foam around frames and silicone at perimeters are the two that move.',
      consideration:
        'PU foam fills the gaps behind a frame that no strip seal can reach — worth doing once, properly.',
    },
    'fasteners-screws': {
      angle:
        'Plant maintenance and contracting work takes fasteners in bulk. Corrosion resistance matters more here than in the plains districts, so stainless sells in higher proportion.',
      consideration:
        'Specify stainless for anything outdoors or in a wash-down area — plated steel will not last.',
    },
    'glass-hardware-shower-fittings': {
      angle:
        'The demand here comes from company guest houses, officers’ accommodation and administrative buildings rather than from a large domestic renovation market. Volumes are lower but specifications tend to be consistent.',
      consideration:
        'For guest accommodation, standardise the hinge across all rooms so maintenance holds one spare part.',
    },
    'abrasives-mesh-misc': {
      angle:
        'Fabrication and maintenance workshops attached to industrial sites are the main buyers of cutting wheels and flap discs, and they buy consistently. Mesh demand follows township housing.',
      consideration:
        'Powder-coated black mesh hides coal dust far better than bright aluminium does.',
    },
  },

  // ----------------------------------------------------------- RAJNANDGAON
  rajnandgaon: {
    'rollers-bearings-channels': {
      angle:
        'Rajnandgaon builds low-rise: individual houses and shops rather than towers. Windows are domestic-scale, so standard single-wheel nylon rollers cover most of what the district needs without paying for heavy-duty parts nobody here requires.',
      consideration:
        'The standard nylon roller is the right specification for almost every window in this district — heavier is not better here.',
    },
    'locks-latches': {
      angle:
        'This is the district’s strongest category by volume. Ordinary residential windows across the town and surrounding villages run on crescent, touch and Maruti locks, and they are bought a few at a time rather than by the box.',
      consideration:
        'For an upper-floor window that is awkward to reach, a touch lock is worth the small loss in grip.',
    },
    'door-window-seals': {
      angle:
        'NH-53 carries heavy traffic through Rajnandgaon, and houses and shops on the highway side deal with road dust and noise. Seals address both at once, which is unusual value.',
      consideration:
        'An acoustic door seal cuts highway noise noticeably on a road-facing room — most people fit it for dust and are surprised by the quiet.',
    },
    hinges: {
      angle:
        'Standard residential doors on low-rise housing rarely need three-way adjustment. Ordinary aluminium butt hinges do the job, and the adjustable versions are worth it only on doors that already hang badly.',
      consideration:
        'Do not pay for 3D adjustable hinges on a straightforward new door — the standard hinge is the honest choice.',
    },
    'door-kits': {
      angle:
        'Mini door kits suit the scale of building here: internal doors on individual houses and small shop premises. The heavy commercial kits are a small share of what moves through this district.',
      consideration:
        'The SS mini kit covers most internal doors in a house and costs meaningfully less than the heavy kit.',
    },
    'bolts-handles': {
      angle:
        'Tower bolts are still the default fastening on internal and courtyard doors across the district, and the trading streets around Ganj Line buy them steadily. D-handles suit the door sizes here better than large architectural pulls.',
      consideration:
        'A 4-inch bolt is fine on an internal door; save the 6-inch for anything external.',
    },
    'door-closers': {
      angle:
        'Shops along Ganj Line and Cinema Line want their doors closing, but these are modest single-leaf entrances rather than the heavy commercial doors of a larger city. Standard overhead hydraulic closers cover almost all of it.',
      consideration:
        'The standard overhead closer is sized right for a small shop front — the capsule unit is more than this duty needs.',
    },
    'fittings-accessories': {
      angle:
        'Wall plugs, U-channels and PVC angles for window sills are the everyday items here. Tedesara’s industrial units add a modest amount of shed and workshop fixing work.',
      consideration:
        'The 2-track and 3-track PVC angle is what stops water pooling in a window sill — cheap, and routinely left out.',
    },
    'tapes-sealants-adhesives': {
      angle:
        'Silicone and PU foam are ordinary consumables for the district’s fabricators. Structural VHB tape is a specialist line here rather than a staple, since there is little facade or large-format glass work.',
      consideration:
        'One cartridge of neutral-cure silicone and a decent gun will outlast several cheap alternatives.',
    },
    'fasteners-screws': {
      angle:
        'Fabricators here buy in hundreds rather than thousands. Self-tapping and self-drilling screws for aluminium sections make up most of it, with wood screws for timber frames still common in older construction.',
      consideration:
        'Older houses here often have timber frames — check before assuming a self-driller is the right screw.',
    },
    'glass-hardware-shower-fittings': {
      angle:
        'This is the district’s smallest category. Frameless shower enclosures are still a minority choice in Rajnandgaon housing, though newer builds in the town are beginning to specify them.',
      consideration:
        'If this is the first frameless enclosure you have fitted, send a photo of the corner and we will confirm the hinge angle before you order the glass.',
    },
    'abrasives-mesh-misc': {
      angle:
        'Mosquito mesh is a strong seasonal line across the district, and plastic mesh takes a larger share here than in the cities because price sensitivity is higher. Corner cleats sell to fabricators making frames locally.',
      consideration:
        'Plastic mesh is genuinely fine on a shaded window; on a sunny elevation it will go brittle within a couple of seasons.',
    },
  },
};

/** Cities that have a full set of 12 angles and therefore get category pages. */
export const CITY_CATEGORY_CITIES = Object.keys(CITY_CATEGORY_ANGLES);

export function getCityCategoryAngle(
  citySlug: string,
  categorySlug: string
): CityCategoryAngle | undefined {
  return CITY_CATEGORY_ANGLES[citySlug]?.[categorySlug];
}

/** Every (city, category) pair that has real content behind it. */
export function cityCategoryPairs(): { city: string; category: string }[] {
  const out: { city: string; category: string }[] = [];
  for (const [city, categories] of Object.entries(CITY_CATEGORY_ANGLES)) {
    for (const category of Object.keys(categories)) out.push({ city, category });
  }
  return out;
}
