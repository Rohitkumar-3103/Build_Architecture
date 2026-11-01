import * as THREE from 'three';
import { BuildingComponentData } from '../../types';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from './Phase0_SiteTerrain';

export function buildPhase2(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  const xCoords = [-9, -3, 3, 9];
  const zCoords = [-6, 0, 6];

  // Helper to build realistic I-beam / H-column geometry
  function createIBeamGeometry(length: number, depth: number = 0.35, flangeWidth: number = 0.35, webThick: number = 0.04, flangeThick: number = 0.04): THREE.BufferGeometry {
    const shape = new THREE.Shape();
    const halfW = flangeWidth / 2;
    const halfD = depth / 2;
    const halfT = webThick / 2;

    // Outer contour of H / I profile
    shape.moveTo(-halfW, -halfD);
    shape.lineTo(halfW, -halfD);
    shape.lineTo(halfW, -halfD + flangeThick);
    shape.lineTo(halfT, -halfD + flangeThick);
    shape.lineTo(halfT, halfD - flangeThick);
    shape.lineTo(halfW, halfD - flangeThick);
    shape.lineTo(halfW, halfD);
    shape.lineTo(-halfW, halfD);
    shape.lineTo(-halfW, halfD - flangeThick);
    shape.lineTo(-halfT, halfD - flangeThick);
    shape.lineTo(-halfT, -halfD + flangeThick);
    shape.lineTo(-halfW, -halfD + flangeThick);
    shape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: length,
      bevelEnabled: false
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }

  // 1. Structural Steel Columns (Vertical)
  const columnGroup = new THREE.Group();
  const columnHeight = 7.0; // Spans ground + upper level
  const colGeo = new THREE.BoxGeometry(0.35, columnHeight, 0.35); // Clean rectangular box with chamfer feel

  xCoords.forEach(x => {
    zCoords.forEach(z => {
      const col = new THREE.Mesh(colGeo, materials.steelBeamMat);
      col.position.set(x, columnHeight / 2 + 0.7, z);
      col.castShadow = true;
      col.receiveShadow = true;

      // Base plate
      const basePlateGeo = new THREE.BoxGeometry(0.6, 0.05, 0.6);
      const basePlate = new THREE.Mesh(basePlateGeo, materials.steelMat);
      basePlate.position.set(0, -columnHeight / 2, 0);
      col.add(basePlate);

      // Mid-height collar connection for level 1 slab
      const collarGeo = new THREE.BoxGeometry(0.48, 0.2, 0.48);
      const collar = new THREE.Mesh(collarGeo, materials.steelMat);
      collar.position.set(0, 0, 0);
      col.add(collar);

      columnGroup.add(col);
    });
  });

  parts.push({
    mesh: columnGroup,
    initialY: 0,
    data: {
      id: 'steel_columns',
      name: 'W14x90 Hot-Rolled Structural Steel Columns (x12)',
      phaseId: 2,
      category: 'Structure',
      materialName: 'ASTM A992 Grade 50 Heavy Structural Steel',
      dimensions: '350mm × 350mm section × 7.0m clear height',
      structuralRole: 'Primary vertical load-bearing frame resisting axial dead/live loads up to 450kN/column.',
      specifications: [
        'Yield strength: 345 MPa (50 ksi)',
        'Milled column ends with complete penetration welds',
        'Intumescent coating rated for 2-hour fire resistance'
      ],
      volumeM3: 10.3,
      weightTons: 18.2,
      carbonFootprintKg: 32760,
      explodeVector: new THREE.Vector3(0, 0, 0),
    }
  });

  // 2. Level 1 Primary Floor Girders & Cantilever Beams
  const girderGroup = new THREE.Group();
  const l1Y = 4.1; // Level 1 floor elevation

  // Longitudinal primary beams along X (including a 3m architectural cantilever on the right!)
  zCoords.forEach(z => {
    // Length: 21m (from x = -9 to x = +12, cantilevered 3m past x=9)
    const beamGeo = new THREE.BoxGeometry(22, 0.4, 0.25);
    const beam = new THREE.Mesh(beamGeo, materials.steelBeamMat);
    beam.position.set(0.5, l1Y, z);
    beam.castShadow = true;
    beam.receiveShadow = true;
    girderGroup.add(beam);
  });

  // Transverse primary beams along Z
  xCoords.forEach(x => {
    const beamGeo = new THREE.BoxGeometry(0.25, 0.4, 12);
    const beam = new THREE.Mesh(beamGeo, materials.steelBeamMat);
    beam.position.set(x, l1Y, 0);
    beam.castShadow = true;
    beam.receiveShadow = true;
    girderGroup.add(beam);
  });

  // Level 2 / Roof Girders
  const roofY = 7.6;
  zCoords.forEach(z => {
    const beamGeo = new THREE.BoxGeometry(23, 0.35, 0.22);
    const beam = new THREE.Mesh(beamGeo, materials.steelBeamMat);
    beam.position.set(0.5, roofY, z);
    beam.castShadow = true;
    girderGroup.add(beam);
  });
  xCoords.forEach(x => {
    const beamGeo = new THREE.BoxGeometry(0.22, 0.35, 12);
    const beam = new THREE.Mesh(beamGeo, materials.steelBeamMat);
    beam.position.set(x, roofY, 0);
    beam.castShadow = true;
    girderGroup.add(beam);
  });

  parts.push({
    mesh: girderGroup,
    initialY: 0,
    data: {
      id: 'steel_girders',
      name: 'W18x50 Structural Steel Floor & Roof Girders',
      phaseId: 2,
      category: 'Structure',
      materialName: 'High-Strength Structural Steel (ASTM A992)',
      dimensions: 'W18×50 I-sections with 3.0m dramatic eastern cantilever',
      structuralRole: 'Supports composite deck floor system and transfers transverse shear to columns.',
      specifications: [
        'Moment-resistant connections with 1" Grade A325 bolts',
        'Pre-cambered 15mm to offset long-term deflection',
        'Shear studs welded @ 150mm spacing for composite action'
      ],
      volumeM3: 8.8,
      weightTons: 15.6,
      carbonFootprintKg: 28080,
      explodeVector: new THREE.Vector3(0, 1.2, 0),
    }
  });

  // 3. Diagonal Bracing & Tension Rods
  const bracingGroup = new THREE.Group();
  const braceMat = new THREE.MeshStandardMaterial({ color: 0x3d4452, metalness: 0.9, roughness: 0.3 });
  const rodGeo = new THREE.CylinderGeometry(0.04, 0.04, 8.5, 8);

  // Rear diagonal bracing for lateral wind resistance
  const bracePositions = [
    { x: -6, z: -6, rotZ: 0.58 },
    { x: -6, z: -6, rotZ: -0.58 },
    { x: 0, z: -6, rotZ: 0.58 },
    { x: 0, z: -6, rotZ: -0.58 },
  ];

  bracePositions.forEach(b => {
    const rod = new THREE.Mesh(rodGeo, braceMat);
    rod.position.set(b.x, 4.1, b.z);
    rod.rotation.z = b.rotZ;
    rod.castShadow = true;
    bracingGroup.add(rod);
  });

  parts.push({
    mesh: bracingGroup,
    initialY: 0,
    data: {
      id: 'steel_bracing',
      name: 'Seismic Diagonal Bracing & Tension Rod Struts',
      phaseId: 2,
      category: 'Structure',
      materialName: 'High-Tensile Macalloy Structural Tie Bars',
      dimensions: '75mm diameter tension rods with adjustable fork ends',
      structuralRole: 'Resists lateral earthquake and high-velocity wind loads, ensuring building rigidity.',
      specifications: [
        'Ultimate tensile strength: 1050 MPa',
        'Pin-connected fork clevis ends with spherical bearings',
        'Architectural bead-blasted stainless steel finish'
      ],
      volumeM3: 0.8,
      weightTons: 2.1,
      carbonFootprintKg: 4200,
      explodeVector: new THREE.Vector3(0, 0, -2.5),
    }
  });

  return parts;
}
