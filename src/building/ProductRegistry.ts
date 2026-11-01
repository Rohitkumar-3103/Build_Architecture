import { ConstructionPhase, CalloutAnnotation } from '../types';
import { MaterialManager } from '../engine/MaterialManager';
import { PhasePart } from './phases/Phase0_SiteTerrain';
import { PHASES } from './BuildingModel';
import { CALLOUTS_DATA } from './CalloutsData';
import { buildPhase0 } from './phases/Phase0_SiteTerrain';
import { buildPhase1 } from './phases/Phase1_Foundation';
import { buildPhase2 } from './phases/Phase2_Structure';
import { buildPhase3 } from './phases/Phase3_SlabsCore';
import { buildPhase4 } from './phases/Phase4_CurtainWall';
import { buildPhase5 } from './phases/Phase5_Interior';
import { buildPhase6 } from './phases/Phase6_Roof';
import { buildPhase7 } from './phases/Phase7_Finishes';

import { PAVILION_PHASES, PAVILION_CALLOUTS, buildPavilionModel } from './products/ProductPavilion';
import { CABIN_PHASES, CABIN_CALLOUTS, buildCabinModel } from './products/ProductCabin';
import { 
  buildHighriseModel, 
  buildMuseumModel, 
  buildArenaModel, 
  buildRammedEarthModel,
  buildFloatingHabitatModel,
  buildOrigamiZenHouseModel,
  buildVerticalForestModel,
  buildGeothermalVaultModel,
  buildObservatoryModel,
  buildIndustrialLoftModel,
  buildArcticOutpostModel,
  buildCliffsidePergolaModel,
  buildTensileStadiumModel,
  buildGeodesicBiosphereModel,
  buildMassTimberCLTModel,
  buildCoastalWatchtowerModel,
  buildThinShellChapelModel
} from './products/ExtendedCatalogGenerators';
import { getPhasesForProduct, getCalloutsForProduct } from './products/ExtendedCatalogPhases';

export interface ArchitectureProductDefinition {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  areaM2: number;
  estCost: string;
  category: 'Residential' | 'Commercial' | 'Cultural' | 'Pavilion' | 'Specialty';
  phases: ConstructionPhase[];
  callouts: CalloutAnnotation[];
  build: (materials: MaterialManager) => PhasePart[];
}

