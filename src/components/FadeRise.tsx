import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { fps } from '../tokens';

type Props = {
  delay?: number;
  riseDistance?: number;
  durationInFrames?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const FadeRise: React.FC<Props> = ({
  delay = 0,
  riseDistance = 22,
  durationInFrames = Math.round(fps * 0.5),
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const progress = interpolate(local, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eased = 1 - Math.pow(1 - progress, 3);

  return (
    <div style={{ opacity: eased, transform: `translateY(${(1 - eased) * riseDistance}px)`, ...style }}>
      {children}
    </div>
  );
};
