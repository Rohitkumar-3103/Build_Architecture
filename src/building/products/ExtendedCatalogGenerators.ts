import * as THREE from 'three';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from '../phases/Phase0_SiteTerrain';
import { BuildingComponentData } from '../../types';

// Helper to compute an authentic, dramatic BIM exploded view vector for any construction phase
function calculateDynamicExplodeVector(
  phaseId: number,
  category: BuildingComponentData['category'],
  mesh: THREE.Object3D,
  customVector?: THREE.Vector3
): THREE.Vector3 {
  if (customVector) return customVector;

  // Determine lateral radial direction from mesh position or default quadrant
  let radX = mesh.position.x;
  let radZ = mesh.position.z;
  const dist = Math.sqrt(radX * radX + radZ * radZ);

  if (dist > 0.5) {
    radX /= dist;
    radZ /= dist;
  } else {
    // Unique radial orientation per phase for high-contrast multi-axis separation
    const phaseAngles = [
      0,                  // Phase 0: drops down
      Math.PI / 4,        // Phase 1: drops down
      0,                  // Phase 2: center anchor
      -Math.PI / 4,       // Phase 3: lifts up and diagonally
      Math.PI / 2,        // Phase 4: peels outward
      -Math.PI / 2,       // Phase 5: slides opposite
      0,                  // Phase 6: launches up
      (3 * Math.PI) / 4   // Phase 7: expands outward perimeter
    ];
    const angle = phaseAngles[phaseId] || 0;
    radX = Math.cos(angle);
    radZ = Math.sin(angle);
  }

  switch (phaseId) {
    case 0: // Terrain & Sub-grade Site Excavation
      // Drops downward below ground
      return new THREE.Vector3(0, -9.0, 0);

    case 1: // Foundation, Piles & Raft
      // Drops downward beneath superstructure
      return new THREE.Vector3(0, -5.0, 0);

    case 2: // Primary Superstructure & Structural Framing
      // Anchored at core position with slight separation
      return new THREE.Vector3(0, 0.5, 0);

    case 3: // Floor Slabs & Horizontal Decks
      // Ascends and fans slightly diagonally for clear floor-to-floor inspection
      return new THREE.Vector3(radX * 3.5, 5.0, radZ * 3.5);

    case 4: // Curtain Wall / Facade / Building Envelope
      // Peels dramatically RADIAL OUTWARD away from the structure
      return new THREE.Vector3(radX * 11.0, 1.5, radZ * 11.0);

    case 5: // Interior Fit-Out & MEP Core
      // Steps out on opposite side so rooms are independently visible
      return new THREE.Vector3(-radX * 6.0, 2.5, -radZ * 6.0);

    case 6: // Roof Truss, Oculus, Canopy & Spire
      // Flies high into the sky above the structure
      return new THREE.Vector3(0, 14.5, 0);

    case 7: // Civic Landscape, Surrounding Terraces, Paving & Illuminations
      // Expands outward along ground perimeter
      return new THREE.Vector3(radX * 9.0, -2.0, radZ * 9.0);

    default:
      return new THREE.Vector3(0, 6.0, 0);
  }
}

// Helper to create a PhasePart with default BIM component metadata and full exploded view disassembly support
function createPart(
  mesh: THREE.Object3D,
  phaseId: number,
  id: string,
  name: string,
  category: BuildingComponentData['category'],
  dimensions: string,
  structuralRole: string,
  customExplodeVector?: THREE.Vector3
): PhasePart {
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const explodeVector = calculateDynamicExplodeVector(phaseId, category, mesh, customExplodeVector);

  return {
    mesh,
    initialY: mesh.position.y,
    data: {
      id,
      name,
      phaseId,
      category,
      materialName: 'Structural Grade PBR',
      dimensions,
      structuralRole,
      specifications: [
        `Phase: Stage 0${phaseId + 1}`,
        `BIM LOD: 400 Fabrication Level`,
        `Quality Control: Verified to ISO 19650`
      ],
      explodeVector
    }
  };
}

// 4. Skyline Diagrid Tower (Commercial, 12,500m²)
export function buildHighriseModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Deep Subterranean Slurry Wall Excavation
  const p0Group = new THREE.Group();
  const terrain = new THREE.Mesh(new THREE.BoxGeometry(30, 0.8, 30), materials.darkConcreteMat);
  terrain.position.set(0, -0.4, 0);
  const trench = new THREE.Mesh(new THREE.BoxGeometry(24, 0.4, 24), materials.soilMat);
  trench.position.set(0, -0.2, 0);
  p0Group.add(terrain, trench);
  parts.push(createPart(p0Group, 0, 'hr-site', 'Deep Slurry Wall Excavation & Bedrock Datum', 'Terrain', '30m x 30m x 2m', 'Subterranean retaining perimeter'));

  // P1: Heavy Reinforced Caisson Mat Foundation
  const p1Group = new THREE.Group();
  const matFoundation = new THREE.Mesh(new THREE.BoxGeometry(22, 1.8, 22), materials.darkConcreteMat);
  matFoundation.position.set(0, 0.5, 0);
  const coreBase = new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 10), materials.concreteMat);
  coreBase.position.set(0, 1.45, 0);
  p1Group.add(matFoundation, coreBase);
  parts.push(createPart(p1Group, 1, 'hr-found', 'Mass Concrete Raft Foundation (2.5m thick)', 'Foundation', '22m x 22m x 1.8m', 'High-strength load bearing raft & core pad'));

  // P2: Structural Steel Diagrid Perimeter Tube & Columns
  const p2Group = new THREE.Group();
  const corners: [number, number][] = [[-7.8, -7.8], [7.8, -7.8], [-7.8, 7.8], [7.8, 7.8]];
  corners.forEach(([cx, cz]) => {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 24, 12), materials.steelBeamMat);
    col.position.set(cx, 12.5, cz);
    p2Group.add(col);
  });
  for (let y = 1; y <= 6; y++) {
    const ring = new THREE.Mesh(new THREE.BoxGeometry(16.2, 0.45, 16.2), materials.steelMat);
    ring.position.set(0, y * 3.8, 0);
    p2Group.add(ring);
  }
  for (let tier = 0; tier < 3; tier++) {
    const yMid = 2.0 + tier * 7.6 + 3.8;
    [-7.8, 7.8].forEach(xPos => {
      const diag1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 8.4, 0.35), materials.steelMat);
      diag1.position.set(xPos, yMid, 0);
      diag1.rotation.x = Math.PI / 4;
      const diag2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 8.4, 0.35), materials.steelMat);
      diag2.position.set(xPos, yMid, 0);
      diag2.rotation.x = -Math.PI / 4;
      p2Group.add(diag1, diag2);
    });
    [-7.8, 7.8].forEach(zPos => {
      const diag1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 8.4, 0.35), materials.steelMat);
      diag1.position.set(0, yMid, zPos);
      diag1.rotation.z = Math.PI / 4;
      const diag2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 8.4, 0.35), materials.steelMat);
      diag2.position.set(0, yMid, zPos);
      diag2.rotation.z = -Math.PI / 4;
      p2Group.add(diag1, diag2);
    });
  }
  for (let i = -6; i <= 6; i += 4) {
    const pCol = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 3.8, 10), materials.steelBeamMat);
    pCol.position.set(i, 2.0, 7.8);
    p2Group.add(pCol);
  }
  parts.push(createPart(p2Group, 2, 'hr-diagrid', 'Structural Steel Core & Perimeter Diagrid Lattice', 'Structure', '16.2m x 16.2m x 24m skeleton', 'Primary gravity and wind lateral load perimeter tube'));

  // P3: Composite Metal Floor Decks (6 Discrete Tiers)
  const p3Group = new THREE.Group();
  for (let i = 1; i <= 6; i++) {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(15.4, 0.38, 15.4), materials.concreteMat);
    slab.position.set(0, i * 3.8 - 0.2, 0);
    p3Group.add(slab);
  }
  parts.push(createPart(p3Group, 3, 'hr-slabs', 'Composite Metal Deck Floor Slabs (6 Tiers)', 'Slabs', '15.4m x 15.4m post-tensioned', 'Composite diaphragm steel-concrete slabs'));

  // P4: Unitized Double-Skin Low-E Glass Curtain Wall
  const p4Group = new THREE.Group();
  for (let i = 1; i <= 6; i++) {
    const yCenter = i * 3.8 - 1.8;
    const glassFloor = new THREE.Mesh(new THREE.BoxGeometry(15.6, 3.2, 15.6), materials.glassMat);
    glassFloor.position.set(0, yCenter, 0);
    const spandrel = new THREE.Mesh(new THREE.BoxGeometry(15.8, 0.6, 15.8), materials.steelBeamMat);
    spandrel.position.set(0, yCenter + 1.8, 0);
    p4Group.add(glassFloor, spandrel);
  }
  parts.push(createPart(p4Group, 4, 'hr-facade', 'Unitized Double-Skin Low-E Glass Curtain Wall', 'CurtainWall', '15.8m x 15.8m x 24m skin', 'Thermally-broken aerodynamic building skin'));

  // P5: Commercial Office Fit-Out & Core Elevator Bank
  const p5Group = new THREE.Group();
  const concreteCore = new THREE.Mesh(new THREE.BoxGeometry(6.5, 23.5, 6.5), materials.concreteMat);
  concreteCore.position.set(0, 12.0, 0);
  p5Group.add(concreteCore);
  for (let i = 1; i <= 6; i++) {
    const y = i * 3.8 - 1.8;
    const woodFloor = new THREE.Mesh(new THREE.BoxGeometry(14.6, 0.08, 14.6), materials.woodMat);
    woodFloor.position.set(0, y - 1.5, 0);
    const desk = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.8, 1.4), materials.furnitureMat);
    desk.position.set(4.2, y - 1.1, 4.2);
    const partition = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.2, 0.12), materials.woodMat);
    partition.position.set(-4.2, y - 0.4, 0);
    p5Group.add(woodFloor, desk, partition);
  }
  parts.push(createPart(p5Group, 5, 'hr-interior', 'Executive Office Fit-Out & Elevator Bank Core', 'Interior', '14.6m x 14.6m floorplates', 'High-speed elevator bank, meeting pods and raised floors'));

  // P6: Aerodynamic Crown Spire, Helipad & Tuned Mass Damper
  const p6Group = new THREE.Group();
  const crownCone = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 8.0, 4.5, 8), materials.steelBeamMat);
  crownCone.position.set(0, 25.2, 0);
  const tmdSphere = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16), materials.rebarMat);
  tmdSphere.position.set(0, 25.0, 0);
  const helipad = new THREE.Mesh(new THREE.CylinderGeometry(5.0, 5.0, 0.35, 16), materials.concreteMat);
  helipad.position.set(0, 27.5, 0);
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.3, 7.5, 8), materials.steelMat);
  spire.position.set(0, 31.5, 0);
  p6Group.add(crownCone, tmdSphere, helipad, spire);
  parts.push(createPart(p6Group, 6, 'hr-crown', 'Aerodynamic Crown, Spire & Tuned Mass Damper', 'Roof', '16m dia x 12m crown', 'Vibration tuned mass damping, BMU gantry and spire'));

  // P7: Granite Pedestrian Plaza & Reflecting Water Cascades
  const p7Group = new THREE.Group();
  const plaza = new THREE.Mesh(new THREE.BoxGeometry(28, 0.25, 28), materials.plasterWhiteMat);
  plaza.position.set(0, 0.1, 0);
  const pool = new THREE.Mesh(new THREE.BoxGeometry(10, 0.15, 6), materials.waterMat);
  pool.position.set(0, 0.18, 10.5);
  for (let x = -11; x <= 11; x += 5.5) {
    const treeTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 2.2, 8), materials.woodMat);
    treeTrunk.position.set(x, 1.2, 12);
    const treeCrown = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), materials.grassMat);
    treeCrown.position.set(x, 2.5, 12);
    p7Group.add(treeTrunk, treeCrown);
  }
  p7Group.add(plaza, pool);
  parts.push(createPart(p7Group, 7, 'hr-plaza', 'Granite Pedestrian Plaza, Reflecting Pools & Trees', 'Finishes', '28m x 28m plaza', 'Public civic realm, water features and promenade trees'));

  return parts;
}