export const PRODUCTS: ArchitectureProductDefinition[] = [
  // 1. Existing Villa
  {
    id: 'villa',
    name: 'Modern Cantilever Villa',
    tagline: 'The Grand Horizon — 3.5m Cantilever & Infinity Pool',
    badge: 'LUXURY RESIDENCE',
    areaM2: 460,
    estCost: '$2,850,000',
    category: 'Residential',
    phases: PHASES,
    callouts: CALLOUTS_DATA,
    build: (materials: MaterialManager): PhasePart[] => [
      ...buildPhase0(materials),
      ...buildPhase1(materials),
      ...buildPhase2(materials),
      ...buildPhase3(materials),
      ...buildPhase4(materials),
      ...buildPhase5(materials),
      ...buildPhase6(materials),
      ...buildPhase7(materials),
    ]
  },
  // 2. Existing Pavilion
  {
    id: 'pavilion',
    name: 'Minimalist Glass Pavilion',
    tagline: 'The Farnsworth Tribute — 8 White Pilotis & Travertine Plinth',
    badge: 'MODERNIST ICON',
    areaM2: 280,
    estCost: '$1,920,000',
    category: 'Pavilion',
    phases: PAVILION_PHASES,
    callouts: PAVILION_CALLOUTS,
    build: buildPavilionModel
  },
  // 3. Existing Cabin
  {
    id: 'cabin',
    name: 'Nordic Timber A-Frame Cabin',
    tagline: 'The Fjord Retreat — Glulam Portals & Zinc Alpine Roof',
    badge: 'ALPINE RETREAT',
    areaM2: 180,
    estCost: '$890,000',
    category: 'Residential',
    phases: CABIN_PHASES,
    callouts: CABIN_CALLOUTS,
    build: buildCabinModel
  },
  // 4. Skyline Diagrid Tower
  {
    id: 'highrise',
    name: 'Skyline Diagrid Tower',
    tagline: 'The Vertex Apex — 42-Story Perimeter Diagrid Skyscraper',
    badge: 'COMMERCIAL TOWER',
    areaM2: 12500,
    estCost: '$34,500,000',
    category: 'Commercial',
    phases: getPhasesForProduct('highrise'),
    callouts: getCalloutsForProduct('highrise'),
    build: buildHighriseModel
  },
  // 5. Brutalist Monolith Museum
  {
    id: 'museum',
    name: 'Brutalist Monolith Museum',
    tagline: 'The Vault of Light — Board-Formed Concrete Cantilevers',
    badge: 'CULTURAL ICON',
    areaM2: 3200,
    estCost: '$14,200,000',
    category: 'Cultural',
    phases: getPhasesForProduct('museum'),
    callouts: getCalloutsForProduct('museum'),
    build: buildMuseumModel
  },
  // 6. Parametric Timber Shell Arena
  {
    id: 'arena',
    name: 'Parametric Timber Shell Arena',
    tagline: 'The Wave Gridshell — Double-Curved Glulam Amphitheater',
    badge: 'CIVIC ARENA',
    areaM2: 5400,
    estCost: '$18,750,000',
    category: 'Pavilion',
    phases: getPhasesForProduct('arena'),
    callouts: getCalloutsForProduct('arena'),
    build: buildArenaModel
  },
  // 7. Desert Rammed-Earth Sanctuary
  {
    id: 'rammedearth',
    name: 'Desert Rammed-Earth Sanctuary',
    tagline: 'The Dune Haven — 600mm Thermal Mass Soil Walls',
    badge: 'ECO-RESIDENCE',
    areaM2: 380,
    estCost: '$1,650,000',
    category: 'Residential',
    phases: getPhasesForProduct('rammedearth'),
    callouts: getCalloutsForProduct('rammedearth'),
    build: buildRammedEarthModel
  },
  // 8. Floating Aquatic Eco-Habitat
  {
    id: 'flothabitat',
    name: 'Floating Aquatic Eco-Habitat',
    tagline: 'The Ocean Spire — Modular Buoyancy Pontoon Research Pod',
    badge: 'MARITIME LAB',
    areaM2: 850,
    estCost: '$4,200,000',
    category: 'Specialty',
    phases: getPhasesForProduct('flothabitat'),
    callouts: getCalloutsForProduct('flothabitat'),
    build: buildFloatingHabitatModel
  },
  // 9. Japanese Origami Zen House
  {
    id: 'origami',
    name: 'Japanese Origami Zen House',
    tagline: 'The Kyudo Sanctuary — Folded Zinc Planes & Yakisugi Cedar',
    badge: 'ZEN MINIMALISM',
    areaM2: 140,
    estCost: '$920,000',
    category: 'Residential',
    phases: getPhasesForProduct('origami'),
    callouts: getCalloutsForProduct('origami'),
    build: buildOrigamiZenHouseModel
  },
  // 10. Biophilic Vertical Forest Tower
  {
    id: 'verticalforest',
    name: 'Biophilic Vertical Forest Tower',
    tagline: 'The Living Canopy — 12-Story Cascading Living Planters',
    badge: 'SUSTAINABLE TOWER',
    areaM2: 8600,
    estCost: '$26,800,000',
    category: 'Commercial',
    phases: getPhasesForProduct('verticalforest'),
    callouts: getCalloutsForProduct('verticalforest'),
    build: buildVerticalForestModel
  },
  // 11. Subterranean Geothermal Vault
  {
    id: 'geothermal',
    name: 'Subterranean Geothermal Vault',
    tagline: 'The Earth Shield — Reinforced Turf Vault with Ground Coils',
    badge: 'EARTH SHELTER',
    areaM2: 520,
    estCost: '$2,100,000',
    category: 'Residential',
    phases: getPhasesForProduct('geothermal'),
    callouts: getCalloutsForProduct('geothermal'),
    build: buildGeothermalVaultModel
  },
  // 12. Curvilinear Hilltop Observatory
  {
    id: 'observatory',
    name: 'Curvilinear Hilltop Observatory',
    tagline: 'The Starlight Rotunda — Aerodynamic Carbon Dome & Scope',
    badge: 'ASTRO SCIENCE',
    areaM2: 1150,
    estCost: '$6,400,000',
    category: 'Specialty',
    phases: getPhasesForProduct('observatory'),
    callouts: getCalloutsForProduct('observatory'),
    build: buildObservatoryModel
  },
  // 13. Industrial Brick & Truss Loft
  {
    id: 'loft',
    name: 'Industrial Brick & Truss Loft',
    tagline: 'The Foundry Re-use — Restored Riveted Girders & Clerestory',
    badge: 'HERITAGE RE-USE',
    areaM2: 1800,
    estCost: '$3,800,000',
    category: 'Commercial',
    phases: getPhasesForProduct('loft'),
    callouts: getCalloutsForProduct('loft'),
    build: buildIndustrialLoftModel
  },
  // 14. Stilted Arctic Research Outpost
  {
    id: 'arctic',
    name: 'Stilted Arctic Research Outpost',
    tagline: 'The Aurora Pod — Hydraulic Stilt Legs on Polar Permafrost',
    badge: 'EXTREME CLIMATE',
    areaM2: 640,
    estCost: '$5,100,000',
    category: 'Specialty',
    phases: getPhasesForProduct('arctic'),
    callouts: getCalloutsForProduct('arctic'),
    build: buildArcticOutpostModel
  },
  // 15. Mediterranean Cliffside Pergola
  {
    id: 'cliffside',
    name: 'Mediterranean Cliffside Pergola',
    tagline: 'The Azure Terraces — Cascading White Limestone Plinths',
    badge: 'COASTAL VILLA',
    areaM2: 680,
    estCost: '$3,950,000',
    category: 'Residential',
    phases: getPhasesForProduct('cliffside'),
    callouts: getCalloutsForProduct('cliffside'),
    build: buildCliffsidePergolaModel
  },
  // 16. Tensile Cable-Net Canopy Stadium
  {
    id: 'stadium',
    name: 'Tensile Cable-Net Canopy Stadium',
    tagline: 'The Velodrome — Hyperbolic PTFE Prestressed Roof Net',
    badge: 'MEGASTRUCTURE',
    areaM2: 18000,
    estCost: '$48,000,000',
    category: 'Pavilion',
    phases: getPhasesForProduct('stadium'),
    callouts: getCalloutsForProduct('stadium'),
    build: buildTensileStadiumModel
  },
  // 17. Geodesic Biosphere Dome
  {
    id: 'geodesic',
    name: 'Geodesic Biosphere Dome',
    tagline: 'The Eden Lattice — Triangular Aluminum Space Frame',
    badge: 'BOTANICAL DOME',
    areaM2: 2400,
    estCost: '$8,500,000',
    category: 'Pavilion',
    phases: getPhasesForProduct('geodesic'),
    callouts: getCalloutsForProduct('geodesic'),
    build: buildGeodesicBiosphereModel
  },
  // 18. Mass Timber CLT Office Block
  {
    id: 'timberoffice',
    name: 'Mass Timber CLT Office Block',
    tagline: 'The Spruce Hub — 6-Story Glulam Post & Beam Grid',
    badge: 'ZERO-CARBON CLT',
    areaM2: 4200,
    estCost: '$12,900,000',
    category: 'Commercial',
    phases: getPhasesForProduct('timberoffice'),
    callouts: getCalloutsForProduct('timberoffice'),
    build: buildMassTimberCLTModel
  },
  // 19. Cor-Ten Steel Coastal Watchtower
  {
    id: 'watchtower',
    name: 'Cor-Ten Steel Coastal Watchtower',
    tagline: 'The Beacon Point — Weathered Steel Monolith on Promontory',
    badge: 'NAUTICAL LANDMARK',
    areaM2: 310,
    estCost: '$1,450,000',
    category: 'Specialty',
    phases: getPhasesForProduct('watchtower'),
    callouts: getCalloutsForProduct('watchtower'),
    build: buildCoastalWatchtowerModel
  },
  // 20. Hyperbolic Concrete Thin-Shell Chapel
  {
    id: 'church',
    name: 'Hyperbolic Concrete Thin-Shell Chapel',
    tagline: 'The Saddle Vault — 80mm Prestressed Concrete Shell',
    badge: 'SACRED ARCHITECTURE',
    areaM2: 1450,
    estCost: '$7,600,000',
    category: 'Cultural',
    phases: getPhasesForProduct('church'),
    callouts: getCalloutsForProduct('church'),
    build: buildThinShellChapelModel
  }
];

export function getProductById(id: string): ArchitectureProductDefinition {
  const found = PRODUCTS.find(p => p.id === id);
  return found || PRODUCTS[0];
}
