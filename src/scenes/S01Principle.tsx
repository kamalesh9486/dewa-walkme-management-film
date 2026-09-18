import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, F } from '../tokens';
import { anim, easeOutBack, easeInCubic } from '../easings';
import { Chrome } from '../components/Chrome';

export const S01Principle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const T = frame / fps;
  const total = durationInFrames / fps;

  // ── Title card (0–3s) ──────────────────────────────────────────────
  const titleIn  = anim(T, 0, 1, 0.1, 0.9);
  const titleOut = anim(T, 0, 1, 2.6, 3.2, easeInCubic);
  const titleOp  = Math.max(0, titleIn - titleOut);

  // ── Adoption gap content (starts 3.2s) ────────────────────────────
  const headOp  = anim(T, 0, 1, 3.2, 4.0);
  const barsOp  = anim(T, 0, 1, 3.5, 4.2);
  const bar1H   = anim(T, 0, 90, 3.7, 5.4);
  const bar2H   = anim(T, 0, 35, 4.0, 5.7);
  const bracOp  = anim(T, 0, 1, 5.5, 6.2);
  const p1op    = anim(T, 0, 1, 6.2, 6.8, easeOutBack);
  const p2op    = anim(T, 0, 1, 6.5, 7.1, easeOutBack);
  const p3op    = anim(T, 0, 1, 6.8, 7.4, easeOutBack);
  const capOp   = anim(T, 0, 1, 11.2, 12.0);
  const capY    = anim(T, 20, 0, 11.2, 12.0);

  const Pillar = (icon: string, label: string, op: number) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: op, transform: `translateY(${(1 - op) * 16}px)` }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'rgba(46,213,115,0.14)', border: `1px solid ${C.bright}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: C.bright, fontWeight: 800, fontSize: 16,
      }}>{icon}</div>
      <div style={{ fontSize: 19, fontWeight: 700, color: C.white }}>{label}</div>
    </div>
  );

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: F, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(0,166,81,0.14), transparent 60%)' }} />

      <Chrome T={T} total={total} sceneNum={1} label="S01 / 09 — THE ADOPTION GAP" />

      {/* ── Title card ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: titleOp,
      }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.bright, letterSpacing: 4, marginBottom: 16 }}>
          DEWA DIGITAL ADOPTION STRATEGY
        </div>
        <div style={{
          fontSize: 64, fontWeight: 800, color: C.white, textAlign: 'center',
          lineHeight: 1.15, maxWidth: 1100,
        }}>
          SAP WalkMe<br />Management Brief
        </div>
        <div style={{
          marginTop: 28, width: 120, height: 3,
          background: `linear-gradient(90deg, ${C.bright}, transparent)`,
          borderRadius: 2,
        }} />
      </div>

      {/* ── Adoption gap content ── */}
      <div style={{ position: 'absolute', top: 115, left: 0, right: 0, textAlign: 'center', opacity: headOp }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.bright, letterSpacing: 3, marginBottom: 10 }}>
          DEWA DIGITAL INVESTMENT
        </div>
        <div style={{ fontSize: 36, fontWeight: 800, color: C.white, lineHeight: 1.25, maxWidth: 900, margin: '0 auto' }}>
          Technology deployed is not yet value realised.
        </div>
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 34, paddingTop: 60, opacity: barsOp,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 90 }}>
          {/* Bar 1 – Technology Deployed */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: 250 }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: C.white }}>{Math.round(bar1H)}%</div>
            <div style={{ width: 160, height: 380, display: 'flex', alignItems: 'flex-end', background: 'rgba(255,255,255,0.04)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: `${bar1H}%`, background: `linear-gradient(180deg,${C.bright},rgba(0,0,0,0))`, boxShadow: `0 0 30px ${C.bright}`, borderRadius: '0 0 16px 16px' }} />
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.muted, letterSpacing: 1.5, textAlign: 'center', textTransform: 'uppercase' }}>Technology Deployed</div>
          </div>

          {/* Gap bracket */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: 380, justifyContent: 'flex-end', paddingBottom: 50, opacity: bracOp }}>
            <div style={{ width: 2, height: 190, background: C.line }} />
            <div style={{ fontSize: 15, fontWeight: 800, color: C.muted, letterSpacing: 3, whiteSpace: 'nowrap' }}>THE GAP</div>
          </div>

          {/* Bar 2 – Value Realised */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: 250 }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: C.white }}>{Math.round(bar2H)}%</div>
            <div style={{ width: 160, height: 380, display: 'flex', alignItems: 'flex-end', background: 'rgba(255,255,255,0.04)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: `${bar2H}%`, background: `linear-gradient(180deg,${C.green},rgba(0,0,0,0))`, boxShadow: `0 0 30px ${C.green}`, borderRadius: '0 0 16px 16px' }} />
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.muted, letterSpacing: 1.5, textAlign: 'center', textTransform: 'uppercase' }}>Value Realised</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 44 }}>
          {Pillar('E', 'Used easily', p1op)}
          {Pillar('C', 'Used correctly', p2op)}
          {Pillar('I', 'Used independently', p3op)}
        </div>
      </div>

      {/* Caption */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 150,
        display: 'flex', justifyContent: 'center',
        opacity: capOp, transform: `translateY(${capY}px)`,
      }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: C.white, maxWidth: 1100, textAlign: 'center', lineHeight: 1.4, fontStyle: 'italic' }}>
          "The next opportunity is not just more technology. It is better adoption."
        </div>
      </div>
    </AbsoluteFill>
  );
};
