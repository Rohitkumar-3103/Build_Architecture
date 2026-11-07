import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Viewport } from './components/Viewport';
import { TimelineHUD } from './components/TimelineHUD';
import { PhaseSidebar } from './components/PhaseSidebar';
import { ControlToolbar } from './components/ControlToolbar';
import { InspectorPanel } from './components/InspectorPanel';
import { MetricsModal } from './components/MetricsModal';
import { KeyboardHelpModal } from './components/KeyboardHelpModal';
import { SVGCalloutsOverlay } from './components/SVGCalloutsOverlay';
import { StepGuidePanel } from './components/StepGuidePanel';
import { ProductCatalogModal } from './components/ProductCatalogModal';
import { SceneManager } from './engine/SceneManager';
import { soundEngine } from './audio/soundEngine';
import { voiceEngine } from './audio/VoiceNarrationEngine';
import { PHASES } from './building/BuildingModel';
import { getProductById } from './building/ProductRegistry';
import { RenderMode, CameraPreset, BuildingComponentData, BuildMode } from './types';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [explodeAmount, setExplodeAmount] = useState<number>(0);
  const [renderMode, setRenderMode] = useState<RenderMode>('realistic');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [isCinematicOrbit, setIsCinematicOrbit] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [showCallouts, setShowCallouts] = useState<boolean>(true);
  const [productId, setProductId] = useState<string>('villa');
  const [isOrthographic, setIsOrthographic] = useState<boolean>(false);

  // Bygga-inspired Step-by-Step Guide mode and Voice Narration state
  const [buildMode, setBuildMode] = useState<BuildMode>('step');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingText, setSpeakingText] = useState<string>('');
  // Opens the Architecture Projects Dashboard first on initial launch
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const activeProduct = getProductById(productId);
  const currentPhases = activeProduct.phases;

  const [selectedComponent, setSelectedComponent] = useState<BuildingComponentData | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<BuildingComponentData | null>(null);

  const [isMetricsOpen, setIsMetricsOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  const sceneManagerRef = useRef<SceneManager | null>(null);
  const [sceneManager, setSceneManager] = useState<SceneManager | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Subscribe to Voice Narration Engine
  useEffect(() => {
    voiceEngine.enabled = voiceEnabled;
    const unsub = voiceEngine.subscribe((speaking, text) => {
      setIsSpeaking(speaking);
      setSpeakingText(text);
    });
    return () => {
      unsub();
    };
  }, [voiceEnabled]);

  // Helper to trigger tailored spoken voice narration for any product and step
  const speakCurrentStep = (phaseIdx: number, force: boolean = false, targetProductId: string = productId) => {
    const prod = getProductById(targetProductId);
    const phase = prod.phases[phaseIdx] || prod.phases[0];
    if (phase) {
      voiceEngine.speakStep(phaseIdx, targetProductId, force, prod.name, phase.title, phase.description);
    }
  };

  // Read step aloud when step changes in Step Guide mode or manual stepping
  const currentPhaseIndex = Math.min(currentPhases.length - 1, Math.floor(progress));
  useEffect(() => {
    if (buildMode === 'step' && voiceEnabled && !isPlaying) {
      speakCurrentStep(currentPhaseIndex, false);
    }
  }, [currentPhaseIndex, productId, buildMode, voiceEnabled, isPlaying]);

  // Playback Loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animatePlayback = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      setProgress((prev) => {
        const next = prev + delta * 0.45 * playbackSpeed;
        if (next >= currentPhases.length - 1) {
          setIsPlaying(false);
          // Trigger milestone celebration confetti!
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 }
          });
          soundEngine.playCompletionChime();
          if (voiceEnabled) {
            voiceEngine.speakCompletion(activeProduct.name);
          }
          return currentPhases.length - 1;
        }

        // Mechanical placement audio and voice milestone when crossing an integer boundary
        if (Math.floor(next) > Math.floor(prev)) {
          soundEngine.playPlacementThud();
          if (voiceEnabled) {
            speakCurrentStep(Math.floor(next), false);
          }
        }

        return next;
      });

      animationFrameRef.current = requestAnimationFrame(animatePlayback);
    };

    animationFrameRef.current = requestAnimationFrame(animatePlayback);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, currentPhases.length, voiceEnabled, activeProduct.name]);

  // Handlers
  const handleSelectProduct = (newProductId: string) => {
    setProductId(newProductId);
    const productDef = getProductById(newProductId);
    if (sceneManagerRef.current) {
      const newParts = productDef.build(sceneManagerRef.current.materials);
      sceneManagerRef.current.building.loadProduct(newParts);

      // Dynamically fit camera, orbit target & lighting to the new building's geometry
      sceneManagerRef.current.fitModelBounds();
    }
    setProgress(0);
    setIsPlaying(false);
    setSelectedComponent(null);
    soundEngine.playModeSwitch();
    if (voiceEnabled) {
      speakCurrentStep(0, true, newProductId);
    }
  };

  const handleToggleBuildMode = () => {
    soundEngine.playModeSwitch();
    setBuildMode((prev) => (prev === 'step' ? 'assembled' : 'step'));
    if (buildMode === 'step') {
      // Switching to assembled: show 100% completed model
      setProgress(currentPhases.length - 1);
      voiceEngine.stop();
    } else {
      // Switching to step guide: jump to beginning or current step
      setProgress(0);
      if (voiceEnabled) {
        speakCurrentStep(0, true);
      }
    }
  };

  const handleToggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    voiceEngine.enabled = next;
    if (next) {
      speakCurrentStep(currentPhaseIndex, true);
    } else {
      voiceEngine.stop();
    }
    soundEngine.playStepClick();
  };

  const handleReplayVoice = () => {
    speakCurrentStep(currentPhaseIndex, true);
  };

  const handleToggleOrthographic = () => {
    if (sceneManagerRef.current) {
      const ortho = sceneManagerRef.current.toggleOrthographic();
      setIsOrthographic(ortho);
      soundEngine.playStepClick();
    }
  };

  const handleTogglePlay = () => {
    if (progress >= currentPhases.length - 1) {
      setProgress(0);
      if (voiceEnabled) {
        speakCurrentStep(0, true);
      }
    } else if (!isPlaying && voiceEnabled) {
      speakCurrentStep(Math.floor(progress), false);
    }
    soundEngine.playStepClick();
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    soundEngine.playStepClick();
    if (voiceEnabled && buildMode === 'step') {
      speakCurrentStep(0, true);
    }
  };

  const handleStepPrev = () => {
    setIsPlaying(false);
    soundEngine.playStepClick();
    setProgress((prev) => {
      const target = Math.max(0, Math.floor(prev) - 1);
      if (voiceEnabled && buildMode === 'step') {
        speakCurrentStep(target, true);
      }
      return target;
    });
  };

  const handleStepNext = () => {
    setIsPlaying(false);
    soundEngine.playStepClick();
    setProgress((prev) => {
      const next = Math.min(currentPhases.length - 1, Math.floor(prev) + 1);
      if (next === currentPhases.length - 1) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        soundEngine.playCompletionChime();
      }
      if (voiceEnabled && buildMode === 'step') {
        speakCurrentStep(next, true);
      }
      return next;
    });
  };

  const handleSelectPhase = (phaseId: number) => {
    setIsPlaying(false);
    soundEngine.playStepClick();
    setProgress(phaseId);
    if (voiceEnabled && buildMode === 'step') {
      speakCurrentStep(phaseId, true);
    }
  };

  const handleRenderModeChange = (mode: RenderMode) => {
    soundEngine.playModeSwitch();
    setRenderMode(mode);
  };

  const handleExplodeChange = (val: number) => {
    if (Math.abs(val - explodeAmount) > 0.05) {
      soundEngine.playWhoosh(0.3);
    }
    setExplodeAmount(val);
  };

  const handleCameraPresetChange = (preset: CameraPreset) => {
    setIsCinematicOrbit(false);
    soundEngine.playStepClick();
    setCameraPreset(preset);
  };

  const handleToggleCinematicOrbit = () => {
    if (sceneManagerRef.current) {
      const active = sceneManagerRef.current.toggleCinematicOrbit();
      setIsCinematicOrbit(active);
      soundEngine.playStepClick();
    }
  };

  const handleToggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    soundEngine.enabled = next;
    if (next) {
      soundEngine.playStepClick();
    }
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          handleTogglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleStepPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleStepNext();
          break;
        case 'r':
        case 'R':
          handleReset();
          break;
        case 'b':
        case 'B':
          handleRenderModeChange('blueprint');
          break;
        case 'c':
        case 'C':
          handleRenderModeChange('clay');
          break;
        case 'p':
        case 'P':
          handleRenderModeChange('realistic');
          break;
        case 'g':
        case 'G':
          handleToggleBuildMode();
          break;
        case 'v':
        case 'V':
          handleToggleVoice();
          break;
        case 'e':
        case 'E':
          handleExplodeChange(explodeAmount > 0.1 ? 0 : 0.6);
          break;
        case 'l':
        case 'L':
          setShowCallouts((prev) => !prev);
          break;
        case 'o':
        case 'O':
          handleToggleOrthographic();
          break;
        case 's':
        case 'S':
          setIsSidebarOpen((prev) => !prev);
          break;
        case 'Escape':
          setSelectedComponent(null);
          setIsMetricsOpen(false);
          setIsHelpOpen(false);
          setIsCatalogOpen(false);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
          handleSelectPhase(parseInt(e.key) - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [progress, isPlaying, explodeAmount, voiceEnabled, buildMode]);

  return (
    <div className={`relative w-screen h-screen overflow-hidden light-theme ${
      renderMode === 'blueprint' ? 'blueprint-grid-bg' : ''
    }`}>
      {/* 3D WebGL Canvas Viewport */}
      <Viewport
        progress={progress}
        explodeAmount={explodeAmount}
        renderMode={renderMode}
        cameraPreset={cameraPreset}
        isCinematicOrbit={isCinematicOrbit}
        selectedComponentId={selectedComponent ? selectedComponent.id : null}
        onComponentHover={setHoveredComponent}
        onComponentSelect={setSelectedComponent}
        sceneManagerRef={sceneManagerRef}
        onSceneReady={setSceneManager}
      />

      {/* Real-time SVG Leader Lines & Callout Badges */}
      <SVGCalloutsOverlay
        sceneManager={sceneManager}
        progress={progress}
        enabled={showCallouts}
        callouts={activeProduct.callouts}
        selectedComponentId={selectedComponent ? selectedComponent.id : null}
        onSelectComponent={(id) => {
          if (sceneManager) {
            const comp = sceneManager.building.getComponentById(id);
            if (comp) {
              setSelectedComponent(comp);
            }
          }
        }}
      />

      {/* Top Controls Toolbar */}
      <ControlToolbar
        productId={productId}
        onSelectProduct={handleSelectProduct}
        renderMode={renderMode}
        onRenderModeChange={handleRenderModeChange}
        buildMode={buildMode}
        onToggleBuildMode={handleToggleBuildMode}
        onOpenCatalog={() => setIsCatalogOpen(true)}
        voiceEnabled={voiceEnabled}
        onToggleVoice={handleToggleVoice}
        isSpeaking={isSpeaking}
        explodeAmount={explodeAmount}
        onExplodeChange={handleExplodeChange}
        cameraPreset={cameraPreset}
        onCameraPresetChange={handleCameraPresetChange}
        isCinematicOrbit={isCinematicOrbit}
        onToggleCinematicOrbit={handleToggleCinematicOrbit}
        isOrthographic={isOrthographic}
        onToggleOrthographic={handleToggleOrthographic}
        showCallouts={showCallouts}
        onToggleCallouts={() => setShowCallouts((prev) => !prev)}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
        onOpenMetrics={() => setIsMetricsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Left Phase Sequence Sidebar (in Overview/Assembled mode) */}
      {buildMode === 'assembled' && (
        <PhaseSidebar
          progress={progress}
          phases={currentPhases}
          onSelectPhase={handleSelectPhase}
          collapsed={!isSidebarOpen}
          onToggleCollapse={() => setIsSidebarOpen((prev) => !prev)}
        />
      )}

      {/* Bygga-style Interactive Step-by-Step Assembly Guide Panel */}
      {buildMode === 'step' && (
        <StepGuidePanel
          phase={currentPhases[currentPhaseIndex] || currentPhases[0]}
          phaseIndex={currentPhaseIndex}
          totalPhases={currentPhases.length}
          onNextStep={handleStepNext}
          onPrevStep={handleStepPrev}
          onSelectStep={handleSelectPhase}
          voiceEnabled={voiceEnabled}
          onToggleVoice={handleToggleVoice}
          isSpeaking={isSpeaking}
          speakingText={speakingText}
          onReplayVoice={handleReplayVoice}
        />
      )}

      {/* Hover Tooltip */}
      {hoveredComponent && !selectedComponent && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-in fade-in duration-150">
          <div className="glass-panel px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-sky-400/40 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="font-semibold text-white">{hoveredComponent.name}</span>
            <span className="text-slate-400 font-mono text-[10px]">({hoveredComponent.category})</span>
            <span className="text-sky-300 text-[10px] ml-1">Click to Inspect</span>
          </div>
        </div>
      )}

      {/* Right Component Engineering Inspector Panel */}
      <InspectorPanel
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />

      {/* Bottom Timeline Player HUD (Shown in Assembled mode or as Scrubber) */}
      {buildMode === 'assembled' && (
        <TimelineHUD
          progress={progress}
          phases={currentPhases}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          onTogglePlay={handleTogglePlay}
          onReset={handleReset}
          onStepPrev={handleStepPrev}
          onStepNext={handleStepNext}
          onScrub={setProgress}
          onSpeedChange={setPlaybackSpeed}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
      )}

      {/* Bygga-style Architectural Products Catalog Modal (Drawings, Specs & OG Cards) */}
      <ProductCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        activeProductId={productId}
        onSelectProduct={(newId, startStepByStep) => {
          handleSelectProduct(newId);
          if (startStepByStep) {
            setBuildMode('step');
            setProgress(0);
            if (voiceEnabled) {
              speakCurrentStep(0, true, newId);
            }
          } else {
            // Inspect in 3D Viewport: display fully completed 100% assembly
            setBuildMode('assembled');
            const prod = getProductById(newId);
            setProgress(prod.phases.length - 1);
            voiceEngine.stop();
          }
        }}
      />

      {/* Modals */}
      <MetricsModal
        isOpen={isMetricsOpen}
        onClose={() => setIsMetricsOpen(false)}
      />

      <KeyboardHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
};

export default App;
