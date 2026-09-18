import React from 'react';
import { C, F } from '../tokens';

interface ChromeProps {
  T: number;
  total: number;
  sceneNum: number;
  label?: string;
}

export const Chrome: React.FC<ChromeProps> = ({ sceneNum }) => {
  const id = `dg${sceneNum}`;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', fontFamily: F }}>
      {/* Dot grid texture */}
      <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%">
        <defs>
          <pattern id={id} width={56} height={56} patternUnits="userSpaceOnUse">
            <circle cx={1.5} cy={1.5} r={1.5} fill="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>

      {/* Source attribution */}
      <div style={{
        position: 'absolute', bottom: 14, right: 64,
        fontSize: 11, fontWeight: 600,
        color: 'rgba(244,250,246,0.28)',
        letterSpacing: 0.5,
      }}>
        Source: McKinsey Customer Happiness Blueprint
      </div>
    </div>
  );
};
