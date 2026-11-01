import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Mic, 
  MicOff, 
  Volume2, 
  Wrench, 
  Layers, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ConstructionPhase } from '../types';

interface StepGuidePanelProps {
  phase: ConstructionPhase;
  phaseIndex: number;
  totalPhases: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSelectStep: (idx: number) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  isSpeaking: boolean;
  speakingText: string;
  onReplayVoice: () => void;
}

export const StepGuidePanel: React.FC<StepGuidePanelProps> = ({
  phase,
  phaseIndex,
  totalPhases,
  onNextStep,
  onPrevStep,
  onSelectStep,
  voiceEnabled,
  onToggleVoice,
  isSpeaking,
  speakingText,
  onReplayVoice,
}) => {
  const isFirst = phaseIndex === 0;
  const isLast = phaseIndex === totalPhases - 1;

  // Calculate estimated days left
  const daysRemaining = (totalPhases - phaseIndex) * (phase.daysEstimate || 15);

  return (
    <aside aria-label="Step-by-step construction assembly guide" className="absolute bottom-6 left-6 z-20 w-[420px] max-w-[calc(100vw-3rem)] pointer-events-auto">
      <div className="glass-panel rounded-2xl p-5 text-white shadow-2xl border border-sky-500/25 backdrop-blur-xl">
        
        {/* Step Eyebrow & Timer Pill */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-sky-500/20 text-cyan-600 border border-sky-400/40 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              CONSTRUCTION STEP {phaseIndex + 1} OF {totalPhases}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold text-emerald-600 bg-emerald-500/15 border border-emerald-500/30">
              {phase.badge.split('//')[1]?.trim() || phase.badge}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded-lg border border-slate-700/50">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>~{daysRemaining}d est.</span>
          </div>
        </div>

        {/* Step Title & Subtitle */}
        <div className="mb-3">
          <h2 className="text-lg font-bold tracking-tight text-white flex items-center justify-between">
            <span>{phase.title}</span>
            <span className="text-xs font-mono font-semibold text-cyan-400">
              {Math.round(((phaseIndex + 1) / totalPhases) * 100)}%
            </span>
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-0.5">
            {phase.subtitle}
          </p>
        </div>

        {/* Bygga-style Voice Narration Banner */}
        <div className={`step-guide-voice-box mb-3.5 p-3 rounded-xl border transition-all ${
          isSpeaking 
            ? 'bg-gradient-to-r from-sky-950/80 to-cyan-950/80 border-cyan-400/60 shadow-[0_0_15px_rgba(56,189,248,0.2)]' 
            : 'bg-slate-900/70 border-slate-700/60'
        }`}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleVoice}
                title={voiceEnabled ? "Mute Voice Narration" : "Turn on Voice Narration (Hands-free)"}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  voiceEnabled
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              </button>
              
              <div className="text-xs">
                {isSpeaking ? (
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-300 font-semibold font-mono text-[11px] flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      ENGINEER SPEAKING
                    </span>
                    {/* Animated waveform bars */}
                    <div className="flex items-center gap-0.5 h-3">
                      <span className="w-0.5 h-3 bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-0.5 h-2 bg-cyan-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-0.5 h-3.5 bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="w-0.5 h-1.5 bg-cyan-300 animate-bounce" style={{ animationDelay: '450ms' }} />
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-slate-200 font-semibold block text-[11px]">
                      {voiceEnabled ? 'Hands-Free Voice Active' : 'Hands full? Turn on Voice'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {voiceEnabled ? 'Narrating step instructions aloud' : 'Each step is read aloud automatically'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Replay voice button */}
            <button
              onClick={onReplayVoice}
              title="Replay Voice Guidance"
              className="px-2 py-1 rounded-lg bg-sky-950/60 border border-sky-500/30 hover:border-sky-400 text-sky-300 hover:text-white text-[11px] font-mono flex items-center gap-1 transition-colors"
            >
              <Volume2 className="w-3 h-3" />
              <span>Read</span>
            </button>
          </div>

          {/* Spoken subtitle captions */}
          {isSpeaking && speakingText && (
            <p className="mt-2 text-[11px] text-cyan-200/90 italic border-t border-sky-500/20 pt-1.5 font-sans leading-relaxed">
              "{speakingText}"
            </p>
          )}
        </div>

        {/* Engineering Description */}
        <p className="step-guide-desc-box text-xs text-slate-300 leading-relaxed mb-3.5 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
          {phase.description}
        </p>

        {/* Required Tools & Equipment */}
        {phase.toolsRequired && phase.toolsRequired.length > 0 && (
          <div className="mb-2.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1.5 font-semibold">
              <Wrench className="w-3 h-3 text-cyan-400" />
              Equipment &amp; Tools Needed
            </span>
            <div className="flex flex-wrap gap-1.5">
              {phase.toolsRequired.map((tool, idx) => (
                <span
                  key={idx}
                  className="step-guide-tool-tag px-2 py-0.5 rounded-md text-[10px] font-mono bg-sky-950/60 border border-sky-500/30 text-sky-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Required Materials */}
        {phase.materialsRequired && phase.materialsRequired.length > 0 && (
          <div className="mb-3.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1.5 font-semibold">
              <Layers className="w-3 h-3 text-emerald-400" />
              Materials &amp; Assembly Parts
            </span>
            <div className="flex flex-wrap gap-1.5">
              {phase.materialsRequired.map((mat, idx) => (
                <span
                  key={idx}
                  className="step-guide-mat-tag px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-950/40 border border-emerald-500/30 text-emerald-200"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Safety Protocol */}
        <div className="step-guide-safety-box flex items-center gap-1.5 text-[10px] font-mono text-amber-300/90 bg-amber-950/30 border border-amber-500/20 px-2.5 py-1 rounded-lg mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">{phase.safetyProtocol}</span>
        </div>

        {/* Step Navigation Bar */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onPrevStep}
            disabled={isFirst}
            className={`step-guide-back-btn px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isFirst
                ? 'opacity-30 cursor-not-allowed text-slate-500 bg-slate-900'
                : 'text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Quick step jump dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPhases }).map((_, i) => (
              <button
                key={i}
                onClick={() => onSelectStep(i)}
                title={`Jump to Step ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === phaseIndex
                    ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#38bdf8]'
                    : i < phaseIndex
                    ? 'w-2 bg-sky-600 hover:bg-sky-400'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={onNextStep}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg ${
              isLast
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-emerald-500/30 hover:brightness-110'
                : 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-sky-500/30 hover:brightness-110'
            }`}
          >
            {isLast ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Assembled!</span>
              </>
            ) : (
              <>
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </aside>
  );
};