// 5. Brutalist Monolith Museum (Cultural, 3,200m²)
export function buildMuseumModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  const p0 = new THREE.Mesh(new THREE.BoxGeometry(30, 0.8, 24), materials.concreteMat);
  p0.position.set(0, -0.4, 0);
  parts.push(createPart(p0, 0, 'mu-site', 'Museum Foundation Excavation & Sump Trenches', 'Terrain', '30m x 24m', 'Subterranean seismic isolation pad'));

  const p1 = new THREE.Mesh(new THREE.BoxGeometry(24, 1.4, 18), materials.concreteMat);
  p1.position.set(0, 0.3, 0);
  parts.push(createPart(p1, 1, 'mu-found', 'Heavy Reinforced Strip Footings', 'Foundation', '24m x 18m', 'Heavy seismic shear foundation'));

  // P2: Massive board-formed concrete pylons
  const p2Group = new THREE.Group();
  const wallL = new THREE.Mesh(new THREE.BoxGeometry(2, 9, 16), materials.concreteMat);
  wallL.position.set(-8, 5, 0);
  const wallR = new THREE.Mesh(new THREE.BoxGeometry(2, 9, 16), materials.concreteMat);
  wallR.position.set(8, 5, 0);
  p2Group.add(wallL, wallR);
  parts.push(createPart(p2Group, 2, 'mu-walls', 'Board-Formed Monolithic Concrete Shear Pylons', 'Structure', '16m x 2m x 9m', 'Exposed architectural structural walls'));

  const p3 = new THREE.Mesh(new THREE.BoxGeometry(18, 0.8, 16), materials.concreteMat);
  p3.position.set(0, 4.5, 0);
  parts.push(createPart(p3, 3, 'mu-bridge', 'Cantilevered Museum Gallery Bridge Slab', 'Slabs', '18m x 16m x 0.8m', 'Post-tensioned exhibition gallery deck'));

  // P4: Slit Glass Atrium
  const p4 = new THREE.Mesh(new THREE.BoxGeometry(14, 8, 2), materials.glassMat);
  p4.position.set(0, 5, 7.5);
  parts.push(createPart(p4, 4, 'mu-glazing', 'Structural Glazed Lightwell & Monumental Slit Glass', 'CurtainWall', '14m x 8m', 'Natural zenithal indirect illumination'));

  const p5 = new THREE.Mesh(new THREE.BoxGeometry(10, 4, 10), materials.woodMat);
  p5.position.set(0, 3, 0);
  parts.push(createPart(p5, 5, 'mu-interior', 'Acoustic Gallery Partitions & Minimalist Sculpture Court', 'Interior', '10m x 10m', 'Micro-topped concrete and museum lighting'));

  // P6: Coffered Roof Slab
  const p6 = new THREE.Mesh(new THREE.BoxGeometry(20, 1.2, 18), materials.concreteMat);
  p6.position.set(0, 9.8, 0);
  parts.push(createPart(p6, 6, 'mu-roof', 'Deep Coffered Concrete Roof & Skylight Baffles', 'Roof', '20m x 18m x 1.2m', 'Thermal mass cantilevered roof parasol'));

  // P7: Reflecting Court
  const p7 = new THREE.Mesh(new THREE.BoxGeometry(28, 0.3, 22), materials.waterMat);
  p7.position.set(0, 0.1, 0);
  parts.push(createPart(p7, 7, 'mu-water', 'Basalt Stone Sculpture Garden & Reflecting Basin', 'Finishes', '28m x 22m', 'Mirror pond and polished granite walkway'));

  return parts;
}

// 6. Parametric Timber Shell Arena (Pavilion, 5,400m²)
export function buildArenaModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  const p0 = new THREE.Mesh(new THREE.BoxGeometry(32, 0.8, 32), materials.concreteMat);
  p0.position.set(0, -0.4, 0);
  parts.push(createPart(p0, 0, 'ar-site', 'Circular Arena Earthwork & Geotechnical Compaction', 'Terrain', '32m dia', 'Stadium ground preparation'));

  const p1 = new THREE.Mesh(new THREE.RingGeometry(10, 14, 24), materials.concreteMat);
  p1.rotation.x = -Math.PI / 2;
  p1.position.set(0, 0.1, 0);
  parts.push(createPart(p1, 1, 'ar-ring', 'Circumferential Concrete Thrust Ring Foundation', 'Foundation', '28m dia ring', 'Resists horizontal arch thrust forces'));

  // P2: Timber Gridshell Arches
  const p2Group = new THREE.Group();
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
    const arch = new THREE.Mesh(new THREE.TorusGeometry(12, 0.4, 8, 24, Math.PI), materials.woodMat);
    arch.rotation.x = Math.PI / 2;
    arch.rotation.y = a;
    arch.position.set(0, 0, 0);
    p2Group.add(arch);
  }
  parts.push(createPart(p2Group, 2, 'ar-glulam', 'Double-Curved Glulam Timber Gridshell Ribs', 'Structure', '24m span x 10m high', 'Continuous glulam arch portal network'));

  const p3 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 0.6, 24), materials.concreteMat);
  p3.position.set(0, 0.3, 0);
  parts.push(createPart(p3, 3, 'ar-bowl', 'Tiered Amphitheater Seating Bowl & Arena Floor', 'Slabs', '20m dia tiered', 'Precast stadium seating tiers'));

  const p4 = new THREE.Mesh(new THREE.CylinderGeometry(13, 13, 5, 24, 1, true), materials.glassMat);
  p4.position.set(0, 3, 0);
  parts.push(createPart(p4, 4, 'ar-skin', 'Perimeter Tensioned ETFE Cushion Facade', 'CurtainWall', '26m dia x 5m', 'Pneumatic insulated ETFE foil pillows'));

  const p5 = new THREE.Mesh(new THREE.BoxGeometry(8, 2, 8), materials.steelBeamMat);
  p5.position.set(0, 1, 0);
  parts.push(createPart(p5, 5, 'ar-podium', 'Arena Stage, Acoustic Shell & Sound Baffles', 'Interior', '8m x 8m', 'Hardwood performance stage and rigging'));

  const p6 = new THREE.Mesh(new THREE.SphereGeometry(13.5, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.8), materials.waterMat);
  p6.position.set(0, 3, 0);
  parts.push(createPart(p6, 6, 'ar-canopy', 'Translucent PTFE Cable-Net Tensile Membrane Roof', 'Roof', '27m dia dome', 'Acoustic tensile membrane with central oculus'));

  const p7 = new THREE.Mesh(new THREE.RingGeometry(14, 17, 24), materials.plasterWhiteMat);
  p7.rotation.x = -Math.PI / 2;
  p7.position.set(0, 0.05, 0);
  parts.push(createPart(p7, 7, 'ar-concourse', 'Concourse Paving, Turnstiles & LED Inground Wayfinding', 'Finishes', '34m dia concourse', 'Pedestrian plaza and security access'));

  return parts;
}

// 7. Desert Rammed-Earth Sanctuary (Residential, 380m²)
export function buildRammedEarthModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // P0: Desert Dune Grading & Caliche Bedrock Anchoring
  const p0Group = new THREE.Group();
  const dune = new THREE.Mesh(new THREE.BoxGeometry(28, 0.6, 22), materials.soilMat);
  dune.position.set(0, -0.3, 0);
  p0Group.add(dune);
  // Boundary survey markers
  const m1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8), materials.steelMat);
  m1.position.set(-13, 0.3, -10);
  const m2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8), materials.steelMat);
  m2.position.set(13, 0.3, 10);
  p0Group.add(m1, m2);
  parts.push(createPart(p0Group, 0, 're-site', 'Desert Dune Grading & Caliche Bedrock Anchoring', 'Terrain', '28m x 22m desert plot', 'Lime-stabilized subgrade'));

  // P1: Insulated Concrete Stem Wall & Slab Trench
  const p1Group = new THREE.Group();
  const stemL = new THREE.Mesh(new THREE.BoxGeometry(22, 1.0, 1.2), materials.concreteMat);
  stemL.position.set(0, 0.3, -7);
  const stemR = new THREE.Mesh(new THREE.BoxGeometry(22, 1.0, 1.2), materials.concreteMat);
  stemR.position.set(0, 0.3, 7);
  const stemW = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 14), materials.concreteMat);
  stemW.position.set(-10.5, 0.3, 0);
  const stemE = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 14), materials.concreteMat);
  stemE.position.set(10.5, 0.3, 0);
  p1Group.add(stemL, stemR, stemW, stemE);
  parts.push(createPart(p1Group, 1, 're-found', 'Insulated Concrete Stem Wall & Slab Trench', 'Foundation', '22m x 15m stem network', 'Thermal break foundation barrier'));

  // P2: 600mm Stabilized Rammed Earth Thermal Mass Walls
  const p2Group = new THREE.Group();
  // Main longitudinal thick earthen walls
  const wallNorth = new THREE.Mesh(new THREE.BoxGeometry(20, 4.5, 0.8), materials.woodMat);
  wallNorth.position.set(0, 2.5, -6.5);
  const wallSouth = new THREE.Mesh(new THREE.BoxGeometry(12, 4.5, 0.8), materials.woodMat);
  wallSouth.position.set(-4, 2.5, 6.5);
  // Cross walls
  const wallWest = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.5, 13.8), materials.woodMat);
  wallWest.position.set(-9.6, 2.5, 0);
  const wallMid = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.5, 8), materials.woodMat);
  wallMid.position.set(2, 2.5, -2.5);
  p2Group.add(wallNorth, wallSouth, wallWest, wallMid);
  // Projecting timber log ceiling vigas through walls
  for (let x = -8; x <= 8; x += 2) {
    const viga = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 15, 8), materials.woodMat);
    viga.rotation.x = Math.PI / 2;
    viga.position.set(x, 4.6, 0);
    p2Group.add(viga);
  }
  parts.push(createPart(p2Group, 2, 're-walls', '600mm Stabilized Rammed Earth Thermal Mass Walls', 'Structure', '20m x 14m x 4.5m', 'Pneumatically compacted desert clay strata'));

  // P3: Polished Colored Ochre Concrete Ground Floor
  const p3Group = new THREE.Group();
  const floorMain = new THREE.Mesh(new THREE.BoxGeometry(19, 0.4, 13), materials.concreteMat);
  floorMain.position.set(0, 0.2, 0);
  // Sunken conversation lounge depression
  const pitFloor = new THREE.Mesh(new THREE.BoxGeometry(5, 0.25, 4), materials.darkConcreteMat);
  pitFloor.position.set(-3, 0.05, 0);
  p3Group.add(floorMain, pitFloor);
  parts.push(createPart(p3Group, 3, 're-floor', 'Polished Colored Ochre Concrete Ground Floor', 'Slabs', '19m x 13m slab', 'Hydronic radiant subfloor cooling grid'));

  // P4: Deep-Set Corten Steel Framed Pocket Glazing
  const p4Group = new THREE.Group();
  const glassSouth = new THREE.Mesh(new THREE.BoxGeometry(7, 3.8, 0.2), materials.glassMat);
  glassSouth.position.set(6, 2.3, 6.5);
  const frameSouth = new THREE.Mesh(new THREE.BoxGeometry(7.2, 4.0, 0.6), materials.steelBeamMat);
  frameSouth.position.set(6, 2.3, 6.5);
  const glassCourt = new THREE.Mesh(new THREE.BoxGeometry(6, 3.8, 0.2), materials.glassMat);
  glassCourt.position.set(2, 2.3, 2.5);
  p4Group.add(glassSouth, frameSouth, glassCourt);
  parts.push(createPart(p4Group, 4, 're-glass', 'Deep-Set Corten Steel Framed Pocket Glazing', 'CurtainWall', '7m x 3.8m corten glazing', 'Low-E solar heat-gain control'));

  // P5: Mesquite Timber Joinery, Built-in Adobe Seating & Hearth
  const p5Group = new THREE.Group();
  const banquette = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.6, 4.2), materials.woodMat);
  banquette.position.set(-3, 0.5, 0);
  const hearth = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4.2, 1.2), materials.steelBeamMat);
  hearth.position.set(-7, 2.3, 0);
  const diningTable = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.8, 1.6), materials.woodMat);
  diningTable.position.set(5, 0.6, -2);
  p5Group.add(banquette, hearth, diningTable);
  parts.push(createPart(p5Group, 5, 're-interior', 'Mesquite Timber Joinery, Built-in Adobe Seating & Hearth', 'Interior', 'Bespoke desert joinery', 'Handcrafted mesquite and adobe banquettes'));

  // P6: Oversailing Cor-Ten Steel Sunshade Parasol Canopy
  const p6Group = new THREE.Group();
  const roofParasol = new THREE.Mesh(new THREE.BoxGeometry(23, 0.5, 17), materials.steelBeamMat);
  roofParasol.position.set(0, 5.0, 0);
  const courtOculus = new THREE.Mesh(new THREE.BoxGeometry(4, 0.6, 3.5), materials.glassMat);
  courtOculus.position.set(2, 5.0, 2);
  p6Group.add(roofParasol, courtOculus);
  parts.push(createPart(p6Group, 6, 're-overhang', 'Oversailing Cor-Ten Steel Sunshade Parasol Canopy', 'Roof', '23m x 17m x 0.5m', '3m perimeter passive solar overhang'));

  // P7: Xeriscape Cactus Garden & Corten Fire Pit Patio
  const p7Group = new THREE.Group();
  const gravelPatio = new THREE.Mesh(new THREE.BoxGeometry(25, 0.2, 20), materials.plasterWhiteMat);
  gravelPatio.position.set(0, 0.05, 0);
  // Saguaro Cacti
  const cactusStem = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 4.5, 12), materials.grassMat);
  cactusStem.position.set(9.5, 2.25, 7.5);
  const cactusArm = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 0.35), materials.grassMat);
  cactusArm.position.set(9.5, 2.8, 7.5);
  const firePit = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.0, 0.5, 16), materials.steelBeamMat);
  firePit.position.set(8, 0.3, -4);
  p7Group.add(gravelPatio, cactusStem, cactusArm, firePit);
  parts.push(createPart(p7Group, 7, 're-xeriscape', 'Xeriscape Cactus Garden & Corten Fire Pit Patio', 'Finishes', 'Desert oasis realm', 'Saguaro, agave, and crushed granite gravel'));

  return parts;
}

