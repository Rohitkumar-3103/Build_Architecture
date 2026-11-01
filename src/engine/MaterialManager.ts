import * as THREE from 'three';
import { RenderMode } from '../types';

export class MaterialManager {
  private mode: RenderMode = 'realistic';

  // Procedural canvas textures
  private concreteTexture: THREE.CanvasTexture;
  private woodTexture: THREE.CanvasTexture;
  private waterTexture: THREE.CanvasTexture;

  // Realistic Materials
  public concreteMat!: THREE.MeshStandardMaterial;
  public darkConcreteMat!: THREE.MeshStandardMaterial;
  public steelMat!: THREE.MeshStandardMaterial;
  public steelBeamMat!: THREE.MeshStandardMaterial;
  public glassMat!: THREE.MeshPhysicalMaterial;
  public woodMat!: THREE.MeshStandardMaterial;
  public plasterWhiteMat!: THREE.MeshStandardMaterial;
  public interiorDarkWallMat!: THREE.MeshStandardMaterial;
  public furnitureMat!: THREE.MeshStandardMaterial;
  public waterMat!: THREE.MeshStandardMaterial;
  public grassMat!: THREE.MeshStandardMaterial;
  public soilMat!: THREE.MeshStandardMaterial;
  public solarPanelMat!: THREE.MeshStandardMaterial;
  public poolTileMat!: THREE.MeshStandardMaterial;
  public rebarMat!: THREE.MeshStandardMaterial;
  public foilWaterproofingMat!: THREE.MeshStandardMaterial;

  // Blueprint Materials
  public blueprintSolidMat!: THREE.MeshBasicMaterial;
  public blueprintWireMat!: THREE.MeshBasicMaterial;
  public blueprintGlassMat!: THREE.MeshBasicMaterial;
  public blueprintAccentMat!: THREE.MeshBasicMaterial;
  public blueprintLineMat!: THREE.LineBasicMaterial;

  // Clay / Gypsum Model Materials
  public clayMat!: THREE.MeshStandardMaterial;
  public clayAccentMat!: THREE.MeshStandardMaterial;
  public clayGlassMat!: THREE.MeshPhysicalMaterial;

  constructor() {
    this.concreteTexture = this.generateConcreteTexture();
    this.woodTexture = this.generateWoodTexture();
    this.waterTexture = this.generateWaterTexture();

    this.initRealisticMaterials();
    this.initBlueprintMaterials();
    this.initClayMaterials();
  }

  private generateConcreteTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#b0b5bc';
    ctx.fillRect(0, 0, 256, 256);

    // Subtle noise for concrete aggregate
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const shade = Math.floor(Math.random() * 40 - 20);
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.08})`;
      ctx.fillRect(x, y, 2, 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  }

  private generateWoodTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#a87954';
    ctx.fillRect(0, 0, 256, 256);

    // Wood grain lines
    ctx.fillStyle = 'rgba(74, 44, 23, 0.15)';
    for (let y = 0; y < 256; y += 4) {
      ctx.fillRect(0, y, 256, 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 6);
    return texture;
  }

  private generateWaterTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#17748e';
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.beginPath();
      ctx.arc(Math.random() * 128, Math.random() * 128, Math.random() * 8, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  private initRealisticMaterials() {
    this.concreteMat = new THREE.MeshStandardMaterial({
      color: 0xd6dadf,
      roughness: 0.85,
      metalness: 0.08,
      map: this.concreteTexture,
    });

    this.darkConcreteMat = new THREE.MeshStandardMaterial({
      color: 0x5a626d,
      roughness: 0.88,
      metalness: 0.1,
    });

    this.steelMat = new THREE.MeshStandardMaterial({
      color: 0x22262d,
      roughness: 0.35,
      metalness: 0.85,
    });

    this.steelBeamMat = new THREE.MeshStandardMaterial({
      color: 0x1f232b,
      roughness: 0.4,
      metalness: 0.9,
    });

    this.glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xb5e7ff,
      transmission: 0.88,
      opacity: 0.45,
      transparent: true,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.52,
      thickness: 0.5,
    });

    this.woodMat = new THREE.MeshStandardMaterial({
      color: 0xbf8b63,
      roughness: 0.65,
      metalness: 0.05,
      map: this.woodTexture,
    });

    this.plasterWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf4f5f7,
      roughness: 0.9,
      metalness: 0.02,
    });

    this.interiorDarkWallMat = new THREE.MeshStandardMaterial({
      color: 0x2a303c,
      roughness: 0.8,
      metalness: 0.1,
    });

    this.furnitureMat = new THREE.MeshStandardMaterial({
      color: 0xd97736,
      roughness: 0.6,
      metalness: 0.1,
    });

    this.waterMat = new THREE.MeshStandardMaterial({
      color: 0x22a6b3,
      roughness: 0.1,
      metalness: 0.2,
      opacity: 0.8,
      transparent: true,
      map: this.waterTexture,
    });

    this.grassMat = new THREE.MeshStandardMaterial({
      color: 0x477343,
      roughness: 0.95,
      metalness: 0.0,
    });

    this.soilMat = new THREE.MeshStandardMaterial({
      color: 0x4a3c31,
      roughness: 0.98,
      metalness: 0.0,
    });

    this.solarPanelMat = new THREE.MeshStandardMaterial({
      color: 0x132742,
      roughness: 0.2,
      metalness: 0.85,
    });

    this.poolTileMat = new THREE.MeshStandardMaterial({
      color: 0x1e3799,
      roughness: 0.3,
      metalness: 0.1,
    });

    this.rebarMat = new THREE.MeshStandardMaterial({
      color: 0xc0392b,
      roughness: 0.5,
      metalness: 0.7,
    });

    this.foilWaterproofingMat = new THREE.MeshStandardMaterial({
      color: 0x11161f,
      roughness: 0.4,
      metalness: 0.3,
    });
  }

  private initBlueprintMaterials() {
    this.blueprintSolidMat = new THREE.MeshBasicMaterial({
      color: 0x0f294a,
      transparent: true,
      opacity: 0.85,
    });

    this.blueprintWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    this.blueprintGlassMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });

    this.blueprintAccentMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    this.blueprintLineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      linewidth: 1,
      transparent: true,
      opacity: 0.7,
    });
  }

  private initClayMaterials() {
    this.clayMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f2,
      roughness: 0.92,
      metalness: 0.0,
    });

    this.clayAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd8d8de,
      roughness: 0.88,
      metalness: 0.0,
    });

    this.clayGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe8eef5,
      transmission: 0.5,
      opacity: 0.6,
      transparent: true,
      roughness: 0.2,
    });
  }

  public setRenderMode(mode: RenderMode) {
    this.mode = mode;
  }

  public getRenderMode(): RenderMode {
    return this.mode;
  }

  // Resolve active material for any category based on active RenderMode
  public resolveMaterial(category: string, defaultMat: THREE.Material): THREE.Material {
    if (this.mode === 'blueprint') {
      if (category === 'CurtainWall' || category === 'Water') {
        return this.blueprintGlassMat;
      }
      return this.blueprintSolidMat;
    }

    if (this.mode === 'clay') {
      if (category === 'CurtainWall' || category === 'Water') {
        return this.clayGlassMat;
      }
      return this.clayMat;
    }

    return defaultMat;
  }
}
