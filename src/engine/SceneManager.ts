import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MaterialManager } from './MaterialManager';
import { BuildingModel } from '../building/BuildingModel';
import { CameraAnimator } from './CameraAnimator';
import { RaycastPicker } from './RaycastPicker';
import { RenderMode, CameraPreset, BuildingComponentData } from '../types';

export class SceneManager {
  public scene: THREE.Scene;
  public camera: THREE.Camera;
  public perspectiveCamera: THREE.PerspectiveCamera;
  public orthoCamera: THREE.OrthographicCamera;
  public isOrthographic: boolean = false;
  private frustumSize: number = 34;

  public renderer: THREE.WebGLRenderer;
  public controls: OrbitControls;

  public materials: MaterialManager;
  public building: BuildingModel;
  public cameraAnimator: CameraAnimator;
  public picker: RaycastPicker;

  // Lighting
  private sunLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;
  private ambientLight: THREE.AmbientLight;
  private interiorLight1: THREE.PointLight;
  private interiorLight2: THREE.PointLight;
  private poolLight: THREE.SpotLight;

  private isNightMode: boolean = false;
  private animationFrameId: number | null = null;
  private clock: THREE.Clock;

  // Callbacks
  public onComponentHover: ((comp: BuildingComponentData | null) => void) | null = null;
  public onComponentSelect: ((comp: BuildingComponentData | null) => void) | null = null;
  public onRenderTick: (() => void) | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.clock = new THREE.Clock();

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdceaf8);
    this.scene.fog = new THREE.FogExp2(0xdceaf8, 0.007);

    // 2. Camera Setup (Dual Perspective & True Orthographic CAD)
    const aspect = canvas.clientWidth / canvas.clientHeight;
    this.perspectiveCamera = new THREE.PerspectiveCamera(42, aspect, 0.5, 300);
    this.perspectiveCamera.position.set(28, 20, 28);

    this.orthoCamera = new THREE.OrthographicCamera(
      (-this.frustumSize * aspect) / 2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      -this.frustumSize / 2,
      0.1,
      500
    );
    this.orthoCamera.position.copy(this.perspectiveCamera.position);
    this.camera = this.perspectiveCamera;

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // 4. Controls
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below ground plane
    this.controls.minDistance = 6;
    this.controls.maxDistance = 120;
    this.controls.target.set(1, 4, 0);

    // 5. Lighting Setup
    this.hemiLight = new THREE.HemisphereLight(0xddeeff, 0x1a2b3c, 0.85);
    this.scene.add(this.hemiLight);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    this.sunLight.position.set(25, 40, 20);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 10;
    this.sunLight.shadow.camera.far = 90;
    this.sunLight.shadow.camera.left = -25;
    this.sunLight.shadow.camera.right = 25;
    this.sunLight.shadow.camera.top = 25;
    this.sunLight.shadow.camera.bottom = -25;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    // Interior Warm Lights
    this.interiorLight1 = new THREE.PointLight(0xffa834, 1.8, 14);
    this.interiorLight1.position.set(2, 3, 2);
    this.scene.add(this.interiorLight1);

    this.interiorLight2 = new THREE.PointLight(0xffaa44, 2.0, 16);
    this.interiorLight2.position.set(5, 6, 0);
    this.scene.add(this.interiorLight2);

    // Pool Spotlight
    this.poolLight = new THREE.SpotLight(0x00f3ff, 2.5, 20, Math.PI / 4, 0.4);
    this.poolLight.position.set(7, 6, 8.5);
    this.poolLight.target.position.set(7, 0, 8.5);
    this.scene.add(this.poolLight);
    this.scene.add(this.poolLight.target);

    // Architectural Ground Shadow Receiver Plane
    const groundGeo = new THREE.PlaneGeometry(300, 300);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.05;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);

    // 6. Subsystems
    this.materials = new MaterialManager();
    this.building = new BuildingModel(this.materials);
    this.scene.add(this.building.group);

    this.cameraAnimator = new CameraAnimator(this.camera, this.controls.target);
    this.picker = new RaycastPicker(this.camera, this.scene, this.building);

    // 7. Event Listeners
    this.bindEvents(canvas);

    // 8. Start Loop
    this.startLoop();
  }

  private bindEvents(canvas: HTMLCanvasElement) {
    canvas.addEventListener('pointermove', (e) => {
      const hovered = this.picker.onPointerMove(e, canvas);
      if (this.onComponentHover) {
        this.onComponentHover(hovered);
      }
    });

    canvas.addEventListener('click', () => {
      const selected = this.picker.onClick();
      if (this.onComponentSelect) {
        this.onComponentSelect(selected);
      }
    });
  }

  public setRenderMode(mode: RenderMode) {
    this.building.setRenderMode(mode);
    if (mode === 'blueprint') {
      const bg = 0xdde7f2;
      this.scene.background = new THREE.Color(bg);
      this.scene.fog = new THREE.FogExp2(bg, 0.012);
      this.sunLight.intensity = 1.3;
      this.hemiLight.intensity = 0.95;
    } else if (mode === 'clay') {
      const bg = 0xebedf0;
      this.scene.background = new THREE.Color(bg);
      this.scene.fog = new THREE.FogExp2(bg, 0.008);
      this.sunLight.intensity = 2.4;
      this.hemiLight.intensity = 1.1;
    } else {
      // Realistic PBR (Daylight Architectural Sun)
      this.applyDaylightState();
    }
  }

  public toggleNightMode(_forceNight?: boolean): boolean {
    return false;
  }

  private applyDaylightState() {
    if (this.materials.getRenderMode() !== 'realistic') return;

    // Architectural Daylight Sun Mode
    this.scene.background = new THREE.Color(0xdceaf8);
    this.scene.fog = new THREE.FogExp2(0xdceaf8, 0.007);
    this.sunLight.color.setHex(0xfffaec);
    this.sunLight.intensity = 2.7;
    this.hemiLight.color.setHex(0xffffff);
    this.hemiLight.groundColor.setHex(0x94a3b8);
    this.hemiLight.intensity = 1.05;
    this.ambientLight.intensity = 0.55;
    this.interiorLight1.intensity = 0.8;
    this.interiorLight2.intensity = 1.0;
    this.poolLight.intensity = 1.5;
  }

  public fitModelBounds() {
    const box = new THREE.Box3().setFromObject(this.building.group);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    const radius = Math.max(size.x, size.y, size.z) / 2;

    this.controls.target.copy(center);
    this.cameraAnimator.setModelBounds(center, radius);

    // Update ortho frustum size to fit model cleanly
    this.frustumSize = Math.max(34, radius * 2.4);
    const aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
    this.updateOrthoFrustum(aspect);

    // Adjust shadow frustum to fit model
    this.sunLight.shadow.camera.left = -radius * 1.5;
    this.sunLight.shadow.camera.right = radius * 1.5;
    this.sunLight.shadow.camera.top = radius * 1.5;
    this.sunLight.shadow.camera.bottom = -radius * 1.5;
    this.sunLight.shadow.camera.updateProjectionMatrix();

    this.controls.update();
  }

  public setCameraPreset(preset: CameraPreset) {
    this.cameraAnimator.setPreset(preset);
  }

  public toggleCinematicOrbit(): boolean {
    return this.cameraAnimator.toggleCinematicOrbit();
  }

  public toggleOrthographic(): boolean {
    this.isOrthographic = !this.isOrthographic;
    const width = this.renderer.domElement.clientWidth;
    const height = this.renderer.domElement.clientHeight;
    const aspect = width / height;

    if (this.isOrthographic) {
      this.orthoCamera.position.copy(this.perspectiveCamera.position);
      this.orthoCamera.rotation.copy(this.perspectiveCamera.rotation);
      this.updateOrthoFrustum(aspect);
      this.camera = this.orthoCamera;
    } else {
      this.perspectiveCamera.position.copy(this.orthoCamera.position);
      this.perspectiveCamera.rotation.copy(this.orthoCamera.rotation);
      this.camera = this.perspectiveCamera;
    }

    this.controls.object = this.camera;
    this.picker.setCamera(this.camera);
    this.cameraAnimator.setCamera(this.camera);
    this.controls.update();

    return this.isOrthographic;
  }

  private updateOrthoFrustum(aspect: number) {
    this.orthoCamera.left = (-this.frustumSize * aspect) / 2;
    this.orthoCamera.right = (this.frustumSize * aspect) / 2;
    this.orthoCamera.top = this.frustumSize / 2;
    this.orthoCamera.bottom = -this.frustumSize / 2;
    this.orthoCamera.updateProjectionMatrix();
  }

  public resize(width: number, height: number) {
    const aspect = width / height;
    this.perspectiveCamera.aspect = aspect;
    this.perspectiveCamera.updateProjectionMatrix();
    this.updateOrthoFrustum(aspect);
    this.renderer.setSize(width, height);
  }

  private startLoop() {
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);

      const delta = this.clock.getDelta();
      const elapsed = this.clock.getElapsedTime();

      // Subtle water shimmer
      const poolWater = this.scene.getObjectByName('poolWater') as THREE.Mesh;
      if (poolWater && poolWater.material instanceof THREE.MeshStandardMaterial) {
        if (poolWater.material.map) {
          poolWater.material.map.offset.x = (elapsed * 0.02) % 1;
          poolWater.material.map.offset.y = (elapsed * 0.015) % 1;
        }
      }

      // Camera transitions / Orbit
      const cameraUpdated = this.cameraAnimator.update(delta);
      if (!cameraUpdated) {
        this.controls.update();
      } else {
        this.controls.target.copy(this.cameraAnimator.getTarget());
      }

      // Picker update
      this.picker.update();

      this.renderer.render(this.scene, this.camera);

      if (this.onRenderTick) {
        this.onRenderTick();
      }
    };

    animate();
  }

  public projectWorldToScreen(worldPos: THREE.Vector3): { x: number; y: number; inFront: boolean } {
    const v = worldPos.clone().project(this.camera);
    const width = this.renderer.domElement.clientWidth;
    const height = this.renderer.domElement.clientHeight;

    return {
      x: ((v.x + 1) * width) / 2,
      y: ((-v.y + 1) * height) / 2,
      inFront: v.z > -1 && v.z < 1
    };
  }

  public destroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.renderer.dispose();
  }
}