// 8. Floating Aquatic Eco-Habitat (Specialty, 850m²)
export function buildFloatingHabitatModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Ocean Water Bed & Seabed Clump Anchors
  const p0Group = new THREE.Group();
  const waterPlane = new THREE.Mesh(new THREE.BoxGeometry(26, 0.4, 26), materials.waterMat);
  waterPlane.position.set(0, 0, 0);
  p0Group.add(waterPlane);
  const anchorL = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 2), materials.darkConcreteMat);
  anchorL.position.set(-8, -1.5, 0);
  const anchorR = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 2), materials.darkConcreteMat);
  anchorR.position.set(8, -1.5, 0);
  p0Group.add(anchorL, anchorR);
  parts.push(createPart(p0Group, 0, 'flot-site', 'Ocean Water Datum & Seabed Mooring Clumps', 'Terrain', '26m x 26m aquatic surface', 'Geodetic marine mooring anchors'));

  // P1: Submerged Twin Buoyancy Pontoons
  const p1Group = new THREE.Group();
  const pontoonL = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 16, 16), materials.steelBeamMat);
  pontoonL.rotation.z = Math.PI / 2;
  pontoonL.position.set(0, -0.6, -5.5);
  const pontoonR = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 16, 16), materials.steelBeamMat);
  pontoonR.rotation.z = Math.PI / 2;
  pontoonR.position.set(0, -0.6, 5.5);
  p1Group.add(pontoonL, pontoonR);
  parts.push(createPart(p1Group, 1, 'flot-pontoons', 'Twin Reinforced Buoyancy Pontoons', 'Foundation', '16m x 2.8m dia pontoons', 'Catamaran marine buoyancy platform'));

  // P2: Stainless Tubular Truss Superstructure
  const p2Group = new THREE.Group();
  const trussL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 8), materials.steelMat);
  trussL.rotation.z = 0.35;
  trussL.position.set(-4, 1.2, -5.5);
  const trussR = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 8), materials.steelMat);
  trussR.rotation.z = -0.35;
  trussR.position.set(4, 1.2, 5.5);
  const ringFrame = new THREE.Mesh(new THREE.TorusGeometry(6, 0.3, 8, 24), materials.steelMat);
  ringFrame.rotation.x = Math.PI / 2;
  ringFrame.position.set(0, 2.2, 0);
  p2Group.add(trussL, trussR, ringFrame);
  parts.push(createPart(p2Group, 2, 'flot-truss', 'Marine-Grade 316 Stainless Tubular Spaceframe', 'Structure', '12m dia frame', 'Wave shear and dynamic tide frame'));

  // P3: Composite Honeycomb Main Deck & Sub-Level
  const p3 = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.5, 0.4, 24), materials.plasterWhiteMat);
  p3.position.set(0, 2.4, 0);
  parts.push(createPart(p3, 3, 'flot-deck', 'Composite Honeycomb Research Platform Deck', 'Slabs', '15m diameter circular deck', 'Fiber-reinforced lightweight deck diaphragm'));

  // P4: Cylindrical Observation Glass Pod
  const p4 = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 6.2, 3.2, 24, 1, true), materials.glassMat);
  p4.position.set(0, 4.1, 0);
  parts.push(createPart(p4, 4, 'flot-glass', 'Panoramic 360° Saltwater-Treated Acrylic Glazing', 'CurtainWall', '12.4m dia x 3.2m', 'Continuous marine view thermal envelope'));

  // P5: Marine Biology Laboratory & Living Pod
  const p5Group = new THREE.Group();
  const labCore = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 2.8, 16), materials.interiorDarkWallMat);
  labCore.position.set(0, 3.9, 0);
  const bench = new THREE.Mesh(new THREE.BoxGeometry(4, 0.8, 1.5), materials.woodMat);
  bench.position.set(0, 2.8, 2);
  p5Group.add(labCore, bench);
  parts.push(createPart(p5Group, 5, 'flot-lab', 'Marine Biology Lab, Desalination Core & Berths', 'Interior', '7m central core', 'Acoustic crew quarters and wet laboratory'));

  // P6: Geodesic Observation Dome & Solar Ring
  const p6Group = new THREE.Group();
  const dome = new THREE.Mesh(new THREE.SphereGeometry(5.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), materials.steelMat);
  dome.position.set(0, 5.7, 0);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3, 8), materials.steelBeamMat);
  mast.position.set(0, 9.5, 0);
  const solarRim = new THREE.Mesh(new THREE.RingGeometry(5.2, 6.5, 24), materials.solarPanelMat);
  solarRim.rotation.x = -Math.PI / 2;
  solarRim.position.set(0, 5.75, 0);
  p6Group.add(dome, mast, solarRim);
  parts.push(createPart(p6Group, 6, 'flot-dome', 'Upper Geodesic Skylight Dome, Solar Ring & Antenna', 'Roof', '13m dia canopy', 'Solar generation ring and weather radome'));

  // P7: Finger Piers, Mooring Cleats & Wave Damping
  const p7Group = new THREE.Group();
  const pier = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.25, 8), materials.woodMat);
  pier.position.set(0, 0.25, 9);
  const floatRing = new THREE.Mesh(new THREE.TorusGeometry(10, 0.35, 8, 32), materials.darkConcreteMat);
  floatRing.rotation.x = Math.PI / 2;
  floatRing.position.set(0, 0.1, 0);
  p7Group.add(pier, floatRing);
  parts.push(createPart(p7Group, 7, 'flot-piers', 'Floating Timber Dock, Wave Dissipators & Nav LEDs', 'Finishes', 'Perimeter marine realm', 'Boat slipways and perimeter breakwater'));

  return parts;
}

// 9. Japanese Origami Zen House (Residential, 140m²)
export function buildOrigamiZenHouseModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Gravel Garden Bed
  const p0 = new THREE.Mesh(new THREE.BoxGeometry(20, 0.5, 18), materials.concreteMat);
  p0.position.set(0, -0.25, 0);
  parts.push(createPart(p0, 0, 'ori-site', 'Raked Karesansui Zen Gravel Bed & Contouring', 'Terrain', '20m x 18m', 'Stabilized gravel garden datum'));

  // P1: Granite Pad Footings
  const p1Group = new THREE.Group();
  for (let x = -5; x <= 5; x += 5) {
    for (let z = -4; z <= 4; z += 4) {
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.6, 8), materials.darkConcreteMat);
      pad.position.set(x, 0.3, z);
      p1Group.add(pad);
    }
  }
  parts.push(createPart(p1Group, 1, 'ori-footings', 'Discrete Granite Pad Stones & Stilt Footings', 'Foundation', '9 foundation stumps', 'Seismic decoupling pad foundation'));

  // P2: Hinoki Timber Framework
  const p2Group = new THREE.Group();
  for (let x = -5; x <= 5; x += 5) {
    for (let z = -4; z <= 4; z += 4) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.5, 0.3), materials.woodMat);
      col.position.set(x, 2.2, z);
      p2Group.add(col);
    }
  }
  const beam1 = new THREE.Mesh(new THREE.BoxGeometry(11, 0.35, 0.3), materials.woodMat);
  beam1.position.set(0, 3.8, -4);
  const beam2 = new THREE.Mesh(new THREE.BoxGeometry(11, 0.35, 0.3), materials.woodMat);
  beam2.position.set(0, 3.8, 4);
  p2Group.add(beam1, beam2);
  parts.push(createPart(p2Group, 2, 'ori-frame', 'Traditional Hinoki Post-and-Beam Mortise Frame', 'Structure', '11m x 9m x 3.5m', 'Traditional Japanese timber carpentry'));

  // P3: Engawa Perimeter Deck & Tatami Floor
  const p3 = new THREE.Mesh(new THREE.BoxGeometry(13, 0.3, 10.5), materials.woodMat);
  p3.position.set(0, 0.65, 0);
  parts.push(createPart(p3, 3, 'ori-engawa', 'Raised Cedar Engawa Veranda & Tatami Subfloor', 'Slabs', '13m x 10.5m deck', 'Cantilevered wraparound timber porch'));

  // P4: Shoji Sliding Screens & Yakisugi Louvers
  const p4Group = new THREE.Group();
  const screenF = new THREE.Mesh(new THREE.BoxGeometry(9.5, 2.8, 0.1), materials.glassMat);
  screenF.position.set(0, 2.2, 3.8);
  const screenB = new THREE.Mesh(new THREE.BoxGeometry(9.5, 2.8, 0.1), materials.glassMat);
  screenB.position.set(0, 2.2, -3.8);
  p4Group.add(screenF, screenB);
  parts.push(createPart(p4Group, 4, 'ori-screens', 'Translucent Shoji Screen Wall & Yakisugi Slats', 'CurtainWall', '9.5m x 2.8m screens', 'Charred cedar louvers and paper glass'));

  // P5: Tatami Mats & Cedar Joinery
  const p5 = new THREE.Mesh(new THREE.BoxGeometry(8, 0.15, 6), materials.woodMat);
  p5.position.set(0, 0.85, 0);
  parts.push(createPart(p5, 5, 'ori-interior', 'Rush-Grass Tatami Flooring, Tokonoma & Hearth', 'Interior', '8m x 6m sanctuary', 'Minimalist tea room and alcove'));

  // P6: Asymmetrical Folded Origami Roof
  const p6Group = new THREE.Group();
  const r1 = new THREE.Mesh(new THREE.BoxGeometry(14, 0.25, 7), materials.steelBeamMat);
  r1.rotation.set(0.2, 0.1, -0.15);
  r1.position.set(-1, 4.8, -2);
  const r2 = new THREE.Mesh(new THREE.BoxGeometry(14, 0.25, 7), materials.steelBeamMat);
  r2.rotation.set(-0.25, -0.1, 0.2);
  r2.position.set(1, 4.9, 2);
  p6Group.add(r1, r2);
  parts.push(createPart(p6Group, 6, 'ori-roof', 'Faceted Dark Zinc Origami Folded Roof Planes', 'Roof', '15m x 12m folded roof', 'Angular folded zinc standing seam eaves'));

  // P7: Bonsai, Tsukubai Water Stone & Stepping Stones
  const p7Group = new THREE.Group();
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.5, 0.6, 12), materials.darkConcreteMat);
  basin.position.set(5.5, 0.3, 4.5);
  const treeTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 2.5, 8), materials.woodMat);
  treeTrunk.position.set(-6, 1.25, 4.5);
  const foliage = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), materials.grassMat);
  foliage.position.set(-6, 2.6, 4.5);
  p7Group.add(basin, treeTrunk, foliage);
  parts.push(createPart(p7Group, 7, 'ori-garden', 'Tsukubai Water Basin, Japanese Maple & Rocks', 'Finishes', 'Zen courtyard realm', 'Artisanal stone basin and specimen tree'));

  return parts;
}

