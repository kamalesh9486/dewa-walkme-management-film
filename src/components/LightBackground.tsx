import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { colors } from '../tokens';

const motes = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 71) % 100,
  y: (i * 43 + 9) % 100,
  size: 3 + (i % 4) * 2,
  phase: (i % 8) / 8,
}));

// Clean white executive backdrop — for the management case scene.
export const LightBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const ax = Math.sin(frame / 130) * 50;
  const ay = Math.cos(frame / 160) * 40;
  const bx = Math.cos(frame / 110) * 44;
  const grid = (frame * 0.18) % 56;

  return (
    <AbsoluteFill style={{ background: colors.surface, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-6%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,107,60,0.07), transparent 62%)', filter: 'blur(10px)', transform: `translate(${ax}px, ${ay}px)` }} />
      <div style={{ position: 'absolute', bottom: '-12%', right: '-8%', width: '58%', height: '58%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(202,138,4,0.05), transparent 60%)', filter: 'blur(12px)', transform: `translate(${-bx}px, ${ay / 2}px)` }} />
      <AbsoluteFill style={{ opacity: 0.4, backgroundImage: `linear-gradient(rgba(0,107,60,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,107,60,0.04) 1px, transparent 1px)`, backgroundSize: '56px 56px', transform: `translateY(${grid}px)` }} />
      {motes.map((m, i) => {
        const drift = ((frame * 0.12 + m.phase * 40) % 120) - 20;
        const op = 0.04 + 0.04 * Math.sin(frame / 20 + i);
        return <div key={i} style={{ position: 'absolute', left: `${m.x}%`, top: `${m.y}%`, width: m.size, height: m.size, borderRadius: '50%', background: colors.green, opacity: op, transform: `translateY(${-drift}px)` }} />;
      })}
      {children}
    </AbsoluteFill>
  );
};
