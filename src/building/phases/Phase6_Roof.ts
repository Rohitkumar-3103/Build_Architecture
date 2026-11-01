import * as THREE from 'three';
import { BuildingComponentData } from '../../types';
import { MaterialManager } from '../../engine/MaterialManager';
import { PhasePart } from './Phase0_SiteTerrain';

export function buildPhase6(materials: MaterialManager): PhasePart[] {
  const parts: PhasePart[] = [];

  // 1. Oversailing Cantilevered Roof Slab
  const roofSlabGeo = new THREE.BoxGeometry(26.0, 0.3, 16.5);
  const roofSlab = new THREE.Mesh(roofSlabGeo, materials.concreteMat);
  roofSlab.position.set(1.5, 7.6, 0);
  roofSlab.castShadow = true;
  roofSlab.receiveShadow = true;

  // Thin architectural fascia rim around the roof
  const fasciaGeo = new THREE.BoxGeometry(26.2, 0.35, 16.7);
  const fasciaMat = materials.steelMat;
  const fascia = new THREE.Mesh(fasciaGeo, fasciaMat);
  fascia.position.set(1.5, 7.6, 0);
  // We can add a cut or place roof slab inside

  parts.push({
    mesh: roofSlab,
    initialY: roofSlab.position.y,
    data: {
      id: 'cantilever_roof',
      name: 'Oversailing Cantilevered Post-Tensioned Roof Canopy',
      phaseId: 6,
      category: 'Roof',
      materialName: 'Lightweight Aggregate Structural Concrete C35',
      dimensions: '26.0m × 16.5m × 0.3m with 2.5m floating perimeter eaves',
      structuralRole: 'Primary meteorological protection, solar shading canopy, and structural platform for rooftop solar energy generation.',
      specifications: [
        'Integrated 1:80 falls towards concealed rainwater outlets',
        '200mm polyisocyanurate (PIR) rigid thermal insulation',
        'TPO single-ply reflective cool-roof waterproofing membrane'
      ],
      volumeM3: 128.7,
      weightTons: 257.4,
      carbonFootprintKg: 28314,
      explodeVector: new THREE.Vector3(0, 10.0, 0),
    }
  });

  // 2. Rooftop Decking & Glass Perimeter Parapet
  const deckGroup = new THREE.Group();

  const deckGeo = new THREE.BoxGeometry(14.0, 0.05, 8.0);
  const deck = new THREE.Mesh(deckGeo, materials.woodMat);
  deck.position.set(-1.0, 7.8, 0);
  deck.receiveShadow = true;
  deckGroup.add(deck);

  // Frameless Glass Balustrade on Roof Terrace
  const glassParapetGeo = new THREE.BoxGeometry(14.0, 1.1, 0.04);
  const glassParapet = new THREE.Mesh(glassParapetGeo, materials.glassMat);
  glassParapet.position.set(-1.0, 8.35, 4.0);
  deckGroup.add(glassParapet);

  const glassParapetRearGeo = new THREE.BoxGeometry(14.0, 1.1, 0.04);
  const glassParapetRear = new THREE.Mesh(glassParapetRearGeo, materials.glassMat);
  glassParapetRear.position.set(-1.0, 8.35, -4.0);
  deckGroup.add(glassParapetRear);

  parts.push({
    mesh: deckGroup,
    initialY: 0,
    data: {
      id: 'roof_terrace_deck',
      name: 'Rooftop Lounge Terrace & Frameless Glass Balustrade',
      phaseId: 6,
      category: 'Roof',
      materialName: 'Thermally Modified Ash Decking & 21.5mm Structural Glass',
      dimensions: '112m² outdoor sky terrace with panoramic 360° views',
      structuralRole: 'Recreational rooftop observation zone with 1.1m safety guardrails capable of withstanding 1.5 kN/m crowd load.',
      specifications: [
        'Adjustable pedestal support system with concealed drainage',
        '21.52mm SentryGlas ionoplast laminated safety glass',
        'Continuous concealed floor channel base shoe fixation'
      ],
      volumeM3: 4.2,
      weightTons: 3.8,
      carbonFootprintKg: 620,
      explodeVector: new THREE.Vector3(0, 12.0, 0),
    }
  });

  // 3. Solar Photovoltaic Panels & Architectural Skylight
  const solarGroup = new THREE.Group();

  // 8 High-Efficiency Solar PV Panels
  const panelGeo = new THREE.BoxGeometry(2.0, 0.05, 1.2);
  const panelPositions = [
    [7.0, 8.0, -3.5], [9.3, 8.0, -3.5], [11.6, 8.0, -3.5],
    [7.0, 8.0, -1.8], [9.3, 8.0, -1.8], [11.6, 8.0, -1.8],
    [7.0, 8.0, -0.1], [9.3, 8.0, -0.1]
  ];

  panelPositions.forEach(([px, py, pz]) => {
    const panel = new THREE.Mesh(panelGeo, materials.solarPanelMat);
    panel.position.set(px, py, pz);
    panel.rotation.x = -0.18; // 10° southern tilt for optimal solar harvest
    panel.castShadow = true;
    solarGroup.add(panel);
  });

  // Architectural Atrium Skylight (above staircase)
  const skylightGeo = new THREE.BoxGeometry(3.2, 0.2, 2.4);
  const skylight = new THREE.Mesh(skylightGeo, materials.glassMat);
  skylight.position.set(-1.2, 7.85, 0);
  solarGroup.add(skylight);

  parts.push({
    mesh: solarGroup,
    initialY: 0,
    data: {
      id: 'solar_pv_skylight',
      name: 'Monocrystalline Solar PV Array & Flush Glass Skylight',
      phaseId: 6,
      category: 'Roof',
      materialName: 'N-Type TOPCon 450W Bifacial Solar Modules & Walk-on Skylight Glass',
      dimensions: '8x 450W photovoltaic modules (3.6 kWp DC capacity) + 7.6m² atrium skylight',
      structuralRole: 'On-site zero-emission microgeneration producing ~5,800 kWh/year, achieving net-zero operational energy.',
      specifications: [
        'Module efficiency: 22.8% with 30-year linear performance warranty',
        'Triple-glazed solar control skylight with self-cleaning titanium dioxide coating',
        'Enphase IQ8 microinverters with grid-forming backup capability'
      ],
      volumeM3: 1.8,
      weightTons: 1.2,
      carbonFootprintKg: -3400, // Displaces grid CO2
      explodeVector: new THREE.Vector3(2.5, 14.0, 0),
    }
  });

  return parts;
}
