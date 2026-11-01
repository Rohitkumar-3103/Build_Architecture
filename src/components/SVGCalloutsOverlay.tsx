import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SceneManager } from '../engine/SceneManager';
import { CALLOUTS_DATA } from '../building/CalloutsData';
import { CalloutAnnotation, CalloutScreenPos } from '../types';

interface SVGCalloutsOverlayProps {
  sceneManager: SceneManager | null;
  progress: number;
  enabled: boolean;
  callouts?: CalloutAnnotation[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
}

export const SVGCalloutsOverlay: React.FC<SVGCalloutsOverlayProps> = ({
  sceneManager,
  progress,
  enabled,
  callouts = CALLOUTS_DATA,
  selectedComponentId,
  onSelectComponent,
}) => {
  const [renderedCallouts, setRenderedCallouts] = useState<CalloutScreenPos[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sceneManager || !enabled) {
      setRenderedCallouts([]);
      return;
    }

    const currentPhase = Math.floor(progress);

    const updatePositions = () => {
      if (!sceneManager || !enabled) return;

      const activeAnnotations = callouts.filter((c) => {
        // Show annotations for current active phase, or if selected
        return c.phaseId === currentPhase || (selectedComponentId && c.componentId === selectedComponentId);
      });

      const updated: CalloutScreenPos[] = [];
      const width = window.innerWidth;
      const height = window.innerHeight;

      activeAnnotations.forEach((ann) => {
        // Adjust for exploded offset if model is exploded
        const worldPos = sceneManager.building.getExplodedPosition(ann.componentId, ann.worldPosition);
        const proj = sceneManager.projectWorldToScreen(worldPos);

        if (!proj.inFront) return;

        // Ensure within screen boundary margins
        if (proj.x < 20 || proj.x > width - 20 || proj.y < 20 || proj.y > height - 20) return;

        // Auto-detect direction to prevent any screen clipping
        // If anchor is near screen edges or sidebar, point towards open canvas
        let pointsLeft = proj.x > width / 2;
        if (proj.x < 360) pointsLeft = false; // Near left edge/sidebar: point right
        if (proj.x > width - 360) pointsLeft = true; // Near right edge: point left

        const dx = pointsLeft ? -65 : 65;
        const dy = proj.y < 220 ? 40 : (proj.y > height - 180 ? -40 : -35);

        const elbowX = proj.x + dx;
        const elbowY = proj.y + dy;
        const badgeX = pointsLeft ? elbowX - 25 : elbowX + 25;
        const badgeY = elbowY;

        updated.push({
          annotation: {
            ...ann,
            offsetSide: pointsLeft ? 'top-left' : 'top-right'
          },
          screenX: proj.x,
          screenY: proj.y,
          elbowX,
          elbowY,
          badgeX,
          badgeY,
          visible: true,
        });
      });

      setRenderedCallouts(updated);
    };

    // Bind to render tick
    sceneManager.onRenderTick = updatePositions;

    return () => {
      if (sceneManager) {
        sceneManager.onRenderTick = null;
      }
    };
  }, [sceneManager, progress, enabled, selectedComponentId, callouts]);

  if (!enabled || renderedCallouts.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
    >
      {/* SVG Leader Lines Layer */}
      <svg className="w-full h-full block absolute inset-0">
        <defs>
          <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {renderedCallouts.map(({ annotation, screenX, screenY, elbowX, elbowY, badgeX, badgeY }) => {
          const isSelected = selectedComponentId === annotation.componentId;
          const isHovered = hoveredId === annotation.id;
          const strokeColor = isSelected || isHovered ? '#38bdf8' : '#00d2ff';
          const strokeOpacity = isSelected || isHovered ? 1 : 0.75;
          const strokeWidth = isSelected || isHovered ? 2.0 : 1.4;

          return (
            <g key={annotation.id} className="transition-all duration-150">
              {/* Outer pulsing ring at 3D anchor point */}
              <circle
                cx={screenX}
                cy={screenY}
                r="7"
                fill="none"
                stroke={strokeColor}
                strokeWidth="1.2"
                strokeDasharray="2 2"
                opacity="0.6"
              />
              {/* Solid center anchor dot */}
              <circle
                cx={screenX}
                cy={screenY}
                r="3.5"
                fill={strokeColor}
                filter="url(#glow)"
              />

              {/* 3-Point Leader Path: Anchor -> 45deg Elbow -> Horizontal Extension */}
              <path
                d={`M ${screenX} ${screenY} L ${elbowX} ${elbowY} L ${badgeX} ${badgeY}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeOpacity={strokeOpacity}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={isSelected || isHovered ? 'url(#glow)' : undefined}
              />

              {/* Terminal badge notch dot */}
              <circle
                cx={badgeX}
                cy={badgeY}
                r="2.5"
                fill={strokeColor}
              />
            </g>
          );
        })}
      </svg>

      {/* HTML Callout Badges / Labels Layer */}
      {renderedCallouts.map(({ annotation, badgeX, badgeY }) => {
        const isSelected = selectedComponentId === annotation.componentId;
        const isHovered = hoveredId === annotation.id;
        const isLeftAligned = (annotation.offsetSide || 'top-right').includes('right');

        return (
          <div
            key={annotation.id}
            style={{
              left: `${badgeX}px`,
              top: `${badgeY}px`,
              transform: isLeftAligned
                ? 'translate(8px, -50%)'
                : 'translate(calc(-100% - 8px), -50%)',
            }}
            className={`absolute pointer-events-auto cursor-pointer transition-all duration-200 group ${
              isSelected ? 'scale-105 z-30' : 'hover:scale-102 z-20'
            }`}
            onClick={() => onSelectComponent(annotation.componentId)}
            onMouseEnter={() => setHoveredId(annotation.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className={`px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-xl transition-all ${
                isSelected
                  ? 'bg-sky-950/90 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                  : isHovered
                  ? 'bg-slate-900/90 border-sky-400/80 text-white shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                  : 'bg-slate-950/80 border-sky-500/30 text-slate-200 hover:border-sky-400/60'
              }`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  {annotation.tag}
                </span>
                <span className="text-xs font-bold tracking-tight group-hover:text-sky-300 transition-colors">
                  {annotation.label}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {annotation.sublabel}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
