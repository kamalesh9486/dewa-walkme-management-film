import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, inkGradient } from '../tokens';

const particles = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 61) % 100,
  y: (i * 37 + 11) % 100,
  size: 1 + (i % 3),
  phase: (i % 10) / 10,
  depth: 0.4 + ((i % 5) / 5) * 0.8,
}));

const buildings = Array.from({ length: 30 }, (_, i) => {
  const h = 90 + ((i * 53) % 160);
  const w = 34 + ((i * 29) % 30);
  const lit = i % 3 === 0;
  return { h, w, lit };
});

export const RichBackground: React.FC<{ children?: React.ReactNode; skyline?: boolean }> = ({
  children,
  skyline = true,
}) => {
  const frame = useCurrentFrame();
  const bx = Math.sin(frame / 120) * 60;
  const by = Math.cos(frame / 150) * 40;
  const gx = Math.cos(frame / 100) * 50;
  const gridShift = (frame * 0.25) % 60;
  const skylineDrift = Math.sin(frame / 200) * 14;

  return (
    <AbsoluteFill style={{ background: inkGradient, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: `${8 + by / 20}%`, left: `${6 + bx / 20}%`, width: '55%', height: '55%', borderRadius: '50%', background: `radial-gradient(circle, rgba(0,107,60,0.38), transparent 62%)`, filter: 'blur(12px)', transform: `translate(${bx}px, ${by}px)` }} />
      <div style={{ position: 'absolute', bottom: `${6 - by / 25}%`, right: `${4 + gx / 25}%`, width: '48%', height: '48%', borderRadius: '50%', background: `radial-gradient(circle, rgba(202,138,4,0.12), transparent 60%)`, filter: 'blur(14px)', transform: `translate(${-gx}px, ${by / 2}px)` }} />
      <div style={{ position: 'absolute', top: '40%', left: '55%', width: '40%', height: '40%', borderRadius: '50%', background: `radial-gradient(circle, rgba(52,211,153,0.10), transparent 60%)`, filter: 'blur(16px)', transform: `translate(${gx}px, ${-by}px)` }} />
      <AbsoluteFill style={{ opacity: 0.06, backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px', transform: `translateY(${gridShift}px)` }} />
      {skyline && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 240, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', opacity: 0.45, transform: `translateX(${skylineDrift}px)` }}>
          {buildings.map((b, i) => (
            <div key={i} style={{ width: b.w, height: b.h, background: 'linear-gradient(180deg, rgba(2,20,14,0.55), #020e09)', marginRight: 3, position: 'relative' }}>
              {b.lit && (
                <div style={{ position: 'absolute', top: 10, left: '50%', width: 3, height: 3, borderRadius: 1, background: colors.goldLight, opacity: 0.4 + 0.4 * Math.sin(frame / 15 + i), boxShadow: `0 0 4px ${colors.goldLight}` }} />
              )}
            </div>
          ))}
        </div>
      )}
      {particles.map((p, i) => {
        const twinkle = interpolate((frame * 0.02 + p.phase) % 1, [0, 0.5, 1], [0.12, 0.65, 0.12]);
        const drift = ((frame * 0.15 * p.depth) % 120) - 20;
        return (
          <div key={i} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: colors.live, opacity: twinkle * p.depth, transform: `translateY(${-drift}px)`, boxShadow: `0 0 ${p.size * 3}px rgba(34,197,94,0.5)` }} />
        );
      })}
      {children}
    </AbsoluteFill>
  );
};
