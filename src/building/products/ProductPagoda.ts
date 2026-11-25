import * as THREE from 'three';
import { ConstructionPhase, CalloutAnnotation, BuildingComponentData } from '../../types';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from '../phases/Phase0_SiteTerrain';

// ---------------------------------------------------------------------------
// 21. Mass Timber Pagoda Tower (Cultural, 5 tiers, ~26 m tall)
// ---------------------------------------------------------------------------

// Shared tier geometry (metres). Every tier is a square storey; each one is
// narrower than the one below and carries its own hip roof with deep eaves.
const TIERS = 5;
const FLOOR0 = 1.5;                                   // top of the stone podium
const PITCH = 3.9;                                    // floor-to-floor
const SLAB_T = 0.25;                                  // CLT floor thickness
const COL_H = 3.2;                                    // storey column height
const ROOF_RISE = 1.0;                                // hip roof rise
const tierBase = (i: number) => FLOOR0 + i * PITCH;   // underside of tier slab
const halfWidth = (i: number) => 4.0 - i * 0.6;       // 4.0 → 1.6
const eaveHalf = (i: number) => halfWidth(i) + 2.1;   // eave overhang
const roofBaseY = (i: number) => tierBase(i) + 3.5;   // eave line
const ROOF_APEX_Y = roofBaseY(TIERS - 1) + ROOF_RISE; // finial starts here

const explodeFor = (phaseId: number): THREE.Vector3 => {
  switch (phaseId) {
    case 0: return new THREE.Vector3(0, -9.0, 0);
    case 1: return new THREE.Vector3(0, -5.0, 0);
    case 2: return new THREE.Vector3(0, 0.5, 0);
    case 3: return new THREE.Vector3(2.5, 5.0, -2.5);
    case 4: return new THREE.Vector3(0, 1.5, 11.0);
    case 5: return new THREE.Vector3(0, 2.5, 6.0);
    case 6: return new THREE.Vector3(0, 14.5, 0);
    default: return new THREE.Vector3(-6.4, -2.0, 6.4);
  }
};

function createPart(
  mesh: THREE.Object3D,
  phaseId: number,
  id: string,
  name: string,
  category: BuildingComponentData['category'],
  materialName: string,
  dimensions: string,
  structuralRole: string,
  specifications: string[]
): PhasePart {
  mesh.traverse(n => {
    n.castShadow = true;
    n.receiveShadow = true;
  });
  return {
    mesh,
    initialY: mesh.position.y,
    data: {
      id,
      name,
      phaseId,
      category,
      materialName,
      dimensions,
      structuralRole,
      specifications,
      explodeVector: explodeFor(phaseId)
    }
  };
}

