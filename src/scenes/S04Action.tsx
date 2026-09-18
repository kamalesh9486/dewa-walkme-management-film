import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, F } from '../tokens';
import { anim, easeOutBack, easeInCubic } from '../easings';
import { Chrome } from '../components/Chrome';

const LEFT_STEPS = [
  'Customer messages RAMMAS',
  'RAMMAS returns a link',
  'Customer navigates manually',
];

const RIGHT_STEPS = [
  'Customer messages RAMMAS',
  'WalkMe Action Bar activates',
  'Guided journey opens in-app',
  'Task completed — first time right',
];

export const S04Action: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const T = frame / fps;
  const total = durationInFrames / fps;

  const CUE_PANELS  = 0.5;
  const CUE_LSTEPS  = 1.2;
  const CUE_RSTEPS  = 2.5;
  const CUE_LOUT    = 4.8;
  const CUE_ROUT    = 5.6;
  const CUE_SAV     = 7.2;
  const CUE_CAP     = 10.5;

  const titleOp  = anim(T, 0, 1, 0.1, 0.7);
  const panelOp  = anim(T, 0, 1, CUE_PANELS, CUE_PANELS + 0.6);
  const panelX   = anim(T, 40, 0, CUE_PANELS, CUE_PANELS + 0.7, easeOutBack);
  const savOp    = anim(T, 0, 1, CUE_SAV, CUE_SAV + 0.6, easeOutBack);
  const capOp    = anim(T, 0, 1, CUE_CAP + 0.2, CUE_CAP + 1.0);

  const LStep = (text: string, i: number) => {
    const d = CUE_LSTEPS + i * 0.7;
    const o = Math.max(0, Math.min(1, anim(T, 0, 1, d, d + 0.5, easeOutBack)));
    return (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: o, transform: `translateX(${(1 - o) * -20}px)` }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: C.muted, fontWeight: 800, fontSize: 14,
        }}>{i + 1}</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: 'rgba(244,250,246,0.7)' }}>{text}</div>
      </div>
    );
  };

  const RStep = (text: string, i: number) => {
    const d = CUE_RSTEPS + i * 0.65;
    const o = Math.max(0, Math.min(1, anim(T, 0, 1, d, d + 0.5, easeOutBack)));
    return (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: o, transform: `translateX(${(1 - o) * 20}px)` }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(46,213,115,0.15)', border: `1px solid ${C.bright}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: C.bright, fontWeight: 800, fontSize: 14,
        }}>{i + 1}</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: C.white }}>{text}</div>
      </div>
    );
  };

  const leftOutOp  = Math.max(0, Math.min(1, anim(T, 0, 1, CUE_LOUT, CUE_LOUT + 0.5)));
  const rightOutOp = Math.max(0, Math.min(1, anim(T, 0, 1, CUE_ROUT, CUE_ROUT + 0.5, easeOutBack)));

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: F, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(0,166,81,0.12), transparent 60%)' }} />
      <Chrome T={T} total={total} sceneNum={4} />

      {/* Heading */}
      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.bright, letterSpacing: 3, marginBottom: 6, textTransform: 'uppercase' }}>RAMMAS + WalkMe</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: C.white, lineHeight: 1.3, maxWidth: 840, margin: '0 auto' }}>
          From an answer — to a completed journey.
        </div>
      </div>

      {/* Left panel — RAMMAS TODAY */}
      <div style={{
        position: 'absolute', left: 0, top: 110, bottom: 0, width: 890,
        padding: '52px 64px',
        background: 'rgba(5,16,10,0.7)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        opacity: panelOp,
        transform: `translateX(${-panelX}px)`,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 4, marginBottom: 18, textTransform: 'uppercase' }}>
          RAMMAS Today
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 44 }}>
          {LEFT_STEPS.map((s, i) => LStep(s, i))}
        </div>

        {/* Connector dots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 28, paddingLeft: 14 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>

        {/* JOURNEY STOPS outcome */}
        <div style={{
          opacity: leftOutOp,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '10px 20px', borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.18)',
          background: 'rgba(255,255,255,0.04)',
        }}>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)' }}>✗</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase' }}>
            Journey Stops Here
          </div>
        </div>
      </div>

      {/* Center divider */}
      <div style={{
        position: 'absolute', top: 130, bottom: 0,
        left: '50%', transform: 'translateX(-50%)',
        width: 140,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 8, opacity: panelOp,
      }}>
        <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.08)' }} />
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: C.bg, border: `1px solid rgba(255,255,255,0.14)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: C.muted,
        }}>vs</div>
        <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.08)' }} />
      </div>

      {/* Right panel — WITH WALKME */}
      <div style={{
        position: 'absolute', right: 0, top: 110, bottom: 0, width: 890,
        padding: '52px 64px',
        background: 'rgba(0,166,81,0.06)',
        borderLeft: `1px solid rgba(46,213,115,0.18)`,
        opacity: panelOp,
        transform: `translateX(${panelX}px)`,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.bright, letterSpacing: 4, marginBottom: 18, textTransform: 'uppercase' }}>
          With WalkMe
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 44 }}>
          {RIGHT_STEPS.map((s, i) => RStep(s, i))}
        </div>

        {/* TASK COMPLETE outcome */}
        <div style={{
          opacity: rightOutOp,
          transform: `scale(${0.9 + 0.1 * rightOutOp})`,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '10px 22px', borderRadius: 10,
          border: `1.5px solid ${C.bright}`,
          background: 'rgba(46,213,115,0.10)',
          boxShadow: rightOutOp > 0.5 ? `0 0 28px rgba(46,213,115,0.25)` : 'none',
        }}>
          <div style={{ fontSize: 20, color: C.bright }}>✓</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.bright, letterSpacing: 2, textTransform: 'uppercase' }}>
            Task Complete
          </div>
        </div>

        {/* Savings annotation */}
        <div style={{ marginTop: 32, opacity: savOp }}>
          <div style={{ fontSize: 42, fontWeight: 800, color: C.white }}>$1.35M</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>
            Estimated replacement savings · Subject to validation
          </div>
        </div>
      </div>

      {/* Caption */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 36, display: 'flex', justifyContent: 'center', opacity: capOp }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.white, maxWidth: 1000, textAlign: 'center', lineHeight: 1.4, fontStyle: 'italic' }}>
          "Proposed: answer the question, then guide the completion."
        </div>
      </div>
    </AbsoluteFill>
  );
};
