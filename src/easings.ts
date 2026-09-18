export const easeOutCubic   = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInCubic    = (t: number) => t * t * t;
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOutBack    = (t: number) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
export const easeOutExpo    = (t: number) => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
export const linear         = (t: number) => t;

export const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));

export function anim(
  T: number, from: number, to: number,
  start: number, end: number,
  ease: (t: number) => number = easeOutCubic,
): number {
  if (T <= start) return from;
  if (T >= end)   return to;
  return from + ease((T - start) / (end - start)) * (to - from);
}