function box(w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

function cyl(rt: number, rb: number, h: number, seg: number, mat: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  return m;
}

export function buildPagodaModel(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // Local accent materials (render-mode swapping in BuildingModel handles these too)
  const stakeMat = new THREE.MeshStandardMaterial({ color: 0xff3838, roughness: 0.5 });
  const tatamiMat = new THREE.MeshStandardMaterial({ color: 0xb7c28a, roughness: 0.9 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xc9962b, roughness: 0.35, metalness: 0.9 });
  const toriiMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.6 });
  const mapleMat = new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.85 });

  // ---------------- P0: Site & earthwork ----------------
  const p0 = new THREE.Group();
  p0.add(box(26, 0.8, 26, materials.soilMat, 0, -0.4, 0));
  const stakeCoords: [number, number][] = [[-8, -8], [8, -8], [8, 8], [-8, 8]];
  stakeCoords.forEach(([x, z], i) => {
    p0.add(cyl(0.06, 0.06, 1.2, 8, stakeMat, x, 0.6, z));
    const [nx, nz] = stakeCoords[(i + 1) % stakeCoords.length];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 0.9, z), new THREE.Vector3(nx, 0.9, nz)]),
      new THREE.LineBasicMaterial({ color: 0xffaa00 })
    );
    p0.add(line);
  });
  parts.push(createPart(
    p0, 0, 'pg-site', 'Temple Site Grading & Survey Datum', 'Terrain',
    'Compacted Fill & Crushed Stone Aggregate', '26m x 26m x 0.8m',
    'Level bearing platform and surveyed axis for the five-tier tower',
    ['Bearing capacity: 200 kPa', 'Square 16m survey grid with corner batter stakes', 'BIM LOD: 400 Fabrication Level']
  ));

  // ---------------- P1: Stone podium ----------------
  const p1 = new THREE.Group();
  p1.add(box(15, 1.0, 15, materials.darkConcreteMat, 0, 0.5, 0));
  p1.add(box(12.5, 0.5, 12.5, materials.concreteMat, 0, 1.25, 0));
  p1.add(box(4, 0.5, 1.0, materials.concreteMat, 0, 0.25, 8.0)); // approach step
  parts.push(createPart(
    p1, 1, 'pg-found', 'Reinforced Concrete Raft & Granite-Faced Podium (Kidan)', 'Foundation',
    'C30/37 Concrete with Granite Facing', '15m x 15m x 1.5m',
    'Distributes tower load and lifts timber clear of ground moisture',
    ['Raft slab with 12 bored micropiles', 'Granite facing on stepped podium', 'BIM LOD: 400 Fabrication Level']
  ));

  // ---------------- P2: Primary timber structure ----------------
  const p2 = new THREE.Group();
  const shinHeight = 20;
  p2.add(cyl(0.42, 0.5, shinHeight, 16, materials.woodMat, 0, FLOOR0 + shinHeight / 2, 0)); // shin-bashira
  for (let i = 0; i < TIERS; i++) {
    const hw = halfWidth(i) - 0.2;
    const colY = tierBase(i) + SLAB_T + COL_H / 2;
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        p2.add(box(0.32, COL_H, 0.32, materials.woodMat, sx * hw, colY, sz * hw));
      }
    }
    // Bracket-set ring (tokyo) under the eave
    p2.add(box(halfWidth(i) * 2 + 0.9, 0.25, halfWidth(i) * 2 + 0.9, materials.woodMat, 0, tierBase(i) + SLAB_T + COL_H + 0.125, 0));
  }
  parts.push(createPart(
    p2, 2, 'pg-frame', 'Glulam Central Shin-Bashira & Perimeter Post Frame', 'Structure',
    'GL28h Glulam, Japanese Cypress Brackets', '20m central column, 20 perimeter posts',
    'Central column acts as a damped spine; tiers stack on it and sway independently',
    ['Central column 1.0m dia glulam, tiers slip-fit around it', 'Bracket-set ring under each eave', 'BIM LOD: 400 Fabrication Level']
  ));

  // ---------------- P3: CLT floors & stairs ----------------
  const p3 = new THREE.Group();
  for (let i = 0; i < TIERS; i++) {
    const w = halfWidth(i) * 2 + 0.4;
    p3.add(box(w, SLAB_T, w, materials.woodMat, 0, tierBase(i) + SLAB_T / 2, 0));
    if (i < TIERS - 1) {
      const hw = halfWidth(i);
      const run = 2 * (hw - 0.8);
      const rise = PITCH - SLAB_T * 0.1;
      const len = Math.hypot(run, rise);
      const stair = box(0.7, 0.1, len, materials.furnitureMat, hw - 0.9, tierBase(i) + SLAB_T + rise / 2, 0);
      stair.rotation.x = -Math.atan2(rise, run);
      p3.add(stair);
    }
  }
  parts.push(createPart(
    p3, 3, 'pg-slabs', 'CLT Tier Floors & Steep Timber Stairs', 'Slabs',
    '5-Ply Cross-Laminated Timber', '5 floors, 8.4m down to 3.6m square',
    'Floor diaphragms that brace the frame and carry live load to the posts',
    ['250mm CLT panels, 2-hour char-rated', 'One steep stair run per tier, offset from the core column', 'BIM LOD: 400 Fabrication Level']
  ));

  // ---------------- P4: Shoji glazing envelope ----------------
  const p4 = new THREE.Group();
  for (let i = 0; i < TIERS; i++) {
    const wallOff = halfWidth(i) - 0.2;
    const panelW = wallOff * 2 - 0.4;
    const panelY = tierBase(i) + SLAB_T + 1.4;
    p4.add(box(panelW, 2.8, 0.06, materials.glassMat, 0, panelY, wallOff));
    p4.add(box(panelW, 2.8, 0.06, materials.glassMat, 0, panelY, -wallOff));
    p4.add(box(0.06, 2.8, panelW, materials.glassMat, wallOff, panelY, 0));
    p4.add(box(0.06, 2.8, panelW, materials.glassMat, -wallOff, panelY, 0));
    // Central mullions
    p4.add(box(0.08, 2.8, 0.1, materials.woodMat, 0, panelY, wallOff));
    p4.add(box(0.08, 2.8, 0.1, materials.woodMat, 0, panelY, -wallOff));
    p4.add(box(0.1, 2.8, 0.08, materials.woodMat, wallOff, panelY, 0));
    p4.add(box(0.1, 2.8, 0.08, materials.woodMat, -wallOff, panelY, 0));
  }
  parts.push(createPart(
    p4, 4, 'pg-facade', 'Shoji-Pattern Triple-Glazed Wall Panels', 'CurtainWall',
    'Laminated Low-E Glass with Timber Mullions', '20 panels, 2.8m tall',
    'Weather envelope that keeps the interior lit without blocking the structure',
    ['Triple glazing, U-value 0.8 W/m2K', 'Shoji lattice pattern on timber mullions', 'BIM LOD: 400 Fabrication Level']
  ));

  // ---------------- P5: Interior ----------------
  const p5 = new THREE.Group();
  for (let i = 0; i < TIERS; i++) {
    const hw = halfWidth(i);
    p5.add(box(hw * 2 - 1.0, 0.05, hw * 2 - 1.0, tatamiMat, 0, tierBase(i) + SLAB_T + 0.025, 0));
    for (const s of [-1, 1]) {
      const lx = s * (hw - 1.2);
      const lz = s * (hw - 1.2);
      p5.add(cyl(0.01, 0.01, 0.7, 4, materials.steelBeamMat, lx, tierBase(i) + SLAB_T + COL_H - 0.35, lz));
      const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), materials.plasterWhiteMat);
      lantern.position.set(lx, tierBase(i) + SLAB_T + COL_H - 0.85, lz);
      p5.add(lantern);
    }
  }
  // Altar on the ground tier
  const altarZ = halfWidth(0) - 1.4;
  const altarY = tierBase(0) + SLAB_T;
  p5.add(box(1.6, 0.5, 1.0, materials.darkConcreteMat, 0, altarY + 0.25 + 0.05, altarZ));
  p5.add(cyl(0.22, 0.3, 0.6, 12, goldMat, 0, altarY + 0.8 + 0.05, altarZ));
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), goldMat);
  head.position.set(0, altarY + 1.3 + 0.05, altarZ);
  p5.add(head);
  parts.push(createPart(
    p5, 5, 'pg-interior', 'Tatami Floors, Paper Lanterns & Ground-Tier Shrine', 'Interior',
    'Tatami, Washi Lanterns, Gilded Bronze', '5 tatami floors, 10 lanterns, 1 altar',
    'Quiet visitor floors and the devotional focus at the base of the tower',
    ['Tatami mats on 20mm acoustic underlay', 'Concealed sprinkler and smoke detection', 'BIM LOD: 400 Fabrication Level']
  ));

  // ---------------- P6: Roofs & Sorin finial ----------------
  const p6 = new THREE.Group();
  for (let i = 0; i < TIERS; i++) {
    const he = eaveHalf(i);
    const by = roofBaseY(i);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(he * Math.SQRT2, ROOF_RISE, 4), materials.interiorDarkWallMat);
    cone.rotation.y = Math.PI / 4;
    cone.position.set(0, by + ROOF_RISE / 2, 0);
    p6.add(cone);
    p6.add(box(he * 2, 0.12, he * 2, materials.woodMat, 0, by - 0.06, 0)); // fascia board
    // Upturned corner tips
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.55, 6), materials.interiorDarkWallMat);
        tip.position.set(sx * he, by + 0.2, sz * he);
        tip.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(sx * 0.5, 1, sz * 0.5).normalize());
        p6.add(tip);
      }
    }
  }
  // Sorin finial: stone base, mast, nine rings, jewel
  p6.add(box(0.8, 0.35, 0.8, materials.darkConcreteMat, 0, ROOF_APEX_Y + 0.1, 0));
  p6.add(cyl(0.07, 0.07, 4.0, 8, goldMat, 0, ROOF_APEX_Y + 2.1, 0));
  for (let k = 0; k < 9; k++) {
    const r = 0.45 - k * 0.03;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.04, 8, 24), goldMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, ROOF_APEX_Y + 0.7 + k * 0.28, 0);
    p6.add(ring);
  }
  const jewel = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), goldMat);
  jewel.position.set(0, ROOF_APEX_Y + 4.25, 0);
  p6.add(jewel);
  parts.push(createPart(
    p6, 6, 'pg-roof', 'Five Hip Roofs with Slate Tiles & Nine-Ring Sorin Finial', 'Roof',
    'Slate-Grey Ceramic Tiles, Cypress Rafters, Gilded Bronze', '5 roofs, eaves 12.2m down to 7.4m',
    'Sheds water clear of the walls and carries the lightning-grounded finial',
    ['Deep 2.1m eaves protect the timber', 'Upturned corner tips on every roof', 'BIM LOD: 400 Fabrication Level']
  ));

  // ---------------- P7: Temple landscape ----------------
  const p7 = new THREE.Group();
  p7.add(box(24, 0.1, 24, materials.concreteMat, 0, 0.05, 0)); // raked gravel
  p7.add(box(2.2, 0.14, 3.2, materials.darkConcreteMat, 0, 0.07, 10.1)); // stone path
  for (const s of [-1, 1]) {
    // Stone lanterns
    p7.add(box(0.5, 0.3, 0.5, materials.darkConcreteMat, s * 2.2, 0.25, 8.8));
    p7.add(cyl(0.14, 0.14, 1.0, 8, materials.darkConcreteMat, s * 2.2, 0.9, 8.8));
    p7.add(box(0.5, 0.45, 0.5, materials.plasterWhiteMat, s * 2.2, 1.62, 8.8));
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.3, 4), materials.darkConcreteMat);
    cap.rotation.y = Math.PI / 4;
    cap.position.set(s * 2.2, 2.0, 8.8);
    p7.add(cap);
    // Torii pillars
    p7.add(cyl(0.18, 0.18, 4.2, 12, toriiMat, s * 1.6, 2.1, 12));
  }
  p7.add(box(4.6, 0.28, 0.45, toriiMat, 0, 4.3, 12));
  p7.add(box(3.6, 0.18, 0.3, toriiMat, 0, 3.6, 12));
  // Koi pond
  p7.add(cyl(2.9, 2.9, 0.1, 32, materials.darkConcreteMat, -8.5, 0.1, 6.5));
  p7.add(cyl(2.6, 2.6, 0.12, 32, materials.waterMat, -8.5, 0.12, 6.5));
  // Maples and pines at the corners
  const treeSpots: [number, number, THREE.Material][] = [
    [-9, -9, mapleMat], [9, -9, materials.grassMat], [9, 8, mapleMat], [-9, 0, materials.grassMat]
  ];
  treeSpots.forEach(([x, z, mat]) => {
    p7.add(cyl(0.18, 0.25, 2.4, 8, materials.woodMat, x, 1.3, z));
    const crown = new THREE.Mesh(new THREE.SphereGeometry(1.5, 14, 14), mat);
    crown.position.set(x, 3.4, z);
    p7.add(crown);
  });
  parts.push(createPart(
    p7, 7, 'pg-garden', 'Raked Gravel Garden, Torii Gate, Koi Pond & Stone Lanterns', 'Finishes',
    'Granite Setts, Raked Gravel, Cedar, Live Maples', '24m x 24m temple grounds',
    'Ceremonial approach and garden setting for the tower',
    ['Processional path to the podium steps', 'Permeable gravel drains to a bio-swale', 'BIM LOD: 400 Fabrication Level']
  ));

  return parts;
}