// 10. Biophilic Vertical Forest Tower (Commercial, 8,600m²)
export function buildVerticalForestModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Deep Urban Secant Pile Excavation
  const p0Group = new THREE.Group();
  const pit = new THREE.Mesh(new THREE.BoxGeometry(26, 1.0, 26), materials.darkConcreteMat);
  pit.position.set(0, -0.5, 0);
  const wallN = new THREE.Mesh(new THREE.BoxGeometry(26, 1.8, 0.6), materials.concreteMat);
  wallN.position.set(0, 0.4, -13);
  const wallS = new THREE.Mesh(new THREE.BoxGeometry(26, 1.8, 0.6), materials.concreteMat);
  wallS.position.set(0, 0.4, 13);
  const wallE = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.8, 26), materials.concreteMat);
  wallE.position.set(13, 0.4, 0);
  const wallW = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.8, 26), materials.concreteMat);
  wallW.position.set(-13, 0.4, 0);
  p0Group.add(pit, wallN, wallS, wallE, wallW);
  parts.push(createPart(p0Group, 0, 'vf-site', 'Urban Secant Pile Excavation & Bedrock Datum', 'Terrain', '26m x 26m caisson cut', 'Subterranean urban foundation retaining perimeter'));

  // P1: Heavy Reinforced Basement Raft Slab
  const p1Group = new THREE.Group();
  const raft = new THREE.Mesh(new THREE.BoxGeometry(20, 1.4, 20), materials.darkConcreteMat);
  raft.position.set(0, 0.4, 0);
  for (let x = -7; x <= 7; x += 7) {
    for (let z = -7; z <= 7; z += 7) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 1.6), materials.concreteMat);
      pad.position.set(x, 1.2, z);
      p1Group.add(pad);
    }
  }
  p1Group.add(raft);
  parts.push(createPart(p1Group, 1, 'vf-found', 'Heavy Reinforced Basement Raft Slab', 'Foundation', '20m x 20m x 1.4m', 'High-strength shear basement raft foundation'));

  // P2: Tower Structural Skeleton — Slipform Core & 16 Perimeter Columns
  const p2Group = new THREE.Group();
  const core = new THREE.Mesh(new THREE.BoxGeometry(6.5, 28, 6.5), materials.concreteMat);
  core.position.set(0, 14, 0);
  p2Group.add(core);
  const colCoords: [number, number][] = [
    [-6.5, -6.5], [-2.2, -6.5], [2.2, -6.5], [6.5, -6.5],
    [-6.5, 6.5],  [-2.2, 6.5],  [2.2, 6.5],  [6.5, 6.5],
    [-6.5, -2.2], [-6.5, 2.2],  [6.5, -2.2], [6.5, 2.2]
  ];
  colCoords.forEach(([cx, cz]) => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.5, 28, 0.5), materials.steelBeamMat);
    col.position.set(cx, 14, cz);
    p2Group.add(col);
  });
  const piloti1 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 5.0, 12), materials.concreteMat);
  piloti1.position.set(-6.5, 2.5, 8.5);
  const piloti2 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 5.0, 12), materials.concreteMat);
  piloti2.position.set(6.5, 2.5, 8.5);
  p2Group.add(piloti1, piloti2);
  parts.push(createPart(p2Group, 2, 'vf-core', 'Slipformed Elevator Core & 16 Perimeter Columns', 'Structure', '14m x 14m x 28m skeleton', 'Central vertical shear backbone & column matrix'));

  // P3: Multi-Level Slabs & Cantilevered Balcony Planter Trays
  const p3Group = new THREE.Group();
  for (let f = 1; f <= 8; f++) {
    const y = f * 3.2;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(13.2, 0.35, 13.2), materials.concreteMat);
    slab.position.set(0, y, 0);
    p3Group.add(slab);

    if (f >= 2) {
      const isOdd = f % 2 === 1;
      const balc1 = new THREE.Mesh(new THREE.BoxGeometry(isOdd ? 11.0 : 4.5, 0.3, isOdd ? 4.5 : 11.0), materials.concreteMat);
      balc1.position.set(isOdd ? 0 : 7.2, y, isOdd ? 7.2 : 0);
      const rim1 = new THREE.Mesh(new THREE.BoxGeometry(isOdd ? 11.2 : 4.7, 0.85, isOdd ? 4.7 : 11.2), materials.darkConcreteMat);
      rim1.position.set(isOdd ? 0 : 7.2, y + 0.35, isOdd ? 7.2 : 0);
      const soil1 = new THREE.Mesh(new THREE.BoxGeometry(isOdd ? 10.4 : 3.9, 0.2, isOdd ? 3.9 : 10.4), materials.soilMat);
      soil1.position.set(isOdd ? 0 : 7.2, y + 0.45, isOdd ? 7.2 : 0);
      const soffit1 = new THREE.Mesh(new THREE.BoxGeometry(isOdd ? 10.8 : 4.3, 0.08, isOdd ? 4.3 : 10.8), materials.woodMat);
      soffit1.position.set(isOdd ? 0 : 7.2, y - 0.18, isOdd ? 7.2 : 0);

      const balc2 = new THREE.Mesh(new THREE.BoxGeometry(isOdd ? 11.0 : 4.5, 0.3, isOdd ? 4.5 : 11.0), materials.concreteMat);
      balc2.position.set(isOdd ? 0 : -7.2, y, isOdd ? -7.2 : 0);
      const rim2 = new THREE.Mesh(new THREE.BoxGeometry(isOdd ? 11.2 : 4.7, 0.85, isOdd ? 4.7 : 11.2), materials.darkConcreteMat);
      rim2.position.set(isOdd ? 0 : -7.2, y + 0.35, isOdd ? -7.2 : 0);
      const soil2 = new THREE.Mesh(new THREE.BoxGeometry(isOdd ? 10.4 : 3.9, 0.2, isOdd ? 3.9 : 10.4), materials.soilMat);
      soil2.position.set(isOdd ? 0 : -7.2, y + 0.45, isOdd ? -7.2 : 0);
      const soffit2 = new THREE.Mesh(new THREE.BoxGeometry(isOdd ? 10.8 : 4.3, 0.08, isOdd ? 4.3 : 10.8), materials.woodMat);
      soffit2.position.set(isOdd ? 0 : -7.2, y - 0.18, isOdd ? -7.2 : 0);

      p3Group.add(balc1, rim1, soil1, soffit1, balc2, rim2, soil2, soffit2);
    }
  }
  parts.push(createPart(p3Group, 3, 'vf-balconies', 'Cantilevered Soil Planter Terraces (8 Tiers)', 'Slabs', '14m x 4.5m cantilever trays', 'Heavy soil-bearing cantilevered slabs & parapets'));

  // P4: Double-Skin High-Performance Glazing & Bronze Mullions
  const p4Group = new THREE.Group();
  for (let f = 1; f <= 8; f++) {
    const y = f * 3.2 - 1.4;
    const glassFloor = new THREE.Mesh(new THREE.BoxGeometry(12.8, 2.7, 12.8), materials.glassMat);
    glassFloor.position.set(0, y, 0);
    const spandrelBand = new THREE.Mesh(new THREE.BoxGeometry(13.0, 0.4, 13.0), materials.steelBeamMat);
    spandrelBand.position.set(0, y + 1.4, 0);
    p4Group.add(glassFloor, spandrelBand);
  }
  const lobbyGlass = new THREE.Mesh(new THREE.BoxGeometry(13.6, 3.0, 13.6), materials.glassMat);
  lobbyGlass.position.set(0, 1.5, 0);
  p4Group.add(lobbyGlass);
  parts.push(createPart(p4Group, 4, 'vf-facade', 'Unitized Floor-to-Ceiling Low-E Curtain Wall', 'CurtainWall', '13m x 13m x 26m envelope', 'Thermally-broken highrise glazed skin & mullions'));

  // P5: Biophilic Interior Architecture & Irrigation Risers
  const p5Group = new THREE.Group();
  for (let f = 1; f <= 8; f++) {
    const y = f * 3.2 - 1.4;
    const woodFloor = new THREE.Mesh(new THREE.BoxGeometry(12.2, 0.08, 12.2), materials.woodMat);
    woodFloor.position.set(0, y - 1.3, 0);
    const partition = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.4, 0.15), materials.woodMat);
    partition.position.set(2.5, y, 0);
    p5Group.add(woodFloor, partition);
  }
  const riser1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 26, 8), materials.rebarMat);
  riser1.position.set(3.4, 13, 3.4);
  const riser2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 26, 8), materials.steelMat);
  riser2.position.set(-3.4, 13, 3.4);
  p5Group.add(riser1, riser2);
  parts.push(createPart(p5Group, 5, 'vf-interior', 'Mass Timber Floors, Dividers & Irrigation Risers', 'Interior', '12m x 12m floors', 'Mass timber ceilings, acoustic baffles & automated risers'));

  // P6: Rooftop Sky Forest Penthouse, Solar Pergola & Trellis
  const p6Group = new THREE.Group();
  const roofDeck = new THREE.Mesh(new THREE.BoxGeometry(14.0, 0.6, 14.0), materials.woodMat);
  roofDeck.position.set(0, 26.2, 0);
  const penthouse = new THREE.Mesh(new THREE.BoxGeometry(7.0, 3.0, 7.0), materials.concreteMat);
  penthouse.position.set(0, 27.8, 0);
  const pergolaBeam1 = new THREE.Mesh(new THREE.BoxGeometry(13.0, 0.3, 0.3), materials.steelBeamMat);
  pergolaBeam1.position.set(0, 30.0, -4.5);
  const pergolaBeam2 = new THREE.Mesh(new THREE.BoxGeometry(13.0, 0.3, 0.3), materials.steelBeamMat);
  pergolaBeam2.position.set(0, 30.0, 0);
  const pergolaBeam3 = new THREE.Mesh(new THREE.BoxGeometry(13.0, 0.3, 0.3), materials.steelBeamMat);
  pergolaBeam3.position.set(0, 30.0, 4.5);
  const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.1, 10.0), materials.solarPanelMat);
  solarPanel.position.set(0, 30.2, 0);
  p6Group.add(roofDeck, penthouse, pergolaBeam1, pergolaBeam2, pergolaBeam3, solarPanel);
  parts.push(createPart(p6Group, 6, 'vf-roof', 'Sky Forest Penthouse, Solar Pergola & Trellis', 'Roof', '14m x 14m sky canopy', 'Rooftop botanical sky lounge & solar array'));

  // P7: Cascading 3D Forest — Trees, Shrubs, Hanging Vines & Urban Plaza
  const p7Group = new THREE.Group();
  for (let f = 2; f <= 8; f++) {
    const y = f * 3.2;
    const isOdd = f % 2 === 1;

    const addTree = (tx: number, tz: number, height: number, crownRadius: number) => {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, height, 8), materials.woodMat);
      trunk.position.set(tx, y + 0.45 + height / 2, tz);
      const crownMain = new THREE.Mesh(new THREE.SphereGeometry(crownRadius, 8, 8), materials.grassMat);
      crownMain.position.set(tx, y + 0.45 + height, tz);
      const crownTop = new THREE.Mesh(new THREE.SphereGeometry(crownRadius * 0.7, 6, 6), materials.grassMat);
      crownTop.position.set(tx, y + 0.45 + height + crownRadius * 0.5, tz);
      p7Group.add(trunk, crownMain, crownTop);
    };

    const addShrub = (sx: number, sz: number, rad: number) => {
      const shrub = new THREE.Mesh(new THREE.SphereGeometry(rad, 6, 6), materials.grassMat);
      shrub.position.set(sx, y + 0.55 + rad / 2, sz);
      p7Group.add(shrub);
    };

    const addTrailingVines = (vx: number, vz: number, length: number) => {
      const vine = new THREE.Mesh(new THREE.BoxGeometry(0.8, length, 0.18), materials.grassMat);
      vine.position.set(vx, y + 0.2 - length / 2, vz);
      p7Group.add(vine);
    };

    if (isOdd) {
      addTree(-3.2, 7.2, 1.8, 1.1);
      addTree(3.2, 7.2, 1.6, 0.95);
      addShrub(0, 7.2, 0.6);
      addTrailingVines(-2.0, 9.4, 1.2);
      addTrailingVines(2.0, 9.4, 1.5);

      addTree(-3.2, -7.2, 1.7, 1.0);
      addTree(3.2, -7.2, 1.9, 1.15);
      addShrub(0, -7.2, 0.55);
      addTrailingVines(-1.5, -9.4, 1.3);
      addTrailingVines(1.8, -9.4, 1.1);
    } else {
      addTree(7.2, -3.2, 1.8, 1.1);
      addTree(7.2, 3.2, 1.6, 0.95);
      addShrub(7.2, 0, 0.6);
      addTrailingVines(9.4, -2.0, 1.4);
      addTrailingVines(9.4, 2.0, 1.2);

      addTree(-7.2, -3.2, 1.7, 1.0);
      addTree(-7.2, 3.2, 1.9, 1.15);
      addShrub(-7.2, 0, 0.55);
      addTrailingVines(-9.4, -1.5, 1.1);
      addTrailingVines(-9.4, 1.8, 1.4);
    }
  }

  const plaza = new THREE.Mesh(new THREE.BoxGeometry(26, 0.25, 26), materials.plasterWhiteMat);
  plaza.position.set(0, 0.1, 0);
  const poolBasin = new THREE.Mesh(new THREE.BoxGeometry(8, 0.15, 6), materials.poolTileMat);
  poolBasin.position.set(0, 0.15, 9.5);
  const waterSurface = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.05, 5.6), materials.waterMat);
  waterSurface.position.set(0, 0.22, 9.5);
  const plazaTreeL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 2.4, 8), materials.woodMat);
  plazaTreeL.position.set(-8.5, 1.3, 9.5);
  const crownPL = new THREE.Mesh(new THREE.SphereGeometry(1.4, 8, 8), materials.grassMat);
  crownPL.position.set(-8.5, 2.8, 9.5);
  const plazaTreeR = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 2.4, 8), materials.woodMat);
  plazaTreeR.position.set(8.5, 1.3, 9.5);
  const crownPR = new THREE.Mesh(new THREE.SphereGeometry(1.4, 8, 8), materials.grassMat);
  crownPR.position.set(8.5, 2.8, 9.5);

  p7Group.add(plaza, poolBasin, waterSurface, plazaTreeL, crownPL, plazaTreeR, crownPR);
  parts.push(createPart(p7Group, 7, 'vf-plants', '800+ Cascading Trees, Hanging Vines & Civic Plaza', 'Finishes', 'Perimeter living flora & reflecting pool', 'Biophilic vertical biodiversity system'));

  return parts;
}

