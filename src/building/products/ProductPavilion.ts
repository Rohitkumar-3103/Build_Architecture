import * as THREE from 'three';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from '../phases/Phase0_SiteTerrain';
import { CalloutAnnotation, ConstructionPhase } from '../../types';

export const PAVILION_PHASES: ConstructionPhase[] = [
  {
    id: 0,
    title: 'Site Preparation & Meadow',
    subtitle: 'Riverbank Grading & Geotextile Bed',
    description: 'Laser grading of alluvial floodplain terrain, placement of washed river gravel drainage bed, and geodetic benchmark layout.',
    badge: 'PHASE 01 // SITE',
    durationSeconds: 6,
    tradeSpecialty: 'Civil Earthworks',
    safetyProtocol: 'Riparian buffer zone environmental protection'
  },
  {
    id: 1,
    title: 'Elevated Pier Substructure',
    subtitle: '8 Flood-Resistant Pilotis & Terrace Plinth',
    description: 'Cast-in-place reinforced concrete circular pilotis elevating the pavilion 1.5m above 100-year flood levels, plus cantilevered steps.',
    badge: 'PHASE 02 // SUBSTRUCTURE',
    durationSeconds: 7,
    tradeSpecialty: 'Concrete Forming',
    safetyProtocol: 'Laser height tolerance ±1mm across all 8 piers'
  },
  {
    id: 2,
    title: 'Exposed Steel Framework',
    subtitle: '8 White Cruciform Columns & Fascia Channels',
    description: 'Precision-milled structural steel H-columns sandblasted and coated in architectural semi-gloss museum white polyurethane.',
    badge: 'PHASE 03 // SUPERSTRUCTURE',
    durationSeconds: 8,
    tradeSpecialty: 'Structural Steel',
    safetyProtocol: 'Continuous ground-to-roof crane clearance zone'
  },
  {
    id: 3,
    title: 'Floating Travertine Slab',
    subtitle: 'Suspended Podium & Terrace Steps',
    description: 'Post-tensioned concrete sandwich slab faced with honed Roman travertine slabs, creating the illusion of a floating plinth.',
    badge: 'PHASE 04 // SLABS',
    durationSeconds: 8,
    tradeSpecialty: 'Stone Masonry',
    safetyProtocol: 'Vacuum suction stone slab handling'
  },
  {
    id: 4,
    title: 'Frameless Glass Skin',
    subtitle: 'Panoramic Floor-to-Ceiling Crystal Glazing',
    description: 'Continuous 3.2m clear float glass panes with structural silicone butt-joints, delivering total transparency with zero visual barriers.',
    badge: 'PHASE 05 // ENVELOPE',
    durationSeconds: 8,
    tradeSpecialty: 'Architectural Glazing',
    safetyProtocol: 'Dual-suction crane hoist with wind limits < 15 knots'
  },
  {
    id: 5,
    title: 'Teak Core & Barcelona Living',
    subtitle: 'Bespoke Millwork & Miesian Classics',
    description: 'Natural golden teak utility core containing mechanical risers and bath, paired with a black leather Barcelona daybed and travertine table.',
    badge: 'PHASE 06 // INTERIOR',
    durationSeconds: 8,
    tradeSpecialty: 'Fine Cabinetry',
    safetyProtocol: 'Climate-controlled curing for solid teak joinery'
  },
  {
    id: 6,
    title: 'Cantilevered Roof Plane',
    subtitle: 'Floating Steel Fascia & Skylight',
    description: 'Ultra-slender roof diaphragm oversailing the perimeter glass by 1.8m, fitted with concealed scuppers and insulated roof build-up.',
    badge: 'PHASE 07 // ROOF',
    durationSeconds: 7,
    tradeSpecialty: 'Lightweight Roofing',
    safetyProtocol: 'Perimeter harness lifeline system'
  },
  {
    id: 7,
    title: 'Reflecting Basin & River Birches',
    subtitle: 'Aquatic Mirror & Woodland Landscape',
    description: 'Shallow black granite reflecting pool, manicured lawn meadow, and a cluster of architectural white-bark Himalayan river birch trees.',
    badge: 'PHASE 08 // FINISHES',
    durationSeconds: 8,
    tradeSpecialty: 'Landscape Design',
    safetyProtocol: 'Submerged low-voltage aquatic safety certification'
  }
];

