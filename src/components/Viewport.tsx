import React, { useRef, useEffect } from 'react';
import { SceneManager } from '../engine/SceneManager';
import { RenderMode, CameraPreset, BuildingComponentData } from '../types';

interface ViewportProps {
  progress: number;
  explodeAmount: number;
  renderMode: RenderMode;
  cameraPreset: CameraPreset;
  isCinematicOrbit: boolean;
  selectedComponentId: string | null;
  onComponentHover: (comp: BuildingComponentData | null) => void;
  onComponentSelect: (comp: BuildingComponentData | null) => void;
  sceneManagerRef: React.MutableRefObject<SceneManager | null>;
  onSceneReady?: (manager: SceneManager) => void;
}

export const Viewport: React.FC<ViewportProps> = ({
  progress,
  explodeAmount,
  renderMode,
  cameraPreset,
  isCinematicOrbit,
  selectedComponentId,
  onComponentHover,
  onComponentSelect,
  sceneManagerRef,
  onSceneReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const manager = new SceneManager(canvasRef.current);
    sceneManagerRef.current = manager;

    manager.onComponentHover = onComponentHover;
    manager.onComponentSelect = onComponentSelect;
    manager.fitModelBounds();
    onSceneReady?.(manager);

    const handleResize = () => {
      if (canvasRef.current) {
        manager.resize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      manager.destroy();
      sceneManagerRef.current = null;
    };
  }, []);

  // Sync Progress
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.building.updateProgress(progress);
    }
  }, [progress]);

  // Sync Explode Amount
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.building.setExplodeAmount(explodeAmount);
    }
  }, [explodeAmount]);

  // Sync Render Mode
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setRenderMode(renderMode);
    }
  }, [renderMode]);

  // Sync Camera Preset
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setCameraPreset(cameraPreset);
    }
  }, [cameraPreset]);

  // Sync Selection Highlight
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.picker.selectById(selectedComponentId);
    }
  }, [selectedComponentId]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing outline-none"
    />
  );
};
