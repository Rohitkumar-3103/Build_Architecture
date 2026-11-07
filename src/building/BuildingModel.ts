import * as THREE from 'three';
import { ConstructionPhase, BuildingComponentData, RenderMode } from '../types';
import { MaterialManager } from '../engine/MaterialManager';
import { PhasePart, buildPhase0 } from './phases/Phase0_SiteTerrain';
import { buildPhase1 } from './phases/Phase1_Foundation';
import { buildPhase2 } from './phases/Phase2_Structure';
import { buildPhase3 } from './phases/Phase3_SlabsCore';
import { buildPhase4 } from './phases/Phase4_CurtainWall';
import { buildPhase5 } from './phases/Phase5_Interior';
import { buildPhase6 } from './phases/Phase6_Roof';
import { buildPhase7 } from './phases/Phase7_Finishes';

export const PHASES: ConstructionPhase[] = [
  {
    id: 0,
    title: 'Site Prep & Excavation',
    subtitle: 'Groundwork & Survey Benchmarks',
    description: 'Geotechnical laser excavation, grading to sub-base level, mass concrete blinding mud slab, and GNSS satellite layout markers.',
    badge: 'PHASE 01 // SUBTERRANEAN',
    durationSeconds: 6,
    tradeSpecialty: 'Civil & Geotechnical Engineering',
    safetyProtocol: 'Excavation shoring, trench collapse prevention, PPE Class 3',
    toolsRequired: ['Laser Theodolite', 'Hydraulic Excavator', 'Plate Compactor', 'Total Station'],
    materialsRequired: ['Geotextile Membrane', 'Crushed Stone Aggregate', 'Mud Slab Blinding Concrete'],
    daysEstimate: 12
  },
  {
    id: 1,
    title: 'Substructure & Foundation',
    subtitle: 'Pads, Grade Beams & Waterproofing',
    description: 'High-strength C35 concrete pad footings, continuous monolithic grade beams, anchor bolt assemblies, and high-performance waterproofing tanking.',
    badge: 'PHASE 02 // SUBSTRUCTURE',
    durationSeconds: 7,
    tradeSpecialty: 'Structural Concrete & Waterproofing',
    safetyProtocol: 'Rebar cap guards, confined space monitoring, slump test QC',
    toolsRequired: ['Transit Mixer', 'Concrete Boom Pump', 'Rebar Tier', 'High-Frequency Vibrator'],
    materialsRequired: ['C35/45 Concrete', 'B500B High-Tensile Rebar', 'Bentonite Waterproof Membrane'],
    daysEstimate: 18
  },
  {
    id: 2,
    title: 'Structural Steel Skeleton',
    subtitle: 'W-Columns, Girders & Tension Ties',
    description: 'Erection of W14x90 structural steel H-columns, cantilevered floor girders, roof framing, and cross-diagonal seismic tension braces.',
    badge: 'PHASE 03 // SUPERSTRUCTURE',
    durationSeconds: 8,
    tradeSpecialty: 'Rigging & Structural Steel Fabrication',
    safetyProtocol: 'Crane exclusion perimeter, 100% tie-off fall arrest harness',
    toolsRequired: ['50T Mobile Crane', 'Torque Multiplier', 'Magnetic Drill Press', 'Rigging Slings'],
    materialsRequired: ['W14x90 Steel Columns', 'A992 Flange Girders', 'High-Strength A490 Bolts'],
    daysEstimate: 21
  },
  {
    id: 3,
    title: 'Composite Slabs & Core',
    subtitle: 'Ground Slab, Cantilever Deck & Stairs',
    description: 'Pouring monolithic ground slab, post-tensioned cantilevered upper floor deck, slip-formed shear utility core, and floating steel-spine stairs.',
    badge: 'PHASE 04 // SLABS & CIRCULATION',
    durationSeconds: 8,
    tradeSpecialty: 'Post-Tensioning & Concrete Forming',
    safetyProtocol: 'Post-tensioning exclusion zones, edge barrier protection',
    toolsRequired: ['Hydraulic Tension Jack', 'Laser Screed', 'Power Trowel', 'Edge Shoring'],
    materialsRequired: ['Post-Tension Tendons', 'Composite Steel Decking', 'Vapor Retarder'],
    daysEstimate: 16
  },
  {
    id: 4,
    title: 'Envelope & Curtain Wall',
    subtitle: 'Triple Glazing, Rainscreen & Louvers',
    description: 'Installation of floor-to-ceiling thermal break curtain walls, acoustic low-E glass panels, rainscreen cladding, and cedar brise-soleil louvers.',
    badge: 'PHASE 05 // FACADE & ENVELOPE',
    durationSeconds: 8,
    tradeSpecialty: 'Glazing & Architectural Cladding',
    safetyProtocol: 'Suction vacuum cup hoisting, wind threshold limits < 20 knots',
    toolsRequired: ['Dual-Circuit Vacuum Lifter', 'Boom Lift', 'Glazing Pneumatic Gun'],
    materialsRequired: ['Triple Low-E Glass Units', 'Anodized Aluminum Mullions', 'Structural Silicone'],
    daysEstimate: 24
  },
  {
    id: 5,
    title: 'Interior Architecture',
    subtitle: 'Hardwood, Partitions & Joinery',
    description: 'White oak engineered wide-plank flooring, acoustic drywall zoning, bespoke Italian minimalist furniture, marble kitchen island, and master suite.',
    badge: 'PHASE 06 // INTERIOR ARCHITECTURE',
    durationSeconds: 8,
    tradeSpecialty: 'Architectural Joinery & Fit-out',
    safetyProtocol: 'Dust extraction filtration, low VOC chemical monitoring',
    toolsRequired: ['Track Saw', 'Dust-Free Sanding System', 'Pneumatic Pin Nailer'],
    materialsRequired: ['European White Oak Planks', 'Calacatta Marble Island', 'Acoustic Rockwool'],
    daysEstimate: 28
  },
  {
    id: 6,
    title: 'Roof Structure & Energy',
    subtitle: 'Cantilever Canopy, Terrace & Solar PV',
    description: 'Oversailing concrete roof canopy with seamless PIR insulation, outdoor sky terrace decking, 3.6 kWp solar photovoltaic array, and atrium skylight.',
    badge: 'PHASE 07 // ROOF & SUSTAINABILITY',
    durationSeconds: 7,
    tradeSpecialty: 'Roofing, Waterproofing & Solar PV',
    safetyProtocol: 'Roof edge static lifeline system, electrical isolation QC',
    toolsRequired: ['Hot-Air Welder', 'MC4 Solar Crimper', 'Insulation Anchor Gun'],
    materialsRequired: ['Tapered PIR Insulation', 'EPDM Membrane', '400W Monocrystalline PV'],
    daysEstimate: 14
  },
  {
    id: 7,
    title: 'Finishes, Pool & Landscape',
    subtitle: 'Infinity Pool, Specimen Trees & Lighting',
    description: 'Basaltina infinity reflecting water pool, limestone pavers, drought-tolerant lawn, mature Japanese maples, and architectural 2700K LED illumination.',
    badge: 'PHASE 08 // EXTERIOR FINISHES',
    durationSeconds: 8,
    tradeSpecialty: 'Landscape Architecture & Aquatics',
    safetyProtocol: 'Water safety perimeter, IP68 underwater electrical verification',
    toolsRequired: ['Diamond Tile Saw', 'Submersible Pump', 'Landscape Dingo', 'Lighting Tester'],
    materialsRequired: ['Basaltina Volcanic Stone', 'Limestone Floating Pavers', 'Specimen Japanese Maples'],
    daysEstimate: 15
  }
];

