import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

type Props = {
  to: number;
  delay?: number;
  durationInFrames?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: React.CSSProperties;
};

export const CountUp: React.FC<Props> = ({
  to,
  delay = 0,
  durationInFrames = 34,
  prefix = '',
  suffix = '',
  decimals = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const progress = interpolate(local, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eased = 1 - Math.pow(1 - progress, 3);
  const value = eased * to;
  return (
    <span style={style}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
};
