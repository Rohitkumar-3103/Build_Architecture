import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface KeyboardHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardHelpModal: React.FC<KeyboardHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', desc: 'Play / Pause construction sequence' },
    { key: '← / →', desc: 'Step to previous / next construction phase' },
    { key: 'G', desc: 'Toggle Bygga-style Step-by-Step Guide vs Assembled View' },
    { key: 'V', desc: 'Toggle Hands-Free Spoken Voice Narration' },
    { key: '1 - 8', desc: 'Jump directly to Phase 1 through 8' },
    { key: 'B', desc: 'Toggle CAD Blueprint wireframe mode' },
    { key: 'C', desc: 'Toggle Gypsum Museum Clay model' },
    { key: 'P', desc: 'Return to Realistic PBR rendering' },
    { key: 'E', desc: 'Toggle 50% Exploded View disassembly' },
    { key: 'O', desc: 'Toggle True Orthographic CAD Camera vs Perspective' },
    { key: 'L', desc: 'Toggle SVG technical callout leader lines' },
    { key: 'R', desc: 'Reset sequence to Site Excavation' },
    { key: 'Esc', desc: 'Deselect highlighted part / Close dialogs' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 text-white shadow-2xl border border-sky-400/30">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sky-950/60 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Keyboard Shortcuts & Controls
              </h2>
              <p className="text-xs text-slate-400">
                Quick CAD Navigation & Animation Hotkeys
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white glass-button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="space-y-2 mb-6 max-h-[60vh] overflow-y-auto pr-1">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs"
            >
              <span className="text-slate-300">
                {s.desc}
              </span>
              <kbd className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-sky-300 font-mono font-semibold shadow-inner">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Mouse controls hint */}
        <div className="p-3 rounded-2xl bg-sky-950/30 border border-sky-800/30 text-xs text-slate-300 mb-6">
          <span className="text-sky-400 font-semibold">Mouse Orbit:</span> Left-click & drag to rotate 3D view. Right-click & drag to pan. Scroll wheel to zoom. Click any building element to inspect engineering specifications.
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