export class BuildingModel {
  public group: THREE.Group;
  public parts: PhasePart[] = [];
  private materials: MaterialManager;

  // Stored base positions for exploded view
  private basePositions: Map<THREE.Object3D, THREE.Vector3> = new Map();
  private baseRotations: Map<THREE.Object3D, THREE.Euler> = new Map();

  // Animation states
  private currentProgress: number = 0; // 0.0 to 7.0
  private explodeAmount: number = 0; // 0.0 to 1.0

  constructor(materials: MaterialManager) {
    this.materials = materials;
    this.group = new THREE.Group();
    this.group.name = 'BuildingRoot';

    this.initializeGeometry();
  }

  private initializeGeometry() {
    // Generate all 8 phases
    const phase0Parts = buildPhase0(this.materials);
    const phase1Parts = buildPhase1(this.materials);
    const phase2Parts = buildPhase2(this.materials);
    const phase3Parts = buildPhase3(this.materials);
    const phase4Parts = buildPhase4(this.materials);
    const phase5Parts = buildPhase5(this.materials);
    const phase6Parts = buildPhase6(this.materials);
    const phase7Parts = buildPhase7(this.materials);

    this.parts = [
      ...phase0Parts,
      ...phase1Parts,
      ...phase2Parts,
      ...phase3Parts,
      ...phase4Parts,
      ...phase5Parts,
      ...phase6Parts,
      ...phase7Parts
    ];

    // Add to group and store original positions
    this.parts.forEach(part => {
      this.group.add(part.mesh);
      this.basePositions.set(part.mesh, part.mesh.position.clone());
      this.baseRotations.set(part.mesh, part.mesh.rotation.clone());

      // Store metadata on the object for raycasting
      part.mesh.userData = {
        componentData: part.data
      };
      part.mesh.traverse(child => {
        child.userData = {
          componentData: part.data
        };
      });
    });

    // Initial update to fully assembled
    this.updateProgress(7);
  }

