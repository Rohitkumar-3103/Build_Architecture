import React from 'react';
import { 
  Compass, 
  Eye, 
  Layers, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  BarChart3, 
  HelpCircle, 
  Video, 
  Maximize,
  Box,
  FileCode,
  Sparkles,
  Tag,
  Building,
  Scan,
  Mic,
  MicOff,
  Hammer,
  LayoutGrid,
  LayoutDashboard
} from 'lucide-react';
import { RenderMode, CameraPreset, BuildMode } from '../types';
import { PRODUCTS } from '../building/ProductRegistry';

interface ControlToolbarProps {
  productId: string;
  onSelectProduct: (id: string) => void;
  renderMode: RenderMode;
  onRenderModeChange: (mode: RenderMode) => void;
  buildMode: BuildMode;
  onToggleBuildMode: () => void;
  onOpenCatalog: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  isSpeaking: boolean;
  explodeAmount: number;
  onExplodeChange: (val: number) => void;
  cameraPreset: CameraPreset;
  onCameraPresetChange: (preset: CameraPreset) => void;
  isCinematicOrbit: boolean;
  onToggleCinematicOrbit: () => void;
  isOrthographic: boolean;
  onToggleOrthographic: () => void;
  showCallouts: boolean;
  onToggleCallouts: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onOpenMetrics: () => void;
  onOpenHelp: () => void;
}

