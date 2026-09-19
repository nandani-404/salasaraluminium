import type { BlogPost } from '../data';

/**
 * Second batch of buying guides.
 *
 * Same rules as `guides.ts`: answer first, only claim what is true in general
 * engineering terms or what is in the catalogue, and never state a price, a
 * lead time or a certification.
 *
 * These deliberately cover the questions the first batch left open — the
 * "which of these two" and "how do I adjust it" questions, which are what
 * someone types when they already have the part in front of them.
 */

const AUTHOR = 'Abhishek, Salasar Aluminium & Hardware';

export const HARDWARE_GUIDES_2: BlogPost[] = [
  {
    slug: 'door-closer-not-latching-how-to-adjust-it',
    title: 'Door Closer Not Latching? How to Adjust the Two Valves',
    excerpt:
      'A door that drifts to almost-shut is nearly always an adjustment, not a fault. What the two valves do, which one to turn, and how far.',
    author: AUTHOR,
    date: 'September 18, 2026',
    readTime: '5 min read',
    category: 'Doors',
    image: '/salasar-doorcloser-hero-clean.jpg',
    qaBlocks: [
      {
        question: 'Why does my door stop just before closing?',
        answer:
          'The latching speed valve is set too slow. Most hydraulic closers have two independent valves — closing speed for the main sweep, and latching speed for the last fifteen degrees. If the second is throttled too far, the door arrives at the frame with no momentum and rests there unlatched.',
      },
    ],
    content: `Two valves, two different jobs

Almost every hydraulic door closer has two adjustment screws, and almost everybody assumes they do the same thing at different strengths. They do not.

The closing speed valve controls the main sweep, from fully open down to roughly fifteen degrees from the frame. This is the one that governs whether the door feels controlled or slams.

The latching speed valve controls only that last stretch into the frame. Its job is to give the door enough momentum to push the latch bolt back against its spring and drop into the keep.

Set the first slow for safety, and the second fast enough to actually latch. That combination is what people describe as "a door that closes properly".

The commonest complaint, and its fix

A door that sweeps closed and then stops a centimetre short, resting against the frame without engaging, is the single most frequent closer complaint we hear. It is not a failed closer and it does not need replacing.

Turn the latching speed valve anticlockwise a quarter turn to speed it up, then test. Repeat until the door latches reliably, then stop. Do not chase it past the point where it starts to bang.

If the door slams instead, you have the opposite problem: the closing speed is too fast. Turn that valve clockwise, again a quarter turn at a time.

Quarter turns, and never all the way out

Work in quarter turns and test between each one. The adjustment range on these valves is narrow, and a full turn can take you from too slow to slamming.

More importantly, never back a valve all the way out. The valve is holding hydraulic fluid in. Remove it completely and the fluid escapes, and a closer that has lost its fluid cannot be refilled in the field. That is the one way to turn an adjustment problem into a replacement.

When it genuinely is the closer

Three symptoms mean the unit itself has failed rather than drifted out of adjustment.

Oil on the door or the frame below the closer body means a seal has gone. Once fluid is escaping, damping will get progressively worse and no adjustment will hold.

A door that closes at the same speed regardless of where the valves are set means the internal valve seats are worn through.

A closer that worked last summer and is dramatically slower this winter is usually temperature rather than failure — hydraulic fluid thickens as it cools. A small seasonal adjustment is normal. A closer that needs a large one every few weeks is on its way out.

Check the door before you blame the closer

If the door has dropped on its hinges, the latch and the keep no longer line up, and no amount of closer adjustment will make the bolt find a hole it is not pointing at.

Close the door slowly by hand and watch where the latch bolt meets the strike plate. If it is catching on the edge rather than entering cleanly, the fix is a hinge adjustment or a repositioned strike plate — the closer is doing its job.

The same applies to a door that has swollen against its frame. Friction in the seal is a load the closer has to overcome, and a door that needs a shove by hand will never be closed by a correctly sized closer.

If it still will not latch

At that point, check the closer was sized for the door in the first place. An undersized unit cannot generate the force to latch a heavy or wide leaf no matter how the valves are set, and no adjustment will fix a specification problem. Our guide to door closer sizing covers how to work that out, or call us with the leaf dimensions.`,
  },
  {
    slug: '2d-vs-3d-adjustable-hinges',
    title: '2D vs 3D Adjustable Hinges: Which Do You Actually Need?',
    excerpt:
      'What each axis of adjustment does, when the cheaper 2D hinge is the honest choice, and why new buildings need adjustment in the first year.',
    author: AUTHOR,
    date: 'September 20, 2026',
    readTime: '5 min read',
    category: 'Doors',
    image: '/3d-hinge-v1.png',
    qaBlocks: [
      {
        question: 'What is the difference between a 2D and a 3D hinge?',
        answer:
          'A 2D hinge adjusts on two axes — side to side and in or out. A 3D hinge adds vertical adjustment, letting you raise or lower the leaf. If a door has dropped rather than drifted sideways, only a 3D hinge will correct it.',
      },
    ],
    content: `What the dimensions mean

The number refers to how many directions the hinge can move the door after it is hung.

A 2D hinge adjusts laterally — moving the leaf toward or away from the hinge jamb — and in depth, controlling how the door sits relative to the frame face. Between them those two handle most alignment problems on a door that is otherwise hanging level.

A 3D hinge adds height. That third axis raises or lowers the whole leaf, which is the one you need when a door has sunk and is catching on the threshold or scraping the floor.

Which problem do you actually have?

Close the door slowly and watch the gap around the leaf.

An uneven gap down the lock side, wider at the top than the bottom or vice versa, is a lateral problem. A 2D hinge will fix it.

A door that catches at the bottom edge, or where the gap at the head has opened up while the bottom has closed, has dropped. That needs vertical adjustment, which means 3D.

A door that shuts but sits proud of the frame, or sinks too far into the rebate so the latch overshoots, is a depth problem. Both hinge types handle it.

Why new buildings need this

Frames move. A new building dries out over its first year, plaster shrinks, and timber sub-frames settle. A door hung perfectly at handover will frequently need a small correction some months later.

That is not a defect and it does not mean anything was fitted badly. It is why adjustable hinges exist, and it is the strongest argument for specifying them on a new build even where the door hangs true on day one — you are buying the ability to fix it later without lifting the door off.

When the standard hinge is the right answer

We would not sell you a 3D hinge for a straightforward internal door in an existing, settled building that hangs correctly. A standard extruded aluminium butt hinge does that job, costs less, and has nothing to come loose.

Adjustable hinges earn their cost in three situations: new construction that has not finished moving, heavy doors where load will pull the leaf over time, and a door that already hangs badly and you would rather adjust than rehang.

How many hinges

Two hinges are adequate for a light internal door. Use three on anything over about 2.1 metres tall, anything carrying glass, and anything in the heavier door kits.

The third hinge is not there for strength alone — it stops the leaf twisting, which is what causes the top corner to catch on doors that were hung level.

Adjusting them

Each axis has its own screw, and on most patterns they are marked. Work on one axis at a time and close the door to check between each adjustment; moving two axes at once makes it impossible to tell which change did what.

Adjust the hinges as a set rather than individually. Moving one hinge and not the others puts the leaf into a twist, which looks fixed from one side of the door and worse from the other.

If you are not sure which hinge pattern is already fitted, photograph it on the door and send it on WhatsApp — the fixing plate shape identifies it faster than any description.`,
  },
  {
    slug: 'stainless-steel-vs-plated-hardware-when-to-pay-more',
    title: 'Stainless Steel vs Plated Hardware: When the Extra Cost Is Worth It',
    excerpt:
      'Plated mild steel is fine in a dry room and a false economy in a bathroom. Where the line falls, and why Korba and Raigarh are different.',
    author: AUTHOR,
    date: 'September 22, 2026',
    readTime: '5 min read',
    category: 'Materials',
    image: '/ss-lock-l-v1.png',
    qaBlocks: [
      {
        question: 'Is stainless steel hardware worth the extra cost?',
        answer:
          'In a dry interior, usually not — plated mild steel lasts a long time and the difference is hard to justify. In a bathroom, a kitchen, or anywhere with industrial air, yes: once the plating is scratched, corrosion runs underneath it and the mechanism stiffens.',
      },
    ],
    content: `How plating actually fails

A plated mild steel fitting is ordinary steel with a thin protective layer, usually zinc or chrome. The steel underneath rusts readily; the plating is the only thing between it and the air.

That layer is continuous until something breaks it — a screwdriver slip during fitting, a knock, or simple wear where a hand or a bolt passes repeatedly. From that point corrosion starts at the scratch and works sideways under the plating, lifting it as it goes.

This is why plated hardware rarely fails gradually and evenly. It looks fine for years, then deteriorates quickly from one damaged spot.

Stainless steel does not have a layer to lose. Its corrosion resistance comes from the alloy itself, so a scratch exposes more of the same material rather than a vulnerable core.

Where plated is genuinely fine

In a dry bedroom, living room or office, plated hardware will outlast most people's interest in the door it is fitted to. Air is dry, temperature is stable, nothing condenses.

We will say so when asked. Specifying stainless for every fitting in a house is not value, it is overspending in rooms that will never test the difference.

Where it is a false economy

Bathrooms are the clearest case. Humidity is high for hours a day, condensation forms on metal, and the cycle repeats indefinitely. Plated hardware in a bathroom is the most common corrosion complaint we get.

Kitchens follow, for the same reason plus grease and steam.

Anything exposed to weather — an external door handle, a terrace bolt, a window fitting that catches rain — is outdoors in practice even if the frame is not.

And then there are the industrial districts.

Korba and Raigarh specifically

These two deserve naming. Korba's air carries coal dust and the emissions of a concentrated power generating belt. Raigarh has steel, sponge iron and captive power plants along its main roads.

Industrial atmosphere is more aggressive than humidity alone, and plating gives up faster there than anywhere else in the state. If you are fitting hardware in either district and the choice is close, take the stainless version. This is the one recommendation we would make without qualification.

What we stock in both

Several of our lock patterns exist in both materials so the choice is a straight swap rather than a different fitting. SA-14 and SA-15 are the mild steel straight and L-type window latches; SA-18 and SA-19 are the stainless equivalents in the same shapes.

Friction stays and arm stays for casement windows are stainless as standard, because they sit in the weather by definition. Shower hinges are chrome-plated brass rather than steel — brass does not rust, and the plating there is cosmetic rather than protective.

A note on screws

The fitting and the screws holding it are separate decisions, and people forget the second one.

There is no point specifying a stainless lock and fixing it with plated screws into a bathroom door. The screws corrode, stain the fitting, and seize in their holes so the lock cannot be removed later without drilling.

Match the screws to the fitting. It is the cheapest part of the job and the one most likely to cause trouble.`,
  },
  {
    slug: 'neutral-cure-vs-acetic-silicone-on-aluminium',
    title: 'Neutral Cure vs Acetic Silicone: Why It Matters on Aluminium',
    excerpt:
      'The vinegar smell is the clue. Why the cheaper silicone attacks aluminium finishes, and where each type belongs.',
    author: AUTHOR,
    date: 'September 24, 2026',
    readTime: '4 min read',
    category: 'Materials',
    image: '/silicon.png',
    qaBlocks: [
      {
        question: 'Which silicone should I use on aluminium windows?',
        answer:
          'Neutral cure. Acetic cure silicone releases acetic acid as it sets, which attacks anodised and powder-coated aluminium finishes and corrodes the metal beneath. Acetic is the one that smells strongly of vinegar.',
      },
    ],
    content: `Tell them apart by smell

Open a cartridge of acetic cure silicone and it smells sharply of vinegar. That is not a coincidence or an additive — it is acetic acid, released as the sealant cures.

Neutral cure silicone releases alcohol or oxime compounds instead, and smells much milder.

That smell is the whole difference, and it is the one thing you can check without reading a label.

Why acetic acid is a problem here

Acetic acid attacks aluminium. On an anodised surface it degrades the oxide layer that gives the finish its durability. On powder coating it works at the edges and any point where the coating is thin, and once it reaches the metal it corrodes it.

The result is not immediate. It shows up months later as dulling, white bloom or staining along the sealant line, and by then the only fix is to strip it back and start again.

The same applies to any coated metal, to marble and to natural stone, all of which are acid-sensitive.

So on aluminium windows, doors and glazing, use neutral cure. There is no case where acetic is the better choice on a coated aluminium section.

Where acetic is fine

Acetic cure silicone cures faster, bonds very well to glass and glazed ceramic, and costs less. On glass-to-glass joints, glazed tile and sanitary ware with no coated metal involved, it does a good job.

It is a reasonable product used in the right place. The problem is that it is the default on many shelves, and aluminium fabrication is exactly where the default is wrong.

Getting a seal that lasts

Most failed sealant joints we hear about failed for one of two reasons, and neither is the sealant.

Silicone will not bond to old silicone. If you are resealing, the previous bead has to come off completely, back to clean aluminium or glass. A fresh bead over a degraded one is stuck to something that is already letting go.

Surfaces have to be genuinely clean and dry. Dust, oil from handling, or residual moisture in a joint all prevent adhesion. A wipe with a suitable solvent before applying is not an optional refinement.

Cut the nozzle to the joint width rather than the largest opening that will fit, tool the bead once and firmly, and leave it alone. Repeated tooling drags partially skinned silicone away from the edges.

PU foam is a different product

Polyurethane foam and silicone are not interchangeable, and people substitute them because both come in a cartridge.

PU foam expands to fill a cavity — the gap behind a frame, the space between a frame and rough masonry. It insulates and it fills. It is not a weather seal and it degrades in sunlight, so it must be covered.

Silicone seals a joint against water and air. It does not fill a cavity of any size.

A well-sealed window frequently uses both: foam behind the frame to fill and insulate, silicone at the visible perimeter to seal. Using either alone for both jobs is why some frames still draw draughts after being sealed.`,
  },
  {
    slug: 'self-drilling-vs-self-tapping-screws-for-aluminium',
    title: 'Self-Drilling vs Self-Tapping Screws for Aluminium',
    excerpt:
      'SDS cuts its own hole; STS needs a pilot and holds better. Which belongs where, and why a wood screw in aluminium always works loose.',
    author: AUTHOR,
    date: 'September 26, 2026',
    readTime: '4 min read',
    category: 'Materials',
    image: '/selfdriling%20screw.png',
    qaBlocks: [
      {
        question: 'Which screw should I use in aluminium extrusion?',
        answer:
          'A self-tapping screw with a pilot hole for anything structural in extrusion, and a self-drilling screw for sheet and thin sections where speed matters. Never a wood screw — its coarse thread strips thin aluminium and the fitting works loose.',
      },
    ],
    content: `The difference is the tip

A self-drilling screw (SDS) has a drill point formed into its end. It cuts its own hole and forms its own thread in one action, with no pilot drilling. That is why it dominates sheet metal and thin section work, where you are placing many fixings and the time saved per fixing adds up.

A self-tapping screw (STS) has a sharp point but no drill flute. It forms a thread in a pilot hole you drill first.

The extra step buys you something. Because you control the pilot diameter, you control how much material the thread bites into, and a correctly sized pilot in thicker extrusion gives a meaningfully stronger fixing than a self-driller cutting its own oversized path.

Which to use

Use self-drilling screws for sheet metal, thin-walled sections, and volume work where you are fixing many points quickly and no single fixing is critical.

Use self-tapping screws for thicker extrusion, and for anything that will carry load or be cycled — a hinge, a handle, a closer bracket, a lock body. Anywhere a fixing working loose would be a problem, drill the pilot.

Why wood screws fail here

A wood screw has a coarse, deeply cut thread designed to grip soft fibrous material. Aluminium extrusion is neither soft in that sense nor thick enough to give that thread much to hold.

Driven into thin aluminium, a coarse thread does not so much cut as tear. It removes more material than it engages, and the fixing feels tight on the day because the screw head is clamping. Months of use later the thread has given up and the fitting is loose.

We see this constantly in hardware that has failed long after fitting — and the hardware itself is usually fine. Using the correct screw costs almost nothing and is one of the highest-return details in the whole job.

Pilot hole size

The pilot should match the screw's core diameter — the shaft, not including the thread. Too large and the thread has nothing to bite; too small and you risk splitting a thin section or snapping the screw.

If you are unsure, test on an offcut of the same section before committing to the real one.

Head type and finish

Countersunk heads sit flush and are what you want under a hinge plate or anywhere a projecting head would foul a moving part. Pan and hex heads suit fixings that stay visible.

For anything outdoors, in a bathroom, or in the industrial air around Korba and Raigarh, use stainless. A plated screw holding a stainless fitting corrodes, stains the fitting and seizes in its hole so the fitting cannot be removed without drilling it out.

Black phosphate drywall screws are for partition board only. They have no meaningful corrosion resistance and should not be used anywhere they may get damp.

Driving them

Use a driver with a clutch and set it moderately. Aluminium gives little warning before a thread strips, and an impact driver will strip a thread in thin section almost instantly.

If a screw suddenly spins freely, the thread has gone. Move to a fresh position rather than replacing the same screw in the same hole, or step up one screw diameter.`,
  },
  {
    slug: 'toughened-glass-thickness-8mm-10mm-12mm-guide',
    title: 'Toughened Glass Thickness: 8 mm, 10 mm or 12 mm?',
    excerpt:
      'How much each thickness weighs, what that means for hinges and connectors, and why cut-outs have to be decided before the glass is made.',
    author: AUTHOR,
    date: 'September 28, 2026',
    readTime: '5 min read',
    category: 'Bathroom & Glass',
    image: '/glass%20to%20glass.png',
    qaBlocks: [
      {
        question: 'How thick should shower enclosure glass be?',
        answer:
          'Eight millimetres is the common residential choice; 10 mm and 12 mm are heavier, feel more solid and need hardware rated to carry them. A 700 x 1900 mm door is about 27 kg in 8 mm and about 40 kg in 12 mm, and that difference hangs on the hinges for years.',
      },
    ],
    content: `Weight is the decision

Glass weighs roughly 2.5 kg per square metre per millimetre of thickness. That single figure drives almost every downstream choice.

Take a typical shower door at 700 mm by 1900 mm, which is 1.33 square metres.

In 8 mm that door weighs about 27 kg. In 10 mm, about 33 kg. In 12 mm, about 40 kg.

Those 13 kilograms between the lightest and heaviest option hang off two hinges continuously, for years. That is why hardware ratings exist, and why a door that was fine on the day can sag two years later.

What each thickness is for

Eight millimetres is the standard residential shower choice across most of India. It is light enough to be forgiving on hardware, strong enough for a domestic door, and the cheapest of the three.

Ten millimetres is the middle option. It feels noticeably more solid in the hand, flexes less, and suits a wider door or a household that will use it hard.

Twelve millimetres is for large panels, commercial and hospitality installations, and frameless partitions where the glass is doing structural work. It is also what you specify when the panel is wide enough that thinner glass would visibly flex.

For fixed panels that never move, thinner glass is often adequate, because the hardware is holding a static load rather than carrying a swinging one.

What it means for hardware

A hinge rated for an 8 mm door will grip 12 mm glass — the clamp will close on it — and it will hold at first. What it will not do is carry the extra weight indefinitely. The door drops a few millimetres, stops meeting its seal, and the enclosure starts leaking at the bottom corner.

That failure looks like a seal problem and is actually a hinge specification problem.

Tell us the thickness when you order and we will confirm the item from stock against the actual product rather than from a catalogue line.

[CONFIRM] We are adding per-hinge glass thickness ratings to the product pages for SA-75 to SA-78. Until those are verified against the items on the shelf we would rather say nothing than publish a figure we cannot stand behind.

Buy the hardware before the glass

This is the part that costs money when it is missed.

Toughened glass cannot be drilled, cut or modified after tempering. Any attempt shatters the panel. Every hole, notch and cut-out must be specified before the glass goes into the furnace.

Those cut-out positions and sizes come from the hardware. So the order is: choose the fittings, take the cut-out dimensions from them, give those to the glass supplier.

Do it the other way round and you have two options, both expensive: new glass, or finding hardware that happens to match holes already made. New glass is usually the cheaper of the two.

Measure the opening properly

Measure the width at the top, the middle and the bottom, and use the smallest. Openings are rarely square, and a panel cut to the widest measurement will not go in.

Check the floor is level across the opening and the walls are plumb. On a frameless enclosure there is no frame to absorb a discrepancy — any error in the opening shows up as a gap you cannot close.

If any of that is in doubt, send photographs of the corners with your measurements on WhatsApp before ordering the glass. It is the cheapest check in the whole job.`,
  },
];
