import * as THREE from 'three';

export type RenderMode = 'realistic' | 'blueprint' | 'clay';

export type CameraPreset = 'isometric' | 'front' | 'top' | 'pedestrian' | 'perspective';

export type BuildMode = 'step' | 'assembled';

export interface ConstructionPhase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  durationSeconds: number;
  tradeSpecialty: string;
  safetyProtocol: string;
  toolsRequired?: string[];
  materialsRequired?: string[];
  daysEstimate?: number;
}

export interface BuildingComponentData {
  id: string;
  name: string;
  phaseId: number;
  category: 'Terrain' | 'Foundation' | 'Structure' | 'Slabs' | 'CurtainWall' | 'Interior' | 'Roof' | 'Finishes';
  materialName: string;
  dimensions: string;
  structuralRole: string;
  specifications: string[];
  volumeM3?: number;
  weightTons?: number;
  carbonFootprintKg?: number;
  // Exploded view offset direction and magnitude
  explodeVector: THREE.Vector3;
  anchorPoint?: THREE.Vector3;
}

export interface CalloutAnnotation {
  id: string;
  componentId: string;
  phaseId: number;
  label: string;
  sublabel: string;
  tag: string;
  worldPosition: THREE.Vector3;
  offsetSide?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface CalloutScreenPos {
  annotation: CalloutAnnotation;
  screenX: number;
  screenY: number;
  badgeX: number;
  badgeY: number;
  elbowX: number;
  elbowY: number;
  visible: boolean;
}

export interface ProjectMetrics {
  totalConcreteM3: number;
  totalSteelTons: number;
  glassAreaM2: number;
  grossFloorAreaM2: number;
  estimatedBudgetUsd: number;
  totalPhases: number;
  co2EmissionsOffsetTons: number;
}
