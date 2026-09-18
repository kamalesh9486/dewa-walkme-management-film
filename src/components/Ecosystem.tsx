import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts } from '../tokens';

// Fixed positions — right 55% of screen, leaving room for left-side text.
const NODES = [
  { id: 'portal',  label: 'Customer Portal', x: 1010, y: 210 },
  { id: 'mobile',  label: 'DEWA Mobile',      x: 1290, y: 165 },
  { id: 'sap',     label: 'SAP S/4HANA',      x: 1530, y: 295 },
  { id: 'sf',      label: 'SuccessFactors',    x: 1640, y: 545 },
  { id: 'rammas',  label: 'RAMMAS',            x: 1340, y: 720 },
  { id: 'ariba',   label: 'Ariba',             x: 1050, y: 625 },
] as const;

const EDGES: [number, number][] = [
  [0, 2], // portal–SAP
  [1, 2], // mobile–SAP
  [2, 3], // SAP–SF
  [2, 4], // SAP–RAMMAS
  [4, 0], // RAMMAS–portal
  [5, 2], // ariba–SAP
  [3, 4], // SF–RAMMAS
];

interface EcosystemProps {
  sweepX?: number;     // current sweep line x; node lit when sweepX > node.x
  litAll?: boolean;    // all nodes emerald (Scene 9)
  showTickets?: boolean; // gold "!" badge (Scene 2)
  opacity?: number;    // overall opacity override
}

export const Ecosystem: React.FC<EcosystemProps> = ({
  sweepX,
  litAll = false,
  showTickets = false,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const NW = 145, NH = 46;

  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', opacity }}
      width={1920}
      height={1080}
    >
      {/* Edges */}
      {EDGES.map(([from, to], i) => {
        const a = NODES[from];
        const b = NODES[to];
        const midX = (a.x + b.x) / 2;
        const isLit = litAll || (sweepX !== undefined && sweepX > midX);
        const edgeFade = interpolate(frame - i * 4, [0, 18], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        return (
          <line
            key={i}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={isLit ? colors.emerald : 'rgba(255,255,255,0.18)'}
            strokeWidth={isLit ? 2 : 1}
            strokeDasharray={isLit ? undefined : '7 5'}
            opacity={edgeFade * (isLit ? 0.8 : 0.45)}
          />
        );
      })}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const nodeFade = interpolate(frame - i * 6, [0, 20], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const isLit = litAll || (sweepX !== undefined && sweepX > node.x);
        const rx = node.x - NW / 2;
        const ry = node.y - NH / 2;
        const litPulse = isLit ? 0.18 + 0.05 * Math.sin(frame / 12 + i) : 0;

        return (
          <g key={node.id} opacity={nodeFade}>
            {isLit && (
              <rect
                x={rx - 4} y={ry - 4} width={NW + 8} height={NH + 8} rx={14}
                fill="none"
                stroke={colors.emerald}
                strokeWidth={1.5}
                opacity={litPulse}
              />
            )}
            <rect
              x={rx} y={ry} width={NW} height={NH} rx={10}
              fill={isLit ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.07)'}
              stroke={isLit ? colors.emerald : 'rgba(255,255,255,0.22)'}
              strokeWidth={isLit ? 1.5 : 1}
            />
            <text
              x={node.x} y={node.y + 5}
              textAnchor="middle"
              fontFamily={fonts.body}
              fontSize={13}
              fontWeight={isLit ? '700' : '500'}
              fill={isLit ? colors.emerald : 'rgba(255,255,255,0.75)'}
            >
              {node.label}
            </text>

            {showTickets && (
              <g transform={`translate(${rx + NW - 4}, ${ry - 4})`}>
                <circle r={10} fill={colors.gold} />
                <text x={0} y={3.5} textAnchor="middle" fontSize={9.5} fontWeight="700" fill="#fff">!</text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};
