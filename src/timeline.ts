import { FPS } from './tokens';

export const sec = (s: number) => Math.round(s * FPS);

const durations = {
  principle: 13,
  friction:  13,
  guidance:  14,
  action:    13,
  streams:   13,
  case:      14,
  delay:     11,
  roadmap:   13,
  decision:  11,
} as const;

type SceneKey = keyof typeof durations;

export const order: SceneKey[] = [
  'principle', 'friction', 'guidance', 'action', 'streams',
  'case', 'delay', 'roadmap', 'decision',
];

export const sceneBounds = (() => {
  const out = {} as Record<SceneKey, { from: number; to: number }>;
  let cursor = 0;
  for (const key of order) {
    const from = cursor;
    const to = cursor + sec(durations[key]);
    out[key] = { from, to };
    cursor = to;
  }
  return out as { [K in SceneKey]: { from: number; to: number } };
})();

export const totalDurationInFrames = sceneBounds.decision.to;
export const durationOf = (b: { from: number; to: number }) => b.to - b.from;
