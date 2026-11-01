import * as THREE from 'three';
import { BuildingComponentData } from '../types';
import { BuildingModel } from '../building/BuildingModel';

export class RaycastPicker {
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private camera: THREE.Camera;
  private buildingModel: BuildingModel;
  private hoveredPart: BuildingComponentData | null = null;
  private selectedPart: BuildingComponentData | null = null;

  // Highlight outline or emissive marker
  private highlightBox: THREE.BoxHelper;

  constructor(camera: THREE.Camera, scene: THREE.Scene, buildingModel: BuildingModel) {
    this.camera = camera;
    this.buildingModel = buildingModel;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-9999, -9999);

    // Cyan wireframe highlight bounding box for selected item
    this.highlightBox = new THREE.BoxHelper(new THREE.Mesh(), 0x00f3ff);
    this.highlightBox.visible = false;
    scene.add(this.highlightBox);
  }

  public setCamera(camera: THREE.Camera) {
    this.camera = camera;
  }

  public onPointerMove(event: PointerEvent, canvas: HTMLCanvasElement): BuildingComponentData | null {
    const rect = canvas.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.buildingModel.group.children, true);

    if (intersects.length > 0) {
      let hitObj: THREE.Object3D | null = intersects[0].object;
      while (hitObj && !hitObj.userData?.componentData && hitObj.parent !== this.buildingModel.group) {
        hitObj = hitObj.parent;
      }

      if (hitObj && hitObj.userData?.componentData) {
        this.hoveredPart = hitObj.userData.componentData;
        return this.hoveredPart;
      }
    }

    this.hoveredPart = null;
    return null;
  }

  public onClick(): BuildingComponentData | null {
    if (this.hoveredPart) {
      this.selectedPart = this.hoveredPart;
      const mesh = this.buildingModel.getPartMesh(this.selectedPart.id);
      if (mesh) {
        this.highlightBox.setFromObject(mesh);
        this.highlightBox.visible = true;
      }
      return this.selectedPart;
    } else {
      this.selectedPart = null;
      this.highlightBox.visible = false;
      return null;
    }
  }

  public selectById(id: string | null) {
    if (!id) {
      this.selectedPart = null;
      this.highlightBox.visible = false;
      return;
    }
    const data = this.buildingModel.getComponentById(id);
    if (data) {
      this.selectedPart = data;
      const mesh = this.buildingModel.getPartMesh(id);
      if (mesh) {
        this.highlightBox.setFromObject(mesh);
        this.highlightBox.visible = true;
      }
    }
  }

  public update() {
    if (this.selectedPart && this.highlightBox.visible) {
      const mesh = this.buildingModel.getPartMesh(this.selectedPart.id);
      if (mesh) {
        this.highlightBox.update();
      }
    }
  }
}