export const PAVILION_CALLOUTS: CalloutAnnotation[] = [
  {
    id: 'pav_c_site',
    componentId: 'pav_meadow',
    phaseId: 0,
    label: 'Graded Alluvial Meadow',
    sublabel: 'River gravel drainage basin with survey pins',
    tag: 'CIVIL',
    worldPosition: new THREE.Vector3(-10, 0.2, 8),
    offsetSide: 'top-left'
  },
  {
    id: 'pav_c_piers',
    componentId: 'pav_piers',
    phaseId: 1,
    label: '8 Concrete Stilt Pilotis',
    sublabel: 'Elevates pavilion 1.5m above 100-yr flood datum',
    tag: 'PILOTIS',
    worldPosition: new THREE.Vector3(8, 0.8, 5),
    offsetSide: 'bottom-right'
  },
  {
    id: 'pav_c_steel',
    componentId: 'pav_columns',
    phaseId: 2,
    label: 'White Steel Columns (x8)',
    sublabel: 'Exposed cruciform H-columns in museum white',
    tag: 'STEEL',
    worldPosition: new THREE.Vector3(8, 3.2, 5),
    offsetSide: 'top-right'
  },
  {
    id: 'pav_c_plinth',
    componentId: 'pav_travertine',
    phaseId: 3,
    label: 'Suspended Travertine Podium',
    sublabel: 'Honed Roman travertine floating plinth',
    tag: 'PLINTH',
    worldPosition: new THREE.Vector3(0, 1.6, 5.2),
    offsetSide: 'bottom-left'
  },
  {
    id: 'pav_c_glass',
    componentId: 'pav_glass',
    phaseId: 4,
    label: 'Frameless Glass Curtain',
    sublabel: '3.2m continuous crystal float glass envelope',
    tag: 'GLASS',
    worldPosition: new THREE.Vector3(-4, 3.2, 5.0),
    offsetSide: 'top-left'
  },
  {
    id: 'pav_c_core',
    componentId: 'pav_interior',
    phaseId: 5,
    label: 'Golden Teak Island Core',
    sublabel: 'Houses MEP services & Barcelona lounge suite',
    tag: 'JOINERY',
    worldPosition: new THREE.Vector3(2, 2.5, 0),
    offsetSide: 'top-right'
  },
  {
    id: 'pav_c_roof',
    componentId: 'pav_roof',
    phaseId: 6,
    label: 'Floating Roof Diaphragm',
    sublabel: '1.8m perimeter cantilever eaves with white fascia',
    tag: 'ROOF',
    worldPosition: new THREE.Vector3(0, 5.0, 5.5),
    offsetSide: 'top-right'
  },
  {
    id: 'pav_c_pond',
    componentId: 'pav_landscape',
    phaseId: 7,
    label: 'Reflecting Water Mirror',
    sublabel: 'Black granite basin & white river birches',
    tag: 'AQUATICS',
    worldPosition: new THREE.Vector3(8, 0.5, 9),
    offsetSide: 'bottom-right'
  }
];

