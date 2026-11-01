import * as THREE from 'three';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from '../phases/Phase0_SiteTerrain';
import { CalloutAnnotation, ConstructionPhase } from '../../types';

export const CABIN_PHASES: ConstructionPhase[] = [
  {
    id: 0,
    title: 'Hillside Excavation',
    subtitle: 'Bedrock Grading & Drainage Swale',
    description: 'Excavation of mountain bedrock slope, stepped retaining benches, and installation of crushed granite foundation base.',
    badge: 'PHASE 01 // SITE',
    durationSeconds: 6,
    tradeSpecialty: 'Alpine Civil Works',
    safetyProtocol: 'Slope stability geotechnical monitoring'
  },
  {
    id: 1,
    title: 'Dry-Stack Stone Stem Walls',
    subtitle: 'Granite Masonry & Anchor Sills',
    description: 'Natural mountain granite stem walls with damp-proof membrane and galvanized seismic anchor tie plates.',
    badge: 'PHASE 02 // SUBSTRUCTURE',
    durationSeconds: 7,
    tradeSpecialty: 'Stone Masonry',
    safetyProtocol: 'Heavy stone lifting vacuum equipment'
  },
  {
    id: 2,
    title: 'Glulam Timber A-Frames',
    subtitle: '6x 60° Heavy Glued-Laminated Rafters',
    description: 'Erection of six pre-fabricated 300×600mm glulam A-frame trusses joined at the peak with concealed blackened steel knife plates.',
    badge: 'PHASE 03 // TIMBER SKELETON',
    durationSeconds: 8,
    tradeSpecialty: 'Mass Timber Rigging',
    safetyProtocol: 'High-wind erection shutdown protocol (> 20 mph)'
  },
  {
    id: 3,
    title: 'T&G Floor & Sleeping Loft',
    subtitle: 'Ground Deck & Cantilever Mezzanine',
    description: 'Heavy structural Douglas fir tongue-and-groove floor decking over glulam joists, plus an elevated mezzanine sleeping loft.',
    badge: 'PHASE 04 // DECKS',
    durationSeconds: 8,
    tradeSpecialty: 'Structural Carpentry',
    safetyProtocol: 'Mezzanine perimeter guardrails prior to decking'
  },
  {
    id: 4,
    title: 'Triangular Glass Gable Wall',
    subtitle: '10m Apex Panoramic Alpine Glazing',
    description: 'Custom trapezoidal triple-glazed structural facade framing panoramic vistas of surrounding peaks with solar control coating.',
    badge: 'PHASE 05 // FACADE',
    durationSeconds: 8,
    tradeSpecialty: 'Specialist Glazing',
    safetyProtocol: 'High-altitude vacuum crane suction hoisting'
  },
  {
    id: 5,
    title: 'Nordic Interior & Wood Stove',
    subtitle: 'Birch Plywood & Cast Iron Hearth',
    description: 'Warm birch plywood acoustic wall lining, Danish cast-iron suspended wood stove, sheepskin seating, and timber loft ladder.',
    badge: 'PHASE 06 // INTERIOR',
    durationSeconds: 8,
    tradeSpecialty: 'Scandinavian Fit-out',
    safetyProtocol: 'Fireproof hearth clearance testing (UL 1482)'
  },
  {
    id: 6,
    title: 'Standing Seam Zinc Roof',
    subtitle: 'Steep 60° Alpine Snow-Shedding Skin',
    description: 'Standing seam anthracite zinc metal roofing with integrated snow guards, 200mm wood fiber continuous insulation, and vented ridge.',
    badge: 'PHASE 07 // ROOF',
    durationSeconds: 7,
    tradeSpecialty: 'Architectural Sheet Metal',
    safetyProtocol: 'Full roof harness lifeline tethering'
  },
  {
    id: 7,
    title: 'Cedar Viewing Deck & Pines',
    subtitle: 'Cantilever Deck & Mountain Pine Forest',
    description: 'Western Red Cedar cantilevered viewing deck with sunken cedar soaking tub, outdoor stone fire pit, and Scotch pine trees.',
    badge: 'PHASE 08 // FINISHES',
    durationSeconds: 8,
    tradeSpecialty: 'Landscape & Exterior',
    safetyProtocol: 'Wildfire defensive space zone certification'
  }
];

