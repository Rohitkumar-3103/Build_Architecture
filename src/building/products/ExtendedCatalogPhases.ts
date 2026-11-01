import * as THREE from 'three';
import { ConstructionPhase, CalloutAnnotation } from '../../types';
import { VoiceStepScript } from '../../audio/VoiceNarrationEngine';

// Generates authentic, project-specific 8-stage construction milestones for all 20 architectures
export function getPhasesForProduct(productId: string): ConstructionPhase[] {
  switch (productId) {
    case 'highrise':
      return [
        {
          id: 0,
          title: 'Deep Slurry Wall & Bedrock Datum',
          subtitle: 'Groundwork & Perimeter Cut-Off Wall',
          description: 'Hydrofraise trench cutter excavates 28m perimeter slurry walls to bedrock, establishing the urban datum zero zero.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Deep Foundation Engineering',
          safetyProtocol: 'Groundwater table monitoring & trench stability sensors',
          toolsRequired: ['Hydrofraise Trench Cutter', 'Bentonite Desander Plant', 'Total Station'],
          materialsRequired: ['Reinforced Concrete Slurry', 'Bentonite Polymer Slurry', 'Rock Dowels'],
          daysEstimate: 45
        },
        {
          id: 1,
          title: 'Mass Mat Foundation & Caissons',
          subtitle: '2.5m Raft Slab & Bored Piles',
          description: 'Continuous 48-hour continuous pour of 3,800m³ high-strength C50/60 concrete raft foundation over 32 bedrock caissons.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Mass Concrete Placement',
          safetyProtocol: 'Hydration heat thermal thermocouple monitoring (< 70°C)',
          toolsRequired: ['Twin Boom Pumps', 'Chilled Water Plant', 'Concrete Vibrator Battery'],
          materialsRequired: ['C50/60 Low-Heat Concrete', 'B500C 32mm High-Yield Rebar'],
          daysEstimate: 30
        },
        {
          id: 2,
          title: 'Structural Steel Perimeter Diagrid',
          subtitle: 'Tube-in-Tube Core & Mega-Columns',
          description: 'Erection of heavy tubular steel perimeter diagrid nodes and reinforced concrete shear core climbing formwork.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Highrise Structural Steel Rigging',
          safetyProtocol: 'Perimeter wind screen barriers and 100% harness tie-off',
          toolsRequired: ['Self-Climbing Tower Cranes (64T)', 'Ultrasonic Weld Testers'],
          materialsRequired: ['ASTM A913 Grade 65 Steel Nodes', 'A490 High-Strength Bolts'],
          daysEstimate: 90
        },
        {
          id: 3,
          title: 'Composite Metal Deck Floor Slabs',
          subtitle: 'Post-Tensioned Slabs & Diaphragms',
          description: 'Pouring lightweight composite concrete floor slabs over corrugated steel decking across 42 occupied tower levels.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Composite Decking',
          safetyProtocol: 'Perimeter toe-boards and safety catch net installations',
          toolsRequired: ['Placing Boom', 'Laser Screed', 'Stud Welding Guns'],
          materialsRequired: ['Galvanized Decking Sheet', 'Shear Studs', 'Lightweight C30/37'],
          daysEstimate: 60
        },
        {
          id: 4,
          title: 'Unitized Double-Skin Curtain Wall',
          subtitle: 'Thermally Broken Aerodynamic Skin',
          description: 'Craning pre-fabricated unitized glazed panels with motorized louvers, delivering high thermal acoustic attenuation.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Façade Engineering',
          safetyProtocol: 'Dual-circuit vacuum lifters & wind threshold speed < 18 kts',
          toolsRequired: ['Floor-Mounted Monorail Crane', 'Glass Suction Lifter'],
          materialsRequired: ['Triple Low-E Glass Units', 'Extruded Anodized Mullions'],
          daysEstimate: 75
        },
        {
          id: 5,
          title: 'Commercial Fit-Out & MEP Core',
          subtitle: 'Elevator Banks & Raised Flooring',
          description: 'Installation of 8.0 m/s destination-dispatch elevator banks, raised access flooring, and variable air volume HVAC.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Vertical Transportation & MEP',
          safetyProtocol: 'Shaft fall arrest systems and laser plumb alignment',
          toolsRequired: ['Shaft Hoist Rig', 'Laser Plumb Aligners', 'Air Balancing Hoods'],
          materialsRequired: ['Raised Access Floor Tiles', 'Galvanized Spiral Ductwork'],
          daysEstimate: 80
        },
        {
          id: 6,
          title: 'Aerodynamic Crown & Mass Damper',
          subtitle: 'Tuned Mass Damper & BMU Cranes',
          description: 'Lifting the 400-ton pendulum Tuned Mass Damper on level 41, aerodynamic architectural spire, and facade BMU cradles.',
          badge: 'PHASE 07 // CROWN & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Specialist Mechanical Dynamics',
          safetyProtocol: 'Helicopter and heavy crane coordinated airspace zoning',
          toolsRequired: ['Heavy Derrick Crane', 'Hydraulic Tension Jacks'],
          materialsRequired: ['400T Steel Pendulum Mass', 'Viscous Fluid Dampers'],
          daysEstimate: 35
        },
        {
          id: 7,
          title: 'Civic Plaza & Water Cascades',
          subtitle: 'Polished Basalt Paving & Public Realm',
          description: 'Laying flame-finished basalt stone paving, reflecting pools with aerated cascades, and perimeter hostile vehicle mitigation bollards.',
          badge: 'PHASE 08 // CIVIC FINISHES',
          durationSeconds: 7,
          tradeSpecialty: 'Civil Urban Realm',
          safetyProtocol: 'Public pedestrian hoarding and dust suppression misting',
          toolsRequired: ['Vacuum Slab Lifter', 'Stone Diamond Bridge Saws'],
          materialsRequired: ['Flamed Basalt Paving Slabs', 'Submersible Cascade Pumps'],
          daysEstimate: 25
        }
      ];

    case 'museum':
      return [
        {
          id: 0,
          title: 'Deep Seismic Isolation Basin',
          subtitle: 'Excavation & Sump Trench Network',
          description: 'Precision bulk excavation for the subterranean seismic isolation moat and high-capacity drainage sump retention pits.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Seismic Geotechnical Engineering',
          safetyProtocol: 'Slope inclinometer telemetry and ground movement anchors',
          toolsRequired: ['35-Ton Hydraulic Excavator', 'Submersible Dewatering Pumps'],
          materialsRequired: ['Geotextile Liner', 'Clean Crushed Basalt Bedding'],
          daysEstimate: 40
        },
        {
          id: 1,
          title: 'Lead-Rubber Bearing Footings',
          subtitle: 'Base Isolator Plinths & Heavy Rebar',
          description: 'Casting massive reinforced concrete anchor pedestals and mounting dynamic lead-rubber elastomeric seismic isolator bearings.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Seismic Base Isolation',
          safetyProtocol: 'Micro-inch tolerance optical leveling inspection',
          toolsRequired: ['Optical Collimator', 'Hydraulic Isolator Torque Wrench'],
          materialsRequired: ['Lead-Rubber Seismic Bearings', 'Self-Consolidating Concrete'],
          daysEstimate: 35
        },
        {
          id: 2,
          title: 'Board-Formed Monolithic Concrete Shear Pylons',
          subtitle: 'Architectural Rough-Sawn Pine Formwork',
          description: 'Pouring towering monolithic shear walls with rough-sawn Douglas Fir board forms to impart deep organic wood grain into grey concrete.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Architectural Exposed Concrete',
          safetyProtocol: 'Formwork hydrostatic lateral pressure sensors',
          toolsRequired: ['Doka Climbing Formwork', 'High-Frequency Form Vibrators'],
          materialsRequired: ['Rough-Sawn Pine Planks', 'Architectural Type I/II Cement'],
          daysEstimate: 70
        },
        {
          id: 3,
          title: 'Cantilevered Museum Gallery Bridge Slab',
          subtitle: 'Post-Tensioned 12m Heroic Overhang',
          description: 'Stressing internal 7-strand steel post-tension cables within the 12-meter cantilevered exhibition gallery bridge deck.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Post-Tensioned Concrete',
          safetyProtocol: 'Tension jack blowout protection blast shielding',
          toolsRequired: ['Multistrand Hydraulic Stressing Jack', 'Grout Injection Plant'],
          materialsRequired: ['1860 MPa High-Tensile PT Strands', 'Corrosion Inhibiting Grout'],
          daysEstimate: 45
        },
        {
          id: 4,
          title: 'Zenithal Slit Glass & Structural Glazing',
          subtitle: 'Indirect North Light Lightwells',
          description: 'Installing deep-recessed museum-grade UV-filtering structural glass within towering vertical concrete light canyons.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Art Glazing',
          safetyProtocol: 'Glass vacuum lifter redundant dual-chamber vacuum checks',
          toolsRequired: ['Spider Glazing Crane', 'Structural Silicone Extrusion Gun'],
          materialsRequired: ['100% UV-Blocking Laminated Glass', 'Dow Corning 995 Sealant'],
          daysEstimate: 35
        },
        {
          id: 5,
          title: 'Acoustic Gallery Fit-Out & Micro-Topping',
          subtitle: 'Seamless Micro-Cement Floors & Baffles',
          description: 'Laying seamless polished micro-cement floors, acoustic stretched fabric ceilings, and museum LED framing projectors.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Museum Exhibition Fit-Out',
          safetyProtocol: 'Particulate HEPA filtration and climate conditioning',
          toolsRequired: ['Ride-On Power Trowel', 'Laser Alignment Track Gauge'],
          materialsRequired: ['Polymer Micro-Cement', 'Basotect Acoustic Foam Panels'],
          daysEstimate: 50
        },
        {
          id: 6,
          title: 'Deep Coffered Concrete Roof & Skylight Baffles',
          subtitle: 'Waffle-Grid Concrete Roof Slab',
          description: 'Stripping waffle forms to reveal deeply coffered concrete roof bays with motorized daylight baffles for climate-sensitive artwork.',
          badge: 'PHASE 07 // ROOF & CANOPY',
          durationSeconds: 8,
          tradeSpecialty: 'Specialist Formwork & Automation',
          safetyProtocol: 'Roof edge static perimeter lines & fall arrest nets',
          toolsRequired: ['Fiberglass Waffle Moulds', 'Linear Actuator Calibrator'],
          materialsRequired: ['C40/50 Light-Grey Concrete', 'Motorized Aluminum Baffles'],
          daysEstimate: 40
        },
        {
          id: 7,
          title: 'Basalt Stone Sculpture Garden & Reflecting Basin',
          subtitle: 'Minimalist Water Mirror & Crushed Slate',
          description: 'Carving a 28-meter obsidian reflecting pool with submerged zero-edge weirs and placing monumental raw basalt stone sculptures.',
          badge: 'PHASE 08 // SCULPTURE REALM',
          durationSeconds: 7,
          tradeSpecialty: 'Landscape Architecture & Masonry',
          safetyProtocol: 'Crane load rigging certification for 14-ton monolithic boulders',
          toolsRequired: ['50-Ton Mobile Crane', 'Stone Diamond Wire Saw'],
          materialsRequired: ['Basalt Monolith Blocks', 'Black Volcanic River Pebble'],
          daysEstimate: 20
        }
      ];

    case 'arena':
      return [
        {
          id: 0,
          title: 'Amphitheater Bowl Earthwork & Micro-Piles',
          subtitle: 'Elliptical Bowl Excavation & Drainage',
          description: 'Excavation of elliptical sunken bowl seating topography and driving steel micropiles down to bedrock anchors.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Civil & Geo-Structural',
          safetyProtocol: 'Underground utility laser detection and vibration monitors',
          toolsRequired: ['GPS-Guided Bulldozer', 'Track-Mounted Rotary Piling Rig'],
          materialsRequired: ['Corrugated Sub-Drain Pipes', 'High-Strength Micro-Piles'],
          daysEstimate: 35
        },
        {
          id: 1,
          title: 'Cast-in-Place Concrete Thrust Ring',
          subtitle: 'Post-Tensioned Oval Compression Buttress',
          description: 'Pouring the heavy perimeter concrete compression ring beam designed to anchor and resist the outward arching timber thrust.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Heavy Civil Concrete',
          safetyProtocol: 'Tension strand tendon elongation calibration checks',
          toolsRequired: ['Concrete Boom Pump (42m)', 'Multistrand Jack'],
          materialsRequired: ['High-Strength Concrete C45/55', 'Low-Relaxation PT Tendons'],
          daysEstimate: 40
        },
        {
          id: 2,
          title: 'Parametric Glulam Double-Curved Rib Arches',
          subtitle: '5-Axis CNC Engineered Timber Skeleton',
          description: 'Erecting 36 sweeping curved glued-laminated timber arches joined with high-strength concealed steel node shoes.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Mass Timber Rigging',
          safetyProtocol: 'Temporary shoring falsework monitoring & wind gust locks',
          toolsRequired: ['Twin Mobile Lattice Cranes (100T)', 'Torque Multiplier'],
          materialsRequired: ['Nordic Spruce GL32h Glulam', 'Galvanized Cast Node Connectors'],
          daysEstimate: 60
        },
        {
          id: 3,
          title: 'Precast Tiered Grandstand Slabs',
          subtitle: 'Acoustically Isolated Seating Rakers',
          description: 'Craning modular precast L-shaped concrete seating bleachers onto elastomer pads for acoustic decoupling and crowd vibration safety.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Precast Architectural Concrete',
          safetyProtocol: 'Positive mechanical locking dog clamps on all rakers',
          toolsRequired: ['Telescopic Crawler Crane', 'Elastomer Pad Shims'],
          materialsRequired: ['Precast High-Density Seating Units', 'Neoprene Bearing Strips'],
          daysEstimate: 45
        },
        {
          id: 4,
          title: 'Translucent ETFE Membrane & Shading Louvers',
          subtitle: 'Double-Skin Aerodynamic Gridshell Cladding',
          description: 'Stretching translucent high-transmission ETFE foil panels across the timber gridshell with motorized solar sunshade louvers.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Tensile Facades',
          safetyProtocol: 'Rope-access IRATA technicians and fall arrest lanyards',
          toolsRequired: ['ETFE Pneumatic Tensioners', 'Hot-Air Extrusion Welders'],
          materialsRequired: ['UV-Stabilized ETFE Foil', 'Anodized Aluminum Clamping Rails'],
          daysEstimate: 40
        },
        {
          id: 5,
          title: 'Acoustic Shell Interior, VIP Suites & Rigging',
          subtitle: 'Perforated Acoustic Timber & Rigging Catwalks',
          description: 'Installing curved micro-perforated acoustic timber paneling, central performance sound grid, and lighting catwalk trusses.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Concert Hall Acoustics & Theatrical Rigging',
          safetyProtocol: 'Catwalk overhead load-rating proof tests and lifeline rails',
          toolsRequired: ['Electric Scissor Lifts', 'Laser Audio Decibel Analyzer'],
          materialsRequired: ['Micro-Perforated Acoustic Veneer', 'Steel Box Rigging Catwalks'],
          daysEstimate: 50
        },
        {
          id: 6,
          title: 'Standing Seam Zinc Ribbed Shell Roof',
          subtitle: 'Titanium-Zinc Weatherproof Outer Vault',
          description: 'Rolling continuous seam dark anthracite titanium-zinc standing seam roofing across the compound curved shell canopy.',
          badge: 'PHASE 07 // ROOF & CANOPY',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Sheet Metal',
          safetyProtocol: 'Full roof harness static line safety harness system',
          toolsRequired: ['On-Site Roll Former', 'Double-Lock Seaming Machine'],
          materialsRequired: ['Anthracite Titanium Zinc Coils', 'Breathable Underlayment'],
          daysEstimate: 35
        },
        {
          id: 7,
          title: 'Concourse Paving, Turnstiles & LED Inground Wayfinding',
          subtitle: '34m Circular Civic Concourse & Security',
          description: 'Laying exposed aggregate pedestrian concourse paving, smart biometric access turnstiles, and dynamic programmable LED inground lighting strips.',
          badge: 'PHASE 08 // CONCOURSE & FINISHES',
          durationSeconds: 7,
          tradeSpecialty: 'Civic Infrastructure & Security',
          safetyProtocol: 'Electrical safety IP67 wet location testing',
          toolsRequired: ['Ride-On Floor Grinder', 'Cable Trench Cutters'],
          materialsRequired: ['Polished Exposed Aggregate', 'Smart Turnstile Portals'],
          daysEstimate: 20
        }
      ];

    case 'rammedearth':
      return [
        {
          id: 0,
          title: 'Desert Dune Grading & Caliche Bedrock Anchoring',
          subtitle: 'Lime-Stabilized Subsoil Earthwork',
          description: 'Laser grading desert sand and sub-base caliche, stabilizing excavation floor with hydrated lime and geotextile containment mesh.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Arid Civil Engineering',
          safetyProtocol: 'Dust mitigation sprayers and desert hydration station protocols',
          toolsRequired: ['Laser Scraper Grader', 'Vibratory Soil Compactor'],
          materialsRequired: ['Hydrated Lime', 'Woven Polypropylene Geotextile'],
          daysEstimate: 20
        },
        {
          id: 1,
          title: 'Insulated Concrete Stem Wall & Slab Trench',
          subtitle: 'Thermal Break Barrier Foundation',
          description: 'Pouring high-strength concrete stem walls lined with 100mm rigid XPS insulation to thermally isolate walls from desert ground heat.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Thermal Foundation Construction',
          safetyProtocol: 'Rebar safety impalement caps and deep trench shoring',
          toolsRequired: ['Concrete Transit Mixer', 'High-Frequency Pencil Vibrator'],
          materialsRequired: ['C30/37 Concrete', 'XPS Foam Insulation Board (R-20)'],
          daysEstimate: 25
        },
        {
          id: 2,
          title: '600mm Stabilized Rammed Earth Thermal Mass Walls',
          subtitle: 'Pneumatically Compacted Layered Soil Strata',
          description: 'Blending regional sand, clay, and 6% cement stabilizer into layered wooden formwork, rammed pneumatically in 150mm dynamic lifts.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Master Rammed Earth Artisans',
          safetyProtocol: 'Formwork heavy tie-rod tension verification & scaffold railings',
          toolsRequired: ['Pneumatic Backfill Tampers', 'Heavy Steel Plywood Formwork'],
          materialsRequired: ['Sub-Desert Clay & Aggregate', 'White Portland Cement (6%)'],
          daysEstimate: 45
        },
        {
          id: 3,
          title: 'Polished Colored Ochre Concrete Ground Floor',
          subtitle: 'Hydronic Radiant Subfloor Cooling Grid',
          description: 'Casting smooth monolithic concrete floor infused with natural desert ochre iron oxides, embedding PEX hydronic cooling tubes.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Concrete Floors',
          safetyProtocol: 'Pressure test hydronic loop lines at 100 psi before pour',
          toolsRequired: ['Laser Screed', 'Walk-Behind Power Trowel'],
          materialsRequired: ['Natural Red Ochre Pigment', 'PEX-A Radiant Oxygen Barrier Tubing'],
          daysEstimate: 20
        },
        {
          id: 4,
          title: 'Deep-Set Corten Steel Framed Pocket Glazing',
          subtitle: 'Solar Heat-Gain Optimized Low-E Glass',
          description: 'Mounting insulated low-E structural glazing recessed 400mm inside rammed earth reveals with weathered Cor-Ten steel lintels.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Specialist Architectural Glazing',
          safetyProtocol: 'Heavy glass suction lifters with redundant fall protection',
          toolsRequired: ['Mini Spider Crane', 'Silicone Weatherproofing Guns'],
          materialsRequired: ['Solar Control Low-E Glass (SHGC 0.22)', 'Pre-Oxidized Corten Lintels'],
          daysEstimate: 25
        },
        {
          id: 5,
          title: 'Mesquite Timber Joinery, Built-in Adobe Seating & Hearth',
          subtitle: 'Handcrafted Desert Woodwork & Chimney',
          description: 'Crafting custom native mesquite cabinetry, integrated earthen adobe lounge banquettes, and blackened steel hearth chimney.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Millwork & Adobe Masonry',
          safetyProtocol: 'Wood dust HEPA extraction and fire-rated hearth insulation',
          toolsRequired: ['Festool Track Saw', 'Laser Measurement Scanner'],
          materialsRequired: ['Kiln-Dried Desert Mesquite Slabs', 'Earthen Plaster & Adobe Bricks'],
          daysEstimate: 30
        },
        {
          id: 6,
          title: 'Oversailing Cor-Ten Steel Sunshade Parasol Canopy',
          subtitle: '3-Meter Perimeter Passive Shading Overhang',
          description: 'Welding structural Cor-Ten steel roof fascia with 3-meter cantilevered eaves that completely shade rammed earth walls during peak summer sun.',
          badge: 'PHASE 07 // ROOF & OVERHANG',
          durationSeconds: 8,
          tradeSpecialty: 'Structural Steel & Roofing',
          safetyProtocol: 'Roof edge static lifeline cable and welding flash shields',
          toolsRequired: ['MIG Inverter Welder', 'Hydraulic Mobile Crane (30T)'],
          materialsRequired: ['Corten A588 Structural Beams', 'Reflective TPO Membrane (SRI 104)'],
          daysEstimate: 25
        },
        {
          id: 7,
          title: 'Xeriscape Cactus Garden & Corten Fire Pit Patio',
          subtitle: 'Saguaro, Agave, Crushed Granite Gravel & Lighting',
          description: 'Sculpting xeriscape desert garden with mature Saguaro specimens, agave plantings, decomposed granite pathways, and recessed 2400K night uplights.',
          badge: 'PHASE 08 // XERISCAPE FINISHES',
          durationSeconds: 8,
          tradeSpecialty: 'Arid Landscape Design',
          safetyProtocol: 'Heavy specimen cactus rigging straps',
          toolsRequired: ['Landscape Loader', 'Drip Line Crimpers'],
          materialsRequired: ['Mature Saguaro Cacti', 'Decomposed Gold Granite Gravel'],
          daysEstimate: 15
        }
      ];

    case 'flothabitat':
      return [
        {
          id: 0,
          title: 'Ocean Water Datum & Seabed Mooring Clumps',
          subtitle: 'Subsea Deadweight Anchors & Synthetic Lines',
          description: 'Setting 12-ton reinforced concrete seabed clump anchors and tensioned ultra-high-molecular-weight polyethylene synthetic mooring tethers.',
          badge: 'PHASE 01 // SEABED & MOORING',
          durationSeconds: 7,
          tradeSpecialty: 'Marine Off-Shore Engineering',
          safetyProtocol: 'Acoustic seabed telemetry and subsea diver communication',
          toolsRequired: ['Anchor Handling Tug', 'Subsea Acoustic Transponder'],
          materialsRequired: ['12T Concrete Clump Anchors', 'Dyneema Synthetic Mooring Lines'],
          daysEstimate: 25
        },
        {
          id: 1,
          title: 'Twin Reinforced Buoyancy Pontoons',
          subtitle: 'Submerged Multi-Chamber Ballast Tanks',
          description: 'Towing and submerging dual marine-grade 16m cylindrical buoyancy pontoons with computer-controlled pneumatic trim ballast chambers.',
          badge: 'PHASE 02 // SUBMERGED PONTOONS',
          durationSeconds: 8,
          tradeSpecialty: 'Naval Architecture & Marine Hull',
          safetyProtocol: 'Multi-compartment hydrostatic water-tightness pressure tests',
          toolsRequired: ['High-Volume Ballast Pumps', 'Ultrasonic Hull Thickness Gauge'],
          materialsRequired: ['5083 Marine Aluminum Alloy', 'Sacrificial Zinc Anodes'],
          daysEstimate: 30
        },
        {
          id: 2,
          title: 'Marine-Grade 316 Stainless Tubular Spaceframe',
          subtitle: 'Dynamic Wave Shear & Articulated Nodes',
          description: 'Erecting tubular 316L stainless steel spaceframe trusses connecting the twin pontoons to absorb dynamic swell and rotational shear stresses.',
          badge: 'PHASE 03 // SPACEFRAME HULL',
          durationSeconds: 9,
          tradeSpecialty: 'Marine Structural Steel Rigging',
          safetyProtocol: '100% harness tie-off and marine auto-inflatable life vests',
          toolsRequired: ['Floating Barge Crane (50T)', 'Orbital TIG Pipe Welder'],
          materialsRequired: ['316L Stainless Steel Tubing', 'High-Yield Marine Pivot Pins'],
          daysEstimate: 40
        },
        {
          id: 3,
          title: 'Composite Honeycomb Research Platform Deck',
          subtitle: 'Lightweight Carbon-Fiber & Teak Sub-Level',
          description: 'Laying vacuum-infused epoxy honeycomb composite structural floor decking, surfaced with quarter-sawn reclaimed Burmese teak planks.',
          badge: 'PHASE 04 // MAIN DECK SLAB',
          durationSeconds: 8,
          tradeSpecialty: 'Advanced Composites & Marine Decking',
          safetyProtocol: 'Vacuum bag resin leak detection and slip-resistant footwear',
          toolsRequired: ['Vacuum Infusion Pump', 'Pneumatic Teak Caulking Gun'],
          materialsRequired: ['Kevlar/Carbon Honeycomb Panels', 'Marine Teak Caulking Compound'],
          daysEstimate: 30
        },
        {
          id: 4,
          title: 'Panoramic 360° Saltwater Acrylic Glazing',
          subtitle: 'Pressure-Rated Monolithic Acrylic Cylinder',
          description: 'Hoisting 60mm optically pure cylindrical thermoformed acrylic panels engineered to withstand 6-meter rogue ocean waves and saltwater corrosion.',
          badge: 'PHASE 05 // OBSERVATION ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Deep-Sea Acrylic Engineering',
          safetyProtocol: 'Dual-circuit vacuum spreader beam and scratch-protection film',
          toolsRequired: ['Hydraulic Spider Spreader Crane', 'Elastomeric Gasket Press'],
          materialsRequired: ['Cast Polymethyl Methacrylate (PMMA)', 'Structural EPDM Gaskets'],
          daysEstimate: 35
        },
        {
          id: 5,
          title: 'Marine Biology Lab, Desalination Core & Berths',
          subtitle: 'Wet Lab Equipment, Reverse Osmosis & Quarters',
          description: 'Installing seawater reverse-osmosis desalination units, scientific wet laboratory workstations, acoustic sleeping berths, and DC power battery banks.',
          badge: 'PHASE 06 // LAB CORE & BERTHS',
          durationSeconds: 8,
          tradeSpecialty: 'Marine Life Support Systems & MEP',
          safetyProtocol: 'Halon-free aerosol fire suppression checks and battery ventilation',
          toolsRequired: ['Pipe Flaring Tool', 'Diagnostic Oscilloscope'],
          materialsRequired: ['Reverse-Osmosis Membranes', 'Lithium Iron Phosphate Battery Racks'],
          daysEstimate: 40
        },
        {
          id: 6,
          title: 'Upper Geodesic Skylight Dome, Solar Ring & Antenna',
          subtitle: 'Photovoltaic Array Ring & Satellite Radome',
          description: 'Assembling the lightweight geodesic apex observation dome, 18kW perimeter bifacial solar ring, and satellite meteorological tracking mast.',
          badge: 'PHASE 07 // SOLAR DOME & MAST',
          durationSeconds: 8,
          tradeSpecialty: 'Marine Renewable Energy & Telemetry',
          safetyProtocol: 'Mast static safety harness and radiofrequency radiation interlocks',
          toolsRequired: ['Torque Wrench Calibration Set', 'Solar Array IV-Curve Tracer'],
          materialsRequired: ['Marine Bifacial Solar Modules', 'Carbon-Fiber Communications Radome'],
          daysEstimate: 25
        },
        {
          id: 7,
          title: 'Floating Timber Dock, Wave Dissipators & Nav LEDs',
          subtitle: 'Articulated Gangway, Mooring Cleats & Perimeter',
          description: 'Connecting heavy articulated timber finger piers, pneumatic wave dissipators, stainless mooring bollards, and solar marine navigational beacons.',
          badge: 'PHASE 08 // DOCK & NAV FINISHES',
          durationSeconds: 7,
          tradeSpecialty: 'Marine Harbor Infrastructure',
          safetyProtocol: 'Overwater rescue safety gear and tide range checks',
          toolsRequired: ['Marine Impact Driver', 'Floatation Pin Alignment Jigs'],
          materialsRequired: ['Marine Greenheart Timber', 'Solar LED Flashing Buoy Beacons'],
          daysEstimate: 20
        }
      ];

    case 'origami':
      return [
        {
          id: 0,
          title: 'Raked Karesansui Zen Gravel Bed & Contouring',
          subtitle: 'Dry Landscape Topography & Drainage Trench',
          description: 'Laser grading pristine quartz sand garden, installing perforated French drainage channels, and setting granite survey boundary markers.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 6,
          tradeSpecialty: 'Japanese Zen Garden Architecture',
          safetyProtocol: 'Ground vibration monitoring and root preservation around specimen trees',
          toolsRequired: ['Laser Mini-Grader', 'Traditional Wooden Rake Battery'],
          materialsRequired: ['Shirakawa White Quartz Gravel', 'Perforated Clay Drainage Pipes'],
          daysEstimate: 15
        },
        {
          id: 1,
          title: 'Discrete Granite Pad Stones & Stilt Footings',
          subtitle: 'Ishibatate Unanchored Pad Stone Matrix',
          description: 'Positioning natural hand-hewn granite boulders into sub-base beds to form seismic-absorbing Ishibatate unanchored column pads.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 7,
          tradeSpecialty: 'Traditional Japanese Masonry',
          safetyProtocol: 'Spirit level optical multi-axis alignment verification',
          toolsRequired: ['Stone Mason Chisels', 'Laser Plumb Datum'],
          materialsRequired: ['Dressed Mikage Granite Boulders', 'Compacted Aggregate Pillows'],
          daysEstimate: 20
        },
        {
          id: 2,
          title: 'Traditional Hinoki Post-and-Beam Mortise Frame',
          subtitle: 'Interlocking Mortise and Tenon Carpentry',
          description: 'Erecting 120-year Japanese Hinoki cypress columns and Japanese cedar beams joined exclusively with Kanawa-tsugi wooden locking joinery.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Master Sukiya-Daiku Carpentry',
          safetyProtocol: 'Zero metal fastener structural integrity verification and soft slings',
          toolsRequired: ['Japanese Hand Pull Saws (Nokogiri)', 'Wood Mallets (Kizuchi)'],
          materialsRequired: ['Aged Hinoki Cypress Timbers', 'Keyaki Hardwood Locking Pegs'],
          daysEstimate: 50
        },
        {
          id: 3,
          title: 'Raised Cedar Engawa Veranda & Tatami Subfloor',
          subtitle: 'Cantilevered Wraparound Timber Porch',
          description: 'Installing elevated cedar Engawa veranda framing floating 500mm above the gravel garden, with tongued cypress subfloor planks.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Precision Architectural Joinery',
          safetyProtocol: 'Perimeter temporary guardrails during deck installation',
          toolsRequired: ['Japanese Hand Planes (Kanna)', 'Precision Mitre Saws'],
          materialsRequired: ['Red Cedar Engawa Planks', 'Vapor-Permeable Floor Mats'],
          daysEstimate: 25
        },
        {
          id: 4,
          title: 'Translucent Shoji Screen Wall & Yakisugi Slats',
          subtitle: 'Sliding Washi Paper Screens & Charred Cedar',
          description: 'Fitting precision sliding Shoji latticed cedar frames with water-resistant Washi paper and exterior fire-treated Yakisugi charred louvers.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Shoji & Traditional Envelope Artisans',
          safetyProtocol: 'Careful handling of delicate mulberry paper panels',
          toolsRequired: ['Track Alignment Router', 'Washi Tension Spray Applicator'],
          materialsRequired: ['Handmade Kozo Washi Paper', 'Yakisugi Charred Wood Louvers'],
          daysEstimate: 30
        },
        {
          id: 5,
          title: 'Rush-Grass Tatami Flooring, Tokonoma & Hearth',
          subtitle: 'Igusa Straw Mats & Minimalist Tea Alcove',
          description: 'Laying 100% organic Igusa rush-grass tatami mats, crafting the recessed Tokonoma display alcove, and installing sunken Ro charcoal tea hearth.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Tatami Master Craft & Tea House Design',
          safetyProtocol: 'Zero volatile organic compound (VOC) adhesive certification',
          toolsRequired: ['Tatami Edge Needle Tool', 'Traditional Wood Clamps'],
          materialsRequired: ['Natural Igusa Tatami Mats', 'Kyoto Clay Wall Mud (Juraku-tsuchi)'],
          daysEstimate: 30
        },
        {
          id: 6,
          title: 'Faceted Dark Zinc Origami Folded Roof Planes',
          subtitle: 'Asymmetric Standing Seam Folded Planes',
          description: 'Fabricating complex geometric folded standing seam titanium zinc roof sheets, creating sharp origami silhouettes with zero gutters.',
          badge: 'PHASE 07 // ORIGAMI ROOF',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Sheet Metal Origami',
          safetyProtocol: 'Steep pitch fall arrest harnesses and non-marking roof boots',
          toolsRequired: ['Sheet Metal Folder Benders', 'Double-Lock Seaming Pliers'],
          materialsRequired: ['Anthracite Titanium-Zinc Sheets', 'Structural Acoustic Underlayment'],
          daysEstimate: 35
        },
        {
          id: 7,
          title: 'Tsukubai Water Basin, Japanese Maple & Rocks',
          subtitle: 'Carved Granite Stone Basin & Specimen Flora',
          description: 'Placing natural hand-carved Tsukubai water basin with bamboo Kakehi spout, 40-year Acer palmatum maple, and stepping garden stones.',
          badge: 'PHASE 08 // ZEN GARDEN FINISHES',
          durationSeconds: 7,
          tradeSpecialty: 'Zen Landscape Gardening',
          safetyProtocol: 'Soft nylon rigging for ancient moss-covered specimen trees',
          toolsRequired: ['Mini Excavator with Crane Jib', 'Bamboo Joint Knot Tools'],
          materialsRequired: ['Ancient Carved Granite Basin', '40-Year Japanese Red Maple'],
          daysEstimate: 15
        }
      ];

    case 'verticalforest':
      return [
        {
          id: 0,
          title: 'Urban Caisson Excavation & Basement Retaining',
          subtitle: 'Hydro-Fraise Retaining Wall & Soil Dewatering',
          description: 'Excavating 18m subterranean urban pit, installing soldier pile retaining walls, and implementing perimeter groundwater cutoff barrier.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Urban Deep Civil Engineering',
          safetyProtocol: 'Adjacent municipal road settlement laser real-time monitoring',
          toolsRequired: ['Rotary Bored Piling Rig', 'Bentonite Slurry Desanding Unit'],
          materialsRequired: ['Cast-In-Place Concrete Piles', 'Steel Tie-Back Ground Anchors'],
          daysEstimate: 45
        },
        {
          id: 1,
          title: 'Heavy Reinforced Basement Raft Slab',
          subtitle: '2.0m Solid Concrete Foundation Slab',
          description: 'Pouring 2,400m³ continuous high-strength concrete raft slab designed to support high vertical loads of heavy tree-bearing cantilever trays.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Mass Structural Concrete',
          safetyProtocol: 'Thermal thermocouple temperature gradient monitoring (< 20°C differential)',
          toolsRequired: ['Twin Mobile Placing Booms', 'High-Frequency Vibrators'],
          materialsRequired: ['C45/55 Self-Compacting Concrete', '36mm Heavy Reinforcement Steel'],
          daysEstimate: 35
        },
        {
          id: 2,
          title: 'Reinforced Concrete Slipformed Elevator Core',
          subtitle: 'Self-Climbing Central Shear Core Tower',
          description: 'Climbing hydraulic slipform formwork to pour central elevator and MEP core, forming vertical structural stiffener for cantilever balconies.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Highrise Slipforming Engineering',
          safetyProtocol: 'Climbing screen wind resistance certified up to 120 km/h',
          toolsRequired: ['Hydraulic Self-Climbing Form System', 'Highrise Concrete Placing Boom'],
          materialsRequired: ['C50/60 High-Strength Concrete', 'B500C Welded Rebar Cages'],
          daysEstimate: 70
        },
        {
          id: 3,
          title: 'Cantilevered Heavy Concrete Planter Terraces',
          subtitle: 'Post-Tensioned Deep Soil Balcony Trays',
          description: 'Post-tensioning 3.8m cantilevered structural concrete balcony trays equipped with integrated root barriers, drainage layers, and soil anchors.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 9,
          tradeSpecialty: 'Post-Tensioned Structural Concrete',
          safetyProtocol: 'Deflection laser sensors on cantilevers during cable tensioning',
          toolsRequired: ['Hydraulic Strand Jack System', 'Concrete Laser Screed'],
          materialsRequired: ['High-Tensile PT Strands', 'Heavy-Duty Root Barrier Membranes'],
          daysEstimate: 60
        },
        {
          id: 4,
          title: 'Double-Skin Solar-Control Glass Curtain Wall',
          subtitle: 'Thermally Broken Acoustic Facade Units',
          description: 'Craning pre-glazed unitized facade panels with spectrally selective Low-E coatings to insulate interior office spaces from microclimate wind.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Façade Glazing Engineering',
          safetyProtocol: 'Dual-circuit vacuum glass lifter checks and wind safety limits',
          toolsRequired: ['Floor-Mounted Monorail Hoist', 'Glass Suction Manipulator'],
          materialsRequired: ['Triple Low-E Glazed Units', 'Thermal Break Anodized Mullions'],
          daysEstimate: 50
        },
        {
          id: 5,
          title: 'Biophilic Open Office Floors & Greywater Core',
          subtitle: 'Mass Timber Ceilings & Automated Drip Core',
          description: 'Installing exposed timber glulam ceiling slats, raised access floors, automated centralized drip-irrigation pumps, and rainwater retention core.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Biophilic Architecture & Irrigation MEP',
          safetyProtocol: 'Hydrostatic pressure testing of automated fertilizer fertigation tubes',
          toolsRequired: ['Laser Level Track Line', 'Soil Moisture Sensor Programmer'],
          materialsRequired: ['Acoustic Spruce Slat Ceilings', 'Rainwater Filtration Plant'],
          daysEstimate: 45
        },
        {
          id: 6,
          title: 'Sky Forest Rooftop Terrace & Solar Pergola',
          subtitle: 'Crown Botanical Observatory & Photovoltaics',
          description: 'Constructing top-level botanical observation lounge, shaded by an integrated 45kW bifacial photovoltaic solar timber pergola structure.',
          badge: 'PHASE 07 // SKY FOREST ROOF',
          durationSeconds: 8,
          tradeSpecialty: 'Rooftop Solar & Structural Timber',
          safetyProtocol: 'Full roof perimeter safety netting and anchor lifelines',
          toolsRequired: ['Heavy Crane Rigging Spreader', 'Solar Inverter Test Station'],
          materialsRequired: ['Glulam Timber Bents', 'Glass-Glass Photovoltaic Panels'],
          daysEstimate: 30
        },
        {
          id: 7,
          title: '800+ Cascading Trees, Shrub Planters & Plaza',
          subtitle: 'Tree Lifting, Safety Tether Cables & Public Realm',
          description: 'Craning 800 mature oak, beech, and olive trees into deep balcony trays with steel root-anchoring cages and planting ground-floor public plaza.',
          badge: 'PHASE 08 // LIVING CANOPY FINISHES',
          durationSeconds: 8,
          tradeSpecialty: 'Highrise Arboriculture & Urban Forestry',
          safetyProtocol: 'Steel aircraft safety tether cables securing every tree trunk against typhoons',
          toolsRequired: ['150-Ton Heavy Mobile Crane', 'Arborist Tree Rigging Spreader'],
          materialsRequired: ['Engineered Volcanic Substrate Soil', 'Mature Specimen Hardwood Trees'],
          daysEstimate: 40
        }
      ];

    case 'geothermal':
      return [
        {
          id: 0,
          title: 'Deep Earth Berm Trench Excavation & Sump Drainage',
          subtitle: 'Thermal Mass Earth Trench Excavation',
          description: 'Excavating 5-meter deep hillside trench into thermal bedrock, shaping perimeter retaining berms, and laying gravitational sump drains.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Earth-Sheltered Civil Engineering',
          safetyProtocol: 'Slope stability slope inclinometers and trench collapse shoring',
          toolsRequired: ['Track Excavator (30T)', 'Soil Compaction Roller'],
          materialsRequired: ['Bentonite Waterproof Clay Slurry', 'High-Density Drainage Geonet'],
          daysEstimate: 30
        },
        {
          id: 1,
          title: 'Waterproofed Concrete Foundation Bunker Raft',
          subtitle: 'Subterranean Tanked Slab with Waterstops',
          description: 'Pouring 1,000mm monolithic waterproofed concrete raft foundation slab with swellable bentonite waterstop joints and dual rubber tanking.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Subterranean Tanking Concrete',
          safetyProtocol: 'Groundwater hydrostatic head sensor calibration',
          toolsRequired: ['Concrete Boom Pump', 'Hot-Air Seam Welder'],
          materialsRequired: ['C35/45 Hydrophobic Concrete', 'Dual-Layer SBS Bituminous Tanking'],
          daysEstimate: 25
        },
        {
          id: 2,
          title: 'Monolithic Reinforced Concrete Barrel Vault Shell',
          subtitle: 'Continuous Curved Arch Vault Formwork',
          description: 'Erecting curved steel rib formwork to pour 400mm thick continuous reinforced concrete arch barrel vault designed for heavy soil overburden.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Specialist Arch Formwork Concrete',
          safetyProtocol: 'Formwork shoring load-cell strain gauges during pour',
          toolsRequired: ['Curved Steel Arch Falsework', 'Concrete Vibrator Needle Bank'],
          materialsRequired: ['Fiber-Reinforced Structural Concrete', 'B500C High-Yield Rebar'],
          daysEstimate: 40
        },
        {
          id: 3,
          title: 'Polished Concrete Floor Slab & Radiant Hydronics',
          subtitle: 'Subterranean Ground-Floor Radiant Matrix',
          description: 'Casting diamond-polished concrete floor with dense embedded PEX hydronic heating and cooling loops coupled to geothermal ground source.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Hydronic Flooring & Concrete Polishing',
          safetyProtocol: 'Continuous 8-bar pneumatic pressure hold on radiant loops',
          toolsRequired: ['Ride-On Power Trowel', 'Diamond Floor Grinding Machine'],
          materialsRequired: ['Self-Leveling Polymer Concrete', 'PEX-a EVOH Oxygen Barrier Tubing'],
          daysEstimate: 20
        },
        {
          id: 4,
          title: 'Sunken Lightwell Glazing & Clerestory Window',
          subtitle: 'Passive Daylighting Canyon & Thermal Glass',
          description: 'Installing triple-glazed argon-filled structural curtain wall looking out into excavated sunken lightwell courtyard for natural light and passive air.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Glazing Systems',
          safetyProtocol: 'Glass vacuum manipulator fail-safe checks',
          toolsRequired: ['Spider Glass Crane', 'Glazing Pressure Plate Screw Guns'],
          materialsRequired: ['Triple Low-E Argon-Filled Units', 'Thermally Broken Bronze Profiles'],
          daysEstimate: 25
        },
        {
          id: 5,
          title: 'Interior Birch Joinery & Geothermal Heat Pump Plant',
          subtitle: 'Ground-Source Heat Exchanger & Living Core',
          description: 'Installing 24kW water-to-water ground source heat pump central plant, acoustic birch plywood wall paneling, and fresh air ERV ventilation.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Geothermal HVAC & Architectural Millwork',
          safetyProtocol: 'Refrigerant leak detection testing and low-VOC air quality certification',
          toolsRequired: ['Refrigerant Charging Station', 'Laser Joinery Alignment Tools'],
          materialsRequired: ['Baltic Birch Architectural Plywood', 'High-Efficiency Ground Heat Pump Units'],
          daysEstimate: 35
        },
        {
          id: 6,
          title: 'Living Turf Earth-Shelter Overburden & Glass Oculus',
          subtitle: '600mm Soil Berm Overburden & Skylight Oculus',
          description: 'Applying root-proof waterproofing membrane, laying 600mm thermal soil overburden with living meadow turf, and setting conical skylight oculus.',
          badge: 'PHASE 07 // LIVING BERM ROOF',
          durationSeconds: 8,
          tradeSpecialty: 'Green Roof & Earth-Sheltered Engineering',
          safetyProtocol: 'Electronic vector leak location (EVLL) testing across all roof membranes',
          toolsRequired: ['High-Volume Soil Blower Truck', 'Membrane Spark Tester'],
          materialsRequired: ['EPDM Root-Resistant Membrane', 'Engineered Meadow Substrate'],
          daysEstimate: 30
        },
        {
          id: 7,
          title: 'Vertical Geothermal Heat Loop Field & Flagstones',
          subtitle: '120m Borehole Heat Exchangers & Slate Patio',
          description: 'Drilling six 120-meter vertical borehole heat exchangers with thermally enhanced bentonite grout, laying reclaimed split-slate terrace patio.',
          badge: 'PHASE 08 // BOREHOLE & PATIO FINISHES',
          durationSeconds: 8,
          tradeSpecialty: 'Geothermal Well Drilling & Masonry',
          safetyProtocol: 'Borehole loop thermal conductivity testing and grouting verification',
          toolsRequired: ['Rotary Mud Drilling Rig', 'Grout Injection Pressure Machine'],
          materialsRequired: ['High-Density Polyethylene U-Tubes', 'Thermally Enhanced Bentonite Grout'],
          daysEstimate: 25
        }
      ];

    case 'observatory':
      return [
        {
          id: 0,
          title: 'Mountain Ridge Bedrock Cut & Anchor Drilling',
          subtitle: 'Granite Bedrock Blasting & Chemical Anchors',
          description: 'Diamond core drilling high-altitude granite peak, installing tensioned rock anchors to secure absolute bedrock seismic stability.',
          badge: 'PHASE 01 // BEDROCK EXCAVATION',
          durationSeconds: 7,
          tradeSpecialty: 'High-Altitude Rock Engineering',
          safetyProtocol: 'Cliff edge lifeline safety static ropes and rockfall nets',
          toolsRequired: ['Rotary Percussion Rock Drill', 'Grout Injection Pump'],
          materialsRequired: ['High-Yield Dywidag Rock Bolts', 'Non-Shrink Epoxy Bedrock Grout'],
          daysEstimate: 35
        },
        {
          id: 1,
          title: 'Vibration-Isolated Concrete Central Telescope Pier',
          subtitle: 'Independent 4.5m Diameter Massive Concrete Pier',
          description: 'Pouring an acoustically and structurally isolated 4.5m diameter concrete central telescope pier extending directly into bedrock with zero contact with building.',
          badge: 'PHASE 02 // ISOLATED PIER',
          durationSeconds: 8,
          tradeSpecialty: 'Precision Structural Concrete',
          safetyProtocol: 'Micro-seismic vibration sensor testing (< 0.05 mm/s limit)',
          toolsRequired: ['Optical Autocollimator', 'Heavy Concrete Boom Pump'],
          materialsRequired: ['Low-Shrinkage Mass Concrete', 'Epoxy-Coated Heavy Rebar'],
          daysEstimate: 30
        },
        {
          id: 2,
          title: 'Heavy Masonry & Steel Cylindrical Rotunda Drum',
          subtitle: '16m Diameter Cylindrical Enclosure & Azimuth Ring',
          description: 'Erecting the circular masonry and structural steel rotunda drum, mounting the high-precision circular precision azimuth steel track ring.',
          badge: 'PHASE 03 // ROTUNDA SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Astronomical Structural Engineering',
          safetyProtocol: 'Optical circularity tolerance check (< 1.5mm runout on 16m diameter)',
          toolsRequired: ['Laser Tracker 3D Coordinate Machine', 'Mobile All-Terrain Crane (60T)'],
          materialsRequired: ['Machined Cast Steel Azimuth Rail', 'Reinforced Cavity Masonry Blocks'],
          daysEstimate: 45
        },
        {
          id: 3,
          title: 'Suspended Observation Floor & Azimuth Catwalk',
          subtitle: 'Heavy Timber-Faced Steel Floor Diaphragm',
          description: 'Installing vibration-damped steel mezzanine observation deck and circular maintenance catwalk surrounding the central telescope pier.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Specialist Industrial Mezzanines',
          safetyProtocol: 'Perimeter anti-drop toe kicks protecting sensitive optics below',
          toolsRequired: ['Magnetic Drill Press', 'Torque Multiplier'],
          materialsRequired: ['Composite Steel Decking', 'Vibration-Damping Neoprene Gaskets'],
          daysEstimate: 25
        },
        {
          id: 4,
          title: 'Insulated Double-Skin Aluminum Cladding Shell',
          subtitle: 'Thermal Equilibrium Aerodynamic Cladding',
          description: 'Cladding rotunda in high-albedo insulated composite aluminum panels designed to reject daytime solar heat and eliminate nighttime air turbulence.',
          badge: 'PHASE 05 // THERMAL ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Aeronautical Facade Engineering',
          safetyProtocol: 'High-wind safety threshold (< 20 kts) on cliffside scafolding',
          toolsRequired: ['Vacuum Panel Lifter', 'Thermal Imaging Camera'],
          materialsRequired: ['Fluoropolymer High-Albedo Panels', 'Aerogel Insulation Blanket (R-40)'],
          daysEstimate: 30
        },
        {
          id: 5,
          title: 'Climate-Controlled Spectrometer & Control Room',
          subtitle: 'Acoustic Faraday Cage & Cryogenic Enclosure',
          description: 'Building RF-shielded Faraday cage control room, cleanroom cryogenic compressor plant for telescope CCD chillers, and astronomer command desks.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Scientific Cleanroom & Electronics',
          safetyProtocol: 'Faraday attenuation RF testing and liquid nitrogen safety ventilation',
          toolsRequired: ['Spectrum Analyzer', 'Cryogenic Helium Charging Cart'],
          materialsRequired: ['Copper Mesh Faraday Shielding', 'Class 10,000 Cleanroom Wall Panels'],
          daysEstimate: 35
        },
        {
          id: 6,
          title: 'Rotating Carbon Dome with Optical Viewing Shutter',
          subtitle: 'Motorized Hemispherical Dome & 1.2m Telescope',
          description: 'Craning 16m motorized composite carbon-fiber dome with synchronized split shutters and hoisting 1.2m Ritchey-Chrétien optical telescope tube.',
          badge: 'PHASE 07 // ROTATING DOME & SCOPE',
          durationSeconds: 9,
          tradeSpecialty: 'Opto-Mechanical Engineering',
          safetyProtocol: 'Helicopter wind coordinate zone & optical cleanroom cover protection',
          toolsRequired: ['120-Ton Heavy Mobile Crane', 'Dynamic Drive Motor Alignment Tool'],
          materialsRequired: ['Carbon-Fiber Monocoque Dome Shell', '1.2m Zerodur Primary Mirror'],
          daysEstimate: 40
        },
        {
          id: 7,
          title: 'Red-Light Starlight Safe Pathway & Weather Mast',
          subtitle: 'Dark-Sky Compliant Lighting & Ultrasonic Anemometer',
          description: 'Installing 590nm monochromatic amber/red dark-sky safety walkway lighting, stone observation terrace, and ultrasonic 3D wind meteorological mast.',
          badge: 'PHASE 08 // STARLIGHT FINISHES',
          durationSeconds: 7,
          tradeSpecialty: 'Dark-Sky Lighting & Environmental Systems',
          safetyProtocol: 'Zero-uplight dark-sky photometric certification verification',
          toolsRequired: ['Luminance Spectroradiometer', 'Ultrasonic Mast Calibrator'],
          materialsRequired: ['590nm Dark-Sky LED Fixtures', 'Decomposed Granite Stone Paving'],
          daysEstimate: 15
        }
      ];

    case 'loft':
      return [
        {
          id: 0,
          title: 'Industrial Site Grading & Concrete Grade Slab',
          subtitle: 'Brownfield Soil Remediation & Excavation',
          description: 'Remediating historic foundry soil, grading excavation platform, and laying thick compacted stone sub-base with vapor retarder.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Industrial Civil Remediation',
          safetyProtocol: 'Continuous VOC vapor sniffing sensors and dust extraction',
          toolsRequired: ['Heavy Skid Steer Loader', 'Vibratory Plate Compactor'],
          materialsRequired: ['15-mil Heavy Polyolefin Vapor Retarder', 'Recycled Crushed Concrete Aggregate'],
          daysEstimate: 25
        },
        {
          id: 1,
          title: 'Underpinned Historic Masonry Piers & Strip Footings',
          subtitle: 'High-Strength Concrete Underpinning Bays',
          description: 'Sequentially excavating and pouring reinforced concrete underpinning bays beneath centuries-old brick foundation piers to support new crane rails.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Structural Underpinning & Masonry',
          safetyProtocol: 'Tell-tale crack optical gauges and real-time hydraulic jacks',
          toolsRequired: ['Pneumatic Clay Spades', 'High-Pressure Grout Pump'],
          materialsRequired: ['C35/45 Expanding Non-Shrink Concrete', 'Structural Rebar Cages'],
          daysEstimate: 35
        },
        {
          id: 2,
          title: 'Heavy Riveted W-Steel Girders & Warren Trusses',
          subtitle: 'Restored Industrial Steelwork & Overhead Rails',
          description: 'Erecting restored hot-riveted wide-flange steel columns, heavy Warren roof trusses, and overhead 10-ton industrial bridge crane runways.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Heritage Structural Steel Rigging',
          safetyProtocol: '100% harness tie-off and ultrasonic rivet defect testing',
          toolsRequired: ['Mobile Crane (40T)', 'Hot Rivet Busters & Impact Wrenches'],
          materialsRequired: ['A36 Structural Steel Beams', 'A325 High-Strength Steel Bolts'],
          daysEstimate: 50
        },
        {
          id: 3,
          title: 'Reclaimed Hardwood Timber Mezzanine & Steel Stairs',
          subtitle: 'Heavy Timber Joists & Industrial Stringers',
          description: 'Installing heavy reclaimed factory pine timber mezzanine floor joists, tongue-and-groove decking, and architectural blackened-steel open-riser stairs.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Timber Framing & Custom Metalwork',
          safetyProtocol: 'Temporary perimeter safety fall-arrest cabling on mezzanine edge',
          toolsRequired: ['Heavy Timber Framing Chisels', 'Portable Magnetic Drill Press'],
          materialsRequired: ['Reclaimed Heart Pine Decking (75mm)', 'Laser-Cut Steel Stair Stringers'],
          daysEstimate: 30
        },
        {
          id: 4,
          title: 'Industrial Multi-Pane Steel Warehouse Windows',
          subtitle: 'Thermally Broken Blackened Steel Frames',
          description: 'Hanging custom historic-replica blackened steel divided-lite multi-pane windows with modern high-performance insulated glass.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Heritage Architectural Metal Windows',
          safetyProtocol: 'Dual-line vacuum glass manipulators',
          toolsRequired: ['Electric Scissor Lift', 'Pneumatic Sealant Dispenser'],
          materialsRequired: ['Thermally Broken Steel Profiles', 'Argon-Filled Low-E Narrow Cavity Glass'],
          daysEstimate: 35
        },
        {
          id: 5,
          title: 'Restored Brick Masonry End-Walls & Spiral Ducts',
          subtitle: 'Repointed Chicago Common Brick & Exposed MEP',
          description: 'Lime repointing original heritage load-bearing brick masonry walls, installing exposed polished spiral HVAC ductwork and Edison lighting grid.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Historical Masonry Restoration & MEP',
          safetyProtocol: 'Silica dust vacuum capture systems on tuck-pointing grinders',
          toolsRequired: ['Dust-Free Mortar Grinder', 'Spiral Duct Crimper'],
          materialsRequired: ['Natural Hydraulic Lime Mortar (NHL 3.5)', 'Galvanized Spiral Air Ducts (450mm)'],
          daysEstimate: 40
        },
        {
          id: 6,
          title: 'Sawtooth Roof Clerestory with North-Facing Glazing',
          subtitle: 'Industrial Daylighting Roof Monitors & Zinc',
          description: 'Constructing industrial sawtooth roof monitors angled at 60° north for glare-free daylighting, cladded in standing-seam zinc sheets.',
          badge: 'PHASE 07 // SAWTOOTH ROOF',
          durationSeconds: 8,
          tradeSpecialty: 'Industrial Roofing & Skylight Systems',
          safetyProtocol: 'Leading-edge fall-arrest lifeline and skylight safety mesh covers',
          toolsRequired: ['Sheet Metal Seaming Tool', 'Hot-Air Membrane Welder'],
          materialsRequired: ['Pre-Weathered Zinc Roofing Sheets', 'Self-Adhering Waterproof Underlayment'],
          daysEstimate: 30
        },
        {
          id: 7,
          title: 'Cobblestone Courtyard, Iron Gates & Gas Lamps',
          subtitle: 'Reclaimed Granite Belgian Blocks & Heritage Iron',
          description: 'Paving entrance courtyard with reclaimed granite cobblestones, installing bespoke forged wrought-iron entrance gates and ambient gas-torch luminaires.',
          badge: 'PHASE 08 // COURTYARD FINISHES',
          durationSeconds: 7,
          tradeSpecialty: 'Heritage Hardscaping & Blacksmithing',
          safetyProtocol: 'Trench gas safety shutoff valve verification',
          toolsRequired: ['Heavy Stone Paver Compactor', 'Stone Splitter Machine'],
          materialsRequired: ['Reclaimed Belgian Granite Cobbles', 'Hand-Forged Wrought Iron Gates'],
          daysEstimate: 20
        }
      ];

    case 'arctic':
      return [
        {
          id: 0,
          title: 'Permafrost Survey & Thermosyphon Cooling Grid',
          subtitle: 'Ground Freezing Telemetry & Ground Datum',
          description: 'Drilling temperature-probe boreholes into frozen polar permafrost and installing passive carbon-dioxide thermosyphon cooling pipes to prevent thawing.',
          badge: 'PHASE 01 // PERMAFROST DATUM',
          durationSeconds: 7,
          tradeSpecialty: 'Polar Geotechnical Engineering',
          safetyProtocol: 'Continuous wind-chill telemetry and Arctic emergency shelter standby',
          toolsRequired: ['Tracked Ice-Core Auger Drill', 'Thermosyphon Gas Charging Manifold'],
          materialsRequired: ['CO2 Passive Thermosyphon Pipes', 'Cryogenic Bedrock Grout'],
          daysEstimate: 25
        },
        {
          id: 1,
          title: 'Cryogenic Steel Anchor Cassettes & Pile Heads',
          subtitle: 'Frost-Heave Resistant Bedrock Anchors',
          description: 'Driving vacuum-insulated steel pile sleeves into bedrock, installing thermal breaks to isolate building warmth from the permafrost.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Cryogenic Structural Foundations',
          safetyProtocol: 'Ultrasonic flaw inspection on cold-tolerant steel welds',
          toolsRequired: ['Hydraulic Pile Driving Rig', 'Cryogenic Torque Wrench'],
          materialsRequired: ['ASTM A333 Grade 6 Low-Temp Steel', 'Ultra-High Molecular Weight Thermal Isolators'],
          daysEstimate: 30
        },
        {
          id: 2,
          title: 'Telescoping Hydraulic Stilt Legs (Anti-Blizzard)',
          subtitle: 'Six Independent Height-Adjustable Stilts',
          description: 'Erecting 6 telescoping heavy hydraulic stilt legs engineered to lift the entire research station 3.5m above polar snowdrifts and blizzard pack.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Extreme-Climate Mechanical Structural',
          safetyProtocol: 'Hydraulic lock-valve fail-safe pressure verification at -50°C',
          toolsRequired: ['Tracked Arctic All-Terrain Crane', 'Hydraulic Jack Synchronizer'],
          materialsRequired: ['High-Strength Quenched Alloy Cylinders', 'Cold-Weather Biodegradable Hydraulic Fluid'],
          daysEstimate: 40
        },
        {
          id: 3,
          title: 'Insulated Aerogel Floor Box & Steel Chassis',
          subtitle: 'R-60 Thermal Chassis & Heated Sub-Void',
          description: 'Assembling structural bridge truss chassis filled with 200mm aerogel insulation blankets delivering R-60 insulation barrier against extreme frost.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Thermal Envelope Engineering',
          safetyProtocol: 'Thermal camera infrared envelope boundary checks',
          toolsRequired: ['Impact Wrenches (Heavy Drive)', 'Vapor Barrier Heat Sealer'],
          materialsRequired: ['Silica Aerogel Insulation Blankets', 'Welded Steel Box Perimeter Girders'],
          daysEstimate: 25
        },
        {
          id: 4,
          title: 'Aerodynamic Chamfered Pod Capsule & Portholes',
          subtitle: 'Blizzard-Deflecting Composite Outer Shell',
          description: 'Mounting insulated aerodynamic composite shell with 45° chamfered windward edges to deflect 200 km/h katabatic winds, fitted with heated portholes.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Aerospace Composite Structures',
          safetyProtocol: 'Cold-weather composite adhesive bond cure heaters',
          toolsRequired: ['Overhead Gantry Hoist', 'Heated Vacuum Suction Lifter'],
          materialsRequired: ['Vacuum-Infused Composite Sandwich Panels', 'Triple-Glazed Electrically Heated Portholes'],
          daysEstimate: 35
        },
        {
          id: 5,
          title: 'Pressurized Quarters, Medical Bay & Cold Airlock',
          subtitle: 'Self-Contained Scientific Habitation Module',
          description: 'Fitting airtight decompression airlock, medical isolation suite, scientific wet laboratory, and high-efficiency snow-melting water plant.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Extreme Environment Habitation Systems',
          safetyProtocol: 'Oxygen monitoring and redundant carbon-monoxide safety detectors',
          toolsRequired: ['Pressure Decay Leakage Tester', 'Laser Pipe Fusion Welder'],
          materialsRequired: ['Airtight Gasketed Wall Panels', 'Combined Heat and Power (CHP) Unit'],
          daysEstimate: 40
        },
        {
          id: 6,
          title: 'Aerodynamic Roof Shell, Satellite Radome & Comms',
          subtitle: 'Polar Tracking Dish & Weather Station',
          description: 'Installing aerodynamic roof cap, 2.4m heated satellite radome dish for unbroken global telemetry, and lightning dissipation array.',
          badge: 'PHASE 07 // RADOME & ROOF',
          durationSeconds: 8,
          tradeSpecialty: 'Polar Telecommunications & Roofing',
          safetyProtocol: 'Antenna mast static harness tie-off and wind speed monitors',
          toolsRequired: ['Torque Multipliers', 'Satellite Spectrum Analyzer'],
          materialsRequired: ['Heated High-Frequency Composite Radome', 'Fiber-Optic Sensor Harness'],
          daysEstimate: 20
        },
        {
          id: 7,
          title: 'Heavy Snow Ramp, Vehicle Berths & Xenon Beacons',
          subtitle: 'Hydraulic Snowmobile Ramp & Marker Strobe Grid',
          description: 'Deploying articulated hydraulic vehicle access ramp, under-pod tracked snowcat parking berths, and high-intensity xenon blizzard beacons.',
          badge: 'PHASE 08 // RAMP & VEHICLE FINISHES',
          durationSeconds: 7,
          tradeSpecialty: 'Polar Infrastructure & Visual Aids',
          safetyProtocol: 'Emergency avalanche rescue beacon synchronization tests',
          toolsRequired: ['Snowcat Winch Rig', 'High-Intensity Optical Photometer'],
          materialsRequired: ['Galvanized Grip-Strut Steel Grating', 'High-Output Xenon Strobe Beacons'],
          daysEstimate: 15
        }
      ];

    case 'cliffside':
      return [
        {
          id: 0,
          title: 'Sea Cliff Terracing & Tensioned Rock Anchors',
          subtitle: 'Precambrian Cliff Excavation & Rock Bolts',
          description: 'Terracing steep Mediterranean limestone cliff face and installing 16m grouted post-tensioned stainless rock anchors to lock fault strata.',
          badge: 'PHASE 01 // CLIFF EXCAVATION',
          durationSeconds: 7,
          tradeSpecialty: 'Geotechnical Marine Rock Engineering',
          safetyProtocol: 'Rope-access cliff technician safety lifelines and wave surge lookouts',
          toolsRequired: ['Pneumatic Crawler Rock Drill', 'Anchor Grout Injection Pump'],
          materialsRequired: ['Marine Stainless Rock Anchors (316L)', 'Non-Shrink Structural Grout'],
          daysEstimate: 35
        },
        {
          id: 1,
          title: 'Cascading White Concrete Substructure Plinths',
          subtitle: 'Stepped Monolithic Retaining Foundations',
          description: 'Casting multi-tiered stepped architectural concrete foundation plinths with crystalline waterproofing to resist corrosive sea salt air.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Marine Concrete',
          safetyProtocol: 'Concrete formwork lateral thrust tie verification',
          toolsRequired: ['Truck-Mounted Boom Pump (48m)', 'High-Frequency Form Vibrators'],
          materialsRequired: ['White Portland Cement Concrete', 'Galvanized Corrosion-Resistant Rebar'],
          daysEstimate: 40
        },
        {
          id: 2,
          title: 'Slender White Architectural Portals & Columns',
          subtitle: 'Minimalist Steel-Reinforced Post-and-Beam Grid',
          description: 'Erecting ultra-slender white architectural concrete portals and columns framing unobstructed panoramic Mediterranean sea vistas.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'High-Tolerance Architectural Concrete',
          safetyProtocol: 'Column vertical laser collimation and temporary shoring checks',
          toolsRequired: ['Precision Laser Level', 'Micro-Adjustment Shoring Towers'],
          materialsRequired: ['Ultra-High Performance Concrete (UHPC)', 'Stainless Steel Splice Connectors'],
          daysEstimate: 45
        },
        {
          id: 3,
          title: 'Cascading Honed Limestone Terrace Decks',
          subtitle: 'Seamless Indoor-Outdoor Travertine Paving',
          description: 'Laying post-tensioned cantilevered floor slabs surfaced with honed ivory travertine limestone tiles with invisible subfloor drainage channels.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Natural Stone Masonry & Cantilever Decks',
          safetyProtocol: 'Edge fall protection netting on open ocean cliff cantilevers',
          toolsRequired: ['Vacuum Slab Lifter', 'Diamond Wet Tile Bridge Saw'],
          materialsRequired: ['Honed Navona Travertine Slabs', 'Epoxy Flexible Tile Mortar'],
          daysEstimate: 30
        },
        {
          id: 4,
          title: 'Floor-to-Ceiling Sliding Pocket Glass Wall',
          subtitle: 'Zero-Threshold Motorized Marine Glazing',
          description: 'Installing motorized floor-to-ceiling structural glass panels that slide completely into hidden wall pockets for seamless open-air living.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Minimalist Architectural Glazing',
          safetyProtocol: 'Glass suction manipulator wind speed monitoring (< 15 kts)',
          toolsRequired: ['Spider Glazing Crane', 'Sub-Floor Track Leveling Gauge'],
          materialsRequired: ['Triple Low-E Acoustic Laminated Glass', 'Anodized Recessed Track Channels'],
          daysEstimate: 35
        },
        {
          id: 5,
          title: 'White Stucco Lounge, Terrazzo & Linen Joinery',
          subtitle: 'Hand-Troweled Venetian Stucco & Bleached Oak',
          description: 'Applying traditional lime-based white stucco to interior walls, pouring seamless Venetian terrazzo, and installing custom bleached oak joinery.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Artisanal Mediterranean Finishes & Millwork',
          safetyProtocol: 'Dust-free orbital sanders with HEPA vacuum extraction',
          toolsRequired: ['Stainless Venetian Stucco Trowels', 'Terrazzo Rotary Floor Polisher'],
          materialsRequired: ['Hydrated Slaked Lime Plaster', 'Bleached European Oak Millwork'],
          daysEstimate: 40
        },
        {
          id: 6,
          title: 'Natural Teak Timber Pergola Sunshade Trellis',
          subtitle: 'Marine Teak Shade Rafters & Stainless Anchors',
          description: 'Carpentering slatted natural teak timber pergola trellis creating delicate shadow patterns and providing 70% passive solar cooling.',
          badge: 'PHASE 07 // PERGOLA ROOF',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Timber Joinery',
          safetyProtocol: 'Fall-arrest static lifelines on elevated pergola rafters',
          toolsRequired: ['Precision Sliding Compound Saw', 'Concealed Fastener Jig'],
          materialsRequired: ['FSC-Certified Burmese Teak Timbers', 'A4 Marine Stainless Steel Brackets'],
          daysEstimate: 25
        },
        {
          id: 7,
          title: 'Cantilevered Sea-Facing Infinity Pool & Olive Trees',
          subtitle: 'Horizon Pool, Zero-Edge Glass & Specimen Flora',
          description: 'Constructing cantilevered zero-edge infinity pool with structural acrylic underwater viewing window, planting century-old gnarled olive trees.',
          badge: 'PHASE 08 // INFINITY POOL FINISHES',
          durationSeconds: 8,
          tradeSpecialty: 'Specialist Aquatic Engineering & Arboriculture',
          safetyProtocol: 'Hydrostatic pressure and acrylic sealing verification',
          toolsRequired: ['Mobile Crane (50T)', 'Pool Plaster Shotcrete Machine'],
          materialsRequired: ['Structural Acrylic Pool Window (80mm)', 'Century-Old Mediterranean Olive Trees'],
          daysEstimate: 30
        }
      ];

    case 'stadium':
      return [
        {
          id: 0,
          title: 'Sunken Stadium Bowl Excavation & Piling Matrix',
          subtitle: 'Mass Earth Bowl Excavation & Foundation Piles',
          description: 'Bulk excavation of 45,000m³ earth bowl, driving 240 continuous flight auger (CFA) concrete piles down into solid load-bearing bedrock.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Heavy Civil Earthmoving & Piling',
          safetyProtocol: 'Automated GPS machine guidance and slope stability monitoring',
          toolsRequired: ['Continuous Flight Auger (CFA) Rig', 'Heavy Track Excavators (45T)'],
          materialsRequired: ['Reinforced Concrete Piles', 'Heavy Geogrid Reinforcement Fabric'],
          daysEstimate: 50
        },
        {
          id: 1,
          title: 'Monolithic Concrete Compression Ring Foundation',
          subtitle: 'Post-Tensioned Circumferential Perimeter Beam',
          description: 'Pouring 3.5m wide post-tensioned circumferential concrete compression ring beam engineered to anchor inward cable-net roof pull forces.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Post-Tensioned Heavy Civil Concrete',
          safetyProtocol: 'Hydraulic tensioning blast barricades and elongation checks',
          toolsRequired: ['Concrete Boom Pump Battery (3 Units)', 'Multistrand Stressing Jacks'],
          materialsRequired: ['High-Strength Concrete C50/60', 'Low-Relaxation High-Tensile Strands'],
          daysEstimate: 45
        },
        {
          id: 2,
          title: '4 Soaring Inclined Tubular Steel Pylon Masts',
          subtitle: '65m Steel Pylons & High-Tensile Backstays',
          description: 'Erecting 4 soaring 65m high inclined tubular steel masts with massive forged pinned base joints and prestressed locked-coil backstay cables.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Megastructure Heavy Steel Rigging',
          safetyProtocol: 'Twin-crane tandem lift protocol with wind speed < 12 kts',
          toolsRequired: ['500-Ton Crawler Crane', 'Hydraulic Pinning Cylinder'],
          materialsRequired: ['High-Strength Structural Steel (S460NH)', '120mm Locked-Coil Bridge Cables'],
          daysEstimate: 75
        },
        {
          id: 3,
          title: 'Tiered Precast Concrete Seating Grandstands',
          subtitle: 'Vibration-Damped Modular Bleacher Rakers',
          description: 'Installing 3,200 modular precast concrete seating rakers on elastomeric acoustic isolation shims to prevent dynamic crowd bounce resonance.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Precast Stadium Seating Engineering',
          safetyProtocol: 'Positive locking clamps on all precast bleacher units',
          toolsRequired: ['Telescopic Crawler Cranes', 'Laser Alignment Sensors'],
          materialsRequired: ['High-Density Precast Concrete L-Treads', 'Elastomeric Bearing Strips'],
          daysEstimate: 60
        },
        {
          id: 4,
          title: 'Translucent Ribbed Polycarbonate Facade Shell',
          subtitle: 'Multiwall Polycarbonate Thermal Envelope',
          description: 'Fixing lightweight 40mm multiwall polycarbonate panels with tongue-and-groove connections providing soft daylighting and windbreak shielding.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Polycarbonate Facades',
          safetyProtocol: 'Mast climbing platforms with emergency descent brakes',
          toolsRequired: ['Mast Climbing Work Platforms', 'Pneumatic Panel Riveters'],
          materialsRequired: ['UV-Protected Multiwall Polycarbonate', 'Extruded Aluminum Framing Profiles'],
          daysEstimate: 45
        },
        {
          id: 5,
          title: 'High-Spec Hybrid Bermuda Grass Sports Pitch',
          subtitle: 'Sub-Air Aeration, Vacuum Drainage & Heating',
          description: 'Installing vacuum-powered sub-air pitch drainage pipes, hydronic rootzone heating network, and synthetic-reinforced Bermuda hybrid turf.',
          badge: 'PHASE 06 // SPORTS PITCH & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Sports Surface & Agrotechnology',
          safetyProtocol: 'Pneumatic line pressure verification across sub-pitch systems',
          toolsRequired: ['Laser-Guided Sand Spreader', 'Hybrid Turf Stitching Machine'],
          materialsRequired: ['Synthetic Hybrid Turf Reinforcing Fibers', 'Washed Silica Sand Substrate'],
          daysEstimate: 35
        },
        {
          id: 6,
          title: 'Hyperbolic Prestressed PTFE Cable-Net Roof',
          subtitle: 'Double-Curved Saddle Net & Translucent Membrane',
          description: 'Hydraulically tensioning the prestressed stainless cable-net grid and clamping translucent self-cleaning PTFE fluoropolymer fabric canopy.',
          badge: 'PHASE 07 // CABLE-NET CANOPY',
          durationSeconds: 9,
          tradeSpecialty: 'Tensile Cable-Net & Membrane Specialists',
          safetyProtocol: 'Synchronized multi-point computer hydraulic tension jacking',
          toolsRequired: ['Computerized Hydraulic Jacking Station', 'High-Frequency Seam Welders'],
          materialsRequired: ['Galvanized High-Tensile Spiral Strands', 'PTFE-Coated Fiberglass Fabric'],
          daysEstimate: 55
        },
        {
          id: 7,
          title: 'High-Power LED Sports Floodlights & Concourse',
          subtitle: 'Broadcast 4K Lighting Arrays & Turnstiles',
          description: 'Aiming high-power glare-free 4K broadcast sports LED floodlight arrays and completing perimeter spectator concourse with smart turnstiles.',
          badge: 'PHASE 08 // BROADCAST & CONCOURSE',
          durationSeconds: 8,
          tradeSpecialty: 'Theatrical Sports Lighting & Civil Concourse',
          safetyProtocol: 'Photometric laser aiming calibration and lux level verification',
          toolsRequired: ['Laser Theodolite Aiming Scope', 'Illuminance Light Meter'],
          materialsRequired: ['IP66 Broadcast LED Floodlights', 'Optical Barcode Turnstile Gates'],
          daysEstimate: 30
        }
      ];

    case 'geodesic':
      return [
        {
          id: 0,
          title: 'Circular Moraine Basin Earthwork & Sub-Base',
          subtitle: 'Moraine Topography Excavation & Perimeter Drains',
          description: 'Laser grading circular moraine foundation basin, installing perimeter subsurface drainage collector rings and bedrock anchors.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Civil & Geo-Environmental',
          safetyProtocol: 'Underground drainage slope laser verification and shoring nets',
          toolsRequired: ['Laser Scraper Grader', 'Rotary Trench Excavator'],
          materialsRequired: ['Perforated Polyethylene Drainage Ring', 'Compacted Crushed Basalt Bedding'],
          daysEstimate: 25
        },
        {
          id: 1,
          title: 'Post-Tensioned Concrete Thrust Ring Foundation',
          subtitle: 'Monolithic Circular Buttress Foundation',
          description: 'Pouring circular reinforced concrete thrust beam foundation post-tensioned with internal steel tendons to resist dome outward thrust.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Circular Post-Tensioned Concrete',
          safetyProtocol: 'Tension jack calibration and concrete cylinder compression testing',
          toolsRequired: ['Curved Formwork Panels', 'Multistrand Stressing Jacks'],
          materialsRequired: ['High-Strength Concrete C40/50', 'Post-Tensioning High-Tensile Strands'],
          daysEstimate: 30
        },
        {
          id: 2,
          title: 'Triangulated Aluminum Geodesic Strut Lattice',
          subtitle: 'Spaceframe Nodes & Tubular Struts',
          description: 'Assembling triangulated 5-frequency icosahedral aluminum spaceframe lattice with precision CNC-machined cast hub nodes.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Geodesic Spaceframe Engineering',
          safetyProtocol: 'Center falsework tower safety checks and tie-off harnesses',
          toolsRequired: ['Spider Lift Battery', 'Precision Calibrated Torque Wrenches'],
          materialsRequired: ['Structural 6082-T6 Aluminum Struts', 'Forged Cast Aluminum Hub Nodes'],
          daysEstimate: 50
        },
        {
          id: 3,
          title: 'Terraced Biome Platforms & Canopy Walkways',
          subtitle: 'Suspended Glulam Walkways & Viewing Decks',
          description: 'Erecting timber glulam columns and suspended tension-cable viewing walkways threading through the upper third of the future tree canopy.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Suspended Structural Timber',
          safetyProtocol: 'Static lifeline cable safety harnesses on elevated walkways',
          toolsRequired: ['Tracked Mobile Scissor Lifts', 'Tension Cable Rigging Clamps'],
          materialsRequired: ['Curved Glulam Bridge Beams', 'Stainless Wire Mesh Safety Balustrades'],
          daysEstimate: 35
        },
        {
          id: 4,
          title: 'Triple-Layer Pneumatic ETFE Hexagonal Cushions',
          subtitle: 'UV-Permeable Pressurized Foil Cushions',
          description: 'Installing triple-layer pneumatic ETFE foil cushions inflated to 250 Pa, delivering high thermal insulation and 95% full-spectrum UV light.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Pneumatic Envelopes',
          safetyProtocol: 'Continuous air pressure telemetry and air blower redundancy',
          toolsRequired: ['Pneumatic Cushion Air Handler', 'Hot-Air Seaming Clamps'],
          materialsRequired: ['High-Transmittance ETFE Foil', 'Extruded Aluminum Cushion Rails'],
          daysEstimate: 45
        },
        {
          id: 5,
          title: 'Tropical Rainforest Biome & Automated Misting',
          subtitle: 'High-Pressure Micro-Mist & Living Soil',
          description: 'Installing high-pressure micro-misting humidity nozzle lines, planting 300 tropical palm species, and placing living volcanic humus soil.',
          badge: 'PHASE 06 // INTERIOR BIOME & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Botanical Biome Climate Engineering',
          safetyProtocol: 'Water quality filtration and anti-legionella UV treatment checks',
          toolsRequired: ['High-Pressure Piston Misting Pump', 'Soil Moisture Data Loggers'],
          materialsRequired: ['Engineered Volcanic Biome Soil Mix', 'High-Pressure Stainless Misting Tubes'],
          daysEstimate: 40
        },
        {
          id: 6,
          title: 'Automated Apex Oculus Natural Thermal Chimney',
          subtitle: 'Motorized Apex Venting Louver Ring',
          description: 'Installing motorized circular apex oculus venting louvers at dome crown to drive stack-effect passive natural cooling and ventilation.',
          badge: 'PHASE 07 // APEX OCULUS ROOF',
          durationSeconds: 8,
          tradeSpecialty: 'Automated Building Enclosure Systems',
          safetyProtocol: 'Apex climbing safety harness static cable attachment',
          toolsRequired: ['Linear Actuator Calibrator', 'Digital Wind Anemometer'],
          materialsRequired: ['Motorized Aluminum Ventilator Louvers', 'Microprocessor Environmental Controller'],
          daysEstimate: 20
        },
        {
          id: 7,
          title: 'Timber Boardwalks, Water Lily Basin & Entry',
          subtitle: 'Circulation Boardwalks & Aquatic Ecosystem',
          description: 'Constructing recycled composite timber boardwalk pathways, a 120m² aquatic water lily reflecting basin, and interactive visitor pavilion entry.',
          badge: 'PHASE 08 // BOTANICAL FINISHES',
          durationSeconds: 7,
          tradeSpecialty: 'Aquatic Landscape & Visitor Experience',
          safetyProtocol: 'Slip-resistant decking surface testing and pool edge safety rails',
          toolsRequired: ['Pneumatic Brad Nailers', 'Submersible Pond Liner Welder'],
          materialsRequired: ['Recycled Composite Decking Planks', 'EPDM Heavy Aquatic Pond Liner'],
          daysEstimate: 20
        }
      ];

    case 'timberoffice':
      return [
        {
          id: 0,
          title: 'Urban Lot Sub-Base Excavation & Retaining',
          subtitle: 'Low-Carbon Earth Excavation Datum',
          description: 'Excavating urban footprint, sheet piling perimeter retaining walls, and stabilizing foundation bed with recycled crushed stone sub-base.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Sustainable Urban Geotechnical',
          safetyProtocol: 'Vibration monitoring on adjacent structures and noise mitigation',
          toolsRequired: ['Vibratory Sheet Piling Rig', 'Track Excavator (25T)'],
          materialsRequired: ['Interlocking Steel Sheet Piles', 'Recycled Crushed Concrete Aggregate'],
          daysEstimate: 30
        },
        {
          id: 1,
          title: 'Low-Carbon GGBS Slag Concrete Foundation Raft',
          subtitle: '70% Slag Cement Replacement Raft Slab',
          description: 'Pouring 1,200mm foundation raft using low-embodied-carbon concrete with 70% Ground Granulated Blast-furnace Slag (GGBS) replacement.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Low-Carbon Concrete Placement',
          safetyProtocol: 'Extended curing duration protocol for high-slag concrete mixes',
          toolsRequired: ['Twin Concrete Boom Pumps', 'Maturity Sensor Data Logger'],
          materialsRequired: ['Low-Carbon GGBS Concrete Mix', '100% Recycled Scrap Rebar'],
          daysEstimate: 30
        },
        {
          id: 2,
          title: '5-Story Glued-Laminated Post & Beam Timber Grid',
          subtitle: 'Glulam Columns, Girders & Concealed Steel Nodes',
          description: 'Erecting 5-story European spruce glued-laminated timber columns and beams joined with concealed internal steel knife plates and dowels.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Mass Timber Structural Erection',
          safetyProtocol: 'Weather protection covers on all timber members during rain',
          toolsRequired: ['Tower Crane (20T)', 'Magnetic Dowel Pin Aligners'],
          materialsRequired: ['Glued Laminated Timber (GL28c)', 'High-Strength Steel Knife Connector Plates'],
          daysEstimate: 50
        },
        {
          id: 3,
          title: '7-Ply Cross-Laminated Timber (CLT) Floor Slabs',
          subtitle: 'Acoustically Decoupled Prefabricated CLT Panels',
          description: 'Craning 7-ply Cross-Laminated Timber floor panels directly into place, sealing joints with acoustic elastomeric membranes.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Cross-Laminated Timber Specialists',
          safetyProtocol: 'Leading-edge perimeter fall-arrest netting on each timber floor',
          toolsRequired: ['Vacuum Slab Lifter Beam', 'High-Torque Wood Screw Drivers'],
          materialsRequired: ['7-Ply Structural CLT Panels (240mm)', 'Acoustic EPDM Resilient Strip'],
          daysEstimate: 40
        },
        {
          id: 4,
          title: 'Thermally Broken Timber Curtain Wall Facade',
          subtitle: 'Triple-Glazed Passive House Certified Envelope',
          description: 'Installing factory-assembled timber-aluminum composite curtain wall with argon-filled triple glazing and motorized exterior venetian blinds.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Passive House Glazing Systems',
          safetyProtocol: 'Airtightness blower door verification (< 0.6 ACH @ 50 Pa)',
          toolsRequired: ['Spider Glass Crane', 'Airtight Tape Application Roller'],
          materialsRequired: ['Argon Triple-Glazed Units (Ug 0.5 W/m²K)', 'Larch Structural Mullion Profiles'],
          daysEstimate: 45
        },
        {
          id: 5,
          title: 'Exposed Timber Ceilings & Acoustic Work Hubs',
          subtitle: 'Zero-VOC Natural Finishes & Raised Access Floors',
          description: 'Installing raised modular access flooring for underfloor air distribution, preserving exposed wood ceilings with non-toxic natural plant oils.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Biophilic Interior Architecture & MEP',
          safetyProtocol: 'Indoor air quality TVOC verification testing',
          toolsRequired: ['Pedestal Floor Laser Leveler', 'Low-Pressure Oil Spray Applicator'],
          materialsRequired: ['Calcium Sulphate Raised Access Floor Tiles', 'Zero-VOC Natural Linseed Wood Oil'],
          daysEstimate: 40
        },
        {
          id: 6,
          title: 'Sedum Green Roof & Rooftop Solar Timber Pergola',
          subtitle: 'Stormwater Retention Roof & 60kW Solar Array',
          description: 'Laying extensive sedum green roof for urban stormwater attenuation, crowned with a glulam timber pergola supporting a 60kW solar PV array.',
          badge: 'PHASE 07 // GREEN ROOF & SOLAR',
          durationSeconds: 8,
          tradeSpecialty: 'Living Green Roofs & Solar Engineering',
          safetyProtocol: 'Roof edge static lifeline safety cable harness systems',
          toolsRequired: ['Roof Crane Material Hoist', 'Solar String Inverter Tester'],
          materialsRequired: ['Pre-Cultivated Sedum Vegetation Mats', 'Bifacial Photovoltaic Solar Modules'],
          daysEstimate: 25
        },
        {
          id: 7,
          title: 'Permeable Granite Paver Plaza & Rain Gardens',
          subtitle: 'Civic Pedestrian Realm & Bioretention Swales',
          description: 'Paving surrounding civic plaza with permeable granite setts, installing native rain garden bio-swales to capture 100% of site surface runoff.',
          badge: 'PHASE 08 // CIVIC PLAZA FINISHES',
          durationSeconds: 7,
          tradeSpecialty: 'Urban Landscape & Sustainable Drainage',
          safetyProtocol: 'Infiltration rate testing of permeable pavement bedding',
          toolsRequired: ['Plate Compactor with Rubber Mat', 'Laser Grade Total Station'],
          materialsRequired: ['Permeable Granite Setts', 'Engineered Bio-Filtration Soil Mix'],
          daysEstimate: 20
        }
      ];

    case 'watchtower':
      return [
        {
          id: 0,
          title: 'Headland Granite Core Drilling & Micropiles',
          subtitle: 'Promontory Bedrock Drilling & Seismic Dowels',
          description: 'Diamond core drilling high-energy coastal granite headland, grouting 18m deep tensioned titanium alloy micropiles to lock cliff foundation.',
          badge: 'PHASE 01 // CLIFF HEADLAND',
          durationSeconds: 7,
          tradeSpecialty: 'Coastal Geotechnical Engineering',
          safetyProtocol: 'Wave spray surge barriers and redundant cliff tie-back harnesses',
          toolsRequired: ['Rotary Hydraulic Core Drill', 'Colloidal Grout Mixer'],
          materialsRequired: ['Titanium-Coated Micropiles', 'Marine Ultra-High-Strength Grout'],
          daysEstimate: 30
        },
        {
          id: 1,
          title: 'Heavy Mass Concrete Anchor Block Foundation',
          subtitle: 'Overturning-Moment Resisting Anchor Plinth',
          description: 'Casting massive 10m x 10m x 1.4m concrete anchor block engineered with dense steel rebar cages to resist hurricane-force overturning moments.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Mass Structural Marine Concrete',
          safetyProtocol: 'Formwork tie anchor load-cell inspection',
          toolsRequired: ['Truck-Mounted Boom Pump (42m)', 'High-Power Rebar Benders'],
          materialsRequired: ['Sulfate-Resistant Marine Concrete', 'High-Yield Epoxy Rebar'],
          daysEstimate: 25
        },
        {
          id: 2,
          title: '28m Tapering Cor-Ten Steel Monolithic Shaft',
          subtitle: 'Self-Weathering Steel Tower Shell',
          description: 'Erecting 4 pre-fabricated tapering Cor-Ten steel hollow shell segments, full-penetration welded to form an unbroken monolithic 28-meter shaft.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Heavy Structural Steel Rigging',
          safetyProtocol: 'Ultrasonic non-destructive testing (NDT) on 100% of tower welds',
          toolsRequired: ['All-Terrain Heavy Crane (120T)', 'Automatic Submerged Arc Welder'],
          materialsRequired: ['Corten A588 Weathering Steel Plates (25mm)', 'Low-Hydrogen Welding Electrodes'],
          daysEstimate: 50
        },
        {
          id: 3,
          title: 'Internal Helical Steel Spiral Staircase Core',
          subtitle: '17m Vertical Helical Stairs & Rest Landings',
          description: 'Hoisting modular prefabricated helical steel spiral stair core and intermediate structural rest platforms up inside the hollow tower shaft.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Metal Fabrication',
          safetyProtocol: 'Internal vertical safety ladder fall-arrest rope grabs',
          toolsRequired: ['Internal Electric Chain Hoists', 'Laser Plumb Alignment Line'],
          materialsRequired: ['Laser-Cut Perforated Steel Treads', 'High-Tensile Structural Fasteners'],
          daysEstimate: 30
        },
        {
          id: 4,
          title: 'Vertical Recessed Structural Glazing Slits',
          subtitle: 'Aerodynamic Narrow Slit Glazing',
          description: 'Installing narrow vertical recessed structural glass slits designed to withstand 220 km/h wind gusts without shedding boundary layer turbulence.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Specialist High-Wind Glazing',
          safetyProtocol: 'Rope access technicians with dual mechanical anchors',
          toolsRequired: ['Rope Access Rigging Kit', 'Structural Silicone Injection Gun'],
          materialsRequired: ['Laminated Hurricane-Resistant Glass', 'Dow Corning Structural Sealant'],
          daysEstimate: 25
        },
        {
          id: 5,
          title: 'Watchkeeper Navigation Station & Radar Desk',
          subtitle: 'Acoustic Marine Living Quarters & Radar Core',
          description: 'Fitting out climate-conditioned watchkeeper control room with AIS marine radar consoles, communication radios, and thermal sleeping berths.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Maritime Command & Communications',
          safetyProtocol: 'Radio frequency electromagnetic radiation shielding tests',
          toolsRequired: ['RF Shielding Tester', 'Precision Crimping Toolset'],
          materialsRequired: ['Acoustic Marine Plywood Paneling', 'Marine Radar Console Hardware'],
          daysEstimate: 30
        },
        {
          id: 6,
          title: 'Cantilevered 360° Glass Observation Lantern',
          subtitle: 'Panoramic 360° Crow-Nest Glass Lantern',
          description: 'Craning 6.5m cantilevered cubic glass observation lantern at the 28m tower summit, glazed with 4-sided structural silicone for 360° vistas.',
          badge: 'PHASE 07 // OBSERVATION LANTERN',
          durationSeconds: 9,
          tradeSpecialty: 'High-Altitude Structural Glazing',
          safetyProtocol: 'High-altitude harness static lifelines and emergency descent gear',
          toolsRequired: ['Heavy Crane with Fly Jib', 'Glass Suction Manipulator Beam'],
          materialsRequired: ['Triple Low-Iron Laminated Glass', 'Structural Steel Lantern Roof Cap'],
          daysEstimate: 35
        },
        {
          id: 7,
          title: 'Promontory Boardwalk, Marine Horn & Beacon',
          subtitle: 'Weathered Steel Clifftop Walk & Nav Fog Horn',
          description: 'Constructing cantilevered Cor-Ten steel clifftop boardwalk, mounting automated marine navigation foghorn and 12-nautical-mile LED beacon.',
          badge: 'PHASE 08 // BEACON & BOARDWALK',
          durationSeconds: 7,
          tradeSpecialty: 'Marine Aids to Navigation & Hardscaping',
          safetyProtocol: 'Sound pressure level hearing protection during fog horn testing',
          toolsRequired: ['Rotary Hammer Drill', 'Sound Level Calibrator'],
          materialsRequired: ['Corten Steel Balustrade Railings', '12-NM Solar Navigational Marine Beacon'],
          daysEstimate: 20
        }
      ];

    case 'church':
      return [
        {
          id: 0,
          title: 'Sanctuary Excavation & Pool Bed Grading',
          subtitle: 'Acoustic Sacred Ground Datum & Drainage',
          description: 'Laser excavating sanctuary site, grading shallow perimeter reflecting pool bed, and casting sub-base mud slab benchmarks.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 7,
          tradeSpecialty: 'Sacred Architecture Geotechnical',
          safetyProtocol: 'Continuous laser datum verification and soil compaction checks',
          toolsRequired: ['Laser-Guided Grader', 'Vibratory Plate Compactor'],
          materialsRequired: ['Mass Concrete Mud Slab', 'Bentonite Soil Waterproofing'],
          daysEstimate: 20
        },
        {
          id: 1,
          title: 'Dual Reinforced Concrete Thrust Buttress Anchors',
          subtitle: 'Massive Footing Buttresses for Hypar Shell',
          description: 'Pouring dual massive reinforced concrete thrust buttress foundations engineered to absorb the concentrated thrust of the curved hypar shell.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Heavy Structural Concrete',
          safetyProtocol: 'Hydraulic thrust anchor verification against bedrock dowels',
          toolsRequired: ['Concrete Boom Pump', 'High-Frequency Form Vibrators'],
          materialsRequired: ['High-Strength Concrete C50/60', 'High-Yield B500B Rebar'],
          daysEstimate: 30
        },
        {
          id: 2,
          title: '80mm Prestressed Concrete Hypar Thin-Shell',
          subtitle: 'Double-Curved Hyperbolic Paraboloid Thin Shell',
          description: 'Constructing curved ruled-surface timber formwork, weaving prestressed steel mesh, and shotcreting 80mm ultra-thin high-performance concrete.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 9,
          tradeSpecialty: 'Master Thin-Shell Concrete Craftsmen',
          safetyProtocol: 'Continuous formwork deflection sensors during thin-shell spray pour',
          toolsRequired: ['Pneumatic Shotcrete Gun', 'Precision Ruled Timber Formwork'],
          materialsRequired: ['Ultra-High Performance Fiber-Reinforced Concrete', 'Prestressed High-Tensile Steel Wire Mesh'],
          daysEstimate: 60
        },
        {
          id: 3,
          title: 'Polished White Carrara Marble Sanctuary Floor',
          subtitle: 'Monolithic Altar Podium & Sanctuary Slab',
          description: 'Laying post-tensioned floor slab surfaced with hand-selected bookmatched polished white Carrara marble slabs and integrated altar dais.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Artisanal Marble Stone Masonry',
          safetyProtocol: 'Zero-scratch protective covers on polished marble slabs',
          toolsRequired: ['Vacuum Slab Lifter', 'Diamond Polishing Water Machine'],
          materialsRequired: ['Polished Carrara Statuario Marble', 'Flexible Polymer Tile Mortar'],
          daysEstimate: 30
        },
        {
          id: 4,
          title: 'Monumental Cobalt Blue Stained-Glass Facade',
          subtitle: '10m Triangular Facetted Sacred Glazing',
          description: 'Installing towering 10m high triangular facade of mouth-blown cobalt blue antique stained glass set into slender structural bronze mullions.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Sacred Art Glass Specialists',
          safetyProtocol: 'Specialist glass vacuum cradles with redundant vacuum reservoirs',
          toolsRequired: ['Spider Crane with Glass Jib', 'Bronze TIG Welding Rig'],
          materialsRequired: ['Mouth-Blown Antique Cobalt Stained Glass', 'Extruded Architectural Bronze Mullions'],
          daysEstimate: 40
        },
        {
          id: 5,
          title: 'Handcrafted White Oak Pews & Travertine Altar',
          subtitle: 'Acoustic Sacred Choir Nave & Stone Monolith',
          description: 'Installing handcrafted quarter-sawn white oak church pews tuned for choral acoustics, and setting 8-ton monolithic travertine altar block.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Sacred Joinery & Monumental Masonry',
          safetyProtocol: 'Heavy stone rigging strap certification for 8-ton altar monolith',
          toolsRequired: ['Overhead Gantry Crane', 'Precision Wood Joinery Chisels'],
          materialsRequired: ['Quarter-Sawn European White Oak', 'Roman Navona Travertine Monolith'],
          daysEstimate: 35
        },
        {
          id: 6,
          title: 'Sculptural Shell Apex Ridge & Gold Cross Finial',
          subtitle: 'Slender Golden Cross Finial & Ridge Sealing',
          description: 'Sealing compound hyperbolic concrete ridge with waterproof lead-zinc flashing, erecting slender 3.5m 24-karat gold-leaf finished architectural cross.',
          badge: 'PHASE 07 // APEX RIDGE & FINIAL',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Guilding & Specialist Roofing',
          safetyProtocol: 'Apex static line harness system and lightning protection continuity test',
          toolsRequired: ['High-Altitude Boom Lift (30m)', 'Gold-Leaf Gilding Tools'],
          materialsRequired: ['Solid Stainless Steel Cross (24K Gold Gilt)', 'Rolled Sheet Lead Flashing'],
          daysEstimate: 20
        },
        {
          id: 7,
          title: 'Travertine Reflecting Pool & Bell Campanile',
          subtitle: 'Acoustic Water Mirror & 12m Slender Campanile',
          description: 'Constructing 12m perimeter reflecting water basin with black basalt lining, and erecting slender free-standing concrete bell campanile with bronze bells.',
          badge: 'PHASE 08 // BASIN & CAMPANILE',
          durationSeconds: 7,
          tradeSpecialty: 'Civic Hardscaping & Bell Foundry Work',
          safetyProtocol: 'Bell rigging proof-load testing and electrical timer interlocks',
          toolsRequired: ['Mobile Crane (40T)', 'Underwater Pool Lighting Alignment Kit'],
          materialsRequired: ['Cast Bronze Church Bells', 'Honed Black Granite Basin Lining'],
          daysEstimate: 25
        }
      ];

    default:
      // Fallback for default villa or unlisted architecture
      return [
        {
          id: 0,
          title: 'Geotechnical Site Preparation',
          subtitle: 'Excavation & Laser Survey Datum',
          description: 'Laser-guided earthwork excavation, compaction to 98% Proctor density, and setting geodetic satellite control benchmarks.',
          badge: 'PHASE 01 // SUBTERRANEAN',
          durationSeconds: 6,
          tradeSpecialty: 'Civil & Geotechnical',
          safetyProtocol: 'Trench shoring and groundwater monitoring',
          toolsRequired: ['Laser Theodolite', 'Hydraulic Excavator', 'Plate Compactor'],
          materialsRequired: ['Granular Fill', 'Geotextile Membrane'],
          daysEstimate: 15
        },
        {
          id: 1,
          title: 'Reinforced Substructure & Footings',
          subtitle: 'Pads, Grade Beams & Waterproofing',
          description: 'Pouring high-strength concrete foundations with rebar cages, water-stop joints, and multi-layer elastomeric waterproofing tanking.',
          badge: 'PHASE 02 // SUBSTRUCTURE',
          durationSeconds: 7,
          tradeSpecialty: 'Structural Concrete',
          safetyProtocol: 'Rebar safety caps and concrete slump quality control',
          toolsRequired: ['Concrete Boom Pump', 'High-Frequency Vibrator'],
          materialsRequired: ['C35/45 Concrete', 'High-Tensile B500B Rebar'],
          daysEstimate: 20
        },
        {
          id: 2,
          title: 'Primary Structural Superstructure',
          subtitle: 'Columns, Moment Beams & Frames',
          description: 'Precision erection of load-bearing structural framework engineered to resist gravity, seismic, and lateral wind stresses.',
          badge: 'PHASE 03 // SUPERSTRUCTURE',
          durationSeconds: 8,
          tradeSpecialty: 'Structural Rigging',
          safetyProtocol: '100% harness tie-off and exclusion perimeter',
          toolsRequired: ['Telescopic Crane', 'Impact Torque Multipliers'],
          materialsRequired: ['Structural Steel / Glulam Timber', 'High-Yield Grade Bolts'],
          daysEstimate: 30
        },
        {
          id: 3,
          title: 'Composite Slabs & Intermediate Decks',
          subtitle: 'Floor Diaphragms & Circulation Core',
          description: 'Installing post-tensioned floor slabs, stairs, and structural utility core diaphragms for multi-level circulation.',
          badge: 'PHASE 04 // SLABS & DECKS',
          durationSeconds: 8,
          tradeSpecialty: 'Concrete Forming & Decks',
          safetyProtocol: 'Perimeter edge barrier netting and catch screens',
          toolsRequired: ['Laser Screed', 'Hydraulic Tension Jack'],
          materialsRequired: ['Composite Steel Decking', 'Post-Tension Tendons'],
          daysEstimate: 25
        },
        {
          id: 4,
          title: 'High-Performance Facade & Envelope',
          subtitle: 'Glazing, Thermal Barrier & Cladding',
          description: 'Hanging unitized thermally broken architectural glass curtain walls and insulated rainscreen facade panels.',
          badge: 'PHASE 05 // ENVELOPE',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Glazing & Cladding',
          safetyProtocol: 'Dual-circuit vacuum glass lifter checks',
          toolsRequired: ['Glass Vacuum Crane', 'Mast Climbing Work Platform'],
          materialsRequired: ['Triple Low-E Glazing Units', 'Anodized Mullions'],
          daysEstimate: 30
        },
        {
          id: 5,
          title: 'Interior Architectural Fit-Out & MEP',
          subtitle: 'Partitions, Joinery & Environmental Systems',
          description: 'Constructing acoustic partitions, fine architectural joinery, building management systems, and concealed environmental ducting.',
          badge: 'PHASE 06 // INTERIOR & MEP',
          durationSeconds: 8,
          tradeSpecialty: 'Architectural Fit-Out & Joinery',
          safetyProtocol: 'Low-VOC air quality certification and dust extraction',
          toolsRequired: ['Track Saw', 'Dust Extraction Vacuum', 'Laser Level'],
          materialsRequired: ['Hardwood Planking', 'Acoustic Insulation Boards'],
          daysEstimate: 35
        },
        {
          id: 6,
          title: 'Weatherproof Roof & Sustainable Energy',
          subtitle: 'Canopy Deck, Insulation & Solar PV',
          description: 'Laying seamless EPDM waterproofing roof membrane, high-efficiency insulation, and clean-energy solar photovoltaic arrays.',
          badge: 'PHASE 07 // ROOF & ENERGY',
          durationSeconds: 7,
          tradeSpecialty: 'Roofing & Solar Energy',
          safetyProtocol: 'Roof edge static lifeline harness systems',
          toolsRequired: ['Hot-Air Membrane Welder', 'Solar MC4 Crimpers'],
          materialsRequired: ['Tapered PIR Insulation', 'EPDM Membrane', 'Solar PV Modules'],
          daysEstimate: 20
        },
        {
          id: 7,
          title: 'Civic Hardscape, Landscape & Illumination',
          subtitle: 'Paved Terraces, Specimen Trees & LEDs',
          description: 'Installing architectural stone paving terraces, specimen landscape plantings, water features, and 2700K low-glare night lighting.',
          badge: 'PHASE 08 // FINISHES & REALM',
          durationSeconds: 8,
          tradeSpecialty: 'Landscape & Lighting Architecture',
          safetyProtocol: 'Underwater IP68 electrical testing & pedestrian safe paths',
          toolsRequired: ['Stone Paver Lifter', 'Landscape Mini-Digger'],
          materialsRequired: ['Natural Stone Pavers', 'Specimen Trees', 'Linear LED Fixtures'],
          daysEstimate: 18
        }
      ];
  }
}