export const PAGODA_PHASES: ConstructionPhase[] = [
  {
    id: 0,
    title: 'Temple Site Grading & Survey Datum',
    subtitle: 'Earthwork & Axis Layout',
    description: 'Grading and compacting a 26m square platform, then laying out the tower axis with a total station and corner batter stakes.',
    badge: 'PHASE 01 // SITE & EARTHWORK',
    durationSeconds: 7,
    tradeSpecialty: 'Civil Earthworks & Surveying',
    safetyProtocol: 'Excavation edge protection and utility locate before digging',
    toolsRequired: ['Total Station', 'Vibratory Plate Compactor', 'Laser Grade Level'],
    materialsRequired: ['Crushed Stone Aggregate', 'Compacted Engineered Fill'],
    daysEstimate: 20
  },
  {
    id: 1,
    title: 'Reinforced Raft & Granite Podium',
    subtitle: 'Foundation & Kidan Platform',
    description: 'Casting a reinforced concrete raft on micropiles, then building the stepped podium and facing it with granite.',
    badge: 'PHASE 02 // SUBSTRUCTURE',
    durationSeconds: 8,
    tradeSpecialty: 'Structural Concrete & Stonemasonry',
    safetyProtocol: 'Formwork inspection before each pour and trench shoring',
    toolsRequired: ['Concrete Pump', 'Rebar Bender', 'Stone Saw'],
    materialsRequired: ['C30/37 Concrete', 'B500B Rebar', 'Granite Facing Slabs'],
    daysEstimate: 35
  },
  {
    id: 2,
    title: 'Glulam Shin-Bashira & Post Frame',
    subtitle: 'Central Column & Tier Posts',
    description: 'Craning in the central glulam column, then stacking perimeter posts and bracket rings tier by tier.',
    badge: 'PHASE 03 // SUPERSTRUCTURE',
    durationSeconds: 9,
    tradeSpecialty: 'Heavy Timber Framing',
    safetyProtocol: 'Temporary bracing until each tier is locked in, 100% harness tie-off',
    toolsRequired: ['Mobile Crane (80T)', 'Laser Plumb Line', 'Torque Wrench Set'],
    materialsRequired: ['GL28h Glulam', 'Cypress Bracket Blocks', 'Concealed Steel Dowels'],
    daysEstimate: 45
  },
  {
    id: 3,
    title: 'CLT Tier Floors & Timber Stairs',
    subtitle: 'Floor Diaphragms & Circulation',
    description: 'Lifting 250mm cross-laminated timber floor panels into each tier and fixing a steep timber stair between floors.',
    badge: 'PHASE 04 // SLABS & STAIRS',
    durationSeconds: 8,
    tradeSpecialty: 'Mass Timber Installation',
    safetyProtocol: 'Edge protection on every open floor and moisture monitoring of panels',
    toolsRequired: ['Panel Lifting Clamps', 'Impact Drivers', 'Moisture Meter'],
    materialsRequired: ['5-Ply CLT Panels', 'Self-Tapping Screws', 'Timber Stair Treads'],
    daysEstimate: 30
  },
  {
    id: 4,
    title: 'Shoji-Pattern Glazed Envelope',
    subtitle: 'Triple-Glazed Wall Panels',
    description: 'Installing timber-mullioned triple glazing on all four faces of every tier, with a shoji-style lattice pattern.',
    badge: 'PHASE 05 // ENVELOPE',
    durationSeconds: 8,
    tradeSpecialty: 'Architectural Glazing',
    safetyProtocol: 'Glass handling with suction lifters and exclusion zones below',
    toolsRequired: ['Glass Suction Lifter', 'Sealant Gun', 'Spirit Level'],
    materialsRequired: ['Triple-Glazed Low-E Units', 'Cypress Mullions', 'EPDM Gaskets'],
    daysEstimate: 30
  },
  {
    id: 5,
    title: 'Tatami Floors, Lanterns & Shrine',
    subtitle: 'Interior Fit-Out & MEP',
    description: 'Laying tatami floors, hanging paper lanterns, running concealed sprinkler and lighting services, and installing the ground-tier altar.',
    badge: 'PHASE 06 // INTERIOR & MEP',
    durationSeconds: 8,
    tradeSpecialty: 'Interior Joinery & Building Services',
    safetyProtocol: 'Hot-work permits near timber and fire watch after cutting',
    toolsRequired: ['Tatami Knife', 'Conduit Bender', 'Pipe Threader'],
    materialsRequired: ['Tatami Mats', 'Washi Paper Lanterns', 'Gilded Bronze Altar Pieces'],
    daysEstimate: 35
  },
  {
    id: 6,
    title: 'Hip Roofs & Nine-Ring Sorin Finial',
    subtitle: 'Five Roofs & Lightning-Grounded Spire',
    description: 'Framing and tiling five hip roofs with deep eaves and upturned corners, then raising the gilded nine-ring finial on the central column.',
    badge: 'PHASE 07 // ROOF & SPIRE',
    durationSeconds: 9,
    tradeSpecialty: 'Roofing & Ornamental Metalwork',
    safetyProtocol: 'Roof edge anchors, fall arrest and lightning-system continuity test',
    toolsRequired: ['Roofing Hoist', 'Tile Cutter', 'Crane with Fly Jib'],
    materialsRequired: ['Slate-Grey Ceramic Tiles', 'Cypress Rafters', 'Gilded Bronze Rings'],
    daysEstimate: 40
  },
  {
    id: 7,
    title: 'Gravel Garden, Torii Gate & Koi Pond',
    subtitle: 'Temple Grounds & Finishes',
    description: 'Raking the gravel, laying the granite approach path, setting stone lanterns and the torii gate, filling the koi pond and planting maples.',
    badge: 'PHASE 08 // LANDSCAPE',
    durationSeconds: 7,
    tradeSpecialty: 'Landscape Construction',
    safetyProtocol: 'Pond edge guarding and slip checks on wet stone',
    toolsRequired: ['Plate Compactor', 'Gravel Rakes', 'Mini Excavator'],
    materialsRequired: ['Granite Setts', 'Raked Gravel', 'Live Maple Specimens'],
    daysEstimate: 25
  }
];