// 11. Subterranean Geothermal Vault (Residential, 520m²)
export function buildGeothermalVaultModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Earth Berm Trench Excavation & Bedrock Datum
  const p0Group = new THREE.Group();
  const terrain = new THREE.Mesh(new THREE.BoxGeometry(26, 0.8, 22), materials.soilMat);
  terrain.position.set(0, -0.4, 0);
  const pitFloor = new THREE.Mesh(new THREE.BoxGeometry(19, 0.4, 15), materials.darkConcreteMat);
  pitFloor.position.set(0, -0.2, 0);
  const shoringL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 15), materials.woodMat);
  shoringL.position.set(-9.5, 0.2, 0);
  const shoringR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 15), materials.woodMat);
  shoringR.position.set(9.5, 0.2, 0);
  const shoringB = new THREE.Mesh(new THREE.BoxGeometry(19, 1.2, 0.3), materials.woodMat);
  shoringB.position.set(0, 0.2, -7.5);
  p0Group.add(terrain, pitFloor, shoringL, shoringR, shoringB);
  parts.push(createPart(p0Group, 0, 'geo-site', 'Earth Berm Trench Excavation & Shoring', 'Terrain', '26m x 22m x 2m trench', 'Engineered thermal mass soil excavation cut'));

  // P1: Concrete Foundation Bunker Raft & Waterproof Tanking
  const p1Group = new THREE.Group();
  const bunkerRaft = new THREE.Mesh(new THREE.BoxGeometry(18, 1.0, 14), materials.darkConcreteMat);
  bunkerRaft.position.set(0, 0.3, 0);
  const membrane = new THREE.Mesh(new THREE.BoxGeometry(18.4, 0.2, 14.4), materials.foilWaterproofingMat);
  membrane.position.set(0, 0.85, 0);
  const wallF = new THREE.Mesh(new THREE.BoxGeometry(17.6, 0.6, 0.6), materials.concreteMat);
  wallF.position.set(0, 1.0, 6.7);
  p1Group.add(bunkerRaft, membrane, wallF);
  parts.push(createPart(p1Group, 1, 'geo-found', 'Waterproofed Concrete Foundation Bunker Raft', 'Foundation', '18m x 14m x 1.0m', 'Tanked subterranean structural bunker raft'));

  // P2: Architectural Reinforced Concrete Ribbed Vault Shell
  const p2Group = new THREE.Group();
  for (let z = -5.5; z <= 5.5; z += 2.75) {
    const archRib = new THREE.Mesh(new THREE.CylinderGeometry(6.5, 6.5, 0.6, 32, 1, true, 0, Math.PI), materials.concreteMat);
    archRib.rotation.z = Math.PI / 2;
    archRib.position.set(0, 1.2, z);
    p2Group.add(archRib);
  }
  const crownSpine = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 13.5), materials.darkConcreteMat);
  crownSpine.position.set(0, 7.8, 0);
  const spandrelL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 13.5), materials.darkConcreteMat);
  spandrelL.position.set(-6.5, 1.5, 0);
  const spandrelR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 13.5), materials.darkConcreteMat);
  spandrelR.position.set(6.5, 1.5, 0);
  const rearBulkhead = new THREE.Mesh(new THREE.CylinderGeometry(6.6, 6.6, 0.8, 32, 1, false, 0, Math.PI), materials.concreteMat);
  rearBulkhead.rotation.z = Math.PI / 2;
  rearBulkhead.position.set(0, 1.2, -6.6);
  const frontPortalL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4.5, 0.8), materials.concreteMat);
  frontPortalL.position.set(-5.8, 3.25, 6.6);
  const frontPortalR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4.5, 0.8), materials.concreteMat);
  frontPortalR.position.set(5.8, 3.25, 6.6);
  const frontHeader = new THREE.Mesh(new THREE.BoxGeometry(13.2, 1.2, 0.8), materials.concreteMat);
  frontHeader.position.set(0, 6.0, 6.6);
  p2Group.add(crownSpine, spandrelL, spandrelR, rearBulkhead, frontPortalL, frontPortalR, frontHeader);
  parts.push(createPart(p2Group, 2, 'geo-arch', 'Monolithic Ribbed Concrete Vault Shell & Bulkheads', 'Structure', '13.5m length x 13m span arch', 'Primary structural arched thermal mass shell'));

  // P3: Radiant Concrete Floor & Sunken Walk-Out Courtyard
  const p3Group = new THREE.Group();
  const radiantFloor = new THREE.Mesh(new THREE.BoxGeometry(13, 0.35, 12), materials.concreteMat);
  radiantFloor.position.set(0, 1.0, 0);
  const terracePavers = new THREE.Mesh(new THREE.BoxGeometry(12, 0.25, 4.5), materials.darkConcreteMat);
  terracePavers.position.set(0, 0.95, 8.8);
  for (let s = 0; s < 4; s++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.2, 0.6), materials.concreteMat);
    step.position.set(7.5, 0.95 + s * 0.25, 8.0 + s * 0.6);
    p3Group.add(step);
  }
  p3Group.add(radiantFloor, terracePavers);
  parts.push(createPart(p3Group, 3, 'geo-floor', 'Polished Concrete Floor Slab & Sunken Courtyard', 'Slabs', '13m x 12m slab + courtyard', 'Radiant floor heating diaphragm & walk-out patio'));

  // P4: Full-Height Glazed Facade & Entrance Lightwell
  const p4Group = new THREE.Group();
  const frontGlazing = new THREE.Mesh(new THREE.BoxGeometry(10, 4.5, 0.2), materials.glassMat);
  frontGlazing.position.set(0, 3.25, 6.5);
  const mullionL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.5, 0.3), materials.steelBeamMat);
  mullionL.position.set(-2.5, 3.25, 6.5);
  const mullionR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.5, 0.3), materials.steelBeamMat);
  mullionR.position.set(2.5, 3.25, 6.5);
  const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 0.25), materials.woodMat);
  doorFrame.position.set(0, 2.3, 6.55);
  const balustrade = new THREE.Mesh(new THREE.BoxGeometry(12.4, 1.0, 0.08), materials.glassMat);
  balustrade.position.set(0, 2.0, 11.1);
  p4Group.add(frontGlazing, mullionL, mullionR, doorFrame, balustrade);
  parts.push(createPart(p4Group, 4, 'geo-lightwell', 'Sunken Lightwell Curtain Wall & Glazed Portal', 'CurtainWall', '10m x 4.5m triple glazing', 'Solar daylighting penetration & thermal break entrance'));

  // P5: Interior Thermal Mass Core & Geothermal Plant Room
  const p5Group = new THREE.Group();
  const birchWall = new THREE.Mesh(new THREE.BoxGeometry(7, 3.2, 0.3), materials.woodMat);
  birchWall.position.set(0, 2.6, 0);
  const hearth = new THREE.Mesh(new THREE.BoxGeometry(2.2, 4.5, 2.2), materials.darkConcreteMat);
  hearth.position.set(-3.5, 3.25, -2);
  const heatPump = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.2, 1.4), materials.steelMat);
  heatPump.position.set(3.5, 2.1, -4.5);
  const manifoldPipe1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.8), materials.rebarMat);
  manifoldPipe1.position.set(2.8, 1.9, -4.5);
  const manifoldPipe2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.8), materials.steelBeamMat);
  manifoldPipe2.position.set(4.2, 1.9, -4.5);
  const table = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.15, 1.4), materials.woodMat);
  table.position.set(0, 1.7, 3.0);
  p5Group.add(birchWall, hearth, heatPump, manifoldPipe1, manifoldPipe2, table);
  parts.push(createPart(p5Group, 5, 'geo-interior', 'Interior Birch Joinery, Hearth & Heat Pump Core', 'Interior', '10m x 8m core', 'Living quarters and geothermal plant room'));

  // P6: Natural Sloping Earth Berms, Green Roof & Skylight Oculus Lantern
  const p6Group = new THREE.Group();
  const bermLeft = new THREE.Mesh(new THREE.BoxGeometry(5.5, 3.8, 16), materials.grassMat);
  bermLeft.position.set(-8.8, 2.7, 0);
  bermLeft.rotation.z = -Math.PI / 10;
  const bermRight = new THREE.Mesh(new THREE.BoxGeometry(5.5, 3.8, 16), materials.grassMat);
  bermRight.position.set(8.8, 2.7, 0);
  bermRight.rotation.z = Math.PI / 10;
  const bermRear = new THREE.Mesh(new THREE.BoxGeometry(14, 4.5, 4.5), materials.grassMat);
  bermRear.position.set(0, 3.2, -8.5);
  bermRear.rotation.x = Math.PI / 10;
  const vaultTurfCap = new THREE.Mesh(new THREE.CylinderGeometry(7.2, 7.2, 13.6, 24, 1, false, 0.25 * Math.PI, 0.5 * Math.PI), materials.grassMat);
  vaultTurfCap.rotation.z = Math.PI / 2;
  vaultTurfCap.position.set(0, 1.3, 0);
  const lanternBox = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.6, 4.0), materials.steelBeamMat);
  lanternBox.position.set(0, 8.5, 0);
  const lanternGlass = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 0.2), materials.glassMat);
  lanternGlass.position.set(0, 8.5, 2.05);
  const skylightTop = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.2, 3.8), materials.glassMat);
  skylightTop.position.set(0, 9.35, 0);
  p6Group.add(bermLeft, bermRight, bermRear, vaultTurfCap, lanternBox, lanternGlass, skylightTop);
  parts.push(createPart(p6Group, 6, 'geo-turf', 'Sloped Living Earth Berms & Clerestory Lantern', 'Roof', 'Reinforced turf berms & zinc lantern', 'Passive thermal stabilization & solar daylighting'));

  // P7: Deep Geothermal Borehole Field & Perimeter Native Meadow
  const p7Group = new THREE.Group();
  const redBorehole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 8.0, 8), materials.rebarMat);
  redBorehole1.position.set(-4.5, -4.0, -2.5);
  const redBorehole2 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 8.0, 8), materials.rebarMat);
  redBorehole2.position.set(-4.0, -4.0, -2.5);
  const redLoopBottom = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 0.18), materials.rebarMat);
  redLoopBottom.position.set(-4.25, -7.95, -2.5);
  const blueBorehole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 8.0, 8), materials.steelBeamMat);
  blueBorehole1.position.set(4.0, -4.0, -2.5);
  const blueBorehole2 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 8.0, 8), materials.steelBeamMat);
  blueBorehole2.position.set(4.5, -4.0, -2.5);
  const blueLoopBottom = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 0.18), materials.steelBeamMat);
  blueLoopBottom.position.set(4.25, -7.95, -2.5);
  const flagstonePath = new THREE.Mesh(new THREE.BoxGeometry(24, 0.15, 20), materials.plasterWhiteMat);
  flagstonePath.position.set(0, 0.05, 0);
  for (let b = 0; b < 6; b++) {
    const shrub = new THREE.Mesh(new THREE.SphereGeometry(0.55, 6, 6), materials.grassMat);
    shrub.position.set(b % 2 === 0 ? -10.5 : 10.5, 2.2, -4 + b * 2);
    p7Group.add(shrub);
  }
  p7Group.add(redBorehole1, redBorehole2, redLoopBottom, blueBorehole1, blueBorehole2, blueLoopBottom, flagstonePath);
  parts.push(createPart(p7Group, 7, 'geo-boreholes', 'Subterranean Geothermal U-Loop Field & Meadow', 'Finishes', '8m deep vertical closed loops', 'Ground-source geothermal energy extraction'));

  return parts;
}

