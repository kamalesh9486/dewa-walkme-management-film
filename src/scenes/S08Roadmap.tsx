import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, F } from '../tokens';
import { anim, easeOutBack, easeInCubic } from '../easings';
import { Chrome } from '../components/Chrome';

export const S08Roadmap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const T = frame / fps;
  const total = durationInFrames / fps;

  const CUE_P2  = 4.2;
  const CUE_P3  = 8.0;
  const CUE_CAP = 11.5;

  const titleOp = anim(T, 0, 1, 0.2, 1.0);
  const p1out   = anim(T, 0, 1, CUE_P2 - 0.5, CUE_P2 - 0.1, easeInCubic);
  const p1op    = Math.max(0, anim(T, 0, 1, 0.5, 1.0) - p1out);
  const p2out   = anim(T, 0, 1, CUE_P3 - 0.5, CUE_P3 - 0.1, easeInCubic);
  const p2op    = Math.max(0, anim(T, 0, 1, CUE_P2, CUE_P2 + 0.5) - p2out);
  const p3op    = anim(T, 0, 1, CUE_P3, CUE_P3 + 0.5);
  const scaleW  = anim(T, 0.25, 1, CUE_P3 + 0.5, CUE_P3 + 3.5);
  const capOp   = anim(T, 0, 1, CUE_CAP + 0.2, CUE_CAP + 0.8);

  const StepNode = (label: string, sub: string, active: boolean, opacity: number) => {
    const c = Math.max(0, Math.min(1, opacity));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: 260, opacity: c, transform: `translateY(${(1 - c) * 24}px)` }}>
        <div style={{
          width: 58, height: 58, borderRadius: '50%',
          background: active ? 'rgba(46,213,115,0.16)' : 'rgba(255,255,255,0.05)',
          border: `2px solid ${active ? C.bright : 'rgba(255,255,255,0.15)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, fontWeight: 800, color: C.white,
        }}>{label[0]}</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: C.white, textAlign: 'center' }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.muted, textAlign: 'center', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{sub}</div>
      </div>
    );
  };

  const METRICS = ['Completion time', 'Support demand', 'Errors', 'Adoption', 'Time to competency'];

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: F, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(0,166,81,0.14), transparent 60%)' }} />
      <Chrome T={T} total={total} sceneNum={8} label="S08 / 09 — PROVE. MEASURE. SCALE." />

      {/* Heading */}
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.bright, letterSpacing: 3, marginBottom: 8 }}>THE ROLLOUT PLAN</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: C.white, lineHeight: 1.3, maxWidth: 900, margin: '0 auto' }}>
          A phased path from evidence to scale.
        </div>
      </div>

      {/* Phase 1 — Baseline */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: Math.max(0, p1op) }}>
        {StepNode('Baseline', 'Security, scope and\nmeasures established', true, p1op)}
      </div>

      {/* Phase 2 — 100 Days */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: Math.max(0, p2op) }}>
        {StepNode('100 Days', 'Prove the highest-impact\njourneys, enable DEWA builders', true, p2op)}
      </div>

      {/* Phase 3 — Scale */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, opacity: Math.max(0, p3op) }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: C.muted }}>1,000</div>
          <div style={{ fontSize: 28, color: C.bright }}>→</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: C.white }}>3,000</div>
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>Employees, as results justify</div>
        <div style={{ width: 560, height: 14, borderRadius: 8, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{ width: `${scaleW * 100}%`, height: '100%', background: `linear-gradient(90deg,${C.green},${C.bright})`, boxShadow: '0 0 20px rgba(46,213,115,0.5)' }} />
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.bright, letterSpacing: 1, textTransform: 'uppercase' }}>Track before scaling</div>
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900, opacity: scaleW > 0.4 ? 1 : 0 }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{ fontSize: 14, fontWeight: 700, color: C.bright, padding: '6px 12px', borderRadius: 999, border: `1px solid rgba(46,213,115,0.4)` }}>{m}</div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 130, display: 'flex', justifyContent: 'center', opacity: capOp }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: C.white, maxWidth: 1100, textAlign: 'center', lineHeight: 1.4, fontStyle: 'italic' }}>
          "Release the next phase on evidence, not on assumptions."
        </div>
      </div>
    </AbsoluteFill>
  );
};
