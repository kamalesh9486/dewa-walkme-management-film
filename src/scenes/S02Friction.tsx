import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, F } from '../tokens';
import { anim, easeOutBack, easeInCubic, easeOutExpo } from '../easings';
import { Chrome } from '../components/Chrome';

export const S02Friction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const T = frame / fps;
  const total = durationInFrames / fps;

  const CUE_EMP = 6.5;
  const CUE_CAP = 11.0;

  const titleOp   = anim(T, 0, 1, 0.2, 1.0);
  const countOp   = anim(T, 0, 1, 0.6, 1.2);
  const countVal  = anim(T, 0, 1510000, 0.6, 5.0, easeOutExpo);
  const splitOp   = anim(T, 0, 1, 3.6, 4.2);
  const fillW     = anim(T, 0, 1, 3.8, 5.4);
  const ticketOut = anim(T, 0, 1, CUE_EMP - 0.5, CUE_EMP - 0.1, easeInCubic);
  const empOp     = anim(T, 0, 1, CUE_EMP, CUE_EMP + 0.5);
  const capOp     = anim(T, 0, 1, CUE_CAP + 0.2, CUE_CAP + 1.0);
  const capY      = anim(T, 20, 0, CUE_CAP + 0.2, CUE_CAP + 1.0);

  const ticketOp = Math.max(0, countOp - ticketOut);

  const MetricCard = (val: string, label: string, sub: string, delay: number) => {
    const o = anim(T, 0, 1, CUE_EMP + delay, CUE_EMP + delay + 0.6, easeOutBack);
    const c = Math.max(0, Math.min(1, o));
    return (
      <div style={{
        width: 290, padding: '32px 24px', textAlign: 'center',
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid rgba(46,213,115,${0.18 + 0.32 * c})`,
        borderRadius: 18,
        opacity: c,
        transform: `translateY(${(1 - c) * 28}px)`,
        boxShadow: c > 0.5 ? `0 0 28px rgba(46,213,115,0.10)` : 'none',
      }}>
        <div style={{ fontSize: 62, fontWeight: 800, color: C.bright, lineHeight: 1, marginBottom: 10 }}>{val}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 5 }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.muted, lineHeight: 1.4 }}>{sub}</div>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: F, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(0,166,81,0.14), transparent 60%)' }} />
      <Chrome T={T} total={total} sceneNum={2} />

      {/* Heading */}
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.bright, letterSpacing: 3, marginBottom: 8 }}>THE BUSINESS CASE</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: C.white, lineHeight: 1.3, maxWidth: 900, margin: '0 auto' }}>
          Friction shows up as volume and time.
        </div>
      </div>

      {/* Ticket count + split bar */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 14, paddingTop: 60,
        opacity: Math.max(0, ticketOp),
      }}>
        <div style={{ fontSize: 96, fontWeight: 800, color: C.white, fontVariantNumeric: 'tabular-nums' }}>
          {Math.round(countVal).toLocaleString()}
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, color: C.muted, letterSpacing: 2, marginBottom: 14, textTransform: 'uppercase' }}>
          Estimated customer-care tickets per year
        </div>
        <div style={{ width: 1000, height: 64, borderRadius: 14, overflow: 'hidden', display: 'flex', background: 'rgba(255,255,255,0.05)', opacity: splitOp }}>
          <div style={{ width: `${80 * fillW}%`, background: `linear-gradient(90deg,${C.green},${C.bright})`, boxShadow: `0 0 24px rgba(46,213,115,0.5)` }} />
          <div style={{ width: `${20 * Math.min(1, fillW * 1.2)}%`, background: 'rgba(255,255,255,0.08)' }} />
        </div>
        <div style={{ display: 'flex', gap: 50, opacity: fillW }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: C.bright }}>~80%</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>Navigation & Level-1 support</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>~20%</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>Other requests</div>
          </div>
        </div>
      </div>

      {/* Employee friction — metric cards */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 36, paddingTop: 40,
        opacity: empOp,
      }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.bright, letterSpacing: 2, textTransform: 'uppercase' }}>
          The employee side of the same problem
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {MetricCard('75%', 'of employees raise tickets', 'Across 4 enterprise apps', 0.1)}
          {MetricCard('24×', 'support requests/year', 'Per employee (6 per app × 4 apps)', 0.4)}
          {MetricCard('100', 'custom dev demands/yr', 'WRICEF requests — at $15K each', 0.7)}
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: C.muted }}>
          Three signals. One root cause: people can't self-serve.
        </div>
      </div>

      {/* Caption */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 80, display: 'flex', justifyContent: 'center', opacity: capOp, transform: `translateY(${capY}px)` }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: C.white, maxWidth: 1000, textAlign: 'center', lineHeight: 1.4, fontStyle: 'italic' }}>
          "Every search, every ticket, every correction — DEWA is already paying."
        </div>
      </div>
    </AbsoluteFill>
  );
};