// Generates accurate 3D Callout Annotations matching each model geometry
export function getCalloutsForProduct(productId: string): CalloutAnnotation[] {
  switch (productId) {
    case 'highrise':
      return [
        {
          id: 'hr_c0',
          componentId: 'hr-site',
          phaseId: 0,
          label: 'Slurry Retaining Wall',
          sublabel: '28m deep reinforced concrete perimeter wall',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-14, 0, 14),
          offsetSide: 'top-left'
        },
        {
          id: 'hr_c1',
          componentId: 'hr-found',
          phaseId: 1,
          label: 'Mass Raft Foundation',
          sublabel: '2.5m thick C50/60 concrete foundation slab',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(11, 0.8, -11),
          offsetSide: 'top-right'
        },
        {
          id: 'hr_c2',
          componentId: 'hr-diagrid',
          phaseId: 2,
          label: 'Tubular Diagrid Skeleton',
          sublabel: 'Wind and seismic resisting steel mega-frame',
          tag: 'SUPERSTRUCTURE',
          worldPosition: new THREE.Vector3(-8, 14, 8),
          offsetSide: 'top-left'
        },
        {
          id: 'hr_c3',
          componentId: 'hr-slabs',
          phaseId: 3,
          label: 'Composite Floor Slabs',
          sublabel: '6-tier composite deck floor diaphragms',
          tag: 'SLABS',
          worldPosition: new THREE.Vector3(8, 10, -8),
          offsetSide: 'top-right'
        },
        {
          id: 'hr_c4',
          componentId: 'hr-facade',
          phaseId: 4,
          label: 'Unitized Curtain Wall',
          sublabel: 'Triple Low-E glass with acoustic thermal breaks',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 16, 8),
          offsetSide: 'top-left'
        },
        {
          id: 'hr_c5',
          componentId: 'hr-interior',
          phaseId: 5,
          label: 'Commercial Elevator Core',
          sublabel: 'Destination-dispatch high-speed vertical banks',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 10, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'hr_c6',
          componentId: 'hr-crown',
          phaseId: 6,
          label: 'Tuned Mass Damper Spire',
          sublabel: '400-ton pendulum damper & BMU maintenance rig',
          tag: 'CROWN',
          worldPosition: new THREE.Vector3(0, 24, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'hr_c7',
          componentId: 'hr-plaza',
          phaseId: 7,
          label: 'Granite Pedestrian Plaza',
          sublabel: 'Basalt paving with perimeter security bollards',
          tag: 'CIVIC',
          worldPosition: new THREE.Vector3(13, 0.2, 13),
          offsetSide: 'top-right'
        }
      ];

    case 'museum':
      return [
        {
          id: 'mu_c0',
          componentId: 'mu-site',
          phaseId: 0,
          label: 'Seismic Isolation Moat',
          sublabel: 'Perimeter cut retaining isolation basin',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-15, 0, 12),
          offsetSide: 'top-left'
        },
        {
          id: 'mu_c1',
          componentId: 'mu-found',
          phaseId: 1,
          label: 'Lead-Rubber Isolators',
          sublabel: 'Elastomeric seismic decoupling pads',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(12, 0.6, -9),
          offsetSide: 'top-right'
        },
        {
          id: 'mu_c2',
          componentId: 'mu-walls',
          phaseId: 2,
          label: 'Board-Formed Pylons',
          sublabel: 'Monolithic concrete with Douglas Fir wood grain',
          tag: 'STRUCTURE',
          worldPosition: new THREE.Vector3(-8, 6, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'mu_c3',
          componentId: 'mu-bridge',
          phaseId: 3,
          label: '12m Cantilevered Bridge',
          sublabel: 'Post-tensioned heroic exhibition gallery deck',
          tag: 'SLABS',
          worldPosition: new THREE.Vector3(0, 4.8, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'mu_c4',
          componentId: 'mu-glazing',
          phaseId: 4,
          label: 'Zenithal Slit Glazing',
          sublabel: 'UV-blocking indirect natural north light',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 6, 8),
          offsetSide: 'top-left'
        },
        {
          id: 'mu_c5',
          componentId: 'mu-interior',
          phaseId: 5,
          label: 'Micro-Cement Galleries',
          sublabel: 'Seamless acoustic fabric ceilings & framing LEDs',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 3, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'mu_c6',
          componentId: 'mu-roof',
          phaseId: 6,
          label: 'Coffered Concrete Canopy',
          sublabel: 'Deep acoustic waffle grid with motorized baffles',
          tag: 'ROOF',
          worldPosition: new THREE.Vector3(0, 10.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'mu_c7',
          componentId: 'mu-water',
          phaseId: 7,
          label: 'Basalt Reflecting Basin',
          sublabel: 'Obsidian mirror water court and sculpture plinths',
          tag: 'WATER',
          worldPosition: new THREE.Vector3(14, 0.2, 11),
          offsetSide: 'top-right'
        }
      ];

    case 'arena':
      return [
        {
          id: 'ar_c0',
          componentId: 'ar-site',
          phaseId: 0,
          label: 'Amphitheater Bowl Earthwork',
          sublabel: 'Elliptical excavation & bedrock micropiles',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-14, 0, 10),
          offsetSide: 'top-left'
        },
        {
          id: 'ar_c1',
          componentId: 'ar-ring',
          phaseId: 1,
          label: 'Thrust Compression Ring',
          sublabel: 'Post-tensioned concrete oval ring beam',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(13, 0.4, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'ar_c2',
          componentId: 'ar-glulam',
          phaseId: 2,
          label: 'Curved Glulam Rib Arches',
          sublabel: 'Double-curved parametric spruce timber arches',
          tag: 'SUPERSTRUCTURE',
          worldPosition: new THREE.Vector3(0, 8.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'ar_c3',
          componentId: 'ar-grandstands',
          phaseId: 3,
          label: 'Precast Seating Bleachers',
          sublabel: 'Acoustically decoupled modular grandstands',
          tag: 'SLABS',
          worldPosition: new THREE.Vector3(8, 2.5, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'ar_c4',
          componentId: 'ar-etfe',
          phaseId: 4,
          label: 'Translucent ETFE Membrane',
          sublabel: 'Double-skin acoustic gridshell cladding',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 6, 8.5),
          offsetSide: 'top-left'
        },
        {
          id: 'ar_c5',
          componentId: 'ar-interior',
          phaseId: 5,
          label: 'Micro-Perforated Acoustic Shell',
          sublabel: 'Wood veneer resonators and central rigging grid',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 3, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'ar_c6',
          componentId: 'ar-zinc',
          phaseId: 6,
          label: 'Standing Seam Zinc Shell',
          sublabel: 'Titanium-zinc compound curved outer canopy',
          tag: 'ROOF',
          worldPosition: new THREE.Vector3(0, 9.2, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'ar_c7',
          componentId: 'ar-concourse',
          phaseId: 7,
          label: 'Exposed Aggregate Concourse',
          sublabel: 'Smart turnstiles and programmable LED strips',
          tag: 'CONCOURSE',
          worldPosition: new THREE.Vector3(15, 0.3, 10),
          offsetSide: 'top-right'
        }
      ];

    case 'rammedearth':
      return [
        {
          id: 're_c0',
          componentId: 're-site',
          phaseId: 0,
          label: 'Desert Caliche Bench',
          sublabel: 'Lime-stabilized subsoil foundation bed',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-12, 0, 8),
          offsetSide: 'top-left'
        },
        {
          id: 're_c1',
          componentId: 're-found',
          phaseId: 1,
          label: 'Insulated Stem Walls',
          sublabel: 'Thermal break barrier isolating desert ground',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(9, 0.6, -7),
          offsetSide: 'top-right'
        },
        {
          id: 're_c2',
          componentId: 're-walls',
          phaseId: 2,
          label: '600mm Rammed Earth Walls',
          sublabel: 'Pneumatically compacted subsoil & clay',
          tag: 'THERMAL MASS',
          worldPosition: new THREE.Vector3(0, 3.5, -6),
          offsetSide: 'top-left'
        },
        {
          id: 're_c3',
          componentId: 're-floor',
          phaseId: 3,
          label: 'Ochre Polished Slab',
          sublabel: 'Hydronic radiant cooling pipe network',
          tag: 'SLABS',
          worldPosition: new THREE.Vector3(5, 0.5, 2),
          offsetSide: 'top-right'
        },
        {
          id: 're_c4',
          componentId: 're-glass',
          phaseId: 4,
          label: 'Pocket Glass in Corten',
          sublabel: 'Deep reveals preventing direct solar radiation',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 2.8, 5.5),
          offsetSide: 'top-left'
        },
        {
          id: 're_c5',
          componentId: 're-interior',
          phaseId: 5,
          label: 'Mesquite Joinery & Hearth',
          sublabel: 'Hand-carved regional timber and adobe banquette',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 2.2, 0),
          offsetSide: 'top-right'
        },
        {
          id: 're_c6',
          componentId: 're-overhang',
          phaseId: 6,
          label: 'Cor-Ten Steel Parasol',
          sublabel: '3m passive shading roof canopy',
          tag: 'ROOF',
          worldPosition: new THREE.Vector3(0, 5.4, 0),
          offsetSide: 'top-left'
        },
        {
          id: 're_c7',
          componentId: 're-xeriscape',
          phaseId: 7,
          label: 'Xeriscape Cactus Garden',
          sublabel: 'Saguaro, agave, and crushed granite gravel',
          tag: 'GARDEN',
          worldPosition: new THREE.Vector3(10, 0.2, 8),
          offsetSide: 'top-right'
        }
      ];

    case 'flothabitat':
      return [
        {
          id: 'flot_c0',
          componentId: 'flot-site',
          phaseId: 0,
          label: 'Seabed Clump Anchors',
          sublabel: '12-ton concrete deadweights & synthetic lines',
          tag: 'OCEAN DATUM',
          worldPosition: new THREE.Vector3(-8, 0.2, 8),
          offsetSide: 'top-left'
        },
        {
          id: 'flot_c1',
          componentId: 'flot-pontoons',
          phaseId: 1,
          label: 'Twin Buoyancy Pontoons',
          sublabel: '16m multi-chamber marine aluminum ballast tanks',
          tag: 'BUOYANCY',
          worldPosition: new THREE.Vector3(7, -0.6, 5.5),
          offsetSide: 'top-right'
        },
        {
          id: 'flot_c2',
          componentId: 'flot-truss',
          phaseId: 2,
          label: '316L Stainless Spaceframe',
          sublabel: 'Dynamic wave shear & articulated node lattice',
          tag: 'SPACEFRAME',
          worldPosition: new THREE.Vector3(-6, 2.2, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'flot_c3',
          componentId: 'flot-deck',
          phaseId: 3,
          label: 'Composite Honeycomb Deck',
          sublabel: '15m circular carbon-fiber & teak lab deck',
          tag: 'DECK SLAB',
          worldPosition: new THREE.Vector3(6, 2.5, 4),
          offsetSide: 'top-right'
        },
        {
          id: 'flot_c4',
          componentId: 'flot-glass',
          phaseId: 4,
          label: 'Panoramic Acrylic Glazing',
          sublabel: '360° thermoformed marine pressure-rated acrylic',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(-5, 4.2, 4),
          offsetSide: 'top-left'
        },
        {
          id: 'flot_c5',
          componentId: 'flot-lab',
          phaseId: 5,
          label: 'Marine Biology Wet Lab',
          sublabel: 'Seawater reverse-osmosis core & crew berths',
          tag: 'LIFE SUPPORT',
          worldPosition: new THREE.Vector3(0, 3.2, 2),
          offsetSide: 'top-right'
        },
        {
          id: 'flot_c6',
          componentId: 'flot-dome',
          phaseId: 6,
          label: 'Geodesic Skylight & Solar Rim',
          sublabel: '18kW bifacial solar ring & telemetry mast',
          tag: 'SOLAR DOME',
          worldPosition: new THREE.Vector3(0, 7.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'flot_c7',
          componentId: 'flot-piers',
          phaseId: 7,
          label: 'Floating Timber Mooring Dock',
          sublabel: 'Pneumatic wave dissipators & solar LED beacons',
          tag: 'HARBOR',
          worldPosition: new THREE.Vector3(0, 0.5, 10),
          offsetSide: 'top-right'
        }
      ];

    case 'origami':
      return [
        {
          id: 'ori_c0',
          componentId: 'ori-site',
          phaseId: 0,
          label: 'Karesansui Gravel Bed',
          sublabel: 'Shirakawa quartz sand garden & drainage',
          tag: 'ZEN DATUM',
          worldPosition: new THREE.Vector3(-8, 0, 7),
          offsetSide: 'top-left'
        },
        {
          id: 'ori_c1',
          componentId: 'ori-footings',
          phaseId: 1,
          label: 'Ishibatate Granite Pads',
          sublabel: 'Unanchored natural stone seismic stump pads',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(5, 0.4, 4),
          offsetSide: 'top-right'
        },
        {
          id: 'ori_c2',
          componentId: 'ori-frame',
          phaseId: 2,
          label: 'Hinoki Mortise-Tenon Frame',
          sublabel: 'Aged Japanese cypress interlocking carpentry',
          tag: 'STRUCTURE',
          worldPosition: new THREE.Vector3(-5, 3.2, -4),
          offsetSide: 'top-left'
        },
        {
          id: 'ori_c3',
          componentId: 'ori-engawa',
          phaseId: 3,
          label: 'Cantilevered Cedar Engawa',
          sublabel: 'Raised wraparound timber veranda porch',
          tag: 'ENGAWA DECK',
          worldPosition: new THREE.Vector3(6, 0.8, 3),
          offsetSide: 'top-right'
        },
        {
          id: 'ori_c4',
          componentId: 'ori-screens',
          phaseId: 4,
          label: 'Sliding Shoji & Yakisugi',
          sublabel: 'Handmade Kozo Washi paper & charred cedar slats',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 2.5, 4.0),
          offsetSide: 'top-left'
        },
        {
          id: 'ori_c5',
          componentId: 'ori-interior',
          phaseId: 5,
          label: 'Tatami Mats & Tokonoma',
          sublabel: 'Rush-grass straw mats & tea ceremony alcove',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 1.2, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'ori_c6',
          componentId: 'ori-roof',
          phaseId: 6,
          label: 'Folded Origami Zinc Roof',
          sublabel: 'Faceted dark zinc standing-seam planes',
          tag: 'ORIGAMI ROOF',
          worldPosition: new THREE.Vector3(-2, 5.6, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'ori_c7',
          componentId: 'ori-garden',
          phaseId: 7,
          label: 'Tsukubai Basin & Maple',
          sublabel: 'Ancient granite stone water basin & 40-yr maple',
          tag: 'ZEN REALM',
          worldPosition: new THREE.Vector3(5.5, 0.6, 4.5),
          offsetSide: 'top-right'
        }
      ];

    case 'verticalforest':
      return [
        {
          id: 'vf_c0',
          componentId: 'vf-site',
          phaseId: 0,
          label: 'Subterranean Caisson Pit',
          sublabel: 'Bentonite cutoff slurry & soldier piles',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-10, 0, 10),
          offsetSide: 'top-left'
        },
        {
          id: 'vf_c1',
          componentId: 'vf-found',
          phaseId: 1,
          label: 'Massive Basement Raft',
          sublabel: '2.0m solid C45/55 foundation slab',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(8, 0.6, -8),
          offsetSide: 'top-right'
        },
        {
          id: 'vf_c2',
          componentId: 'vf-core',
          phaseId: 2,
          label: 'Slipformed Elevator Core',
          sublabel: 'Concrete central vertical structural backbone',
          tag: 'SUPERSTRUCTURE',
          worldPosition: new THREE.Vector3(0, 12, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'vf_c3',
          componentId: 'vf-balconies',
          phaseId: 3,
          label: 'Cantilever Planter Terraces',
          sublabel: '3.8m post-tensioned soil-bearing trays',
          tag: 'BALCONIES',
          worldPosition: new THREE.Vector3(7, 10, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'vf_c4',
          componentId: 'vf-facade',
          phaseId: 4,
          label: 'Double-Skin Curtain Wall',
          sublabel: 'Thermally-broken highrise solar glazed skin',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(-6, 11, 6),
          offsetSide: 'top-left'
        },
        {
          id: 'vf_c5',
          componentId: 'vf-interior',
          phaseId: 5,
          label: 'Biophilic Office Core',
          sublabel: 'Centralized greywater recycling & timber ceilings',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 8, 4),
          offsetSide: 'top-right'
        },
        {
          id: 'vf_c6',
          componentId: 'vf-roof',
          phaseId: 6,
          label: 'Sky Forest Solar Pergola',
          sublabel: 'Rooftop botanical crown & 45kW PV array',
          tag: 'ROOFTOP',
          worldPosition: new THREE.Vector3(0, 20.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'vf_c7',
          componentId: 'vf-plants',
          phaseId: 7,
          label: '800+ Living Balcony Trees',
          sublabel: 'Typhoon-tethered oak, beech & living foliage',
          tag: 'BIODIVERSITY',
          worldPosition: new THREE.Vector3(6, 14, 6),
          offsetSide: 'top-right'
        }
      ];

    case 'geothermal':
      return [
        {
          id: 'geo_c0',
          componentId: 'geo-site',
          phaseId: 0,
          label: 'Deep Hillside Berm Trench',
          sublabel: 'Excavated thermal mass soil excavation cut',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-10, 0, 8),
          offsetSide: 'top-left'
        },
        {
          id: 'geo_c1',
          componentId: 'geo-found',
          phaseId: 1,
          label: 'Bunker Raft Foundation',
          sublabel: 'Tanked subterranean waterproof slab with waterstops',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(8, 0.4, -6),
          offsetSide: 'top-right'
        },
        {
          id: 'geo_c2',
          componentId: 'geo-arch',
          phaseId: 2,
          label: 'Monolithic Barrel Vault',
          sublabel: '400mm reinforced concrete arch shell',
          tag: 'ARCH SHELL',
          worldPosition: new THREE.Vector3(0, 4.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'geo_c3',
          componentId: 'geo-floor',
          phaseId: 3,
          label: 'Hydronic Polished Floor',
          sublabel: 'Dense embedded PEX geothermal cooling/heating loops',
          tag: 'SLABS',
          worldPosition: new THREE.Vector3(5, 1.0, 3),
          offsetSide: 'top-right'
        },
        {
          id: 'geo_c4',
          componentId: 'geo-lightwell',
          phaseId: 4,
          label: 'Sunken Lightwell Courtyard',
          sublabel: 'Triple-glazed passive daylighting window canyon',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(7, 3.2, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'geo_c5',
          componentId: 'geo-interior',
          phaseId: 5,
          label: 'Geothermal Heat Pump Core',
          sublabel: '24kW ground-source plant & birch wall joinery',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 2.6, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'geo_c6',
          componentId: 'geo-turf',
          phaseId: 6,
          label: 'Living Turf Soil Overburden',
          sublabel: '600mm green roof meadow & conical skylight oculus',
          tag: 'GREEN ROOF',
          worldPosition: new THREE.Vector3(0, 9.2, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'geo_c7',
          componentId: 'geo-boreholes',
          phaseId: 7,
          label: '120m Geothermal Boreholes',
          sublabel: 'Subterranean ground loops & split-slate terrace',
          tag: 'GEOTHERMAL',
          worldPosition: new THREE.Vector3(9, 0.2, 7),
          offsetSide: 'top-right'
        }
      ];

    case 'observatory':
      return [
        {
          id: 'obs_c0',
          componentId: 'obs-site',
          phaseId: 0,
          label: 'Ridge Bedrock Anchors',
          sublabel: 'Diamond core drilled Dywidag rock bolts',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-10, 0, 8),
          offsetSide: 'top-left'
        },
        {
          id: 'obs_c1',
          componentId: 'obs-found',
          phaseId: 1,
          label: 'Isolated Telescope Pier',
          sublabel: 'Vibration-free 4.5m solid concrete telescope foundation',
          tag: 'PIER FOUNDATION',
          worldPosition: new THREE.Vector3(0, 1.2, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'obs_c2',
          componentId: 'obs-drum',
          phaseId: 2,
          label: 'Rotunda Drum & Azimuth Rail',
          sublabel: '16m diameter cylindrical masonry & machined steel ring',
          tag: 'SUPERSTRUCTURE',
          worldPosition: new THREE.Vector3(7.5, 4.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'obs_c3',
          componentId: 'obs-deck',
          phaseId: 3,
          label: 'Azimuth Catwalk & Deck',
          sublabel: 'Vibration-damped steel viewing platform',
          tag: 'SLABS',
          worldPosition: new THREE.Vector3(-6.5, 6.7, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'obs_c4',
          componentId: 'obs-cladding',
          phaseId: 4,
          label: 'Aerodynamic Thermal Shell',
          sublabel: 'High-albedo composite aluminum cladding',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 4.5, 8.2),
          offsetSide: 'top-left'
        },
        {
          id: 'obs_c5',
          componentId: 'obs-control',
          phaseId: 5,
          label: 'Faraday Control Room',
          sublabel: 'RF-shielded CCD cryogenic plant & command consoles',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 3.2, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'obs_c6',
          componentId: 'obs-dome',
          phaseId: 6,
          label: 'Rotating Carbon Dome & Scope',
          sublabel: 'Motorized split shutter & 1.2m optical telescope',
          tag: 'TELESCOPE DOME',
          worldPosition: new THREE.Vector3(0, 11, 2),
          offsetSide: 'top-left'
        },
        {
          id: 'obs_c7',
          componentId: 'obs-pathway',
          phaseId: 7,
          label: '590nm Dark-Sky Pathway',
          sublabel: 'Monochromatic red LEDs & ultrasonic weather mast',
          tag: 'STARLIGHT REALM',
          worldPosition: new THREE.Vector3(9, 4, 0),
          offsetSide: 'top-right'
        }
      ];

    case 'loft':
      return [
        {
          id: 'loft_c0',
          componentId: 'loft-site',
          phaseId: 0,
          label: 'Foundry Remediation Bed',
          sublabel: '15-mil vapor retarder & crushed aggregate sub-base',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-11, 0, 7),
          offsetSide: 'top-left'
        },
        {
          id: 'loft_c1',
          componentId: 'loft-found',
          phaseId: 1,
          label: 'Underpinned Brick Piers',
          sublabel: 'Sequential high-strength concrete underpinning bays',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(10, 0.5, -6),
          offsetSide: 'top-right'
        },
        {
          id: 'loft_c2',
          componentId: 'loft-truss',
          phaseId: 2,
          label: 'Riveted Warren Trusses',
          sublabel: 'Restored wide-flange columns & 10T crane runway',
          tag: 'SUPERSTRUCTURE',
          worldPosition: new THREE.Vector3(0, 8, -4),
          offsetSide: 'top-left'
        },
        {
          id: 'loft_c3',
          componentId: 'loft-mezzanine',
          phaseId: 3,
          label: 'Reclaimed Timber Mezzanine',
          sublabel: 'Heavy factory heart-pine deck & blackened steel stairs',
          tag: 'MEZZANINE',
          worldPosition: new THREE.Vector3(5, 4.2, -2),
          offsetSide: 'top-right'
        },
        {
          id: 'loft_c4',
          componentId: 'loft-windows',
          phaseId: 4,
          label: 'Multi-Pane Steel Windows',
          sublabel: 'Historic-replica divided-lite argon insulated glass',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 4.5, 6.8),
          offsetSide: 'top-left'
        },
        {
          id: 'loft_c5',
          componentId: 'loft-interior',
          phaseId: 5,
          label: 'Exposed Brick & Spiral Ducts',
          sublabel: 'Lime repointed masonry & polished spiral HVAC',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(-9.2, 5, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'loft_c6',
          componentId: 'loft-roof',
          phaseId: 6,
          label: 'Sawtooth Clerestory Roof',
          sublabel: '60° north-facing daylight monitors & standing zinc',
          tag: 'SAWTOOTH ROOF',
          worldPosition: new THREE.Vector3(4, 9.2, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'loft_c7',
          componentId: 'loft-plaza',
          phaseId: 7,
          label: 'Belgian Block Courtyard',
          sublabel: 'Reclaimed granite cobbles, iron gates & gas lamps',
          tag: 'COURTYARD',
          worldPosition: new THREE.Vector3(9, 0.2, 7),
          offsetSide: 'top-right'
        }
      ];

    case 'arctic':
      return [
        {
          id: 'arc_c0',
          componentId: 'arc-site',
          phaseId: 0,
          label: 'Permafrost Thermosyphons',
          sublabel: 'Passive CO2 freeze loops preventing ground thaw',
          tag: 'PERMAFROST',
          worldPosition: new THREE.Vector3(-9, 0, 7),
          offsetSide: 'top-left'
        },
        {
          id: 'arc_c1',
          componentId: 'arc-found',
          phaseId: 1,
          label: 'Cryogenic Steel Anchors',
          sublabel: 'Low-temp steel sleeves with thermal breaks',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(5, 0.4, 3),
          offsetSide: 'top-right'
        },
        {
          id: 'arc_c2',
          componentId: 'arc-stilts',
          phaseId: 2,
          label: 'Hydraulic Stilt Legs',
          sublabel: '6 telescoping stilts elevating pod 3.5m over snow',
          tag: 'HYDRAULIC STILTS',
          worldPosition: new THREE.Vector3(-5, 3.0, 3),
          offsetSide: 'top-left'
        },
        {
          id: 'arc_c3',
          componentId: 'arc-chassis',
          phaseId: 3,
          label: 'R-60 Aerogel Floor Box',
          sublabel: 'Silica aerogel insulation chassis against -50°C',
          tag: 'CHASSIS',
          worldPosition: new THREE.Vector3(6, 5.0, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'arc_c4',
          componentId: 'arc-pod',
          phaseId: 4,
          label: 'Aerodynamic Pod Shell',
          sublabel: 'Chamfered composite fuselage with heated portholes',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 7.2, 4.3),
          offsetSide: 'top-left'
        },
        {
          id: 'arc_c5',
          componentId: 'arc-interior',
          phaseId: 5,
          label: 'Pressurized Living Module',
          sublabel: 'Decompression airlock, CHP generator & medical bay',
          tag: 'LIFE SUPPORT',
          worldPosition: new THREE.Vector3(0, 6.8, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'arc_c6',
          componentId: 'arc-roof',
          phaseId: 6,
          label: 'Satellite Radome & Comms',
          sublabel: '2.4m heated tracking dish & weather telemetry',
          tag: 'RADOME',
          worldPosition: new THREE.Vector3(-3, 10.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'arc_c7',
          componentId: 'arc-ramp',
          phaseId: 7,
          label: 'Hydraulic Snowcat Ramp',
          sublabel: 'Snowmobile access ramp & high-output xenon strobes',
          tag: 'VEHICLE RAMP',
          worldPosition: new THREE.Vector3(0, 1.8, 7.5),
          offsetSide: 'top-right'
        }
      ];

    case 'cliffside':
      return [
        {
          id: 'cliff_c0',
          componentId: 'cliff-site',
          phaseId: 0,
          label: 'Rock-Bolted Cliff Face',
          sublabel: '16m stainless steel rock anchors pinning cliff',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-11, 0, 9),
          offsetSide: 'top-left'
        },
        {
          id: 'cliff_c1',
          componentId: 'cliff-plinths',
          phaseId: 1,
          label: 'Cascading White Plinths',
          sublabel: 'Stepped monolithic marine concrete plinths',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(8, 0.8, -4),
          offsetSide: 'top-right'
        },
        {
          id: 'cliff_c2',
          componentId: 'cliff-frame',
          phaseId: 2,
          label: 'Slender White Portals',
          sublabel: 'UHPC concrete framed panoramic sea-view portals',
          tag: 'STRUCTURE',
          worldPosition: new THREE.Vector3(-6, 3.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'cliff_c3',
          componentId: 'cliff-slabs',
          phaseId: 3,
          label: 'Honed Travertine Decks',
          sublabel: 'Cantilevered limestone terraces with hidden drains',
          tag: 'SLABS',
          worldPosition: new THREE.Vector3(7, 1.4, 3),
          offsetSide: 'top-right'
        },
        {
          id: 'cliff_c4',
          componentId: 'cliff-glass',
          phaseId: 4,
          label: 'Pocket Glass Sliding Wall',
          sublabel: 'Zero-threshold floor-to-ceiling disappearing glass',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 3.2, -1),
          offsetSide: 'top-left'
        },
        {
          id: 'cliff_c5',
          componentId: 'cliff-interior',
          phaseId: 5,
          label: 'White Stucco Living Suite',
          sublabel: 'Venetian stucco, seamless terrazzo & bleached oak',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 2.8, -3.5),
          offsetSide: 'top-right'
        },
        {
          id: 'cliff_c6',
          componentId: 'cliff-pergola',
          phaseId: 6,
          label: 'Natural Teak Pergola',
          sublabel: 'Rafter sunshade trellis with 70% passive cooling',
          tag: 'PERGOLA',
          worldPosition: new THREE.Vector3(0, 5.6, 1),
          offsetSide: 'top-left'
        },
        {
          id: 'cliff_c7',
          componentId: 'cliff-pool',
          phaseId: 7,
          label: 'Infinity Horizon Pool',
          sublabel: 'Cantilevered zero-edge pool & ancient olive trees',
          tag: 'INFINITY POOL',
          worldPosition: new THREE.Vector3(0, 1.2, 6.8),
          offsetSide: 'top-right'
        }
      ];

    case 'stadium':
      return [
        {
          id: 'std_c0',
          componentId: 'std-site',
          phaseId: 0,
          label: 'Sunken Bowl & CFA Piles',
          sublabel: '45,000m³ earth bowl & 240 continuous flight auger piles',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-14, 0, 12),
          offsetSide: 'top-left'
        },
        {
          id: 'std_c1',
          componentId: 'std-ring',
          phaseId: 1,
          label: 'Compression Ring Beam',
          sublabel: '3.5m post-tensioned circumferential ring foundation',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(13, 0.6, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'std_c2',
          componentId: 'std-masts',
          phaseId: 2,
          label: '4 Inclined Pylon Masts',
          sublabel: '65m tubular steel masts & 120mm bridge cable backstays',
          tag: 'PYLON MASTS',
          worldPosition: new THREE.Vector3(-12, 11, -12),
          offsetSide: 'top-left'
        },
        {
          id: 'std_c3',
          componentId: 'std-seating',
          phaseId: 3,
          label: 'Precast Grandstand Bowl',
          sublabel: 'Acoustically isolated modular seating bleachers',
          tag: 'SEATING BOWL',
          worldPosition: new THREE.Vector3(9, 2.5, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'std_c4',
          componentId: 'std-skin',
          phaseId: 4,
          label: 'Polycarbonate Facade',
          sublabel: '40mm multiwall daylighting facade shell',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 4.0, 14.5),
          offsetSide: 'top-left'
        },
        {
          id: 'std_c5',
          componentId: 'std-pitch',
          phaseId: 5,
          label: 'Hybrid Sports Pitch',
          sublabel: 'Sub-air vacuum drainage & synthetic Bermuda turf',
          tag: 'SPORTS PITCH',
          worldPosition: new THREE.Vector3(0, 0.8, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'std_c6',
          componentId: 'std-canopy',
          phaseId: 6,
          label: 'PTFE Cable-Net Roof',
          sublabel: 'Hyperbolic prestressed steel net & translucent fabric',
          tag: 'CABLE CANOPY',
          worldPosition: new THREE.Vector3(0, 8.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'std_c7',
          componentId: 'std-lights',
          phaseId: 7,
          label: '4K Broadcast Floodlights',
          sublabel: 'Glare-free LED arrays & smart concourse turnstiles',
          tag: 'BROADCAST',
          worldPosition: new THREE.Vector3(15, 0.3, 10),
          offsetSide: 'top-right'
        }
      ];

    case 'geodesic':
      return [
        {
          id: 'gdm_c0',
          componentId: 'gdm-site',
          phaseId: 0,
          label: 'Circular Moraine Basin',
          sublabel: 'Laser-graded drainage basin & bedrock anchors',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-11, 0, 10),
          offsetSide: 'top-left'
        },
        {
          id: 'gdm_c1',
          componentId: 'gdm-ring',
          phaseId: 1,
          label: 'Thrust Ring Foundation',
          sublabel: 'Post-tensioned concrete circular buttress ring',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(12, 0.2, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'gdm_c2',
          componentId: 'gdm-frame',
          phaseId: 2,
          label: 'Aluminum Geodesic Lattice',
          sublabel: '22m span triangulated spaceframe with cast nodes',
          tag: 'GEODESIC GRID',
          worldPosition: new THREE.Vector3(-9, 5.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'gdm_c3',
          componentId: 'gdm-walkway',
          phaseId: 3,
          label: 'Canopy Treetop Walkways',
          sublabel: 'Suspended glulam walkways threading the tree canopy',
          tag: 'WALKWAYS',
          worldPosition: new THREE.Vector3(6, 3.8, 4),
          offsetSide: 'top-right'
        },
        {
          id: 'gdm_c4',
          componentId: 'gdm-etfe',
          phaseId: 4,
          label: 'Triple-Layer ETFE Cushions',
          sublabel: 'Pressurized UV-transmitting botanical foil cushions',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 6.0, 11.2),
          offsetSide: 'top-left'
        },
        {
          id: 'gdm_c5',
          componentId: 'gdm-biome',
          phaseId: 5,
          label: 'Rainforest Biome & Misting',
          sublabel: 'High-pressure micro-mist nozzles & living tropical palms',
          tag: 'BIOME CORE',
          worldPosition: new THREE.Vector3(3, 2.5, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'gdm_c6',
          componentId: 'gdm-oculus',
          phaseId: 6,
          label: 'Automated Apex Oculus',
          sublabel: 'Motorized natural thermal stack chimney vent ring',
          tag: 'APEX VENT',
          worldPosition: new THREE.Vector3(0, 11.8, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'gdm_c7',
          componentId: 'gdm-botanical',
          phaseId: 7,
          label: 'Boardwalks & Lily Basin',
          sublabel: '120m² aquatic water lily reflecting pond & trails',
          tag: 'BOTANICAL',
          worldPosition: new THREE.Vector3(0, 0.4, 0),
          offsetSide: 'top-right'
        }
      ];

    case 'timberoffice':
      return [
        {
          id: 'clt_c0',
          componentId: 'clt-site',
          phaseId: 0,
          label: 'Urban Excavation Platform',
          sublabel: 'Sheet-piled perimeter & recycled stone sub-base',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-10, 0, 8),
          offsetSide: 'top-left'
        },
        {
          id: 'clt_c1',
          componentId: 'clt-found',
          phaseId: 1,
          label: '70% GGBS Concrete Raft',
          sublabel: 'Low-carbon slag replacement foundation slab',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(8, 0.5, -6),
          offsetSide: 'top-right'
        },
        {
          id: 'clt_c2',
          componentId: 'clt-grid',
          phaseId: 2,
          label: '5-Story Glulam Timber Grid',
          sublabel: 'Spruce glulam post & beam with knife steel plates',
          tag: 'SUPERSTRUCTURE',
          worldPosition: new THREE.Vector3(-7, 8, 5),
          offsetSide: 'top-left'
        },
        {
          id: 'clt_c3',
          componentId: 'clt-slabs',
          phaseId: 3,
          label: '7-Ply Structural CLT Panels',
          sublabel: '240mm cross-laminated timber floor diaphragms',
          tag: 'CLT SLABS',
          worldPosition: new THREE.Vector3(6, 6.5, -4),
          offsetSide: 'top-right'
        },
        {
          id: 'clt_c4',
          componentId: 'clt-facade',
          phaseId: 4,
          label: 'Passive Timber Curtain Wall',
          sublabel: 'Triple-glazed envelope with exterior venetian blinds',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 7.0, 5.5),
          offsetSide: 'top-left'
        },
        {
          id: 'clt_c5',
          componentId: 'clt-interior',
          phaseId: 5,
          label: 'Biophilic Office Hubs',
          sublabel: 'Exposed timber ceilings, raised floors & natural oils',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 4.5, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'clt_c6',
          componentId: 'clt-roof',
          phaseId: 6,
          label: 'Sedum Roof & 60kW Solar',
          sublabel: 'Stormwater retention green roof & timber solar pergola',
          tag: 'GREEN ROOF',
          worldPosition: new THREE.Vector3(0, 13.8, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'clt_c7',
          componentId: 'clt-plaza',
          phaseId: 7,
          label: 'Permeable Paver Rain Garden',
          sublabel: 'Granite setts & bio-swales capturing 100% runoff',
          tag: 'RAIN GARDEN',
          worldPosition: new THREE.Vector3(9, 0.2, 7),
          offsetSide: 'top-right'
        }
      ];

    case 'watchtower':
      return [
        {
          id: 'wt_c0',
          componentId: 'wt-site',
          phaseId: 0,
          label: 'Granite Headland Micropiles',
          sublabel: '18m tensioned titanium-coated bedrock anchors',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-7, 0, 7),
          offsetSide: 'top-left'
        },
        {
          id: 'wt_c1',
          componentId: 'wt-found',
          phaseId: 1,
          label: 'Mass Anchor Concrete Block',
          sublabel: 'Overturning-moment resisting foundation plinth',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(5, 0.6, -5),
          offsetSide: 'top-right'
        },
        {
          id: 'wt_c2',
          componentId: 'wt-shaft',
          phaseId: 2,
          label: '28m Cor-Ten Monolith Shaft',
          sublabel: 'Tapering weathered steel shell resisting gales',
          tag: 'STEEL SHAFT',
          worldPosition: new THREE.Vector3(2.5, 12, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'wt_c3',
          componentId: 'wt-stairs',
          phaseId: 3,
          label: 'Helical Spiral Stair Core',
          sublabel: 'Internal prefabricated steel stairs & rest landings',
          tag: 'STAIR CORE',
          worldPosition: new THREE.Vector3(0, 8, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'wt_c4',
          componentId: 'wt-slits',
          phaseId: 4,
          label: 'Recessed Viewing Slits',
          sublabel: 'Hurricane-rated narrow glass observation slits',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 10, 2.9),
          offsetSide: 'top-left'
        },
        {
          id: 'wt_c5',
          componentId: 'wt-quarters',
          phaseId: 5,
          label: 'Watchkeeper Radar Core',
          sublabel: 'AIS marine radar, radio console & heated quarters',
          tag: 'COMMAND',
          worldPosition: new THREE.Vector3(0, 16.5, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'wt_c6',
          componentId: 'wt-lantern',
          phaseId: 6,
          label: '360° Glass Crow-Nest Lantern',
          sublabel: 'Cantilevered glass cube with structural silicone seams',
          tag: 'LANTERN',
          worldPosition: new THREE.Vector3(0, 20, 3.5),
          offsetSide: 'top-left'
        },
        {
          id: 'wt_c7',
          componentId: 'wt-boardwalk',
          phaseId: 7,
          label: 'Clifftop Boardwalk & Fog Horn',
          sublabel: 'Weathered steel cliff walk & 12-NM solar marine beacon',
          tag: 'BEACON',
          worldPosition: new THREE.Vector3(6, 0.2, 6),
          offsetSide: 'top-right'
        }
      ];

    case 'church':
      return [
        {
          id: 'ch_c0',
          componentId: 'ch-site',
          phaseId: 0,
          label: 'Sanctuary Excavation Bed',
          sublabel: 'Bentonite waterproofed acoustic ground mud slab',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-10, 0, 9),
          offsetSide: 'top-left'
        },
        {
          id: 'ch_c1',
          componentId: 'ch-found',
          phaseId: 1,
          label: 'Thrust Buttress Anchors',
          sublabel: 'Massive dual concrete anchors absorbing shell thrust',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(-8, 1.2, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'ch_c2',
          componentId: 'ch-shell',
          phaseId: 2,
          label: '80mm Hypar Thin-Shell',
          sublabel: 'Prestressed hyperbolic paraboloid shotcreted vault',
          tag: 'HYPAR SHELL',
          worldPosition: new THREE.Vector3(0, 7.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'ch_c3',
          componentId: 'ch-sanctuary',
          phaseId: 3,
          label: 'Carrara Marble Altar Floor',
          sublabel: 'Bookmatched white Italian marble sanctuary podium',
          tag: 'SANCTUARY',
          worldPosition: new THREE.Vector3(5, 0.8, -3),
          offsetSide: 'top-right'
        },
        {
          id: 'ch_c4',
          componentId: 'ch-glass',
          phaseId: 4,
          label: 'Cobalt Stained-Glass Facade',
          sublabel: '10m high triangular facade of antique blue glass',
          tag: 'SACRED GLASS',
          worldPosition: new THREE.Vector3(0, 6, 5.8),
          offsetSide: 'top-left'
        },
        {
          id: 'ch_c5',
          componentId: 'ch-pews',
          phaseId: 5,
          label: 'Oak Pews & Travertine Altar',
          sublabel: 'Acoustic quarter-sawn pews & 8-ton monolithic altar',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 1.6, 0),
          offsetSide: 'top-right'
        },
        {
          id: 'ch_c6',
          componentId: 'ch-cross',
          phaseId: 6,
          label: '24K Gold-Leaf Cross Finial',
          sublabel: 'Sculptural shell apex ridge flashing & gilded cross',
          tag: 'FINIAL',
          worldPosition: new THREE.Vector3(0, 15.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: 'ch_c7',
          componentId: 'ch-basin',
          phaseId: 7,
          label: 'Reflecting Pool & Campanile',
          sublabel: 'Black granite water mirror & 12m bronze bell tower',
          tag: 'CAMPANILE',
          worldPosition: new THREE.Vector3(9.5, 6, 4),
          offsetSide: 'top-right'
        }
      ];

    default:
      // Fallback for default villa or unlisted architecture
      return [
        {
          id: `${productId}_c0`,
          componentId: `${productId}-p0`,
          phaseId: 0,
          label: 'Site Groundwork Datum',
          sublabel: 'Laser-graded excavation & survey bench',
          tag: 'CIVIL',
          worldPosition: new THREE.Vector3(-10, 0, 10),
          offsetSide: 'top-left'
        },
        {
          id: `${productId}_c1`,
          componentId: `${productId}-p1`,
          phaseId: 1,
          label: 'Reinforced Substructure',
          sublabel: 'Engineered footings & moisture barrier',
          tag: 'FOUNDATION',
          worldPosition: new THREE.Vector3(9, 0.6, -9),
          offsetSide: 'top-right'
        },
        {
          id: `${productId}_c2`,
          componentId: `${productId}-p2`,
          phaseId: 2,
          label: 'Primary Structural Superstructure',
          sublabel: 'Load-bearing frame resisting seismic loads',
          tag: 'SUPERSTRUCTURE',
          worldPosition: new THREE.Vector3(-7, 6, 7),
          offsetSide: 'top-left'
        },
        {
          id: `${productId}_c3`,
          componentId: `${productId}-p3`,
          phaseId: 3,
          label: 'Composite Floor Diaphragm',
          sublabel: 'Multi-tier structural slabs & circulation',
          tag: 'SLABS',
          worldPosition: new THREE.Vector3(7, 4, -7),
          offsetSide: 'top-right'
        },
        {
          id: `${productId}_c4`,
          componentId: `${productId}-p4`,
          phaseId: 4,
          label: 'Architectural Glazing Envelope',
          sublabel: 'Thermal break curtain wall & rainscreen',
          tag: 'ENVELOPE',
          worldPosition: new THREE.Vector3(0, 6, 8),
          offsetSide: 'top-left'
        },
        {
          id: `${productId}_c5`,
          componentId: `${productId}-p5`,
          phaseId: 5,
          label: 'Interior Architecture & Services',
          sublabel: 'Custom fit-out, joinery & core risers',
          tag: 'INTERIOR',
          worldPosition: new THREE.Vector3(0, 3.5, 0),
          offsetSide: 'top-right'
        },
        {
          id: `${productId}_c6`,
          componentId: `${productId}-p6`,
          phaseId: 6,
          label: 'Weatherproof Roof Canopy',
          sublabel: 'Integrated insulation & solar energy capture',
          tag: 'ROOF',
          worldPosition: new THREE.Vector3(0, 8.5, 0),
          offsetSide: 'top-left'
        },
        {
          id: `${productId}_c7`,
          componentId: `${productId}-p7`,
          phaseId: 7,
          label: 'Paved Terraces & Landscape',
          sublabel: 'Perimeter paving, specimen plants & lighting',
          tag: 'FINISHES',
          worldPosition: new THREE.Vector3(11, 0.3, 11),
          offsetSide: 'top-right'
        }
      ];
  }
}
