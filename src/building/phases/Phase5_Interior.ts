import * as THREE from 'three';
import { BuildingComponentData } from '../../types';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from './Phase0_SiteTerrain';

export function buildPhase5(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // 1. Hardwood Flooring Planks (Ground Floor & Level 1)
  const floorGroup = new THREE.Group();

  const gFloorGeo = new THREE.BoxGeometry(19.6, 0.04, 13.6);
  const gFloor = new THREE.Mesh(gFloorGeo, materials.woodMat);
  gFloor.position.set(0, 0.96, 0);
  gFloor.receiveShadow = true;
  floorGroup.add(gFloor);

  const l1FloorGeo = new THREE.BoxGeometry(23.0, 0.04, 14.0);
  const l1Floor = new THREE.Mesh(l1FloorGeo, materials.woodMat);
  l1Floor.position.set(1.25, 4.40, 0);
  l1Floor.receiveShadow = true;
  floorGroup.add(l1Floor);

  parts.push({
    mesh: floorGroup,
    initialY: 0,
    data: {
      id: 'hardwood_floors',
      name: 'Engineered White American Oak Wide Plank Flooring',
      phaseId: 5,
      category: 'Interior',
      materialName: '220mm Engineered Oak with Acoustic Cork Underlayment',
      dimensions: '420m² total finished floor coverage',
      structuralRole: 'Premium architectural interior finish with integrated radiant hydronic underfloor heating.',
      specifications: [
        '6mm European white oak wear layer',
        'Impact sound insulation reduction ΔLw = 21 dB',
        'UV-cured natural matte lacquer finish (VOC zero rating)'
      ],
      volumeM3: 8.4,
      weightTons: 5.8,
      carbonFootprintKg: -1200,
      explodeVector: new THREE.Vector3(0, 0.5, 0),
    }
  });

  // 2. Interior Minimalist Furniture & Living Suite
  const furnitureGroup = new THREE.Group();

  // Modern L-shaped Sectional Sofa (Ground floor living area)
  const sofaBaseGeo = new THREE.BoxGeometry(3.6, 0.45, 1.2);
  const sofaBackGeo = new THREE.BoxGeometry(3.6, 0.45, 0.35);
  const sofaLGeo = new THREE.BoxGeometry(1.4, 0.45, 2.2);

  const sofaMat = new THREE.MeshStandardMaterial({ color: 0x333b47, roughness: 0.85 });

  const sofaBase = new THREE.Mesh(sofaBaseGeo, sofaMat);
  sofaBase.position.set(2.5, 1.2, 2.0);
  sofaBase.castShadow = true;
  furnitureGroup.add(sofaBase);

  const sofaBack = new THREE.Mesh(sofaBackGeo, sofaMat);
  sofaBack.position.set(2.5, 1.6, 1.55);
  sofaBack.castShadow = true;
  furnitureGroup.add(sofaBack);

  const sofaL = new THREE.Mesh(sofaLGeo, sofaMat);
  sofaL.position.set(4.3, 1.2, 2.7);
  sofaL.castShadow = true;
  furnitureGroup.add(sofaL);

  // Marble Coffee Table
  const tableGeo = new THREE.BoxGeometry(1.8, 0.3, 1.0);
  const tableMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.2, metalness: 0.1 });
  const table = new THREE.Mesh(tableGeo, tableMat);
  table.position.set(2.5, 1.15, 3.8);
  table.castShadow = true;
  furnitureGroup.add(table);

  // Modern Kitchen Island with Waterfall Marble
  const islandGeo = new THREE.BoxGeometry(3.2, 0.95, 1.2);
  const islandMat = new THREE.MeshStandardMaterial({ color: 0x1f242d, roughness: 0.3 });
  const island = new THREE.Mesh(islandGeo, islandMat);
  island.position.set(-4.5, 1.45, 2.5);
  island.castShadow = true;
  island.receiveShadow = true;
  furnitureGroup.add(island);

  // Upper floor bedroom bed (in the cantilevered master suite)
  const bedBaseGeo = new THREE.BoxGeometry(2.4, 0.45, 2.2);
  const bedMat = new THREE.MeshStandardMaterial({ color: 0x4a5568, roughness: 0.9 });
  const bed = new THREE.Mesh(bedBaseGeo, bedMat);
  bed.position.set(7.5, 4.65, 0);
  bed.castShadow = true;
  furnitureGroup.add(bed);

  const headboardGeo = new THREE.BoxGeometry(0.2, 1.1, 2.4);
  const headboard = new THREE.Mesh(headboardGeo, materials.woodMat);
  headboard.position.set(6.2, 5.0, 0);
  headboard.castShadow = true;
  furnitureGroup.add(headboard);

  parts.push({
    mesh: furnitureGroup,
    initialY: 0,
    data: {
      id: 'interior_furniture',
      name: 'Custom Bespoke Italian Joinery & Minimalist Furniture',
      phaseId: 5,
      category: 'Interior',
      materialName: 'Calacatta Marble, Full-Grain Leather & Smoked Walnut',
      dimensions: 'Integrated living suite, kitchen island and cantilever master suite',
      structuralRole: 'High-end interior furnishings defining residential zoning, ergonomics, and acoustic comfort.',
      specifications: [
        'Solid Nero Marquina / Calacatta book-matched stone waterfall edges',
        'Custom upholstered top-grain aniline leather lounge',
        'Built-in low-profile cabinetry with concealed soft-close Blum hardware'
      ],
      volumeM3: 4.8,
      weightTons: 3.2,
      carbonFootprintKg: 950,
      explodeVector: new THREE.Vector3(1.2, 0.8, 1.5),
    }
  });

  // 3. Interior Partition Walls & Acoustic Gypsum Drywalls
  const partitionGroup = new THREE.Group();
  const partWallGeo = new THREE.BoxGeometry(0.15, 3.1, 6.0);
  const partWall = new THREE.Mesh(partWallGeo, materials.plasterWhiteMat);
  partWall.position.set(-1.5, 2.5, 0);
  partWall.castShadow = true;
  partWall.receiveShadow = true;
  partitionGroup.add(partWall);

  const upperWallGeo = new THREE.BoxGeometry(0.15, 3.1, 8.0);
  const upperWall = new THREE.Mesh(upperWallGeo, materials.plasterWhiteMat);
  upperWall.position.set(3.5, 5.9, 0);
  upperWall.castShadow = true;
  upperWall.receiveShadow = true;
  partitionGroup.add(upperWall);

  parts.push({
    mesh: partitionGroup,
    initialY: 0,
    data: {
      id: 'interior_partitions',
      name: 'Acoustic Stud Drywall Partitions (Rw + Ctr = 54 dB)',
      phaseId: 5,
      category: 'Interior',
      materialName: 'Double-Layer High-Density Soundbloc Gypsum Board on 70mm C-Studs',
      dimensions: '125mm total thickness partition walls with mineral wool cavity batts',
      structuralRole: 'Defines functional space zoning with superior acoustic isolation and 60-minute fire resistance.',
      specifications: [
        'Acoustic rating: Rw 54 dB sound transmission loss',
        'Type X fire-rated core with recessed shadowline perimeter reveal',
        'Level 5 architectural smooth skim finish'
      ],
      volumeM3: 6.2,
      weightTons: 4.1,
      carbonFootprintKg: 1100,
      explodeVector: new THREE.Vector3(-1.0, 0.5, 0),
    }
  });

  return parts;
}