export const ControlToolbar: React.FC<ControlToolbarProps> = ({
  productId,
  onSelectProduct,
  renderMode,
  onRenderModeChange,
  buildMode,
  onToggleBuildMode,
  onOpenCatalog,
  voiceEnabled,
  onToggleVoice,
  isSpeaking,
  explodeAmount,
  onExplodeChange,
  cameraPreset,
  onCameraPresetChange,
  isCinematicOrbit,
  onToggleCinematicOrbit,
  isOrthographic,
  onToggleOrthographic,
  showCallouts,
  onToggleCallouts,
  audioEnabled,
  onToggleAudio,
  onOpenMetrics,
  onOpenHelp,
}) => {
  return (
    <header className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none max-w-full">
      {/* Brand Title & Product Selector */}
      <div className="glass-panel px-3 py-1.5 rounded-2xl flex items-center gap-2.5 pointer-events-auto shadow-2xl shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-300 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(56,189,248,0.5)] shrink-0">
          <Building className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-xs sm:text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
            <span>ArchConstruct</span>
            <span className="px-1.5 py-0.2 rounded-md bg-sky-500/20 border border-sky-400/40 text-cyan-400 text-[10px] sm:text-xs font-mono font-bold">3D</span>
            <span className="text-slate-500 font-light">—</span>
            <span className="text-slate-200 font-semibold tracking-wide hidden 2xl:inline">Architectural Assembly &amp; Construction Animation</span>
            <span className="text-slate-200 font-semibold tracking-wide 2xl:hidden">Architecture Animation</span>
          </h1>

          <div className="flex items-center gap-1.5 mt-0.5">
            <p className="text-[10px] text-cyan-300/80 font-mono tracking-wider hidden lg:flex items-center gap-1 whitespace-nowrap">
              BIM Assembly &amp; CAD
            </p>
            <span className="text-slate-600 text-[10px] hidden lg:inline">•</span>
            {/* Architectural Product / Model Dropdown */}
            <div className="header-model-select flex items-center gap-1 bg-slate-900/90 border border-sky-400/30 rounded-md px-1.5 py-0.5 shadow-inner">
              <span className="text-[9px] font-mono text-cyan-400 uppercase font-semibold">Model:</span>
              <select
                value={productId}
                onChange={(e) => onSelectProduct(e.target.value)}
                className="bg-transparent text-sky-200 font-mono text-[11px] font-medium outline-none cursor-pointer hover:text-white transition-colors max-w-[150px] sm:max-w-[190px] truncate"
                title="Select Architectural Model"
              >
                {PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.id} className="bg-slate-900 text-slate-100">
                    {prod.name} ({prod.areaM2}m²)
                  </option>
                ))}
              </select>
            </div>

            {/* Architecture Dashboard Modal Opener */}
            <button
              onClick={onOpenCatalog}
              title="Open Architecture Projects Dashboard (CAD Drawings & Specs)"
              className="header-dashboard-btn px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold text-cyan-300 hover:text-white bg-sky-950/80 hover:bg-sky-900/90 border border-sky-500/50 flex items-center gap-1.5 transition-all shadow-sm hover:shadow-[0_0_10px_rgba(56,189,248,0.3)]"
            >
              <LayoutDashboard className="w-3 h-3 text-cyan-400" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Center / Right Control Clusters (Streamlined, unified, and strictly within screen boundary) */}
      <div className="flex items-center gap-1.5 pointer-events-auto flex-nowrap shrink-0 overflow-x-visible">
        {/* Cluster 1: Mode & Voice */}
        <div className="glass-panel p-1 rounded-2xl flex items-center gap-1 shadow-xl">
          <button
            onClick={onToggleBuildMode}
            title={buildMode === 'step' ? "Switch to Full Assembled View (G)" : "Switch to Step-by-Step Construction Guide (G)"}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              buildMode === 'step'
                ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white glass-button'
            }`}
          >
            <Hammer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{buildMode === 'step' ? 'Step Guide' : 'Assembled'}</span>
          </button>

          <button
            onClick={onToggleVoice}
            title={voiceEnabled ? "Mute Spoken Voice Narration (V)" : "Enable Spoken Voice Narration (V)"}
            className={`px-2 py-1 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
              voiceEnabled
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white glass-button'
            }`}
          >
            {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden md:inline">{isSpeaking ? 'Speaking' : 'Voice'}</span>
            {isSpeaking && (
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping inline-block" />
            )}
          </button>
        </div>

        {/* Cluster 2: Render Styles & Exploded View */}
        <div className="glass-panel p-1 rounded-2xl flex items-center gap-1 shadow-xl">
          <button
            onClick={() => onRenderModeChange('realistic')}
            title="Realistic PBR Shading (P)"
            className={`px-2 py-1 rounded-xl text-xs font-medium transition-all ${
              renderMode === 'realistic'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            PBR
          </button>
          <button
            onClick={() => onRenderModeChange('blueprint')}
            title="CAD Blueprint Mode (B)"
            className={`px-2 py-1 rounded-xl text-xs font-medium transition-all ${
              renderMode === 'blueprint'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            CAD
          </button>
          <button
            onClick={() => onRenderModeChange('clay')}
            title="Gypsum Museum Clay Model (C)"
            className={`px-2 py-1 rounded-xl text-xs font-medium transition-all ${
              renderMode === 'clay'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Clay
          </button>

          <div className="h-4 w-px bg-slate-700/60 mx-0.5" />

          {/* Exploded View Slider */}
          <div className="flex items-center gap-2 px-2.5 py-0.5 bg-slate-100/95 rounded-xl border border-sky-300/60 shadow-inner" title="Exploded View Disassembly (E)">
            <span className="text-[10px] font-mono font-bold text-slate-700 hidden sm:inline">EXP:</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={explodeAmount}
              onChange={(e) => onExplodeChange(parseFloat(e.target.value))}
              className="w-16 sm:w-20 h-2 bg-slate-300 hover:bg-slate-400 rounded-full appearance-none cursor-pointer accent-sky-500 border border-slate-300/80 transition-colors"
            />
            <span className="text-[10px] font-mono text-sky-600 font-extrabold w-7 text-right">
              {Math.round(explodeAmount * 100)}%
            </span>
          </div>
        </div>

        {/* Cluster 3: Camera Presets & Orthographic CAD Toggle */}
        <div className="glass-panel p-1 rounded-2xl flex items-center gap-0.5 shadow-xl">
          <button
            onClick={() => onCameraPresetChange('isometric')}
            title="Isometric 45° View"
            className={`p-1.5 rounded-xl text-xs transition-colors ${
              cameraPreset === 'isometric' && !isCinematicOrbit
                ? 'bg-sky-500 text-slate-950'
                : 'text-slate-300 hover:text-white glass-button'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onCameraPresetChange('front')}
            title="Front Elevation View"
            className={`px-1.5 py-1 text-[11px] font-mono transition-colors rounded-xl ${
              cameraPreset === 'front' && !isCinematicOrbit
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white glass-button'
            }`}
          >
            ELEV
          </button>
          <button
            onClick={() => onCameraPresetChange('top')}
            title="Top-Down CAD Floorplan View"
            className={`px-1.5 py-1 text-[11px] font-mono transition-colors rounded-xl ${
              cameraPreset === 'top' && !isCinematicOrbit
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white glass-button'
            }`}
          >
            PLAN
          </button>
          <button
            onClick={() => onCameraPresetChange('pedestrian')}
            title="Human Eye-Level Perspective"
            className={`p-1.5 rounded-xl text-xs transition-colors ${
              cameraPreset === 'pedestrian' && !isCinematicOrbit
                ? 'bg-sky-500 text-slate-950'
                : 'text-slate-300 hover:text-white glass-button'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* True Orthographic CAD Camera Toggle */}
          <button
            onClick={onToggleOrthographic}
            title={isOrthographic ? "Switch to Perspective Camera (O)" : "Switch to True Orthographic CAD Camera (O)"}
            className={`px-2 py-1 text-[11px] font-mono font-semibold rounded-xl flex items-center gap-1 transition-all ${
              isOrthographic
                ? 'bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                : 'text-slate-300 hover:text-white glass-button'
            }`}
          >
            <Scan className="w-3 h-3" />
            <span>{isOrthographic ? 'ORTHO' : 'PERSP'}</span>
          </button>

          {/* Cinematic 360 Flythrough */}
          <button
            onClick={onToggleCinematicOrbit}
            title="360° Cinematic Flythrough Orbit"
            className={`p-1.5 rounded-xl text-xs transition-colors ${
              isCinematicOrbit
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white animate-pulse'
                : 'text-slate-300 hover:text-white glass-button'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Cluster 4: Utilities (Tag, Night, Sound, BIM Schedule, Help) */}
        <div className="glass-panel p-1 rounded-2xl flex items-center gap-0.5 shadow-xl">
          <button
            onClick={onToggleCallouts}
            title={showCallouts ? "Hide SVG Callout Leader Lines (L)" : "Show SVG Callout Leader Lines (L)"}
            className={`p-1.5 rounded-xl text-xs transition-colors ${
              showCallouts
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white glass-button'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleAudio}
            title={audioEnabled ? "Mute Mechanical Sound FX" : "Enable Sound FX"}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white glass-button"
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-sky-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          <button
            onClick={onOpenMetrics}
            title="BIM Engineering & Material Schedule"
            className="p-1.5 rounded-xl text-slate-300 hover:text-white glass-button"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          </button>

          <button
            onClick={onOpenHelp}
            title="Keyboard Shortcuts & Guidance (?)"
            className="p-1.5 rounded-xl text-slate-300 hover:text-white glass-button"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
