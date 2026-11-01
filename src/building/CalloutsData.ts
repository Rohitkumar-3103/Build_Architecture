import * as THREE from 'three';
import { CalloutAnnotation } from '../types';

export const CALLOUTS_DATA: CalloutAnnotation[] = [
  // PHASE 0: SITE PREP & EXCAVATION
  {
    id: 'c_survey',
    componentId: 'site_survey',
    phaseId: 0,
    label: 'Geodetic Survey Datum',
    sublabel: 'Benchmark ±2mm GNSS Satellite Control',
    tag: 'CIVIL',
    worldPosition: new THREE.Vector3(11, 1.2, 8),
    offsetSide: 'top-right'
  },
  {
    id: 'c_blinding',
    componentId: 'site_blinding',
    phaseId: 0,
    label: 'Blinding Concrete Mud Slab',
    sublabel: '150mm C15/20 Mass Concrete Sub-Base',
    tag: 'GRADE',
    worldPosition: new THREE.Vector3(0, 0.2, 6),
    offsetSide: 'bottom-left'
  },

  // PHASE 1: FOUNDATION & GRADE BEAMS
  {
    id: 'c_footing',
    componentId: 'foundation_pads',
    phaseId: 1,
    label: 'Isolated Pad Footings (x12)',
    sublabel: '1.6m × 1.6m C35/45 Structural Concrete',
    tag: 'STRUCT',
    worldPosition: new THREE.Vector3(9, 0.8, 6),
    offsetSide: 'bottom-right'
  },
  {
    id: 'c_tie_beam',
    componentId: 'foundation_tie_beams',
    phaseId: 1,
    label: 'Perimeter Grade Beams',
    sublabel: '400×500mm Tied Diaphragm Restraint',
    tag: 'SEISMIC',
    worldPosition: new THREE.Vector3(0, 0.7, 6),
    offsetSide: 'top-left'
  },
  {
    id: 'c_membrane',
    componentId: 'foundation_membrane',
    phaseId: 1,
    label: 'SBS Tanking Membrane',
    sublabel: 'Modified Bitumen HDPE Water/Radon Barrier',
    tag: 'BARRIER',
    worldPosition: new THREE.Vector3(-5, 0.8, -2),
    offsetSide: 'top-left'
  },

  // PHASE 2: STRUCTURAL SKELETON
  {
    id: 'c_column',
    componentId: 'steel_columns',
    phaseId: 2,
    label: 'W14x90 Steel Columns',
    sublabel: 'ASTM A992 50 ksi Heavy Moment Frame',
    tag: 'FRAME',
    worldPosition: new THREE.Vector3(9, 5.0, 6),
    offsetSide: 'top-right'
  },
  {
    id: 'c_cantilever_beam',
    componentId: 'steel_girders',
    phaseId: 2,
    label: '3.5m Cantilever Girder',
    sublabel: 'Pre-Cambered W18x50 High-Strength Steel',
    tag: 'CANTILEVER',
    worldPosition: new THREE.Vector3(11.5, 4.3, 0),
    offsetSide: 'top-right'
  },
  {
    id: 'c_bracing',
    componentId: 'steel_bracing',
    phaseId: 2,
    label: 'Seismic Diagonal Braces',
    sublabel: '75mm Macalloy Stainless Tension Rods',
    tag: 'LATERAL',
    worldPosition: new THREE.Vector3(-6, 4.1, -6),
    offsetSide: 'top-left'
  },

  // PHASE 3: SLABS & CORE
  {
    id: 'c_pt_slab',
    componentId: 'l1_cantilever_slab',
    phaseId: 3,
    label: 'Post-Tensioned Cantilever Slab',
    sublabel: '280mm C40 Concrete with Bonded Tendons',
    tag: 'SLAB',
    worldPosition: new THREE.Vector3(12.5, 4.4, 3),
    offsetSide: 'top-right'
  },
  {
    id: 'c_core',
    componentId: 'concrete_core',
    phaseId: 3,
    label: 'Slip-Formed Shear Core',
    sublabel: 'Monolithic Torsional Stability Shaft',
    tag: 'CORE',
    worldPosition: new THREE.Vector3(-3.0, 6.0, -2.5),
    offsetSide: 'top-left'
  },
  {
    id: 'c_stairs',
    componentId: 'architectural_stairs',
    phaseId: 3,
    label: 'Floating Oak Cantilever Stairs',
    sublabel: 'Concealed Box Spine with 80mm Solid Treads',
    tag: 'CIRC',
    worldPosition: new THREE.Vector3(-1.2, 2.8, 1.5),
    offsetSide: 'bottom-left'
  },

  // PHASE 4: CURTAIN WALL & ENVELOPE
  {
    id: 'c_curtain_wall',
    componentId: 'curtain_wall_glass',
    phaseId: 4,
    label: 'Triple-Glazed Curtain Wall',
    sublabel: 'Argon Cavity Low-E (U = 0.78 W/m²K)',
    tag: 'GLAZING',
    worldPosition: new THREE.Vector3(4, 3.2, 6.1),
    offsetSide: 'bottom-right'
  },
  {
    id: 'c_louvers',
    componentId: 'timber_louvers',
    phaseId: 4,
    label: 'Motorized Cedar Brise-Soleil',
    sublabel: 'Sun-Tracking Aerofoil Solar Shading',
    tag: 'SHADE',
    worldPosition: new THREE.Vector3(8.6, 5.6, 6.4),
    offsetSide: 'top-right'
  },
  {
    id: 'c_rainscreen',
    componentId: 'rainscreen_facade',
    phaseId: 4,
    label: 'Ventilated Rainscreen Facade',
    sublabel: 'Non-Combustible Class A1 Mineral Wool',
    tag: 'ENVELOPE',
    worldPosition: new THREE.Vector3(-9.2, 5.0, 2),
    offsetSide: 'top-left'
  },

  // PHASE 5: INTERIOR ARCHITECTURE
  {
    id: 'c_floors',
    componentId: 'hardwood_floors',
    phaseId: 5,
    label: 'Engineered White Oak Planks',
    sublabel: '220mm Wide with Hydronic Underfloor Heat',
    tag: 'FINISH',
    worldPosition: new THREE.Vector3(1, 1.0, -1),
    offsetSide: 'bottom-left'
  },
  {
    id: 'c_island',
    componentId: 'interior_furniture',
    phaseId: 5,
    label: 'Calacatta Marble Waterfall Island',
    sublabel: 'Bespoke Italian Kitchen Joinery',
    tag: 'JOINERY',
    worldPosition: new THREE.Vector3(-4.5, 1.8, 2.5),
    offsetSide: 'top-left'
  },
  {
    id: 'c_suite',
    componentId: 'interior_furniture',
    phaseId: 5,
    label: 'Cantilever Master Suite',
    sublabel: 'Panoramic Platform Bedroom Suite',
    tag: 'SUITE',
    worldPosition: new THREE.Vector3(7.5, 5.2, 0),
    offsetSide: 'top-right'
  },

  // PHASE 6: ROOF & SOLAR ENERGY
  {
    id: 'c_roof_canopy',
    componentId: 'cantilever_roof',
    phaseId: 6,
    label: 'Cantilevered Roof Canopy',
    sublabel: '26m × 16.5m Oversailing Lightweight Slab',
    tag: 'ROOF',
    worldPosition: new THREE.Vector3(3, 7.8, 7),
    offsetSide: 'top-right'
  },
  {
    id: 'c_solar_pv',
    componentId: 'solar_pv_skylight',
    phaseId: 6,
    label: '3.6 kWp Solar PV Array',
    sublabel: '8x N-Type TOPCon High-Efficiency Modules',
    tag: 'SOLAR',
    worldPosition: new THREE.Vector3(9.3, 8.2, -1.8),
    offsetSide: 'top-left'
  },
  {
    id: 'c_sky_terrace',
    componentId: 'roof_terrace_deck',
    phaseId: 6,
    label: 'Sky Lounge Observation Deck',
    sublabel: 'Thermally Modified Ash & 21.5mm Glass Parapet',
    tag: 'TERRACE',
    worldPosition: new THREE.Vector3(-1.0, 8.5, 4.1),
    offsetSide: 'top-left'
  },

  // PHASE 7: POOL & LANDSCAPE
  {
    id: 'c_pool',
    componentId: 'infinity_pool',
    phaseId: 7,
    label: 'Infinity Reflecting Pool',
    sublabel: 'Basaltina Volcanic Stone Evaporative Basin',
    tag: 'AQUATICS',
    worldPosition: new THREE.Vector3(7.0, 0.8, 8.5),
    offsetSide: 'bottom-right'
  },
  {
    id: 'c_trees',
    componentId: 'specimen_trees_lighting',
    phaseId: 7,
    label: 'Specimen Japanese Red Maples',
    sublabel: '25-Year Mature Acer Palmatum & 2700K LEDs',
    tag: 'BOTANICAL',
    worldPosition: new THREE.Vector3(-12, 3.2, 6),
    offsetSide: 'top-left'
  },
  {
    id: 'c_pavers',
    componentId: 'landscape_lawn',
    phaseId: 7,
    label: 'Floating Paver Walkway',
    sublabel: 'Permeable Precast Architectural Concrete',
    tag: 'HARDSCAPE',
    worldPosition: new THREE.Vector3(-5.0, 0.3, 8.5),
    offsetSide: 'bottom-left'
  }
];
