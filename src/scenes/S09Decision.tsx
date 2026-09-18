import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, staticFile, Img } from 'remotion';
import { C, F } from '../tokens';
import { anim, easeOutBack, easeInCubic } from '../easings';
import { Chrome } from '../components/Chrome';

const PROOF_STATS = [
  { val: '$25.98M', sub: '5-year estimated value' },
  { val: '5.1×', sub: 'Value-to-cost return' },
  { val: 'Year 1', sub: 'Positive from day one' },
];

const CONDITIONS = ['Phased rollout', 'Evidence-based scaling', 'Al Hasbah–ready', 'Measurable from day one'];

export const S09Decision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const T = frame / fps;
  const total = durationInFrames / fps;

  const CUE_STAMP = 3.6;
  const CUE_CLOSE = 7.5;

  const titleOp   = anim(T, 0, 1, 0.2, 0.9);
  const statsOut  = anim(T, 0, 1, CUE_STAMP - 0.5, CUE_STAMP - 0.1, easeInCubic);
  const statsOp   = Math.max(0, anim(T, 0, 1, 0.4, 1.0) - statsOut);
  const stampOut  = anim(T, 0, 1, CUE_CLOSE - 0.5, CUE_CLOSE - 0.1, easeInCubic);
  const stampOp   = Math.max(0, anim(T, 0, 1, CUE_STAMP, CUE_STAMP + 0.5) - stampOut);
  const stampSc   = anim(T, 1.5, 1, CUE_STAMP + 0.1, CUE_STAMP + 0.7, easeOutBack);
  const tagsOp    = anim(T, 0, 1, CUE_STAMP + 1.0, CUE_STAMP + 1.6);
  const closeOp   = anim(T, 0, 1, CUE_CLOSE, CUE_CLOSE + 0.8);
  const taglineOp = anim(T, 0, 1, CUE_CLOSE + 1.2, CUE_CLOSE + 2.0);
  const logoSc    = anim(T, 0.88, 1, CUE_CLOSE, CUE_CLOSE + 1.0, easeOutBack);

  const StatCard = (stat: typeof PROOF_STATS[0], i: number) => {
    const o = Math.max(0, Math.min(1, anim(T, 0, 1, 0.5 + i * 0.3, 1.0 + i * 0.3, easeOutBack)));
    return (
      <div key={i} style={{
        width: 280, padding: '32px 26px', textAlign: 'center',
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid rgba(46,213,115,${0.18 + 0.3 * o})`,
        borderRadius: 18,
        opacity: o, transform: `translateY(${(1 - o) * 24}px)`,
        boxShadow: o > 0.6 ? `0 0 30px rgba(46,213,115,0.10)` : 'none',
      }}>
        <div style={{ fontSize: 54, fontWeight: 800, color: C.bright, lineHeight: 1, marginBottom: 10 }}>{stat.val}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>{stat.sub}</div>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: F, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(0,166,81,0.18), transparent 60%)' }} />
      <Chrome T={T} total={total} sceneNum={9} />

      {/* Heading */}
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.bright, letterSpacing: 3, marginBottom: 8, textTransform: 'uppercase' }}>The Recommendation</div>
        <div style={{ fontSize: 30, fontWeight: 800, color: C.white, lineHeight: 1.3, maxWidth: 820, margin: '0 auto' }}>
          The case is clear. The next step is to proceed.
        </div>
      </div>

      {/* Phase 1: Proof stats */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32,
        opacity: Math.max(0, statsOp),
      }}>
        {PROOF_STATS.map((s, i) => StatCard(s, i))}
      </div>

      {/* Phase 2: PROCEED stamp */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 34, opacity: Math.max(0, stampOp),
      }}>
        <div style={{
          transform: `scale(${stampSc})`,
          padding: '26px 72px', borderRadius: 18,
          border: `3px solid ${C.bright}`,
          color: C.bright, fontSize: 64, fontWeight: 800, letterSpacing: 6,
          boxShadow: `0 0 60px rgba(46,213,115,0.30), inset 0 0 40px rgba(46,213,115,0.06)`,
        }}>
          PROCEED
        </div>
        <div style={{ display: 'flex', gap: 14, opacity: Math.max(0, tagsOp), flexWrap: 'wrap', justifyContent: 'center' }}>
          {CONDITIONS.map(c => (
            <div key={c} style={{
              fontSize: 15, fontWeight: 700, color: C.white,
              padding: '9px 18px', borderRadius: 999,
              border: `1px solid rgba(46,213,115,0.35)`,
              background: 'rgba(46,213,115,0.06)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ color: C.bright, fontSize: 13 }}>✓</span> {c}
            </div>
          ))}
        </div>
      </div>

      {/* Phase 3: Final close */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 28, opacity: Math.max(0, closeOp),
      }}>
        <div style={{ transform: `scale(${logoSc})` }}>
          <Img
            src={staticFile('assets/dewa-logo-white.png')}
            style={{ height: 100, width: 'auto', objectFit: 'contain' }}
          />
        </div>
        <div style={{ width: 280, height: 2, background: `linear-gradient(90deg, transparent, ${C.bright}, transparent)`, opacity: 0.5 }} />
        <div style={{
          fontSize: 28, fontWeight: 700, color: C.white,
          maxWidth: 820, textAlign: 'center', lineHeight: 1.5, fontStyle: 'italic',
          opacity: taglineOp,
        }}>
          "Connect every digital investment to the moment of work."
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.muted, letterSpacing: 2, textTransform: 'uppercase', opacity: taglineOp }}>
          SAP WalkMe · DEWA Digital Adoption Programme
        </div>
      </div>
    </AbsoluteFill>
  );
};
