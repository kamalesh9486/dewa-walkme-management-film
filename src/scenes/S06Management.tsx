import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, F } from '../tokens';
import { anim, easeOutBack, easeInCubic } from '../easings';
import { Chrome } from '../components/Chrome';

export const S06Management: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const T = frame / fps;
  const total = durationInFrames / fps;

  const CUE_TL    = 6.5;
  const CUE_RATIO = 9.5;
  const CUE_CAP   = 12.5;

  const titleOp  = anim(T, 0, 1, 0.2, 1.0);
  const barsOut  = anim(T, 0, 1, CUE_TL - 0.5, CUE_TL - 0.1, easeInCubic);
  const barsOp   = Math.max(0, anim(T, 0, 1, 0.5, 1.0) - barsOut);
  const tlOut    = anim(T, 0, 1, CUE_RATIO - 0.5, CUE_RATIO - 0.1, easeInCubic);
  const tlOp     = Math.max(0, anim(T, 0, 1, CUE_TL, CUE_TL + 0.5) - tlOut);
  const ratioOp  = anim(T, 0, 1, CUE_RATIO, CUE_RATIO + 0.6, easeOutBack);
  const capOp    = anim(T, 0, 1, CUE_CAP + 0.2, CUE_CAP + 1.0);
  const capY     = anim(T, 20, 0, CUE_CAP + 0.2, CUE_CAP + 1.0);

  const VBar = (valLabel: string, h: number, startT: number, color: string, labelText: string) => {
    const s = anim(T, 0, 1, startT, startT + 1.4);
    const c = Math.max(0, Math.min(1, s));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: 240 }}>
        <div style={{ fontSize: 34, fontWeight: 800, color: C.white, opacity: c }}>{valLabel}</div>
        <div style={{ width: 150, height: 360, display: 'flex', alignItems: 'flex-end', background: 'rgba(255,255,255,0.04)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: `${h * c * 100}%`, background: `linear-gradient(180deg,${color},rgba(0,0,0,0))`, boxShadow: `0 0 30px ${color}` }} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.muted, letterSpacing: 1.2, textAlign: 'center', textTransform: 'uppercase' }}>{labelText}</div>
      </div>
    );
  };

  const yearVals   = [0.569, 0.899, 1.0, 0.916, 0.885];
  const yearDolls  = ['$2.78M', '$4.40M', '$4.89M', '$4.48M', '$4.33M'];

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: F, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(0,166,81,0.14), transparent 60%)' }} />
      <Chrome T={T} total={total} sceneNum={6} />

      {/* Heading */}
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.bright, letterSpacing: 3, marginBottom: 8 }}>FIVE-YEAR BUSINESS CASE</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: C.white, lineHeight: 1.3, maxWidth: 900, margin: '0 auto' }}>
          A compelling investment case, if proven.
        </div>
      </div>

      {/* Bars */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 120, opacity: Math.max(0, barsOp) }}>
        {VBar('$25.98M', 1, 0.6, C.bright, 'Business value')}
        {VBar('$5.09M', 0.196, 0.9, C.green, 'Investment')}
      </div>

      {/* Year timeline — bigger bars */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, opacity: Math.max(0, tlOp) }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.bright, letterSpacing: 2, textTransform: 'uppercase' }}>Net value by year</div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', height: 320 }}>
          {yearVals.map((val, i) => {
            const s = Math.max(0, Math.min(1, anim(T, 0, 1, CUE_TL + 0.2 + i * 0.28, CUE_TL + 0.9 + i * 0.28, easeOutBack)));
            const barH = 280 * val * s;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: Math.max(0, s) }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.white, opacity: s > 0.7 ? s : 0 }}>{yearDolls[i]}</div>
                <div style={{
                  width: 88, height: barH,
                  background: `linear-gradient(180deg,${C.bright},${C.green})`,
                  borderRadius: '8px 8px 4px 4px',
                  boxShadow: s > 0.7 ? `0 0 28px rgba(46,213,115,0.30)` : 'none',
                }} />
                <div style={{ fontSize: 16, fontWeight: 700, color: C.muted }}>Y{i + 1}</div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: C.muted }}>Net positive from Year One — growing through Year Three</div>
      </div>

      {/* 5.1× ratio */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, opacity: Math.max(0, Math.min(1, ratioOp)) }}>
        <div style={{ fontSize: 130, fontWeight: 800, color: C.white, lineHeight: 1 }}>5.1×</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>Value-to-cost ratio</div>
        <div style={{ marginTop: 8, padding: '10px 22px', borderRadius: 999, background: 'rgba(46,213,115,0.14)', border: `1px solid ${C.bright}`, color: C.bright, fontWeight: 700, fontSize: 17 }}>
          Planning estimates — to be validated
        </div>
      </div>

      {/* Caption */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, display: 'flex', justifyContent: 'center', opacity: capOp, transform: `translateY(${capY}px)` }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: C.white, maxWidth: 1100, textAlign: 'center', lineHeight: 1.4, fontStyle: 'italic' }}>
          "The investment case is compelling. The next step is to prove it."
        </div>
      </div>
    </AbsoluteFill>
  );
};
