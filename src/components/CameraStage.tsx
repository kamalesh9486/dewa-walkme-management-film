import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

type Props = { durationInFrames: number; variant?: number; children: React.ReactNode };

// Subtle Ken Burns per scene. Max scale capped at 1.04 so eyebrow chrome never clips.
export const CameraStage: React.FC<Props> = ({ durationInFrames, variant = 0, children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const configs = [
    { s0: 1.0,  s1: 1.04, x0: 0,   x1: 0,   y0: 4,  y1: -4  },
    { s0: 1.04, s1: 1.0,  x0: 0,   x1: 0,   y0: -3, y1: 3   },
    { s0: 1.01, s1: 1.04, x0: -14, x1: 14,  y0: 0,  y1: 0   },
    { s0: 1.01, s1: 1.04, x0: 14,  x1: -14, y0: 0,  y1: 0   },
  ];
  const c = configs[variant % configs.length];
  const scale = interpolate(p, [0, 1], [c.s0, c.s1]);
  const x = interpolate(p, [0, 1], [c.x0, c.x1]);
  const y = interpolate(p, [0, 1], [c.y0, c.y1]);

  return <AbsoluteFill style={{ transform: `scale(${scale}) translate(${x}px, ${y}px)` }}>{children}</AbsoluteFill>;
};
