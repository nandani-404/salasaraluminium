import type { BlogPost } from '../data';

/**
 * Buying guides written against real search intent — the questions people
 * actually type before ordering a part ("which door closer for a heavy door",
 * "what size machar jaali", "crescent or touch lock").
 *
 * WRITING RULES
 * - Answer first. The opening paragraph under each heading must answer the
 *   question on its own, so it can be lifted as a snippet.
 * - Only claim what is true in general engineering terms, or what is in the
 *   catalogue. Where a figure depends on the specific item we stock and is not
 *   recorded, say so and point at the counter instead of inventing a number.
 * - Never state a price, a lead time, or a certification.
 *
 * [CONFIRM] Author attribution. These are published under the named contact for
 * the business. Confirm he is happy to be credited, or supply another name.
 */

const AUTHOR = 'Abhishek, Salasar Aluminium & Hardware';

export const HARDWARE_GUIDES: BlogPost[] = [
  {
    slug: 'how-to-choose-a-shower-hinge-for-8-to-12mm-glass',
    title: 'How to Choose a Shower Hinge for 8–12 mm Glass',
    excerpt:
      'Pick the hinge by joint angle first, then glass thickness. A walk-through of the four shower hinge types, what each one is for, and how to avoid a door that sags.',
    author: AUTHOR,
    date: 'September 2, 2026',
    readTime: '6 min read',
    category: 'Bathroom & Glass',
    image: '/salasar-showerhinge-hero-clean.jpg',
    qaBlocks: [
      {
        question: 'How do I choose a shower hinge for 8 mm or 12 mm glass?',
        answer:
          'Choose by the joint angle first — 0° for a fixed panel, 90° for wall-to-glass, 180° for glass-to-glass in line, 90° double for a corner — then confirm the hinge is rated to carry your glass thickness. A 12 mm door hung on a hinge intended for 8 mm will sag and eventually drop.',
      },
      {
        question: 'Is a shower hinge the same as a glass door patch fitting?',
        answer:
          'No. A hinge carries a light shower door swinging from a wall or an adjacent panel. A patch fitting carries a heavy frameless entrance door pivoting on a floor spring, transferring the load at the top and bottom corners.',
      },
    ],
    content: `Start with the angle, not the thickness

Almost every wrong shower hinge we see was chosen by glass thickness alone. Thickness matters, but it is the second question. The first is what the hinge is joining, because that determines the shape of the fitting and there is no way to adapt one angle to another.

There are four joints in a typical enclosure. A fixed panel that does not move is held by a 0° clip. A door that swings off a solid wall uses a 90° wall-to-glass hinge. Two panels in the same plane, where one is fixed and one swings, need a 180° glass-to-glass hinge. A corner enclosure where the door swings between two fixed panels uses a 90° double glass-to-glass hinge.

Walk the enclosure and write down each joint before you order. A standard three-sided cubicle often needs three different fittings, and buying four of the wrong one is the usual way a bathroom job stalls.

What we stock

Our shower hinge range runs SA-75 to SA-78, all chrome plated, which is the standard finish for a wet area because it resists the constant humidity better than a painted or anodised surface.

SA-75 is the 0° fixed clip for stationary panels. SA-76 is the 90° wall-to-glass hinge and is the one most often needed. SA-77 is the 180° glass-to-glass inline hinge. SA-78 is the 90° double glass-to-glass hinge for corner enclosures.

Then check the thickness rating

Toughened shower glass in India is normally 8 mm, 10 mm or 12 mm. The hinge has to do two things with that glass: grip it without cracking it, and carry its weight without drooping over time.

Weight rises faster than you would expect. Glass weighs roughly 2.5 kg per square metre per millimetre of thickness, so a 700 mm by 1900 mm door is about 27 kg in 8 mm glass and about 40 kg in 12 mm. That extra 13 kg hangs off the same two hinges for years. A hinge rated for the lighter door will hold at first and then sag, and once the door stops meeting the seal the enclosure leaks.

Tell us the glass thickness when you order and we will confirm the correct item from stock against the actual product. [CONFIRM] Per-hinge glass thickness ratings are being added to the product pages and are not published here yet, because we would rather say nothing than publish a figure we have not verified against the item on the shelf.

Two more things that decide whether the door works

Self-closing versus free-swinging. A spring-loaded hinge returns the door to closed on its own. In a small bathroom that is genuinely useful. In a large one, where the door might sensibly be left open to air the room, it is an irritation.

Hole position. Toughened glass cannot be drilled after tempering. The cut-outs have to be specified before the glass is made. Buy your hinges before you order your glass, take the cut-out dimensions from the fitting, and give those to the glass supplier. Doing it the other way round means either new glass or a different hinge, and new glass is the more expensive of the two.

If you are unsure

Send a photograph of the corner on WhatsApp with the glass thickness and the rough panel sizes. Identifying the joint from a picture takes a minute and costs nothing, and it is far more reliable than working from a description over the phone.`,
  },
  {
    slug: 'sliding-window-roller-sizes-explained',
    title: 'Sliding Window Roller Sizes Explained',
    excerpt:
      'Why a window has gone stiff, how to identify the roller you already have, and what separates a nylon residential roller from a bearing-housed one.',
    author: AUTHOR,
    date: 'September 4, 2026',
    readTime: '6 min read',
    category: 'Windows',
    image: '/sliding-roller-v1.png',
    qaBlocks: [
      {
        question: 'What size sliding window roller do I need?',
        answer:
          'Match the roller to the channel profile it runs in and the weight of the shutter, not to the window brand. The reliable method is to remove the old roller and match it physically, because profiles vary between fabricators even at the same nominal size.',
      },
      {
        question: 'Why has my sliding window become hard to push?',
        answer:
          'Nearly always a worn roller or a dirty track, not a faulty frame. A nylon wheel flattens where it carries the load, and grit packs into the channel. Replacing the rollers and cleaning the track restores the original action at a fraction of the cost of a new window.',
      },
    ],
    content: `A stiff window is a roller problem

If a sliding window has gone heavy, the frame is almost never at fault. Two things cause it, and both are cheap to fix.

The first is the roller itself. A nylon wheel carries the full weight of the shutter on a contact patch a few millimetres wide. Over years that patch flattens, the wheel stops rotating freely, and the shutter starts dragging rather than rolling.

The second is the track. Dust, grit and construction debris pack into the channel and turn a smooth guide into sandpaper. This is worse in Raipur than in wetter parts of the country, and worse still on a ground-floor window facing a road.

Before ordering anything, take the shutter out and clean the channel with a brush and a dry cloth. Sometimes that alone fixes it. If the wheel still does not spin freely under thumb pressure, the roller needs replacing.

Why nobody can tell you a size over the phone

Aluminium window sections are not standardised the way plumbing is. Two fabricators in the same market can use channels of the same nominal width with different internal profiles, and a roller that drops straight into one will not seat in the other.

That is why we ask you to bring the old roller in or send a photograph of it. Matching against the physical part takes a minute at the counter. Guessing from "it's a normal sliding window" wastes a trip.

If you can, bring the whole roller assembly, not just the wheel. The housing shape matters as much as the wheel diameter, because that is the part that has to sit in the channel.

The three kinds of roller, and when each one is right

Single-wheel nylon rollers are the standard residential fitting. They are quiet, they do not corrode, and they suit ordinary domestic shutters. This is what most houses have and what most houses need.

Double swing rollers use two wheels on a self-aligning carrier. The load spreads across two contact points and the assembly tolerates slight track misalignment, which matters on a large or heavy panel. Use these for wide sliding patio doors and big glazed shutters.

Metal bearing rollers put a steel ball bearing in a metal housing. They carry considerably more weight and last longer under heavy cycling, which is why they belong in shops and offices where a door is opened hundreds of times a day rather than a few. They transmit slightly more noise than nylon, which is rarely an issue in a commercial setting.

Bearings sold separately

If the housing is sound and only the bearing has failed, you do not need a complete roller. We stock 625 and 626 miniature bearings and 16 mm needle bearings for exactly this, along with size 22 bearings for heavier assemblies.

Rebuilding an existing housing is the cheaper repair and it preserves a fit you already know works. It is only worth doing if the housing itself is undamaged — if it is cracked or distorted, replace the whole roller.

Replace them in pairs

Always change both rollers on a shutter at the same time, even when only one has obviously failed. They have done identical work for identical time, so the second one is close behind. Doing one means taking the same shutter out again in a few months.

Channels

If the channel itself is worn through or bent, a new roller will not save it. We stock C-channel and G-channel guide sections for replacement. Bring a short offcut if you can, since the profile matters more than the nominal size.`,
  },
  {
    slug: 'door-closer-size-by-door-weight',
    title: 'Door Closer Size by Door Weight',
    excerpt:
      'How to match a door closer to the door it has to control, the difference between overhead, pencil and capsule closers, and why an undersized closer fails fast.',
    author: AUTHOR,
    date: 'September 6, 2026',
    readTime: '7 min read',
    category: 'Doors',
    image: '/salasar-doorcloser-hero-clean.jpg',
    qaBlocks: [
      {
        question: 'How do I choose a door closer size?',
        answer:
          'Size by the width and weight of the door leaf, not by the size of the room. Door closers are graded by power size, and the grade must cover the door it controls — an undersized closer will not latch the door, and an oversized one makes it too heavy to open comfortably.',
      },
      {
        question: 'What is the difference between an overhead, pencil and capsule door closer?',
        answer:
          'An overhead hydraulic closer is the general-purpose fitting for ordinary doors. A pencil closer is a slim pneumatic unit for light doors such as screen and mesh doors. A capsule closer is a heavier hydraulic body built for high-traffic entrances.',
      },
    ],
    content: `What a door closer is actually doing

A door closer stores energy when the door is opened and releases it to bring the door back to the frame and hold it shut. Two forces work against it: the weight of the leaf, and any air pressure across the opening.

That second one catches people out. A door in a corridor, a stairwell or an air-conditioned room can be meaningfully harder to close than the same door standing in an interior partition, because the closer is fighting a pressure difference as well as the door's own mass.

Size by the door, not by the room

Door closers are graded by power size. The grade you need follows from the width of the door leaf and its weight, and wider doors need more power than their weight alone suggests because the leverage works against the closer.

Two failure modes bracket the right answer. Undersize it and the door will not pull itself fully into the latch — it drifts to almost closed and sits there, which defeats the entire point and, on a fire door, is a safety failure. Oversize it and the door becomes genuinely hard to open, which is a problem for children, elderly users and anyone carrying something, and puts avoidable strain on the hinges.

Measure the leaf width and get the weight from the door supplier before you order. If you cannot get a weight, tell us the material and dimensions — a 35 mm hollow flush door and a 45 mm solid teak door of the same size are nowhere near the same mass.

The three types we stock

Overhead hydraulic closers, SA-42, are the general-purpose fitting. The body mounts on the door or frame with an arm linking the two, and hydraulic damping controls the closing speed. We stock them with an aluminium body and with a stainless steel cover, the cover being the better choice where the closer is visible or exposed to damp.

Pencil closers, SA-43, are slim pneumatic units. They are not scaled-down hydraulic closers and they do not do the same job. They are for light doors — mesh and screen doors, light internal shutters — where all that is needed is a gentle automatic return. Fitting one to a main entrance door is a common and expensive mistake.

Capsule closers, SA-44, use a heavier hydraulic body designed for high-traffic entryways. Where a door is cycled hundreds of times a day, the seals and fluid in a lighter closer degrade quickly. A capsule closer costs more up front and outlasts several of the alternative.

Adjustments that matter after fitting

Most hydraulic closers have two independent speed adjustments and they do different things. Closing speed governs the main sweep from fully open to roughly fifteen degrees. Latching speed governs the last stretch into the frame.

Set the closing speed slow enough to be safe and the latching speed fast enough to actually engage the latch. A closer that sweeps quickly and then crawls the last few degrees will leave the door resting against the frame unlatched — the single most common complaint, and it is a five-minute adjustment, not a fault.

Turn the valves in small increments, a quarter turn at a time, and test between each. Backing a valve all the way out can let the hydraulic fluid escape, and that ends the closer.

Floor springs are a different product

For a frameless glass door, an overhead closer is usually the wrong answer. Those doors pivot on a floor spring — SA-45 in our range — set into the floor, with patch fittings transferring the load at the top and bottom corners.

Floor springs have to be positioned before the floor is finished, so that decision belongs in the planning stage of the job, not at fit-out.`,
  },
  {
    slug: 'machar-jaali-mosquito-mesh-sizes-and-materials',
    title: 'Machar Jaali (Mosquito Mesh): Sizes and Materials',
    excerpt:
      'Which mosquito mesh to buy for a window — stainless steel, aluminium, powder-coated or plastic — and how to measure so you order the right roll width.',
    author: AUTHOR,
    date: 'September 8, 2026',
    readTime: '5 min read',
    category: 'Windows',
    image: '/macchar%20jali.png',
    qaBlocks: [
      {
        question: 'What width of machar jaali should I order?',
        answer:
          'Measure the clear opening of the window frame and take the next standard width up, so there is material to grip in the mesh channel. We stock 2 ft, 2.5 ft, 3.5 ft, 3.75 ft and 5 ft roll widths, in full rolls or short cuts.',
      },
      {
        question: 'Which mosquito mesh material lasts longest?',
        answer:
          'Stainless steel. It does not rust, does not go brittle in sunlight and keeps its tension for years. Plastic mesh is the cheapest and the shortest-lived; powder-coated steel sits in between and is the least visible from inside.',
      },
    ],
    content: `Measure the opening, not the glass

The commonest ordering mistake is measuring the pane. Mesh is fitted into the frame, so what matters is the clear opening of the mesh channel, measured corner to corner at the widest point.

Take that figure and go up to the next standard roll width. You need spare material to grip when the mesh is tensioned into the channel with the rubber beading, and trimming an oversize piece is trivial while stretching an undersize one is impossible.

Measure each window rather than assuming they match. Windows in the same wall are frequently a few millimetres apart, and on mesh a few millimetres is the difference between taut and sagging.

We stock five widths: 2 ft, 2.5 ft, 3.5 ft, 3.75 ft and 5 ft, as full rolls or short cuts. For one or two windows a short cut is the sensible purchase. For a whole house, a full roll works out better and leaves material for repairs.

Choosing the material

Stainless steel mesh, SA-81, is the long-term answer. It does not rust, ultraviolet light does not embrittle it, and it holds tension for years. It costs the most and it is the only one you are unlikely to revisit. Worth it on windows that are hard to reach, and on anything exposed to sun and rain.

Aluminium mesh is lighter and cheaper than stainless and resists corrosion well, but it is softer. It dents if it is leaned on and it is easier to tear, so it is better suited to windows above ground-floor level where nobody pushes against it.

Powder-coated black mesh, SA-83, is a steel mesh with a matte black coating. Its advantage is visual: a dark mesh substantially disappears when you look through it from a lit interior, where a bright one reads as a grey veil across the view. The coating also protects the steel underneath. This is the usual choice where the window matters to the room.

Plastic mesh, SA-84, is HDPE. It is the cheapest option and it does the job on a budget, but it goes brittle under direct sunlight over a few seasons and tears readily. Reasonable for a shaded window or a temporary fix; not a long-term fitting on a sunny elevation.

Bear in mind that the darker the mesh, the less you see it and the more it cuts light. That is a genuine trade-off, not a marketing line.

Fitting

Mesh is held by pressing it into a channel in the frame with a rubber beading, using a roller tool. The beading, not adhesive or staples, is what holds it.

Work from the centre of each side outward, keeping light, even tension. Pulling hard at one corner distorts the weave and the mesh sits wavy no matter what you do afterwards. If the mesh puckers, lift the beading out and start that side again — it will not settle on its own.

Trim the excess with a sharp blade only after all four sides are seated. Cutting early removes the material you need to hold on to.

Repair or replace

A small tear away from the edges can be closed with a patch, and it will hold. Anything larger, or any mesh that has gone slack across the whole panel, is better replaced. Mesh is inexpensive relative to the time spent fitting it, and a second repair on a tired panel rarely lasts.

Bring the old frame in if you are unsure which beading size you need, or send a photograph of the channel on WhatsApp.`,
  },
  {
    slug: 'which-sliding-window-lock-crescent-touch-domal-maruti',
    title: 'Which Sliding Window Lock: Crescent, Touch, Domal or Maruti?',
    excerpt:
      'Four common aluminium window locks, what each one is actually for, how they differ in security, and when stainless steel is worth paying for.',
    author: AUTHOR,
    date: 'September 10, 2026',
    readTime: '6 min read',
    category: 'Windows',
    image: '/crescent-lock-v1.png',
    qaBlocks: [
      {
        question: 'Which sliding window lock is the most secure?',
        answer:
          'A crescent lock, because it physically draws the two sashes together and holds them under tension rather than simply catching them. A touch lock is more convenient but grips less firmly, and a well-fitted crescent is harder to defeat from outside.',
      },
      {
        question: 'What is a Domal lock and how is it different?',
        answer:
          'A Domal lock is a mortise lock cut specifically for Domal-section sliding windows. It is not interchangeable with locks for other profiles — the section determines the lock, so the profile must be identified before ordering.',
      },
    ],
    content: `The lock has to match the section

Before comparing types, establish what section your window is. Aluminium sliding windows are built from several different profile families, and a lock cut for one will not seat in another. A Domal lock fits a Domal section and nothing else.

If you do not know the section — and most homeowners reasonably do not — the quickest route is a photograph of the existing lock and the meeting stile on WhatsApp. That identifies the family in a minute. Working from "aluminium sliding window" alone is not enough to pick a lock.

Crescent locks

The crescent lock is the small rotating lever on the meeting stile that you turn by hand through roughly ninety degrees. As it rotates, a cam draws the two sashes together and holds them under tension against each other.

That drawing action is the point. It does not just stop the window sliding; it pulls the sashes tight, which closes the gap they meet on. That improves the weather seal as well as the security, and it is why a crescent-locked window usually rattles less in wind.

It is the most secure of the common options because the sashes are held under load rather than merely caught. It is also the most familiar to anyone who has used an aluminium window, which matters more than it sounds for a fitting people operate daily.

Touch locks

A touch lock is spring-loaded. Push the window shut and it latches by itself with no second action.

The convenience is real, particularly on a window that is opened and closed many times a day, or a high one where reaching a lever is awkward. The trade-off is grip: a spring latch catches the sash but does not pull it tight, so the seal is less positive and the window is more likely to rattle. It is also generally the easier of the two to defeat.

Reasonable for an internal or upper-floor window. We would not choose it for a ground-floor window on a street.

Domal locks

Domal locks are mortise locks built for Domal-section windows specifically. They sit into the section rather than surface-mounting, which gives a flush appearance and a solid engagement.

There is nothing to decide here beyond confirming the section: if the window is Domal, this is the lock, and if it is not, this lock will not fit.

Maruti locks

A Maruti lock is a compact side latch used widely on residential window frames. It is small, straightforward and inexpensive, and it is a sensible choice for ordinary domestic windows where a full crescent is more than the opening needs.

Also in the range

T-locks, SA-20, are a T-handle security latch for commercial window sashes, where the larger handle suits heavier or more frequently operated windows.

Air lift locks, SA-23, are for vertical sliding sashes rather than horizontal sliders — a different mechanism for a different motion.

When stainless steel is worth it

Most of these locks are available in both mild steel and stainless steel. Mild steel versions are plated, and the plating is what stands between the metal and the air.

In a dry interior, plated mild steel lasts a long time and the extra cost of stainless is hard to justify. In a bathroom, a kitchen, anywhere with sustained humidity, or in industrial air of the kind found around the Korba and Raigarh plants, that plating eventually fails at a scratch and corrosion works underneath it. In those conditions stainless is the cheaper fitting over the life of the window, because it does not get replaced.

Our stainless options are SA-18 for the straight latch and SA-19 for the L-type.`,
  },
  {
    slug: 'tower-bolt-sizes-4-inch-vs-6-inch',
    title: 'Tower Bolt Sizes: 4-inch vs 6-inch, Light vs Heavy',
    excerpt:
      'Where each tower bolt size belongs, what actually separates a light bolt from a heavy one, and why fitting two per door is standard practice.',
    author: AUTHOR,
    date: 'September 12, 2026',
    readTime: '5 min read',
    category: 'Doors',
    image: '/tower-bolt-v1.png',
    qaBlocks: [
      {
        question: 'Should I use a 4-inch or 6-inch tower bolt?',
        answer:
          'Use a 4-inch bolt on internal and lighter doors, and a 6-inch on main doors and larger leaves. The longer bolt engages deeper into the frame or floor socket, so it resists forcing better and tolerates more movement in the door over time.',
      },
      {
        question: 'Why fit two tower bolts on one door?',
        answer:
          'One at the top and one at the bottom holds the leaf at both ends, which stops it twisting in the frame. A single central bolt leaves both corners free to flex, and on a tall door that is where the weakness is.',
      },
    ],
    content: `What the size actually changes

The nominal size of a tower bolt is the length of its barrel, and what that governs is how far the pin travels into the receiving socket.

A 4-inch bolt shoots a shorter pin. That is fine where the door is light, well fitted and not carrying a security burden — internal doors, bathroom doors, cupboard doors, light shutters.

A 6-inch bolt puts more pin into the socket. Two things follow. It resists forcing better, because more steel sits across the gap between door and frame. And it copes better with doors that have moved, because a deeper socket still engages when the alignment has drifted a few millimetres — which every door does with seasonal humidity.

For a main entrance, an external door, or any tall or heavy leaf, use the 6-inch.

Light versus heavy

Size is length. Light and heavy describe the gauge of the material and the quality of the mechanism, and the two are independent — you can have a heavy 4-inch or a light 6-inch.

A light bolt uses thinner extruded section. The pin is slimmer, the barrel walls are thinner and the mounting plate flexes more under load. It works, and for a bathroom door it works indefinitely.

A heavy bolt uses a thicker barrel and a more substantial pin, and the slide action is usually better damped. On a door that is bolted and unbolted several times a day, that difference shows up as a mechanism that still slides cleanly in five years rather than one that has started to bind.

The gauge matters more than the length for durability. A heavy 4-inch will generally outlast a light 6-inch on the same door.

Our range: SA-35 is a two-piece set in 4-inch and 6-inch, for fitting top and bottom in one purchase. SA-36 is available in light and heavy in both lengths.

Two per door, top and bottom

Standard practice on a main door is one bolt near the top and one near the bottom, which is why SA-35 is sold as a pair.

The reason is torsion, not just strength in numbers. A single bolt in the middle leaves the top and bottom corners free to flex away from the frame. On a tall leaf that flex is substantial, and it is exactly where a door is levered. Bolting both ends holds the whole edge in plane.

Fitting

Get the alignment right before you drive a single screw. Close the door, hold the bolt in position, and slide the pin out to mark precisely where the socket must sit. A socket that is a few millimetres out will force the pin at an angle, and a pin driven at an angle wears the barrel until it jams.

Drill the socket hole slightly deeper than the pin travel so grit and paint cannot stop it seating fully. On a floor socket this matters more than on a frame, because floors collect dust.

If the bolt is going into an aluminium section rather than timber, use self-tapping screws intended for aluminium, not wood screws. A wood screw in thin aluminium strips its thread and the mounting plate works loose.

Finish

Tower bolts are made in aluminium and stainless steel, in the usual plated and coated finishes. In a bathroom, or anywhere with standing humidity, stainless is worth the difference for the same reason it is on a window lock: once the plating on a mild steel bolt is scratched, corrosion runs underneath it and the mechanism stiffens.`,
  },
  {
    slug: 'c-channel-vs-g-channel-sliding-window-tracks',
    title: 'C-Channel vs G-Channel: Which Sliding Track Do You Need?',
    excerpt:
      'The difference between the two common aluminium guide channels, how to tell which one a window already has, and what to do when a track is worn out.',
    author: AUTHOR,
    date: 'September 14, 2026',
    readTime: '5 min read',
    category: 'Windows',
    image: '/c-channel-v1.png',
    qaBlocks: [
      {
        question: 'What is the difference between a C-channel and a G-channel?',
        answer:
          'They are different extruded profiles, named for their cross-section. A C-channel is an open C-shaped guide; a G-channel has an additional return lip that captures the roller more fully. The roller must match the channel — they are not interchangeable.',
      },
      {
        question: 'Can I replace a worn track without replacing the window?',
        answer:
          'Usually yes. The channel is a separate extruded section fitted into the frame, so a worn or bent one can be taken out and replaced while the frame stays in place. Bring an offcut so the profile can be matched exactly.',
      },
    ],
    content: `Two profiles, named for their shape

C-channel and G-channel are both extruded aluminium guide sections that the roller runs in. The names describe the cross-section when you look at a cut end.

A C-channel is an open C: a base with two upstands. The roller sits in the trough and is guided by the sides. It is the simpler section and the more common one in ordinary residential sliding windows.

A G-channel adds a return lip at the top of one or both upstands, so the section reads as a G rather than a C. That lip partly captures the roller from above, which restrains the shutter vertically as well as laterally.

Which one your window has

Look at a cut end, or at the point where the channel stops at the jamb. If the upstands finish square, it is a C. If either turns back inward at the top, it is a G.

If the channel is fully occupied by the shutter and you cannot see the section, take the shutter out. The window has to come out to change a roller anyway, so nothing is lost.

The practical difference

The return lip on a G-channel means the shutter cannot lift out of the track without being deliberately raised and angled. That matters in two situations: on tall shutters that can rock, and where security is a consideration, because a captured shutter is harder to lift clear from outside.

A C-channel is simpler to fit, easier to clean because there is no lip trapping grit, and entirely adequate for an ordinary domestic window. Most houses have C-channels and most houses are correctly specified with them.

Neither is better in the abstract. What is not negotiable is that the roller must match the channel. A roller shaped for a G-channel will not seat properly in a C, and one shaped for a C will not be restrained by a G.

Replacing a worn channel

The channel is a separate section fitted into the frame, not part of the frame itself, so it can be replaced on its own. That is worth knowing, because a worn track is frequently misdiagnosed as a window that needs replacing.

Replace it when the running surface has worn visibly grooved, when the section has been bent or crushed at any point, or when a new roller still runs roughly in a cleaned track. In the last case the track is the remaining variable.

Bring an offcut of the old channel, or the whole section if you can get it out. As with rollers, the profile matters more than the nominal width, and matching a physical sample is the only reliable method — fabricators vary.

Before you replace anything

Clean the track properly first. Brush the channel out, then wipe it with a dry cloth, then run a finger along the running surface. If it is smooth and the roller still drags, the roller is the problem. If you can feel a groove or ridge, the channel is.

Do not grease the track. Grease collects dust and turns into a grinding paste that wears both roller and channel faster than running dry. If a track needs lubrication at all, a dry PTFE or silicone lubricant is the right kind, applied sparingly.`,
  },
  {
    slug: 'floor-spring-vs-door-closer-for-glass-doors',
    title: 'Floor Spring vs Door Closer for Glass Doors',
    excerpt:
      'Why a frameless glass door needs a floor spring rather than an overhead closer, what patch fittings do, and why this decision has to be made before the floor is laid.',
    author: AUTHOR,
    date: 'September 16, 2026',
    readTime: '6 min read',
    category: 'Doors',
    image: '/floor-machine-v1.png',
    qaBlocks: [
      {
        question: 'Do I need a floor spring or a door closer for a glass door?',
        answer:
          'A frameless glass door needs a floor spring. There is no frame to mount an overhead closer arm to, and the load has to be carried at the pivot, so the mechanism goes into the floor with patch fittings transferring the load at the top and bottom corners.',
      },
      {
        question: 'When does the floor spring have to be decided?',
        answer:
          'Before the floor is finished. A floor spring is set into a cavity cut into the slab and levelled flush with the finished floor. Retrofitting one into a laid floor means cutting it open, so the decision belongs in the planning stage.',
      },
    ],
    content: `The constraint is that there is no frame

An overhead door closer needs two mounting points: the door leaf and the frame above it. It works by linking them with an arm.

A frameless glass door has neither. The glass cannot be drilled after tempering and there is no head frame to fix an arm to. So the whole approach has to change: instead of controlling the door from above, the mechanism sits below it, at the pivot.

That mechanism is the floor spring — SA-45 in our range, sometimes called a floor machine. It is a hydraulic unit housed in a steel case set into the floor. The door pivots on it, and the same unit both carries the door's weight and damps its closing.

Patch fittings

The floor spring does not grip the glass directly. Patch fittings do that.

A patch fitting is a metal clamp that grips the glass at a corner and provides the pivot point. A bottom patch connects the glass to the floor spring spindle; a top patch takes the corresponding pivot at the head. Together they transfer the door's weight into the floor spring rather than into the glass edge.

This is why a shower hinge cannot substitute. A shower hinge carries a light door from a wall or an adjacent panel. A patch fitting plus floor spring carries a full-height entrance door pivoting about a fixed axis, and the loads are not comparable.

Centre and patch locks — SA-70 and SA-71 in our range — are the corresponding locking fittings for a glass door, since there is no stile to take a conventional lock.

Decide before the floor goes down

This is the part that costs money when it is missed.

The floor spring sits in a cavity cut into the slab, levelled so the cover plate finishes flush with the finished floor. Getting that flush requires knowing the finished floor level, which means the unit is positioned during flooring work, not after.

Retrofitting a floor spring into a finished floor means cutting the floor open, fitting the case, making good, and matching the finish around it. On tile or stone, matching is rarely invisible.

If a frameless glass door is anywhere in the drawings, flag the floor spring at planning. The same applies to drainage around it: a floor spring case sitting in a wet area needs the surrounding floor to fall away from it, not toward it.

Where an overhead closer is still right

Overhead closers remain correct for framed doors, which is most doors. A timber, aluminium-framed or steel door with a head frame takes an overhead closer, and there is no reason to go into the floor.

Within that, size by the door as covered in our guide to door closer sizing: the width and weight of the leaf set the power required, and a pencil closer belongs on light mesh and screen doors rather than anything structural.

A framed glass door — glass in an aluminium frame — is a framed door for this purpose. It takes an overhead closer like any other. The floor spring question only arises when the glass is genuinely frameless.

Maintenance

Floor springs are hydraulic and their seals are consumable. A unit that has started to leak, or a door that has become slow to latch, is usually a seal or fluid issue rather than a failed door.

Because the unit sits in the floor, it collects whatever the floor collects. Keep the cover plate clear and get water away from it. In a shopfront entrance, where the door is cycled constantly and the floor is mopped daily, that attention is what determines whether the unit lasts years or months.`,
  },
];
