export const MathUtils = {
  randomRange(min, max) {
    if (max < min) [min, max] = [max, min];
    return Math.random() * (max - min) + min;
  },

  randomInt(min, max) {
    if (max < min) [min, max] = [max, min];
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
  },

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  lerp(start, end, t) {
    const clamped = MathUtils.clamp(t, 0, 1);
    return start + (end - start) * clamped;
  },

  easeOutCubic(progress) {
    const p = MathUtils.clamp(progress, 0, 1);
    return 1 - Math.pow(1 - p, 3);
  },

  easeInCubic(progress) {
    const p = MathUtils.clamp(progress, 0, 1);
    return Math.pow(p, 3);
  },

  easeInOutQuad(progress) {
    const p = MathUtils.clamp(progress, 0, 1);
    return p < 0.5 ? 2 * Math.pow(p, 2) : 1 - Math.pow(-2 * p + 2, 2) / 2;
  },

  round(value, decimals = 0) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  },

  floor(value, decimals = 0) {
    const factor = Math.pow(10, decimals);
    return Math.floor(value * factor) / factor;
  },

  ceil(value, decimals = 0) {
    const factor = Math.pow(10, decimals);
    return Math.ceil(value * factor) / factor;
  },

  trunc(value) {
    return Math.trunc(value);
  },

  sign(value) {
    return Math.sign(value);
  },

  abs(value) {
    return Math.abs(value);
  },

  sqrt(value) {
    if (value < 0) return NaN;
    return Math.sqrt(value);
  },

  cbrt(value) {
    return Math.cbrt(value);
  },

  pow(base, exponent) {
    return Math.pow(base, exponent);
  },

  hypotenuse(...values) {
    return Math.hypot(...values);
  },

  circleArea(radius) {
    return Math.PI * Math.pow(Math.abs(radius), 2);
  },

  circleCircumference(radius) {
    return 2 * Math.PI * Math.abs(radius);
  },

  distance2D(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },

  distance3D(x1, y1, z1, x2, y2, z2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },

  average(...values) {
    if (values.length === 0) return 0;
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  },

  percentage(part, total) {
    if (total === 0) return 0;
    return (part / total) * 100;
  },

  radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
  },

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  },

  min(...values) {
    return Math.min(...values);
  },

  max(...values) {
    return Math.max(...values);
  },

  normalize(value, min, max) {
    const range = max - min;
    if (range === 0) return 0;
    return (value - min) / range;
  },

  map(value, inMin, inMax, outMin, outMax) {
    const range = inMax - inMin;
    if (range === 0) return outMin;
    return ((value - inMin) / range) * (outMax - outMin) + outMin;
  },

  factorial(n) {
    const int = Math.floor(Math.abs(n));
    if (int === 0 || int === 1) return 1;
    let result = 1;
    for (let i = 2; i <= int; i++) result *= i;
    return result;
  },

  GCD(a, b) {
    let x = Math.abs(Math.floor(a));
    let y = Math.abs(Math.floor(b));
    while (y !== 0) {
      const temp = y;
      y = x % y;
      x = temp;
    }
    return x;
  },

  LCM(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / MathUtils.GCD(a, b);
  },
};
