import * as THREE from 'three';
import { CameraPreset } from '../types';

export class CameraAnimator {
  private camera: THREE.Camera;
  private target: THREE.Vector3;
  private currentTarget: THREE.Vector3;
  private desiredPosition: THREE.Vector3;
  private desiredTarget: THREE.Vector3;
  private isTransitioning: boolean = false;
  private transitionSpeed: number = 0.06;

  // Model bounding telemetry
  private center: THREE.Vector3 = new THREE.Vector3(0, 4, 0);
  private modelRadius: number = 24;

  // Auto orbit
  public isCinematicOrbit: boolean = false;
  private orbitAngle: number = 0;
  private orbitRadius: number = 42;
  private orbitHeight: number = 20;

  constructor(camera: THREE.Camera, initialTarget: THREE.Vector3 = new THREE.Vector3(0, 4, 0)) {
    this.camera = camera;
    this.target = initialTarget.clone();
    this.currentTarget = initialTarget.clone();
    this.desiredPosition = camera.position.clone();
    this.desiredTarget = initialTarget.clone();
  }

  public setCamera(camera: THREE.Camera) {
    this.camera = camera;
  }

  public setModelBounds(center: THREE.Vector3, radius: number) {
    this.center.copy(center);
    this.modelRadius = Math.max(14, radius);
    this.orbitRadius = this.modelRadius * 1.6;
    this.orbitHeight = center.y + this.modelRadius * 0.45;
    this.desiredTarget.copy(center);
    this.currentTarget.copy(center);
  }

  public setPreset(preset: CameraPreset) {
    this.isCinematicOrbit = false;
    this.isTransitioning = true;
    this.desiredTarget.copy(this.center);

    const r = this.modelRadius;
    const cx = this.center.x;
    const cy = this.center.y;
    const cz = this.center.z;

    switch (preset) {
      case 'isometric':
        this.desiredPosition.set(cx + r * 1.15, cy + r * 0.85, cz + r * 1.15);
        break;
      case 'front':
        this.desiredPosition.set(cx, cy + r * 0.15, cz + r * 1.65);
        break;
      case 'top':
        this.desiredPosition.set(cx + 0.1, cy + r * 2.2, cz + 0.1);
        break;
      case 'pedestrian':
        this.desiredPosition.set(cx + r * 0.65, 1.8, cz + r * 0.85);
        this.desiredTarget.set(cx, cy + 1.5, cz);
        break;
      case 'perspective':
        this.desiredPosition.set(cx - r * 1.1, cy + r * 0.7, cz + r * 1.05);
        break;
    }
  }

  public toggleCinematicOrbit(): boolean {
    this.isCinematicOrbit = !this.isCinematicOrbit;
    if (this.isCinematicOrbit) {
      this.orbitAngle = Math.atan2(this.camera.position.z - this.center.z, this.camera.position.x - this.center.x);
    }
    return this.isCinematicOrbit;
  }

  public update(delta: number): boolean {
    if (this.isCinematicOrbit) {
      this.orbitAngle += delta * 0.15; // Slow smooth orbit
      this.camera.position.x = this.center.x + Math.cos(this.orbitAngle) * this.orbitRadius;
      this.camera.position.z = this.center.z + Math.sin(this.orbitAngle) * this.orbitRadius;
      this.camera.position.y = this.orbitHeight + Math.sin(this.orbitAngle * 0.5) * (this.modelRadius * 0.12);
      this.camera.lookAt(this.center.x, this.center.y, this.center.z);
      return true;
    }

    if (this.isTransitioning) {
      this.camera.position.lerp(this.desiredPosition, this.transitionSpeed);
      this.currentTarget.lerp(this.desiredTarget, this.transitionSpeed);
      this.camera.lookAt(this.currentTarget);

      if (this.camera.position.distanceTo(this.desiredPosition) < 0.1 &&
          this.currentTarget.distanceTo(this.desiredTarget) < 0.1) {
        this.camera.position.copy(this.desiredPosition);
        this.currentTarget.copy(this.desiredTarget);
        this.isTransitioning = false;
      }
      return true;
    }

    return false;
  }

  public getTarget(): THREE.Vector3 {
    return this.currentTarget;
  }
}
