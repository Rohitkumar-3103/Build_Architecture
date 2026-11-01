import * as THREE from 'three';
import { BuildingComponentData } from '../../types';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from './Phase0_SiteTerrain';

export function buildPhase3(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // 1. Ground Floor Reinforced Concrete Slab
  const groundSlabGeo = new THREE.BoxGeometry(20, 0.25, 14);
  const groundSlabMesh = new THREE.Mesh(groundSlabGeo, materials.concreteMat);
  groundSlabMesh.position.set(0, 0.82, 0);
  groundSlabMesh.receiveShadow = true;
  groundSlabMesh.castShadow = true;

  parts.push({
    mesh: groundSlabMesh,
    initialY: groundSlabMesh.position.y,
    data: {
      id: 'ground_slab',
      name: 'Monolithic Ground Floor Slab (Grade C30/37)',
      phaseId: 3,
      category: 'Slabs',
      materialName: 'Fiber-Reinforced Cast-in-Place Concrete',
      dimensions: '20.0m × 14.0m × 0.25m thick',
      structuralRole: 'Supports ground floor functional areas, partitions, and floor finishes with heavy live load capacity.',
      specifications: [
        'Designed live load capacity: 5.0 kN/m²',
        'Reinforcement: Two layers A393 steel wire fabric mesh',
        'Helicopter power-troweled burnished finish'
      ],
      volumeM3: 70.0,
      weightTons: 168.0,
      carbonFootprintKg: 14000,
      explodeVector: new THREE.Vector3(0, -1.0, 0),
    }
  });

  // 2. Level 1 Suspended Post-Tensioned Cantilever Slab
  // Includes a dramatic cantilever extending east towards x = 12.5m
  const l1SlabGeo = new THREE.BoxGeometry(23.5, 0.28, 14.5);
  const l1SlabMesh = new THREE.Mesh(l1SlabGeo, materials.concreteMat);
  l1SlabMesh.position.set(1.25, 4.25, 0); // Offset to show the 3.5m cantilever
  l1SlabMesh.receiveShadow = true;
  l1SlabMesh.castShadow = true;

  parts.push({
    mesh: l1SlabMesh,
    initialY: l1SlabMesh.position.y,
    data: {
      id: 'l1_cantilever_slab',
      name: 'Cantilevered Post-Tensioned Suspended Floor Slab',
      phaseId: 3,
      category: 'Slabs',
      materialName: 'Post-Tensioned C40 Concrete with Bonded Tendons',
      dimensions: '23.5m × 14.5m × 0.28m with 3.5m open cantilever',
      structuralRole: 'Spans between steel column grids and supports master bedroom suites and viewing balcony without intermediate columns.',
      specifications: [
        'High-strength 7-wire low-relaxation steel strands (1860 MPa)',
        'Active stress jacking to 75% ultimate tensile strength',
        'Vibration damping criterion: natural frequency > 8.5 Hz'
      ],
      volumeM3: 95.4,
      weightTons: 228.9,
      carbonFootprintKg: 20980,
      explodeVector: new THREE.Vector3(1.5, 2.0, 0),
    }
  });

  // 3. Central Concrete Utility Core & Shear Wall
  const coreGroup = new THREE.Group();
  const coreWallGeo = new THREE.BoxGeometry(3.5, 6.8, 3.0);
  const coreWallMesh = new THREE.Mesh(coreWallGeo, materials.darkConcreteMat);
  coreWallMesh.position.set(-3.0, 4.3, -2.5);
  coreWallMesh.castShadow = true;
  coreWallMesh.receiveShadow = true;
  coreGroup.add(coreWallMesh);

  parts.push({
    mesh: coreGroup,
    initialY: 0,
    data: {
      id: 'concrete_core',
      name: 'Monolithic Concrete Structural & Utility Core',
      phaseId: 3,
      category: 'Slabs',
      materialName: 'Reinforced Concrete Shear Wall C40',
      dimensions: '3.5m × 3.0m footprint × 6.8m total height',
      structuralRole: 'Provides torsional stiffness, elevator/plumbing shaft, and primary lateral stability for the structure.',
      specifications: [
        'Continuous slip-formed casting',
        'Dual vertical reinforcement cages: T16 @ 150mm',
        'Fire compartmentation rated for 180 minutes'
      ],
      volumeM3: 28.5,
      weightTons: 68.4,
      carbonFootprintKg: 7125,
      explodeVector: new THREE.Vector3(-2.0, 1.0, -2.0),
    }
  });

  // 4. Modern Architectural Floating Staircase
  const stairGroup = new THREE.Group();
  const stepCount = 18;
  const stepWidth = 1.4;
  const stepHeight = (4.25 - 0.95) / stepCount; // Rise
  const stepDepth = 0.32; // Run
  const startX = -1.2;
  const startY = 0.95;
  const startZ = -1.0;

  const stepGeo = new THREE.BoxGeometry(stepWidth, 0.08, stepDepth);
  const steelSpineGeo = new THREE.BoxGeometry(0.15, 0.2, Math.sqrt(Math.pow(stepCount * stepDepth, 2) + Math.pow(stepCount * stepHeight, 2)));
  const spineMat = materials.steelMat;

  for (let i = 0; i < stepCount; i++) {
    const stepMesh = new THREE.Mesh(stepGeo, materials.woodMat);
    stepMesh.position.set(startX, startY + i * stepHeight + 0.04, startZ + i * stepDepth * 0.9);
    stepMesh.castShadow = true;
    stepMesh.receiveShadow = true;
    stairGroup.add(stepMesh);
  }

  // Glass balustrade on stairs
  const balustradeGeo = new THREE.BoxGeometry(0.04, 0.9, stepCount * stepDepth * 0.9);
  const balustrade = new THREE.Mesh(balustradeGeo, materials.glassMat);
  balustrade.position.set(startX + stepWidth / 2, startY + (stepCount * stepHeight) / 2 + 0.45, startZ + (stepCount * stepDepth * 0.9) / 2);
  stairGroup.add(balustrade);

  parts.push({
    mesh: stairGroup,
    initialY: 0,
    data: {
      id: 'architectural_stairs',
      name: 'Floating Architectural Cantilever Staircase',
      phaseId: 3,
      category: 'Slabs',
      materialName: 'Structural Steel Spine with White American Oak Treads',
      dimensions: '1.4m tread width × 18 risers (180mm rise / 290mm go)',
      structuralRole: 'Open-tread sculptural vertical circulation linking living and private terrace levels.',
      specifications: [
        'Hidden central box beam structural stringer',
        'Solid 80mm quarter-sawn white oak treads with anti-slip grooves',
        '17.5mm toughened laminated structural glass guardrail'
      ],
      volumeM3: 2.2,
      weightTons: 1.8,
      carbonFootprintKg: 540,
      explodeVector: new THREE.Vector3(-1.0, 1.5, 1.5),
    }
  });

  return parts;
}
