import * as THREE from 'three';
import { BuildingComponentData } from '../../types';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from './Phase0_SiteTerrain';

export function buildPhase4(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // 1. South & East Floor-to-Ceiling Glass Curtain Walls (Ground Floor)
  const glassGroup = new THREE.Group();
  const mullionMat = materials.steelMat;

  // Front glass wall (Z = 6, X from -8 to 8, Y from 0.95 to 4.1)
  const frontGlassGeo = new THREE.BoxGeometry(16, 3.1, 0.08);
  const frontGlass = new THREE.Mesh(frontGlassGeo, materials.glassMat);
  frontGlass.position.set(0, 2.5, 6.0);
  frontGlass.castShadow = true;
  glassGroup.add(frontGlass);

  // Vertical aluminum mullions
  for (let x = -8; x <= 8; x += 2) {
    const mullionGeo = new THREE.BoxGeometry(0.08, 3.1, 0.12);
    const mullion = new THREE.Mesh(mullionGeo, mullionMat);
    mullion.position.set(x, 2.5, 6.0);
    glassGroup.add(mullion);
  }

  // Upper Level Cantilever Glass (Level 1, Z = 6.0, X from -8 to 12)
  const upperFrontGlassGeo = new THREE.BoxGeometry(20, 3.1, 0.08);
  const upperFrontGlass = new THREE.Mesh(upperFrontGlassGeo, materials.glassMat);
  upperFrontGlass.position.set(2.0, 5.9, 6.0);
  upperFrontGlass.castShadow = true;
  glassGroup.add(upperFrontGlass);

  for (let x = -8; x <= 12; x += 2) {
    const mullionGeo = new THREE.BoxGeometry(0.08, 3.1, 0.12);
    const mullion = new THREE.Mesh(mullionGeo, mullionMat);
    mullion.position.set(x, 5.9, 6.0);
    glassGroup.add(mullion);
  }

  // East Side Cantilever Panoramic Glass (X = 12.5, Z from -6 to 6)
  const eastGlassGeo = new THREE.BoxGeometry(0.08, 3.1, 12);
  const eastGlass = new THREE.Mesh(eastGlassGeo, materials.glassMat);
  eastGlass.position.set(12.5, 5.9, 0);
  eastGlass.castShadow = true;
  glassGroup.add(eastGlass);

  for (let z = -6; z <= 6; z += 2) {
    const mullionGeo = new THREE.BoxGeometry(0.12, 3.1, 0.08);
    const mullion = new THREE.Mesh(mullionGeo, mullionMat);
    mullion.position.set(12.5, 5.9, z);
    glassGroup.add(mullion);
  }

  parts.push({
    mesh: glassGroup,
    initialY: 0,
    data: {
      id: 'curtain_wall_glass',
      name: 'Triple-Glazed Low-E Structural Curtain Wall System',
      phaseId: 4,
      category: 'CurtainWall',
      materialName: 'Acoustic Laminated Low-Emissivity Double/Triple Glazing',
      dimensions: '3.1m clear height glazed bays with thermal break profiles',
      structuralRole: 'Weather envelope providing maximum natural daylight, thermal insulation (U-value 0.78 W/m²K), and panoramic outdoor views.',
      specifications: [
        'U-value: 0.78 W/m²K / SHGC: 0.32',
        'Argon gas cavity with warm-edge spacer technology',
        'Thermally broken extruded aluminum mullions with matte noir anodizing'
      ],
      volumeM3: 6.4,
      weightTons: 14.8,
      carbonFootprintKg: 11840,
      explodeVector: new THREE.Vector3(5.5, 1.0, 7.5),
    }
  });

  // 2. West & North Opaque Insulated Cladding Facade
  const facadeGroup = new THREE.Group();

  // West Wall (X = -9)
  const westWallGeo = new THREE.BoxGeometry(0.3, 6.8, 12.5);
  const westWall = new THREE.Mesh(westWallGeo, materials.plasterWhiteMat);
  westWall.position.set(-9.0, 4.3, 0);
  westWall.castShadow = true;
  westWall.receiveShadow = true;
  facadeGroup.add(westWall);

  // North Rear Wall (Z = -6)
  const rearWallGeo = new THREE.BoxGeometry(18, 6.8, 0.3);
  const rearWall = new THREE.Mesh(rearWallGeo, materials.interiorDarkWallMat);
  rearWall.position.set(0, 4.3, -6.0);
  rearWall.castShadow = true;
  rearWall.receiveShadow = true;
  facadeGroup.add(rearWall);

  parts.push({
    mesh: facadeGroup,
    initialY: 0,
    data: {
      id: 'rainscreen_facade',
      name: 'Rainscreen Ventilated Architectural Cladding Wall',
      phaseId: 4,
      category: 'CurtainWall',
      materialName: 'Fiber-Reinforced Concrete & Mineral Wool Thermal Insulation',
      dimensions: '300mm composite build-up (150mm insulation + air cavity + skin)',
      structuralRole: 'High-performance thermal acoustic building envelope shielding structure from prevailing westerly winds.',
      specifications: [
        'Fire reaction classification: Class A1 non-combustible',
        'Continuous exterior mineral wool insulation eliminating thermal bridges',
        'Concealed mechanical undercut anchor fixation'
      ],
      volumeM3: 42.0,
      weightTons: 38.5,
      carbonFootprintKg: 12400,
      explodeVector: new THREE.Vector3(-7.5, 1.0, -5.5),
    }
  });

  // 3. Timber Louver Brise-Soleil (Solar Screen)
  const louverGroup = new THREE.Group();
  const slatCount = 14;
  const slatGeo = new THREE.BoxGeometry(0.18, 0.04, 3.2);

  for (let i = 0; i < slatCount; i++) {
    const slat = new THREE.Mesh(slatGeo, materials.woodMat);
    slat.position.set(8.5 + (i % 2) * 0.1, 4.5 + i * 0.18, 6.3);
    slat.rotation.x = 0.25; // Angled shading
    slat.castShadow = true;
    louverGroup.add(slat);
  }

  parts.push({
    mesh: louverGroup,
    initialY: 0,
    data: {
      id: 'timber_louvers',
      name: 'Motorized Western Red Cedar Brise-Soleil Louvers',
      phaseId: 4,
      category: 'CurtainWall',
      materialName: 'Sustainably Harvested FSC-Certified Western Red Cedar',
      dimensions: '180mm aerofoil timber slats with concealed pivot axes',
      structuralRole: 'Passive architectural solar control reducing summer peak cooling loads by up to 45%.',
      specifications: [
        'Natural rot, decay, and insect resistance',
        'Custom sun-tracking solar actuator linkage',
        'Marine-grade 316 stainless steel hardware'
      ],
      volumeM3: 1.5,
      weightTons: 0.9,
      carbonFootprintKg: -450, // Carbon negative timber!
      explodeVector: new THREE.Vector3(5.0, 1.0, 8.0),
    }
  });

  return parts;
}