// 12. Curvilinear Hilltop Observatory (Specialty, 1,150m²)
export function buildObservatoryModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Hilltop Bedrock Drilling & Excavation
  const p0 = new THREE.Mesh(new THREE.CylinderGeometry(11, 13, 1.2, 24), materials.darkConcreteMat);
  p0.position.set(0, -0.6, 0);
  parts.push(createPart(p0, 0, 'obs-site', 'Mountain Ridge Bedrock Cut & Anchor Drilling', 'Terrain', '24m diameter cut', 'Vibration-free bedrock foundation platform'));

  // P1: Vibration-Isolated Concrete Telescope Pier
  const p1 = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 4.5, 2.5, 16), materials.concreteMat);
  p1.position.set(0, 0.8, 0);
  parts.push(createPart(p1, 1, 'obs-found', 'Vibration-Isolated Concrete Central Telescope Pier', 'Foundation', '4.5m dia massive pier', 'Independent foundation for optical telescope'));

  // P2: Cylindrical Rotunda Masonry Drum
  const p2 = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 5, 24, 1, true), materials.concreteMat);
  p2.position.set(0, 4.2, 0);
  parts.push(createPart(p2, 2, 'obs-drum', 'Heavy Masonry & Steel Cylindrical Rotunda Drum', 'Structure', '16m dia x 5m high', 'Load-bearing dome track and rotation base'));

  // P3: Observation Floor & Catwalk
  const p3 = new THREE.Mesh(new THREE.CylinderGeometry(7.8, 7.8, 0.4, 24), materials.steelBeamMat);
  p3.position.set(0, 6.5, 0);
  parts.push(createPart(p3, 3, 'obs-deck', 'Suspended Observation Floor & Azimuth Catwalk', 'Slabs', '15.6m dia deck', 'Astronomer viewing platform and ring'));

  // P4: Aerodynamic Double-Wall Thermal Envelope
  const p4 = new THREE.Mesh(new THREE.CylinderGeometry(8.2, 8.2, 4.8, 24, 1, true), materials.steelMat);
  p4.position.set(0, 4.2, 0);
  parts.push(createPart(p4, 4, 'obs-cladding', 'Insulated Double-Skin Aluminum Cladding Shell', 'CurtainWall', '16.4m dia outer skin', 'Thermal equilibrium cladding to stop air turbulence'));

  // P5: Control Room & Scientific Console Enclosure
  const p5 = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 6), materials.interiorDarkWallMat);
  p5.position.set(0, 3.2, 0);
  parts.push(createPart(p5, 5, 'obs-control', 'Climate-Controlled Spectrometer & Control Room', 'Interior', '6m x 6m core', 'Scientific data processing and server racks'));

  // P6: 360° Rotating Dome with Optical Telescope
  const p6Group = new THREE.Group();
  const dome = new THREE.Mesh(new THREE.SphereGeometry(8, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), materials.steelMat);
  dome.position.set(0, 6.7, 0);
  const telescope = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 7, 16), materials.steelBeamMat);
  telescope.rotation.x = 0.6;
  telescope.position.set(0, 10, 1.5);
  p6Group.add(dome, telescope);
  parts.push(createPart(p6Group, 6, 'obs-dome', 'Rotating Carbon Dome with Optical Viewing Shutter', 'Roof', '16m dia dome & telescope', 'Motorized azimuth dome and Ritchey-Chrétien scope'));

  // P7: Night Starlight Pathway & Meteorological Mast
  const p7Group = new THREE.Group();
  const terrace = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 0.2, 24), materials.plasterWhiteMat);
  terrace.position.set(0, 0.1, 0);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 6, 8), materials.steelBeamMat);
  mast.position.set(9, 3, 0);
  p7Group.add(terrace, mast);
  parts.push(createPart(p7Group, 7, 'obs-pathway', 'Red-Light Starlight Safe Pathway & Weather Mast', 'Finishes', 'Perimeter terrace', 'Dark-sky compliant night lighting and anemometer'));

  return parts;
}

// 13. Industrial Brick & Truss Loft (Commercial, 1,800m²)
export function buildIndustrialLoftModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Brownfield Excavation
  const p0 = new THREE.Mesh(new THREE.BoxGeometry(26, 0.6, 18), materials.concreteMat);
  p0.position.set(0, -0.3, 0);
  parts.push(createPart(p0, 0, 'loft-site', 'Industrial Site Grading & Concrete Grade Slab', 'Terrain', '26m x 18m', 'Excavation and sub-base remediation'));

  // P1: Underpinned Historic Masonry Footings
  const p1 = new THREE.Mesh(new THREE.BoxGeometry(22, 1.0, 15), materials.darkConcreteMat);
  p1.position.set(0, 0.3, 0);
  parts.push(createPart(p1, 1, 'loft-found', 'Underpinned Historic Masonry Piers & Strip Footings', 'Foundation', '22m x 15m footings', 'Reinforced underpinning supporting crane bays'));

  // P2: Restored W-Steel Columns & Warren Roof Trusses
  const p2Group = new THREE.Group();
  for (let x = -9; x <= 9; x += 4.5) {
    const colL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 7, 0.4), materials.steelBeamMat);
    colL.position.set(x, 4, -6.5);
    const colR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 7, 0.4), materials.steelBeamMat);
    colR.position.set(x, 4, 6.5);
    const truss = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.5, 13), materials.steelBeamMat);
    truss.position.set(x, 7.8, 0);
    p2Group.add(colL, colR, truss);
  }
  parts.push(createPart(p2Group, 2, 'loft-truss', 'Heavy Riveted W-Steel Girders & Warren Trusses', 'Structure', '20m x 14m x 8m frame', 'Industrial structural skeleton with overhead crane rail'));

  // P3: Reclaimed Timber Mezzanine Deck
  const p3 = new THREE.Mesh(new THREE.BoxGeometry(19, 0.4, 8), materials.woodMat);
  p3.position.set(0, 3.8, -2.5);
  parts.push(createPart(p3, 3, 'loft-mezzanine', 'Reclaimed Hardwood Timber Mezzanine & Steel Stairs', 'Slabs', '19m x 8m deck', 'Elevated open mezzanine studio floor'));

  // P4: Factory Multi-Pane Steel Windows
  const p4Group = new THREE.Group();
  const winF = new THREE.Mesh(new THREE.BoxGeometry(19, 5, 0.2), materials.glassMat);
  winF.position.set(0, 4.2, 6.6);
  const winB = new THREE.Mesh(new THREE.BoxGeometry(19, 5, 0.2), materials.glassMat);
  winB.position.set(0, 4.2, -6.6);
  p4Group.add(winF, winB);
  parts.push(createPart(p4Group, 4, 'loft-windows', 'Industrial Multi-Pane Steel Warehouse Windows', 'CurtainWall', '19m x 5m facades', 'Blackened steel divided-lite glazing'));

  // P5: Exposed Brick Walls & Spiral Ductwork
  const p5Group = new THREE.Group();
  const brickEndL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 7, 13.5), materials.woodMat);
  brickEndL.position.set(-9.5, 4, 0);
  const brickEndR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 7, 13.5), materials.woodMat);
  brickEndR.position.set(9.5, 4, 0);
  const duct = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 18, 12), materials.steelMat);
  duct.rotation.z = Math.PI / 2;
  duct.position.set(0, 6.2, 0);
  p5Group.add(brickEndL, brickEndR, duct);
  parts.push(createPart(p5Group, 5, 'loft-interior', 'Restored Brick Masonry End-Walls & Spiral Ducts', 'Interior', 'Brick walls & HVAC', 'Exposed interior masonry and spiral ducting'));

  // P6: Sawtooth Clerestory Roof
  const p6Group = new THREE.Group();
  for (let x = -8; x <= 8; x += 4) {
    const saw = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.8, 14), materials.steelBeamMat);
    saw.rotation.z = -0.3;
    saw.position.set(x, 8.5, 0);
    p6Group.add(saw);
  }
  parts.push(createPart(p6Group, 6, 'loft-roof', 'Sawtooth Roof Clerestory with North-Facing Glazing', 'Roof', '20m x 14m sawtooth roof', 'Industrial daylighting roof monitors'));

  // P7: Cobblestone Courtyard & Loading Bay
  const p7 = new THREE.Mesh(new THREE.BoxGeometry(24, 0.2, 17), materials.plasterWhiteMat);
  p7.position.set(0, 0.05, 0);
  parts.push(createPart(p7, 7, 'loft-plaza', 'Cobblestone Courtyard, Iron Gates & Gas Lamps', 'Finishes', '24m x 17m courtyard', 'Restored historical loading court'));

  return parts;
}

// 14. Stilted Arctic Research Outpost (Specialty, 640m²)
export function buildArcticOutpostModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Frozen Permafrost Ground Datum & Thermosyphons
  const p0 = new THREE.Mesh(new THREE.BoxGeometry(22, 0.6, 18), materials.concreteMat);
  p0.position.set(0, -0.3, 0);
  parts.push(createPart(p0, 0, 'arc-site', 'Permafrost Survey & Thermosyphon Cooling Grid', 'Terrain', '22m x 18m', 'Permafrost preservation ground bed'));

  // P1: Cryogenic Steel Bedrock Anchors
  const p1Group = new THREE.Group();
  const anchors = [[-5, -3], [5, -3], [-5, 3], [5, 3], [0, -3], [0, 3]];
  anchors.forEach(([x, z]) => {
    const foot = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 1.6), materials.darkConcreteMat);
    foot.position.set(x, 0.2, z);
    p1Group.add(foot);
  });
  parts.push(createPart(p1Group, 1, 'arc-found', 'Cryogenic Steel Anchor Cassettes & Pile Heads', 'Foundation', '6 bedrock anchor pads', 'Frost-heave resistant deep bedrock anchors'));

  // P2: Telescoping Hydraulic Stilt Legs
  const p2Group = new THREE.Group();
  anchors.forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 4.5, 12), materials.steelBeamMat);
    leg.position.set(x, 2.5, z);
    p2Group.add(leg);
  });
  const crossTruss = new THREE.Mesh(new THREE.BoxGeometry(12, 0.4, 7), materials.steelMat);
  crossTruss.position.set(0, 4.5, 0);
  p2Group.add(crossTruss);
  parts.push(createPart(p2Group, 2, 'arc-stilts', 'Telescoping Hydraulic Stilt Legs (Anti-Blizzard)', 'Structure', '12m x 7m x 4.5m', 'Elevates pod above polar snowdrifts'));

  // P3: Insulated Aerogel Core Structural Chassis Box
  const p3 = new THREE.Mesh(new THREE.BoxGeometry(14, 0.6, 8.5), materials.steelBeamMat);
  p3.position.set(0, 4.8, 0);
  parts.push(createPart(p3, 3, 'arc-chassis', 'Insulated Aerogel Floor Box & Steel Chassis', 'Slabs', '14m x 8.5m chassis', 'Thermal barrier R-60 floor platform'));

  // P4: Aerodynamic Chamfered Fuselage Pod Skin
  const p4Group = new THREE.Group();
  const pod = new THREE.Mesh(new THREE.BoxGeometry(13.6, 3.6, 8.2), materials.plasterWhiteMat);
  pod.position.set(0, 6.8, 0);
  for (let x = -4; x <= 4; x += 2.5) {
    const port = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16), materials.glassMat);
    port.rotation.x = Math.PI / 2;
    port.position.set(x, 7.2, 4.15);
    p4Group.add(port);
  }
  p4Group.add(pod);
  parts.push(createPart(p4Group, 4, 'arc-pod', 'Aerodynamic Chamfered Pod Capsule & Portholes', 'CurtainWall', '13.6m x 8.2m capsule', 'Blizzard wind-shedding composite envelope'));

  // P5: Pressurized Living Habitat & Airlock
  const p5 = new THREE.Mesh(new THREE.BoxGeometry(8, 2.8, 5.5), materials.interiorDarkWallMat);
  p5.position.set(0, 6.6, 0);
  parts.push(createPart(p5, 5, 'arc-interior', 'Pressurized Quarters, Medical Bay & Cold Airlock', 'Interior', '8m x 5.5m quarters', 'Self-contained survival living module'));

  // P6: Aerodynamic Roof Cap, Satellite Radome & Mast
  const p6Group = new THREE.Group();
  const radome = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), materials.plasterWhiteMat);
  radome.position.set(-3, 9.5, 0);
  const metMast = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.5, 8), materials.steelBeamMat);
  metMast.position.set(4, 10, 0);
  p6Group.add(radome, metMast);
  parts.push(createPart(p6Group, 6, 'arc-roof', 'Aerodynamic Roof Shell, Satellite Radome & Comms', 'Roof', 'Radome & antenna mast', 'Polar communication and storm telemetry'));

  // P7: Snowmobile Access Ramp & Xenon Beacons
  const p7Group = new THREE.Group();
  const ramp = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.2, 7), materials.steelBeamMat);
  ramp.rotation.x = 0.55;
  ramp.position.set(0, 2.2, 6.8);
  p7Group.add(ramp);
  parts.push(createPart(p7Group, 7, 'arc-ramp', 'Heavy Snow Ramp, Vehicle Berths & Xenon Beacons', 'Finishes', '7m access ramp', 'High-intensity arctic navigation markers'));

  return parts;
}