export function buildPavilionModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // P0: Site & River Meadow
  const meadowGeo = new THREE.BoxGeometry(34, 0.8, 28);
  const meadow = new THREE.Mesh(meadowGeo, materials.grassMat);
  meadow.position.set(0, -0.4, 0);
  meadow.receiveShadow = true;
  parts.push({
    mesh: meadow,
    initialY: -0.4,
    data: {
      id: 'pav_meadow',
      name: 'Alluvial River Meadow & Geotextile Base',
      phaseId: 0,
      category: 'Terrain',
      materialName: 'Graded River Loam & Washed Drainage Gravel',
      dimensions: '34.0m × 28.0m site',
      structuralRole: 'Permeable floodplain foundation mitigating river crest surges.',
      specifications: ['90% Proctor compacted fill', 'Sub-surface French drain field'],
      explodeVector: new THREE.Vector3(0, -8.0, 0)
    }
  });

  // P1: Elevated Pier Pilotis (8 cylindrical columns)
  const pierGroup = new THREE.Group();
  const pierGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.6, 16);
  const colX = [-9, -3, 3, 9];
  const colZ = [-4.5, 4.5];

  colX.forEach(x => {
    colZ.forEach(z => {
      const pier = new THREE.Mesh(pierGeo, materials.concreteMat);
      pier.position.set(x, 0.8, z);
      pier.castShadow = true;
      pierGroup.add(pier);
    });
  });

  // Floating entry steps plinth
  const stepsGeo = new THREE.BoxGeometry(5.0, 0.3, 3.5);
  const steps = new THREE.Mesh(stepsGeo, materials.concreteMat);
  steps.position.set(-6, 0.45, 7.5);
  pierGroup.add(steps);

  parts.push({
    mesh: pierGroup,
    initialY: 0,
    data: {
      id: 'pav_piers',
      name: 'Reinforced Concrete Pilotis Stilt Piers (x8)',
      phaseId: 1,
      category: 'Foundation',
      materialName: 'C40 High-Strength Concrete',
      dimensions: '700mm diameter × 1.6m elevation above grade',
      structuralRole: 'Raises entire living volume above historical floodplain watermarks.',
      specifications: ['Deep drilled friction caissons', 'Marine-grade epoxy rebar'],
      explodeVector: new THREE.Vector3(0, -4.5, 0)
    }
  });

  // P2: Exposed Museum White Steel Columns & Fascia
  const steelGroup = new THREE.Group();
  const whiteSteelMat = materials.plasterWhiteMat;
  const colMeshGeo = new THREE.BoxGeometry(0.28, 3.4, 0.28);

  colX.forEach(x => {
    colZ.forEach(z => {
      const col = new THREE.Mesh(colMeshGeo, whiteSteelMat);
      col.position.set(x, 3.2, z);
      col.castShadow = true;
      steelGroup.add(col);
    });
  });

  // Perimeter steel fascia channel
  const lowerFasciaGeo = new THREE.BoxGeometry(22, 0.35, 12);
  const lowerFascia = new THREE.Mesh(lowerFasciaGeo, whiteSteelMat);
  lowerFascia.position.set(0, 1.6, 0);
  steelGroup.add(lowerFascia);

  parts.push({
    mesh: steelGroup,
    initialY: 0,
    data: {
      id: 'pav_columns',
      name: 'Architectural Wide-Flange Steel Frame (x8)',
      phaseId: 2,
      category: 'Structure',
      materialName: 'ASTM A36 Heavy Steel Finished in Semi-Gloss White',
      dimensions: '8x 280mm columns welded to perimeter C-channels',
      structuralRole: 'External perimeter skeletal grid allowing completely column-free interior living.',
      specifications: ['Concealed moment-resistant welds', 'Multi-coat aliphatic polyurethane coat'],
      explodeVector: new THREE.Vector3(0, 0, 0)
    }
  });

  // P3: Suspended Travertine Podium Floor Slab
  const slabGroup = new THREE.Group();
  const slabGeo = new THREE.BoxGeometry(21.4, 0.22, 11.4);
  const slab = new THREE.Mesh(slabGeo, materials.concreteMat);
  slab.position.set(0, 1.7, 0);
  slab.receiveShadow = true;
  slabGroup.add(slab);

  // Entrance terrace slab
  const terraceGeo = new THREE.BoxGeometry(7.0, 0.2, 5.0);
  const terrace = new THREE.Mesh(terraceGeo, materials.concreteMat);
  terrace.position.set(-6, 0.95, 7.5);
  terrace.receiveShadow = true;
  slabGroup.add(terrace);

  parts.push({
    mesh: slabGroup,
    initialY: 0,
    data: {
      id: 'pav_travertine',
      name: 'Honed Roman Travertine Podium Slab',
      phaseId: 3,
      category: 'Slabs',
      materialName: 'Unfilled Roman Travertine on Post-Tensioned Concrete',
      dimensions: '21.4m × 11.4m suspended floor podium',
      structuralRole: 'Rigid diaphragm supporting open plan and radiant hydronic heating circuits.',
      specifications: ['Precision waterjet cut 600×1200mm tiles', 'Integrated concealed scupper drains'],
      explodeVector: new THREE.Vector3(0, -2.0, 0)
    }
  });

  // P4: Frameless Floor-to-Ceiling Clear Glass Curtain
  const glassGroup = new THREE.Group();
  const frontGlassGeo = new THREE.BoxGeometry(20.8, 3.1, 0.06);
  const frontGlass = new THREE.Mesh(frontGlassGeo, materials.glassMat);
  frontGlass.position.set(0, 3.35, 4.4);
  glassGroup.add(frontGlass);

  const rearGlass = new THREE.Mesh(frontGlassGeo, materials.glassMat);
  rearGlass.position.set(0, 3.35, -4.4);
  glassGroup.add(rearGlass);

  const endGlassGeo = new THREE.BoxGeometry(0.06, 3.1, 8.8);
  const leftGlass = new THREE.Mesh(endGlassGeo, materials.glassMat);
  leftGlass.position.set(-10.4, 3.35, 0);
  glassGroup.add(leftGlass);

  const rightGlass = new THREE.Mesh(endGlassGeo, materials.glassMat);
  rightGlass.position.set(10.4, 3.35, 0);
  glassGroup.add(rightGlass);

  parts.push({
    mesh: glassGroup,
    initialY: 0,
    data: {
      id: 'pav_glass',
      name: 'Frameless Panoramic Crystal Glass Curtain Wall',
      phaseId: 4,
      category: 'CurtainWall',
      materialName: 'Low-Iron Extra Clear Laminated Safety Glass',
      dimensions: '3.1m clear height continuous glazed envelope',
      structuralRole: 'Total visual dissolution of indoors and outdoors with high UV resistance.',
      specifications: ['Light transmittance: 91%', 'Structural silicone butt glazing joints'],
      explodeVector: new THREE.Vector3(0, 1.5, 8.5)
    }
  });

  // P5: Interior Teak Core & Minimalist Barcelona Furniture
  const interiorGroup = new THREE.Group();

  // Teak Core
  const coreGeo = new THREE.BoxGeometry(7.0, 2.9, 2.8);
  const core = new THREE.Mesh(coreGeo, materials.woodMat);
  core.position.set(1.5, 3.25, 0);
  core.castShadow = true;
  interiorGroup.add(core);

  // Barcelona Daybed & Table
  const bedGeo = new THREE.BoxGeometry(2.2, 0.35, 1.0);
  const bedMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4 });
  const bed = new THREE.Mesh(bedGeo, bedMat);
  bed.position.set(-5.0, 1.95, -1.0);
  bed.castShadow = true;
  interiorGroup.add(bed);

  const tableGeo = new THREE.BoxGeometry(1.2, 0.3, 1.2);
  const table = new THREE.Mesh(tableGeo, materials.concreteMat);
  table.position.set(-5.0, 1.9, 1.8);
  interiorGroup.add(table);

  parts.push({
    mesh: interiorGroup,
    initialY: 0,
    data: {
      id: 'pav_interior',
      name: 'Natural Golden Teak Core & Barcelona Lounge',
      phaseId: 5,
      category: 'Interior',
      materialName: 'Burmese Golden Teak & Tufted Top-Grain Leather',
      dimensions: '7.0m × 2.8m utility core housing bathroom and mechanicals',
      structuralRole: 'Free-standing interior core providing private amenities without touching exterior glass.',
      specifications: ['Book-matched quarter-cut teak veneers', 'Concealed pivot flush doors'],
      explodeVector: new THREE.Vector3(-5.0, 1.8, 0)
    }
  });

  // P6: Cantilevered Roof Plane
  const roofGroup = new THREE.Group();
  const roofGeo = new THREE.BoxGeometry(23.6, 0.4, 13.6);
  const roof = new THREE.Mesh(roofGeo, materials.plasterWhiteMat);
  roof.position.set(0, 5.1, 0);
  roof.castShadow = true;
  roofGroup.add(roof);

  parts.push({
    mesh: roofGroup,
    initialY: 0,
    data: {
      id: 'pav_roof',
      name: 'Floating Thin-Profile Roof Diaphragm',
      phaseId: 6,
      category: 'Roof',
      materialName: 'Lightweight Precast Concrete with Polyurethane Waterproofing',
      dimensions: '23.6m × 13.6m × 0.4m cantilevered plane',
      structuralRole: 'Oversails glass walls by 1.6m providing natural solar shading and rain protection.',
      specifications: ['Single-ply TPO reflective membrane', 'Concealed internal column rainwater downspouts'],
      explodeVector: new THREE.Vector3(0, 12.0, 0)
    }
  });

  // P7: Reflecting Pool & River Birches
  const landscapeGroup = new THREE.Group();

  // Reflecting basin
  const poolGeo = new THREE.BoxGeometry(9.0, 0.4, 5.0);
  const pool = new THREE.Mesh(poolGeo, materials.poolTileMat);
  pool.position.set(7.0, 0.2, 7.5);
  landscapeGroup.add(pool);

  const waterGeo = new THREE.BoxGeometry(8.6, 0.1, 4.6);
  const water = new THREE.Mesh(waterGeo, materials.waterMat);
  water.position.set(7.0, 0.38, 7.5);
  landscapeGroup.add(water);

  // River Birch Trees (white trunks)
  function createBirch(x: number, z: number, s: number) {
    const tree = new THREE.Group();
    const trunkGeo = new THREE.CylinderGeometry(0.1 * s, 0.16 * s, 3.8 * s, 8);
    const trunkMat = materials.plasterWhiteMat;
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(0, 1.9 * s, 0);
    trunk.castShadow = true;
    tree.add(trunk);

    const leafGeo = new THREE.DodecahedronGeometry(1.2 * s, 1);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x5a8a48, roughness: 0.8 });
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(0, 3.8 * s, 0);
    leaf.castShadow = true;
    tree.add(leaf);

    tree.position.set(x, 0.1, z);
    return tree;
  }

  landscapeGroup.add(createBirch(-12, -7, 1.2));
  landscapeGroup.add(createBirch(-10, 8, 1.0));
  landscapeGroup.add(createBirch(13, -6, 1.1));

  parts.push({
    mesh: landscapeGroup,
    initialY: 0,
    data: {
      id: 'pav_landscape',
      name: 'Reflecting Water Basin & White River Birches',
      phaseId: 7,
      category: 'Finishes',
      materialName: 'Honed Nero Marquina Granite & Betula Jacquemontii',
      dimensions: '9.0m × 5.0m reflecting water mirror',
      structuralRole: 'Visual mirror amplifying horizontal architectural lines and ambient cooling.',
      specifications: ['Bio-filtered closed loop water recirculation', 'Architectural specimen tree root barriers'],
      explodeVector: new THREE.Vector3(6.0, -1.5, 6.0)
    }
  });

  return parts;
}
