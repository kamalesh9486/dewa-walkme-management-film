import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, F } from '../tokens';
import { anim, easeOutBack } from '../easings';
import { Chrome } from '../components/Chrome';

const STREAMS = [
  'Fewer customer tickets',
  'Fewer escalations',
  'Less custom development',
  'Faster onboarding',
  'Lower employee support demand',
  'Easier change management',
  'Less rework & errors',
  'RAMMAS replacement',
];

export const S05Streams: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const T = frame / fps;
  const total = durationInFrames / fps;

  const CUE_CAP = 11.0;
  const R = 300;

  const titleOp  = anim(T, 0, 1, 0.2, 1.0);
  const centerOp = anim(T, 0, 1, 0.5, 1.2, easeOutBack);
  const noteOp   = anim(T, 0, 1, 9.0, 9.8);
  const capOp    = anim(T, 0, 1, CUE_CAP + 0.2, CUE_CAP + 1.0);
  const capY     = anim(T, 20, 0, CUE_CAP + 0.2, CUE_CAP + 1.0);

  const cC = Math.max(0, Math.min(1, centerOp));

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: F, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,166,81,0.14), transparent 60%)' }} />
      <Chrome T={T} total={total} sceneNum={5} />

      {/* Title */}
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, textAlign: 'center', opacity: titleOp, zIndex: 2 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.bright, letterSpacing: 3, marginBottom: 6 }}>THE VALUE MODEL</div>
        <div style={{ fontSize: 30, fontWeight: 800, color: C.white, lineHeight: 1.3, maxWidth: 800, margin: '0 auto' }}>
          Eight value streams, one adoption programme.
        </div>
      </div>

      {/* Connecting lines SVG */}
      <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {STREAMS.map((_, i) => {
          const c = Math.max(0, Math.min(1, anim(T, 0, 1, 0.8 + i * 0.65, 0.8 + i * 0.65 + 0.5)));
          const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * R * c;
          const y = Math.sin(angle) * R * c;
          return (
            <line
              key={i}
              x1={960} y1={540}
              x2={960 + x} y2={540 + y}
              stroke={`rgba(46,213,115,${0.18 * c})`}
              strokeWidth={1.5}
              strokeDasharray="4 8"
            />
          );
        })}
      </svg>

      {/* Orbit nodes */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {STREAMS.map((label, i) => {
          const c = Math.max(0, Math.min(1, anim(T, 0, 1, 0.8 + i * 0.65, 0.8 + i * 0.65 + 0.55, easeOutBack)));
          const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * R;
          const y = Math.sin(angle) * R;
          return (
            <div key={i} style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: `translate(calc(-50% + ${x * c}px), calc(-50% + ${y * c}px))`,
              opacity: c,
              width: 214,
              background: 'rgba(255,255,255,0.055)',
              border: `1.5px solid rgba(46,213,115,${0.25 + 0.45 * c})`,
              borderRadius: 12,
              padding: '11px 15px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: c > 0.7 ? `0 0 18px rgba(46,213,115,0.12), inset 0 0 14px rgba(46,213,115,0.04)` : 'none',
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                background: C.bright,
                boxShadow: `0 0 10px ${C.bright}`,
              }} />
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white, lineHeight: 1.3 }}>{label}</div>
            </div>
          );
        })}

        {/* Centre node */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: `translate(-50%, -50%) scale(${0.75 + 0.25 * cC})`,
          opacity: cC,
          width: 240, height: 240, borderRadius: '50%',
          background: `radial-gradient(circle at 50% 40%, rgba(46,213,115,0.18), rgba(46,213,115,0.06))`,
          border: `2px solid ${C.bright}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(46,213,115,0.25), inset 0 0 40px rgba(46,213,115,0.08)',
        }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.white, lineHeight: 1.2 }}>Better</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.bright, lineHeight: 1.2 }}>Adoption</div>
          </div>
        </div>
      </div>

      {/* Caveat note */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 96, display: 'flex', justifyContent: 'center', opacity: noteOp }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.bright, padding: '8px 18px', borderRadius: 999, border: `1px solid rgba(46,213,115,0.4)` }}>
          Productivity & cost avoidance — not guaranteed cash savings
        </div>
      </div>

      {/* Caption */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 44, display: 'flex', justifyContent: 'center', opacity: capOp, transform: `translateY(${capY}px)` }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.white, maxWidth: 1000, textAlign: 'center', lineHeight: 1.4, fontStyle: 'italic' }}>
          "One programme — connecting Al Hasbah to the moment of work."
        </div>
      </div>
    </AbsoluteFill>
  );
};