// 15. Mediterranean Cliffside Pergola (Residential, 680m²)
export function buildCliffsidePergolaModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Stepped Cliff Excavation
  const p0 = new THREE.Mesh(new THREE.BoxGeometry(26, 0.8, 22), materials.darkConcreteMat);
  p0.position.set(0, -0.4, 0);
  parts.push(createPart(p0, 0, 'cliff-site', 'Sea Cliff Terracing & Tensioned Rock Anchors', 'Terrain', '26m x 22m', 'Stepped rock slope stabilized with grouted pins'));

  // P1: Cascading White Concrete Plinths
  const p1Group = new THREE.Group();
  const plinth1 = new THREE.Mesh(new THREE.BoxGeometry(18, 1.2, 8), materials.plasterWhiteMat);
  plinth1.position.set(0, 0.4, 4);
  const plinth2 = new THREE.Mesh(new THREE.BoxGeometry(14, 1.6, 8), materials.plasterWhiteMat);
  plinth2.position.set(0, 1.0, -4);
  p1Group.add(plinth1, plinth2);
  parts.push(createPart(p1Group, 1, 'cliff-plinths', 'Cascading White Concrete Substructure Plinths', 'Foundation', 'Multi-tier stepped plinths', 'Monolithic terrace foundations'));

  // P2: Architectural White Portals
  const p2Group = new THREE.Group();
  for (let x = -6; x <= 6; x += 4) {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.8, 0.35), materials.plasterWhiteMat);
    col.position.set(x, 3.2, 0);
    p2Group.add(col);
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(15, 0.4, 0.4), materials.plasterWhiteMat);
  beam.position.set(0, 5, 0);
  p2Group.add(beam);
  parts.push(createPart(p2Group, 2, 'cliff-frame', 'Slender White Architectural Portals & Columns', 'Structure', '15m x 4m frame', 'Post-and-beam framed sea-view portals'));

  // P3: Honed Limestone Floor Slabs
  const p3 = new THREE.Mesh(new THREE.BoxGeometry(16, 0.35, 12), materials.plasterWhiteMat);
  p3.position.set(0, 1.2, 0);
  parts.push(createPart(p3, 3, 'cliff-slabs', 'Cascading Honed Limestone Terrace Decks', 'Slabs', '16m x 12m terrace deck', 'Seamless indoor-outdoor travertine paving'));

  // P4: Sliding Pocket Glass Wall
  const p4 = new THREE.Mesh(new THREE.BoxGeometry(14, 3.2, 0.15), materials.glassMat);
  p4.position.set(0, 3, -1);
  parts.push(createPart(p4, 4, 'cliff-glass', 'Floor-to-Ceiling Sliding Pocket Glass Wall', 'CurtainWall', '14m x 3.2m glass', 'Acoustic marine glass disappearing into walls'));

  // P5: White Stucco Living Lounge & Terrazzo
  const p5 = new THREE.Mesh(new THREE.BoxGeometry(10, 2.8, 6), materials.woodMat);
  p5.position.set(0, 2.7, -3.5);
  parts.push(createPart(p5, 5, 'cliff-interior', 'White Stucco Lounge, Terrazzo & Linen Joinery', 'Interior', '10m x 6m living suite', 'Handcrafted Mediterranean villa interior'));

  // P6: Natural Teak Pergola Shade Trellis
  const p6Group = new THREE.Group();
  for (let x = -6.5; x <= 6.5; x += 1.2) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 11), materials.woodMat);
    slat.position.set(x, 5.3, 1);
    p6Group.add(slat);
  }
  parts.push(createPart(p6Group, 6, 'cliff-pergola', 'Natural Teak Timber Pergola Sunshade Trellis', 'Roof', '15m x 11m teak trellis', 'Solar shading creating dynamic shadow rhythms'));

  // P7: Infinity Horizon Pool & Olive Trees
  const p7Group = new THREE.Group();
  const pool = new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 3.5), materials.waterMat);
  pool.position.set(0, 0.9, 6.5);
  const olive = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), materials.grassMat);
  olive.position.set(-6.5, 2.4, 5.5);
  p7Group.add(pool, olive);
  parts.push(createPart(p7Group, 7, 'cliff-pool', 'Cantilevered Sea-Facing Infinity Pool & Olive Trees', 'Finishes', '10m x 3.5m pool', 'Azure horizon pool and drought-tolerant landscape'));

  return parts;
}

// 16. Tensile Cable-Net Canopy Stadium (Pavilion, 18,000m²)
export function buildTensileStadiumModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Sunken Bowl Excavation
  const p0 = new THREE.Mesh(new THREE.CylinderGeometry(16, 17, 1.2, 32), materials.soilMat);
  p0.position.set(0, -0.6, 0);
  parts.push(createPart(p0, 0, 'std-site', 'Sunken Stadium Bowl Excavation & Piling Matrix', 'Terrain', '34m dia sunken bowl', 'Mass earth bowl cut and underground utilities'));

  // P1: Monolithic Concrete Compression Ring
  const p1 = new THREE.Mesh(new THREE.TorusGeometry(14, 1.2, 12, 32), materials.concreteMat);
  p1.rotation.x = Math.PI / 2;
  p1.position.set(0, 0.4, 0);
  parts.push(createPart(p1, 1, 'std-ring', 'Monolithic Concrete Compression Ring Foundation', 'Foundation', '28m dia ring beam', 'Resists circumferential tensile cable pull'));

  // P2: 4 Soaring Inclined Steel Pylon Masts
  const p2Group = new THREE.Group();
  const masts = [[-12, -12], [12, -12], [-12, 12], [12, 12]];
  masts.forEach(([x, z]) => {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 14, 12), materials.steelMat);
    mast.position.set(x, 7, z);
    p2Group.add(mast);
  });
  parts.push(createPart(p2Group, 2, 'std-masts', '4 Soaring Inclined Tubular Steel Pylon Masts', 'Structure', '14m high pylon towers', 'Primary high-tensile cable suspension pylons'));

  // P3: Precast Stepped Seating Bowl
  const p3 = new THREE.Mesh(new THREE.CylinderGeometry(13, 8, 2.5, 32, 1, true), materials.darkConcreteMat);
  p3.position.set(0, 1.8, 0);
  parts.push(createPart(p3, 3, 'std-seating', 'Tiered Precast Concrete Seating Grandstands', 'Slabs', '26m dia bowl tiers', 'Acoustic stepped grandstands and vomitories'));

  // P4: Ribbed Polycarbonate Facade Skin
  const p4 = new THREE.Mesh(new THREE.CylinderGeometry(14.5, 14.5, 4, 32, 1, true), materials.glassMat);
  p4.position.set(0, 3.5, 0);
  parts.push(createPart(p4, 4, 'std-skin', 'Translucent Ribbed Polycarbonate Facade Shell', 'CurtainWall', '29m dia outer skin', 'Windbreak perimeter shell with natural venting'));

  // P5: Emerald Turf Field & Player Dugouts
  const p5 = new THREE.Mesh(new THREE.BoxGeometry(11, 0.3, 7.5), materials.grassMat);
  p5.position.set(0, 0.65, 0);
  parts.push(createPart(p5, 5, 'std-pitch', 'High-Spec Hybrid Bermuda Grass Sports Pitch', 'Interior', '11m x 7.5m pitch', 'Sub-air vacuum drainage and turf rootzone'));

  // P6: Hyperbolic Prestressed Cable-Net Roof
  const p6Group = new THREE.Group();
  const canopy = new THREE.Mesh(new THREE.TorusGeometry(11, 2.5, 8, 32), materials.plasterWhiteMat);
  canopy.rotation.x = Math.PI / 2;
  canopy.position.set(0, 7.5, 0);
  p6Group.add(canopy);
  parts.push(createPart(p6Group, 6, 'std-canopy', 'Hyperbolic Prestressed PTFE Cable-Net Roof', 'Roof', '24m canopy ring', 'Tensile fabric membrane sheltering all seats'));

  // P7: LED Floodlight Arrays & Concourse Plaza
  const p7Group = new THREE.Group();
  const concourse = new THREE.Mesh(new THREE.RingGeometry(14.5, 17.5, 32), materials.plasterWhiteMat);
  concourse.rotation.x = -Math.PI / 2;
  concourse.position.set(0, 0.1, 0);
  p7Group.add(concourse);
  parts.push(createPart(p7Group, 7, 'std-lights', 'High-Power LED Sports Floodlights & Concourse', 'Finishes', 'Concourse & floodlights', 'Turnstiles, wayfinding, and broadcast lighting'));

  return parts;
}

// 17. Geodesic Biosphere Dome (Pavilion, 2,400m²)
export function buildGeodesicBiosphereModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Circular Moraine Bed
  const p0 = new THREE.Mesh(new THREE.CylinderGeometry(13, 14, 0.8, 32), materials.soilMat);
  p0.position.set(0, -0.4, 0);
  parts.push(createPart(p0, 0, 'gdm-site', 'Circular Moraine Basin Earthwork & Sub-Base', 'Terrain', '26m diameter basin', 'Drainage sump and subsoil excavation'));

  // P1: Monolithic Concrete Ring Beam Foundation
  const p1 = new THREE.Mesh(new THREE.RingGeometry(11, 13, 32), materials.concreteMat);
  p1.rotation.x = -Math.PI / 2;
  p1.position.set(0, 0.1, 0);
  parts.push(createPart(p1, 1, 'gdm-ring', 'Post-Tensioned Concrete Thrust Ring Foundation', 'Foundation', '24m dia ring beam', 'Resists outwards dome thrust forces'));

  // P2: Triangulated Aluminum Geodesic Spaceframe
  const p2 = new THREE.Mesh(new THREE.SphereGeometry(11, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), materials.steelMat);
  p2.position.set(0, 0.2, 0);
  parts.push(createPart(p2, 2, 'gdm-frame', 'Triangulated Aluminum Geodesic Strut Lattice', 'Structure', '22m span x 11m high dome', 'Ultra-light spaceframe structural grid'));

  // P3: Terraced Biome Mezzanines & Canopy Walkways
  const p3 = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 0.4, 16), materials.woodMat);
  p3.position.set(0, 3.5, 0);
  parts.push(createPart(p3, 3, 'gdm-walkway', 'Terraced Biome Platforms & Canopy Walkways', 'Slabs', '16m dia walkway deck', 'Elevated rainforest tree-top walkway'));

  // P4: Triple-Layer Pneumatic ETFE Foil Cushions
  const p4 = new THREE.Mesh(new THREE.SphereGeometry(11.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), materials.glassMat);
  p4.position.set(0, 0.2, 0);
  parts.push(createPart(p4, 4, 'gdm-etfe', 'Triple-Layer Pneumatic ETFE Hexagonal Cushions', 'CurtainWall', '22.4m dia outer skin', 'UV-transmitting botanical envelope'));

  // P5: Tropical Rainforest Biome & Water Misting
  const p5Group = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const tree = new THREE.Mesh(new THREE.SphereGeometry(1.4, 8, 8), materials.grassMat);
    const a = (i / 8) * Math.PI * 2;
    tree.position.set(Math.cos(a) * 5, 2.2, Math.sin(a) * 5);
    p5Group.add(tree);
  }
  parts.push(createPart(p5Group, 5, 'gdm-biome', 'Tropical Rainforest Biome & Automated Misting', 'Interior', 'Living tropical biome', 'Humidity regulation and tropical trees'));

  // P6: Automated Apex Oculus Venting Skylight
  const p6 = new THREE.Mesh(new THREE.TorusGeometry(2, 0.3, 8, 24), materials.steelBeamMat);
  p6.rotation.x = Math.PI / 2;
  p6.position.set(0, 11.2, 0);
  parts.push(createPart(p6, 6, 'gdm-oculus', 'Automated Apex Oculus Natural Thermal Chimney', 'Roof', '4m dia oculus', 'Actuated natural ventilation ring'));

  // P7: Botanical Boardwalks & Water Basin
  const p7Group = new THREE.Group();
  const pool = new THREE.Mesh(new THREE.BoxGeometry(6, 0.3, 6), materials.waterMat);
  pool.position.set(0, 0.2, 0);
  const path = new THREE.Mesh(new THREE.RingGeometry(12, 14.5, 32), materials.plasterWhiteMat);
  path.rotation.x = -Math.PI / 2;
  path.position.set(0, 0.05, 0);
  p7Group.add(pool, path);
  parts.push(createPart(p7Group, 7, 'gdm-botanical', 'Timber Boardwalks, Water Lily Basin & Entry', 'Finishes', 'Exterior perimeter realm', 'Public education trail and lily pond'));

  return parts;
}

