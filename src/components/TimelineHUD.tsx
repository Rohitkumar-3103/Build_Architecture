import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  FastForward,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PHASES as DEFAULT_PHASES } from '../building/BuildingModel';
import { ConstructionPhase } from '../types';

interface TimelineHUDProps {
  progress: number; // 0 to 7
  isPlaying: boolean;
  playbackSpeed: number;
  phases?: ConstructionPhase[];
  onTogglePlay: () => void;
  onReset: () => void;
  onStepPrev: () => void;
  onStepNext: () => void;
  onScrub: (val: number) => void;
  onSpeedChange: (speed: number) => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const TimelineHUD: React.FC<TimelineHUDProps> = ({
  progress,
  isPlaying,
  playbackSpeed,
  phases = DEFAULT_PHASES,
  onTogglePlay,
  onReset,
  onStepPrev,
  onStepNext,
  onScrub,
  onSpeedChange,
  isSidebarOpen = true,
  onToggleSidebar,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentPhaseIndex = Math.min(phases.length - 1, Math.floor(progress));
  const activePhase = phases[currentPhaseIndex] || phases[0];
  const percentComplete = Math.round((progress / (phases.length - 1)) * 100);

  const speeds = [0.5, 1, 2];

  if (isCollapsed) {
    return (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="glass-panel rounded-2xl px-4 py-2.5 text-white shadow-2xl border border-sky-500/30 flex items-center gap-3">
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-sky-500/20 text-sky-600 border border-sky-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            {activePhase.badge.split('//')[0]?.trim() || `P0${currentPhaseIndex + 1}`}
          </span>
          <span className="text-xs font-semibold text-slate-200 truncate max-w-[180px] sm:max-w-xs">
            {activePhase.title}
          </span>
          <div className="w-16 sm:w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-cyan-400 font-bold">{percentComplete}%</span>

          <div className="h-4 w-px bg-slate-700/60" />

          {/* Mini Play / Pause */}
          <button
            onClick={onTogglePlay}
            className="p-1.5 rounded-lg bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition-all active:scale-95"
            title="Play / Pause Construction"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          {/* Sequence Sidebar Toggle Button */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className={`p-1.5 rounded-lg glass-button transition-all border ${
                isSidebarOpen 
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400/50' 
                  : 'text-slate-400 hover:text-white border-slate-700/50'
              }`}
              title={isSidebarOpen ? "Hide BIM Execution Sequence Sidebar" : "Show BIM Execution Sequence Sidebar"}
            >
              {isSidebarOpen ? <PanelLeftClose className="w-3.5 h-3.5" /> : <PanelLeftOpen className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Expand HUD Button */}
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1.5 rounded-lg glass-button text-slate-400 hover:text-white border border-slate-700/50"
            title="Expand Full Timeline HUD"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl z-20">
      <div className="glass-panel rounded-2xl p-4 sm:p-5 text-white shadow-2xl border border-sky-500/20">
        {/* Top Header Row of HUD */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-sky-950/60">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-mono font-bold tracking-wider rounded-md bg-sky-500/15 text-sky-600 border border-sky-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              {activePhase.badge}
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2">
                {activePhase.title}
                <span className="text-xs font-normal text-slate-400 hidden md:inline">
                  — {activePhase.subtitle}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono">
            <div className="timeline-kpi-pill flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700/40">
              <span className="text-slate-400">PROGRESS</span>
              <span className="text-sky-400 font-bold">{percentComplete}%</span>
            </div>
            <div className="timeline-kpi-pill hidden sm:flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700/40">
              <span className="text-slate-400">TRADE</span>
              <span className="text-emerald-400 font-medium whitespace-nowrap">{activePhase.tradeSpecialty.split('&')[0].trim()}</span>
            </div>

            {/* BIM Execution Sequence Sidebar Toggle Button */}
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className={`p-1.5 sm:p-2 rounded-xl glass-button transition-all border flex items-center gap-1.5 ${
                  isSidebarOpen 
                    ? 'bg-sky-500/20 text-sky-300 border-sky-400/50 shadow-[0_0_10px_rgba(56,189,248,0.25)]' 
                    : 'text-slate-400 hover:text-white border-slate-700/50'
                }`}
                title={isSidebarOpen ? "Hide BIM Execution Sequence Sidebar" : "Show BIM Execution Sequence Sidebar"}
              >
                {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                <span className="hidden xl:inline text-[11px] font-mono">
                  {isSidebarOpen ? 'Hide Sequence' : 'Sequence'}
                </span>
              </button>
            )}

            {/* Collapse HUD Button */}
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 sm:p-2 rounded-xl glass-button text-slate-400 hover:text-white border border-slate-700/50 transition-all"
              title="Minimize Timeline HUD"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrubber / Progress Bar with Phase Milestone Ticks */}
        <div className="relative mb-4 pt-1">
          <input
            type="range"
            min={0}
            max={phases.length - 1}
            step={0.01}
            value={progress}
            onChange={(e) => onScrub(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800/80 rounded-lg appearance-none cursor-pointer accent-sky-400 hover:accent-sky-300 focus:outline-none transition-all"
            style={{
              background: `linear-gradient(to right, #00d2ff 0%, #38bdf8 ${(progress / (phases.length - 1)) * 100}%, rgba(30, 41, 59, 0.7) ${(progress / (phases.length - 1)) * 100}%, rgba(30, 41, 59, 0.7) 100%)`
            }}
          />

          {/* Phase tick markers */}
          <div className="flex justify-between w-full mt-1.5 px-0.5">
            {phases.map((phase) => {
              const isPast = progress >= phase.id;
              const isCurrent = Math.floor(progress) === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => onScrub(phase.id)}
                  title={`${phase.title}: ${phase.subtitle}`}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full border transition-all ${
                      isCurrent
                        ? 'bg-sky-400 border-white scale-125 shadow-[0_0_8px_#38bdf8]'
                        : isPast
                        ? 'bg-sky-600 border-sky-400'
                        : 'bg-slate-700 border-slate-600 group-hover:border-slate-400'
                    }`}
                  />
                  <span className={`text-[10px] font-mono mt-1 transition-colors hidden sm:block ${
                    isCurrent ? 'text-sky-300 font-bold' : isPast ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    P0{phase.id + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Controls Toolbar */}
        <div className="flex items-center justify-between pt-1">
          {/* Left Controls: Reset & Steps */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onReset}
              title="Reset to Ground Excavation (R)"
              className="glass-button p-2 rounded-xl text-slate-300 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onStepPrev}
              disabled={progress <= 0}
              title="Previous Phase (←)"
              className="glass-button p-2 rounded-xl text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onTogglePlay}
              title="Play / Pause Construction (Space)"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span className="text-xs uppercase tracking-wider hidden sm:inline">Pause</span>
                </>
              ) : progress >= phases.length - 1 ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider hidden sm:inline">Replay</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span className="text-xs uppercase tracking-wider hidden sm:inline">Construct</span>
                </>
              )}
            </button>
            <button
              onClick={onStepNext}
              disabled={progress >= phases.length - 1}
              title="Next Phase (→)"
              className="glass-button p-2 rounded-xl text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Center Info Text */}
          <p className="text-xs text-slate-400 hidden lg:block max-w-sm truncate text-center">
            {activePhase.description}
          </p>

          {/* Right Controls: Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-700/40">
            <FastForward className="w-3.5 h-3.5 text-slate-400 ml-1.5 hidden sm:block" />
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`px-2 py-1 text-xs font-mono font-medium rounded-lg transition-colors ${
                  playbackSpeed === s
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