export const CABIN_CALLOUTS: CalloutAnnotation[] = [
  {
    id: 'cab_c_site',
    componentId: 'cab_site',
    phaseId: 0,
    label: 'Bedrock Excavation',
    sublabel: 'Stepped mountain bench with crushed granite base',
    tag: 'CIVIL',
    worldPosition: new THREE.Vector3(-10, 0.2, 8),
    offsetSide: 'top-left'
  },
  {
    id: 'cab_c_stone',
    componentId: 'cab_stone',
    phaseId: 1,
    label: 'Granite Masonry Stem Walls',
    sublabel: 'Natural dry-stack local mountain granite sills',
    tag: 'MASONRY',
    worldPosition: new THREE.Vector3(7, 0.9, 5),
    offsetSide: 'bottom-right'
  },
  {
    id: 'cab_c_glulam',
    componentId: 'cab_aframes',
    phaseId: 2,
    label: 'Glulam Timber A-Frames (x6)',
    sublabel: '300×600mm Douglas fir 60° portal trusses',
    tag: 'TIMBER',
    worldPosition: new THREE.Vector3(6, 4.5, 0),
    offsetSide: 'top-right'
  },
  {
    id: 'cab_c_loft',
    componentId: 'cab_floors',
    phaseId: 3,
    label: 'Sleeping Loft Mezzanine',
    sublabel: 'Structural T&G Douglas fir floating deck',
    tag: 'DECK',
    worldPosition: new THREE.Vector3(0, 3.2, -2),
    offsetSide: 'top-left'
  },
  {
    id: 'cab_c_glass',
    componentId: 'cab_gable_glass',
    phaseId: 4,
    label: 'Triangular Glass Gable Facade',
    sublabel: '10m apex triple-glazed panoramic alpine skin',
    tag: 'GLAZING',
    worldPosition: new THREE.Vector3(0, 4.2, 6.0),
    offsetSide: 'top-right'
  },
  {
    id: 'cab_c_hearth',
    componentId: 'cab_interior',
    phaseId: 5,
    label: 'Cast-Iron Hearth & Birch Lining',
    sublabel: 'Danish suspended wood stove & timber joinery',
    tag: 'INTERIOR',
    worldPosition: new THREE.Vector3(-2, 1.8, 2),
    offsetSide: 'bottom-left'
  },
  {
    id: 'cab_c_zinc',
    componentId: 'cab_zinc_roof',
    phaseId: 6,
    label: 'Standing Seam Zinc Roof',
    sublabel: 'Anthracite 60° steep snow-shedding metal skin',
    tag: 'ROOF',
    worldPosition: new THREE.Vector3(-4, 6.5, 0),
    offsetSide: 'top-left'
  },
  {
    id: 'cab_c_deck',
    componentId: 'cab_cedar_deck',
    phaseId: 7,
    label: 'Cedar Cantilever Deck & Pines',
    sublabel: 'Western Red Cedar terrace & Scotch pines',
    tag: 'TERRACE',
    worldPosition: new THREE.Vector3(0, 0.8, 9),
    offsetSide: 'bottom-right'
  }
];

