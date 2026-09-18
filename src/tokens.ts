import { loadFont } from '@remotion/google-fonts/Manrope';

const { fontFamily } = loadFont('normal', { weights: ['400', '700', '800'] });

export const FPS = 30;
export const W = 1920;
export const H = 1080;

export const C = {
  bg:    '#07140F',
  panel: '#0D2A1D',
  green: '#00A651',
  bright:'#2ED573',
  white: '#F4FAF6',
  muted: 'rgba(244,250,246,0.55)',
  warn:  'rgba(232,120,90,0.9)',
  line:  'rgba(46,213,115,0.22)',
};

export const F = fontFamily;

// Backwards-compat aliases for old unused components
export const fps = FPS;
export const width = W;
export const height = H;
export const colors = {
  ...C,
  emerald: C.bright,
  gold: '#ca8a04',
  goldLight: '#f6c343',
  teal: '#004937',
  inkFrom: '#001f18',
  inkMid: '#002d22',
  inkTo: '#003828',
  heroBg: C.bg,
  surface: '#ffffff',
  live: '#22c55e',
  blue: '#2563eb',
  text: '#1c1c1e',
  textMuted: '#5a6672',
  border: 'rgba(0,107,60,0.16)',
} as const;
export const fonts = { display: F, body: F, serif: F, mono: "'Consolas', monospace" } as const;
export const inkGradient = `linear-gradient(175deg, #001f18 0%, #002d22 45%, #003828 100%)`;
export const accentBar = `linear-gradient(90deg, ${C.green}, #ca8a04)`;
export const goldBar   = `linear-gradient(90deg, #ca8a04, #f6c343)`;
