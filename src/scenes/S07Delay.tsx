import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, F } from '../tokens';
import { anim, easeOutBack } from '../easings';
import { Chrome } from '../components/Chrome';

const COSTS = [
  { val: '$1.1M–$1.5M/yr', label: 'Support cost not captured', desc: 'Ticket deflection value left on the table' },
  { val: '$634K–$840K/yr', label: 'Escalations not prevented', desc: 'Second-line escalations keep running' },
  { val: '$300K/yr', label: 'Standalone chatbot', desc: 'RAMMAS runs as a separate cost line' },
  { val: '$450K–$900K/yr', label: 'Technical debt', desc: '100 WRICEF demands/year, unchecked' },
  { val: '$399K Year 1', label: 'Rework & audit exposure', desc: 'Undetected errors compound across systems' },
  { val: 'At risk', label: 'AI capability undiscovered', desc: 'Joule & Al Hasbah — unused by the people they serve' },
];

export const S07Delay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const T = frame / fps;
  const total = durationInFrames / fps;

  const CUE_CAP = 8.5;

  const titleOp = anim(T, 0, 1, 0.2, 1.0);
  const totalOp = anim(T, 0, 1, 6.8, 7.5);
  const capOp   = anim(T, 0, 1, CUE_CAP + 0.2, CUE_CAP + 1.0);

  const CostCard = (item: typeof COSTS[0], i: number) => {
    const delay = 0.8 + i * 0.7;
    const o = Math.max(0, Math.min(1, anim(T, 0, 1, delay, delay + 0.55, easeOutBack)));
    const isLast = i === 5;
    return (
      <div style={{
        flex: '1 1 280px', maxWidth: 340,
        padding: '20px 22px', borderRadius: 14,
        background: isLast
          ? 'rgba(46,213,115,0.05)'
          : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isLast ? `rgba(46,213,115,0.35)` : 'rgba(255,255,255,0.10)'}`,
        opacity: o, transform: `translateY(${(1 - o) * 20}px)`,
        boxShadow: o > 0.7 && isLast ? `0 0 20px rgba(46,213,115,0.10)` : 'none',
      }}>
        <div style={{
          fontSize: 22, fontWeight: 800,
          color: isLast ? C.bright : C.white,
          marginBottom: 6, lineHeight: 1,
        }}>
          {item.val}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 4 }}>
          {item.label}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, lineHeight: 1.4 }}>
          {item.desc}
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: F, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 20%, rgba(0,166,81,0.10), transparent 55%)' }} />
      <Chrome T={T} total={total} sceneNum={7} />

      {/* Heading */}
      <div style={{ position: 'absolute', top: 52, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.bright, letterSpacing: 3, marginBottom: 8, textTransform: 'uppercase' }}>
          The Risk of Delay
        </div>
        <div style={{ fontSize: 34, fontWeight: 800, color: C.white, lineHeight: 1.3, maxWidth: 860, margin: '0 auto' }}>
          Staying still has a price — paid every month.
        </div>
      </div>

      {/* Cost cards — 3 × 2 grid */}
      <div style={{
        position: 'absolute', top: 160, left: 120, right: 120,
        display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center',
      }}>
        {COSTS.map((item, i) => CostCard(item, i))}
      </div>

      {/* Total exposure callout */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 110,
        display: 'flex', justifyContent: 'center', opacity: totalOp,
      }}>
        <div style={{
          padding: '14px 36px', borderRadius: 12,
          background: 'rgba(46,213,115,0.08)',
          border: `1px solid rgba(46,213,115,0.3)`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.white }}>
            $2.14M+ per year — not captured while DEWA waits.
          </div>
        </div>
      </div>

      {/* Caption */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 44, display: 'flex', justifyContent: 'center', opacity: capOp }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.white, maxWidth: 1000, textAlign: 'center', lineHeight: 1.4, fontStyle: 'italic' }}>
          "Doing nothing is not a zero-cost option."
        </div>
      </div>
    </AbsoluteFill>
  );
};
