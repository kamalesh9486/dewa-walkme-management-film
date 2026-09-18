import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

type Props = { durationInFrames: number; index?: number; children: React.ReactNode };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const SceneTransition: React.FC<Props> = ({ durationInFrames, index = 0, children }) => {
  const frame = useCurrentFrame();
  const IN = 16;
  const OUT = 14;
  const inP = easeOut(interpolate(frame, [0, IN], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const outRaw = interpolate(frame, [durationInFrames - OUT, durationInFrames], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const outP = easeInOut(outRaw);

  const kind = index % 5;
  let transform = '';
  let opacity = 1;
  let clipPath: string | undefined;

  if (kind === 0)      { transform = `translateY(${(1 - inP) * 50}px)`; opacity = inP; }
  else if (kind === 1) { transform = `translateX(${(1 - inP) * 100}px)`; opacity = inP; }
  else if (kind === 2) { transform = `scale(${0.92 + inP * 0.08})`; opacity = inP; }
  else if (kind === 3) { clipPath = `inset(${(1 - inP) * 100}% 0% 0% 0%)`; opacity = Math.min(1, inP * 1.4); }
  else                 { transform = `translateX(${-(1 - inP) * 100}px)`; opacity = inP; }

  if (outRaw > 0) {
    opacity = Math.min(opacity, 1 - outP);
    transform = `${transform} translateY(${-outP * 30}px) scale(${1 - outP * 0.03})`;
  }

  return <AbsoluteFill style={{ opacity, transform, clipPath }}>{children}</AbsoluteFill>;
};
