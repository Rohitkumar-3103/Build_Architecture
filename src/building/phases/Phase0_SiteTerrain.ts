import * as THREE from 'three';
import { BuildingComponentData } from '../../types';
import { MaterialManager } from '../../engine/MaterialManager';

export interface PhasePart {
  mesh: THREE.Object3D;
  data: BuildingComponentData;
  initialY: number;
}

export function buildPhase0(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // 1. Excavation Pit & Ground Base
  const terrainGeo = new THREE.BoxGeometry(36, 1.2, 30);
  const terrainMesh = new THREE.Mesh(terrainGeo, materials.soilMat);
  terrainMesh.position.set(0, -0.6, 0);
  terrainMesh.receiveShadow = true;
  terrainMesh.castShadow = true;

  parts.push({
    mesh: terrainMesh,
    initialY: terrainMesh.position.y,
    data: {
      id: 'site_terrain',
      name: 'Engineered Earth Excavation & Grade Level',
      phaseId: 0,
      category: 'Terrain',
      materialName: 'Compacted Fill Soil & Crushed Stone Aggregate',
      dimensions: '36.0m × 30.0m × 1.2m depth',
      structuralRole: 'Primary geotechnical site excavation supporting sub-base loading.',
      specifications: [
        'Geotechnical bearing capacity: 250 kPa',
        '95% Standard Proctor compaction',
        'Laser-graded sub-base with perimeter French drain'
      ],
      volumeM3: 450,
      weightTons: 720,
      carbonFootprintKg: 3200,
      explodeVector: new THREE.Vector3(0, -9.0, 0),
    }
  });

  // 2. Concrete Blinding Layer (Mud slab)
  const blindingGeo = new THREE.BoxGeometry(22, 0.15, 16);
  const blindingMesh = new THREE.Mesh(blindingGeo, materials.concreteMat);
  blindingMesh.position.set(0, 0.08, 0);
  blindingMesh.receiveShadow = true;

  parts.push({
    mesh: blindingMesh,
    initialY: blindingMesh.position.y,
    data: {
      id: 'site_blinding',
      name: 'Sub-Foundation Blinding Concrete Slab',
      phaseId: 0,
      category: 'Terrain',
      materialName: 'C15/20 Lean Mass Concrete',
      dimensions: '22.0m × 16.0m × 0.15m',
      structuralRole: 'Working platform providing a clean, level base for rebar and foundation footings.',
      specifications: [
        'Compressive strength: 15 MPa at 28 days',
        'Prevents soil contamination of structural concrete',
        'Includes 1000-gauge polyethylene damp-proof membrane'
      ],
      volumeM3: 52.8,
      weightTons: 126.7,
      carbonFootprintKg: 10560,
      explodeVector: new THREE.Vector3(0, -6.0, 0),
    }
  });

  // 3. Survey CAD Grid & Batter Boards
  const gridGroup = new THREE.Group();
  const gridHelper = new THREE.GridHelper(34, 17, 0x38bdf8, 0x1e3a5f);
  gridHelper.position.set(0, 0.16, 0);
  gridGroup.add(gridHelper);

  // Survey corner stakes
  const stakeGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8);
  const stakeMat = new THREE.MeshStandardMaterial({ color: 0xff3838, roughness: 0.5 });
  const cornerCoords = [
    [-11, -8], [11, -8], [-11, 8], [11, 8]
  ];
  cornerCoords.forEach(([x, z], i) => {
    const stake = new THREE.Mesh(stakeGeo, stakeMat);
    stake.position.set(x, 0.6, z);
    stake.castShadow = true;
    gridGroup.add(stake);

    // Survey string line connecting corners
    const nextCoord = cornerCoords[(i + 1) % cornerCoords.length];
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, 0.9, z),
      new THREE.Vector3(nextCoord[0], 0.9, nextCoord[1])
    ]);
    const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xffaa00 }));
    gridGroup.add(line);
  });

  parts.push({
    mesh: gridGroup,
    initialY: 0,
    data: {
      id: 'site_survey',
      name: 'Geodetic Survey Grid & Layout Boundary Markers',
      phaseId: 0,
      category: 'Terrain',
      materialName: 'GNSS Satellite Layout & Timber Batter Stakes',
      dimensions: '22.0m × 16.0m perimeter grid',
      structuralRole: 'Defines dimensional axis control for structural column alignments within ±2mm precision.',
      specifications: [
        'Total Station laser calibration',
        'Benchmark datum: +0.000m Finished Floor Level',
        'High-visibility reflective prism targets'
      ],
      explodeVector: new THREE.Vector3(0, -2, 0),
    }
  });

  return parts;
}