export const PAGODA_CALLOUTS: CalloutAnnotation[] = [
  {
    id: 'pg_c0',
    componentId: 'pg-site',
    phaseId: 0,
    label: 'Surveyed Site Platform',
    sublabel: 'Compacted 26m square datum with corner batter stakes',
    tag: 'CIVIL',
    worldPosition: new THREE.Vector3(-8, 0.9, 8),
    offsetSide: 'top-left'
  },
  {
    id: 'pg_c1',
    componentId: 'pg-found',
    phaseId: 1,
    label: 'Granite-Faced Podium',
    sublabel: 'Stepped raft and stone base lifting timber off the ground',
    tag: 'FOUNDATION',
    worldPosition: new THREE.Vector3(7, 0.8, -7),
    offsetSide: 'top-right'
  },
  {
    id: 'pg_c2',
    componentId: 'pg-frame',
    phaseId: 2,
    label: 'Central Shin-Bashira',
    sublabel: '1.0m glulam spine the five tiers stack around',
    tag: 'SUPERSTRUCTURE',
    worldPosition: new THREE.Vector3(0, tierBase(2) + 1.5, 0),
    offsetSide: 'top-left'
  },
  {
    id: 'pg_c3',
    componentId: 'pg-slabs',
    phaseId: 3,
    label: '250mm CLT Tier Floors',
    sublabel: 'Cross-laminated timber diaphragms with steep stairs',
    tag: 'SLABS',
    worldPosition: new THREE.Vector3(halfWidth(1), tierBase(1) + 0.15, halfWidth(1)),
    offsetSide: 'top-right'
  },
  {
    id: 'pg_c4',
    componentId: 'pg-facade',
    phaseId: 4,
    label: 'Shoji-Pattern Glazing',
    sublabel: 'Triple-glazed panels on timber mullions',
    tag: 'ENVELOPE',
    worldPosition: new THREE.Vector3(0, tierBase(2) + 1.65, halfWidth(2) - 0.2),
    offsetSide: 'top-left'
  },
  {
    id: 'pg_c5',
    componentId: 'pg-interior',
    phaseId: 5,
    label: 'Ground-Tier Shrine',
    sublabel: 'Gilded bronze altar above tatami flooring',
    tag: 'INTERIOR',
    worldPosition: new THREE.Vector3(0, tierBase(0) + 1.6, halfWidth(0) - 1.4),
    offsetSide: 'top-right'
  },
  {
    id: 'pg_c6',
    componentId: 'pg-roof',
    phaseId: 6,
    label: 'Nine-Ring Sorin Finial',
    sublabel: 'Gilded bronze spire above five hip roofs',
    tag: 'ROOF',
    worldPosition: new THREE.Vector3(0, ROOF_APEX_Y + 2.6, 0),
    offsetSide: 'top-left'
  },
  {
    id: 'pg_c7',
    componentId: 'pg-garden',
    phaseId: 7,
    label: 'Torii Gate & Approach',
    sublabel: 'Processional path through the gravel garden',
    tag: 'LANDSCAPE',
    worldPosition: new THREE.Vector3(1.6, 4.3, 12),
    offsetSide: 'top-right'
  }
];