  public loadProduct(parts: PhasePart[]) {
    // Remove existing parts from group
    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0]);
    }
    this.parts = [];
    this.basePositions.clear();
    this.baseRotations.clear();

    this.parts = parts;

    // Add to group and store original positions
    this.parts.forEach(part => {
      this.group.add(part.mesh);
      this.basePositions.set(part.mesh, part.mesh.position.clone());
      this.baseRotations.set(part.mesh, part.mesh.rotation.clone());

      part.mesh.userData = {
        componentData: part.data
      };
      part.mesh.traverse(child => {
        child.userData = {
          componentData: part.data
        };
      });
    });

    this.setRenderMode(this.materials.getRenderMode());
    this.updateProgress(this.currentProgress);
  }

  public setRenderMode(mode: RenderMode) {
    this.materials.setRenderMode(mode);

    // Apply materials recursively based on mode
    this.parts.forEach(part => {
      part.mesh.traverse(node => {
        if (node instanceof THREE.Mesh) {
          const original = node.userData.originalMaterial || node.material;
          if (!node.userData.originalMaterial) {
            node.userData.originalMaterial = original;
          }

          if (mode === 'blueprint') {
            if (part.data.category === 'CurtainWall' || part.data.id === 'infinity_pool') {
              node.material = this.materials.blueprintGlassMat;
            } else {
              node.material = this.materials.blueprintSolidMat;
            }
          } else if (mode === 'clay') {
            if (part.data.category === 'CurtainWall' || part.data.id === 'infinity_pool') {
              node.material = this.materials.clayGlassMat;
            } else {
              node.material = this.materials.clayMat;
            }
          } else {
            // Realistic PBR
            node.material = node.userData.originalMaterial;
          }
        }
      });
    });
  }

  public setExplodeAmount(amount: number) {
    this.explodeAmount = Math.max(0, Math.min(1, amount));
    this.applyTransformations();
  }

  public updateProgress(progress: number) {
    this.currentProgress = Math.max(0, Math.min(7, progress));
    this.applyTransformations();
  }

  private applyTransformations() {
    // Pre-calculate component count and order per phase for fluid sequential micro-staggering
    const phasePartCounts = new Map<number, number>();
    const phasePartIndices = new Map<PhasePart, number>();

    this.parts.forEach(part => {
      const pId = part.data.phaseId;
      const count = phasePartCounts.get(pId) || 0;
      phasePartIndices.set(part, count);
      phasePartCounts.set(pId, count + 1);
    });

    this.parts.forEach(part => {
      const pId = part.data.phaseId;
      const basePos = this.basePositions.get(part.mesh)!;
      const explodeOffset = part.data.explodeVector.clone().multiplyScalar(this.explodeAmount);

      if (pId === 0) {
        // Phase 0 (Site Prep, Earth Excavation & Markers) is the foundation base: always visible
        part.mesh.visible = true;
        part.mesh.scale.set(1, 1, 1);
        part.mesh.position.copy(basePos).add(explodeOffset);
        return;
      }

      // For Phases 1 through 7:
      const startProgress = pId - 1;
      const endProgress = pId;

      // If user has activated Exploded View expansion (> 0.5%):
      // Expand and reveal all construction phases in 3D disassembled space
      if (this.explodeAmount > 0.005) {
        part.mesh.visible = true;
        const isFuturePhase = this.currentProgress < endProgress;
        const scaleVal = isFuturePhase ? Math.min(1.0, this.explodeAmount * 10) : 1.0;
        part.mesh.scale.set(scaleVal, scaleVal, scaleVal);
        part.mesh.position.copy(basePos).add(explodeOffset);
        return;
      }

      // Phase 1 animates in over progress range [0, 1]
      // Phase 2 animates in over progress range [1, 2]
      // Phase k animates in over progress range [k - 1, k]

      if (this.currentProgress <= startProgress) {
        // Future phase: completely hidden
        part.mesh.visible = false;
        part.mesh.position.copy(basePos);
        part.mesh.scale.set(0.001, 0.001, 0.001);
      } else if (this.currentProgress >= endProgress) {
        // Fully completed phase: locked rigidly into CAD coordinates
        part.mesh.visible = true;
        part.mesh.scale.set(1, 1, 1);
        part.mesh.position.copy(basePos).add(explodeOffset);
      } else {
        // Actively assembling in range [startProgress, endProgress]
        const rawFraction = (this.currentProgress - startProgress) / (endProgress - startProgress);

        // Sequence components within this phase across a smooth wave
        const partIdx = phasePartIndices.get(part) || 0;
        const totalInPhase = Math.max(1, phasePartCounts.get(pId) || 1);
        // Stagger factor up to 0.32 so parts flow in sequentially but all land before phase completion
        const staggerFactor = totalInPhase > 1 ? 0.32 : 0;
        const partNormalizedOffset = (partIdx / totalInPhase) * staggerFactor;
        const fraction = Math.max(0, Math.min(1, (rawFraction - partNormalizedOffset) / (1 - staggerFactor)));

        if (fraction <= 0) {
          part.mesh.visible = false;
          part.mesh.position.copy(basePos);
          part.mesh.scale.set(0.001, 0.001, 0.001);
          return;
        }

        part.mesh.visible = true;

        // Kinematic physical trajectory tailored to architectural component typology:
        const cat = part.data.category;
        const assemblyOffset = new THREE.Vector3();
        let scaleX = 1;
        let scaleY = 1;
        let scaleZ = 1;

        if (cat === 'Foundation') {
          // Foundation elements rise firmly from underground bedrock (-3.5m) and anchor into place
          const ease = 1 - Math.pow(1 - fraction, 3);
          assemblyOffset.set(0, -(1 - ease) * 3.5, 0);
          scaleX = Math.min(1, ease * 1.1);
          scaleY = ease;
          scaleZ = Math.min(1, ease * 1.1);
        } else if (cat === 'Structure') {
          // Structural steel / timber skeleton: erected with crane descent and cable sway damping
          const ease = 1 - Math.pow(1 - fraction, 3.2);
          const sway = Math.sin((1 - fraction) * Math.PI * 2.2) * (1 - fraction) * 0.15;
          assemblyOffset.set(sway, (1 - ease) * 6.5, sway);
          scaleX = Math.min(1, ease * 1.05);
          scaleY = ease;
          scaleZ = Math.min(1, ease * 1.05);
        } else if (cat === 'Slabs') {
          // Horizontal composite decks lowered flat from 4-point crane rigging
          const ease = 1 - Math.pow(1 - fraction, 3);
          const sway = Math.cos((1 - fraction) * Math.PI * 1.8) * (1 - fraction) * 0.1;
          assemblyOffset.set(sway, (1 - ease) * 5.2, 0);
          scaleX = ease;
          scaleY = Math.min(1, ease * 1.2);
          scaleZ = ease;
        } else if (cat === 'CurtainWall') {
          // Facade glass panels hoisted down & pulled inward from exterior perimeter
          const ease = 1 - Math.pow(1 - fraction, 3);
          const horizontalNorm = part.data.explodeVector.clone().normalize();
          horizontalNorm.y = 0;
          if (horizontalNorm.lengthSq() < 0.01) horizontalNorm.set(0, 0, 1);
          assemblyOffset.copy(horizontalNorm.multiplyScalar((1 - ease) * 2.6));
          assemblyOffset.y += (1 - ease) * 4.6;
          scaleX = ease;
          scaleY = ease;
          scaleZ = ease;
        } else if (cat === 'Roof') {
          // Roof trusses, canopies, standing seams and clerestory lanterns lower from high sky
          const ease = 1 - Math.pow(1 - fraction, 3);
          assemblyOffset.set(0, (1 - ease) * 8.0, 0);
          scaleX = ease;
          scaleY = ease;
          scaleZ = ease;
        } else if (cat === 'Finishes') {
          // Landscaping, living trees, vegetation, lighting & pools pop with organic spring bounce
          const c1 = 1.6;
          const c3 = c1 + 1;
          const bounce = 1 + c3 * Math.pow(fraction - 1, 3) + c1 * Math.pow(fraction - 1, 2);
          const ease = Math.max(0, bounce);
          assemblyOffset.set(0, (1 - Math.min(1, fraction)) * 1.8, 0);
          scaleX = ease;
          scaleY = ease;
          scaleZ = ease;
        } else {
          // Interior partitions, MEP risers, joinery and stairs
          const ease = 1 - Math.pow(1 - fraction, 3);
          assemblyOffset.set(0, (1 - ease) * 4.0, 0);
          scaleX = ease;
          scaleY = ease;
          scaleZ = ease;
        }

        part.mesh.position.copy(basePos).add(assemblyOffset).add(explodeOffset);
        part.mesh.scale.set(scaleX, scaleY, scaleZ);
      }
    });
  }

  public getComponentById(id: string): BuildingComponentData | undefined {
    const part = this.parts.find(p => p.data.id === id);
    return part ? part.data : undefined;
  }

  public getExplodedPosition(componentId: string, baseWorldPos: THREE.Vector3): THREE.Vector3 {
    const comp = this.getComponentById(componentId);
    if (!comp) return baseWorldPos.clone();
    const offset = comp.explodeVector.clone().multiplyScalar(this.explodeAmount);
    return baseWorldPos.clone().add(offset);
  }

  public getPartMesh(id: string): THREE.Object3D | undefined {
    const part = this.parts.find(p => p.data.id === id);
    return part ? part.mesh : undefined;
  }
}