// 18. Mass Timber CLT Office Block (Commercial, 4,200m²)
export function buildMassTimberCLTModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Urban Basement Excavation
  const p0 = new THREE.Mesh(new THREE.BoxGeometry(22, 0.8, 18), materials.concreteMat);
  p0.position.set(0, -0.4, 0);
  parts.push(createPart(p0, 0, 'clt-site', 'Urban Lot Sub-Base Excavation & Retaining', 'Terrain', '22m x 18m', 'Low-carbon earth excavation datum'));

  // P1: Low-Carbon GGBS Slag Concrete Foundation Raft
  const p1 = new THREE.Mesh(new THREE.BoxGeometry(18, 1.2, 14), materials.darkConcreteMat);
  p1.position.set(0, 0.3, 0);
  parts.push(createPart(p1, 1, 'clt-found', 'Low-Carbon GGBS Slag Concrete Foundation Raft', 'Foundation', '18m x 14m x 1.2m', 'Low-embodied-carbon foundation'));

  // P2: 5-Story Glued-Laminated Post & Beam Grid
  const p2Group = new THREE.Group();
  for (let x = -7; x <= 7; x += 3.5) {
    for (let z = -5; z <= 5; z += 5) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.4, 12, 0.4), materials.woodMat);
      col.position.set(x, 6.5, z);
      p2Group.add(col);
    }
  }
  for (let y = 3; y <= 12; y += 3) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(15, 0.35, 11), materials.woodMat);
    beam.position.set(0, y, 0);
    p2Group.add(beam);
  }
  parts.push(createPart(p2Group, 2, 'clt-grid', '5-Story Glued-Laminated Post & Beam Timber Grid', 'Structure', '15m x 11m x 12m grid', 'Carbon-sequestering spruce structural frame'));

  // P3: 7-Ply Cross-Laminated Timber Floor Slabs
  const p3Group = new THREE.Group();
  for (let y = 3; y <= 12; y += 3) {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(14.6, 0.25, 10.6), materials.woodMat);
    slab.position.set(0, y + 0.15, 0);
    p3Group.add(slab);
  }
  parts.push(createPart(p3Group, 3, 'clt-slabs', '7-Ply Cross-Laminated Timber (CLT) Floor Slabs', 'Slabs', '14.6m x 10.6m floor diaphragms', 'Prefabricated structural CLT panels'));

  // P4: Wood-Curtain Wall Facade & Shading Louvers
  const p4 = new THREE.Mesh(new THREE.BoxGeometry(14.8, 11, 10.8), materials.glassMat);
  p4.position.set(0, 6.5, 0);
  parts.push(createPart(p4, 4, 'clt-facade', 'Thermally Broken Timber Curtain Wall Facade', 'CurtainWall', '14.8m x 10.8m x 11m', 'Triple-glazed passive house envelope'));

  // P5: Biophilic Interior Office Joinery
  const p5 = new THREE.Mesh(new THREE.BoxGeometry(10, 9, 7), materials.woodMat);
  p5.position.set(0, 6, 0);
  parts.push(createPart(p5, 5, 'clt-interior', 'Exposed Timber Ceilings & Acoustic Work Hubs', 'Interior', '10m x 7m interior zone', 'Biophilic open workspace with zero VOCs'));

  // P6: Intensive Green Sedum Roof & Solar Pergola
  const p6Group = new THREE.Group();
  const sedum = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.4, 11.2), materials.grassMat);
  sedum.position.set(0, 12.5, 0);
  const pergola = new THREE.Mesh(new THREE.BoxGeometry(8, 2, 6), materials.woodMat);
  pergola.position.set(0, 13.5, 0);
  p6Group.add(sedum, pergola);
  parts.push(createPart(p6Group, 6, 'clt-roof', 'Sedum Green Roof & Rooftop Solar Timber Pergola', 'Roof', '15.2m x 11.2m roof', 'Stormwater attenuation living roof'));

  // P7: Permeable Rain Garden Plaza
  const p7 = new THREE.Mesh(new THREE.BoxGeometry(20, 0.2, 16), materials.plasterWhiteMat);
  p7.position.set(0, 0.05, 0);
  parts.push(createPart(p7, 7, 'clt-plaza', 'Permeable Granite Paver Plaza & Rain Gardens', 'Finishes', '20m x 16m civic realm', 'Urban bioretention and pedestrian plaza'));

  return parts;
}

// 19. Cor-Ten Steel Coastal Watchtower (Specialty, 310m²)
export function buildCoastalWatchtowerModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Rocky Cliff Headland Drilling
  const p0 = new THREE.Mesh(new THREE.BoxGeometry(16, 0.8, 16), materials.darkConcreteMat);
  p0.position.set(0, -0.4, 0);
  parts.push(createPart(p0, 0, 'wt-site', 'Headland Granite Core Drilling & Micropiles', 'Terrain', '16m x 16m headland', 'Seismic bedrock anchor rods'));

  // P1: Mass Concrete Anchor Plinth
  const p1 = new THREE.Mesh(new THREE.BoxGeometry(10, 1.4, 10), materials.concreteMat);
  p1.position.set(0, 0.4, 0);
  parts.push(createPart(p1, 1, 'wt-found', 'Heavy Mass Concrete Anchor Block Foundation', 'Foundation', '10m x 10m x 1.4m', 'Overturning-moment resisting foundation block'));

  // P2: Tapering Cor-Ten Steel Monolith Shaft
  const p2 = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 4.2, 18, 4), materials.woodMat);
  p2.position.set(0, 9.8, 0);
  parts.push(createPart(p2, 2, 'wt-shaft', '28m Tapering Cor-Ten Steel Monolithic Shaft', 'Structure', '28m tall weathered steel shell', 'Self-weathering marine oxidation protective skin'));

  // P3: Internal Spiral Staircase Core
  const p3 = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 17, 12), materials.steelBeamMat);
  p3.position.set(0, 9.5, 0);
  parts.push(createPart(p3, 3, 'wt-stairs', 'Internal Helical Steel Spiral Staircase Core', 'Slabs', '17m vertical core', 'Access spiral stairs and rest landings'));

  // P4: Vertical Recessed Viewing Slits
  const p4 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 14, 0.8), materials.glassMat);
  p4.position.set(0, 9.5, 2.8);
  parts.push(createPart(p4, 4, 'wt-slits', 'Vertical Recessed Structural Glazing Slits', 'CurtainWall', '14m vertical light slit', 'Narrow wind-resistant observation slits'));

  // P5: Navigation Radar Station & Plotting Quarters
  const p5 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 3, 3.5), materials.interiorDarkWallMat);
  p5.position.set(0, 16, 0);
  parts.push(createPart(p5, 5, 'wt-quarters', 'Watchkeeper Navigation Station & Radar Desk', 'Interior', '3.5m x 3.5m watchroom', 'Maritime vessel tracking and communications'));

  // P6: Cantilevered 360° Glass Lantern Observation Deck
  const p6Group = new THREE.Group();
  const lantern = new THREE.Mesh(new THREE.BoxGeometry(6.5, 2.8, 6.5), materials.glassMat);
  lantern.position.set(0, 19, 0);
  const lanternRoof = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.4, 7.2), materials.steelBeamMat);
  lanternRoof.position.set(0, 20.6, 0);
  p6Group.add(lantern, lanternRoof);
  parts.push(createPart(p6Group, 6, 'wt-lantern', 'Cantilevered 360° Glass Observation Lantern', 'Roof', '6.5m x 6.5m glass box', 'Panoramic navigational crow nest lantern'));

  // P7: Promontory Boardwalk, Railings & Fog Horn
  const p7 = new THREE.Mesh(new THREE.BoxGeometry(14, 0.2, 14), materials.plasterWhiteMat);
  p7.position.set(0, 0.05, 0);
  parts.push(createPart(p7, 7, 'wt-boardwalk', 'Promontory Boardwalk, Marine Horn & Beacon', 'Finishes', 'Perimeter clifftop walk', 'Weathered steel cliff railings and marine beacon'));

  return parts;
}

// 20. Hyperbolic Concrete Thin-Shell Chapel (Cultural, 1,450m²)
export function buildThinShellChapelModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];
  
  // P0: Sacred Ground Grading & Basin
  const p0 = new THREE.Mesh(new THREE.BoxGeometry(24, 0.6, 20), materials.concreteMat);
  p0.position.set(0, -0.3, 0);
  parts.push(createPart(p0, 0, 'ch-site', 'Sanctuary Excavation & Pool Bed Grading', 'Terrain', '24m x 20m', 'Acoustic sacred ground earthwork datum'));

  // P1: Dual Concrete Thrust Butment Anchors
  const p1Group = new THREE.Group();
  const butL = new THREE.Mesh(new THREE.BoxGeometry(3, 1.8, 5), materials.darkConcreteMat);
  butL.position.set(-8, 0.5, 0);
  const butR = new THREE.Mesh(new THREE.BoxGeometry(3, 1.8, 5), materials.darkConcreteMat);
  butR.position.set(8, 0.5, 0);
  p1Group.add(butL, butR);
  parts.push(createPart(p1Group, 1, 'ch-found', 'Dual Reinforced Concrete Thrust Buttress Anchors', 'Foundation', 'Heavy thrust blocks', 'Transfers massive shell thrust to bedrock'));

  // P2: Hyperbolic Paraboloid Thin-Shell Vault
  const p2Group = new THREE.Group();
  const shell = new THREE.Mesh(new THREE.ConeGeometry(9, 13, 4, 1, true), materials.plasterWhiteMat);
  shell.rotation.y = Math.PI / 4;
  shell.position.set(0, 6.5, 0);
  p2Group.add(shell);
  parts.push(createPart(p2Group, 2, 'ch-shell', '80mm Prestressed Concrete Hypar Thin-Shell', 'Structure', '18m span x 13m high vault', 'Double-curved ruled surface thin concrete shell'));

  // P3: White Carrara Marble Sanctuary Slab
  const p3 = new THREE.Mesh(new THREE.BoxGeometry(16, 0.4, 12), materials.plasterWhiteMat);
  p3.position.set(0, 0.6, 0);
  parts.push(createPart(p3, 3, 'ch-sanctuary', 'Polished White Carrara Marble Sanctuary Floor', 'Slabs', '16m x 12m marble slab', 'Monolithic stone altar podium'));

  // P4: Monumental Triangular Stained-Glass Facade
  const p4 = new THREE.Mesh(new THREE.ConeGeometry(7, 10, 3, 1, true), materials.glassMat);
  p4.rotation.x = Math.PI / 2;
  p4.position.set(0, 5, 5.5);
  parts.push(createPart(p4, 4, 'ch-glass', 'Monumental Cobalt Blue Stained-Glass Facade', 'CurtainWall', '10m high triangular window', 'Sacred filtered mystical colored illumination'));

  // P5: White Oak Pews & Altar Stone Monolith
  const p5 = new THREE.Mesh(new THREE.BoxGeometry(8, 1.2, 6), materials.woodMat);
  p5.position.set(0, 1.2, 0);
  parts.push(createPart(p5, 5, 'ch-pews', 'Handcrafted White Oak Pews & Travertine Altar', 'Interior', '8m x 6m nave seating', 'Acoustic sacred choir resonance and altar'));

  // P6: Shell Ridge Finial & Slender Golden Cross
  const p6Group = new THREE.Group();
  const crossV = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.5, 8), materials.steelBeamMat);
  crossV.position.set(0, 14.5, 0);
  const crossH = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.8, 8), materials.steelBeamMat);
  crossH.rotation.z = Math.PI / 2;
  crossH.position.set(0, 15.2, 0);
  p6Group.add(crossV, crossH);
  parts.push(createPart(p6Group, 6, 'ch-cross', 'Sculptural Shell Apex Ridge & Gold Cross Finial', 'Roof', 'Cross finial at 16m', 'Apex waterproof flashing and architectural cross'));

  // P7: Travertine Water Basin & Bell Campanile
  const p7Group = new THREE.Group();
  const pool = new THREE.Mesh(new THREE.BoxGeometry(12, 0.3, 4), materials.waterMat);
  pool.position.set(0, 0.25, 7.5);
  const bellTower = new THREE.Mesh(new THREE.BoxGeometry(1.2, 12, 1.2), materials.plasterWhiteMat);
  bellTower.position.set(9.5, 6, 4);
  p7Group.add(pool, bellTower);
  parts.push(createPart(p7Group, 7, 'ch-basin', 'Travertine Reflecting Pool & Bell Campanile', 'Finishes', 'Perimeter sacred garden', 'Mirror water court and slender bell tower'));

  return parts;
}
