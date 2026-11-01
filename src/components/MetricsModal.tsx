import React from 'react';
import { X, Building2, Trees, DollarSign, Award, Layers, Zap } from 'lucide-react';
import { PHASES } from '../building/BuildingModel';

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetricsModal: React.FC<MetricsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const metrics = [
    {
      label: 'Gross Internal Area (GIA)',
      value: '460 m²',
      subtext: 'Ground + Cantilever Level 1 + Sky Terrace',
      icon: <Building2 className="w-5 h-5 text-sky-400" />
    },
    {
      label: 'Total Structural Concrete',
      value: '412.0 m³',
      subtext: 'High-Strength C35/45 Self-Compacting',
      icon: <Layers className="w-5 h-5 text-indigo-400" />
    },
    {
      label: 'Structural Steel Tonnage',
      value: '54.8 Tons',
      subtext: 'ASTM A992 Grade 50 Recycled Steel',
      icon: <Award className="w-5 h-5 text-amber-400" />
    },
    {
      label: 'Architectural Glazing Area',
      value: '285.0 m²',
      subtext: 'Low-E Acoustic Argon-Filled Cavity',
      icon: <Zap className="w-5 h-5 text-cyan-400" />
    },
    {
      label: 'Estimated Project Budget',
      value: '$2,850,000',
      subtext: 'Shell, Core, Interior Joinery & Finishes',
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />
    },
    {
      label: 'Net Embodied Carbon Balance',
      value: '-8.2 Tons CO₂e',
      subtext: 'Net-zero operational with 3.6 kWp Solar PV',
      icon: <Trees className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 text-white shadow-2xl border border-sky-400/30 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sky-950/60 mb-6">
          <div>
            <div className="text-xs font-mono text-sky-400 uppercase tracking-widest">
              BIM Project Intelligence
            </div>
            <h2 className="text-xl font-bold text-slate-100">
              Architectural & Engineering Material Schedule
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white glass-button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800/80 hover:border-sky-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-slate-800/80">
                  {m.icon}
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    {m.label}
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    {m.value}
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-slate-400">
                {m.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Phase Trade Breakdown Table */}
        <div className="bg-slate-900/40 rounded-2xl p-4 border border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
            Milestone Trade Responsibilities
          </div>
          <div className="space-y-2">
            {PHASES.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sky-400 text-[10px]">
                    0{p.id + 1}
                  </span>
                  <span className="font-medium text-slate-200">
                    {p.title}
                  </span>
                </div>
                <span className="text-slate-400 text-[11px]">
                  {p.tradeSpecialty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-sky-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Project Reference: ARCH-VILLA-2026-BIM</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-all"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