export function buildCabinModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // P0: Site & Mountain Bedrock
  const terrainGeo = new THREE.BoxGeometry(32, 1.0, 26);
  const terrain = new THREE.Mesh(terrainGeo, materials.soilMat);
  terrain.position.set(0, -0.5, 0);
  terrain.receiveShadow = true;
  parts.push({
    mesh: terrain,
    initialY: -0.5,
    data: {
      id: 'cab_site',
      name: 'Granite Mountain Slope Excavation',
      phaseId: 0,
      category: 'Terrain',
      materialName: 'Compacted Crushed Granite & Mountain Bedrock',
      dimensions: '32.0m × 26.0m alpine site bench',
      structuralRole: 'Direct bearing on granite bedrock with zero differential settlement risk.',
      specifications: ['Rock-anchor tie-backs', 'Perimeter alpine snow-melt diversion swale'],
      explodeVector: new THREE.Vector3(0, -8.0, 0)
    }
  });

  // P1: Granite Masonry Stem Walls
  const stoneGroup = new THREE.Group();
  const stemWallGeo = new THREE.BoxGeometry(14.5, 0.8, 0.45);
  const leftWall = new THREE.Mesh(stemWallGeo, materials.darkConcreteMat);
  leftWall.position.set(-5.5, 0.4, 0);
  leftWall.rotation.y = Math.PI / 2;
  stoneGroup.add(leftWall);

  const rightWall = new THREE.Mesh(stemWallGeo, materials.darkConcreteMat);
  rightWall.position.set(5.5, 0.4, 0);
  rightWall.rotation.y = Math.PI / 2;
  stoneGroup.add(rightWall);

  // Sill beams
  const sillGeo = new THREE.BoxGeometry(11.5, 0.3, 0.5);
  const rearSill = new THREE.Mesh(sillGeo, materials.darkConcreteMat);
  rearSill.position.set(0, 0.4, -7.0);
  stoneGroup.add(rearSill);

  parts.push({
    mesh: stoneGroup,
    initialY: 0,
    data: {
      id: 'cab_stone',
      name: 'Natural Stone Masonry Stem Walls',
      phaseId: 1,
      category: 'Foundation',
      materialName: 'Local Alpine Granite with Mortar Core',
      dimensions: '450mm thick perimeter stem walls × 800mm height',
      structuralRole: 'Thermal mass base insulating interior and transferring massive roof snow loads to bedrock.',
      specifications: ['B500B anchor bolts embedded 400mm', 'Continuous capillary break membrane'],
      explodeVector: new THREE.Vector3(0, -4.5, 0)
    }
  });

  // P2: 6 Glulam Timber A-Frame Portal Rafters
  const aframeGroup = new THREE.Group();
  const timberMat = materials.woodMat;
  const rafterLength = 11.0;
  const rafterThick = 0.35;
  const rafterDepth = 0.5;

  const rafterGeo = new THREE.BoxGeometry(rafterDepth, rafterLength, rafterThick);
  const aframeZ = [-6.5, -3.9, -1.3, 1.3, 3.9, 6.5];

  aframeZ.forEach(z => {
    // Left rafter (angled 30 degrees from vertical)
    const leftRafter = new THREE.Mesh(rafterGeo, timberMat);
    leftRafter.position.set(-2.6, 5.0, z);
    leftRafter.rotation.z = -0.52; // ~30 deg
    leftRafter.castShadow = true;
    aframeGroup.add(leftRafter);

    // Right rafter
    const rightRafter = new THREE.Mesh(rafterGeo, timberMat);
    rightRafter.position.set(2.6, 5.0, z);
    rightRafter.rotation.z = 0.52;
    rightRafter.castShadow = true;
    aframeGroup.add(rightRafter);

    // Steel apex connector plate
    const apexGeo = new THREE.BoxGeometry(0.8, 0.4, 0.4);
    const apex = new THREE.Mesh(apexGeo, materials.steelMat);
    apex.position.set(0, 9.6, z);
    aframeGroup.add(apex);
  });

  parts.push({
    mesh: aframeGroup,
    initialY: 0,
    data: {
      id: 'cab_aframes',
      name: 'Mass Glulam Timber A-Frame Portal Rafters (x6)',
      phaseId: 2,
      category: 'Structure',
      materialName: 'Glued-Laminated Douglas Fir GL28c with Blackened Steel Knives',
      dimensions: '300×500mm curved-profile rafters rising to 10.0m apex',
      structuralRole: 'Primary self-supporting structural spine resisting 3.5 kN/m² alpine snow load.',
      specifications: ['Concealed knife plates with 20mm steel dowels', 'FSC certified sustainable timber'],
      explodeVector: new THREE.Vector3(0, 0, 0)
    }
  });

  // P3: Structural T&G Floor & Sleeping Loft
  const floorGroup = new THREE.Group();

  // Ground floor
  const gFloorGeo = new THREE.BoxGeometry(10.6, 0.25, 14.0);
  const gFloor = new THREE.Mesh(gFloorGeo, materials.woodMat);
  gFloor.position.set(0, 0.85, 0);
  gFloor.receiveShadow = true;
  floorGroup.add(gFloor);

  // Sleeping loft mezzanine (spans rear half at Y = 3.5m)
  const loftGeo = new THREE.BoxGeometry(7.0, 0.18, 7.0);
  const loft = new THREE.Mesh(loftGeo, materials.woodMat);
  loft.position.set(0, 3.8, -3.2);
  loft.castShadow = true;
  floorGroup.add(loft);

  parts.push({
    mesh: floorGroup,
    initialY: 0,
    data: {
      id: 'cab_floors',
      name: 'Heavy Tongue-and-Groove Floor & Loft Decking',
      phaseId: 3,
      category: 'Slabs',
      materialName: '40mm Solid Douglas Fir Plank Decks on Glulam Beams',
      dimensions: '148m² total usable internal floor area',
      structuralRole: 'Horizontal diaphragms tying left and right rafters together under wind shear.',
      specifications: ['Acoustic cork soundproofing underlay', 'Natural hardwax oil matte finish'],
      explodeVector: new THREE.Vector3(0, -2.0, 0)
    }
  });

  // P4: Triangular Glass Front Gable Facade
  const glassGroup = new THREE.Group();

  // Triangular facade glass pane
  const triangleShape = new THREE.Shape();
  triangleShape.moveTo(-5.2, 0.85);
  triangleShape.lineTo(5.2, 0.85);
  triangleShape.lineTo(0, 9.6);
  triangleShape.closePath();

  const extrudeSettings = { depth: 0.08, bevelEnabled: false };
  const triangleGeo = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
  const triangleGlass = new THREE.Mesh(triangleGeo, materials.glassMat);
  triangleGlass.position.set(0, 0, 6.4);
  glassGroup.add(triangleGlass);

  // Rear triangular wall (dark timber cladding)
  const rearWallGeo = new THREE.ExtrudeGeometry(triangleShape, { depth: 0.25, bevelEnabled: false });
  const rearWall = new THREE.Mesh(rearWallGeo, materials.interiorDarkWallMat);
  rearWall.position.set(0, 0, -6.6);
  glassGroup.add(rearWall);

  parts.push({
    mesh: glassGroup,
    initialY: 0,
    data: {
      id: 'cab_gable_glass',
      name: 'Triangular Glass Gable Facade & Rear Wall',
      phaseId: 4,
      category: 'CurtainWall',
      materialName: 'Triple-Glazed Argon-Filled Safety Glass & Vertical Timber Slats',
      dimensions: '10.0m apex clear height triangular gable',
      structuralRole: 'Frames breathtaking mountain vistas while providing thermal envelope (U-value 0.72 W/m²K).',
      specifications: ['Solar Heat Gain Coefficient: 0.28', 'Thermally broken aluminum perimeter frame'],
      explodeVector: new THREE.Vector3(0, 1.5, 8.0)
    }
  });

  // P5: Nordic Interior, Cast Iron Stove & Sauna
  const interiorGroup = new THREE.Group();

  // Black cast iron suspended stove
  const stovePipeGeo = new THREE.CylinderGeometry(0.1, 0.1, 6.0, 12);
  const stoveMat = materials.steelMat;
  const stovePipe = new THREE.Mesh(stovePipeGeo, stoveMat);
  stovePipe.position.set(-2.0, 4.5, 2.5);
  interiorGroup.add(stovePipe);

  const stoveBodyGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 12);
  const stoveBody = new THREE.Mesh(stoveBodyGeo, stoveMat);
  stoveBody.position.set(-2.0, 1.6, 2.5);
  stoveBody.castShadow = true;
  interiorGroup.add(stoveBody);

  // Loft bed
  const bedGeo = new THREE.BoxGeometry(2.0, 0.4, 2.2);
  const bed = new THREE.Mesh(bedGeo, materials.plasterWhiteMat);
  bed.position.set(0, 4.2, -4.0);
  bed.castShadow = true;
  interiorGroup.add(bed);

  // Lounge chairs
  const chairGeo = new THREE.BoxGeometry(1.2, 0.7, 1.2);
  const chairMat = new THREE.MeshStandardMaterial({ color: 0xc49b71, roughness: 0.9 });
  const chair = new THREE.Mesh(chairGeo, chairMat);
  chair.position.set(1.5, 1.3, 2.5);
  interiorGroup.add(chair);

  parts.push({
    mesh: interiorGroup,
    initialY: 0,
    data: {
      id: 'cab_interior',
      name: 'Nordic Interior, Cast-Iron Stove & Loft Suite',
      phaseId: 5,
      category: 'Interior',
      materialName: 'Danish Cast Iron, Birch Plywood & Wool Upholstery',
      dimensions: 'Open-concept alpine living room with elevated master sleeping loft',
      structuralRole: 'Primary heating source with high-efficiency catalytic clean-burn combustion.',
      specifications: ['EPA 2020 certified wood stove (82% efficiency)', 'Direct exterior fresh air combustion intake'],
      explodeVector: new THREE.Vector3(-5.0, 1.8, 0)
    }
  });

  // P6: Standing Seam Anthracite Zinc Roof
  const roofGroup = new THREE.Group();
  const zincMat = materials.steelMat;
  const roofSlopeGeo = new THREE.BoxGeometry(0.12, 11.4, 14.5);

  const leftRoof = new THREE.Mesh(roofSlopeGeo, zincMat);
  leftRoof.position.set(-2.8, 5.0, 0);
  leftRoof.rotation.z = -0.52;
  leftRoof.castShadow = true;
  roofGroup.add(leftRoof);

  const rightRoof = new THREE.Mesh(roofSlopeGeo, zincMat);
  rightRoof.position.set(2.8, 5.0, 0);
  rightRoof.rotation.z = 0.52;
  rightRoof.castShadow = true;
  roofGroup.add(rightRoof);

  // Ridge cap
  const ridgeGeo = new THREE.BoxGeometry(0.5, 0.2, 14.6);
  const ridge = new THREE.Mesh(ridgeGeo, zincMat);
  ridge.position.set(0, 9.8, 0);
  roofGroup.add(ridge);

  parts.push({
    mesh: roofGroup,
    initialY: 0,
    data: {
      id: 'cab_zinc_roof',
      name: 'Standing Seam Anthracite Zinc Metal Roof',
      phaseId: 6,
      category: 'Roof',
      materialName: 'Rheinzink Pre-weathered Anthracite Standing Seam Titanium Zinc',
      dimensions: '2x 11.4m × 14.5m 60° sloped roof planes',
      structuralRole: 'Sheds extreme snowdrifts naturally while protecting timber structure for 100+ years.',
      specifications: ['100% recyclable titanium-zinc alloy', 'Continuous ridge ventilation cavity'],
      explodeVector: new THREE.Vector3(0, 12.0, 0)
    }
  });

  // P7: Cedar Viewing Deck & Scotch Pines
  const exteriorGroup = new THREE.Group();

  // Cantilever cedar deck
  const deckGeo = new THREE.BoxGeometry(13.0, 0.2, 5.0);
  const deck = new THREE.Mesh(deckGeo, materials.woodMat);
  deck.position.set(0, 0.8, 9.0);
  deck.receiveShadow = true;
  exteriorGroup.add(deck);

  // Sunken cedar soaking hot tub
  const tubGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.8, 16);
  const tub = new THREE.Mesh(tubGeo, materials.woodMat);
  tub.position.set(4.5, 0.8, 9.0);
  exteriorGroup.add(tub);

  const tubWaterGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.1, 16);
  const tubWater = new THREE.Mesh(tubWaterGeo, materials.waterMat);
  tubWater.position.set(4.5, 1.1, 9.0);
  exteriorGroup.add(tubWater);

  // Scotch pine trees
  function createPine(x: number, z: number, s: number) {
    const tree = new THREE.Group();
    const trunkGeo = new THREE.CylinderGeometry(0.12 * s, 0.2 * s, 4.0 * s, 8);
    const trunk = new THREE.Mesh(trunkGeo, materials.woodMat);
    trunk.position.set(0, 2.0 * s, 0);
    trunk.castShadow = true;
    tree.add(trunk);

    const needleMat = new THREE.MeshStandardMaterial({ color: 0x224422, roughness: 0.9, flatShading: true });
    for (let i = 0; i < 4; i++) {
      const coneGeo = new THREE.ConeGeometry((1.8 - i * 0.35) * s, 1.6 * s, 7);
      const cone = new THREE.Mesh(coneGeo, needleMat);
      cone.position.set(0, (2.6 + i * 0.9) * s, 0);
      cone.castShadow = true;
      tree.add(cone);
    }

    tree.position.set(x, 0, z);
    return tree;
  }

  exteriorGroup.add(createPine(-11, 4, 1.2));
  exteriorGroup.add(createPine(-12, -6, 1.4));
  exteriorGroup.add(createPine(12, -4, 1.3));
  exteriorGroup.add(createPine(11, 8, 1.0));

  parts.push({
    mesh: exteriorGroup,
    initialY: 0,
    data: {
      id: 'cab_cedar_deck',
      name: 'Western Red Cedar Viewing Deck & Pine Forest',
      phaseId: 7,
      category: 'Finishes',
      materialName: 'FSC Certified Red Cedar Decking & Pinus Sylvestris (Scotch Pine)',
      dimensions: '65m² cantilevered viewing terrace with wood-fired soaking tub',
      structuralRole: 'Seamless alpine outdoor living blending built form into pristine wilderness.',
      specifications: ['Concealed Camo edge fastening', 'Zero chemical timber preservative'],
      explodeVector: new THREE.Vector3(5.5, -1.5, 5.5)
    }
  });

  return parts;
}
