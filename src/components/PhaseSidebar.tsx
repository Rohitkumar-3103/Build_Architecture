import React, { useState } from 'react';
import { 
  Shovel, 
  Layers, 
  Grid3X3, 
  Boxes, 
  Maximize2, 
  Armchair, 
  Sun, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { PHASES as DEFAULT_PHASES } from '../building/BuildingModel';
import { ConstructionPhase } from '../types';

interface PhaseSidebarProps {
  progress: number;
  phases?: ConstructionPhase[];
  onSelectPhase: (phaseId: number) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const PhaseSidebar: React.FC<PhaseSidebarProps> = ({ 
  progress, 
  phases = DEFAULT_PHASES, 
  onSelectPhase,
  collapsed: externalCollapsed,
  onToggleCollapse: externalOnToggleCollapse
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  const toggleCollapse = externalOnToggleCollapse || (() => setInternalCollapsed(!internalCollapsed));

  const getPhaseIcon = (id: number) => {
    switch (id) {
      case 0: return <Shovel className="w-4 h-4" />;
      case 1: return <Layers className="w-4 h-4" />;
      case 2: return <Grid3X3 className="w-4 h-4" />;
      case 3: return <Boxes className="w-4 h-4" />;
      case 4: return <Maximize2 className="w-4 h-4" />;
      case 5: return <Armchair className="w-4 h-4" />;
      case 6: return <Sun className="w-4 h-4" />;
      case 7: return <Sparkles className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const currentPhaseIndex = Math.min(phases.length - 1, Math.floor(progress));

  return (
    <aside className={`absolute top-20 left-6 z-20 transition-all duration-300 ${
      isCollapsed ? 'w-14' : 'w-72 sm:w-80'
    }`}>
      <div className="glass-panel rounded-2xl p-3 sm:p-4 text-white max-h-[calc(100vh-270px)] flex flex-col shadow-2xl">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sky-950/60 mb-2">
          {!isCollapsed && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-semibold">
                BIM Execution Sequence
              </div>
              <div className="text-xs text-slate-400">
                8 Construction Milestones
              </div>
            </div>
          )}
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg glass-button text-slate-400 hover:text-white ml-auto"
            title={isCollapsed ? "Expand Sequence" : "Collapse Sequence"}
          >
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Phase List */}
        <div className="space-y-1.5 overflow-y-auto pr-1 flex-1">
          {phases.map((phase) => {
            const isCompleted = progress >= phase.id + 1;
            const isCurrent = currentPhaseIndex === phase.id;
            const isPending = progress < phase.id;

            return (
              <button
                key={phase.id}
                onClick={() => onSelectPhase(phase.id)}
                className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 group relative sidebar-phase-item ${
                  isCurrent
                    ? 'sidebar-phase-current bg-sky-500/20 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : isCompleted
                    ? 'sidebar-phase-completed bg-slate-900/40 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50'
                    : 'sidebar-phase-pending bg-slate-900/20 opacity-50 hover:opacity-80 border border-transparent'
                }`}
              >
                {/* Status indicator icon */}
                <div className={`p-2 rounded-lg transition-colors shrink-0 ${
                  isCurrent
                    ? 'bg-sky-400 text-slate-950 font-bold'
                    : isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : getPhaseIcon(phase.id)}
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">
                        STAGE 0{phase.id + 1}
                      </span>
                      {isCurrent && (
                        <span className="text-[9px] font-mono bg-sky-400 text-slate-950 px-1.5 py-0.2 rounded font-bold uppercase animate-pulse">
                          Active
                        </span>
                      )}
                    </div>
                    <div className={`text-xs font-semibold truncate ${
                      isCurrent ? 'text-sky-300' : isCompleted ? 'text-slate-200' : 'text-slate-400'
                    }`}>
                      {phase.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {phase.subtitle}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
