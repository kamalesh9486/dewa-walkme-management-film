import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts } from '../tokens';

export type Segment = { text: string; emphasis?: boolean; break?: boolean };

type Props = {
  segments: Segment[];
  delay?: number;
  fontSize?: number;
  color?: string;
  emphasisColor?: string;
  weight?: number;
  stagger?: number;
  fontFamily?: string;
  style?: React.CSSProperties;
};

// Headline reveals word-by-word (rise + blur + fade). Emphasis words colour in emerald by default.
export const KineticText: React.FC<Props> = ({
  segments,
  delay = 0,
  fontSize = 56,
  color = '#fff',
  emphasisColor = colors.emerald,
  weight = 800,
  stagger = 3,
  fontFamily = fonts.display,
  style,
}) => {
  const frame = useCurrentFrame();
  const words: { w: string; emphasis?: boolean; break?: boolean }[] = [];
  segments.forEach((seg) => {
    if (seg.break) { words.push({ w: '\n', break: true, emphasis: seg.emphasis }); return; }
    seg.text.split(' ').forEach((w, wi) => words.push({ w, emphasis: seg.emphasis, break: wi === 0 && seg.break }));
  });

  return (
    <div style={{ fontFamily, fontWeight: weight, fontSize, lineHeight: 1.18, letterSpacing: -0.5, display: 'flex', flexWrap: 'wrap', gap: '0 0.28em', ...style }}>
      {words.map((word, i) => {
        if (word.w === '\n') return <div key={i} style={{ width: '100%', height: 0 }} />;
        const local = frame - delay - i * stagger;
        const p = interpolate(local, [0, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const eased = 1 - Math.pow(1 - p, 3);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: eased,
              transform: `translateY(${(1 - eased) * 28}px)`,
              filter: `blur(${(1 - eased) * 8}px)`,
              color: word.emphasis ? emphasisColor : color,
            }}
          >
            {word.w}
          </span>
        );
      })}
    </div>
  );
};
