import * as THREE from 'three';
import { BuildingComponentData } from '../../types';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from './Phase0_SiteTerrain';

export function buildPhase7(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // 1. Infinity Reflecting Pool & Water Body
  const poolGroup = new THREE.Group();

  // Pool Basin (recessed under the eastern cantilever)
  const poolBasinGeo = new THREE.BoxGeometry(10.0, 0.6, 6.0);
  const poolBasin = new THREE.Mesh(poolBasinGeo, materials.poolTileMat);
  poolBasin.position.set(7.0, 0.45, 8.5);
  poolBasin.receiveShadow = true;
  poolGroup.add(poolBasin);

  // Water Surface
  const waterGeo = new THREE.BoxGeometry(9.6, 0.1, 5.6);
  const waterMesh = new THREE.Mesh(waterGeo, materials.waterMat);
  waterMesh.position.set(7.0, 0.72, 8.5);
  waterMesh.name = 'poolWater';
  poolGroup.add(waterMesh);

  // Pool Coping Edge (Granite slab rim)
  const rimGeo = new THREE.BoxGeometry(10.4, 0.1, 6.4);
  const rimMesh = new THREE.Mesh(rimGeo, materials.concreteMat);
  rimMesh.position.set(7.0, 0.8, 8.5);
  rimMesh.receiveShadow = true;
  // We can add subtle rim or let it sit cleanly

  parts.push({
    mesh: poolGroup,
    initialY: 0,
    data: {
      id: 'infinity_pool',
      name: 'Infinity Edge Reflecting Pool & Bio-Filtration System',
      phaseId: 7,
      category: 'Finishes',
      materialName: 'Basaltina Volcanic Stone Basin with Saltwater Chlorination',
      dimensions: '10.0m length × 6.0m width × 1.2m depth',
      structuralRole: 'Microclimatic evaporative cooling feature lowering ambient summer terrace temperatures by 3-4°C.',
      specifications: [
        'Concealed perimeter slot overflow weir',
        'Energy-efficient variable-speed circulation pump',
        'Submerged fiber-optic warm 2700K illumination'
      ],
      volumeM3: 55.0,
      weightTons: 62.0,
      carbonFootprintKg: 4200,
      explodeVector: new THREE.Vector3(2.5, -0.8, 3.5),
    }
  });

  // 2. Surrounding Manicured Lawn & Hardscape Stepping Stones
  const landscapeGroup = new THREE.Group();

  // Lawn Top Layer
  const lawnGeo = new THREE.BoxGeometry(35.5, 0.15, 29.5);
  const lawnMesh = new THREE.Mesh(lawnGeo, materials.grassMat);
  lawnMesh.position.set(0, 0.08, 0);
  lawnMesh.receiveShadow = true;
  landscapeGroup.add(lawnMesh);

  // Concrete floating entry path pavers
  const paverGeo = new THREE.BoxGeometry(1.4, 0.1, 0.6);
  for (let i = 0; i < 7; i++) {
    const paver = new THREE.Mesh(paverGeo, materials.concreteMat);
    paver.position.set(-5.0, 0.18, 7.5 + i * 0.9);
    paver.receiveShadow = true;
    paver.castShadow = true;
    landscapeGroup.add(paver);
  }

  parts.push({
    mesh: landscapeGroup,
    initialY: 0,
    data: {
      id: 'landscape_lawn',
      name: 'Architectural Xeriscape Lawn & Floating Paver Walkway',
      phaseId: 7,
      category: 'Finishes',
      materialName: 'Drought-Tolerant Native Turf & Precast Architectural Concrete',
      dimensions: '580m² landscaped perimeter grounds',
      structuralRole: 'Sustainable stormwater infiltration basin preventing municipal sewer surcharge during 100-year storm events.',
      specifications: [
        'Sub-surface smart drip irrigation with weather-station sync',
        'High permeability permeable paving joints',
        'Zero chemical fertilizer turf management'
      ],
      volumeM3: 29.0,
      weightTons: 38.0,
      carbonFootprintKg: -1800,
      explodeVector: new THREE.Vector3(0, -1.8, 0),
    }
  });

  // 3. Specimen Architectural Japanese Maple Trees & Lighting
  const treeGroup = new THREE.Group();

  function createTree(x: number, z: number, scale: number = 1.0) {
    const tree = new THREE.Group();
    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.12 * scale, 0.22 * scale, 2.8 * scale, 7);
    const trunkMat = materials.woodMat;
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(0, 1.4 * scale, 0);
    trunk.castShadow = true;
    tree.add(trunk);

    // Sculptural Foliage Clusters (Modern minimalist low-poly canopy)
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x8a2c2c, // Japanese red maple
      roughness: 0.8,
      flatShading: true
    });

    const canopyPositions = [
      [0, 2.6 * scale, 0, 1.2 * scale],
      [0.6 * scale, 3.1 * scale, 0.4 * scale, 0.9 * scale],
      [-0.5 * scale, 3.0 * scale, -0.4 * scale, 0.85 * scale],
      [0.2 * scale, 3.6 * scale, -0.2 * scale, 0.75 * scale]
    ];

    canopyPositions.forEach(([cx, cy, cz, cr]) => {
      const sphereGeo = new THREE.DodecahedronGeometry(cr, 1);
      const canopy = new THREE.Mesh(sphereGeo, foliageMat);
      canopy.position.set(cx, cy, cz);
      canopy.castShadow = true;
      tree.add(canopy);
    });

    // Inground LED uplight
    const uplightGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 8);
    const uplightMat = new THREE.MeshBasicMaterial({ color: 0xffd27d });
    const uplight = new THREE.Mesh(uplightGeo, uplightMat);
    uplight.position.set(0.4 * scale, 0.15, 0.4 * scale);
    tree.add(uplight);

    tree.position.set(x, 0.1, z);
    return tree;
  }

  // Position specimen trees
  treeGroup.add(createTree(-12, 6, 1.2));
  treeGroup.add(createTree(-10, 9, 0.9));
  treeGroup.add(createTree(-12, -8, 1.1));
  treeGroup.add(createTree(13, -7, 1.0));

  parts.push({
    mesh: treeGroup,
    initialY: 0,
    data: {
      id: 'specimen_trees_lighting',
      name: 'Mature Specimen Japanese Maples & Precision Lighting',
      phaseId: 7,
      category: 'Finishes',
      materialName: 'Acer Palmatum (Japanese Red Maple) & 2700K Low-Voltage LEDs',
      dimensions: '4x 25-year mature specimen focal trees with directional uplights',
      structuralRole: 'Biophilic architectural integration providing seasonal foliage color changes and privacy screening.',
      specifications: [
        'Root-barrier protection shielding subterranean utility lines',
        'Dark-sky compliant IDA-certified shielded LED luminaires',
        'Bespoke bonsai-inspired crown pruning'
      ],
      volumeM3: 3.5,
      weightTons: 2.8,
      carbonFootprintKg: -4800,
      explodeVector: new THREE.Vector3(-2.5, 0.2, 2.5),
    }
  });

  return parts;
}
