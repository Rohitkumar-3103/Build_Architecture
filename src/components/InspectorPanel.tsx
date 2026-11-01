import React from 'react';
import { X, Layers, Scale, Box, ShieldCheck, Leaf, Activity } from 'lucide-react';
import { BuildingComponentData } from '../types';

interface InspectorPanelProps {
  component: BuildingComponentData | null;
  onClose: () => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({ component, onClose }) => {
  if (!component) return null;

  return (
    <div className="absolute top-20 right-6 z-20 w-80 sm:w-96 animate-in fade-in slide-in-from-right-4 duration-200">
      <div className="glass-panel rounded-2xl p-4 sm:p-5 text-white shadow-2xl border border-sky-400/30">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-sky-950/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 uppercase">
                {component.category}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                PHASE 0{component.phaseId + 1}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">
              {component.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white glass-button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Material & Dimension Specs */}
        <div className="py-3 space-y-2 text-xs border-b border-sky-950/60">
          <div className="flex items-start justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" /> Material:
            </span>
            <span className="text-slate-200 font-medium text-right max-w-[200px]">
              {component.materialName}
            </span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-sky-400" /> Dimensions:
            </span>
            <span className="text-slate-200 font-mono text-right max-w-[200px]">
              {component.dimensions}
            </span>
          </div>

          {component.weightTons && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-sky-400" /> Structural Weight:
              </span>
              <span className="text-slate-200 font-mono">
                {component.weightTons} tons
              </span>
            </div>
          )}

          {component.volumeM3 && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-400" /> Volume:
              </span>
              <span className="text-slate-200 font-mono">
                {component.volumeM3} m³
              </span>
            </div>
          )}

          {component.carbonFootprintKg !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Embodied Carbon:
              </span>
              <span className={`font-mono font-semibold ${
                component.carbonFootprintKg < 0 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {component.carbonFootprintKg > 0 ? `+${component.carbonFootprintKg}` : component.carbonFootprintKg} kg CO₂e
              </span>
            </div>
          )}
        </div>

        {/* Structural Role Narrative */}
        <div className="py-3 border-b border-sky-950/60">
          <div className="text-[11px] font-mono text-sky-400 mb-1 uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Structural Engineering Function
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {component.structuralRole}
          </p>
        </div>

        {/* Technical Bullet Specifications */}
        <div className="pt-3">
          <div className="text-[11px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
            Execution Standards & QC
          </div>
          <ul className="space-y-1">
            {component.specifications.map((spec, i) => (
              <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                <span className="text-sky-400 font-bold">•</span>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
