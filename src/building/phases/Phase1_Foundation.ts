import * as THREE from 'three';
import { BuildingComponentData } from '../../types';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from './Phase0_SiteTerrain';

export function buildPhase1(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // Footing grid coordinates: 4 along X (-9, -3, 3, 9) and 3 along Z (-6, 0, 6)
  const xCoords = [-9, -3, 3, 9];
  const zCoords = [-6, 0, 6];

  // 1. Concrete Pad Footings
  const footingGroup = new THREE.Group();
  const footingGeo = new THREE.BoxGeometry(1.6, 0.6, 1.6);

  xCoords.forEach(x => {
    zCoords.forEach(z => {
      const footing = new THREE.Mesh(footingGeo, materials.concreteMat);
      footing.position.set(x, 0.45, z);
      footing.castShadow = true;
      footing.receiveShadow = true;
      footingGroup.add(footing);

      // 4 anchor bolts on top of each footing
      const boltGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8);
      const boltOffsets = [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]];
      boltOffsets.forEach(([bx, bz]) => {
        const bolt = new THREE.Mesh(boltGeo, materials.steelMat);
        bolt.position.set(x + bx, 0.85, z + bz);
        footingGroup.add(bolt);
      });
    });
  });

  parts.push({
    mesh: footingGroup,
    initialY: 0,
    data: {
      id: 'foundation_pads',
      name: 'Reinforced Concrete Isolated Pad Footings (x12)',
      phaseId: 1,
      category: 'Foundation',
      materialName: 'C35/45 High-Strength Structural Concrete',
      dimensions: '1.6m × 1.6m × 0.6m each (12 units)',
      structuralRole: 'Transfers axial vertical loads and lateral shear moments from structural columns directly to load-bearing stratum.',
      specifications: [
        'Design compressive capacity: 45 MPa',
        'Dual-layer B500B high-yield rebar mat (#20 @ 150mm c/c)',
        '4x M24 Grade 8.8 galvanized anchor bolts per column base'
      ],
      volumeM3: 18.4,
      weightTons: 44.2,
      carbonFootprintKg: 4600,
      explodeVector: new THREE.Vector3(0, -5.0, 0),
    }
  });

  // 2. Continuous Grade Beams / Tie Beams
  const gradeBeamGroup = new THREE.Group();
  const beamWidth = 0.4;
  const beamHeight = 0.5;

  // Longitudinal tie beams along X
  zCoords.forEach(z => {
    const xBeamGeo = new THREE.BoxGeometry(18, beamHeight, beamWidth);
    const beam = new THREE.Mesh(xBeamGeo, materials.darkConcreteMat);
    beam.position.set(0, 0.45, z);
    beam.castShadow = true;
    beam.receiveShadow = true;
    gradeBeamGroup.add(beam);
  });

  // Transverse tie beams along Z
  xCoords.forEach(x => {
    const zBeamGeo = new THREE.BoxGeometry(beamWidth, beamHeight, 12);
    const beam = new THREE.Mesh(zBeamGeo, materials.darkConcreteMat);
    beam.position.set(x, 0.45, 0);
    beam.castShadow = true;
    beam.receiveShadow = true;
    gradeBeamGroup.add(beam);
  });

  parts.push({
    mesh: gradeBeamGroup,
    initialY: 0,
    data: {
      id: 'foundation_tie_beams',
      name: 'Continuous Perimeter & Intermediate Grade Beams',
      phaseId: 1,
      category: 'Foundation',
      materialName: 'Post-Tensioned Reinforced Concrete C35',
      dimensions: '400mm width × 500mm depth interconnected network',
      structuralRole: 'Restrains differential settlement, resists seismic lateral forces, and ties footings into a monolithic rigid diaphragm.',
      specifications: [
        'Longitudinal reinforcement: 6T20 top & bottom',
        'Closed link stirrups: T10 @ 100mm near supports',
        'Integrated subterranean utility penetrations'
      ],
      volumeM3: 15.6,
      weightTons: 37.4,
      carbonFootprintKg: 3900,
      explodeVector: new THREE.Vector3(0, -3.5, 0),
    }
  });

  // 3. Sub-base Waterproofing Membrane
  const membraneGeo = new THREE.BoxGeometry(20, 0.05, 14);
  const membraneMesh = new THREE.Mesh(membraneGeo, materials.foilWaterproofingMat);
  membraneMesh.position.set(0, 0.72, 0);
  membraneMesh.receiveShadow = true;

  parts.push({
    mesh: membraneMesh,
    initialY: membraneMesh.position.y,
    data: {
      id: 'foundation_membrane',
      name: 'Self-Adhered SBS Bituminous Waterproofing Membrane',
      phaseId: 1,
      category: 'Foundation',
      materialName: 'Modified Bitumen with Cross-Laminated HDPE Core',
      dimensions: '20.0m × 14.0m × 4mm thickness',
      structuralRole: 'Complete moisture and radon barrier preventing subterranean water ingress into ground floor structure.',
      specifications: [
        'Hydrostatic head resistance up to 70m',
        'Self-healing elastomeric formulation',
        '100mm thermally welded laps'
      ],
      volumeM3: 1.1,
      weightTons: 1.3,
      carbonFootprintKg: 280,
      explodeVector: new THREE.Vector3(0, -1.5, 0),
    }
  });

  return parts;
}
