import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, F } from '../tokens';
import { anim, easeOutBack, easeInCubic, easeOutExpo } from '../easings';
import { Chrome } from '../components/Chrome';

const APPS = [
  { name: 'SAP ERP', desc: 'Guided transactions' },
  { name: 'SuccessFactors', desc: 'HR self-service' },
  { name: 'Ariba', desc: 'Procurement journeys' },
  { name: 'BMC Helix', desc: 'Service management' },
  { name: 'DEWA Portal', desc: 'Customer services' },
  { name: 'Mobile', desc: 'Field & on-the-go' },
];

const CAPS = [
  { icon: '⚡', title: 'Joule Skills', desc: 'AI capability surfaces based on\nyour current screen context' },
  { icon: '→', title: 'Step Guidance', desc: 'Click-by-click walkthroughs\nthat adapt in real time' },
  { icon: '✓', title: 'In-Flow Completion', desc: 'From question to done\nwithout switching apps' },
];

export const S03Guidance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const T = frame / fps;
  const total = durationInFrames / fps;

  const CUE_APPS = 2.4;
  const CUE_CAPS = 6.8;
  const CUE_CAP  = 11.5;

  // Intro WalkMe reveal
  const introOp   = Math.max(0, anim(T, 0, 1, 0.2, 1.0) - anim(T, 0, 1, CUE_APPS - 0.5, CUE_APPS - 0.1, easeInCubic));
  const introScale = anim(T, 0.85, 1, 0.2, 1.0, easeOutBack);

  // Apps phase
  const appsOut = anim(T, 0, 1, CUE_CAPS - 0.5, CUE_CAPS - 0.1, easeInCubic);
  const appsOp  = Math.max(0, anim(T, 0, 1, CUE_APPS, CUE_APPS + 0.5) - appsOut);

  // Capabilities phase
  const capsOut = anim(T, 0, 1, CUE_CAP - 0.5, CUE_CAP - 0.1, easeInCubic);
  const capsOp  = Math.max(0, anim(T, 0, 1, CUE_CAPS, CUE_CAPS + 0.5) - capsOut);

  // Caption
  const capOp = anim(T, 0, 1, CUE_CAP + 0.2, CUE_CAP + 1.0);
  const capY  = anim(T, 20, 0, CUE_CAP + 0.2, CUE_CAP + 1.0);

  const AppPill = (app: { name: string; desc: string }, i: number) => {
    const o = anim(T, 0, 1, CUE_APPS + 0.2 + i * 0.3, CUE_APPS + 0.6 + i * 0.3, easeOutBack);
    const c = Math.max(0, Math.min(1, o));
    return (
      <div key={i} style={{
        padding: '14px 20px', borderRadius: 12,
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid rgba(46,213,115,${0.15 + 0.35 * c})`,
        opacity: c, transform: `translateY(${(1 - c) * 18}px)`,
        minWidth: 170,
      }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.white, marginBottom: 4 }}>{app.name}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>{app.desc}</div>
      </div>
    );
  };

  const CapCard = (cap: { icon: string; title: string; desc: string }, i: number) => {
    const o = anim(T, 0, 1, CUE_CAPS + 0.2 + i * 0.45, CUE_CAPS + 0.7 + i * 0.45, easeOutBack);
    const c = Math.max(0, Math.min(1, o));
    return (
      <div key={i} style={{
        width: 290, padding: '32px 26px', borderRadius: 18,
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid rgba(46,213,115,${0.2 + 0.35 * c})`,
        opacity: c, transform: `translateY(${(1 - c) * 24}px)`,
        boxShadow: c > 0.5 ? `0 0 32px rgba(46,213,115,0.10)` : 'none',
        textAlign: 'center',
      }}>
        <div style={{
          width: 54, height: 54, borderRadius: '50%', margin: '0 auto 18px',
          background: 'rgba(46,213,115,0.12)', border: `1.5px solid ${C.bright}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, color: C.bright,
        }}>{cap.icon}</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.white, marginBottom: 12 }}>{cap.title}</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.muted, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{cap.desc}</div>
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{ background: C.bg, fontFamily: F, overflow: 'hidden' }}
      from={-12}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 35%, rgba(0,166,81,0.16), transparent 60%)' }} />
      <Chrome T={T} total={total} sceneNum={3} />

      {/* Phase 1: WalkMe solution reveal */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: introOp, transform: `scale(${introScale})`,
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.bright, letterSpacing: 4, marginBottom: 18, textTransform: 'uppercase' }}>
          The Solution
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, color: C.white, letterSpacing: -2, lineHeight: 1 }}>
          SAP WalkMe
        </div>
        <div style={{
          marginTop: 20, fontSize: 24, fontWeight: 600, color: C.muted, letterSpacing: 1,
        }}>
          Digital Adoption Platform
        </div>
        <div style={{
          marginTop: 32, width: 120, height: 3,
          background: `linear-gradient(90deg, transparent, ${C.bright}, transparent)`,
          borderRadius: 2,
        }} />
      </div>

      {/* Phase 2: Action Bar + apps */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 36, opacity: Math.max(0, appsOp),
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.bright, letterSpacing: 3, marginBottom: 10, textTransform: 'uppercase' }}>
            The WalkMe Action Bar
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, color: C.white, lineHeight: 1.3, maxWidth: 760, margin: '0 auto' }}>
            Sits inside every application DEWA already uses
          </div>
        </div>

        {/* Action Bar visual mockup */}
        <div style={{
          width: 820, borderRadius: 14, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          background: C.panel,
          boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
        }}>
          {/* Browser chrome */}
          <div style={{ height: 36, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px' }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255,255,255,0.18)' }} />)}
            <div style={{ flex: 1, height: 20, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginLeft: 8 }} />
          </div>
          {/* App content area */}
          <div style={{ display: 'flex', height: 160 }}>
            {/* App content */}
            <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ height: 12, width: '55%', background: 'rgba(255,255,255,0.07)', borderRadius: 4 }} />
              <div style={{ height: 12, width: '40%', background: 'rgba(255,255,255,0.07)', borderRadius: 4 }} />
              <div style={{ height: 12, width: '65%', background: 'rgba(255,255,255,0.07)', borderRadius: 4 }} />
              <div style={{ height: 34, width: 130, background: 'rgba(255,255,255,0.06)', borderRadius: 6, marginTop: 8, border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>
            {/* WalkMe Action Bar strip */}
            <div style={{
              width: 52, background: `linear-gradient(180deg, rgba(46,213,115,0.18), rgba(0,166,81,0.10))`,
              borderLeft: `2px solid ${C.bright}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingTop: 16,
            }}>
              <div style={{ fontSize: 18, color: C.bright }}>◎</div>
              <div style={{ fontSize: 18, color: 'rgba(46,213,115,0.6)' }}>⊞</div>
              <div style={{ fontSize: 18, color: 'rgba(46,213,115,0.6)' }}>✎</div>
            </div>
          </div>
          {/* Action Bar label */}
          <div style={{ padding: '8px 14px', background: 'rgba(46,213,115,0.08)', borderTop: `1px solid rgba(46,213,115,0.18)` }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.bright, letterSpacing: 1 }}>WALKME ACTION BAR</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginLeft: 10 }}>— context-aware, always available</span>
          </div>
        </div>

        {/* App pills */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 880 }}>
          {APPS.map((a, i) => AppPill(a, i))}
        </div>
      </div>

      {/* Phase 3: Capability cards */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 40, opacity: Math.max(0, capsOp),
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.bright, letterSpacing: 3, marginBottom: 10, textTransform: 'uppercase' }}>What guidance means inside each app</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: C.white, lineHeight: 1.3 }}>
            The right help, at the right moment.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {CAPS.map((cap, i) => CapCard(cap, i))}
        </div>
      </div>

      {/* Caption */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 70, display: 'flex', justifyContent: 'center', opacity: capOp, transform: `translateY(${capY}px)` }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: C.white, maxWidth: 1000, textAlign: 'center', lineHeight: 1.4, fontStyle: 'italic' }}>
          "Less training effort. Less switching. More first-time-right work."
        </div>
      </div>
    </AbsoluteFill>
  );
};
